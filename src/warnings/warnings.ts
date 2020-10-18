/**
 * Aggregate script included by warnings.html as the only script
 */

import { WEB_REQUEST_WARNINGS_KEY, WebRequestWarnings } from '../background/storage';

const queryString = document.location.search.replace(/^\??/, '');
const params = queryString.split('&').map((param) => param.split('='));
const query: { [key: string]: string } = {};
for (const [key, value] of params) {
  query[key] = value;
}
if (!query['tab'] || !query['hostname']) {
  const messageDiv: HTMLElement | null = document.getElementById('messages');
  if (messageDiv) {
    if (!query['tab']) {
      messageDiv.innerText = 'Tab ID missing';
    } else {
      messageDiv.innerText = 'Hostname missing';
    }
  }
} else {
  chrome.storage.local.get(WEB_REQUEST_WARNINGS_KEY, (items) => {
    const existingWebRequestWarnings: WebRequestWarnings = items[WEB_REQUEST_WARNINGS_KEY] ?? {};
    const existingWebRequestTabWarnings = existingWebRequestWarnings[Number(query['tab'])] ?? {};
    const existingWebRequestHostWarnings = existingWebRequestTabWarnings[query['hostname']] ?? [];
    if (!existingWebRequestHostWarnings) return;

    const warningList: HTMLElement | null = document.getElementById('warning-list');
    if (!warningList) return;
    warningList.innerText = existingWebRequestHostWarnings.map((warning) => warning.content.body).join('\n');
  });
}
