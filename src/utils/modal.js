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

        <div class="mt-8 grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:gap-10">
          <div>
            ${renderProjectGallery({ project, language, locale })}
          </div>

          <aside class="space-y-6">
            <div class="glass-card p-6">
              <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">${locale.projects.detailsTitle}</div>
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

            <div class="glass-card p-6">
              <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">${locale.projects.linksTitle}</div>
              <div class="mt-5 flex flex-wrap gap-3">
                ${renderAction({ href: project.links.demo, label: locale.buttons.liveDemo, primary: true })}
                ${renderAction({ href: project.links.github, label: locale.buttons.githubRepo })}
                ${renderAction({ href: project.links.caseStudy, label: locale.buttons.caseStudy })}
              </div>
              <p class="mt-5 text-sm leading-7 text-zinc-400">${locale.projects.mediaHint}</p>
            </div>
          </aside>
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
