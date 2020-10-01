import { DEFAULT_THEME } from '../background/defaultSettings';
import { SETTINGS_THEME_KEY } from '../options/settings';
import { createAggregate } from './aggregate';
import { constructContentSettings } from './contentSettings';
import { constructCookies } from './cookies';
import { createPisSection } from './pisSection';
import { constructWebRequest } from './webRequest';

chrome.storage.local.get(SETTINGS_THEME_KEY, (items) => {
  const theme = items[SETTINGS_THEME_KEY] ?? DEFAULT_THEME;

  const body = document.getElementById('body');
  if (!body) return;
  body.className = theme;

  createAggregate();
  constructContentSettings();
  constructWebRequest();
  constructCookies();
  createPisSection();
});
