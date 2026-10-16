/* Catalyst - Search. Offline, question-friendly search across lessons, quizzes, calculators,
   elements, the Regents page and the textbook chapter list.
   How it works: every lesson section is split into chunks at its <h2>/<h3> headings. A query is
   tokenized, stop words dropped, words stemmed, and expanded with chemistry synonyms ("heavier" ->
   mass). Chunks are scored (heading and title hits count most) and the best ones are shown with a
   snippet. Opening a result jumps to the exact heading and highlights it.
   Route: #search/<query>. */
'use strict';
PAGES.search = { t: 'Search', ic: '🔍' };

const STOP = new Set(('a an the is are was were be been being do does did what whats which who whom whose why how when where ' +
  'can could should would will shall may might must i me my you your we our it its they them their this that these those ' +
  'of in on at to for from by with about as into than then so if or and but not no yes there here get gets got have has had ' +
  'happen happens mean means explain tell show find work works use used using way ways thing things some any much many more most').split(' '));

/* Question words -> chemistry terms. Keys and values are pre-stemmed when the index loads. */
const SYN = {
  heavy: 'mass', heavier: 'mass', weight: 'mass', weigh: 'mass', weighs: 'mass', lighter: 'mass',
  big: 'radius', bigger: 'radius', biggest: 'radius', small: 'radius', smaller: 'radius', size: 'radius', large: 'radius', larger: 'radius',
  pull: 'electronegativity', attract: 'electronegativity', greedy: 'electronegativity',
  remove: 'ionization', removing: 'ionization',
  charge: 'ion charge', charges: 'ion charge', positive: 'cation', negative: 'anion',
  boil: 'boiling intermolecular', boiling: 'boiling intermolecular', stick: 'intermolecular', melt: 'melting', freeze: 'freezing',
  squeeze: 'boyle pressure volume', compress: 'boyle pressure volume', balloon: 'gas', tire: 'gas pressure',
  hotter: 'temperature', heat: 'heat', hot: 'temperature', cold: 'temperature',
  kelvin: 'kelvin temperature', celsius: 'kelvin temperature', convert: 'conversion',
  balance: 'balancing coefficient', balanced: 'balancing coefficient',
  name: 'naming', names: 'naming', formula: 'formula', formulas: 'formula',
  light: 'spectrum light', color: 'spectrum flame', colors: 'spectrum flame', glow: 'spectrum excited',
  dangerous: 'radiation ionizing', radiation: 'radiation',
  gram: 'mole molar', grams: 'mole molar', particles: 'avogadro mole', atoms: 'atom',
  shape: 'shape vsepr', polar: 'polar', dissolve: 'dissolves solubility', mix: 'mixture',
  rust: 'chemical change', burn: 'combustion', burning: 'combustion',
  sigfigs: 'significant figures', sig: 'significant', figs: 'figures', decimal: 'significant',
  percent: 'percent', yield: 'yield', limiting: 'limiting', excess: 'limiting excess',
  isotope: 'isotope', neutrons: 'neutron', protons: 'proton', electrons: 'electron',
  table: 'periodic table', trend: 'trend', trends: 'trend', across: 'period', down: 'group',
  regents: 'regents exam', test: 'regents exam', exam: 'regents exam'
};

function stem(w) {
  w = w.toLowerCase();
  if (w.length <= 3) return w;
  for (const suf of ['ational', 'ization', 'ically', 'ities', 'ness', 'ments', 'ment', 'ings', 'ing', 'ies', 'ied', 'est', 'ers', 'er', 'es', 'ed', 'ly', 's']) {
    if (w.length - suf.length >= 3 && w.endsWith(suf)) {
      w = w.slice(0, -suf.length);
      if (suf === 'ies' || suf === 'ied') w += 'y';
      break;
    }
  }
  return w;
}
function words(t) { return (String(t).toLowerCase().match(/[a-z0-9]+/g) || []); }
function plain(html) {
  return String(html).replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<sub>(.*?)<\/sub>/g, '$1')
    .replace(/<sup>(.*?)<\/sup>/g, (m, x) => x.replace(/&minus;/g, '-').replace(/[0-9+\-]/g, c => '\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079'['0123456789'.indexOf(c)] || (c === '+' ? '\u207A' : '\u207B'))).replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&rarr;/g, '→').replace(/&times;/g, '×')
    .replace(/&divide;/g, '÷').replace(/&minus;/g, '−').replace(/&deg;/g, '°').replace(/&middot;/g, '·')
    .replace(/&amp;/g, '&').replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
}

let SEARCH_INDEX = null;
function buildIndex() {
  const docs = [];
  const add = d => { d.terms = {}; d.head = new Set(words(d.title + ' ' + (d.heading || '')).map(stem)); words(d.text + ' ' + d.title + ' ' + (d.heading || '') + ' ' + (d.extra || '')).forEach(w => { const s = stem(w); d.terms[s] = (d.terms[s] || 0) + 1; }); docs.push(d); };
  UNITS.forEach(u => {
    const L = LESSONS[u.id];
    if (!L) {
      add({ kind: 'unit', title: u.t, heading: '', text: u.d, href: '#study/' + u.id, unit: u, soon: true });
      return;
    }
    L.sections.forEach((sec, i) => {
      // split at h2/h3 so a hit can jump to the exact heading
      const parts = sec.h.split(/(?=<h[23][ >])/);
      parts.forEach(part => {
        const hm = part.match(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/);
        const heading = hm ? plain(hm[1]) : sec.t;
        const text = plain(part);
        if (text.length < 20) return;
        add({ kind: 'lesson', title: sec.t, heading, text, href: '#study/' + u.id + '.' + i, unit: u, jump: heading });
      });
    });
    L.quiz.forEach((q, i) => add({ kind: 'quiz', title: 'Practice question', heading: '', text: plain(q.q) + ' ' + plain(q.x), href: '#study/' + u.id + '.quiz', unit: u, qi: i }));
  });
  NAMES.forEach((n, i) => add({ kind: 'calc', title: n, heading: '', text: plain(CALCS[n].sub), extra: 'calculator calculate solve', href: '#calc/' + i }));
  add({ kind: 'page', title: 'The new Regents: Physical Science: Chemistry', heading: 'Reference Tables 2025 exam format', text: 'exam format clusters storylines performance levels topic areas weights reference tables 2025 investigations labs scoring passing', href: '#regents' });
  add({ kind: 'page', title: 'Periodic Table', heading: 'periodic table elements', text: 'periodic table elements trends electronegativity ionization energy atomic mass density state color category groups periods', href: '#table' });
  SYN_STEM = {};
  Object.keys(SYN).forEach(k => { SYN_STEM[stem(k)] = words(SYN[k]).map(stem); });
  // document frequency for weighting rare words higher
  const df = {};
  docs.forEach(d => Object.keys(d.terms).forEach(t => { df[t] = (df[t] || 0) + 1; }));
  SEARCH_INDEX = { docs, df, n: docs.length };
}
let SYN_STEM = {};

function runSearch(q) {
  if (!SEARCH_INDEX) buildIndex();
  const raw = words(q).filter(w => !STOP.has(w));
  const out = { results: [], element: null, terms: [] };
  if (!raw.length) return out;
  // element by name or symbol
  const qtrim = q.trim().toLowerCase();
  out.element = ELEMENTS.find(e => e.n.toLowerCase() === qtrim || e.s.toLowerCase() === qtrim) ||
    ELEMENTS.find(e => raw.includes(e.n.toLowerCase())) || null;
  const base = raw.map(stem);
  const expanded = new Map(); // term -> weight
  base.forEach(t => expanded.set(t, Math.max(expanded.get(t) || 0, 1)));
  base.forEach(t => (SYN_STEM[t] || []).forEach(s => { if (!expanded.has(s)) expanded.set(s, 0.8); }));
  out.terms = [...expanded.keys()];
  const { docs, df, n } = SEARCH_INDEX;
  docs.forEach(d => {
    let score = 0, hit = 0;
    expanded.forEach((w, t) => {
      const tf = d.terms[t] || 0;
      if (!tf) return;
      hit++;
      const idf = Math.log(1 + n / (df[t] || 1));
      score += w * idf * (1 + Math.log(tf)) + (d.head.has(t) ? 3 * w * idf : 0);
    });
    if (!hit) return;
    score *= 0.5 + hit / expanded.size; // reward covering more of the question
    if (d.kind === 'quiz') score *= 0.6;
    if (d.soon) score *= 0.7;
    out.results.push({ d, score });
  });
  out.results.sort((a, b) => b.score - a.score);
  // one result per lesson section+heading, at most 3 per unit section
  const seen = new Set();
  out.results = out.results.filter(r => { const k = r.d.href + '|' + (r.d.heading || r.d.qi); if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 12);
  return out;
}

function snippet(text, terms) {
  const lw = text.toLowerCase();
  let pos = -1;
  for (const t of terms) { const m = lw.search(new RegExp('\\b' + t.replace(/[^a-z0-9]/g, ''))); if (m >= 0 && (pos < 0 || m < pos)) pos = m; }
  let start = Math.max(0, pos - 70), s = text.slice(start, start + 220);
  if (start > 0) s = '…' + s.slice(s.indexOf(' ') + 1);
  if (start + 220 < text.length) s = s.slice(0, s.lastIndexOf(' ')) + '…';
  let h = esc(s);
  terms.forEach(t => { if (t.length > 2) h = h.replace(new RegExp('\\b(' + t + '[a-z]*)', 'gi'), '<mark>$1</mark>'); });
  return h;
}

/* fallback: point to textbook chapters whose titles match */
function bookSuggest(terms) {
  const hits = [];
  Object.keys(BOOK.ch).forEach(c => { const tw = words(BOOK.ch[c]).map(stem); const k = terms.filter(t => tw.includes(t)).length; if (k) hits.push([k, +c]); });
  return hits.sort((a, b) => b[0] - a[0]).slice(0, 3).map(h => h[1]);
}

let SEARCH_JUMP = null; // heading text to scroll to after navigation
RENDER.search = function (arg) {
  const q = arg || '';
  $('pg').innerHTML = '<div class="pt">Search</div><div class="ps">Ask a question or type a topic, for example "why is argon heavier than potassium" or "how do I convert grams to moles".</div>' +
    '<form id="sform" class="sbar" onsubmit="event.preventDefault();doSearch($(\'sq\').value)"><input id="sq" type="search" placeholder="Search lessons, calculators and elements" value="' + esc(q) + '" autocomplete="off" enterkeyhint="search"><button class="btn bc" type="submit">Search</button></form>' +
    '<div id="sres"></div>';
  if (q) showResults(q); else $('sres').innerHTML = searchTips();
  setTimeout(() => { const el = $('sq'); if (el && !q) el.focus(); }, 50);
};
function doSearch(q) { q = String(q || '').trim(); if (q) goPage('search', q); }
function searchTips() {
  const ex = ['why is argon heavier than potassium', 'how do I convert grams to moles', 'what is an isotope', 'why does water boil so high', 'which way does atomic radius go', 'how to balance an equation', 'what is on the reference tables'];
  return '<div class="card"><div class="ch">Try asking</div><div class="cb">' + ex.map(e => '<button class="chip" onclick="doSearch(this.textContent)">' + e + '</button>').join('') + '</div></div>';
}
function showResults(q) {
  const r = runSearch(q);
  let h = '';
  if (r.element) {
    const e = r.element;
    h += '<a class="sr" href="#table/' + e.s + '"><div class="srk">Element</div><div class="srt">' + e.n + ' (' + e.s + ')</div><div class="srs">Atomic number ' + e.z + ' · atomic mass ' + e.m + ' · ' + e.sh + '. Open its card on the Periodic Table.</div></a>';
  }
  r.results.forEach(({ d }) => {
    const where = d.unit ? (d.unit.id === 'mid' ? 'Midterm Review' : 'Unit ' + (UNITS.filter(u => !u.s2 && u.id !== 'mid').concat(UNITS.filter(u => u.s2)).indexOf(d.unit) + 1) + ': ' + d.unit.t) : '';
    const kind = { lesson: 'Lesson', quiz: 'Practice quiz', calc: 'Calculator', page: 'Page', unit: 'Coming soon' }[d.kind];
    const title = d.kind === 'lesson' ? d.title + (d.heading && d.heading !== d.title ? ' › ' + d.heading : '') : d.title;
    const book = d.unit && d.unit.book && d.unit.book.length ? '<div class="srb">📖 Textbook: ' + d.unit.book.map(c => 'Ch. ' + c).join(', ') + '</div>' : '';
    h += '<a class="sr" href="' + d.href + '" data-jump="' + esc(d.jump || '') + '" onclick="SEARCH_JUMP=this.dataset.jump||null"><div class="srk">' + kind + (where ? ' · ' + esc(where) : '') + '</div><div class="srt">' + esc(title) + '</div>' +
      '<div class="srs">' + snippet(d.text, r.terms) + '</div>' + book + '</a>';
  });
  if (!h) {
    const chs = bookSuggest(r.terms);
    h = '<div class="card"><div class="cb" style="font-size:14px;line-height:1.6"><b>Catalyst doesn\'t cover that yet.</b> ' +
      (chs.length ? 'Try your textbook (' + BOOK.name + '): ' + chs.map(c => '<b>Ch. ' + c + '</b> ' + esc(BOOK.ch[c])).join(' · ') + '. ' : '') +
      'You can also ask your teacher, or try different words.</div></div>' + searchTips();
  } else if (r.results.length && r.results[0].d.soon) {
    h = '<div class="hint" style="margin-bottom:8px">That topic is in a unit that isn\'t written yet. The textbook chapters listed will help until then.</div>' + h;
  }
  $('sres').innerHTML = '<div class="rl" style="margin:4px 0 10px">' + (r.results.length + (r.element ? 1 : 0)) + ' result' + (r.results.length + (r.element ? 1 : 0) === 1 ? '' : 's') + ' for “' + esc(q) + '”</div>' + h;
}

/* After a lesson renders, scroll to and flash the heading the search result pointed at. */
function applySearchJump() {
  if (!SEARCH_JUMP) return;
  const target = SEARCH_JUMP; SEARCH_JUMP = null;
  const hs = document.querySelectorAll('.lesson h2, .lesson h3');
  for (const h of hs) {
    if (plain(h.innerHTML) === target) {
      h.scrollIntoView({ block: 'start' });
      h.classList.add('flash');
      setTimeout(() => h.classList.remove('flash'), 2200);
      return;
    }
  }
}
window.addEventListener('hashchange', () => setTimeout(applySearchJump, 30));
