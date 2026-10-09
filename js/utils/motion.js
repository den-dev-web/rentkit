const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Пользователь попросил ОС уменьшить анимации
export const prefersReducedMotion = () =>
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

export const scrollBehavior = () =>
  prefersReducedMotion() ? "auto" : "smooth";
