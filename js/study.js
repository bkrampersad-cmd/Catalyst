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
const UNITS = [
  { id: 'u1', t: 'Matter & Measurement', d: 'Classifying matter, physical vs. chemical changes, states of matter and heat, metric units, significant figures, density and percent error.', pe: ['HS-PS1-3', 'HS-PS3-1'] },
  { id: 'u2', t: 'Atomic Structure', d: 'Models of the atom, protons, neutrons and electrons, isotopes, average atomic mass, electron shells, excited states and the electromagnetic spectrum.', pe: ['HS-PS1-1', 'HS-PS4-4'] },
  { id: 'u3', t: 'Formulas & Equations', d: 'Ions, writing and naming compounds, balancing equations (conservation of atoms) and types of reactions.', pe: ['HS-PS1-2', 'HS-PS1-7'] },
  { id: 'u4', t: 'Periodic Table', d: 'Groups and periods, metals vs. nonmetals, periodic trends and the Coulombic attraction behind them.', pe: ['HS-PS1-1', 'HS-PS1-2', 'HS-PS3-5'] },
  { id: 'u5', t: 'Bonding', d: 'Ionic, covalent and metallic bonds, Lewis structures, shape and polarity, intermolecular forces and bulk properties.', pe: ['HS-PS1-3', 'HS-PS1-4', 'HS-PS2-6', 'HS-PS3-5'] },
  { id: 'u6', t: 'Mathematics of Chemistry', d: 'The mole, molar mass, percent composition, empirical formulas and stoichiometry.', pe: ['HS-PS1-7'] },
  { id: 'u7', t: 'Gas Laws', d: 'Kinetic molecular theory, pressure, and Boyle\'s, Charles\'s, Gay-Lussac\'s and the combined gas law.', pe: ['HS-PS1-9'] },
  { id: 'mid', t: 'Midterm Review', d: 'Formula sheet, big ideas, and mixed practice across Units 1\u20137, including a storyline question set like the new Regents.', pe: [] },
  { id: 'u8', t: 'Solutions', d: 'Solubility, molarity (n = MV), ppm, and how dissolved particles change a solution\'s properties.', s2: true, pe: ['HS-PS1-10'] },
  { id: 'u9', t: 'Reaction Rates & Equilibrium', d: 'Collision theory, factors that change reaction rate, equilibrium and Le Chatelier\'s principle.', s2: true, pe: ['HS-PS1-5', 'HS-PS1-6'] },
  { id: 'u10', t: 'Acids & Bases', d: 'Properties of acids and bases, pH, indicators, neutralization and titration.', s2: true, pe: ['HS-PS1-11'] },
  { id: 'u11', t: 'Redox & Electrochemistry', d: 'Oxidation and reduction, electron transfer, and electrochemical cells.', s2: true, pe: ['HS-PS1-12'] },
  { id: 'u12', t: 'Energy in Reactions & Living Systems', d: 'Bond energy, endothermic vs. exothermic reactions, energy diagrams, photosynthesis and cellular respiration.', s2: true, pe: ['HS-PS1-4', 'HS-PS3-1', 'HS-LS1-5'] },
  { id: 'u13', t: 'Nuclear Chemistry', d: 'Radioactive decay, nuclear equations, half-life, fission and fusion.', s2: true, pe: ['HS-PS1-8'] }
];
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
  const first = UNITS.filter(u => !u.s2), second = UNITS.filter(u => u.s2);
  const card = (u, i) => {
    const has = !!LESSONS[u.id], p = unitProgress(u.id);
    return '<div class="unit' + (has ? '' : ' locked') + '" onclick="goPage(\'study\',\'' + u.id + '\')"><div class="unum">' + (u.id === 'mid' ? '★' : i) + '</div><div style="flex:1"><h3>' + u.t +
      (has ? '' : ' <span class="badge">coming soon</span>') + '</h3><p>' + u.d + '</p>' + (u.pe && u.pe.length ? '<div class="pes">' + peChips(u.pe) + '</div>' : '') + (has ? '<div class="prog"><i style="width:' + p + '%"></i></div><div class="rl" style="margin-top:3px">' + p + '% complete</div>' : '') + '</div></div>';
  };
  let n = 0;
  $('pg').innerHTML = '<div class="pt">Study Guide</div><div class="ps">Units follow your class syllabus, in the same order. Each unit has short lessons with diagrams, then a practice quiz with explanations. The tags (like HS-PS1-1) are the NYS Performance Expectations each unit covers.</div>' +
    '<button class="tile" style="width:100%;margin-bottom:14px;display:flex;gap:14px;align-items:center" onclick="goPage(\'regents\')"><div class="ti">\uD83C\uDF93</div><div><h3 style="margin:0 0 2px">The new Regents: Physical Science: Chemistry</h3><p>How the exam works, the six topic areas and their weights, the 2025 Reference Tables, and which Catalyst units cover each one.</p></div></button>' +
    '<div class="grp" style="color:var(--mu);padding-left:0">First semester</div>' + first.map(u => card(u, u.id === 'mid' ? 0 : ++n)).join('') +
    '<div class="grp" style="color:var(--mu);padding-left:0;margin-top:14px">Second semester (tentative, organized by the remaining Performance Expectations)</div>' + second.map(u => card(u, ++n)).join('');
};

function renderLesson(arg) {
  const [id, secRaw] = String(arg).split('.');
  const unit = UNITS.find(u => u.id === id), L = LESSONS[id];
  if (!unit) return RENDER.study();
  if (!L) {
    $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'study\')">‹ All units</button><div class="pt" style="margin-top:12px">' + unit.t + '</div>' +
      '<div class="ps">' + unit.d + '</div><div class="card"><div class="cb" style="font-size:14px;line-height:1.6">This unit\'s lessons are coming soon. They will follow your class notes and packets once those are added.' +
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
    (unit.pe && unit.pe.length ? '<div class="pes" style="margin:-8px 0 12px">' + peChips(unit.pe) + '</div>' : '') +
    '<div class="lnav">' + nav + '</div>' + body;
  if (sec === 'quiz') bindQuiz(id, L.quiz);
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
