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

function showDialog(kind = '') {
  dialog.classList.toggle('newsletter-dialog', kind === 'newsletter');
  document.body.classList.add('modal-open');
  dialog.showModal();
}

function openContent({title, eyebrow, text, image}) {
  dialogBody.innerHTML = `<div class="dialog-content"><img src="${image}" alt=""><div class="dialog-copy"><p class="dialog-overline">${eyebrow}</p><h2>${title}</h2><p>${text}</p></div></div>`;
  showDialog();
}

function openTool(title, eyebrow, text, extra='') {
  dialogBody.innerHTML = `<div class="tool-dialog"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2><p>${text}</p>${extra}</div>`;
  showDialog();
}

document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
  const data = productData[button.dataset.product];
  openContent({title:data[0], eyebrow:data[1], text:data[2], image:data[3]});
}));
document.querySelectorAll('[data-social]').forEach(button => button.addEventListener('click', () => {
  const data = socialData[button.dataset.social];
  openContent({title:data[0], eyebrow:data[1], text:data[2], image:data[3]});
}));
document.querySelector('[data-social-first]').addEventListener('click', () => document.querySelector('[data-social]').click());
document.querySelector('[data-scroll-products]').addEventListener('click', () => document.querySelector('#product-grid').scrollIntoView({behavior:'smooth', block:'start'}));

document.querySelectorAll('[data-film]').forEach(button => button.addEventListener('click', () => {
  dialogBody.innerHTML = `<div class="video-dialog"><video src="assets/main-film.mp4" controls autoplay playsinline aria-label="AloeGlow Werbespot"></video><div class="video-meta"><p>Experience the Glow · AloeGlow Brand Film</p><button type="button" data-fullscreen>Vollbild</button></div></div>`;
  showDialog();
  const video = dialogBody.querySelector('video');
  dialogBody.querySelector('[data-fullscreen]').addEventListener('click', () => video.requestFullscreen?.());
  video.play().catch(() => {});
}));

document.querySelector('[data-halloween]').addEventListener('click', () => openContent({
  title:'The Haunted Glow.', eyebrow:'Halloween Special',
  text:'Dunkle Waldtöne, leuchtende Akzente und ein Hauch Magie verleihen dem natürlichen AloeGlow eine geheimnisvolle Halloween-Stimmung.',
  image:'assets/halloween.png'
}));

document.querySelectorAll('[data-header-tool]').forEach(button => button.addEventListener('click', () => {
  const tool = button.dataset.headerTool;
  if (tool === 'search') {
    openTool('Was möchtest du entdecken?', 'Schnellnavigation', 'Springe direkt zu einem Bereich der AloeGlow-Welt.', '<div class="quick-links"><a href="#produkte" data-dialog-link>Produkte</a><a href="#inhaltsstoffe" data-dialog-link>Inhaltsstoffe</a><a href="#kampagne" data-dialog-link>Kampagne</a><a href="#kontakt" data-dialog-link>Kontakt</a></div>');
  } else if (tool === 'account') {
    openTool('Mein AloeGlow.', 'Konto', 'Dein persönlicher Ort für deine AloeGlow-Routine.');
  } else {
    openTool('Deine Glow Bag.', 'Warenkorb', 'Noch keine Produkte ausgewählt.');
  }
}));

const legalContent = {
  imprint:['Impressum', 'AloeGlow', 'Verantwortlich für Inhalt und Gestaltung: George · Tom · Sophie · Erik.'],
  privacy:['Datenschutz', 'Deine Daten', 'Die eingegebene E-Mail-Adresse wird ausschließlich für die unmittelbar angezeigte Ansicht verarbeitet und weder übertragen noch gespeichert.'],
  contact:['Kontakt', 'AloeGlow', 'George · Tom · Sophie · Erik']
};
document.querySelectorAll('[data-legal]').forEach(button => button.addEventListener('click', () => {
  const item = legalContent[button.dataset.legal];
  openTool(item[0], item[1], item[2]);
}));

function closeDialog() {
  dialogBody.querySelectorAll('video').forEach(video => video.pause());
  document.body.classList.remove('modal-open');
  dialog.classList.remove('newsletter-dialog');
  dialog.close();
}
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => { if (event.target === dialog) closeDialog(); });
dialog.addEventListener('close', () => {
  dialogBody.querySelectorAll('video').forEach(video => video.pause());
  document.body.classList.remove('modal-open');
  dialog.classList.remove('newsletter-dialog');
});
dialogBody.addEventListener('click', event => {
  if (event.target.closest('[data-dialog-link]')) closeDialog();
});
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
  const escapeMap = {'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#039;'};
  const safe = input.value.replace(/[&<>"']/g, character => escapeMap[character]);
  dialogBody.innerHTML = `
    <article class="newsletter-preview" aria-label="AloeGlow Newsletter">
      <header class="mail-header">
        <div class="mail-brand"><img src="assets/logo-light.png" alt="AloeGlow"><span>Natural Beauty. Real Results.</span></div>
        <p><span aria-hidden="true">♧</span> Stay<br>in the<br>Glow</p>
      </header>
      <div class="mail-hero">
        <img src="assets/aloe-macro.png" alt="Aloe Vera mit Wassertropfen im warmen Morgenlicht">
        <p>Pure<br>Nature.<br>Healthy Skin.<br>Brighter Days.</p>
      </div>
      <section class="mail-welcome">
        <p class="mail-recipient">Für ${safe}</p>
        <h2>Schön, dass du dabei bist.</h2>
        <div class="mail-rule"></div>
        <p class="mail-subtitle">Dein Glow beginnt in den kleinen Momenten.</p>
        <div class="mail-intro">
          <h3>Hallo,</h3>
          <p>willkommen in der AloeGlow-Welt! Wir glauben, dass bewusste Hautpflege mehr ist als Routine – sie ist ein Moment für dich. Ein kleiner Schritt, der dir guttut und dich strahlen lässt. Freue dich auf Inspiration, Pflegetipps und Einblicke in unsere Welt der natürlichen Schönheit.</p>
        </div>
      </section>
      <section class="mail-routine">
        <div class="mail-section-title"><div><small>Deine</small><h3>Glow-Routine</h3></div><p>Einfache Schritte für eine gesunde, strahlende Haut.</p></div>
        <div class="routine-grid">
          <article><div class="routine-number"><b>01</b><span>Morgens</span><i>☼</i></div><ul><li>Sanft reinigen.</li><li>Serum auftragen.</li><li>Tagespflege und Sonnenschutz.</li></ul></article>
          <article><div class="routine-number"><b>02</b><span>Abends</span><i>☾</i></div><ul><li>Den Tag abwaschen.</li><li>Bewusst pflegen.</li><li>Mit einer ruhigen Routine abschließen.</li></ul></article>
        </div>
      </section>
      <section class="mail-tip">
        <img src="assets/aloe-sun.png" alt="Aloe Vera im Sonnenlicht">
        <div><small>Unser</small><h3>Glow-Tipp</h3><p>Weniger Schritte, mehr Regelmäßigkeit.<br>Eine gute Routine passt zu dir und deiner Haut.</p></div>
        <span class="leaf-mark" aria-hidden="true">⌁</span>
      </section>
      <section class="mail-outlook">
        <p class="mail-subtitle">Das erwartet dich bei AloeGlow</p>
        <div class="outlook-grid">
          <article><span>♧</span><h3>Pflegetipps<br>für jeden Tag</h3><p>Einfache Ideen, die auch in einen vollen Alltag passen.</p></article>
          <article><span>◯</span><h3>Einblicke in<br>unsere Inhaltsstoffe</h3><p>Was die Natur so besonders macht – und warum wir sie lieben.</p></article>
          <article><span>◇</span><h3>Saisonale<br>Beauty-Inspiration</h3><p>Kreative Kampagnen, Trends und besondere Momente.</p></article>
        </div>
        <a class="button mail-cta" href="#produkte" data-dialog-link>AloeGlow entdecken <span>→</span></a>
      </section>
      <footer class="mail-footer"><p><i>Stay glowing,</i><br>dein AloeGlow-Team</p><div><img src="assets/logo-dark.png" alt="AloeGlow"><span>Your Natural Glow.</span></div></footer>
    </article>`;
  showDialog('newsletter');
});
