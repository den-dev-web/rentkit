import { RENTKIT_PROPERTIES } from "../data/properties.js";
import { t, tPlural, formatNumber, locale, localizeData } from "./i18n.js";

function getPropertyData() {
  const dataSource = RENTKIT_PROPERTIES || [];
  if (!dataSource.length) return null;

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id");
  // Без id показываем первый объект как демо; неизвестный id — «не найдено»
  const item = requestedId
    ? dataSource.find((property) => property.id === requestedId)
    : dataSource[0];
  return item ? localizeData(item) : null;
}

function showNotFound() {
  const root = document.querySelector(".property");
  const notFound = root?.querySelector("[data-property-not-found]");
  if (!root || !notFound) return;

  [...root.children].forEach((el) => {
    el.classList.toggle("u-hidden", el !== notFound);
  });
  document.title = `${notFound.querySelector("h2")?.textContent.trim()} — RentKit`;
}

// Все фото объектов — 1600×600; рядом лежат .avif и .webp версии
const PHOTO_WIDTH = 1600;
const PHOTO_HEIGHT = 600;
const THUMB_WIDTH = 267;
const THUMB_HEIGHT = 100;
const MODERN_FORMATS = [
  ["avif", "image/avif"],
  ["webp", "image/webp"],
];

function createPicture(src, alt, { imgClass, pictureClass, eager = false }) {
  const picture = document.createElement("picture");
  if (pictureClass) picture.className = pictureClass;

  if (src.endsWith(".jpg")) {
    MODERN_FORMATS.forEach(([ext, type]) => {
      const source = document.createElement("source");
      source.srcset = src.replace(/\.jpg$/, `.${ext}`);
      source.type = type;
      picture.appendChild(source);
    });
  }

  const img = document.createElement("img");
  img.className = imgClass;
  img.src = src;
  img.alt = alt;
  img.width = PHOTO_WIDTH;
  img.height = PHOTO_HEIGHT;
  img.decoding = "async";
  img.loading = eager ? "eager" : "lazy";
  if (eager) img.fetchPriority = "high";
  picture.appendChild(img);
  return picture;
}

function formatType(type) {
  const types = ["studio", "apartment", "house"];
  return types.includes(type) ? t(`type.${type}`) : t("type.fallback");
}

function formatStars(rating) {
  const value = typeof rating === "number" ? rating : 0;
  const full = Math.max(0, Math.min(5, Math.round(value)));
  const empty = 5 - full;
  return `${"★".repeat(full)}${"☆".repeat(empty)}`;
}

function buildMapUrl(query) {
  const encoded = encodeURIComponent(query);
  return `https://maps.google.com/maps?q=${encoded}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

function normalizeImages(items, fallbackAlt) {
  if (!Array.isArray(items)) return [];
  return items
    .map((item, index) => {
      if (typeof item === "string") {
        return { src: item, alt: `${fallbackAlt} ${index + 1}` };
      }
      if (item && typeof item === "object" && item.src) {
        return {
          src: item.src,
          alt: item.alt || `${fallbackAlt} ${index + 1}`,
        };
      }
      return null;
    })
    .filter(Boolean);
}

function hydratePropertyPage(propertyData) {
  if (!propertyData) return;

  const propertyRoot = document.querySelector(".property");
  if (propertyRoot && propertyData.id) {
    propertyRoot.dataset.propertyId = propertyData.id;
  }

  const titleEl = document.querySelector("[data-property-title]");
  if (titleEl && propertyData.title) {
    titleEl.textContent = propertyData.title;
    document.title = `${propertyData.title} — RentKit`;
  }

  const metaEl = document.querySelector("[data-property-meta]");
  if (metaEl) {
    const place = [t(`city.${propertyData.city}`), propertyData.locationNote]
      .filter(Boolean)
      .join(", ");
    const address = propertyData.address ? ` — ${propertyData.address}` : "";
    metaEl.textContent = `${place}${address}`.trim();
  }

  const badgesEl = document.querySelector("[data-property-badges]");
  if (badgesEl) {
    badgesEl.innerHTML = "";
    const tags = [];
    if (propertyData.isPremium) {
      tags.push(
        `<span class="property-badges__tag property-badges__tag--premium">${t("badge.premium")}</span>`
      );
    }
    if (propertyData.isNew) {
      tags.push(
        `<span class="property-badges__tag property-badges__tag--new">${t("badge.new")}</span>`
      );
    }
    badgesEl.innerHTML = tags.join("");
    badgesEl.hidden = tags.length === 0;
  }

  const specsEl = document.querySelector("[data-property-specs]");
  if (specsEl) {
    const specs = [
      {
        label: t("spec.area"),
        value: propertyData.area
          ? t("card.area", { area: propertyData.area })
          : null,
      },
      { label: t("spec.floor"), value: propertyData.floor ?? null },
      { label: t("spec.rooms"), value: propertyData.rooms ?? null },
      { label: t("spec.type"), value: formatType(propertyData.type) },
      { label: t("spec.view"), value: propertyData.view || null },
    ].filter((item) => item.value !== null);

    specsEl.innerHTML = "";
    specs.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="property-specs__label">${item.label}:</span> ${item.value}`;
      specsEl.appendChild(li);
    });
  }

  const descriptionEl = document.querySelector("[data-property-description]");
  if (descriptionEl && propertyData.description) {
    descriptionEl.textContent = propertyData.description;
  }

  const metaDescriptionEl = document.querySelector('meta[name="description"]');
  if (metaDescriptionEl && propertyData.description) {
    metaDescriptionEl.content = propertyData.description;
  }

  const featuresEl = document.querySelector("[data-property-features]");
  if (featuresEl) {
    const features = Array.isArray(propertyData.features)
      ? propertyData.features
      : [];
    featuresEl.innerHTML = "";
    features.forEach((feature) => {
      const li = document.createElement("li");
      li.className = "property-features__item";
      li.textContent = feature;
      featuresEl.appendChild(li);
    });
  }

  const galleryEl = document.querySelector("[data-property-gallery]");
  if (galleryEl) {
    const gallery = normalizeImages(
      propertyData.gallery || propertyData.heroImages || [],
      t("gallery.photo")
    );
    galleryEl.innerHTML = "";
    gallery.forEach((item) => {
      galleryEl.appendChild(
        createPicture(item.src, item.alt, {
          imgClass: "property-grid-gallery__image",
        })
      );
    });
  }

  const hostAvatarEl = document.querySelector("[data-property-host-avatar]");
  const hostNameEl = document.querySelector("[data-property-host-name]");
  const hostMetaEl = document.querySelector("[data-property-host-meta]");
  if (propertyData.host) {
    const hostName = [propertyData.host.name, propertyData.host.role]
      .filter(Boolean)
      .join(", ");
    if (hostAvatarEl && propertyData.host.avatar) {
      hostAvatarEl.src = propertyData.host.avatar;
      hostAvatarEl.alt = hostName || t("host.fallback");
    }
    if (hostNameEl && hostName) {
      hostNameEl.textContent = hostName;
    }
    if (hostMetaEl && propertyData.host.meta) {
      hostMetaEl.textContent = propertyData.host.meta;
    }
  }

  const priceEl = document.querySelector("[data-property-price]");
  if (priceEl && typeof propertyData.price === "number") {
    priceEl.textContent = t("property.pricePerMonth", {
      price: formatNumber(propertyData.price),
    });
  }

  const statusEl = document.querySelector("[data-property-status]");
  if (statusEl) {
    const isAvailable = propertyData.status === "available";
    statusEl.textContent = isAvailable
      ? t("status.availableNow")
      : t("status.busy");
    statusEl.classList.toggle("sidebar-status--available", isAvailable);
  }

  const sidebarNotesEl = document.querySelector("[data-property-sidebar-notes]");
  if (sidebarNotesEl) {
    const notes = Array.isArray(propertyData.sidebarNotes)
      ? propertyData.sidebarNotes
      : [];
    sidebarNotesEl.innerHTML = "";
    notes.forEach((note) => {
      const span = document.createElement("span");
      span.textContent = note;
      sidebarNotesEl.appendChild(span);
    });
  }

  const mapEl = document.querySelector("[data-property-map]");
  const mapQuery = propertyData.mapQuery || propertyData.city;
  if (mapEl && mapQuery) {
    mapEl.src = buildMapUrl(mapQuery);
  }

  const reviewsRatingEl = document.querySelector("[data-reviews-rating]");
  const reviewsStarsEl = document.querySelector("[data-reviews-stars]");
  const reviewsCountEl = document.querySelector("[data-reviews-count]");
  const reviewsSummary = propertyData.reviewsSummary || {};
  if (reviewsRatingEl && typeof reviewsSummary.rating === "number") {
    reviewsRatingEl.textContent = reviewsSummary.rating.toFixed(1);
  }
  if (reviewsStarsEl) {
    reviewsStarsEl.textContent = formatStars(reviewsSummary.rating);
  }
  if (reviewsCountEl && typeof reviewsSummary.count === "number") {
    reviewsCountEl.textContent = tPlural("reviews.count", reviewsSummary.count);
  }

  const reviewsListEl = document.querySelector("[data-reviews-list]");
  if (reviewsListEl) {
    const reviews = Array.isArray(propertyData.reviews)
      ? propertyData.reviews
      : [];
    reviewsListEl.innerHTML = "";
    reviews.forEach((review) => {
      const article = document.createElement("article");
      article.className = "review";
      article.innerHTML = `
        <img src="${review.avatar || ""}" class="review__avatar" alt="" width="128" height="128" loading="lazy" />
        <div class="review__content">
          <h3 class="review__author">${review.author || t("review.guest")}</h3>
          <div class="review__stars">${formatStars(review.rating)}</div>
          <p class="review__text">${review.text || ""}</p>
        </div>
      `;
      reviewsListEl.appendChild(article);
    });
    const moreBtn = document.querySelector("[data-reviews-more]");
    if (moreBtn) {
      moreBtn.hidden = reviews.length <= 2;
    }
  }

  renderHeroGallery(propertyData);
}

function renderHeroGallery(propertyData) {
  const imagesEl = document.querySelector("[data-gallery-images]");
  const thumbsEl = document.querySelector("[data-gallery-thumbs]");
  const prevBtn = document.querySelector("[data-gallery-prev]");
  const nextBtn = document.querySelector("[data-gallery-next]");

  if (!imagesEl || !thumbsEl) return;

  const images = normalizeImages(
    propertyData.heroImages || propertyData.gallery || [],
    propertyData.title || t("gallery.photo")
  );
  const thumbs = normalizeImages(
    propertyData.thumbs || images.map((item) => item.src),
    t("gallery.thumb")
  );

  imagesEl.innerHTML = "";
  thumbsEl.innerHTML = "";

  images.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = `property-hero__image${
      index === 0 ? " property-hero__image--active" : ""
    }`;
    // Первое фото — LCP страницы
    slide.appendChild(
      createPicture(item.src, item.alt, {
        imgClass: "property-hero__image-item",
        pictureClass: "property-hero__picture",
        eager: index === 0,
      })
    );
    imagesEl.appendChild(slide);
  });

  thumbs.forEach((item, index) => {
    const thumb = document.createElement("img");
    thumb.className = "property-hero__thumb";
    thumb.src = item.src || item;
    thumb.alt = item.alt || `${t("gallery.thumb")} ${index + 1}`;
    thumb.width = THUMB_WIDTH;
    thumb.height = THUMB_HEIGHT;
    if (index === 0) thumb.classList.add("property-hero__thumb--active");
    thumbsEl.appendChild(thumb);
  });

  const hasMultiple = images.length > 1;
  if (prevBtn) prevBtn.hidden = !hasMultiple;
  if (nextBtn) nextBtn.hidden = !hasMultiple;
  thumbsEl.hidden = !hasMultiple;
}

function initGallery() {
  const slides = [...document.querySelectorAll(".property-hero__image")];
  const thumbs = [...document.querySelectorAll(".property-hero__thumb")];

  const prevBtn = document.querySelector("[data-gallery-prev]");
  const nextBtn = document.querySelector("[data-gallery-next]");

  if (!slides.length || !thumbs.length || !prevBtn || !nextBtn) return;

  let index = 0;

  function showSlide(i) {
    slides.forEach((s) => s.classList.remove("property-hero__image--active"));
    thumbs.forEach((t) => t.classList.remove("property-hero__thumb--active"));

    slides[i].classList.add("property-hero__image--active");
    thumbs[i].classList.add("property-hero__thumb--active");

    index = i;
  }

  showSlide(0);

  prevBtn.addEventListener("click", () => {
    const i = (index - 1 + slides.length) % slides.length;
    showSlide(i);
  });

  nextBtn.addEventListener("click", () => {
    const i = (index + slides.length + 1) % slides.length;
    showSlide(i);
  });

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => showSlide(i));
  });

  const gallery = document.querySelector(".property-hero__gallery");
  if (!gallery) return;
  let touchStartX = 0;
  gallery.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  gallery.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      diff < 0 ? nextBtn.click() : prevBtn.click();
    }
  });
}

function initSectionReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("property-section--visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll(".property-section")
    .forEach((section) => observer.observe(section));
}

function initReviewsToggle() {
  const moreBtn = document.querySelector("[data-reviews-more]");
  const list = document.querySelector(".reviews-list");

  if (!moreBtn || !list) return;

  let expanded = false;

  moreBtn.addEventListener("click", () => {
    if (!expanded) {
      list.classList.add("expanded");
      moreBtn.textContent = t("common.hide");
      expanded = true;
    } else {
      list.classList.remove("expanded");
      moreBtn.textContent = t("common.showMore");
      expanded = false;
    }
  });
}

// Удерживает Tab внутри открытой модалки
function trapFocus(container, event) {
  const focusable = [
    ...container.querySelectorAll(
      'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
    ),
  ].filter((el) => el.offsetParent !== null);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function initCalendar(propertyData) {
  const mini = document.getElementById("calendar-mini");
  const modal = document.querySelector("[data-calendar-modal]");
  const openBtn = document.querySelector("[data-calendar-open]");
  const closeBtns = document.querySelectorAll("[data-calendar-close]");
  const grid = document.querySelector("[data-calendar-grid]");

  if (!mini || !modal || !openBtn || !grid) return;
  let lastFocusedElement = null;

  const bookedDates = new Set(
    (propertyData.bookedDates || []).map((date) => date)
  );

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
  const weekdayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 1 января 2024 — понедельник: берём 7 дней подряд, начиная с него
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    capitalize(weekdayFormatter.format(new Date(2024, 0, 1 + i)))
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function toIsoDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function renderMonth(target, year, month, isMini) {
    const wrapper = document.createElement("div");
    wrapper.className = `calendar-month${
      isMini ? " calendar-month--mini" : ""
    }`;

    const header = document.createElement("div");
    header.className = "calendar-month__header";

    const title = document.createElement("div");
    title.className = "calendar-month__title";
    title.textContent = `${capitalize(
      monthFormatter.format(new Date(year, month, 1))
    )} ${year}`;

    const meta = document.createElement("div");
    meta.className = "calendar-month__meta";

    header.append(title, meta);

    const calendar = document.createElement("div");
    calendar.className = `calendar${isMini ? " calendar--mini" : ""}`;
    if (!isMini) {
      calendar.classList.add("calendar-grid__calendar");
    }

    const weekdayRow = document.createElement("div");
    weekdayRow.className = "calendar-weekdays";
    weekdays.forEach((name) => {
      const el = document.createElement("div");
      el.textContent = name;
      weekdayRow.appendChild(el);
    });

    const daysGrid = document.createElement("div");
    daysGrid.className = "calendar-days";

    const firstDay = new Date(year, month, 1);
    const startOffset = (firstDay.getDay() + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = 0; i < startOffset; i++) {
      const cell = document.createElement("div");
      cell.className = "calendar__day calendar__day--muted";
      cell.textContent = prevMonthDays - startOffset + i + 1;
      daysGrid.appendChild(cell);
    }

    for (let day = 1; day <= totalDays; day++) {
      const cell = document.createElement("div");
      const currentDate = new Date(year, month, day);
      const isoDate = toIsoDate(currentDate);
      const isPast = currentDate < today;
      const isBusy = bookedDates.has(isoDate);

      cell.className = "calendar__day";
      cell.textContent = day;

      if (isPast) {
        cell.classList.add("calendar__day--muted");
      } else if (isBusy) {
        cell.classList.add("calendar__day--busy");
      } else {
        cell.classList.add("calendar__day--free");
      }

      if (isoDate === toIsoDate(today)) {
        cell.classList.add("calendar__day--today");
      }

      daysGrid.appendChild(cell);
    }

    const totalCells = startOffset + totalDays;
    const trailing = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= trailing; i++) {
      const cell = document.createElement("div");
      cell.className = "calendar__day calendar__day--muted";
      cell.textContent = i;
      daysGrid.appendChild(cell);
    }

    calendar.append(weekdayRow, daysGrid);
    wrapper.append(header, calendar);
    target.appendChild(wrapper);
  }

  function renderMini() {
    mini.innerHTML = "";
    const now = new Date();
    renderMonth(mini, now.getFullYear(), now.getMonth(), true);
  }

  function renderModal() {
    grid.innerHTML = "";
    const base = new Date();
    for (let i = 0; i < 3; i++) {
      const date = new Date(base.getFullYear(), base.getMonth() + i, 1);
      renderMonth(grid, date.getFullYear(), date.getMonth(), false);
    }
  }

  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add("calendar-modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const focusTarget =
      modal.querySelector(".calendar-modal__close") ||
      modal.querySelector("button, [href], input, select, textarea");
    if (focusTarget) focusTarget.focus();
  }

  function closeModal() {
    modal.classList.remove("calendar-modal--open");
    if (lastFocusedElement && lastFocusedElement.focus) {
      lastFocusedElement.focus();
    } else if (openBtn && openBtn.focus) {
      openBtn.focus();
    }
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  renderMini();
  renderModal();

  openBtn.addEventListener("click", openModal);
  closeBtns.forEach((btn) => btn.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("calendar-modal--open")) return;
    if (event.key === "Tab") trapFocus(modal, event);
    if (event.key === "Escape") closeModal();
  });
}

const MIN_PHONE_DIGITS = 10;

function initContactModal() {
  const modal = document.querySelector("[data-contact-modal]");
  const openBtn = document.querySelector("[data-contact-open]");
  const form = modal?.querySelector("[data-contact-form]");
  const success = modal?.querySelector("[data-contact-success]");
  if (!modal || !openBtn || !form || !success) return;

  const validators = {
    name: (value) => value.trim().length > 0,
    phone: (value) => value.replace(/\D/g, "").length >= MIN_PHONE_DIGITS,
  };

  function setFieldError(name, isInvalid) {
    const input = form.elements[name];
    const error = form.querySelector(`[data-error-for="${name}"]`);
    input.setAttribute("aria-invalid", String(isInvalid));
    if (error) error.hidden = !isInvalid;
  }

  function validate() {
    let firstInvalid = null;
    Object.entries(validators).forEach(([name, isValid]) => {
      const invalid = !isValid(form.elements[name].value);
      setFieldError(name, invalid);
      if (invalid && !firstInvalid) firstInvalid = form.elements[name];
    });
    firstInvalid?.focus();
    return !firstInvalid;
  }

  function openModal() {
    form.reset();
    Object.keys(validators).forEach((name) => setFieldError(name, false));
    form.classList.remove("u-hidden");
    success.hidden = true;

    modal.classList.add("contact-modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    form.elements.name.focus();
  }

  function closeModal() {
    modal.classList.remove("contact-modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    openBtn.focus();
  }

  openBtn.addEventListener("click", openModal);
  modal
    .querySelectorAll("[data-contact-close]")
    .forEach((btn) => btn.addEventListener("click", closeModal));
  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("contact-modal--open")) return;
    if (event.key === "Tab") trapFocus(modal, event);
    if (event.key === "Escape") closeModal();
  });

  // Повторная проверка поля, как только пользователь исправляет ошибку
  form.addEventListener("input", (event) => {
    const { name, value } = event.target;
    if (validators[name] && event.target.getAttribute("aria-invalid") === "true") {
      setFieldError(name, !validators[name](value));
    }
  });

  // Бэкенда нет — после валидации показываем подтверждение
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validate()) return;
    form.classList.add("u-hidden");
    success.hidden = false;
    success.querySelector("[data-contact-close]")?.focus();
  });
}

function initSidebarPulse() {
  const price = document.querySelector(".sidebar-price");
  if (!price) return;

  const onScroll = () => {
    if (window.scrollY < 180) {
      price.classList.add("sidebar-price--pulse");
    } else {
      price.classList.remove("sidebar-price--pulse");
    }
  };

  document.addEventListener("scroll", onScroll, { passive: true });
}

function fixSidebarOnMobile() {
  const sidebarCard = document.querySelector(".property-sidebar__card");
  if (sidebarCard && window.innerWidth < 960) {
    sidebarCard.style.position = "static";
  }
}

export default function initPropertyPage() {
  const propertyData = getPropertyData();
  if (!propertyData) {
    showNotFound();
    return;
  }

  hydratePropertyPage(propertyData);
  initGallery();
  initSectionReveal();
  initReviewsToggle();
  initCalendar(propertyData);
  initContactModal();
  initSidebarPulse();
  fixSidebarOnMobile();
}
