import { renderVideoPlayer } from './video-player.js';

export function createProjectMediaItems(project, language, locale) {
  const videos = project.media.videos.map((video, index) => ({
    type: 'video',
    id: `video-${index}`,
    title: video.title[language],
    src: video.src,
    poster: video.poster || project.media.poster,
    thumb: video.poster || project.media.thumb || project.media.cover,
    group: video.group?.[language] || locale.projects.videoLabel,
    layout: video.layout || 'desktop',
  }));

  const screenshots = project.media.screenshots.map((screenshot, index) => ({
    type: 'image',
    id: `shot-${index}`,
    title:
      typeof screenshot === 'string'
        ? `${locale.projects.screenshotLabel} ${String(index + 1).padStart(2, '0')}`
        : screenshot.title?.[language] || `${locale.projects.screenshotLabel} ${String(index + 1).padStart(2, '0')}`,
    src: typeof screenshot === 'string' ? screenshot : screenshot.src,
    thumb: typeof screenshot === 'string' ? screenshot : screenshot.thumb || screenshot.src,
    group: typeof screenshot === 'string' ? locale.projects.galleryTitle : screenshot.group?.[language] || locale.projects.galleryTitle,
    layout: typeof screenshot === 'string' ? 'desktop' : screenshot.layout || 'desktop',
    fit: typeof screenshot === 'string' ? 'contain' : screenshot.fit || 'contain',
  }));

  return [...screenshots, ...videos];
}

export function renderProjectMediaStage(item) {
  if (item.type === 'video') {
    return renderVideoPlayer({
      src: item.src,
      poster: item.poster,
      title: item.title,
    });
  }

  if (item.layout === 'mobile') {
    return `
      <div class="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/40" data-media-frame>
        <div class="mx-auto max-w-[320px] px-4 py-6 sm:px-8">
          <div class="rounded-[2rem] border border-white/10 bg-black/70 p-3 shadow-glass">
            <img
              data-src="${item.src}"
              alt="${item.title}"
              class="aspect-[10/18] w-full rounded-[1.45rem] bg-black/30 object-contain p-3"
            />
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
          <div class="text-sm font-medium text-white">${item.title}</div>
        </div>
        <div
          data-media-fallback
          class="absolute inset-0 items-center justify-center bg-gradient-to-br from-red-700/10 via-black to-black text-center"
        >
          <div>
            <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">Preview</div>
            <div class="mt-3 text-lg font-semibold text-white">${item.title}</div>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/40" data-media-frame>
      <div class="aspect-[16/10] w-full bg-black/35 p-4 sm:p-6">
        <img
          data-src="${item.src}"
          alt="${item.title}"
          class="h-full w-full object-contain"
        />
      </div>
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
        <div class="text-sm font-medium text-white">${item.title}</div>
      </div>
      <div
        data-media-fallback
        class="absolute inset-0 items-center justify-center bg-gradient-to-br from-red-700/10 via-black to-black text-center"
      >
        <div>
          <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">Preview</div>
          <div class="mt-3 text-lg font-semibold text-white">${item.title}</div>
        </div>
      </div>
    </div>
  `;
}

function groupMediaItems(mediaItems) {
  const groups = new Map();

  mediaItems.forEach((item, index) => {
    const groupKey = item.group || '__default__';

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        label: groupKey === '__default__' ? '' : groupKey,
        items: [],
      });
    }

    groups.get(groupKey).items.push({ ...item, index });
  });

  return [...groups.values()];
}

export function renderProjectGallery({ project, language, locale }) {
  const mediaItems = createProjectMediaItems(project, language, locale);
  const initialIndex = mediaItems.findIndex((item) => item.type === 'image');
  const activeIndex = initialIndex >= 0 ? initialIndex : 0;
  const initialItem = mediaItems[activeIndex];
  const mediaGroups = groupMediaItems(mediaItems);

  return `
    <div class="space-y-5">
      <div data-project-stage>
        ${renderProjectMediaStage(initialItem)}
      </div>
      <div class="space-y-4">
        ${mediaGroups
          .map(
            (group) => `
              <div class="space-y-3">
                ${group.label
                  ? `
                    <div class="flex items-center gap-3 px-1">
                      <span class="h-px w-8 bg-red-400/60"></span>
                      <div class="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                        ${group.label}
                      </div>
                    </div>
                  `
                  : ''}
                <div class="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                  ${group.items
                    .map(
                      (item) => `
                        <button
                          type="button"
                          class="thumb-button w-full ${item.index === activeIndex ? 'is-active' : ''}"
                          data-project-media-index="${item.index}"
                        >
                          <div class="${item.layout === 'mobile' ? 'mx-auto max-w-[220px]' : ''}">
                            <div class="relative ${item.layout === 'mobile' ? 'aspect-[10/14]' : 'aspect-[4/3]'} overflow-hidden bg-black/50" data-media-frame>
                              <img
                                data-src="${item.thumb}"
                                alt="${item.title}"
                                class="h-full w-full ${item.layout === 'mobile' ? 'object-contain p-3' : 'object-cover'}"
                              />
                              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-3 text-left">
                                <div class="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-200 sm:text-xs">
                                  ${item.type === 'video' ? locale.projects.videoLabel : item.title}
                                </div>
                              </div>
                              <div
                                data-media-fallback
                                class="absolute inset-0 items-center justify-center bg-gradient-to-br from-red-700/10 via-black to-black px-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-zinc-200"
                              >
                                ${item.type === 'video' ? locale.projects.videoLabel : item.title}
                              </div>
                            </div>
                          </div>
                        </button>
                      `,
                    )
                    .join('')}
                </div>
              </div>
            `,
          )
          .join('')}
      </div>
    </div>
  `;
}
