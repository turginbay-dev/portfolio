import {
  applySiteCopy,
  bindLanguageSwitcher,
  getSavedLocale,
  loadSiteCopy,
  setLanguageButtons
} from "./i18n.js";
import { initUi } from "./ui.js";
import {
  getProjectByKey,
  loadAllProjects,
  renderFeaturedProjects,
  renderProjectCaseStudy
} from "./projects.js";

function setHtml(selector, html) {
  const node = document.querySelector(selector);
  if (node) {
    node.innerHTML = html;
  }
}

function renderCollection(selector, items, renderer) {
  const node = document.querySelector(selector);
  if (!node || !Array.isArray(items)) {
    return;
  }

  node.innerHTML = items.map(renderer).join("");
}

function setLinkState(selector, item) {
  document.querySelectorAll(selector).forEach((node) => {
    if (!item?.available || !item?.href || item.href === "#") {
      node.setAttribute("href", "#");
      node.setAttribute("aria-disabled", "true");
      node.classList.add("is-disabled");
      if (item?.action) {
        node.setAttribute("title", item.action);
      }
      node.removeAttribute("target");
      node.removeAttribute("rel");
      return;
    }

    node.setAttribute("href", item.href);
    node.removeAttribute("aria-disabled");
    node.classList.remove("is-disabled");
    node.removeAttribute("title");

    if (item.href.startsWith("http")) {
      node.setAttribute("target", "_blank");
      node.setAttribute("rel", "noreferrer");
    }
  });
}

function getSocialIcon(key) {
  const icons = {
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.17 19.48c.5.09.68-.21.68-.48v-1.86c-2.79.61-3.38-1.18-3.38-1.18a2.67 2.67 0 0 0-1.12-1.47c-.92-.62.07-.61.07-.61a2.11 2.11 0 0 1 1.54 1.03 2.15 2.15 0 0 0 2.94.84 2.15 2.15 0 0 1 .64-1.34c-2.23-.25-4.57-1.11-4.57-4.94A3.86 3.86 0 0 1 7.34 8.8a3.58 3.58 0 0 1 .1-2.55s.84-.27 2.75 1.03a9.47 9.47 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03a3.58 3.58 0 0 1 .1 2.55 3.86 3.86 0 0 1 1.02 2.67c0 3.84-2.34 4.69-4.58 4.94a2.41 2.41 0 0 1 .69 1.87v2.77c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5A1.56 1.56 0 1 1 6.9 5.4a1.56 1.56 0 0 1 .04 3.1ZM5.5 9.75h2.86V18H5.5Zm4.64 0h2.74v1.13h.04a3 3 0 0 1 2.74-1.5c2.94 0 3.48 1.94 3.48 4.46V18h-2.86v-3.7c0-.88-.02-2.01-1.22-2.01s-1.41.96-1.41 1.94V18h-2.86Z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm-.2 2A2.8 2.8 0 0 0 4 6.8v10.4A2.8 2.8 0 0 0 6.8 20h10.4A2.8 2.8 0 0 0 20 17.2V6.8A2.8 2.8 0 0 0 17.2 4ZM12 7.3A4.7 4.7 0 1 1 7.3 12 4.7 4.7 0 0 1 12 7.3Zm0 2A2.7 2.7 0 1 0 14.7 12 2.7 2.7 0 0 0 12 9.3Zm4.9-3.2a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3h13A2.5 2.5 0 0 1 21 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5Zm2 .38v.18l7 5.06 7-5.06v-.18a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5Zm14 2.63-6.41 4.64a1 1 0 0 1-1.18 0L5 8.51V18.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5Z"/></svg>'
  };

  return icons[key] || icons.github;
}

function renderHero(copy) {
  renderCollection(
    "[data-hero-stats]",
    copy.hero.stats,
    (item) => `
      <article class="stat-card panel" data-spotlight>
        <span class="stat-card__label">${item.label}</span>
        <strong class="stat-card__value">${item.value}</strong>
      </article>
    `
  );

  renderCollection(
    "[data-hero-pills]",
    copy.hero.pills,
    (item) => `
      <span class="signal-pill">${item}</span>
    `
  );

  renderCollection(
    "[data-hero-metrics]",
    copy.hero.metrics,
    (item) => `
      <article class="signal-metric">
        <span class="mono-label">${item.label}</span>
        <strong>${item.value}</strong>
      </article>
    `
  );

  renderCollection(
    "[data-hero-log]",
    copy.hero.log,
    (item) => `
      <span>${item}</span>
    `
  );
}

function renderAbout(copy) {
  renderCollection(
    "[data-about-stats]",
    copy.about.stats,
    (item) => `
      <article class="stat-card panel" data-spotlight>
        <span class="stat-card__label">${item.label}</span>
        <strong class="stat-card__value">${item.value}</strong>
      </article>
    `
  );

  renderCollection(
    "[data-about-identity]",
    copy.about.identity,
    (item) => `
      <article class="identity-card panel" data-spotlight>
        <span class="mono-label">${item.label}</span>
        <strong>${item.value}</strong>
        <p>${item.note}</p>
      </article>
    `
  );
}

function renderSkills(copy) {
  renderCollection(
    "[data-skills-grid]",
    copy.skills.groups,
    (item) => `
      <article class="stack-card panel" data-reveal data-spotlight>
        <span class="mono-label">${item.label}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="stack-list">
          ${item.items
            .map(
              (tech) => `
                <span class="tag-pill">${tech}</span>
              `
            )
            .join("")}
        </div>
      </article>
    `
  );

  renderCollection(
    "[data-skills-pills]",
    copy.skills.labPills,
    (item) => `
      <span class="tag-pill">${item}</span>
    `
  );
}

function renderJourney(copy) {
  renderCollection(
    "[data-journey-grid]",
    copy.journey.phases,
    (item) => `
      <article class="journey-card panel" data-reveal data-spotlight>
        <span class="mono-label">${item.phase} / ${item.status}</span>
        <h3>${item.title}</h3>
        <p>${item.body}</p>
        <span class="journey-card__meta">${item.meta}</span>
      </article>
    `
  );
}

function renderContact(copy) {
  renderCollection(
    "[data-contact-grid]",
    copy.contact.cards,
    (item) => `
      <article class="contact-card panel" data-reveal data-spotlight>
        <span class="contact-card__icon">${getSocialIcon(item.key)}</span>
        <span class="mono-label">${item.label}</span>
        <h3>${item.title}</h3>
        <p>${item.body}</p>
        <div class="contact-card__action">
          <a
            class="${item.available ? "button-primary" : "button-secondary is-disabled"}"
            href="${item.available ? item.href : "#"}"
            ${item.available ? 'target="_blank" rel="noreferrer"' : 'aria-disabled="true"'}
          >
            ${item.action}
          </a>
        </div>
      </article>
    `
  );

  const githubCard = copy.contact.cards.find((item) => item.key === "github");
  setLinkState("[data-contact-primary]", githubCard);
  setLinkState("[data-github-link]", githubCard);
  setLinkState("[data-linkedin-link]", copy.contact.cards.find((item) => item.key === "linkedin"));
}

function renderHomePage(copy, projects, projectBase) {
  renderHero(copy);
  renderAbout(copy);
  renderSkills(copy);
  renderFeaturedProjects(projects, projectBase);
  renderJourney(copy);
  renderContact(copy);
}

async function renderPage(locale) {
  const body = document.body;
  const basePath = body.dataset.basePath || "../";
  const pageType = body.dataset.pageType || "home";
  const projectKey = body.dataset.projectKey || "";
  const projectBase = body.dataset.projectBase || "./projects/";

  setLanguageButtons(locale);

  try {
    const [copy, projects] = await Promise.all([loadSiteCopy(basePath, locale), loadAllProjects(basePath, locale)]);

    applySiteCopy(copy, locale);

    if (pageType === "home") {
      renderHomePage(copy, projects, projectBase);
    }

    if (pageType === "project" && projectKey) {
      const currentProject = getProjectByKey(projects, projectKey);
      renderProjectCaseStudy(projects, currentProject, projectBase);
      setLinkState("[data-github-link]", copy.contact.cards.find((item) => item.key === "github"));
      setLinkState("[data-linkedin-link]", copy.contact.cards.find((item) => item.key === "linkedin"));
    }
  } catch (error) {
    console.error(error);
    setHtml(
      "[data-page-error]",
      '<div class="panel p-6 text-center text-muted">Unable to load portfolio content.</div>'
    );
  } finally {
    initUi({ pageType });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const locale = getSavedLocale();
  bindLanguageSwitcher(renderPage);
  await renderPage(locale);
});
