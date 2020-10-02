/**
 * Aggregate script included by options.html as the only script
 * Intended to be used as an entrypoint for creating modularised options interface elements
 */

import { DEFAULT_THEME, ThemeValue } from '../background/settingsOptions';
import { SETTINGS_THEME_KEY } from '../background/storage';
import { constructExtensions } from './extensions';
import { constructNav } from './nav';
import { constructPrivacy } from './privacy';
import { constructSettings } from './settings';

// Get the user's theme settings from storage before generating UI
chrome.storage.local.get(SETTINGS_THEME_KEY, (items) => {
  const theme: ThemeValue = items[SETTINGS_THEME_KEY] ?? DEFAULT_THEME;

  // Set the user's theme on the HTML body
  const body = document.getElementById('body');
  if (!body) return;
  body.className = theme;

  // Construct UI components
  constructNav();
  constructPrivacy(theme);
  constructExtensions();
  constructSettings();
});
