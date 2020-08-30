chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    console.log('web request about to send', details);
    chrome.tabs.executeScript(details.tabId, {
      code: `console.log("web request about to send to ${details.url}");`,
    });
  },
  { urls: ['<all_urls>'] }
);
