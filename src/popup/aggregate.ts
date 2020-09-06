import { WEB_REQUEST_INITIATORS_KEY, WebRequestInitiators } from '../background/webRequest';

const SAD_INFO_LINE_CLASS = 'sad-info-paragraph';

export const createWebRequestsParagraph = (parent: HTMLElement, initiator: string): void => {
  chrome.storage.local.get(WEB_REQUEST_INITIATORS_KEY, (items) => {
    const currentInitiators: WebRequestInitiators = items[WEB_REQUEST_INITIATORS_KEY] ?? {};
    const currentInitiator = currentInitiators[initiator] ?? {};

    const total = Object.values(currentInitiator).reduce((acc, destination) => {
      return acc + destination.requestCount;
    }, 0);

    const webRequestsParagraph = document.createElement('p');
    webRequestsParagraph.className = SAD_INFO_LINE_CLASS;
    webRequestsParagraph.innerText = `Made ${total} network requests.`;
    parent.appendChild(webRequestsParagraph);

    const totalDomains = Math.max(Object.values(currentInitiator).length - 1, 0); // Exclude self
    const externalDomainsParagraph = document.createElement('p');
    externalDomainsParagraph.className = SAD_INFO_LINE_CLASS;
    externalDomainsParagraph.innerText = `Interacted with ${totalDomains} external domains.`;
    parent.appendChild(externalDomainsParagraph);
  });
};

export const createCookiesParagraph = (parent: HTMLElement, url: URL): void => {
  chrome.cookies.getAll({ url: url.toString() }, (cookies) => {
    const totalCookies = cookies.length;
    const cookiesParagraph = document.createElement('p');
    cookiesParagraph.className = SAD_INFO_LINE_CLASS;
    cookiesParagraph.innerText = `Stored ${totalCookies} cookies on your device.`;
    parent.appendChild(cookiesParagraph);
  });
};

export const createAggregateContentDiv = (url: URL): HTMLDivElement => {
  const aggregateContentDiv = document.createElement('div');
  aggregateContentDiv.className = 'aggregate-content';

  const aggregateHeader = document.createElement('h3');
  aggregateHeader.className = 'section-heading';
  aggregateHeader.innerText = `${url.hostname} has allowed the following network and cookie activity`;
  aggregateContentDiv.appendChild(aggregateHeader);

  createWebRequestsParagraph(aggregateContentDiv, url.hostname);
  createCookiesParagraph(aggregateContentDiv, url);

  return aggregateContentDiv;
};

export const createAggregate = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url) return;

    const url = new URL(activeTab.url);

    const aggregateDiv = document.getElementById('aggregateDiv');
    if (!aggregateDiv) return;

    const aggregateContent = createAggregateContentDiv(url);
    aggregateDiv.appendChild(aggregateContent);
  });
};
