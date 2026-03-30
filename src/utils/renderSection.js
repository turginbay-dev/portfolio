export function renderSection({
  id,
  background,
  content,
  className = '',
  innerClass = 'section-block',
  overlayClass = 'from-black/74 via-black/38 to-black/86',
  useImageBackground = false,
}) {
  return `
    <section id="${id}" data-section="${id}" class="section-shell ${className}">
      ${
        background && useImageBackground
          ? `
            <div
              class="absolute inset-0 scale-105 bg-cover bg-center opacity-20 blur-[1px]"
              style="background-image: url('${background}')"
            ></div>
          `
          : ''
      }
      <div class="absolute inset-0 section-code-bg"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-black/38 via-transparent to-red-500/8"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.24),transparent_24%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(239,68,68,0.14),transparent_22%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(128deg,rgba(239,68,68,0.14)_0%,transparent_13%,transparent_84%,rgba(239,68,68,0.08)_100%)]"></div>
      <div class="absolute inset-0 section-beam-field">
        <div class="section-beam section-beam-primary"></div>
        <div class="section-beam section-beam-secondary"></div>
      </div>
      <div class="absolute inset-0 section-noise bg-gradient-to-br ${overlayClass}"></div>
      <div class="section-inner ${innerClass}">
        ${content}
      </div>
    </section>
  `;
}
