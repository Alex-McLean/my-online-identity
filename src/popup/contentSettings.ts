const getDisplaySetting = (setting: string): string => {
  return setting.replace(/_/g, ' ');
};

interface ContentSettingParagraphArgs {
  contentSetting: chrome.contentSettings.ContentSetting;
  label: string;
  url: URL;
  options: string[];
}

const createContentSettingParagraph = (parentDiv: HTMLElement, args: ContentSettingParagraphArgs): void => {
  args.contentSetting.get({ primaryUrl: args.url.toString() }, (details) => {
    const contentSettingParagraph = document.createElement('p');

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

    parentDiv.appendChild(contentSettingParagraph);
  });
};

const updateContentSettingHeader = (url: string): void => {
  const contentSettingHeader = document.getElementById('contentSettingsHeader');
  if (!contentSettingHeader) return;
  contentSettingHeader.innerText = `Content settings for ${url}`;
};

export const constructContentSettings = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url) return;

    const url = new URL(activeTab.url);

    updateContentSettingHeader(url.hostname);

    const contentSettingContentDiv = document.getElementById('contentSettingsContent');
    if (!contentSettingContentDiv) return;

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.cookies,
      label: 'Cookies',
      url: url,
      options: ['allow', 'block', 'session_only'],
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.images,
      label: 'Images',
      url: url,
      options: ['allow', 'block'],
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.javascript,
      label: 'JavaScript',
      url: url,
      options: ['allow', 'block'],
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.location,
      label: 'Location',
      url: url,
      options: ['allow', 'block', 'ask'],
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.plugins,
      label: 'Plugins',
      url: url,
      options: ['allow', 'block', 'detect_important_content'],
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.popups,
      label: 'Popups',
      url: url,
      options: ['allow', 'block'],
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.notifications,
      label: 'Notifications',
      url: url,
      options: ['allow', 'block', 'ask'],
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.microphone,
      label: 'Microphone',
      url: url,
      options: ['allow', 'block', 'ask'],
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.unsandboxedPlugins,
      label: 'Unsandboxed Plugins',
      url: url,
      options: ['allow', 'block', 'ask'],
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.automaticDownloads,
      label: 'Automatic Downloads',
      url: url,
      options: ['allow', 'block', 'ask'],
    });
  });
};
