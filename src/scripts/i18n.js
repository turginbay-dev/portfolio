const STORAGE_KEY = "tb-locale";
const SUPPORTED_LOCALES = ["en", "kz", "ru"];

function getByPath(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
}

export function getSavedLocale() {
  const storedLocale = window.localStorage.getItem(STORAGE_KEY);
  return SUPPORTED_LOCALES.includes(storedLocale) ? storedLocale : "en";
}

export function saveLocale(locale) {
  if (SUPPORTED_LOCALES.includes(locale)) {
    window.localStorage.setItem(STORAGE_KEY, locale);
  }
}

export function setLanguageButtons(locale) {
  document.querySelectorAll("[data-locale]").forEach((button) => {
    const isActive = button.dataset.locale === locale;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

export async function loadSiteCopy(basePath, locale) {
  const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : "en";
  const response = await fetch(`${basePath}data/site/${safeLocale}.json`);

  if (!response.ok) {
    throw new Error(`Unable to load site copy for locale "${safeLocale}"`);
  }

  return response.json();
}

export function applySiteCopy(copy, locale) {
  document.documentElement.lang = locale;

  if (copy.meta?.title) {
    document.title = copy.meta.title;
  }

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = getByPath(copy, node.dataset.i18n);
    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((node) => {
    const value = getByPath(copy, node.dataset.i18nHtml);
    if (typeof value === "string") {
      node.innerHTML = value;
    }
  });

  document.querySelectorAll("[data-i18n-content]").forEach((node) => {
    const value = getByPath(copy, node.dataset.i18nContent);
    if (typeof value === "string") {
      node.setAttribute("content", value);
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    const value = getByPath(copy, node.dataset.i18nAria);
    if (typeof value === "string") {
      node.setAttribute("aria-label", value);
    }
  });
}

export function bindLanguageSwitcher(onChange) {
  document.querySelectorAll("[data-locale]").forEach((button) => {
    if (button.dataset.bound === "true") {
      return;
    }

    button.dataset.bound = "true";

    button.addEventListener("click", async () => {
      const locale = button.dataset.locale;
      saveLocale(locale);
      await onChange(locale);
    });
  });
}
