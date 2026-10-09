import en from "../i18n/en.js";
import uk from "../i18n/uk.js";
import ru from "../i18n/ru.js";

const DICTIONARIES = { en, uk, ru };
const DEFAULT_LANG = "en";
const STORAGE_KEY = "rentkit-lang";
const LOCALES = { en: "en-US", uk: "uk-UA", ru: "ru-RU" };

const isSupported = (value) =>
  Object.prototype.hasOwnProperty.call(DICTIONARIES, value ?? "");

function readStoredLang() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeLang(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // приватный режим — язык останется только в URL
  }
}

// Приоритет: ?lang= в URL → сохранённый выбор → английский
function detectLang() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (isSupported(fromUrl)) {
    storeLang(fromUrl);
    return fromUrl;
  }
  const stored = readStoredLang();
  return isSupported(stored) ? stored : DEFAULT_LANG;
}

export const lang = detectLang();
export const locale = LOCALES[lang];

export function t(key, params = {}) {
  const template =
    DICTIONARIES[lang][key] ?? DICTIONARIES[DEFAULT_LANG][key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, name) => params[name] ?? "");
}

export const formatNumber = (value) => value.toLocaleString(locale);

// Записи вида { one, few, many, other } — формы по Intl.PluralRules
export function tPlural(key, count) {
  const forms = DICTIONARIES[lang][key] ?? DICTIONARIES[DEFAULT_LANG][key];
  const form = new Intl.PluralRules(locale).select(count);
  return (forms[form] ?? forms.other).replace("{count}", formatNumber(count));
}

const isLocalizedText = (value) =>
  value !== null &&
  typeof value === "object" &&
  !Array.isArray(value) &&
  typeof value[DEFAULT_LANG] === "string";

// Рекурсивно заменяет поля { en, uk, ru } на строку текущего языка
export function localizeData(value) {
  if (isLocalizedText(value)) return value[lang] ?? value[DEFAULT_LANG];
  if (Array.isArray(value)) return value.map(localizeData);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localizeData(item)]),
    );
  }
  return value;
}

export function applyTranslations(root = document) {
  document.documentElement.lang = lang;

  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  // data-i18n-attr="aria-label:key; content:key"
  root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((part) => part.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
}

export function initLangSwitcher() {
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    const option = button.dataset.langOption;
    button.setAttribute("aria-pressed", String(option === lang));

    button.addEventListener("click", () => {
      if (option === lang || !isSupported(option)) return;
      storeLang(option);
      // Перезагрузка: каталог, календарь и даты рендерятся заново на новом языке
      const url = new URL(window.location.href);
      url.searchParams.set("lang", option);
      window.location.assign(url);
    });
  });
}
