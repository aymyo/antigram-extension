// Wrap in an onInstalled callback in order to avoid unnecessary work
// every time the background script is run
chrome.runtime.onInstalled.addListener(() => {});
