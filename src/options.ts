const page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1', '#fff'];
function constructOptions(kButtonColors: string[]): void {
  for (const item of kButtonColors) {
    const button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function () {
      chrome.storage.sync.set({ color: item }, function () {
        console.log(`color is ${item}`);
      });
    });
    page?.appendChild(button);
  }
}
constructOptions(kButtonColors);
