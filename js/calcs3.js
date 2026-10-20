/* Catalyst - calculators added in v0.5.0 (indices 10-11 in NAMES). Uses helpers from calcs.js and SV from study.js. */
'use strict';
NAMES.push('Bond Polarity', 'Atom & Ion Counter');

/* find an element by symbol ("cl", "Cl") or name ("chlorine") */
function findEl(s) {
  s = String(s || '').trim(); if (!s) return null;
  const lo = s.toLowerCase();
  return ELEMENTS.find(e => e.s.toLowerCase() === lo) || ELEMENTS.find(e => e.n.toLowerCase() === lo) || null;
}
function isMetal(e) { return ['alkali', 'alkaline', 'post', 'transition', 'lanthanide', 'actinide'].includes(e.cat); }
function isNonmetal(e) { return e.cat === 'nonmetal' || e.cat === 'halogen' || e.cat === 'noble'; }
function valenceOf(e) { if (e.z === 2) return 2; if (!e.g) return null; if (e.g <= 2) return e.g; if (e.g >= 13) return e.g - 10; return null; }
const IDE = { H: 'hydride', C: 'carbide', N: 'nitride', O: 'oxide', F: 'fluoride', P: 'phosphide', S: 'sulfide', Cl: 'chloride', As: 'arsenide', Se: 'selenide', Br: 'bromide', Te: 'telluride', I: 'iodide' };
const SUPD = d => String(d).replace(/[0-9]/g, c => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);
const SUBD = d => String(d).replace(/[0-9]/g, c => '₀₁₂₃₄₅₆₇₈₉'[c]);

/* ============ 10. Bond Polarity ============ */
CALCS['Bond Polarity'] = {
  sub: 'Pick the two atoms in a bond. Catalyst finds the difference in electronegativity (ΔEN) and tells you if the bond is nonpolar covalent, polar covalent or ionic, using your class\'s ranges.',
  html: '<div class="card"><div class="ch">The bond</div><div class="cb">' +
    '<div class="t2"><div class="fr"><label for="bp1">Atom 1</label><input id="bp1" placeholder="H" autocomplete="off" autocapitalize="words"></div>' +
    '<div class="fr"><label for="bp2">Atom 2</label><input id="bp2" placeholder="Cl" autocomplete="off" autocapitalize="words"></div></div>' +
    '<div class="hint">Type a symbol or a name, like O or oxygen.</div>' +
    '<div class="br"><button class="btn bc" id="bpgo">Find ΔEN</button><button class="btn bs" id="bpex1">H–Cl</button><button class="btn bs" id="bpex2">Na–Cl</button><button class="btn bs" id="bpex3">C–H</button><button class="btn bs" id="bpex4">H–F</button></div>' +
    '<div id="bpout"></div></div></div>' +
    '<div class="card"><div class="ch">Your class\'s ranges</div><div class="cb"><table class="tbl"><tr><th>ΔEN</th><th>Bond type</th><th>Electrons are…</th></tr>' +
    '<tr><td>0.0 – 0.3</td><td>Nonpolar covalent</td><td>shared equally</td></tr><tr><td>0.4 – 1.7</td><td>Polar covalent</td><td>shared unequally (δ+ and δ−)</td></tr>' +
    '<tr><td>more than 1.7</td><td>Ionic</td><td>transferred (full + and − charges)</td></tr></table>' +
    '<div class="hint">Electronegativity values are not on the 2025 Reference Tables. A test question gives you the values; use the ones it gives. Catalyst uses the 2-decimal Pauling values from your class chart (H 2.20, Cl 3.16). Older charts round them (H 2.1, Cl 3.0), so ΔEN can come out slightly different, but the bond type is almost always the same.</div></div></div>',
  init(pre) {
    const run = () => {
      const a = findEl($('bp1').value), b = findEl($('bp2').value);
      if (!a || !b) { showErr('bpout', 'Enter two elements, like H and Cl.'); return; }
      if (a.en == null || b.en == null) { showErr('bpout', (a.en == null ? a.n : b.n) + ' has no electronegativity value. Noble gases almost never form bonds.'); return; }
      const hi = a.en >= b.en ? a : b, lo = hi === a ? b : a, d = Math.round((hi.en - lo.en) * 100) / 100;
      let type, why = '';
      if (d < 0.4) { type = 'Nonpolar covalent'; if (d > 0.3) why = 'ΔEN ' + d.toFixed(2) + ' falls between your class\'s ranges (0.3 and 0.4). Bonds like C–H are treated as nonpolar.'; }
      else if (d <= 1.7) type = 'Polar covalent';
      else type = 'Ionic';
      const bothNon = !isMetal(a) && !isMetal(b), metalNon = (isMetal(a) && isNonmetal(b)) || (isMetal(b) && isNonmetal(a));
      if (type === 'Ionic' && bothNon) { type = 'Very polar covalent'; why = 'ΔEN is above 1.7, but both atoms are nonmetals, and two nonmetals always <b>share</b> electrons. H–F is the classic example: a very polar covalent bond, not ionic.'; }
      if (type !== 'Ionic' && metalNon) why = 'By ΔEN alone this is ' + type.toLowerCase() + ', but a metal bonded to a nonmetal is a <b>salt</b>, and your class treats salts as <b>ionic</b>.';
      if (a.z === b.z) why = 'Two atoms of the same element pull equally, so ΔEN is 0 and the electrons are shared equally.';
      const polar = d >= 0.4;
      const fig = SV.wrap(300, 110, 'Bond between ' + a.s + ' and ' + b.s,
        SV.t(70, 62, lo.s, 'sv-a') + SV.t(230, 62, hi.s, 'sv-a') + '<line class="sv-l" x1="96" y1="62" x2="204" y2="62"/>' +
        (polar ? SV.t(70, 30, 'δ+', 'sv-t') + SV.t(230, 30, 'δ−', 'sv-t') + SV.arrow(70, 95, 225, 95, '#0FA89B') + '<line x1="82" y1="87" x2="82" y2="103" stroke="#0FA89B" stroke-width="3"/>' : SV.t(150, 100, 'equal sharing, no partial charges', 'sv-s')));
      $('bpout').innerHTML = '<div class="rb"><div class="rl">ΔEN = ' + hi.en.toFixed(2) + ' − ' + lo.en.toFixed(2) + '</div><div class="big">' + d.toFixed(2) + '</div><div class="rl" style="font-size:15px;font-weight:700;color:var(--nb)">' + type + '</div></div>' +
        (why ? '<div class="hint" style="margin-top:8px">' + why + '</div>' : '') +
        '<figure style="text-align:center;margin:10px 0">' + fig + '</figure>' +
        '<div class="steps"><div class="st">Steps</div>1. Look up each electronegativity: ' + a.n + ' = ' + a.en.toFixed(2) + ', ' + b.n + ' = ' + b.en.toFixed(2) + '.<br>' +
        '2. Bigger − smaller: ' + hi.en.toFixed(2) + ' − ' + lo.en.toFixed(2) + ' = <b>' + d.toFixed(2) + '</b>.<br>3. Compare with the ranges: ' + (d < 0.4 ? '0.0–0.3 (nonpolar)' : d <= 1.7 ? '0.4–1.7 (polar)' : 'more than 1.7 (ionic)') + '.' +
        (polar && type !== 'Ionic' ? '<br>4. ' + hi.n + ' pulls the shared electrons harder, so it gets δ− and ' + lo.n.toLowerCase() + ' gets δ+. The dipole arrow points toward ' + hi.s + ', with the cross at the δ+ end.' : '') + '</div>';
    };
    const ex = (x, y) => () => { $('bp1').value = x; $('bp2').value = y; run(); };
    $('bpgo').onclick = run; $('bpex1').onclick = ex('H', 'Cl'); $('bpex2').onclick = ex('Na', 'Cl'); $('bpex3').onclick = ex('C', 'H'); $('bpex4').onclick = ex('H', 'F');
    onEnter(['bp1', 'bp2'], run);
    if (pre) { const p = pre.split(','); $('bp1').value = p[0] || ''; $('bp2').value = p[1] || ''; run(); }
  }
};

/* ============ 11. Atom & Ion Counter ============ */
function shellsFor(e) { const s = [Math.min(e, 2), Math.min(Math.max(e - 2, 0), 8), Math.min(Math.max(e - 10, 0), 8), Math.max(e - 18, 0)]; while (s.length > 1 && !s[s.length - 1]) s.pop(); return s; }
CALCS['Atom & Ion Counter'] = {
  sub: 'Enter an element, plus a mass number or a charge if you have them. Catalyst counts the protons, neutrons and electrons and draws the Bohr and Lewis dot diagrams.',
  html: '<div class="card"><div class="ch">Atom, isotope or ion</div><div class="cb">' +
    '<div class="t2"><div class="fr"><label for="ic1">Element</label><input id="ic1" placeholder="Cl" autocomplete="off" autocapitalize="words"></div>' +
    '<div class="fr"><label for="ic2">Mass number (optional)</label><input id="ic2" type="number" inputmode="numeric" placeholder="35"></div></div>' +
    '<div class="fr"><label for="ic3">Charge (optional)</label><input id="ic3" placeholder="0, 2+, 3−, -1 …" autocomplete="off"></div>' +
    '<div class="hint">No mass number? Catalyst rounds the atomic mass from the periodic table, which gives the most common isotope.</div>' +
    '<div class="br"><button class="btn bc" id="icgo">Count</button><button class="btn bs" id="icx1">Cl-35</button><button class="btn bs" id="icx2">Mg²⁺</button><button class="btn bs" id="icx3">S²⁻</button><button class="btn bs" id="icx4">Al-29</button><button class="btn bs" id="icx5">C-14</button></div>' +
    '<div id="icout"></div></div></div>',
  init(pre) {
    const parseQ = s => {
      s = String(s || '').trim().replace(/[−–]/g, '-').replace(/\s/g, ''); if (!s || s === '0') return 0;
      const m = s.match(/^([+-])?(\d*)([+-])?$/); if (!m || (m[1] && m[3]) || (!m[1] && !m[3])) return NaN;
      return (m[1] || m[3]) === '-' ? -(+m[2] || 1) : (+m[2] || 1);
    };
    const run = () => {
      const e = findEl($('ic1').value); if (!e) { showErr('icout', 'Enter an element symbol or name, like Cl or chlorine.'); return; }
      const q = parseQ($('ic3').value); if (isNaN(q)) { showErr('icout', 'Write the charge like 2+, 3−, +1 or -2.'); return; }
      const rounded = Math.round(e.m), given = $('ic2').value.trim() !== '', A = given ? Math.round(+$('ic2').value) : rounded;
      if (A < e.z) { showErr('icout', 'The mass number can\'t be smaller than the atomic number (' + e.z + ').'); return; }
      const p = e.z, n = A - p, el = p - q;
      if (el < 0) { showErr('icout', 'That charge would need ' + el + ' electrons. ' + e.n + ' only has ' + p + ' to lose.'); return; }
      const kind = q === 0 ? (given && A !== rounded ? 'isotope (neutral atom)' : 'neutral atom') : q > 0 ? 'cation (positive ion)' : 'anion (negative ion)';
      const nm = q === 0 ? e.n + '-' + A : q > 0 ? e.n.toLowerCase() + ' ion' : (IDE[e.s] || e.n.toLowerCase() + ' ion') + (IDE[e.s] ? ' ion' : '');
      const notation = '<span style="display:inline-flex;align-items:center;font-size:30px;font-weight:700;color:var(--nb)"><span style="display:inline-flex;flex-direction:column;font-size:14px;line-height:1.1;text-align:right;margin-right:2px"><span>' + A + '</span><span>' + p + '</span></span>' + e.s + (q ? '<sup style="font-size:15px">' + SV.chg(q) + '</sup>' : '') + '</span>';
      let figs = '';
      if (el <= 20 && p <= 20) figs += '<div>' + SV.bohrIon(e.s, p, n, shellsFor(el), q) + '</div>';
      const v = valenceOf(e);
      if (v !== null) {
        if (q === 0) figs += '<div>' + SV.lewisDot(e.s, v, 0) + '<div class="rl">Lewis dot: ' + v + ' valence e⁻</div></div>';
        else if (q > 0 && q === v) figs += '<div>' + SV.lewisDot(e.s, 0, q) + '<div class="rl">Lewis dot: lost all ' + v + ' valence e⁻</div></div>';
        else if (q < 0 && v - q === 8) figs += '<div>' + SV.lewisDot(e.s, 8, q) + '<div class="rl">Lewis dot: a full octet</div></div>';
      }
      let note = '';
      if (q !== 0 && v !== null && ((q > 0 && q !== v) || (q < 0 && v - q !== 8))) note = e.n + ' usually forms ' + (v <= 3 ? 'a ' + SV.chg(v) : v >= 5 && v <= 7 ? 'a ' + SV.chg(v - 8) : 'no simple') + ' ion. Double-check the charge.';
      if (!given && Math.abs(e.m - rounded) > 0.3) note += (note ? ' ' : '') + 'Heads up: ' + e.n + '\'s average mass (' + e.m + ') is not close to a whole number, so the rounded value is only an estimate of the most common isotope.';
      $('icout').innerHTML = '<div class="rb"><div class="rl">' + kind + ' · ' + esc(nm) + '</div><div style="margin:6px 0">' + notation + '</div>' +
        '<table class="tbl" style="max-width:340px;margin:6px auto 0"><tr><th>Protons</th><th>Neutrons</th><th>Electrons</th><th>Charge</th></tr><tr><td class="n" style="font-size:18px;font-weight:700">' + p + '</td><td class="n" style="font-size:18px;font-weight:700">' + n + '</td><td class="n" style="font-size:18px;font-weight:700">' + el + '</td><td class="n" style="font-size:18px;font-weight:700">' + (q ? SV.chg(q) : '0') + '</td></tr></table></div>' +
        (note ? '<div class="hint" style="margin-top:8px">' + note + '</div>' : '') +
        (figs ? '<div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;align-items:center;margin:12px 0;text-align:center">' + figs + '</div>' : '') +
        (p > 20 && el <= 120 ? '<div class="hint">Bohr diagrams in this app are drawn for the first 20 elements, like in class.</div>' : '') +
        '<div class="steps"><div class="st">Steps</div>' +
        '1. <b>Protons</b> = atomic number = <b>' + p + '</b>. (Protons never change; changing them makes a different element.)<br>' +
        '2. <b>Mass number</b> = ' + (given ? A + ' (given)' : 'rounded atomic mass: ' + e.m + ' → ' + A) + '.<br>' +
        '3. <b>Neutrons</b> = mass number − atomic number = ' + A + ' − ' + p + ' = <b>' + n + '</b>.<br>' +
        '4. <b>Electrons</b>: ' + (q === 0 ? 'a neutral atom has the same number as protons = <b>' + el + '</b>.' : 'protons − electrons = charge, so electrons = ' + p + ' − (' + (q > 0 ? '+' : '') + q + ') = <b>' + el + '</b>. ' + (q > 0 ? 'It lost ' + q : 'It gained ' + (-q)) + ' electron' + (Math.abs(q) > 1 ? 's' : '') + '.') +
        '</div>';
    };
    const ex = (s, a, c) => () => { $('ic1').value = s; $('ic2').value = a; $('ic3').value = c; run(); };
    $('icgo').onclick = run; $('icx1').onclick = ex('Cl', 35, ''); $('icx2').onclick = ex('Mg', '', '2+'); $('icx3').onclick = ex('S', '', '2-'); $('icx4').onclick = ex('Al', 29, ''); $('icx5').onclick = ex('C', 14, '');
    onEnter(['ic1', 'ic2', 'ic3'], run);
    if (pre) { const p = pre.split(','); $('ic1').value = p[0] || ''; $('ic2').value = p[1] || ''; $('ic3').value = p[2] || ''; run(); }
  }
};
