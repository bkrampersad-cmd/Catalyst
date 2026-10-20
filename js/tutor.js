/* Catalyst - Photo Tutor (#tutor). Free and private.
   1. The camera runs INSIDE the app (getUserMedia), so photos never go to the camera app or the photo
      library. The picture lives only in memory and is discarded on "Start over" or when leaving the page.
   2. Tesseract.js (vendor/tesseract, Apache-2.0) reads the text on the device; nothing is uploaded.
   3. analyzeProblem() finds formulas, equations, isotopes/ions, element pairs and keywords, then Catalyst
      answers hint-first: the key idea from the best-matching lesson, then the lesson, then calculators
      prefilled with the problem's numbers, then similar practice questions.
   4. Optional: "Ask Google Lens" hands a copy of the photo to the phone's share menu (Lens shows answers
      right away, so it sits last, behind the hint and tools). */
'use strict';
PAGES.tutor = { t: 'Photo Tutor', ic: '📷' };
const TUT = { stream: null, canvas: null, worker: null, text: '', busy: false };
const VENDOR = p => new URL('vendor/tesseract/' + p, location.href).href;

RENDER.tutor = function () {
  tutorStopCamera();
  TUT.canvas = null; TUT.text = '';
  $('pg').innerHTML = '<div class="pt">Photo Tutor</div>' +
    '<div class="ps">Snap a problem from a worksheet or the screen. Catalyst reads it, gives you a hint first, then points you to the lesson and opens the right calculator with your numbers.</div>' +
    '<div class="card"><div class="cb">' +
    '<div class="br" style="margin-top:0"><button class="btn bc" id="tcam">📷 Take a photo</button><button class="btn bs" id="tpick">🖼️ Choose a photo</button><button class="btn bs" id="ttype">⌨️ Type it instead</button></div>' +
    '<input type="file" id="tfile" accept="image/*" hidden>' +
    '<div id="tcamwrap" hidden><video id="tvid" playsinline autoplay muted></video><div class="br"><button class="btn bc" id="tsnap">Snap</button><button class="btn bs" id="tcancel">Cancel</button></div></div>' +
    '<div id="tstage"></div>' +
    '<div class="hint" style="margin-top:10px">🔒 <b>Private:</b> the camera runs inside Catalyst, so pictures are <b>not saved to your photo library</b>. The picture stays in memory only and is erased when you tap Start over or leave this page. Reading the text happens on your device; nothing is uploaded. ' +
    'Works best with <b>printed</b> problems: good light, one question at a time, held flat. Handwriting is hard to read. The first time, Catalyst downloads its reader (about 7 MB); after that it also works offline. You can also paste a screenshot (Ctrl+V).</div>' +
    '</div></div><div id="tout"></div>';
  $('tcam').onclick = tutorStartCamera;
  $('tpick').onclick = () => $('tfile').click();
  $('tfile').onchange = e => { const f = e.target.files[0]; e.target.value = ''; if (f) tutorLoadFile(f); };
  $('ttype').onclick = () => tutorShowText('');
  $('tsnap').onclick = tutorSnap;
  $('tcancel').onclick = () => { tutorStopCamera(); $('tcamwrap').hidden = true; };
};
/* paste a screenshot anywhere on the Photo Tutor page */
document.addEventListener('paste', e => {
  if (!location.hash.startsWith('#tutor') || /INPUT|TEXTAREA/.test((document.activeElement || {}).tagName || '')) return;
  const it = [...(e.clipboardData || {}).items || []].find(i => i.type.startsWith('image/'));
  if (it) { e.preventDefault(); tutorLoadFile(it.getAsFile()); }
});
window.addEventListener('hashchange', () => { if (!location.hash.startsWith('#tutor')) { tutorStopCamera(); TUT.canvas = null; TUT.text = ''; } });

async function tutorStartCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { $('tstage').innerHTML = '<div class="err">This browser can\'t open the camera inside the app. Use "Choose a photo" instead.</div>'; return; }
  try {
    TUT.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
    $('tvid').srcObject = TUT.stream; $('tcamwrap').hidden = false; $('tstage').innerHTML = '';
  } catch (e) {
    $('tstage').innerHTML = '<div class="err">Catalyst couldn\'t open the camera' + (e && e.name === 'NotAllowedError' ? ' because camera permission was turned off. Allow the camera for this site in your browser settings, or' : '. You can') + ' use "Choose a photo" instead.</div>';
  }
}
function tutorStopCamera() { if (TUT.stream) { TUT.stream.getTracks().forEach(t => t.stop()); TUT.stream = null; } }
function tutorSnap() {
  const v = $('tvid'); if (!v || !v.videoWidth) return;
  const c = document.createElement('canvas'); c.width = v.videoWidth; c.height = v.videoHeight; c.getContext('2d').drawImage(v, 0, 0);
  tutorStopCamera(); $('tcamwrap').hidden = true; tutorUseCanvas(c);
}
function tutorLoadFile(f) {
  const url = URL.createObjectURL(f), img = new Image();
  img.onload = () => { const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight; c.getContext('2d').drawImage(img, 0, 0); URL.revokeObjectURL(url); tutorUseCanvas(c); };
  img.onerror = () => { URL.revokeObjectURL(url); $('tstage').innerHTML = '<div class="err">That file couldn\'t be opened as a picture.</div>'; };
  img.src = url;
}
/* scale to at most 2000 px on the long side, grayscale and stretch the contrast for the reader */
function tutorPrep(src) {
  const k = Math.min(1, 2000 / Math.max(src.width, src.height)), c = document.createElement('canvas');
  c.width = Math.round(src.width * k); c.height = Math.round(src.height * k);
  const x = c.getContext('2d'); x.drawImage(src, 0, 0, c.width, c.height);
  const d = x.getImageData(0, 0, c.width, c.height), p = d.data; let lo = 255, hi = 0;
  for (let i = 0; i < p.length; i += 4) { const g = 0.299 * p[i] + 0.587 * p[i + 1] + 0.114 * p[i + 2]; p[i] = g; if (g < lo) lo = g; if (g > hi) hi = g; }
  const r = hi - lo > 20 ? 255 / (hi - lo) : 1;
  for (let i = 0; i < p.length; i += 4) { const g = Math.max(0, Math.min(255, (p[i] - lo) * r)); p[i] = p[i + 1] = p[i + 2] = g; }
  x.putImageData(d, 0, 0); return c;
}
function tutorRotate() {
  const s = TUT.canvas, c = document.createElement('canvas'); c.width = s.height; c.height = s.width;
  const x = c.getContext('2d'); x.translate(c.width / 2, c.height / 2); x.rotate(Math.PI / 2); x.drawImage(s, -s.width / 2, -s.height / 2);
  tutorUseCanvas(c);
}
function tutorUseCanvas(c) {
  TUT.canvas = c; $('tout').innerHTML = '';
  $('tstage').innerHTML = '<div class="tprev"><img id="timg" alt="Your photo"></div>' +
    '<div class="br"><button class="btn bc" id="tread">Read this problem</button><button class="btn bs" id="trot">↻ Rotate</button><button class="btn bs" id="tclear">Start over</button></div><div id="tprog"></div>';
  $('timg').src = c.toDataURL('image/jpeg', 0.85);
  $('tread').onclick = tutorRead; $('trot').onclick = tutorRotate; $('tclear').onclick = () => RENDER.tutor();
}
function loadScript(src) { return new Promise((ok, no) => { if (window.Tesseract) return ok(); const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); }); }
async function tutorRead() {
  if (TUT.busy || !TUT.canvas) return; TUT.busy = true;
  const prog = (t, f) => { $('tprog').innerHTML = '<div class="rl" style="margin-top:8px">' + t + '</div>' + (f !== undefined ? '<div class="prog"><i style="width:' + Math.round(f * 100) + '%"></i></div>' : ''); };
  try {
    prog('Getting the reader ready…');
    await loadScript(VENDOR('tesseract.min.js'));
    if (!TUT.worker) TUT.worker = await Tesseract.createWorker('eng', 1, {
      workerPath: VENDOR('worker.min.js'), corePath: VENDOR(''), langPath: VENDOR('lang'), workerBlobURL: false,
      logger: m => { if (m.status === 'recognizing text') prog('Reading the problem…', m.progress); else if (/load/.test(m.status)) prog('Getting the reader ready (first time only)…', m.progress); }
    });
    prog('Reading the problem…', 0);
    const { data } = await TUT.worker.recognize(tutorPrep(TUT.canvas));
    $('tprog').innerHTML = '';
    tutorShowText(cleanOCR(data.text || ''), data.confidence);
  } catch (e) {
    $('tprog').innerHTML = '<div class="err">Catalyst couldn\'t read the picture' + (navigator.onLine ? '' : ' (the reader needs one download while online the first time)') + '. You can type the problem instead.</div>';
    if (window.console) console.warn('Photo Tutor OCR failed', e);
  } finally { TUT.busy = false; }
}
/* common OCR slips in chemistry text: H20 -> H2O, C02 -> CO2, AI2O3 / A12O3 -> Al2O3, C1 -> Cl */
function fixToken(w) {
  if (!/[A-Z]/.test(w) || !/[0-9]|[A-Z].*[A-Z]/.test(w) || /^[A-Z][a-z]+$/.test(w)) return w;
  const ok = x => { try { return Object.keys(Chem.parseFormula(x)).length > 0; } catch (e) { return false; } };
  let v = w.replace(/([A-Za-z2-9)])0/g, '$1O').replace(/^0/, 'O');
  if (ok(v) && (v !== w || ok(w))) w = v;
  if (!ok(w)) { const v2 = w.replace(/([ABCGMNPSTZ])[I1](?=[A-Z0-9(]|$)/g, '$1l'); if (ok(v2)) w = v2; }
  // a subscript 1 is never written, and "CI" in school chemistry is almost always Cl: HC1, NaCI, CaCI2 -> HCl, NaCl, CaCl2
  const v3 = w.replace(/([AC])1(?![0-9])/g, '$1l').replace(/CI(?![0-9]*[a-z])/g, 'Cl');
  if (v3 !== w && ok(v3)) w = v3;
  return w;
}
function cleanOCR(t) {
  return String(t).replace(/[‐‑‒–—−]/g, '-').replace(/[“”]/g, '"').replace(/[‘’]/g, "'").replace(/[ \t]+/g, ' ')
    .replace(/\b[A-Z][A-Za-z0-9()]*\b/g, fixToken)
    .replace(/\s*-\s*>\s*/g, ' -> ').replace(/\n{3,}/g, '\n\n').trim();
}
function tutorShowText(text, conf) {
  TUT.text = text;
  $('tout').innerHTML = '<div class="card"><div class="ch">' + (TUT.canvas ? 'What Catalyst read' : 'Type or paste the problem') + '</div><div class="cb">' +
    (TUT.canvas ? '<div class="hint" style="margin-top:0">Check it and fix anything that was read wrong (formulas especially: H2O, CO2, Mg2+), then tap Find help.' + (conf !== undefined && conf < 60 ? ' <b>The photo was hard to read.</b> Try a closer, brighter photo of one question.' : '') + '</div>' : '') +
    '<textarea class="cta" id="ttext" rows="6" placeholder="e.g. How many neutrons are in an atom of chlorine-37?">' + esc(text) + '</textarea>' +
    '<div class="br" style="margin-top:0"><button class="btn bc" id="thelp">Find help</button></div></div></div><div id="thelpout"></div>';
  $('thelp').onclick = () => { TUT.text = $('ttext').value; tutorHelp(TUT.text); };
  if (text.trim()) tutorHelp(text);
}

/* ---------- understanding the problem ---------- */
const NOT_FORMULA = new Set(['I', 'A', 'In', 'No', 'At', 'He', 'Be', 'As', 'Am', 'Os', 'Ho', 'Po', 'S', 'B', 'C', 'N', 'O', 'P', 'K', 'V', 'U', 'Y', 'W', 'H', 'F']);
function tryFormula(w) { try { const c = Chem.parseFormula(w); return Object.keys(c).length ? c : null; } catch (e) { return null; } }
function analyzeProblem(text) {
  const t = String(text), low = t.toLowerCase(), out = { formulas: [], equation: null, particle: null, pair: null, calcs: [], numbers: [] };
  // balanced-equation candidates: formulas joined by + on both sides of an arrow
  const F = '(?:\\d+\\s*)?[A-Z][A-Za-z0-9()]*';
  const em = t.match(new RegExp('(' + F + '(?:\\s*\\+\\s*' + F + ')*)\\s*(?:->|→|⟶|=|yields|produces)\\s*(' + F + '(?:\\s*\\+\\s*' + F + ')*)'));
  if (em) { const eq = em[1].trim() + ' -> ' + em[2].trim(); try { Chem.balance(eq); out.equation = eq; } catch (e) { /* not a real equation */ } }
  // formulas: two or more element symbols, or a symbol with a subscript (H2O, NaCl, CO2, Ca(OH)2)
  (t.match(/\b[A-Z][A-Za-z0-9()]*\b/g) || []).forEach(w => {
    if (NOT_FORMULA.has(w) || out.formulas.includes(w) || /^[A-Z][a-z]+$/.test(w) && w.length > 2) return;
    const c = tryFormula(w); if (!c) return;
    const nEl = Object.keys(c).length;
    if (nEl >= 2 || /\d/.test(w)) out.formulas.push(w);
  });
  // isotope or ion for particle counting: chlorine-37, Cl-35, carbon 14, Mg2+, S2-, Na+, Cl-
  const iso = t.match(/\b([A-Z][a-z]?|[a-z]{3,})[- ](\d{1,3})\b/g) || [];
  for (const m of iso) { const [, s, a] = m.match(/([A-Za-z]+)[- ](\d+)/); const e = findEl(s); if (e && +a >= e.z && +a <= 3 * e.z + 10) { out.particle = { el: e, A: +a, q: '' }; break; } }
  const m1 = t.match(/\b([A-Z][a-z]?)\^?(\d?)([+-])(?![\w>])/), m2 = m1 ? null : t.match(/\b([A-Z][a-z]?)([+-])(\d)\b/);
  if (m1 || m2) {
    const sym = (m1 || m2)[1], n = m1 ? m1[2] : m2[3], sign = m1 ? m1[3] : m2[2], q = (n && n !== '1' ? n : '') + sign, e = findEl(sym);
    if (e) { if (!out.particle) out.particle = { el: e, A: '', q }; else if (out.particle.el === e) out.particle.q = q; }
  }
  if (!out.particle) { const e = ELEMENTS.find(x => new RegExp('\\b' + x.n + '\\b', 'i').test(t)); if (e) out.particle = { el: e, A: '', q: '' }; }
  // a bond between two elements: H-Cl, "between carbon and oxygen", or a two-element formula
  const bm = t.match(/\b([A-Z][a-z]?)\s*[-–—]\s*([A-Z][a-z]?)\b/);
  if (bm && findEl(bm[1]) && findEl(bm[2]) && bm[1] !== bm[2]) out.pair = [bm[1], bm[2]];
  if (!out.pair) { const nm = low.match(/between (?:an? )?(?:atoms? of )?([a-z]+) and (?:an? )?([a-z]+)/); if (nm && findEl(nm[1]) && findEl(nm[2])) out.pair = [findEl(nm[1]).s, findEl(nm[2]).s]; }
  if (!out.pair) { const two = out.formulas.map(tryFormula).find(c => c && Object.keys(c).length === 2); if (two) out.pair = Object.keys(two); }
  out.numbers = (t.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  // which calculators help
  const add = (i, pre, why) => { if (!out.calcs.some(c => c.i === i)) out.calcs.push({ i, pre, why }); };
  const has = re => re.test(low);
  if (out.equation && has(/balanc|coefficient|equation/)) add(1, out.equation, 'Balance the equation and check the atom counts');
  if (has(/proton|neutron|electron|isotope|\bion\b|charge|bohr|lewis|dot diagram|valence/) && out.particle) add(11, out.particle.el.s + ',' + out.particle.A + ',' + out.particle.q, 'Count the particles and see the Bohr and Lewis dot diagrams');
  if (has(/polar|electronegativ|δ|delta e|bond type|ionic or covalent|covalent or ionic|dipole/) && out.pair) add(10, out.pair.join(','), 'Find the difference in electronegativity and the bond type');
  const mmOf = t.match(/(?:molar mass|gram formula mass|grams|moles|mass) of\s+(?:an?\s+)?([A-Z][A-Za-z0-9()]*)/);
  const mmF = mmOf && out.formulas.includes(mmOf[1]) ? mmOf[1] : out.formulas[out.formulas.length - 1];
  if (has(/molar mass|gram formula mass|grams? of|moles? of|how many moles|how many grams|percent composition|mol\b/) && out.formulas.length) add(0, mmF, 'Find the molar mass and convert grams, moles and particles');
  if (has(/average atomic mass|abundance|weighted average/)) add(6, '', 'Work out a weighted average from the isotopes');
  if (has(/\bph\b|\bpoh\b|hydronium|hydroxide ion concentration|\[h\+?\]/)) add(4, '', 'Convert between pH, pOH, [H⁺] and [OH⁻]');
  if (has(/molarity|\bmol\/l|dilut|parts per million|\bppm\b|concentration/)) add(3, '', 'Solve molarity, dilution or ppm');
  if (has(/kpa|\batm\b|mmhg|pressure|gas law|\bstp\b|volume of (?:the|a) gas/)) add(2, '', 'Solve with the combined or ideal gas law');
  if (has(/significant fig|sig fig|percent error|density|g\/cm|g\/ml/)) add(5, '', 'Sig figs, percent error or density');
  if (has(/specific heat|joules|\bj\b|heat of fusion|heat of vaporization|temperature change|q\s*=\s*m/)) add(9, '', 'Heat: q = mCΔT, q = mHf, q = mHv');
  if (has(/empirical|molecular formula/)) add(7, '', 'Find the empirical (and molecular) formula');
  if (has(/limiting|percent yield|theoretical yield|how many (?:grams|moles) of .* (?:produced|formed|needed|react)/)) add(8, out.equation || '', 'Stoichiometry across a balanced equation');
  if (out.equation && !out.calcs.some(c => c.i === 1)) add(1, out.equation, 'Balance this equation');
  return out;
}
/* the first key idea of a lesson section, used as the hint */
function keyIdea(href) {
  const m = href.match(/#study\/(\w+)\.(\d+)/); if (!m || !LESSONS[m[1]]) return '';
  const h = LESSONS[m[1]].sections[+m[2]].h, k = h.match(/<div class="(?:key|tip)">([\s\S]*?)<\/div>/);
  return k ? k[1] : '';
}
function tutorHelp(text) {
  const box = $('thelpout'); if (!text.trim()) { box.innerHTML = ''; return; }
  text = cleanOCR(text);
  const a = analyzeProblem(text), r = runSearch(text);
  const lessons = r.results.filter(x => x.d.kind === 'lesson'), quiz = r.results.filter(x => x.d.kind === 'quiz').slice(0, 3);
  const top = lessons[0], idea = top ? keyIdea(top.d.href) : '';
  const lessonLink = d => '<a class="sr" href="' + d.href + '" data-jump="' + esc(d.jump || '') + '" onclick="SEARCH_JUMP=this.dataset.jump||null"><div class="srk">Lesson' + (d.unit ? ' · Unit ' + unitNum(d.unit) + ': ' + esc(d.unit.t) : '') + '</div><div class="srt">' + esc(d.title + (d.heading && d.heading !== d.title ? ' › ' + d.heading : '')) + '</div><div class="srs">' + snippet(d.text, r.terms) + '</div></a>';
  const found = [];
  if (a.equation) found.push('an equation: <b>' + esc(a.equation) + '</b>');
  if (a.formulas.length) found.push('formula' + (a.formulas.length > 1 ? 's' : '') + ': ' + a.formulas.slice(0, 5).map(f => '<b>' + fmtFormula(f) + '</b>').join(', '));
  if (a.particle && (a.particle.A || a.particle.q)) found.push('<b>' + a.particle.el.s + (a.particle.A ? '-' + a.particle.A : '') + (a.particle.q ? '<sup>' + esc(a.particle.q) + '</sup>' : '') + '</b>');
  let h = '';
  // step 1: the hint
  h += '<div class="card tstep"><div class="ch">💡 Step 1 · A hint to start</div><div class="cb">' +
    (top ? '<p>This looks like a question about <b>' + esc(top.d.title) + (top.d.heading && top.d.heading !== top.d.title ? ': ' + esc(top.d.heading) : '') + '</b>.</p>' + (idea ? '<div class="key" style="margin:8px 0">' + idea + '</div>' : '') +
      '<p class="hint">Try the problem with this idea before opening the next step.</p>' : '<p>Catalyst couldn\'t match this to a lesson yet. Check the text above for misread words, or try asking it in your own words.</p>') +
    (found.length ? '<p class="rl" style="margin-top:6px">Catalyst spotted ' + found.join(' · ') + '.</p>' : '') +
    '<div class="br"><button class="btn bt" onclick="this.closest(\'.card\').nextElementSibling.hidden=false;this.remove()">I need more help ›</button></div></div></div>';
  // step 2: lessons and tools (hidden until asked)
  h += '<div hidden><div class="card tstep"><div class="ch">📘 Step 2 · Review the lesson</div><div class="cb">' + (lessons.length ? lessons.slice(0, 3).map(x => lessonLink(x.d)).join('') : '<p>No matching lesson yet.</p>') + '</div></div>' +
    (a.calcs.length ? '<div class="card tstep"><div class="ch">🧮 Step 3 · Work it out step by step</div><div class="cb">' + a.calcs.slice(0, 3).map(c => '<button class="tile tcalc" onclick="go(' + c.i + (c.pre ? ',\'' + esc(c.pre).replace(/'/g, '') + '\'' : '') + ')"><h3>' + NAMES[c.i] + '</h3><p>' + c.why + (c.pre ? ' · starts with <b>' + esc(c.pre.replace(/,+$/, '').replace(/,/g, ' ')) + '</b>' : '') + '</p></button>').join('') + '<div class="hint">The calculator shows every step, so you can follow along and write the work yourself.</div></div></div>' : '') +
    (quiz.length ? '<div class="card tstep"><div class="ch">✍️ Practice a similar question</div><div class="cb">' + quiz.map(x => '<a class="sr" href="' + x.d.href + '"><div class="srk">Practice quiz · Unit ' + unitNum(x.d.unit) + '</div><div class="srs">' + snippet(x.d.text, r.terms) + '</div></a>').join('') + '</div></div>' : '') +
    (TUT.canvas ? '<div class="card tstep"><div class="ch">🔎 Still stuck? Ask Google Lens</div><div class="cb"><p>This sends a copy of your photo to Google through your phone\'s share menu (choose <b>Google</b> or <b>Google Lens</b>). Lens usually shows the answer right away, so use it to check your thinking, not to skip it.</p>' +
      '<div class="br"><button class="btn bs" id="tlens">Share photo to Google Lens</button></div><div id="tlensmsg"></div></div></div>' : '') + '</div>';
  box.innerHTML = h;
  const lb = $('tlens'); if (lb) lb.onclick = tutorLens;
}
function tutorLens() {
  if (!TUT.canvas) return;
  TUT.canvas.toBlob(async blob => {
    const file = new File([blob], 'chemistry-problem.jpg', { type: 'image/jpeg' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], title: 'Chemistry problem' }); } catch (e) { /* cancelled */ }
    } else {
      $('tlensmsg').innerHTML = '<div class="hint">This browser can\'t share photos directly. Open <a href="https://lens.google.com/" target="_blank" rel="noopener">Google Lens</a> and upload the picture there, or use the Google app on your phone.</div>';
    }
  }, 'image/jpeg', 0.9);
}
