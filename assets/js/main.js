const glow = document.getElementById('cursorGlow');
const nav = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (glow) {
  document.addEventListener('mousemove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
}

const counters = document.querySelectorAll('.stat-num[data-count]');
if (counters.length) {
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let start = 0;
      const step = () => {
        start += Math.ceil(target / 30);
        if (start > target) start = target;
        el.textContent = `${start}+`;
        if (start < target) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

const pageLinks = document.querySelectorAll('.nav-links a');
const currentPage = window.location.pathname.split('/').pop();
pageLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (!href) return;
  const normalized = href.split('/').pop();
  if (normalized === currentPage) {
    link.classList.add('active');
  }
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.textContent = 'Message Sent ✓';
      submitButton.style.background = '#2a9d5c';
      setTimeout(() => {
        submitButton.textContent = 'Send Message';
        submitButton.style.background = '';
      }, 3000);
    }
    contactForm.reset();
  });
}
