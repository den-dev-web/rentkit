export default function initHeader() {
  const header = document.querySelector("[data-header]");
  const burger = document.querySelector("[data-burger]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const mobileBackdrop = document.querySelector("[data-mobile-backdrop]");
  const mobilePanel = document.querySelector("[data-mobile-panel]");
  const mobileClose = document.querySelector("[data-mobile-close]");

  if (!header) return;

  /* ----------------------------
     MOBILE MENU TOGGLE
     ---------------------------- */
  if (burger && mobileMenu) {
    let lastFocusedElement = null;

    const getFocusableElements = () => {
      if (!mobilePanel) return [];
      return Array.from(
        mobilePanel.querySelectorAll(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));
    };

    const setMenuState = (isOpen) => {
      header.dataset.state = isOpen ? "open" : "closed";
      burger.setAttribute("aria-expanded", String(isOpen));
      mobileMenu.setAttribute("aria-hidden", String(!isOpen));
      document.body.classList.toggle("is-menu-open", isOpen);

      if (isOpen) {
        lastFocusedElement = document.activeElement;
        const focusable = getFocusableElements();
        if (focusable.length) {
          focusable[0].focus();
        }
      } else if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    };

    setMenuState(false);

    burger.addEventListener("click", () => {
      const isOpen = header.dataset.state === "open";
      setMenuState(!isOpen);
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target.matches("a")) {
        setMenuState(false);
      }
    });

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener("click", () => setMenuState(false));
    }

    if (mobileClose) {
      mobileClose.addEventListener("click", () => setMenuState(false));
    }

    document.addEventListener("keydown", (e) => {
      if (header.dataset.state !== "open") return;

      if (e.key === "Escape") {
        setMenuState(false);
        return;
      }

      if (e.key === "Tab") {
        const focusable = getFocusableElements();
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 900 && header.dataset.state === "open") {
        setMenuState(false);
      }
    });
  }

  /* ----------------------------
     SCROLL-HIDE + ELEVATION
     ---------------------------- */

  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;

    // Elevation
    header.dataset.elevated = y > 20 ? "true" : "false";

    // Scroll direction
    if (y > lastY && y > 50) {
      header.dataset.scroll = "down";
    } else {
      header.dataset.scroll = "up";
    }

    lastY = y;
  };

  document.addEventListener("scroll", onScroll, { passive: true });
}
