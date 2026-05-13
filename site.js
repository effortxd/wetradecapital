// Specs tabs toggle (liquidity page)
document.querySelectorAll('.specs-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.specs-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Pill button hover ripple (purely decorative)
document.querySelectorAll('.btn-pill').forEach(b => {
  b.addEventListener('mousedown', () => b.style.transform = 'translateY(0)');
  b.addEventListener('mouseup', () => b.style.transform = '');
});


// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    const isOpening = !mobileToggle.classList.contains('open');
    mobileToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = isOpening ? 'hidden' : '';
    document.documentElement.style.overflow = isOpening ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    });
  });
}

// Contact form — static labels, submit via mailto
const RECIPIENT_EMAIL = 'contact@wetradecapital.com.au';
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const submitBtn = contactForm.querySelector('.cf-submit');
  const statusBox = document.getElementById('cfStatus');
  const showStatus = (msg, type) => {
    statusBox.textContent = msg;
    statusBox.className = 'cf-status show ' + type;
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = (data.get('name') || '').trim();
    const company = (data.get('company') || '').trim();
    const email = (data.get('email') || '').trim();
    const message = (data.get('message') || '').trim();

    if (!name || !company || !email || !message) {
      showStatus('Please complete all required fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'OPENING EMAIL...';
    const subject = encodeURIComponent(`Liquidity Enquiry — ${company}`);
    const body = encodeURIComponent(`Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      showStatus('Thank you — your email client should now be open.', 'success');
      submitBtn.disabled = false;
      submitBtn.textContent = 'SEND MESSAGE';
      contactForm.reset();
    }, 800);
  });
}
