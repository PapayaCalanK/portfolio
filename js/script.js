// js/script.js: navigation dynamique, typing effect et Swiper init

document.addEventListener("DOMContentLoaded", () => {
  // === Swiper initialization ===
  function initSwipers() {
    document.querySelectorAll(".swiper").forEach((container) => {
      // destroy old instance if exists
      if (container.swiper) {
        container.swiper.destroy(true, true);
      }
      // initialize new Swiper
      new Swiper(container, {
        direction: "horizontal",
        loop: true,
        autoplay: { delay: 4000 },
        pagination: { el: container.querySelector(".swiper-pagination") },
        navigation: {
          nextEl: container.querySelector(".swiper-button-next"),
          prevEl: container.querySelector(".swiper-button-prev"),
        },
      });
    });
  }

  // === Dynamic page loading ===
  const navLinks = document.querySelectorAll(".nav-link");
  const homeLink = document.getElementById("home-link");
  const contentArea = document.querySelector(".content-area");

  async function loadContent(pagePath) {
    if (!contentArea) return;
    try {
      const response = await fetch(`${pagePath}.html`);
      if (!response.ok) throw new Error("Échec du chargement de la page");
      contentArea.innerHTML = await response.text();
      initSwipers(); // ré-initialise Swiper après injection
    } catch (error) {
      console.error("Erreur de chargement :", error);
      contentArea.innerHTML = "<p>Erreur lors du chargement de la page.</p>";
    }
  }

  if (homeLink && contentArea) {
    navLinks.forEach((link) => {
      link.addEventListener("click", async (e) => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("http")) return;
        e.preventDefault();
        await loadContent(href);
        navLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      });
    });

    homeLink.addEventListener("click", async () => {
      await loadContent("pages/accueil");
      navLinks.forEach((l) => l.classList.remove("active"));
    });

    // charge l'accueil et initialise Swiper la première fois
    loadContent("pages/accueil");
  }

  // === Hero typing effect ===
  (function () {
    const typedText = document.getElementById("typed-text");
    if (!typedText) return;
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
  })();

  // initialise Swiper sur la page statique initiale
  initSwipers();
});
