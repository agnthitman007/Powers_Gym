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
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(10,10,10,0.97)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(0,0,0,0.95), transparent)';
  }
});

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
