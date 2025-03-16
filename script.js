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

  async function loadContent(page) {
    if (!contentArea) return;

    try {
      const response = await fetch(`pages/${page}.html`);
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

      const target = e.target instanceof HTMLElement ? e.target : null; // 🔥 Correction définitive !
      if (!target) return;

      const page = target.getAttribute("href")?.substring(1);
      if (page) {
        await loadContent(page);
        navLinks.forEach((l) => l.classList.remove("active"));
        target.classList.add("active");
      }
    });
  });

  homeLink.addEventListener("click", async () => {
    if (!contentArea) return;
    await loadContent("accueil");
    navLinks.forEach((link) => link.classList.remove("active"));
  });

  const skillLevels = document.querySelectorAll(".skill-level");
  skillLevels.forEach((skill) => {
    if (skill instanceof HTMLElement) {
      const level = skill.getAttribute("data-level");
      if (level) skill.style.setProperty("--width", `${level}%`);
    }
  });
});
