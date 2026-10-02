/* Catalyst - calculators added in v0.2.0 (indices 6-9 in NAMES). Uses helpers from calcs.js. */
'use strict';

/* ============ 6. Average Atomic Mass ============ */
CALCS['Average Atomic Mass'] = {
  sub: 'Enter each isotope\'s mass and percent abundance to get the weighted average shown on the periodic table.',
  html: '<div class="card"><div class="ch">Isotopes</div><div class="cb">' +
    '<table class="tbl" id="aamt"><tr><th>Isotope</th><th>Mass (u)</th><th>Abundance (%)</th></tr>' +
    [1, 2, 3, 4].map(i => '<tr><td>' + i + '</td><td><input id="am' + i + '" type="number" inputmode="decimal"' + (i === 1 ? ' placeholder="34.97"' : i === 2 ? ' placeholder="36.97"' : '') + '></td>' +
      '<td><input id="ap' + i + '" type="number" inputmode="decimal"' + (i === 1 ? ' placeholder="75.76"' : i === 2 ? ' placeholder="24.24"' : '') + '></td></tr>').join('') + '</table>' +
    '<div class="hint">Leave unused rows blank. Abundances should add up to 100%.</div>' +
    '<div class="br"><button class="btn bc" id="aago">Calculate</button><button class="btn bs" id="aaex">Example: chlorine</button></div><div id="aaout"></div></div></div>',
  init() {
    const run = () => {
      const rows = [1, 2, 3, 4].map(i => ({ mass: val('am' + i), pct: val('ap' + i) })).filter(r => r.mass !== null || r.pct !== null);
      if (rows.some(r => r.mass === null || r.pct === null)) { showErr('aaout', 'Each row you use needs both a mass and a percent.'); return; }
      let r; try { r = Chem.avgAtomicMass(rows); } catch (e) { showErr('aaout', e.message); return; }
      const warn = Math.abs(r.totalPct - 100) > 0.5 ? '<div class="err">The abundances add up to ' + +r.totalPct.toFixed(2) + '%, not 100%. Check your numbers.</div>' : '';
      $('aaout').innerHTML = '<div class="rb"><div class="rl">Average atomic mass</div><div class="big">' + r.avg.toFixed(2) + ' u</div></div>' + warn +
        '<div class="steps"><div class="st">Steps</div>Change each percent to a decimal, multiply by the isotope\'s mass, then add:<br>' +
        r.parts.map(p => p.mass + ' × ' + +(p.pct / 100).toFixed(4) + ' = ' + p.contrib.toFixed(3)).join('<br>') +
        '<br><b>Total = ' + r.avg.toFixed(2) + ' u</b></div>';
    };
    $('aago').onclick = run;
    $('aaex').onclick = () => { $('am1').value = 34.97; $('ap1').value = 75.76; $('am2').value = 36.97; $('ap2').value = 24.24; ['am3', 'ap3', 'am4', 'ap4'].forEach(i => $(i).value = ''); run(); };
    onEnter(['am1', 'ap1', 'am2', 'ap2', 'am3', 'ap3', 'am4', 'ap4'], run);
  }
};

/* ============ 7. Empirical Formula ============ */
CALCS['Empirical Formula'] = {
  sub: 'Enter percent composition (or grams) for each element to find the empirical formula. Add the molar mass to get the molecular formula too.',
  html: '<div class="card"><div class="ch">Composition</div><div class="cb">' +
    '<table class="tbl"><tr><th>Element</th><th>% or grams</th></tr>' +
    [1, 2, 3, 4].map(i => '<tr><td><input id="es' + i + '" placeholder="' + ['C', 'H', 'O', ''][i - 1] + '" autocapitalize="characters" autocomplete="off" spellcheck="false" style="max-width:110px"></td><td><input id="ea' + i + '" type="number" inputmode="decimal" placeholder="' + ['40.0', '6.7', '53.3', ''][i - 1] + '"></td></tr>').join('') + '</table>' +
    '<div class="fr" style="margin-top:10px"><label for="emm">Molar mass of compound (optional)</label><input id="emm" type="number" inputmode="decimal" placeholder="e.g. 180"></div>' +
    '<div class="br"><button class="btn bc" id="ego2">Find formula</button></div><div id="eout2"></div></div></div>',
  init() {
    const run = () => {
      const rows = [1, 2, 3, 4].map(i => ({ sym: $('es' + i).value.trim(), amt: val('ea' + i) })).filter(r => r.sym || r.amt !== null)
        .map(r => ({ sym: r.sym ? r.sym[0].toUpperCase() + r.sym.slice(1).toLowerCase() : '', amt: r.amt }));
      let r; try { r = Chem.empiricalFormula(rows, val('emm')); } catch (e) { showErr('eout2', e.message); return; }
      let t = '<div class="rb"><div class="rl">Empirical formula</div><div class="big">' + fmtFormula(r.formula) + '</div>' +
        (r.molecular ? '<div class="rr"><span class="rl">Molecular formula</span><span class="rv a">' + fmtFormula(r.molecular) + '</span></div>' : '') + '</div>' +
        '<table class="tbl" style="margin-top:12px"><tr><th>Element</th><th style="text-align:right">Amount</th><th style="text-align:right">÷ atomic mass = moles</th><th style="text-align:right">÷ smallest</th>' + (r.mult > 1 ? '<th style="text-align:right">× ' + r.mult + '</th>' : '') + '</tr>' +
        r.data.map(d => '<tr><td><b>' + d.sym + '</b></td><td class="n">' + d.amt + '</td><td class="n">' + d.amt + ' ÷ ' + +d.am.toFixed(3) + ' = ' + d.mol.toFixed(3) + '</td><td class="n">' + d.ratio.toFixed(2) + '</td>' + (r.mult > 1 ? '<td class="n">' + (d.ratio * r.mult).toFixed(2) + '</td>' : '') + '</tr>').join('') + '</table>' +
        '<div class="steps"><div class="st">Steps</div>1. Treat percents as grams (assume a 100 g sample).<br>2. Convert each to moles.<br>3. Divide by the smallest number of moles.' +
        (r.mult > 1 ? '<br>4. The ratios weren\'t whole numbers, so multiply all of them by ' + r.mult + '.' : '') +
        '<br><b>Empirical formula: ' + fmtFormula(r.formula) + '</b> (' + r.efm.toFixed(2) + ' g/mol)' +
        (r.molecular ? '<br>Molecular: ' + val('emm') + ' ÷ ' + r.efm.toFixed(2) + ' = ' + r.nExact.toFixed(2) + ' ≈ ' + r.n + ', so <b>' + fmtFormula(r.molecular) + '</b>' : '') + '</div>';
      if (r.molecular && Math.abs(r.nExact - r.n) > 0.15) t += '<div class="err">The molar mass isn\'t close to a whole-number multiple of the empirical formula mass. Double-check your data.</div>';
      $('eout2').innerHTML = t;
    };
    $('ego2').onclick = run; onEnter(['ea1', 'ea2', 'ea3', 'ea4', 'emm'], run);
  }
};

/* ============ 8. Stoichiometry ============ */
CALCS['Stoichiometry'] = {
  sub: 'Use a balanced equation to convert between substances. Add a second reactant to find the limiting reactant, and an actual yield to get percent yield.',
  html: '<div class="card"><div class="ch">1 · Equation</div><div class="cb">' +
    '<div class="fr"><label for="sqeq">Equation (balanced or not)</label><input id="sqeq" placeholder="e.g. N2 + H2 -> NH3" autocapitalize="off" autocomplete="off" spellcheck="false"></div>' +
    '<div class="br"><button class="btn bc" id="sqload">Load equation</button></div><div id="sqbal"></div></div></div>' +
    '<div class="card" id="sqcard" style="display:none"><div class="ch">2 · Amounts</div><div class="cb">' +
    '<div class="fr"><label for="sqg">Given substance</label><select id="sqg"></select></div>' +
    '<div class="fr"><label for="sqga">Amount given</label><div class="iu"><input id="sqga" type="number" inputmode="decimal"><select id="sqgu"><option value="g">grams</option><option value="mol">moles</option></select></div></div>' +
    '<div class="fr"><label for="sqt">Find amount of</label><select id="sqt"></select></div>' +
    '<details style="margin:6px 0 10px"><summary class="rl" style="cursor:pointer">Limiting reactant / percent yield (optional)</summary><div style="margin-top:10px">' +
    '<div class="fr"><label for="sq2">Second reactant</label><select id="sq2"><option value="">(none)</option></select></div>' +
    '<div class="fr"><label for="sq2a">Amount of second</label><div class="iu"><input id="sq2a" type="number" inputmode="decimal"><select id="sq2u"><option value="g">grams</option><option value="mol">moles</option></select></div></div>' +
    '<div class="fr"><label for="sqay">Actual yield (g)</label><input id="sqay" type="number" inputmode="decimal" placeholder="from your lab"></div></div></details>' +
    '<div class="br"><button class="btn bc" id="sqgo">Calculate</button></div><div id="sqout"></div></div></div>',
  init(pre) {
    let B = null;
    const load = () => {
      try { B = Chem.balance($('sqeq').value); } catch (e) { B = null; $('sqcard').style.display = 'none'; showErr('sqbal', e.message); return; }
      const sp = B.reactants.concat(B.products);
      const side = (list, off) => list.map((f, i) => (B.coef[i + off] > 1 ? '<span class="cf">' + B.coef[i + off] + '</span>' : '') + fmtFormula(f)).join(' + ');
      $('sqbal').innerHTML = '<div class="rb"><div class="rl">Balanced</div><div class="eqout">' + side(B.reactants, 0) + ' → ' + side(B.products, B.reactants.length) + '</div></div>';
      const opts = sp.map((f, i) => '<option value="' + i + '">' + esc(f) + (i < B.reactants.length ? ' (reactant)' : ' (product)') + '</option>').join('');
      $('sqg').innerHTML = opts; $('sqt').innerHTML = opts; $('sqt').value = String(sp.length - 1);
      $('sq2').innerHTML = '<option value="">(none)</option>' + B.reactants.map((f, i) => '<option value="' + i + '">' + esc(f) + '</option>').join('');
      $('sqcard').style.display = ''; $('sqout').innerHTML = '';
    };
    const run = () => {
      if (!B) return;
      const gi = +$('sqg').value, ti = +$('sqt').value, ga = val('sqga');
      if (ga === null) { showErr('sqout', 'Enter the amount of the given substance.'); return; }
      if (gi === ti) { showErr('sqout', 'Pick a different substance to find.'); return; }
      let second = null;
      if ($('sq2').value !== '') {
        const a2 = val('sq2a');
        if (a2 === null) { showErr('sqout', 'Enter the amount of the second reactant, or set it to (none).'); return; }
        if (gi >= B.reactants.length) { showErr('sqout', 'For a limiting-reactant problem, the given substance must also be a reactant.'); return; }
        second = { i: +$('sq2').value, amount: a2, unit: $('sq2u').value };
      }
      let r; try { r = Chem.stoich($('sqeq').value, { i: gi, amount: ga, unit: $('sqgu').value }, ti, second); } catch (e) { showErr('sqout', e.message); return; }
      const sp = r.species, f = i => fmtFormula(sp[i]), c = r.b.coef;
      let st = '';
      r.cands.forEach((cd, k) => {
        const g = k === 0 ? { a: ga, u: $('sqgu').value } : { a: second.amount, u: second.unit };
        st += (g.u === 'g' ? g.a + ' g ' + f(cd.i) + ' ÷ ' + r.mm[cd.i].toFixed(2) + ' g/mol = ' + fmt(cd.mol) + ' mol ' + f(cd.i) + '<br>' : '') +
          fmt(cd.mol) + ' mol ' + f(cd.i) + ' × (' + c[ti] + ' ' + f(ti) + ' / ' + c[cd.i] + ' ' + f(cd.i) + ') = <b>' + fmt(cd.product) + ' mol ' + f(ti) + '</b><br>';
      });
      let lim = '';
      if (r.excess) {
        lim = '<div class="rr"><span class="rl">Limiting reactant</span><span class="rv s">' + f(r.limiting) + '</span></div>' +
          '<div class="rr"><span class="rl">Excess left over</span><span class="rv">' + fmt(r.excess.left, 3) + ' mol ' + f(r.excess.i) + ' (' + fmt(r.excess.leftG, 3) + ' g)</span></div>';
        st += f(r.limiting) + ' makes less product, so it is the <b>limiting reactant</b>.<br>';
      }
      st += fmt(r.molT) + ' mol × ' + r.mm[ti].toFixed(2) + ' g/mol = <b>' + fmt(r.gT) + ' g ' + f(ti) + '</b>';
      const ay = val('sqay');
      let yld = '';
      if (ay !== null && ti >= r.b.reactants.length) {
        const p = ay / r.gT * 100;
        yld = '<div class="rr"><span class="rl">Percent yield</span><span class="rv a">' + p.toFixed(1) + '%</span></div>';
        st += '<br>% yield = ' + ay + ' g ÷ ' + fmt(r.gT) + ' g × 100 = <b>' + p.toFixed(1) + '%</b>';
      }
      $('sqout').innerHTML = '<div class="rb"><div class="rl">' + (r.excess ? 'Theoretical yield of ' : 'Amount of ') + f(ti) + '</div><div class="big">' + fmt(r.gT, 3) + ' g</div>' +
        '<div class="rr"><span class="rl">Moles</span><span class="rv a">' + fmt(r.molT, 3) + ' mol</span></div>' + lim + yld + '</div>' +
        '<div class="steps"><div class="st">Steps: grams → moles → mole ratio → moles → grams</div>' + st + '</div>';
    };
    $('sqload').onclick = load; onEnter(['sqeq'], load);
    $('sqgo').onclick = run; onEnter(['sqga', 'sq2a', 'sqay'], run);
    if (pre) { $('sqeq').value = pre; load(); }
  }
};

/* ============ 9. Heat ============ */
CALCS['Heat'] = {
  sub: 'Heat energy (q) in joules, using the Reference Table formulas. Leave the unknown blank.',
  html: '<div class="seg" id="qmode"></div><div id="qbody"></div>',
  init() {
    const W = Chem.WATER;
    const views = {
      c: '<div class="card"><div class="ch">q = mCΔT (temperature change, no phase change)</div><div class="cb">' +
        '<div class="fr"><label for="qq">Heat q (J)</label><input id="qq" type="number" inputmode="decimal"></div>' +
        '<div class="fr"><label for="qm">Mass m (g)</label><input id="qm" type="number" inputmode="decimal"></div>' +
        '<div class="fr"><label for="qc">Specific heat C (J/g·K)</label><input id="qc" type="number" inputmode="decimal" value="' + W.C + '"></div>' +
        '<div class="fr"><label for="qt">Temperature change ΔT (K or °C)</label><input id="qt" type="number" inputmode="decimal"></div>' +
        '<div class="hint">C = 4.18 J/g·K for liquid water. A change of 1 °C equals a change of 1 K, so ΔT is the same in both. Use final − initial; a negative q means heat was released.</div>' +
        '<div class="br"><button class="btn bc" id="qgo">Solve</button></div><div id="qout"></div></div></div>',
      f: phase('f', 'q = mH<sub>f</sub> (melting or freezing)', 'Heat of fusion H<sub>f</sub> (J/g)', W.Hf),
      v: phase('v', 'q = mH<sub>v</sub> (boiling or condensing)', 'Heat of vaporization H<sub>v</sub> (J/g)', W.Hv)
    };
    function phase(k, title, lbl, def) {
      return '<div class="card"><div class="ch">' + title + '</div><div class="cb">' +
        '<div class="fr"><label for="pq' + k + '">Heat q (J)</label><input id="pq' + k + '" type="number" inputmode="decimal"></div>' +
        '<div class="fr"><label for="pm' + k + '">Mass m (g)</label><input id="pm' + k + '" type="number" inputmode="decimal"></div>' +
        '<div class="fr"><label for="ph' + k + '">' + lbl + '</label><input id="ph' + k + '" type="number" inputmode="decimal" value="' + def + '"></div>' +
        '<div class="hint">Value shown is for water. During a phase change the temperature stays constant.</div>' +
        '<div class="br"><button class="btn bc" id="pg' + k + '">Solve</button></div><div id="po' + k + '"></div></div></div>';
    }
    const show = k => {
      $('qbody').innerHTML = views[k];
      if (k === 'c') { $('qgo').onclick = solveC; onEnter(['qq', 'qm', 'qc', 'qt'], solveC); }
      else { $('pg' + k).onclick = () => solveP(k); onEnter(['pq' + k, 'pm' + k, 'ph' + k], () => solveP(k)); }
    };
    function solveC() {
      const q = val('qq'), m = val('qm'), C = val('qc'), dT = val('qt'), a = [q, m, C, dT];
      if (a.filter(x => x === null).length !== 1) { showErr('qout', 'Leave exactly one box blank - that is the value Catalyst will solve for.'); return; }
      if ((m !== null && m <= 0) || (C !== null && C <= 0)) { showErr('qout', 'Mass and specific heat must be greater than zero.'); return; }
      if ((q === 0 && dT === null) || (dT === 0 && q !== null)) { showErr('qout', 'With q or ΔT equal to zero there is nothing to solve.'); return; }
      let r, st;
      if (q === null) { r = m * C * dT; st = 'q = mCΔT = ' + m + ' × ' + C + ' × ' + dT + ' = <b>' + fmt(r, 3) + ' J</b>'; r = fmt(r, 3) + ' J'; }
      else if (m === null) { r = q / (C * dT); st = 'm = q / (CΔT) = ' + q + ' / (' + C + ' × ' + dT + ') = <b>' + fmt(r, 3) + ' g</b>'; r = fmt(r, 3) + ' g'; }
      else if (C === null) { r = q / (m * dT); st = 'C = q / (mΔT) = ' + q + ' / (' + m + ' × ' + dT + ') = <b>' + fmt(r, 3) + ' J/g·K</b>'; r = fmt(r, 3) + ' J/g·K'; }
      else { r = q / (m * C); st = 'ΔT = q / (mC) = ' + q + ' / (' + m + ' × ' + C + ') = <b>' + fmt(r, 3) + ' K</b>'; r = fmt(r, 3) + ' K (same as °C)'; }
      if ((q === null || C === null || m === null) && typeof r === 'string' && /^-/.test(r) && m === null) { showErr('qout', 'That gives a negative mass. Check the signs of q and ΔT (they must match).'); return; }
      $('qout').innerHTML = '<div class="rb"><div class="big">' + r + '</div></div><div class="steps"><div class="st">Steps</div>' + st + '</div>';
    }
    function solveP(k) {
      const q = val('pq' + k), m = val('pm' + k), H = val('ph' + k), a = [q, m, H];
      if (!oneBlank(a, 'po' + k)) return;
      const sym = k === 'f' ? 'H<sub>f</sub>' : 'H<sub>v</sub>';
      let r, st;
      if (q === null) { r = m * H; st = 'q = m' + sym + ' = ' + m + ' × ' + H + ' = <b>' + fmt(r, 3) + ' J</b>'; r = fmt(r, 3) + ' J'; }
      else if (m === null) { r = q / H; st = 'm = q / ' + sym + ' = ' + q + ' / ' + H + ' = <b>' + fmt(r, 3) + ' g</b>'; r = fmt(r, 3) + ' g'; }
      else { r = q / m; st = sym + ' = q / m = ' + q + ' / ' + m + ' = <b>' + fmt(r, 3) + ' J/g</b>'; r = fmt(r, 3) + ' J/g'; }
      $('po' + k).innerHTML = '<div class="rb"><div class="big">' + r + '</div></div><div class="steps"><div class="st">Steps</div>' + st + '</div>';
    }
    segBtns('qmode', [['c', 'Temperature change'], ['f', 'Melting / freezing'], ['v', 'Boiling / condensing']], 'c', show);
    show('c');
  }
};
