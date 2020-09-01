import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

function constructPrivacy(): void {
  chrome.privacy.services.autofillCreditCardEnabled.get({}, (details) => {
    const span = document.getElementById('autofillCreditCardEnabled');
    if (!span) return;
    span.innerText = details.value ? 'Enabled' : 'Disabled';

    const button = document.getElementById('autofillCreditCardEnabledButton');
    if (!button) return;
    button.innerText = details.value ? 'Disable' : 'Enable';
    button.onclick = () => {
      const newValue = button.innerText === 'Enable';
      chrome.privacy.services.autofillCreditCardEnabled.set({ value: newValue }, () => {
        span.innerText = newValue ? 'Enabled' : 'Disabled';
        button.innerText = newValue ? 'Disable' : 'Enable';
      });
    };
  });

  chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, (details) => {
    const span = document.getElementById('thirdPartyCookiesAllowed');
    if (!span) return;
    span.innerText = details.value ? 'Allowed' : 'Blocked';

    const button = document.getElementById('thirdPartyCookiesAllowedButton');
    if (!button) return;
    button.innerText = details.value ? 'Block' : 'Allow';
    button.onclick = () => {
      const newValue = button.innerText === 'Allow';
      chrome.privacy.websites.thirdPartyCookiesAllowed.set({ value: newValue }, () => {
        span.innerText = newValue ? 'Allowed' : 'Blocked';
        button.innerText = newValue ? 'Block' : 'Allow';
      });
    };
  });

  chrome.privacy.websites.referrersEnabled.get({}, (details) => {
    const span = document.getElementById('referrersEnabled');
    if (!span) return;
    span.innerText = details.value ? 'Enabled' : 'Disabled';

    const button = document.getElementById('referrersEnabledButton');
    if (!button) return;
    button.innerText = details.value ? 'Disable' : 'Enable';
    button.onclick = () => {
      const newValue = button.innerText === 'Enable';
      chrome.privacy.websites.referrersEnabled.set({ value: newValue }, () => {
        span.innerText = newValue ? 'Enabled' : 'Disabled';
        button.innerText = newValue ? 'Disable' : 'Enable';
      });
    };
  });

  chrome.privacy.websites.doNotTrackEnabled.get({}, (details) => {
    const span = document.getElementById('doNotTrackEnabled');
    if (!span) return;
    span.innerText = details.value ? 'Enabled' : 'Disabled';

    const button = document.getElementById('doNotTrackEnabledButton');
    if (!button) return;
    button.innerText = details.value ? 'Disable' : 'Enable';
    button.onclick = () => {
      const newValue = button.innerText === 'Enable';
      chrome.privacy.websites.doNotTrackEnabled.set({ value: newValue }, () => {
        span.innerText = newValue ? 'Enabled' : 'Disabled';
        button.innerText = newValue ? 'Disable' : 'Enable';
      });
    };
  });
}
constructPrivacy();

function constructExtensions(): void {
  const extensionsDiv = document.getElementById('extensionsDiv');
  chrome.management.getAll((extensions) => {
    extensions
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((extension) => {
        const p = document.createElement('p');
        p.id = extension.id;

        const extensionNameSpan = document.createElement('span');
        extensionNameSpan.innerText = `${extension.name}: `;
        extensionNameSpan.setAttribute('style', 'font-weight: bold;');
        p.appendChild(extensionNameSpan);

        extension.permissions.forEach((permission, index) => {
          const lastPermission = extension.permissions.length === index + 1;
          const permissionSpan = document.createElement('span');
          permissionSpan.innerText = `${permission}${lastPermission ? '' : ', '}`;
          permissionSpan.id = `${extension.id}${index}`;
          p.appendChild(permissionSpan);

          tippy(permissionSpan, {
            content: `This is some interesting information about this permission: ${permission}`,
            arrow: true,
            duration: 100,
            maxWidth: 200,
          });
        });

        extensionsDiv?.appendChild(p);
      });
  });
}
constructExtensions();
