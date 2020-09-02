import { WEB_REQUEST_HOSTS_KEY, WebRequestHost, WebRequestHosts } from '../background/webRequest';

const sortHosts = (
  [aHostName, aHost]: [string, WebRequestHost],
  [bHostName, bHost]: [string, WebRequestHost]
): number => {
  if (aHost.requestCount === bHost.requestCount) {
    return aHostName.localeCompare(bHostName);
  }
  return aHost.requestCount > bHost.requestCount ? -1 : 1;
};

const createHostParagraph = ([hostName, hostData]: [string, WebRequestHost]): HTMLParagraphElement => {
  const hostParagraph = document.createElement('p');
  hostParagraph.innerText = `${hostName}: ${hostData.requestCount}`;
  return hostParagraph;
};

const createResetButton = (webRequestDiv: HTMLElement): HTMLButtonElement => {
  const resetButton = document.createElement('button');
  resetButton.innerText = 'Reset Web Request Counts';
  resetButton.onclick = (): void => {
    chrome.storage.local.set({ [WEB_REQUEST_HOSTS_KEY]: {} });
    const hostParagraphs = webRequestDiv.querySelectorAll('p');
    hostParagraphs.forEach((hostParagraph: HTMLParagraphElement) => hostParagraph.remove());
  };
  return resetButton;
};

export const constructWebRequest = (): void => {
  const webRequestDiv = document.getElementById('webRequestDiv');
  if (!webRequestDiv) return;

  chrome.storage.local.get(WEB_REQUEST_HOSTS_KEY, (items) => {
    const currentHosts: WebRequestHosts = items[WEB_REQUEST_HOSTS_KEY] ?? {};
    Object.entries(currentHosts)
      .sort(sortHosts)
      .forEach((host) => {
        const hostParagraph = createHostParagraph(host);
        webRequestDiv.appendChild(hostParagraph);
      });

    const resetButton = createResetButton(webRequestDiv);
    webRequestDiv.appendChild(resetButton);
  });
};
