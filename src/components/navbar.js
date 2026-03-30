import { renderLanguageSwitcher } from './language-switcher.js';
import { renderCvSelector } from './cv-selector.js';

export function renderNavbar({ locale, language, navItems, profile }) {
  const navLinks = navItems
    .map(
      (item) => `
        <a
          href="#${item.id}"
          class="nav-link"
          data-nav-link="${item.id}"
          data-scroll-target="${item.id}"
        >
          ${item.label}
        </a>
      `,
    )
    .join('');

  const mobileLinks = navItems
    .map(
      (item) => `
        <a
          href="#${item.id}"
          class="nav-link block text-center"
          data-nav-link="${item.id}"
          data-scroll-target="${item.id}"
        >
          ${item.label}
        </a>
      `,
    )
    .join('');

  return `
    <header class="fixed inset-x-0 top-0 z-50">
      <div class="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div class="panel px-4 py-3 sm:px-6">
          <div class="flex items-center justify-between gap-4">
            <a href="#hero" class="group inline-flex items-center gap-3" data-scroll-target="hero">
              <span class="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/50 bg-red-500/10 text-sm font-semibold tracking-[0.25em] text-white">
                BK
              </span>
              <div class="min-w-0">
                <div class="font-display text-sm font-semibold uppercase tracking-[0.35em] text-white">Bekzat</div>
                <div class="hidden text-xs uppercase tracking-[0.3em] text-zinc-500 sm:block">${profile.role}</div>
              </div>
            </a>

            <nav class="hidden items-center gap-2 lg:flex" aria-label="Primary navigation">
              ${navLinks}
            </nav>

            <div class="hidden items-center gap-3 lg:flex">
              ${renderLanguageSwitcher({ language })}
              ${renderCvSelector({
                locale,
                cv: profile.cv,
                variant: 'secondary',
                align: 'right',
              })}
            </div>

            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
              data-mobile-toggle
              aria-label="${locale.nav.openMenu}"
              aria-expanded="false"
            >
              <span class="sr-only">${locale.nav.openMenu}</span>
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="1.8">
                <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
              </svg>
            </button>
          </div>

          <div class="mobile-drawer pt-4 lg:hidden" data-mobile-menu>
            <nav class="grid gap-2" aria-label="Mobile navigation">
              ${mobileLinks}
            </nav>
            <div class="flex flex-wrap items-center gap-2 pt-2">
              ${renderLanguageSwitcher({ language })}
              ${renderCvSelector({
                locale,
                cv: profile.cv,
                variant: 'secondary',
                fullWidth: true,
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  `;
}
