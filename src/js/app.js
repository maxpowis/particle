const themeToggle = document.querySelector('.lightswitch');
themeToggle.addEventListener('click', lightswitch);

document.addEventListener(
  'DOMContentLoaded',
  () => {
    new SweetScroll({});

    particlesJS.load('particles-js', 'assets/json/particles-night.json', function() {
      console.log('callback - particles-night.js config loaded');
    });
  },
  false,
);
