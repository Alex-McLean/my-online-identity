/**
 * Provide functionality pertaining to the host lists available to the user on the options page
 */

import { WEB_REQUEST_BLOCK_LIST_KEY, WEB_REQUEST_ALLOW_LIST_KEY } from '../background/storage';

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
