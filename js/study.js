/* Catalyst - Study Guide. Units follow the class syllabus order (Enriched Chemistry 2026-27, 1st semester).
   The class follows the NEW Regents course, "Physical Science: Chemistry" (NYS P-12 Science Learning Standards),
   with the 2025 Reference Tables. Each unit lists the Performance Expectations (PEs) it supports.
   Second-semester units are organized by the remaining PEs and stay tentative until the teacher's plan is known.
   To add a lesson: create js/lessons/<id>.js setting LESSONS.<id> = { sections:[{t,h}], quiz:[{q, o:[...], a, x, ctx?}] }. */
'use strict';
const PE_TITLES = {
  'HS-PS1-1': 'Valence electrons and properties of elements', 'HS-PS1-2': 'Simple chemical reactions',
  'HS-PS1-3': 'Electrical forces and bulk-scale structure', 'HS-PS1-4': 'Bond energy changes in reactions',
  'HS-PS1-5': 'Collision theory and reaction rates', 'HS-PS1-6': 'Designing for more product at equilibrium',
  'HS-PS1-7': 'Conservation of atoms (stoichiometry)', 'HS-PS1-8': 'Fission, fusion and radioactive decay',
  'HS-PS1-9': 'Combined gas law (NYS)', 'HS-PS1-10': 'Solutions (NYS)', 'HS-PS1-11': 'Acids and bases (NYS)',
  'HS-PS1-12': 'Transfer of electrons (NYS)', 'HS-PS2-6': 'Molecular structure of designed materials',
  'HS-PS3-1': 'Energy change in a system', 'HS-PS3-5': 'Electric forces and energy between interacting charges',
  'HS-PS4-4': 'Absorption of electromagnetic radiation', 'HS-LS1-5': 'Photosynthesis and energy',
  'HS-ETS1': 'Engineering design'
};
/* Class reference book: Addison-Wesley "Chemistry" (Prentice Hall, 2002), which the teacher said students may use.
   It predates the 2025 standards (uses 273 K, includes organic chemistry), so the app only points to chapters. */
const BOOK = { name: 'Addison-Wesley Chemistry', ch: {
  1: 'Introduction to Chemistry', 2: 'Matter and Change', 3: 'Scientific Measurement', 4: 'Problem Solving in Chemistry',
  5: 'Atomic Structure and the Periodic Table', 6: 'Chemical Names and Formulas', 7: 'Chemical Quantities', 8: 'Chemical Reactions',
  9: 'Stoichiometry', 10: 'States of Matter', 11: 'Thermochemistry: Heat and Chemical Change', 12: 'The Behavior of Gases',
  13: 'Electrons in Atoms', 14: 'Chemical Periodicity', 15: 'Ionic Bonding and Ionic Compounds', 16: 'Covalent Bonding',
  17: 'Water and Aqueous Systems', 18: 'Solutions', 19: 'Reaction Rates and Equilibrium', 20: 'Acids and Bases', 21: 'Neutralization',
  22: 'Oxidation-Reduction Reactions', 23: 'Electrochemistry', 24: 'The Chemistry of Metals and Nonmetals', 25: 'Hydrocarbon Compounds',
  26: 'Functional Groups and Organic Reactions', 27: 'The Chemistry of Life', 28: 'Nuclear Chemistry' } };
const UNITS = [
  { id: 'c1', cls: 'Sep 2–16', t: 'Atoms & Water', d: 'Atoms, elements and molecules, why water is special (surface tension, conductivity, solubility), the parts of an atom, isotopes and atomic mass, and ions.', book: [2, 5], pe: ['HS-PS1-1'] },
  { id: 'c2', cls: 'Sep 18–28', t: 'Ions & Salts', d: 'Electrolytes and mobile ions, groups and periods, metals vs. nonmetals, Bohr and Lewis dot diagrams, ionic bonds, and writing and naming salts.', book: [5, 6, 15], pe: ['HS-PS1-1', 'HS-PS1-2', 'HS-PS1-3'] },
  { id: 'c3', cls: 'Oct 1–19', t: 'Bonding & Shapes', d: 'Coulombic attraction and periodic trends, covalent bonds and multiple bonds, polar bonds (ΔEN), SNAP, intermolecular forces and hydrogen bonding, how water dissolves salts, metallic bonding, and VSEPR shapes.', book: [14, 15, 16, 17], pe: ['HS-PS1-1', 'HS-PS1-3', 'HS-PS2-6'] },
  { id: 'u3', later: true, t: 'Formulas & Equations', d: 'More ions (including polyatomic ions), writing and naming compounds, balancing equations (conservation of atoms) and types of reactions.', book: [6, 8], pe: ['HS-PS1-2', 'HS-PS1-7'] },
  { id: 'u6', later: true, t: 'Mathematics of Chemistry', d: 'The mole, molar mass, percent composition, empirical formulas and stoichiometry.', book: [7, 9], pe: ['HS-PS1-7'] },
  { id: 'mid', later: true, t: 'Midterm Review', d: 'Formula sheet, big ideas and mixed practice, including a storyline question set like the new Regents. It will be updated to match the class midterm once the class calendar arrives.', book: [], pe: [] },
  { id: 'u1', tbd: true, t: 'Matter & Measurement', d: 'Classifying matter, physical vs. chemical changes, states of matter and heat, metric units, significant figures, density and percent error.', book: [1, 2, 3, 4, 10, 11], pe: ['HS-PS1-3', 'HS-PS3-1'] },
  { id: 'u2', tbd: true, t: 'Atomic Models, Electrons & Light', d: 'Models of the atom, electron shells, excited states, spectra and the electromagnetic spectrum (it also reviews particles and isotopes).', book: [5, 13], pe: ['HS-PS1-1', 'HS-PS4-4'] },
  { id: 'u7', tbd: true, t: 'Gas Laws', d: 'Kinetic molecular theory, pressure, and Boyle\'s, Charles\'s, Gay-Lussac\'s and the combined gas law.', book: [10, 12], pe: ['HS-PS1-9'] },
  { id: 'lab1', lab: true, t: 'Pre-lab: Bend and Stretch', d: 'Background for the required Investigation on designed materials: why metals bend, salts shatter and polymers stretch, plus the lab skills for good data.', book: [15, 24, 26], pe: ['HS-PS2-6'] },
  { id: 'u8', t: 'Solutions', d: 'Solubility, molarity (n = MV), ppm, and how dissolved particles change a solution\'s properties.', s2: true, book: [17, 18], pe: ['HS-PS1-10'] },
  { id: 'u9', t: 'Reaction Rates & Equilibrium', d: 'Collision theory, factors that change reaction rate, equilibrium and Le Chatelier\'s principle.', s2: true, book: [19], pe: ['HS-PS1-5', 'HS-PS1-6'] },
  { id: 'u10', t: 'Acids & Bases', d: 'Properties of acids and bases, pH, indicators, neutralization and titration.', s2: true, book: [20, 21], pe: ['HS-PS1-11'] },
  { id: 'u11', t: 'Redox & Electrochemistry', d: 'Oxidation and reduction, electron transfer, and electrochemical cells.', s2: true, book: [22, 23], pe: ['HS-PS1-12'] },
  { id: 'u12', t: 'Energy in Reactions & Living Systems', d: 'Bond energy, endothermic vs. exothermic reactions, energy diagrams, photosynthesis and cellular respiration.', s2: true, book: [11, 27], pe: ['HS-PS1-4', 'HS-PS3-1', 'HS-LS1-5'] },
  { id: 'u13', t: 'Nuclear Chemistry', d: 'Radioactive decay, nuclear equations, half-life, fission and fusion.', s2: true, book: [28], pe: ['HS-PS1-8'] }
];
function bookChips(list) {
  return (list || []).map(c => '<span class="bk" title="' + esc(BOOK.name + ', Chapter ' + c + ': ' + BOOK.ch[c]) + '">Ch. ' + c + '</span>').join('');
}
function bookLine(list) {
  if (!list || !list.length) return '';
  return '<div class="bkline">\uD83D\uDCD6 <b>Read more in your textbook</b> (' + BOOK.name + '): ' + list.map(c => 'Ch. ' + c + ' <span class="rl">' + esc(BOOK.ch[c]) + '</span>').join(' &middot; ') + '</div>';
}
function peChips(list) {
  return (list || []).map(p => '<span class="pe" title="' + esc(PE_TITLES[p] || '') + '">' + p + '</span>').join('');
}

/* Lesson content lives in js/lessons/<unit>.js, each assigning LESSONS.<unitId>. */
const LESSONS = {};

/* Small SVG toolkit shared by lesson diagrams. Class names are sv- prefixed because an
   inline SVG <style> block applies to the whole page. */
const SV = {
  css: '<style>.sv-t{font:600 14px Segoe UI,Arial,sans-serif;fill:#22145A;text-anchor:middle}.sv-s{font:12px Segoe UI,Arial,sans-serif;fill:#6E6888;text-anchor:middle}' +
    '.sv-a{font:700 22px Segoe UI,Arial,sans-serif;fill:#22145A;text-anchor:middle;dominant-baseline:central}.sv-l{stroke:#5B3FD0;stroke-width:2.5;fill:none}' +
    '.sv-g{stroke:#9C8FD0;stroke-width:1.5;fill:none}.sv-d{fill:#0FA89B}</style>',
  wrap(w, h, label, inner) { return '<svg viewBox="0 0 ' + w + ' ' + h + '" style="max-width:' + Math.round(w * 1.25) + 'px" role="img" aria-label="' + label + '">' + SV.css + inner + '</svg>'; },
  t(x, y, s, cls) { return '<text class="' + (cls || 'sv-t') + '" x="' + x + '" y="' + y + '">' + s + '</text>'; },
  /* atom symbol with lone pairs on sides t/b/l/r, single electrons with t1/b1/l1/r1 */
  atom(x, y, sym, sides) {
    let s = SV.t(x, y, sym, 'sv-a'), d = 17, dx = sym.length > 1 ? 24 : 17, g = 5;
    (sides || []).forEach(sd => {
      const one = sd.length > 1, k = sd[0];
      const pts = k === 't' ? [[x - g, y - d], [x + g, y - d]] : k === 'b' ? [[x - g, y + d], [x + g, y + d]] :
        k === 'l' ? [[x - dx, y - g], [x - dx, y + g]] : [[x + dx, y - g], [x + dx, y + g]];
      (one ? [k === 't' || k === 'b' ? [x, pts[0][1]] : [pts[0][0], y]] : pts).forEach(p => { s += '<circle class="sv-d" cx="' + p[0] + '" cy="' + p[1] + '" r="2.8"/>'; });
    });
    return s;
  },
  /* bond between two atom centers, trimmed so it doesn't overlap the symbols; order 1-3 */
  bond(x1, y1, x2, y2, order) {
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, trim = 15, px = -uy, py = ux;
    const a = [x1 + ux * trim, y1 + uy * trim], b = [x2 - ux * trim, y2 - uy * trim];
    const offs = order === 1 ? [0] : order === 2 ? [-3.5, 3.5] : [-6, 0, 6];
    return offs.map(o => '<line class="sv-l" x1="' + (a[0] + px * o).toFixed(1) + '" y1="' + (a[1] + py * o).toFixed(1) + '" x2="' + (b[0] + px * o).toFixed(1) + '" y2="' + (b[1] + py * o).toFixed(1) + '"/>').join('');
  },
  /* charge as a superscript string: 2 -> "2+", -1 -> "−" */
  chg(q) { return !q ? '' : (Math.abs(q) === 1 ? '' : Math.abs(q)) + (q > 0 ? '+' : '−'); },
  sup(q) { return SV.chg(q).replace(/[0-9+−]/g, c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c] || (c === '+' ? '⁺' : '⁻')); },
  /* Bohr model with labeled nucleus. shells e.g. [2,8,1]; charge != 0 draws it as an ion. */
  bohrIon(sym, p, n, shells, charge) {
    const k = shells.length, R0 = 28, step = 20, pad = charge ? 36 : 12, size = 2 * (R0 + step * k) + 8, c = size / 2, W = size + pad * 2;
    const lab = sym + (charge ? SV.sup(charge) : '');
    let s = '<svg viewBox="0 0 ' + W + ' ' + (size + 26) + '" style="width:' + Math.round(W * 1.15) + 'px;max-width:100%;height:auto" role="img" aria-label="Bohr model of ' + lab + '">';
    const cx = c + pad;
    s += '<circle cx="' + cx + '" cy="' + c + '" r="' + (R0 - 4) + '" fill="#FFE3D8" stroke="#BF360C" stroke-width="1.5"/>';
    s += '<text x="' + cx + '" y="' + (c - 3) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#3E1A0A">' + p + ' p⁺</text>';
    s += '<text x="' + cx + '" y="' + (c + 11) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#3E1A0A">' + n + ' n⁰</text>';
    shells.forEach((cnt, i) => {
      const r = R0 + step * (i + 1) - 4;
      s += '<circle cx="' + cx + '" cy="' + c + '" r="' + r + '" fill="none" stroke="#9C8FD0" stroke-width="1.2"/>';
      for (let j = 0; j < cnt; j++) {
        const a = -Math.PI / 2 + j * 2 * Math.PI / Math.max(cnt, 1);
        s += '<circle cx="' + (cx + r * Math.cos(a)).toFixed(1) + '" cy="' + (c + r * Math.sin(a)).toFixed(1) + '" r="3.6" fill="' + (i === k - 1 ? '#0FA89B' : '#5B3FD0') + '"/>';
      }
    });
    if (charge) {
      s += '<path d="M' + (pad - 2) + ' 6 h-8 v' + (size - 12) + ' h8 M' + (W - pad + 2) + ' 6 h8 v' + (size - 12) + ' h-8" fill="none" stroke="#22145A" stroke-width="2"/>';
      s += '<text x="' + (W - pad + 12) + '" y="16" font-size="15" font-weight="700" fill="#22145A">' + SV.chg(charge) + '</text>';
    }
    s += '<text x="' + (W / 2) + '" y="' + (size + 18) + '" text-anchor="middle" font-size="13" font-weight="600" fill="#22145A">' + lab + ' (' + shells.join('-') + ')</text>';
    return s + '</svg>';
  },
  /* Lewis dot diagram: dots go top, right, bottom, left, one per side before pairing. */
  lewisDot(sym, dots, charge) {
    const per = [0, 0, 0, 0];
    for (let i = 0; i < dots; i++) per[i % 4]++;
    const bw = charge ? 30 : 0, W = 96 + bw * 2, H = 96, x = W / 2, y = H / 2, wide = sym.length > 1 ? 7 : 0;
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:' + Math.round(W * 1.3) + 'px;max-width:100%;height:auto" role="img" aria-label="Lewis dot diagram of ' + sym + SV.chg(charge) + '">' + SV.css + SV.t(x, y, sym, 'sv-a');
    const pos = [[[x, y - 20], 'h'], [[x + 19 + wide, y], 'v'], [[x, y + 20], 'h'], [[x - 19 - wide, y], 'v']];
    per.forEach((cnt, i) => {
      const [[px, py], dir] = pos[i];
      const pts = cnt === 2 ? (dir === 'h' ? [[px - 5, py], [px + 5, py]] : [[px, py - 5], [px, py + 5]]) : cnt === 1 ? [[px, py]] : [];
      pts.forEach(p => { s += '<circle class="sv-d" cx="' + p[0] + '" cy="' + p[1] + '" r="3"/>'; });
    });
    if (charge) {
      s += '<path d="M' + (bw + 10) + ' 14 h-6 v68 h6 M' + (W - bw - 10) + ' 14 h6 v68 h-6" fill="none" stroke="#22145A" stroke-width="2"/>';
      s += '<text x="' + (W - bw + 2) + '" y="20" font-size="15" font-weight="700" fill="#22145A">' + SV.chg(charge) + '</text>';
    }
    return s + '</svg>';
  },
  arrow(x1, y1, x2, y2, color) {
    const c = color || '#5B3FD0', a = Math.atan2(y2 - y1, x2 - x1), h = 9;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="3"/>' +
      '<polygon fill="' + c + '" points="' + x2 + ',' + y2 + ' ' + (x2 - h * Math.cos(a - .45)).toFixed(1) + ',' + (y2 - h * Math.sin(a - .45)).toFixed(1) + ' ' + (x2 - h * Math.cos(a + .45)).toFixed(1) + ',' + (y2 - h * Math.sin(a + .45)).toFixed(1) + '"/>';
  }
};

/* ---------- rendering ---------- */
function unitProgress(id) {
  const L = LESSONS[id]; if (!L) return 0;
  const seen = Store.get('seen.' + id, []), q = Store.get('quiz.' + id, null);
  const total = L.sections.length + 1;
  return Math.round((seen.length + (q ? 1 : 0)) / total * 100);
}

RENDER.study = function (arg) {
  if (arg) return renderLesson(arg);
  const now = UNITS.filter(u => u.cls), labs = UNITS.filter(u => u.lab), later = UNITS.filter(u => u.later), tbd = UNITS.filter(u => u.tbd), second = UNITS.filter(u => u.s2);
  const card = (u, i) => {
    const has = !!LESSONS[u.id], p = unitProgress(u.id);
    return '<div class="unit' + (has ? '' : ' locked') + '" onclick="goPage(\'study\',\'' + u.id + '\')"><div class="unum">' + (u.id === 'mid' ? '★' : i) + '</div><div style="flex:1"><h3>' + u.t +
      (u.cls ? ' <span class="badge" style="background:#E8FBF8;color:#0B6E66">' + u.cls + '</span>' : '') + (has ? '' : ' <span class="badge">coming soon</span>') + '</h3><p>' + u.d + '</p>' + ((u.pe && u.pe.length) || (u.book && u.book.length) ? '<div class="pes">' + peChips(u.pe) + bookChips(u.book) + '</div>' : '') + (has ? '<div class="prog"><i style="width:' + p + '%"></i></div><div class="rl" style="margin-top:3px">' + p + '% complete</div>' : '') + '</div></div>';
  };
  let n = 0;
  const grp = t => '<div class="grp" style="color:var(--mu);padding-left:0;margin-top:14px">' + t + '</div>';
  $('pg').innerHTML = '<div class="pt">Study Guide</div><div class="ps">The first units follow your class, lesson by lesson, using the same words your teacher uses. Each unit has short lessons with diagrams, then a practice quiz with explanations. The purple tags (like HS-PS1-1) are the NYS Performance Expectations each unit covers. The gray tags (like Ch. 5) are the matching chapters in your class reference book, ' + BOOK.name + '.</div>' +
    '<button class="tile" style="width:100%;margin-bottom:10px;display:flex;gap:14px;align-items:center;border-color:var(--tl)" onclick="goPage(\'prep\')"><div class="ti">🎯</div><div><h3 style="margin:0 0 2px">Test Prep for the unit test</h3><p>Your test topic checklist, shuffled practice tests, topic drills, Regents-style clusters, and a review of the questions you missed.</p></div></button>' +
    '<button class="tile" style="width:100%;margin-bottom:6px;display:flex;gap:14px;align-items:center" onclick="goPage(\'regents\')"><div class="ti">🎓</div><div><h3 style="margin:0 0 2px">The new Regents: Physical Science: Chemistry</h3><p>How the exam works, the six topic areas and their weights, the 2025 Reference Tables, and which Catalyst units cover each one.</p></div></button>' +
    grp('In class now: "How should we search for life beyond Earth?"') + now.map(u => card(u, ++n)).join('') +
    grp('Labs: pre-lab reviews') + labs.map(u => card(u, 'L')).join('') +
    grp('Coming up this semester') + later.map(u => card(u, u.id === 'mid' ? 0 : ++n)).join('') +
    grp('Also in the course (timing to be confirmed with the class calendar)') + tbd.map(u => card(u, ++n)).join('') +
    grp('Second semester (tentative, organized by the remaining Performance Expectations)') + second.map(u => card(u, ++n)).join('');
};

function renderLesson(arg) {
  const [id, secRaw] = String(arg).split('.');
  const unit = UNITS.find(u => u.id === id), L = LESSONS[id];
  if (!unit) return RENDER.study();
  if (!L) {
    $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'study\')">‹ All units</button><div class="pt" style="margin-top:12px">' + unit.t + '</div>' +
      '<div class="ps">' + unit.d + '</div>' + bookLine(unit.book) + '<div class="card"><div class="cb" style="font-size:14px;line-height:1.6">This unit\'s lessons are coming soon. They will follow your class notes and packets once those are added.' +
      (id === 'u4' ? '<div class="br"><button class="btn bc" onclick="goPage(\'table\')">Explore the Periodic Table now</button></div>' : '') +
      (id === 'u6' ? '<div class="br"><button class="btn bc" onclick="go(0)">Try the Molar Mass calculator</button></div>' : '') +
      (id === 'u7' ? '<div class="br"><button class="btn bc" onclick="go(2)">Try the Gas Laws calculator</button></div>' : '') +
      (id === 'u3' ? '<div class="br"><button class="btn bc" onclick="go(1)">Try the Equation Balancer</button></div>' : '') +
      '</div></div>';
    return;
  }
  const sec = secRaw === 'quiz' ? 'quiz' : Math.max(0, Math.min(L.sections.length - 1, parseInt(secRaw || '0', 10) || 0));
  const nav = L.sections.map((s, i) => '<button class="' + (i === sec ? 'on' : '') + '" onclick="goPage(\'study\',\'' + id + '.' + i + '\')">' + (i + 1) + '. ' + s.t + '</button>').join('') +
    '<button class="' + (sec === 'quiz' ? 'on' : '') + '" onclick="goPage(\'study\',\'' + id + '.quiz\')">✍️ Practice quiz</button>';
  let body;
  if (sec === 'quiz') body = renderQuiz(id, L.quiz);
  else {
    const seen = Store.get('seen.' + id, []); if (!seen.includes(sec)) { seen.push(sec); Store.set('seen.' + id, seen); }
    Store.set('lastLesson', { id: id + '.' + sec, title: unit.t + ': ' + L.sections[sec].t });
    const next = sec < L.sections.length - 1 ? '\'' + id + '.' + (sec + 1) + '\'' : '\'' + id + '.quiz\'';
    body = '<div class="lesson">' + L.sections[sec].h + '</div><div class="br">' +
      (sec > 0 ? '<button class="btn bs" onclick="goPage(\'study\',\'' + id + '.' + (sec - 1) + '\')">‹ Back</button>' : '') +
      '<button class="btn bc" onclick="goPage(\'study\',' + next + ')">' + (sec < L.sections.length - 1 ? 'Next: ' + L.sections[sec + 1].t + ' ›' : 'Take the practice quiz ›') + '</button></div>';
  }
  $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'study\')">‹ All units</button><div class="pt" style="margin-top:12px">' + unit.t + '</div><div class="ps">' + unit.d + '</div>' +
    (unit.pe && unit.pe.length ? '<div class="pes" style="margin:-8px 0 8px">' + peChips(unit.pe) + '</div>' : '') + bookLine(unit.book) +
    '<div class="lnav">' + nav + '</div>' + body;
  if (sec === 'quiz') bindQuiz(id, L.quiz);
  wrapTables($('pg'));
}
/* let wide tables scroll sideways on phones instead of being cut off */
function wrapTables(root) {
  root.querySelectorAll('table').forEach(t => {
    const p = t.parentElement; if (!p || p.classList.contains('tw') || getComputedStyle(p).overflowX === 'auto') return;
    const w = document.createElement('div'); w.className = 'tw'; p.insertBefore(w, t); w.appendChild(t);
  });
}

function renderQuiz(id, quiz) {
  const best = Store.get('quiz.' + id, null);
  return '<div class="ps">' + quiz.length + ' questions. Tap an answer to check it and see the explanation.' + (best ? ' Your best score: <b>' + best + '/' + quiz.length + '</b>.' : '') + '</div>' +
    quiz.map((q, i) => (q.ctx ? '<div class="ctx">' + q.ctx + '</div>' : '') + '<div class="q" data-q="' + i + '"><div class="qt">' + (i + 1) + '. ' + q.q + '</div>' +
      q.o.map((o, j) => '<button class="opt" data-j="' + j + '">' + o + '</button>').join('') + '<div class="qx"></div></div>').join('') +
    '<div id="qscore"></div>';
}
function bindQuiz(id, quiz) {
  const answered = {};
  document.querySelectorAll('.q').forEach(qe => {
    const i = +qe.dataset.q, q = quiz[i];
    qe.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (answered[i] !== undefined) return;
      const j = +b.dataset.j; answered[i] = j === q.a;
      if (typeof recordAnswer === 'function') recordAnswer(id + ':' + i, q.tp, j === q.a);
      qe.querySelectorAll('.opt').forEach(x => { if (+x.dataset.j === q.a) x.classList.add('right'); });
      if (j !== q.a) b.classList.add('wrong');
      const qx = qe.querySelector('.qx'); qx.innerHTML = (j === q.a ? '✅ <b>Correct.</b> ' : '❌ <b>Not quite.</b> ') + q.x; qx.classList.add('show');
      const done = Object.keys(answered).length;
      if (done === quiz.length) {
        const score = Object.values(answered).filter(Boolean).length;
        const best = Store.get('quiz.' + id, 0); if (score > best) Store.set('quiz.' + id, score);
        $('qscore').innerHTML = '<div class="rb"><div class="big">' + score + ' / ' + quiz.length + '</div><div class="rl">' +
          (score === quiz.length ? 'Perfect! You\'ve got this unit.' : score >= quiz.length * 0.75 ? 'Nice work. Review the explanations for the ones you missed.' : 'Go back over the lessons for the questions you missed, then try again.') +
          '</div><div class="br"><button class="btn bc" onclick="goPage(\'study\',\'' + id + '.quiz\')">Try again</button></div></div>';
      }
    });
  });
}
