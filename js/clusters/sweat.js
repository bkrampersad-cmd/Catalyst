/* Catalyst - Regents-style cluster: "Sports Drinks & Electrolytes" (Catalyst original).
   Figure 1 values are illustrative classroom-style data based on typical conductivities (5% NaCl about 70 mS/cm,
   household vinegar about 1.6 mS/cm). Surface tensions at 20 °C are standard values (water 72.8, acetone 23.7,
   light mineral oil about 30 mN/m). */
'use strict';
const FIGCS = {
  fig(svg, cap) {
    return '<figure style="margin:12px 0 6px;text-align:center">' + svg.replace('style="max-width', 'style="width:100%;height:auto;max-width') +
      '<figcaption style="font-size:13px;margin-top:4px">' + cap + '</figcaption></figure>';
  },
  /* one water molecule: O at (x,y); the H atoms point in direction dir (degrees), 52° either side */
  water(x, y, dir, labels, ion) {
    const F = 'font-family="Segoe UI,Arial,sans-serif"', r = 24, out = [];
    let s = '';
    [-52, 52].forEach(k => {
      const a = (dir + k) * Math.PI / 180, hx = x + r * Math.cos(a), hy = y + r * Math.sin(a);
      out.push([hx, hy, a]);
      s += '<line x1="' + x + '" y1="' + y + '" x2="' + hx.toFixed(1) + '" y2="' + hy.toFixed(1) + '" stroke="#22145A" stroke-width="2"/>';
    });
    out.forEach(h => { s += '<circle cx="' + h[0].toFixed(1) + '" cy="' + h[1].toFixed(1) + '" r="8" fill="#fff" stroke="#22145A" stroke-width="1.5"/><text x="' + h[0].toFixed(1) + '" y="' + (h[1] + 4).toFixed(1) + '" text-anchor="middle" font-size="10" font-weight="700" ' + F + ' fill="#22145A">H</text>'; });
    s += '<circle cx="' + x + '" cy="' + y + '" r="12" fill="#E53935" stroke="#8E1B18" stroke-width="1.5"/><text x="' + x + '" y="' + (y + 4) + '" text-anchor="middle" font-size="11" font-weight="700" ' + F + ' fill="#fff">O</text>';
    if (labels) {
      const back = (dir + 180) * Math.PI / 180;
      s += '<text x="' + (x + 24 * Math.cos(back)).toFixed(1) + '" y="' + (y + 24 * Math.sin(back) + 4).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" ' + F + ' fill="#B42318">δ−</text>';
      /* δ+ goes just past each H along its bond; if that would land on the ion, put it beside the H instead */
      out.forEach(h => {
        let lx = h[0] + 18 * Math.cos(h[2]), ly = h[1] + 18 * Math.sin(h[2]);
        if (ion && Math.hypot(lx - ion[0], ly - ion[1]) < 34) { lx = h[0] + 18 * Math.cos(h[2] + Math.PI / 2); ly = h[1] + 18 * Math.sin(h[2] + Math.PI / 2); }
        s += '<text x="' + lx.toFixed(1) + '" y="' + (ly + 4).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" ' + F + ' fill="#1F5FAD">δ+</text>';
      });
    }
    return s;
  },
  ion(x, y, lab, color) {
    return '<circle cx="' + x + '" cy="' + y + '" r="20" fill="' + color + '" stroke="#22145A" stroke-width="1.5"/><text x="' + x + '" y="' + (y + 5) + '" text-anchor="middle" font-size="15" font-weight="700" font-family="Segoe UI,Arial,sans-serif" fill="#fff">' + lab + '</text>';
  }
};
/* Figure 2: water molecules around Na+ (the O end faces the cation) */
FIGCS.na = (function () {
  const cx = 160, cy = 125, R = 58;
  let s = '';
  [-90, -18, 54, 126, 198].forEach((deg, i) => {
    const a = deg * Math.PI / 180;
    s += FIGCS.water(cx + R * Math.cos(a), cy + R * Math.sin(a), deg, i === 0, [cx, cy]);
  });
  s += FIGCS.ion(cx, cy, 'Na⁺', '#5B3FD0');
  s += '<text x="300" y="70" font-size="12" font-family="Segoe UI,Arial,sans-serif" fill="#22145A"><tspan x="300">Key:</tspan><tspan x="300" dy="18">red = oxygen atom</tspan><tspan x="300" dy="16">white = hydrogen atom</tspan><tspan x="300" dy="16">δ− / δ+ = partial charges</tspan></text>';
  return SV.wrap(440, 250, 'A sodium ion surrounded by five water molecules. Each water molecule points its oxygen end, which is partially negative, toward the positive sodium ion, with its hydrogen ends facing away.', s);
})();
/* model answer: water molecules around Cl- (one H end faces the anion) */
FIGCS.cl = (function () {
  const cx = 160, cy = 140, R = 76;
  let s = '';
  [-90, 0, 90, 180].forEach((deg, i) => {
    const a = deg * Math.PI / 180;
    /* one H points straight at the ion: H direction = deg+180, so the H-pair bisector is deg+180-52 */
    s += FIGCS.water(cx + R * Math.cos(a), cy + R * Math.sin(a), deg + 180 - 52, i === 0, [cx, cy]);
  });
  s += FIGCS.ion(cx, cy, 'Cl⁻', '#0FA89B');
  return SV.wrap(320, 280, 'A chloride ion surrounded by four water molecules, each with one hydrogen end, which is partially positive, pointing toward the negative chloride ion.', s);
})();

CLUSTERS.push({
  id: 'sweat', t: 'Sports Drinks & Electrolytes', sub: 'How water dissolves salts, and why ions matter', src: 'Catalyst original',
  pe: ['HS-PS1-3', 'HS-PS1-10'],
  intro: '<h3>Sports Drinks &amp; Electrolytes</h3><p>When you exercise hard, your body sweats to cool down. Sweat is mostly water, but it also carries away <b>electrolytes</b>, mainly sodium ions (Na⁺) and chloride ions (Cl⁻), plus some potassium ions (K⁺). Your nerves and muscles need these ions to send signals, so athletes often drink sports drinks that contain water, sugar, and salts such as sodium chloride and potassium chloride.</p>' +
    '<p>Living things on Earth depend on dissolved ions, which is one reason scientists search for <b>liquid water</b> on other worlds. A class tested how well different solutions conduct electricity. Each solution was made with 5 grams of the substance in 100 mL of distilled water. The results are in Figure 1.</p>' +
    '<div style="text-align:center;margin-top:8px"><b>Figure 1: Conductivity of Solutions</b></div><table class="tbl" style="background:#fff"><tr><th>Sample</th><th>Substance Dissolved</th><th>Conductivity (µS/cm)</th><th>Light Bulb</th></tr>' +
    '<tr><td>A</td><td>none (distilled water)</td><td class="n">2</td><td>no glow</td></tr><tr><td>B</td><td>sugar (sucrose, C₁₂H₂₂O₁₁)</td><td class="n">5</td><td>no glow</td></tr>' +
    '<tr><td>C</td><td>vinegar (acetic acid, HC₂H₃O₂)</td><td class="n">1 600</td><td>dim</td></tr><tr><td>D</td><td>table salt (sodium chloride, NaCl)</td><td class="n">70 000</td><td>bright</td></tr></table>' +
    '<p class="hint">Data are illustrative, rounded from typical values.</p>',
  items: [
    {
      type: 'mc', pe: 'HS-PS1-10', tp: ['ion', 'water'],
      q: 'Using Figure 1, which sample contains a <b>weak electrolyte</b>?',
      o: ['Sample B, sugar', 'Sample C, vinegar', 'Sample D, table salt', 'Sample A, distilled water'],
      a: 1,
      x: 'A <b>weak electrolyte</b> makes only a <b>low concentration of ions</b>, so the bulb glows <b>dim</b>. Vinegar (1 600 µS/cm) fits: only a small fraction of acetic acid molecules break into ions. Table salt is a <b>strong electrolyte</b>: it fully separates into Na⁺ and Cl⁻, so the bulb is bright (70 000 µS/cm). Sugar dissolves, but its conductivity (5) is about the same as distilled water (2), so it is a <b>non-electrolyte</b>. An electrolyte conducts electric <b>current</b> when dissolved.'
    },
    {
      type: 'cer', pe: 'HS-PS1-10', tp: ['ion', 'water', 'mia'],
      q: 'Both sugar and table salt dissolve completely in water. Make a claim that explains why the salt solution lights the bulb brightly but the sugar solution does not. Cite evidence from Figure 1, and explain your claim using what happens to each substance when it dissolves.',
      model: '<p><b>Claim:</b> Salt solution conducts because dissolved salt produces mobile ions; sugar solution does not conduct because dissolved sugar stays as whole, neutral molecules.</p>' +
        '<p><b>Evidence:</b> The salt solution (D) has a conductivity of 70 000 µS/cm and a bright bulb. The sugar solution (B) has 5 µS/cm, almost the same as distilled water (2 µS/cm), and no glow.</p>' +
        '<p><b>Explanation:</b> NaCl is an ionic compound. When it dissolves, water molecules pull the <b>Na⁺ and Cl⁻ ions</b> apart, and these <b>mobile ions</b> carry the electric current. Sugar (C₁₂H₂₂O₁₁) is a covalent compound made of nonmetal atoms. It dissolves because its polar molecules are attracted to water, but each molecule stays whole and has <b>no charge</b>, so there are no ions to carry current.</p>',
      rubric: ['Claim: salt forms ions in water; sugar stays as neutral molecules', 'Evidence: compares the conductivities in Figure 1 (D 70 000 µS/cm vs. B 5 µS/cm, near distilled water at 2)', 'Explanation: mobile ions (Na⁺, Cl⁻) carry the current, not electrons', 'Explanation: sugar is covalent (molecular), so dissolving it makes no ions']
    },
    {
      type: 'row', pe: 'HS-PS1-3', tp: ['mia', 'aem', 'imf'],
      q: 'Which row correctly describes what happens to the particles when table salt and sugar each dissolve in water?',
      cols: ['Row', 'Table Salt (NaCl)', 'Sugar (C₁₂H₂₂O₁₁)'],
      rows: [
        ['(1)', 'Na and Cl atoms separate and become neutral atoms', 'C, H and O atoms separate from each other'],
        ['(2)', 'Na⁺ and Cl⁻ ions separate and are surrounded by water molecules', 'sugar molecules break apart into positive and negative ions'],
        ['(3)', 'whole NaCl molecules separate and are surrounded by water molecules', 'whole sugar molecules separate and are surrounded by water molecules'],
        ['(4)', 'Na⁺ and Cl⁻ ions separate and are surrounded by water molecules', 'whole sugar molecules separate and are surrounded by water molecules']
      ],
      a: 3,
      x: 'Salt is an ionic compound: a lattice of Na⁺ and Cl⁻ ions, not molecules (so row 3 is wrong). Water\'s partial charges attract the ions (<b>molecule–ion attraction</b>) and pull them out of the crystal, and the ions keep their full charges (row 1 is wrong). Sugar is made of covalently bonded molecules. Water surrounds and separates whole sugar molecules through intermolecular attractions, but the covalent bonds inside each molecule do not break, so no ions form (rows 1 and 2 are wrong). Dissolving is a physical change: the atoms in a sugar molecule stay together.'
    },
    {
      type: 'mc', pe: 'HS-PS1-3', tp: ['aem', 'snap'],
      ctx: '<p>Figure 2 models how water molecules surround a sodium ion after salt dissolves.</p>' + FIGCS.fig(FIGCS.na, '<b>Figure 2: Water Molecules Around a Sodium Ion</b><br>(Not drawn to scale)'),
      q: 'Which statement correctly describes one water molecule in Figure 2?',
      o: ['It is made of two hydrogen atoms and one oxygen atom; it is bent, so it is polar, with a partially negative oxygen end.',
        'It is made of two hydrogen molecules and one oxygen molecule; it is bent, so it is polar.',
        'It is made of two hydrogen atoms and one oxygen atom; it is linear and symmetrical, so it is nonpolar.',
        'It is made of two hydrogen atoms and one oxygen atom; it has full charges, O²⁻ and H⁺, like an ionic compound.'],
      a: 0,
      x: 'One H₂O <b>molecule</b> contains 3 <b>atoms</b>: 2 hydrogen atoms and 1 oxygen atom. H and O are atoms, not molecules (choice 2). The two lone pairs on oxygen give water a <b>bent</b> shape, which is asymmetrical, so by SNAP it is <b>polar</b> (choice 3 describes CO₂, not water). Oxygen is more electronegative, so it pulls the shared electrons closer and becomes <b>partially</b> negative (δ−), while the H atoms are δ+. These are partial charges from unequal sharing, not the full charges of ions (choice 4).'
    },
    {
      type: 'draw', pe: 'HS-PS1-3', tp: ['mia', 'snap'],
      q: 'Figure 2 shows water molecules around a sodium ion. Draw a model of a <b>chloride ion</b> (Cl⁻) dissolved in water, surrounded by at least three water molecules that are oriented correctly. Label the partial charges (δ+ and δ−) on one water molecule.',
      model: '<div style="max-width:340px;margin:0 auto">' + FIGCS.cl + '</div>' +
        '<p>Opposite charges attract. The chloride ion is <b>negative</b>, so each water molecule turns its <b>partially positive hydrogen (δ+)</b> end toward the Cl⁻. The partially negative oxygen (δ−) points away. This is the reverse of Figure 2, where the δ− oxygen ends face the positive Na⁺. This <b>molecule–ion attraction</b> pulls ions out of the crystal and keeps them dissolved.</p>',
      rubric: ['Cl⁻ drawn in the center with a negative charge', 'At least three water molecules, each with an H end (δ+) pointing toward the Cl⁻', 'One water molecule labeled δ− on O and δ+ on the H atoms', 'Water molecules drawn bent (two H atoms on one O), not as separate atoms']
    },
    {
      type: 'sr', pe: 'HS-PS1-3', tp: ['water', 'imf', 'hb'], a: 'refute',
      ctx: '<p>Sweat forms rounded beads on skin because water has a high surface tension. In Lesson 3, the class compared water with two other liquids. Figure 3 gives their surface tensions.</p>' +
        '<div style="text-align:center;margin-top:8px"><b>Figure 3: Surface Tension at 20°C</b></div><table class="tbl" style="background:#fff"><tr><th>Liquid</th><th>Polar or Nonpolar</th><th>Surface Tension (mN/m)</th></tr>' +
        '<tr><td>Water</td><td>polar</td><td class="n">73</td></tr><tr><td>Mineral oil</td><td>nonpolar</td><td class="n">30</td></tr><tr><td>Acetone</td><td>polar</td><td class="n">24</td></tr></table>',
      q: 'A student claims that water has a high surface tension because of the strong covalent bonds <b>between the hydrogen atoms and the oxygen atom inside</b> each water molecule. Decide whether you <b>support</b> or <b>refute</b> the claim. Use Figure 3 and your knowledge of intermolecular forces.',
      model: '<p><b>Refute.</b></p><p><b>Evidence:</b> Water\'s surface tension is 73 mN/m, much higher than mineral oil (30 mN/m) and acetone (24 mN/m). Acetone and mineral oil molecules also have strong covalent bonds inside them, yet their surface tensions are low.</p>' +
        '<p><b>Reasoning:</b> Surface tension depends on the attractions <b>between</b> molecules (intermolecular forces), not the covalent bonds <b>inside</b> a molecule. Water molecules are polar, and H is bonded to O, so water forms <b>hydrogen bonds</b>, the strongest IMF, with neighboring molecules. These strong attractions pull the surface molecules inward, giving water its high surface tension. Acetone is polar but has no H bonded to O, so it cannot hydrogen bond with itself.</p>',
      rubric: ['Checks "Refute"', 'Cites Figure 3: water 73 mN/m is much higher than acetone (24) and mineral oil (30)', 'Says surface tension comes from attractions between molecules (IMFs), not bonds inside a molecule', 'Names hydrogen bonding (H bonded to O) as the strong IMF in water']
    }
  ]
});
