import { DEFAULT_ALLOW_LIST, DEFAULT_BLOCK_LIST, HARDCODED_BLOCK_LIST } from './defaultSettings';

export const WEB_REQUEST_ALLOW_LIST_KEY = 'webRequests.allowList';
export const WEB_REQUEST_BLOCK_LIST_KEY = 'webRequests.blockList';

export const WEB_REQUEST_COUNT_KEY = 'webRequests.count';

const countRequest = (): void => {
  chrome.storage.local.get(WEB_REQUEST_COUNT_KEY, (items) => {
    const currCount = items[WEB_REQUEST_COUNT_KEY] ?? 0;
    chrome.storage.local.set({ [WEB_REQUEST_COUNT_KEY]: currCount + 1 });
  });
};

export interface WebRequestHost {
  requestCount: number;
}

export interface WebRequestHosts {
  [host: string]: WebRequestHost;
}

export const WEB_REQUEST_HOSTS_KEY = 'webRequests.hosts';

const countHostRequest = (url: URL): void => {
  chrome.storage.local.get(WEB_REQUEST_HOSTS_KEY, (items) => {
    const currentHosts: WebRequestHosts = items[WEB_REQUEST_HOSTS_KEY] ?? {};
    const currentHost = currentHosts[url.hostname] ?? { requestCount: 0 };
    chrome.storage.local.set({
      [WEB_REQUEST_HOSTS_KEY]: {
        ...currentHosts,
        [url.hostname]: {
          ...currentHost,
          requestCount: currentHost.requestCount + 1,
        },
      },
    });
  });
};

export interface WebRequestInitiatorDestination {
  requestCount: number;
}

export interface WebRequestInitiator {
  [destination: string]: WebRequestInitiatorDestination;
}

export interface WebRequestInitiators {
  [initiator: string]: WebRequestInitiator;
}

export const WEB_REQUEST_INITIATORS_KEY = 'webRequests.initiators';

const countInitiatorRequest = (initiatorUrl: URL, destinationUrl: URL): void => {
  chrome.storage.local.get(WEB_REQUEST_INITIATORS_KEY, (items) => {
    const currentInitiators: WebRequestInitiators = items[WEB_REQUEST_INITIATORS_KEY] ?? {};
    const currentInitiator = currentInitiators[initiatorUrl.hostname] ?? {};
    const currentInitiatorDestination = currentInitiator[destinationUrl.hostname] ?? { requestCount: 0 };
    chrome.storage.local.set({
      [WEB_REQUEST_INITIATORS_KEY]: {
        ...currentInitiators,
        [initiatorUrl.hostname]: {
          ...currentInitiator,
          [destinationUrl.hostname]: {
            requestCount: currentInitiatorDestination.requestCount + 1,
          },
        },
      },
    });
  });
};

export const WEB_REQUEST_WARNINGS_KEY = 'webRequests.warnings';

interface WebRequestWarning {
  content: {
    body: string;
  };
}

export interface WebRequestWarnings {
  [tabId: number]: WebRequestWarning[];
}

const addWarning = (tabId: number, warning: WebRequestWarning): void => {
  chrome.storage.local.get(WEB_REQUEST_WARNINGS_KEY, (items) => {
    const existingWebRequestWarnings: WebRequestWarnings = items[WEB_REQUEST_WARNINGS_KEY] ?? {};
    const existingWebRequestHostWarnings = existingWebRequestWarnings[tabId] ?? [];
    chrome.storage.local.set({
      [WEB_REQUEST_WARNINGS_KEY]: {
        ...existingWebRequestWarnings,
        [tabId]: [...existingWebRequestHostWarnings, warning],
      },
    });
  });
};

export const matchesList = (list: string[], test: string): boolean => {
  return !!list.find((listItem) => {
    if (listItem.startsWith('/') && listItem.endsWith('/')) {
      const regExp = new RegExp(listItem);
      return regExp.exec(test);
    }

    return test.includes(listItem);
  });
};

const checkAgainstBlacklist = (
  initiatorUrl: URL,
  destinationUrl: URL,
  details: chrome.webRequest.WebRequestBodyDetails
): void => {
  chrome.storage.local.get(WEB_REQUEST_BLOCK_LIST_KEY, (items) => {
    const blockList: string[] = items[WEB_REQUEST_BLOCK_LIST_KEY] ?? DEFAULT_BLOCK_LIST;
    const fullBlockList = [...blockList, ...HARDCODED_BLOCK_LIST];
    const blockListMatch = matchesList(fullBlockList, destinationUrl.toString());
    if (!blockListMatch) return;

    chrome.storage.local.get(WEB_REQUEST_ALLOW_LIST_KEY, (items) => {
      const allowList: string[] = items[WEB_REQUEST_ALLOW_LIST_KEY] ?? DEFAULT_ALLOW_LIST;
      const allowListMatch = matchesList(allowList, initiatorUrl.toString());
      if (allowListMatch) return;

      addWarning(details.tabId, {
        content: {
          body: `Outbound network request sent to ${destinationUrl.host}`,
        },
      });
    });
  });
};

const ALLOWED_INSECURE_METHODS = ['GET', 'HEAD'];
const checkForInsecurePost = (
  initiatorUrl: URL,
  destinationUrl: URL,
  details: chrome.webRequest.WebRequestBodyDetails
): void => {
  const initiatorSecure = initiatorUrl.protocol === 'https:';
  const destinationSecure = destinationUrl.protocol === 'https:';
  if (initiatorSecure === destinationSecure) return;
  if (ALLOWED_INSECURE_METHODS.includes(details.method)) return;

  addWarning(details.tabId, {
    content: {
      body: `Mismatch in network protocols making a ${details.method} request to ${destinationUrl.host}`,
    },
  });
};

const checkForWarnings = (
  initiatorUrl: URL,
  destinationUrl: URL,
  details: chrome.webRequest.WebRequestBodyDetails
): void => {
  checkAgainstBlacklist(initiatorUrl, destinationUrl, details);
  checkForInsecurePost(initiatorUrl, destinationUrl, details);
};

export const monitorWebRequest = (): void => {
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      const url = new URL(details.url);
      const initiatorUrl = details.initiator ? new URL(details.initiator) : undefined;

      countRequest();
      countHostRequest(url);
      if (initiatorUrl) countInitiatorRequest(initiatorUrl, url);
      if (initiatorUrl) checkForWarnings(initiatorUrl, url, details);
    },
    { urls: ['<all_urls>'] }
  );
};
