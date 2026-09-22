const header = document.querySelector('.site-header');
const menuBtn = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-menu');
const glow = document.querySelector('.cursor-glow');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, {passive:true});

menuBtn?.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
});
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded','false');
  menu.setAttribute('aria-hidden','true');
}));

document.addEventListener('pointermove', e => {
  if (glow) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const heroVisual = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
  if (!heroVisual) return;
  const y = Math.min(window.scrollY, 600);
  const isMobile = window.innerWidth < 801;
  const translateFactor = isMobile ? .12 : .2;
  const rotationFactor = isMobile ? .3 : .3;
  heroVisual.style.transform = `translateY(${y * translateFactor}px) perspective(1000px) rotateY(${y * rotationFactor}deg)`;
}, {passive:true});

document.querySelectorAll('.service').forEach(item => {
  item.addEventListener('mouseenter', () => {
    document.querySelectorAll('.service').forEach(x => x.classList.remove('active'));
    item.classList.add('active');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});
