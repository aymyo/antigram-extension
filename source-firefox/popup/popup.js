import { labelsArray } from "../modules/lib.js";

// Saving and loading options from storage
const saveOptions = () => {
  const options = {};

  for (const label of labelsArray) {
    const element = document.getElementById(label);
    if (element !== null) {
      options[label] = element.checked;
    }
  }

  const onSet = () => {
    const status = document.getElementById("status");
    status.textContent = "Saved! ✌️ Refresh to apply";
    const intervalId = setInterval(() => {
      status.textContent = "";
      clearInterval(intervalId);
    }, 2000);
    console.log(chrome.storage.sync.get(options));
  };

  chrome.storage.sync.set(options, onSet);
};

const restoreOptions = () => {
  chrome.storage.sync.get(labelsArray, (items) => {
    for (const key of Object.keys(items)) {
      document.getElementById(key).checked = items[key];
    }
  });
};

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);

// Managing tab navigation
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => tabContent.classList.remove("active"));
    tabs.forEach((tab) => tab.classList.remove("active"));

    tab.classList.add("active");
    target.classList.add("active");
  });
});
