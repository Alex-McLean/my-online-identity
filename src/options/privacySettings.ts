export interface PrivacyParagraphArgs {
  setting: chrome.types.ChromeSetting;
  strings: {
    label: string;
    trueText: string;
    falseText: string;
  };
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
      label: 'Safe Browsing Enabled',
      trueText: 'Enabled',
      falseText: 'Disabled',
    },
    recommended: true,
    details:
      'Safe Browsing is a service offered by your browser to intervene if a URL of a website is considered malicious or may be ‘phishing’ your personal information.',
    enableReasons:
      'Let Google help protect your web experience by letting them warn/reject web activities that may be malicious in nature.',
    disableReasons:
      'Your browser does not always get it right. Sometimes with the best intentions your browser may block something that may be at first glance dangerous but actually safe and a task that you are confident you want completed. Disable to allow your web experience to be more streamlined and less restrictive. Be confident that the web pages you’re visiting and activities you are doing on the web are safe before disabling.',
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
    recommended: true,
    details:
      'Do Not Track gives you the user the ability to decide whether a website should have information on your current location. Using the internet connection you are currently connected too to browse the internet, your location can be determined.',
    enableReasons:
      'Less than honest websites may for instance collect this instance to not be used to improve your experience but to instead target ads specific to your location. Enabling Do Not Track prevents these websites from seeing your location. If you do not trust this website, consider enabling this function.',
    disableReasons:
      'Websites may require your location information to improve their websites. For instance, a website may require your location to check the stock of a product at your closest shop relevant to you. Disable Do Not Track if you wish the website to have this information and the website can be trusted.',
  },
];
