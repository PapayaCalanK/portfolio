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

  async function loadContent(pagePath) {
    if (!contentArea) return;

    try {
      const response = await fetch(`pages/${pagePath}.html`);
      if (!response.ok) throw new Error("Échec du chargement de la page");
      const content = await response.text();
      contentArea.innerHTML = content;
    } catch (error) {
      console.error("Erreur de chargement:", error);
      contentArea.innerHTML = "<p>Erreur lors du chargement de la page.</p>";
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const target = e.currentTarget;
      if (!(target instanceof HTMLElement)) return;

      const pagePath = target.getAttribute("href");
      if (pagePath) {
        await loadContent(pagePath);
        navLinks.forEach((l) => l.classList.remove("active"));
        target.classList.add("active");
      }
    });
  });

  homeLink.addEventListener("click", async () => {
    await loadContent("accueil");
    navLinks.forEach((link) => link.classList.remove("active"));
  });

  // Charger la page d'accueil par défaut
  loadContent("accueil");
});
