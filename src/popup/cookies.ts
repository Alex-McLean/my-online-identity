const createCookieParagraph = (label: string, value: number): void => {
  const cookiesContentDiv = document.getElementById('cookiesContent');
  if (!cookiesContentDiv) return;

  const cookiesParagraph = document.createElement('p');
  cookiesParagraph.innerText = `${label}: ${value}`;
  cookiesContentDiv.appendChild(cookiesParagraph);
};

const createCookieParagraphs = (url: URL): void => {
  chrome.cookies.getAll({ url: url.toString() }, (cookies) => {
    const totalCookies = cookies.length;
    createCookieParagraph('Total', totalCookies);

    const insecureCookies = cookies.filter((c) => !c.secure).length;
    createCookieParagraph('Insecure', insecureCookies);

    const notHttpOnlyCookies = cookies.filter((c) => !c.httpOnly).length;
    createCookieParagraph('Not HTTP Only', notHttpOnlyCookies);

    const notSameSite = cookies.filter((c) => !c.httpOnly).length;
    createCookieParagraph('Not Same Site', notSameSite);
  });
};

const updateCookiesHeader = (url: string): void => {
  const cookiesHeader = document.getElementById('cookiesHeader');
  if (!cookiesHeader) return;
  cookiesHeader.innerText = `Cookies stored by ${url}`;
};

export const constructCookies = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url) return;

    const url = new URL(activeTab.url);

    updateCookiesHeader(url.hostname);

    createCookieParagraphs(url);
  });
};
