# RentKit

RentKit is a static frontend project for a real estate rental catalog, focused on clean structure, accessibility, and performance-oriented UI patterns.

🔗 Live demo: https://den-dev-web.github.io/rentkit/

---

## 📌 About the Project

RentKit represents a property listing interface with catalog sections, navigation, and interactive UI elements.  
The project demonstrates how a modern, well-structured frontend can be built **without a build step or external frameworks**, using native web technologies and progressive enhancement.

---

## ⚙️ Tech Stack

- **HTML5** — semantic markup, SEO meta tags, and accessibility considerations  
- **CSS3** — modular stylesheet architecture (tokens / base / layout / components / utils), adaptive layout, animations  
- **JavaScript (ES Modules)** — modular architecture (`js/modules/*`), initialized on `DOMContentLoaded`  
- **Data** — local data module (`properties.js`) used instead of an API  
- **No build tools** — native modules and direct deployment to GitHub Pages

---

## 🧩 Architecture & Development Approach

- Component-oriented CSS structure with BEM-like class naming
- Clear separation of JavaScript logic by responsibility:
  - `header` — navigation and menu interactions
  - `catalog` — property listing rendering
  - `faq` — accordion behavior
  - `slider` — media slider logic
  - `scroll` — smooth scrolling and navigation helpers
- Progressive enhancement:
  - core content is fully accessible without JavaScript
  - interactivity is added on top via JS modules
- Accessibility considerations:
  - ARIA attributes
  - focus management for navigation menus
- Performance-oriented decisions:
  - lazy-loaded images
  - minimal dependencies
  - no runtime overhead from frameworks

---

## ✨ Key Features

- Property catalog with card-based layout
- Responsive and adaptive design
- Interactive navigation and mobile menu
- FAQ section with accessible accordion behavior
- Image slider for featured content
- Smooth scrolling between page sections

---

## 🎯 What This Project Demonstrates

- Ability to build structured frontend projects using only native web technologies
- Strong understanding of semantic HTML and accessibility fundamentals
- Modular CSS and JavaScript organization without frameworks
- Progressive enhancement mindset
- Performance-aware frontend decisions suitable for static sites

---

## 🚀 Possible Improvements

- Dynamic data loading from an external API
- Advanced filtering and sorting options
- Enhanced accessibility testing and keyboard navigation
- Pagination or virtualized lists for larger datasets
