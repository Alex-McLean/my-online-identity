chrome.privacy.services.autofillCreditCardEnabled.get({}, (details) => {
  console.log('autofillCreditCardEnabled', details.value);
  chrome.storage.local.set({ 'privacy.autofillCreditCardEnabled': details.value });
});

chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, (details) => {
  console.log('thirdPartyCookiesAllowed', details.value);
  chrome.storage.local.set({ 'privacy.thirdPartyCookiesAllowed': details.value });
});

chrome.privacy.websites.referrersEnabled.get({}, (details) => {
  console.log('referrersEnabled', details.value);
  chrome.storage.local.set({ 'privacy.referrersEnabled': details.value });
});

chrome.privacy.websites.doNotTrackEnabled.get({}, (details) => {
  console.log('doNotTrackEnabled', details.value);
  chrome.storage.local.set({ 'privacy.doNotTrackEnabled': details.value });
});
