/* Catalyst - Study Guide. Units follow the class syllabus order (Enriched Chemistry 2026-27, 1st semester).
   Second-semester units are typical Regents topics and are marked tentative until the syllabus/textbook confirms them.
   To add a lesson: add an entry to LESSONS keyed by unit id, with sections [{t, h}] and quiz [{q, o:[...], a, x}]. */
'use strict';
const UNITS = [
  { id: 'u1', t: 'Matter & Measurement', d: 'Classifying matter, physical vs. chemical changes, states of matter, SI units, significant figures, density and percent error.' },
  { id: 'u2', t: 'Atomic Structure', d: 'Protons, neutrons and electrons, isotopes, average atomic mass, the history of the atom, electron shells and excited states.' },
  { id: 'u3', t: 'Formulas & Equations', d: 'Ions, writing and naming compounds, balancing equations and types of reactions.' },
  { id: 'u4', t: 'Periodic Table', d: 'Groups and periods, metals vs. nonmetals, and trends in radius, electronegativity and ionization energy.' },
  { id: 'u5', t: 'Bonding', d: 'Ionic, covalent and metallic bonds, Lewis dot structures, molecular shape and polarity, intermolecular forces.' },
  { id: 'u6', t: 'Mathematics of Chemistry', d: 'The mole, molar mass, percent composition, empirical formulas and stoichiometry.' },
  { id: 'u7', t: 'Gas Laws', d: 'Kinetic molecular theory, pressure, and Boyle\'s, Charles\'s, Gay-Lussac\'s and the combined gas law.' },
  { id: 'mid', t: 'Midterm Review', d: 'Mixed practice across Units 1–7.' },
  { id: 'u8', t: 'Solutions', d: 'Solubility curves, molarity, ppm, and colligative properties.', s2: true },
  { id: 'u9', t: 'Kinetics & Equilibrium', d: 'Reaction rates, energy diagrams, and Le Chatelier\'s principle.', s2: true },
  { id: 'u10', t: 'Acids & Bases', d: 'Arrhenius theory, pH, indicators and neutralization/titration.', s2: true },
  { id: 'u11', t: 'Redox & Electrochemistry', d: 'Oxidation numbers, half-reactions, voltaic and electrolytic cells.', s2: true },
  { id: 'u12', t: 'Organic Chemistry', d: 'Hydrocarbons, functional groups and organic reactions.', s2: true },
  { id: 'u13', t: 'Nuclear Chemistry', d: 'Radioactive decay, half-life, fission and fusion.', s2: true }
];

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
      (has ? '' : ' <span class="badge">coming soon</span>') + '</h3><p>' + u.d + '</p>' + (has ? '<div class="prog"><i style="width:' + p + '%"></i></div><div class="rl" style="margin-top:3px">' + p + '% complete</div>' : '') + '</div></div>';
  };
  let n = 0;
  $('pg').innerHTML = '<div class="pt">Study Guide</div><div class="ps">Units follow your class syllabus, in the same order. Each unit has short lessons with diagrams, then a practice quiz with explanations.</div>' +
    '<div class="grp" style="color:var(--mu);padding-left:0">First semester</div>' + first.map(u => card(u, u.id === 'mid' ? 0 : ++n)).join('') +
    '<div class="grp" style="color:var(--mu);padding-left:0;margin-top:14px">Second semester (tentative - typical Regents topics)</div>' + second.map(u => card(u, ++n)).join('');
};

function renderLesson(arg) {
  const [id, secRaw] = String(arg).split('.');
  const unit = UNITS.find(u => u.id === id), L = LESSONS[id];
  if (!unit) return RENDER.study();
  if (!L) {
    $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'study\')">‹ All units</button><div class="pt" style="margin-top:12px">' + unit.t + '</div>' +
      '<div class="ps">' + unit.d + '</div><div class="card"><div class="cb" style="font-size:14px;line-height:1.6">This unit\'s lessons are coming soon. They will follow your textbook and class notes once those are added.' +
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
    '<div class="lnav">' + nav + '</div>' + body;
  if (sec === 'quiz') bindQuiz(id, L.quiz);
}

function renderQuiz(id, quiz) {
  const best = Store.get('quiz.' + id, null);
  return '<div class="ps">' + quiz.length + ' questions. Tap an answer to check it and see the explanation.' + (best ? ' Your best score: <b>' + best + '/' + quiz.length + '</b>.' : '') + '</div>' +
    quiz.map((q, i) => '<div class="q" data-q="' + i + '"><div class="qt">' + (i + 1) + '. ' + q.q + '</div>' +
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
