const getDisplaySetting = (setting: string): string => {
  return setting.replace(/_/g, ' ');
};

interface ContentSettingParagraphArgs {
  contentSetting: chrome.contentSettings.ContentSetting;
  label: string;
  url: string;
}

const createContentSettingParagraph = (parentDiv: HTMLElement, args: ContentSettingParagraphArgs): void => {
  args.contentSetting.get({ primaryUrl: args.url }, (details) => {
    const contentSettingParagraph = document.createElement('p');

    const contentSettingLabelSpan = document.createElement('span');
    contentSettingLabelSpan.innerText = `${args.label}: `;
    contentSettingParagraph.appendChild(contentSettingLabelSpan);

    const contentSettingSpan = document.createElement('span');
    contentSettingSpan.innerText = getDisplaySetting(details.setting);
    contentSettingSpan.className = `content-setting ${details.setting}`;
    contentSettingParagraph.appendChild(contentSettingSpan);

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
      url: url.toString(),
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.images,
      label: 'Images',
      url: url.toString(),
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.javascript,
      label: 'JavaScript',
      url: url.toString(),
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.location,
      label: 'Location',
      url: url.toString(),
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.plugins,
      label: 'Plugins',
      url: url.toString(),
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.popups,
      label: 'Popups',
      url: url.toString(),
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.notifications,
      label: 'Notifications',
      url: url.toString(),
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.microphone,
      label: 'Microphone',
      url: url.toString(),
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.unsandboxedPlugins,
      label: 'Unsandboxed Plugins',
      url: url.toString(),
    });

    createContentSettingParagraph(contentSettingContentDiv, {
      contentSetting: chrome.contentSettings.automaticDownloads,
      label: 'Automatic Downloads',
      url: url.toString(),
    });
  });
};
