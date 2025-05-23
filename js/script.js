// js/script.js: navigation dynamique, typing effect et carrousel

document.addEventListener("DOMContentLoaded", () => {
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
      initCarousels(); // <-- on appelle après injection
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

    // Charge la page d'accueil puis initialise les carousels locaux
    loadContent("pages/accueil").then(initCarousels);
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

  // === Carousel logic encapsulé ===
  function initCarousels() {
    document.querySelectorAll(".carousel-container").forEach((container) => {
      const slide = container.querySelector(".carousel-slide");
      const imgs = slide.querySelectorAll("img");
      const prev = container.querySelector(".carousel-btn.prev");
      const next = container.querySelector(".carousel-btn.next");
      let index = 0;

      function show(i) {
        index = (i + imgs.length) % imgs.length;
        slide.style.transform = `translateX(-${index * 100}%)`;
      }

      prev.onclick = () => show(index - 1);
      next.onclick = () => show(index + 1);

      show(0);
    });
  }
});
