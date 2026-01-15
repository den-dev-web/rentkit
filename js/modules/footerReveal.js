export default function initFooterReveal() {
  const footer = document.querySelector("footer.footer");
  if (!footer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          footer.dataset.visible = "true";
          observer.unobserve(footer);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  observer.observe(footer);
}
