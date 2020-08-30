chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.tabs.executeScript(tabId, { file: 'js/tab.js', allFrames: true });
});
