/**
 * Aggregate script included in the extension manifest as the only background script
 * Intended to be used as an entrypoint for executing modularised background scripts
 */

import { initialiseStorage } from './storage';
import { monitorRuntime } from './runtime';
import { monitorTab } from './tab';
import { monitorWebRequest } from './webRequest';

initialiseStorage();
monitorRuntime();
monitorWebRequest();
monitorTab();
