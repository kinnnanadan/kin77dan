document.addEventListener("DOMContentLoaded", () => {
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const sizeButtons = document.querySelectorAll(".size-btn");
  const menuToggleBtn = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const navLinks = document.querySelectorAll(".nav-link");

  // --- 1. ダークモード設定 ---
  const savedTheme = localStorage.getItem("kin77dan-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

  function applyTheme(theme) {
    htmlEl.setAttribute("data-theme", theme);
    localStorage.setItem("kin77dan-theme", theme);
    themeToggleBtn.textContent = theme === "dark" ? "☀️ ライトモード" : "🌙 ダークモード";
  }

  applyTheme(initialTheme);

  themeToggleBtn.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // --- 2. 文字サイズ設定 ---
  const sizeMap = {
    small: "14px",
    medium: "16px",
    large: "18px"
  };

  const savedSize = localStorage.getItem("kin77dan-fontsize") || "medium";

  function applyFontSize(sizeKey) {
    const px = sizeMap[sizeKey] || sizeMap.medium;
    htmlEl.style.setProperty("--font-size-base", px);
    localStorage.setItem("kin77dan-fontsize", sizeKey);

    sizeButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.size === sizeKey);
    });
  }

  applyFontSize(savedSize);

  sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      applyFontSize(btn.dataset.size);
    });
  });

  // --- 3. モバイル用サイドバー開閉 ---
  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("open");
  }

  menuToggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("open");
  });

  overlay.addEventListener("click", closeSidebar);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });
});
