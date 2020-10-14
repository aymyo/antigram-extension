chrome.tabs.onActivated.addListener(function (tabs) {     chrome.pageAction.show(tabs.tabId); });
chrome.pageAction.onClicked.addListener(() => {
	chrome.runtime.openOptionsPage();
});

let option_values = [true,true, false, false, "#fafafa"];
chrome.storage.sync.set({options: option_values}, function() {
console.log('Initial value is set to ' + option_values);
});

//test