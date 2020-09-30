export const createPisSection = (): void => {
  const contentOne = document.getElementById('content-1');
  const contentTwo = document.getElementById('content-2');
  const pisCallToAction = document.getElementById('pisCallToAction');

  if (pisCallToAction) {
    pisCallToAction.onclick = (): void => {
      if (!contentOne || !contentTwo) return;
      contentOne.className = `${contentOne.className} hidden`;
      contentTwo.className = contentTwo.className.replace('hidden', '');
    };
  }

  const pisFooterCallToAction = document.getElementById('pisFooterCallToAction');
  if (pisFooterCallToAction) {
    pisFooterCallToAction.onclick = (): void => {
      if (!contentOne || !contentTwo) return;
      contentOne.className = contentOne.className.replace('hidden', '');
      contentTwo.className = `${contentTwo.className} hidden`;
    };
  }
};
