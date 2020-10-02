/**
 * Reference file providing information about all of the privacy settings visible through this extension
 */

export interface PrivacyParagraphArgs {
  setting: chrome.types.ChromeSetting;
  strings: {
    label: string;
    trueText: string;
    falseText: string;
  };
  icon: string;
  recommended: boolean;
  details: string;
  enableReasons: string;
  disableReasons: string;
}
export const PRIVACY_SETTINGS: PrivacyParagraphArgs[] = [
  {
    setting: chrome.privacy.services.autofillAddressEnabled,
    strings: {
      label: 'Address Autofill',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="colored-path" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
    recommended: false,
    details:
      'Address Autofill allows your browser to access your most recent information stored on your browser and pass this information on to the web page without you needing to re-enter manually.',
    enableReasons:
      'Address Autofill would allow forms that require your address, like a shipping address on an online purchase, fill automatically to improve your experience. Enable to improve your shopping experience on trusted websites.',
    disableReasons:
      'Address Autofill can give bad websites access to your personal address. Phishing websites may collect this information, potentially without your approval, and send this information off to third parties. If you do not trust this website, consider disabling this function.',
  },
  {
    setting: chrome.privacy.services.autofillCreditCardEnabled,
    strings: {
      label: 'Credit Card Autofill',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="colored-path" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>',
    recommended: false,
    details:
      'Credit Card Autofill allows your browser to access stored credit card information on your browser and pass this information to the website without you needing to re-enter manually.',
    enableReasons:
      'Credit Card Autofill would allow forms that require your credit card information, like online shopping, to access it quickly and improve your shopping experience.',
    disableReasons:
      'Credit Card information is important. Phishing websites may try to collect this experience without you being able to intervene. If you do not trust this website, consider disabling this function.',
  },
  {
    setting: chrome.privacy.services.safeBrowsingEnabled,
    strings: {
      label: 'Safe Browsing',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="colored-path" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>',
    recommended: true,
    details:
      "Safe Browsing is a service offered by your browser to intervene if a URL of a website is considered malicious or may be 'phishing' your personal information.",
    enableReasons:
      'Let Google help protect your web experience by letting them warn/reject web activities that may be malicious in nature.',
    disableReasons:
      "Your browser does not always get it right. Sometimes with the best intentions your browser may block something that may be at first glance dangerous but actually safe and a task that you are confident you want completed. Disable to allow your web experience to be more streamlined and less restrictive. Be confident that the web pages you're visiting and activities you are doing on the web are safe before disabling.",
  },
  {
    setting: chrome.privacy.websites.thirdPartyCookiesAllowed,
    strings: {
      label: 'Third Party Cookies',
      trueText: 'Allowed',
      falseText: 'Blocked',
    },
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"><path class="colored-path" d="M12 3a9 9 0 0 0-9 9a9 9 0 0 0 9 9a9 9 0 0 0 9-9c0-.5-.04-1-.13-1.5C20.6 10 20 10 20 10h-2V9c0-1-1-1-1-1h-2V7c0-1-1-1-1-1h-1V4c0-1-1-1-1-1M9.5 6A1.5 1.5 0 0 1 11 7.5A1.5 1.5 0 0 1 9.5 9A1.5 1.5 0 0 1 8 7.5A1.5 1.5 0 0 1 9.5 6m-3 4A1.5 1.5 0 0 1 8 11.5A1.5 1.5 0 0 1 6.5 13A1.5 1.5 0 0 1 5 11.5A1.5 1.5 0 0 1 6.5 10m5 1a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5m5 2a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5M11 16a1.5 1.5 0 0 1 1.5 1.5A1.5 1.5 0 0 1 11 19a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 11 16z"/><rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" /></svg>',
    recommended: false,
    details:
      'Third Party Cookies is the information left behind and stored on your local machine to be used by a website with a different domain.',
    enableReasons:
      'When you navigate through a website your domain changes requiring third party cookies to store information between web pages. To help the website improve your experience, leave third party cookies enabled.',
    disableReasons:
      'Disabling third party cookies may prevent unsafe websites from picking up cookies that may be stored on your device. Advertisers may search for cookies that may exist to try to target ads towards you. If you do not trust this website, consider disabling this function.',
  },
  {
    setting: chrome.privacy.websites.referrersEnabled,
    strings: {
      label: 'Referrers',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="colored-path" d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>',
    recommended: false,
    details: 'Referrers show the current webpage from which webpage you the user have just come from.',
    enableReasons:
      'Website designers require this information to help improve your web experience in the future. Also, caching can be optimised improving your experience of a website if the web page knows from which page you have visited from.',
    disableReasons:
      'Referrers leave a trail behind of where you have visited beforehand. If for instance you have just submitted sensitive information and a new page was loading, someone watching may see this information being sent to the new page and intercept this information. If you do not trust this website, consider disabling this function.',
  },
  {
    setting: chrome.privacy.websites.doNotTrackEnabled,
    strings: {
      label: 'Do Not Track',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    icon:
      '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path class="colored-path" d="M20.94 11c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06c-1.13.12-2.19.46-3.16.97l1.5 1.5C10.16 5.19 11.06 5 12 5c3.87 0 7 3.13 7 7 0 .94-.19 1.84-.52 2.65l1.5 1.5c.5-.96.84-2.02.97-3.15H23v-2h-2.06zM3 4.27l2.04 2.04C3.97 7.62 3.25 9.23 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c1.77-.2 3.38-.91 4.69-1.98L19.73 21 21 19.73 4.27 3 3 4.27zm13.27 13.27C15.09 18.45 13.61 19 12 19c-3.87 0-7-3.13-7-7 0-1.61.55-3.09 1.46-4.27l9.81 9.81z"/></svg>',
    recommended: true,
    details:
      'Do Not Track gives you the user the ability to decide whether a website should have information on your current location. Using the internet connection you are currently connected too to browse the internet, your location can be determined.',
    enableReasons:
      'Less than honest websites may for instance collect this instance to not be used to improve your experience but to instead target ads specific to your location. Enabling Do Not Track prevents these websites from seeing your location. If you do not trust this website, consider enabling this function.',
    disableReasons:
      'Websites may require your location information to improve their websites. For instance, a website may require your location to check the stock of a product at your closest shop relevant to you. Disable Do Not Track if you wish the website to have this information and the website can be trusted.',
  },
];
