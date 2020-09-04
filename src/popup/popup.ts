import { createAccordions } from './accordion';
import { constructContentSettings } from './contentSettings';
import { constructCookies } from './cookies';
import { constructWebRequest } from './webRequest';

constructContentSettings();
constructWebRequest();
constructCookies();
createAccordions();
