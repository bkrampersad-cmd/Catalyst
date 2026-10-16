/* Catalyst - Unit 4: The Periodic Table. */
'use strict';
const FIG4 = {
  massPairs: (function () {
    const pairs = [['18', 'Ar', '39.95', '19', 'K', '39.10'], ['27', 'Co', '58.93', '28', 'Ni', '58.69'], ['52', 'Te', '127.60', '53', 'I', '126.90']];
    let s = '';
    pairs.forEach((p, i) => {
      const x = 14 + i * 205;
      const tile = (tx, z, sym, m, hi) => '<rect x="' + tx + '" y="22" width="68" height="74" rx="8" fill="' + (hi ? '#FFE0B2' : '#E6E0F8') + '" stroke="' + (hi ? '#E07A5F' : '#9C8FD0') + '" stroke-width="2"/>' +
        '<text class="sv-s" x="' + (tx + 8) + '" y="38" style="text-anchor:start">' + z + '</text>' +
        '<text class="sv-a" x="' + (tx + 34) + '" y="58">' + sym + '</text>' +
        '<text class="sv-s" x="' + (tx + 34) + '" y="88" style="' + (hi ? 'fill:#B23C17;font-weight:700' : '') + '">' + m + '</text>';
      s += tile(x, p[0], p[1], p[2], true) + tile(x + 92, p[3], p[4], p[5], false);
      s += SV.arrow(x + 70, 59, x + 90, 59, '#9C8FD0');
      s += SV.t(x + 80, 116, 'heavier one comes first', 'sv-s');
    });
    s += SV.t(310, 142, 'The orange element has fewer protons but more mass, so atomic number, not mass, sets the order.', 'sv-s');
    return SV.wrap(620, 152, 'Three pairs where the element with the lower atomic number has the higher atomic mass', s);
  })(),
  map: (function () {
    // simplified 18-column map: metals / metalloids staircase / nonmetals / noble gases
    const metalloids = [[2, 13], [3, 14], [4, 14], [4, 15], [5, 15], [5, 16]]; // [row, group]: B Si Ge As Sb Te
    const nonmetal = (r, g) => (r === 1 && g === 1) || (r === 2 && g >= 14 && g <= 17) || (r === 3 && g >= 15 && g <= 17) || (r === 4 && (g === 16 || g === 17)) || (r === 5 && g === 17) || (r === 6 && g === 17);
    const exists = (r, g) => r === 1 ? (g === 1 || g === 18) : (r <= 3 ? (g <= 2 || g >= 13) : true);
    let s = '', w = 30, h = 26, x0 = 20, y0 = 20;
    for (let r = 1; r <= 7; r++) for (let g = 1; g <= 18; g++) {
      if (!exists(r, g)) continue;
      let c = '#F8BBD0';
      if (g === 18) c = '#CE93D8'; else if (metalloids.some(m => m[0] === r && m[1] === g)) c = '#A5D6A7'; else if (nonmetal(r, g)) c = '#80DEEA';
      s += '<rect x="' + (x0 + (g - 1) * w) + '" y="' + (y0 + (r - 1) * h) + '" width="' + (w - 2) + '" height="' + (h - 2) + '" rx="3" fill="' + c + '"/>';
    }
    [['#F8BBD0', 'Metals'], ['#A5D6A7', 'Metalloids'], ['#80DEEA', 'Nonmetals'], ['#CE93D8', 'Noble gases']].forEach((L, i) => {
      const lx = x0 + 20 + i * 135, ly = y0 + 7 * h + 18;
      s += '<rect x="' + lx + '" y="' + ly + '" width="16" height="16" rx="3" fill="' + L[0] + '"/><text class="sv-s" x="' + (lx + 22) + '" y="' + (ly + 13) + '" style="text-anchor:start">' + L[1] + '</text>';
    });
    return SV.wrap(580, 240, 'Metals, metalloids and nonmetals on the periodic table', s);
  })(),
  trends: SV.wrap(560, 250, 'Periodic trend arrows',
    '<rect x="120" y="40" width="320" height="170" rx="10" fill="#F3F0FC" stroke="#C9BFEA"/>' +
    SV.t(280, 30, 'Periodic table', 'sv-s') +
    SV.arrow(140, 70, 420, 70, '#0FA89B') + SV.t(280, 62, 'across a period →', 'sv-s') +
    SV.t(280, 92, 'radius ↓   ionization energy ↑   electronegativity ↑', 'sv-t') +
    SV.arrow(150, 110, 150, 200, '#E07A5F') + SV.t(80, 150, 'down a', 'sv-s') + SV.t(80, 166, 'group ↓', 'sv-s') +
    SV.t(300, 150, 'radius ↑', 'sv-t') + SV.t(300, 172, 'ionization energy ↓   electronegativity ↓', 'sv-t') +
    SV.t(280, 236, 'Fluorine: highest electronegativity. Francium: largest, most metallic.', 'sv-s')),
  ionsize: SV.wrap(520, 140, 'Ion size compared to atom size',
    '<circle cx="70" cy="65" r="40" fill="#FF9E80" opacity=".8"/>' + SV.t(70, 70, 'Na', 'sv-t') + SV.arrow(118, 65, 150, 65) +
    '<circle cx="185" cy="65" r="24" fill="#FF9E80"/>' + SV.t(185, 70, 'Na⁺', 'sv-t') +
    '<circle cx="310" cy="65" r="26" fill="#80DEEA" opacity=".8"/>' + SV.t(310, 70, 'Cl', 'sv-t') + SV.arrow(342, 65, 374, 65) +
    '<circle cx="418" cy="65" r="38" fill="#80DEEA"/>' + SV.t(418, 70, 'Cl⁻', 'sv-t') +
    SV.t(128, 130, 'metal ion: smaller (lost a shell)', 'sv-s') + SV.t(364, 130, 'nonmetal ion: larger (extra electrons)', 'sv-s'))
};

LESSONS.u4 = {
  sections: [
    { t: 'How the table is organized', h: `
      <h2>How the periodic table is organized</h2>
      <ul><li><b>Mendeleev</b> (1869) arranged elements by atomic mass and left gaps for undiscovered elements. Those elements were later found with the properties he predicted.</li>
        <li><b>Moseley</b> (1913) showed the table works best ordered by <b>atomic number</b>.</li></ul>
      <div class="key"><b>Periodic law:</b> the properties of elements are periodic (repeating) functions of their atomic numbers.</div>
      <h3>Groups and periods</h3>
      <ul><li><b>Groups</b> are the vertical columns, numbered 1&ndash;18. Elements in a group have the <b>same number of valence electrons</b> (for main-group elements), so they have <b>similar chemical properties</b>.</li>
        <li><b>Periods</b> are the horizontal rows, numbered 1&ndash;7. The period number equals the number of occupied electron shells.</li></ul>
      <table class="tbl"><tr><th>Group</th><th>Family name</th><th>Valence e&minus;</th></tr>
        <tr><td>1</td><td>Alkali metals</td><td>1</td></tr><tr><td>2</td><td>Alkaline earth metals</td><td>2</td></tr>
        <tr><td>3&ndash;12</td><td>Transition metals</td><td>varies</td></tr><tr><td>17</td><td>Halogens</td><td>7</td></tr><tr><td>18</td><td>Noble gases</td><td>8 (He has 2)</td></tr></table>
      <div class="br"><button class="btn bt" onclick="goPage('table')">Explore the interactive periodic table</button></div>` },
    { t: 'Atomic mass across the table', h: `
      <h2>Does atomic mass get bigger across the table?</h2>
      <p><b>Usually, yes.</b> Each step to the right adds one proton (the atomic number goes up by 1), and heavier atoms also tend to have more neutrons. So atomic mass generally <b>increases across a period and down a group</b>.</p>
      <div class="steps"><div class="st">Example: Period 3</div>
        Na 22.99 &rarr; Mg 24.31 &rarr; Al 26.98 &rarr; Si 28.09 &rarr; P 30.97 &rarr; S 32.07 &rarr; Cl 35.45 &rarr; Ar 39.95<br>Each element is heavier than the one before it.</div>
      <h3>The exceptions</h3>
      <p>In a few places the order flips: an element is <b>heavier</b> than the element that comes right after it.</p>
      <figure>${FIG4.massPairs}</figure>
      <ul><li><b>Argon (39.95)</b> is heavier than <b>potassium (39.10)</b>.</li>
        <li><b>Cobalt (58.93)</b> is heavier than <b>nickel (58.69)</b>.</li>
        <li><b>Tellurium (127.60)</b> is heavier than <b>iodine (126.90)</b>.</li></ul>
      <h3>Why it happens</h3>
      <p>The mass on the periodic table is an <b>average of the element's isotopes</b>, weighted by how common each one is (Unit 2). Most argon atoms are argon-40, with 22 neutrons. Most potassium atoms are potassium-39, with only 20 neutrons. So even though potassium has one more proton, an average argon atom weighs more.</p>
      <h3>Why the table is ordered by atomic number</h3>
      <p>If you lined the elements up strictly by mass, tellurium and iodine would trade places. Iodine would land in the oxygen family and tellurium with the halogens, even though iodine clearly behaves like a halogen. Mendeleev noticed this and put them in the right groups anyway. Moseley later showed why that works: the table is really ordered by <b>atomic number</b>, the number of protons.</p>
      <div class="key"><b>Remember:</b> atomic number <i>always</i> goes up by exactly 1 across the table. Atomic mass <i>usually</i> goes up, but not always.</div>
      <div class="br"><button class="btn bt" onclick="PT.view='m';goPage('table')">See atomic mass in color on the periodic table</button></div>` },
    { t: 'Metals, nonmetals & metalloids', h: `
      <h2>Metals, nonmetals and metalloids</h2>
      <figure>${FIG4.map}<figcaption>The metalloids (green) form a "staircase" that separates the metals from the nonmetals.</figcaption></figure>
      <table class="tbl"><tr><th>Metals</th><th>Nonmetals</th></tr>
        <tr><td>Shiny (luster)</td><td>Dull</td></tr><tr><td>Malleable and ductile</td><td>Brittle as solids</td></tr>
        <tr><td>Good conductors of heat and electricity</td><td>Poor conductors (insulators)</td></tr>
        <tr><td>Lose electrons, forming positive ions</td><td>Gain electrons, forming negative ions (or share)</td></tr>
        <tr><td>Low electronegativity and ionization energy</td><td>High electronegativity and ionization energy</td></tr>
        <tr><td>All solids at room temperature except mercury (liquid)</td><td>Can be solids, liquids (bromine) or gases</td></tr></table>
      <p><b>Metalloids</b> sit along the staircase: <b>B, Si, Ge, As, Sb, Te</b>. They have properties of both, for example shiny but brittle. Silicon and germanium are semiconductors used in computer chips.</p>
      <h3>Phases at STP</h3>
      <ul><li>Only two elements are liquids: <b>mercury</b> (a metal) and <b>bromine</b> (a nonmetal).</li>
        <li>Gases: H<sub>2</sub>, N<sub>2</sub>, O<sub>2</sub>, F<sub>2</sub>, Cl<sub>2</sub> and all the noble gases.</li>
        <li>Everything else is a solid.</li></ul>
      <div class="hint">Elements with more than one form in the same phase are called <b>allotropes</b>: for example diamond and graphite (carbon), or O<sub>2</sub> and ozone O<sub>3</sub>.</div>` },
    { t: 'Periodic trends', h: `
      <h2>Periodic trends</h2>
      <figure>${FIG4.trends}</figure>
      <h3>Atomic radius</h3>
      <ul><li><b>Down a group: increases.</b> Each period adds another electron shell.</li>
        <li><b>Across a period (left to right): decreases.</b> Protons are added to the nucleus while the electrons stay in the same shell, so the stronger nuclear charge pulls them closer.</li></ul>
      <h3>First ionization energy</h3>
      <p>The energy needed to remove the most loosely held electron from an atom.</p>
      <ul><li><b>Across a period: increases.</b> Electrons are held more tightly.</li>
        <li><b>Down a group: decreases.</b> Valence electrons are farther from the nucleus and <b>shielded</b> by the inner shells.</li></ul>
      <h3>Electronegativity</h3>
      <p>How strongly an atom attracts electrons in a chemical bond. It follows the same pattern as ionization energy. <b>Fluorine is the highest (4.0).</b></p>
      <h3>Metallic character</h3>
      <p>How easily an element loses electrons. It is the opposite trend: it increases <b>down</b> and to the <b>left</b>. The most reactive metals (Fr, Cs) are bottom-left; the most reactive nonmetal (F) is top-right.</p>
      <div class="key"><b>Why?</b> Two things: the number of shells (distance) and the nuclear charge (pull). More shells means weaker hold; more protons in the same shell means stronger hold.</div>
      <h3>The physics behind the trends: Coulomb's law</h3>
      <p>Reference Table 5 gives <b>Coulomb's law</b>, the force between two charged particles:</p>
      <div class="key" style="text-align:center;font-size:17px">F = q<sub>1</sub>q<sub>2</sub> / d<sup>2</sup></div>
      <p class="hint">The table leaves out a constant, so read it as "the force is <i>proportional</i> to q<sub>1</sub>q<sub>2</sub>/d<sup>2</sup>". It's for comparing forces, not calculating exact ones.</p>
      <ul><li><b>Bigger charges</b> (q) mean a <b>stronger</b> attraction. More protons in the nucleus pull harder on the electrons.</li>
        <li><b>Greater distance</b> (d) means a <b>much weaker</b> attraction, because d is squared. Doubling the distance cuts the force to one-fourth.</li></ul>
      <p>Going down a group, valence electrons sit in shells farther from the nucleus, so the attraction is weaker. The atom is bigger and gives up an electron more easily. Going across a period, the nuclear charge grows while the distance stays about the same, so electrons are held more tightly.</p>
      <div class="br"><button class="btn bt" onclick="goPage('table')">See the trends in color</button></div>
      <p class="hint">Tip: in the Periodic Table, change "Color by" to Electronegativity or Ionization energy.</p>` },
    { t: 'Ions & ionic radius', h: `
      <h2>Ions and ionic radius</h2>
      <figure>${FIG4.ionsize}</figure>
      <ul><li><b>Metals lose electrons</b> and form positive ions that are <b>smaller</b> than their atoms. They often lose the entire outer shell: Na (2-8-1) becomes Na<sup>+</sup> (2-8).</li>
        <li><b>Nonmetals gain electrons</b> and form negative ions that are <b>larger</b> than their atoms. The extra electrons repel each other and the nuclear pull per electron is weaker: Cl (2-8-7) becomes Cl<sup>&minus;</sup> (2-8-8).</li></ul>
      <p>Both ions end up with the same electron configuration as a noble gas: Na<sup>+</sup> matches neon and Cl<sup>&minus;</sup> matches argon.</p>
      <div class="tip"><b>Shortcut:</b> positive ion means a smaller particle; negative ion means a larger particle.</div>` },
    { t: 'Group families', h: `
      <h2>Properties of the main families</h2>
      <h3>Group 1: alkali metals</h3>
      <p>The most reactive metals. They are never found free in nature, are stored under oil, react with water to form bases (and hydrogen gas), and form +1 ions. Reactivity increases down the group.</p>
      <h3>Group 2: alkaline earth metals</h3>
      <p>Reactive (less than Group 1), and form +2 ions.</p>
      <h3>Groups 3&ndash;12: transition metals</h3>
      <p>Their ions often form <b>colored</b> solutions and compounds (for example copper(II) sulfate is blue). Many have more than one possible charge.</p>
      <h3>Group 17: halogens</h3>
      <p>The most reactive nonmetals. They are diatomic (F<sub>2</sub>, Cl<sub>2</sub>, Br<sub>2</sub>, I<sub>2</sub>) and gain one electron to form &minus;1 ions. It is the only group with all three phases at STP: F<sub>2</sub> and Cl<sub>2</sub> are gases, Br<sub>2</sub> is a liquid and I<sub>2</sub> is a solid. Reactivity <i>decreases</i> down the group.</p>
      <h3>Group 18: noble gases</h3>
      <p>They have a full valence shell, so they are very stable and rarely react. All are monatomic gases.</p>` }
  ],
  quiz: [
    { q: 'Argon (atomic number 18) has an atomic mass of 39.95, but potassium (atomic number 19) has an atomic mass of only 39.10. What explains this?', o: ['The periodic table has a mistake', 'Argon\'s most common isotope has more neutrons than potassium\'s most common isotope', 'Argon has more protons than potassium', 'Noble gases are always the heaviest in their period'], a: 1, x: 'Atomic mass is a weighted average of isotopes. Most argon is argon-40 (22 neutrons), while most potassium is potassium-39 (20 neutrons). Potassium still has more protons, which is why it comes after argon.' },
    { q: 'According to Coulomb\'s law (F = q<sub>1</sub>q<sub>2</sub>/d<sup>2</sup>), what happens to the attraction between a nucleus and a valence electron if the distance between them doubles?', o: ['It doubles', 'It is cut in half', 'It becomes one-fourth as strong', 'It stays the same'], a: 2, x: 'The force depends on 1/d<sup>2</sup>. Doubling d gives 1/2<sup>2</sup> = 1/4 of the original force. This is why atoms with more shells hold their valence electrons less tightly.' },
    { q: 'The modern periodic table is arranged in order of increasing:', o: ['atomic mass', 'atomic number', 'number of neutrons', 'density'], a: 1, x: 'Moseley showed that ordering by atomic number (number of protons) fixes the problems with Mendeleev\'s mass-based order.' },
    { q: 'Elements in the same group have similar chemical properties because they have the same number of:', o: ['protons', 'neutrons', 'electron shells', 'valence electrons'], a: 3, x: 'Chemical behavior depends mostly on valence electrons, which match within a group.' },
    { q: 'Which element has the largest atomic radius?', o: ['Li', 'Na', 'K', 'Rb'], a: 3, x: 'All are in Group 1. Radius increases down a group as shells are added, so rubidium (Period 5) is largest.' },
    { q: 'Going left to right across Period 3, atomic radius generally:', o: ['increases because more electrons are added', 'decreases because nuclear charge increases', 'stays the same', 'increases because more shells are added'], a: 1, x: 'The electrons stay in the same shell while protons increase, so the stronger pull draws them in.' },
    { q: 'Which element has the highest electronegativity?', o: ['Fluorine', 'Chlorine', 'Oxygen', 'Francium'], a: 0, x: 'Fluorine (4.0) is the most electronegative element. Electronegativity increases up and to the right (noble gases aside).' },
    { q: 'Which element is a metalloid?', o: ['Al', 'Si', 'S', 'Mg'], a: 1, x: 'Silicon sits on the staircase between metals and nonmetals.' },
    { q: 'Compared with a sodium atom, a sodium ion is:', o: ['larger, because it gained an electron', 'larger, because it lost an electron', 'smaller, because it lost its outer shell', 'the same size'], a: 2, x: 'Na loses its single third-shell electron, going from 2-8-1 to 2-8, so the ion is smaller.' },
    { q: 'Which element is a liquid at STP?', o: ['Iodine', 'Bromine', 'Chlorine', 'Sulfur'], a: 1, x: 'Only bromine and mercury are liquids at STP. Chlorine is a gas and iodine and sulfur are solids.' },
    { q: 'Which group contains elements that form colored ions in solution?', o: ['Alkali metals', 'Halogens', 'Transition metals', 'Noble gases'], a: 2, x: 'Many transition metal ions (Cu<sup>2+</sup>, Fe<sup>3+</sup>, Ni<sup>2+</sup>...) produce colored solutions.' },
    { q: 'Which property generally increases going down Group 1?', o: ['Ionization energy', 'Electronegativity', 'Metallic character', 'Nonmetallic character'], a: 2, x: 'Valence electrons are farther away and easier to lose, so metallic character and reactivity increase down the group.' }
  ]
};
