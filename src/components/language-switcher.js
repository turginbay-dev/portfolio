const languageOptions = [
  { id: 'kk', label: 'KZ' },
  { id: 'ru', label: 'RU' },
  { id: 'en', label: 'EN' },
];

export function renderLanguageSwitcher({ language }) {
  return `
    <div class="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1">
      ${languageOptions
        .map(
          (option) => `
            <button
              type="button"
              class="lang-toggle ${option.id === language ? 'is-active' : ''}"
              data-language="${option.id}"
            >
              ${option.label}
            </button>
          `,
        )
        .join('')}
    </div>
  `;
}
