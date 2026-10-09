import { RENTKIT_PROPERTIES as RAW_PROPERTIES } from "../data/properties.js";
import { observeCard } from "./reveal.js";
import { scrollBehavior } from "../utils/motion.js";
import { t, tPlural, formatNumber, localizeData } from "./i18n.js";

const RENTKIT_PROPERTIES = localizeData(RAW_PROPERTIES);

export default function initCatalog() {
  const skeletonGrid = document.querySelector("[data-skeleton-grid]");
  const catalogGrid = document.querySelector("[data-catalog-grid]");
  const loadMoreBtn = document.querySelector("[data-load-more]");
  const loadMoreWrap = loadMoreBtn?.closest(".catalog__actions");
  const sentinel = document.querySelector("[data-catalog-sentinel]");
  const emptyState = document.querySelector("[data-catalog-empty]");
  const filtersForm = document.querySelector("[data-filters-form]");
  const modal = document.querySelector("[data-filters-modal]");
  const openBtn = document.querySelector("[data-open-filters]");
  const closeBtns = document.querySelectorAll("[data-close-filters]");
  const applyBtn = document.querySelector("[data-apply-filters]");
  const activeBox = document.querySelector("[data-filters-active]");
  const heroForm = document.querySelector("[data-hero-form]");
  const filtersBar = document.querySelector("#filters-bar");
  let lastFocusedElement = null;

  const PAGE_SIZE = 9;
  let visibleCount = PAGE_SIZE;
  let appliedFilters = null;
  let revealFallbackBound = false;

  if (!filtersForm || !catalogGrid || !skeletonGrid) {
    return { scrollToFiltersBar: () => {} };
  }

  const setScrollLock = (locked) => {
    const root = document.documentElement;
    if (locked) {
      root.classList.add("is-scroll-locked");
      document.body.classList.add("is-scroll-locked");
    } else {
      root.classList.remove("is-scroll-locked");
      document.body.classList.remove("is-scroll-locked");
    }
  };

  const popoverOrigins = new Map();
  const filterPopovers = new Map();
  const popoverOwners = new Map();
  let activeFloating = null;

  const getFilterPopover = (filter) => {
    if (!filter) return null;
    let popover = filterPopovers.get(filter);
    if (!popover) {
      popover = filter.querySelector(".filter-popover");
      if (popover) {
        filterPopovers.set(filter, popover);
        popoverOwners.set(popover, filter);
      }
    }
    if (popover) popoverOwners.set(popover, filter);
    return popover;
  };

  const ensurePopoverLayer = (modalEl) => {
    if (!modalEl) return null;
    let layer = modalEl.querySelector(".filters-modal__popover-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "filters-modal__popover-layer";
      modalEl.appendChild(layer);
    }
    return layer;
  };

  const positionFloatingPopover = (filter, popover, layer) => {
    const trigger =
      filter.querySelector("[data-filter-trigger]") ||
      filter.querySelector(".filter-pill");
    if (!trigger || !layer) return;

    const layerRect = layer.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const spacing = 10;
    const edgePadding = 16;

    const minWidth = Math.max(220, Math.round(triggerRect.width));
    popover.style.minWidth = `${minWidth}px`;

    let left = triggerRect.left - layerRect.left;
    let top = triggerRect.bottom - layerRect.top + spacing;

    const maxLeft = layerRect.width - popover.offsetWidth - edgePadding;
    const maxTop = layerRect.height - popover.offsetHeight - edgePadding;

    left = Math.max(edgePadding, Math.min(left, maxLeft));
    top = Math.max(edgePadding, Math.min(top, maxTop));

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  };

  const attachFloatingPopover = (filter) => {
    if (!filter?.closest(".filters-modal__panel")) return;
    const popover = getFilterPopover(filter);
    if (!popover) return;

    const modalEl = filter.closest(".filters-modal");
    const layer = ensurePopoverLayer(modalEl);
    if (!layer) return;

    if (!popoverOrigins.has(popover)) {
      popoverOrigins.set(popover, {
        parent: popover.parentNode,
        nextSibling: popover.nextSibling,
      });
    }

    if (popover.parentNode !== layer) {
      layer.appendChild(popover);
    }

    popover.classList.add(
      "filter-popover--floating",
      "filter-popover--visible",
    );
    positionFloatingPopover(filter, popover, layer);

    const scrollContainer = modalEl?.querySelector(".filters-modal__scroll");
    const update = () => positionFloatingPopover(filter, popover, layer);
    if (activeFloating?.cleanup) activeFloating.cleanup();

    window.addEventListener("resize", update);
    scrollContainer?.addEventListener("scroll", update, { passive: true });

    activeFloating = {
      filter,
      cleanup: () => {
        window.removeEventListener("resize", update);
        scrollContainer?.removeEventListener("scroll", update);
      },
    };
  };

  const detachFloatingPopover = (filter) => {
    const popover = getFilterPopover(filter);
    if (!popover) return;

    popover.classList.remove(
      "filter-popover--floating",
      "filter-popover--visible",
    );
    popover.style.left = "";
    popover.style.top = "";
    popover.style.minWidth = "";

    const origin = popoverOrigins.get(popover);
    if (origin?.parent) {
      if (
        origin.nextSibling &&
        origin.nextSibling.parentNode === origin.parent
      ) {
        origin.parent.insertBefore(popover, origin.nextSibling);
      } else {
        origin.parent.appendChild(popover);
      }
    }

    if (activeFloating?.filter === filter) {
      activeFloating.cleanup();
      activeFloating = null;
    }
  };

  const setTriggerExpanded = (filter, isExpanded) => {
    filter
      .querySelector("[data-filter-trigger]")
      ?.setAttribute("aria-expanded", String(isExpanded));
  };

  const openFilterPopover = (filter) => {
    if (!filter) return;
    filter.classList.add("filter--open");
    attachFloatingPopover(filter);
    setTriggerExpanded(filter, true);
    // Поповер в модалке переносится в конец DOM — фокус переводим явно
    getFilterPopover(filter)
      ?.querySelector(".filter-list__item, .chip")
      ?.focus();
  };

  const closeFilterPopover = (filter) => {
    if (!filter) return;
    filter.classList.remove("filter--open");
    detachFloatingPopover(filter);
    setTriggerExpanded(filter, false);
  };

  const getAppliedFilters = () => {
    if (!appliedFilters) appliedFilters = getFiltersFromForm();
    return appliedFilters;
  };

  const refreshCatalog = () => {
    const filtered = applyFilters();
    visibleCount = Math.min(PAGE_SIZE, filtered.length || PAGE_SIZE);
    renderState(filtered);
  };

  const findFilterOption = (filter, value) => {
    if (!filter) return null;
    const target = String(value).toLowerCase();
    const popover = getFilterPopover(filter);
    const scope = popover || filter;
    return [...scope.querySelectorAll(".filter-list__item")].find(
      (item) => (item.dataset.value ?? "").toLowerCase() === target,
    );
  };

  const setFilterLabelFromValue = (filter, value, fallback) => {
    if (!filter) return;
    const valueEl = filter.querySelector("[data-filter-value]");
    if (!valueEl) return;
    if (value === "" || value === null || value === undefined) {
      valueEl.textContent = fallback;
      return;
    }
    const option = findFilterOption(filter, value);
    valueEl.textContent = option ? option.textContent : fallback;
  };

  const getMatchedFilterValue = (filter, value) => {
    const option = findFilterOption(filter, value);
    return option ? (option.dataset.value ?? "") : String(value);
  };

  const syncFormWithApplied = (filters) => {
    if (!filtersForm) return;

    const cityFilter = filtersForm.querySelector("[data-filter='city']");
    const cityInput = cityFilter?.querySelector("input[name='city']");
    const cityValue = filters.city
      ? getMatchedFilterValue(cityFilter, filters.city)
      : "";
    if (cityInput) cityInput.value = cityValue;
    setFilterLabelFromValue(cityFilter, cityValue, t("filter.anyCity"));

    const priceFilter = filtersForm.querySelector("[data-filter='price']");
    const minInput = priceFilter?.querySelector('input[name="priceMin"]');
    const maxInput = priceFilter?.querySelector('input[name="priceMax"]');
    if (minInput)
      minInput.value =
        filters.priceMin === null ? "" : String(filters.priceMin);
    if (maxInput)
      maxInput.value =
        filters.priceMax === null ? "" : String(filters.priceMax);

    let priceToken = "";
    if (filters.priceMin === null && filters.priceMax === null) {
      priceToken = "";
    } else if (filters.priceMin !== null && filters.priceMax !== null) {
      priceToken = String(filters.priceMax);
    } else if (filters.priceMin !== null && filters.priceMax === null) {
      priceToken = `${filters.priceMin}+`;
    } else if (filters.priceMin === null && filters.priceMax !== null) {
      priceToken = String(filters.priceMax);
    }
    setFilterLabelFromValue(priceFilter, priceToken, t("filter.any"));

    const roomsFilter = filtersForm.querySelector("[data-filter='rooms']");
    const roomsInput = roomsFilter?.querySelector('input[name="rooms"]');
    if (roomsInput) roomsInput.value = filters.rooms || "";
    setFilterLabelFromValue(roomsFilter, filters.rooms || "", t("filter.anyRooms"));

    const sortFilter = document.querySelector("[data-filter='sorting']");
    const sortInput = filtersForm.querySelector('input[name="sort"]');
    if (sortInput) sortInput.value = filters.sort || "date-desc";
    setFilterLabelFromValue(
      sortFilter,
      filters.sort || "date-desc",
      t("sort.newest"),
    );

    const typeFilter = filtersForm.querySelector("[data-filter='type']");
    const typePopover = getFilterPopover(typeFilter);
    const chips = typePopover
      ? typePopover.querySelectorAll(".chip")
      : typeFilter
        ? typeFilter.querySelectorAll(".chip")
        : [];
    const inputs = typeFilter
      ? typeFilter.querySelectorAll("input[name='type']")
      : [];
    const valueEl = typeFilter?.querySelector("[data-filter-value]");
    inputs.forEach((input) => {
      input.checked = filters.types.includes(input.value);
    });
    chips.forEach((chip) => {
      const isActive = filters.types.includes(chip.dataset.value);
      chip.classList.toggle("chip--active", isActive);
    });
    if (valueEl) {
      const activeChips = [...chips].filter((c) =>
        c.classList.contains("chip--active"),
      );
      valueEl.textContent = activeChips.length
        ? activeChips.map((c) => c.textContent).join(" · ")
        : t("filter.any");
    }

    const availableFilter = filtersForm.querySelector(
      "[data-filter='available']",
    );
    const availableInput = availableFilter?.querySelector(
      "input[name='onlyAvailable']",
    );
    const availableBtn = availableFilter?.querySelector("[data-toggle-pill]");
    if (availableInput) availableInput.checked = filters.onlyAvailable;
    if (availableBtn) {
      availableBtn.classList.toggle(
        "filter-pill--active",
        filters.onlyAvailable,
      );
    }

    document.querySelectorAll(".filter.filter--open").forEach((el) => {
      closeFilterPopover(el);
    });
  };

  const updateLoadMoreVisibility = (totalLength) => {
    if (!loadMoreBtn) return;
    const renderedCount = catalogGrid ? catalogGrid.children.length : 0;
    const shouldHide =
      (renderedCount > 0 ? renderedCount : visibleCount) >= totalLength;
    loadMoreBtn.hidden = shouldHide;
    if (loadMoreWrap) loadMoreWrap.hidden = shouldHide;
  };

  const createSkeletonCard = () => {
    const div = document.createElement("div");
    div.className = "property-card property-card--skeleton";
    div.innerHTML = `
      <div class="property-card__media property-card__media--skeleton skeleton-box"></div>
      <div class="property-card__body property-card__body--skeleton">
        <div class="skeleton-line skeleton-line--lg"></div>
        <div class="skeleton-line skeleton-line--md"></div>
        <div class="skeleton-line skeleton-line--sm"></div>
      </div>
    `;
    return div;
  };

  const getSkeletonCount = (count) => {
    if (typeof count === "number") return count;
    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(max-width: 640px)").matches;
    return isMobile ? 1 : 3;
  };

  const showSkeletons = (count) => {
    skeletonGrid.innerHTML = "";
    catalogGrid.innerHTML = "";

    const skeletonCount = getSkeletonCount(count);
    for (let i = 0; i < skeletonCount; i++) {
      skeletonGrid.appendChild(createSkeletonCard());
    }
    skeletonGrid.hidden = false;
    catalogGrid.hidden = true;
    if (sentinel) sentinel.style.display = "none";
    if (loadMoreBtn) loadMoreBtn.hidden = true;
    if (loadMoreWrap) loadMoreWrap.hidden = true;
  };

  const renderCatalog = (
    properties,
    { append = false, startIndex = 0 } = {},
  ) => {
    if (!append) {
      catalogGrid.innerHTML = "";
    }
    skeletonGrid.innerHTML = "";
    skeletonGrid.hidden = true;

    const slice = append
      ? properties.slice(startIndex, visibleCount)
      : properties.slice(0, visibleCount);

    slice.forEach((item) => {
      const avifSrc =
        item.images?.avif || (item.imageBase && `${item.imageBase}.avif`);
      const webpSrc =
        item.images?.webp || (item.imageBase && `${item.imageBase}.webp`);
      const jpgSrc =
        item.images?.jpg ||
        (item.imageBase && `${item.imageBase}.jpg`) ||
        "assets/avatars/default.png";
      const pictureSources = [
        avifSrc ? `<source srcset="${avifSrc}" type="image/avif">` : "",
        webpSrc ? `<source srcset="${webpSrc}" type="image/webp">` : "",
      ]
        .filter(Boolean)
        .join("");

      const card = document.createElement("article");
      card.className = "property-card";
      card.dataset.revealItem = "true";

      card.innerHTML = `
        <div class="property-card__media">
          <picture>
            ${pictureSources}
            <img
              class="property-card__image property-card__media-image lazy-img"
              src="${jpgSrc}"
              alt="${item.title}"
              loading="lazy"
              decoding="async">
          </picture>

          <div class="property-card__badges">
            ${
              item.isPremium
                ? `<span class="badge badge--premium">${t("badge.premium")}</span>`
                : ""
            }
            ${item.isNew ? `<span class="badge badge--new">${t("badge.new")}</span>` : ""}
          </div>
          <div class="property-card__status-badge">
            <span class="badge badge--status badge--status-${item.status}">
              ${item.status === "available" ? t("status.available") : t("status.busy")}
            </span>
          </div>
        </div>

        <div class="property-card__body">
          <h3 class="property-card__title">${item.title}</h3>

          <p class="property-card__location">${t(`city.${item.city}`)}, ${item.address}</p>

          <div class="property-card__info">
            <span>${tPlural("card.rooms", item.rooms)}</span>
            <span>${t("card.area", { area: item.area })}</span>
            <span>${t("card.floor", { floor: item.floor })}</span>
          </div>

          <div class="property-card__bottom">
            <div class="property-card__price-block">
              <span class="property-card__price">
                ${t("card.pricePerMonth", { price: formatNumber(item.price) })}
              </span>
            </div>
            <a class="property-card__cta" href="property.html?id=${
              item.id
            }">${t("card.more")}</a>
          </div>
        </div>
      `;

      catalogGrid.appendChild(card);
    });

    skeletonGrid.hidden = true;
    catalogGrid.hidden = false;

    enhanceNewCards(properties.length);
  };

  const getFiltersFromForm = () => {
    const formData = new FormData(filtersForm);
    const city = (formData.get("city") || "").trim();
    const priceMinRaw = formData.get("priceMin");
    const priceMaxRaw = formData.get("priceMax");
    const priceMin =
      priceMinRaw === null || priceMinRaw === "" ? null : Number(priceMinRaw);
    const priceMax =
      priceMaxRaw === null || priceMaxRaw === "" ? null : Number(priceMaxRaw);
    const rooms = formData.get("rooms") || "";
    const onlyAvailable = formData.get("onlyAvailable") === "1";
    const sort = formData.get("sort") || "date-desc";
    const types = formData.getAll("type").filter(Boolean);

    return { city, priceMin, priceMax, rooms, onlyAvailable, sort, types };
  };

  const applyFilters = (filters = getAppliedFilters()) => {
    const { city, priceMin, priceMax, rooms, onlyAvailable, sort, types } =
      filters;

    let filtered = RENTKIT_PROPERTIES.filter((item) => {
      if (city && item.city !== city) return false;
      if (priceMin !== null && priceMax !== null) {
        if (!(item.price > priceMin && item.price <= priceMax)) return false;
      } else if (priceMin !== null) {
        if (!(item.price > priceMin)) return false;
      } else if (priceMax !== null) {
        if (!(item.price <= priceMax)) return false;
      }

      if (rooms) {
        if (rooms === "4+") {
          if (item.rooms < 4) return false;
        } else if (item.rooms !== Number(rooms)) {
          return false;
        }
      }

      if (onlyAvailable && item.status !== "available") return false;
      if (types.length > 0 && !types.includes(item.type)) return false;
      return true;
    });

    if (sort === "price-asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "date-desc") {
      filtered.sort(
        (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime(),
      );
    } else if (sort === "date-asc") {
      filtered.sort(
        (a, b) => new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime(),
      );
    }

    return filtered;
  };

  const renderState = (filtered) => {
    if (emptyState) emptyState.hidden = filtered.length > 0;
    if (filtered.length === 0) {
      skeletonGrid.innerHTML = "";
      skeletonGrid.hidden = true;
      catalogGrid.innerHTML = "";
      catalogGrid.hidden = true;
      updateLoadMoreVisibility(0);
      return;
    }

    visibleCount = Math.min(visibleCount, filtered.length);
    renderCatalog(filtered);
    updateLoadMoreVisibility(filtered.length);
  };

  function enhanceNewCards(totalLength) {
    document.querySelectorAll(".lazy-img").forEach((img) => {
      if (img.complete) {
        img.dataset.loaded = "true";
      } else {
        img.addEventListener("load", () => {
          img.dataset.loaded = "true";
        });
      }
    });

    document
      .querySelectorAll(
        ".property-card[data-reveal-item]:not(.property-card--visible)",
      )
      .forEach((card, index) => {
        if (card.closest("[data-reveal]")) return;
        card.style.transitionDelay = `${index * 80}ms`;
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom > 0;
          if (inView) {
            card.classList.add("property-card--visible");
          } else {
            observeCard(card);
          }
        });
      });

    if (!revealFallbackBound) {
      const onViewportChange = () => {
        requestAnimationFrame(() => {
          let shown = 0;
          document
            .querySelectorAll(
              ".property-card[data-reveal-item]:not(.property-card--visible)",
            )
            .forEach((card) => {
              const rect = card.getBoundingClientRect();
              const inView = rect.top < window.innerHeight && rect.bottom > 0;
              if (inView) {
                card.classList.add("property-card--visible");
                shown += 1;
              }
            });
        });
      };
      window.addEventListener("scroll", onViewportChange, { passive: true });
      window.addEventListener("resize", onViewportChange);
      revealFallbackBound = true;
    }

    if (sentinel) sentinel.style.display = "none";

    if (loadMoreBtn) {
      const renderedCount = catalogGrid ? catalogGrid.children.length : 0;
      const shouldHide =
        (renderedCount > 0 ? renderedCount : visibleCount) >= totalLength;
      loadMoreBtn.hidden = shouldHide;
      if (loadMoreWrap) loadMoreWrap.hidden = shouldHide;
    }
  }

  const initCatalogGrid = () => {
    const filtered = applyFilters();
    visibleCount = PAGE_SIZE;
    renderState(filtered);
  };

  loadMoreBtn?.addEventListener("click", () => {
    const filtered = applyFilters();
    const alreadyRendered = catalogGrid ? catalogGrid.children.length : 0;
    visibleCount = Math.min(filtered.length, visibleCount + PAGE_SIZE);

    renderCatalog(filtered, {
      append: true,
      startIndex: alreadyRendered,
    });

    updateLoadMoreVisibility(filtered.length);
  });

  document.querySelectorAll("[data-filter='type']").forEach((filter) => {
    const chips = filter.querySelectorAll(".chip");
    const inputs = filter.querySelectorAll("input[name='type']");
    const valueEl = filter.querySelector("[data-filter-value]");

    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const value = chip.dataset.value;
        const input = [...inputs].find((i) => i.value === value);

        const active = chip.classList.toggle("chip--active");
        if (input) input.checked = active;

        const activeChips = [...chips].filter((c) =>
          c.classList.contains("chip--active"),
        );
        valueEl.textContent = activeChips.length
          ? activeChips.map((c) => c.textContent).join(" · ")
          : t("filter.any");
      });
    });
  });

  document.querySelectorAll("[data-toggle-pill]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.closest(".filter");
      const input = filter.querySelector("input[name='onlyAvailable']");

      const active = btn.classList.toggle("filter-pill--active");
      if (input) input.checked = active;
    });
  });

  document.querySelectorAll(".filters-reset").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const sortInput = filtersForm.querySelector('input[name="sort"]');
      const sortValue = sortInput ? sortInput.value : "date-desc";
      filtersForm.reset();
      visibleCount = PAGE_SIZE;

      filtersForm
        .querySelectorAll(
          'input[name="city"], input[name="priceMin"], input[name="priceMax"], input[name="rooms"], input[name="sort"], input[name="sorting"]',
        )
        .forEach((input) => {
          if (input.type === "checkbox" || input.type === "radio") {
            input.checked = false;
          } else {
            input.value = "";
          }
        });

      filtersForm
        .querySelectorAll('input[name="type"]')
        .forEach((input) => (input.checked = false));

      document
        .querySelectorAll(".chip")
        .forEach((c) => c.classList.remove("chip--active"));

      document
        .querySelectorAll(".filter-pill--toggle")
        .forEach((b) => b.classList.remove("filter-pill--active"));

      // Исходный data-i18n ключ значения — это его текст по умолчанию
      filtersForm
        .querySelectorAll("[data-filter-value]")
        .forEach((el) => (el.textContent = t(el.dataset.i18n)));

      if (sortInput) sortInput.value = sortValue;
      const sortFilter = document.querySelector("[data-filter='sorting']");
      setFilterLabelFromValue(sortFilter, sortValue, t("sort.newest"));

      appliedFilters = getFiltersFromForm();
      renderActiveChips(appliedFilters);
      refreshCatalog();
    });
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-filter-trigger]");
    const openFilter = document.querySelector(".filter.filter--open");

    if (trigger) {
      const filter = trigger.closest(".filter");

      if (openFilter && openFilter !== filter) {
        closeFilterPopover(openFilter);
      }

      if (filter.classList.contains("filter--open")) {
        closeFilterPopover(filter);
      } else {
        openFilterPopover(filter);
      }
      return;
    }

    if (
      openFilter &&
      !event.target.closest(".filter") &&
      !event.target.closest(".filter-popover")
    ) {
      closeFilterPopover(openFilter);
    }
  });

  document.querySelectorAll("[data-filter-trigger]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });

  document.querySelectorAll(".filter-list__item").forEach((item) => {
    // Пункты списка — <li>, поэтому делаем их доступными с клавиатуры
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      item.click();
    });

    item.addEventListener("click", () => {
      const popover = item.closest(".filter-popover");
      const filter =
        item.closest("[data-filter]") ||
        (popover ? popoverOwners.get(popover) : null);
      if (!filter) return;

      const value = item.dataset.value ?? "";
      const label = item.textContent;

      const valueNode = filter.querySelector("[data-filter-value]");
      if (valueNode) valueNode.textContent = label;

      if (filter.dataset.filter === "price") {
        const minInput = filter.querySelector('input[name="priceMin"]');
        const maxInput = filter.querySelector('input[name="priceMax"]');
        if (minInput) minInput.value = "";
        if (maxInput) maxInput.value = "";

        if (value === "20000") {
          if (maxInput) maxInput.value = "20000";
        } else if (value === "40000") {
          if (maxInput) maxInput.value = "40000";
        } else if (value === "40000+") {
          if (minInput) minInput.value = "40000";
        }
      } else if (filter.dataset.filter === "rooms") {
        const input = filter.querySelector('input[name="rooms"]');
        if (input) input.value = value;
      } else if (filter.dataset.filter === "city") {
        const input = filter.querySelector('input[name="city"]');
        if (input) input.value = value;
      } else if (filter.dataset.filter === "sorting") {
        const input = filtersForm?.querySelector('input[name="sort"]');
        if (input) input.value = value;
      } else {
        const input = filter.querySelector("input[name]");
        if (input) input.value = value;
      }

      closeFilterPopover(filter);
      filter.querySelector("[data-filter-trigger]")?.focus();

      if (filter.dataset.filter === "sorting") {
        appliedFilters = {
          ...getAppliedFilters(),
          sort: value || "date-desc",
        };
        refreshCatalog();
      }
    });
  });

  const renderActiveChips = (data = getAppliedFilters()) => {
    if (!activeBox) return;
    activeBox.innerHTML = "";

    const chips = [];

    if (data.city) chips.push({ key: "city", label: t(`city.${data.city}`) });
    if (data.priceMin !== null || data.priceMax !== null) {
      let label = t("filter.price");
      if (data.priceMax !== null) {
        label = t("chip.priceUpTo", { price: formatNumber(data.priceMax) });
      } else if (data.priceMin !== null) {
        label = t("chip.priceFrom", { price: formatNumber(data.priceMin) });
      }
      chips.push({ key: "price", label });
    }
    if (data.rooms) {
      const roomsFilter = filtersForm?.querySelector("[data-filter='rooms']");
      const option = findFilterOption(roomsFilter, data.rooms);
      const label = option
        ? option.textContent
        : tPlural("card.rooms", Number(data.rooms));
      chips.push({ key: "rooms", label });
    }
    if (data.types.length) {
      const typeFilter = filtersForm?.querySelector("[data-filter='type']");
      const typeLabels = data.types.map((value) => {
        const chip = typeFilter?.querySelector(`.chip[data-value="${value}"]`);
        return chip ? chip.textContent.trim() : value;
      });
      chips.push({ key: "type", label: typeLabels.join(" · ") });
    }
    if (data.onlyAvailable)
      chips.push({ key: "available", label: t("filter.onlyAvailable") });

    chips.forEach((chip) => {
      const el = document.createElement("button");
      el.className = "filter-chip";
      el.innerHTML = `${chip.label} <span class="filter-chip__remove">✕</span>`;
      el.onclick = () => {
        resetSingleFilter(chip.key);
        appliedFilters = getFiltersFromForm();
        renderActiveChips(appliedFilters);
        refreshCatalog();
      };
      activeBox.appendChild(el);
    });
  };

  const resetSingleFilter = (key) => {
    const current = getAppliedFilters();
    const next = { ...current };

    if (key === "city") {
      next.city = "";
    } else if (key === "price") {
      next.priceMin = null;
      next.priceMax = null;
    } else if (key === "rooms") {
      next.rooms = "";
    } else if (key === "type") {
      next.types = [];
    } else if (key === "available") {
      next.onlyAvailable = false;
    }

    appliedFilters = next;
    syncFormWithApplied(next);
  };

  const applyHeroFilters = () => {
    if (!heroForm || !filtersForm) return;

    const heroData = new FormData(heroForm);
    const heroCity = (heroData.get("hero_city") || "").trim();
    const heroBudget = (heroData.get("hero_priceMax") || "").trim();

    const cityFilter = filtersForm.querySelector("[data-filter='city']");
    const cityInput = cityFilter?.querySelector("input[name='city']");
    if (cityInput) cityInput.value = heroCity;
    setFilterLabelFromValue(cityFilter, heroCity, t("filter.anyCity"));

    const priceFilter = filtersForm.querySelector("[data-filter='price']");
    const minInput = priceFilter?.querySelector('input[name="priceMin"]');
    const maxInput = priceFilter?.querySelector('input[name="priceMax"]');
    if (minInput) minInput.value = "";
    if (maxInput) maxInput.value = "";

    if (heroBudget === "20000") {
      if (maxInput) maxInput.value = "20000";
    } else if (heroBudget === "40000") {
      if (maxInput) maxInput.value = "40000";
    } else if (heroBudget === "40000+") {
      if (minInput) minInput.value = "40000";
    }
    setFilterLabelFromValue(priceFilter, heroBudget, t("filter.any"));

    appliedFilters = getFiltersFromForm();
    renderActiveChips(appliedFilters);
    refreshCatalog();
  };

  const scrollToFiltersBar = () => {
    if (!filtersBar) return;
    const header = document.querySelector("[data-header]");
    const headerOffset = header ? header.offsetHeight : 0;
    const top =
      filtersBar.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset -
      12;
    window.scrollTo({ top, behavior: scrollBehavior() });
    filtersBar.classList.add("filters-bar--highlighted");
    window.setTimeout(() => {
      filtersBar.classList.remove("filters-bar--highlighted");
    }, 1400);
  };

  heroForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    applyHeroFilters();
    scrollToFiltersBar();
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-scroll-to-filters]");
    if (!trigger) return;
    event.preventDefault();
    scrollToFiltersBar();
  });

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      lastFocusedElement = document.activeElement;
      modal.classList.add("filters-modal--open");
      modal.setAttribute("aria-hidden", "false");
      setScrollLock(true);
      const focusTarget =
        modal.querySelector(".filters-modal__close") ||
        modal.querySelector("button, [href], input, select, textarea");
      if (focusTarget) focusTarget.focus();
    });
  }

  if (modal) {
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.classList.remove("filters-modal--open");
        setScrollLock(false);
        if (lastFocusedElement && lastFocusedElement.focus) {
          lastFocusedElement.focus();
        } else if (openBtn && openBtn.focus) {
          openBtn.focus();
        }
        modal.setAttribute("aria-hidden", "true");
        syncFormWithApplied(getAppliedFilters());
      });
    });
  }

  if (applyBtn && modal) {
    applyBtn.addEventListener("click", () => {
      document.querySelectorAll(".filter.filter--open").forEach((el) => {
        closeFilterPopover(el);
      });
      appliedFilters = getFiltersFromForm();
      modal.classList.remove("filters-modal--open");
      setScrollLock(false);
      if (lastFocusedElement && lastFocusedElement.focus) {
        lastFocusedElement.focus();
      } else if (openBtn && openBtn.focus) {
        openBtn.focus();
      }
      modal.setAttribute("aria-hidden", "true");
      renderActiveChips(appliedFilters);
      refreshCatalog();
    });
  }

  filtersForm.addEventListener("input", () => {
    appliedFilters = getFiltersFromForm();
    renderActiveChips(appliedFilters);
    refreshCatalog();
  });

  // Capture: Esc сначала закрывает открытый поповер, а не всю модалку
  window.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Escape") return;
      const openFilter = document.querySelector(".filter.filter--open");
      if (!openFilter) return;
      event.stopPropagation();
      closeFilterPopover(openFilter);
      openFilter.querySelector("[data-filter-trigger]")?.focus();
    },
    true,
  );

  const trapFocus = (event) => {
    const focusable = [
      ...modal.querySelectorAll(
        'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])',
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
  };

  if (modal) {
    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("filters-modal--open")) return;
      if (event.key === "Tab") {
        trapFocus(event);
        return;
      }
      if (event.key !== "Escape") return;
      modal.classList.remove("filters-modal--open");
      setScrollLock(false);
      if (lastFocusedElement && lastFocusedElement.focus) {
        lastFocusedElement.focus();
      } else if (openBtn && openBtn.focus) {
        openBtn.focus();
      }
      modal.setAttribute("aria-hidden", "true");
      syncFormWithApplied(getAppliedFilters());
    });
  }

  initCatalogGrid();
  renderActiveChips(getAppliedFilters());

  return { scrollToFiltersBar };
}
