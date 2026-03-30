export function renderSectionTitle({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl';

  return `
    <div class="${alignment}" data-animate>
      <div class="section-label ${align === 'center' ? 'justify-center' : ''}">
        ${eyebrow}
      </div>
      <h2 class="section-heading">${title}</h2>
      <p class="section-copy mt-4">${description}</p>
    </div>
  `;
}
