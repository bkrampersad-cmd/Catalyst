/* Catalyst - Midterm Review (Units 1-7). */
'use strict';
LESSONS.mid = {
  sections: [
    { t: 'Key formulas', h: `
      <h2>Key formulas for the midterm</h2>
      <p>Formulas marked &#9733; are <b>not</b> on the Reference Tables, so memorize those. Know <i>when</i> to use each one.</p>
      <table class="tbl">
        <tr><th>What</th><th>Formula</th><th>Lesson unit</th></tr>
        <tr><td>Density</td><td>D = m / V</td><td>1</td></tr>
        <tr><td>Percent error</td><td>(measured &minus; accepted) / accepted &times; 100</td><td>1</td></tr>
        <tr><td>Temperature</td><td>K = &deg;C + 273</td><td>1, 7</td></tr>
        <tr><td>Heat (temperature change)</td><td>q = mC&Delta;T</td><td>1</td></tr>
        <tr><td>Heat (melting / boiling)</td><td>q = mH<sub>f</sub> &nbsp;&middot;&nbsp; q = mH<sub>v</sub></td><td>1</td></tr>
        <tr><td>Neutrons &#9733;</td><td>mass number &minus; atomic number</td><td>2</td></tr>
        <tr><td>Average atomic mass &#9733;</td><td>&Sigma; (isotope mass &times; abundance as a decimal)</td><td>2</td></tr>
        <tr><td>Moles</td><td>given mass / gram-formula mass</td><td>6</td></tr>
        <tr><td>Percent composition</td><td>mass of part / mass of whole &times; 100</td><td>6</td></tr>
        <tr><td>Percent yield &#9733;</td><td>actual / theoretical &times; 100</td><td>6</td></tr>
        <tr><td>Combined gas law</td><td>P<sub>1</sub>V<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>/T<sub>2</sub></td><td>7</td></tr>
        <tr><td>Ideal gas law &#9733;</td><td>PV = nRT, with R = 8.31 L&middot;kPa/(mol&middot;K)</td><td>7</td></tr></table>
      <h3>Numbers to know</h3>
      <ul><li>Avogadro's number: <b>6.02 &times; 10<sup>23</sup></b> particles per mole</li>
        <li>Molar volume of a gas at STP: <b>22.4 L/mol</b> &#9733;</li>
        <li>STP: <b>273 K</b> and <b>101.3 kPa</b> (1 atm = 760 mmHg)</li></ul>` },
    { t: 'Big ideas by unit', h: `
      <h2>Big ideas by unit</h2>
      <h3>1 &middot; Matter &amp; Measurement</h3>
      <ul><li>Elements and compounds are pure substances; mixtures are physically combined and separated physically.</li>
        <li>A chemical change makes new substances; a physical change doesn't.</li>
        <li>Sig figs: leading zeros never count; trailing zeros count only with a decimal point.</li></ul>
      <h3>2 &middot; Atomic Structure</h3>
      <ul><li>The nucleus (protons and neutrons) holds almost all of the mass. Gold foil showed the atom is mostly empty space.</li>
        <li>Isotopes have the same protons and different neutrons. Excited electrons release light as they fall back, producing bright-line spectra.</li></ul>
      <h3>3 &middot; Formulas &amp; Equations</h3>
      <ul><li>Ionic formulas balance the charges (criss-cross). Use Roman numerals for metals with more than one charge, and prefixes for two nonmetals.</li>
        <li>Balance with coefficients, never subscripts. Know the 5 reaction types.</li></ul>
      <h3>4 &middot; Periodic Table</h3>
      <ul><li>Groups share their valence electron count. Across a period, radius decreases while ionization energy and electronegativity increase. Down a group, the opposite.</li>
        <li>Metal ions are smaller than their atoms; nonmetal ions are larger.</li></ul>
      <h3>5 &middot; Bonding</h3>
      <ul><li>Ionic bonds transfer electrons; covalent bonds share them; metallic bonds use a sea of electrons. Forming a bond releases energy.</li>
        <li>SNAP: symmetrical molecules are nonpolar. Hydrogen bonding (H with N, O or F) is the strongest intermolecular force.</li></ul>
      <h3>6 &middot; Mathematics of Chemistry</h3>
      <ul><li>Always convert through moles. The coefficients give the mole ratio. The limiting reactant runs out first.</li></ul>
      <h3>7 &middot; Gas Laws</h3>
      <ul><li>Always use kelvin. P and V are inverse; V and T are direct; P and T are direct.</li>
        <li>Gases are most ideal at high temperature and low pressure. H<sub>2</sub> and He are the most ideal.</li></ul>` }
  ],
  quiz: [
    { q: 'Which is a homogeneous mixture?', o: ['Salt water', 'Sand and iron filings', 'Pure water', 'Sodium chloride'], a: 0, x: 'Salt water is uniform throughout (a solution). Pure water and NaCl are compounds, and sand with iron filings is heterogeneous.' },
    { q: 'How many significant figures are in 0.0800?', o: ['1', '2', '3', '4'], a: 2, x: 'Leading zeros don\'t count. The 8 and the two trailing zeros after the decimal do: 3 sig figs.' },
    { q: 'Which particle has a positive charge and is found in the nucleus?', o: ['Electron', 'Neutron', 'Proton', 'Alpha particle'], a: 2, x: 'Protons are +1 and live in the nucleus with the neutral neutrons.' },
    { q: 'An atom of potassium-39 has how many neutrons?', o: ['19', '20', '39', '58'], a: 1, x: 'K has atomic number 19. 39 &minus; 19 = 20 neutrons.' },
    { q: 'What is the formula of magnesium chloride?', o: ['MgCl', 'MgCl<sub>2</sub>', 'Mg<sub>2</sub>Cl', 'Mg<sub>2</sub>Cl<sub>3</sub>'], a: 1, x: 'Mg<sup>2+</sup> needs two Cl<sup>&minus;</sup> ions: MgCl<sub>2</sub>.' },
    { q: '2KClO<sub>3</sub> &rarr; 2KCl + 3O<sub>2</sub> is what type of reaction?', o: ['Synthesis', 'Decomposition', 'Single replacement', 'Combustion'], a: 1, x: 'One compound breaks down into simpler substances.' },
    { q: 'Which element has the lowest first ionization energy?', o: ['Li', 'Na', 'K', 'Cs'], a: 3, x: 'Ionization energy decreases down a group. Cesium\'s valence electron is the farthest from the nucleus and the easiest to remove.' },
    { q: 'Which element is most likely to form a &minus;2 ion?', o: ['Mg', 'Al', 'S', 'Cl'], a: 2, x: 'Sulfur (Group 16, 6 valence electrons) gains 2 electrons to reach an octet: S<sup>2&minus;</sup>.' },
    { q: 'Which molecule contains a double bond?', o: ['H<sub>2</sub>', 'Cl<sub>2</sub>', 'O<sub>2</sub>', 'N<sub>2</sub>'], a: 2, x: 'O=O. H<sub>2</sub> and Cl<sub>2</sub> have single bonds and N<sub>2</sub> has a triple bond.' },
    { q: 'Which substance has the highest boiling point because of hydrogen bonding?', o: ['CH<sub>4</sub>', 'H<sub>2</sub>O', 'H<sub>2</sub>S', 'CO<sub>2</sub>'], a: 1, x: 'Water has H bonded to O, allowing hydrogen bonds between molecules.' },
    { q: 'What is the mass of 3.00 mol of H<sub>2</sub>O (18.0 g/mol)?', o: ['6.00 g', '18.0 g', '54.0 g', '0.167 g'], a: 2, x: '3.00 mol &times; 18.0 g/mol = 54.0 g.' },
    { q: 'In 2Na + Cl<sub>2</sub> &rarr; 2NaCl, how many moles of NaCl form from 1.0 mol of Cl<sub>2</sub>?', o: ['0.5 mol', '1.0 mol', '2.0 mol', '4.0 mol'], a: 2, x: 'The mole ratio is 1 Cl<sub>2</sub> : 2 NaCl, so 1.0 mol Cl<sub>2</sub> gives 2.0 mol NaCl.' },
    { q: 'A gas at 300. K is heated to 600. K in a rigid container. If it started at 100. kPa, the new pressure is:', o: ['50.0 kPa', '100. kPa', '200. kPa', '400. kPa'], a: 2, x: 'P<sub>2</sub> = P<sub>1</sub>T<sub>2</sub>/T<sub>1</sub> = 100. &times; 600./300. = 200. kPa.' },
    { q: 'Gas particles have no attractive forces and negligible volume according to:', o: ['Dalton\'s model', 'the kinetic molecular theory', 'the periodic law', 'the law of conservation of mass'], a: 1, x: 'These are assumptions of the KMT for an ideal gas.' },
    { q: 'An empirical formula is NO<sub>2</sub> and the molar mass is 92 g/mol. The molecular formula is:', o: ['NO<sub>2</sub>', 'N<sub>2</sub>O<sub>4</sub>', 'N<sub>3</sub>O<sub>6</sub>', 'N<sub>4</sub>O<sub>8</sub>'], a: 1, x: 'NO<sub>2</sub> = 46 g/mol. 92 &divide; 46 = 2, giving N<sub>2</sub>O<sub>4</sub>.' }
  ]
};
