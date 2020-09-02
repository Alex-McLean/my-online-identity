const createCookieParagraph = (label: string, value: number): void => {
  const cookiesDiv = document.getElementById('cookiesDiv');
  if (!cookiesDiv) return;

  const cookiesParagraph = document.createElement('p');
  cookiesParagraph.innerText = `${label}: ${value}`;
  cookiesDiv.appendChild(cookiesParagraph);
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

const createCookiesHeader = (url: string): void => {
  const cookiesDiv = document.getElementById('cookiesDiv');
  if (!cookiesDiv) return;

  const cookiesHeader = document.createElement('h3');
  cookiesHeader.innerText = `Cookies stored by ${url}`;
  cookiesDiv.appendChild(cookiesHeader);
};

export const constructCookies = (): void => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab?.url) return;

    const url = new URL(activeTab.url);

    createCookiesHeader(url.hostname);

    createCookieParagraphs(url);
  });
};
