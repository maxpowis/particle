document.addEventListener(
  'DOMContentLoaded',
  () => {
    new SweetScroll({});

    particlesJS.load('particles-js', 'assets/json/particle.json', function() {
      console.log('callback - particles.js config loaded');
    });
  },
  false,
);