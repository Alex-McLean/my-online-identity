export interface PrivacyParagraphArgs {
  setting: chrome.types.ChromeSetting;
  strings: {
    label: string;
    trueText: string;
    falseText: string;
  };
  recommended: boolean;
  details: string;
}

export const PRIVACY_SETTINGS: PrivacyParagraphArgs[] = [
  {
    setting: chrome.privacy.services.autofillAddressEnabled,
    strings: {
      label: 'Address Autofill',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    recommended: false,
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    setting: chrome.privacy.services.autofillCreditCardEnabled,
    strings: {
      label: 'Credit Card Autofill',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    recommended: false,
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    setting: chrome.privacy.services.safeBrowsingEnabled,
    strings: {
      label: 'Safe Browsing Enabled',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    recommended: true,
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    setting: chrome.privacy.websites.thirdPartyCookiesAllowed,
    strings: {
      label: 'Third Party Cookies',
      trueText: 'Allowed',
      falseText: 'Blocked',
    },
    recommended: false,
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    setting: chrome.privacy.websites.referrersEnabled,
    strings: {
      label: 'Referrers',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    recommended: false,
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    setting: chrome.privacy.websites.doNotTrackEnabled,
    strings: {
      label: 'Do Not Track',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    recommended: true,
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];
