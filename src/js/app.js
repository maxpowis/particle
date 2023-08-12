function lightswitch() {
  document.getElementsByClassName("moon")[0].classList.toggle("sun");
  document.getElementsByClassName("lightswitch")[0].classList.toggle("day");
  document.getElementsByTagName("body")[0].classList.toggle("light");
}

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
