const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = i => String(i + 1).padStart(2, '0');

$('#year').textContent = new Date().getFullYear();

/* theme */
const icon = () => { $('#themeIcon').textContent = document.documentElement.dataset.theme === 'dark' ? '☀' : '☾'; };
icon();
$('#themeBtn').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next; icon();
  try { localStorage.setItem('theme', next); } catch {}
  document.querySelector('meta[name=theme-color]').content = next === 'dark' ? '#131416' : '#f6f5f1';
});

/* Japan clock */
const tick = () => { $('#clock').textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }); };
tick(); setInterval(tick, 20000);

/* ───────── projects ───────── */
const PROJECTS = [
  {
    kind: 'oss', tag: 'Open source · Rust', name: 'Ember IDE', sub: 'A fast, themeable, cross-platform code editor. No Electron.',
    media: { img: 'img/ember-ide.png', alt: 'Ember IDE editor window' },
    points: [
      'GPU-rendered immediate-mode UI (egui/eframe) in a single ~12 MB native binary. No web views.',
      'A real terminal: ConPTY on Windows, PTY on Unix, with a VT100 emulator that runs vim, htop and git.',
      'Debug Adapter Protocol client with breakpoints, stepping and a call stack.',
      'Rhai plugin system, 12 themes, Discord rich presence.',
      'Ships installers for Windows, macOS, Linux (.deb/.rpm) and Raspberry Pi, with checksummed releases built by CI.'
    ],
    stack: ['Rust', 'egui', 'DAP', 'ConPTY / PTY', 'Rhai', 'GitHub Actions'],
    links: [['Source', 'https://github.com/TopLuau/ember-ide']]
  },
  {
    kind: 'oss', tag: 'Open source · Rust', name: 'Scrawl', sub: 'A real-time collaborative whiteboard that needs no accounts.',
    media: { img: 'img/scrawl.png', alt: 'Scrawl whiteboard' },
    points: [
      'One ~3 MB Rust binary holds the server, the embedded web app and the sync. No database.',
      'Live cursors and edits over WebSockets. Pen, shapes, text, sticky notes, images and animated GIFs on an endless canvas.',
      'Boards are temporary: deleted when the last person leaves, along with their uploads.',
      'Rate limiting, proxy-aware config and a Docker image. Deployed and running.'
    ],
    stack: ['Rust', 'WebSockets', 'JavaScript', 'Canvas', 'Docker', 'Vercel'],
    links: [['Live demo', 'https://scrawlboard.vercel.app'], ['Source', 'https://github.com/TopLuau/scrawl']]
  },
  {
    kind: 'product', tag: 'Product · Founder', name: 'Bloxsupply', sub: 'A storefront for Roblox game templates and system assets.',
    panel: { c: '#5b3fd1', html: `<div class="cap">Built and operated solo</div><ul><li>→ catalog + categories</li><li>→ search</li><li>→ cart + stock counts</li><li>→ checkout</li></ul>` },
    points: [
      'Catalog with categories, search, a cart, live stock counts and checkout.',
      'I build and run all of it: frontend, backend, infrastructure and deploys.',
      'Sells production-ready templates I write in Luau, such as Shred A Player and Bake A Brainrot.'
    ],
    stack: ['Full-stack', 'E-commerce', 'Luau', 'Deploys'],
    links: [['Visit bloxsupply.net', 'https://bloxsupply.net']]
  },
  {
    kind: 'product', tag: 'Product · Founder', name: 'Lingucounter', sub: 'Word and letter counts for every language.',
    panel: { c: '#26282d', html: `<div class="row2"><div class="big">153<small>languages</small></div><div class="big">242<small>formats</small></div></div><div class="cap">Processed locally. Files never leave your device.</div>` },
    points: [
      'Counts words and letters across 153 languages and 242 file formats, from PDF, DOCX and EPUB to spreadsheets, images and archives.',
      'Runs locally in the browser. Only the counts are saved, never the files.',
      'Drag in files or folders, or paste text. Localised interface with a command menu and history.'
    ],
    stack: ['Web app', 'Client-side processing', 'i18n', 'Privacy-first'],
    links: [['Visit lingucounter.com', 'https://lingucounter.com']]
  },
  {
    kind: 'product', tag: 'Product · Founder', name: 'Gavanor', sub: 'Concept websites for local businesses, before they pay.',
    panel: { c: '#237a5b', html: `<div class="cap">Preview first. Decide second.</div><ul><li>1 · request a free preview</li><li>2 · review the concept</li><li>3 · launch, or walk away</li></ul>` },
    points: [
      'A business shares its details and gets a working concept site built from its own information, with nothing invented.',
      'Mobile-first pages with click-to-call and quote forms, designed to turn visits into enquiries.',
      'Nothing goes live or gets published without approval.'
    ],
    stack: ['Web design', 'Mobile-first', 'Lead capture'],
    links: [['Visit gavanor.vercel.app', 'https://gavanor.vercel.app/']]
  },
  {
    kind: 'product', tag: 'Game · Creator', name: 'The Last Noodle', sub: 'A multiplayer game.',
    panel: { c: '#a8662a', html: `<div class="big" style="font-size:36px">Multiplayer</div><div class="cap">Developer and creator</div>` },
    points: ['Developer and creator of the game, with a public landing page.'],
    stack: ['Game dev', 'Multiplayer'],
    links: [['Play', 'https://thelastnoodle.vercel.app/']]
  }
];

const media = p => p.media
  ? `<div class="p-media"><img src="${p.media.img}" alt="${esc(p.media.alt)}" loading="lazy"></div>`
  : `<div class="p-media"><div class="p-panel" style="--pc:${p.panel.c}">${p.panel.html}</div></div>`;

$('#projectList').innerHTML = PROJECTS.map(p => `
  <article class="proj" data-kind="${p.kind}">
    ${media(p)}
    <div class="p-body">
      <div class="p-top"><span class="tag">${esc(p.tag)}</span></div>
      <h3>${esc(p.name)}</h3>
      <p class="p-sub">${esc(p.sub)}</p>
      <ul class="p-list">${p.points.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      <div class="chips">${p.stack.map(s => `<span>${esc(s)}</span>`).join('')}</div>
      <div class="p-links">${p.links.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${esc(t)} ↗</a>`).join('')}</div>
    </div>
  </article>`).join('');

const FILTERS = [['all', 'All'], ['product', 'Products'], ['oss', 'Open source']];
$('#filters').innerHTML = FILTERS.map(([k, l], i) => `<button class="fbtn ${i ? '' : 'on'}" data-k="${k}">${l}</button>`).join('');
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.fbtn'); if (!b) return;
  $$('#filters .fbtn').forEach(x => x.classList.toggle('on', x === b));
  $$('.proj').forEach(c => c.classList.toggle('hide', b.dataset.k !== 'all' && c.dataset.kind !== b.dataset.k));
});

/* ───────── roblox showcase ───────── */
const WORK = [
  { t: 'Bake A Brainrot',    v: 'videos/bab.mp4',    k: 'Game · Systems · UI' },
  { t: 'Steal A Luckyblock', v: 'videos/sal.mp4',    k: 'Game · Systems · Luau' },
  { t: 'Roll A Brainrot',    v: 'videos/roll.mp4',   k: 'Game · Systems · Luau' },
  { t: 'Pet System',         v: 'videos/pets.mp4',   k: 'System · UI · Gameplay' },
  { t: 'R6 Soccer Game',     v: 'videos/soccer.mp4', k: 'Game · R6 · Gameplay' },
  { t: 'Word RNG Template',  v: 'videos/word.mp4',   k: 'Template · Systems · UI' }
];
$('#vids').innerHTML = WORK.map((w, i) => `
  <button class="vid" data-i="${i}" aria-label="Watch ${esc(w.t)}">
    <div class="vthumb"><video muted loop playsinline preload="metadata" src="${w.v}#t=1"></video><em>▶</em></div>
    <div class="vinfo"><b>${esc(w.t)}</b><span>${esc(w.k)}</span></div>
  </button>`).join('');
$$('.vid').forEach(c => {
  const v = $('video', c);
  c.addEventListener('pointerenter', () => v.play().catch(() => {}));
  c.addEventListener('pointerleave', () => v.pause());
  c.addEventListener('click', () => openVideo(+c.dataset.i));
});
const modal = $('#modal'), mv = $('#modalVideo');
function openVideo(i) { mv.src = WORK[i].v; $('#modalTitle').textContent = WORK[i].t; modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); mv.play().catch(() => {}); }
function closeVideo() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); mv.pause(); mv.removeAttribute('src'); mv.load(); }
$('#modalX').addEventListener('click', closeVideo);
$('[data-close]', modal).addEventListener('click', closeVideo);
addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeVideo(); });

/* ───────── stack ───────── */
const STACK = {
  Languages: ['Rust', 'C++', 'TypeScript', 'JavaScript', 'Luau', 'Python', 'Bash / PowerShell'],
  Systems: ['Linux', 'Docker', 'PTY / ConPTY', 'WebSockets', 'Debug Adapter Protocol'],
  Web: ['Node.js', 'HTML / CSS', 'Canvas', 'Vercel', 'Client-side processing'],
  Shipping: ['Git', 'GitHub Actions CI', 'Native installers', 'Roblox Studio']
};
$('#stackGrid').innerHTML = Object.entries(STACK).map(([k, v]) => `<div><h4>${k}</h4><ul>${v.map(x => `<li>${x}</li>`).join('')}</ul></div>`).join('');

/* ───────── live repos ───────── */
const ago = d => { const n = Math.max(0, Math.round((Date.now() - new Date(d)) / 864e5)); return n < 1 ? 'today' : n < 30 ? n + 'd ago' : n < 365 ? Math.round(n / 30) + 'mo ago' : Math.round(n / 365) + 'y ago'; };
const LANGS = { CoreLoader: 'Luau' };
const DESC = { CoreLoader: 'Open-source Roblox loading screen with smooth animations, blur effects and easy customization.' };
const paintRepos = list => {
  const repos = list.filter(r => !['TopLuau', 'ember-ide', 'scrawl'].includes(r.name)).sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
  $('#repoList').innerHTML = repos.map(r => `
    <a class="repo" href="${r.html_url || 'https://github.com/TopLuau/' + r.name}" target="_blank" rel="noopener noreferrer">
      <b>${esc(r.name)}</b><span>${esc(DESC[r.name] || r.description || 'Website project.')}</span>
      <span class="lang">${esc(LANGS[r.name] || r.language || '')}${LANGS[r.name] || r.language ? ' · ' : ''}${ago(r.pushed_at)}</span>
    </a>`).join('');
  $('#repoStatus').textContent = 'Live from the GitHub API';
};
const FALLBACK = [{ name: 'CoreLoader', pushed_at: '2026-05-13' }, { name: 'topluau.github.io', description: 'Portfolio', language: 'JavaScript', pushed_at: '2026-11-11' }];
fetch('https://api.github.com/users/TopLuau/repos?per_page=100').then(r => r.ok ? r.json() : Promise.reject()).then(paintRepos).catch(() => paintRepos(FALLBACK));

/* ───────── reviews ───────── */
(() => {
  const R = typeof reviews !== 'undefined' ? reviews : [];
  if (!R.length) return;
  const avg = R.reduce((a, r) => a + r.rating, 0) / R.length;
  const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);
  $('#vAvg').textContent = avg.toFixed(1);
  $('#vStars').textContent = stars(Math.round(avg));
  $('#vFrom').textContent = `from ${R.length} customers`;
  $('#vCount').textContent = `${R.length} reviews`;
  const counts = [5, 4, 3, 2, 1].map(s => [s, R.filter(r => r.rating === s).length]);
  let cur = 0;
  $('#vBars').innerHTML = counts.map(([s, c]) => `<button class="vb" data-s="${s}" aria-pressed="false"><span>${s} ★</span><span class="track"><span class="fill" data-w="${c / R.length * 100}"></span></span><em>${c}</em></button>`).join('');
  requestAnimationFrame(() => $$('#vBars .fill').forEach(f => f.style.width = f.dataset.w + '%'));
  const grid = () => {
    $('#vGrid').innerHTML = R.filter(r => !cur || r.rating === cur).map((r, i) => `
      <article class="rcard" style="animation-delay:${Math.min(i, 8) * 35}ms">
        <div class="stars" aria-label="${r.rating} out of 5 stars">${stars(r.rating)}</div>
        <p>${esc(r.text)}</p>
        <div class="rwho"><img src="${esc(r.pfp)}" alt="" loading="lazy"><div><b>${esc(r.name)}</b><span>${esc(r.username)}</span></div><time>${esc(r.date)}</time></div>
      </article>`).join('');
  };
  $('#vBars').addEventListener('click', e => {
    const b = e.target.closest('.vb'); if (!b) return;
    cur = cur === +b.dataset.s ? 0 : +b.dataset.s;
    $$('#vBars .vb').forEach(x => { const on = +x.dataset.s === cur; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    grid();
  });
  grid();
})();

/* ───────── contact ───────── */
$('#copyDiscord').addEventListener('click', e => {
  navigator.clipboard?.writeText('Topluau').catch(() => {});
  const em = $('em', e.currentTarget); em.textContent = 'copied ✓'; setTimeout(() => em.textContent = 'copy', 1500);
});

/* ===== v2: scroll progress + optional real photo ===== */
(() => {
  const bar = document.getElementById('progress');
  const upd = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%'; };
  addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd();
  // If you add a real photo at img/me.jpg it replaces the Roblox avatar automatically.
  const probe = new Image();
  probe.onload = () => { const el = document.getElementById('meImg'); el.src = 'img/me.jpg'; el.alt = 'TopLuau'; el.parentElement.classList.add('photo'); };
  probe.src = 'img/me.jpg';
})();
