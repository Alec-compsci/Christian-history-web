
//main variables
//const r = document.querySelector(':root');

//stuff for adjusting timeline style sizes
/*const tmDivs = document.querySelector('.tla div');
function adjustSizing(){
    let imgHeight = document.querySelector('.tla img').height;
    tmDivs.style.setProperty('--div-height', (imgHeight) + 'px');
}*/

/*
// dar/light mode switch
darkMode = false;

// this is to load the mode on page load
function loadMode() {
    document.getElementById("test").innerHTML = darkMode;
    const header = document.getElementsByTagName("header");
    const body = document.getElementsByTagName("body");
    const mode = document.getElementsByClassName("mode");
    const tmLines = document.getElementsByTagName("line");
    const tmNav = document.getElementsByClassName("timelineNavBox");
    const lineBorder = document.getElementsByClassName("lineBorder");
            
    if (darkMode == true) {
        mode[0].innerHTML = "Light Mode";
        body[0].style.backgroundColor = "#303030";
        body[0].style.color = "white";
        header[0].style.backgroundColor = "#222";
        header[0].style.color = "white";
        header[0].style.boxShadow = "0px 1px 1px #fff";
        tmLines[0].style.stroke = "white";
        tmNav[0].style.boxShadow = "0px 2px 5px black";
        tmNav[0].style.backgroundColor = "#303030";
        lineBorder[0].style.stroke = "white";

    }
    else {
        mode[0].innerHTML = "Dark Mode";
        /*mode[0].syle.backgroundColor = "white";
        mode[0].style.color = "black";
        mode[0].style.border = "4px solid black";*/
        
        /*body[0].style.backgroundColor = "white";
        body[0].style.color = "black";
        header[0].style.backgroundColor = "white";
        header[0].style.color = "black";
        header[0].style.boxShadow = "0px 2px 5px #bbb";
        tmLines[0].style.stroke = "black";
        tmNav[0].style.boxShadow = "0px 2px 5px #bbb";
        tmNav[0].style.backgroundColor = "white";
        lineBorder[0].style.stroke = "black";

    }
}

// this is for changing the mode on button click
function modeChange() {
    const header = document.getElementsByTagName("header");
    const body = document.getElementsByTagName("body");
    const mode = document.getElementsByClassName("mode");
    const tmLines = document.getElementsByTagName("line");
    const tmNav = document.getElementsByClassName("timelineNavBox");
    const lineBorder = document.getElementsByClassName("lineBorder");
            
    if (darkMode == false) {
        darkMode = true;
        mode[0].innerHTML = "Light Mode";
        body[0].style.backgroundColor = "#303030";
        body[0].style.color = "white";
        header[0].style.backgroundColor = "#222";
        header[0].style.color = "white";
        header[0].style.boxShadow = "0px 1px 1px #fff";
        tmLines[0].style.stroke = "white";
        tmNav[0].style.boxShadow = "0px 2px 5px black";
        tmNav[0].style.backgroundColor = "#303030";
        lineBorder[0].style.stroke = "white";

    }
    else {
        darkMode = false;
        mode[0].innerHTML = "Dark Mode";
        /*mode[0].syle.backgroundColor = "white";
        mode[0].style.color = "black";
        mode[0].style.border = "4px solid black";*/
        
        /*body[0].style.backgroundColor = "white";
        body[0].style.color = "black";
        header[0].style.backgroundColor = "white";
        header[0].style.color = "black";
        header[0].style.boxShadow = "0px 2px 5px #bbb";
        tmLines[0].style.stroke = "black";
        tmNav[0].style.boxShadow = "0px 2px 5px #bbb";
        tmNav[0].style.backgroundColor = "white";
        lineBorder[0].style.stroke = "black";

    }
}
*/

/*
  Dark mode toggling with persistence across pages.
  - Stores choice in localStorage under key 'darkMode'
  - Applies the same visual changes as the previous script
  - Exposes `modeChange()` and `loadMode()` for backward compatibility
*/

window.addEventListener('resize', () => {
    let divTitle = document.getElementsByClassName('h1TM');
    divTitle.style.marginLeft = getTMImageWidth();
});

function getTMImageWidth() {
    const img = document.querySelector('.timelineImage');           // or document.getElementById('myImg')
    const width = img.getBoundingClientRect().width;               // floating-point pixels
    // store in a variable
    return width + 'px';
}

const _STORAGE_KEY = 'darkMode';

function _getStoredMode(){
    return localStorage.getItem(_STORAGE_KEY) === 'true';
}

function _applyMode(isDark){
    const header = document.querySelector('header');
    const body = document.body;
    const modeBtn = document.querySelector('.mode');
    const tmLines = document.getElementsByTagName('line');
    const tmNav = document.querySelector('.timelineNavBox');
    const lineBorders = document.getElementsByClassName('lineBorder');

    // Button label
    if(modeBtn) modeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';

    // Basic page colors (keeps existing inline-style approach for minimal CSS changes)
    if(isDark){
        if(body) { body.style.backgroundColor = '#303030'; body.style.color = 'white'; }
        if(header){ header.style.backgroundColor = '#222'; header.style.color = 'white'; header.style.boxShadow = '0px 1px 1px #fff'; }
        if(tmLines && tmLines.length) tmLines[0].style.stroke = 'white';
        if(tmNav){ tmNav.style.boxShadow = '0px 2px 5px black'; tmNav.style.backgroundColor = '#303030'; }
        if(lineBorders && lineBorders.length) lineBorders[0].style.stroke = 'white';
    } else {
        if(body) { body.style.backgroundColor = 'white'; body.style.color = 'black'; }
        if(header){ header.style.backgroundColor = 'white'; header.style.color = 'black'; header.style.boxShadow = '0px 2px 5px #bbb'; }
        if(tmLines && tmLines.length) tmLines[0].style.stroke = 'black';
        if(tmNav){ tmNav.style.boxShadow = '0px 2px 5px #bbb'; tmNav.style.backgroundColor = 'white'; }
        if(lineBorders && lineBorders.length) lineBorders[0].style.stroke = 'black';
    }

    // Also toggle a class on <html> so you can write CSS overrides if you prefer
    document.documentElement.classList.toggle('dark', !!isDark);
}

function modeChange(){
    const next = !_getStoredMode();
    _applyMode(next);
    localStorage.setItem(_STORAGE_KEY, next ? 'true' : 'false');
}

// Backwards-compatible loader used by some pages (calls apply with stored value)
function loadMode(){
    const stored = localStorage.getItem(_STORAGE_KEY);
    const isDark = stored ? stored === 'true' : false;
    _applyMode(isDark);
}

// Auto-run on DOM ready so pages don't need inline onload handlers
document.addEventListener('DOMContentLoaded', () => {
    loadMode();
});

// Export for debug / backward compatibility
window.modeChange = modeChange;
window.loadMode = loadMode;