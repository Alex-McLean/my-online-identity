import { createAccordions } from './accordion';
import { createAggregate } from './aggregate';
import { constructContentSettings } from './contentSettings';
import { constructCookies } from './cookies';
import { createPisSection } from './pisSection';
import { constructWebRequest } from './webRequest';

createAggregate();
constructContentSettings();
constructWebRequest();
constructCookies();
// createAccordions();
createPisSection();
