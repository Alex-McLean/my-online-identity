import { WEB_REQUEST_COUNT_KEY, WEB_REQUEST_HOSTS_KEY, WEB_REQUEST_INITIATORS_KEY } from './webRequest';

export const monitorRuntime = (): void => {
  chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      chrome.declarativeContent.onPageChanged.addRules([
        {
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: { urlContains: ':' },
            }),
          ],
          actions: [new chrome.declarativeContent.ShowPageAction()],
        },
      ]);
    });
  });

  chrome.storage.local.set({ [WEB_REQUEST_COUNT_KEY]: 0 });
  chrome.storage.local.set({ [WEB_REQUEST_HOSTS_KEY]: {} });
  chrome.storage.local.set({ [WEB_REQUEST_INITIATORS_KEY]: {} });
};
