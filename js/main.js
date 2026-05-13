const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('#navLinks');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealItems = Array.from(document.querySelectorAll('.reveal, .timeline li, .price-grid article, .note-panel, .contact-card'));
revealItems.forEach((item) => item.classList.add('reveal'));
document.body.classList.add('animations-ready');

const revealVisibleItems = () => {
  const triggerLine = window.innerHeight * 0.88;

  revealItems.forEach((item) => {
    if (item.classList.contains('is-visible')) return;

    const rect = item.getBoundingClientRect();
    if (rect.top < triggerLine && rect.bottom > 0) {
      item.classList.add('is-visible');
    }
  });
};

window.addEventListener('scroll', revealVisibleItems, { passive: true });
window.addEventListener('resize', revealVisibleItems);
window.addEventListener('load', () => {
  window.setTimeout(revealVisibleItems, 220);
});

requestAnimationFrame(() => {
  requestAnimationFrame(revealVisibleItems);
});

const readMoreButton = document.querySelector('.read-more-button');
const moreText = document.querySelector('#herstellungMehr');

if (readMoreButton && moreText) {
  readMoreButton.addEventListener('click', () => {
    const isExpanded = readMoreButton.getAttribute('aria-expanded') === 'true';
    readMoreButton.setAttribute('aria-expanded', String(!isExpanded));
    moreText.hidden = isExpanded;
    readMoreButton.textContent = isExpanded ? 'weiterlesen' : 'weniger anzeigen';
    revealVisibleItems();
  });
}
