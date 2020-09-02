import {
  WEB_REQUEST_INITIATORS_KEY,
  WebRequestInitiatorDestination,
  WebRequestInitiators,
} from '../background/webRequest';

const sortDestinations = (
  [aDestinationName, aDestination]: [string, WebRequestInitiatorDestination],
  [bDestinationName, bDestinations]: [string, WebRequestInitiatorDestination]
): number => {
  if (aDestination.requestCount === bDestinations.requestCount) {
    return aDestinationName.localeCompare(bDestinationName);
  }
  return aDestination.requestCount > bDestinations.requestCount ? -1 : 1;
};

const createDestinationParagraph = ([destinationName, destination]: [
  string,
  WebRequestInitiatorDestination
]): HTMLParagraphElement => {
  const destinationParagraph = document.createElement('p');
  destinationParagraph.innerText = `${destinationName}: ${destination.requestCount}`;
  return destinationParagraph;
};

const createDestinationParagraphs = (initiator: string): void => {
  const webRequestDiv = document.getElementById('webRequestDiv');
  if (!webRequestDiv) return;

  chrome.storage.local.get(WEB_REQUEST_INITIATORS_KEY, (items) => {
    const currentInitiators: WebRequestInitiators = items[WEB_REQUEST_INITIATORS_KEY] ?? {};
    const currentInitiator = currentInitiators[initiator] ?? {};

    Object.entries(currentInitiator)
      .sort(sortDestinations)
      .forEach((initiator) => {
        const destinationParagraph = createDestinationParagraph(initiator);
        webRequestDiv.appendChild(destinationParagraph);
      });
  });
};

const createWebRequestHeader = (url: string): void => {
  const webRequestDiv = document.getElementById('webRequestDiv');
  if (!webRequestDiv) return;

  const webRequestHeader = document.createElement('h3');
  webRequestHeader.innerText = `Outbound requests for ${url}`;
  webRequestDiv.appendChild(webRequestHeader);
};

export const constructWebRequest = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url) return;

    const url = new URL(activeTab.url);

    createWebRequestHeader(url.hostname);
    createDestinationParagraphs(url.hostname);
  });
};
