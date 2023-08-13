function setTheme(theme) {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const html = document.querySelector('html');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        setTheme('light');
    } else {
        setTheme('dark');
    }
}

function lightswitch() {
    document.getElementsByClassName("moon")[0].classList.toggle("sun");
    document.getElementsByClassName("lightswitch")[0].classList.toggle("day");
    toggleTheme();
}

setTheme('dark');