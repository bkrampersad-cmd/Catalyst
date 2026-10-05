/* Catalyst - interactive periodic table + element detail card. */
'use strict';
const CATS = {
  alkali:     { t: 'Alkali metals', d: 'Group 1 metals. Soft, very reactive, and form +1 ions. React with water to make bases.' },
  alkaline:   { t: 'Alkaline earth metals', d: 'Group 2 metals. Reactive (less than Group 1) and form +2 ions.' },
  transition: { t: 'Transition metals', d: 'Groups 3–12. Often form colored compounds and can have more than one charge (e.g. Fe²⁺ and Fe³⁺).' },
  post:       { t: 'Other metals', d: 'Metals to the right of the transition metals. Softer, with lower melting points than transition metals.' },
  metalloid:  { t: 'Metalloids', d: 'Along the "staircase". They have properties of both metals and nonmetals; several are semiconductors.' },
  nonmetal:   { t: 'Nonmetals', d: 'Poor conductors and brittle as solids. They tend to gain or share electrons.' },
  halogen:    { t: 'Halogens', d: 'Group 17 nonmetals. Very reactive; they gain one electron to form −1 ions. Exist as diatomic molecules (F₂, Cl₂, Br₂, I₂).' },
  noble:      { t: 'Noble gases', d: 'Group 18. Full valence shell (a stable octet), so they almost never react.' },
  lanthanide: { t: 'Lanthanides', d: 'The first row of the f-block (atomic numbers 57–71).' },
  actinide:   { t: 'Actinides', d: 'The second row of the f-block (89–103). All are radioactive.' },
  unknown:    { t: 'Unknown', d: 'Properties not yet measured.' }
};
const GROUP_NAMES = { 1: 'alkali metals', 2: 'alkaline earth metals', 15: 'nitrogen family', 16: 'oxygen family (chalcogens)', 17: 'halogens', 18: 'noble gases', 14: 'carbon family', 13: 'boron family' };

const VIEWS = {
  cat:  { t: 'Category' },
  st:   { t: 'State at room temperature' },
  en:   { t: 'Electronegativity', k: 'en', u: '(Pauling)' },
  ie:   { t: 'First ionization energy', k: 'ie', u: 'kJ/mol' },
  m:    { t: 'Atomic mass', k: 'm', u: 'u' },
  d:    { t: 'Density', k: 'd', u: 'g/cm³', log: true },
};
const PT = { view: 'cat', q: '', hide: {}, cur: null };

function heat(t) { // 0..1 -> pale yellow to deep violet
  const stops = [[255, 245, 200], [255, 190, 120], [240, 110, 120], [170, 60, 160], [80, 40, 150]];
  const x = Math.max(0, Math.min(1, t)) * (stops.length - 1), i = Math.min(stops.length - 2, Math.floor(x)), f = x - i;
  const c = stops[i].map((v, k) => Math.round(v + (stops[i + 1][k] - v) * f));
  return 'rgb(' + c.join(',') + ')';
}
function textOn(rgb) { const m = rgb.match(/\d+/g); if (!m) return '#1C1733'; const l = 0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]; return l < 140 ? '#fff' : '#1C1733'; }

function elColor(e) {
  const v = VIEWS[PT.view];
  if (PT.view === 'cat') return 'var(--c-' + e.cat + ')';
  if (PT.view === 'st') {
    const s = e.st.toLowerCase();
    return s.includes('gas') ? (s.includes('expected') ? '#D7EEF7' : '#7CC8EA') : s.includes('liquid') ? '#F5A35C' : s.includes('expected') ? '#E6E1D8' : '#CDBFA6';
  }
  const vals = ELEMENTS.map(x => x[v.k]).filter(x => x !== null && x > 0);
  let lo = Math.min(...vals), hi = Math.max(...vals), val = e[v.k];
  if (val === null || val === undefined) return '#ECEAF2';
  if (v.log) { lo = Math.log10(lo); hi = Math.log10(hi); val = Math.log10(val); }
  return heat((val - lo) / (hi - lo));
}

RENDER.table = function (arg) {
  let opts = '';
  for (const k in VIEWS) opts += '<option value="' + k + '"' + (PT.view === k ? ' selected' : '') + '>' + VIEWS[k].t + '</option>';
  $('pg').innerHTML = '<div class="pt">Periodic Table</div>' +
    '<div class="ps">Tap an element to dig deeper. Change the color view to see periodic trends.</div>' +
    '<div class="pt-tools"><label class="rl" for="ptv">Color by</label><select id="ptv" onchange="PT.view=this.value;drawTable()">' + opts + '</select>' +
    '<input id="ptq" type="search" placeholder="Search name, symbol or number" value="' + esc(PT.q) + '" oninput="PT.q=this.value;drawTable()"></div>' +
    '<div class="hint swipe" style="display:none;margin:-4px 0 8px">\u2194 Swipe sideways to see the whole table, or turn your phone sideways.</div>' +
    '<div class="ptwrap"><div class="ptg" id="ptg"></div></div><div id="ptlg"></div>';
  drawTable();
  if (arg) { const e = ELEMENTS.find(x => x.s === arg || String(x.z) === arg); if (e) openEl(e.z, true); }
};

function matches(e) {
  if (PT.view === 'cat' && PT.hide[e.cat]) return false;
  const q = PT.q.trim().toLowerCase();
  if (!q) return true;
  return e.n.toLowerCase().startsWith(q) || e.s.toLowerCase() === q || String(e.z) === q;
}

function drawTable() {
  let h = '';
  ELEMENTS.forEach(e => {
    const bg = elColor(e);
    const fg = bg.startsWith('rgb') ? textOn(bg) : '#1C1733';
    h += '<div class="el' + (matches(e) ? '' : ' dim') + '" tabindex="0" role="button" aria-label="' + e.n + '" style="grid-row:' + e.r + ';grid-column:' + e.c + ';background:' + bg + ';color:' + fg + '" onclick="openEl(' + e.z + ')" onkeydown="if(event.key===\'Enter\')openEl(' + e.z + ')">' +
      '<span class="z">' + e.z + '</span><span class="sy">' + e.s + '</span><span class="nm">' + e.n + '</span><span class="ms">' + fmtMass(e.m) + '</span></div>';
  });
  h += '<div class="el ph" style="grid-row:6;grid-column:3">57–71</div><div class="el ph" style="grid-row:7;grid-column:3">89–103</div>';
  $('ptg').innerHTML = h;
  // legend
  let lg = '';
  if (PT.view === 'cat') {
    lg = '<div class="legend">' + Object.keys(CATS).filter(k => k !== 'unknown').map(k =>
      '<span class="lg' + (PT.hide[k] ? ' off' : '') + '" onclick="PT.hide.' + k + '=!PT.hide.' + k + ';drawTable()"><i style="background:var(--c-' + k + ')"></i>' + CATS[k].t + '</span>').join('') + '</div>' +
      '<div class="hint">Tap a category to show or hide it.</div>';
  } else if (PT.view === 'st') {
    lg = '<div class="legend">' + [['#CDBFA6', 'Solid'], ['#F5A35C', 'Liquid'], ['#7CC8EA', 'Gas'], ['#E6E1D8', 'Predicted (never measured)']].map(x => '<span class="lg"><i style="background:' + x[0] + '"></i>' + x[1] + '</span>').join('') + '</div>' +
      '<div class="hint">At room temperature (about 25 °C). Only two elements are liquids: bromine and mercury.</div>';
  } else {
    const v = VIEWS[PT.view];
    const vals = ELEMENTS.map(x => x[v.k]).filter(x => x !== null && x > 0);
    lg = '<div class="scale" style="background:linear-gradient(90deg,' + [0, .25, .5, .75, 1].map(heat).join(',') + ')"></div>' +
      '<div class="scl"><span>Low ' + fmtVal(Math.min(...vals)) + '</span><span>' + v.u + '</span><span>High ' + fmtVal(Math.max(...vals)) + '</span></div>' +
      '<div class="hint">' + trendNote(PT.view) + '</div>';
  }
  $('ptlg').innerHTML = lg;
}
function fmtVal(x) { return x < 0.01 ? x.toExponential(1) : (Math.round(x * 100) / 100).toString(); }
function fmtMass(m) { return m >= 100 ? m.toFixed(1) : m.toFixed(2).replace(/0$/, ''); }
function trendNote(v) {
  return {
    en: '<b>Trend:</b> electronegativity increases going <b>up</b> a group and <b>to the right</b> across a period. Fluorine is highest (4.0). Noble gases have no value. These values are not on the 2025 Reference Tables; learn the pattern.',
    ie: '<b>Trend:</b> ionization energy increases going <b>up</b> a group and <b>to the right</b> across a period. Electrons held closer to the nucleus are harder to remove (stronger Coulombic attraction). Not on the 2025 Reference Tables; learn the pattern.',
    m: 'Atomic mass generally increases with atomic number.',
    d: 'Shown on a log scale because densities range from gases (tiny) to osmium (22.6 g/cm³).'
  }[v] || '';
}

/* ---------- element detail ---------- */
function openEl(z, noHash) {
  const e = ELEMENTS[z - 1];
  PT.cur = z;
  const cat = CATS[e.cat];
  const bg = PT.view === 'cat' ? 'var(--c-' + e.cat + ')' : elColor(e);
  const fg = String(bg).startsWith('rgb') ? textOn(bg) : '#1C1733';
  const shells = e.sh ? e.sh.split('-').map(Number) : [];
  const valence = (e.g && (e.g <= 2 || e.g >= 13)) ? shells[shells.length - 1] : null;
  const loc = e.g ? 'Group ' + e.g + (GROUP_NAMES[e.g] && e.z !== 1 ? ' (' + GROUP_NAMES[e.g] + ')' : '') + ', Period ' + e.p : (e.cat === 'lanthanide' ? 'Lanthanide series' : 'Actinide series') + ', Period ' + e.p;
  const rows = [
    ['Atomic number', e.z + ' <span class="rl">(' + e.z + ' protons)</span>'],
    ['Atomic mass', e.m + ' u'],
    ['Electron configuration', '<b>' + e.sh + '</b>'],
    ['Orbital notation', esc(e.cfg)],
    valence !== null ? ['Valence electrons', valence] : null,
    ['Common charges', esc(e.ox || '—')],
    ['Electronegativity', num(e.en)],
    ['1st ionization energy', e.ie ? e.ie + ' kJ/mol' : '—'],
    ['State (room temp.)', esc(e.st)],
    ['Melting point', e.mp ? Math.round(e.mp) + ' K' : '—'],
    ['Boiling point', e.bp ? Math.round(e.bp) + ' K' : '—'],
    ['Density', e.d ? (e.d < 0.01 ? e.d.toExponential(2) + ' g/cm³' : e.d + ' g/cm³') : '—'],
    ['Discovered', esc(e.yr)]
  ].filter(Boolean);
  const neutrons = Math.round(e.m) - e.z;
  $('mbox').innerHTML =
    '<div class="mh"><div class="mtile" style="background:' + bg + ';color:' + fg + '"><span class="z">' + e.z + '</span><span class="sy">' + e.s + '</span><span class="ms">' + fmtMass(e.m) + '</span></div>' +
    '<div><h2>' + e.n + '</h2><div class="sub">' + cat.t.replace(/s$/, '') + ' · ' + loc + '</div></div>' +
    '<div class="mx"><button aria-label="Previous" onclick="stepEl(-1)">‹</button><button aria-label="Next" onclick="stepEl(1)">›</button><button aria-label="Close" onclick="closeEl()">✕</button></div></div>' +
    '<div class="mbody"><div>' + rows.map(r => '<div class="rr"><span class="rl">' + r[0] + '</span><span class="rv">' + r[1] + '</span></div>').join('') + '</div>' +
    '<div class="bohr">' + bohrSVG(e, shells) +
    '<div class="hint" style="text-align:center">Bohr model: ' + e.z + ' protons and about ' + neutrons + ' neutrons in the nucleus, electrons arranged ' + e.sh + '.</div>' +
    '<div class="fact"><b>' + cat.t + ':</b> ' + cat.d + '</div>' +
    (valence !== null ? '<div class="fact"><b>Why it matters:</b> ' + valenceNote(e, valence) + '</div>' : '') +
    '<div class="br"><button class="btn bc" onclick="closeEl(true);goPage(\'calc\',\'0:' + e.s + '\')">Molar mass of ' + e.s + '</button></div>' +
    '</div></div>';
  $('md').classList.add('open');
  if (!noHash && location.hash.indexOf('#table') === 0) history.replaceState(null, '', '#table/' + e.s);
}
function valenceNote(e, v) {
  const metal = ['alkali', 'alkaline', 'post', 'transition'].includes(e.cat);
  const ve = v + ' valence electron' + (v === 1 ? '' : 's');
  if (e.z === 1) return 'Hydrogen has 1 valence electron. It can lose it (H\u207A, as in acids) or share it in covalent bonds like H\u2082O.';
  if (e.g === 18) return e.n + ' has a full valence shell (' + ve + '), which is why it is so unreactive.';
  if (metal) return e.n + ' has ' + ve + '. Metals tend to <b>lose</b> their valence electrons to form positive ions' + ((e.g <= 2 || e.g === 13) ? ' (+' + v + ')' : '') + '.';
  if (v >= 5) return e.n + ' has ' + ve + '. It tends to <b>gain</b> ' + (8 - v) + ' to complete an octet, forming a \u2212' + (8 - v) + ' ion, or shares electrons in covalent bonds.';
  return e.n + ' has ' + ve + ' and usually <b>shares</b> electrons in covalent bonds.';
}
function stepEl(d) { if (!PT.cur) return; let z = PT.cur + d; if (z < 1) z = 118; if (z > 118) z = 1; openEl(z); }
function closeEl(silent) {
  const md = $('md'); if (!md || !md.classList.contains('open')) return;
  md.classList.remove('open'); PT.cur = null;
  if (!silent && location.hash.indexOf('#table/') === 0) history.replaceState(null, '', '#table');
}

function bohrSVG(e, shells) {
  const n = shells.length, R0 = 26, step = n > 5 ? 17 : 22, size = 2 * (R0 + step * n) + 20, c = size / 2;
  let s = '<svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="Bohr model of ' + e.n + '">';
  s += '<circle cx="' + c + '" cy="' + c + '" r="' + (R0 - 6) + '" fill="#FF8A65" stroke="#BF360C" stroke-width="1.5"/>';
  s += '<text x="' + c + '" y="' + (c + 4) + '" text-anchor="middle" font-size="' + (e.z > 99 ? 10 : 12) + '" font-weight="700" fill="#3E1A0A">' + e.z + 'p⁺</text>';
  shells.forEach((cnt, i) => {
    const r = R0 + step * (i + 1) - 4;
    s += '<circle cx="' + c + '" cy="' + c + '" r="' + r + '" fill="none" stroke="#9C8FD0" stroke-width="1.2"/>';
    const dr = cnt > 18 ? 2.6 : cnt > 8 ? 3.2 : 4.2;
    for (let k = 0; k < cnt; k++) {
      const a = -Math.PI / 2 + k * 2 * Math.PI / cnt;
      s += '<circle cx="' + (c + r * Math.cos(a)).toFixed(1) + '" cy="' + (c + r * Math.sin(a)).toFixed(1) + '" r="' + dr + '" fill="' + (i === n - 1 ? '#0FA89B' : '#5B3FD0') + '"/>';
    }
  });
  return s + '</svg>';
}
