export const monitorTab = (): void => {
  chrome.tabs.onUpdated.addListener((tabId) => {
    chrome.tabs.executeScript(tabId, { file: 'build/tabScript.js', allFrames: true });
  });
};
