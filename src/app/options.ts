import { hideElement } from "./helpers/modifiers";

//We get the elements that will trigger functions
const explore = document.getElementById("explore") as HTMLInputElement;
const suggestions = document.getElementById("suggestions") as HTMLInputElement;
const stories = document.getElementById("stories") as HTMLInputElement;
const bg_color = document.getElementById("bg_color") as HTMLInputElement;
const color = document.getElementById("color") as HTMLInputElement;
const feed = document.getElementById("feed") as HTMLInputElement;
const saved_text = document.getElementById("saved_text");

const about = document.getElementById("about_link");
const settings = document.getElementById("settings_link");
let about_showing = false;

//Updates option values to the chrome storage
function updateOptions() {
  const option_values = [
    explore.checked,
    suggestions.checked,
    stories.checked,
    color.checked,
    bg_color.value,
    feed.checked
  ];
  chrome.storage.sync.set({ options: option_values }, function () {
    console.log("Value is set to " + option_values);
  });
  if (!!saved_text) {
    saved_text.innerHTML = "(Changes were saved \u270c)";
  }
}

//Gets option values saved in chrome storage
function getOptions() {
  chrome.storage.sync.get(["options"], function (result) {
    console.log("Saved values were " + result.options);
    explore.checked = result.options[0];
    suggestions.checked = result.options[1];
    stories.checked = result.options[2];
    color.checked = result.options[3];
    bg_color.value = result.options[4];
    feed.checked = result.options[5];
  });
}

//Displays either the "Options" page or the "About" one.
function toggleAbout() {
  if (!about_showing) {
    hideElement(document.getElementById("settings_page"), true);
    hideElement(document.getElementById("about_page"), false);
    about_showing = true;
  } else {
    hideElement(document.getElementById("settings_page"), false);
    hideElement(document.getElementById("about_page"), true);
    about_showing = false;
  }
}

//Adds event listeners to all buttons
explore.addEventListener("change", updateOptions);
suggestions.addEventListener("change", updateOptions);
stories.addEventListener("change", updateOptions);
color.addEventListener("change", updateOptions);
bg_color.addEventListener("change", updateOptions);
feed.addEventListener("change", updateOptions);

settings?.addEventListener("click", toggleAbout);
about?.addEventListener("click", toggleAbout);

//Applies saved options so that the inputs show the actual values
getOptions();
