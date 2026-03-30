import { createProjectMediaItems, renderProjectGallery, renderProjectMediaStage } from '../components/project-gallery.js';
import { initLazyLoad } from './lazyLoadMedia.js';
import { closeModal } from './closeModal.js';
import { openModal } from './openModal.js';

function renderAction({ href, label, primary = false }) {
  const className = primary ? 'btn-primary' : 'btn-secondary';

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

function renderMetricGrid(project, language, locale) {
  if (!project.snapshot?.length) {
    return '';
  }

  return `
    <div class="glass-card bg-gradient-to-br from-white/[0.06] via-white/[0.04] to-white/[0.02] p-6">
      <div class="flex items-center gap-3">
        <span class="h-px w-10 bg-red-400/70"></span>
        <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">${locale.projects.snapshotTitle}</div>
      </div>
      <div class="mt-5 grid gap-3 sm:grid-cols-2">
        ${project.snapshot
          .map(
            (item) => `
              <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-4">
                <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-red-400/0 via-red-400/70 to-red-400/0"></div>
                <div class="text-[11px] font-semibold uppercase tracking-[0.26em] text-zinc-500">
                  ${item.label[language]}
                </div>
                <div class="mt-3 text-base font-medium leading-7 text-white">${item.value}</div>
              </div>
            `,
          )
          .join('')}
      </div>
    </div>
  `;
}

function renderTextList(items, accent = false) {
  if (!items?.length) {
    return '';
  }

  return `
    <ul class="grid gap-3">
      ${items
        .map(
          (item) => `
            <li class="flex gap-3 text-sm leading-7 text-zinc-300">
              <span class="mt-3 h-1.5 w-1.5 shrink-0 rounded-full ${accent ? 'bg-red-400 shadow-[0_0_14px_rgba(248,113,113,0.55)]' : 'bg-red-500/80'}"></span>
              <span>${item}</span>
            </li>
          `,
        )
        .join('')}
    </ul>
  `;
}

function renderInfoCard({ title, copy = '', items = [], accent = false }) {
  if (!copy && !items.length) {
    return '';
  }

  return `
    <div class="glass-card ${accent ? 'bg-gradient-to-br from-red-500/10 via-white/[0.04] to-black/20' : 'bg-white/5'} h-full p-6">
      <div class="flex items-center gap-3">
        <span class="h-px w-8 ${accent ? 'bg-red-400/80' : 'bg-white/20'}"></span>
        <div class="text-xs font-semibold uppercase tracking-[0.3em] ${accent ? 'text-red-300' : 'text-zinc-500'}">${title}</div>
      </div>
      ${copy ? `<p class="mt-4 text-sm leading-7 text-zinc-300">${copy}</p>` : ''}
      ${items.length ? `<div class="${copy ? 'mt-5' : 'mt-4'}">${renderTextList(items, accent)}</div>` : ''}
    </div>
  `;
}

function renderNarrativeGrid(project, language, locale) {
  const audience = project.audience?.[language]?.length
    ? renderInfoCard({
        title: locale.projects.audienceTitle,
        items: project.audience[language],
      })
    : '';
  const problem = project.problem?.[language]
    ? renderInfoCard({
        title: locale.projects.problemTitle,
        copy: project.problem[language],
      })
    : '';
  const solution = project.solution?.[language]
    ? renderInfoCard({
        title: locale.projects.solutionTitle,
        copy: project.solution[language],
        accent: true,
      })
    : '';

  const sections = [audience, problem, solution].filter(Boolean);

  if (!sections.length) {
    return '';
  }

  return `
    <div class="grid gap-6 xl:grid-cols-2">
      ${audience}
      ${problem}
      ${solution ? `<div class="xl:col-span-2">${solution}</div>` : ''}
    </div>
  `;
}

function renderFeatureGroups(project, language, locale) {
  if (!project.featureGroups) {
    return '';
  }

  const productFeatures = renderInfoCard({
    title: locale.projects.productFeaturesTitle,
    items: project.featureGroups.product?.[language] ?? [],
  });
  const engineeringFeatures = renderInfoCard({
    title: locale.projects.engineeringFeaturesTitle,
    items: project.featureGroups.engineering?.[language] ?? [],
  });
  const architecture = project.architectureNote?.[language]
    ? renderInfoCard({
        title: locale.projects.architectureTitle,
        copy: project.architectureNote[language],
        accent: true,
      })
    : '';

  if (!productFeatures && !engineeringFeatures && !architecture) {
    return '';
  }

  return `
    <div class="grid gap-6 xl:grid-cols-2">
      ${productFeatures}
      ${engineeringFeatures}
      ${architecture ? `<div class="xl:col-span-2">${architecture}</div>` : ''}
    </div>
  `;
}

function renderLinksCard(project, locale) {
  return `
    <div class="glass-card bg-gradient-to-br from-white/[0.06] via-white/[0.04] to-white/[0.02] p-6">
      <div class="flex items-center gap-3">
        <span class="h-px w-10 bg-red-400/70"></span>
        <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">${locale.projects.linksTitle}</div>
      </div>
      <div class="mt-5 grid gap-3 sm:flex sm:flex-wrap">
        ${renderAction({ href: project.links.demo, label: locale.buttons.liveDemo, primary: true })}
        ${renderAction({ href: project.links.github, label: locale.buttons.githubRepo })}
        ${renderAction({ href: project.links.caseStudy, label: locale.buttons.caseStudy })}
      </div>
      <p class="mt-5 text-sm leading-7 text-zinc-400">${locale.projects.mediaHint}</p>
    </div>
  `;
}

function renderProjectModal(project, locale, language) {
  const highlights = project.highlights[language]
    .map((item) => `<li class="text-sm leading-7 text-zinc-300">${item}</li>`)
    .join('');
  const stack = project.stack.map((item) => `<span class="chip">${item}</span>`).join('');

  return `
    <div class="modal-scroll">
      <div class="p-5 sm:p-8 lg:p-10">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="section-label">${locale.projects.detailsTitle}</div>
            <h3 class="font-display text-3xl font-semibold text-white sm:text-4xl">${project.title}</h3>
            <p class="mt-3 text-base text-red-400">${project.type[language]}</p>
          </div>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
            data-close-modal
            aria-label="${locale.buttons.close}"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5 fill-none stroke-current" stroke-width="1.8">
              <path d="M6 6 18 18M18 6 6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <div class="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_minmax(340px,0.88fr)] xl:items-start xl:gap-10">
          <div class="space-y-6">
            ${renderProjectGallery({ project, language, locale })}
          </div>

          <aside class="space-y-6">
            <div class="glass-card bg-gradient-to-br from-white/[0.06] via-white/[0.04] to-white/[0.02] p-6">
              <div class="flex items-center gap-3">
                <span class="h-px w-10 bg-red-400/70"></span>
                <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">${locale.projects.detailsTitle}</div>
              </div>
              <p class="mt-4 text-sm leading-7 text-zinc-300">${project.description[language]}</p>

              <div class="mt-6">
                <div class="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  ${locale.projects.stackTitle}
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  ${stack}
                </div>
              </div>

              <div class="mt-6">
                <div class="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
                  ${locale.projects.highlightsTitle}
                </div>
                <ul class="mt-3 grid gap-2">
                  ${highlights}
                </ul>
              </div>
            </div>

            ${renderMetricGrid(project, language, locale)}
          </aside>
        </div>

        <div class="mt-8 space-y-6">
          ${renderNarrativeGrid(project, language, locale)}
          ${renderFeatureGroups(project, language, locale)}
          ${renderLinksCard(project, locale)}
        </div>
      </div>
    </div>
  `;
}

export function renderModalShell() {
  return `
    <div
      id="project-modal"
      class="modal-root hidden"
      hidden
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
    >
      <div class="modal-backdrop" data-close-modal></div>
      <div class="modal-panel">
        <div data-modal-content></div>
      </div>
    </div>
  `;
}

export function initProjectModal({ root, projects, locale, language }) {
  const modal = root.querySelector('#project-modal');
  const content = modal?.querySelector('[data-modal-content]');
  const projectMap = new Map(projects.map((project) => [project.id, project]));

  if (!modal || !content) {
    return () => {};
  }

  const handleClick = (event) => {
    const openTrigger = event.target.closest('[data-open-project]');

    if (openTrigger) {
      const project = projectMap.get(openTrigger.dataset.openProject);

      if (!project) {
        return;
      }

      modal.dataset.projectId = project.id;
      content.innerHTML = renderProjectModal(project, locale, language);
      openModal(modal);
      initLazyLoad(modal);
      return;
    }

    if (event.target.closest('[data-close-modal]')) {
      closeModal(modal);
      content.innerHTML = '';
      return;
    }

    const mediaTrigger = event.target.closest('[data-project-media-index]');

    if (mediaTrigger) {
      const project = projectMap.get(modal.dataset.projectId);

      if (!project) {
        return;
      }

      const mediaItems = createProjectMediaItems(project, language, locale);
      const mediaIndex = Number(mediaTrigger.dataset.projectMediaIndex);
      const mediaItem = mediaItems[mediaIndex];
      const stage = modal.querySelector('[data-project-stage]');

      if (!mediaItem || !stage) {
        return;
      }

      modal.querySelectorAll('[data-project-media-index]').forEach((button, index) => {
        button.classList.toggle('is-active', index === mediaIndex);
      });

      stage.innerHTML = renderProjectMediaStage(mediaItem);
      initLazyLoad(stage);
    }
  };

  const handleKeydown = (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal(modal);
      content.innerHTML = '';
    }
  };

  root.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);

  return () => {
    root.removeEventListener('click', handleClick);
    document.removeEventListener('keydown', handleKeydown);
  };
}
