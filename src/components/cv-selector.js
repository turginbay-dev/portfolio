export function renderCvSelector({ locale, cv, variant = 'secondary', fullWidth = false, align = 'left' }) {
  const className =
    variant === 'ghost'
      ? 'btn-ghost'
      : variant === 'primary'
        ? 'btn-primary'
        : 'btn-secondary';

  const widthClass = fullWidth ? 'w-full sm:w-auto' : '';
  const menuAlignClass = align === 'right' ? 'cv-menu-right' : '';

  return `
    <details class="cv-selector ${widthClass}" data-cv-details>
      <summary class="${className} ${widthClass} cursor-pointer list-none" data-cv-summary>
        <span>${locale.buttons.downloadCv}</span>
        <svg viewBox="0 0 24 24" class="cv-chevron h-4 w-4 fill-none stroke-current" stroke-width="1.8">
          <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </summary>

      <div class="cv-menu ${menuAlignClass}">
        <div class="cv-menu-title">${locale.cvMenu.title}</div>
        <a href="${cv.kk}" class="cv-option" data-cv-option download>
          <span>KK</span>
          <strong>${locale.cvMenu.kk}</strong>
        </a>
        <a href="${cv.ru}" class="cv-option" data-cv-option download>
          <span>RU</span>
          <strong>${locale.cvMenu.ru}</strong>
        </a>
        <a href="${cv.en}" class="cv-option" data-cv-option download>
          <span>EN</span>
          <strong>${locale.cvMenu.en}</strong>
        </a>
      </div>
    </details>
  `;
}
