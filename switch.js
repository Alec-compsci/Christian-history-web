

// Dark / Light mode switcher
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



// Timeline scroll fill update

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

