/**
 * Construct all DOM elements for the Privacy Control Panel section of the popup interface
 */

import { ContentSettingParagraphArgs, CONTENT_SETTING_DEFINITIONS } from './contentSettingsDefinitions';

/**
 * Get a nicer version of a setting name for usability
 */
const getDisplaySetting = (setting: string): string => {
  return setting.replace(/_/g, ' ');
};

/**
 * Create a content setting list item based on the given args, in the correct DOM position
 */
const createContentSettingParagraph = (
  parentDiv: HTMLElement,
  beforeDiv: HTMLElement,
  args: ContentSettingParagraphArgs,
  url: URL
): void => {
  // Get the user's current setting for this URL
  args.contentSetting.get({ primaryUrl: url.toString() }, (details) => {
    // Create container element
    const contentSettingContainer = document.createElement('div');
    contentSettingContainer.className = 'content-setting-description-hidden';
    contentSettingContainer.className += args.hide ? ' content-setting-hidden' : '';

    // Create inner container for shown content
    const contentSettingParagraph = document.createElement('div');
    contentSettingParagraph.className = 'content-setting-p';

    // Create a read more element that hides and shows further information about the setting
    const contentSettingReadMore = document.createElement('div');
    contentSettingReadMore.innerText = 'More';
    contentSettingReadMore.className = 'content-setting-read-more';
    contentSettingReadMore.onclick = (): void => {
      contentSettingContainer.className = contentSettingContainer.className.replace(
        /content-setting-description-hidden/,
        ''
      );
    };
    contentSettingParagraph.appendChild(contentSettingReadMore);

    // Create the main information container for the setting
    const contentSettingMain = document.createElement('div');
    contentSettingMain.className = 'content-setting-main';
    contentSettingParagraph.appendChild(contentSettingMain);

    // Add the setting label
    const contentSettingLabelSpan = document.createElement('span');
    contentSettingLabelSpan.innerText = `${args.label}:\u00A0`;
    contentSettingMain.appendChild(contentSettingLabelSpan);

    // Add the setting current value
    const contentSettingSpan = document.createElement('span');
    contentSettingSpan.innerText = getDisplaySetting(details.setting);
    contentSettingSpan.className = `content-setting ${details.setting}`;
    contentSettingMain.appendChild(contentSettingSpan);

    // Add a select element to change the setting
    const contentSettingSelect = document.createElement('select');
    contentSettingSelect.className = 'content-setting-select';
    contentSettingMain.appendChild(contentSettingSelect);
    contentSettingSelect.onchange = (e: Event): void => {
      const target = e.currentTarget;
      if (!target) return;
      const setting = (target as HTMLSelectElement).value;

      // Update the user's settings after select value change
      args.contentSetting.set({ primaryPattern: `${url.origin}/*`, setting }, (): void => {
        contentSettingSpan.innerText = getDisplaySetting(setting);
        contentSettingSpan.className = `content-setting ${setting}`;
      });
    };

    // Add select options based on current setting
    args.options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.innerText = getDisplaySetting(option);
      optionElement.className = 'content-setting-option';
      contentSettingSelect.appendChild(optionElement);
    });

    // Set select element value based on current setting
    contentSettingSelect.value = details.setting;

    // Add description of setting, hidden by default
    const contentSettingDescription = document.createElement('div');
    contentSettingDescription.className = 'content-setting-description';
    contentSettingDescription.innerText = args.description;

    contentSettingContainer.appendChild(contentSettingParagraph);
    contentSettingContainer.appendChild(contentSettingDescription);

    // Insert setting element in correct location
    parentDiv.insertBefore(contentSettingContainer, beforeDiv);
  });
};

/**
 * Add element that will expand the content settings to list to show more
 */
const createContentSettingExpand = (parentDiv: HTMLElement): HTMLParagraphElement => {
  const viewMoreText = 'View more privacy settings';
  const viewLessText = 'View less privacy settings';

  // Create expander element
  const contentSettingExpandParagraph = document.createElement('p');
  contentSettingExpandParagraph.innerText = viewMoreText;
  contentSettingExpandParagraph.className = 'content-settings-expand';

  // Flip the active state of each child element onclick, and update displayed text
  contentSettingExpandParagraph.onclick = (): void => {
    for (let i = 0; i < parentDiv.children.length; i++) {
      if (parentDiv.children[i].className.includes('content-setting-shown')) {
        parentDiv.children[i].className = parentDiv.children[i].className.replace(/content-setting-shown/, '');
        parentDiv.children[i].className += 'content-setting-hidden';
        continue;
      }

      if (parentDiv.children[i].className.includes('content-setting-hidden')) {
        parentDiv.children[i].className = parentDiv.children[i].className.replace(/content-setting-hidden/, '');
        parentDiv.children[i].className += 'content-setting-shown';
      }
    }

    contentSettingExpandParagraph.innerText =
      contentSettingExpandParagraph.innerText === viewMoreText ? viewLessText : viewMoreText;
  };

  return contentSettingExpandParagraph;
};

/**
 * Update the section's header
 */
const updateContentSettingHeader = (): void => {
  const contentSettingHeader = document.getElementById('contentSettingsHeader');
  if (!contentSettingHeader) return;
  contentSettingHeader.innerText = `You can quickly turn sharing off using these controls`;
};

/**
 * General entrypoint to this script
 */
export const constructContentSettings = (): void => {
  // Get the user's active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url) return;

    const url = new URL(activeTab.url);

    // Update the general content setting header based on the current tab
    updateContentSettingHeader();

    // Create the content setting list items based on the current tab
    const contentSettingContentDiv = document.getElementById('contentSettingsContent');
    if (!contentSettingContentDiv) return;
    contentSettingContentDiv.className = 'content-setting-content';

    const contentSettingExpand = createContentSettingExpand(contentSettingContentDiv);
    contentSettingContentDiv.appendChild(contentSettingExpand);

    CONTENT_SETTING_DEFINITIONS.forEach((def) =>
      createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, def, url)
    );
  });
};
