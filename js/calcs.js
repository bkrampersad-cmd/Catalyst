/* Catalyst - calculators. Kevin's PWA pattern: NAMES array + CALCS dict {html, init} + go(idx).
   Every calculator shows its work ("steps") so it teaches, not just answers. */
'use strict';
const NAMES = ['Molar Mass & Moles', 'Equation Balancer', 'Gas Laws', 'Solutions', 'pH & pOH', 'Measurement',
  'Average Atomic Mass', 'Empirical Formula', 'Stoichiometry', 'Heat'];  // append only: lessons call go(n) by index
const CALCS = {};

function go(idx, prefill) { goPage('calc', String(idx) + (prefill ? ':' + prefill : '')); }

RENDER.calc = function (arg) {
  let idx = 0, pre = '';
  if (arg) { const m = String(arg).match(/^(\d+)(?::(.*))?$/); if (m) { idx = Math.min(NAMES.length - 1, +m[1]); pre = m[2] || ''; } }
  const name = NAMES[idx], c = CALCS[name];
  $('pg').innerHTML = '<div class="pt">' + name + '</div><div class="ps">' + c.sub + '</div>' +
    '<div class="cpick">' + NAMES.map((n, i) => '<button class="' + (i === idx ? 'on' : '') + '" onclick="go(' + i + ')">' + n + '</button>').join('') + '</div>' +
    '<div id="calc">' + c.html + '</div>';
  setActive('calc', idx);
  c.init(pre);
};

/* shared bits */
const val = id => { const v = $(id).value.trim(); return v === '' ? null : Number(v.replace(/,/g, '')); };
function showErr(id, msg) { $(id).innerHTML = '<div class="err">' + esc(msg) + '</div>'; }
function onEnter(ids, fn) { ids.forEach(i => { const el = $(i); if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') fn(); }); }); }
function segBtns(id, opts, cur, cb) {
  const el = $(id);
  el.innerHTML = opts.map(o => '<button data-k="' + o[0] + '" class="' + (o[0] === cur ? 'on' : '') + '">' + o[1] + '</button>').join('');
  el.querySelectorAll('button').forEach(b => b.onclick = () => { el.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); cb(b.dataset.k); });
}
function fmt(x, n) { return Chem.roundSig(x, n || 4); }

/* ============ 0. Molar Mass & Moles ============ */
CALCS['Molar Mass & Moles'] = {
  sub: 'Type a formula to get its molar mass, percent composition, and gram ↔ mole ↔ particle conversions.',
  html: '<div class="card"><div class="ch">Formula</div><div class="cb">' +
    '<div class="fr"><label for="mmf">Chemical formula</label><input id="mmf" placeholder="e.g. H2O, Ca(OH)2, CuSO4*5H2O" autocapitalize="off" autocomplete="off" spellcheck="false"></div>' +
    '<div class="fr"><label for="mmr">Atomic masses</label><select id="mmr"><option value="">Full precision</option><option value="1">Rounded to 0.1</option><option value="0">Rounded to whole numbers</option></select></div>' +
    '<div class="hint">Case matters: Co is cobalt, CO is carbon monoxide. Use * or · for hydrates.</div>' +
    '<div class="br"><button class="btn bc" id="mmgo">Calculate</button></div><div id="mmout"></div></div></div>' +
    '<div class="card"><div class="ch">Convert</div><div class="cb">' +
    '<div class="fr"><label for="mmq">Amount</label><div class="iu"><input id="mmq" type="number" inputmode="decimal" placeholder="e.g. 36.0"><select id="mmu"><option value="g">grams</option><option value="mol">moles</option><option value="p">particles</option></select></div></div>' +
    '<div class="br"><button class="btn bt" id="mmcv">Convert</button></div><div id="mmcout"></div></div></div>',
  init(pre) {
    if (pre) $('mmf').value = pre;
    const getMM = () => {
      const rd = $('mmr').value;
      return Chem.molarMass($('mmf').value, rd === '' ? {} : { round: +rd });
    };
    const run = () => {
      let r;
      try { r = getMM(); } catch (e) { showErr('mmout', e.message); return null; }
      const f = $('mmf').value;
      let t = '<div class="rb"><div class="rl">Molar mass of ' + fmtFormula(f) + '</div><div class="big">' + r.total.toFixed(2) + ' g/mol</div></div>' +
        '<table class="tbl" style="margin-top:12px"><tr><th>Element</th><th style="text-align:right">Atoms</th><th style="text-align:right">Atomic mass</th><th style="text-align:right">Subtotal</th><th style="text-align:right">% by mass</th></tr>';
      r.rows.forEach(x => { t += '<tr><td><b>' + x.sym + '</b> <span class="rl">' + x.name + '</span></td><td class="n">' + x.count + '</td><td class="n">' + +x.am.toFixed(3) + '</td><td class="n">' + x.sub.toFixed(2) + '</td><td class="n">' + x.pct.toFixed(1) + '%</td></tr>'; });
      t += '</table><div class="steps"><div class="st">How it works</div>' +
        r.rows.map(x => x.count + ' × ' + +x.am.toFixed(3) + ' (' + x.sym + ') = ' + x.sub.toFixed(2)).join('<br>') +
        '<br><b>Add them up: ' + r.total.toFixed(2) + ' g/mol</b><br>% composition = (mass of element ÷ total mass) × 100</div>';
      $('mmout').innerHTML = t;
      return r;
    };
    const conv = () => {
      let r;
      try { r = getMM(); } catch (e) { showErr('mmcout', 'Enter a valid formula above first. ' + e.message); return; }
      const q = val('mmq'), u = $('mmu').value, M = r.total, NA = Chem.CONST.NA;
      if (q === null || !(q > 0)) { showErr('mmcout', 'Enter a positive amount.'); return; }
      const mol = u === 'g' ? q / M : u === 'mol' ? q : q / NA;
      const g = mol * M, p = mol * NA;
      let st = '';
      if (u === 'g') st = 'moles = grams ÷ molar mass = ' + q + ' g ÷ ' + M.toFixed(2) + ' g/mol = <b>' + fmt(mol) + ' mol</b>';
      if (u === 'mol') st = 'grams = moles × molar mass = ' + q + ' mol × ' + M.toFixed(2) + ' g/mol = <b>' + fmt(g) + ' g</b>';
      if (u === 'p') st = 'moles = particles ÷ 6.02 × 10²³ = <b>' + fmt(mol) + ' mol</b>';
      st += '<br>particles = moles × 6.02 × 10²³ (Avogadro\'s number)';
      $('mmcout').innerHTML = '<div class="rb">' +
        '<div class="rr"><span class="rl">Mass</span><span class="rv a">' + fmt(g) + ' g</span></div>' +
        '<div class="rr"><span class="rl">Moles</span><span class="rv a">' + fmt(mol) + ' mol</span></div>' +
        '<div class="rr"><span class="rl">Particles (atoms/molecules)</span><span class="rv a">' + fmt(p) + '</span></div></div>' +
        '<div class="steps"><div class="st">Steps</div>' + st + '</div>';
    };
    $('mmgo').onclick = run; $('mmcv').onclick = conv; $('mmr').onchange = () => { if ($('mmf').value) run(); };
    onEnter(['mmf'], run); onEnter(['mmq'], conv);
    if (pre) run();
  }
};

/* ============ 1. Equation Balancer ============ */
CALCS['Equation Balancer'] = {
  sub: 'Type an unbalanced equation. Catalyst finds the smallest whole-number coefficients and shows the atom count on each side.',
  html: '<div class="card"><div class="ch">Equation</div><div class="cb">' +
    '<div class="fr"><label for="beq">Unbalanced equation</label><input id="beq" placeholder="e.g. Fe + O2 -> Fe2O3" autocapitalize="off" autocomplete="off" spellcheck="false"></div>' +
    '<div class="hint">Separate formulas with +, and use -> or = for the arrow. Try: <a href="#" data-x="CH4 + O2 -> CO2 + H2O">CH4 + O2 -> CO2 + H2O</a> · <a href="#" data-x="Al + CuSO4 -> Al2(SO4)3 + Cu">Al + CuSO4 -> Al2(SO4)3 + Cu</a></div>' +
    '<div class="br"><button class="btn bc" id="bgo">Balance</button></div><div id="bout"></div></div></div>',
  init(pre) {
    if (pre) $('beq').value = pre;
    const run = () => {
      let r;
      try { r = Chem.balance($('beq').value); } catch (e) { showErr('bout', e.message); return; }
      const side = (list, off) => list.map((f, i) => (r.coef[i + off] > 1 ? '<span class="cf">' + r.coef[i + off] + '</span>' : '') + fmtFormula(f)).join(' + ');
      let t = '<div class="rb"><div class="rl">Balanced</div><div class="eqout">' + side(r.reactants, 0) + ' → ' + side(r.products, r.reactants.length) + '</div></div>' +
        '<table class="tbl" style="margin-top:12px"><tr><th>Element</th><th style="text-align:right">Reactant side</th><th style="text-align:right">Product side</th><th></th></tr>' +
        r.check.map(c => '<tr><td><b>' + c.el + '</b></td><td class="n">' + c.left + '</td><td class="n">' + c.right + '</td><td>' + (c.left === c.right ? '✅' : '❌') + '</td></tr>').join('') + '</table>' +
        '<div class="steps"><div class="st">Remember</div>Only change the <b>coefficients</b> (the big numbers in front), never the subscripts. Changing a subscript changes the substance itself. ' +
        'Atoms are conserved: every element must have the same count on both sides (Law of Conservation of Mass).</div>';
      $('bout').innerHTML = t;
    };
    $('bgo').onclick = run; onEnter(['beq'], run);
    document.querySelectorAll('#calc a[data-x]').forEach(a => a.onclick = ev => { ev.preventDefault(); $('beq').value = a.dataset.x; run(); });
    if (pre) run();
  }
};

/* ============ 2. Gas Laws ============ */
const P_UNITS = '<option value="kPa">kPa</option><option value="atm">atm</option><option value="mmHg">mmHg</option>';
const V_UNITS = '<option value="L">L</option><option value="mL">mL</option>';
const T_UNITS = '<option value="K">K</option><option value="C">°C</option>';
function gasRow(id, label, units) { return '<div class="fr"><label for="' + id + '">' + label + '</label><div class="iu"><input id="' + id + '" type="number" inputmode="decimal"><select id="' + id + 'u">' + units + '</select></div></div>'; }
CALCS['Gas Laws'] = {
  sub: 'Leave the unknown blank. Temperatures are converted to kelvin automatically (K = °C + 273).',
  html: '<div class="seg" id="gmode"></div><div id="gbody"></div>',
  init() {
    const combined = '<div class="card"><div class="ch">Combined gas law: P₁V₁/T₁ = P₂V₂/T₂</div><div class="cb"><div class="t2"><div>' +
      gasRow('p1', 'P₁ (initial pressure)', P_UNITS) + gasRow('v1', 'V₁ (initial volume)', V_UNITS) + gasRow('t1', 'T₁ (initial temp.)', T_UNITS) + '</div><div>' +
      gasRow('p2', 'P₂ (final pressure)', P_UNITS) + gasRow('v2', 'V₂ (final volume)', V_UNITS) + gasRow('t2', 'T₂ (final temp.)', T_UNITS) + '</div></div>' +
      '<div class="hint">Boyle\'s, Charles\'s and Gay-Lussac\'s laws are all special cases: if something stays constant, enter the same value on both sides. STP = 101.3 kPa and 273 K.</div>' +
      '<div class="br"><button class="btn bc" id="ggo">Solve</button><button class="btn bs" id="gclr">Clear</button></div><div id="gout"></div></div></div>';
    const ideal = '<div class="card"><div class="ch">Ideal gas law: PV = nRT</div><div class="cb">' +
      gasRow('ip', 'P (pressure)', P_UNITS) + gasRow('iv', 'V (volume)', V_UNITS) +
      '<div class="fr"><label for="in">n (moles)</label><input id="in" type="number" inputmode="decimal"></div>' + gasRow('it', 'T (temperature)', T_UNITS) +
      '<div class="hint">R = 8.31 L·kPa/(mol·K) = 0.0821 L·atm/(mol·K)</div>' +
      '<div class="br"><button class="btn bc" id="igo">Solve</button><button class="btn bs" id="iclr">Clear</button></div><div id="iout"></div></div></div>';
    const show = m => {
      $('gbody').innerHTML = m === 'c' ? combined : ideal;
      if (m === 'c') { $('ggo').onclick = solveCombined; $('gclr').onclick = () => clear(['p1', 'v1', 't1', 'p2', 'v2', 't2'], 'gout'); onEnter(['p1', 'v1', 't1', 'p2', 'v2', 't2'], solveCombined); }
      else { $('igo').onclick = solveIdeal; $('iclr').onclick = () => clear(['ip', 'iv', 'in', 'it'], 'iout'); onEnter(['ip', 'iv', 'in', 'it'], solveIdeal); }
    };
    segBtns('gmode', [['c', 'Combined (P, V, T)'], ['i', 'Ideal (PV = nRT)']], 'c', show);
    show('c');
    function clear(ids, out) { ids.forEach(i => $(i).value = ''); $(out).innerHTML = ''; }
  }
};
function toBase(id, kind) {
  const v = val(id); if (v === null) return null; const u = $(id + 'u') ? $(id + 'u').value : null;
  if (kind === 'P') return v * Chem.P_TO_KPA[u];
  if (kind === 'V') return v * Chem.V_TO_L[u];
  if (kind === 'T') return Chem.toK(v, u);
  return v;
}
function fromBase(x, id, kind) {
  const u = $(id + 'u').value;
  if (kind === 'P') return x / Chem.P_TO_KPA[u];
  if (kind === 'V') return x / Chem.V_TO_L[u];
  if (kind === 'T') return Chem.fromK(x, u);
  return x;
}
const UNAME = { kPa: 'kPa', atm: 'atm', mmHg: 'mmHg', L: 'L', mL: 'mL', K: 'K', C: '°C' };
function solveCombined() {
  const ids = ['p1', 'v1', 't1', 'p2', 'v2', 't2'], kinds = ['P', 'V', 'T', 'P', 'V', 'T'];
  const b = ids.map((id, i) => toBase(id, kinds[i]));
  const blanks = b.map((x, i) => x === null ? i : -1).filter(i => i >= 0);
  if (blanks.length !== 1) { showErr('gout', 'Leave exactly one box blank - that is the value Catalyst will solve for.'); return; }
  if (b.some(x => x !== null && x <= 0)) { showErr('gout', 'Pressures, volumes and kelvin temperatures must be greater than zero. (Check that °C values are above −273.)'); return; }
  const k = blanks[0];
  const [P1, V1, T1, P2, V2, T2] = b;
  let x;
  switch (k) {
    case 0: x = P2 * V2 * T1 / (T2 * V1); break;
    case 1: x = P2 * V2 * T1 / (T2 * P1); break;
    case 2: x = P1 * V1 * T2 / (P2 * V2); break;
    case 3: x = P1 * V1 * T2 / (T1 * V2); break;
    case 4: x = P1 * V1 * T2 / (T1 * P2); break;
    case 5: x = P2 * V2 * T1 / (P1 * V1); break;
  }
  const id = ids[k], name = ['P₁', 'V₁', 'T₁', 'P₂', 'V₂', 'T₂'][k];
  const ans = fromBase(x, id, kinds[k]), unit = UNAME[$(id + 'u').value];
  const rearr = ['P₁ = P₂V₂T₁ / (T₂V₁)', 'V₁ = P₂V₂T₁ / (T₂P₁)', 'T₁ = P₁V₁T₂ / (P₂V₂)',
    'P₂ = P₁V₁T₂ / (T₁V₂)', 'V₂ = P₁V₁T₂ / (T₁P₂)', 'T₂ = P₂V₂T₁ / (P₁V₁)'][k];
  const tNote = ['t1', 't2'].filter(i => $(i + 'u').value === 'C' && val(i) !== null).map(i => val(i) + ' °C + 273 = ' + (val(i) + 273) + ' K').join('<br>');
  $('gout').innerHTML = '<div class="rb"><div class="rl">' + name + '</div><div class="big">' + fmt(ans, 3) + ' ' + unit + '</div></div>' +
    '<div class="steps"><div class="st">Steps</div>' + (tNote ? '1. Convert to kelvin:<br>' + tNote + '<br>2. ' : '1. ') + 'Rearrange: <b>' + rearr + '</b><br>' +
    (tNote ? '3. ' : '2. ') + 'Plug in (units must match on both sides) and solve: <b>' + name + ' = ' + fmt(ans, 3) + ' ' + unit + '</b>' +
    '<br><span class="rl">Answer shown to 3 significant figures. Round to match the sig figs in your data.</span></div>';
}
function solveIdeal() {
  const P = toBase('ip', 'P'), V = toBase('iv', 'V'), n = val('in'), T = toBase('it', 'T'), R = Chem.CONST.R_kPa;
  const arr = [P, V, n, T], blanks = arr.filter(x => x === null).length;
  if (blanks !== 1) { showErr('iout', 'Leave exactly one box blank - that is the value Catalyst will solve for.'); return; }
  if (arr.some(x => x !== null && x <= 0)) { showErr('iout', 'Values must be greater than zero (temperature in kelvin).'); return; }
  let name, ans, unit, f;
  if (P === null) { name = 'P'; ans = fromBase(n * R * T / V, 'ip', 'P'); unit = UNAME[$('ipu').value]; f = 'P = nRT / V'; }
  else if (V === null) { name = 'V'; ans = fromBase(n * R * T / P, 'iv', 'V'); unit = UNAME[$('ivu').value]; f = 'V = nRT / P'; }
  else if (n === null) { name = 'n'; ans = P * V / (R * T); unit = 'mol'; f = 'n = PV / RT'; }
  else { name = 'T'; ans = fromBase(P * V / (n * R), 'it', 'T'); unit = UNAME[$('itu').value]; f = 'T = PV / nR'; }
  $('iout').innerHTML = '<div class="rb"><div class="rl">' + name + '</div><div class="big">' + fmt(ans, 3) + ' ' + unit + '</div></div>' +
    '<div class="steps"><div class="st">Steps</div>1. Convert to kPa, L and K so the units match R = 8.31 L·kPa/(mol·K).<br>2. Rearrange: <b>' + f + '</b><br>3. Solve: <b>' + name + ' = ' + fmt(ans, 3) + ' ' + unit + '</b></div>';
}

/* ============ 3. Solutions ============ */
CALCS['Solutions'] = {
  sub: 'Molarity, dilution and parts per million (ppm), using the Reference Table formulas.',
  html: '<div class="seg" id="smode"></div><div id="sbody"></div>',
  init() {
    const views = {
      m: '<div class="card"><div class="ch">Molarity = moles of solute / liters of solution</div><div class="cb">' +
        '<div class="fr"><label for="sf">Solute formula (optional)</label><input id="sf" placeholder="e.g. NaCl - lets you enter grams" autocapitalize="off" spellcheck="false"></div>' +
        '<div class="fr"><label for="sq">Amount of solute</label><div class="iu"><input id="sq" type="number" inputmode="decimal"><select id="squ"><option value="mol">moles</option><option value="g">grams</option></select></div></div>' +
        '<div class="fr"><label for="sv">Volume of solution</label><div class="iu"><input id="sv" type="number" inputmode="decimal"><select id="svu">' + V_UNITS + '</select></div></div>' +
        '<div class="fr"><label for="sm">Molarity (M)</label><input id="sm" type="number" inputmode="decimal"></div>' +
        '<div class="hint">Leave one of amount, volume, or molarity blank.</div>' +
        '<div class="br"><button class="btn bc" id="sgo">Solve</button></div><div id="sout"></div></div></div>',
      d: '<div class="card"><div class="ch">Dilution: M₁V₁ = M₂V₂</div><div class="cb">' +
        '<div class="t2"><div><div class="fr"><label for="dm1">M₁ (stock)</label><input id="dm1" type="number" inputmode="decimal"></div><div class="fr"><label for="dv1">V₁</label><input id="dv1" type="number" inputmode="decimal"></div></div>' +
        '<div><div class="fr"><label for="dm2">M₂ (diluted)</label><input id="dm2" type="number" inputmode="decimal"></div><div class="fr"><label for="dv2">V₂</label><input id="dv2" type="number" inputmode="decimal"></div></div></div>' +
        '<div class="hint">Leave one blank. Volumes just need the same unit on both sides (both mL or both L).</div>' +
        '<div class="br"><button class="btn bc" id="dgo">Solve</button></div><div id="dout"></div></div></div>',
      p: '<div class="card"><div class="ch">ppm = (grams of solute / grams of solution) × 1,000,000</div><div class="cb">' +
        '<div class="fr"><label for="pg1">Grams of solute</label><input id="pg1" type="number" inputmode="decimal"></div>' +
        '<div class="fr"><label for="pg2">Grams of solution</label><input id="pg2" type="number" inputmode="decimal"></div>' +
        '<div class="fr"><label for="pp">Parts per million</label><input id="pp" type="number" inputmode="decimal"></div>' +
        '<div class="hint">Leave one blank. Grams of solution = solute + solvent.</div>' +
        '<div class="br"><button class="btn bc" id="pgo">Solve</button></div><div id="pout"></div></div></div>'
    };
    const show = k => {
      $('sbody').innerHTML = views[k];
      if (k === 'm') { $('sgo').onclick = solveMolarity; onEnter(['sq', 'sv', 'sm'], solveMolarity); }
      if (k === 'd') { $('dgo').onclick = solveDilution; onEnter(['dm1', 'dv1', 'dm2', 'dv2'], solveDilution); }
      if (k === 'p') { $('pgo').onclick = solvePPM; onEnter(['pg1', 'pg2', 'pp'], solvePPM); }
    };
    segBtns('smode', [['m', 'Molarity'], ['d', 'Dilution'], ['p', 'ppm']], 'm', show);
    show('m');
  }
};
function oneBlank(arr, out) {
  if (arr.filter(x => x === null).length !== 1) { showErr(out, 'Leave exactly one box blank - that is the value Catalyst will solve for.'); return false; }
  if (arr.some(x => x !== null && !(x > 0))) { showErr(out, 'Values must be greater than zero.'); return false; }
  return true;
}
function solveMolarity() {
  let q = val('sq'); const V = toBase('sv', 'V'), M = val('sm'), useG = $('squ').value === 'g';
  if (!oneBlank([q, V, M], 'sout')) return;
  let MM = null, st = '';
  if (useG) {
    try { MM = Chem.molarMass($('sf').value).total; } catch (e) { showErr('sout', 'To use grams, enter the solute formula. ' + e.message); return; }
  }
  let mol = q === null ? null : (useG ? q / MM : q);
  if (useG && q !== null) st += 'moles = ' + q + ' g ÷ ' + MM.toFixed(2) + ' g/mol = ' + fmt(mol) + ' mol<br>';
  if ($('svu').value === 'mL' && val('sv') !== null) st += 'volume = ' + val('sv') + ' mL ÷ 1000 = ' + fmt(V) + ' L<br>';
  let res;
  if (M === null) { res = mol / V; st += 'M = moles / liters = ' + fmt(mol) + ' / ' + fmt(V) + ' = <b>' + fmt(res, 3) + ' M</b>'; res = fmt(res, 3) + ' M'; }
  else if (V === null) { const L = mol / M; st += 'liters = moles / M = ' + fmt(mol) + ' / ' + M + ' = <b>' + fmt(L, 3) + ' L</b>'; res = fmt(L, 3) + ' L' + (L < 1 ? ' (' + fmt(L * 1000, 3) + ' mL)' : ''); }
  else { const n = M * V; st += 'moles = M × liters = ' + M + ' × ' + fmt(V) + ' = <b>' + fmt(n, 3) + ' mol</b>'; res = fmt(n, 3) + ' mol'; if (useG) { res += ' = ' + fmt(n * MM, 3) + ' g'; st += '<br>grams = ' + fmt(n, 3) + ' mol × ' + MM.toFixed(2) + ' g/mol = <b>' + fmt(n * MM, 3) + ' g</b>'; } }
  $('sout').innerHTML = '<div class="rb"><div class="big">' + res + '</div></div><div class="steps"><div class="st">Steps</div>' + st + '</div>';
}
function solveDilution() {
  const a = ['dm1', 'dv1', 'dm2', 'dv2'].map(val);
  if (!oneBlank(a, 'dout')) return;
  const [M1, V1, M2, V2] = a, k = a.indexOf(null), nm = ['M₁', 'V₁', 'M₂', 'V₂'][k];
  const x = [M2 * V2 / V1, M2 * V2 / M1, M1 * V1 / V2, M1 * V1 / M2][k];
  const f = ['M₁ = M₂V₂ / V₁', 'V₁ = M₂V₂ / M₁', 'M₂ = M₁V₁ / V₂', 'V₂ = M₁V₁ / M₂'][k];
  let warn = (M1 !== null && M2 !== null && M2 > M1) || (k === 2 && x > M1) || (k === 0 && x < M2) ? '<div class="err">Heads up: the diluted solution comes out more concentrated than the stock. Check which values are 1 and 2.</div>' : '';
  $('dout').innerHTML = '<div class="rb"><div class="rl">' + nm + '</div><div class="big">' + fmt(x, 3) + (k % 2 === 0 ? ' M' : ' (same volume unit)') + '</div></div>' + warn +
    '<div class="steps"><div class="st">Steps</div>Moles of solute stay the same when you add water, so M₁V₁ = M₂V₂.<br>Rearrange: <b>' + f + '</b> = <b>' + fmt(x, 3) + '</b></div>';
}
function solvePPM() {
  const a = ['pg1', 'pg2', 'pp'].map(val);
  if (!oneBlank(a, 'pout')) return;
  const [s, t, p] = a; let r, st;
  if (p === null) { r = s / t * 1e6; st = 'ppm = (' + s + ' / ' + t + ') × 1,000,000 = <b>' + fmt(r, 3) + ' ppm</b>'; r = fmt(r, 3) + ' ppm'; }
  else if (s === null) { r = p * t / 1e6; st = 'grams of solute = ppm × grams of solution / 1,000,000 = <b>' + fmt(r, 3) + ' g</b>'; r = fmt(r, 3) + ' g'; }
  else { r = s * 1e6 / p; st = 'grams of solution = grams of solute × 1,000,000 / ppm = <b>' + fmt(r, 3) + ' g</b>'; r = fmt(r, 3) + ' g'; }
  $('pout').innerHTML = '<div class="rb"><div class="big">' + r + '</div></div><div class="steps"><div class="st">Steps</div>' + st + '</div>';
}

/* ============ 4. pH & pOH ============ */
CALCS['pH & pOH'] = {
  sub: 'Enter any one of pH, pOH, [H⁺] or [OH⁻] and get the other three. (At 25 °C, pH + pOH = 14.)',
  html: '<div class="card"><div class="ch">Enter one value</div><div class="cb">' +
    '<div class="fr"><label for="hk">I know the</label><select id="hk"><option value="ph">pH</option><option value="poh">pOH</option><option value="h">[H⁺] or [H₃O⁺] (M)</option><option value="oh">[OH⁻] (M)</option></select></div>' +
    '<div class="fr"><label for="hv">Value</label><input id="hv" inputmode="decimal" placeholder="e.g. 3.2 or 1e-5"></div>' +
    '<div class="br"><button class="btn bc" id="hgo">Calculate</button></div><div id="hout"></div></div></div>',
  init() {
    const run = () => {
      const k = $('hk').value, raw = $('hv').value.trim().replace(/\s*[x×]\s*10\^?/i, 'e');
      const v = Number(raw);
      if (raw === '' || !isFinite(v)) { showErr('hout', 'Enter a number (scientific notation like 1e-5 or 1 x 10^-5 works).'); return; }
      if ((k === 'h' || k === 'oh') && v <= 0) { showErr('hout', 'Concentrations must be greater than zero.'); return; }
      let ph;
      if (k === 'ph') ph = v; if (k === 'poh') ph = 14 - v; if (k === 'h') ph = -Math.log10(v); if (k === 'oh') ph = 14 + Math.log10(v);
      const poh = 14 - ph, h = Math.pow(10, -ph), oh = Math.pow(10, -poh);
      const kind = ph < 6.995 ? 'Acidic' : ph > 7.005 ? 'Basic (alkaline)' : 'Neutral';
      const st = { ph: 'pOH = 14 − pH<br>[H⁺] = 10<sup>−pH</sup><br>[OH⁻] = 10<sup>−pOH</sup>',
        poh: 'pH = 14 − pOH<br>[OH⁻] = 10<sup>−pOH</sup><br>[H⁺] = 10<sup>−pH</sup>',
        h: 'pH = −log[H⁺]<br>pOH = 14 − pH<br>[OH⁻] = 1.0 × 10<sup>−14</sup> / [H⁺]',
        oh: 'pOH = −log[OH⁻]<br>pH = 14 − pOH<br>[H⁺] = 1.0 × 10<sup>−14</sup> / [OH⁻]' }[k];
      const pos = Math.max(0, Math.min(14, ph)) / 14 * 100;
      $('hout').innerHTML = '<div class="rb"><div class="rr"><span class="rl">pH</span><span class="rv a">' + ph.toFixed(2) + '</span></div>' +
        '<div class="rr"><span class="rl">pOH</span><span class="rv a">' + poh.toFixed(2) + '</span></div>' +
        '<div class="rr"><span class="rl">[H⁺]</span><span class="rv a">' + fmt(h, 2) + ' M</span></div>' +
        '<div class="rr"><span class="rl">[OH⁻]</span><span class="rv a">' + fmt(oh, 2) + ' M</span></div>' +
        '<div class="rr"><span class="rl">Solution is</span><span class="rv s">' + kind + '</span></div></div>' +
        '<div class="phbar"><i style="left:' + pos + '%"></i></div><div class="scl" style="max-width:none"><span>0 acidic</span><span>7 neutral</span><span>14 basic</span></div>' +
        '<div class="steps"><div class="st">Formulas used</div>' + st + '<br><span class="rl">Each pH unit is a factor of 10: pH 3 has 10× more H⁺ than pH 4.</span></div>';
    };
    $('hgo').onclick = run; onEnter(['hv'], run);
  }
};

/* ============ 5. Measurement ============ */
CALCS['Measurement'] = {
  sub: 'Significant figures, rounding, percent error and density - the math from Unit 1.',
  html: '<div class="seg" id="xmode"></div><div id="xbody"></div>',
  init() {
    const views = {
      s: '<div class="card"><div class="ch">Count significant figures</div><div class="cb">' +
        '<div class="fr"><label for="xs">Measurement</label><input id="xs" inputmode="decimal" placeholder="e.g. 0.004050 or 1200"></div>' +
        '<div class="fr"><label for="xn">Round to (optional)</label><input id="xn" type="number" inputmode="numeric" placeholder="number of sig figs"></div>' +
        '<div class="br"><button class="btn bc" id="xgo">Check</button></div><div id="xout"></div></div></div>',
      e: '<div class="card"><div class="ch">% error = (measured − accepted) / accepted × 100</div><div class="cb">' +
        '<div class="fr"><label for="em">Measured value</label><input id="em" type="number" inputmode="decimal"></div>' +
        '<div class="fr"><label for="ea">Accepted value</label><input id="ea" type="number" inputmode="decimal"></div>' +
        '<div class="br"><button class="btn bc" id="ego">Calculate</button></div><div id="eout"></div></div></div>',
      d: '<div class="card"><div class="ch">Density = mass / volume</div><div class="cb">' +
        '<div class="fr"><label for="dm">Mass (g)</label><input id="dm" type="number" inputmode="decimal"></div>' +
        '<div class="fr"><label for="dvv">Volume (cm³ or mL)</label><input id="dvv" type="number" inputmode="decimal"></div>' +
        '<div class="fr"><label for="dd">Density (g/cm³)</label><input id="dd" type="number" inputmode="decimal"></div>' +
        '<div class="hint">Leave one blank. 1 mL = 1 cm³.</div>' +
        '<div class="br"><button class="btn bc" id="dgo2">Solve</button></div><div id="ddout"></div></div></div>'
    };
    const show = k => {
      $('xbody').innerHTML = views[k];
      if (k === 's') { $('xgo').onclick = sf; onEnter(['xs', 'xn'], sf); }
      if (k === 'e') { $('ego').onclick = pe; onEnter(['em', 'ea'], pe); }
      if (k === 'd') { $('dgo2').onclick = dens; onEnter(['dm', 'dvv', 'dd'], dens); }
    };
    segBtns('xmode', [['s', 'Sig figs'], ['e', 'Percent error'], ['d', 'Density']], 's', show);
    show('s');
    function sf() {
      let r; const s = $('xs').value;
      try { r = Chem.sigFigs(s); } catch (e) { showErr('xout', e.message); return; }
      const n = val('xn');
      let rd = '';
      if (n !== null) { if (!(n >= 1 && n <= 15 && Number.isInteger(n))) { showErr('xout', 'Round to a whole number of sig figs from 1 to 15.'); return; } rd = '<div class="rr"><span class="rl">Rounded to ' + n + ' sig fig' + (n > 1 ? 's' : '') + '</span><span class="rv a">' + esc(Chem.roundSig(Number(s.replace(/,/g, '')), n)) + '</span></div>'; }
      $('xout').innerHTML = '<div class="rb"><div class="rr"><span class="rl">Significant figures in ' + esc(s) + '</span><span class="rv a">' + r.count + '</span></div>' + rd + '</div>' +
        '<div class="steps"><div class="st">Why</div>' + esc(r.note) + '<br><span class="rl">Rules: non-zero digits always count · zeros between non-zero digits count · leading zeros never count · trailing zeros count only if there is a decimal point.</span></div>';
    }
    function pe() {
      const m = val('em'), a = val('ea');
      if (m === null || a === null) { showErr('eout', 'Enter both values.'); return; }
      if (a === 0) { showErr('eout', 'The accepted value cannot be zero.'); return; }
      const p = (m - a) / a * 100;
      $('eout').innerHTML = '<div class="rb"><div class="big">' + p.toFixed(2) + '%</div><div class="rl">' + (p > 0 ? 'Measured value is higher than accepted' : p < 0 ? 'Measured value is lower than accepted' : 'Exactly right!') + '</div></div>' +
        '<div class="steps"><div class="st">Steps</div>(' + m + ' − ' + a + ') / ' + a + ' × 100 = <b>' + p.toFixed(2) + '%</b><br><span class="rl">The sign tells you if you were over (+) or under (−). Your teacher may want the absolute value.</span></div>';
    }
    function dens() {
      const a = [val('dm'), val('dvv'), val('dd')];
      if (!oneBlank(a, 'ddout')) return;
      const [m, v, d] = a; let r, st;
      if (d === null) { r = m / v; st = 'D = m / V = ' + m + ' / ' + v + ' = <b>' + fmt(r, 3) + ' g/cm³</b>'; r = fmt(r, 3) + ' g/cm³'; }
      else if (m === null) { r = d * v; st = 'm = D × V = ' + d + ' × ' + v + ' = <b>' + fmt(r, 3) + ' g</b>'; r = fmt(r, 3) + ' g'; }
      else { r = m / d; st = 'V = m / D = ' + m + ' / ' + d + ' = <b>' + fmt(r, 3) + ' cm³</b>'; r = fmt(r, 3) + ' cm³'; }
      $('ddout').innerHTML = '<div class="rb"><div class="big">' + r + '</div></div><div class="steps"><div class="st">Steps</div>' + st + '</div>';
    }
  }
};
