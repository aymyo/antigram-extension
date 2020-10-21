
//An array that will store the option values: 
//[explore-toggle,suggestions-toggle,stories,color-toggle,hexadecimal color code]
let option_values;

//Applies the changes whenever the options are modified
chrome.storage.onChanged.addListener(ApplyAntigram);

//Applies Antigram features depending on the options selected
function ApplyAntigram() {
    //We select the navigation links and the explore feed
    let NavLinks = document.querySelector('div._47KiJ')
    let Suggestions = document.querySelector('div._8UZ6e')
    let Stories = document.querySelector('div.VideM')
    let Main = document.querySelector('[role=main]');
    let Nav = document.querySelector('div.Hz2lF');

    //We load the settings from the local storage
    chrome.storage.sync.get(['options'], function(result) {
        option_values = result.options;

        //Hides/Shows Explore if it exists on the page
        if(option_values[0] && NavLinks != null){
            NavLinks.children[2].style.display = "none";
            if (window.location.pathname == "/explore/"){
                Main.style.display = "none";
            }
        }
        else if(NavLinks != null){
            NavLinks.children[2].style.display = "block";
            if (window.location.pathname == "/explore/"){
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

let applyCallInterval = setInterval(ApplyAntigram, 500); 

window.addEventListener('load', () => {
    ApplyAntigram();
    clearInterval(applyCallInterval);
});