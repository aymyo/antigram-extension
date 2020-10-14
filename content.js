

let option_values;

//We select the navigation links and the explore feed
chrome.storage.onChanged.addListener(ApplyAntigram);

//Applies Antigram features depending on the options selected
function ApplyAntigram() {
    let NavLinks = document.querySelector('div._47KiJ')
    let Suggestions = document.querySelector('div._8UZ6e')
    let Stories = document.querySelector('div.VideM')
    let Main = document.querySelector('[role=main]');
    let Nav = document.querySelector('div.Hz2lF');

    chrome.storage.sync.get(['options'], function(result) {
        option_values = result.options;

        //Hide Explore
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
        
        //Hide Suggestions
        if(option_values[1] && Suggestions != null){
            Suggestions.style.display = "none";
        }
        else if(Suggestions != null) {
            Suggestions.style.display = "block";
        }

        //Hide Stories
        if(option_values[2] && Stories != null){
            Stories.style.display = "none";
        }
        else if(Stories != null) {
            Stories.style.display = "block";
        }
        
        //Change Background Color
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

    console.log(option_values)

}

// We wait for the elements to load
setInterval(ApplyAntigram, 1000); 