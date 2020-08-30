chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log('storage changed', changes, areaName);
});
