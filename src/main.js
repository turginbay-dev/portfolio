import './style.css';
import kk from './locales/kk.json';
import ru from './locales/ru.json';
import en from './locales/en.json';
import { profile } from './data/profile.js';
import { socials } from './data/socials.js';
import { skills } from './data/skills.js';
import { projects } from './data/projects.js';
import { seo } from './data/seo.js';
import { renderNavbar } from './components/navbar.js';
import { renderHeroSection } from './sections/hero.js';
import { renderAboutSection } from './sections/about.js';
import { renderSkillsSection } from './sections/skills.js';
import { renderProjectsSection } from './sections/projects.js';
import { renderContactSection } from './sections/contact.js';
import { renderFooterSection } from './sections/footer.js';
import { renderModalShell, initProjectModal } from './utils/modal.js';
import { resolveInitialLanguage, setLanguagePreference, LANGUAGE_EVENT } from './utils/setLanguage.js';
import { initLazyLoad } from './utils/lazyLoadMedia.js';
import { initScrollAnimations } from './utils/scrollAnimations.js';

const root = document.querySelector('#app');

const locales = { kk, ru, en };
const navSchema = [
  { id: 'hero', key: 'hero' },
  { id: 'about', key: 'about' },
  { id: 'skills', key: 'skills' },
  { id: 'projects', key: 'projects' },
  { id: 'contact', key: 'contact' },
];

const state = {
  language: resolveInitialLanguage(Object.keys(locales), 'en'),
};

let cleanupFns = [];

function updateMeta(selector, attribute, name, value) {
  let meta = document.head.querySelector(selector);

  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }

  meta.setAttribute('content', value);
}

function applySeo(currentLanguage) {
  document.documentElement.lang = currentLanguage;
  document.title = seo.title[currentLanguage];
  updateMeta('meta[name="description"]', 'name', 'description', seo.description[currentLanguage]);
  updateMeta('meta[property="og:title"]', 'property', 'og:title', seo.title[currentLanguage]);
  updateMeta('meta[property="og:description"]', 'property', 'og:description', seo.description[currentLanguage]);
  updateMeta('meta[property="og:image"]', 'property', 'og:image', seo.image);
}

function getContext() {
  const locale = locales[state.language];

  return {
    language: state.language,
    locale,
    profile,
    socials,
    skills,
    projects,
    navItems: navSchema.map((item) => ({
      id: item.id,
      label: locale.nav[item.key],
    })),
  };
}

function cleanup() {
  cleanupFns.forEach((fn) => fn?.());
  cleanupFns = [];
}

function closeMobileMenu() {
  const drawer = root.querySelector('[data-mobile-menu]');
  const toggle = root.querySelector('[data-mobile-toggle]');

  drawer?.classList.remove('is-open');
  toggle?.setAttribute('aria-expanded', 'false');
}

function toggleMobileMenu() {
  const drawer = root.querySelector('[data-mobile-menu]');
  const toggle = root.querySelector('[data-mobile-toggle]');

  if (!drawer || !toggle) {
    return;
  }

  const isOpen = drawer.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(isOpen));
}

function bindInteractions(context) {
  const handleClick = (event) => {
    const openCvMenus = [...root.querySelectorAll('[data-cv-details][open]')];
    const currentCvMenu = event.target.closest('[data-cv-details]');
    const cvSummary = event.target.closest('[data-cv-summary]');

    if (!currentCvMenu && openCvMenus.length) {
      openCvMenus.forEach((menu) => menu.removeAttribute('open'));
    }

    if (cvSummary) {
      openCvMenus
        .filter((menu) => menu !== currentCvMenu)
        .forEach((menu) => menu.removeAttribute('open'));
      return;
    }

    const cvOption = event.target.closest('[data-cv-option]');
    if (cvOption) {
      openCvMenus.forEach((menu) => menu.removeAttribute('open'));
      return;
    }

    const languageButton = event.target.closest('[data-language]');
    if (languageButton) {
      const nextLanguage = languageButton.dataset.language;

      if (nextLanguage && nextLanguage !== state.language) {
        setLanguagePreference(nextLanguage);
      }

      return;
    }

    const mobileToggle = event.target.closest('[data-mobile-toggle]');
    if (mobileToggle) {
      toggleMobileMenu();
      return;
    }

    const scrollTrigger = event.target.closest('[data-scroll-target]');
    if (scrollTrigger) {
      event.preventDefault();
      const targetId = scrollTrigger.dataset.scrollTarget;
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      closeMobileMenu();
    }
  };

  const form = root.querySelector('[data-contact-form]');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form) {
      return;
    }

    const formData = new FormData(form);
    const emailAddress = socials.find((item) => item.id === 'email')?.value ?? 'your.email@example.com';
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    const subject = `${context.locale.contact.mailtoSubject} - ${name || 'New message'}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n');

    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.reset();
  };

  root.addEventListener('click', handleClick);
  form?.addEventListener('submit', handleSubmit);

  return () => {
    root.removeEventListener('click', handleClick);
    form?.removeEventListener('submit', handleSubmit);
  };
}

function renderApp() {
  cleanup();

  const context = getContext();

  root.innerHTML = `
    <div class="page-shell">
      ${renderNavbar(context)}
      <main class="relative">
        ${renderHeroSection(context)}
        ${renderAboutSection(context)}
        ${renderSkillsSection(context)}
        ${renderProjectsSection(context)}
        ${renderContactSection(context)}
      </main>
      ${renderFooterSection(context)}
      ${renderModalShell()}
    </div>
  `;

  applySeo(context.language);
  initLazyLoad(root);

  cleanupFns.push(bindInteractions(context));
  cleanupFns.push(initScrollAnimations(root));
  cleanupFns.push(
    initProjectModal({
      root,
      projects,
      locale: context.locale,
      language: context.language,
    }),
  );
}

document.addEventListener(LANGUAGE_EVENT, (event) => {
  const nextLanguage = event.detail.language;

  if (!nextLanguage || nextLanguage === state.language) {
    return;
  }

  state.language = nextLanguage;
  renderApp();
});

renderApp();
