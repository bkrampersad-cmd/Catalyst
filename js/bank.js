/* Catalyst - Test Prep question bank (unit test Thu Oct 22, 2026).
   44 multiple-choice items, 2 per topic tag (primary tag first). Each item stands on its own;
   items with a stimulus carry their own ctx. EN values are the Pauling values from the Lesson 8 chart. */
'use strict';
const BANK = [
  // ---------- aem: atoms / elements / molecules ----------
  { id: 'b01', tp: ['aem'],
    q: `Ribose, C₅H₁₀O₅, is a sugar found in RNA, one of the molecules scientists look for in the search for life. Which statement correctly describes <b>one molecule</b> of ribose?`,
    o: [`It is made of 3 atoms, one for each element`, `It is made of 20 atoms of 3 different elements`, `It is made of 20 molecules of 3 different elements`, `It is made of 20 different elements bonded together`],
    a: 1,
    x: `Add the subscripts: 5 C + 10 H + 5 O = <b>20 atoms</b>, and there are <b>3 elements</b> (C, H, O). An element is a <i>type</i> of atom, so 3 elements can make up many atoms. The tempting "20 molecules" is wrong because the C, H and O pieces are <b>atoms</b>; the whole bonded unit is the one molecule.` },

  { id: 'b02', tp: ['aem'],
    q: `A space telescope detects helium (He), oxygen (O₂) and water vapor (H₂O) in the atmosphere of a distant planet. Which row classifies these three substances correctly?`,
    o: [`He: a single atom, O₂: a molecule of one element, H₂O: a molecule of two elements`, `He: a single atom, O₂: a molecule of two elements, H₂O: a molecule of three elements`, `He: a molecule of one element, O₂: a single atom, H₂O: a molecule of two elements`, `He: a single atom, O₂: two oxygen molecules, H₂O: a molecule of two elements`],
    a: 0,
    x: `Helium exists as <b>single atoms</b>. O₂ is <b>one molecule</b> made of 2 oxygen <b>atoms</b>, all of <b>one element</b>. H₂O is one molecule made of 3 atoms (2 H, 1 O) but only <b>2 elements</b>. The tempting mistake is counting atoms as elements ("O₂ has two elements"): an element is a <i>type</i> of atom, so two oxygen atoms are still one element. Calling O₂ "two oxygen molecules" mixes up atoms and molecules.` },

  // ---------- iso: isotopes ----------
  { id: 'b03', tp: ['iso', 'sub'],
    ctx: `<h3>Magnesium in Meteorites</h3><p>Magnesium ions sit at the center of chlorophyll, the molecule plants use to capture light. Scientists compare the magnesium isotopes in meteorites with those on Earth to learn how the early solar system formed. Every magnesium atom has atomic number 12.</p><table class="tbl"><tr><th>Isotope</th><th>Mass number</th><th>Natural abundance (%)</th></tr><tr><td>Mg-24</td><td class="n">24</td><td class="n">78.99</td></tr><tr><td>Mg-25</td><td class="n">25</td><td class="n">10.00</td></tr><tr><td>Mg-26</td><td class="n">26</td><td class="n">11.01</td></tr></table>`,
    q: `How many neutrons are in one atom of the <b>least</b> abundant magnesium isotope in the table?`,
    o: [`12`, `13`, `14`, `25`],
    a: 1,
    x: `The least abundant isotope is <b>Mg-25</b> (10.00%). Neutrons = mass number − atomic number = 25 − 12 = <b>13</b>. 14 is the count for Mg-26 (the 11.01% isotope, easy to misread as the smallest), and 25 is the mass number, which counts protons <i>plus</i> neutrons.` },

  { id: 'b04', tp: ['iso', 'sub'],
    q: `Which pair of particles are <b>isotopes</b> of the same element?`,
    o: [`argon-40 and potassium-40`, `a sodium atom and a sodium ion, Na⁺`, `nitrogen-14 and carbon-14`, `chlorine-35 and chlorine-37`],
    a: 3,
    x: `Isotopes have the <b>same number of protons</b> (same element) but a <b>different number of neutrons</b>, so different mass numbers. Chlorine-35 and chlorine-37 both have 17 protons, with 18 and 20 neutrons. Argon-40 and potassium-40 are tempting because the mass numbers match, but they have 18 and 19 protons, so they are different elements. Na and Na⁺ differ in <b>electrons</b>, which makes an ion, not an isotope.` },

  // ---------- water: properties of water ----------
  { id: 'b05', tp: ['water'],
    ctx: `<h3>How Much Dissolves?</h3><p>Water carries dissolved nutrients and salts to every cell, so scientists measure <b>solubility</b>: the maximum amount of a substance that can dissolve in a given amount of water at a set temperature.</p><table class="tbl"><tr><th>Substance</th><th>Grams that dissolve in 100 g of water at 20 °C</th></tr><tr><td>Sucrose (table sugar)</td><td class="n">204</td></tr><tr><td>Sodium chloride (NaCl)</td><td class="n">36</td></tr><tr><td>Potassium chloride (KCl)</td><td class="n">34</td></tr><tr><td>Mineral oil</td><td class="n">0 (does not mix)</td></tr></table>`,
    q: `A student stirs 50 g of NaCl into 100 g of water at 20 °C. Based on the table, what happens?`,
    o: [`About 36 g dissolves, and about 14 g stays undissolved at the bottom.`, `All 50 g dissolves, because NaCl is soluble in water.`, `None of it dissolves, because 50 g is more than the solubility.`, `About 14 g dissolves, and about 36 g stays undissolved.`],
    a: 0,
    x: `Solubility is the <b>maximum</b> that can dissolve: 36 g of NaCl per 100 g of water at 20 °C. Once 36 g has dissolved, the water can hold no more, so 50 − 36 = <b>14 g</b> is left at the bottom. "Soluble" doesn't mean "any amount dissolves"; it means some dissolves, up to the limit. The limit doesn't stop the first 36 g from dissolving.` },

  { id: 'b06', tp: ['water', 'ion'],
    ctx: `<h3>Conductivity Station</h3><p>Living cells send signals through watery fluids. A class tested three liquids with a light-bulb conductivity tester.</p><table class="tbl"><tr><th>Liquid tested</th><th>Bulb</th></tr><tr><td>Deionized water</td><td>off</td></tr><tr><td>Sugar dissolved in deionized water</td><td>off</td></tr><tr><td>Table salt dissolved in deionized water</td><td>bright</td></tr></table>`,
    q: `The sugar dissolved completely, yet the bulb stayed off. Which statement best explains this?`,
    o: [`Sugar does not really dissolve in water; it only floats in it.`, `Sugar molecules block the electrons that would carry the current through the water.`, `Sugar dissolves as whole, neutral molecules, so no mobile ions are produced.`, `Sugar water has no electrons, so nothing can carry a current.`],
    a: 2,
    x: `A solution conducts electric current only if it contains <b>mobile ions</b>. Sugar is covalent, so it dissolves as intact neutral molecules and makes no ions. Salt breaks apart into Na⁺ and Cl⁻ ions, which carry the current. The "electrons" choices are tempting but wrong: in a solution the current is carried by moving ions, not free-flowing electrons (and every substance contains electrons).` },

  // ---------- sub: subatomic particles ----------
  { id: 'b07', tp: ['sub'],
    q: `Which row correctly describes a neutral atom of bromine-81 (atomic number 35)?`,
    o: [`Protons: 35, Neutrons: 81, Electrons: 35`, `Protons: 35, Neutrons: 35, Electrons: 46`, `Protons: 35, Neutrons: 46, Electrons: 35`, `Protons: 46, Neutrons: 35, Electrons: 46`],
    a: 2,
    x: `Protons = atomic number = <b>35</b>. Neutral means protons = electrons, so <b>35 electrons</b>. Neutrons = mass number − atomic number = 81 − 35 = <b>46</b>. The row with 46 electrons swaps the electron and neutron counts, and 81 is the mass number (protons + neutrons), not the neutron count.` },

  { id: 'b08', tp: ['sub', 'iso'],
    q: `An atom contains 9 protons, 10 neutrons and 9 electrons. Which row gives its atomic number and mass number?`,
    o: [`Atomic number: 19, Mass number: 9`, `Atomic number: 10, Mass number: 19`, `Atomic number: 9, Mass number: 18`, `Atomic number: 9, Mass number: 19`],
    a: 3,
    x: `<b>Atomic number = protons = 9</b> (this atom is fluorine). <b>Mass number = protons + neutrons</b> = 9 + 10 = <b>19</b>. Electrons have almost no mass (0 amu), so they are not counted in the mass number (that is why 18 is wrong). The first row swaps the two numbers.` },

  // ---------- ion: ions / electrolytes ----------
  { id: 'b09', tp: ['ion', 'water'],
    ctx: `<h3>Testing an Ocean World</h3><p>Saturn's moon Enceladus sprays salty water from an ocean under its ice. To prepare instruments for a future mission, students tested four samples with a conductivity tester.</p><table class="tbl"><tr><th>Sample</th><th>Contents</th><th>Bulb</th></tr><tr><td>1</td><td>Distilled water</td><td>off</td></tr><tr><td>2</td><td>Solid KCl crystals</td><td>off</td></tr><tr><td>3</td><td>KCl dissolved in distilled water</td><td>bright</td></tr><tr><td>4</td><td>Glucose dissolved in distilled water</td><td>off</td></tr></table>`,
    q: `Why does sample 3 light the bulb while sample 2 does not?`,
    o: [`In sample 3 the K⁺ and Cl⁻ ions are free to move, so they can carry electric current.`, `Dissolving KCl releases free electrons that flow through the water.`, `Solid KCl contains no ions until it touches water.`, `Water molecules turn into ions when KCl is added.`],
    a: 0,
    x: `Solid KCl <b>is</b> made of K⁺ and Cl⁻ ions, but they are locked in place in the crystal. Dissolving frees them to move, and these <b>mobile ions</b> carry the current, so KCl is an electrolyte. The free-electron idea is the common trap: electrolytes conduct electric current because their ions move, not because electrons flow through the water.` },

  { id: 'b10', tp: ['ion', 'sub'],
    ctx: `<h3>Particle Counts</h3><table class="tbl"><tr><th>Particle</th><th>Protons</th><th>Neutrons</th><th>Electrons</th></tr><tr><td>W</td><td class="n">11</td><td class="n">12</td><td class="n">10</td></tr><tr><td>X</td><td class="n">17</td><td class="n">18</td><td class="n">18</td></tr><tr><td>Y</td><td class="n">18</td><td class="n">22</td><td class="n">18</td></tr><tr><td>Z</td><td class="n">12</td><td class="n">12</td><td class="n">10</td></tr></table>`,
    q: `Which particle in the table is an <b>anion</b>?`,
    o: [`W`, `X`, `Y`, `Z`],
    a: 1,
    x: `Use protons − electrons = charge. X: 17 − 18 = <b>−1</b>, so X is an anion (a chloride ion, Cl⁻). W (+1) and Z (+2) are cations. Y is tempting because it has more neutrons than protons, but neutrons have no charge: 18 − 18 = 0, so Y is a neutral argon atom.` },

  // ---------- name: ionic formula naming / writing ----------
  { id: 'b11', tp: ['name', 'ionic'],
    q: `Aluminum forms Al³⁺ ions and oxygen forms O²⁻ ions. Which formula and name are correct for the salt they form?`,
    o: [`AlO, aluminum oxide`, `Al₃O₂, aluminum oxide`, `Al₂O₃, aluminum oxygen`, `Al₂O₃, aluminum oxide`],
    a: 3,
    x: `Criss-cross the charges: Al gets the 2 and O gets the 3, giving <b>Al₂O₃</b>. Check by addition: 2(+3) + 3(−2) = +6 − 6 = 0. The metal keeps its name and the nonmetal ends in <b>-ide</b>: aluminum <b>oxide</b>. Al₃O₂ crosses the charges the wrong way, and AlO has a net charge of +1.` },

  { id: 'b12', tp: ['name'],
    q: `Strontium (Group 2) bonds with selenium (Group 16). A student criss-crosses the charges and writes Sr₂Se₂. What is the correct formula and name?`,
    o: [`SrSe, strontium selenide`, `Sr₂Se₂, strontium selenide`, `SrSe₂, strontium selenide`, `SrSe, strontium selenium`],
    a: 0,
    x: `Group 2 forms 2+ ions and Group 16 forms 2− ions. One Sr²⁺ and one Se²⁻ already add to zero, so the ratio is 1:1. Criss-crossing gives Sr₂Se₂, which must be <b>reduced</b> to <b>SrSe</b> (like MgO, not Mg₂O₂). The anion's name ends in <b>-ide</b>: strontium <b>selenide</b>.` },

  // ---------- ionic: ionic bonds ----------
  { id: 'b13', tp: ['ionic', 'pol'],
    q: `Which pair of elements is most likely to form an <b>ionic</b> bond?`,
    o: [`carbon and oxygen`, `hydrogen and fluorine`, `potassium and bromine`, `nitrogen and hydrogen`],
    a: 2,
    x: `Ionic bonds form between a <b>metal and a nonmetal</b>: potassium gives an electron to bromine, making K⁺ and Br⁻. Hydrogen and fluorine is the trap. Their ΔEN is 1.78 (just over 1.7), but H and F are <b>two nonmetals</b>, which always share electrons, so H–F is a very polar <b>covalent</b> bond, not ionic. C–O and N–H are also nonmetal pairs.` },

  { id: 'b14', tp: ['ionic'],
    ctx: `<h3>Melting Points of Some Salts</h3><table class="tbl"><tr><th>Salt</th><th>Ions</th><th>Melting point (°C)</th></tr><tr><td>KCl</td><td>K⁺, Cl⁻</td><td class="n">771</td></tr><tr><td>NaCl</td><td>Na⁺, Cl⁻</td><td class="n">801</td></tr><tr><td>CaO</td><td>Ca²⁺, O²⁻</td><td class="n">2613</td></tr><tr><td>MgO</td><td>Mg²⁺, O²⁻</td><td class="n">2825</td></tr></table>`,
    q: `Which statement best explains why MgO and CaO melt at much higher temperatures than NaCl and KCl?`,
    o: [`MgO and CaO molecules are larger, so they are harder to pull apart.`, `Their ions have charges of 2+ and 2−, so the electrostatic attraction between the ions is stronger.`, `Mg and O share their electrons, which makes a stronger bond than an ionic bond.`, `Their ions carry partial charges (δ+ and δ−) that hold them tightly together.`],
    a: 1,
    x: `Salts are held together by <b>electrostatic (Coulombic) attraction</b> between oppositely charged ions. Bigger charges attract more strongly: 2+ with 2− pulls harder than 1+ with 1−, so more energy is needed to melt MgO and CaO. These ions have <b>full</b> charges, not δ partial charges (δ is for polar covalent molecules), and Mg (a metal) transfers electrons to O; it doesn't share them.` },

  // ---------- bohr: Bohr diagram ----------
  { id: 'b15', tp: ['bohr'],
    q: `Phosphorus, a key element in DNA, has atomic number 15. Which electron arrangement belongs in the Bohr model of a <b>neutral</b> phosphorus atom?`,
    o: [`Shells: 8, 7`, `Shells: 2, 13`, `Shells: 2, 8, 8`, `Shells: 2, 8, 5`],
    a: 3,
    x: `A neutral P atom has 15 electrons. The first shell holds 2, the second holds 8, and the last shell gets what is left: 15 − 10 = <b>5</b>, giving <b>2, 8, 5</b> (5 valence electrons, matching Group 15). 2, 8, 8 has 18 electrons, which is the phosphide ion P³⁻, not the neutral atom. The first shell can never hold more than 2.` },

  { id: 'b16', tp: ['bohr', 'ion'],
    q: `A Bohr model shows a nucleus labeled <b>19 p, 20 n</b> with electrons arranged <b>2, 8, 8</b>. What does it represent?`,
    o: [`a potassium ion, K⁺`, `an argon atom, Ar`, `a neutral potassium atom, K`, `a calcium ion, Ca²⁺`],
    a: 0,
    x: `The number of <b>protons</b> identifies the element: 19 protons is <b>potassium</b>. There are 2 + 8 + 8 = 18 electrons, and 19 − 18 = +1, so it is <b>K⁺</b> (potassium lost its one valence electron). It has argon's electron arrangement, but it is not argon, which has 18 protons. Calcium would need 20 <b>protons</b>; the 20 here is the neutron count.` },

  // ---------- lewis: Lewis dot diagrams (atoms and ions) ----------
  { id: 'b17', tp: ['lewis', 'ion'],
    q: `Which description matches the correct Lewis dot diagram of a sulfide ion, S²⁻?`,
    o: [`S with 6 dots and 2− written next to it, with no brackets`, `S in brackets with no dots, with 2− written outside the brackets`, `S with 8 dots, in brackets, with 2− written outside the brackets`, `S with 8 dots and no brackets, because the extra dots already show the charge`],
    a: 2,
    x: `A sulfur atom has 6 valence electrons. As S²⁻ it has <b>gained 2</b>, so the diagram shows <b>8 dots</b> (a full octet) inside <b>brackets</b> with the <b>2−</b> outside: [:S:]²⁻. "No dots" is the rule for cations like [Mg]²⁺, which <i>lost</i> their valence electrons. Showing 6 dots leaves out the 2 gained electrons.` },

  { id: 'b18', tp: ['lewis', 'covl'],
    q: `Following the rule "one dot on each side before doubling up," which atom's Lewis dot diagram has exactly <b>2 single (unpaired) dots and 2 pairs</b>?`,
    o: [`N`, `O`, `C`, `F`],
    a: 1,
    x: `Oxygen has 6 valence electrons: one dot on each of the 4 sides, then the 5th and 6th pair up, leaving <b>2 pairs and 2 single dots</b>. Those 2 single dots are oxygen's 2 bonding sites (why O bonds to 2 H in water). Nitrogen (5 dots) has 1 pair and 3 singles, carbon (4) has 4 singles, and fluorine (7) has 3 pairs and 1 single.` },

  // ---------- pg: periods / groups ----------
  { id: 'b19', tp: ['pg'],
    q: `Which two elements have the same number of occupied energy levels (shells) but a <b>different</b> number of valence electrons?`,
    o: [`Na and Cl`, `Na and K`, `O and S`, `F and Cl`],
    a: 0,
    x: `Elements in the same <b>period</b> (row) have the same number of shells. Na and Cl are both in Period 3 (3 shells), but Na has 1 valence electron and Cl has 7. The other pairs are each in the same <b>group</b> (column), so they share the same number of valence electrons but have different numbers of shells.` },

  { id: 'b20', tp: ['pg', 'bohr'],
    q: `An element is in <b>Period 4</b> and has <b>2 valence electrons</b>. Which element is it?`,
    o: [`Mg`, `Ca`, `Sr`, `Ge`],
    a: 1,
    x: `Period 4 means 4 shells, and 2 valence electrons means Group 2. The element in Period 4, Group 2 is <b>calcium</b> (Bohr: 2, 8, 8, 2). Mg and Sr are also in Group 2 (2 valence electrons) but are in Periods 3 and 5. Ge is in Period 4 but in Group 14, with 4 valence electrons.` },

  // ---------- metal: properties of metals and nonmetals ----------
  { id: 'b21', tp: ['metal'],
    ctx: `<h3>Rover Sample Report</h3><p>A Mars rover tested four pure elements, W, X, Y and Z, collected near an ancient lakebed.</p><table class="tbl"><tr><th>Element</th><th>Appearance</th><th>Conducts electricity?</th><th>When struck with a hammer</th></tr><tr><td>W</td><td>shiny, silver</td><td>yes, very well</td><td>flattens</td></tr><tr><td>X</td><td>dull yellow powder</td><td>no</td><td>crumbles</td></tr><tr><td>Y</td><td>shiny, gray</td><td>slightly</td><td>shatters</td></tr><tr><td>Z</td><td>colorless gas</td><td>no</td><td>(not a solid)</td></tr></table>`,
    q: `Which element is most likely a <b>metalloid</b>?`,
    o: [`W`, `X`, `Y`, `Z`],
    a: 2,
    x: `Metalloids (B, Si, Ge, As, Sb, Te, on the staircase) have a <b>mix</b> of metal and nonmetal properties. Y is shiny like a metal but brittle like a nonmetal, and it conducts only slightly, just like silicon. W is shiny, malleable and conducts well, so it is a metal. Being shiny alone doesn't make an element a metal; the brittleness and weak conductivity give Y away.` },

  { id: 'b22', tp: ['metal', 'ion'],
    q: `Which statement correctly compares metals and nonmetals?`,
    o: [`Metals tend to gain electrons and form negative ions; nonmetals tend to lose electrons and form positive ions.`, `Metals are usually brittle solids; nonmetals are usually malleable and ductile.`, `Metals have high ionization energy; nonmetals have low ionization energy.`, `Metals tend to lose electrons and form positive ions; nonmetals tend to gain electrons and form negative ions.`],
    a: 3,
    x: `Metals (left side) have <b>low ionization energy</b>, so they lose valence electrons easily and become <b>cations</b> (Na⁺, Mg²⁺). Nonmetals (right side) gain electrons to fill their valence shell and become <b>anions</b> (Cl⁻, O²⁻). The first choice reverses this; the others reverse the physical properties and the ionization energy trend.` },

  // ---------- pol: polar and nonpolar covalent bonding ----------
  { id: 'b23', tp: ['pol', 'en'],
    ctx: `<h3>Electronegativity Values</h3><table class="tbl"><tr><th>Element</th><th>H</th><th>C</th><th>N</th><th>O</th><th>Cl</th></tr><tr><td>Electronegativity</td><td class="n">2.20</td><td class="n">2.55</td><td class="n">3.04</td><td class="n">3.44</td><td class="n">3.16</td></tr></table>`,
    q: `Molecules of life contain many kinds of covalent bonds. Using the table, which bond is the <b>most</b> polar?`,
    o: [`N–H`, `O–H`, `C–O`, `H–Cl`],
    a: 1,
    x: `Find ΔEN = bigger − smaller for each bond. N–H: 3.04 − 2.20 = 0.84. <b>O–H: 3.44 − 2.20 = 1.24</b>. C–O: 3.44 − 2.55 = 0.89. H–Cl: 3.16 − 2.20 = 0.96. The largest difference means the most unequal sharing, so O–H is most polar. H–Cl is tempting because chlorine sounds very electronegative, but oxygen (3.44) pulls harder than chlorine (3.16).` },

  { id: 'b24', tp: ['pol', 'ionic'],
    ctx: `<h3>Electronegativity Values</h3><table class="tbl"><tr><th>Element</th><th>Na</th><th>P</th><th>H</th><th>S</th><th>Cl</th></tr><tr><td>Electronegativity</td><td class="n">0.93</td><td class="n">2.19</td><td class="n">2.20</td><td class="n">2.58</td><td class="n">3.16</td></tr></table><p>Class ranges for ΔEN: 0.0–0.3 nonpolar covalent, 0.4–1.7 polar covalent, greater than 1.7 ionic.</p>`,
    q: `Which row correctly classifies the three bonds?`,
    o: [`P–H: nonpolar covalent, S–Cl: polar covalent, Na–Cl: ionic`, `P–H: polar covalent, S–Cl: polar covalent, Na–Cl: ionic`, `P–H: nonpolar covalent, S–Cl: ionic, Na–Cl: polar covalent`, `P–H: nonpolar covalent, S–Cl: nonpolar covalent, Na–Cl: ionic`],
    a: 0,
    x: `P–H: 2.20 − 2.19 = <b>0.01</b> → nonpolar covalent. S–Cl: 3.16 − 2.58 = <b>0.58</b> → polar covalent. Na–Cl: 3.16 − 0.93 = <b>2.23</b> → ionic (and Na is a metal, Cl a nonmetal). P–H is tempting to call polar because P and H are different elements, but their electronegativities are almost identical, so they share electrons equally.` },

  // ---------- snap: symmetry / polarity of molecules / partial charges ----------
  { id: 'b25', tp: ['snap', 'pol'],
    q: `Each C=O bond in carbon dioxide (O=C=O) is polar, yet CO₂ is a <b>nonpolar</b> molecule. Why?`,
    o: [`Carbon and oxygen have the same electronegativity.`, `CO₂ is an ionic compound, not a molecule.`, `Its linear shape is symmetrical, so the two bond dipoles point in opposite directions and cancel.`, `Its atoms have no partial charges at all.`],
    a: 2,
    x: `<b>Bond polarity ≠ molecular polarity.</b> Each C=O bond is polar (ΔEN 3.44 − 2.55 = 0.89), and the O atoms are δ−. But CO₂ is linear and passes the fold test, so the two equal dipoles pull in opposite directions and cancel. <b>SNAP</b>: Symmetrical = Nonpolar. Saying there are "no partial charges" is wrong: the partial charges exist, they are just evenly balanced.` },

  { id: 'b26', tp: ['snap', 'pol'],
    q: `Hydrogen fluoride (HF) has a ΔEN of 3.98 − 2.20 = 1.78. Which description correctly shows the charges and the dipole arrow for HF?`,
    o: [`δ− on H and δ+ on F, with the arrow pointing toward H`, `H⁺ and F⁻ (full charges), because 1.78 is greater than 1.7`, `δ+ on H and δ− on F, with the arrow pointing toward H and the cross at the F end`, `δ+ on H and δ− on F, with the arrow pointing toward F and the cross at the H end`],
    a: 3,
    x: `Fluorine is more electronegative, so it pulls the shared electrons closer and becomes <b>δ−</b>, leaving H <b>δ+</b>. The dipole arrow points <b>toward the more electronegative atom (F)</b>, with the cross at the δ+ end (H). The full-charge choice is the trap: H and F are two nonmetals, so they <b>share</b> electrons. HF is a very polar covalent bond with partial charges, not ions.` },

  // ---------- imf: intermolecular forces and boiling / melting points ----------
  { id: 'b27', tp: ['imf', 'snap'],
    ctx: `<h3>Boiling Points of Small Molecules</h3><table class="tbl"><tr><th>Substance</th><th>Formula</th><th>Molecular mass (amu)</th><th>Polar or nonpolar</th><th>Boiling point (°C)</th></tr><tr><td>Nitrogen</td><td>N₂</td><td class="n">28.0</td><td>nonpolar</td><td class="n">−196</td></tr><tr><td>Oxygen</td><td>O₂</td><td class="n">32.0</td><td>nonpolar</td><td class="n">−183</td></tr><tr><td>Hydrogen sulfide</td><td>H₂S</td><td class="n">34.1</td><td>polar</td><td class="n">−60</td></tr><tr><td>Water</td><td>H₂O</td><td class="n">18.0</td><td>polar</td><td class="n">100</td></tr></table>`,
    q: `Which conclusion is best supported by the data?`,
    o: [`Polar molecules have stronger intermolecular forces than nonpolar molecules of similar mass, so they boil at higher temperatures.`, `Heavier molecules always have higher boiling points.`, `Nonpolar molecules have the strongest intermolecular forces because their electrons are shared equally.`, `Boiling point does not depend on the attractions between molecules.`],
    a: 0,
    x: `H₂S (34.1 amu) is about as heavy as O₂ (32.0 amu), but because it is <b>polar</b> it boils over 120 °C higher. Stronger IMF → higher boiling point. "Heavier always boils higher" is tempting, but water is the <b>lightest</b> substance in the table and has by far the highest boiling point, thanks to its strong IMF (hydrogen bonding).` },

  { id: 'b28', tp: ['imf'],
    q: `When liquid water boils and becomes steam, what is overcome?`,
    o: [`the covalent bonds between H and O, which splits water into H₂ and O₂ gas`, `the ionic bonds between H⁺ and O²⁻ ions`, `the attractions between neighboring water molecules (intermolecular forces)`, `the attraction between the protons and electrons inside each atom`],
    a: 2,
    x: `Boiling is a <b>physical change</b>: the H₂O molecules stay whole and simply move apart, so only the <b>intermolecular forces</b> (attractions <i>between</i> molecules) are overcome. Steam is still H₂O. Breaking the covalent bonds <i>inside</i> the molecule would be a chemical change producing H₂ and O₂, which boiling does not do. Water is covalent, so it has no H⁺/O²⁻ ions to separate.` },

  // ---------- hb: hydrogen bonding ----------
  { id: 'b29', tp: ['hb'],
    q: `Which substance has <b>hydrogen bonding</b> between its molecules?`,
    o: [`CH₄`, `NH₃`, `HCl`, `H₂S`],
    a: 1,
    x: `Hydrogen bonding happens only when H is bonded directly to <b>F, O or N</b>. In NH₃, H is bonded to N, so NH₃ molecules hydrogen bond. HCl and H₂S are polar, which makes them tempting, but Cl and S are not on the F-O-N list, so their IMF is weaker. In CH₄, H is bonded to C, and the molecule is nonpolar.` },

  { id: 'b30', tp: ['hb', 'imf'],
    ctx: `<h3>Lakes on Titan</h3><p>Saturn's moon Titan has lakes and rivers, but they are made of liquid <b>methane</b> (CH₄), not water. Titan's surface temperature is about −179 °C. Methane melts at −182 °C and boils at −162 °C, while water melts at 0 °C and boils at 100 °C. On Titan, water exists only as rock-hard ice.</p>`,
    q: `Which statement best explains why water stays liquid at much higher temperatures than methane?`,
    o: [`Methane molecules are much heavier than water molecules.`, `The C–H bonds in methane are weaker than the O–H bonds, so methane breaks apart at low temperatures.`, `Methane molecules are made of ions, while water molecules are not.`, `Water molecules form hydrogen bonds (H bonded to O), while nonpolar methane molecules have only weak attractions to each other.`],
    a: 3,
    x: `In water, H is bonded to O, so each δ+ H is attracted to the δ− O of a neighbor: <b>hydrogen bonding</b>, the strongest IMF. Methane is symmetrical and nonpolar (SNAP), so its molecules barely attract each other and it boils at a very low temperature. Boiling does not break the C–H bonds inside methane; it only separates the molecules. Methane (16 amu) is actually slightly lighter than water (18 amu).` },

  // ---------- mia: molecule-ion attraction ----------
  { id: 'b31', tp: ['mia', 'snap'],
    q: `When NaCl dissolves in water, which part of the water molecules surrounds each <b>Na⁺</b> ion?`,
    o: [`the oxygen end, because it is partially negative (δ−)`, `the hydrogen end, because it is partially negative (δ−)`, `the hydrogen end, because it is partially positive (δ+)`, `neither end; water molecules give electrons to Na⁺ to make it neutral`],
    a: 0,
    x: `Opposite charges attract. Oxygen is more electronegative, so the O end of water is <b>δ−</b> and is pulled toward the positive Na⁺ ion. (The δ+ H ends surround the negative Cl⁻ ions.) The hydrogen end is δ+, not δ−, and a δ+ end would repel Na⁺. Na⁺ stays an ion in solution; that is why salt water conducts.` },

  { id: 'b32', tp: ['mia', 'water'],
    ctx: `<h3>Solubility Station</h3><p>A class stirred one spoonful of table salt (NaCl) into each of two liquids.</p><table class="tbl"><tr><th>Liquid</th><th>Polarity</th><th>Result</th></tr><tr><td>Water</td><td>polar</td><td>salt dissolved completely</td></tr><tr><td>Mineral oil</td><td>nonpolar</td><td>salt sank and stayed as crystals</td></tr></table>`,
    q: `Which explanation best accounts for these results?`,
    o: [`Mineral oil is thicker than water, so the salt cannot move through it.`, `Mineral oil molecules are negative ions that repel the Cl⁻ ions.`, `Water molecules have δ+ and δ− ends that attract the Na⁺ and Cl⁻ ions and pull them out of the crystal, but mineral oil molecules have no partial charges to do this.`, `Water breaks the covalent bonds in NaCl, but mineral oil cannot.`],
    a: 2,
    x: `Dissolving a salt depends on <b>molecule–ion attraction</b>. Water's δ− O ends attract Na⁺ and its δ+ H ends attract Cl⁻, pulling ions out of the crystal and surrounding them. Nonpolar mineral oil has no partial charges, so it cannot pull the ions away. Thickness (viscosity) is not the reason. NaCl is held by ionic bonds, not covalent bonds.` },

  // ---------- covl: covalent Lewis dot diagrams / multiple bonds ----------
  { id: 'b33', tp: ['covl'],
    q: `Carbon dioxide has the structure O=C=O. How many electrons are <b>shared</b> in the whole molecule?`,
    o: [`4`, `8`, `16`, `2`],
    a: 1,
    x: `Each double bond is <b>2 pairs = 4 shared electrons</b>. CO₂ has two double bonds, so 2 × 4 = <b>8</b> shared electrons. 16 is the total number of valence electrons (4 + 6 + 6), but 8 of them are lone pairs on the oxygen atoms and are not shared. 4 counts only one of the two double bonds.` },

  { id: 'b34', tp: ['covl', 'lewis'],
    q: `A nitrogen atom's Lewis dot diagram shows 5 valence electrons: one pair and three single dots. How many single covalent bonds does a nitrogen atom usually form, as in NH₃?`,
    o: [`5, one for each valence electron`, `1, one for its electron pair`, `8, to reach a full octet`, `3, one for each single (unpaired) electron`],
    a: 3,
    x: `Each <b>single (unpaired) valence electron is a bonding site</b>. Nitrogen has 3 single dots, so it forms <b>3 bonds</b>, for example with 3 H atoms in NH₃ (or one triple bond in N₂). Its electron pair stays as a <b>lone pair</b>. Counting all 5 valence electrons as bonds is the common mistake: paired electrons don't form new bonds.` },

  // ---------- metb: metallic bonding ----------
  { id: 'b35', tp: ['metb'],
    q: `Which model best describes the bonding in a piece of solid aluminum?`,
    o: [`positive aluminum ions in a "sea" of mobile (delocalized) electrons`, `positive and negative ions held in a lattice by electrostatic attraction`, `pairs of electrons shared between two atoms in fixed covalent bonds`, `aluminum atoms with Lewis dots paired up between neighbors`],
    a: 0,
    x: `In <b>metallic bonding</b>, metal atoms release their valence electrons into a shared "sea" of mobile electrons that holds the positive metal ions together. A lattice of positive <i>and negative</i> ions is an ionic solid (like NaCl), which needs a metal and a nonmetal. Fixed shared pairs are covalent bonds between nonmetals, and metallic bonding is not drawn with Lewis dots.` },

  { id: 'b36', tp: ['metb', 'metal'],
    ctx: `<h3>Wiring a Rover</h3><p>Engineers use copper wire for a Mars rover's electrical system. The copper is pulled into long, thin wires without breaking, and the wires carry current from the solar panels to the instruments.</p>`,
    q: `Which statement best explains both properties of copper described above?`,
    o: [`Copper contains mobile ions dissolved in water, which carry the current and let the wire bend.`, `Copper atoms share electrons in fixed pairs, which makes the wire strong.`, `Copper's mobile (delocalized) electrons can flow through the metal, and the copper ions can slide past each other without breaking the bonding.`, `Copper atoms have δ+ and δ− ends that line up to carry the current.`],
    a: 2,
    x: `The <b>sea of mobile electrons</b> explains both properties. The electrons can move through the metal, so copper conducts current, and because the bonding is not locked into fixed pairs, the ions can slide past each other, so copper is <b>ductile</b> (stretchable) and malleable. Mobile ions carry current in <i>solutions</i> (electrolytes); in a solid metal, the electrons carry it. Fixed electron pairs would make a material brittle.` },

  // ---------- en: electronegativity ----------
  { id: 'b37', tp: ['en'],
    q: `Electronegativity increases across Period 2 from lithium to fluorine. Which statement best explains this trend?`,
    o: [`A new energy level is added with each element, so the atoms get larger.`, `The number of neutrons increases, and neutrons attract electrons.`, `The atoms gain more electrons, and more electrons pull harder on shared electrons.`, `The number of protons increases while the number of shells stays the same, so the Coulombic attraction for shared electrons increases.`],
    a: 3,
    x: `Across a period the <b>shells stay the same</b> (same distance) while the <b>protons increase</b>, so the nucleus pulls harder on electrons in a bond: stronger <b>Coulombic attraction</b>. Fluorine ends up the most electronegative element (4.0). New energy levels are added going <i>down</i> a group, not across a period, and neutrons have no charge, so they attract nothing.` },

  { id: 'b38', tp: ['en', 'pg'],
    q: `Without using a table of values, which atom attracts shared electrons in a bond <b>most</b> strongly?`,
    o: [`Br`, `Cl`, `S`, `Se`],
    a: 1,
    x: `Electronegativity increases going <b>up</b> a group and <b>to the right</b> across a period. Cl is above Br (one fewer shell, so less shielding) and to the right of S (more protons, same shells), so <b>chlorine</b> wins. Br is tempting because it has more protons, but its extra energy level puts the bonding electrons farther away, so the Coulombic attraction is weaker. Se is below S and is the lowest of the four.` },

  // ---------- ie: ionization energy ----------
  { id: 'b39', tp: ['ie', 'metal'],
    q: `Which atom requires the <b>least</b> energy to remove its outermost electron?`,
    o: [`Ar`, `Cl`, `Mg`, `K`],
    a: 3,
    x: `Ionization energy is lowest at the <b>lower left</b> of the periodic table. Potassium is a Group 1 metal in Period 4: its single valence electron is in the 4th shell, far from the nucleus and well shielded, so it is easily lost (K → K⁺). Mg is also a metal, but it is in Period 3 and has 12 protons pulling on electrons in only 3 shells. Ar and Cl are nonmetals with high ionization energies.` },

  { id: 'b40', tp: ['ie', 'rad'],
    ctx: `<h3>Group 1 Metals in the Body and Beyond</h3><p>Sodium and potassium ions (Na⁺ and K⁺) carry the electrical signals in nerve and heart cells. All Group 1 atoms form +1 ions easily. The table lists the energy needed to remove each atom's outermost electron.</p><table class="tbl"><tr><th>Element</th><th>Period</th><th>First ionization energy (kJ/mol)</th></tr><tr><td>Li</td><td class="n">2</td><td class="n">520</td></tr><tr><td>Na</td><td class="n">3</td><td class="n">496</td></tr><tr><td>K</td><td class="n">4</td><td class="n">419</td></tr><tr><td>Rb</td><td class="n">5</td><td class="n">403</td></tr></table>`,
    q: `Which statement best explains the trend in the table?`,
    o: [`The number of protons decreases down the group, so the nucleus pulls more weakly.`, `Larger atoms have more electrons, so each electron gets a smaller share of the nucleus's pull.`, `Each element down the group has another energy level, so the valence electron is farther from the nucleus and more shielded, and the Coulombic attraction is weaker.`, `Atoms lower in the group have more neutrons, which push the valence electron away.`],
    a: 2,
    x: `Going down a group adds an <b>energy level</b>. The valence electron is <b>farther</b> from the nucleus, and the inner shells <b>shield</b> it (like paper between a magnet and the fridge), so the Coulombic attraction <b>decreases</b> and less energy is needed to remove it. The "smaller share" idea is a common trap: the nucleus's pull isn't divided up among the electrons. Protons actually <i>increase</i> down the group; distance and shielding matter more.` },

  // ---------- rad: atomic radius ----------
  { id: 'b41', tp: ['rad', 'bohr'],
    q: `Membrane proteins can tell sodium and potassium apart partly by size. Why is a potassium atom larger than a sodium atom?`,
    o: [`Potassium has 4 occupied energy levels and sodium has 3, so potassium's valence electron is farther from the nucleus.`, `Potassium has more electrons, and more electrons take up more space.`, `Potassium has more protons, which push its electrons outward.`, `Potassium has more neutrons, which make its nucleus much bigger.`],
    a: 0,
    x: `Bohr models: Na is 2, 8, 1 and K is 2, 8, 8, 1. Potassium has an <b>extra shell</b>, so its outermost electron sits farther out. "More electrons" is the tempting answer, but chlorine has more electrons than sodium and is <i>smaller</i>; what matters is the <b>number of shells</b>. Protons attract electrons inward, not outward.` },

  { id: 'b42', tp: ['rad', 'pg'],
    ctx: `<h3>Atomic Radius Across Period 3</h3><table class="tbl"><tr><th>Element</th><th>Na</th><th>Mg</th><th>Al</th><th>Si</th><th>P</th><th>S</th><th>Cl</th></tr><tr><td>Atomic radius (pm)</td><td class="n">186</td><td class="n">160</td><td class="n">143</td><td class="n">117</td><td class="n">110</td><td class="n">104</td><td class="n">99</td></tr></table>`,
    q: `A chlorine atom has 17 electrons and a sodium atom has only 11, yet chlorine is much smaller. Which statement best explains this?`,
    o: [`Chlorine has fewer energy levels than sodium.`, `Chlorine gains an electron, which makes it shrink.`, `Sodium's electrons repel each other more because sodium is a metal.`, `Both atoms have 3 shells, but chlorine has 17 protons instead of 11, so its stronger Coulombic attraction pulls the electrons closer.`],
    a: 3,
    x: `Across a period the <b>shells stay the same</b> (both Na and Cl have 3), while the <b>protons increase</b>. More protons at about the same distance means a stronger Coulombic attraction, which pulls the electron cloud in, so radius decreases from 186 pm (Na) to 99 pm (Cl). Chlorine does not have fewer shells: both atoms are in Period 3. And a neutral Cl atom hasn't gained any electrons.` },

  // ---------- vsepr: VSEPR / molecular shapes ----------
  { id: 'b43', tp: ['vsepr'],
    q: `What is the shape of an ammonia molecule, NH₃, and why?`,
    o: [`trigonal planar, because nitrogen is bonded to three H atoms`, `pyramidal, because the lone pair on nitrogen pushes the three bonding pairs down`, `tetrahedral, because nitrogen has four pairs of electrons`, `bent, because every molecule with a lone pair is bent`],
    a: 1,
    x: `N has 3 bonding pairs (to H) and <b>1 lone pair</b>. In VSEPR the electron pairs repel, and the lone pair pushes the three N–H bonds down into a <b>pyramidal</b> shape. Trigonal planar is BH₃'s shape, and boron has <i>no</i> lone pair. "Tetrahedral" describes CH₄, where all 4 pairs are bonds; the shape names only where the atoms are, so with one pair unbonded, NH₃'s atoms form a pyramid. Bent is for H₂O, which has 2 lone pairs and 2 bonds.` },

  { id: 'b44', tp: ['vsepr', 'snap'],
    q: `Both H₂O and CO₂ have a central atom bonded to two other atoms. Why is H₂O <b>bent</b> while CO₂ is <b>linear</b>?`,
    o: [`Oxygen is more electronegative than carbon, so it bends its bonds.`, `The double bonds in CO₂ are stiff, while single bonds can bend freely.`, `The oxygen in H₂O has 2 lone pairs that push the bonds together, while the carbon in CO₂ has no lone pairs.`, `Hydrogen atoms are small, so they are pulled toward each other.`],
    a: 2,
    x: `VSEPR: electron pairs on the <b>central atom</b> repel each other. Water's O has 2 bonding pairs <b>and 2 lone pairs</b>, which push the H atoms into a bent shape. Carbon in CO₂ uses all its valence electrons in the two double bonds, so it has <b>no lone pairs</b> and the O atoms sit on opposite sides (linear). This is why water is asymmetrical and polar while CO₂ is symmetrical and nonpolar (SNAP).` }
];
