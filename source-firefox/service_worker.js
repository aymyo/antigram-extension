const FEEDBACK_FORM_URL = "https://tally.so/r/mK8kd7?agent=firefox";

firefox.runtime.onInstalled.addListener(() => {
  firefox.runtime.setUninstallURL(FEEDBACK_FORM_URL);
});
