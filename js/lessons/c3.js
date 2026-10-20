/* Catalyst - Unit C3: Bonding & Shapes. Follows the class storyline from Oct 1 to Oct 19, 2026:
   Coulombic attraction (Oct 5), Lesson 7 "Is water a salt?" (Oct 1), Lesson 8 "Why is water so good at dissolving salts?" (Oct 7),
   polarity and SNAP (Oct 6-8), metallic bonding (Oct 8-9), multiple covalent bonds (Oct 9), ionization energy and
   periodic trends (Oct 13-14), VSEPR shapes (Oct 19). Unit test: Thursday, Oct 22. */
'use strict';
const FIGC3 = (function () {
  const R = d => d * Math.PI / 180, f = n => (+n).toFixed(1);
  const DP = '#1565C0', DM = '#C62828';
  const dot = (x, y, r) => '<circle class="sv-d" cx="' + f(x) + '" cy="' + f(y) + '" r="' + (r || 2.8) + '"/>';
  const A = (x, y, s) => SV.t(f(x), f(y), s, 'sv-a');
  const T = (x, y, s) => SV.t(f(x), f(y), s, 'sv-t');
  const S = (x, y, s) => SV.t(f(x), f(y), s, 'sv-s');
  const txt = (x, y, s, col, size, anchor) => '<text x="' + f(x) + '" y="' + f(y) + '" text-anchor="' + (anchor || 'middle') + '" font-family="Segoe UI,Arial,sans-serif" font-size="' + (size || 14) + '" font-weight="700" fill="' + col + '">' + s + '</text>';
  const dp = (x, y) => txt(x, y, 'δ+', DP, 14), dm = (x, y) => txt(x, y, 'δ−', DM, 14);
  /* lone pair of dots at angle deg (0 = right, 90 = down) around an atom; wide symbols (Cl) get more room left/right */
  const lp = (x, y, deg, wide) => {
    const a = R(deg), r = 17 + (wide ? 7 * Math.abs(Math.cos(a)) : 0) + 3 * Math.abs(Math.sin(2 * a)), cx = x + r * Math.cos(a), cy = y + r * Math.sin(a), px = -Math.sin(a) * 5, py = Math.cos(a) * 5;
    return dot(cx + px, cy + py) + dot(cx - px, cy - py);
  };
  const bd = (x1, y1, x2, y2, n) => SV.bond(+f(x1), +f(y1), +f(x2), +f(y2), n || 1);
  /* dipole arrow: cross at the + end (x1,y1), head at the more electronegative end (x2,y2) */
  const dip = (x1, y1, x2, y2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 8, c = '#22145A', px = -Math.sin(a) * 6, py = Math.cos(a) * 6;
    const tx = x1 + (x2 - x1) * 0.2, ty = y1 + (y2 - y1) * 0.2;
    return '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2) + '" y2="' + f(y2) + '" stroke="' + c + '" stroke-width="2"/>' +
      '<line x1="' + f(tx + px) + '" y1="' + f(ty + py) + '" x2="' + f(tx - px) + '" y2="' + f(ty - py) + '" stroke="' + c + '" stroke-width="2"/>' +
      '<polygon fill="' + c + '" points="' + f(x2) + ',' + f(y2) + ' ' + f(x2 - h * Math.cos(a - .45)) + ',' + f(y2 - h * Math.sin(a - .45)) + ' ' + f(x2 - h * Math.cos(a + .45)) + ',' + f(y2 - h * Math.sin(a + .45)) + '"/>';
  };
  const fold = (x, y, L) => '<line x1="' + f(x - L) + '" y1="' + f(y) + '" x2="' + f(x + L) + '" y2="' + f(y) + '" stroke="#B5ABD6" stroke-width="1.3" stroke-dasharray="5 4"/>' +
    '<line x1="' + f(x) + '" y1="' + f(y - L) + '" x2="' + f(x) + '" y2="' + f(y + L) + '" stroke="#B5ABD6" stroke-width="1.3" stroke-dasharray="5 4"/>';
  /* thick arrow for "strength of pull" */
  const pull = (x1, y1, x2, y2, w, c) => {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 7 + w * 1.6, bx = x2 - h * 0.8 * Math.cos(a), by = y2 - h * 0.8 * Math.sin(a);
    return '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(bx) + '" y2="' + f(by) + '" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round"/>' +
      '<polygon fill="' + c + '" points="' + f(x2) + ',' + f(y2) + ' ' + f(x2 - h * Math.cos(a - .5)) + ',' + f(y2 - h * Math.sin(a - .5)) + ' ' + f(x2 - h * Math.cos(a + .5)) + ',' + f(y2 - h * Math.sin(a + .5)) + '"/>';
  };
  /* Bohr-style atom for the Coulombic figures; returns svg. shells e.g. [2,8,1]; arrow width w shows pull strength */
  const coulAtom = (cx, cy, sym, p, shells, w, step) => {
    const R0 = 15; let s = '';
    shells.forEach((n, i) => {
      const r = R0 + step * (i + 1);
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="#C9BFEA" stroke-width="1.2"/>';
      for (let j = 0; j < n; j++) {
        const a = R(-90 + 45 + j * 360 / n), last = i === shells.length - 1;
        s += '<circle cx="' + f(cx + r * Math.cos(a)) + '" cy="' + f(cy + r * Math.sin(a)) + '" r="' + (last ? 4.2 : 2.6) + '" fill="' + (last ? '#0FA89B' : '#9C8FD0') + '"/>';
      }
    });
    const rOut = R0 + step * shells.length, a0 = R(-45);
    s += pull(cx + (rOut - 7) * Math.cos(a0), cy + (rOut - 7) * Math.sin(a0), cx + (R0 + 1) * Math.cos(a0), cy + (R0 + 1) * Math.sin(a0), w, '#E07A5F');
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R0 + '" fill="#FFE3D8" stroke="#BF360C" stroke-width="1.5"/>' + txt(cx, cy + 4, p + '+', '#3E1A0A', 11);
    return s;
  };
  /* water molecule: O at (ox,oy), H atoms at theta ± 52.25 deg (bond angle 104.5), returns {s, h:[[x,y],[x,y]]} */
  const water = (ox, oy, th, d, labels) => {
    d = d || 24; const hs = [th - 52.25, th + 52.25].map(t => [ox + d * Math.cos(R(t)), oy + d * Math.sin(R(t))]);
    let s = hs.map(h => '<line x1="' + f(ox) + '" y1="' + f(oy) + '" x2="' + f(h[0]) + '" y2="' + f(h[1]) + '" stroke="#78909C" stroke-width="5"/>').join('');
    s += hs.map(h => '<circle cx="' + f(h[0]) + '" cy="' + f(h[1]) + '" r="' + (d > 26 ? 9.5 : 8) + '" fill="#F5F7FA" stroke="#78909C" stroke-width="1.5"/><text x="' + f(h[0]) + '" y="' + f(h[1] + 3.5) + '" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="9.5" font-weight="700" fill="#37474F">H</text>').join('');
    s += '<circle cx="' + f(ox) + '" cy="' + f(oy) + '" r="' + (d > 26 ? 15 : 13) + '" fill="#EF5350" stroke="#B71C1C" stroke-width="1.5"/><text x="' + f(ox) + '" y="' + f(oy + 4.5) + '" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="12" font-weight="700" fill="#fff">O</text>';
    return { s, h: hs };
  };
  const hb = (x1, y1, x2, y2) => '<line x1="' + f(x1) + '" y1="' + f(y1) + '" x2="' + f(x2) + '" y2="' + f(y2) + '" stroke="#0FA89B" stroke-width="2.4" stroke-dasharray="4 3.5"/>';
  /* lone-pair lobe for shape diagrams */
  const lobe = (x, y, deg) => {
    const a = R(deg), cx = x + 29 * Math.cos(a), cy = y + 29 * Math.sin(a), px = -Math.sin(a) * 4.5, py = Math.cos(a) * 4.5;
    return '<ellipse cx="' + f(cx) + '" cy="' + f(cy) + '" rx="13" ry="8.5" transform="rotate(' + deg + ' ' + f(cx) + ' ' + f(cy) + ')" fill="#EDE7FB" stroke="#9C8FD0" stroke-width="1.3"/>' + dot(cx + px, cy + py, 2.4) + dot(cx - px, cy - py, 2.4);
  };
  const wedge = (x1, y1, x2, y2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1), sx = x1 + 14 * Math.cos(a), sy = y1 + 14 * Math.sin(a), ex = x1 + (L - 13) * Math.cos(a), ey = y1 + (L - 13) * Math.sin(a), px = -Math.sin(a) * 5, py = Math.cos(a) * 5;
    return '<polygon fill="#5B3FD0" points="' + f(sx) + ',' + f(sy) + ' ' + f(ex + px) + ',' + f(ey + py) + ' ' + f(ex - px) + ',' + f(ey - py) + '"/>';
  };
  const dash = (x1, y1, x2, y2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), L = Math.hypot(x2 - x1, y2 - y1); let s = '';
    for (let k = 0; k < 6; k++) {
      const t = 15 + k * (L - 28) / 5, w = 1.2 + k * 0.8, cx = x1 + t * Math.cos(a), cy = y1 + t * Math.sin(a), px = -Math.sin(a) * w, py = Math.cos(a) * w;
      s += '<line x1="' + f(cx + px) + '" y1="' + f(cy + py) + '" x2="' + f(cx - px) + '" y2="' + f(cy - py) + '" stroke="#5B3FD0" stroke-width="2"/>';
    }
    return s;
  };
  const at = (cx, cy, deg, d) => [cx + d * Math.cos(R(deg)), cy + d * Math.sin(R(deg))];

  const F = {};

  /* 1. Coulombic attraction: down a group, and across a period */
  F.group = SV.wrap(560, 214, 'Lithium, sodium and potassium: each has one more shell, and the pull on the valence electron gets weaker',
    coulAtom(95, 92, 'Li', 3, [2, 1], 7, 14) + coulAtom(260, 92, 'Na', 11, [2, 8, 1], 4.5, 14) + coulAtom(450, 92, 'K', 19, [2, 8, 8, 1], 2, 14) +
    T(95, 172, 'Li (2 shells)') + T(260, 172, 'Na (3 shells)') + T(450, 172, 'K (4 shells)') +
    S(280, 200, 'Down a group: one more shell each time → valence e⁻ farther away + more shielding → weaker pull'));
  F.period = SV.wrap(560, 200, 'Sodium, aluminum and chlorine: same three shells, more protons, and the pull gets stronger',
    coulAtom(100, 84, 'Na', 11, [2, 8, 1], 2, 15) + coulAtom(280, 84, 'Al', 13, [2, 8, 3], 4.5, 15) + coulAtom(460, 84, 'Cl', 17, [2, 8, 7], 7, 15) +
    T(100, 162, 'Na (11 p⁺)') + T(280, 162, 'Al (13 p⁺)') + T(460, 162, 'Cl (17 p⁺)') +
    S(280, 188, 'Across a period: same number of shells, more protons → stronger pull (thicker arrow)'));

  /* 3. Bonding sites: single (unpaired) valence electrons */
  F.sites = SV.wrap(600, 118, 'Lewis dot diagrams of H, C, N, O and Cl showing the single electrons that are bonding sites',
    SV.atom(60, 46, 'H', ['r1']) + SV.atom(180, 46, 'C', ['t1', 'r1', 'b1', 'l1']) + SV.atom(300, 46, 'N', ['t', 'r1', 'b1', 'l1']) +
    SV.atom(420, 46, 'O', ['t', 'r', 'b1', 'l1']) + SV.atom(540, 46, 'Cl', ['t', 'r', 'b', 'l1']) +
    T(60, 92, '1 site') + T(180, 92, '4 sites') + T(300, 92, '3 sites') + T(420, 92, '2 sites') + T(540, 92, '1 site') +
    S(60, 110, '1 valence e⁻') + S(180, 110, '4 valence e⁻') + S(300, 110, '5 valence e⁻') + S(420, 110, '6 valence e⁻') + S(540, 110, '7 valence e⁻'));

  /* 3. Lewis structures, panel width 160 */
  const pan = (i, name, sub) => T(80 + i * 160, 134, name) + S(80 + i * 160, 151, sub);
  let a = '', c;
  c = 80; a += A(c - 23, 62, 'H') + A(c + 23, 62, 'H') + bd(c - 23, 62, c + 23, 62) + pan(0, 'H₂', 'each H has 2 e⁻');
  c = 240; a += A(c - 28, 62, 'Cl') + A(c + 28, 62, 'Cl') + bd(c - 28, 62, c + 28, 62) +
    lp(c - 28, 62, 270, 1) + lp(c - 28, 62, 180, 1) + lp(c - 28, 62, 90, 1) + lp(c + 28, 62, 270, 1) + lp(c + 28, 62, 0, 1) + lp(c + 28, 62, 90, 1) + pan(1, 'Cl₂', 'each Cl: 2 + 6 = 8');
  c = 400; a += A(c, 50, 'O') + A(c - 42, 88, 'H') + A(c + 42, 88, 'H') + bd(c, 50, c - 42, 88) + bd(c, 50, c + 42, 88) +
    lp(c, 50, 215) + lp(c, 50, 325) + pan(2, 'H₂O', 'O: 4 shared + 4 = 8');
  c = 560; a += A(c, 58, 'N') + A(c - 44, 58, 'H') + A(c + 44, 58, 'H') + A(c, 100, 'H') + bd(c, 58, c - 44, 58) + bd(c, 58, c + 44, 58) + bd(c, 58, c, 100) +
    lp(c, 58, 270) + pan(3, 'NH₃', 'N: 6 shared + 2 = 8');
  F.lewis1 = SV.wrap(640, 160, 'Lewis structures of H2, Cl2, H2O and NH3 with single bonds', a);
  a = '';
  c = 80; a += A(c, 58, 'C') + A(c - 42, 58, 'H') + A(c + 42, 58, 'H') + A(c, 18, 'H') + A(c, 98, 'H') +
    bd(c, 58, c - 42, 58) + bd(c, 58, c + 42, 58) + bd(c, 58, c, 18) + bd(c, 58, c, 98) + pan(0, 'CH₄', 'C: 4 bonds = 8');
  c = 240; a += A(c - 24, 58, 'O') + A(c + 24, 58, 'O') + bd(c - 24, 58, c + 24, 58, 2) + lp(c - 24, 58, 270) + lp(c - 24, 58, 180) + lp(c + 24, 58, 270) + lp(c + 24, 58, 0) +
    pan(1, 'O₂', 'double: 2 pairs, 4 e⁻');
  c = 400; a += A(c - 46, 58, 'O') + A(c, 58, 'C') + A(c + 46, 58, 'O') + bd(c - 46, 58, c, 58, 2) + bd(c, 58, c + 46, 58, 2) +
    lp(c - 46, 58, 270) + lp(c - 46, 58, 90) + lp(c + 46, 58, 270) + lp(c + 46, 58, 90) + pan(2, 'CO₂', 'two double bonds on C');
  c = 560; a += A(c - 24, 58, 'N') + A(c + 24, 58, 'N') + bd(c - 24, 58, c + 24, 58, 3) + lp(c - 24, 58, 180) + lp(c + 24, 58, 0) +
    pan(3, 'N₂', 'triple: 3 pairs, 6 e⁻');
  F.lewis2 = SV.wrap(640, 160, 'Lewis structures of CH4, O2 (double bond), CO2 (two double bonds) and N2 (triple bond)', a);

  /* 4. Equal sharing, unequal sharing, transfer */
  const cloud = (x, y, rx) => '<ellipse cx="' + f(x) + '" cy="' + f(y) + '" rx="' + rx + '" ry="15" fill="#EDE7FB" stroke="#C9BFEA"/>';
  a = '';
  c = 107; a += cloud(c, 64, 26) + bd(c - 36, 64, c + 36, 64) + A(c - 36, 64, 'H') + A(c + 36, 64, 'H') + dot(c - 4, 64) + dot(c + 4, 64) +
    T(c, 116, 'H–H: ΔEN 0.0') + S(c, 134, 'equal sharing → nonpolar') + S(c, 20, 'tie in the tug of war');
  c = 320; a += cloud(c + 18, 64, 20) + bd(c - 44, 64, c + 44, 64) + A(c - 44, 64, 'H') + A(c + 46, 64, 'Cl') + dot(c + 14, 64) + dot(c + 22, 64) +
    dp(c - 44, 40) + dm(c + 46, 40) + dip(c - 44, 90, c + 46, 90) + T(c, 116, 'H–Cl: ΔEN 0.96') + S(c, 134, 'unequal sharing → polar covalent') + S(c, 20, 'Cl pulls harder');
  c = 533; a += '<circle cx="' + (c - 38) + '" cy="64" r="16" fill="#FFCCBC" stroke="#BF360C"/><circle cx="' + (c + 36) + '" cy="64" r="24" fill="#B2EBF2" stroke="#00838F"/>' +
    T(c - 38, 69, 'Na⁺') + T(c + 36, 69, 'Cl⁻') + T(c, 116, 'Na⁺Cl⁻: ΔEN 2.23') + S(c, 134, 'electron transferred → ionic') + S(c, 20, 'full charges, no δ');
  a += '<line x1="213" y1="12" x2="213" y2="140" stroke="#EEEAF8" stroke-width="2"/><line x1="427" y1="12" x2="427" y2="140" stroke="#EEEAF8" stroke-width="2"/>';
  F.spectrum = SV.wrap(640, 148, 'Equal sharing in H2, unequal sharing in HCl with partial charges and a dipole arrow, and full charges in NaCl', a);

  /* 5. SNAP: nonpolar (symmetrical) */
  a = '';
  c = 110; a += fold(c, 62, 62) + A(c - 54, 62, 'O') + A(c, 62, 'C') + A(c + 54, 62, 'O') + bd(c - 54, 62, c, 62, 2) + bd(c, 62, c + 54, 62, 2) +
    dm(c - 54, 40) + dp(c, 40) + dm(c + 54, 40) + dip(c - 10, 90, c - 46, 90) + dip(c + 10, 90, c + 46, 90) +
    T(c, 146, 'CO₂: symmetrical') + S(c, 164, 'polar bonds cancel → nonpolar');
  c = 330; a += fold(c, 70, 66) + A(c, 70, 'C') + A(c - 50, 70, 'F') + A(c + 50, 70, 'F') + A(c, 22, 'F') + A(c, 118, 'F') +
    bd(c, 70, c - 50, 70) + bd(c, 70, c + 50, 70) + bd(c, 70, c, 22) + bd(c, 70, c, 118) +
    dp(c + 24, 58) + dm(c - 66, 56) + dm(c + 68, 56) + dm(c + 18, 18) + dm(c + 18, 124) +
    T(c, 146, 'CF₄: symmetrical') + S(c, 164, 'polar bonds cancel → nonpolar');
  F.snapNon = SV.wrap(440, 174, 'Carbon dioxide and carbon tetrafluoride are symmetrical, so their bond dipoles cancel and the molecules are nonpolar', a);
  /* 5. SNAP: polar (asymmetrical) */
  a = '';
  c = 100; a += fold(c, 62, 58) + A(c, 62, 'O') + A(c - 44, 98, 'H') + A(c + 44, 98, 'H') + bd(c, 62, c - 44, 98) + bd(c, 62, c + 44, 98) +
    lp(c, 62, 215) + lp(c, 62, 325) + dm(c + 34, 46) + dp(c - 60, 90) + dp(c + 60, 90) +
    T(c, 146, 'H₂O: bent') + S(c, 164, 'asymmetrical → polar');
  c = 300; a += fold(c, 66, 58) + A(c, 66, 'N') + A(c - 44, 66, 'H') + A(c + 44, 66, 'H') + A(c, 110, 'H') + bd(c, 66, c - 44, 66) + bd(c, 66, c + 44, 66) + bd(c, 66, c, 110) +
    lp(c, 66, 270) + dm(c + 26, 50) + dp(c - 46, 46) + dp(c + 50, 46) + dp(c + 20, 116) +
    T(c, 146, 'NH₃: lone pair on top') + S(c, 164, 'asymmetrical → polar');
  c = 500; a += A(c - 30, 66, 'H') + A(c + 30, 66, 'Cl') + bd(c - 30, 66, c + 30, 66) + lp(c + 30, 66, 270, 1) + lp(c + 30, 66, 0, 1) + lp(c + 30, 66, 90, 1) +
    dp(c - 30, 42) + dm(c + 30, 34) + dip(c - 30, 98, c + 30, 98) +
    T(c, 146, 'HCl: one polar bond') + S(c, 164, 'nothing to cancel → polar');
  F.snapPol = SV.wrap(600, 174, 'Water, ammonia and hydrogen chloride are asymmetrical, so the charge is uneven and the molecules are polar', a);

  /* 6. Hydrogen bonds between water molecules (center molecule plus two H-bond acceptors and two donors) */
  {
    const OC = [210, 112], d = 30, hbL = 50, parts = [];
    const m0 = water(OC[0], OC[1], 90, d); parts.push(m0.s);
    [[37.75, 92.75], [142.25, 87.25]].forEach(([dir, th]) => {     // the center molecule's H atoms donate to these
      const h = at(OC[0], OC[1], dir, d), o = at(h[0], h[1], dir, hbL);
      parts.push(hb(...at(h[0], h[1], dir, 9), ...at(o[0], o[1], dir + 180, 15)), water(o[0], o[1], th, d).s);
    });
    [[325, 197.25], [215, -17.25]].forEach(([dir, th]) => {        // these molecules donate an H to the center O
      const h = at(OC[0], OC[1], dir, hbL), o = at(h[0], h[1], dir, d);
      parts.push(hb(...at(OC[0], OC[1], dir, 15), ...at(h[0], h[1], dir + 180, 9)), water(o[0], o[1], th, d).s);
    });
    a = parts.join('') + dm(OC[0] + 34, OC[1] + 5) + dp(OC[0] - 24, 160) + dp(OC[0] + 24, 160) +
      '<line x1="390" y1="80" x2="422" y2="80" stroke="#78909C" stroke-width="5"/>' + txt(432, 85, 'covalent bond', '#22145A', 13, 'start') + txt(432, 101, '(inside a molecule)', '#22145A', 12, 'start') +
      hb(390, 130, 422, 130) + txt(432, 135, 'hydrogen bond = IMF', '#0B7A70', 13, 'start') + txt(432, 151, '(between molecules)', '#0B7A70', 12, 'start');
    F.hbond = SV.wrap(600, 210, 'Water molecules held together by hydrogen bonds: the partially positive H of one molecule attracts the partially negative O of another', a);
  }

  /* 7. Water molecules around Na+ and Cl- */
  a = '';
  const ion = (x, y, r, lab, fill, st) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '" stroke="' + st + '" stroke-width="2"/>' + T(x, y + 5, lab);
  [0, 90, 180, 270].forEach(g => { const p = at(130, 104, g, 42); a += water(p[0], p[1], g, 22).s; });
  a += ion(130, 104, 18, 'Na⁺', '#FFCCBC', '#BF360C');
  [45, 135, 225, 315].forEach(g => { const p = at(420, 104, g, 64); a += water(p[0], p[1], g + 180 + 52.25, 22).s; });
  a += ion(420, 104, 25, 'Cl⁻', '#B2EBF2', '#00838F');
  a += T(130, 196, 'δ− O end faces Na⁺') + T(420, 196, 'δ+ H end faces Cl⁻');
  F.dissolve = SV.wrap(560, 210, 'A sodium ion surrounded by water molecules with their oxygen ends toward it, and a chloride ion surrounded by water molecules with a hydrogen end toward it', a);

  /* 9. VSEPR shapes */
  const H = (x, y) => A(x, y, 'H');
  a = '';
  c = 85; { const y = 84, up = at(c, y, 270, 56), ll = at(c, y, 150, 56), w = at(c, y, 78, 56), d = at(c, y, 22, 56);
    a += A(c, y, 'C') + H(...up) + H(...ll) + H(...w) + H(...d) + bd(c, y, ...up) + bd(c, y, ...ll) + wedge(c, y, ...w) + dash(c, y, ...d) +
      T(c, 176, 'CH₄ tetrahedral') + S(c, 194, '4 bonds, 0 lone pairs') + S(c, 210, '109.5° · nonpolar'); }
  c = 255; { const y = 84, ll = at(c, y, 150, 56), w = at(c, y, 78, 56), d = at(c, y, 22, 56);
    a += lobe(c, y, 270) + A(c, y, 'N') + H(...ll) + H(...w) + H(...d) + bd(c, y, ...ll) + wedge(c, y, ...w) + dash(c, y, ...d) +
      T(c, 176, 'NH₃ pyramidal') + S(c, 194, '3 bonds, 1 lone pair') + S(c, 210, '107° · polar'); }
  c = 420; { const y = 84, h1 = at(c, y, 90 + 52.25, 56), h2 = at(c, y, 90 - 52.25, 56);
    a += lobe(c, y, 220) + lobe(c, y, 320) + A(c, y, 'O') + H(...h1) + H(...h2) + bd(c, y, ...h1) + bd(c, y, ...h2) +
      T(c, 176, 'H₂O bent') + S(c, 194, '2 bonds, 2 lone pairs') + S(c, 210, '104.5° · polar'); }
  F.shapes1 = SV.wrap(510, 220, 'VSEPR shapes: methane tetrahedral, ammonia pyramidal, water bent', a);
  a = '';
  c = 110; a += A(c - 50, 70, 'O') + A(c, 70, 'C') + A(c + 50, 70, 'O') + bd(c - 50, 70, c, 70, 2) + bd(c, 70, c + 50, 70, 2) +
    lp(c - 50, 70, 270) + lp(c - 50, 70, 90) + lp(c + 50, 70, 270) + lp(c + 50, 70, 90) +
    T(c, 150, 'CO₂ linear') + S(c, 168, '2 double bonds, 0 lone pairs on C') + S(c, 184, '180° · nonpolar');
  c = 300; { const y = 74, p1 = at(c, y, 270, 46), p2 = at(c, y, 30, 46), p3 = at(c, y, 150, 46);
    a += A(c, y, 'B') + H(...p1) + H(...p2) + H(...p3) + bd(c, y, ...p1) + bd(c, y, ...p2) + bd(c, y, ...p3) +
      T(c, 150, 'BH₃ trigonal planar') + S(c, 168, '3 bonds, 0 lone pairs') + S(c, 184, '120° · nonpolar'); }
  F.shapes2 = SV.wrap(400, 194, 'VSEPR shapes: carbon dioxide linear, borane trigonal planar', a);
  return F;
})();

LESSONS.c3 = {
  sections: [
    { t: 'Coulombic attraction', tp: ['rad', 'ie', 'en'], h: `
      <h2>Coulombic attraction: the pull behind everything in this unit</h2>
      <p><b>Coulombic attraction</b> (also called <b>electrostatic attraction</b>) is the pull between opposite charges. In an atom, the positive <b>protons</b> in the nucleus pull on the negative <b>electrons</b> around it. Almost every idea in this unit (atom size, electronegativity, polar bonds) comes back to how strong this pull is.</p>
      <h3>Two things control the pull</h3>
      <ul><li><b>Charge:</b> more protons pull harder. In the class activity, 2 protons pulled twice as hard as 1 proton, and 4 protons pulled four times as hard.</li>
        <li><b>Distance:</b> the farther away the electron is, the <b>weaker</b> the pull, and it drops off quickly. Doubling the distance cut the force to about one-fourth.</li></ul>
      <table class="tbl"><tr><th>Distance between + and &minus;</th><th>Force of attraction</th></tr>
        <tr><td>0.10 nm</td><td class="n">2.30 &times; 10<sup>&minus;8</sup> N</td></tr>
        <tr><td>0.20 nm (twice as far)</td><td class="n">0.58 &times; 10<sup>&minus;8</sup> N (about &frac14;)</td></tr>
        <tr><td>0.30 nm</td><td class="n">0.26 &times; 10<sup>&minus;8</sup> N</td></tr></table>
      <div class="tip"><b>Farther = weaker, always.</b> If 0.30 nm gives 0.26 &times; 10<sup>&minus;8</sup> N, then at 0.50 nm the force is <b>less</b> than that, not more. "Closer" goes with "stronger".</div>
      <div class="key"><b>The nucleus's pull is not split up</b> among the electrons. Each electron feels about the full pull of the nucleus. A nucleus with 2 protons pulls on <i>each</i> of two electrons (at 0.10 nm) with about 4.60 &times; 10<sup>&minus;8</sup> N, not half of that.</div>
      <h3>Going down a group: attraction decreases</h3>
      <figure>${FIGC3.group}<figcaption>Thicker arrow = stronger pull on the valence (outermost) electron.</figcaption></figure>
      <p>Each step <b>down a group adds an energy level</b> (shell). The valence electron sits <b>farther from the nucleus</b>, and the filled shells underneath it block some of the nucleus's pull. This is the <b>shielding effect</b>.</p>
      <p>Think of a <b>magnet on a fridge</b> holding paper. One sheet stays put, but every extra sheet between the magnet and the fridge weakens the hold, and eventually the paper slides off. The layers of paper are like the inner energy levels.</p>
      <p>Potassium has more protons (19) than sodium (11), but the extra shell and extra shielding win. So <b>Coulombic attraction decreases down a group</b>.</p>
      <h3>Going across a period: attraction increases</h3>
      <figure>${FIGC3.period}</figure>
      <p>Across a period the <b>number of shells stays the same</b>, so the distance stays about the same, while the <b>number of protons increases</b>. More protons pulling on the same shell means <b>Coulombic attraction increases across a period</b>.</p>
      <div class="steps"><div class="st">Worked example: which atom pulls harder on its valence electrons?</div>
        <b>Ca or Ba?</b> Same group. Ba has more shells, so its valence electrons are farther and more shielded. <b>Ca</b> pulls harder.<br>
        <b>Na or Cl?</b> Same period (3 shells each). Cl has 17 protons vs. 11. <b>Cl</b> pulls harder.<br>
        <b>Ar or Xe?</b> Same group. <b>Ar</b> has fewer shells, so it pulls harder.</div>
      <div class="tip">When you explain a trend, use the words <b>shells (energy levels)</b>, <b>distance</b>, <b>shielding</b> and <b>protons</b>. "K is bigger because it has more electrons" is not enough; K is bigger because it has <b>more shells</b>.</div>` },
    { t: 'Periodic trends', tp: ['en', 'ie', 'rad'], h: `
      <h2>Periodic trends: electronegativity, ionization energy and atomic radius</h2>
      <h3>Three definitions</h3>
      <ul><li><b>Electronegativity (EN):</b> an atom's attraction for electrons <b>in a bond</b>, how hard it pulls on shared electrons.</li>
        <li><b>Ionization energy (IE):</b> the energy needed to <b>remove an electron</b> from an atom.</li>
        <li><b>Atomic radius:</b> the size of the atom, from the nucleus to the outer edge of the electron cloud.</li></ul>
      <figure>${FIG4.trends}</figure>
      <table class="tbl"><tr><th>Trend</th><th>Across a period &rarr;</th><th>Down a group &darr;</th></tr>
        <tr><td>Atomic radius</td><td>decreases</td><td>increases</td></tr>
        <tr><td>Ionization energy</td><td>increases</td><td>decreases</td></tr>
        <tr><td>Electronegativity</td><td>increases</td><td>decreases</td></tr></table>
      <h3>Explain each one with Coulombic attraction</h3>
      <ul><li><b>Across a period:</b> same shells, more protons, so the attraction gets stronger. The electrons are pulled in closer (<b>smaller radius</b>), they are harder to remove (<b>higher IE</b>), and the atom pulls harder on shared electrons (<b>higher EN</b>).</li>
        <li><b>Down a group:</b> an extra shell and more shielding, so the attraction gets weaker. The atom is <b>bigger</b>, its valence electron is <b>easier to remove</b> (lower IE), and it pulls <b>less</b> on shared electrons (lower EN).</li></ul>
      <div class="key"><b>Metals</b> have <b>low ionization energy</b>: they lose electrons easily, which is why they form positive ions. <b>Nonmetals</b> have <b>high ionization energy</b>: it is hard to take their electrons, and they tend to gain or share electrons instead.</div>
      <p><b>Fluorine</b> has the highest electronegativity of all, <b>4.0</b> (3.98 on the class chart). The <b>noble gases</b> are usually given <b>no EN value</b> because they almost never bond. (A few charts, like the class one, list values for Kr and Xe, which can form a handful of compounds.)</p>
      <h3>Ion size</h3>
      <figure>${FIG4.ionsize}</figure>
      <ul><li><b>Cations are smaller</b> than their atoms. Na (2-8-1) loses its only third-shell electron and becomes Na<sup>+</sup> (2-8), one shell smaller.</li>
        <li><b>Anions are larger</b> than their atoms. Cl (2-8-7) gains an electron to become Cl<sup>&minus;</sup> (2-8-8). The extra electron adds repulsion, and the same 17 protons hold more electrons, so the cloud spreads out.</li></ul>
      <div class="tip"><b>Not on the Reference Tables:</b> electronegativity and ionization energy values are <b>not</b> printed on the 2025 Reference Tables. Learn the patterns. If a test question needs numbers, it will give you a table.</div>
      <div class="steps"><div class="st">Worked example</div>
        <b>Which is larger, Mg or S?</b> Both are in Period 3 (3 shells). S has 16 protons vs. 12 for Mg, so it pulls its electrons in tighter. <b>Mg is larger.</b><br>
        <b>Which has the higher ionization energy, Li or K?</b> Same group. K's valence electron is in the 4th shell, farther away and more shielded, so it is easier to remove. <b>Li has the higher IE.</b><br>
        <b>Which is more electronegative, N or P?</b> Same group; N has fewer shells, so it pulls shared electrons harder. <b>N.</b></div>
      <div class="br"><button class="btn bt" onclick="PT.view='en';goPage('table')">See electronegativity in color on the periodic table</button></div>` },
    { t: 'Covalent bonds & Lewis dot', tp: ['covl', 'lewis'], h: `
      <h2>Covalent bonds and Lewis dot structures</h2>
      <h3>Lesson 7: Is water a salt?</h3>
      <p>Our first idea was to model water like a salt: each H gives its electron to O, making [H]<sup>+</sup> ions and an [O]<sup>2&minus;</sup> ion. The evidence doesn't fit. Salts are made of a <b>metal + a nonmetal</b>, but H and O are <b>two nonmetals</b>. Salts are solids with very high melting points, and they conduct when dissolved; pure water melts at 0 &deg;C and is a poor conductor because it has almost no ions.</p>
      <div class="key"><b>Water is not a salt.</b> Two nonmetals don't transfer electrons; they <b>share</b> them. A shared pair of electrons is a <b>covalent bond</b>. No ions form.</div>
      <h3>Bonding sites</h3>
      <p>Draw the Lewis dot diagram of each atom, one dot per side before you start pairing. Each <b>single (unpaired) valence electron is a bonding site</b>: a place where the atom can share with another atom.</p>
      <figure>${FIGC3.sites}</figure>
      <h3>Single, double and triple bonds</h3>
      <table class="tbl"><tr><th>Bond</th><th>Pairs shared</th><th>Electrons shared</th><th>Drawn as</th><th>Example</th></tr>
        <tr><td>Single</td><td>1</td><td>2</td><td>&ndash;</td><td>H&ndash;H, Cl&ndash;Cl</td></tr>
        <tr><td>Double</td><td>2</td><td>4</td><td>=</td><td>O=O</td></tr>
        <tr><td>Triple</td><td>3</td><td>6</td><td>&equiv;</td><td>N&equiv;N</td></tr></table>
      <p>There is <b>no quadruple bond</b>: a triple bond is the most two atoms can share. Each line is one shared pair; the dot pairs left over are <b>lone pairs</b>. In a finished structure every atom has an <b>octet</b> (8 electrons), except H, which has 2.</p>
      <figure>${FIGC3.lewis1}${FIGC3.lewis2}<figcaption>Count the electrons around each atom: every line counts as 2 for both atoms it touches.</figcaption></figure>
      <div class="steps"><div class="st">Worked example: H₂O</div>
        O has 6 valence electrons: 2 pairs + <b>2 single electrons</b>, so 2 bonding sites. Each H has 1 single electron.<br>
        Each H shares its electron with one of O's single electrons, which makes <b>2 single bonds</b>.<br>
        Check: O has 2 bonds (4 e&minus;) + 2 lone pairs (4 e&minus;) = <b>8</b>. Each H has 1 bond = <b>2</b>.<br>
        One water molecule = 2 hydrogen <b>atoms</b> + 1 oxygen <b>atom</b>.</div>
      <div class="steps"><div class="st">Worked example: O₂ and N₂</div>
        O has <b>2</b> single electrons, so two O atoms share 2 pairs: a <b>double bond</b> (4 e&minus;). Each O: 4 shared + 2 lone pairs = 8.<br>
        N has 5 valence electrons with <b>3</b> single electrons, so two N atoms share 3 pairs: a <b>triple bond</b> (6 e&minus;). Each N: 6 shared + 1 lone pair = 8.<br>
        In CO<sub>2</sub>, C has 4 bonding sites and each O has 2, so C makes a double bond to each O: O=C=O.</div>
      <div class="tip">H only ever makes <b>one</b> bond (it has one electron and fills up at 2). Never put H in the center of a structure.</div>` },
    { t: 'Polar & nonpolar bonds', tp: ['pol', 'en'], h: `
      <h2>Polar and nonpolar covalent bonds</h2>
      <p>Sharing isn't always fair. Think of a <b>tug of war</b> over the shared electrons. The atom with the higher <b>electronegativity</b> pulls them closer to itself.</p>
      <figure>${FIGC3.spectrum}</figure>
      <ul><li><b>Nonpolar covalent:</b> the electrons are shared <b>equally</b> (or almost equally).</li>
        <li><b>Polar covalent:</b> the electrons are shared <b>unequally</b>. The atom that pulls harder gets a <b>partial negative charge (&delta;&minus;)</b>, and the other atom gets a <b>partial positive charge (&delta;+)</b>. &delta; means "partially": these are not full ions.</li>
        <li><b>Ionic:</b> the pull is so uneven that an electron is <b>transferred</b>. Na<sup>+</sup> and Cl<sup>&minus;</sup> have <b>full</b> charges, so we never write &delta; on them.</li></ul>
      <h3>Find &Delta;EN ("delta E")</h3>
      <div class="key"><b>&Delta;EN = bigger EN &minus; smaller EN</b>, then use the class ranges:<br>
        <b>0.0&ndash;0.3</b> nonpolar covalent &nbsp;&middot;&nbsp; <b>0.4&ndash;1.7</b> polar covalent &nbsp;&middot;&nbsp; <b>greater than 1.7</b> ionic</div>
      <table class="tbl"><tr><th>Element</th><th>EN</th><th>Element</th><th>EN</th></tr>
        <tr><td>H</td><td class="n">2.20</td><td>Na</td><td class="n">0.93</td></tr>
        <tr><td>C</td><td class="n">2.55</td><td>Mg</td><td class="n">1.31</td></tr>
        <tr><td>N</td><td class="n">3.04</td><td>S</td><td class="n">2.58</td></tr>
        <tr><td>O</td><td class="n">3.44</td><td>Cl</td><td class="n">3.16</td></tr>
        <tr><td>F</td><td class="n">3.98</td><td>K</td><td class="n">0.82</td></tr></table>
      <p class="hint">Values from the Pauling chart in the Lesson 8 packet. They are not on the Reference Tables.</p>
      <h3>The dipole arrow</h3>
      <p>A <b>dipole arrow</b> shows which way the electrons are pulled. Put a <b>cross at the + end</b> (the less electronegative atom), and point the arrow <b>toward the more electronegative atom</b>. For H&ndash;Cl the cross is at H and the head is at Cl.</p>
      <div class="steps"><div class="st">Worked examples</div>
        <b>H&ndash;Cl:</b> 3.16 &minus; 2.20 = <b>0.96</b> &rarr; polar covalent (H is &delta;+, Cl is &delta;&minus;). The Edpuzzle used older values, 3.0 &minus; 2.1 = 0.9: a slightly different number, same answer.<br>
        <b>H&ndash;H:</b> 2.20 &minus; 2.20 = <b>0.0</b> &rarr; nonpolar covalent.<br>
        <b>C&ndash;H:</b> 2.55 &minus; 2.20 = <b>0.35</b> &rarr; treated as <b>nonpolar</b>. It is so close to zero that C&ndash;H bonds carry almost no partial charge (that's why methane and mineral oil are nonpolar).<br>
        <b>O&ndash;H:</b> 3.44 &minus; 2.20 = <b>1.24</b> &rarr; polar covalent. This is the bond in water.<br>
        <b>Na&ndash;Cl:</b> 3.16 &minus; 0.93 = <b>2.23</b> &rarr; ionic (and it's a metal + a nonmetal).<br>
        <b>H&ndash;F:</b> 3.98 &minus; 2.20 = <b>1.78</b> &rarr; just over 1.7, but H and F are <b>two nonmetals</b>, so they share. HF is a <b>very polar covalent</b> bond, not ionic.</div>
      <div class="tip"><b>Two nonmetals always share electrons.</b> Use &Delta;EN to decide between nonpolar and polar, but don't call a nonmetal&ndash;nonmetal bond ionic. C&ndash;H sits right on the line between the ranges (with older values it comes out 0.4), so if a test gives its own values and cutoffs, go with the test.</div>
      <div class="br"><button class="btn bt" onclick="go(10)">Try the Bond Polarity (&Delta;EN) calculator</button></div>` },
    { t: 'SNAP: polar & nonpolar molecules', tp: ['snap'], h: `
      <h2>SNAP: polar and nonpolar molecules</h2>
      <p>There are two different questions, and they can have different answers:</p>
      <ul><li><b>Bond polarity:</b> is one bond shared unequally? (Use &Delta;EN.)</li>
        <li><b>Molecular polarity:</b> does the <b>whole molecule</b> have a &delta;+ end and a &delta;&minus; end? (Use symmetry.)</li></ul>
      <div class="key"><b>SNAP:</b> <b>S</b>ymmetrical = <b>N</b>onpolar &nbsp;&middot;&nbsp; <b>A</b>symmetrical = <b>P</b>olar.<br>An asymmetrical molecule has an <b>uneven charge distribution</b>, so it has a positive end and a negative end: a polar molecule.</div>
      <h3>The fold test</h3>
      <p>Draw a vertical line and a horizontal line through the <b>central atom</b> (the dashed lines below). Fold the molecule over each line. If both halves match on <b>both</b> lines, including the lone pairs, the molecule is <b>symmetrical</b>.</p>
      <figure>${FIGC3.snapNon}<figcaption>The bonds are polar, but the pulls are equal and opposite, so they cancel.</figcaption></figure>
      <figure>${FIGC3.snapPol}<figcaption>Lone pairs on the central atom make the molecule lopsided. Lone pairs on outer atoms are left off to keep it clean.</figcaption></figure>
      <table class="tbl"><tr><th>Molecule</th><th>Polar bonds?</th><th>Symmetrical?</th><th>Molecule</th></tr>
        <tr><td>CO<sub>2</sub></td><td>yes (C=O)</td><td>yes</td><td><b>nonpolar</b></td></tr>
        <tr><td>CF<sub>4</sub></td><td>yes (C&ndash;F)</td><td>yes</td><td><b>nonpolar</b></td></tr>
        <tr><td>CH<sub>4</sub></td><td>barely (C&ndash;H)</td><td>yes</td><td><b>nonpolar</b></td></tr>
        <tr><td>H<sub>2</sub>O</td><td>yes (O&ndash;H)</td><td>no (bent)</td><td><b>polar</b></td></tr>
        <tr><td>NH<sub>3</sub></td><td>yes (N&ndash;H)</td><td>no (lone pair on top)</td><td><b>polar</b></td></tr>
        <tr><td>HCl</td><td>yes</td><td>no (two different atoms)</td><td><b>polar</b></td></tr></table>
      <div class="steps"><div class="st">Worked example: CF₄ vs. H₂O</div>
        <b>CF₄:</b> C&ndash;F has &Delta;EN = 3.98 &minus; 2.55 = 1.43, so each bond is polar and each F is &delta;&minus;. But the four F atoms are spread evenly around C. Every fold matches, the four pulls cancel, and the molecule is <b>nonpolar</b>.<br>
        <b>H₂O:</b> O&ndash;H bonds are polar (1.24). Water is bent, with both H atoms on one side and two lone pairs on the other. The horizontal fold doesn't match, so the molecule is <b>asymmetrical</b>: the O side is &delta;&minus; and the H side is &delta;+. Water is <b>polar</b>.</div>
      <div class="tip"><b>Polar bond &ne; polar molecule.</b> CO<sub>2</sub> and CF<sub>4</sub> have polar bonds but are nonpolar molecules. A molecule needs polar bonds <b>and</b> an asymmetrical shape to be polar.</div>` },
    { t: 'IMFs & hydrogen bonding', tp: ['imf', 'hb'], h: `
      <h2>Intermolecular forces and hydrogen bonding</h2>
      <p>An <b>intermolecular force (IMF)</b> is an attraction <b>between</b> molecules. It is a different thing from the covalent bonds <b>inside</b> a molecule. When water boils, the IMFs between molecules break; the O&ndash;H bonds stay whole, and steam is still H<sub>2</sub>O.</p>
      <figure>${FIGC3.hbond}<figcaption>The &delta;+ H of one water molecule is attracted to the &delta;&minus; O of a neighbor (dashed lines).</figcaption></figure>
      <ul><li><b>Polar molecules</b> have &delta;+ and &delta;&minus; ends that attract neighboring molecules, so they have <b>stronger IMFs</b> than nonpolar molecules. (SNAP: symmetrical/nonpolar = weak IMF, asymmetrical/polar = strong IMF.)</li>
        <li><b>Hydrogen bonding</b> is the <b>strongest IMF</b>. It happens <b>only when H is bonded to F, O or N</b>. Those atoms are so electronegative that the H becomes very &delta;+.</li></ul>
      <div class="key"><b>Stronger IMF</b> &rarr; <b>higher boiling point</b>, <b>higher melting point</b> and <b>higher surface tension</b>. More energy is needed to pull the molecules apart.</div>
      <table class="tbl"><tr><th>Substance</th><th>Polar?</th><th>Hydrogen bonding?</th><th>Boiling point</th></tr>
        <tr><td>H<sub>2</sub>O</td><td>polar</td><td>yes (H on O)</td><td class="n">100 &deg;C</td></tr>
        <tr><td>NH<sub>3</sub></td><td>polar</td><td>yes (H on N)</td><td class="n">&minus;33 &deg;C</td></tr>
        <tr><td>H<sub>2</sub>S</td><td>polar</td><td>no (S is not F, O or N)</td><td class="n">&minus;60 &deg;C</td></tr>
        <tr><td>CH<sub>4</sub></td><td>nonpolar</td><td>no</td><td class="n">&minus;162 &deg;C</td></tr></table>
      <div class="steps"><div class="st">Worked example: why does H₂O boil 160 degrees higher than H₂S?</div>
        Both are bent, polar molecules of about the same size, and H<sub>2</sub>S is even heavier.<br>
        In H<sub>2</sub>O the H is bonded to <b>O</b>, so water molecules form <b>hydrogen bonds</b>. In H<sub>2</sub>S the H is bonded to S, so there is no hydrogen bonding.<br>
        Stronger IMF &rarr; more energy to separate the molecules &rarr; <b>higher boiling point</b> for water. CH<sub>4</sub> is nonpolar with only weak IMFs, so it boils lowest of all.</div>
      <h3>Back to Lesson 3: the penny drops</h3>
      <p>Water stuck together much better than acetone or mineral oil, so many more drops of water fit on a penny. Water's hydrogen bonds give it <b>high surface tension</b>. Mineral oil is nonpolar, with no &delta;+ or &delta;&minus; ends, so its molecules attract each other much less than water molecules do, and far fewer drops fit.</p>
      <div class="tip"><b>IMF vs. bond:</b> a hydrogen bond is <i>not</i> a covalent bond to hydrogen. It is the attraction between an H on one molecule and an F, O or N on <b>another</b> molecule.</div>` },
    { t: 'How water dissolves salts', tp: ['mia', 'snap'], h: `
      <h2>How water dissolves salts (Lesson 8)</h2>
      <p>Solid NaCl is a lattice of Na<sup>+</sup> and Cl<sup>&minus;</sup> ions held by strong electrostatic attraction. Water can pull that lattice apart because water molecules are <b>polar</b>: the O end is &delta;&minus; and the H ends are &delta;+.</p>
      <figure>${FIGC3.dissolve}<figcaption>Opposite charges attract: water turns its O end toward a cation and an H end toward an anion.</figcaption></figure>
      <ul><li>The <b>&delta;&minus; oxygen end</b> of water surrounds the <b>cation</b> (Na<sup>+</sup>).</li>
        <li>The <b>&delta;+ hydrogen ends</b> of water surround the <b>anion</b> (Cl<sup>&minus;</sup>).</li></ul>
      <p>This pull between a polar molecule and an ion is called <b>molecule&ndash;ion attraction</b>. Many water molecules tugging together pull ions out of the lattice one by one. Each ion is then surrounded by water and free to move: these are <b>mobile ions</b>, and they are why salt water <b>conducts electric current</b> while pure water and solid NaCl don't.</p>
      <div class="key"><b>"Like dissolves like."</b> Polar solvents (water) dissolve <b>polar</b> and <b>ionic</b> substances. Nonpolar solvents dissolve <b>nonpolar</b> substances. That's why oil and water don't mix.</div>
      <div class="steps"><div class="st">Worked example: why does salt dissolve in water but not in mineral oil?</div>
        <b>Claim:</b> water dissolves NaCl because water is polar; mineral oil is nonpolar.<br>
        <b>Evidence:</b> water has &delta;&minus; O and &delta;+ H ends; mineral oil has no partial charges.<br>
        <b>Reasoning:</b> the &delta;&minus; O ends attract Na<sup>+</sup> and the &delta;+ H ends attract Cl<sup>&minus;</sup>, pulling the ions out of the lattice. Mineral oil has nothing charged to attract the ions, so the lattice stays together.</div>
      <div class="tip"><b>Which end faces which ion?</b> Opposites attract. O is &delta;<b>&minus;</b>, so it faces the <b>positive</b> ion. H is &delta;<b>+</b>, so it faces the <b>negative</b> ion. And Na<sup>+</sup> and Cl<sup>&minus;</sup> keep their <b>full</b> charges; only the water molecule has &delta; charges.</div>` },
    { t: 'Metallic bonding', tp: ['metb', 'metal'], h: `
      <h2>Metallic bonding</h2>
      <p>In a metal, the atoms give up their valence electrons to the whole piece of metal. The result is <b>positive metal ions in a "sea" of mobile (delocalized) electrons</b>. The attraction between the positive ions and the sea of electrons is the <b>metallic bond</b>.</p>
      <figure>${FIG5.metal}<figcaption>Positive metal ions (pink) surrounded by electrons (purple) that are free to move through the whole metal.</figcaption></figure>
      <h3>The sea of electrons explains metal properties</h3>
      <ul><li><b>Conductivity:</b> the mobile electrons can flow, so metals conduct electricity and heat, even as solids.</li>
        <li><b>Malleable</b> (bendable, can be hammered into sheets) and <b>ductile</b> (stretchable into wire): the layers of ions can slide past each other while the electron sea keeps holding them together. Mercury is the exception only because it is a liquid at room temperature.</li>
        <li><b>Luster:</b> the free electrons reflect light, so metals are shiny.</li></ul>
      <div class="tip"><b>No Lewis dot diagrams for metallic bonding.</b> The electrons don't belong to any one pair of atoms, so there are no shared pairs or transferred electrons to draw.</div>
      <table class="tbl"><tr><th>Bond</th><th>Between</th><th>Electrons are&hellip;</th><th>Example</th></tr>
        <tr><td><b>Ionic</b></td><td>metal + nonmetal</td><td><b>transferred</b> (makes ions)</td><td>NaCl</td></tr>
        <tr><td><b>Covalent</b></td><td>nonmetal + nonmetal</td><td><b>shared</b> in pairs</td><td>H<sub>2</sub>O, Cl<sub>2</sub></td></tr>
        <tr><td><b>Metallic</b></td><td>metal atoms</td><td>a <b>sea of mobile electrons</b></td><td>Al, Cu</td></tr></table>
      <p class="hint">Metallic bonding also holds <b>alloys</b> together, which are mixtures of metals such as brass (copper + zinc).</p>
      <div class="steps"><div class="st">Worked example: copper wire vs. solid salt</div>
        <b>Why does a copper wire conduct while a solid block of NaCl doesn't?</b><br>
        Copper has metallic bonding: its sea of <b>mobile electrons</b> can flow through the solid.<br>
        In solid NaCl the ions are locked in place in the lattice, and there are no free electrons. NaCl only conducts once it is dissolved (or melted), when it has <b>mobile ions</b>.</div>` },
    { t: 'VSEPR & molecular shapes', tp: ['vsepr', 'snap'], h: `
      <h2>VSEPR and molecular shapes</h2>
      <p><b>VSEPR</b> stands for <b>valence shell electron pair repulsion</b>. Electron pairs are all negative, so the pairs around the <b>central atom</b> push each other as far apart as they can. That push sets the shape of the molecule.</p>
      <div class="key"><b>Lone pairs count too.</b> A lone pair on the central atom pushes the bonding pairs away even harder, squeezing the bonds closer together. Count both the <b>bonds</b> and the <b>lone pairs</b> on the central atom.</div>
      <figure>${FIGC3.shapes1}${FIGC3.shapes2}<figcaption>Solid wedge = pointing toward you; hashed wedge = pointing away. Lobes are lone pairs on the central atom.</figcaption></figure>
      <table class="tbl"><tr><th>Molecule</th><th>Bonds on center</th><th>Lone pairs on center</th><th>Shape</th><th>Polarity (SNAP)</th></tr>
        <tr><td>CH<sub>4</sub></td><td>4</td><td>0</td><td>tetrahedral ("tetra" = 4 corners)</td><td>symmetrical &rarr; nonpolar</td></tr>
        <tr><td>NH<sub>3</sub></td><td>3</td><td>1</td><td>pyramidal</td><td>asymmetrical &rarr; polar</td></tr>
        <tr><td>H<sub>2</sub>O</td><td>2</td><td>2</td><td>bent</td><td>asymmetrical &rarr; polar</td></tr>
        <tr><td>CO<sub>2</sub></td><td>2 (double)</td><td>0</td><td>linear</td><td>symmetrical &rarr; nonpolar</td></tr>
        <tr><td>BH<sub>3</sub></td><td>3</td><td>0</td><td>trigonal planar</td><td>symmetrical &rarr; nonpolar</td></tr></table>
      <ul><li><b>CO<sub>2</sub></b> has <b>no lone pairs on C</b>, so nothing pushes the two O atoms out of line: it is linear (180&deg;).</li>
        <li><b>BH<sub>3</sub></b> is an <b>exception to the octet rule</b>: B has only 3 valence electrons, so it makes 3 bonds and ends up with just <b>6 electrons</b>. With 3 pairs and no lone pairs, it spreads out flat at 120&deg;.</li></ul>
      <div class="steps"><div class="st">Worked example: CH₄, NH₃ and H₂O all have 4 electron pairs. Why do they look different?</div>
        All three central atoms have 4 pairs of electrons around them, arranged roughly like the corners of a tetrahedron.<br>
        <b>CH₄:</b> 4 bonds, 0 lone pairs &rarr; all four corners are H atoms: <b>tetrahedral</b>, 109.5&deg;.<br>
        <b>NH₃:</b> 3 bonds + 1 lone pair &rarr; the lone pair takes the top corner and pushes the three H atoms down: <b>pyramidal</b>, about 107&deg;.<br>
        <b>H₂O:</b> 2 bonds + 2 lone pairs &rarr; two lone pairs push the two H atoms even closer: <b>bent</b>, about 104.5&deg;.<br>
        More lone pairs &rarr; a smaller bond angle. And lone pairs on one side make the molecule asymmetrical, so NH₃ and H₂O are polar.</div>
      <div class="tip">Don't call H<sub>2</sub>O linear just because it has 3 atoms like CO<sub>2</sub>. Check the central atom: O has 2 lone pairs (bent); C in CO<sub>2</sub> has none (linear).</div>` }
  ],
  quiz: [
    { ctx: '<h3>Coulombic attraction</h3><b>Figure 1: Distance and force of attraction between one proton and one electron</b><table class="tbl"><tr><th>Set</th><th>Distance (nm)</th><th>Force of attraction (N)</th></tr><tr><td>A</td><td class="n">0.10</td><td class="n">2.30 &times; 10<sup>&minus;8</sup></td></tr><tr><td>B</td><td class="n">0.20</td><td class="n">0.58 &times; 10<sup>&minus;8</sup></td></tr><tr><td>C</td><td class="n">0.30</td><td class="n">0.26 &times; 10<sup>&minus;8</sup></td></tr></table>',
      q: 'Based on Figure 1, what is the best prediction for the force of attraction when the particles are 0.50 nm apart?', o: ['Greater than 2.30 &times; 10<sup>&minus;8</sup> N', 'Between 0.26 and 0.58 &times; 10<sup>&minus;8</sup> N', 'Less than 0.26 &times; 10<sup>&minus;8</sup> N', 'Exactly 0.26 &times; 10<sup>&minus;8</sup> N'], a: 2,
      x: 'In the table, as distance increases the force decreases. 0.50 nm is <b>farther</b> than 0.30 nm, so the force must be <b>less</b> than 0.26 &times; 10<sup>&minus;8</sup> N. "Farther = weaker." A value between 0.26 and 0.58 would belong to a distance between 0.20 and 0.30 nm.', tp: ['rad', 'ie'] },
    { q: 'Why is a potassium atom (K) larger than a sodium atom (Na)?', o: ['K has more electrons, and more electrons always take up more room', 'K has more energy levels (shells), so its valence electron is farther from the nucleus', 'K has more protons pulling its electrons outward', 'K has a heavier nucleus, which makes the whole atom bigger'], a: 1,
      x: 'K (2-8-8-1) has <b>4 shells</b> and Na (2-8-1) has 3. The extra shell puts the valence electron farther away, and the inner shells shield it, so the attraction is weaker and the atom is bigger. "More electrons" alone isn\'t the reason, and protons pull electrons <i>in</i>, not out.', tp: ['rad'] },
    { q: 'Which element loses an electron most easily (has the lowest ionization energy)?', o: ['F', 'Cl', 'Na', 'K'], a: 3,
      x: 'Metals have low ionization energy, and IE decreases down a group. K is a metal in Period 4, so its valence electron is the farthest and most shielded of these. F and Cl are nonmetals with high IE. Na is a good guess, but it has one fewer shell than K.', tp: ['ie'] },
    { q: 'Which element has the highest electronegativity?', o: ['Fluorine', 'Neon', 'Oxygen', 'Chlorine'], a: 0,
      x: 'Fluorine has the highest electronegativity of all elements (4.0). Neon is a noble gas: it almost never bonds, so it is not given an EN value. Oxygen and chlorine are high, but lower than fluorine.', tp: ['en'] },
    { q: 'How many electrons are shared between the two atoms in a nitrogen molecule, N≡N?', o: ['2', '3', '6', '8'], a: 2,
      x: 'N has 5 valence electrons with 3 single (unpaired) electrons, so it makes a <b>triple bond</b>: 3 pairs = <b>6 electrons</b> shared. "3" counts the bonds, not the electrons. 8 is the octet each N ends up with (6 shared + 1 lone pair).', tp: ['covl'] },
    { ctx: '<h3>Electronegativity</h3><b>Figure 2: Electronegativity values of selected elements</b><table class="tbl"><tr><th>Element</th><th>EN</th><th>Element</th><th>EN</th></tr><tr><td>H</td><td class="n">2.20</td><td>Na</td><td class="n">0.93</td></tr><tr><td>N</td><td class="n">3.04</td><td>Cl</td><td class="n">3.16</td></tr><tr><td>K</td><td class="n">0.82</td><td></td><td></td></tr></table><p>Class ranges for &Delta;EN: 0.0&ndash;0.3 nonpolar covalent, 0.4&ndash;1.7 polar covalent, greater than 1.7 ionic.</p>',
      q: 'Based on Figure 2, which bond is polar covalent?', o: ['H&ndash;H', 'Na&ndash;Cl', 'K&ndash;Cl', 'N&ndash;H'], a: 3,
      x: 'N&ndash;H: 3.04 &minus; 2.20 = <b>0.84</b>, which is in the 0.4&ndash;1.7 polar covalent range. H&ndash;H is 0.0 (nonpolar). Na&ndash;Cl (2.23) and K&ndash;Cl (2.34) are greater than 1.7, so they are ionic, which fits since each is a metal + a nonmetal.', tp: ['pol', 'en'] },
    { q: 'The electronegativity difference in H&ndash;F is 1.78. How is the H&ndash;F bond classified?', o: ['Ionic, because 1.78 is greater than 1.7', 'Very polar covalent, because H and F are both nonmetals and share electrons', 'Nonpolar covalent, because both atoms are gases', 'Metallic, because H is in Group 1'], a: 1,
      x: 'Two nonmetals always <b>share</b> electrons, so H&ndash;F is covalent. Its large &Delta;EN makes it a <b>very polar</b> covalent bond. The 1.7 cutoff is a guide; ionic bonds form between a metal and a nonmetal. H sits in Group 1, but it is a nonmetal.', tp: ['pol'] },
    { q: 'In solid sodium chloride, NaCl, what is the charge on the sodium?', o: ['A full positive charge (Na<sup>+</sup>), because an electron was transferred', 'A partial positive charge (&delta;+), because the electrons are shared unequally', 'No charge, because the compound is neutral', 'A partial negative charge (&delta;&minus;), because sodium has the lower electronegativity'], a: 0,
      x: 'NaCl is <b>ionic</b>: Na gives its electron to Cl, so it becomes Na<sup>+</sup> with a <b>full</b> +1 charge. &delta;+ and &delta;&minus; are for polar <b>covalent</b> bonds, where electrons are shared unequally. The compound is neutral overall because +1 and &minus;1 add to zero, but each ion is charged.', tp: ['pol', 'ionic'] },
    { q: 'Carbon dioxide (O=C=O) has polar C=O bonds. Which statement best describes the CO<sub>2</sub> molecule?', o: ['It is polar, because its bonds are polar', 'It is polar, because oxygen is more electronegative than carbon', 'It is ionic, because the &Delta;EN is large', 'It is nonpolar, because it is symmetrical and the bond polarities cancel'], a: 3,
      x: '<b>Polar bonds don\'t automatically make a polar molecule.</b> CO<sub>2</sub> is linear and symmetrical: the two O atoms pull equally in opposite directions, so the pulls cancel. SNAP: symmetrical = nonpolar. (C and O are both nonmetals, so it isn\'t ionic.)', tp: ['snap'] },
    { q: 'Which molecule is polar?', o: ['CH<sub>4</sub>', 'CO<sub>2</sub>', 'NH<sub>3</sub>', 'CF<sub>4</sub>'], a: 2,
      x: 'NH<sub>3</sub> is pyramidal: N has a lone pair on one side and three H atoms on the other, so it is <b>asymmetrical</b> with an uneven charge distribution, and therefore polar. CH<sub>4</sub>, CO<sub>2</sub> and CF<sub>4</sub> are symmetrical, so any bond polarities cancel.', tp: ['snap', 'vsepr'] },
    { ctx: '<h3>Boiling points</h3><b>Figure 3: Boiling points of four molecular substances</b><table class="tbl"><tr><th>Substance</th><th>Formula</th><th>Boiling point (&deg;C)</th></tr><tr><td>Water</td><td>H<sub>2</sub>O</td><td class="n">100</td></tr><tr><td>Ammonia</td><td>NH<sub>3</sub></td><td class="n">&minus;33</td></tr><tr><td>Hydrogen sulfide</td><td>H<sub>2</sub>S</td><td class="n">&minus;60</td></tr><tr><td>Methane</td><td>CH<sub>4</sub></td><td class="n">&minus;162</td></tr></table>',
      q: 'Which statement best explains why water has a much higher boiling point than hydrogen sulfide?', o: ['The O&ndash;H covalent bonds inside water molecules are stronger and must break when water boils', 'Water molecules form hydrogen bonds with each other because H is bonded to O', 'H<sub>2</sub>S molecules are nonpolar, so they have no attractions', 'Water molecules are heavier than H<sub>2</sub>S molecules'], a: 1,
      x: 'Boiling separates molecules from each other; it overcomes <b>IMFs</b>, not the bonds inside molecules. In water, H is bonded to <b>O</b>, so water forms <b>hydrogen bonds</b>, the strongest IMF. H<sub>2</sub>S is bent and polar, but S is not F, O or N, so it has no hydrogen bonding. H<sub>2</sub>S (34) is actually heavier than H<sub>2</sub>O (18).', tp: ['imf', 'hb'] },
    { q: 'When NaCl dissolves in water, how are the water molecules arranged around a chloride ion, Cl<sup>&minus;</sup>?', o: ['The partially positive hydrogen ends point toward the Cl<sup>&minus;</sup>', 'The partially negative oxygen ends point toward the Cl<sup>&minus;</sup>', 'The water molecules give electrons to Cl<sup>&minus;</sup>', 'The water molecules are not attracted to Cl<sup>&minus;</sup>, only to Na<sup>+</sup>'], a: 0,
      x: 'Opposites attract. Cl<sup>&minus;</sup> is negative, so water turns its <b>&delta;+ hydrogen ends</b> toward it. Around Na<sup>+</sup>, water turns its <b>&delta;&minus; oxygen end</b> toward the ion. This molecule&ndash;ion attraction pulls the ions out of the lattice and makes them mobile ions.', tp: ['mia'] },
    { q: 'Which statement best explains why a copper wire conducts electricity as a solid?', o: ['Copper atoms share electrons in fixed pairs between neighbors', 'Copper forms mobile Cu<sup>2+</sup> and Cl<sup>&minus;</sup> ions in the wire', 'Copper has a high electronegativity, so it pulls electrons through the wire', 'Copper has positive ions in a sea of mobile electrons that can flow'], a: 3,
      x: '<b>Metallic bonding</b>: positive metal ions sit in a sea of mobile (delocalized) electrons, and those electrons can flow. Fixed shared pairs describe covalent bonds. Mobile ions carry current in salt solutions, not in a solid metal. Metals have low electronegativity.', tp: ['metb'] },
    { q: 'A water molecule has 2 bonds and 2 lone pairs on the oxygen atom. What is its shape?', o: ['Bent, because the lone pairs push the bonding pairs closer together', 'Linear, because there are only two hydrogen atoms', 'Tetrahedral, because there are four pairs of electrons and four atoms', 'Trigonal planar, because there are three atoms'], a: 0,
      x: 'VSEPR: the 2 lone pairs on O push the two O&ndash;H bonds together, giving a <b>bent</b> shape (about 104.5&deg;). It is not linear like CO<sub>2</sub>, because C in CO<sub>2</sub> has no lone pairs. Tetrahedral needs 4 bonds and 0 lone pairs (CH<sub>4</sub>).', tp: ['vsepr'] }
  ]
};
