import { Switch } from "./Switch";
import { ThemeSwitcher } from "./ThemeSwitcher";

window.customElements.define("input-switch", Switch, {
  extends: "input",
});
window.customElements.define("theme-switcher", ThemeSwitcher); // <theme-switcher></theme-switcher>
