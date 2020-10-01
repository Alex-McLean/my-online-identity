import { SETTINGS_THEME_KEY } from '../options/settings';
import { DEFAULT_ALLOW_LIST, DEFAULT_BLOCK_LIST, DEFAULT_THEME } from './defaultSettings';
import {
  WEB_REQUEST_ALLOW_LIST_KEY,
  WEB_REQUEST_BLOCK_LIST_KEY,
  WEB_REQUEST_COUNT_KEY,
  WEB_REQUEST_HOSTS_KEY,
  WEB_REQUEST_INITIATORS_KEY,
  WEB_REQUEST_WARNINGS_KEY,
} from './webRequest';

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

  chrome.storage.local.set({ [WEB_REQUEST_ALLOW_LIST_KEY]: DEFAULT_ALLOW_LIST });
  chrome.storage.local.set({ [WEB_REQUEST_BLOCK_LIST_KEY]: DEFAULT_BLOCK_LIST });

  chrome.storage.local.set({ [WEB_REQUEST_WARNINGS_KEY]: {} });

  chrome.storage.local.set({ [SETTINGS_THEME_KEY]: DEFAULT_THEME });
};
