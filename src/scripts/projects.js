const PROJECT_REGISTRY = [
  {
    key: "qazsound",
    dataFile: "qazsound",
    pageFile: "qazsound.html"
  },
  {
    key: "flutter-app",
    dataFile: "flutter-app",
    pageFile: "flutter-app.html"
  },
  {
    key: "telegram-bot",
    dataFile: "telegram-bot",
    pageFile: "telegram-bot.html"
  }
];

function renderPills(items) {
  return items
    .map(
      (item) => `
        <span class="tag-pill">
          ${item}
        </span>
      `
    )
    .join("");
}

function renderDetailList(items) {
  return items
    .map(
      (item) => `
        <li>
          ${item}
        </li>
      `
    )
    .join("");
}

function renderMetrics(items) {
  return items
    .map(
      (item) => `
        <article class="project-card__metric">
          <span class="mono-label">${item.label}</span>
          <strong>${item.value}</strong>
        </article>
      `
    )
    .join("");
}

function renderGallery(items) {
  return items
    .map(
      (item) => `
        <article class="panel gallery-card" data-spotlight>
          <span class="mono-label">${item.label}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </article>
      `
    )
    .join("");
}

function getProjectHref(projectBase, pageFile) {
  return `${projectBase}${pageFile}`;
}

function disableLink(linkNode, label) {
  linkNode.setAttribute("href", "#");
  linkNode.setAttribute("aria-disabled", "true");
  linkNode.classList.add("is-disabled");

  if (label) {
    linkNode.setAttribute("title", label);
  }

  linkNode.removeAttribute("target");
  linkNode.removeAttribute("rel");
}

function enableLink(linkNode, href) {
  linkNode.setAttribute("href", href);
  linkNode.removeAttribute("aria-disabled");
  linkNode.classList.remove("is-disabled");
  linkNode.removeAttribute("title");

  if (href.startsWith("http")) {
    linkNode.setAttribute("target", "_blank");
    linkNode.setAttribute("rel", "noreferrer");
    return;
  }

  linkNode.removeAttribute("target");
  linkNode.removeAttribute("rel");
}

function renderProjectPreview(project) {
  return `
    <div class="project-card__preview">
      <div class="project-card__topline">
        <span class="status-badge">${project.previewCode}</span>
        <span class="status-badge">${project.status}</span>
      </div>

      <div>
        <span class="mono-label">${project.category}</span>
        <h2 class="project-card__title">${project.name}</h2>
        <p class="project-card__eyebrow">${project.cardTagline}</p>
      </div>

      <div class="project-card__metrics">
        ${renderMetrics(project.metrics)}
      </div>
    </div>
  `;
}

async function loadProject(basePath, entry, locale) {
  const response = await fetch(`${basePath}data/projects/${entry.dataFile}.json`);

  if (!response.ok) {
    throw new Error(`Unable to load project data for "${entry.key}"`);
  }

  const rawProject = await response.json();
  const localizedCopy = rawProject.locales?.[locale] || rawProject.locales?.en || {};

  return {
    ...rawProject,
    ...localizedCopy,
    key: entry.key,
    pageFile: entry.pageFile
  };
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    if (typeof value === "string") {
      node.textContent = value;
    }
  });
}

function setHtml(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    if (typeof value === "string") {
      node.innerHTML = value;
    }
  });
}

function setList(selector, items, mode = "detail") {
  const node = document.querySelector(selector);
  if (!node || !Array.isArray(items)) {
    return;
  }

  node.innerHTML = mode === "pills" ? renderPills(items) : renderDetailList(items);
}

function setGallery(selector, items) {
  const node = document.querySelector(selector);
  if (!node || !Array.isArray(items)) {
    return;
  }

  node.innerHTML = renderGallery(items);
}

function setActionLink(selector, href, disabledLabel) {
  document.querySelectorAll(selector).forEach((node) => {
    if (!href || href === "#") {
      disableLink(node, disabledLabel);
      return;
    }

    enableLink(node, href);
  });
}

function renderProjectNavigation(projects, currentProject, projectBase) {
  const currentIndex = projects.findIndex((project) => project.key === currentProject.key);
  const previousProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const previousLink = document.querySelector("[data-project-prev]");
  const nextLink = document.querySelector("[data-project-next]");

  if (previousLink) {
    previousLink.setAttribute("href", getProjectHref(projectBase, previousProject.pageFile));
    previousLink.querySelector("[data-project-prev-title]").textContent = previousProject.name;
    previousLink.querySelector("[data-project-prev-meta]").textContent = previousProject.category;
  }

  if (nextLink) {
    nextLink.setAttribute("href", getProjectHref(projectBase, nextProject.pageFile));
    nextLink.querySelector("[data-project-next-title]").textContent = nextProject.name;
    nextLink.querySelector("[data-project-next-meta]").textContent = nextProject.category;
  }
}

export async function loadAllProjects(basePath, locale) {
  return Promise.all(PROJECT_REGISTRY.map((entry) => loadProject(basePath, entry, locale)));
}

export function getProjectByKey(projects, key) {
  return projects.find((project) => project.key === key) || projects[0];
}

export function renderFeaturedProjects(projects, projectBase) {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) {
    return;
  }

  grid.innerHTML = projects
    .map((project, index) => {
      const isFeature = index === 0;

      return `
        <article
          class="project-card panel ${isFeature ? "project-card--feature" : ""}"
          data-accent="${project.accent}"
          data-reveal
          data-spotlight
        >
          ${renderProjectPreview(project)}

          <div class="project-card__body">
            <div class="flex flex-wrap gap-2">
              ${renderPills(project.stack.slice(0, 4))}
            </div>
            <p class="project-card__summary">${project.cardDescription}</p>
            <div class="project-card__footer">
              <span class="mono-label">${project.year}</span>
              <a class="button-secondary" href="${getProjectHref(projectBase, project.pageFile)}">
                ${project.cardCta}
              </a>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

export function renderProjectCaseStudy(projects, currentProject, projectBase) {
  if (!currentProject) {
    return;
  }

  document.title = `${currentProject.name} | Turginbay Bekzat`;

  const descriptionMeta = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');

  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", currentProject.summary);
  }

  if (ogTitle) {
    ogTitle.setAttribute("content", `${currentProject.name} | Turginbay Bekzat`);
  }

  if (ogDescription) {
    ogDescription.setAttribute("content", currentProject.summary);
  }

  setText("[data-project-name]", currentProject.name);
  setText("[data-project-headline]", currentProject.headline);
  setText("[data-project-summary]", currentProject.summary);
  setText("[data-project-category]", currentProject.category);
  setText("[data-project-status]", currentProject.status);
  setText("[data-project-role]", currentProject.role);
  setText("[data-project-year]", currentProject.year);
  setText("[data-project-challenge]", currentProject.challenge);
  setText("[data-project-solution]", currentProject.solution);
  setText("[data-project-impact]", currentProject.impact);
  setText("[data-project-private-note]", currentProject.privateNote);
  setHtml(
    "[data-project-preview]",
    `<div class="project-card" data-accent="${currentProject.accent}">
      ${renderProjectPreview(currentProject)}
    </div>`
  );

  const metricNode = document.querySelector("[data-project-metrics]");
  if (metricNode) {
    metricNode.innerHTML = renderMetrics(currentProject.metrics);
  }

  setList("[data-project-stack]", currentProject.stack, "pills");
  setList("[data-project-goals]", currentProject.goals);
  setList("[data-project-features]", currentProject.features);
  setList("[data-project-future]", currentProject.future);
  setGallery("[data-project-gallery]", currentProject.gallery);

  setActionLink("[data-project-demo]", currentProject.links?.demo, currentProject.privateLinkLabel);
  setActionLink("[data-project-github]", currentProject.links?.github, currentProject.privateLinkLabel);

  renderProjectNavigation(projects, currentProject, projectBase);
}
