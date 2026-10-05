/* Catalyst - Unit 3: Formulas & Equations. */
'use strict';
const FIG3 = {
  ions: SV.wrap(560, 150, 'Sodium loses an electron and chlorine gains one',
    SV.atom(60, 50, 'Na', ['r1']) + SV.arrow(84, 50, 150, 50, '#0FA89B') + SV.t(225, 56, 'Na<tspan baseline-shift="super" font-size="12">+</tspan>', 'sv-a') +
    SV.t(130, 92, 'loses 1 e⁻ → 2-8 (stable octet)', 'sv-s') +
    SV.atom(340, 50, 'Cl', ['t', 'r', 'b', 'l1']) + SV.arrow(366, 50, 430, 50, '#0FA89B') + SV.t(495, 56, '[Cl]<tspan baseline-shift="super" font-size="12">−</tspan>', 'sv-a') +
    SV.t(420, 92, 'gains 1 e⁻ → 2-8-8 (stable octet)', 'sv-s') +
    SV.t(280, 135, 'Metals lose electrons (positive ions). Nonmetals gain electrons (negative ions).', 'sv-s')),
  types: (function () {
    const rows = [
      ['Synthesis', 'A + B → AB', '2Na + Cl₂ → 2NaCl'],
      ['Decomposition', 'AB → A + B', '2H₂O → 2H₂ + O₂'],
      ['Single replacement', 'A + BC → AC + B', 'Zn + 2HCl → ZnCl₂ + H₂'],
      ['Double replacement', 'AB + CD → AD + CB', 'AgNO₃ + NaCl → AgCl + NaNO₃'],
      ['Combustion', 'fuel + O₂ → CO₂ + H₂O', 'CH₄ + 2O₂ → CO₂ + 2H₂O']];
    let s = '';
    rows.forEach((r, i) => {
      const y = 22 + i * 46;
      s += '<rect x="6" y="' + (y - 16) + '" width="608" height="38" rx="8" fill="' + (i % 2 ? '#fff' : '#F3F0FC') + '" stroke="#E6E0F8"/>' +
        '<text class="sv-t" x="20" y="' + (y + 8) + '" style="text-anchor:start">' + r[0] + '</text>' +
        '<text class="sv-t" x="190" y="' + (y + 8) + '" style="text-anchor:start;fill:#5B3FD0">' + r[1] + '</text>' +
        '<text class="sv-s" x="400" y="' + (y + 8) + '" style="text-anchor:start;font-size:13px;fill:#22145A">' + r[2] + '</text>';
    });
    return SV.wrap(620, 236, 'Five types of chemical reactions', s);
  })()
};

LESSONS.u3 = {
  sections: [
    { t: 'Ions & charges', h: `
      <h2>Ions and their charges</h2>
      <p>An <b>ion</b> is an atom (or group of atoms) with a charge, because it has gained or lost electrons. Atoms do this to reach a <b>stable octet</b>, the same electron arrangement as a noble gas.</p>
      <figure>${FIG3.ions}</figure>
      <ul><li><b>Cation (positive ion):</b> formed when an atom <b>loses</b> electrons. Metals form cations: Na<sup>+</sup>, Mg<sup>2+</sup>, Al<sup>3+</sup>.</li>
        <li><b>Anion (negative ion):</b> formed when an atom <b>gains</b> electrons. Nonmetals form anions: Cl<sup>&minus;</sup>, O<sup>2&minus;</sup>, N<sup>3&minus;</sup>.</li></ul>
      <p>The 2025 Reference Tables don't list charges, so predict them from the element's <b>group</b> (how many electrons it needs to lose or gain to reach an octet):</p>
      <table class="tbl"><tr><th>Group</th><th>1</th><th>2</th><th>13</th><th>15</th><th>16</th><th>17</th><th>18</th></tr>
        <tr><td>Common charge</td><td>+1</td><td>+2</td><td>+3</td><td>&minus;3</td><td>&minus;2</td><td>&minus;1</td><td>0</td></tr></table>
      <h3>Polyatomic ions</h3>
      <p>A <b>polyatomic ion</b> is a group of atoms that stays together and carries a charge. Reference Table 4 (Selected Ions Forming Aqueous Solutions) lists several, such as ammonium, acetate, nitrate and hydrogen carbonate. Some you will see constantly:</p>
      <table class="tbl"><tr><th>Ion</th><th>Name</th><th>Ion</th><th>Name</th></tr>
        <tr><td>NH<sub>4</sub><sup>+</sup></td><td>ammonium</td><td>OH<sup>&minus;</sup></td><td>hydroxide</td></tr>
        <tr><td>NO<sub>3</sub><sup>&minus;</sup></td><td>nitrate</td><td>SO<sub>4</sub><sup>2&minus;</sup></td><td>sulfate</td></tr>
        <tr><td>CO<sub>3</sub><sup>2&minus;</sup></td><td>carbonate</td><td>PO<sub>4</sub><sup>3&minus;</sup></td><td>phosphate</td></tr>
        <tr><td>HCO<sub>3</sub><sup>&minus;</sup></td><td>hydrogen carbonate</td><td>C<sub>2</sub>H<sub>3</sub>O<sub>2</sub><sup>&minus;</sup></td><td>acetate</td></tr></table>` },
    { t: 'Writing formulas', h: `
      <h2>Writing chemical formulas</h2>
      <p>An ionic compound is <b>neutral</b>: the total positive charge equals the total negative charge. Subscripts show how many of each ion it takes.</p>
      <h3>The criss-cross method</h3>
      <ol><li>Write the positive ion first, then the negative ion, with their charges.</li>
        <li>Cross the <i>number</i> of each charge down to become the other ion's subscript.</li>
        <li>Reduce to the lowest whole-number ratio, and drop any 1s.</li></ol>
      <div class="steps"><div class="st">Examples</div>
        Al<sup>3+</sup> and O<sup>2&minus;</sup> &rarr; Al<sub>2</sub>O<sub>3</sub> &nbsp;(2 &times; +3 = +6, 3 &times; &minus;2 = &minus;6)<br>
        Ca<sup>2+</sup> and Cl<sup>&minus;</sup> &rarr; <b>CaCl<sub>2</sub></b><br>
        Mg<sup>2+</sup> and O<sup>2&minus;</sup> &rarr; Mg<sub>2</sub>O<sub>2</sub> &rarr; reduce &rarr; <b>MgO</b><br>
        Ca<sup>2+</sup> and OH<sup>&minus;</sup> &rarr; <b>Ca(OH)<sub>2</sub></b>. Use parentheses when you need more than one polyatomic ion.</div>
      <div class="tip"><b>Common mistake:</b> never change the formula of a polyatomic ion. Two nitrates are (NO<sub>3</sub>)<sub>2</sub>, not N<sub>2</sub>O<sub>6</sub>.</div>
      <h3>Diatomic elements</h3>
      <p>Seven elements exist as two-atom molecules when they are on their own: <b>H<sub>2</sub>, N<sub>2</sub>, O<sub>2</sub>, F<sub>2</sub>, Cl<sub>2</sub>, Br<sub>2</sub>, I<sub>2</sub></b>. A memory trick is "<b>BrINClHOF</b>" (say it "brinkle-hoff").</p>` },
    { t: 'Naming compounds', h: `
      <h2>Naming compounds</h2>
      <h3>Ionic compounds (metal + nonmetal)</h3>
      <ul><li>Name the metal, then the nonmetal with its ending changed to <b>-ide</b>: NaCl is sodium chlor<b>ide</b>, and CaO is calcium ox<b>ide</b>.</li>
        <li>With a polyatomic ion, use the ion's name as-is: NaNO<sub>3</sub> is sodium nitrate, and NH<sub>4</sub>Cl is ammonium chloride.</li></ul>
      <h3>Metals with more than one charge (Stock system)</h3>
      <p>Many transition metals have more than one possible charge. A <b>Roman numeral</b> in parentheses gives the charge used in that compound.</p>
      <div class="steps"><div class="st">Example</div>FeCl<sub>3</sub>: 3 Cl<sup>&minus;</sup> make &minus;3, so iron must be +3, giving <b>iron(III) chloride</b>.<br>FeO: O is &minus;2, so iron is +2, giving <b>iron(II) oxide</b>.<br>CuSO<sub>4</sub>: sulfate is &minus;2, so copper is +2, giving <b>copper(II) sulfate</b>.</div>
      <h3>Molecular compounds (two nonmetals)</h3>
      <p>Use prefixes to show how many atoms of each element. Skip "mono-" on the first element.</p>
      <table class="tbl"><tr><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th></tr>
        <tr><td>mono</td><td>di</td><td>tri</td><td>tetra</td><td>penta</td><td>hexa</td><td>hepta</td><td>octa</td><td>nona</td><td>deca</td></tr></table>
      <p>CO<sub>2</sub> is carbon <b>di</b>oxide, CO is carbon <b>mon</b>oxide, N<sub>2</sub>O<sub>4</sub> is <b>di</b>nitrogen <b>tetr</b>oxide, and PCl<sub>5</sub> is phosphorus <b>penta</b>chloride.</p>
      <div class="key"><b>Quick test:</b> does the compound start with a metal, or with ammonium (NH<sub>4</sub><sup>+</sup>)? Use ionic naming, with no prefixes. Two nonmetals? Use prefixes.</div>` },
    { t: 'Balancing equations', h: `
      <h2>Chemical equations and balancing</h2>
      <p>A chemical equation shows <b>reactants &rarr; products</b>. Because of the <b>Law of Conservation of Mass</b>, atoms are never created or destroyed: every atom on the left must appear on the right.</p>
      <ul><li><b>Coefficients</b> (big numbers in front) tell how many molecules or moles. You may change these.</li>
        <li><b>Subscripts</b> are part of the formula. Never change them to balance an equation, because that would change the substance.</li>
        <li>Phase labels: (s) solid, (&ell;) liquid, (g) gas, (aq) aqueous, meaning dissolved in water.</li></ul>
      <h3>Strategy</h3>
      <ol><li>Count the atoms of each element on both sides.</li>
        <li>Balance elements that appear in only one compound on each side first. Save H and O, and free elements like O<sub>2</sub>, for last.</li>
        <li>Treat a polyatomic ion that appears unchanged on both sides as a single unit.</li>
        <li>Re-count everything, and reduce to the lowest whole-number ratio.</li></ol>
      <div class="steps"><div class="st">Worked example</div>
        __ Fe + __ O<sub>2</sub> &rarr; __ Fe<sub>2</sub>O<sub>3</sub><br>
        O: 2 on the left, 3 on the right. The LCM is 6, so use 3 O<sub>2</sub> and 2 Fe<sub>2</sub>O<sub>3</sub>.<br>
        Fe: now 4 on the right, so 4 Fe on the left.<br><b>4Fe + 3O<sub>2</sub> &rarr; 2Fe<sub>2</sub>O<sub>3</sub></b> &nbsp;(Fe 4 = 4, O 6 = 6 &check;)</div>
      <div class="br"><button class="btn bt" onclick="go(1)">Check your work with the Equation Balancer</button></div>` },
    { t: 'Types of reactions', h: `
      <h2>Types of chemical reactions</h2>
      <figure>${FIG3.types}</figure>
      <ul><li><b>Synthesis:</b> two or more substances combine into one product.</li>
        <li><b>Decomposition:</b> one compound breaks down into simpler substances (usually requires energy).</li>
        <li><b>Single replacement:</b> a free element replaces another element in a compound. A more active metal replaces a less active one, and a more active halogen replaces a less active one. When you need an activity series, the problem or your teacher will provide it (it is not on the 2025 Reference Tables).</li>
        <li><b>Double replacement:</b> two compounds swap partners. Often a precipitate (solid), a gas, or water forms.</li>
        <li><b>Combustion:</b> a substance reacts with oxygen. When a hydrocarbon burns completely, the products are CO<sub>2</sub> and H<sub>2</sub>O.</li></ul>
      <div class="tip"><b>How to identify the type:</b> first check for combustion: a fuel plus O<sub>2</sub> making CO<sub>2</sub> and H<sub>2</sub>O. Then: one compound alone breaking apart is decomposition. Two or more reactants making one product is synthesis. An element plus a compound making a different element plus a compound is single replacement. Two compounds swapping partners is double replacement.</div>` }
  ],
  quiz: [
    { q: 'What is the correct formula for aluminum oxide?', o: ['AlO', 'Al<sub>2</sub>O<sub>3</sub>', 'Al<sub>3</sub>O<sub>2</sub>', 'AlO<sub>3</sub>'], a: 1, x: 'Al<sup>3+</sup> and O<sup>2&minus;</sup>: two Al (+6) balance three O (&minus;6), giving Al<sub>2</sub>O<sub>3</sub>.' },
    { q: 'An atom of magnesium becomes an ion by:', o: ['gaining 2 electrons to form Mg<sup>2&minus;</sup>', 'losing 2 electrons to form Mg<sup>2+</sup>', 'losing 2 protons', 'gaining 2 protons'], a: 1, x: 'Metals lose electrons. Magnesium (2-8-2) loses its 2 valence electrons to reach 2-8, forming Mg<sup>2+</sup>. Protons never change in a chemical reaction.' },
    { q: 'What is the name of FeCl<sub>3</sub>?', o: ['iron chloride', 'iron(II) chloride', 'iron(III) chloride', 'iron trichloride'], a: 2, x: 'Three Cl<sup>&minus;</sup> give &minus;3, so Fe is +3: iron(III) chloride. Prefixes like "tri" are only for compounds of two nonmetals.' },
    { q: 'What is the name of N<sub>2</sub>O<sub>5</sub>?', o: ['nitrogen oxide', 'dinitrogen pentoxide', 'nitrogen(V) oxide', 'pentanitrogen dioxide'], a: 1, x: 'Both elements are nonmetals, so use prefixes: di + nitrogen, pent(a) + oxide.' },
    { q: 'Which formula is correct for calcium hydroxide?', o: ['CaOH', 'CaOH<sub>2</sub>', 'Ca(OH)<sub>2</sub>', 'Ca<sub>2</sub>OH'], a: 2, x: 'Ca<sup>2+</sup> needs two OH<sup>&minus;</sup> ions. The parentheses show that the whole hydroxide group is doubled.' },
    { q: 'When __CH<sub>4</sub> + __O<sub>2</sub> &rarr; __CO<sub>2</sub> + __H<sub>2</sub>O is balanced with smallest whole numbers, the coefficient of O<sub>2</sub> is:', o: ['1', '2', '3', '4'], a: 1, x: 'CH<sub>4</sub> + 2O<sub>2</sub> &rarr; CO<sub>2</sub> + 2H<sub>2</sub>O. There are 4 O on the right (2 in CO<sub>2</sub> + 2 in 2H<sub>2</sub>O), so 2 O<sub>2</sub>.' },
    { q: 'Zn + 2HCl &rarr; ZnCl<sub>2</sub> + H<sub>2</sub> is an example of:', o: ['synthesis', 'decomposition', 'single replacement', 'double replacement'], a: 2, x: 'A free element (Zn) replaces hydrogen in a compound.' },
    { q: 'Which element exists as a diatomic molecule?', o: ['Neon', 'Sodium', 'Bromine', 'Carbon'], a: 2, x: 'Bromine is one of the seven diatomic elements (BrINClHOF): Br<sub>2</sub>.' },
    { q: 'Why can\'t you change subscripts when balancing an equation?', o: ['It would break the Law of Conservation of Mass', 'It changes the identity of the substance', 'Subscripts must always be 1', 'Only coefficients can be odd numbers'], a: 1, x: 'H<sub>2</sub>O is water, but H<sub>2</sub>O<sub>2</sub> is hydrogen peroxide. Changing a subscript makes a different chemical.' },
    { q: 'AgNO<sub>3</sub> + NaCl &rarr; AgCl + NaNO<sub>3</sub> is which type of reaction?', o: ['synthesis', 'single replacement', 'double replacement', 'combustion'], a: 2, x: 'Two compounds swap partners: Ag pairs with Cl and Na pairs with NO<sub>3</sub>. The AgCl forms as a solid precipitate.' }
  ]
};
