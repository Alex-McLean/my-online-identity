/**
 * Generalised constants, strong types, and functionality
 * for the extension's utilisation of the chrome.storage.* APIs
 */

import { DEFAULT_THEME } from './settingsOptions';

// Export web request storage keys to ensure consistency
export const WEB_REQUEST_ALLOW_LIST_KEY = 'webRequests.allowList';
export const WEB_REQUEST_BLOCK_LIST_KEY = 'webRequests.blockList';
export const WEB_REQUEST_COUNT_KEY = 'webRequests.count';
export const WEB_REQUEST_HOSTS_KEY = 'webRequests.hosts';
export const WEB_REQUEST_INITIATORS_KEY = 'webRequests.initiators';
export const WEB_REQUEST_WARNINGS_KEY = 'webRequests.warnings';

// Export settings storage keys to ensure consistency
export const SETTINGS_THEME_KEY = 'settings.theme';

// Strong types to be used with the WEB_REQUEST_HOSTS_KEY storage item
interface WebRequestHost {
  requestCount: number;
}
export interface WebRequestHosts {
  [host: string]: WebRequestHost;
}

// Strong types to be used with the WEB_REQUEST_INITIATORS_KEY storage item
interface WebRequestInitiatorDestination {
  requestCount: number;
}
interface WebRequestInitiator {
  [destination: string]: WebRequestInitiatorDestination;
}
export interface WebRequestInitiators {
  [initiator: string]: WebRequestInitiator;
}

// Strong types to be used with the WEB_REQUEST_WARNINGS_KEY storage item
export interface WebRequestWarning {
  content: {
    body: string;
  };
}
export interface WebRequestWarnings {
  [tabId: number]: {
    [host: string]: WebRequestWarning[];
  };
}

/**
 * Provide functionality pertaining to the host lists available to the user on the options page
 */

/** Host list constants */
export const DEFAULT_ALLOW_LIST = [];
export const DEFAULT_BLOCK_LIST = [];

/** Host list constants for the setting interface */
export interface SettingsList {
  storageKey: string;
  textareaId: string;
  defaultList: string[];
}

export const SETTINGS_LISTS: SettingsList[] = [
  {
    storageKey: WEB_REQUEST_BLOCK_LIST_KEY,
    textareaId: 'settings-block',
    defaultList: DEFAULT_BLOCK_LIST,
  },
  {
    storageKey: WEB_REQUEST_ALLOW_LIST_KEY,
    textareaId: 'settings-allow',
    defaultList: DEFAULT_ALLOW_LIST,
  },
];

/**
 * Initialises storage key-value pairs in the chrome instance local storage
 */
export const initialiseStorage = (): void => {
  // Initialise web request storage
  chrome.storage.local.set({ [WEB_REQUEST_COUNT_KEY]: 0 });
  chrome.storage.local.set({ [WEB_REQUEST_HOSTS_KEY]: {} });
  chrome.storage.local.set({ [WEB_REQUEST_INITIATORS_KEY]: {} });
  chrome.storage.local.set({ [WEB_REQUEST_ALLOW_LIST_KEY]: DEFAULT_ALLOW_LIST });
  chrome.storage.local.set({ [WEB_REQUEST_BLOCK_LIST_KEY]: DEFAULT_BLOCK_LIST });
  chrome.storage.local.set({ [WEB_REQUEST_WARNINGS_KEY]: {} });

  // Initialise settings storage
  chrome.storage.local.set({ [SETTINGS_THEME_KEY]: DEFAULT_THEME });
};
