/* Catalyst - core: version, navigation/router, Home, About, Photo Tutor placeholder, storage. */
'use strict';
const VERSION = '0.7.0';
const BUILD_DATE = 'October 20, 2026';
const COPYRIGHT = '© 2026 Beeran Rampersad';

/* Version history - newest first. Keep in sync with HANDOFF.md. */
const CHANGELOG = [
  { v: '0.7.0', d: 'October 20, 2026', notes: [
    'Matched to Mrs. Israel\'s answers. Bond polarity uses her ranges: less than 0.4 is nonpolar, 0.4–1.6 is polar, and 1.7 or greater is ionic. Metalloids are B, Si, Ge, As, Sb and Te. Atomic masses are rounded to the tenths place in the calculators and examples. The sig figs lesson notes that three significant figures is always safe.',
    'The Study Guide follows the class order for the rest of the first half: Formulas & Equations, then Mathematics of Chemistry (stoichiometry), then the Midterm. The Midterm practice test covers those units. Gas Laws, Matter & Measurement and Atomic Models & Light are waiting on the class calendar.',
    'New pre-lab review for the Bend and Stretch Investigation: why metals bend, salts shatter and polymers stretch, plus lab skills and a practice quiz.',
    'Test Prep notes that unit exams use storyline clusters, like the exam-style clusters here.'
  ] },
  { v: '0.6.0', d: 'October 20, 2026', notes: [
    'Photo Tutor is live. Take a photo of a problem, choose one, paste a screenshot, or type it in. Catalyst reads it on your device and gives a hint first. Then it points to the lesson, opens the right calculator with the problem\'s numbers, and suggests similar practice questions. The camera runs inside the app, so pictures are never saved to the photo library, and nothing is uploaded. An optional "Ask Google Lens" button can share the photo with Google when you\'re really stuck.',
    'Test Prep is now organized by test: Unit Test 1, Midterm, Final / Regents, or a custom set of units. The checklist, practice tests, drills, misses and clusters all follow the test you pick.',
    'There are no built-in test dates anymore. Enter your own test date to see a countdown; it is saved on your device only.'
  ] },
  { v: '0.5.1', d: 'October 20, 2026', notes: [
    'The About page now opens with a note on who inspired Catalyst.'
  ] },
  { v: '0.5.0', d: 'October 20, 2026', notes: [
    'The Study Guide now follows the class lesson by lesson, using the teacher\'s terms (valence shell, Coulombic attraction, mobile ions, SNAP, the fold test). Three new units cover September 2 to October 19: Atoms & Water, Ions & Salts, and Bonding & Shapes. Each has illustrated lessons and a practice quiz. The remaining syllabus units are listed under Coming up.',
    'New Test Prep page for the unit test: a checklist of every test topic (rate yourself Got it or Shaky, with a link to each lesson), 20-question practice tests freshly shuffled every time, drills on one topic or on the topics you marked Shaky, and a Review my misses set built from the questions you got wrong.',
    'Five Regents-style clusters, including the class sample "Recycling Every Drop". Multiple choice and "which row" questions check themselves. For claim–evidence–explanation, support/refute and drawing questions, you compare your answer with a model answer and a checklist.',
    'New calculators: Bond Polarity (ΔEN with the class ranges and a dipole arrow) and Atom & Ion Counter (protons, neutrons and electrons, with Bohr and Lewis dot diagrams).',
    'Every element card on the periodic table now shows a Lewis dot diagram and a button to count its particles.'
  ] },
  { v: '0.4.0', d: 'October 15, 2026', notes: [
    'New Search: ask a question in plain words (for example "why is argon heavier than potassium?") and Catalyst lists the lessons, calculators, practice questions and elements that answer it. Opening a result jumps straight to the right part of the lesson. If a topic isn\u2019t covered yet, Search points to the textbook chapter to read. Search is in the menu and on the Home page; press / on a keyboard to open it.',
    'Unit 4 has a new lesson, "Atomic mass across the table": why atomic mass usually increases, the three exceptions (Ar/K, Co/Ni, Te/I), and why the table is ordered by atomic number. It comes with a diagram and a new practice question.'
  ] },
  { v: '0.3.1', d: 'October 6, 2026', notes: [
    'Each unit now links to the matching chapters in the class reference book (Addison-Wesley Chemistry): gray "Ch." tags on the unit list and a "Read more in your textbook" line at the top of each unit.'
  ] },
  { v: '0.3.0', d: 'October 4, 2026', notes: [
    'Aligned to the new Regents course, Physical Science: Chemistry, and its 2025 Reference Tables.',
    'Temperatures now use K = \u00B0C + 273.15 and STP = 273.15 K and 1 atm, as on the 2025 tables. Calculators, lessons and quizzes updated.',
    'Lessons now point to the 2025 Reference Table numbers (Tables 1\u20138) and note what is no longer on them (electron configurations, electronegativity, charges, activity series, heat constants).',
    'New page: The new Regents (exam format, the six topic areas and their weights, Required Investigations, and the 2025 Reference Tables).',
    'Each unit is tagged with the NYS Performance Expectations it covers. Second-semester units were reorganized around the remaining Performance Expectations.',
    'New lessons: Light & the EM spectrum (Unit 2) and Coulomb\'s law (Units 4 and 5). The Midterm Review adds a storyline question set like the new exam.'
  ] },
  { v: '0.2.0', d: 'October 2, 2026', notes: [
    'Study Guide: the whole first semester is now written. Units 2\u20137 (Atomic Structure, Formulas & Equations, Periodic Table, Bonding, Mathematics of Chemistry, Gas Laws) plus a Midterm Review, each with illustrated lessons and a practice quiz.',
    'Unit 1 adds a short section on heat energy (q = mC\u0394T, q = mHf, q = mHv).',
    'New calculators: Average Atomic Mass, Empirical Formula (and molecular formula), Stoichiometry (with limiting reactant and percent yield), and Heat.',
    'Updates now install themselves: when a new version is posted, the app refreshes automatically the next time it is opened.'
  ] },
  { v: '0.1.0', d: 'October 1, 2026', notes: [
    'First build: app shell (installable PWA, works offline).',
    'Interactive color periodic table with category and trend views, search, and an element detail card with a Bohr diagram.',
    'Calculators: Molar Mass & Moles, Equation Balancer, Gas Laws, Solutions, pH, and Measurement (sig figs, percent error, density).',
    'Study Guide outline in the order of the class syllabus, with the first lesson (Matter & Measurement) and a practice quiz.',
    'Photo Tutor page reserved for a later phase.'
  ] }
];

/* ---------- storage (per-device; wrapped so private mode never breaks the app) ---------- */
const Store = {
  get(k, d) { try { const v = localStorage.getItem('catalyst.' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('catalyst.' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } }
};

/* ---------- helpers ---------- */
const $ = id => document.getElementById(id);
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
/* H2O -> H<sub>2</sub>O, handles hydrate dot and leading coefficients */
function fmtFormula(f) {
  return esc(Chem.normalize(f)).replace(/([A-Za-z\)\]])(\d+)/g, '$1<sub>$2</sub>').replace(/[*]/g, '·');
}
function num(x, d) { if (x === null || x === undefined || x === '') return '—'; return typeof x === 'number' ? (d === undefined ? String(x) : x.toFixed(d)) : esc(x); }
function sci(x, n) { return Chem.roundSig(x, n || 3); }

/* ---------- navigation ---------- */
const PAGES = {
  home:    { t: 'Home', ic: '🏠' },
  table:   { t: 'Periodic Table', ic: '🧪' },
  calc:    { t: 'Calculators', ic: '🧮' },
  study:   { t: 'Study Guide', ic: '📘' },
  about:   { t: 'About' }
};
const RENDER = {}; // page key -> function(arg)

function buildNav() {
  let h = '';
  ['home', 'search', 'table', 'calc', 'study', 'prep', 'tutor'].forEach(k => {
    const p = PAGES[k];
    h += '<button class="nb' + (p.soon ? ' soon' : '') + '" data-p="' + k + '" onclick="goPage(\'' + k + '\')"><span class="ic">' + p.ic + '</span>' + p.t + (p.soon ? '<span class="badge">soon</span>' : '') + '</button>';
    if (k === 'calc') {
      NAMES.forEach((n, i) => { h += '<button class="nb subi" data-c="' + i + '" onclick="go(' + i + ')">' + n + '</button>'; });
    }
  });
  $('nav').innerHTML = h;
  $('ver').textContent = 'v' + VERSION;
}

function setActive(page, calcIdx) {
  document.querySelectorAll('#sb .nb').forEach(b => {
    const on = (b.dataset.p === page && calcIdx === undefined) || (calcIdx !== undefined && b.dataset.c == calcIdx);
    b.classList.toggle('on', !!on);
  });
}

function toggleNav(force) {
  const open = force === undefined ? !$('sb').classList.contains('open') : force;
  $('sb').classList.toggle('open', open);
  $('ov').classList.toggle('open', open);
}

/* Router: hash = #page or #page/arg. Keeps the phone Back button working. */
function goPage(p, arg) {
  const h = '#' + p + (arg !== undefined && arg !== null && arg !== '' ? '/' + encodeURIComponent(arg) : '');
  if (location.hash !== h) location.hash = h; else route();
}
function route() {
  const raw = location.hash.replace(/^#/, '') || 'home';
  const i = raw.indexOf('/');
  const p = i < 0 ? raw : raw.slice(0, i);
  const arg = i < 0 ? undefined : decodeURIComponent(raw.slice(i + 1));
  const fn = RENDER[p] || RENDER.home;
  closeEl(true);
  toggleNav(false);
  $('ct').scrollTop = 0;
  fn(arg);
  if (p !== 'calc') setActive(RENDER[p] ? ((PAGES[p] && PAGES[p].nav) || p) : 'home');
  document.title = (PAGES[p] && p !== 'home' ? PAGES[p].t + ' — ' : '') + 'Catalyst';
}

function boot() {
  buildNav();
  window.addEventListener('hashchange', route);
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test((document.activeElement || {}).tagName || '') && !$('md').classList.contains('open')) { e.preventDefault(); goPage('search'); return; }
    if (!$('md').classList.contains('open')) return;
    if (e.key === 'Escape') closeEl();
    if (e.key === 'ArrowRight') stepEl(1);
    if (e.key === 'ArrowLeft') stepEl(-1);
  });
  route();
}

/* ---------- Home ---------- */
RENDER.home = function () {
  const last = Store.get('lastLesson', null);
  $('pg').innerHTML =
    '<div class="hero"><img src="icon.svg" alt=""><div><h1>Catalyst</h1>' +
    '<p>Your chemistry study companion: look up any element, check your math step by step, and review each unit in the same order as your class.</p></div></div>' +
    '<form class="sbar" style="margin-bottom:16px" onsubmit="event.preventDefault();doSearch(this.q.value)"><input name="q" type="search" placeholder="Ask a question, e.g. why is argon heavier than potassium?" autocomplete="off" enterkeyhint="search"><button class="btn bc" type="submit">Search</button></form>' +
    '<div class="grid">' +
    tile('table', '🧪', 'Periodic Table', 'Tap any element to see its electron configuration, Bohr diagram, and properties. Switch to trend views for electronegativity and ionization energy.') +
    tile('calc', '🧮', 'Calculators', 'Molar mass, balancing equations, gas laws, molarity, pH, and sig figs. Every answer shows the steps.') +
    tile('study', '📘', 'Study Guide', last ? 'Pick up where you left off: ' + esc(last.title) + '.' : 'Lessons and practice quizzes for each unit, following your class.') +
    tile('prep', '🎯', 'Test Prep', 'Your test topic checklist, shuffled practice tests, topic drills, Regents-style clusters, and a review of the questions you missed.') +
    tile('tutor', '📷', 'Photo Tutor', 'Snap a problem from a worksheet. Catalyst reads it, gives you a hint first, then the lesson and a calculator with your numbers.') +
    '</div><footer class="cp">v' + VERSION + ' · ' + COPYRIGHT + '</footer>';
  function tile(p, ic, t, d) { return '<button class="tile" onclick="goPage(\'' + p + '\')"><div class="ti">' + ic + '</div><h3>' + t + '</h3><p>' + d + '</p></button>'; }
};

/* ---------- About ---------- */
RENDER.about = function () {
  let log = '';
  CHANGELOG.forEach(c => {
    log += '<div style="margin-bottom:12px"><b>v' + c.v + '</b> <span class="rl">· ' + c.d + '</span><ul style="margin:4px 0 0 20px;font-size:13px;line-height:1.6">' +
      c.notes.map(n => '<li>' + esc(n) + '</li>').join('') + '</ul></div>';
  });
  $('pg').innerHTML = '<div class="pt">About Catalyst</div><div class="ps">Chemistry, accelerated. Built for the NYS Regents course Physical Science: Chemistry (2025 standards and Reference Tables).</div>' +
    '<div class="card insp"><div class="ch">Inspired by Rianna</div><div class="cb">' +
    '<p>I created Catalyst for my daughter, Rianna. Her ambition and her drive to succeed inspire me to support her journey into the world in every way I can.</p>' +
    '<p class="sig">— Dad</p></div></div>' +
    '<div class="t2"><div class="card"><div class="ch">App</div><div class="cb">' +
    rr('Version', 'v' + VERSION) + rr('Built', BUILD_DATE) + rr('Elements', ELEMENTS.length) + rr('Calculators', NAMES.length) + rr('Works offline', 'Yes') +
    '</div></div><div class="card"><div class="ch">Data & credits</div><div class="cb" style="font-size:13px;line-height:1.6">' +
    'Element data: <b>PubChem</b> (National Library of Medicine, public domain), via the MIT-licensed <i>periodic-table-data</i> package. ' +
    'Photo Tutor text reading: <b>Tesseract.js</b> (Apache-2.0), runs on your device. Ionization energies converted from eV to kJ/mol. Constants and formulas follow the 2025 Reference Tables for Physical Science: Chemistry.' +
    '<p class="hint">Always use your class Reference Tables on tests. If a value here ever differs from your Reference Tables, go with the Reference Tables.</p>' +
    '</div></div></div>' +
    '<div class="card"><div class="ch">Version history</div><div class="cb">' + log + '</div></div>' +
    '<footer class="cp">' + COPYRIGHT + '. All rights reserved.</footer>';
  function rr(l, v) { return '<div class="rr"><span class="rl">' + l + '</span><span class="rv">' + v + '</span></div>'; }
};
