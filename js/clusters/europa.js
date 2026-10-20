/* Catalyst - Regents-style cluster: "A Salty Ocean on Europa" (Catalyst original).
   Facts: Hubble found sodium chloride in Tara Regio (Trumbo, Brown & Hand, 2019); Galileo's magnetometer found an induced
   magnetic field that points to a salty, conducting ocean (Kivelson et al., 2000); Europa Clipper launched Oct 14, 2024
   and arrives at Jupiter in 2030. Layer thicknesses are NASA's estimates. Radius and IE values are standard data. */
'use strict';
const FIGCE = {
  fig(svg, cap) {
    return '<figure style="margin:12px 0 6px;text-align:center">' + svg.replace('style="max-width', 'style="width:100%;height:auto;max-width') +
      '<figcaption style="font-size:13px;margin-top:4px">' + cap + '</figcaption></figure>';
  },
  layers: (function () {
    const F = 'font-family="Segoe UI,Arial,sans-serif"';
    const lab = (x, y, s, w, c) => '<text x="' + x + '" y="' + y + '" font-size="13" ' + F + (w ? ' font-weight="700"' : '') + ' fill="' + (c || '#22145A') + '">' + s + '</text>';
    let s = '';
    /* space and surface */
    s += '<rect x="0" y="0" width="620" height="44" fill="#1E1A3A"/>';
    [[40, 10], [150, 8], [250, 12], [345, 36], [610, 8]].forEach(p => { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.4" fill="#fff"/>'; });
    s += lab(14, 28, 'Space', true, '#fff');
    /* ice shell */
    s += '<rect x="0" y="44" width="380" height="60" fill="#DCEBFA" stroke="#7FA6C9"/>';
    [[60, 44], [150, 44], [250, 44]].forEach(p => { s += '<ellipse cx="' + p[0] + '" cy="' + (p[1] + 3) + '" rx="26" ry="5" fill="#E2B04A"/>'; });
    s += '<path d="M262 104 L272 80 L262 64 L252 50" fill="none" stroke="#7FA6C9" stroke-width="2"/>';
    s += lab(80, 82, 'Ice shell', true);
    /* ocean */
    s += '<rect x="0" y="104" width="380" height="80" fill="#3E7DB8"/>';
    const ions = [['Na⁺', 40, 128], ['Cl⁻', 95, 158], ['Cl⁻', 170, 126], ['Mg²⁺', 230, 166], ['Na⁺', 300, 132], ['Cl⁻', 345, 170], ['K⁺', 260, 120]];
    ions.forEach(i => { s += '<text x="' + i[1] + '" y="' + i[2] + '" font-size="12" font-weight="700" ' + F + ' fill="#fff" text-anchor="middle">' + i[0] + '</text>'; });
    s += lab(110, 150, 'Salty liquid-water ocean', true, '#fff');
    /* rock */
    s += '<rect x="0" y="184" width="380" height="46" fill="#8D6E63"/>';
    s += lab(120, 212, 'Rocky interior', true, '#fff');
    /* right-hand labels */
    s += '<rect x="380" y="44" width="240" height="186" fill="#fff"/>';
    s += '<path d="M60 44 C 90 20, 330 14, 392 22" fill="none" stroke="#B07A12" stroke-width="1.5" stroke-dasharray="4 3"/>';
    s += lab(396, 26, 'Sodium chloride on the', false, '#fff') + lab(396, 40, 'surface (seen by Hubble)', false, '#fff');
    const side = (y1, y2, t1, t2) => '<path d="M388 ' + y1 + ' h8 M392 ' + y1 + ' V' + y2 + ' M388 ' + y2 + ' h8" stroke="#22145A" stroke-width="1.5" fill="none"/>' + lab(404, (y1 + y2) / 2 - 2, t1) + lab(404, (y1 + y2) / 2 + 14, t2);
    s += side(46, 102, 'about 15–25 km', 'thick');
    s += side(106, 182, 'about 60–150 km', 'deep');
    s += side(186, 228, 'rock and metal', 'core');
    return SV.wrap(620, 232, 'Cross-section of Europa: sodium chloride on the surface, an ice shell about 15 to 25 kilometers thick, a salty liquid-water ocean about 60 to 150 kilometers deep with dissolved ions, and a rocky interior.', s);
  })(),
  /* Lewis dot electron transfer for magnesium chloride (model answer) */
  mgcl2: (function () {
    const curve = (x1, y1, cx, cy, x2, y2) => {
      const a = Math.atan2(y2 - cy, x2 - cx), h = 8;
      return '<path d="M' + x1 + ' ' + y1 + ' Q' + cx + ' ' + cy + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="#BF360C" stroke-width="2"/>' +
        '<polygon fill="#BF360C" points="' + x2 + ',' + y2 + ' ' + (x2 - h * Math.cos(a - .45)).toFixed(1) + ',' + (y2 - h * Math.sin(a - .45)).toFixed(1) + ' ' + (x2 - h * Math.cos(a + .45)).toFixed(1) + ',' + (y2 - h * Math.sin(a + .45)).toFixed(1) + '"/>';
    };
    let s = SV.atom(60, 70, 'Cl', ['t', 'b', 'l', 'r1']) + SV.atom(200, 70, 'Mg', ['l1', 'r1']) + SV.atom(340, 70, 'Cl', ['t', 'b', 'r', 'l1']);
    s += curve(174, 62, 130, 30, 90, 62) + curve(226, 62, 270, 30, 310, 62);
    s += SV.t(200, 125, 'Each Cl atom gains one of Mg\'s two valence electrons', 'sv-s');
    return SV.wrap(400, 136, 'Lewis dot diagrams: a magnesium atom with two valence electrons gives one electron to each of two chlorine atoms with seven valence electrons.', s);
  })()
};

CLUSTERS.push({
  id: 'europa', t: 'A Salty Ocean on Europa', sub: 'Ions and salts on Jupiter\'s icy moon', src: 'Catalyst original',
  pe: ['HS-PS1-1', 'HS-PS1-2', 'HS-PS1-10'],
  intro: '<h3>A Salty Ocean on Europa</h3><p>Europa, one of Jupiter\'s largest moons, is covered by a shell of ice. Scientists have strong evidence that a huge ocean of liquid water lies under the ice, and it may hold about twice as much water as all of Earth\'s oceans. Liquid water makes Europa one of the best places in the solar system to search for life.</p>' +
    '<p>In 2019, astronomers using the Hubble Space Telescope found that a yellowish region on Europa\'s surface, called Tara Regio, contains <b>sodium chloride</b>, the same compound as table salt. The salt may have come up from the ocean below. Earlier data from the Galileo spacecraft had suggested other salts, such as magnesium sulfate (MgSO₄, Epsom salt). NASA\'s Europa Clipper spacecraft launched in October 2024 and will arrive at Jupiter in 2030 to study the ice and the ocean. Figure 1 models Europa\'s layers.</p>' +
    FIGCE.fig(FIGCE.layers, '<b>Figure 1: Inside Europa</b><br>(Not drawn to scale; thicknesses are NASA estimates)'),
  items: [
    {
      type: 'mc', pe: 'HS-PS1-2', tp: ['ion', 'ionic'],
      q: 'Sodium chloride forms when sodium atoms and chlorine atoms react. Which statement best describes what happens to their electrons?',
      o: ['The sodium atom and the chlorine atom share a pair of electrons, forming a covalent bond.',
        'The sodium atom gains one electron, and the chlorine atom loses one electron.',
        'Each atom becomes partially charged (δ+ and δ−) because they share electrons unequally.',
        'The sodium atom loses one electron to become Na⁺, and the chlorine atom gains that electron to become Cl⁻.'],
      a: 3,
      x: 'Sodium is a <b>metal</b> in Group 1 with 1 valence electron. Chlorine is a <b>nonmetal</b> in Group 17 with 7. In an <b>ionic bond</b> the metal <b>transfers</b> its electron to the nonmetal: Na becomes the cation <b>Na⁺</b> and Cl becomes the anion <b>Cl⁻</b> (8 valence electrons). The ions have <b>full</b> charges, not partial δ charges, which only show up in polar <i>covalent</i> bonds. Sharing (choice 1) happens between two nonmetals. Choice 2 has the transfer backward: metals lose electrons.'
    },
    {
      type: 'draw', pe: 'HS-PS1-2', tp: ['lewis', 'bohr', 'ionic'],
      ctx: '<p>Besides sodium ions, scientists think Europa\'s ocean may contain magnesium ions. If the ocean water froze or dried, magnesium ions and chloride ions could form the salt <b>magnesium chloride</b>.</p>',
      q: 'Using the Periodic Table: (a) draw Lewis electron-dot diagrams that show how one magnesium atom and chlorine atoms form magnesium chloride, using arrows for the electron transfer and showing the ions that form with their charges, and (b) draw a Bohr diagram of the magnesium ion (use magnesium-24).',
      model: '<p><b>(a) Electron transfer</b></p><div style="max-width:420px;margin:0 auto">' + FIGCE.mgcl2 + '</div>' +
        '<div style="display:flex;flex-wrap:wrap;gap:6px;justify-content:center;align-items:center"><div style="width:125px">' + SV.lewisDot('Mg', 0, 2) + '</div><b style="font-size:20px">2</b><div style="width:125px">' + SV.lewisDot('Cl', 8, -1) + '</div><span style="font-size:15px;margin-left:6px">→ MgCl₂</span></div>' +
        '<p><b>(b) Bohr diagram of Mg²⁺</b></p><div style="width:200px;margin:0 auto">' + SV.bohrIon('Mg', 12, 12, [2, 8], 2).replace('style="', 'style="overflow:visible;') + '</div>' +
        '<p>Magnesium (Group 2, 2-8-2) has 2 valence electrons. Each chlorine atom (7 valence electrons) can take only one, so it takes <b>two</b> chlorine atoms. Magnesium becomes [Mg]²⁺ with no dots, and each chlorine becomes [:Cl:]⁻ with 8 dots. The Mg²⁺ ion still has 12 protons (24 − 12 = 12 neutrons) but only 10 electrons, in shells of 2 and 8.</p>',
      rubric: ['Lewis dots: Mg drawn with 2 dots and each Cl with 7 dots, with arrows moving one electron from Mg to each of two Cl atoms', 'Products: [Mg]²⁺ with no dots and two [:Cl:]⁻ ions with 8 dots each, in brackets with charges outside', 'Bohr: nucleus with 12 p⁺ and 12 n⁰; electrons 2 and 8 only (no third shell)', 'Bohr diagram is labeled with a 2+ charge']
    },
    {
      type: 'row', pe: 'HS-PS1-2', tp: ['name', 'ionic', 'pg'],
      ctx: '<p>Scientists use the salts they expect in Europa\'s ocean to make lab models of its water. Each salt below is made from a metal ion and the chloride ion.</p>',
      q: 'Using the Periodic Table, which row correctly pairs the name of a binary salt with its chemical formula?',
      cols: ['Row', 'Name', 'Formula'],
      rows: [['(1)', 'calcium chloride', 'CaCl₂'], ['(2)', 'magnesium chlorine', 'MgCl₂'], ['(3)', 'potassium chloride', 'K₂Cl₂'], ['(4)', 'magnesium chloride', 'Mg₂Cl']],
      a: 0,
      x: 'Calcium is in Group 2 and forms <b>Ca²⁺</b>; chlorine forms <b>Cl⁻</b>. The charges add to zero with two chlorides: (+2) + 2(−1) = 0, so <b>CaCl₂</b>, and the anion\'s name ends in <b>-ide</b>: calcium chlorid<b>e</b>. Row (2) has the right formula but the wrong name ("chlorine" is the element, not the ion). Row (3) is not reduced: K⁺ and Cl⁻ combine 1:1, so it is KCl. Row (4) criss-crosses backward; Mg²⁺ needs two Cl⁻, giving MgCl₂.'
    },
    {
      type: 'mc', pe: 'HS-PS1-10', tp: ['ion', 'water'],
      ctx: '<p>The Galileo spacecraft flew past Europa many times between 1996 and 2000. Its <b>magnetometer</b> measured the magnetic field near Europa. As Jupiter\'s strong magnetic field swept past the moon, Europa produced a magnetic field of its own that kept changing direction. The best explanation is a layer under the ice that <b>conducts electricity</b>, such as an ocean of salty liquid water.</p>',
      q: 'Which particles most likely carry the electric current in Europa\'s salty ocean?',
      o: ['Electrons flowing freely through the liquid water', 'Neutral water molecules moving through the ocean', 'Dissolved positive and negative ions, such as Na⁺ and Cl⁻, that can move through the water', 'Solid salt crystals frozen into the ice shell'],
      a: 2,
      x: 'In a solution, the current is carried by <b>mobile ions</b>: cations move one way and anions move the other. Electrons do not travel through water on their own (choice 1). Water molecules are neutral, so they carry no net charge (choice 2), which is why pure water barely conducts. In a solid salt the ions are locked in place, so it does not conduct. Your lab showed this: solid NaCl read low and dissolved NaCl read high (choice 4).'
    },
    {
      type: 'mc', pe: 'HS-PS1-1', tp: ['rad', 'pg'],
      ctx: '<p>Lab models of Europa\'s ocean often include potassium and calcium salts as well as sodium and magnesium salts. Figure 2 gives data for these four metals. (Atomic radius and ionization energy are not on the Reference Tables, so they are given here.)</p>' +
        '<div style="text-align:center;margin-top:8px"><b>Figure 2: Data for Four Metals</b></div><table class="tbl" style="background:#fff"><tr><th>Element</th><th>Group</th><th>Period</th><th>Atomic Radius (pm)</th><th>First Ionization Energy (kJ/mol)</th></tr>' +
        '<tr><td>Sodium (Na)</td><td class="n">1</td><td class="n">3</td><td class="n">186</td><td class="n">496</td></tr><tr><td>Potassium (K)</td><td class="n">1</td><td class="n">4</td><td class="n">227</td><td class="n">419</td></tr>' +
        '<tr><td>Magnesium (Mg)</td><td class="n">2</td><td class="n">3</td><td class="n">160</td><td class="n">738</td></tr><tr><td>Calcium (Ca)</td><td class="n">2</td><td class="n">4</td><td class="n">197</td><td class="n">590</td></tr></table>',
      q: 'Figure 2 shows that a potassium atom is larger than a sodium atom. Which statement best explains why?',
      o: ['Potassium has more electrons, and more electrons always take up more space.',
        'Potassium is in Period 4, so it has one more energy level (shell) than sodium, and its valence electron is farther from the nucleus.',
        'Potassium has more protons, and the extra protons push its electrons farther out.',
        'Potassium has fewer protons than sodium, so it holds its electrons less tightly.'],
      a: 1,
      x: 'Going <b>down a group</b> adds an <b>energy level</b>. Sodium (Period 3) has 3 shells and potassium (Period 4) has 4, so potassium\'s valence electron is <b>farther</b> from the nucleus, and the inner shells <b>shield</b> it (like extra sheets of paper between a magnet and the fridge). That is why K is 227 pm and Na is 186 pm. "More electrons" (choice 1) is not the reason by itself: across a period electrons are added too, yet atoms get <i>smaller</i>. Protons <b>attract</b> electrons, so they never push them out (choice 3), and potassium has more protons than sodium, not fewer (choice 4).'
    },
    {
      type: 'sr', pe: 'HS-PS1-1', tp: ['ie', 'pg', 'rad'], a: 'refute',
      q: 'A student claims that it takes <b>more</b> energy to remove a valence electron from a calcium atom than from a magnesium atom, because calcium has more protons. Decide whether you <b>support</b> or <b>refute</b> the claim. Use data from Figure 2 and your knowledge of Coulombic attraction.',
      model: '<p><b>Refute.</b></p><p><b>Evidence:</b> Figure 2 shows calcium\'s first ionization energy is <b>590 kJ/mol</b>, which is <b>less</b> than magnesium\'s <b>738 kJ/mol</b>. Calcium\'s atomic radius (197 pm) is also larger than magnesium\'s (160 pm).</p>' +
        '<p><b>Reasoning:</b> Calcium is below magnesium in Group 2. It has one more energy level (Period 4 vs. Period 3), so its valence electrons are <b>farther from the nucleus</b> and more <b>shielded</b> by inner shells. Even though calcium has more protons (20 vs. 12), the greater distance and shielding make the <b>Coulombic attraction</b> on its valence electrons weaker, so they are easier to remove. Going down a group, ionization energy decreases.</p>',
      rubric: ['Checks "Refute"', 'Cites the ionization energies from Figure 2: Ca 590 kJ/mol is lower than Mg 738 kJ/mol', 'Explains that Ca has an extra energy level, so its valence electrons are farther away and more shielded', 'Concludes that weaker Coulombic attraction makes calcium\'s electron easier to remove, despite more protons']
    }
  ]
});
