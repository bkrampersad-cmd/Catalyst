/* Catalyst - Unit 6: Mathematics of Chemistry (the mole and stoichiometry). */
'use strict';
const FIG6 = {
  map: SV.wrap(600, 190, 'Mole road map: grams, moles, particles and liters',
    '<rect x="230" y="65" width="140" height="56" rx="12" fill="#5B3FD0"/><text class="sv-t" x="300" y="99" style="fill:#fff;font-size:18px">MOLES</text>' +
    '<rect x="10" y="65" width="130" height="56" rx="12" fill="#E8FBF8" stroke="#0FA89B"/>' + SV.t(75, 99, 'Grams') +
    '<rect x="460" y="65" width="130" height="56" rx="12" fill="#FFF7E0" stroke="#F2B200"/>' + SV.t(525, 99, 'Particles') +
    '<rect x="235" y="150" width="130" height="36" rx="10" fill="#F3F0FC" stroke="#9C8FD0"/>' + SV.t(300, 173, 'Liters of gas (STP)') +
    SV.arrow(140, 82, 228, 82) + SV.arrow(228, 104, 142, 104) + SV.t(185, 74, '÷ molar mass', 'sv-s') + SV.t(185, 122, '× molar mass', 'sv-s') +
    SV.arrow(370, 82, 458, 82) + SV.arrow(458, 104, 372, 104) + SV.t(415, 74, '× 6.02×10²³', 'sv-s') + SV.t(415, 122, '÷ 6.02×10²³', 'sv-s') +
    SV.arrow(290, 122, 290, 148) + SV.arrow(310, 148, 310, 122) + SV.t(380, 140, '× or ÷ 22.4 L/mol', 'sv-s') +
    SV.t(300, 30, 'Always go through moles.', 'sv-t'))
};

LESSONS.u6 = {
  sections: [
    { t: 'The mole', h: `
      <h2>The mole</h2>
      <div class="tip"><b>Class rule:</b> round atomic masses to the <b>tenths place</b> before you add them (H = 1.0, C = 12.0, O = 16.0, Na = 23.0, Cl = 35.5). Catalyst's calculators do this too.</div>
      <p>Atoms are far too small to count one by one, so chemists count them in groups. A <b>mole</b> (mol) is <b>6.02 &times; 10<sup>23</sup></b> particles. This number is called <b>Avogadro's number</b>.</p>
      <p>A dozen eggs is 12 eggs; a mole of water is 6.02 &times; 10<sup>23</sup> molecules of water.</p>
      <h3>Molar mass</h3>
      <p>The <b>molar mass</b> is the mass of one mole of a substance, in grams per mole (g/mol). Reference Table 6 puts it this way: <b>1 mole = molar mass (g) = 6.02 &times; 10<sup>23</sup> particles = 22.4 L</b>. To find a molar mass, add up the average atomic masses (from the periodic table) of every atom in the formula.</p>
      <div class="steps"><div class="st">Example: Ca(OH)<sub>2</sub></div>
        Ca: 1 &times; 40.1 = 40.1<br>O: 2 &times; 16.0 = 32.0<br>H: 2 &times; 1.0 = 2.0<br><b>Molar mass = 74.1 g/mol</b></div>
      <div class="tip">The subscript after a parenthesis multiplies <b>everything</b> inside. In Ca(OH)<sub>2</sub> there are 2 O and 2 H.</div>
      <div class="br"><button class="btn bt" onclick="go(0,'Ca(OH)2')">Try it in the Molar Mass calculator</button></div>
      <p class="hint">Your class may round atomic masses (for example O = 16, H = 1). Small differences in the last decimal place are normal.</p>` },
    { t: 'Mole conversions', h: `
      <h2>Converting between grams, moles and particles</h2>
      <figure>${FIG6.map}</figure>
      <div class="key">moles = given mass &divide; molar mass</div>
      <div class="steps"><div class="st">Example 1: grams to moles</div>How many moles are in 36.0 g of H<sub>2</sub>O (molar mass 18.0 g/mol)?<br>36.0 g &divide; 18.0 g/mol = <b>2.00 mol</b></div>
      <div class="steps"><div class="st">Example 2: moles to grams</div>What is the mass of 0.500 mol of NaCl (58.4 g/mol)?<br>0.500 mol &times; 58.4 g/mol = <b>29.2 g</b></div>
      <div class="steps"><div class="st">Example 3: moles to particles</div>How many molecules are in 2.00 mol of CO<sub>2</sub>?<br>2.00 &times; 6.02 &times; 10<sup>23</sup> = <b>1.20 &times; 10<sup>24</sup> molecules</b></div>
      <h3>Gas volume at STP</h3>
      <p>At STP (273.15 K and 1 atm), one mole of any ideal gas takes up <b>22.4 L</b>, and real gases come very close. So 44.8 L of O<sub>2</sub> at STP is 2.00 mol.</p><p class="hint">22.4 L is on Reference Table 6.</p>
      <div class="br"><button class="btn bt" onclick="go(0)">Practice conversions</button></div>` },
    { t: 'Percent composition', h: `
      <h2>Percent composition</h2>
      <div class="key">% composition by mass = (mass of part &divide; mass of whole) &times; 100</div>
      <div class="steps"><div class="st">Example: percent oxygen in H<sub>2</sub>O</div>Mass of O = 16.0; molar mass of H<sub>2</sub>O = 18.0<br>(16.0 &divide; 18.0) &times; 100 = <b>88.9% O</b>, and the rest, 11.1%, is H.</div>
      <h3>Hydrates</h3>
      <p>A <b>hydrate</b> is an ionic compound with water molecules built into its crystal, written with a dot: CuSO<sub>4</sub>&middot;5H<sub>2</sub>O. Heating it drives the water off, leaving the <b>anhydrous</b> compound.</p>
      <div class="steps"><div class="st">Example: percent water in CuSO<sub>4</sub>&middot;5H<sub>2</sub>O</div>
        Molar mass of hydrate = 63.5 + 32.1 + 4(16.0) + 5(18.0) = 249.6 g/mol. Mass of water = 5 &times; 18.0 = 90.0 g<br>(90.0 &divide; 249.6) &times; 100 = <b>36.1% water</b></div>
      <div class="steps"><div class="st">Lab version</div>A 5.00 g hydrate sample weighs 3.20 g after heating. Water lost = 1.80 g.<br>(1.80 &divide; 5.00) &times; 100 = <b>36.0% water</b></div>
      <div class="br"><button class="btn bt" onclick="go(0,'CuSO4*5H2O')">See the % breakdown of CuSO<sub>4</sub>&middot;5H<sub>2</sub>O</button></div>` },
    { t: 'Empirical & molecular formulas', h: `
      <h2>Empirical and molecular formulas</h2>
      <ul><li><b>Molecular formula:</b> the actual number of atoms in a molecule. Glucose is C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>.</li>
        <li><b>Empirical formula:</b> the simplest whole-number ratio of atoms. Glucose's is CH<sub>2</sub>O.</li>
        <li>Ionic compounds are usually written as empirical formulas (NaCl, MgO).</li></ul>
      <h3>Finding an empirical formula from percents</h3>
      <ol><li>Assume 100 g, so each percent becomes grams.</li>
        <li>Convert grams to moles for each element.</li>
        <li>Divide every mole value by the smallest one.</li>
        <li>If you get a ratio like 1.5 or 1.33, multiply everything by 2 or 3 to make whole numbers.</li></ol>
      <div class="steps"><div class="st">Example</div>A compound is 40.0% C, 6.7% H and 53.3% O.<br>
        C: 40.0 &divide; 12.0 = 3.33 mol &nbsp;&middot;&nbsp; H: 6.7 &divide; 1.0 = 6.7 mol &nbsp;&middot;&nbsp; O: 53.3 &divide; 16.0 = 3.33 mol<br>
        Divide by 3.33: C 1, H 2, O 1, giving <b>CH<sub>2</sub>O</b></div>
      <h3>From empirical to molecular</h3>
      <div class="key">multiplier = molar mass of compound &divide; empirical formula mass</div>
      <p>If the compound above has a molar mass of 180 g/mol: CH<sub>2</sub>O is 30.0 g/mol, and 180 &divide; 30.0 = 6, so the molecular formula is <b>C<sub>6</sub>H<sub>12</sub>O<sub>6</sub></b>.</p>
      <div class="br"><button class="btn bt" onclick="go(7)">Open the Empirical Formula calculator</button></div>` },
    { t: 'Stoichiometry', h: `
      <h2>Stoichiometry: using balanced equations</h2>
      <p>The <b>coefficients</b> in a balanced equation give the <b>mole ratio</b> between any two substances.</p>
      <div class="steps"><div class="st">Reading an equation</div>2H<sub>2</sub> + O<sub>2</sub> &rarr; 2H<sub>2</sub>O means 2 mol H<sub>2</sub> react with 1 mol O<sub>2</sub> to make 2 mol H<sub>2</sub>O.</div>
      <h3>Mole-to-mole problems</h3>
      <div class="key">moles wanted = moles given &times; (coefficient of wanted &divide; coefficient of given)</div>
      <div class="steps"><div class="st">Example</div>N<sub>2</sub> + 3H<sub>2</sub> &rarr; 2NH<sub>3</sub>. How many moles of NH<sub>3</sub> form from 6.0 mol H<sub>2</sub>?<br>6.0 mol H<sub>2</sub> &times; (2 NH<sub>3</sub> / 3 H<sub>2</sub>) = <b>4.0 mol NH<sub>3</sub></b></div>
      <h3>Mass-to-mass problems</h3>
      <p>Grams of A &rarr; moles of A &rarr; (mole ratio) &rarr; moles of B &rarr; grams of B.</p>
      <div class="steps"><div class="st">Example</div>2H<sub>2</sub> + O<sub>2</sub> &rarr; 2H<sub>2</sub>O. What mass of water forms from 4.0 g of H<sub>2</sub>?<br>
        4.0 g &divide; 2.0 g/mol = 2.0 mol H<sub>2</sub><br>2.0 mol H<sub>2</sub> &times; (2 H<sub>2</sub>O / 2 H<sub>2</sub>) = 2.0 mol H<sub>2</sub>O<br>2.0 mol &times; 18.0 g/mol = <b>36 g H<sub>2</sub>O</b></div>
      <div class="tip">The equation <b>must be balanced</b> first, or the mole ratio will be wrong.</div>
      <div class="br"><button class="btn bt" onclick="go(8)">Open the Stoichiometry calculator</button></div>` },
    { t: 'Limiting reactant & % yield', h: `
      <h2>Limiting reactant and percent yield</h2>
      <p>Reactions rarely start with the perfect ratio. The <b>limiting reactant</b> runs out first and decides how much product can form. The other reactant is <b>in excess</b>, and some of it is left over.</p>
      <h3>Finding the limiting reactant</h3>
      <ol><li>Convert each reactant to moles.</li><li>For each one, calculate how much product it <i>could</i> make.</li><li>The reactant that makes <b>less</b> product is the limiting reactant.</li></ol>
      <div class="steps"><div class="st">Example</div>2H<sub>2</sub> + O<sub>2</sub> &rarr; 2H<sub>2</sub>O with 4.0 mol H<sub>2</sub> and 3.0 mol O<sub>2</sub>.<br>
        From H<sub>2</sub>: 4.0 &times; (2/2) = 4.0 mol H<sub>2</sub>O &nbsp;&middot;&nbsp; From O<sub>2</sub>: 3.0 &times; (2/1) = 6.0 mol H<sub>2</sub>O<br>
        <b>H<sub>2</sub> is limiting</b>, so 4.0 mol H<sub>2</sub>O can form. O<sub>2</sub> used = 2.0 mol, leaving 1.0 mol O<sub>2</sub> in excess.</div>
      <h3>Percent yield</h3>
      <ul><li><b>Theoretical yield:</b> the maximum amount calculated from stoichiometry.</li><li><b>Actual yield:</b> what you really collect in the lab.</li></ul>
      <div class="key">% yield = (actual yield &divide; theoretical yield) &times; 100</div>
      <div class="steps"><div class="st">Example</div>The theoretical yield is 36.0 g, and you collect 30.6 g. (30.6 &divide; 36.0) &times; 100 = <b>85.0%</b></div>
      <div class="br"><button class="btn bt" onclick="go(8)">Try a limiting-reactant problem</button></div>` }
  ],
  quiz: [
    { q: 'What is the molar mass of CO<sub>2</sub>?', o: ['28.0 g/mol', '32.0 g/mol', '44.0 g/mol', '56.0 g/mol'], a: 2, x: 'C (12.0) + 2 O (2 &times; 16.0 = 32.0) = 44.0 g/mol.' },
    { q: 'How many moles are in 80.0 g of NaOH (40.0 g/mol)?', o: ['0.500 mol', '2.00 mol', '40.0 mol', '3200 mol'], a: 1, x: 'moles = mass &divide; molar mass = 80.0 &divide; 40.0 = 2.00 mol.' },
    { q: 'One mole of any substance contains:', o: ['6.02 &times; 10<sup>23</sup> particles', '22.4 particles', '1 gram', '12 particles'], a: 0, x: 'Avogadro\'s number: 6.02 &times; 10<sup>23</sup> particles per mole.' },
    { q: 'What volume does 0.500 mol of a gas occupy at STP?', o: ['5.60 L', '11.2 L', '22.4 L', '44.8 L'], a: 1, x: '0.500 mol &times; 22.4 L/mol = 11.2 L.' },
    { q: 'What is the percent by mass of hydrogen in H<sub>2</sub>O (18.0 g/mol)?', o: ['5.6%', '11.1%', '33.3%', '88.9%'], a: 1, x: 'Mass of H = 2 &times; 1.0 = 2.0. (2.0 &divide; 18.0) &times; 100 = 11.1%.' },
    { q: 'Which is an empirical formula?', o: ['C<sub>2</sub>H<sub>4</sub>', 'C<sub>6</sub>H<sub>6</sub>', 'H<sub>2</sub>O<sub>2</sub>', 'CH<sub>2</sub>O'], a: 3, x: 'CH<sub>2</sub>O cannot be reduced further. C<sub>2</sub>H<sub>4</sub> reduces to CH<sub>2</sub>, C<sub>6</sub>H<sub>6</sub> to CH, and H<sub>2</sub>O<sub>2</sub> to HO.' },
    { q: 'A compound has the empirical formula CH<sub>2</sub> and a molar mass of 56 g/mol. Its molecular formula is:', o: ['CH<sub>2</sub>', 'C<sub>2</sub>H<sub>4</sub>', 'C<sub>3</sub>H<sub>6</sub>', 'C<sub>4</sub>H<sub>8</sub>'], a: 3, x: 'CH<sub>2</sub> = 14 g/mol. 56 &divide; 14 = 4, so multiply by 4: C<sub>4</sub>H<sub>8</sub>.' },
    { q: 'In N<sub>2</sub> + 3H<sub>2</sub> &rarr; 2NH<sub>3</sub>, how many moles of H<sub>2</sub> are needed to make 4 mol NH<sub>3</sub>?', o: ['2 mol', '3 mol', '4 mol', '6 mol'], a: 3, x: '4 mol NH<sub>3</sub> &times; (3 H<sub>2</sub> / 2 NH<sub>3</sub>) = 6 mol H<sub>2</sub>.' },
    { q: 'In 2H<sub>2</sub> + O<sub>2</sub> &rarr; 2H<sub>2</sub>O, if 5 mol H<sub>2</sub> react with 2 mol O<sub>2</sub>, the limiting reactant is:', o: ['H<sub>2</sub>', 'O<sub>2</sub>', 'H<sub>2</sub>O', 'neither'], a: 1, x: '2 mol O<sub>2</sub> needs 4 mol H<sub>2</sub>, and there are 5, so H<sub>2</sub> is in excess. O<sub>2</sub> runs out first.' },
    { q: 'A reaction\'s theoretical yield is 50.0 g, but 40.0 g is collected. The percent yield is:', o: ['20.0%', '80.0%', '90.0%', '125%'], a: 1, x: '(40.0 &divide; 50.0) &times; 100 = 80.0%.' }
  ]
};
