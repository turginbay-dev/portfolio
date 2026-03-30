function observeAnimated(root) {
  const animatedNodes = [...root.querySelectorAll('[data-animate]')];

  if (!animatedNodes.length) {
    return () => {};
  }

  if (!('IntersectionObserver' in window)) {
    animatedNodes.forEach((node) => node.classList.add('is-visible'));
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    },
  );

  animatedNodes.forEach((node) => observer.observe(node));

  return () => observer.disconnect();
}

function observeSections(root) {
  const sections = [...root.querySelectorAll('[data-section]')];
  const navLinks = [...root.querySelectorAll('[data-nav-link]')];

  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) {
    return () => {};
  }

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.dataset.navLink === id);
    });
  };

  setActive('hero');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-35% 0px -45% 0px',
      threshold: [0.2, 0.45, 0.7],
    },
  );

  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
}

export function initScrollAnimations(root = document) {
  const cleanups = [observeAnimated(root), observeSections(root)];

  return () => {
    cleanups.forEach((cleanup) => cleanup?.());
  };
}
