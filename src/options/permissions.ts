/**
 * Reference file providing information about all of the possible extension permissions
 */

interface PermissionDetails {
  [permission: string]: {
    title: string;
    description: string;
  };
}
export const PERMISSION_DETAILS: PermissionDetails = {
  activeTab: {
    title: 'Active Tab',
    description:
      'Active tab permission gives an extension access to the tab that is currently active. For example an ad blocker may use this to filter ads from the current active page.',
  },
  alarms: {
    title: 'Alarms',
    description:
      'Alarm permission allows an extension to schedule scripts to run at a certain time or periodically. For example, a suspending application may suspend an application for an hour after inactivity to help reduce strain on your computer and the network.',
  },
  background: {
    title: 'Background',
    description: 'The Background permission allows an extension to change the background of ChromeOS devices only.',
  },
  bookmarks: {
    title: 'Bookmarks',
    description:
      'The Bookmarks permission allows an extension to modify the bookmarks you have currently stored on your browser. For example, an extension aiming to automatically clean bookmarked pages may use this to delete bookmarks.',
  },
  browsingData: {
    title: 'Browsing Data',
    description:
      'The Browsing Data permission allows an extension to gain access to your browsing history. This may be useful for an analytical tool that aims to understand your browsing activity.',
  },
  certificateProvider: {
    title: 'Certificate Provider',
    description:
      'The Certificate Provider gives an extension access to certificates for transport layer security on ChromeOS devices only.',
  },
  clipboardRead: {
    title: 'Clipboard Read',
    description:
      "Clipboard Read allows an extension to get access to the current text stored on your device's clipboard. This is required to allow 'copy and paste' to work.",
  },
  clipboardWrite: {
    title: 'Clipboard Write',
    description:
      "Clipboard write allows an extension to get access to the device's clipboard to store text. This is required to allow 'copy and paste' to work.",
  },
  contentSettings: {
    title: 'Content Settings',
    description:
      'Content Settings permission allows a specific extension to choose to give further permissions to features like cookies, JavaScript, and plugins. For example, online games may require JavaScript to be enabled to be able to run.',
  },
  contextMenus: {
    title: 'Context Menus',
    description:
      "Context Menus gives permission to an extension to modify the contents of Chrome's context menu. This may be useful for an extension that looks to add functionality to Google Chrome.",
  },
  cookies: {
    title: 'Cookies',
    description:
      "Cookies permission allows an extension to access and modify information stored by itself and other webpages on your browser. Cookies can help store useful information to improve application's experiences however can also be used to target ads towards you through your cookie history.",
  },
  debugger: {
    title: 'Debugger',
    description:
      'The debugger permission is a tool used to monitor network interaction between one or multiple applications.',
  },
  declarativeContent: {
    title: 'Declarative Content',
    description:
      'Declarative Content permission allows extensions to take action based on the content of a loaded webpage without the need for user interaction. Ad blockers may use this to remove ads before the user even loads the page.',
  },
  declarativeNetRequest: {
    title: 'Declarative Net Request',
    description:
      'Declarative Net Request permission allows extensions to take action against network requests by block or modifying them before the webpage may view them. This allows an extension to improve privacy by completing this before they even load.',
  },
  declarativeNetRequestFeedback: {
    title: 'Declarative Net Request Feedback',
    description:
      'Declarative Net Request permission allows extensions to take action against net requests by block or modifying them before the webpage may view them. This allows an extension to improve privacy by completing this before they even load.',
  },
  declarativeWebRequest: {
    title: 'Declarative Web Request',
    description:
      'Declarative Web Request permission allows extensions to take action by modifying, blocking, or intercepting website requests in real time to improve privacy of the user.',
  },
  desktopCapture: {
    title: 'Desktop Capture',
    description:
      "Desktop Capure allows an application the ability to take a photo of the user's entire screen, individual window or tabs. A screen recorder extension may use this feature to record a specific tab.",
  },
  devtools: {
    title: 'DevTools',
    description: "Devtools allows an extension access to Chrome's builtin developer tools.",
  },
  displaySource: {
    title: 'Display Source',
    description: 'Display Source gives an application access to the source IP address of a webpage.',
  },
  dns: {
    title: 'DNS',
    description:
      "DNS gives an application access to the address of the DNS address server being used by the user's computer.",
  },
  documentScan: {
    title: 'Document Scan',
    description:
      'Document Scan gives an application the ability to discover and retrieve images from attached papers. This permission is only required for ChromeOS devices.',
  },
  downloads: {
    title: 'Downloads',
    description:
      "Download permission gives an application permission to download content to a user's device. Download may be used by a document cloud application that may require you to download stored files.",
  },
  'enterprise.deviceAttributes': {
    title: 'Enterprise: Device Attributes',
    description:
      'Device Attribute permission allows an application to collect device information such a Serial ID of a system running ChromeOS. This permission is for enterprise use only.',
  },
  'enterprise.hardwarePlatform': {
    title: 'Enterprise: Hardware Platform',
    description:
      'Hardware Platform permission allows an application to collect hardware information of a device such as manufacturer name and model. This permission is for enterprise use only.',
  },
  'enterprise.networkingAttributes': {
    title: 'Enterprise: Networking Attributes',
    description:
      'Networking Attributes permission allows an application to read information about your current network. This permission is for a device running ChromeOS. This permission is for enterprise use only.',
  },
  'enterprise.platformKeys': {
    title: 'Enterprise: Platform Keys',
    description:
      'Platform Keys permission allows an application to generate keys to further install certificates. The certificates can be used to transport layer security. This permission is for a device running ChromeOS. This permission is for enterprise use only.',
  },
  experimental: {
    title: 'Experimental',
    description: 'Experimental permission allows an application to run in an experimental mode.',
  },
  fileBrowserHandler: {
    title: 'File Browser Handler',
    description:
      'The File Browser Handler allows an application to better handle local files. This permission is for a device running ChromeOS. This could be used for file management online applications to modify local files.',
  },
  fileSystemProvider: {
    title: 'File System Provider',
    description:
      'File System Provider permission allows an application to create file systems for access through the file manager. This permission is for a device running ChromeOS.',
  },
  fontSettings: {
    title: 'Font Settings',
    description:
      "Font Settings permission allows an application to manage Chrome's font settings. This may be used by a theme to manipulate the standard font used by Chrome.",
  },
  gcm: {
    title: 'GCM',
    description:
      "GCM, or Google Cloud Messaging Service, allows an application to send or receive messages through Google's messaging service.",
  },
  geolocation: {
    title: 'Geolocation',
    description:
      "Geolocation permission allows an application to have access to the browser's current geolocation. A geo location is a location predicted based off the network you are connected to. This could be used by mapping services that may use your geo location to pinpoint you on a map.",
  },
  history: {
    title: 'History',
    description:
      "The history permission allows an application to have access to the user's browsing history. This could be used by an analytics tool that is aiming to better understand the user.",
  },
  identity: {
    title: 'Identity',
    description:
      'Identity permission allows an application setup OAuth2 access tokens. This could be used by an application to get a temporary permission to use other services without the need for an online account.',
  },
  idle: {
    title: 'Idle',
    description:
      'Idle permission allows an application to detect whether a machine is in an idle state or whether the state changes.',
  },
  idltest: {
    title: 'IDL Test',
    description: 'IDL Test permission allows an application to test the web IDL.',
  },
  login: {
    title: 'Login',
    description:
      'Login permission allows an application to request, if not already logged in, a Google Chrome login. This may be done so that information can be collected by the application.',
  },
  loginScreenStorage: {
    title: 'Login Screen Storage',
    description: 'Login Screen Storage permission allows applications to store login details.',
  },
  loginState: {
    title: 'Login State',
    description:
      'Login State permission allows an application to retrieve the current state of whether a browser is logged into Google Chrome or not.',
  },
  management: {
    title: 'Management',
    description:
      'Management permission provides ways to manage the list of extensions and applications installed and running. This may be used by an extension to help identify old extensions and help remove them.',
  },
  mdns: {
    title: 'mDNS',
    description:
      "mDNS gives an application access to the address of the DNS server being used by the user's computer on a small network.",
  },
  nativeMessaging: {
    title: 'Native Messaging',
    description:
      'Native Messaging permission allows an application to message other native applications that are registered as a native messaging host.',
  },
  'networking.config': {
    title: 'Networking: Config',
    description:
      'Networking Config permission allows an application to authenticate network connections. This could allow an application to connect an application to connect to another device.',
  },
  notifications: {
    title: 'Notifications',
    description:
      'Notification permission allows an application to show the user notifications. This could be useful to alert the user of activity on the application.',
  },
  pageCapture: {
    title: 'Page Capture',
    description: 'Page Capture permission allows an application to save a tab as a MHTML.',
  },
  platformKeys: {
    title: 'Platform Keys',
    description:
      'Platform Keys permission allows an application to generate keys to further install certificates. The certificates can be used to transport layer security. This permission is for a device running ChromeOS. This permission is for enterprise use only.',
  },
  power: {
    title: 'Power',
    description:
      "Power permission allows an application to override the system's power management feature. This could be used by extension aiming to save battery to IDLE the system after a certain amount of time.",
  },
  printerProvider: {
    title: 'Printer Provider',
    description:
      'Printer Provider allows an application to query and queue print jobs to printers managed by extensions.',
  },
  printing: {
    title: 'Printing',
    description:
      'Printing permission allows an application to queue print jobs. This permission is for a device running ChromeOS.',
  },
  printingMetrics: {
    title: 'Printing Metrics',
    description:
      'Printing Usage allows an application to retrieve printer information. This permission is for a device running ChromeOS.',
  },
  privacy: {
    title: 'Privacy',
    description: 'Privacy permission allows an application to retrieve and modify current privacy permissions.',
  },
  processes: {
    title: 'Processes',
    description: "Processes permission allows an application to interact with the browser's processes",
  },
  proxy: {
    title: 'Proxy',
    description: "Proxy permission allows an application to manage Chrome's proxy settings.",
  },
  sessions: {
    title: 'Sessions',
    description:
      'Session permission allows an application to query and restore tabs and windows from a previous browsing session.',
  },
  signedInDevices: {
    title: 'Signed In Devices',
    description:
      "Signed in Devices permission allows an application to retrieve a list of devices that are currently logged in with the same Google Chrome account. This could be used by an application to share information across all of the user's devices.",
  },
  storage: {
    title: 'Storage',
    description:
      'Storage permission allows an application to store, retriev, and track changes to user data. This is used by many applications to retrieve information stored to customise the experience to the user.',
  },
  'system.cpu': {
    title: 'System: CPU',
    description: 'System CPU permission allows an application to retrieve the CPU metadata from the system.',
  },
  'system.display': {
    title: 'System: Display',
    description: 'System Display permission allows an application to query display metadata.',
  },
  'system.memory': {
    title: 'System: Memory',
    description: 'System Memory permission allows an application to get physical memory information.',
  },
  'system.storage': {
    title: 'System: Storage',
    description:
      'System Storage permission allows an application to query a storage device and be able to notify a user when a removable storage device is connected or disconnected.',
  },
  tabCapture: {
    title: 'Tab Capture',
    description: 'Tab Capture permission allows an application to interact with tab media streams.',
  },
  tabs: {
    title: 'Tabs',
    description:
      'Tabs permission allows an application to interact with the tab management system in Chrome. The application could rearrange, modify or remove current tabs for instance.',
  },
  topSites: {
    title: 'Top Sites',
    description:
      'Top Sites permission allows an application the most visited sites by the user. These sites are currently accessible by the new tab page.',
  },
  tts: {
    title: 'TTS',
    description: "The Text to Speech permission allows for Google Chrome's TTS to be run.",
  },
  ttsEngine: {
    title: 'TTS Engine',
    description: 'The Text to Speech permission allows an application to turn a group of text into audio.',
  },
  unlimitedStorage: {
    title: 'Unlimited Storage',
    description:
      'Unlimited Storage permission allows an application to have unlimited quota for storing HTML5 client-side. Without this permission, the app is limited to 5MB.',
  },
  vpnProvider: {
    title: 'VPN Provider',
    description: 'VPN Provider allows an application to implement a VPN client.',
  },
  wallpaper: {
    title: 'Wallpaper',
    description:
      "Wallpaper permission allows an application to manage Chrome's wallpaper. This may be used by a theme to manipulate the standard wallpaper used by Chrome.",
  },
  webNavigation: {
    title: 'Web Navigation',
    description:
      'Web Navigation permission allows an application to receive notifications about the status of navigation requests in-flight.',
  },
  webRequest: {
    title: 'Web Request',
    description:
      'Web Request permission allows extensions to take action by modifying, blocking, or intercepting website requests in real time to improve privacy of the user.',
  },
  webRequestBlocking: {
    title: 'Web Request Blocking',
    description: 'Web Request blocking permission allows an application to block a web request in real time.',
  },
};
