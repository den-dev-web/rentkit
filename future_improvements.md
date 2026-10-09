# Future improvements

Ideas deferred during the portfolio audit (October 2026). None of them blocks the current release.

## Performance

- **Load only the active language.** `js/modules/i18n.js` imports all three dictionaries, and `js/data/properties.js` holds every text in en/uk/ru. Loading just the current language (dynamic `import()` of one dictionary, per-language data files) would shrink the critical path on `property.html`, the heaviest page.
- **Discover the property LCP image earlier.** The first gallery photo is injected by JS, so the browser finds it late. Static per-property pages (or a build step) would let the image be in the HTML.

## SEO

- **Separate URLs per language with `hreflang`.** The language is currently chosen via `?lang=` / `localStorage` and rendered by JS. Real `/en/`, `/uk/`, `/ru/` pages would let search engines index every language.

## CSS architecture

- **Move hardcoded values to tokens.** About 110 colors and 170 spacing values in `css/components/*` are hardcoded instead of using `css/tokens.css`.
- **Mobile-first media queries.** Components mix `max-width` and `min-width` queries; rewriting them to `min-width` only would make the breakpoints consistent.
