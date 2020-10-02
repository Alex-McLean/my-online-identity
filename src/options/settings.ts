/**
 * Construct all DOM elements for the Settings page of the options interface
 */

import { DEFAULT_THEME, THEMES, ThemeValue } from '../background/settingsOptions';
import { SETTINGS_THEME_KEY } from '../background/storage';
import { HARDCODED_BLOCK_LIST, SettingsList, SETTINGS_LISTS } from './hostLists';

/**
 * Construct the theme settings DOM elements
 */
const constructThemeSettings = (): void => {
  // Get the current theme settings from storage
  chrome.storage.local.get(SETTINGS_THEME_KEY, (items) => {
    const theme: ThemeValue = items[SETTINGS_THEME_KEY] ?? DEFAULT_THEME;

    // Get the container element from the DOM
    const themeSettingsContainer = document.getElementById('theme-settings');
    if (!themeSettingsContainer) return;

    // Create a select for the theme options
    const themeSelect = document.createElement('select');
    themeSelect.className = 'theme-select';
    themeSettingsContainer.appendChild(themeSelect);

    // Set the onchange of the select
    themeSelect.onchange = (e: Event): void => {
      const target = e.currentTarget;
      if (!target) return;
      const selectedTheme = (target as HTMLSelectElement).value as ThemeValue;

      // Update the theme settings in storage
      chrome.storage.local.set({ [SETTINGS_THEME_KEY]: selectedTheme }, () => {
        // Update the DOM to immediately reflect theme changes
        const body = document.getElementById('body');
        if (!body) return;
        body.className = selectedTheme;
      });
    };

    // Add options to the select element for each theme option
    THEMES.forEach((themeOption) => {
      const optionElement = document.createElement('option');
      optionElement.value = themeOption.value;
      optionElement.innerText = themeOption.label;
      optionElement.className = 'theme-option';
      themeSelect.appendChild(optionElement);
    });

    // Set the default value of the select to that of the current setting
    themeSelect.value = theme;
  });
};

/**
 * Constructs the DOM element for the given host list
 */
const constructList = (settingsList: SettingsList): void => {
  // Get the textarea for the list from the DOM
  const textarea = document.getElementById(settingsList.textareaId) as HTMLTextAreaElement | null;
  if (!textarea) return;

  // Populate the textarea with the user's existing settings from storage
  chrome.storage.local.get(settingsList.storageKey, (items) => {
    const list: string[] = items[settingsList.storageKey] ?? settingsList.defaultList;
    textarea.value = list.join('\n');
  });
};

/**
 * Construct DOM elements to display the hardcoded block list to the user
 */
const constructHardcodedBlockList = (): void => {
  const hardcodedBlockListDiv = document.getElementById('settings-list-hardcoded');
  if (!hardcodedBlockListDiv) return;

  HARDCODED_BLOCK_LIST.forEach((block) => {
    const blockListItem = document.createElement('code');
    blockListItem.className = 'settings-list-hardcoded-item';
    blockListItem.innerText = block;
    hardcodedBlockListDiv.appendChild(blockListItem);
  });
};

/**
 * Saves the given settings list to storage based on its current value
 */
const saveList = (settingsList: SettingsList): void => {
  // Get the textarea for the list from the DOM
  const textarea = document.getElementById(settingsList.textareaId) as HTMLTextAreaElement | null;
  if (!textarea) return;

  // Store the current textarea value to storage
  chrome.storage.local.set({ [settingsList.storageKey]: textarea.value.split('\n') });
};

/**
 * Creates the required functionality on the save button for the lists
 */
const constructSaveButton = (): void => {
  const saveButton = document.getElementById('settings-actions-save-button') as HTMLButtonElement | null;
  if (!saveButton) return;

  // Save each list onclick
  saveButton.onclick = (): void => {
    SETTINGS_LISTS.forEach((list) => void saveList(list));
    alert('Settings Saved');
  };
};

/**
 * General entrypoint to this script, creates all settings elements
 */
export const constructSettings = (): void => {
  constructSaveButton();

  constructHardcodedBlockList();
  SETTINGS_LISTS.forEach((list) => constructList(list));

  constructThemeSettings();
};
