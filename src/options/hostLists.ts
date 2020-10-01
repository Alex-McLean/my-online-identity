/**
 * Provide functionality pertaining to the host lists available to the user on the options page
 */

import { WEB_REQUEST_BLOCK_LIST_KEY, WEB_REQUEST_ALLOW_LIST_KEY } from '../background/storage';

/** Host list constants */
export const DEFAULT_ALLOW_LIST = [];
export const DEFAULT_BLOCK_LIST = [];
export const HARDCODED_BLOCK_LIST = ['youtube.com'];

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
 * Determine whether or not a given test URL string matches a given host list
 */
export const matchesList = (list: string[], test: string): boolean => {
  // Attempt to find an item in the host list that matches the given URL string
  return !!list.find((listItem) => {
    // Host list items beginning and ending with '/' should be treated as regular expressions
    if (listItem.startsWith('/') && listItem.endsWith('/')) {
      const regExp = new RegExp(listItem);
      return regExp.exec(test);
    }

    // Finally, check for the given list item within the URL string
    return test.includes(listItem);
  });
};
