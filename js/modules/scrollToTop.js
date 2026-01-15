export default function initScrollToTop() {
  const btn = document.querySelector("[data-back-to-top]");

  if (!btn) return;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    btn.dataset.visible = y > 400 ? "true" : "false";
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
