/* Catalyst - Midterm Review (Units 1-7). */
'use strict';
LESSONS.mid = {
  sections: [
    { t: 'Key formulas', h: `
      <h2>Key formulas for the midterm</h2>
      <p>Your <b>2025 Reference Tables for Physical Science: Chemistry</b> give some of these. Formulas marked &#9733; are <b>not</b> on the Reference Tables, so memorize those. Know <i>when</i> to use each one.</p>
      <table class="tbl">
        <tr><th>What</th><th>Formula</th><th>Where</th></tr>
        <tr><td>Density &#9733;</td><td>D = m / V</td><td>Unit 1</td></tr>
        <tr><td>Percent error &#9733;</td><td>(measured &minus; accepted) / accepted &times; 100</td><td>Unit 1</td></tr>
        <tr><td>Temperature</td><td>K = &deg;C + 273.15</td><td>RT Table 6</td></tr>
        <tr><td>Heat (temperature change)</td><td>q = mc&Delta;T</td><td>RT Table 5</td></tr>
        <tr><td>Heat (melting / boiling)</td><td>q = mH<sub>f</sub> &nbsp;&middot;&nbsp; q = mH<sub>v</sub></td><td>RT Table 5</td></tr>
        <tr><td>Neutrons &#9733;</td><td>mass number &minus; atomic number</td><td>Unit 2</td></tr>
        <tr><td>Average atomic mass &#9733;</td><td>&Sigma; (isotope mass &times; abundance as a decimal)</td><td>Unit 2</td></tr>
        <tr><td>Coulomb's law</td><td>F = q<sub>1</sub>q<sub>2</sub> / d<sup>2</sup></td><td>RT Table 5</td></tr>
        <tr><td>The mole</td><td>1 mole = molar mass (g) = 6.02 &times; 10<sup>23</sup> particles = 22.4 L (ideal gas at STP)</td><td>RT Table 6</td></tr>
        <tr><td>Percent composition &#9733;</td><td>mass of part / mass of whole &times; 100</td><td>Unit 6</td></tr>
        <tr><td>Percent yield &#9733;</td><td>actual / theoretical &times; 100</td><td>Unit 6</td></tr>
        <tr><td>Combined gas law</td><td>P<sub>1</sub>V<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>/T<sub>2</sub></td><td>RT Table 5</td></tr>
        <tr><td>Molarity / ppm</td><td>n = MV &nbsp;&middot;&nbsp; ppm = mass of solute / mass of solution &times; 1,000,000</td><td>RT Table 5</td></tr>
        <tr><td>Ideal gas law &#9733;</td><td>PV = nRT (enrichment; R = 8.31 L&middot;kPa/(mol&middot;K))</td><td>Unit 7</td></tr></table>
      <h3>Numbers to know</h3>
      <ul><li>STP: <b>273.15 K</b> and <b>1 atm</b> (1 atm = 101.3 kPa). On RT Table 6.</li>
        <li>Avogadro's number <b>6.02 &times; 10<sup>23</sup></b> and molar volume <b>22.4 L</b>. Both on RT Table 6.</li>
        <li>1 atm = 760 mmHg &#9733;</li></ul>` },
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
    { ctx: '<h3>Storyline: The weather balloon</h3>Students launch a helium weather balloon to collect data about the upper atmosphere. At launch it holds 5,000 L of helium. The balloon is made of stretchy latex and bursts if its volume goes over 60,000 L.<table class="tbl" style="margin-top:8px;background:#fff"><tr><th>Altitude</th><th>Air pressure</th><th>Temperature</th></tr><tr><td>Ground (launch)</td><td>101.3 kPa</td><td>293.15 K (20 &deg;C)</td></tr><tr><td>10 km</td><td>26.5 kPa</td><td>223.15 K (&minus;50 &deg;C)</td></tr><tr><td>20 km</td><td>5.5 kPa</td><td>218.15 K (&minus;55 &deg;C)</td></tr></table><p class="hint" style="margin-top:6px">Like the new Regents, the next three questions all use this information. Assume the gas inside matches the outside pressure and temperature.</p>', q: 'Using the combined gas law, what is the approximate volume of the balloon at 10 km?', o: ['1,310 L', '3,810 L', '14,500 L', '19,100 L'], a: 2, x: 'V<sub>2</sub> = P<sub>1</sub>V<sub>1</sub>T<sub>2</sub> / (T<sub>1</sub>P<sub>2</sub>) = (101.3 &times; 5,000 &times; 223.15) / (293.15 &times; 26.5) &asymp; 14,500 L. 19,100 L forgets the temperature drop, and 3,810 L forgets the pressure drop.' },
    { q: 'Which statement best explains why the balloon gets bigger as it rises?', o: ['The helium atoms themselves get larger', 'The outside air pressure decreases, so the gas inside pushes the stretchy balloon outward', 'The temperature rises with altitude', 'New helium atoms form inside the balloon'], a: 1, x: 'The data show pressure falling a lot with altitude. With less pressure pushing in, the gas expands (Boyle). The temperature actually drops, which shrinks it a little, but the pressure effect is much larger.' },
    { q: 'At 20 km this balloon would reach about 68,500 L and burst. Which design change would best let it reach 20 km without bursting?', o: ['Launch with 4,000 L of helium instead of 5,000 L', 'Launch on a colder day', 'Add more helium before launch', 'Paint the balloon black so it absorbs more sunlight'], a: 0, x: 'Volume is proportional to the starting volume: 4,000 L would grow to about 54,800 L at 20 km, under the 60,000 L limit. The other choices make it larger: a colder launch packs more moles of helium into the same 5,000 L, and extra helium or extra solar heating also add volume. Weighing a trade-off like this against a limit is an engineering design question.' },
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
