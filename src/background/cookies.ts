export const monitorCookies = (): void => {
  chrome.cookies.onChanged.addListener((changeInfo) => {
    console.log('cookies changed', changeInfo);
  });
};
