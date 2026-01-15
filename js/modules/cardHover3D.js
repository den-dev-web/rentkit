export default function initCardHover3D() {
  const cards = document.querySelectorAll(".property-card");

  cards.forEach((card) => {
    const media = card.querySelector(".property-card__media-image");

    /* --- Наведение мыши --- */
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();

      // Нормализуем координаты внутри карточки (-0.5 → 0.5)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Коэффициенты 3D-вращения
      const rotateX = y * -10; // наклон вперёд/назад
      const rotateY = x * 10; // наклон вправо/влево

      // Коэффициенты параллакса картинки
      const parallaxX = x * -12;
      const parallaxY = y * -12;

      card.style.setProperty("--rx", `${rotateX}deg`);
      card.style.setProperty("--ry", `${rotateY}deg`);
      if (media) {
        card.style.setProperty("--px", `${parallaxX}px`);
        card.style.setProperty("--py", `${parallaxY}px`);
      }

      card.dataset.hover = "true";
    });

    /* --- Уход курсора --- */
    card.addEventListener("pointerleave", () => {
      card.dataset.hover = "false";

      // Сбрасываем значения для плавного возврата
      card.style.setProperty("--rx", `0deg`);
      card.style.setProperty("--ry", `0deg`);
      card.style.setProperty("--px", `0px`);
      card.style.setProperty("--py", `0px`);
    });
  });
}
