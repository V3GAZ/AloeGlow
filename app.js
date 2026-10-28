const header = document.querySelector('.site-header');
const nav = document.querySelector('#main-nav');
const toggle = document.querySelector('.nav-toggle');
const dialog = document.querySelector('#content-dialog');
const dialogBody = document.querySelector('#dialog-body');

addEventListener('scroll', () => header.classList.toggle('stuck', scrollY > 120), {passive:true});
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav.addEventListener('click', event => {
  if (event.target.matches('a')) {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), {threshold:.1});
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const productData = {
  day: ['Day Cream','Ein sanfter Start in den Tag.','Eine ruhige Pflegeidee für den Morgen – eingebettet in die AloeGlow-Routine.','assets/product-day.png'],
  serum: ['Face Serum','Ein leichter Pflegemoment für deine Routine.','Das AloeGlow Face Serum steht für konzentrierte, bewusst inszenierte Pflege und einen modernen Beauty-Moment.','assets/product-serum.png'],
  cleanser: ['Gentle Cleanser','Frische für den Beginn deines Pflegerituals.','Der Gentle Cleanser eröffnet die Pflegeroutine und bildet in der Markenwelt den klaren, frischen Auftakt.','assets/product-cleanser.png'],
  night: ['Night Cream','Ein entspannter Abschluss für deinen Abend.','Die Night Cream schließt die tägliche Pflegeroutine mit einem entschleunigten Abendmoment ab.','assets/product-night.png']
};
const socialData = {
  ritual:['The Glow Ritual','Reel','Dein Moment. Deine Routine. Dein Glow. Ein kurzer, atmosphärischer Ablauf für ein 9:16-Reel.','assets/skin-detail.png'],
  essentials:['AloeGlow Essentials','Post','Vier Produkte. Ein natürliches Gefühl. Ein ruhiger Produktmoment im warmen AloeGlow-Licht.','assets/product-group.png'],
  behind:['Behind the Glow','Story','Ein Blick hinter unsere Kampagne und die Verbindung von Fitness, Balance und Selfcare.','assets/pamela.png'],
  nature:['Nature in Every Detail','Post','Inspiriert von der Aloe Vera – als visuelles Detail der Markenwelt.','assets/aloe-macro.png']
};

function openContent({title, eyebrow, text, image, note=''}) {
  dialogBody.innerHTML = `<div class="dialog-content"><img src="${image}" alt=""><div class="dialog-copy"><p class="demo-label">${eyebrow}</p><h2>${title}</h2><p>${text}</p>${note ? `<p class="disclaimer">${note}</p>` : ''}</div></div>`;
  dialog.showModal();
}

function openTool(title, eyebrow, text, extra='') {
  dialogBody.innerHTML = `<div class="tool-dialog"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2><p>${text}</p>${extra}</div>`;
  dialog.showModal();
}

document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  const data = productData[button.dataset.product];
  openContent({title:data[0], eyebrow:data[1], text:data[2], image:data[3], note:'Produktpräsentation ohne Preis- oder Wirkversprechen.'});
}));
document.querySelectorAll('[data-social]').forEach(button => button.addEventListener('click', () => {
  const data = socialData[button.dataset.social];
  openContent({title:data[0], eyebrow:data[1], text:data[2], image:data[3]});
}));
document.querySelector('[data-social-first]').addEventListener('click', () => document.querySelector('[data-social]').click());
document.querySelector('[data-scroll-products]').addEventListener('click', () => document.querySelector('#product-grid').scrollIntoView({behavior:'smooth', block:'start'}));

document.querySelectorAll('[data-film]').forEach(button => button.addEventListener('click', () => {
  dialogBody.innerHTML = `<div class="video-dialog"><video src="assets/main-film.mp4" controls autoplay playsinline aria-label="AloeGlow Werbespot"></video><div class="video-meta"><p>Experience the Glow · AloeGlow Brand Film</p><button type="button" data-fullscreen>Vollbild</button></div></div>`;
  dialog.showModal();
  const video = dialogBody.querySelector('video');
  dialogBody.querySelector('[data-fullscreen]').addEventListener('click', () => video.requestFullscreen?.());
  video.play().catch(() => {});
}));

document.querySelector('[data-halloween]').addEventListener('click', () => openContent({
  title:'The Haunted Glow.', eyebrow:'Halloween Special',
  text:'Die saisonale Variation übersetzt die AloeGlow-Markenwelt in einen geheimnisvollen Wald mit gezielten Neongrün-Akzenten. Der Bereich ist bewusst ein visueller Teaser.',
  image:'assets/halloween.png'
}));

document.querySelectorAll('[data-header-tool]').forEach(button => button.addEventListener('click', () => {
  const tool = button.dataset.headerTool;
  if (tool === 'search') {
    openTool('Was möchtest du entdecken?', 'Schnellnavigation', 'Springe direkt zu einem Bereich der AloeGlow-Markenwelt.', '<div class="quick-links"><a href="#produkte" onclick="document.querySelector(\'#content-dialog\').close()">Produkte</a><a href="#inhaltsstoffe" onclick="document.querySelector(\'#content-dialog\').close()">Inhaltsstoffe</a><a href="#kampagne" onclick="document.querySelector(\'#content-dialog\').close()">Kampagne</a><a href="#kontakt" onclick="document.querySelector(\'#content-dialog\').close()">Kontakt</a></div>');
  } else if (tool === 'account') {
    openTool('Mein AloeGlow.', 'Konto', 'Ein Kundenkonto ist in dieser Markenpräsentation nicht angebunden.');
  } else {
    openTool('Deine Glow Bag.', 'Warenkorb', 'Produkte und Preise sind in dieser Markenpräsentation nicht für einen Kauf hinterlegt.');
  }
}));

const legalContent = {
  imprint:['Impressum', 'Hinweis', 'Diese Website ist eine kreative Markenstudie und kein reales geschäftliches Angebot. Deshalb werden keine erfundenen Anbieter- oder Kontaktdaten angegeben.'],
  privacy:['Datenschutz', 'Hinweis', 'Die lokale Präsentation überträgt keine Formulardaten an einen Server. E-Mail-Adressen werden nur kurzfristig im Browser für die Vorschau verwendet und nicht gespeichert.'],
  contact:['Kontakt', 'Hinweis', 'Für diese Markenstudie ist keine reale Kontaktadresse hinterlegt. Der Bereich „Stay in the Glow“ zeigt ausschließlich eine lokale E-Mail-Vorschau.']
};
document.querySelectorAll('[data-legal]').forEach(button => button.addEventListener('click', () => {
  const item = legalContent[button.dataset.legal];
  openTool(item[0], item[1], item[2]);
}));

function closeDialog() {
  dialogBody.querySelectorAll('video').forEach(video => video.pause());
  dialog.close();
}
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
dialog.addEventListener('close', () => dialogBody.querySelectorAll('video').forEach(video => video.pause()));
addEventListener('keydown', event => { if (event.key === 'Escape' && dialog.open) closeDialog(); });

const presentationStops = [...document.querySelectorAll('.hero, #produkte, #inhaltsstoffe, .audience, .strategy, #kampagne, .influencer, .film, .halloween, .impact, #kontakt, .footer')];
addEventListener('keydown', event => {
  if (event.code !== 'Space' || dialog.open || event.defaultPrevented) return;
  if (event.target.closest('input, textarea, select, button, a, video, [contenteditable="true"]')) return;
  event.preventDefault();
  const y = scrollY + 88;
  const destination = event.shiftKey
    ? [...presentationStops].reverse().find(section => section.offsetTop < y - 70)
    : presentationStops.find(section => section.offsetTop > y);
  if (destination) scrollTo({top:Math.max(0, destination.offsetTop - 68), behavior:'smooth'});
});

document.querySelector('#email-form').addEventListener('submit', event => {
  event.preventDefault();
  const input = event.currentTarget.email;
  const error = event.currentTarget.querySelector('.form-error');
  if (!input.validity.valid) {
    error.textContent = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    input.focus();
    return;
  }
  error.textContent = '';
  const safe = input.value.replace(/[<>&"']/g, '');
  dialogBody.innerHTML = `<div class="email-preview"><img src="assets/logo-dark.png" alt="AloeGlow" style="width:180px;margin:auto"><p class="demo-label">An: ${safe}</p><h2>Your Natural Glow<br>starts here.</h2><p><strong>Betreff: Willkommen in deinem Glow 🌿</strong></p><p>Hallo! Schön, dass du AloeGlow entdeckt hast. Manchmal beginnt ein gutes Hautgefühl mit einem kleinen Moment für dich. Entdecke unsere vier Pflegeideen und lass dich von der Kraft der Aloe Vera inspirieren.</p><a class="button" href="#produkte" onclick="document.querySelector('#content-dialog').close()">AloeGlow entdecken →</a><br><span class="demo-label">Vorschau einer AloeGlow Marketing-E-Mail</span></div>`;
  dialog.showModal();
});
