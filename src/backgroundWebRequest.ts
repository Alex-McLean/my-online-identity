chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log('web request about to send', details);

    chrome.tabs.executeScript(details.tabId, {
      code: `console.log("web request about to send to ${details.url}");`,
    });

    chrome.storage.local.get('webRequests.count', (items) => {
      const currCount = items['webRequests.count'] ?? 0;
      chrome.storage.local.set({ 'webRequests.count': currCount + 1 });
      chrome.browserAction.setBadgeText({ text: `${currCount + 1}` });
    });
  },
  { urls: ['<all_urls>'] }
);
