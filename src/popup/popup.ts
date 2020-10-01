/**
 * Aggregate script included by popup.html as the only script
 * Intended to be used as an entrypoint for creating modularised popup interface elements
 */

import { DEFAULT_THEME } from '../background/settingsOptions';
import { SETTINGS_THEME_KEY } from '../background/storage';
import { createAggregate } from './aggregate';
import { constructContentSettings } from './contentSettings';
import { createPisSection } from './pisSection';
import { constructWebRequest } from './webRequest';

// Get the user's theme settings from storage before generating UI
chrome.storage.local.get(SETTINGS_THEME_KEY, (items) => {
  const theme = items[SETTINGS_THEME_KEY] ?? DEFAULT_THEME;

  // Set the user's theme on the HTML body
  const body = document.getElementById('body');
  if (!body) return;
  body.className = theme;

  // Construct UI components
  createAggregate();
  constructContentSettings();
  constructWebRequest();
  createPisSection();
});
