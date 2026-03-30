function renderSocialIcon(icon) {
  const icons = {
    whatsapp: `
      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current">
        <path d="M20 12a8 8 0 0 1-11.73 7.07L4 20l.95-4.07A8 8 0 1 1 20 12Zm-4.42 2.28c-.23-.11-1.35-.66-1.56-.74-.21-.08-.36-.11-.51.11-.15.23-.58.74-.71.89-.13.15-.27.17-.5.06-.23-.11-.97-.36-1.84-1.13-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.36.1-.47.1-.1.23-.27.34-.4.11-.13.15-.23.23-.38.08-.15.04-.29-.02-.4-.06-.11-.51-1.23-.7-1.68-.18-.43-.37-.37-.51-.37h-.43c-.15 0-.4.06-.6.29-.21.23-.79.77-.79 1.88s.81 2.18.92 2.33c.11.15 1.58 2.42 3.83 3.39.54.23.96.37 1.29.47.54.17 1.03.15 1.42.09.43-.06 1.35-.55 1.54-1.08.19-.53.19-.98.13-1.08-.06-.09-.21-.15-.44-.26Z" />
      </svg>
    `,
    gmail: `
      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current">
        <path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-13Zm2.29.5L12 11.18 18.71 6H5.29ZM19 7.11l-6.39 4.92a1 1 0 0 1-1.22 0L5 7.11V18.5c0 .28.22.5.5.5h13a.5.5 0 0 0 .5-.5V7.11Z" />
      </svg>
    `,
    telegram: `
      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current">
        <path d="M20.67 4.33a1 1 0 0 0-1.03-.16L4.92 10a1 1 0 0 0 .08 1.87l3.88 1.3 1.44 4.47a1 1 0 0 0 1.76.28l2.2-2.87 4.1 3.2a1 1 0 0 0 1.58-.58L20.99 5.3a1 1 0 0 0-.32-.97ZM10.4 12.53l-.76 2.85-.79-2.46 7.07-5.13-5.52 4.74Z" />
      </svg>
    `,
    instagram: `
      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current">
        <path d="M7.75 3A4.75 4.75 0 0 0 3 7.75v8.5A4.75 4.75 0 0 0 7.75 21h8.5A4.75 4.75 0 0 0 21 16.25v-8.5A4.75 4.75 0 0 0 16.25 3h-8.5Zm8.5 1.5a3.25 3.25 0 0 1 3.25 3.25v8.5a3.25 3.25 0 0 1-3.25 3.25h-8.5A3.25 3.25 0 0 1 4.5 16.25v-8.5A3.25 3.25 0 0 1 7.75 4.5h8.5ZM12 7.25A4.75 4.75 0 1 0 16.75 12 4.76 4.76 0 0 0 12 7.25Zm0 1.5A3.25 3.25 0 1 1 8.75 12 3.25 3.25 0 0 1 12 8.75Zm5.25-2.13a1.12 1.12 0 1 0 1.13 1.13 1.13 1.13 0 0 0-1.13-1.13Z" />
      </svg>
    `,
    github: `
      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.21.68-.48v-1.68c-2.77.6-3.35-1.17-3.35-1.17a2.63 2.63 0 0 0-1.1-1.45c-.9-.61.07-.6.07-.6a2.08 2.08 0 0 1 1.52 1 2.13 2.13 0 0 0 2.91.83 2.13 2.13 0 0 1 .64-1.34c-2.22-.25-4.55-1.11-4.55-4.95a3.88 3.88 0 0 1 1-2.69 3.61 3.61 0 0 1 .1-2.66s.84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02a3.61 3.61 0 0 1 .1 2.66 3.88 3.88 0 0 1 1 2.69c0 3.85-2.33 4.69-4.56 4.94a2.4 2.4 0 0 1 .68 1.87v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    `,
    linkedin: `
      <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A2 2 0 1 0 7.3 5 2 2 0 0 0 5.25 3Zm14.19 9.33c0-2.91-1.55-4.26-3.61-4.26a3.12 3.12 0 0 0-2.84 1.57V8.5H9.62V20H13v-6.2c0-1.63.31-3.21 2.33-3.21s2 1.89 2 3.31V20h3.38Z" />
      </svg>
    `,
  };

  return icons[icon] ?? '';
}

export function renderSocialCard({ item, title, primary = false }) {
  const target = item.href.startsWith('mailto:') ? '' : 'target="_blank" rel="noreferrer noopener"';
  const primaryClass = primary ? 'border-red-500/30 bg-red-500/10' : '';

  return `
    <a href="${item.href}" class="contact-card h-full ${primaryClass}" ${target}>
      <div class="flex items-start gap-4">
        <div class="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
          ${renderSocialIcon(item.icon)}
        </div>
        <div class="min-w-0">
          <div class="text-xs font-semibold uppercase tracking-[0.28em] text-zinc-500">${title}</div>
          <div class="mt-2 break-words text-base font-medium text-white">${item.value}</div>
        </div>
      </div>
    </a>
  `;
}

export { renderSocialIcon };
