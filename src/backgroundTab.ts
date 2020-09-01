chrome.tabs.onUpdated.addListener((tabId) => {
  chrome.tabs.executeScript(tabId, { file: 'build/tab.js', allFrames: true });
});
