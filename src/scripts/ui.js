let sectionObserver;
let revealObserver;
let heroCleanup;
let mobileMenuBound = false;
let headerBound = false;

function syncYear() {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
}

function closeMenu(toggle, panel) {
  if (!toggle || !panel) {
    return;
  }

  toggle.setAttribute("aria-expanded", "false");
  panel.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

function bindMobileMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const panel = document.querySelector("[data-mobile-nav]");

  if (!toggle || !panel || mobileMenuBound) {
    return;
  }

  mobileMenuBound = true;

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      closeMenu(toggle, panel);
      return;
    }

    toggle.setAttribute("aria-expanded", "true");
    panel.classList.add("is-open");
    document.body.classList.add("menu-open");
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu(toggle, panel));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu(toggle, panel);
    }
  });
}

function bindHeaderState() {
  const header = document.querySelector(".site-header");

  if (!header || headerBound) {
    return;
  }

  headerBound = true;

  const syncState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  };

  syncState();
  window.addEventListener("scroll", syncState, { passive: true });
}

function markActiveLink(sectionId) {
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${sectionId}`;

    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function observeSections(pageType) {
  if (pageType !== "home") {
    if (sectionObserver) {
      sectionObserver.disconnect();
    }
    return;
  }

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  if (!sections.length) {
    return;
  }

  if (sectionObserver) {
    sectionObserver.disconnect();
  }

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

      if (visibleEntry?.target?.id) {
        markActiveLink(visibleEntry.target.id);
      }
    },
    {
      threshold: [0.25, 0.5, 0.7],
      rootMargin: "-18% 0px -38% 0px"
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

function observeReveals() {
  const revealNodes = document.querySelectorAll("[data-reveal]");
  if (!revealNodes.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  if (revealObserver) {
    revealObserver.disconnect();
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
}

function bindSpotlights() {
  document.querySelectorAll("[data-spotlight]").forEach((node) => {
    if (node.dataset.spotlightBound === "true") {
      return;
    }

    node.dataset.spotlightBound = "true";

    node.addEventListener("pointermove", (event) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      node.style.setProperty("--spot-x", `${x}%`);
      node.style.setProperty("--spot-y", `${y}%`);
    });

    node.addEventListener("pointerleave", () => {
      node.style.setProperty("--spot-x", "50%");
      node.style.setProperty("--spot-y", "50%");
    });
  });
}

function initHeroSignal() {
  if (heroCleanup) {
    heroCleanup();
    heroCleanup = undefined;
  }

  const canvas = document.querySelector("[data-signal-canvas]");
  const stage = canvas?.closest(".hero-stage");

  if (!canvas || !stage) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointer = { x: 0.5, y: 0.5 };
  let width = 0;
  let height = 0;
  let rafId = 0;
  let dpr = 1;

  const particles = Array.from({ length: 26 }, (_, index) => {
    const ring = index % 3;
    return {
      angle: (Math.PI * 2 * index) / 26,
      speed: 0.0012 + ring * 0.00045,
      radius: 74 + ring * 52 + Math.random() * 14,
      size: 1.8 + Math.random() * 2.6,
      alpha: 0.18 + Math.random() * 0.32,
      color: ring === 0 ? "79,209,255" : ring === 1 ? "126,231,255" : "139,124,255"
    };
  });

  const arcs = [
    { radius: 94, size: Math.PI * 0.74, speed: 0.00018, stroke: "rgba(126,231,255,0.22)" },
    { radius: 148, size: Math.PI * 0.46, speed: -0.00012, stroke: "rgba(139,124,255,0.18)" },
    { radius: 206, size: Math.PI * 0.32, speed: 0.0001, stroke: "rgba(200,209,220,0.14)" }
  ];

  function resize() {
    const rect = stage.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(now) {
    context.clearRect(0, 0, width, height);

    const centerX = width * 0.5 + (pointer.x - 0.5) * 22;
    const centerY = height * 0.52 + (pointer.y - 0.5) * 18;

    const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, Math.max(width, height) * 0.42);
    glow.addColorStop(0, "rgba(126,231,255,0.08)");
    glow.addColorStop(0.35, "rgba(139,124,255,0.05)");
    glow.addColorStop(1, "rgba(5,5,5,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    arcs.forEach((arc, index) => {
      const start = now * arc.speed + index * 1.3;
      context.beginPath();
      context.arc(centerX, centerY, arc.radius, start, start + arc.size);
      context.strokeStyle = arc.stroke;
      context.lineWidth = 1;
      context.stroke();
    });

    const positions = particles.map((particle, index) => {
      const angle = particle.angle + now * particle.speed * 60;
      const x = centerX + Math.cos(angle) * particle.radius;
      const y = centerY + Math.sin(angle * 1.06) * (particle.radius * 0.82);

      context.beginPath();
      context.arc(x, y, particle.size, 0, Math.PI * 2);
      context.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
      context.shadowBlur = 18;
      context.shadowColor = `rgba(${particle.color}, 0.32)`;
      context.fill();
      context.shadowBlur = 0;

      if (index % 4 === 0) {
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(x, y);
        context.strokeStyle = "rgba(255,255,255,0.04)";
        context.lineWidth = 1;
        context.stroke();
      }

      return { x, y, color: particle.color };
    });

    positions.forEach((position, index) => {
      const next = positions[(index + 4) % positions.length];
      const distance = Math.hypot(position.x - next.x, position.y - next.y);

      if (distance < 132) {
        context.beginPath();
        context.moveTo(position.x, position.y);
        context.lineTo(next.x, next.y);
        context.strokeStyle = "rgba(255,255,255,0.035)";
        context.lineWidth = 1;
        context.stroke();
      }
    });

    context.beginPath();
    context.arc(centerX, centerY, 22, 0, Math.PI * 2);
    context.fillStyle = "rgba(126,231,255,0.08)";
    context.fill();

    if (!reduceMotion) {
      rafId = window.requestAnimationFrame(draw);
    }
  }

  function handlePointerMove(event) {
    const rect = stage.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width;
    pointer.y = (event.clientY - rect.top) / rect.height;
  }

  function handlePointerLeave() {
    pointer.x = 0.5;
    pointer.y = 0.5;
  }

  resize();
  draw(0);

  if (!reduceMotion) {
    rafId = window.requestAnimationFrame(draw);
  }

  stage.addEventListener("pointermove", handlePointerMove);
  stage.addEventListener("pointerleave", handlePointerLeave);
  window.addEventListener("resize", resize);

  heroCleanup = () => {
    window.cancelAnimationFrame(rafId);
    stage.removeEventListener("pointermove", handlePointerMove);
    stage.removeEventListener("pointerleave", handlePointerLeave);
    window.removeEventListener("resize", resize);
  };
}

export function initUi({ pageType }) {
  syncYear();
  bindMobileMenu();
  bindHeaderState();
  bindSpotlights();
  observeSections(pageType);
  observeReveals();
  initHeroSignal();
}
