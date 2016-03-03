chrome.browserAction.onClicked.addListener(function(currentTab) {
  chrome.tabs.sendMessage(currentTab.id, { type: 1 })
});
