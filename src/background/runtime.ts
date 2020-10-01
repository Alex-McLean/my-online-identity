/**
 * Modularised background script to encompass any general background use of the chrome.runtime.* APIs
 */

/**
 * Add listener to the chrome runtime to be executed upon installation of  the extension
 */
const addOnInstalledListener = (): void => {
  chrome.runtime.onInstalled.addListener(function () {
    // Remove any existing declarative content rules just in case
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      // Declare that this extension can exexute on any page with ':' in the URL (i.e. all pages)
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
};

/**
 * General entrypoint to this script
 */
export const monitorRuntime = (): void => {
  addOnInstalledListener();
};
