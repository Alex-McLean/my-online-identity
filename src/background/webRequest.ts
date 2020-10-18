/**
 * This script monitors the web request activity of the user's browser
 */

import * as AdBlockJS from 'ad-block-js';
import { adBlockPlusRuleMatch, getAdBlockClient } from '../options/adBlockLists';
import { EASY_PRIVACY } from '../options/easyPrivacy';
import { DEFAULT_ALLOW_LIST, DEFAULT_BLOCK_LIST } from '../options/hostLists';
import { matchesRegexList } from '../options/regexLists';
import {
  WEB_REQUEST_COUNT_KEY,
  WEB_REQUEST_HOSTS_KEY,
  WEB_REQUEST_INITIATORS_KEY,
  WEB_REQUEST_WARNINGS_KEY,
  WEB_REQUEST_BLOCK_LIST_KEY,
  WEB_REQUEST_ALLOW_LIST_KEY,
  WebRequestHosts,
  WebRequestInitiators,
  WebRequestWarnings,
  WebRequestWarning,
} from './storage';

/**
 * Increment the stored number of total network requests
 */
const countRequest = (): void => {
  // Get current count from storage
  chrome.storage.local.get(WEB_REQUEST_COUNT_KEY, (items) => {
    // Increment count from storage and save back to storage
    const currCount = items[WEB_REQUEST_COUNT_KEY] ?? 0;
    chrome.storage.local.set({ [WEB_REQUEST_COUNT_KEY]: currCount + 1 });
  });
};

/**
 * Increment the stored number of network requests by the given URL's host
 */
const countHostRequest = (url: URL): void => {
  // Get current count from storage for given host
  chrome.storage.local.get(WEB_REQUEST_HOSTS_KEY, (items) => {
    // Increment count from storage for given host and save back to storage
    const currentHosts: WebRequestHosts = items[WEB_REQUEST_HOSTS_KEY] ?? {};
    const currentHost = currentHosts[url.hostname] ?? { requestCount: 0 };
    chrome.storage.local.set({
      [WEB_REQUEST_HOSTS_KEY]: {
        ...currentHosts,
        [url.hostname]: {
          ...currentHost,
          requestCount: currentHost.requestCount + 1,
        },
      },
    });
  });
};

/**
 * Increment the stored number of network requests between the hosts of the given URL's
 */
const countInitiatorRequest = (initiatorUrl: URL, destinationUrl: URL): void => {
  // Get current count from storage for given host-initiator combo
  chrome.storage.local.get(WEB_REQUEST_INITIATORS_KEY, (items) => {
    // Increment count from storage for given host-initiator combo and save back to storage
    const currentInitiators: WebRequestInitiators = items[WEB_REQUEST_INITIATORS_KEY] ?? {};
    const currentInitiator = currentInitiators[initiatorUrl.hostname] ?? {};
    const currentInitiatorDestination = currentInitiator[destinationUrl.hostname] ?? { requestCount: 0 };
    chrome.storage.local.set({
      [WEB_REQUEST_INITIATORS_KEY]: {
        ...currentInitiators,
        [initiatorUrl.hostname]: {
          ...currentInitiator,
          [destinationUrl.hostname]: {
            requestCount: currentInitiatorDestination.requestCount + 1,
          },
        },
      },
    });
  });
};

/**
 * Add detected web request warning to storage for the given tab
 */
const addWarning = (tabId: number, host: string, warning: WebRequestWarning): void => {
  // Get existing warnings from storage
  chrome.storage.local.get(WEB_REQUEST_WARNINGS_KEY, (items) => {
    // Add given warning to given tab and save back to storage
    const existingWebRequestWarnings: WebRequestWarnings = items[WEB_REQUEST_WARNINGS_KEY] ?? {};
    const existingWebRequestTabWarnings = existingWebRequestWarnings[tabId] ?? {};
    const existingWebRequestHostWarnings = existingWebRequestTabWarnings[host] ?? [];

    chrome.storage.local.set({
      [WEB_REQUEST_WARNINGS_KEY]: {
        ...existingWebRequestWarnings,
        [tabId]: {
          ...existingWebRequestTabWarnings,
          [host]: [...existingWebRequestHostWarnings, warning],
        },
      },
    });
  });
};

/**
 * Check the given web request information against the user's set host lists
 * Adds a warning to storage upon violation
 */
const checkAgainstHostLists = (
  initiatorUrl: URL,
  destinationUrl: URL,
  details: chrome.webRequest.WebResponseCacheDetails,
  adBlockClient: AdBlockJS.Client
): void => {
  // Get the users list of blocked hosts
  chrome.storage.local.get(WEB_REQUEST_BLOCK_LIST_KEY, (items) => {
    const blockList: string[] = items[WEB_REQUEST_BLOCK_LIST_KEY] ?? DEFAULT_BLOCK_LIST;
    // Combine the hardcoded list of hosts with the user's list
    const fullBlockList = [...blockList];

    // Check for a match on the block list
    const blockListMatch =
      matchesRegexList(fullBlockList, destinationUrl) || adBlockPlusRuleMatch(adBlockClient, destinationUrl);
    if (!blockListMatch) return;

    // Block list match found, check user's allow list before adding warning
    chrome.storage.local.get(WEB_REQUEST_ALLOW_LIST_KEY, (items) => {
      const allowList: string[] = items[WEB_REQUEST_ALLOW_LIST_KEY] ?? DEFAULT_ALLOW_LIST;

      // Check for a match on the allow list
      const allowListMatch = matchesRegexList(allowList, initiatorUrl);
      if (allowListMatch) return;

      // Block list match found, no allow list match found, add warning to storage
      addWarning(details.tabId, initiatorUrl.hostname, {
        content: {
          body: `Outbound network request sent to ${destinationUrl.hostname}`,
        },
      });
    });
  });
};

/** Allow GET and HEAD to avoid false positives in requests for images/fonts/etc. */
const ALLOWED_INSECURE_METHODS = ['GET', 'HEAD'];

/**
 * Check for a mismatch in protocol across either end of a network request
 * Adds a warning to storage upon violation
 */
const checkForInsecurePost = (
  initiatorUrl: URL,
  destinationUrl: URL,
  details: chrome.webRequest.WebResponseCacheDetails
): void => {
  const initiatorSecure = initiatorUrl.protocol === 'https:';
  const destinationSecure = destinationUrl.protocol === 'https:';

  // Check for mismatch
  if (initiatorSecure === destinationSecure) return;

  // Check for allowed method in case of mismatch
  if (ALLOWED_INSECURE_METHODS.includes(details.method)) return;

  // Add warning for mismatch
  addWarning(details.tabId, initiatorUrl.hostname, {
    content: {
      body: `Mismatch in network protocols making a ${details.method} request to ${destinationUrl.hostname}`,
    },
  });
};

/**
 * Entrypoint for all web request analysis aimed at identifying any potential warnings for the user
 */
const checkForWarnings = (
  initiatorUrl: URL,
  destinationUrl: URL,
  details: chrome.webRequest.WebResponseCacheDetails,
  adBlockClient: AdBlockJS.Client
): void => {
  checkAgainstHostLists(initiatorUrl, destinationUrl, details, adBlockClient);
  checkForInsecurePost(initiatorUrl, destinationUrl, details);
};

/**
 * General entrypoint to this script
 */
export const monitorWebRequest = (): void => {
  // Instantiate Ad Block list processor
  const adBlockClient = getAdBlockClient(EASY_PRIVACY);

  // Add listener that captures all network requests before they are sent over the wire, for all URLs
  chrome.webRequest.onCompleted.addListener(
    (details) => {
      if (details.statusCode >= 400 && details.statusCode <= 599) {
        // client (4xx) or server (5xx) error
        return;
      }
      const url = new URL(details.url);
      const initiatorUrl = details.initiator ? new URL(details.initiator) : undefined;

      countRequest();
      countHostRequest(url);
      if (initiatorUrl) countInitiatorRequest(initiatorUrl, url);
      if (initiatorUrl) checkForWarnings(initiatorUrl, url, details, adBlockClient);
    },
    { urls: ['<all_urls>'] }
  );
};
