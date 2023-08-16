function setTheme(theme) {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const html = document.querySelector('html');
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        setTheme('light');
        particlesJS.load('particles-js', 'assets/json/particles-day.json', function() {
            console.log('callback - particles-day.js config loaded');
        });
    } else {
        setTheme('dark');
        particlesJS.load('particles-js', 'assets/json/particles-night.json', function() {
            console.log('callback - particles-night.js config loaded');
        });
    }
}

function lightswitch() {
    document.getElementsByClassName("moon")[0].classList.toggle("sun");
    document.getElementsByClassName("lightswitch")[0].classList.toggle("day");
    toggleTheme();
}

setTheme('dark');