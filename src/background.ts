chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ 'webRequests.count': 0 });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: ':' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.storage.local.set({ 'webRequests.count': 0 });
