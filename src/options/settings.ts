import { WEB_REQUEST_ALLOW_LIST_KEY, WEB_REQUEST_BLOCK_LIST_KEY } from '../background/webRequest';

interface SettingsList {
  storageKey: string;
  textareaId: string;
}
const SETTINGS_LISTS: SettingsList[] = [
  {
    storageKey: WEB_REQUEST_ALLOW_LIST_KEY,
    textareaId: 'settings-allow',
  },
  {
    storageKey: WEB_REQUEST_BLOCK_LIST_KEY,
    textareaId: 'settings-block',
  },
];

const constructList = (settingsList: SettingsList): void => {
  const textarea = document.getElementById(settingsList.textareaId) as HTMLTextAreaElement | null;
  if (!textarea) return;

  chrome.storage.local.get(settingsList.storageKey, (items) => {
    const list: string[] = items[settingsList.storageKey] ?? [];
    textarea.value = list.join('\n');
  });
};

const saveList = (settingsList: SettingsList): void => {
  const textarea = document.getElementById(settingsList.textareaId) as HTMLTextAreaElement | null;
  if (!textarea) return;

  chrome.storage.local.set({ [settingsList.storageKey]: textarea.value.split('\n') });
};

const constructSaveButton = (): void => {
  const saveButton = document.getElementById('settings-actions-save-button') as HTMLButtonElement | null;
  if (!saveButton) return;
  saveButton.onclick = (): void => {
    SETTINGS_LISTS.forEach((list) => void saveList(list));
  };
};

export const constructSettings = (): void => {
  constructSaveButton();

  SETTINGS_LISTS.forEach((list) => constructList(list));
};
