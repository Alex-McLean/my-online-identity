import {
  DEFAULT_ALLOW_LIST,
  DEFAULT_BLOCK_LIST,
  DEFAULT_THEME,
  HARDCODED_BLOCK_LIST,
  THEMES,
} from '../background/defaultSettings';
import { WEB_REQUEST_ALLOW_LIST_KEY, WEB_REQUEST_BLOCK_LIST_KEY } from '../background/webRequest';

export const SETTINGS_THEME_KEY = 'settings.theme';

const constructThemeSettings = (): void => {
  chrome.storage.local.get(SETTINGS_THEME_KEY, (items) => {
    const theme = items[SETTINGS_THEME_KEY] ?? DEFAULT_THEME;
    const themeSettingsContainer = document.getElementById('theme-settings');

    if (!themeSettingsContainer) return;

    const themeSelect = document.createElement('select');
    themeSelect.onchange = (e: Event): void => {
      const target = e.currentTarget;
      if (!target) return;
      const selectedTheme = (target as HTMLSelectElement).value;
      chrome.storage.local.set({ [SETTINGS_THEME_KEY]: selectedTheme }, () => {
        const body = document.getElementById('body');
        if (!body) return;
        body.className = selectedTheme;
      });
    };
    THEMES.forEach((themeOption) => {
      const optionElement = document.createElement('option');
      optionElement.value = themeOption;
      optionElement.innerText = themeOption;
      optionElement.className = 'theme-option';
      themeSelect.appendChild(optionElement);
    });
    themeSelect.value = theme;
    themeSelect.className = 'theme-select';
    themeSettingsContainer.appendChild(themeSelect);
  });
};

interface SettingsList {
  storageKey: string;
  textareaId: string;
  defaultList: string[];
}
const SETTINGS_LISTS: SettingsList[] = [
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

const constructList = (settingsList: SettingsList): void => {
  const textarea = document.getElementById(settingsList.textareaId) as HTMLTextAreaElement | null;
  if (!textarea) return;

  chrome.storage.local.get(settingsList.storageKey, (items) => {
    const list: string[] = items[settingsList.storageKey] ?? settingsList.defaultList;
    textarea.value = list.join('\n');
  });
};

const constructHardcodedBlockList = (): void => {
  const hardcodedBlockListDiv = document.getElementById('settings-list-hardcoded');
  if (!hardcodedBlockListDiv) return;

  HARDCODED_BLOCK_LIST.forEach((block) => {
    const blockListItem = document.createElement('div');
    blockListItem.className = 'settings-list-hardcoded-item';
    blockListItem.innerText = block;
    hardcodedBlockListDiv.appendChild(blockListItem);
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

  constructHardcodedBlockList();
  SETTINGS_LISTS.forEach((list) => constructList(list));

  constructThemeSettings();
};
