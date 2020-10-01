/**
 * Arbitrary script to execute in the context of a browser's tab
 */

window.onload = (): void => {
  window.setInterval(() => console.log('In the tab'), 5000);
};
