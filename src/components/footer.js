import { renderSocialIcon } from './social-card.js';

export function renderFooter({ locale, navItems, socials, profile }) {
  const year = new Date().getFullYear();

  return `
    <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
      <div data-animate>
        <div class="section-label">Bekzat</div>
        <h2 class="font-display text-3xl font-semibold text-white">${profile.role}</h2>
        <p class="mt-4 max-w-xl text-sm leading-7 text-zinc-400">${locale.footer.note}</p>
        <p class="mt-6 text-sm text-zinc-500">© ${year} Bekzat. ${locale.footer.copyright}</p>
      </div>

      <div class="grid gap-8 sm:grid-cols-2" data-animate>
        <div>
          <div class="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">${locale.footer.quickLinks}</div>
          <div class="mt-4 grid gap-3">
            ${navItems
              .map(
                (item) => `
                  <a href="#${item.id}" class="footer-link" data-scroll-target="${item.id}">
                    ${item.label}
                  </a>
                `,
              )
              .join('')}
          </div>
        </div>

        <div>
          <div class="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">${locale.footer.socials}</div>
          <div class="mt-4 grid gap-3">
            ${socials
              .map(
                (item) => `
                  <a
                    href="${item.href}"
                    class="footer-link inline-flex items-center gap-3 break-all"
                    ${item.href.startsWith('mailto:') ? '' : 'target="_blank" rel="noreferrer noopener"'}
                  >
                    <span class="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white">
                      ${renderSocialIcon(item.icon)}
                    </span>
                    <span>${item.value}</span>
                  </a>
                `,
              )
              .join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
