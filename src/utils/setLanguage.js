export const LANGUAGE_EVENT = 'portfolio:languagechange';

const STORAGE_KEY = 'portfolio-language';

export function resolveInitialLanguage(availableLanguages, fallback = 'en') {
  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);

  if (storedLanguage && availableLanguages.includes(storedLanguage)) {
    return storedLanguage;
  }

  const browserLanguage = window.navigator.language.slice(0, 2).toLowerCase();

  if (availableLanguages.includes(browserLanguage)) {
    return browserLanguage;
  }

  return fallback;
}

export function setLanguagePreference(language) {
  window.localStorage.setItem(STORAGE_KEY, language);
  document.dispatchEvent(
    new CustomEvent(LANGUAGE_EVENT, {
      detail: { language },
    }),
  );
}
