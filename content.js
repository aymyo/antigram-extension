
//An array that will store the option values: 
//[explore-toggle,suggestions-toggle,stories,color-toggle,hexadecimal color code]
let option_values;

//DOM elements
let NavLinks;
let Suggestions;
let Stories;
let Main;
let Nav;
let Feed;
let FeedLoader;

//This function gets the most recent option values
function UpdateOptions(debug){
    chrome.storage.sync.get(['options'], function(result) {
        option_values = result.options;
        if(debug){console.log(option_values);}
    });}

//This function blocks or shows the selected element depending on the option_value
function BlockElement(element, value) {
    if(value && element != null){
        element.style.display= "none";
    } else if(element != null){
        element.style.display= "block";
    }
}

//Changes Background Color if the setting is activated / restores the original if not
function ChangeColor(element, color, default_color, value) {
    if(value && element != null){
        element.style.backgroundColor = color;
    } else {
        element.style.backgroundColor = default_color;
    }
}

//Applies Antigram features depending on the options selected and the current path
function ApplyAntigram() {
    let path = window.location.pathname;
    UpdateOptions(true);

    //Where Antigram is not needed
    if( path.slice(0,7) == "/about/" || path.slice(0,11) == "/developer/"){
        console.log("This path does not need Antigram.");

    }//Direct Messages Section
    else if(path.slice(0,8) == "/direct/"){ 
        try {
            NavLinks = document.body.querySelector('section > div> div:first-child > div > div:last-child > div')//div._47KiJ 
            Main = document.body.querySelector('section > div > div:last-child > div');
            Nav = document.body.querySelector('section > div > div:first-child'); //div.Hz2lF
        } catch (error) {console.log("Antigram Selector Error 2 -" + error);}
        BlockElement(NavLinks.children[2], option_values[0]);
        ChangeColor(Nav, option_values[4], "#fafafa", option_values[3]); 
        ChangeColor(Main, option_values[4], "#fff", option_values[3]);   

    //Stories Section
    } else if(path.slice(0,8) == "/stories"){
        try {
            Main = document.body.querySelector('section > div > div');
        } catch (error) {console.log("Antigram Selector Error 3 -" + error);}
        ChangeColor(Main, option_values[4], "#262626", option_values[3]);
    
    //Explore and Directory Sections
    } else if(path.slice(0,9) == "/explore/" || path.slice(0,11) == "/directory/"){
        try {
            Main = document.body.querySelector('[role=main]');
            Nav = document.body.querySelector('nav > div:last-child > div'); //div.Hz2lF
        } catch(error) {console.log("Antigram Selector Error 4 -" + error);}
        BlockElement(Main, option_values[0]);
        ChangeColor(Nav, option_values[4], "#fafafa", option_values[3]);

    //Home Section
    } else if(path == "/"){
        try {
            NavLinks = document.body.querySelector('nav > div:last-child > div > div > div:last-child > div')//div._47KiJ 
            Suggestions = document.body.querySelector('main > section > div:nth-child(3) > div:nth-child(2)') //div._8UZ6e
            Stories = document.body.querySelector('main > section > div:first-child > div:first-child') //div.VideM
            Main = document.body.querySelector('[role=main]');
            Nav = document.body.querySelector('nav > div:last-child > div'); //div.Hz2lF
            Feed = document.body.querySelector('main > section > div:first-child > div:nth-child(2)')
            FeedLoader = document.body.querySelector('main > section > div:first-child > div:nth-child(3)')
        } catch(error) {console.log("Antigram Selector Error 5 -" + error);}
        BlockElement(NavLinks.children[2], option_values[0]);
        BlockElement(Suggestions, option_values[1]);
        BlockElement(Stories, option_values[2]);
        BlockElement(Feed, option_values[5]);
        BlockElement(FeedLoader, option_values[5]);
        ChangeColor(Main, option_values[4], "#fff", option_values[3]);
        ChangeColor(Nav, option_values[4], "#fafafa", option_values[3]);
        ChangeColor(Stories, option_values[4], "#fff", option_values[3]);

    //General Case
    } else {
        try {
            NavLinks = document.body.querySelector('nav > div:last-child > div > div > div:last-child > div')//div._47KiJ 
            Main = document.body.querySelector('[role=main]');
            Nav = document.body.querySelector('nav > div:last-child > div'); //div.Hz2lF
        } catch(error) {console.log("Antigram Selector Error 1 -" + error);}
        BlockElement(NavLinks.children[2], option_values[0]);
        ChangeColor(Main, option_values[4], "#fff", option_values[3]);
        ChangeColor(Nav, option_values[4], "#fafafa", option_values[3]);
    }
}

UpdateOptions();

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