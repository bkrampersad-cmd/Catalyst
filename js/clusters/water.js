/* Catalyst - Regents-style cluster: "Recycling Every Drop" (the class's sample cluster, converted faithfully).
   Passages, figures and questions follow the handout; answer keys, explanations and model answers are Catalyst's. */
'use strict';
const FIGCW = {
  /* full-width figure with a bold caption */
  fig(svg, cap) {
    return '<figure style="margin:12px 0 6px;text-align:center">' + svg.replace('style="max-width', 'style="width:100%;height:auto;max-width') +
      '<figcaption style="font-size:13px;margin-top:4px">' + cap + '</figcaption></figure>';
  },
  flow: (function () {
    const F = 'font-family="Segoe UI,Arial,sans-serif"';
    const box = (x, y, w, h, fill, lines, tc, bold) => {
      let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="4" fill="' + fill + '" stroke="#22145A" stroke-width="1.5"/>';
      const y0 = y + h / 2 - (lines.length - 1) * 8 + 5;
      lines.forEach((l, i) => { s += '<text x="' + (x + w / 2) + '" y="' + (y0 + i * 16) + '" text-anchor="middle" font-size="13" ' + F + (bold ? ' font-weight="700"' : '') + ' fill="' + (tc || '#22145A') + '">' + l + '</text>'; });
      return s;
    };
    const O = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="12" fill="#4A4458" stroke="#22145A" stroke-width="1.5"/>';
    const H = (x, y) => '<circle cx="' + x + '" cy="' + y + '" r="7.5" fill="#fff" stroke="#22145A" stroke-width="1.5"/>';
    const water = (x, y) => H(x - 14, y - 11) + H(x + 14, y - 11) + O(x, y);
    const curve = (x1, y1, cx, cy, x2, y2) => {
      const a = Math.atan2(y2 - cy, x2 - cx), h = 10;
      return '<path d="M' + x1 + ' ' + y1 + ' Q' + cx + ' ' + cy + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="#22145A" stroke-width="2.5"/>' +
        '<polygon fill="#22145A" points="' + x2 + ',' + y2 + ' ' + (x2 - h * Math.cos(a - .45)).toFixed(1) + ',' + (y2 - h * Math.sin(a - .45)).toFixed(1) + ' ' + (x2 - h * Math.cos(a + .45)).toFixed(1) + ',' + (y2 - h * Math.sin(a + .45)).toFixed(1) + '"/>';
    };
    let s = '<rect x="0" y="0" width="640" height="412" fill="#F7F6FB"/>';
    const xs = [8, 138, 268, 398, 528], labels = [['Urine, sweat,', 'and humidity'], ['Distillation'], ['Filters and', 'reactor'], ['Purity', 'sensor'], ['Drinking', 'water']];
    xs.forEach((x, i) => {
      s += box(x, 20, 104, 64, i === 4 ? '#C9C4D6' : '#ECEAF2', labels[i]);
      if (i < 4) s += SV.arrow(x + 105, 52, x + 129, 52, '#22145A');
    });
    s += SV.arrow(190, 85, 190, 114, '#22145A') + box(130, 118, 120, 52, '#7A748A', ['Brine', '(dissolved salts)'], '#fff');
    s += SV.arrow(580, 85, 580, 111, '#22145A') + box(514, 114, 122, 56, '#fff', ['Electrolysis', ''], '#22145A', true);
    /* small battery symbol: electricity splits the water */
    s += '<rect x="566" y="155" width="16" height="9" fill="none" stroke="#22145A" stroke-width="1.5"/><rect x="582" y="157.5" width="3" height="4" fill="#22145A"/>';
    s += curve(548, 172, 530, 200, 506, 214);
    /* key */
    s += '<rect x="8" y="200" width="114" height="200" fill="#fff" stroke="#22145A" stroke-width="1.5"/>';
    s += '<text x="65" y="224" text-anchor="middle" font-size="13" font-weight="700" ' + F + ' fill="#22145A">Key</text>';
    s += O(30, 262) + '<text x="48" y="259" font-size="12" ' + F + ' fill="#22145A">= oxygen</text><text x="58" y="274" font-size="12" ' + F + ' fill="#22145A">atom</text>';
    s += H(30, 330) + '<text x="48" y="327" font-size="12" ' + F + ' fill="#22145A">= hydrogen</text><text x="58" y="342" font-size="12" ' + F + ' fill="#22145A">atom</text>';
    /* electrolysis panel */
    s += '<rect x="134" y="200" width="372" height="200" fill="#fff" stroke="#22145A" stroke-width="1.5"/>';
    s += '<text x="320" y="224" text-anchor="middle" font-size="13" font-weight="700" ' + F + ' fill="#22145A">Electrolysis of water</text>';
    s += water(200, 285) + water(248, 340);
    s += SV.arrow(292, 310, 334, 310, '#22145A');
    s += H(372, 270) + H(387, 270) + H(380, 345) + H(395, 345);
    s += O(445, 305) + O(468, 305);
    s += '<text x="224" y="386" text-anchor="middle" font-size="13" ' + F + ' fill="#22145A">Before</text>';
    s += '<text x="420" y="386" text-anchor="middle" font-size="13" ' + F + ' fill="#22145A">After</text>';
    return SV.wrap(640, 412, 'Flow diagram: urine, sweat and humidity go to distillation (which leaves brine), then filters and reactor, then a purity sensor, then drinking water. Some drinking water goes to electrolysis, where two water molecules become two hydrogen molecules and one oxygen molecule.', s);
  })()
};

CLUSTERS.push({
  id: 'water', t: 'Recycling Every Drop', sub: 'Space station water recovery', src: 'Class sample cluster',
  pe: ['HS-PS1-1', 'HS-PS1-2', 'HS-PS1-3', 'HS-PS1-10'],
  intro: '<h3>Recycling Every Drop</h3><p>On the International Space Station, nearly all of the water that crew members use is recycled. Urine, sweat, and moisture from the air are collected and treated. Distillation separates water from a leftover brine that contains dissolved salts. Filters and a catalytic reactor then clean the water, and sensors check its purity before the crew can drink it. Some of the clean water is split by electricity to make oxygen for the crew to breathe. Figure 1 models the water recovery process and the electrolysis of water.</p>' +
    FIGCW.fig(FIGCW.flow, '<b>Figure 1: Water Recovery and Electrolysis on the Space Station</b><br>(Not drawn to scale)'),
  items: [
    {
      type: 'row', pe: 'HS-PS1-1', tp: ['aem', 'metal', 'pg'],
      q: 'Using Figure 1 and the Periodic Table, which row correctly classifies the reactant and the products in the electrolysis of water and identifies the type of atoms in them?',
      cols: ['Row', 'Reactant (Water)', 'Products (Hydrogen, Oxygen)'],
      rows: [
        ['(1)', 'compound of metal and nonmetal atoms', 'elements made of nonmetal atoms'],
        ['(2)', 'compound of nonmetal atoms', 'compounds of nonmetal atoms'],
        ['(3)', 'compound of nonmetal atoms', 'elements made of nonmetal atoms'],
        ['(4)', 'element made of nonmetal atoms', 'compounds of nonmetal atoms']
      ],
      a: 2,
      x: '<b>Water (H₂O)</b> is a <b>compound</b>: each molecule has two kinds of atoms, 2 hydrogen <b>atoms</b> and 1 oxygen <b>atom</b>, chemically bonded. Both hydrogen and oxygen are <b>nonmetals</b>. Hydrogen sits above Group 1 on the Periodic Table, but it is a nonmetal, so row (1) is wrong. In the "After" picture, each product molecule is made of only <b>one kind of atom</b> (H₂ and O₂), so the products are <b>elements</b>, not compounds. That rules out rows (2) and (4). Row (4) also calls water an element, but an element has only one kind of atom.'
    },
    {
      type: 'mc', pe: 'HS-PS1-1', tp: ['iso', 'sub'],
      ctx: '<p>To measure how much energy astronauts use, researchers have them drink doubly labeled water. In this water, some hydrogen atoms are hydrogen-2 atoms and some oxygen atoms are oxygen-18 atoms. Ordinary water contains mostly hydrogen-1 and oxygen-16 atoms. Figure 2 lists the atoms involved. One doubly labeled water molecule contains two hydrogen-2 atoms and one oxygen-18 atom.</p>' +
        '<div style="text-align:center;margin-top:8px"><b>Figure 2: Atoms in Water</b></div><table class="tbl" style="background:#fff"><tr><th>Atom</th><th>Atomic Number</th><th>Mass Number</th></tr>' +
        '<tr><td>Hydrogen-1</td><td class="n">1</td><td class="n">1</td></tr><tr><td>Hydrogen-2</td><td class="n">1</td><td class="n">2</td></tr><tr><td>Oxygen-16</td><td class="n">8</td><td class="n">16</td></tr><tr><td>Oxygen-18</td><td class="n">8</td><td class="n">18</td></tr></table>',
      q: 'Using Figure 2, how many neutrons are in one doubly labeled water molecule?',
      o: ['10', '12', '20', '22'], a: 1,
      x: 'Neutrons = <b>mass number − atomic number</b>. Each hydrogen-2 atom has 2 − 1 = <b>1 neutron</b>, and there are two of them, so 2 neutrons. The oxygen-18 atom has 18 − 8 = <b>10 neutrons</b>. Total: 2 + 10 = <b>12</b>. Choice 10 counts only the oxygen (it is also the number of protons in any water molecule). Choice 20 uses oxygen\'s mass number (18) instead of its neutrons. Choice 22 adds up the mass numbers (2 + 2 + 18), which counts protons <i>and</i> neutrons.'
    },
    {
      type: 'cer', pe: 'HS-PS1-10', tp: ['water', 'ion'],
      ctx: '<p>The purity of the recycled water is checked with conductivity sensors. Conductivity measures how well a liquid carries an electric current. Figure 3 gives data for four samples.</p>' +
        '<div style="text-align:center;margin-top:8px"><b>Figure 3: Water Samples</b></div><table class="tbl" style="background:#fff"><tr><th>Sample</th><th>Dissolved Ionic Compounds (mg/L)</th><th>Conductivity (µS/cm)</th></tr>' +
        '<tr><td>Brine</td><td class="n">30 000</td><td class="n">45 000</td></tr><tr><td>Distilled water</td><td class="n">0</td><td class="n">1</td></tr><tr><td>Treated water</td><td class="n">20</td><td class="n">40</td></tr><tr><td>Untreated water</td><td class="n">400</td><td class="n">700</td></tr></table>',
      q: 'Make a claim that describes the relationship between the conductivity of a water sample and the amount of dissolved ionic compounds in it. Cite evidence from Figure 3, and explain why dissolved ionic compounds cause this relationship.',
      model: '<p><b>Claim:</b> The more dissolved ionic compounds a water sample has, the higher its conductivity.</p>' +
        '<p><b>Evidence:</b> Distilled water has 0 mg/L of dissolved ionic compounds and a conductivity of only 1 µS/cm. Treated water (20 mg/L) has 40 µS/cm, untreated water (400 mg/L) has 700 µS/cm, and brine (30 000 mg/L) has the highest conductivity, 45 000 µS/cm.</p>' +
        '<p><b>Explanation:</b> When an ionic compound dissolves, it separates into positive ions (cations) and negative ions (anions). These <b>mobile ions</b> move through the water and carry the electric current. More dissolved ionic compounds means more mobile ions, so more current can flow. Electrons do not travel through the water; the ions carry the charge.</p>',
      rubric: ['Claim: more dissolved ionic compounds → higher conductivity (a direct relationship)', 'Evidence: quotes at least two samples with both numbers from Figure 3 (for example, distilled 0 mg/L → 1 µS/cm and brine 30 000 mg/L → 45 000 µS/cm)', 'Explanation: dissolved ionic compounds break into mobile ions (cations and anions) that carry the current', 'Says ions, not electrons, carry the current in the water']
    },
    {
      type: 'mc', pe: 'HS-PS1-3', tp: ['water', 'imf'],
      ctx: '<p>On Earth, gravity flattens a liquid into a puddle. On the space station, almost no gravity acts on a drop of liquid, so its shape depends mostly on the pull of its molecules on one another. A crew member releases a drop of water and a drop of ethanol, each floating in the cabin. Figure 4 gives the surface tension of each liquid at 20°C.</p>' +
        '<div style="text-align:center;margin-top:8px"><b>Figure 4: Surface Tension at 20°C</b></div><table class="tbl" style="background:#fff"><tr><th>Liquid</th><th>Surface Tension (mN/m)</th></tr><tr><td>Ethanol</td><td class="n">22</td></tr><tr><td>Water</td><td class="n">73</td></tr></table>',
      q: 'Using Figure 4, which statement correctly compares the attractions between water molecules and between ethanol molecules?',
      o: ['Water has the higher surface tension, so attractions between water molecules are stronger than those between ethanol molecules.',
        'Water has the higher surface tension, so attractions between water molecules are weaker than those between ethanol molecules.',
        'Ethanol has the higher surface tension, so attractions between ethanol molecules are stronger than those between water molecules.',
        'Ethanol has the lower surface tension, so attractions between ethanol molecules are stronger than those between water molecules.'],
      a: 0,
      x: 'Water\'s surface tension (73 mN/m) is more than three times ethanol\'s (22 mN/m). <b>Stronger intermolecular forces (IMFs) → higher surface tension</b>, because the molecules at the surface are pulled in more tightly. Water molecules are polar and form many <b>hydrogen bonds</b> (H bonded to O) with each other. Ethanol can hydrogen bond too, but each molecule has only one O–H and a nonpolar part, so its attractions are weaker. Choice 3 misreads the table, and choices 2 and 4 get the relationship backward (lower surface tension means weaker attractions, not stronger).'
    },
    {
      type: 'draw', pe: 'HS-PS1-2', tp: ['bohr', 'lewis', 'ionic', 'ion', 'sub'],
      ctx: '<p>When water is distilled, the dissolved ions stay behind in the brine. As the brine dries, the ions form solid ionic compounds, including sodium chloride and calcium chloride.</p>',
      q: 'Using the Periodic Table, draw a Bohr diagram of the sodium ion and a Lewis electron-dot diagram of the chloride ion in sodium chloride. Include the charge of each ion.',
      model: '<div style="display:flex;flex-wrap:wrap;gap:18px;justify-content:center;align-items:center"><div style="width:190px">' + SV.bohrIon('Na', 11, 12, [2, 8], 1).replace('style="', 'style="overflow:visible;') + '</div><div style="width:150px">' + SV.lewisDot('Cl', 8, -1) + '</div></div>' +
        '<p>A sodium atom (2-8-1) <b>loses</b> its one valence electron to chlorine. The Na⁺ ion has 11 protons and only 10 electrons (2-8), so its charge is 1+. Use the rounded mass: 23 − 11 = 12 neutrons. The chlorine atom (7 valence electrons) <b>gains</b> that electron, so the chloride ion has 8 dots, a full valence shell. Ions go in brackets with the charge outside: [Na]⁺ and [:Cl:]⁻.</p>',
      rubric: ['Na⁺ Bohr: nucleus shows 11 protons (and 12 neutrons); shells hold 2 and 8 electrons, with no electron in a third shell', 'Na⁺ shows a 1+ charge (in brackets or as Na⁺)', 'Cl⁻ Lewis dot: Cl symbol with 8 dots (4 pairs), inside brackets', 'Cl⁻ shows a 1− charge outside the brackets']
    },
    {
      type: 'sr', pe: 'HS-PS1-2', tp: ['name', 'ionic', 'pg'], a: 'refute',
      q: 'A student claims that the compound formed from calcium and chlorine is named calcium chloride and has the formula CaCl. Decide whether you <b>support</b> or <b>refute</b> the student\'s claim. Use the Periodic Table to support your reasoning.',
      model: '<p><b>Refute.</b> The name "calcium chloride" is correct, but the formula is wrong.</p>' +
        '<p><b>Evidence:</b> Calcium is in <b>Group 2</b>, so it has 2 valence electrons and loses both to form <b>Ca²⁺</b>. Chlorine is in <b>Group 17</b>, so it has 7 valence electrons and gains 1 to form <b>Cl⁻</b>. The charges must add to zero: (+2) + 2(−1) = 0, so it takes <b>two</b> chloride ions for every calcium ion. Criss-crossing the charges gives the same answer. The formula is <b>CaCl₂</b>. In CaCl the charges would add to +1, so the compound would not be neutral.</p>',
      rubric: ['Checks "Refute" (the name is right, but the formula is wrong)', 'Uses the Periodic Table: Ca is in Group 2 → Ca²⁺; Cl is in Group 17 → Cl⁻', 'Shows the charges must add to zero, so two Cl⁻ are needed for one Ca²⁺', 'Writes the correct formula, CaCl₂']
    }
  ]
});
