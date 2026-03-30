export function renderSkillBadge(skill) {
  const hasLogo = Boolean(skill.logo);

  return `
    <article class="skill-card" data-animate>
      <div class="flex items-center gap-4">
        <div
          class="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${hasLogo ? '' : 'is-media-fallback'}"
          data-media-frame
        >
          ${hasLogo ? `<img data-src="${skill.logo}" alt="${skill.name} logo" class="h-8 w-8 object-contain" />` : ''}
          <span
            data-media-fallback
            class="absolute inset-0 items-center justify-center text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            ${skill.fallback}
          </span>
        </div>
        <div>
          <h3 class="font-display text-lg text-white">${skill.name}</h3>
          <p class="mt-1 text-sm text-zinc-400">${skill.category}</p>
        </div>
      </div>
    </article>
  `;
}
