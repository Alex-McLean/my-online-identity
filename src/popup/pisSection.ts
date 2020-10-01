/**
 * Construct all DOM elements for the Personal Insight Screen section of the popup interface
 */

/**
 * Creates a programmatic link to the options page
 */
const createOptionsLink = (): void => {
  const optionsLinkElement = document.getElementById('personalInsightHeader');
  if (!optionsLinkElement) return;

  optionsLinkElement.onclick = (): void => {
    // Link to the options page like this to get the correct canonical URL
    chrome.runtime.openOptionsPage();
  };
};

/**
 * General entrypoint to this script
 */
export const createPisSection = (): void => {
  createOptionsLink();
};
