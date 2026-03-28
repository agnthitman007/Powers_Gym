// ===================== SCROLL FADE-IN =====================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ===================== NAV BACKGROUND ON SCROLL =====================
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(0,0,0,0.97)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.92), transparent)';
  }
});

// ===================== HERO STAT COUNT-UP =====================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateStat(el) {
  const target = parseInt(el.dataset.target, 10);
  if (Number.isNaN(target)) return;
  const suffix = el.dataset.suffix || '+';
  const duration = reduceMotion ? 0 : 1400;
  const start = performance.now();

  function frame(now) {
    const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const n = Math.round(eased * target);
    el.textContent = n + (t >= 1 ? suffix : '');
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const nums = e.target.querySelectorAll('.stat-num[data-target]');
      nums.forEach((el) => {
        if (el.dataset.done) return;
        el.dataset.done = '1';
        animateStat(el);
      });
      statsObserver.unobserve(e.target);
    });
  },
  { threshold: 0.25 }
);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===================== CONTACT FORM SUBMIT =====================
const form = document.querySelector('.contact-form');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Message Sent ✦';
    btn.style.background = '#4caf82';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}
