import { renderSectionTitle } from '../components/section-title.js';
import { renderSection } from '../utils/renderSection.js';

export function renderAboutSection({ locale, profile }) {
  const cards = locale.about.cards
    .map(
      (card) => `
        <div class="metric-card h-full">
          <div class="font-display text-3xl font-semibold text-white sm:text-[2rem]">${card.value}</div>
          <div class="mt-2 text-sm leading-6 text-zinc-400">${card.label}</div>
        </div>
      `,
    )
    .join('');

  const paragraphs = locale.about.paragraphs
    .map((paragraph) => `<p class="section-copy">${paragraph}</p>`)
    .join('');

  return renderSection({
    id: 'about',
    background: profile.assets.backgrounds.about,
    overlayClass: 'from-black/68 via-black/30 to-black/78',
    innerClass: 'section-block',
    content: `
      <div class="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-14">
        <div class="space-y-6">
          ${renderSectionTitle({
            eyebrow: locale.about.eyebrow,
            title: locale.about.title,
            description: locale.about.description,
          })}
          <div class="grid gap-4" data-animate>
            ${paragraphs}
          </div>
        </div>

        <div class="grid gap-4" data-animate>
          <div class="panel p-6 sm:p-7">
            <div class="text-xs font-semibold uppercase tracking-[0.34em] text-red-400">Focus</div>
            <p class="mt-4 text-sm leading-7 text-zinc-300">
              ${locale.about.description}
            </p>
            <div class="mt-5 flex flex-wrap gap-2">
              ${locale.hero.pills.map((pill) => `<span class="chip">${pill}</span>`).join('')}
            </div>
          </div>

          <div class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            ${cards}
          </div>
        </div>
      </div>
    `,
  });
}
