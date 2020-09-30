import { ContentSettingParagraphArgs, getContentSettingsDefinitions } from './contentSettingsDefinitions';

const getDisplaySetting = (setting: string): string => {
  return setting.replace(/_/g, ' ');
};

const createContentSettingParagraph = (
  parentDiv: HTMLElement,
  beforeDiv: HTMLElement,
  args: ContentSettingParagraphArgs
): void => {
  args.contentSetting.get({ primaryUrl: args.url.toString() }, (details) => {
    const contentSettingContainer = document.createElement('div');
    contentSettingContainer.className = 'content-setting-description-hidden';
    contentSettingContainer.className += args.hide ? ' content-setting-hidden' : '';

    const contentSettingParagraph = document.createElement('div');
    contentSettingParagraph.className = 'content-setting-p';

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

    const contentSettingMain = document.createElement('div');
    contentSettingMain.className = 'content-setting-main';

    const contentSettingLabelSpan = document.createElement('span');
    contentSettingLabelSpan.innerText = `${args.label}:\u00A0`;
    contentSettingMain.appendChild(contentSettingLabelSpan);

    const contentSettingSpan = document.createElement('span');
    contentSettingSpan.innerText = getDisplaySetting(details.setting);
    contentSettingSpan.className = `content-setting ${details.setting}`;
    contentSettingMain.appendChild(contentSettingSpan);

    const contentSettingSelect = document.createElement('select');
    contentSettingSelect.onchange = (e: Event): void => {
      const target = e.currentTarget;
      if (!target) return;
      const setting = (target as HTMLSelectElement).value;
      args.contentSetting.set({ primaryPattern: `${args.url.origin}/*`, setting }, (): void => {
        contentSettingSpan.innerText = getDisplaySetting(setting);
        contentSettingSpan.className = `content-setting ${setting}`;
      });
    };
    args.options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.innerText = getDisplaySetting(option);
      optionElement.className = 'content-setting-option';
      contentSettingSelect.appendChild(optionElement);
    });
    contentSettingSelect.value = details.setting;
    contentSettingSelect.className = 'content-setting-select';
    contentSettingMain.appendChild(contentSettingSelect);

    contentSettingParagraph.appendChild(contentSettingMain);

    const contentSettingDescription = document.createElement('div');
    contentSettingDescription.className = 'content-setting-description';
    contentSettingDescription.innerText = args.description;

    contentSettingContainer.appendChild(contentSettingParagraph);
    contentSettingContainer.appendChild(contentSettingDescription);

    parentDiv.insertBefore(contentSettingContainer, beforeDiv);
  });
};

const createContentSettingExpand = (parentDiv: HTMLElement): HTMLParagraphElement => {
  const viewMoreText = 'View more privacy settings';
  const viewLessText = 'View less privacy settings';

  const contentSettingExpandParagraph = document.createElement('p');
  contentSettingExpandParagraph.innerText = viewMoreText;
  contentSettingExpandParagraph.className = 'content-settings-expand';

  contentSettingExpandParagraph.onclick = (): void => {
    console.log(parentDiv.children[0]);
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

const updateContentSettingHeader = (): void => {
  const contentSettingHeader = document.getElementById('contentSettingsHeader');
  if (!contentSettingHeader) return;
  contentSettingHeader.innerText = `You can quickly turn sharing off using these controls`;
};

export const constructContentSettings = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url) return;

    const url = new URL(activeTab.url);

    updateContentSettingHeader();

    const contentSettingContentDiv = document.getElementById('contentSettingsContent');
    if (!contentSettingContentDiv) return;
    contentSettingContentDiv.className = 'content-setting-content';

    const contentSettingExpand = createContentSettingExpand(contentSettingContentDiv);
    contentSettingContentDiv.appendChild(contentSettingExpand);

    getContentSettingsDefinitions(url).forEach((def) =>
      createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, def)
    );
  });
};
