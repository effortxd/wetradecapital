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


// Product Specifications table — clickable Major/Minor tabs
const SPECS_DATA = {"major":[{"symbol":"AUDUSD","contract":"Australian Dollar vs US Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"EURUSD","contract":"Euro vs US Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"GBPUSD","contract":"Great Britain Pound vs US Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"NZDUSD","contract":"New Zealand Dollar vs US Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDCAD","contract":"US Dollar vs Canadian Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDCHF","contract":"US Dollar vs Swiss Franc","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDJPY","contract":"US Dollar vs Japanese Yen","size":"100,000","tick":"0.001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"}],"minor":[{"symbol":"AUDCAD","contract":"Australian Dollar vs Canadian Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"AUDJPY","contract":"Australian Dollar vs Japanese Yen","size":"100,000","tick":"0.001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"AUDNZD","contract":"Australian Dollar vs New Zealand Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"AUDCHF","contract":"Australian Dollar vs Swiss Franc","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"CADJPY","contract":"Canadian Dollar vs Japanese Yen","size":"100,000","tick":"0.001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"CADCHF","contract":"Canadian Dollar vs Swiss Franc","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"EURAUD","contract":"Euro vs Australian Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"EURCAD","contract":"Euro vs Canadian Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"EURGBP","contract":"Euro vs Great Britain Pound","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"EURJPY","contract":"Euro vs Japanese Yen","size":"100,000","tick":"0.001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"EURNZD","contract":"Euro vs New Zealand Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"EURCHF","contract":"Euro vs Swiss Franc","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"GBPAUD","contract":"Great Britain Pound vs Australian Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"GBPCAD","contract":"Great Britain Pound vs Canadian Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"GBPJPY","contract":"Great Britain Pound vs Japanese Yen","size":"100,000","tick":"0.001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"GBPNZD","contract":"Great Britain Pound vs New Zealand Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"GBPCHF","contract":"Great Britain Pound vs Swiss Franc","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"NZDCAD","contract":"New Zealand Dollar vs Canadian Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"NZDJPY","contract":"New Zealand Dollar vs Japanese Yen","size":"100,000","tick":"0.001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"NZDCHF","contract":"New Zealand Dollar vs Swiss Franc","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"CHFJPY","contract":"Swiss Frank vs Japanese Yen","size":"100,000","tick":"0.001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDCNH","contract":"US Dollar vs Chinese OffShore Yuan","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDHKD","contract":"US Dollar vs Hong Kong Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDNOK","contract":"US Dollar vs Norwegian Krone","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDPLN","contract":"US Dollar vs Polish Zloty","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDSGD","contract":"US Dollar vs Singapore Dollar","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDZAR","contract":"US Dollar vs South Africa Rand","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDSEK","contract":"US Dollar vs Swedish Krona","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDTHB","contract":"US Dollar vs Thai Baht","size":"100,000","tick":"0.001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"},{"symbol":"USDTRY","contract":"US Dollar vs Turkish Lira","size":"100,000","tick":"0.00001","leverage":"1:100","min_lot":"0.01","max_lot":"100","min_inc":"0.01","limit_stop":"10","session":"00:06-23:55"}]};

const specsTableBody = document.getElementById('specsTableBody');
const specsTabs = document.querySelectorAll('.specs-tab');
const specsRowCount = document.getElementById('specsRowCount');
const specsScrollEl = document.querySelector('.specs-table-scroll');
function renderSpecs(tab) {
  if (!specsTableBody) return;
  const rows = SPECS_DATA[tab] || [];
  specsTableBody.innerHTML = rows.map(r => `
    <tr>
      <td>${r.symbol}</td>
      <td>${r.contract}</td>
      <td>${r.size}</td>
      <td>${r.tick}</td>
      <td>${r.leverage}</td>
      <td>${r.min_lot}</td>
      <td>${r.max_lot}</td>
      <td>${r.min_inc}</td>
      <td>${r.limit_stop}</td>
      <td>${r.session}</td>
    </tr>
  `).join('');
  if (specsRowCount) {
    const label = tab === 'major' ? 'Major' : 'Minor';
    specsRowCount.textContent = rows.length > 10
      ? `${rows.length} ${label} pairs — scroll to see all`
      : `${rows.length} ${label} pairs`;
  }
  if (specsScrollEl) specsScrollEl.scrollTop = 0;
}
if (specsTabs.length && specsTableBody) {
  specsTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      specsTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSpecs(btn.dataset.tab);
    });
  });
  renderSpecs('major');
}

// Sticky nav background on scroll
const navEl = document.querySelector('nav');
if (navEl) {
  const updateNavBg = () => {
    if (window.scrollY > 30) navEl.classList.add('scrolled');
    else navEl.classList.remove('scrolled');
  };
  window.addEventListener('scroll', updateNavBg, { passive: true });
  updateNavBg();
}
