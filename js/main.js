// ─── NAV SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  const backTop = document.getElementById('backTop');
  if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
});

// ─── ACTIVE NAV LINK ───
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ─── MOBILE MENU ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
if (hamburger) hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
document.querySelectorAll('.mob-link').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ─── SCROLL REVEAL ───
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ─── SKILL BARS ───
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('animated'); skillObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.skill-fill').forEach(el => skillObs.observe(el));

// ─── FAQ ACCORDION ───
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ─── BACK TO TOP ───
const backTop = document.getElementById('backTop');
if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ─── CURSOR DOT ───
const cursor = document.getElementById('cursorDot');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX - 4 + 'px';
    cursor.style.top = e.clientY - 4 + 'px';
  });
  document.querySelectorAll('a,button,.svc-card,.proj-card,.testi-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(3)'; cursor.style.opacity = '0.5'; });
    el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; cursor.style.opacity = '1'; });
  });
}

// ─── TOAST ───
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ─── CONTACT FORM (EmailJS) ───
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('[type="submit"]');
    const fname = document.getElementById('fname').value.trim();
    const femail = document.getElementById('femail').value.trim();
    const fphone = document.getElementById('fphone') ? document.getElementById('fphone').value.trim() : '';
    const fservice = document.getElementById('fservice') ? document.getElementById('fservice').value : '';
    const fsubject = document.getElementById('fsubject') ? document.getElementById('fsubject').value.trim() : '';
    const fmessage = document.getElementById('fmessage') ? document.getElementById('fmessage').value.trim() : '';

    if (!fname || !femail) {
      showToast('⚠️ Please fill in your name and email.');
      return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    const templateParams = {
      name: fname,
      from_name: fname,
      from_email: femail,
      reply_to: femail,
      phone: fphone || 'Not provided',
      service: fservice || 'Not specified',
      subject: fsubject || 'General enquiry',
      message: '📧 Email: ' + femail + '\n📞 Phone: ' + (fphone || 'Not provided') + '\n🛠️ Service: ' + (fservice || 'Not specified') + '\n📌 Subject: ' + (fsubject || 'General enquiry') + '\n\n💬 Message:\n' + (fmessage || '(no message)')
    };

    emailjs.send('service_apy6vgo', 'template_8t5ab6l', templateParams)
      .then(function(response) {
        console.log('EmailJS success:', response.status, response.text);
        btn.textContent = 'Send Message →';
        btn.disabled = false;
        btn.style.opacity = '1';
        contactForm.reset();
        showToast('✅ Message sent! I\'ll be in touch within 24 hours.');
      }, function(error) {
        console.error('EmailJS failed:', JSON.stringify(error));
        btn.textContent = 'Send Message →';
        btn.disabled = false;
        btn.style.opacity = '1';
        // Show the actual error so we can debug
        const errMsg = error && error.text ? error.text : (error && error.status ? 'Status: ' + error.status : JSON.stringify(error));
        showToast('❌ Error: ' + errMsg);
        // Also log to page for visibility
        const dbg = document.createElement('p');
        dbg.style.cssText = 'color:red;font-size:12px;margin-top:8px;word-break:break-all;';
        dbg.textContent = 'Debug: ' + JSON.stringify(error);
        btn.parentNode.appendChild(dbg);
      });
  });
}

// ─── PROJECT BUTTONS ───
document.querySelectorAll('.proj-view-btn').forEach(btn => {
  btn.addEventListener('click', () => showToast('📂 Full case study coming soon!'));
});

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});