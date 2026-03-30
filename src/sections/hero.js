import { renderHeroCard } from '../components/hero-card.js';
import { renderSection } from '../utils/renderSection.js';

export function renderHeroSection({ locale, profile }) {
  return renderSection({
    id: 'hero',
    background: profile.assets.backgrounds.hero,
    overlayClass: 'from-black/58 via-black/24 to-black/76',
    innerClass: 'pt-32 pb-20 sm:pt-36 sm:pb-24 lg:min-h-screen lg:flex lg:items-center',
    content: `
      <div class="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] xl:gap-12">
        ${renderHeroCard({ locale, cv: profile.cv, location: profile.location })}

        <div class="panel hero-portrait relative overflow-hidden p-2 sm:p-3" data-animate>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.22),transparent_28%)]"></div>
          <div class="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div class="absolute inset-y-6 right-5 w-px bg-gradient-to-b from-transparent via-red-500/45 to-transparent blur-[0.4px]"></div>
          <img
            src="${profile.assets.profile.hero}"
            alt="Bekzat portrait"
            class="relative z-10 aspect-[4/5] w-full rounded-[1.7rem] object-cover object-top sm:aspect-[4/4.9]"
          />
        </div>
      </div>
    `,
  });
}
