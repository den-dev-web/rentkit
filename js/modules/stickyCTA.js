export default function initStickyCTA({ onScrollToFilters } = {}) {
  const cta = document.querySelector("[data-sticky-cta]");
  const footer = document.querySelector("footer.footer");

  if (!cta || !footer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cta.dataset.visible = "false"; // футер видим → прячем
        } else {
          cta.dataset.visible = "true"; // футера нет → показываем CTA
        }
      });
    },
    {
      threshold: 0.01,
    }
  );

  observer.observe(footer);

  // Кнопка скроллит к фильтрам (если доступно)
  const button = cta.querySelector("button");
  if (!button) return;

  button.addEventListener("click", () => {
    if (typeof onScrollToFilters === "function") {
      onScrollToFilters();
      return;
    }
    const filtersBar = document.querySelector("#filters-bar");
    if (filtersBar) {
      filtersBar.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
