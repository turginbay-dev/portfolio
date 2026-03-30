export function openModal(modal) {
  if (!modal) {
    return;
  }

  modal.hidden = false;
  modal.classList.remove('hidden');
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overflow-hidden');
}
