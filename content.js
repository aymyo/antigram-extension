
//An array that will store the option values: 
//[explore-toggle,suggestions-toggle,stories,color-toggle,hexadecimal color code]
let option_values;

let NavLinks;
let Suggestions;
let Stories;
let Main;
let Nav;

//Applies the changes whenever the options are modified
chrome.storage.onChanged.addListener(ApplyAntigram);

//This function checks if the path the user is in needs to apply Antigram or not
function CheckPath(){
    if( window.location.pathname.slice(0,7) == "/about/" ||
        window.location.pathname.slice(0,11) == "/developer/"
        ){
        console.log("This path does not need Antigram.")
    } else {
        try{
            ApplyAntigram();
        } catch(error) {
            console.log("Antigram Error 0 -" + error);
        }
    }
}

//Applies Antigram features depending on the options selected
function ApplyAntigram() {
    //We select the navigation links and the explore feed depending on the url (dom changes)
    if(window.location.pathname == "/direct/inbox/"){
        try {
            NavLinks = document.body.querySelector('section > div> div:first-child > div > div:last-child > div')//div._47KiJ 
            Main = document.body.querySelector('section > div > div:last-child > div');
            Nav = document.body.querySelector('section > div > div:first-child'); //div.Hz2lF
        } catch (error) {
            console.log("Antigram Error 2 -" + error);
        }
    } else if(window.location.pathname.slice(0,8) == "/stories"){
        try {
            Main = document.body.querySelector('section > div > div');
        } catch (error) {
            console.log("Antigram Error 3 -" + error);
        }
    }
    else {
        try {
            NavLinks = document.body.querySelector('nav > div:last-child > div > div > div:last-child > div')//div._47KiJ 
            Suggestions = document.body.querySelector('main > section > div:nth-child(3) > div:nth-child(2)') //div._8UZ6e
            Stories = document.body.querySelector('main > section > div:first-child > div:first-child') //div.VideM
            Main = document.body.querySelector('[role=main]');
            Nav = document.body.querySelector('nav > div:last-child > div'); //div.Hz2lF
        } catch(error) {
            console.log("Antigram Error 1 -" + error);
        }
    }


    //We load the settings from the local storage
    chrome.storage.sync.get(['options'], function(result) {
        option_values = result.options;

        //Hides/Shows Explore if it exists on the page
        if(option_values[0] && NavLinks != null){
            NavLinks.children[2].style.display = "none";
            if (window.location.pathname.slice(0,9) == "/explore/" ||
            window.location.pathname.slice(0,11) == "/directory/"){
                Main.style.display = "none";
            }
        }
        else if(NavLinks != null){
            NavLinks.children[2].style.display = "block";
            if (window.location.pathname.slice(0,9) == "/explore/" ||
            window.location.pathname.slice(0,11) == "/directory/"){
                Main.style.display = "block";
            }
        }
        
        //Hides/Shows Follower Suggestions if they exist on the page
        if(option_values[1] && Suggestions != null){
            Suggestions.style.display = "none";
        }
        else if(Suggestions != null) {
            Suggestions.style.display = "block";
        }

        //Hides/Shows Stories if they exists on the page
        if(option_values[2] && Stories != null){
            Stories.style.display = "none";
        }
        else if(Stories != null) {
            Stories.style.display = "block";
        }
        
        //Changes Background Color if the setting is activated / restores the original if it's not the case
        if(option_values[3] == true){
            if(Main != null) {
                Main.style.backgroundColor = option_values[4];
            }
            if(Nav != null) {
                Nav.style.backgroundColor = option_values[4];
            }
        }
        else {
            if(Main != null) {
                Main.style.backgroundColor = "#fff";
            }
            if(Nav != null) {
                Nav.style.backgroundColor = "#fafafa";
            }
        }
        
        
    });

    //Debug purposes
    console.log(option_values)

}

// We call the function periodically and after a delay to let the components load.
// TO DO: think for a more efficient way to do this.
try{
setInterval(CheckPath, 1000);
} catch(error) {
    console.log("Antigram Error 1000 -" + error);
}


/*
let applyCallInterval = setInterval(ApplyAntigram, 500); 

window.addEventListener('load', () => {
    ApplyAntigram();
    clearInterval(applyCallInterval);
});
*/