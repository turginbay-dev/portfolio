export function renderVideoPlayer({ src, poster, title }) {
  return `
    <div class="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-black/40" data-media-frame>
      <video
        data-src="${src}"
        data-poster="${poster || ''}"
        class="aspect-[16/10] w-full rounded-[1.6rem] object-cover"
        controls
        preload="metadata"
        playsinline
      ></video>
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4">
        <div class="text-sm font-medium text-white">${title}</div>
      </div>
      <div
        data-media-fallback
        class="absolute inset-0 items-center justify-center bg-gradient-to-br from-red-700/10 via-black to-black text-center"
      >
        <div>
          <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">Video</div>
          <div class="mt-3 text-lg font-semibold text-white">${title}</div>
        </div>
      </div>
    </div>
  `;
}
