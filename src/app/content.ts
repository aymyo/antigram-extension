import { hideElement, changeColor } from "./helpers/modifiers";
import * as select from "./helpers/selectors";

const DEBUG_ON = false;

//An array that will store the option values:
//[explore-toggle,suggestions-toggle,stories,color-toggle,hexadecimal color code]
let option_values: (string | boolean)[];

// DOM elements that vary between pages
let mainSectionElement: HTMLElement | null;
let navbarElement: HTMLElement | null;
let feedBackgroundElement: HTMLElement | null;

//This function gets the most recent option values
const updateOptions = () => {
  chrome.storage.sync.get(["options"], function (result) {
    option_values = result.options;
    if (DEBUG_ON) {
      console.info("Current options", option_values);
    }
    //Default initial values
    if (!option_values) {
      const option_values = [true, true, false, false, "#fafafa", false];
      chrome.storage.sync.set({ options: option_values }, function () {
        console.info("Antigram's default values set to:" + option_values);
      });
    }
  });
};

//Applies Antigram features depending on the options selected and the current path
function ApplyAntigram() {
  const path = window.location.pathname;
  updateOptions();

  //Where Antigram is not needed
  if (path.slice(0, 7) == "/about/" || path.slice(0, 11) == "/developer/") {
    console.info("This path does not need Antigram.");
  } //Direct Messages Section
  else if (path.slice(0, 8) == "/direct/") {
    try {
      mainSectionElement = document.body.querySelector("section > div > div:last-child > div");
      navbarElement = document.body.querySelector("section > div > div:first-child"); //div.Hz2lF
      const exploreLinkInDirectPage: HTMLElement | null = document.querySelector(
        'section a[href*="/explore/"]'
      );
      hideElement(exploreLinkInDirectPage, option_values[0]);
      changeColor(navbarElement, option_values[4], "#fafafa", option_values[3]);
      changeColor(mainSectionElement, option_values[4], "#fff", option_values[3]);
    } catch (error) {
      console.error("Antigram Selector Error 2 -" + error);
    }

    //Stories Section
  } else if (path.slice(0, 8) == "/stories") {
    try {
      mainSectionElement = document.body.querySelector("section > div > div");
      changeColor(mainSectionElement, option_values[4], "#262626", option_values[3]);
    } catch (error) {
      console.error("Antigram Selector Error 3 -" + error);
    }

    //Explore and Directory Sections
  } else if (path.slice(0, 9) == "/explore/" || path.slice(0, 11) == "/directory/") {
    try {
      mainSectionElement = document.body.querySelector("[role=main]");
      navbarElement = document.body.querySelector("nav > div:last-child > div"); //div.Hz2lF
      hideElement(mainSectionElement, option_values[0]);
      changeColor(navbarElement, option_values[4], "#fafafa", option_values[3]);
    } catch (error) {
      console.error("Antigram Selector Error 4 -" + error);
    }

    //Home Section
  } else if (path == "/") {
    try {
      mainSectionElement = document.body.querySelector("[role=main]");
      navbarElement = document.body.querySelector("nav > div:last-child > div"); //div.Hz2lF
      feedBackgroundElement = document.querySelector("main section div");
      hideElement(select.navLinkExplore(), option_values[0]);
      hideElement(select.suggestionsBox(), option_values[1]);
      hideElement(select.suggestionsLink(), option_values[1]);
      hideElement(select.storiesBox(), option_values[2]);
      hideElement(select.storiesArrow(), option_values[2]);
      hideElement(select.feedBox(), option_values[5]);
      hideElement(select.feedLoader(), option_values[5]);
      changeColor(mainSectionElement, option_values[4], "#fff", option_values[3]);
      changeColor(navbarElement, option_values[4], "#fafafa", option_values[3]);
      changeColor(feedBackgroundElement, option_values[4], "#fff", option_values[3]);
    } catch (error) {
      console.error("Antigram Selector Error 5 -" + error);
    }

    //General Case
  } else {
    try {
      mainSectionElement = document.body.querySelector("[role=main]");
      navbarElement = document.body.querySelector("nav > div:last-child > div"); //div.Hz2lF
      hideElement(select.navLinkExplore(), option_values[0]);
      changeColor(mainSectionElement, option_values[4], "#fff", option_values[3]);
      changeColor(navbarElement, option_values[4], "#fafafa", option_values[3]);
    } catch (error) {
      console.error("Antigram Selector Error 1 -" + error);
    }
  }
}

updateOptions();

//Applies the changes whenever the options are modified
chrome.storage.onChanged.addListener(ApplyAntigram);

// We call the function periodically and after a delay to let the components load.
// TO DO: think for a more efficient way to do this.
setInterval(ApplyAntigram, 1000);

/*
let applyCallInterval = setInterval(ApplyAntigram, 500); 

window.addEventListener('load', () => {
    ApplyAntigram();
    clearInterval(applyCallInterval);
});
*/
