/* ─── NAV: SCROLL STYLE ─── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── NAV: ACTIVE LINK HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => observer.observe(s));

/* ─── MOBILE MENU ─── */
const burger = document.getElementById('burger');
const navLinksEl = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeMenu() {
  navLinksEl.classList.remove('open');
  burger.classList.remove('open');
  navOverlay.classList.remove('open');
  burger.setAttribute('aria-expanded', false);
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
  const isOpen = navLinksEl.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  navOverlay.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navOverlay.addEventListener('click', closeMenu);

navLinksEl.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

/* ─── REVEAL ON SCROLL ─── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay ?? 0;
        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Stagger siblings in the same grid/container
revealEls.forEach((el) => {
  const siblings = [...el.parentElement.querySelectorAll('.reveal')];
  const idx = siblings.indexOf(el);
  el.dataset.delay = idx * 80;
  revealObserver.observe(el);
});
