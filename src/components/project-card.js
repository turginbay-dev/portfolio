function renderAction({ href, label, variant = 'secondary' }) {
  const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  if (!href) {
    return `<button type="button" class="${className} btn-disabled w-full justify-center sm:w-auto">${label}</button>`;
  }

  return `
    <a
      href="${href}"
      class="${className} w-full justify-center sm:w-auto"
      target="_blank"
      rel="noreferrer noopener"
    >
      ${label}
    </a>
  `;
}

export function renderProjectCard({ project, locale, language, index }) {
  const reversed = index % 2 === 1;
  const highlights = project.highlights[language]
    .map((item) => `<li class="text-sm leading-7 text-zinc-300">${item}</li>`)
    .join('');
  const stack = project.stack.map((item) => `<span class="chip">${item}</span>`).join('');

  return `
    <article class="project-shell" data-animate>
      <div class="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
        <div class="space-y-6 ${reversed ? 'lg:order-2' : ''}">
          <div>
            <div class="section-label">${locale.projects.featuredLabel}</div>
            <h3 class="font-display text-3xl font-semibold text-white sm:text-4xl">${project.title}</h3>
            <p class="mt-3 text-base text-red-400">${project.type[language]}</p>
          </div>

          <p class="section-copy">${project.description[language]}</p>

          <div>
            <div class="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              ${locale.projects.stackTitle}
            </div>
            <div class="flex flex-wrap gap-2">${stack}</div>
          </div>

          <div>
            <div class="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              ${locale.projects.highlightsTitle}
            </div>
            <ul class="grid gap-2">
              ${highlights}
            </ul>
          </div>

          <div class="grid gap-3 sm:flex sm:flex-wrap">
            ${renderAction({ href: project.links.demo, label: locale.buttons.liveDemo, variant: 'primary' })}
            ${renderAction({ href: project.links.github, label: locale.buttons.githubRepo })}
            ${renderAction({ href: project.links.caseStudy, label: locale.buttons.caseStudy })}
          </div>
        </div>

        <div class="project-media-shell ${reversed ? 'lg:order-1' : ''}">
          <div class="project-media-meta">
            <div class="project-media-meta-column">
              <span class="project-media-pill project-media-stack">${project.stack.join(' / ')}</span>
            </div>
          </div>

          <div class="project-media group" data-media-frame>
            <button
              type="button"
              class="absolute inset-0 z-20"
              data-open-project="${project.id}"
              aria-label="${locale.projects.openProject}"
            ></button>
            <img
              data-src="${project.media.cover}"
              alt="${project.title} cover"
              class="project-media-image absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div class="project-media-redwash absolute inset-0"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-red-700/20 via-transparent to-black/75"></div>
            <div class="absolute -left-6 top-10 h-36 w-36 rounded-full bg-red-600/16 blur-3xl"></div>
            <div class="absolute right-8 top-8 h-24 w-24 rounded-full bg-red-500/10 blur-3xl"></div>
            <div class="absolute bottom-4 left-4 z-10 sm:bottom-8 sm:left-8">
              <span class="project-media-pill project-media-count">${project.media.screenshots.length} shots</span>
            </div>
            <div class="absolute inset-x-0 bottom-0 z-10 flex justify-end p-4 sm:p-8">
              <div class="inline-flex items-center justify-center gap-3 rounded-full border border-red-500/35 bg-black/35 px-4 py-2 text-sm font-medium text-white shadow-[0_0_30px_rgba(153,27,27,0.22)] backdrop-blur-md">
                ${locale.buttons.openMedia}
              </div>
            </div>
            <div
              data-media-fallback
              class="absolute inset-0 items-end bg-gradient-to-br from-red-700/15 via-black to-black p-6 sm:p-8"
            >
              <div>
                <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">${project.type[language]}</div>
                <div class="mt-3 font-display text-3xl font-semibold text-white">${project.title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}
