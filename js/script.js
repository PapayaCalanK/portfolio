// js/script.js: navigation dynamique, typing effect et carrousel

document.addEventListener("DOMContentLoaded", () => {
  // === Dynamic page loading ===
  const navLinks = document.querySelectorAll(".nav-link");
  const homeLink = document.getElementById("home-link");
  const contentArea = document.querySelector(".content-area");

  if (homeLink && contentArea) {
    async function loadContent(pagePath) {
      try {
        const response = await fetch(`${pagePath}.html`);
        if (!response.ok) throw new Error("Échec du chargement de la page");
        const content = await response.text();
        contentArea.innerHTML = content;
      } catch (error) {
        console.error("Erreur de chargement :", error);
        contentArea.innerHTML = "<p>Erreur lors du chargement de la page.</p>";
      }
    }

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

    // Charger la page d'accueil par défaut
    loadContent("pages/accueil");
  }

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

  // === Carousel projects ===
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

    prev.addEventListener("click", () => show(index - 1));
    next.addEventListener("click", () => show(index + 1));

    // Affiche la première image au chargement
    show(0);
  });
});
