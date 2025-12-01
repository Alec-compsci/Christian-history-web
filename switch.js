
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









/*
// Helper: update rect height and keep it bottom-aligned inside its SVG
            function setRectHeight(t, newH, align = 'top'){
                if(!t) return;
                const svg = t.ownerSVGElement || t.parentElement;
                const svgH = parseFloat(svg.getAttribute('height')) || svg.clientHeight || 300;
                const clamped = Math.max(0, Math.min(svgH, newH));

                let newY = 0;
                /*if(align === 'top') {
                    newY = 0;
                } else if(align === 'center') {
                    newY = (svgH - clamped) / 2;
                  } else { // 'bottom'
                    newY = svgH - clamped;
                  }

                t.setAttribute('height', clamped);
                t.setAttribute('y', newY);
}

            // Button: increase by a fixed step (keeps previous behavior but fixed)
            function increase(){
                const t = document.getElementByClass("lineFill");
                if(!t) return;
                const cur = parseFloat(t.getAttribute('height')) || 0;
                const step = 20;
                setRectHeight(t, cur + step);
            }

            
            // Scroll-driven update: map article scroll progress [0..1] to rect height [minH..maxH]
            function attachScrollToArticle(){
                const article = document.querySelector('body');
                const t = document.getElementById('lineFill');
                if(!article || !t) return;

                const svg = t.ownerSVGElement || t.parentElement;
                const svgH = parseFloat(svg.getAttribute('height')) || svg.clientHeight || 300;
                const minH = 20; // minimum rect height
                const maxH = svgH; // maximum when scrolled to bottom

                function updateFromScroll(){
                    const range = article.scrollHeight - article.clientHeight;
                    const frac = range > 0 ? (article.scrollTop / range) : 1;
                    const newH = minH + frac * (maxH - minH);
                    setRectHeight(t, newH);
                }

                // initialize333333
                updateFromScroll();

                // update on scroll
                article.addEventListener('scroll', updateFromScroll, {passive:true});
                // update on resize (in case svg or article sizes change)
                window.addEventListener('resize', updateFromScroll);
            }

            // run after DOM ready
            window.addEventListener('DOMContentLoaded', () => {
                attachScrollToArticle();
            });
            

/*
    Timeline navigation: animate the SVG .lineFill height as the user scrolls
    The filled rect grows proportionally to how far the user has progressed through
    the `.tla` article. Uses requestAnimationFrame for smooth updates and is
    resilient to missing elements.
*/


/*
(function(){
    let raf = null;

    function clamp(v, a=0, b=1){ return Math.max(a, Math.min(b, v)); }

    function updateLineFill(){
        const svg = document.querySelector('.lineGraphic');
        const fill = document.querySelector('.lineFill');
        const article = document.querySelector('.tla');
        if(!svg || !fill || !article) return;

        const svgHeight = svg.clientHeight || parseFloat(getComputedStyle(svg).height) || 0;
        const docScroll = window.scrollY || window.pageYOffset || 0;
        const winH = window.innerHeight || document.documentElement.clientHeight;
        const artRect = article.getBoundingClientRect();
        const artTop = artRect.top + docScroll;
        const artH = article.offsetHeight || artRect.height || 0;

        // progress = fraction of the article we've scrolled through.
        // This formula starts increasing when the article enters the viewport and
        // reaches 1 when we've scrolled past the article entirely.
        const progress = clamp((docScroll + winH - artTop) / (artH + winH), 0, 1);

            const fillH = Math.round(progress * svgHeight);

            // ensure basic rect attributes exist (x and width). Use the svg width as a guide.
            try{
                const svgWidth = svg.clientWidth || parseFloat(getComputedStyle(svg).width) || 10;
                if(!fill.getAttribute('x')) fill.setAttribute('x', '1');
                if(!fill.getAttribute('width')) fill.setAttribute('width', String(Math.max(4, Math.round(svgWidth - 2))));
                if(!fill.getAttribute('fill')) fill.setAttribute('fill', '#ffa914');

                // set rect height and position so it fills from top downward
                fill.setAttribute('height', String(fillH));
                fill.setAttribute('y', String(0));
            } catch (e){
                // ignore attribute errors
            }
    }

    function scheduleUpdate(){
        if(raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => { updateLineFill(); raf = null; });
    }

    document.addEventListener('DOMContentLoaded', () => {
        // run once immediately
        scheduleUpdate();
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
    });
})();

/*
// to change the scroll
function attachtScrollbar() {
    const body = document.body;
    const rect = getElementsByClassName("lineFill");
    if(!body || !rect) return;

    const svg = rect.ownerSVGElement || rect.parentElement;
    const svgH = parseFloat(svg.getAttribute('height')) || svg.clientHeight || 480; 
    const minH = 20; // minimum rect height

    function update(){
        let range = body.scrollHeight - body.clientHeight;
        let frac = 1;
        if (range > 0){
            frac = body.scrollTop / range;
        }
        else {
            frac = 1; // frac is set to 1 if range is negative or zero
        }
        const newH = minH + frac * (svgH - minH);
        rect.setAttribute('height', Math.round(Math.max(0, Math.min(svgH, newH)))); // sets the height of rect and assures that the new height is an interger that isn't a negative nor greater than the max height
        rect.setAttribute('y', 0); // assures that the rect starts from top
    }

    update(); // initialize

    // update on scroll
    article.addEventListener('scroll', update, {passive:true});
    // update on resize (in case svg or article sizes change)
    window.addEventListener('resize', update);

}

window.addEventListener('DOMContentLoaded', () => {
                attachScrollToArticle();
}); */