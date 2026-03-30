import { renderSectionTitle } from '../components/section-title.js';
import { renderSocialCard } from '../components/social-card.js';
import { renderContactButton } from '../components/contact-button.js';
import { renderSection } from '../utils/renderSection.js';

export function renderContactSection({ locale, profile, socials }) {
  const socialTitles = {
    whatsapp: 'WhatsApp',
    email: 'Email',
    telegram: 'Telegram',
    instagram: 'Instagram',
    github: 'GitHub',
    linkedin: 'LinkedIn',
  };

  const quickActions = socials
    .filter((item) => item.primary)
    .map((item, index) =>
      renderContactButton({
        label: socialTitles[item.id],
        href: item.href,
        primary: index === 0,
      }),
    )
    .join('');

  return renderSection({
    id: 'contact',
    background: profile.assets.backgrounds.contact,
    overlayClass: 'from-black/66 via-black/30 to-black/78',
    innerClass: 'section-block',
    content: `
      <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div class="space-y-8">
          ${renderSectionTitle({
            eyebrow: locale.contact.eyebrow,
            title: locale.contact.title,
            description: locale.contact.description,
          })}

          <div class="grid gap-4 sm:grid-cols-2">
            ${socials
              .map((item) =>
                renderSocialCard({
                  item,
                  title: socialTitles[item.id],
                  primary: item.primary,
                }),
              )
              .join('')}
          </div>

          <div class="panel p-6 sm:p-7" data-animate>
            <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">${locale.contact.quickTitle}</div>
            <p class="mt-3 text-sm leading-7 text-zinc-300">${locale.contact.quickText}</p>
            <div class="mt-5 grid gap-3 sm:flex sm:flex-wrap">
              ${quickActions}
            </div>
          </div>
        </div>

        <div class="panel p-6 sm:p-8" data-animate>
          <div class="text-xs font-semibold uppercase tracking-[0.35em] text-red-400">${locale.contact.formTitle}</div>
          <h3 class="mt-4 font-display text-3xl font-semibold text-white">${locale.contact.methodsTitle}</h3>
          <p class="mt-3 max-w-xl text-sm leading-7 text-zinc-300">${locale.contact.formText}</p>

          <form class="mt-8 grid gap-4" data-contact-form>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="grid gap-2 text-sm text-zinc-300">
                <span>${locale.contact.nameLabel}</span>
                <input
                  type="text"
                  name="name"
                  class="form-input"
                  placeholder="${locale.contact.namePlaceholder}"
                  required
                />
              </label>

              <label class="grid gap-2 text-sm text-zinc-300">
                <span>${locale.contact.emailLabel}</span>
                <input
                  type="email"
                  name="email"
                  class="form-input"
                  placeholder="${locale.contact.emailPlaceholder}"
                  required
                />
              </label>
            </div>

            <label class="grid gap-2 text-sm text-zinc-300">
              <span>${locale.contact.messageLabel}</span>
              <textarea
                name="message"
                rows="6"
                class="form-input resize-none"
                placeholder="${locale.contact.messagePlaceholder}"
                required
              ></textarea>
            </label>

            <div class="pt-2">
              <button type="submit" class="btn-primary w-full justify-center sm:w-auto">
                ${locale.buttons.sendMessage}
              </button>
            </div>
          </form>
        </div>
      </div>
    `,
  });
}
