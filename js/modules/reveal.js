export const cardObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("property-card--visible");
      obs.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -5% 0px",
  }
);

export const observeCard = (card) => {
  if (card) {
    cardObserver.observe(card);
  }
};

export default function initReveal() {
  const cascadeObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const target = entry.target;
        const words = target.querySelectorAll(".cascade__word");
        const step = Number(target.dataset.cascadeStep) || 250;

        words.forEach((word, index) => {
          const delay = step * (index + 1);
          word.style.transitionDelay = `${delay}ms`;
        });

        target.classList.add("cascade--visible");
        obs.unobserve(target);
      });
    },
    { threshold: 0.35 }
  );

  document.querySelectorAll("h2").forEach((h2) => {
    if (!h2.hasAttribute("data-cascade")) {
      h2.setAttribute("data-cascade", "");
      h2.classList.add("cascade");
    }
  });

  const cascades = document.querySelectorAll("[data-cascade]");

  cascades.forEach((el) => {
    if (el.dataset.cascadeReady === "true") return;
    el.classList.add("cascade");

    const words = el.textContent.trim().split(/\s+/).filter(Boolean);
    if (!words.length) return;

    el.textContent = "";

    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.className = "cascade__word";
      span.textContent = word;
      el.appendChild(span);

      if (index !== words.length - 1) {
        el.appendChild(document.createTextNode(" "));
      }
    });

    el.dataset.cascadeReady = "true";
    cascadeObserver.observe(el);
  });

  const revealSections = document.querySelectorAll("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const section = entry.target;
        const stagger =
          Number(section.dataset.revealStagger) > 0
            ? Number(section.dataset.revealStagger)
            : 300;

        section
          .querySelectorAll("[data-reveal-item]")
          .forEach((item, index) => {
            item.style.transitionDelay = `${index * stagger}ms`;
          });

        section.classList.add("reveal--visible");
        obs.unobserve(section);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealSections.forEach((section) => {
    section.classList.add("reveal");
    section
      .querySelectorAll("[data-reveal-item]")
      .forEach((item) => item.classList.add("reveal__item"));
    observer.observe(section);
  });

  const parallaxEl = document.querySelector("[data-parallax]");
  if (parallaxEl) {
    window.addEventListener(
      "scroll",
      () => {
        const offset = window.scrollY * 0.1;
        parallaxEl.style.transform = `translateY(${offset}px)`;
      },
      { passive: true }
    );
  }

  document
    .querySelectorAll(".property-card[data-reveal-item]")
    .forEach((card) => {
      if (card.closest("[data-reveal]")) return;
      observeCard(card);
    });
}
