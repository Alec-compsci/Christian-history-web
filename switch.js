
darkMode = false;
function modeChange() {
    const header = document.getElementsByTagName("header");
    const body = document.getElementsByTagName("body");
    const mode = document.getElementsByClassName("mode");
            
    if (darkMode == false) {
        darkMode = true;
        mode[0].innerHTML = "Light Mode";
        body[0].style.backgroundColor = "#252525";
        body[0].style.color = "white";
        header[0].style.backgroundColor = "#222";
        header[0].style.color = "white";
        header[0].style.boxShadow = "0px 2px 2px #fff";
    }
    else {
        darkMode = false;
        mode[0].innerHTML = "Dark Mode";
        /*mode[0].syle.backgroundColor = "white";
        mode[0].style.color = "black";
        mode[0].style.border = "4px solid black";*/
        body[0].style.backgroundColor = "white";
        body[0].style.color = "black";
        header[0].style.backgroundColor = "white";
        header[0].style.color = "black";
        header[0].style.boxShadow = "0px 2px 5px #bbb";
    }
}