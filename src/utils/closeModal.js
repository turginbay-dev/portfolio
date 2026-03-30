export function closeModal(modal) {
  if (!modal) {
    return;
  }

  modal.classList.remove('is-open');
  modal.classList.add('hidden');
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('overflow-hidden');
}
