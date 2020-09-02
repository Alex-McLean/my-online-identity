import { monitorCookies } from './cookies';
import { monitorRuntime } from './runtime';
import { monitorTab } from './tab';
import { monitorWebRequest } from './webRequest';

monitorRuntime();
monitorCookies();
monitorWebRequest();
monitorTab();
