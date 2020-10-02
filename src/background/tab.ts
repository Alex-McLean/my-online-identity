/**
 * Script used to monitor tab activity within the user's browser using the chrome.tabs.* API
 */

import { DEFAULT_ALLOW_LIST, matchesList } from '../options/hostLists';
import { WEB_REQUEST_ALLOW_LIST_KEY, WEB_REQUEST_WARNINGS_KEY, WebRequestWarnings } from './storage';

/**
 * Update the extension badge based on the given tab
 */
const updateBadge = (tab: chrome.tabs.Tab): void => {
  // Ignore if the tab is inactive or does not have a usable ID
  if (!tab.active || !tab?.id) return;

  // Ignore if the tab does not have a usable URL
  const tabUrl = tab.url ? new URL(tab.url) : undefined;
  if (!tabUrl) return;

  // Get the user's list of hosts that the extension should not run on
  chrome.storage.local.get(WEB_REQUEST_ALLOW_LIST_KEY, (items) => {
    const allowList: string[] = items[WEB_REQUEST_ALLOW_LIST_KEY] ?? DEFAULT_ALLOW_LIST;

    // Check for a match on the allow list
    const allowListMatch = matchesList(allowList, tabUrl.hostname);
    if (allowListMatch) {
      // Set the happy icon for an allowed host and return
      chrome.browserAction.setIcon({
        path: 'icon/moi32.png',
        tabId: tab.id,
      });
      return;
    }

    // Check for any stored warnings for the tab
    chrome.storage.local.get(WEB_REQUEST_WARNINGS_KEY, (items) => {
      const existingWebRequestWarnings: WebRequestWarnings = items[WEB_REQUEST_WARNINGS_KEY] ?? {};
      const existingWebRequestTabWarnings = tab.id ? existingWebRequestWarnings[tab.id] ?? {} : {};
      const existingWebRequestHostWarnings = tab.id ? existingWebRequestTabWarnings[tabUrl.hostname] ?? [] : [];

      // Set the extension icon deterministically based on the presence of any warnings for the tab
      chrome.browserAction.setIcon({
        path: existingWebRequestHostWarnings.length ? 'icon/moi-naughty32.png' : 'icon/moi32.png',
        tabId: tab.id,
      });
    });
  });
};

/**
 * General entrypoint to this script
 */
export const monitorTab = (): void => {
  // Execute script in tab
  chrome.tabs.onUpdated.addListener((tabId) => {
    chrome.tabs.executeScript(tabId, { file: 'build/tabScript.js', allFrames: true });
  });

  // Update the extensions badge upon updates or activations of tabs
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
