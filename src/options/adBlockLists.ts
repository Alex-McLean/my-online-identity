/**
 * AdBlock rule processing functionality for use with EasyLists: https://easylist.to/
 * Implemented primarily by: https://github.com/talmobi/ad-block-js
 */

import * as AdBlockJS from 'ad-block-js';

export const getAdBlockClient = (list: string[]): AdBlockJS.Client => {
  const client = AdBlockJS.create();

  list.forEach((rule) => client.add(rule));

  return client;
};

export const adBlockPlusRuleMatch = (client: AdBlockJS.Client, test: URL): boolean => {
  return client.matches(test.toString());
};
