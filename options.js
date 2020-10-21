
//We get the elements that will trigger functions
let explore = document.getElementById('explore');
let suggestions = document.getElementById('suggestions');
let stories = document.getElementById('stories');
let bg_color = document.getElementById('bg_color');
let color = document.getElementById('color');
let saved_text = document.getElementById('saved_text');

let about = document.getElementById('about_link');
let settings = document.getElementById('settings_link');
let about_showing = false;

//Updates option values to the chrome storage
function updateOptions() {
  let option_values = [explore.checked,suggestions.checked,stories.checked,color.checked, bg_color.value];
  chrome.storage.sync.set({options: option_values}, function() {
  console.log('Value is set to ' + option_values);
  });
  saved_text.innerHTML = "(Changes were saved \u270c)";
}

//Gets option values saved in chrome storage
function getOptions() {
  chrome.storage.sync.get(['options'], function(result) {
    console.log('Saved values were ' + result.options);
    explore.checked = result.options[0];
    suggestions.checked = result.options[1];
    stories.checked = result.options[2];
    color.checked = result.options[3];
    bg_color.value = result.options[4];
  });
}

//Displays either the "Options" page or the "About" one.
function toggleAbout() {
  if(!about_showing){
    document.getElementById('settings_page').style.display="none";
    document.getElementById('about_page').style.display="block";
    about_showing = true;
  }
  else {
    document.getElementById('settings_page').style.display="block";
    document.getElementById('about_page').style.display="none";
    about_showing = false;
  }
  
}

//Adds event listeners to all buttons
explore.addEventListener("change", updateOptions);
suggestions.addEventListener("change", updateOptions);
stories.addEventListener("change", updateOptions);
color.addEventListener("change", updateOptions);
bg_color.addEventListener("change", updateOptions);

settings.addEventListener("click", toggleAbout);
about.addEventListener("click", toggleAbout);

//Applies saved options so that the inputs show the actual values
getOptions();


