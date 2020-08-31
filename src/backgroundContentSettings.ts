chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url) return;

  chrome.contentSettings.location.get({ primaryUrl: tab.url }, (details) => {
    console.log(`location settings for ${tab.url}`, details);

    chrome.tabs.executeScript(tabId, {
      code: `console.log("location settings: ${details.setting}");`,
    });
  });

  chrome.contentSettings.microphone.get({ primaryUrl: tab.url }, (details) => {
    console.log(`microphone settings for ${tab.url}`, details);

    chrome.tabs.executeScript(tabId, {
      code: `console.log("microphone settings: ${details.setting}");`,
    });
  });

  chrome.contentSettings.camera.get({ primaryUrl: tab.url }, (details) => {
    console.log(`camera settings for ${tab.url}`, details);

    chrome.tabs.executeScript(tabId, {
      code: `console.log("camera settings: ${details.setting}");`,
    });
  });

  chrome.contentSettings.cookies.get({ primaryUrl: tab.url }, (details) => {
    console.log(`cookies settings for ${tab.url}`, details);

    chrome.tabs.executeScript(tabId, {
      code: `console.log("cookies settings: ${details.setting}");`,
    });
  });
});
