function constructPrivacy(): void {
  const privacyDiv = document.getElementById('privacyDiv');
  const storageItems = [
    'privacy.autofillCreditCardEnabled',
    'privacy.thirdPartyCookiesAllowed',
    'privacy.referrersEnabled',
    'privacy.doNotTrackEnabled',
  ];
  chrome.storage.local.get(storageItems, (items) => {
    Object.entries(items).forEach(([key, value]) => {
      const p = document.createElement('p');
      p.innerText = `${key}: ${value}`;
      privacyDiv?.appendChild(p);
    });
  });
}
constructPrivacy();

function constructExtensions(): void {
  const extensionsDiv = document.getElementById('extensionsDiv');
  chrome.storage.local.get('management.extensions', (items) => {
    const extensions = items['management.extensions'] as chrome.management.ExtensionInfo[];
    extensions.forEach((extension) => {
      const p = document.createElement('p');
      p.innerText = `${extension.name}: ${extension.permissions.join(', ')}`;
      extensionsDiv?.appendChild(p);
    });
  });
}
constructExtensions();
