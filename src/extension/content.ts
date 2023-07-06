import { getStoredSettings } from "../storage";
import { hideElement, hidePosts, changeColor } from "./helpers/modifiers";
import * as select from "./helpers/selectors";

const DEBUG_ON = false;

// DOM elements that vary between pages
let mainSectionElement: HTMLElement | null;
let navbarElement: HTMLElement | null;
let feedBackgroundElement: HTMLElement | null;

//This function gets the most recent option values

//Applies Antigram features depending on the options selected and the current path
async function ApplyAntigram() {
  const settings = await getStoredSettings();
  const path = window.location.pathname;

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
      hideElement(exploreLinkInDirectPage, settings.hideExplore);
      changeColor(navbarElement, settings.bgColor, "#fafafa");
      changeColor(mainSectionElement, settings.bgColor, "#fff");
    } catch (error) {
      console.error("Antigram Selector Error 2 -" + error);
    }

    //Stories Section
  } else if (path.slice(0, 8) == "/stories") {
    try {
      mainSectionElement = document.body.querySelector("section > div > div");
      changeColor(mainSectionElement, settings.bgColor, "#262626");
    } catch (error) {
      console.error("Antigram Selector Error 3 -" + error);
    }

    //Explore and Directory Sections
  } else if (path.slice(0, 9) == "/explore/" || path.slice(0, 11) == "/directory/") {
    try {
      mainSectionElement = document.body.querySelector("[role=main]");
      navbarElement = document.body.querySelector("nav > div:last-child > div"); //div.Hz2lF
      hideElement(mainSectionElement, settings.hideExplore);
      changeColor(navbarElement, settings.bgColor, "#fafafa");
    } catch (error) {
      console.error("Antigram Selector Error 4 -" + error);
    }

    //Home Section
  } else if (path == "/") {
    try {
      mainSectionElement = document.body.querySelector("[role=main]");
      navbarElement = document.body.querySelector("nav > div:last-child > div"); //div.Hz2lF
      feedBackgroundElement = document.querySelector("main section div");
      hideElement(select.navLinkExplore(), settings.hideExplore);
      hideElement(select.suggestionsBox(), settings.hideSuggestions);
      hideElement(select.suggestionsLink(), settings.hideSuggestions);
      hideElement(select.storiesBox(), settings.hideStories);
      hideElement(select.storiesArrow(), settings.hideStories);
      hideElement(select.feedBox(), settings.hideFeed);
      hideElement(select.feedLoader(), settings.hideFeed);

      // hidePosts(select.sponsoredPosts(), settings.hideSponsoredPosts);

      changeColor(mainSectionElement, settings.bgColor, "#fff");
      changeColor(navbarElement, settings.bgColor, "#fafafa");
      changeColor(feedBackgroundElement, settings.bgColor, "#fff");
    } catch (error) {
      console.error("Antigram Selector Error 5 -" + error);
    }

    //General Case
  } else {
    try {
      mainSectionElement = document.body.querySelector("[role=main]");
      navbarElement = document.body.querySelector("nav > div:last-child > div"); //div.Hz2lF
      hideElement(select.navLinkExplore(), settings.hideExplore);
      changeColor(mainSectionElement, settings.bgColor, "#fff");
      changeColor(navbarElement, settings.bgColor, "#fafafa");
    } catch (error) {
      console.error("Antigram Selector Error 1 -" + error);
    }
  }
}

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

