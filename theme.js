/**
 * theme.js
 * --------
 * Handles dark/light mode toggle for Front-End Projects.
 *
 * CHANGES MADE:
 *  - Created this file to manage theme toggling logic
 *  - Persists user preference in localStorage under key "theme"
 *  - Applies "dark-mode" class to <body> to activate dark CSS variables
 *  - Swaps the button icon between fa-moon (dark) and fa-sun (light)
 */

(function () {
  const STORAGE_KEY = "theme";
  const DARK_CLASS = "dark-mode";

  /**
   * Apply the saved theme on page load before content renders,
   * preventing a flash of the wrong theme.
   */
  function applySavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark") {
      document.body.classList.add(DARK_CLASS);
    }
  }

  /**
   * Update the toggle button icon to reflect the current theme.
   * Shows moon icon when in light mode (click to go dark),
   * shows sun icon when in dark mode (click to go light).
   */
  function syncButtonIcon(btn) {
    const icon = btn.querySelector("i");
    const isDark = document.body.classList.contains(DARK_CLASS);
    if (isDark) {
      icon.classList.replace("fa-moon", "fa-sun");
      btn.setAttribute("aria-label", "Switch to light mode");
      btn.setAttribute("title", "Switch to light mode");
    } else {
      icon.classList.replace("fa-sun", "fa-moon");
      btn.setAttribute("aria-label", "Switch to dark mode");
      btn.setAttribute("title", "Switch to dark mode");
    }
  }

  /**
   * Toggle dark mode class on body, persist preference,
   * and update the button icon.
   */
  function toggleTheme(btn) {
    document.body.classList.toggle(DARK_CLASS);
    const isDark = document.body.classList.contains(DARK_CLASS);
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
    syncButtonIcon(btn);
  }

  // Run on DOM ready
  document.addEventListener("DOMContentLoaded", function () {
    applySavedTheme();

    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;

    // Set the correct icon based on the already-applied theme
    syncButtonIcon(btn);

    btn.addEventListener("click", function () {
      toggleTheme(btn);
    });
  });

  // Apply theme immediately (before DOMContentLoaded) to avoid flash
  applySavedTheme();
})();
