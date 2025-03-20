document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const homeLink = document.getElementById("home-link");
  const contentArea = document.querySelector(".content-area");

  if (!homeLink || !contentArea) {
    console.error(
      "Erreur : Élément 'home-link' ou 'content-area' introuvable."
    );
    return;
  }

  // Fonction qui charge les pages depuis le dossier pages/
  async function loadContent(pagePath) {
    try {
      const response = await fetch(`pages/${pagePath}.html`);
      if (!response.ok) throw new Error("Échec du chargement de la page");
      const content = await response.text();
      // ✅ Protection contre null
      if (contentArea) contentArea.innerHTML = content;
    } catch (error) {
      console.error("Erreur de chargement:", error);
      if (contentArea)
        contentArea.innerHTML = "<p>Erreur lors du chargement de la page.</p>";
    }
  }

  // Gestion du clic sur les liens de navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const target = e.target instanceof HTMLElement ? e.target : null;
      if (!target) return;

      const pagePath = target.getAttribute("href");
      if (pagePath) {
        await loadContent(pagePath); // Charge pages/<page>.html
        navLinks.forEach((l) => l.classList.remove("active"));
        target.classList.add("active");
      }
    });
  });

  // Gestion du clic sur le logo pour revenir à l'accueil
  homeLink.addEventListener("click", async () => {
    await loadContent("accueil");
    navLinks.forEach((link) => link.classList.remove("active"));
  });

  // Animation des barres de compétences
  const skillLevels = document.querySelectorAll(".skill-level");
  skillLevels.forEach((skill) => {
    if (skill instanceof HTMLElement) {
      const level = skill.getAttribute("data-level");
      if (level) skill.style.setProperty("--width", `${level}%`);
    }
  });

  // ✅ Chargement automatique de l'accueil au démarrage
  loadContent("accueil");
});
