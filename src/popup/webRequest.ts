import { DEFAULT_ALLOW_LIST } from '../background/defaultSettings';
import {
  WEB_REQUEST_WARNINGS_KEY,
  WebRequestWarnings,
  WEB_REQUEST_ALLOW_LIST_KEY,
  matchesList,
} from '../background/webRequest';

const updateTrustHeader = (tabId: number, initiator: string): void => {
  const trustHeader = document.getElementById('trustHeader');
  if (!trustHeader) return;

  chrome.storage.local.get(WEB_REQUEST_ALLOW_LIST_KEY, (items) => {
    const allowList: string[] = items[WEB_REQUEST_ALLOW_LIST_KEY] ?? DEFAULT_ALLOW_LIST;
    const allowListMatch = matchesList(allowList, initiator);

    if (allowListMatch) {
      trustHeader.className = 'grey';
      const trustHeaderH1 = document.createElement('h1');
      trustHeaderH1.innerText = 'This site is on your list of allowed hosts';
      trustHeader.appendChild(trustHeaderH1);
      return;
    }

    chrome.storage.local.get(WEB_REQUEST_WARNINGS_KEY, (items) => {
      const existingWebRequestWarnings: WebRequestWarnings = items[WEB_REQUEST_WARNINGS_KEY] ?? {};
      const existingWebRequestHostWarnings = existingWebRequestWarnings[tabId] ?? [];

      trustHeader.className = existingWebRequestHostWarnings.length ? 'red' : 'grey';

      const trustHeaderH1 = document.createElement('h1');
      trustHeaderH1.innerText = existingWebRequestHostWarnings.length
        ? 'This site may be breaking your trust'
        : 'This site is a good Christian boy';
      trustHeader.appendChild(trustHeaderH1);
    });
  });
};

export const constructWebRequest = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url || !activeTab?.id) return;

    const url = new URL(activeTab.url);

    updateTrustHeader(activeTab.id, url.hostname);
  });
};
