import { renderSectionTitle } from '../components/section-title.js';
import { renderSkillBadge } from '../components/skill-badge.js';
import { renderSection } from '../utils/renderSection.js';

export function renderSkillsSection({ locale, profile, skills }) {
  return renderSection({
    id: 'skills',
    background: profile.assets.backgrounds.skills,
    overlayClass: 'from-black/72 via-black/38 to-black/82',
    innerClass: 'section-block',
    content: `
      <div class="space-y-12">
        ${renderSectionTitle({
          eyebrow: locale.skills.eyebrow,
          title: locale.skills.title,
          description: locale.skills.description,
          align: 'center',
        })}
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          ${skills.map((skill) => renderSkillBadge(skill)).join('')}
        </div>
      </div>
    `,
  });
}
