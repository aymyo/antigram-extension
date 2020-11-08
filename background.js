//This function adds a listener to the extension icon, that when clicked, opens directly the options page.
chrome.tabs.onActivated.addListener(function (tabs) {     chrome.pageAction.show(tabs.tabId); });
chrome.pageAction.onClicked.addListener(() => {
	chrome.runtime.openOptionsPage();
});

//Defines the default options values and saves them in the local browser storage.
let option_values = [true,true, false, false, "#fafafa", false];
chrome.storage.sync.set({options: option_values}, function() {
console.log('Initial value is set to ' + option_values);
});
