import renderStream from './popup.js'

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "extension Aika",
    "title": "Aika Alert",
    "contexts": ["selection"]
  });
});

let i = 0

setInterval( () => {
  i = i+1
  console.log(i)
}, 1000)

setInterval(async () => {
  const data = await renderStream()

  console.log(data)
}, 60000);


