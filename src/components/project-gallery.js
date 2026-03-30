import { renderVideoPlayer } from './video-player.js';

export function createProjectMediaItems(project, language, locale) {
  const videos = project.media.videos.map((video, index) => ({
    type: 'video',
    id: `video-${index}`,
    title: video.title[language],
    caption: video.caption?.[language] || '',
    src: video.src,
    poster: video.poster || project.media.poster,
    thumb: video.poster || project.media.thumb || project.media.cover,
    group: video.group?.[language] || locale.projects.videoLabel,
    layout: video.layout || 'desktop',
  }));

  const screenshots = project.media.screenshots.map((screenshot, index) => {
    const source = typeof screenshot === 'string' ? null : screenshot;
    const layout = typeof screenshot === 'string' ? 'desktop' : screenshot.layout || 'desktop';
    const mobileTreatment =
      layout === 'mobile'
        ? source?.mobileTreatment || project.media.mobileTreatment || null
        : null;

    return {
      type: 'image',
      id: `shot-${index}`,
      title:
        typeof screenshot === 'string'
          ? `${locale.projects.screenshotLabel} ${String(index + 1).padStart(2, '0')}`
          : screenshot.title?.[language] || `${locale.projects.screenshotLabel} ${String(index + 1).padStart(2, '0')}`,
      caption: typeof screenshot === 'string' ? '' : screenshot.caption?.[language] || '',
      src: typeof screenshot === 'string' ? screenshot : screenshot.src,
      thumb: typeof screenshot === 'string' ? screenshot : screenshot.thumb || screenshot.src,
      group: typeof screenshot === 'string' ? locale.projects.galleryTitle : screenshot.group?.[language] || locale.projects.galleryTitle,
      layout,
      fit: typeof screenshot === 'string' ? 'contain' : screenshot.fit || 'contain',
      mobilePresentation: mobileTreatment?.presentation || 'default',
      zoom: mobileTreatment?.zoom || 1,
      thumbZoom: mobileTreatment?.thumbZoom || mobileTreatment?.zoom || 1,
    };
  });

  return [...screenshots, ...videos];
}

function renderProjectMediaCopy(item) {
  return `
    <div class="glass-card overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-black/30 p-5 sm:p-6">
      <div class="flex items-center gap-3">
        <span class="h-px w-8 bg-red-400/70"></span>
        <div class="text-[11px] font-semibold uppercase tracking-[0.3em] text-red-300">
          ${item.group}
        </div>
      </div>
      <h4 class="mt-4 text-lg font-semibold text-white sm:text-xl">${item.title}</h4>
      ${
        item.caption
          ? `<p class="mt-3 text-sm leading-7 text-zinc-300">${item.caption}</p>`
          : ''
      }
    </div>
  `;
}

function renderProjectMediaThumb(item, activeIndex, locale) {
  const isImmersive = item.layout === 'mobile' && item.mobilePresentation === 'immersive';
  const thumbWrapClass = item.layout === 'mobile' && !isImmersive ? 'mx-auto max-w-[220px]' : '';
  const thumbAspectClass = item.layout === 'mobile' ? (isImmersive ? 'aspect-[10/15]' : 'aspect-[10/14]') : 'aspect-[4/3]';
  const thumbImageClass =
    item.layout === 'mobile'
      ? isImmersive
        ? 'h-full w-full object-cover'
        : 'h-full w-full object-contain p-3'
      : 'h-full w-full object-cover';
  const thumbImageStyle =
    item.layout === 'mobile' && isImmersive && item.thumbZoom !== 1
      ? `style="transform: scale(${item.thumbZoom}); transform-origin: center center;"`
      : '';

  return `
    <button
      type="button"
      class="thumb-button w-full ${item.index === activeIndex ? 'is-active' : ''}"
      data-project-media-index="${item.index}"
    >
      <div class="space-y-3 p-3">
        <div class="${thumbWrapClass}">
          <div class="relative ${thumbAspectClass} overflow-hidden rounded-[1.1rem] bg-black/50" data-media-frame>
            <img
              data-src="${item.thumb}"
              alt="${item.title}"
              class="${thumbImageClass}"
              ${thumbImageStyle}
            />
            <div
              data-media-fallback
              class="absolute inset-0 items-center justify-center bg-gradient-to-br from-red-700/10 via-black to-black px-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-zinc-200"
            >
              ${item.type === 'video' ? locale.projects.videoLabel : item.title}
            </div>
          </div>
        </div>
        <div class="px-1 text-left">
          <div class="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-300">
            ${item.type === 'video' ? locale.projects.videoLabel : item.title}
          </div>
          ${
            item.caption
              ? `<p class="mt-2 text-xs leading-5 text-zinc-400">${item.caption}</p>`
              : ''
          }
        </div>
      </div>
    </button>
  `;
}

export function renderProjectMediaStage(item) {
  if (item.type === 'video') {
    return `
      <div class="space-y-4">
        ${renderVideoPlayer({
          src: item.src,
          poster: item.poster,
          title: item.title,
        })}
        ${renderProjectMediaCopy(item)}
      </div>
    `;
  }

  if (item.layout === 'mobile') {
    const isImmersive = item.mobilePresentation === 'immersive';
    const shellClass = isImmersive
      ? 'mx-auto max-w-[430px] px-2 py-3 sm:max-w-[520px] sm:px-4 sm:py-5'
      : 'mx-auto max-w-[320px] px-4 py-6 sm:px-8';
    const phoneCardClass = isImmersive
      ? 'overflow-hidden rounded-[2.15rem] border border-white/10 bg-black/80 shadow-glass'
      : 'rounded-[2rem] border border-white/10 bg-black/70 p-3 shadow-glass';
    const imageClass = isImmersive
      ? 'aspect-[10/18] w-full object-cover'
      : 'aspect-[10/18] w-full rounded-[1.45rem] bg-black/30 object-contain p-3';
    const imageStyle = item.zoom && item.zoom !== 1 ? `style="transform: scale(${item.zoom}); transform-origin: center center;"` : '';

    return `
      <div class="space-y-4">
        <div class="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/40" data-media-frame>
          <div class="${shellClass}">
            <div class="${phoneCardClass}">
              <img
                data-src="${item.src}"
                alt="${item.title}"
                class="${imageClass}"
                ${imageStyle}
              />
            </div>
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
        ${renderProjectMediaCopy(item)}
      </div>
    `;
  }

  return `
    <div class="space-y-4">
      <div class="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/40" data-media-frame>
        <div class="aspect-[16/10] w-full bg-black/35 p-4 sm:p-6">
          <img
            data-src="${item.src}"
            alt="${item.title}"
            class="h-full w-full object-contain"
          />
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
      ${renderProjectMediaCopy(item)}
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
                    .map((item) => renderProjectMediaThumb(item, activeIndex, locale))
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
