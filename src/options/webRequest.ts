import { WebRequestHostData, WebRequestHosts } from '../backgroundWebRequest';

const sortHosts = (
  [aHostName, aHostData]: [string, WebRequestHostData],
  [bHostName, bHostData]: [string, WebRequestHostData]
): number => {
  if (aHostData.requestCount === bHostData.requestCount) {
    return aHostName.localeCompare(bHostName);
  }
  return aHostData.requestCount > bHostData.requestCount ? -1 : 1;
};

const createHostParagraph = ([hostName, hostData]: [string, WebRequestHostData]): HTMLParagraphElement => {
  const hostParagraph = document.createElement('p');
  hostParagraph.innerText = `${hostName}: ${hostData.requestCount}`;
  return hostParagraph;
};

const createResetButton = (webRequestDiv: HTMLElement): HTMLButtonElement => {
  const resetButton = document.createElement('button');
  resetButton.innerText = 'Reset Web Request Counts';
  resetButton.onclick = (): void => {
    chrome.storage.local.set({ 'webRequests.hosts': {} });
    const hostParagraphs = webRequestDiv.querySelectorAll('p');
    hostParagraphs.forEach((hostParagraph: HTMLParagraphElement) => hostParagraph.remove());
  };
  return resetButton;
};

export const constructWebRequests = (): void => {
  const webRequestDiv = document.getElementById('webRequestDiv');
  if (!webRequestDiv) return;

  chrome.storage.local.get('webRequests.hosts', (items) => {
    const currentHosts: WebRequestHosts = items['webRequests.hosts'] ?? {};
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
