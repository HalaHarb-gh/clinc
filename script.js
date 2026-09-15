const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contactForm');

const CLINIC_PHONE = '962791234567';

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
});

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('is-open');
  nav.classList.toggle('is-open');
  document.body.style.overflow = nav.classList.contains('is-open') ? 'hidden' : '';
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('is-open');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  });
});

const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const top = section.offsetTop;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove('nav__link--active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('nav__link--active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveNav);

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const phone = formData.get('phone');
  const dept = contactForm.department.selectedOptions[0].text;

  const message = encodeURIComponent(
    `مرحباً، أود حجز موعد في عيادات أوركيد الطبية.\nالاسم: ${name}\nالجوال: ${phone}\nالخدمة: ${dept}`
  );

  window.open(`https://wa.me/${CLINIC_PHONE}?text=${message}`, '_blank');
  contactForm.reset();
});
