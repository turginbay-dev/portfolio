import { renderCvSelector } from './cv-selector.js';

export function renderHeroCard({ locale, cv, location }) {
  const pills = locale.hero.pills
    .map((pill) => `<span class="chip">${pill}</span>`)
    .join('');

  return `
    <div class="panel section-noise p-6 sm:p-8 lg:p-10" data-animate>
      <div class="section-label">${locale.hero.eyebrow}</div>
      <h1 class="font-display text-[2.5rem] font-semibold uppercase leading-[0.95] text-white text-shadow-soft sm:text-5xl lg:text-7xl">
        <span class="block">${locale.hero.headlineTop}</span>
        <span class="block text-red-500">${locale.hero.headlineAccent}</span>
        <span class="block">${locale.hero.headlineBottom}</span>
      </h1>
      <p class="mt-6 max-w-xl text-base leading-8 text-zinc-300 sm:text-lg">
        ${locale.hero.subtitle}
      </p>
      <div class="mt-8 grid gap-3 sm:flex sm:flex-wrap">
        <button type="button" class="btn-primary w-full sm:w-auto" data-scroll-target="projects">
          ${locale.buttons.viewProjects}
        </button>
        <button type="button" class="btn-secondary w-full sm:w-auto" data-scroll-target="contact">
          ${locale.buttons.contactMe}
        </button>
        ${renderCvSelector({
          locale,
          cv,
          variant: 'ghost',
          fullWidth: true,
        })}
      </div>
      <div class="mt-7 flex flex-wrap gap-2">
        ${pills}
      </div>
      <div class="mt-7 flex flex-wrap gap-2">
        <span class="chip">${location}</span>
        <span class="chip">${locale.hero.availability}</span>
      </div>
    </div>
  `;
}
