
// All scripts for the site

// Counter script (I wrote this)
const HAS_VISTED_KEY = 'hasVisited';
localStorage.setItem(HAS_VISTED_KEY, 'false');
document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter');
    if (!counterElement) return;

    if (!localStorage.getItem(HAS_VISTED_KEY)) {
        localStorage.setItem(HAS_VISTED_KEY, 'true');
        const data = new FormData();
        data.append('action', 'increment');
    }


});

// credit to "Piskvor left the building" on https://stackoverflow.com/questions/9799276/how-to-send-post-data-with-xmlhttprequest for this function that sends data to php file
function callPHP(data) {
    var httpc = new XMLHttpRequest(); // simplified for clarity
    var url = "counter.php";
    httpc.open("POST", url, true); // sending as POST

    httpc.onreadystatechange = function() { //Call a function when the state changes.
        if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
            alert(httpc.responseText); // some processing here, or whatever you want to do with the response
        }
    };
    httpc.send(data);
}



// Dark / Light mode switcher (the AI did most of this, but I understand it)
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
    const footer = document.querySelector('footer');

    // Button label
    if(modeBtn) modeBtn.textContent = isDark ? 'Light Mode' : 'Dark Mode';

    // Basic page colors (keeps existing inline-style approach for minimal CSS changes)
    if(isDark){
        if(body) { body.style.backgroundColor = '#303030'; body.style.color = 'white'; }
        if(header){ header.style.backgroundColor = '#222'; header.style.color = 'white'; header.style.boxShadow = '0px 1px 1px #fff'; }
        if(tmLines && tmLines.length) tmLines[0].style.stroke = 'white';
        if(tmNav){ tmNav.style.boxShadow = '0px 2px 5px black'; tmNav.style.backgroundColor = '#303030'; }
        if(lineBorders && lineBorders.length) lineBorders[0].style.stroke = 'white';
        if(footer){footer.style.boxShadow = '0px 0px 2px #fff';}
    } else {
        if(body) { body.style.backgroundColor = 'white'; body.style.color = 'black'; }
        if(header){ header.style.backgroundColor = 'white'; header.style.color = 'black'; header.style.boxShadow = '0px 2px 5px #bbb'; }
        if(tmLines && tmLines.length) tmLines[0].style.stroke = 'black';
        if(tmNav){ tmNav.style.boxShadow = '0px 2px 5px #bbb'; tmNav.style.backgroundColor = 'white'; }
        if(lineBorders && lineBorders.length) lineBorders[0].style.stroke = 'black';
        if(footer){ footer.style.boxShadow = '0px -2px 5px #999';}
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



// Timeline scroll fill update (I did most of this)

function updateLineFill(){
    const svg = document.querySelector('.lineGraphic');
    const fill = document.querySelector('.lineFill');
    if(!svg || !fill) return;

    // safegaurd for no-scroll pages
    if(document.body.scrollHeight === window.innerHeight){ 
        fill.setAttribute('height', svg.clientHeight.toString());
        return;
    }

    let newH = parseFloat(window.scrollY) / (document.body.scrollHeight - window.innerHeight) * svg.clientHeight;
    fill.setAttribute('height', Math.max(0, Math.min(svg.clientHeight, newH)).toString());
}

// Image viewer (I did much of this)

function openImageViewer(src, alt=''){
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const theBackground = document.querySelector('main');
    const viewer = document.querySelector('.imgView');
    const img = viewer.querySelector('img');
    const caption = viewer.querySelector('p');

    if(!viewer || !img) return;

    img.src = src;
    img.alt = alt;
    if(caption){
        caption.textContent = alt;
        caption.style.display = alt ? 'block' : 'none';
    }

    viewer.style.display = 'flex';
    theBackground.style.filter = "blur(8px)";
    header.style.filter = "blur(8px)";
    footer.style.filter = "blur(8px)";
}

function closeImageViewer(){
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');
    const theBackground = document.querySelector('main');
    const viewer = document.querySelector('.imgView');
    if (viewer) {
        viewer.style.display = 'none';
    }
    theBackground.style.filter = "none";
    header.style.filter = "none";
    footer.style.filter = "none";
    
}
