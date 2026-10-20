/* Catalyst - Test Prep: topic checklist, shuffled practice tests, topic drills, review of missed
   questions, and Regents-style clusters. Question sources: unit quizzes c1-c3 (keys "c1:3"),
   the practice bank in bank.js (keys "b:b01"), and clusters in js/clusters/*.js. */
'use strict';
const CLUSTERS = [];
PAGES.prep = { t: 'Test Prep', ic: '🎯' };
PAGES.clusters = { t: 'Regents Clusters', nav: 'prep' };
const TEST = { name: 'Unit test', date: '2026-10-22', label: 'Thursday, October 22' };
const TOPICS = [
  ['aem', 'Atoms, elements & molecules'], ['iso', 'Isotopes'], ['water', 'Properties of water (conductivity, solubility, surface tension)'],
  ['sub', 'Subatomic particles (protons, neutrons, electrons)'], ['ion', 'Ions & electrolytes'], ['name', 'Ionic formula naming & writing'],
  ['ionic', 'Ionic bonds'], ['bohr', 'Bohr diagrams'], ['lewis', 'Lewis dot diagrams'], ['pg', 'Periods & groups'],
  ['metal', 'Properties of metals & nonmetals'], ['pol', 'Polar & nonpolar covalent bonding'], ['snap', 'Symmetry & polarity of molecules (SNAP), partial charges'],
  ['imf', 'Intermolecular forces & boiling/melting points'], ['hb', 'Hydrogen bonding (F, O, N)'], ['mia', 'Molecule–ion attraction'],
  ['covl', 'Covalent Lewis dot diagrams & multiple bonds'], ['metb', 'Metallic bonding'], ['en', 'Electronegativity'],
  ['ie', 'Ionization energy'], ['rad', 'Atomic radius'], ['vsepr', 'VSEPR & molecular shapes']
];
const TOPIC_NAME = Object.fromEntries(TOPICS);

/* ---------- answer tracking (per device) ---------- */
function recordAnswer(key, tp, ok, noMiss) {
  const st = Store.get('tstat', {});
  (tp || []).forEach(t => { const r = st[t] || [0, 0]; r[1]++; if (ok) r[0]++; st[t] = r; });
  Store.set('tstat', st);
  if (noMiss || !key) return;
  const miss = Store.get('miss', {});
  if (ok) delete miss[key]; else miss[key] = Date.now();
  Store.set('miss', miss);
}
function practicePool() {
  const out = [];
  ['c1', 'c2', 'c3'].forEach(id => {
    const L = LESSONS[id], u = UNITS.find(x => x.id === id);
    if (L) L.quiz.forEach((q, i) => out.push(Object.assign({ k: id + ':' + i, from: u.t + ' quiz' }, q)));
  });
  if (typeof BANK !== 'undefined') BANK.forEach(q => out.push(Object.assign({ k: 'b:' + q.id, from: 'Test Prep bank' }, q)));
  return out;
}
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
/* shuffle answer choices, keeping track of the right one; leave "all/none of the above" style lists alone */
function shuffleOpts(q) {
  if (q.o.some(o => /of the above|both (a|b)|neither/i.test(o))) return q;
  const idx = shuffle(q.o.map((_, i) => i));
  return Object.assign({}, q, { o: idx.map(i => q.o[i]), a: idx.indexOf(q.a) });
}
function firstSection(tag) {
  for (const id of ['c1', 'c2', 'c3']) { const L = LESSONS[id]; if (!L) continue; const i = L.sections.findIndex(s => (s.tp || []).includes(tag)); if (i >= 0) return { id, i, t: L.sections[i].t }; }
  return null;
}
function daysToTest() { const t = new Date(TEST.date + 'T12:00:00'), n = new Date(); n.setHours(12, 0, 0, 0); return Math.round((t - n) / 864e5); }

/* ---------- Test Prep home ---------- */
RENDER.prep = function (arg) {
  if (arg) return renderPractice(arg);
  const pool = practicePool(), miss = Store.get('miss', {}), st = Store.get('tstat', {}), best = Store.get('ptbest', null);
  const nMiss = pool.filter(q => miss[q.k]).length, dd = daysToTest();
  const rated = TOPICS.map(([t]) => Store.get('rate.' + t, '')), got = rated.filter(r => r === 'got').length, shaky = rated.filter(r => r === 'shaky').length;
  const when = dd > 1 ? 'in ' + dd + ' days' : dd === 1 ? 'tomorrow' : dd === 0 ? 'today. You\'ve got this!' : '';
  const rows = TOPICS.map(([t, name]) => {
    const sec = firstSection(t), n = pool.filter(q => (q.tp || []).includes(t)).length, r = st[t], rate = Store.get('rate.' + t, '');
    return '<tr><td><b style="color:var(--nb)">' + name + '</b><div class="rl">' + (r ? r[0] + ' of ' + r[1] + ' answered right' : 'not practiced yet') + '</div>' +
      '<div class="tpbtns">' + (sec ? '<button class="chip" onclick="goPage(\'study\',\'' + sec.id + '.' + sec.i + '\')">📘 Lesson</button>' : '') +
      (n ? '<button class="chip" onclick="goPage(\'prep\',\'drill.' + t + '\')">✍️ Drill (' + n + ')</button>' : '') + '</div></td>' +
      '<td class="rate"><button class="rt' + (rate === 'got' ? ' on got' : '') + '" onclick="rateTopic(\'' + t + '\',\'got\')">✓ Got it</button><button class="rt' + (rate === 'shaky' ? ' on shaky' : '') + '" onclick="rateTopic(\'' + t + '\',\'shaky\')">? Shaky</button></td></tr>';
  }).join('');
  $('pg').innerHTML = '<div class="pt">Test Prep</div><div class="ps">' + TEST.name + (dd >= 0 ? ': <b>' + TEST.label + '</b>, ' + when : '') + '. Practice saves on this device. Everything here also works offline.</div>' +
    '<div class="grid" style="margin-bottom:14px">' +
    ptile('test', '🔀', 'Practice test', '20 questions pulled at random from ' + pool.length + ', with the answer choices shuffled. A new mix every time.' + (best ? ' Best: <b>' + best + '/20</b>.' : '')) +
    ptile('miss', '🔁', 'Review my misses', nMiss ? '<b>' + nMiss + '</b> question' + (nMiss > 1 ? 's' : '') + ' you got wrong. Get one right and it leaves the list.' : 'Nothing here yet. Questions you miss anywhere in Catalyst land here.') +
    '<button class="tile" onclick="goPage(\'clusters\')"><div class="ti">📰</div><h3>Regents-style clusters</h3><p>' + CLUSTERS.length + ' story-based question sets like the new exam, with model answers for the written questions.</p></button>' +
    (shaky ? ptile('shaky', '🎯', 'Drill my shaky topics', 'Questions only from the ' + shaky + ' topic' + (shaky > 1 ? 's' : '') + ' you marked Shaky.') : '') +
    '</div>' +
    '<div class="card"><div class="ch">Topics on the test <span class="rl" style="text-transform:none;letter-spacing:0">· ' + got + ' of ' + TOPICS.length + ' marked Got it</span></div><div class="cb">' +
    '<div class="hint" style="margin-bottom:8px">Rate yourself on each topic. Open the lesson to review it, or drill just that topic.</div>' +
    '<div class="tw"><table class="tbl tptbl">' + rows + '</table></div></div></div>';
  function ptile(m, ic, t, d) { return '<button class="tile" onclick="goPage(\'prep\',\'' + m + '\')"><div class="ti">' + ic + '</div><h3>' + t + '</h3><p>' + d + '</p></button>'; }
};
function rateTopic(t, v) { Store.set('rate.' + t, Store.get('rate.' + t, '') === v ? '' : v); const y = $('ct').scrollTop; RENDER.prep(); $('ct').scrollTop = y; }

/* ---------- practice sessions ---------- */
let PR = null;
function renderPractice(arg) {
  const pool = practicePool(), miss = Store.get('miss', {});
  let title, sub, items, mode = arg;
  if (arg === 'test') { title = 'Practice test'; sub = '20 random questions from every unit quiz and the Test Prep bank. Answer choices are shuffled.'; items = shuffle(pool).slice(0, 20); }
  else if (arg === 'miss') { title = 'Review my misses'; sub = 'Questions you got wrong. Get one right and it comes off the list.'; items = shuffle(pool.filter(q => miss[q.k])); }
  else if (arg === 'shaky') { const tags = TOPICS.map(t => t[0]).filter(t => Store.get('rate.' + t, '') === 'shaky'); title = 'Shaky topics drill'; sub = 'Only: ' + tags.map(t => TOPIC_NAME[t]).join(' · '); items = shuffle(pool.filter(q => (q.tp || []).some(t => tags.includes(t)))); }
  else if (/^drill\./.test(arg)) { const t = arg.slice(6); title = 'Drill: ' + (TOPIC_NAME[t] || t); sub = 'Every practice question on this topic, in a new order.'; items = shuffle(pool.filter(q => (q.tp || []).includes(t))); mode = 'drill'; }
  else return RENDER.prep();
  PR = { mode, arg, items: items.map(shuffleOpts), answered: {} };
  const empty = !items.length ? '<div class="card"><div class="cb">' + (arg === 'miss' ? 'No missed questions right now. Take a practice test, and any you miss will show up here.' : 'No questions here yet.') + '</div></div>' : '';
  $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'prep\')">‹ Test Prep</button><div class="pt" style="margin-top:12px">' + title + '</div><div class="ps">' + esc(sub) + (items.length ? ' ' + items.length + ' question' + (items.length > 1 ? 's' : '') + '.' : '') + '</div>' + empty +
    PR.items.map((q, i) => (q.ctx ? '<div class="ctx">' + q.ctx + '</div>' : '') + '<div class="q" data-q="' + i + '"><div class="qt">' + (i + 1) + '. ' + q.q + '</div>' +
      q.o.map((o, j) => '<button class="opt" data-j="' + j + '">' + o + '</button>').join('') + '<div class="qx"></div><div class="qsrc">' + (q.tp || []).map(t => TOPIC_NAME[t]).filter(Boolean).join(' · ') + ' · ' + q.from + '</div></div>').join('') +
    '<div id="qscore"></div>';
  wrapTables($('pg'));
  document.querySelectorAll('.q').forEach(qe => {
    const i = +qe.dataset.q, q = PR.items[i];
    qe.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (PR.answered[i] !== undefined) return;
      const j = +b.dataset.j, ok = j === q.a; PR.answered[i] = ok;
      recordAnswer(q.k, q.tp, ok);
      qe.querySelectorAll('.opt').forEach(x => { if (+x.dataset.j === q.a) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      const qx = qe.querySelector('.qx'); qx.innerHTML = (ok ? '✅ <b>Correct.</b> ' : '❌ <b>Not quite.</b> ') + q.x; qx.classList.add('show');
      if (Object.keys(PR.answered).length === PR.items.length) {
        const score = Object.values(PR.answered).filter(Boolean).length, tot = PR.items.length;
        if (PR.mode === 'test' && score > Store.get('ptbest', 0)) Store.set('ptbest', score);
        const weak = {}; PR.items.forEach((x, k) => { if (!PR.answered[k]) (x.tp || []).forEach(t => weak[t] = (weak[t] || 0) + 1); });
        const wk = Object.keys(weak).sort((a, b) => weak[b] - weak[a]).slice(0, 4);
        $('qscore').innerHTML = '<div class="rb"><div class="big">' + score + ' / ' + tot + '</div><div class="rl">' +
          (score === tot ? 'Perfect!' : score >= tot * 0.8 ? 'Strong work. Look over the explanations for the ones you missed.' : score >= tot * 0.6 ? 'Getting there. The topics below are worth another look.' : 'Review the lessons for the topics below, then try again.') + '</div>' +
          (wk.length ? '<div style="margin-top:8px">' + wk.map(t => { const s = firstSection(t); return '<button class="chip" onclick="goPage(\'' + (s ? 'study\',\'' + s.id + '.' + s.i : 'prep') + '\')">📘 ' + TOPIC_NAME[t] + '</button>'; }).join('') + '</div>' : '') +
          '<div class="br"><button class="btn bc" onclick="goPage(\'prep\',\'' + PR.arg + '\')">' + (PR.mode === 'test' ? 'New practice test' : 'Again, in a new order') + '</button><button class="btn bs" onclick="goPage(\'prep\')">Back to Test Prep</button></div></div>';
      }
    });
  });
}

/* ---------- Regents-style clusters ---------- */
RENDER.clusters = function (arg) {
  if (arg) return renderCluster(arg);
  $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'prep\')">‹ Test Prep</button><div class="pt" style="margin-top:12px">Regents-style clusters</div>' +
    '<div class="ps">The new Regents is built from clusters: a short real-world story with figures and data, followed by about six questions. Some are multiple choice; others ask you to make a claim with evidence, support or refute a claim, or draw a model. Do the written ones on paper, then compare with the model answer.</div>' +
    CLUSTERS.map(c => { const b = Store.get('cl.' + c.id, null); return '<div class="unit" onclick="goPage(\'clusters\',\'' + c.id + '\')"><div class="unum">📰</div><div style="flex:1"><h3>' + c.t + (c.src ? ' <span class="badge" style="background:#ECE7FB;color:#4C2A9E">' + c.src + '</span>' : '') + '</h3><p>' + c.sub + ' · ' + c.items.length + ' questions</p>' +
      '<div class="pes">' + peChips(c.pe) + '</div>' + (b !== null ? '<div class="rl" style="margin-top:4px">Best: ' + b + '/' + c.items.length + '</div>' : '') + '</div></div>'; }).join('');
};
let CL = null;
function renderCluster(id) {
  const c = CLUSTERS.find(x => x.id === id); if (!c) return RENDER.clusters();
  CL = { c, done: {} };
  const N = c.items.length;
  const body = c.items.map((it, i) => {
    let h = (it.ctx ? '<div class="ctx">' + it.ctx + '</div>' : '') + '<div class="q cq" data-i="' + i + '"><div class="qt">' + (i + 1) + '. ' + it.q + '</div>';
    if (it.type === 'mc') h += it.o.map((o, j) => '<button class="opt" data-j="' + j + '">' + o + '</button>').join('');
    else if (it.type === 'row') h += '<div class="tw"><table class="tbl rowpick"><tr>' + it.cols.map(x => '<th>' + x + '</th>').join('') + '</tr>' + it.rows.map((r, j) => '<tr data-j="' + j + '">' + r.map(x => '<td>' + x + '</td>').join('') + '</tr>').join('') + '</table></div><div class="hint">Tap a row to choose it.</div>';
    else {
      if (it.type === 'sr') h += '<div class="srb"><button class="opt sr" data-v="support">☐ Support</button><button class="opt sr" data-v="refute">☐ Refute</button></div>';
      if (it.type === 'draw') h += '<div class="hint">✏️ Draw this on paper or in your notebook first, then check it against the model.</div>';
      else h += '<textarea class="cta" rows="4" placeholder="Write your answer here (saved on this device), or on paper."></textarea>';
      h += '<button class="btn bt reveal">Show model answer</button><div class="model" hidden><div class="mh">Model answer</div>' + it.model +
        '<div class="mh" style="margin-top:10px">Check your answer</div>' + it.rubric.map(r => '<label class="rub"><input type="checkbox"> ' + r + '</label>').join('') +
        '<div class="earn">Did your answer earn the point? <button class="btn bc" data-e="1">Yes</button> <button class="btn bs" data-e="0">Not yet</button></div></div>';
    }
    return h + '<div class="qx"></div><div class="qsrc">' + (it.pe ? it.pe + ' · ' : '') + (it.tp || []).map(t => TOPIC_NAME[t]).filter(Boolean).join(' · ') + '</div></div>';
  }).join('');
  $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'clusters\')">‹ All clusters</button><div class="pt" style="margin-top:12px">' + c.t + '</div><div class="ps">' + c.sub + (c.src ? ' · ' + c.src : '') + '</div>' +
    '<div class="pes" style="margin:-8px 0 10px">' + peChips(c.pe) + '</div>' +
    '<p class="clhead">Base your answers to questions 1 through ' + N + ' on the information below, on your knowledge of chemistry, and on the 2025 Reference Tables for Physical Science: Chemistry.</p>' +
    '<div class="ctx">' + c.intro + '</div>' + body + '<div id="qscore"></div>';
  wrapTables($('pg'));
  document.querySelectorAll('.cq').forEach(qe => {
    const i = +qe.dataset.i, it = c.items[i], qx = qe.querySelector('.qx');
    const finish = ok => { CL.done[i] = ok; recordAnswer(null, it.tp, ok, true); clusterScore(); };
    if (it.type === 'mc') qe.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (CL.done[i] !== undefined) return; const j = +b.dataset.j, ok = j === it.a;
      qe.querySelectorAll('.opt').forEach(x => { if (+x.dataset.j === it.a) x.classList.add('right'); }); if (!ok) b.classList.add('wrong');
      qx.innerHTML = (ok ? '✅ <b>Correct.</b> ' : '❌ <b>Not quite.</b> ') + it.x; qx.classList.add('show'); finish(ok);
    });
    else if (it.type === 'row') qe.querySelectorAll('tr[data-j]').forEach(tr => tr.onclick = () => {
      if (CL.done[i] !== undefined) return; const j = +tr.dataset.j, ok = j === it.a;
      qe.querySelector('tr[data-j="' + it.a + '"]').classList.add('right'); if (!ok) tr.classList.add('wrong');
      qx.innerHTML = (ok ? '✅ <b>Correct.</b> ' : '❌ <b>Not quite.</b> ') + it.x; qx.classList.add('show'); finish(ok);
    });
    else {
      const ta = qe.querySelector('.cta'), key = 'cld.' + c.id + '.' + i;
      if (ta) { ta.value = Store.get(key, ''); ta.oninput = () => Store.set(key, ta.value); }
      let pick = null;
      qe.querySelectorAll('.sr').forEach(b => b.onclick = () => { pick = b.dataset.v; qe.querySelectorAll('.sr').forEach(x => { x.classList.toggle('on', x === b); x.textContent = (x === b ? '☑ ' : '☐ ') + (x.dataset.v === 'support' ? 'Support' : 'Refute'); }); });
      qe.querySelector('.reveal').onclick = e => {
        e.target.hidden = true; qe.querySelector('.model').hidden = false;
        if (it.type === 'sr') { const right = qe.querySelector('.sr[data-v="' + it.a + '"]'); right.classList.add('right'); if (pick && pick !== it.a) qe.querySelector('.sr[data-v="' + pick + '"]').classList.add('wrong');
          qx.innerHTML = 'The evidence <b>' + (it.a === 'support' ? 'supports' : 'refutes') + '</b> the claim.' + (pick ? (pick === it.a ? ' You chose correctly.' : ' You chose ' + pick + '.') : ''); qx.classList.add('show'); }
      };
      qe.querySelectorAll('.earn button').forEach(b => b.onclick = () => {
        if (CL.done[i] !== undefined) return; const ok = b.dataset.e === '1';
        qe.querySelector('.earn').innerHTML = ok ? '✅ <b>Point earned.</b>' : '📌 <b>Not yet.</b> Reread the model answer, then try writing it again in your own words.'; finish(ok);
      });
    }
  });
}
function clusterScore() {
  const c = CL.c, N = c.items.length, d = Object.keys(CL.done).length; if (d < N) return;
  const s = Object.values(CL.done).filter(Boolean).length;
  if (s > Store.get('cl.' + c.id, -1)) Store.set('cl.' + c.id, s);
  const i = CLUSTERS.indexOf(c), next = CLUSTERS[i + 1];
  $('qscore').innerHTML = '<div class="rb"><div class="big">' + s + ' / ' + N + '</div><div class="rl">' + (s === N ? 'Full credit on this cluster!' : 'Look back at the questions you missed and the model answers.') + '</div>' +
    '<div class="br"><button class="btn bc" onclick="RENDER.clusters(\'' + c.id + '\');$(\'ct\').scrollTop=0">Try again</button>' + (next ? '<button class="btn bs" onclick="goPage(\'clusters\',\'' + next.id + '\')">Next cluster: ' + next.t + ' ›</button>' : '') + '</div></div>';
}
