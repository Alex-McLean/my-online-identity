const changeColor = document.getElementById('changeColor');

if (changeColor) {
  chrome.storage.sync.get('color', (data) => {
    if (!changeColor) return;
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
  });

  changeColor.onclick = function (): void {
    const color = changeColor?.getAttribute('value') ?? '#fff';
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(tabs[0].id as number, {
        code: `document.body.style.backgroundColor = "${color}";`,
      });
      chrome.tabs.executeScript(tabs[0].id as number, {
        code: `console.log("Changed background color to ${color}");`,
      });
    });
  };
}
