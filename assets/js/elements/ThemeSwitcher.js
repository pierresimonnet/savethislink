import { isAuthenticated } from "../functions/auth";

export class ThemeSwitcher extends HTMLElement {
  connectedCallback() {
    this.classList.add("theme-switcher");
    this.innerHTML = `
      <input type="checkbox" is="input-switch" name="theme-switcher" id="theme-switcher" aria-label="Changer de thème">
      <label for="theme-switcher">
        <svg class="icon icon-sun"><use xlink:href="/sprite.svg#sun" /></svg>
        <svg class="icon icon-moon"><use xlink:href="/sprite.svg#moon" /></svg>
      </label>`;

    const input = this.querySelector("input");
    input.addEventListener("change", (e) => {
      const themeToRemove = e.currentTarget.checked ? "light" : "dark";
      const themeToAdd = e.currentTarget.checked ? "dark" : "light";

      document.body.classList.add(`theme-${themeToAdd}`);
      document.body.classList.remove(`theme-${themeToRemove}`);

      if (!isAuthenticated()) {
        localStorage.setItem("theme", themeToAdd);
      }
    });

    if (!isAuthenticated()) {
      let savedTheme = localStorage.getItem("theme");

      if (savedTheme === null) {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        input.checked = mq.matches;
      } else {
        document.body.classList.add(`theme-${savedTheme}`);
        input.checked = savedTheme === "dark";
      }
    }
  }
}
