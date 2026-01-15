export default function initFaq() {
  const faqList = document.querySelector("[data-faq]");
  if (!faqList) return;

  faqList.addEventListener("click", (e) => {
    const btn = e.target.closest(".faq__question");
    if (!btn) return;

    const item = btn.closest("[data-faq-item]");
    const panel = item.querySelector(".faq__answer");
    const isOpen = item.dataset.state === "open";

    // accessibility attributes
    btn.setAttribute("aria-expanded", !isOpen);
    panel.hidden = isOpen;

    // toggle data-state
    item.dataset.state = isOpen ? "closed" : "open";

    // одиночное раскрытие: закрывать остальные
    faqList.querySelectorAll("[data-faq-item]").forEach((el) => {
      if (el !== item) {
        el.dataset.state = "closed";
        el.querySelector(".faq__question").setAttribute("aria-expanded", false);
        el.querySelector(".faq__answer").hidden = true;
      }
    });
  });
}
