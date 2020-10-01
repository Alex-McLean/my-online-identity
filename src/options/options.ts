import { DEFAULT_THEME } from '../background/defaultSettings';
import { constructExtensions } from './extensions';
import { constructNav } from './nav';
import { constructPrivacy } from './privacy';
import { constructSettings, SETTINGS_THEME_KEY } from './settings';

chrome.storage.local.get(SETTINGS_THEME_KEY, (items) => {
  const theme = items[SETTINGS_THEME_KEY] ?? DEFAULT_THEME;

  const body = document.getElementById('body');
  if (!body) return;
  body.className = theme;

  constructNav();
  constructPrivacy();
  constructExtensions();
  constructSettings();
});
