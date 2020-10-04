/**
 * Create an aggregated DOM element about the user's current tab
 * Quantitatively show information about cookies and network requests by the tab's host
 */

import { WEB_REQUEST_INITIATORS_KEY, WebRequestInitiators } from '../background/storage';

/** Reference for class names */
const SAD_INFO_LINE_CLASS = 'sad-info-paragraph';

/**
 * Create and append quantitative paragraph about cookies for given URL
 */
const createWebRequestsParagraph = (parent: HTMLElement, initiator: string): void => {
  // Get web request data from storage
  chrome.storage.local.get(WEB_REQUEST_INITIATORS_KEY, (items) => {
    // Get information about current tab's host
    const currentInitiators: WebRequestInitiators = items[WEB_REQUEST_INITIATORS_KEY] ?? {};
    const currentInitiator = currentInitiators[initiator] ?? {};

    // Count total requests
    const total = Object.values(currentInitiator).reduce((acc, destination) => {
      return acc + destination.requestCount;
    }, 0);

    // Append total request info to DOM
    const webRequestsParagraph = document.createElement('p');
    webRequestsParagraph.className = SAD_INFO_LINE_CLASS;
    webRequestsParagraph.innerText = `${total} network requests in total`;
    parent.appendChild(webRequestsParagraph);

    // Count external domains interacted with by host and append to DOM
    const totalDomains = Math.max(Object.values(currentInitiator).length - 1, 0); // Exclude self
    const externalDomainsParagraph = document.createElement('p');
    externalDomainsParagraph.className = SAD_INFO_LINE_CLASS;
    externalDomainsParagraph.innerText = `${totalDomains} requests to exernal sites`;
    parent.appendChild(externalDomainsParagraph);
  });
};

/**
 * Create and append quantitative paragraph about cookies for given URL
 */
const createCookiesParagraph = (parent: HTMLElement, url: URL): void => {
  // Get cookie information from storage
  chrome.cookies.getAll({ url: url.toString() }, (cookies) => {
    // Count cookies and append information into DOM
    const totalCookies = cookies.length;
    const cookiesParagraph = document.createElement('p');
    cookiesParagraph.className = SAD_INFO_LINE_CLASS;
    cookiesParagraph.innerText = `${totalCookies} cookies stored`;
    parent.appendChild(cookiesParagraph);
  });
};

/**
 * Create the aggregated content DOM element for the given host URL
 */
const createAggregateContentDiv = (url: URL): HTMLDivElement => {
  // Create container DOM element
  const aggregateContentDiv = document.createElement('div');
  aggregateContentDiv.className = 'aggregate-content';

  // Create header
  const aggregateHeader = document.createElement('h3');
  aggregateHeader.id = 'aggregate-header';
  aggregateHeader.className = 'section-heading';
  aggregateHeader.innerHTML = `Recorded activity from all <code>${url.hostname}</code> tabs so far`;
  aggregateContentDiv.appendChild(aggregateHeader);

  // Create quantitative paragraphs
  createWebRequestsParagraph(aggregateContentDiv, url.hostname);
  createCookiesParagraph(aggregateContentDiv, url);

  return aggregateContentDiv;
};

/**
 * General entrypoint to file, generates aggregated DOM elements
 */
export const createAggregate = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Get the active tab
    const activeTab = tabs[0];
    if (!activeTab?.url) return;
    const url = new URL(activeTab.url);

    // Get the DOM container
    const aggregateDiv = document.getElementById('aggregateDiv');
    if (!aggregateDiv) return;

    // Create the aggregated content and append to DOM
    const aggregateContent = createAggregateContentDiv(url);
    aggregateDiv.appendChild(aggregateContent);
  });
};
