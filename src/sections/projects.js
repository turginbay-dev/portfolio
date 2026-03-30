import { renderSectionTitle } from '../components/section-title.js';
import { renderProjectCard } from '../components/project-card.js';
import { renderSection } from '../utils/renderSection.js';

export function renderProjectsSection({ locale, profile, projects, language }) {
  return renderSection({
    id: 'projects',
    background: profile.assets.backgrounds.projects,
    overlayClass: 'from-black/64 via-black/26 to-black/76',
    innerClass: 'section-block',
    content: `
      <div class="space-y-12">
        ${renderSectionTitle({
          eyebrow: locale.projects.eyebrow,
          title: locale.projects.title,
          description: locale.projects.description,
          align: 'center',
        })}
        <div class="grid gap-8">
          ${projects
            .map((project, index) =>
              renderProjectCard({
                project,
                locale,
                language,
                index,
              }),
            )
            .join('')}
        </div>
      </div>
    `,
  });
}
