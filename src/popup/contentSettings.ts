const getDisplaySetting = (setting: string): string => {
  return setting.replace(/_/g, ' ');
};

interface ContentSettingParagraphArgs {
  contentSetting: chrome.contentSettings.ContentSetting;
  label: string;
  url: string;
}

const createContentSettingParagraph = (args: ContentSettingParagraphArgs): void => {
  args.contentSetting.get({ primaryUrl: args.url }, (details) => {
    const contentSettingsDiv = document.getElementById('contentSettingsDiv');
    if (!contentSettingsDiv) return;

    const contentSettingParagraph = document.createElement('p');

    const contentSettingLabelSpan = document.createElement('span');
    contentSettingLabelSpan.innerText = `${args.label}: `;
    contentSettingParagraph.appendChild(contentSettingLabelSpan);

    const contentSettingSpan = document.createElement('span');
    contentSettingSpan.innerText = getDisplaySetting(details.setting);
    contentSettingSpan.className = `content-setting ${details.setting}`;
    contentSettingParagraph.appendChild(contentSettingSpan);

    contentSettingsDiv.appendChild(contentSettingParagraph);
  });
};

const createContentSettingHeader = (url: string): void => {
  const contentSettingsDiv = document.getElementById('contentSettingsDiv');
  if (!contentSettingsDiv) return;

  const contentSettingHeader = document.createElement('h3');
  contentSettingHeader.innerText = `Content settings for ${url}`;
  contentSettingsDiv.appendChild(contentSettingHeader);
};

export const constructContentSettings = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url) return;

    const url = new URL(activeTab.url);

    createContentSettingHeader(url.hostname);

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.cookies,
      label: 'Cookies',
      url: url.toString(),
    });

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.images,
      label: 'Images',
      url: url.toString(),
    });

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.javascript,
      label: 'JavaScript',
      url: url.toString(),
    });

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.location,
      label: 'Location',
      url: url.toString(),
    });

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.plugins,
      label: 'Plugins',
      url: url.toString(),
    });

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.popups,
      label: 'Popups',
      url: url.toString(),
    });

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.notifications,
      label: 'Notifications',
      url: url.toString(),
    });

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.microphone,
      label: 'Microphone',
      url: url.toString(),
    });

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.unsandboxedPlugins,
      label: 'Unsandboxed Plugins',
      url: url.toString(),
    });

    createContentSettingParagraph({
      contentSetting: chrome.contentSettings.automaticDownloads,
      label: 'Automatic Downloads',
      url: url.toString(),
    });
  });
};
