/* Catalyst - Unit c2: Ions & Salts. Follows the class storyline, September 18-28, 2026:
   Lesson 5 (electrolytes, Sep 18), Lesson 6 (why salts are not 1:1, Sep 23), the K/Na reading,
   and her notebook (electrolytes Sep 22, groups/periods Sep 24, Bohr and Lewis Sep 25, metals and formulas Sep 28). */
'use strict';
const FIGC2 = (function () {
  const CO = '#E07A5F', TL = '#0FA89B', NB = '#22145A';
  const dot = (x, y, c) => '<circle cx="' + x + '" cy="' + y + '" r="3.2" fill="' + (c || TL) + '"/>';
  /* Lewis symbol with explicit dots: d.t / d.r / d.b / d.l are lists of dot colors (1 or 2 per side) */
  const lw = (x, y, sym, d) => {
    const dx = sym.length > 1 ? 23 : 17, dy = 19, g = 5;
    let s = SV.t(x, y, sym, 'sv-a');
    ['t', 'r', 'b', 'l'].forEach(k => {
      (d[k] || []).forEach((c, i, arr) => {
        const o = arr.length === 1 ? 0 : (i ? g : -g);
        if (k === 't') s += dot(x + o, y - dy, c);
        else if (k === 'b') s += dot(x + o, y + dy, c);
        else if (k === 'r') s += dot(x + dx, y + o, c);
        else s += dot(x - dx, y + o, c);
      });
    });
    return s;
  };
  const brk = (x1, x2, y1, y2, q) => '<path d="M' + (x1 + 7) + ' ' + y1 + ' H' + x1 + ' V' + y2 + ' H' + (x1 + 7) + ' M' + (x2 - 7) + ' ' + y1 + ' H' + x2 + ' V' + y2 + ' H' + (x2 - 7) + '" fill="none" stroke="' + NB + '" stroke-width="2"/>' +
    '<text x="' + (x2 + 4) + '" y="' + (y1 + 10) + '" font-size="15" font-weight="700" fill="' + NB + '">' + SV.chg(q) + '</text>';
  /* curved arrow (quadratic) with a head at the end */
  const carr = (x1, y1, cx, cy, x2, y2, c) => {
    const a = Math.atan2(y2 - cy, x2 - cx), h = 9;
    return '<path d="M' + x1 + ' ' + y1 + ' Q' + cx + ' ' + cy + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="' + (c || CO) + '" stroke-width="2"/>' +
      '<polygon fill="' + (c || CO) + '" points="' + x2 + ',' + y2 + ' ' + (x2 - h * Math.cos(a - .45)).toFixed(1) + ',' + (y2 - h * Math.sin(a - .45)).toFixed(1) + ' ' + (x2 - h * Math.cos(a + .45)).toFixed(1) + ',' + (y2 - h * Math.sin(a + .45)).toFixed(1) + '"/>';
  };
  /* small thin arrow */
  const sarr = (x1, y1, x2, y2, c) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 6;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + c + '" stroke-width="1.8"/>' +
      '<polygon fill="' + c + '" points="' + x2 + ',' + y2 + ' ' + (x2 - h * Math.cos(a - .5)).toFixed(1) + ',' + (y2 - h * Math.sin(a - .5)).toFixed(1) + ' ' + (x2 - h * Math.cos(a + .5)).toFixed(1) + ',' + (y2 - h * Math.sin(a + .5)).toFixed(1) + '"/>';
  };
  /* an ion as a circle with + or − */
  const ion = (x, y, pos, r) => {
    r = r || 8;
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (pos ? '#FFD9CC' : '#C9F1EC') + '" stroke="' + (pos ? CO : TL) + '" stroke-width="1.5"/>' +
      '<text x="' + x + '" y="' + (y + 0.5) + '" text-anchor="middle" dominant-baseline="central" font-size="' + (r > 9 ? 14 : 12) + '" font-weight="700" fill="' + NB + '">' + (pos ? '+' : '−') + '</text>';
  };
  const S = '<style>.c2-row{display:flex;flex-wrap:wrap;justify-content:center;align-items:flex-end;gap:10px 18px;margin:12px 0}' +
    '.c2-row>div{text-align:center;font-size:12px;color:#6E6888;line-height:1.35;max-width:46%}.c2-row svg{width:100%;height:auto;display:block;margin:0 auto 3px}' +
    '.c2-sc{overflow-x:auto;max-width:100%}.c2-iso{display:inline-flex;flex-direction:column;font-size:.68em;line-height:1.05;vertical-align:.32em;text-align:right;margin-right:1px}</style>';
  /* a centered row of small diagrams: items = [[svg, widthPx, caption], ...] */
  const row = items => '<div class="c2-row">' + items.map(it => '<div style="width:' + it[1] + 'px">' + it[0] + it[2] + '</div>').join('') + '</div>';
  const iso = (A, Z, sym, q) => '<span class="c2-iso"><span>' + A + '</span><span>' + Z + '</span></span>' + sym + (q ? '<sup>' + q + '</sup>' : '');

  const F = { css: S };

  /* 1. Three beakers: non-, weak and strong electrolyte */
  F.beakers = (function () {
    const P = [[-50, 146, 1], [50, 150, 0], [-12, 146, 0], [12, 158, 1], [-10, 171, 1], [50, 182, 1], [-49, 178, 0],
      [10, 186, 0], [-12, 194, 0], [12, 212, 1], [-50, 209, 1], [50, 211, 0], [-12, 216, 1], [14, 137, 0]];
    const B = [
      { x: 100, ions: [], glow: 0, name: 'Non-electrolyte', sub: 'no ions → no current', ex: 'e.g. DI water, sugar water' },
      { x: 300, ions: [0, 4, 8, 11], glow: 1, name: 'Weak electrolyte', sub: 'few ions → dim bulb', ex: 'low concentration of ions' },
      { x: 500, ions: P.map((p, i) => i), glow: 2, name: 'Strong electrolyte', sub: 'many ions → bright bulb', ex: 'e.g. NaCl or KCl dissolved' }];
    let s = '';
    B.forEach(b => {
      const x = b.x;
      if (b.glow === 2) s += '<circle cx="' + x + '" cy="44" r="31" fill="#FFE98A" opacity=".55"/>';
      if (b.glow) {
        const n = b.glow === 2 ? 7 : 4, len = b.glow === 2 ? 12 : 6;
        for (let i = 0; i < n; i++) {
          const a = Math.PI + (i + 0.5) * Math.PI / n, r1 = 22;
          s += '<line x1="' + (x + r1 * Math.cos(a)).toFixed(1) + '" y1="' + (44 + r1 * Math.sin(a)).toFixed(1) + '" x2="' + (x + (r1 + len) * Math.cos(a)).toFixed(1) + '" y2="' + (44 + (r1 + len) * Math.sin(a)).toFixed(1) + '" stroke="#E0B400" stroke-width="2" stroke-linecap="round"/>';
        }
      }
      s += '<circle cx="' + x + '" cy="44" r="17" fill="' + ['#ECEAF2', '#FFF1BF', '#FFD54F'][b.glow] + '" stroke="' + ['#9C8FD0', '#E0B400', '#C99700'][b.glow] + '" stroke-width="1.8"/>';
      s += '<rect x="' + (x - 8) + '" y="60" width="16" height="10" rx="2" fill="#9C8FD0"/>';
      s += '<rect x="' + (x - 60) + '" y="128" width="120" height="98" fill="#DCEFFC"/>';
      s += '<path d="M' + (x - 4) + ' 70 V80 H' + (x - 30) + ' V96 M' + (x + 4) + ' 70 V80 H' + (x + 30) + ' V96" fill="none" stroke="#6E6888" stroke-width="1.6"/>';
      s += '<rect x="' + (x - 33) + '" y="96" width="6" height="114" fill="#8A8496"/><rect x="' + (x + 27) + '" y="96" width="6" height="114" fill="#8A8496"/>';
      b.ions.forEach(i => { s += ion(x + P[i][0], P[i][1], P[i][2]); });
      s += '<path d="M' + (x - 62) + ' 104 V222 Q' + (x - 62) + ' 228 ' + (x - 56) + ' 228 H' + (x + 56) + ' Q' + (x + 62) + ' 228 ' + (x + 62) + ' 222 V104" fill="none" stroke="#5B3FD0" stroke-width="2.5"/>';
      s += SV.t(x, 250, b.name) + SV.t(x, 267, b.sub, 'sv-s') + SV.t(x, 283, b.ex, 'sv-s');
    });
    return SV.wrap(600, 292, 'Three beakers: no ions and an unlit bulb, a few ions and a dim bulb, many ions and a bright bulb', s);
  })();

  /* 1b. Solid salt (locked ions) vs dissolved salt (mobile ions) */
  F.mobile = (function () {
    let s = SV.t(110, 24, 'Solid NaCl');
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) s += ion(50 + c * 30, 52 + r * 30, (r + c) % 2 === 0, 10);
    s += SV.t(110, 186, 'ions locked in place', 'sv-s') + SV.t(110, 202, '→ no current (low reading)', 'sv-s');
    s += SV.arrow(212, 110, 262, 110) + SV.t(237, 96, 'add water', 'sv-s');
    const x0 = 330, x1 = 530;
    s += '<rect x="' + (x0 + 2) + '" y="62" width="' + (x1 - x0 - 4) + '" height="114" fill="#DCEFFC"/>';
    s += '<rect x="' + (x0 + 18) + '" y="36" width="6" height="128" fill="#8A8496"/><rect x="' + (x1 - 24) + '" y="36" width="6" height="128" fill="#8A8496"/>';
    s += '<text x="' + (x0 + 21) + '" y="28" text-anchor="middle" font-size="18" font-weight="700" fill="' + NB + '">−</text><text x="' + (x1 - 21) + '" y="28" text-anchor="middle" font-size="18" font-weight="700" fill="' + NB + '">+</text>';
    [[400, 78, 1], [470, 78, 0], [380, 103, 0], [455, 103, 1], [425, 128, 1], [475, 128, 0], [375, 153, 0], [480, 153, 1]].forEach(p => {
      s += ion(p[0], p[1], p[2], 9);
      s += p[2] ? sarr(p[0] - 12, p[1], p[0] - 28, p[1], CO) : sarr(p[0] + 12, p[1], p[0] + 28, p[1], TL);
    });
    s += '<path d="M' + x0 + ' 50 V176 Q' + x0 + ' 182 ' + (x0 + 6) + ' 182 H' + (x1 - 6) + ' Q' + x1 + ' 182 ' + x1 + ' 176 V50" fill="none" stroke="#5B3FD0" stroke-width="2.5"/>';
    s += SV.t(430, 204, 'Dissolved NaCl: mobile ions', 'sv-t') + SV.t(430, 221, 'cations drift to the − side, anions to the + side', 'sv-s');
    return SV.wrap(560, 230, 'In solid salt the ions are locked in place; dissolved, the ions move toward the electrodes and carry the current', s);
  })();

  /* 2. Group 1: Na vs K */
  F.naK = row([
    [SV.bohrIon('Na', 11, 12, [2, 8, 1], 0), 190, '<b>Na</b>: Group 1, Period 3<br>3 shells, 1 valence e⁻'],
    [SV.bohrIon('K', 19, 20, [2, 8, 8, 1], 0), 225, '<b>K</b>: Group 1, Period 4<br>4 shells, 1 valence e⁻']]);

  /* 3. Bohr + Lewis worked examples */
  F.mg = row([[SV.bohrIon('Mg', 12, 12, [2, 8, 2], 0), 180, 'Bohr: all 12 electrons'], [SV.lewisDot('Mg', 2, 0), 125, 'Lewis: 2 valence dots']]);
  F.mg2 = row([[SV.bohrIon('Mg', 12, 12, [2, 8], 2), 180, 'Bohr: 10 electrons left'], [SV.lewisDot('Mg', 0, 2), 140, 'Lewis: [Mg]²⁺, no dots']]);
  F.s34 = row([[SV.bohrIon('S', 16, 18, [2, 8, 6], 0), 180, 'Bohr: 16 electrons'], [SV.lewisDot('S', 6, 0), 125, 'Lewis: 6 valence dots']]);
  F.s2 = row([[SV.bohrIon('S', 16, 16, [2, 8, 8], -2), 200, 'Bohr: 18 electrons'], [SV.lewisDot('S', 8, -2), 140, 'Lewis: [:S:]²⁻, 8 dots']]);
  F.n14 = row([[SV.bohrIon('N', 7, 7, [2, 5], 0), 150, 'Bohr: 7 electrons'], [SV.lewisDot('N', 5, 0), 125, 'Lewis: 5 valence dots']]);
  F.p3atoms = row([['Na', 1, '1'], ['Mg', 2, '2'], ['Al', 3, '13'], ['Si', 4, '14'], ['P', 5, '15'], ['S', 6, '16'], ['Cl', 7, '17'], ['Ar', 8, '18']]
    .map(e => [SV.lewisDot(e[0], e[1], 0), 64, 'Group ' + e[2]]));
  F.p3ions = row([['Na', 0, 1], ['Mg', 0, 2], ['Al', 0, 3], ['P', 8, -3], ['S', 8, -2], ['Cl', 8, -1]]
    .map(e => [SV.lewisDot(e[0], e[1], e[2]), 92, e[2] > 0 ? 'lost ' + e[2] + ' e⁻' : 'gained ' + (-e[2]) + ' e⁻']));
  F.iso = { mg24: iso(24, 12, 'Mg'), mg24i: iso(24, 12, 'Mg', '2+'), s34: iso(34, 16, 'S'), s32i: iso(32, 16, 'S', '2&minus;'), n14: iso(14, 7, 'N'), na23: iso(23, 11, 'Na') };

  /* 4. Na + Cl electron transfer */
  F.nacl = (function () {
    let s = lw(60, 75, 'Na', { r: [CO] }) + lw(210, 75, 'Cl', { t: [TL, TL], r: [TL, TL], b: [TL, TL], l: [TL] });
    s += carr(88, 70, 138, 20, 182, 79) + SV.t(138, 30, 'transfer of 1 e⁻', 'sv-s');
    s += SV.t(60, 122, 'Na (2-8-1)', 'sv-s') + SV.t(210, 122, 'Cl (2-8-7)', 'sv-s');
    s += SV.arrow(262, 75, 312, 75);
    s += SV.t(365, 75, 'Na', 'sv-a') + brk(340, 390, 52, 98, 1);
    s += lw(492, 75, 'Cl', { t: [TL, TL], r: [TL, TL], b: [TL, TL], l: [TL, CO] }) + brk(456, 528, 48, 102, -1);
    s += '<line x1="406" y1="75" x2="446" y2="75" stroke="#9C8FD0" stroke-width="2" stroke-dasharray="4 3"/>';
    s += SV.t(365, 122, 'Na⁺ (2-8)', 'sv-s') + SV.t(492, 122, 'Cl⁻ (2-8-8)', 'sv-s');
    s += SV.t(428, 150, 'opposite charges attract:', 'sv-s') + SV.t(428, 166, 'electrostatic (Coulombic) attraction', 'sv-t');
    return SV.wrap(580, 178, 'A sodium atom transfers its one valence electron to a chlorine atom, forming Na+ and Cl- ions that attract', s);
  })();

  /* 4b. NaCl crystal lattice */
  F.lattice = (function () {
    let s = '';
    for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
      const na = (r + c) % 2 === 0;
      s += ion(40 + c * 32, 30 + r * 32, na, na ? 10 : 14);
    }
    s += '<rect x="22" y="12" width="68" height="36" rx="8" fill="none" stroke="' + NB + '" stroke-width="1.6" stroke-dasharray="5 3"/>';
    s += '<text x="330" y="36" font-size="15" font-weight="600" fill="' + NB + '">A crystal lattice</text>';
    ['Each Na⁺ (orange, smaller) is surrounded by Cl⁻ ions,', 'and each Cl⁻ (teal, larger) by Na⁺ ions.', 'The pattern repeats in every direction.', 'There are no separate NaCl molecules.']
      .forEach((t, i) => { s += '<text x="330" y="' + (62 + i * 19) + '" font-size="12.5" fill="#6E6888">' + t + '</text>'; });
    s += '<text x="330" y="150" font-size="13" font-weight="600" fill="' + NB + '">Dashed box (top left) = one formula unit, NaCl</text>';
    s += '<text x="330" y="168" font-size="12.5" fill="#6E6888">(the 1 : 1 ratio of the ions)</text>';
    return SV.wrap(640, 190, 'Sodium chloride crystal lattice of alternating sodium and chloride ions', s);
  })();

  /* 4c. Why salts are not 1:1: MgCl2 */
  F.mgcl2 = (function () {
    let s = lw(70, 70, 'Cl', { t: [TL, TL], b: [TL, TL], l: [TL, TL], r: [TL] });
    s += lw(260, 70, 'Mg', { l: [CO], r: [CO] });
    s += lw(450, 70, 'Cl', { t: [TL, TL], b: [TL, TL], r: [TL, TL], l: [TL] });
    s += carr(232, 66, 165, 18, 101, 72) + carr(288, 66, 355, 18, 419, 72);
    s += SV.t(165, 34, '1 e⁻', 'sv-s') + SV.t(355, 34, '1 e⁻', 'sv-s');
    s += SV.t(70, 114, 'Cl needs 1', 'sv-s') + SV.t(260, 114, 'Mg gives away 2', 'sv-s') + SV.t(450, 114, 'Cl needs 1', 'sv-s');
    s += SV.arrow(260, 126, 260, 158);
    s += lw(110, 198, 'Cl', { t: [TL, TL], b: [TL, TL], l: [TL, TL], r: [TL, CO] }) + brk(74, 146, 172, 224, -1);
    s += SV.t(260, 198, 'Mg', 'sv-a') + brk(234, 286, 176, 220, 2);
    s += lw(410, 198, 'Cl', { t: [TL, TL], b: [TL, TL], r: [TL, TL], l: [TL, CO] }) + brk(374, 446, 172, 224, -1);
    s += SV.t(260, 250, '(+2) + 2(−1) = 0, so the formula is MgCl₂', 'sv-t');
    return SV.wrap(520, 262, 'Magnesium gives one electron to each of two chlorine atoms, forming MgCl2', s);
  })();

  /* 5. Criss-cross */
  const cc = (a, qa, b, qb, raw, fin, note) => {
    let s = SV.t(80, 40, a, 'sv-a') + '<text x="' + (a.length > 1 ? 101 : 93) + '" y="30" font-size="14" font-weight="700" fill="' + CO + '">' + qa + '</text>';
    s += SV.t(200, 40, b, 'sv-a') + '<text x="' + (b.length > 1 ? 221 : 213) + '" y="30" font-size="14" font-weight="700" fill="' + TL + '">' + qb + '</text>';
    s += sarr(104, 36, 196, 86, CO) + sarr(234, 40, 106, 86, TL);
    s += SV.t(80, 102, raw[0], 'sv-a') + SV.t(200, 102, raw[1], 'sv-a');
    s += SV.arrow(262, 100, 304, 100) + SV.t(375, 102, fin, 'sv-a');
    s += SV.t(240, 138, note, 'sv-s');
    return SV.wrap(460, 148, 'Criss-cross method for ' + fin, s);
  };
  F.ccAl = cc('Al', '3+', 'S', '2−', ['Al₂', 'S₃'], 'Al₂S₃', '2 Al³⁺ = +6 and 3 S²⁻ = −6, so the charges add to zero');
  F.ccMg = cc('Mg', '2+', 'O', '2−', ['Mg₂', 'O₂'], 'MgO', 'Mg₂O₂ reduces (divide by 2) to MgO: always reduce');

  /* 5b. K3P by Lewis dot electron transfer */
  F.k3p = (function () {
    let s = '';
    [40, 115, 190].forEach(y => { s += lw(60, y, 'K', { r: [CO] }); });
    s += lw(230, 115, 'P', { t: [TL], r: [TL, TL], b: [TL], l: [TL] });
    s += carr(82, 40, 200, 30, 232, 90) + carr(82, 115, 150, 132, 205, 121) + carr(82, 190, 200, 200, 232, 140);
    s += SV.arrow(285, 115, 335, 115);
    s += SV.t(360, 115, '3', 'sv-a') + SV.t(400, 115, 'K', 'sv-a') + brk(382, 418, 94, 136, 1);
    s += lw(522, 115, 'P', { t: [TL, CO], r: [TL, TL], b: [TL, CO], l: [TL, CO] }) + brk(492, 552, 90, 140, -3);
    s += SV.t(462, 172, 'electrostatic attraction holds the ions together', 'sv-s');
    s += SV.t(310, 222, '3 K⁺ (+3) and 1 P³⁻ (−3) add to zero, so the formula is K₃P', 'sv-t');
    return SV.wrap(620, 234, 'Three potassium atoms each transfer one electron to a phosphorus atom, forming 3 K+ and P3-', s);
  })();
  return F;
})();

LESSONS.c2 = {
  sections: [
    { t: 'Electrolytes', tp: ['ion', 'water'], h: `${FIGC2.css}
      <h2>Electrolytes: why salt water lights the bulb</h2>
      <p>On September 18 your class tested water and salts with a <b>conductivity tester</b>: a light bulb that only glows when electric current can flow through the sample. The results explain what an electrolyte is.</p>
      <ul><li><b>Electrolyte:</b> a substance that <b>conducts electric current</b> when it is <b>dissolved in water or melted</b>, because it breaks apart into ions.</li>
        <li><b>Non-electrolyte:</b> a substance that does <b>not</b> conduct electric current. It makes no ions (sugar dissolves as whole molecules, so sugar water stays dark).</li>
        <li><b>Weak electrolyte:</b> a <b>low concentration of ions</b> in the solution, so the bulb is <b>dim</b>.</li>
        <li><b>Strong electrolyte:</b> a <b>high concentration of ions</b> (positive and negative), so the bulb is <b>bright</b>.</li></ul>
      <figure>${FIGC2.beakers}<figcaption>More mobile ions in the beaker means more current and a brighter bulb.</figcaption></figure>
      <h3>Your class lab</h3>
      <div class="c2-sc"><table class="tbl"><tr><th>Sample</th><th>Conductivity</th><th>What is happening</th></tr>
        <tr><td>Deionized (DI) water</td><td>low</td><td>Almost no ions to carry current</td></tr>
        <tr><td>NaCl, solid</td><td>low</td><td>Ions are there, but <b>locked in place</b></td></tr>
        <tr><td>NaCl dissolved in DI water</td><td><b>high</b></td><td>Na<sup>+</sup> and Cl<sup>&minus;</sup> are free to move</td></tr>
        <tr><td>KCl dissolved in DI water</td><td><b>high</b></td><td>K<sup>+</sup> and Cl<sup>&minus;</sup> are free to move</td></tr>
        <tr><td>MgSO<sub>4</sub> (Epsom salt) dissolved</td><td>medium</td><td>Fewer mobile ions in that solution, so less current</td></tr></table></div>
      <p class="hint">All three salts read low as dry solids. Chemists classify MgSO<sub>4</sub> itself as a strong electrolyte; a medium reading just means that particular solution had fewer ions available to carry the current.</p>
      <h3>Why solid salt doesn't conduct, but salt water does</h3>
      <figure>${FIGC2.mobile}</figure>
      <div class="key"><b>Key idea: mobile ions carry the current, not electrons.</b> A salt is made of ions even when it is a solid, but in the solid they are locked in a crystal and cannot move. When the salt dissolves (or melts), the ions separate and become <b>mobile ions</b>. Positive ions (cations) drift toward the negative side of the tester and negative ions (anions) drift toward the positive side. That moving charge is the electric current.</div>
      <p>Your reading put it as an equation: <b>water (solvent) + salt = electrolyte (solution)</b>. The water is the <b>solvent</b> that dissolves the salt. The solution has charged ions in it, but it is <b>neutral overall</b>, because the positive and negative charges still balance.</p>
      <div class="tip"><b>Common mistakes:</b> (1) Electrons do not swim through salt water; the <b>ions</b> move. (2) An electrolyte conducts <b>electric current</b>, not "energy." (3) Solid salt is <b>not</b> a conductor, even though it is made of ions.</div>
      <h3>Why your body needs electrolytes</h3>
      <p>Electrolytes are ions dissolved in your blood and other body fluids, such as Na<sup>+</sup>, K<sup>+</sup>, Ca<sup>2+</sup>, Mg<sup>2+</sup> and Cl<sup>&minus;</sup>. Your cells keep extra <b>K<sup>+</sup> inside</b> and extra <b>Na<sup>+</sup> outside</b>. That difference in charge across the cell membrane is what lets nerve cells send <b>signals</b> and lets heart muscle <b>contract</b>. Electrolytes also help balance the water in your body and move nutrients in and wastes out of cells. You lose them when you sweat a lot or are sick, which is why drinks like Gatorade and Pedialyte contain salts.</p>
      <div class="steps"><div class="st">Worked example: predict the bulb</div>
        <b>Sugar dissolved in water:</b> sugar is made of molecules, not ions, so nothing charged can move. Bulb off: <b>non-electrolyte</b>.<br>
        <b>Melted (molten) NaCl:</b> no water, but melting frees the ions to move. Bulb on: NaCl is an <b>electrolyte</b>.<br>
        <b>A spoonful of KCl in a beaker of water vs. a pinch:</b> more dissolved salt means more mobile ions, so the spoonful gives the brighter bulb.</div>` },

    { t: 'Groups, periods & the metal staircase', tp: ['pg', 'metal'], h: `${FIGC2.css}
      <h2>Groups, periods and the metal staircase</h2>
      <ul><li>A <b>group</b> is a <b>column</b> (top to bottom). Elements in the same group have the <b>same number of electrons in their outermost shell</b> (valence electrons), so they act alike and form the same charge.</li>
        <li>A <b>period</b> is a <b>row</b> (left to right). Elements in the same period have the <b>same number of energy shells</b>. Starting a new period means starting a <b>new shell</b>.</li></ul>
      <div class="steps"><div class="st">Worked example: sodium vs. potassium</div>
        Na and K are both in <b>Group 1</b>: each has <b>1 valence electron</b>, and both form <b>+1</b> ions. K is one period lower (<b>Period 4</b> vs. Period 3), so it has <b>one more shell</b>.
        ${FIGC2.naK}
        This is why potassium is <b>bigger</b> than sodium: it has more <b>shells</b> (energy levels), not just more electrons. In your K/Na reading, a K<sup>+</sup> ion (1.38 &Aring;) is larger than a Na<sup>+</sup> ion (1.02 &Aring;), and the cell's proteins use that size difference to put each ion on the correct side of the membrane.</div>
      <h3>Metals, nonmetals and metalloids</h3>
      <figure>${FIG4.map}<figcaption>Metals are on the left, nonmetals on the right, and the metalloids (green) sit on the "staircase" between them: B, Si, Ge, As, Sb, Te. Your notes also list astatine (At), which some tables count as a metalloid; this map colors it with the nonmetals.</figcaption></figure>
      <div class="c2-sc"><table class="tbl"><tr><th></th><th>Metals</th><th>Nonmetals</th><th>Metalloids</th></tr>
        <tr><td><b>Where</b></td><td>Left of the staircase</td><td>Right of the staircase (plus H)</td><td>On the staircase</td></tr>
        <tr><td><b>Look</b></td><td>Shiny (<b>luster</b>)</td><td>Dull</td><td>Often shiny</td></tr>
        <tr><td><b>Heat and electric current</b></td><td>Good <b>conductors</b></td><td>Poor conductors (exception: carbon as <b>graphite</b> conducts)</td><td>In between (semiconductors, like silicon)</td></tr>
        <tr><td><b>As a solid</b></td><td><b>Malleable</b> (bendable) and <b>ductile</b> (stretchable into wire)</td><td><b>Brittle</b></td><td>Brittle</td></tr>
        <tr><td><b>Phase at room temperature</b></td><td>Solids, except <b>mercury (Hg)</b>, a liquid</td><td>Solids, gases, and one liquid (bromine)</td><td>Solids</td></tr>
        <tr><td><b>In salts</b></td><td>Lose electrons, form <b>+ ions</b> (cations)</td><td>Gain electrons, form <b>&minus; ions</b> (anions)</td><td>A mix of both behaviors</td></tr></table></div>
      <h3>Predicting charges from the group</h3>
      <p>Metals <b>lose</b> their valence electrons. Nonmetals <b>gain</b> enough electrons to reach <b>8</b> in the valence shell. Either way the ion ends up with a full outer shell, like a noble gas.</p>
      <div class="c2-sc"><table class="tbl"><tr><th>Group</th><th>1</th><th>2</th><th>13</th><th>15</th><th>16</th><th>17</th><th>18</th></tr>
        <tr><td>Valence e<sup>&minus;</sup></td><td>1</td><td>2</td><td>3</td><td>5</td><td>6</td><td>7</td><td>8</td></tr>
        <tr><td>Charge</td><td><b>+1</b></td><td><b>+2</b></td><td><b>+3</b></td><td><b>&minus;3</b></td><td><b>&minus;2</b></td><td><b>&minus;1</b></td><td>none (already full)</td></tr></table></div>
      <div class="steps"><div class="st">Worked example: predict the ion</div>
        <b>Calcium</b> (Group 2): loses 2 &rarr; <b>Ca<sup>2+</sup></b>.&nbsp; <b>Aluminum</b> (Group 13): loses 3 &rarr; <b>Al<sup>3+</sup></b>.<br>
        <b>Nitrogen</b> (Group 15): has 5, gains 3 to reach 8 &rarr; <b>N<sup>3&minus;</sup></b>.&nbsp; <b>Bromine</b> (Group 17): has 7, gains 1 &rarr; <b>Br<sup>&minus;</sup></b>.</div>
      <div class="tip"><b>Writing charges:</b> your class sometimes writes Mg<sup>+2</sup> or O<sup>&minus;2</sup>. The standard way puts the number first: Mg<sup>2+</sup>, O<sup>2&minus;</sup>. Both mean the same thing. A charge of 1 is written as just + or &minus;.</div>
      <div class="br"><button class="btn bt" onclick="goPage('table')">Explore the interactive periodic table</button></div>` },

    { t: 'Bohr & Lewis dot diagrams', tp: ['bohr', 'lewis'], h: `${FIGC2.css}
      <h2>Bohr and Lewis dot diagrams</h2>
      <p>Both diagrams show electrons, but at different levels of detail. A <b>Bohr diagram</b> shows the nucleus and <b>every</b> electron in its shell. A <b>Lewis dot diagram</b> shows only the <b>valence electrons</b> (the outermost shell) as dots around the symbol.</p>
      <h3>Bohr rules (for the first 20 elements)</h3>
      <ul><li>Label the nucleus with its protons (p<sup>+</sup>) and neutrons (n<sup>0</sup>).</li>
        <li>The first shell holds <b>2</b>, the second holds <b>8</b>, and the next shell holds <b>whatever is left over</b>. (For K and Ca, the third shell stops at 8 and the rest go in a fourth: K is 2-8-8-1.)</li>
        <li>The last shell is the <b>valence shell</b>.</li></ul>
      <h3>Drawing a Bohr diagram from isotope notation</h3>
      <ol><li>The <b>bottom</b> number is the atomic number = <b>protons</b>.</li>
        <li><b>Neutrons</b> = top number (mass number) &minus; bottom number.</li>
        <li><b>Electrons</b>: a neutral atom has as many electrons as protons. For an ion, use <b>protons &minus; electrons = charge</b>: a 2+ ion has 2 fewer electrons, a 2&minus; ion has 2 more.</li>
        <li>Draw the nucleus and write the protons and neutrons inside it.</li>
        <li>Fill the shells in order: 2, then 8, then the leftovers.</li>
        <li>Check: the dots on all the shells add up to the number of electrons.</li></ol>
      <h3>Lewis dot rules</h3>
      <ul><li>Dots = <b>valence electrons only</b> (the same number as the Bohr diagram's last shell).</li>
        <li>Put <b>one dot on each of the four sides before doubling up</b> on any side. The most dots you will ever draw is 8.</li>
        <li><b>Ions go in brackets</b>, with the charge outside. A metal ion has lost its valence dots: <b>[Mg]<sup>2+</sup></b> has <b>no dots</b> (the brackets show there used to be dots). A nonmetal ion has a full set: <b>[:S:]<sup>2&minus;</sup></b> has <b>8 dots</b>.</li></ul>
      <div class="steps"><div class="st">Example 1: a magnesium atom</div>
        Isotope notation ${FIGC2.iso.mg24}: Protons = 12, neutrons = 24 &minus; 12 = <b>12</b>, electrons = <b>12</b>. Shells: 2, 8, then 2 left over &rarr; <b>2-8-2</b>.
        ${FIGC2.mg}</div>
      <div class="steps"><div class="st">Example 2: a magnesium ion</div>
        Isotope notation ${FIGC2.iso.mg24i}: Protons = 12, neutrons = 12, electrons = 12 &minus; 2 = <b>10</b>. Mg lost its 2 valence electrons, so the third shell is gone &rarr; <b>2-8</b>.
        ${FIGC2.mg2}</div>
      <div class="steps"><div class="st">Example 3: sulfur-34</div>
        Isotope notation ${FIGC2.iso.s34}: Protons = 16, neutrons = 34 &minus; 16 = <b>18</b>, electrons = <b>16</b> &rarr; <b>2-8-6</b>. Six dots: one per side, then double up on two sides.
        ${FIGC2.s34}</div>
      <div class="steps"><div class="st">Example 4: a sulfide ion</div>
        Isotope notation ${FIGC2.iso.s32i}: Protons = 16, neutrons = 32 &minus; 16 = <b>16</b>, electrons = 16 + 2 = <b>18</b> &rarr; <b>2-8-8</b>. Sulfur gained 2 electrons to fill its valence shell with 8.
        ${FIGC2.s2}</div>
      <div class="steps"><div class="st">Example 5: nitrogen-14</div>
        Isotope notation ${FIGC2.iso.n14}: Protons = 7, neutrons = 14 &minus; 7 = <b>7</b>, electrons = <b>7</b> &rarr; <b>2-5</b>. Five dots: one on each side, then one pair.
        ${FIGC2.n14}</div>
      <div class="tip"><b>Don't mix up neutrons and electrons.</b> Sulfur-34 has <b>18 neutrons</b> but only <b>16 electrons</b>. The mass number changes the neutrons, never the electrons. Only a charge changes the electrons.</div>
      <h3>Period 3 as Lewis dots: atoms, then ions</h3>
      <p>The number of dots matches the group (Groups 13&ndash;18: subtract 10).</p>
      ${FIGC2.p3atoms}
      <p>Metals lose their dots; nonmetals fill up to 8. Silicon (4) and argon (8) don't usually form simple ions.</p>
      ${FIGC2.p3ions}
      <div class="br"><button class="btn bt" onclick="go(11)">Practice with the Atom &amp; Ion Counter</button></div>` },

    { t: 'Ionic bonds', tp: ['ionic'], h: `${FIGC2.css}
      <h2>Ionic bonds</h2>
      <p>An <b>ionic bond</b> forms when a <b>metal transfers electrons to a nonmetal</b>. The metal becomes a positive ion (<b>cation</b>) and the nonmetal becomes a negative ion (<b>anion</b>). The two ions are held together by <b>electrostatic (Coulombic) attraction</b>: opposite charges attract.</p>
      <figure>${FIGC2.nacl}<figcaption>The transferred electron is shown in orange. Both ions end up with a full valence shell: Na<sup>+</sup> is 2-8 (like neon) and Cl<sup>&minus;</sup> is 2-8-8 (like argon).</figcaption></figure>
      <div class="steps"><div class="st">Worked example: sodium + chlorine</div>
        Na has <b>1</b> valence electron and Cl has <b>7</b>. The sodium electron <b>transfers</b> to chlorine.<br>
        Na: 11 protons, 10 electrons &rarr; 11 &minus; 10 = <b>+1</b> &rarr; [Na]<sup>+</sup><br>
        Cl: 17 protons, 18 electrons &rarr; 17 &minus; 18 = <b>&minus;1</b> &rarr; [:Cl:]<sup>&minus;</sup> with 8 dots<br>
        The ions attract, forming sodium chloride, <b>NaCl</b>.</div>
      <h3>Salts are lattices, not molecules</h3>
      <figure>${FIGC2.lattice}</figure>
      <p>A salt doesn't form separate little molecules. Billions of ions stack into a repeating 3-D pattern called a <b>crystal lattice</b>, with every ion attracted to all the oppositely charged ions around it. So the formula NaCl doesn't describe "a molecule." It describes a <b>formula unit</b>: the simplest <b>ratio</b> of ions in the crystal (1 Na<sup>+</sup> for every 1 Cl<sup>&minus;</sup>).</p>
      <h3>Properties of ionic compounds</h3>
      <div class="c2-sc"><table class="tbl"><tr><th>Property</th><th>Why</th></tr>
        <tr><td><b>High melting points</b> (NaCl 801 &deg;C, MgO 2825 &deg;C)</td><td>Every ion is held by strong attractions in all directions, so it takes a lot of energy to pull them apart.</td></tr>
        <tr><td><b>Hard but brittle</b></td><td>Hit a crystal and a layer shifts. Like charges line up and <b>repel</b>, and the crystal cracks apart.</td></tr>
        <tr><td><b>Conduct when dissolved or melted</b>, not as a solid</td><td>Only then are the ions <b>mobile</b> (see Electrolytes).</td></tr></table></div>
      <p>MgO melts at a much higher temperature than NaCl. Its ions have charges of <b>2+ and 2&minus;</b> instead of 1+ and 1&minus;, and bigger charges mean a stronger Coulombic attraction.</p>
      <div class="key"><b>Full charges, not partial charges.</b> In an ionic bond an electron is completely <b>transferred</b>, so the ions carry <b>full</b> charges: Na<sup>+</sup> is +1 and Cl<sup>&minus;</sup> is &minus;1. The symbols &delta;+ and &delta;&minus; mean "partially" charged; they are for <b>polar covalent</b> bonds, where electrons are shared unequally (like water, in Lesson 8). Never write &delta; charges for NaCl.</div>
      <h3>Why salts aren't always 1:1</h3>
      <p>The electrons a metal <b>gives away</b> must all be <b>taken</b> by nonmetal atoms. Magnesium has 2 valence electrons to give, but a chlorine atom only needs 1. So magnesium needs <b>two</b> chlorine atoms.</p>
      <figure>${FIGC2.mgcl2}</figure>
      <div class="steps"><div class="st">Worked example: one oxygen vs. two chlorines</div>
        <b>Mg + O:</b> Mg gives 2, O needs 2. One of each is enough &rarr; <b>MgO</b> (1 : 1).<br>
        <b>Mg + Cl:</b> Mg gives 2, each Cl needs only 1. Two Cl are needed &rarr; <b>MgCl<sub>2</sub></b> (1 : 2).<br>
        The ratio is whatever makes <b>electrons lost = electrons gained</b>, so the charges add to zero.</div>` },

    { t: 'Writing & naming salts', tp: ['name', 'ionic', 'lewis'], h: `${FIGC2.css}
      <h2>Writing and naming salts</h2>
      <p>A salt is an ionic compound: a <b>metal</b> (forms + ions) with a <b>nonmetal</b> (forms &minus; ions).</p>
      <h3>Naming</h3>
      <ol><li>Name the <b>cation first</b>. The metal keeps its name: sodium, calcium, potassium.</li>
        <li>Name the <b>anion second</b>, dropping the end of the element name and adding <b>-ide</b>.</li></ol>
      <div class="c2-sc"><table class="tbl"><tr><th>Element</th><th>Anion</th><th>Name</th><th>Element</th><th>Anion</th><th>Name</th></tr>
        <tr><td>chlorine</td><td>Cl<sup>&minus;</sup></td><td>chlor<b>ide</b></td><td>fluorine</td><td>F<sup>&minus;</sup></td><td>fluor<b>ide</b></td></tr>
        <tr><td>bromine</td><td>Br<sup>&minus;</sup></td><td>brom<b>ide</b></td><td>iodine</td><td>I<sup>&minus;</sup></td><td>iod<b>ide</b></td></tr>
        <tr><td>oxygen</td><td>O<sup>2&minus;</sup></td><td>ox<b>ide</b></td><td>sulfur</td><td>S<sup>2&minus;</sup></td><td>sulf<b>ide</b></td></tr>
        <tr><td>nitrogen</td><td>N<sup>3&minus;</sup></td><td>nitr<b>ide</b></td><td>phosphorus</td><td>P<sup>3&minus;</sup></td><td>phosph<b>ide</b></td></tr></table></div>
      <p>CaO is <b>calcium oxide</b>, and K<sub>3</sub>P is <b>potassium phosphide</b>. The numbers are not part of the name.</p>
      <h3>Writing formulas three ways (potassium phosphide)</h3>
      <p>Potassium is in Group 1 (K<sup>+</sup>) and phosphorus is in Group 15 (P<sup>3&minus;</sup>). Every method gives the same answer.</p>
      <div class="steps"><div class="st">Method A: "addition" (charges add to zero)</div>
        Keep adding ions until the total charge is zero: (+1) + (+1) + (+1) + (&minus;3) = 0.<br>
        You need <b>3 potassiums</b> to balance one phosphide &rarr; <b>K<sub>3</sub>P</b>.</div>
      <div class="steps"><div class="st">Method B: criss-cross</div>
        Cross the <b>number</b> of each charge down to become the other ion's subscript (drop the signs and any 1s). For K<sup>+</sup> and P<sup>3&minus;</sup>: the 3 goes to K, the 1 goes to P &rarr; <b>K<sub>3</sub>P</b>. Another example, aluminum sulfide:
        <figure>${FIGC2.ccAl}</figure></div>
      <div class="steps"><div class="st">Method C: Lewis dot electron transfer</div>
        Draw the dots, then draw an arrow for each electron that moves. Each K has 1 electron to give and P needs 3, so it takes 3 K atoms.
        <figure>${FIGC2.k3p}</figure>
        Result: 3[K]<sup>+</sup> [:P:]<sup>3&minus;</sup> &rarr; <b>K<sub>3</sub>P</b></div>
      <h3>Always reduce</h3>
      <p>Subscripts must be the <b>lowest whole-number ratio</b>. If criss-crossing gives two numbers that can both be divided, divide them.</p>
      <figure>${FIGC2.ccMg}</figure>
      <h3>Worked examples</h3>
      <div class="c2-sc"><table class="tbl"><tr><th>Elements</th><th>Ions</th><th>Charges add to zero</th><th>Formula</th><th>Name</th></tr>
        <tr><td>K + P</td><td>K<sup>+</sup>, P<sup>3&minus;</sup></td><td>3(+1) + (&minus;3) = 0</td><td><b>K<sub>3</sub>P</b></td><td>potassium phosphide</td></tr>
        <tr><td>Al + S</td><td>Al<sup>3+</sup>, S<sup>2&minus;</sup></td><td>2(+3) + 3(&minus;2) = 0</td><td><b>Al<sub>2</sub>S<sub>3</sub></b></td><td>aluminum sulfide</td></tr>
        <tr><td>Ca + Cl</td><td>Ca<sup>2+</sup>, Cl<sup>&minus;</sup></td><td>(+2) + 2(&minus;1) = 0</td><td><b>CaCl<sub>2</sub></b> (CaCl would be +1)</td><td>calcium chloride</td></tr>
        <tr><td>Mg + O</td><td>Mg<sup>2+</sup>, O<sup>2&minus;</sup></td><td>(+2) + (&minus;2) = 0</td><td><b>MgO</b> (not Mg<sub>2</sub>O<sub>2</sub>)</td><td>magnesium oxide</td></tr>
        <tr><td>Rb + N</td><td>Rb<sup>+</sup>, N<sup>3&minus;</sup></td><td>3(+1) + (&minus;3) = 0</td><td><b>Rb<sub>3</sub>N</b></td><td>rubidium nitride</td></tr>
        <tr><td>Ba + N</td><td>Ba<sup>2+</sup>, N<sup>3&minus;</sup></td><td>3(+2) + 2(&minus;3) = 0</td><td><b>Ba<sub>3</sub>N<sub>2</sub></b></td><td>barium nitride</td></tr>
        <tr><td>Li + O</td><td>Li<sup>+</sup>, O<sup>2&minus;</sup></td><td>2(+1) + (&minus;2) = 0</td><td><b>Li<sub>2</sub>O</b></td><td>lithium oxide</td></tr></table></div>
      <div class="tip"><b>Common mistakes:</b> (1) The <b>cation goes first</b>: "sodium chloride," never "chloride sodium." (2) Only the <b>anion</b> gets -ide: "calcium chloride," not "calcium chlorine." (3) Charges are used to <b>find</b> the formula but are not written in it: K<sub>3</sub>P, not K<sub>3</sub><sup>+</sup>P<sup>3&minus;</sup>. (4) Always reduce: MgO, not Mg<sub>2</sub>O<sub>2</sub>.</div>
      <h3>Practice</h3>
      <p>Write the formula and the name for each pair, then check.</p>
      <div class="c2-sc"><table class="tbl"><tr><th>Elements</th><th>Elements</th></tr>
        <tr><td>a. Mg + Cl</td><td>e. Al + O</td></tr><tr><td>b. K + F</td><td>f. Ca + S</td></tr>
        <tr><td>c. Na + N</td><td>g. Li + S</td></tr><tr><td>d. Al + Cl</td><td>h. Mg + F</td></tr></table></div>
      <details style="margin-top:8px"><summary><b>Show answers</b></summary>
        <div class="c2-sc"><table class="tbl"><tr><th>Pair</th><th>Formula</th><th>Name</th></tr>
          <tr><td>a</td><td>MgCl<sub>2</sub></td><td>magnesium chloride</td></tr><tr><td>b</td><td>KF</td><td>potassium fluoride</td></tr>
          <tr><td>c</td><td>Na<sub>3</sub>N</td><td>sodium nitride</td></tr><tr><td>d</td><td>AlCl<sub>3</sub></td><td>aluminum chloride</td></tr>
          <tr><td>e</td><td>Al<sub>2</sub>O<sub>3</sub></td><td>aluminum oxide</td></tr><tr><td>f</td><td>CaS</td><td>calcium sulfide</td></tr>
          <tr><td>g</td><td>Li<sub>2</sub>S</td><td>lithium sulfide</td></tr><tr><td>h</td><td>MgF<sub>2</sub></td><td>magnesium fluoride</td></tr></table></div></details>` }
  ],
  quiz: [
    { ctx: '<h3>Conductivity Lab</h3>A class tested samples with a conductivity tester. The tester\'s bulb glows brighter when more electric current flows.<br><b>Figure 1: Conductivity results</b><table class="tbl"><tr><th>Sample</th><th>Conductivity</th></tr><tr><td>Deionized water</td><td>low</td></tr><tr><td>NaCl, solid</td><td>low</td></tr><tr><td>NaCl, dissolved in deionized water</td><td>high</td></tr><tr><td>KCl, dissolved in deionized water</td><td>high</td></tr><tr><td>MgSO<sub>4</sub>, dissolved in deionized water</td><td>medium</td></tr></table>',
      q: 'Which conclusion is best supported by the data in Figure 1?',
      o: ['Solid salts conduct electric current about as well as dissolved salts', 'A salt conducts electric current when its ions are free to move, as when it is dissolved', 'Deionized water is a strong electrolyte', 'The MgSO<sub>4</sub> solution had more mobile ions than the NaCl solution'],
      a: 1, x: 'Solid NaCl read low, but the same salt dissolved read high. The ions were in the solid all along; dissolving set them free to move as mobile ions. Deionized water read low (almost no ions), and the MgSO<sub>4</sub> solution read lower than NaCl, so it had fewer mobile ions, not more.', tp: ['ion', 'water'] },
    { q: 'A bulb glows brightly when a conductivity tester is placed in salt water. What carries the electric current through the solution?',
      o: ['Free electrons moving through the water', 'Water molecules moving between the electrodes', 'Protons moving out of the atoms\' nuclei', 'Na<sup>+</sup> and Cl<sup>&minus;</sup> ions moving between the electrodes'],
      a: 3, x: 'In a solution, the current is carried by mobile ions: cations drift toward the negative electrode and anions toward the positive electrode. Electrons flow through the metal wires, but they do not travel through the water. Protons stay in the nucleus.', tp: ['ion', 'water'] },
    { q: 'Which statement best defines an electrolyte?',
      o: ['A substance that conducts electric current when dissolved in water or melted', 'A substance that conducts energy', 'Any substance that dissolves in water', 'A solid that conducts electric current'],
      a: 0, x: 'An electrolyte makes mobile ions when it is dissolved or melted, so it conducts electric current. "Conducts energy" is too vague. Sugar dissolves in water but makes no ions, so dissolving alone is not enough. And a solid salt does not conduct, because its ions are locked in place.', tp: ['ion'] },
    { ctx: '<h3>Potassium and Sodium in the Body</h3>Sodium and potassium are both needed for the heart to beat. In the body they are found as ions, and both have a +1 charge. Cells keep extra K<sup>+</sup> ions inside and extra Na<sup>+</sup> ions outside. Proteins in the cell membrane move each ion to the correct side, and they can tell the ions apart by size.<br><b>Figure 2: Ion radius</b><table class="tbl"><tr><th>Ion</th><th>Radius (&Aring;)</th></tr><tr><td>Na<sup>+</sup></td><td class="n">1.02</td></tr><tr><td>K<sup>+</sup></td><td class="n">1.38</td></tr></table>',
      q: 'Which statement best explains why a K<sup>+</sup> ion is larger than a Na<sup>+</sup> ion?',
      o: ['K<sup>+</sup> has a larger positive charge than Na<sup>+</sup>', 'K<sup>+</sup> has more neutrons, which take up more space', 'K<sup>+</sup> has one more occupied electron shell (energy level) than Na<sup>+</sup>', 'K<sup>+</sup> has fewer electrons than Na<sup>+</sup>'],
      a: 2, x: 'K<sup>+</sup> is 2-8-8 (three shells) and Na<sup>+</sup> is 2-8 (two shells). Potassium is one period lower, so it has an extra energy level, and that makes it bigger. Both ions have the same +1 charge, and neutrons sit in the tiny nucleus, so they do not set the size.', tp: ['pg', 'bohr', 'ion'] },
    { q: 'An element is shiny, can be hammered into thin sheets, and conducts electric current well. Where is it most likely found on the periodic table, and what kind of ion does it form in a salt?',
      o: ['Left of the staircase; it forms positive ions', 'Right of the staircase; it forms negative ions', 'On the staircase; it forms no ions', 'In Group 18; it forms no ions'],
      a: 0, x: 'Luster, malleability and good conductivity are metal properties. Metals are on the left side of the staircase, and they lose valence electrons to form positive ions (cations). Nonmetals (right side) are brittle, poor conductors that form negative ions.', tp: ['metal', 'pg'] },
    { q: 'Which describes a Bohr diagram of an atom of sulfur-34 (<sup>34</sup><sub>16</sub>S)?',
      o: ['16 p<sup>+</sup>, 16 n<sup>0</sup>, shells 2-8-6', '16 p<sup>+</sup>, 18 n<sup>0</sup>, shells 2-8-8', '18 p<sup>+</sup>, 16 n<sup>0</sup>, shells 2-8-8', '16 p<sup>+</sup>, 18 n<sup>0</sup>, shells 2-8-6'],
      a: 3, x: 'Protons = atomic number = 16. Neutrons = 34 &minus; 16 = 18. A neutral atom has 16 electrons, arranged 2, then 8, then the 6 left over: 2-8-6. The 2-8-8 arrangement belongs to the sulfide ion S<sup>2&minus;</sup>, which has 18 electrons.', tp: ['bohr', 'iso'] },
    { q: 'Which is the correct Lewis dot diagram for a magnesium ion, Mg<sup>2+</sup>?',
      o: ['Mg with two dots and no brackets', '[Mg]<sup>2+</sup> with no dots inside the brackets', '[Mg]<sup>2+</sup> with eight dots inside the brackets', '[Mg]<sup>2&minus;</sup> with two dots inside the brackets'],
      a: 1, x: 'Magnesium (Group 2) loses both valence electrons to become Mg<sup>2+</sup>, so no valence dots are left. Ions go in brackets with the charge outside: [Mg]<sup>2+</sup>. Eight dots inside brackets is how a nonmetal ion looks, like [:S:]<sup>2&minus;</sup>. Mg with two dots is the neutral atom.', tp: ['lewis'] },
    { q: 'What kind of charges do the sodium and chlorine particles in sodium chloride (NaCl) have?',
      o: ['Full charges, Na<sup>+</sup> and Cl<sup>&minus;</sup>, because an electron was transferred', 'Partial charges, &delta;+ on Na and &delta;&minus; on Cl, because electrons are shared unequally', 'No charges, because the compound is neutral overall', 'Full charges, Na<sup>&minus;</sup> and Cl<sup>+</sup>, because chlorine gives away an electron'],
      a: 0, x: 'NaCl is ionic: sodium completely transfers its electron to chlorine, so the ions carry full +1 and &minus;1 charges. Partial charges (&delta;+ and &delta;&minus;) come from unequal sharing in polar covalent bonds, like those in water. The compound is neutral overall because the full charges cancel, not because the particles are uncharged.', tp: ['ionic'] },
    { ctx: '<h3>Common Salts</h3>All of the salts in Figure 3 are solids at room temperature.<br><b>Figure 3: Melting points of some salts</b><table class="tbl"><tr><th>Salt</th><th>Ions</th><th>Melting point (&deg;C)</th></tr><tr><td>NaCl</td><td>Na<sup>+</sup>, Cl<sup>&minus;</sup></td><td class="n">801</td></tr><tr><td>KCl</td><td>K<sup>+</sup>, Cl<sup>&minus;</sup></td><td class="n">771</td></tr><tr><td>CaCl<sub>2</sub></td><td>Ca<sup>2+</sup>, Cl<sup>&minus;</sup></td><td class="n">775</td></tr><tr><td>CaO</td><td>Ca<sup>2+</sup>, O<sup>2&minus;</sup></td><td class="n">2613</td></tr><tr><td>MgO</td><td>Mg<sup>2+</sup>, O<sup>2&minus;</sup></td><td class="n">2825</td></tr></table>',
      q: 'Which statement best explains why all of these salts are solids with high melting points?',
      o: ['Their molecules are held together by weak forces', 'Their atoms share electrons equally in small molecules', 'Many oppositely charged ions in a crystal lattice attract each other strongly', 'Their metal atoms are surrounded by a sea of mobile electrons'],
      a: 2, x: 'Salts are crystal lattices of cations and anions, with every ion held by electrostatic (Coulombic) attraction to the ions around it. Breaking all those attractions takes a lot of energy. Salts are not made of molecules, and they transfer electrons rather than share them. The 2+/2&minus; salts (CaO, MgO) melt highest because bigger charges attract more strongly.', tp: ['ionic', 'ion'] },
    { q: 'Magnesium (Group 2) bonds with oxygen (Group 16). What is the correct formula of the compound?',
      o: ['Mg<sub>2</sub>O<sub>2</sub>', 'MgO<sub>2</sub>', 'Mg<sub>2</sub>O', 'MgO'],
      a: 3, x: 'Mg<sup>2+</sup> and O<sup>2&minus;</sup>: (+2) + (&minus;2) = 0, so one of each is enough. Criss-crossing gives Mg<sub>2</sub>O<sub>2</sub>, but subscripts must be reduced to the lowest whole-number ratio, so the answer is MgO.', tp: ['name', 'ionic'] },
    { q: 'Which formula is correct for calcium chloride?',
      o: ['CaCl', 'CaCl<sub>2</sub>', 'Ca<sub>2</sub>Cl', 'CaCl<sub>3</sub>'],
      a: 1, x: 'Calcium (Group 2) forms Ca<sup>2+</sup>, and chloride is Cl<sup>&minus;</sup>. One chloride only cancels +1 of the +2, so it takes two: (+2) + 2(&minus;1) = 0, giving CaCl<sub>2</sub>. CaCl would have a leftover +1 charge.', tp: ['name'] },
    { q: 'What is the correct name of Li<sub>2</sub>O?',
      o: ['oxide lithium', 'lithium oxygen', 'lithium oxide', 'dilithium oxide'],
      a: 2, x: 'Name the cation (the metal) first, unchanged: lithium. Then name the anion with its ending changed to -ide: oxygen becomes oxide. The subscript 2 is not part of the name; prefixes like "di-" are only used for compounds of two nonmetals.', tp: ['name'] }
  ]
};
