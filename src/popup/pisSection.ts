const createOptionsLink = (): void => {
  const optionsLinkElement = document.getElementById('personalInsightHeader');
  if (!optionsLinkElement) return;

  optionsLinkElement.onclick = (): void => {
    chrome.runtime.openOptionsPage();
  };
};

export const createPisSection = (): void => {
  createOptionsLink();
};
