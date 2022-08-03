let DEBUG_ON = false;

//An array that will store the option values:
//[explore-toggle,suggestions-toggle,stories,color-toggle,hexadecimal color code]
let option_values;

// DOM elements that vary between pages
let mainSectionElement;
let navbarElement;
let feedBackgroundElement;

const selectNavLinkDirect = () => document.querySelector('a[href*="/direct/inbox/"]');
const selectNavLinkActivity = () => document.querySelector('a[href*="/accounts/activity"]');
const selectNavLinkExplore = () => document.querySelector('section > nav a[href*="/explore/"]');

const selectSuggestionsBox = () =>
  document.querySelector('a[href*="/explore/people/"]').closest("div").nextSibling;
const selectSuggestionsLink = () =>
  document.querySelector('a[href*="/explore/people/"]').closest("div");

const selectStoriesBox = () => document.querySelectorAll('div[role="presentation"]')[0];
const selectStoriesArrow = () =>
  document.querySelectorAll('div[role="presentation"]')[0].nextSibling;

const selectFeedBox = () => document.querySelector("article").closest("div");
const selectFeedLoader = () => document.querySelector('[data-visualcompletion="loading-state"]');

//IDEA: bloquejar crides a la API
//IDEA: injectar nou header
//IDEA: get info from github to communicate with users
//IDEA: use testing playground
//IDEA: get the selectors from a file calling an API, so we can update them quickly (might break chromes policy)

//This function gets the most recent option values
const updateOptions = () => {
  chrome.storage.sync.get(["options"], function (result) {
    option_values = result.options;
    if (DEBUG_ON) {
      console.info(option_values);
    }
    //Default initial values
    if (!option_values) {
      let option_values = [true, true, false, false, "#fafafa", false];
      chrome.storage.sync.set({ options: option_values }, function () {
        console.info("Antigram's default values set to:" + option_values);
      });
    }
  });
};

//This function blocks or shows the selected element depending on the option_value
const blockElement = (element, value) => {
  if (value && element != null) {
    element.style.display = "none";
  } else if (element != null) {
    element.style.display = "block";
  }
};

//Changes Background Color if the setting is activated / restores the original if not
const changeColor = (element, color, default_color, value) => {
  if (value && element != null) {
    element.style.backgroundColor = color;
  } else {
    element.style.backgroundColor = default_color;
  }
};

//Applies Antigram features depending on the options selected and the current path
function ApplyAntigram() {
  let path = window.location.pathname;
  updateOptions(true);

  //Where Antigram is not needed
  if (path.slice(0, 7) == "/about/" || path.slice(0, 11) == "/developer/") {
    console.info("This path does not need Antigram.");
  } //Direct Messages Section
  else if (path.slice(0, 8) == "/direct/") {
    try {
      mainSectionElement = document.body.querySelector("section > div > div:last-child > div");
      navbarElement = document.body.querySelector("section > div > div:first-child"); //div.Hz2lF

      blockElement(selectNavLinkExplore(), option_values[0]);
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
      blockElement(mainSectionElement, option_values[0]);
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
      blockElement(selectNavLinkExplore(), option_values[0]);
      blockElement(selectSuggestionsBox(), option_values[1]);
      blockElement(selectSuggestionsLink(), option_values[1]);
      blockElement(selectStoriesBox(), option_values[2]);
      blockElement(selectStoriesArrow(), option_values[2]);
      blockElement(selectFeedBox(), option_values[5]);
      blockElement(selectFeedLoader(), option_values[5]);
      changeColor(mainSectionElement, option_values[4], "#fff", option_values[3]);
      changeColor(navbarElement, option_values[4], "#fafafa", option_values[3]);
      changeColor(feedBackgroundElement, option_values[4], "#fff", option_values[3]);
      changeColor(selectStoriesBox(), option_values[4], "#fff", option_values[3]);
    } catch (error) {
      console.error("Antigram Selector Error 5 -" + error);
    }

    //General Case
  } else {
    try {
      mainSectionElement = document.body.querySelector("[role=main]");
      navbarElement = document.body.querySelector("nav > div:last-child > div"); //div.Hz2lF
      blockElement(selectNavLinkExplore(), option_values[0]);
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
