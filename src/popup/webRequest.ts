/**
 * Construct all DOM elements for the web request sections of the popup interface
 */

import { WEB_REQUEST_ALLOW_LIST_KEY, WEB_REQUEST_WARNINGS_KEY, WebRequestWarnings } from '../background/storage';
import { DEFAULT_ALLOW_LIST, matchesList } from '../options/hostLists';

/**
 * Update the trust header at the top of the popup based on the current tab
 */
const updateTrustHeader = (tabId: number, initiator: string): void => {
  // Get teh container DOM element
  const trustHeader = document.getElementById('trustHeader');
  if (!trustHeader) return;

  // Get the user's list of allowed hosts
  chrome.storage.local.get(WEB_REQUEST_ALLOW_LIST_KEY, (items) => {
    const allowList: string[] = items[WEB_REQUEST_ALLOW_LIST_KEY] ?? DEFAULT_ALLOW_LIST;

    // Check for a match in allowed hosts
    const allowListMatch = matchesList(allowList, initiator);

    // Update the header to denote allowed host if true
    if (allowListMatch) {
      trustHeader.className = 'grey';
      const trustHeaderH1 = document.createElement('h1');
      trustHeaderH1.innerText = 'This site is on your list of allowed hosts';
      trustHeader.appendChild(trustHeaderH1);
      return;
    }

    // Check for any stored warnings for this tab
    chrome.storage.local.get(WEB_REQUEST_WARNINGS_KEY, (items) => {
      const existingWebRequestWarnings: WebRequestWarnings = items[WEB_REQUEST_WARNINGS_KEY] ?? {};
      const existingWebRequestHostWarnings = existingWebRequestWarnings[tabId] ?? [];

      // Update the header style based on existence of any warnings
      trustHeader.className = existingWebRequestHostWarnings.length ? 'red' : 'grey';

      // Set the header content based on existence of any warnings
      const trustHeaderH1 = document.createElement('h1');
      trustHeaderH1.innerText = existingWebRequestHostWarnings.length
        ? 'This site may be breaking your trust'
        : 'This site is a good Christian boy';
      trustHeader.appendChild(trustHeaderH1);
    });
  });
};

/**
 * General entrypoint to this script
 */
export const constructWebRequest = (): void => {
  // Get the user's active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url || !activeTab?.id) return;

    const url = new URL(activeTab.url);

    // Updated the trust header
    updateTrustHeader(activeTab.id, url.hostname);
  });
};
