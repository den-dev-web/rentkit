import { applyTranslations, initLangSwitcher } from "./modules/i18n.js";
import initHeader from "./modules/header.js";
import initFooterReveal from "./modules/footerReveal.js";
import initScrollToTop from "./modules/scrollToTop.js";
import initPropertyPage from "./modules/property.js";
import initStickyCTA from "./modules/stickyCTA.js";

document.addEventListener("DOMContentLoaded", () => {
  // Переводы применяются до инициализации модулей, читающих тексты из DOM
  applyTranslations();
  initLangSwitcher();
  initHeader();
  initPropertyPage();
  initFooterReveal();
  initStickyCTA();
  initScrollToTop();
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
