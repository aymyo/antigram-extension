const FEEDBACK_FORM_URL = "https://tally.so/r/mK8kd7";

chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.setUninstallURL(FEEDBACK_FORM_URL);
});
