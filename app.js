/* ================================================
   LYRA SUPREME SPA — app.js (Design 2)
   Vanilla JS — No dependencies
   ================================================ */

/* ---- Lightbox ---- */
function openLightbox(src, caption) {
  const lightbox = document.getElementById('photoLightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  img.src = src;
  cap.textContent = caption;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('photoLightbox');
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---- Gallery Filter ---- */
function filterGallery(category, btnEl) {
  // Update tabs
  document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  if (btnEl) btnEl.classList.add('active');

  // Filter cards
  document.querySelectorAll('.gallery-card').forEach(card => {
    const show = category === 'all' || card.classList.contains(category);
    card.style.display = show ? '' : 'none';
  });
}

/* ---- Form Submit ---- */
function handleFormSubmit(e) {
  e.preventDefault();
  const note = document.getElementById('confirmationNote');
  if (note) {
    note.classList.remove('hidden');
    note.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ---- Header Scroll Effect ---- */
(function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

/* ---- Active Nav Link on Scroll ---- */
(function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header-nav a');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(section => observer.observe(section));
})();

/* ---- Mobile Nav ---- */
(function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const overlay   = document.getElementById('mobile-overlay');
  const closeBtn  = document.getElementById('mobile-nav-close');
  if (!hamburger || !mobileNav) return;

  function openNav() {
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (overlay)  overlay.addEventListener('click', closeNav);

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });
})();

/* ---- Lightbox Keyboard & Click Outside ---- */
(function initLightboxEvents() {
  const lightbox = document.getElementById('photoLightbox');
  if (!lightbox) return;

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
})();

/* ---- Reveal on Scroll Animation ---- */
(function initRevealAnimation() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay * 1000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
})();

/* ---- Smooth Mobile Nav Links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
