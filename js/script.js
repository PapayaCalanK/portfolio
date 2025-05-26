// js/script.js: typing effect & Swiper initialization only for entreprise page

document.addEventListener("DOMContentLoaded", () => {
  // === Hero typing effect ===
  const typedText = document.getElementById("typed-text");
  if (typedText) {
    const roles = [
      "Développeur Full Stack",
      "Passionné par les nouvelles technologies",
      "Créateur de solutions web sur mesure",
    ];
    let roleIndex = 0,
      charIndex = 0,
      isDeleting = false;
    function typeEffect() {
      const current = roles[roleIndex];
      if (isDeleting) {
        typedText.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedText.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }
      let speed = isDeleting ? 40 : 90;
      if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
      }
      setTimeout(typeEffect, speed);
    }
    typeEffect();
  }

  // === Swiper Initialization ===
  if (typeof Swiper !== "undefined") {
    document.querySelectorAll(".swiper").forEach((container) => {
      new Swiper(container, {
        direction: "horizontal",
        loop: true,
        autoplay: { delay: 4000 },
        pagination: {
          el: container.querySelector(".swiper-pagination"),
          clickable: true,
        },
        navigation: {
          nextEl: container.querySelector(".swiper-button-next"),
          prevEl: container.querySelector(".swiper-button-prev"),
        },
      });
    });
  }
});
