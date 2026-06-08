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
    syncSelectAll();
  });
};

// "Select all" toggle for the Hide section. It mirrors the group's checkboxes
// (checked when all are on, half-state when only some are) and is a UI helper
// only — it is not one of the saved options.
const selectAllHide = document.getElementById("selectAllHide");
const hideChecks = Array.from(document.querySelectorAll("#hideGroup input[type=checkbox]"));

const syncSelectAll = () => {
  const checkedCount = hideChecks.filter((checkbox) => checkbox.checked).length;
  selectAllHide.checked = checkedCount === hideChecks.length;
  selectAllHide.indeterminate = checkedCount > 0 && checkedCount < hideChecks.length;
};

selectAllHide.addEventListener("change", () => {
  hideChecks.forEach((checkbox) => (checkbox.checked = selectAllHide.checked));
});
hideChecks.forEach((checkbox) => checkbox.addEventListener("change", syncSelectAll));

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
