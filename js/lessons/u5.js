/* Catalyst - Unit 5: Bonding. */
'use strict';
const FIG5 = {
  lewis: (function () {
    let s = '', d = 46;
    // H2O at x=70
    s += SV.atom(70, 60, 'O', ['t', 'r']) + SV.atom(70 - d, 60, 'H') + SV.atom(70, 60 + d, 'H') + SV.bond(70 - d, 60, 70, 60, 1) + SV.bond(70, 60, 70, 60 + d, 1);
    s += SV.t(60, 150, 'H₂O', 'sv-t') + SV.t(60, 168, 'bent · polar', 'sv-s');
    // CO2 at 230
    s += SV.atom(185, 80, 'O', ['t', 'b']) + SV.atom(235, 80, 'C') + SV.atom(285, 80, 'O', ['t', 'b']) + SV.bond(185, 80, 235, 80, 2) + SV.bond(235, 80, 285, 80, 2);
    s += SV.t(235, 150, 'CO₂', 'sv-t') + SV.t(235, 168, 'linear · nonpolar', 'sv-s');
    // NH3 at 390
    s += SV.atom(390, 70, 'N', ['t']) + SV.atom(390 - d, 70, 'H') + SV.atom(390 + d, 70, 'H') + SV.atom(390, 70 + d, 'H') +
      SV.bond(390 - d, 70, 390, 70, 1) + SV.bond(390, 70, 390 + d, 70, 1) + SV.bond(390, 70, 390, 70 + d, 1);
    s += SV.t(390, 150, 'NH₃', 'sv-t') + SV.t(390, 168, 'trigonal pyramidal · polar', 'sv-s');
    // CH4 at 545
    s += SV.atom(545, 70, 'C') + SV.atom(545 - d, 70, 'H') + SV.atom(545 + d, 70, 'H') + SV.atom(545, 70 - d + 8, 'H') + SV.atom(545, 70 + d - 8, 'H') +
      SV.bond(545 - d, 70, 545, 70, 1) + SV.bond(545, 70, 545 + d, 70, 1) + SV.bond(545, 70, 545, 70 - d + 8, 1) + SV.bond(545, 70, 545, 70 + d - 8, 1);
    s += SV.t(545, 150, 'CH₄', 'sv-t') + SV.t(545, 168, 'tetrahedral · nonpolar', 'sv-s');
    return SV.wrap(620, 180, 'Lewis structures and shapes of water, carbon dioxide, ammonia and methane', s);
  })(),
  bonds: (function () {
    let s = SV.atom(60, 50, 'H') + SV.atom(110, 50, 'Cl', ['t', 'b', 'r']) + SV.bond(60, 50, 110, 50, 1) + SV.t(90, 100, 'single (2 e⁻ shared)', 'sv-s');
    s += SV.atom(250, 50, 'O', ['t', 'l']) + SV.atom(300, 50, 'O', ['t', 'r']) + SV.bond(250, 50, 300, 50, 2) + SV.t(275, 100, 'double (4 e⁻)', 'sv-s');
    s += SV.atom(440, 50, 'N', ['l']) + SV.atom(490, 50, 'N', ['r']) + SV.bond(440, 50, 490, 50, 3) + SV.t(465, 100, 'triple (6 e⁻)', 'sv-s');
    return SV.wrap(560, 112, 'Single, double and triple covalent bonds in HCl, O2 and N2', s);
  })(),
  metal: (function () {
    let s = '<rect x="20" y="10" width="300" height="130" rx="10" fill="#FFF3E0" stroke="#F2B200"/>';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) s += '<circle cx="' + (50 + c * 48) + '" cy="' + (40 + r * 36) + '" r="14" fill="#F8BBD0" stroke="#C2185B"/><text class="sv-s" x="' + (50 + c * 48) + '" y="' + (44 + r * 36) + '" style="fill:#880E4F">+</text>';
    [[74, 58], [170, 58], [266, 58], [122, 94], [218, 94], [26, 94], [314, 58], [122, 22], [218, 130], [74, 130], [314, 130], [266, 22]].forEach(p => { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4" fill="#5B3FD0"/>'; });
    return SV.wrap(340, 150, 'Metallic bonding: positive ions in a sea of mobile electrons', s);
  })()
};

LESSONS.u5 = {
  sections: [
    { t: 'Why atoms bond', h: `
      <h2>Why atoms form bonds</h2>
      <p>A <b>chemical bond</b> is an attraction that holds atoms together. Atoms bond to become more <b>stable</b>, usually by reaching a full valence shell of 8 electrons, the <b>octet</b> (hydrogen needs only 2).</p>
      <div class="key"><b>Energy and bonds:</b> <b>forming</b> a bond <b>releases</b> energy (exothermic). <b>Breaking</b> a bond <b>absorbs</b> energy (endothermic). The bonded atoms have lower energy, which makes them more stable.</div>
      <h3>Three main types of bonds</h3>
      <table class="tbl"><tr><th>Bond</th><th>Between</th><th>Electrons are&hellip;</th></tr>
        <tr><td><b>Ionic</b></td><td>metal + nonmetal</td><td>transferred</td></tr>
        <tr><td><b>Covalent</b></td><td>nonmetal + nonmetal</td><td>shared</td></tr>
        <tr><td><b>Metallic</b></td><td>metal + metal</td><td>free to move ("sea of electrons")</td></tr></table>
      <h3>Electronegativity difference</h3>
      <p>Look up both electronegativities. The bigger the difference, the more unevenly the electrons are held:</p>
      <ul><li>Difference near <b>0</b>: <b>nonpolar covalent</b> (equal sharing), e.g. H<sub>2</sub>, Cl<sub>2</sub>.</li>
        <li>Moderate difference: <b>polar covalent</b> (unequal sharing), e.g. H&ndash;Cl, O&ndash;H.</li>
        <li>Large difference (about <b>1.7 or more</b>): <b>ionic</b>, e.g. NaCl (3.2 &minus; 0.9 = 2.3).</li></ul>
      <p class="hint">The 1.7 cutoff is only a rule of thumb, and your teacher may use a slightly different value. Two <b>nonmetals</b> always bond covalently, even above 1.7: H&ndash;F (4.0 &minus; 2.2 = 1.8) is polar covalent, not ionic.</p>` },
    { t: 'Ionic bonds', h: `
      <h2>Ionic bonding</h2>
      <p>In an ionic bond, a <b>metal transfers electrons to a nonmetal</b>. The positive and negative ions that result are held together by electrostatic attraction.</p>
      <div class="steps"><div class="st">Example: sodium chloride</div>Na (2-8-1) gives its 1 valence electron to Cl (2-8-7).<br>Na<sup>+</sup> (2-8) and Cl<sup>&minus;</sup> (2-8-8) each now have a stable octet.<br>Lewis form: <b>Na<sup>+</sup></b> and <b>[Cl]<sup>&minus;</sup></b> with 8 dots around the Cl inside the brackets. Show the charges, and draw no line, because nothing is shared.</div>
      <h3>Properties of ionic compounds</h3>
      <ul><li>Form a <b>crystal lattice</b>: a repeating 3-D pattern of ions, with no separate molecules.</li>
        <li><b>High melting and boiling points</b>, and hard but brittle.</li>
        <li><b>Conduct electricity only when melted or dissolved in water</b>, when the ions are free to move. Solid ionic compounds do not conduct.</li>
        <li>Many dissolve in water. A substance that conducts when dissolved is called an <b>electrolyte</b>.</li></ul>
      <div class="tip">A compound like NaNO<sub>3</sub> has <b>both</b> bond types: ionic between Na<sup>+</sup> and NO<sub>3</sub><sup>&minus;</sup>, and covalent inside the nitrate ion.</div>` },
    { t: 'Covalent bonds & Lewis structures', h: `
      <h2>Covalent bonding and Lewis structures</h2>
      <p>In a covalent bond, <b>two nonmetals share electrons</b>. Each shared pair is one bond, drawn as a line.</p>
      <figure>${FIG5.bonds}</figure>
      <h3>Drawing a Lewis structure</h3>
      <ol><li>Add up the valence electrons of all the atoms.</li>
        <li>Put the atom that needs the most bonds in the center. It is usually the element there is only one of, and never H.</li>
        <li>Connect the atoms with single bonds (2 electrons each).</li>
        <li>Place the remaining electrons as lone pairs to complete octets (H gets just 2).</li>
        <li>If the central atom is still short, turn lone pairs into double or triple bonds.</li></ol>
      <div class="steps"><div class="st">Example: CO<sub>2</sub></div>Valence electrons: C 4 + O 6 + O 6 = 16.<br>Single bonds O&ndash;C&ndash;O use 4, leaving 12 for lone pairs on the O atoms. Carbon then has only 4 electrons.<br>Move one lone pair from each O into a bond: <b>O=C=O</b>, so every atom has an octet.</div>
      <h3>Polar vs. nonpolar bonds</h3>
      <p>In a <b>polar covalent</b> bond the more electronegative atom pulls the shared electrons closer, so it gets a partial negative charge (&delta;&minus;) and the other atom a partial positive charge (&delta;+). In a <b>nonpolar</b> bond (identical atoms, like H<sub>2</sub> or O<sub>2</sub>) they share equally.</p>` },
    { t: 'Molecular shape & polarity', h: `
      <h2>Molecular shape and polarity</h2>
      <p>Electron pairs around a central atom push as far apart as possible. This decides the molecule's shape (the VSEPR idea).</p>
      <figure>${FIG5.lewis}</figure>
      <table class="tbl"><tr><th>Shape</th><th>Example</th><th>Around the central atom</th></tr>
        <tr><td>Linear</td><td>CO<sub>2</sub> (and any diatomic molecule, like N<sub>2</sub>)</td><td>2 bonding regions</td></tr>
        <tr><td>Bent</td><td>H<sub>2</sub>O</td><td>2 bonds + 2 lone pairs</td></tr>
        <tr><td>Trigonal pyramidal</td><td>NH<sub>3</sub></td><td>3 bonds + 1 lone pair</td></tr>
        <tr><td>Tetrahedral</td><td>CH<sub>4</sub></td><td>4 bonds, no lone pairs</td></tr></table>
      <h3>Polar or nonpolar molecule?</h3>
      <div class="key"><b>SNAP:</b> <b>S</b>ymmetrical = <b>N</b>onpolar, <b>A</b>symmetrical = <b>P</b>olar.</div>
      <ul><li>CO<sub>2</sub> has polar bonds, but it is <b>symmetrical</b>, so the pulls cancel: <b>nonpolar molecule</b>.</li>
        <li>H<sub>2</sub>O is <b>bent</b> (asymmetrical), so one end is partially negative: <b>polar molecule</b>, or <b>dipole</b>.</li>
        <li>CH<sub>4</sub> is symmetrical, so nonpolar. NH<sub>3</sub> is asymmetrical, so polar.</li></ul>` },
    { t: 'Metallic bonds & intermolecular forces', h: `
      <h2>Metallic bonds and intermolecular forces</h2>
      <h3>Metallic bonding</h3>
      <figure>${FIG5.metal}<figcaption>Positive metal ions in a "sea" of mobile valence electrons.</figcaption></figure>
      <p>The mobile electrons explain why metals <b>conduct electricity</b> (even as solids), and why they are <b>malleable</b> and <b>ductile</b>: the ions can slide past each other without breaking the bond.</p>
      <h3>Intermolecular forces (IMF)</h3>
      <p>These are attractions <b>between</b> molecules. They are much weaker than the bonds <i>inside</i> molecules. They decide melting point, boiling point, and solubility.</p>
      <ul><li><b>Dispersion (London) forces:</b> weak, temporary attractions found between all molecules. They get stronger as molecules get bigger, which is why I<sub>2</sub> is a solid but F<sub>2</sub> is a gas.</li>
        <li><b>Dipole&ndash;dipole forces:</b> between polar molecules.</li>
        <li><b>Hydrogen bonding:</b> the strongest IMF. It forms when H is bonded to <b>N, O or F</b> (as in H<sub>2</sub>O, NH<sub>3</sub>, HF). This is why water has an unusually high boiling point.</li></ul>
      <div class="key"><b>Stronger IMF</b> means a higher boiling point and a lower vapor pressure.</div>
      <p><b>"Like dissolves like":</b> polar and ionic substances dissolve in polar solvents (salt or sugar in water). Nonpolar substances dissolve in nonpolar solvents (oil in gasoline). Oil and water don't mix.</p>` }
  ],
  quiz: [
    { q: 'Which pair of elements forms an ionic bond?', o: ['C and O', 'H and Cl', 'K and Br', 'N and N'], a: 2, x: 'Potassium (a metal) transfers an electron to bromine (a nonmetal). The others are all nonmetal pairs, which share electrons.' },
    { q: 'When a chemical bond forms, energy is:', o: ['absorbed', 'released', 'neither absorbed nor released', 'destroyed'], a: 1, x: 'Bond formation is exothermic: the bonded atoms are lower in energy and more stable. Breaking bonds absorbs energy.' },
    { q: 'Which substance conducts electricity in the solid state?', o: ['NaCl(s)', 'C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>(s)', 'Cu(s)', 'H<sub>2</sub>O(s)'], a: 2, x: 'Metals have mobile electrons. Ionic solids like NaCl conduct only when melted or dissolved.' },
    { q: 'How many electrons are shared in a triple bond?', o: ['2', '3', '6', '8'], a: 2, x: 'Each bond is one shared pair (2 electrons); three bonds share 6 electrons, as in N&equiv;N.' },
    { q: 'Which molecule is nonpolar but has polar bonds?', o: ['H<sub>2</sub>O', 'NH<sub>3</sub>', 'CO<sub>2</sub>', 'HCl'], a: 2, x: 'The C=O bonds are polar, but linear CO<sub>2</sub> is symmetrical, so the pulls cancel.' },
    { q: 'What is the shape of a water molecule?', o: ['Linear', 'Bent', 'Trigonal pyramidal', 'Tetrahedral'], a: 1, x: 'Oxygen has 2 bonds and 2 lone pairs; the lone pairs push the H atoms into a bent shape, making water polar.' },
    { q: 'Which substance has hydrogen bonding between its molecules?', o: ['CH<sub>4</sub>', 'H<sub>2</sub>', 'HF', 'CO<sub>2</sub>'], a: 2, x: 'Hydrogen bonds form when H is bonded to N, O or F. HF qualifies; the others do not.' },
    { q: 'Which bond is most polar? (Use electronegativity.)', o: ['H&ndash;H', 'H&ndash;Cl', 'H&ndash;F', 'H&ndash;Br'], a: 2, x: 'F has the highest electronegativity (4.0), so the H&ndash;F difference (4.0 &minus; 2.2 = 1.8) is the largest.' },
    { q: 'Compared with molecular substances, ionic compounds usually have:', o: ['lower melting points', 'higher melting points', 'no crystal structure', 'weaker attractions'], a: 1, x: 'The strong attraction between ions in a crystal lattice takes a lot of energy to overcome.' },
    { q: 'Metals are malleable because:', o: ['their electrons are fixed between atoms', 'their positive ions can slide within a sea of mobile electrons', 'they form crystal lattices of ions', 'they share electrons in pairs'], a: 1, x: 'In the metallic bond, layers of ions can shift without breaking the attraction to the electron sea.' }
  ]
};
