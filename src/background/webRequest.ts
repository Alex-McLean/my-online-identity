export const WEB_REQUEST_COUNT_KEY = 'webRequests.count';

const countRequest = (): void => {
  chrome.storage.local.get(WEB_REQUEST_COUNT_KEY, (items) => {
    const currCount = items[WEB_REQUEST_COUNT_KEY] ?? 0;
    chrome.storage.local.set({ [WEB_REQUEST_COUNT_KEY]: currCount + 1 });
    chrome.browserAction.setBadgeText({ text: `${currCount + 1}` });
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

export const monitorWebRequest = (): void => {
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      const url = new URL(details.url);
      const initiatorUrl = details.initiator ? new URL(details.initiator) : undefined;

      countRequest();
      countHostRequest(url);
      if (initiatorUrl) countInitiatorRequest(initiatorUrl, url);
    },
    { urls: ['<all_urls>'] }
  );
};
