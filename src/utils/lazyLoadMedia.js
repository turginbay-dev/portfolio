const MEDIA_SELECTOR = 'img[data-src], video[data-src]';

function revealFallback(element) {
  const frame = element.closest('[data-media-frame]');
  frame?.classList.add('is-media-fallback');
}

function applyFallbackSource(element) {
  const fallback = element.dataset.fallbackSrc;

  if (!fallback) {
    return false;
  }

  if (element.getAttribute('src') === fallback) {
    return false;
  }

  element.src = fallback;
  element.removeAttribute('data-fallback-src');
  return true;
}

function attachFailureHandler(element) {
  if (element.dataset.failureBound === 'true') {
    return;
  }

  element.dataset.failureBound = 'true';

  element.addEventListener(
    'error',
    () => {
      if (applyFallbackSource(element)) {
        return;
      }

      revealFallback(element);
    },
    { once: true },
  );
}

function loadMedia(element) {
  if (element.dataset.loaded === 'true') {
    return;
  }

  attachFailureHandler(element);
  element.dataset.loaded = 'true';

  if (element.tagName === 'VIDEO') {
    if (element.dataset.poster) {
      element.poster = element.dataset.poster;
    }

    element.src = element.dataset.src;
    element.load();
    return;
  }

  element.src = element.dataset.src;
}

export function initLazyLoad(root = document) {
  const elements = [...root.querySelectorAll(MEDIA_SELECTOR)];

  if (!elements.length) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    elements.forEach(loadMedia);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        loadMedia(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '160px 0px',
      threshold: 0.1,
    },
  );

  elements.forEach((element) => observer.observe(element));
}
