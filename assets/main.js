'use strict';
document.body.classList.add('js');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
navigation?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuToggle.focus();
  }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });

const lightbox = document.querySelector('#lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
  document.querySelectorAll('[data-gallery]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const image = lightbox.querySelector('img');
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      lightbox.querySelector('[data-caption]').textContent = image.alt;
      lightbox.showModal();
      document.body.classList.add('dialog-open');
    });
  });
  lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener('close', () => document.body.classList.remove('dialog-open'));
}

document.querySelectorAll('[data-video]').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.video;
    if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = button.dataset.title;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    button.replaceWith(iframe);
    iframe.focus();
  });
});

const enquiryForm = document.querySelector('#enquiry-form');
if (enquiryForm) {
  const product = new URLSearchParams(location.search).get('product');
  const productSelect = enquiryForm.querySelector('[name=product]');
  if (product && [...productSelect.options].some(option => option.value === product)) productSelect.value = product;
  enquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;
    const values = Object.fromEntries(new FormData(enquiryForm));
    const body = `Hello Chemmanoor Metals,\n\nI would like to discuss ${values.product.toLowerCase()}.\n\nName: ${values.name.trim()}\nPhone: ${values.phone.trim()}\nEmail: ${values.email.trim()}\nLocation: ${values.location.trim() || 'Not specified'}\n\nProject details:\n${values.message.trim()}\n`;
    const subject = `Website enquiry: ${values.product}`;
    const emailUrl = `mailto:mail@chemmanoormetals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const result = document.querySelector('#form-result');
    result.hidden = false;
    result.replaceChildren();
    const message = document.createElement('p');
    message.textContent = 'Your email draft is ready. Send it from your email app to complete your enquiry. If the app didn’t open, use the link below or call +91 97470 70066.';
    const link = document.createElement('a');
    link.href = emailUrl; link.className = 'text-link'; link.textContent = 'Open email draft ↗';
    result.append(message, link);
    location.href = emailUrl;
  });
}

// Optional browser standard: read the same contact information available on the page.
if (document.modelContext?.registerTool) {
  const lifecycle = new AbortController();
  try {
    Promise.resolve(document.modelContext.registerTool({
      name: 'get_contact_details',
      title: 'Get Chemmanoor Metals contact details',
      description: 'Read the business phone, email and address shown on the website. Does not contact the business.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute(input) {
        if (!input || typeof input !== 'object' || Array.isArray(input) || Object.keys(input).length) throw new Error('Expected an empty object.');
        return { phone: '+91 97470 70066', email: 'mail@chemmanoormetals.com', address: 'Perakam P.O, Chavakkad Via, Thrissur, Kerala 680505', whatsapp: 'https://wa.me/919747070066' };
      }
    }, { signal: lifecycle.signal })).catch(() => {});
    window.addEventListener('pagehide', event => { if (!event.persisted) lifecycle.abort(); }, { once: true });
  } catch { /* Browsers without this optional API retain the standard interface. */ }
}
