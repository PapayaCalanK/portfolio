// js/script.js: typing effect & manual carousel initialization

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
      typedText.textContent = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);
      charIndex += isDeleting ? -1 : 1;
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

  // === Manual Carousel Initialization ===
  document.querySelectorAll(".carousel-container").forEach((container) => {
    const slide = container.querySelector(".carousel-slide");
    const items = Array.from(slide.children);
    const prevBtn = container.querySelector(".carousel-btn.prev");
    const nextBtn = container.querySelector(".carousel-btn.next");
    let index = 0;

    // Set initial styles
    slide.style.display = "flex";
    slide.style.transition = "transform 0.5s ease-in-out";
    items.forEach((item) => {
      item.style.minWidth = "100%";
    });

    function update() {
      slide.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + items.length) % items.length;
      update();
    });
    nextBtn.addEventListener("click", () => {
      index = (index + 1) % items.length;
      update();
    });

    // Initialize
    update();
  });
});
