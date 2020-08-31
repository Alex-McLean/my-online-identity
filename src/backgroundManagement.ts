chrome.management.getAll((extensions) => {
  console.log('extensions installed', extensions);
  chrome.storage.local.set({ 'management.extensions': extensions });
});
