const getDisplaySetting = (setting: string): string => {
  return setting.replace(/_/g, ' ');
};

interface ContentSettingParagraphArgs {
  contentSetting: chrome.contentSettings.ContentSetting;
  label: string;
  url: URL;
  options: string[];
  hide?: boolean;
}

const createContentSettingParagraph = (
  parentDiv: HTMLElement,
  beforeDiv: HTMLElement,
  args: ContentSettingParagraphArgs
): void => {
  args.contentSetting.get({ primaryUrl: args.url.toString() }, (details) => {
    const contentSettingParagraph = document.createElement('p');
    contentSettingParagraph.className = args.hide ? 'content-setting-hidden' : '';

    const contentSettingLabelSpan = document.createElement('span');
    contentSettingLabelSpan.innerText = `${args.label}: `;
    contentSettingParagraph.appendChild(contentSettingLabelSpan);

    const contentSettingSpan = document.createElement('span');
    contentSettingSpan.innerText = getDisplaySetting(details.setting);
    contentSettingSpan.className = `content-setting ${details.setting}`;
    contentSettingParagraph.appendChild(contentSettingSpan);

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
    contentSettingParagraph.appendChild(contentSettingSelect);

    parentDiv.insertBefore(contentSettingParagraph, beforeDiv);
  });
};

const createContentSettingExpand = (parentDiv: HTMLElement): HTMLParagraphElement => {
  const viewMoreText = 'View more privacy settings';
  const viewLessText = 'View less privacy settings';

  const contentSettingExpandParagraph = document.createElement('p');
  contentSettingExpandParagraph.innerText = viewMoreText;
  contentSettingExpandParagraph.className = 'content-settings-expand';

  contentSettingExpandParagraph.onclick = (): void => {
    for (let i = 0; i < parentDiv.children.length; i++) {
      if (parentDiv.children[i].className === 'content-setting-shown') {
        parentDiv.children[i].className = 'content-setting-hidden';
        continue;
      }

      if (parentDiv.children[i].className === 'content-setting-hidden') {
        parentDiv.children[i].className = 'content-setting-shown';
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

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.cookies,
      label: 'Cookies',
      url: url,
      options: ['allow', 'block', 'session_only'],
    });

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.images,
      label: 'Images',
      url: url,
      options: ['allow', 'block'],
      hide: true,
    });

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.javascript,
      label: 'JavaScript',
      url: url,
      options: ['allow', 'block'],
      hide: true,
    });

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.location,
      label: 'Location',
      url: url,
      options: ['allow', 'block', 'ask'],
    });

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.plugins,
      label: 'Plugins',
      url: url,
      options: ['allow', 'block', 'detect_important_content'],
      hide: true,
    });

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.popups,
      label: 'Popups',
      url: url,
      options: ['allow', 'block'],
      hide: true,
    });

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.notifications,
      label: 'Notifications',
      url: url,
      options: ['allow', 'block', 'ask'],
      hide: true,
    });

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.microphone,
      label: 'Microphone',
      url: url,
      options: ['allow', 'block', 'ask'],
    });

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.unsandboxedPlugins,
      label: 'Unsandboxed Plugins',
      url: url,
      options: ['allow', 'block', 'ask'],
      hide: true,
    });

    createContentSettingParagraph(contentSettingContentDiv, contentSettingExpand, {
      contentSetting: chrome.contentSettings.automaticDownloads,
      label: 'Automatic Downloads',
      url: url,
      options: ['allow', 'block', 'ask'],
      hide: true,
    });
  });
};
