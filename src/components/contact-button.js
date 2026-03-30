export function renderContactButton({ label, href, primary = false }) {
  const className = primary ? 'btn-primary' : 'btn-secondary';
  const target = href.startsWith('mailto:') ? '' : 'target="_blank" rel="noreferrer noopener"';

  return `
    <a href="${href}" class="${className} w-full justify-center sm:w-auto" ${target}>
      ${label}
    </a>
  `;
}
