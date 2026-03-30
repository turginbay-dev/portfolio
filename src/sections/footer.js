import { renderFooter } from '../components/footer.js';

export function renderFooterSection({ locale, navItems, socials, profile }) {
  return `
    <footer class="section-shell relative isolate overflow-hidden">
      <div class="absolute inset-0 section-code-bg"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-black/38 via-transparent to-red-500/8"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.22),transparent_24%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(239,68,68,0.14),transparent_22%)]"></div>
      <div class="absolute inset-0 bg-[linear-gradient(128deg,rgba(239,68,68,0.14)_0%,transparent_13%,transparent_84%,rgba(239,68,68,0.08)_100%)]"></div>
      <div class="absolute inset-0 section-beam-field">
        <div class="section-beam section-beam-primary"></div>
        <div class="section-beam section-beam-secondary"></div>
      </div>
      <div class="absolute inset-0 section-noise bg-gradient-to-b from-black/70 via-black/36 to-black/82"></div>
      <div class="section-inner section-block">
        ${renderFooter({ locale, navItems, socials, profile })}
      </div>
    </footer>
  `;
}
