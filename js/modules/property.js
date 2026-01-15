import { RENTKIT_PROPERTIES } from "../data/properties.js";

function getPropertyData() {
  const dataSource = RENTKIT_PROPERTIES || [];
  if (!dataSource.length) return null;

  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get("id");
  return (
    dataSource.find((item) => item.id === requestedId) || dataSource[0] || null
  );
}

function formatType(type) {
  const types = {
    studio: "Студия",
    apartment: "Квартира",
    house: "Дом",
  };
  return types[type] || "Жилье";
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
    const place = [propertyData.city, propertyData.locationNote]
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
        '<span class="property-badges__tag property-badges__tag--premium">Премиум</span>'
      );
    }
    if (propertyData.isNew) {
      tags.push(
        '<span class="property-badges__tag property-badges__tag--new">Новое</span>'
      );
    }
    badgesEl.innerHTML = tags.join("");
    badgesEl.hidden = tags.length === 0;
  }

  const specsEl = document.querySelector("[data-property-specs]");
  if (specsEl) {
    const specs = [
      {
        label: "Площадь",
        value: propertyData.area ? `${propertyData.area} м²` : null,
      },
      { label: "Этаж", value: propertyData.floor ?? null },
      { label: "Комнат", value: propertyData.rooms ?? null },
      { label: "Тип", value: formatType(propertyData.type) },
      { label: "Вид из окон", value: propertyData.view || null },
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
      "Фото"
    );
    galleryEl.innerHTML = "";
    gallery.forEach((item) => {
      const img = document.createElement("img");
      img.className = "property-grid-gallery__image";
      img.src = item.src;
      img.alt = item.alt;
      galleryEl.appendChild(img);
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
      hostAvatarEl.alt = hostName || "Хозяин";
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
    priceEl.textContent = `${propertyData.price.toLocaleString(
      "ru-RU"
    )} ₴ / месяц`;
  }

  const statusEl = document.querySelector("[data-property-status]");
  if (statusEl) {
    const isAvailable = propertyData.status === "available";
    statusEl.textContent = isAvailable ? "Доступно сейчас" : "Занято";
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
    reviewsCountEl.textContent = `${reviewsSummary.count} отзыва`;
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
        <img src="${review.avatar || ""}" class="review__avatar" alt="" />
        <div class="review__content">
          <h4 class="review__author">${review.author || "Гость"}</h4>
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
    propertyData.title || "Фото"
  );
  const thumbs = normalizeImages(
    propertyData.thumbs || images.map((item) => item.src),
    "Миниатюра"
  );

  imagesEl.innerHTML = "";
  thumbsEl.innerHTML = "";

  images.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = `property-hero__image${
      index === 0 ? " property-hero__image--active" : ""
    }`;
    const img = document.createElement("img");
    img.className = "property-hero__image-item";
    img.src = item.src;
    img.alt = item.alt;
    slide.appendChild(img);
    imagesEl.appendChild(slide);
  });

  thumbs.forEach((item, index) => {
    const thumb = document.createElement("img");
    thumb.className = "property-hero__thumb";
    thumb.src = item.src || item;
    thumb.alt = item.alt || `Миниатюра ${index + 1}`;
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
      moreBtn.textContent = "Скрыть";
      expanded = true;
    } else {
      list.classList.remove("expanded");
      moreBtn.textContent = "Показать ещё";
      expanded = false;
    }
  });
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

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];
  const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
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
    title.textContent = `${monthNames[month]} ${year}`;

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
    if (event.key === "Escape" && modal.classList.contains("calendar-modal--open")) {
      closeModal();
    }
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
  if (!propertyData) return;

  hydratePropertyPage(propertyData);
  initGallery();
  initSectionReveal();
  initReviewsToggle();
  initCalendar(propertyData);
  initSidebarPulse();
  fixSidebarOnMobile();
}
