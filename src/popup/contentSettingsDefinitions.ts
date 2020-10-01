export interface ContentSettingParagraphArgs {
  contentSetting: chrome.contentSettings.ContentSetting;
  label: string;
  url: URL;
  options: string[];
  hide?: boolean;
  description: string;
}

export const getContentSettingsDefinitions = (url: URL): ContentSettingParagraphArgs[] => [
  {
    contentSetting: chrome.contentSettings.cookies,
    label: 'Cookies',
    url: url,
    options: ['allow', 'block', 'session_only'],
    description:
      'A cookie is a small piece of data stored locally on your computer made by a website looking to store information. A cookie can be used to hold information, like a shopping cart, for later use. A cookie could be used by third parties to help create a more seamless experience when on the web.\nWhy Enable?: Cookies help large websites store information locally so that loading web pages can happen more quickly. Enabling cookies will allow large websites to work more effectively on your browser.\nWhy Disable?: Disabling cookies may prevent unsafe websites from picking up cookies that may be stored on your device. Advertisers may search for cookies that may exist to try to target ads towards you. If you do not trust this website, consider disabling this function.',
  },
  {
    contentSetting: chrome.contentSettings.images,
    label: 'Images',
    url: url,
    options: ['allow', 'block'],
    hide: true,
    description:
      'Images are loaded by web pages to create a more appealing website.\nWhy Enable?: Enabling images keep the webpage visually appealing as intended by the developer.\nWhy Disable?: Image can be extremely data intensive and so in large amounts of web requests, images can become time and data hungry especially when not required. Disable images to reduce the amount of data being pulled from the website and only get the important information.',
  },
  {
    contentSetting: chrome.contentSettings.javascript,
    label: 'JavaScript',
    url: url,
    options: ['allow', 'block'],
    hide: true,
    description:
      'JavaScript is a scripting language used to create more interactive web pages. JavaScript is responsible for showing the user everything from customer support messaging through to online gaming.\nWhy Enable?: Most modern websites rely heavily on JavaScript for an interactive experience between the user and the website. Enabling JavaScript keeps websites working effectively. Only enable JavaScript for websites that you trust.\nWhy Disable?: JavaScript is usually the key ingredient in popup advertisements that take away from browsing. Javascript, as powerful as it may be, can be used on phishing websites to collect your information. JavaScript could track your keystrokes and record what you type, track your browsing habits, or could manipulate other parts of your browsing experience. If you do not trust this website, consider disabling this function.',
  },
  {
    contentSetting: chrome.contentSettings.location,
    label: 'Location',
    url: url,
    options: ['allow', 'block', 'ask'],
    description:
      'Location gives you the user the ability to decide whether a website should have information on your current location. Using the internet connection you are currently connected too to browse the internet, your location can be determined either through geolocation or GPS.\nTo Enable?: Websites may require your location information to improve their websites. For instance, a website may require your location to check the stock of a product at your closest shop relevant to you. \nTo Disable?:Less than honest websites may for instance collect this instance to not be used to improve your experience but to instead target ads specific to your location. Enabling Do Not Track prevents these websites from seeing your location. Disable Location to prevent an untrustworthy website from knowing your location.',
  },
  {
    contentSetting: chrome.contentSettings.plugins,
    label: 'Plugins',
    url: url,
    options: ['allow', 'block', 'detect_important_content'],
    hide: true,
    description:
      'Plugins are extension-like applications that aim to change your web experience. A plugin may improve your experience on a specific website, like an Adobe Flash plugin to play videos.\nWhy Enable?: Plugins like adobe flash may be required for a webpage to function correctly. Lot’s of online video games require plugins like flash to function. If the website is trusted and has requested plugins to be enabled, consider enabling this.\nWhy Disable?: Plugins give way to a potential security breach where specific programs are allowed to manipulate your experience on your browser. If you do not trust this website, consider disabling this function.',
  },
  {
    contentSetting: chrome.contentSettings.popups,
    label: 'Popups',
    url: url,
    options: ['allow', 'block'],
    hide: true,
    description:
      'Popups are pages that appear when an action is clicked creating a new window or tab with different content. A popup can also be a warning message that may pop up right in front of your webpage.\nWhy Enable?: Popups can be a useful tool by website designers to warn you and direct you through their website. Popups can give important warning messages like an field has been entered incorrectly before submission of forms.\nWhy Disable?: Ever visited a questionable website where you have clicked to navigate and half a dozen ads have popped up behind in different windows? Disabling pop ups can heavily reduce ads and let you control what is displayed on your computer. If you do not trust this website, consider disabling this function.',
  },
  {
    contentSetting: chrome.contentSettings.notifications,
    label: 'Notifications',
    url: url,
    options: ['allow', 'block', 'ask'],
    hide: true,
    description:
      'Notifications allow a webpage, active or idle, to use Chrome’s notification system to grab your attention. Instant messaging websites may use this to notify you the user of a new message.\nWhy Enable?: Notifications are great for catching your attention. For websites that may be important and urgent to visit when an activity is completed on the web page, notifications are a great tool to ensure you don’t miss important events on a website.\nWhy Disable?: Notification can become overwhelming. It is in a lot of web designers best interest to make you spend as much time on their websites. Notifications can be used with bad intentions to draw you in and be distracted from other work. If you do not trust this website, consider disabling this function.',
  },
  {
    contentSetting: chrome.contentSettings.microphone,
    label: 'Microphone',
    url: url,
    options: ['allow', 'block', 'ask'],
    description:
      'Microphone permission gives a webpage access to your device’s microphone to record audio.\nWhy Enable?: For some applications online audio is crucial. A video conference requires audio for you the user to be heard by the other members. Speech to text application requires you to hear your voice to deliver on the text you are speaking.\nWhy Disable?: Some untrustworthy sites may be recording your audio without you realising. Applications may use this information to collect important information as you speak near the computer. If you do not trust this website, consider disabling this function.',
  },
  {
    contentSetting: chrome.contentSettings.unsandboxedPlugins,
    label: 'Unsandboxed Plugins',
    url: url,
    options: ['allow', 'block', 'ask'],
    hide: true,
    description:
      'Unsandboxed plugins are applications developed to modify your web experience that you are required to approve before the plugin runs. Unsandboxed plugins let you do things like stream video or install software.\nWhy Enable?: Plugins may be required for a webpage to function correctly. Lot’s of online video games require unsandboxed plugins to function. If the website is trusted and has requested plugins to be enabled, consider enabling this.\nWhy Disable?: Plugins give way to a potential security breach where specific programs are allowed to manipulate your experience on your browser. If you do not trust this website, consider disabling this function.',
  },
  {
    contentSetting: chrome.contentSettings.automaticDownloads,
    label: 'Automatic Downloads',
    url: url,
    options: ['allow', 'block', 'ask'],
    hide: true,
    description:
      'Automatic Downloads allow a website to download files to your computer without prompting you to download.\nWhy Enable?: Automatic Downloads may be useful in some instances to speed up multiple downloads. Say an application is running to download a file when a certain activity is completed. If this activity was done every few seconds, manually approving may be overwhelming.\nWhy Disable?: This isn’t required for a website to function. Automatic downloads may speed up your website experience but open your system to a potential security breach. We recommend you disable automatic downloads.',
  },
];
