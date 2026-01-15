import initHeader from "./modules/header.js";
import initFooterReveal from "./modules/footerReveal.js";
import initScrollToTop from "./modules/scrollToTop.js";
import initPropertyPage from "./modules/property.js";
import initStickyCTA from "./modules/stickyCTA.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initPropertyPage();
  initFooterReveal();
  initStickyCTA();
  initScrollToTop();
});
