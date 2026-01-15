import initHeader from "./modules/header.js";
import initHeroSlider from "./modules/hero-slider.js";
import initCatalog from "./modules/catalog.js";
import initFaq from "./modules/faq.js";
import initReveal from "./modules/reveal.js";
import initCardHover3D from "./modules/cardHover3D.js";
import initFooterReveal from "./modules/footerReveal.js";
import initStickyCTA from "./modules/stickyCTA.js";
import initScrollToTop from "./modules/scrollToTop.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initHeroSlider();
  initReveal();
  const catalogApi = initCatalog();
  initFaq();
  initCardHover3D();
  initFooterReveal();
  initStickyCTA({ onScrollToFilters: catalogApi?.scrollToFiltersBar });
  initScrollToTop();
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();
