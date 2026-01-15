export default function initHeroSlider() {
  const slider = document.querySelector("[data-hero-slider]");
  if (!slider) {
    console.warn("Hero slider root not found");
    return;
  }

  const slides = Array.from(slider.querySelectorAll("[data-slide]"));
  if (slides.length === 0) {
    console.warn("No slides found inside hero slider");
    return;
  }

  const titleEl = document.querySelector("[data-hero-title]");
  const subtitleEl = document.querySelector("[data-hero-subtitle]");
  const progress = document.querySelector("[data-hero-progress]");

  if (!titleEl || !subtitleEl || !progress) {
    console.warn("Hero text or progress elements not found");
    return;
  }

  let index = 0;
  const DURATION = 5500;

  // ---------------------------
  // Безопасное применение слайда
  // ---------------------------
  function applySlide(i) {
    const slide = slides[i];
    if (!slide) {
      console.warn("Slide index missing:", i);
      return;
    }

    // Видимые / невидимые слайды
    slides.forEach((s) => {
      if (!s) return;
      s.classList.remove("hero__slide--active");
    });

    slide.classList.add("hero__slide--active");

    // Текстовые элементы
    const titleNode = slide.querySelector(".hero__title-slide");
    const subtitleNode = slide.querySelector(".hero__subtitle-slide");

    const title = titleNode ? titleNode.textContent : "";
    const subtitle = subtitleNode ? subtitleNode.textContent : "";

    // скрываем старый текст
    titleEl.dataset.state = "hidden";
    subtitleEl.dataset.state = "hidden";

    // ждем половину fade-out
    setTimeout(() => {
      titleEl.textContent = title;
      subtitleEl.textContent = subtitle;
      titleEl.dataset.state = "visible";
      subtitleEl.dataset.state = "visible";
    }, 350);

    // Прогресс-бар (полный сброс и запуск анимации)
    progress.style.animation = "none";
    void progress.offsetWidth; // перезапускаем CSS-анимацию
    progress.style.animation = `hero-progress ${DURATION}ms linear forwards`;

    // Мягкая маска (если нужна)
    slider.classList.toggle("hero__bg-slider--mask-fade");
  }

  // ---------------------------
  // Параллакс
  // ---------------------------
  window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.08;
    slider.style.setProperty("--parallax-offset", `${offset}px`);
  });

  // ---------------------------
  // Автосмена слайдов
  // ---------------------------
  function nextSlide() {
    index = (index + 1) % slides.length;
    applySlide(index);
  }

  // запуск первого кадра
  applySlide(index);

  setInterval(nextSlide, DURATION);
}
