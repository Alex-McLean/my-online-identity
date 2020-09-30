import { DEFAULT_ALLOW_LIST } from './defaultSettings';
import { matchesList, WebRequestWarnings, WEB_REQUEST_ALLOW_LIST_KEY, WEB_REQUEST_WARNINGS_KEY } from './webRequest';

const updateBadge = (tab: chrome.tabs.Tab): void => {
  if (!tab.active || !tab?.id) return;

  const tabUrl = tab.url ? new URL(tab.url) : undefined;
  if (!tabUrl) return;

  chrome.storage.local.get(WEB_REQUEST_ALLOW_LIST_KEY, (items) => {
    const allowList: string[] = items[WEB_REQUEST_ALLOW_LIST_KEY] ?? DEFAULT_ALLOW_LIST;
    const allowListMatch = matchesList(allowList, tabUrl.hostname);

    if (allowListMatch) {
      chrome.browserAction.setIcon({
        path: 'icon/moi32.png',
        tabId: tab.id,
      });
      return;
    }

    chrome.storage.local.get(WEB_REQUEST_WARNINGS_KEY, (items) => {
      const existingWebRequestWarnings: WebRequestWarnings = items[WEB_REQUEST_WARNINGS_KEY] ?? {};
      const existingWebRequestHostWarnings = tab.id ? existingWebRequestWarnings[tab.id] ?? [] : [];

      chrome.browserAction.setIcon({
        path: existingWebRequestHostWarnings.length ? 'icon/moi-naughty32.png' : 'icon/moi32.png',
        tabId: tab.id,
      });
    });
  });
};

export const monitorTab = (): void => {
  chrome.tabs.onUpdated.addListener((tabId) => {
    chrome.tabs.executeScript(tabId, { file: 'build/tabScript.js', allFrames: true });
  });

  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab): void => {
      updateBadge(tab);
    });
  });

  chrome.tabs.onUpdated.addListener((tabId) => {
    chrome.tabs.get(tabId, (tab): void => {
      updateBadge(tab);
    });
  });
};
