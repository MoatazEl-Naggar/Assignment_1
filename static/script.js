var setting_menu = document.querySelector(".setting-menu");
var dark_button = document.getElementById("dark-mode");
function setting_menu_toggle() {
    setting_menu.classList.toggle("setting-menu-height");
}

dark_button.onclick = function () {
    dark_button.classList.toggle("turn-on");
    document.body.classList.toggle("dark-theme");

    if (localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark");
    }
    else {
        localStorage.setItem("theme", "light");
    }
}



if (localStorage.getItem("theme") == "light") {
    dark_button.classList.remove("turn-on");
    document.body.classList.remove("dark-theme");
}
else if (localStorage.getItem("theme") == "dark") {
    dark_button.classList.add("turn-on");
    document.body.classList.add("dark-theme");
}
else {
    localStorage.setItem("theme", "light");
}

function logout() {

}
