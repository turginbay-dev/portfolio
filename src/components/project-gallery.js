import { renderVideoPlayer } from './video-player.js';

export function createProjectMediaItems(project, language, locale) {
  const videos = project.media.videos.map((video, index) => ({
    type: 'video',
    id: `video-${index}`,
    title: video.title[language],
    src: video.src,
    poster: video.poster || project.media.poster,
    thumb: video.poster || project.media.thumb || project.media.cover,
  }));

  const screenshots = project.media.screenshots.map((screenshot, index) => ({
    type: 'image',
    id: `shot-${index}`,
    title: `${locale.projects.screenshotLabel} ${String(index + 1).padStart(2, '0')}`,
    src: screenshot,
    thumb: screenshot,
  }));

  return [...videos, ...screenshots];
}

export function renderProjectMediaStage(item) {
  if (item.type === 'video') {
    return renderVideoPlayer({
      src: item.src,
      poster: item.poster,
      title: item.title,
    });
  }

  return `
    <div class="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/40" data-media-frame>
      <img
        data-src="${item.src}"
        alt="${item.title}"
        class="aspect-[16/10] w-full object-cover"
      />
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

export function renderProjectGallery({ project, language, locale }) {
  const mediaItems = createProjectMediaItems(project, language, locale);
  const initialItem = mediaItems[0];

  return `
    <div class="space-y-4">
      <div data-project-stage>
        ${renderProjectMediaStage(initialItem)}
      </div>
      <div class="grid grid-cols-2 gap-3 xl:grid-cols-4">
        ${mediaItems
          .map(
            (item, index) => `
              <button
                type="button"
                class="thumb-button ${index === 0 ? 'is-active' : ''}"
                data-project-media-index="${index}"
              >
                <div class="relative aspect-[4/3] overflow-hidden bg-black/50" data-media-frame>
                  <img
                    data-src="${item.thumb}"
                    alt="${item.title}"
                    class="h-full w-full object-cover"
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
              </button>
            `,
          )
          .join('')}
      </div>
    </div>
  `;
}
