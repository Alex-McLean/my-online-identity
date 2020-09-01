export interface WebRequestHostData {
  requestCount: number;
}

export interface WebRequestHosts {
  [host: string]: WebRequestHostData;
}

const countRequest = (): void => {
  chrome.storage.local.get('webRequests.count', (items) => {
    const currCount = items['webRequests.count'] ?? 0;
    chrome.storage.local.set({ 'webRequests.count': currCount + 1 });
    chrome.browserAction.setBadgeText({ text: `${currCount + 1}` });
  });
};

const countHostRequest = (url: URL): void => {
  chrome.storage.local.get('webRequests.hosts', (items) => {
    const currentHosts: WebRequestHosts = items['webRequests.hosts'] ?? {};
    const currentHost = currentHosts[url.hostname] ?? { requestCount: 0 };
    chrome.storage.local.set({
      'webRequests.hosts': {
        ...currentHosts,
        [url.hostname]: {
          ...currentHost,
          requestCount: currentHost.requestCount + 1,
        },
      },
    });
  });
};

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    countRequest();
    countHostRequest(new URL(details.url));
  },
  { urls: ['<all_urls>'] }
);
