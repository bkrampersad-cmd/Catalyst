/* Catalyst - Regents-style cluster: "Lakes on Titan" (Catalyst original).
   Facts: Titan's surface is about −179 °C (94 K); Cassini (2004–2017) radar mapped methane/ethane lakes and seas
   (Kraken Mare is the largest); the atmosphere is about 95% nitrogen and 5% methane, with traces of CO₂ (first seen
   by Voyager 1); NASA's Dragonfly rotorcraft is planned to launch in 2028 and land in 2034.
   Melting/boiling points are standard values at 1 atm. EN values are the Pauling values on the class chart. */
'use strict';
const FIGCT = {
  fig(svg, cap) {
    return '<figure style="margin:12px 0 6px;text-align:center">' + svg.replace('style="max-width', 'style="width:100%;height:auto;max-width') +
      '<figcaption style="font-size:13px;margin-top:4px">' + cap + '</figcaption></figure>';
  },
  /* Lewis structures of methane and ammonia (no shape labels, so the question can ask about shape) */
  ch4nh3: (function () {
    const d = 48;
    let s = SV.atom(110, 80, 'C') + SV.atom(110 - d, 80, 'H') + SV.atom(110 + d, 80, 'H') + SV.atom(110, 80 - d, 'H') + SV.atom(110, 80 + d, 'H') +
      SV.bond(110 - d, 80, 110, 80, 1) + SV.bond(110, 80, 110 + d, 80, 1) + SV.bond(110, 80, 110, 80 - d, 1) + SV.bond(110, 80, 110, 80 + d, 1);
    s += SV.t(110, 162, 'Methane, CH₄', 'sv-t');
    s += SV.atom(330, 80, 'N', ['t']) + SV.atom(330 - d, 80, 'H') + SV.atom(330 + d, 80, 'H') + SV.atom(330, 80 + d, 'H') +
      SV.bond(330 - d, 80, 330, 80, 1) + SV.bond(330, 80, 330 + d, 80, 1) + SV.bond(330, 80, 330, 80 + d, 1);
    s += SV.t(330, 162, 'Ammonia, NH₃', 'sv-t') + SV.t(372, 52, 'lone pair', 'sv-s') + '<path d="M348 56 L338 62" stroke="#6E6888" stroke-width="1.2"/>';
    return SV.wrap(440, 172, 'Lewis structures: methane has a carbon atom bonded to four hydrogen atoms; ammonia has a nitrogen atom bonded to three hydrogen atoms with one lone pair on nitrogen.', s);
  })(),
  /* model answer: CO2 Lewis structure */
  co2: (function () {
    let s = SV.atom(80, 60, 'O', ['t', 'b']) + SV.atom(150, 60, 'C') + SV.atom(220, 60, 'O', ['t', 'b']) + SV.bond(80, 60, 150, 60, 2) + SV.bond(150, 60, 220, 60, 2);
    s += SV.t(150, 120, 'linear: 180° between the two C=O bonds', 'sv-s');
    s += SV.t(150, 140, 'each line pair = a double bond (2 shared pairs, 4 e⁻)', 'sv-s');
    return SV.wrap(300, 152, 'Lewis structure of carbon dioxide: O double bonded to C double bonded to O, two lone pairs on each oxygen, linear.', s);
  })()
};

CLUSTERS.push({
  id: 'titan', t: 'Lakes on Titan', sub: 'Polarity, shapes and IMFs on Saturn\'s largest moon', src: 'Catalyst original',
  pe: ['HS-PS1-1', 'HS-PS1-2', 'HS-PS1-3'],
  intro: '<h3>Lakes on Titan</h3><p>Titan, Saturn\'s largest moon, is the only world besides Earth known to have stable bodies of liquid on its surface. Between 2004 and 2017, radar on NASA\'s Cassini spacecraft mapped lakes and seas near Titan\'s poles. The largest, Kraken Mare, is bigger than the Caspian Sea. But Titan\'s lakes are not water. They are made of liquid <b>methane</b> (CH₄) and <b>ethane</b> (C₂H₆).</p>' +
    '<p>Titan is very cold: its surface is about <b>−179°C</b>. At that temperature, water ice is as hard as rock. Titan\'s thick atmosphere is about 95% nitrogen and 5% methane. Any life on Titan would have to use a liquid very different from water. NASA\'s Dragonfly rotorcraft is planned to launch in 2028 and land on Titan in 2034 to study its chemistry. Figure 1 compares four substances made of nonmetal atoms.</p>' +
    '<div style="text-align:center;margin-top:8px"><b>Figure 1: Melting and Boiling Points at Standard Pressure</b></div><table class="tbl" style="background:#fff"><tr><th>Substance</th><th>Formula</th><th>Melting Point (°C)</th><th>Boiling Point (°C)</th></tr>' +
    '<tr><td>Methane</td><td>CH₄</td><td class="n">−182</td><td class="n">−162</td></tr><tr><td>Ethane</td><td>C₂H₆</td><td class="n">−183</td><td class="n">−89</td></tr>' +
    '<tr><td>Ammonia</td><td>NH₃</td><td class="n">−78</td><td class="n">−33</td></tr><tr><td>Water</td><td>H₂O</td><td class="n">0</td><td class="n">100</td></tr></table>',
  items: [
    {
      type: 'mc', pe: 'HS-PS1-3', tp: ['imf'],
      q: 'Using Figure 1, which substances would be liquids at Titan\'s surface temperature of −179°C?',
      o: ['water and ammonia only', 'methane only', 'methane, ethane, ammonia and water', 'methane and ethane only'],
      a: 3,
      x: 'A substance is a liquid when the temperature is <b>above its melting point</b> and <b>below its boiling point</b>. Methane: −182 &lt; −179 &lt; −162, so liquid. Ethane: −183 &lt; −179 &lt; −89, so liquid. Ammonia melts at −78°C and water at 0°C, so at −179°C both are <b>solids</b>. Choice 2 forgets that ethane\'s melting point (−183°C) is also below −179°C. Water and ammonia stay solid because their intermolecular forces are much stronger.'
    },
    {
      type: 'row', pe: 'HS-PS1-1', tp: ['en', 'pol'],
      ctx: '<p>The molecules in Figure 1 are held together by covalent bonds between nonmetal atoms. Figure 2 gives electronegativity values from the class chart.</p>' +
        '<div style="text-align:center;margin-top:8px"><b>Figure 2: Electronegativity Values</b></div><table class="tbl" style="background:#fff"><tr><th>Element</th><th>H</th><th>C</th><th>N</th><th>O</th></tr><tr><td>Electronegativity</td><td class="n">2.20</td><td class="n">2.55</td><td class="n">3.04</td><td class="n">3.44</td></tr></table>' +
        '<p class="hint">Class ranges for ΔEN: less than 0.4 nonpolar covalent, 0.4–1.6 polar covalent, 1.7 or greater ionic.</p>',
      q: 'Using Figure 2, which row correctly gives the electronegativity difference (ΔEN) and the bond type for an O–H bond in water and an N–H bond in ammonia?',
      cols: ['Row', 'O–H bond in H₂O', 'N–H bond in NH₃'],
      rows: [['(1)', '5.64, polar covalent', '5.24, polar covalent'], ['(2)', '1.24, polar covalent', '0.84, polar covalent'], ['(3)', '1.24, ionic', '0.84, polar covalent'], ['(4)', '1.24, polar covalent', '0.84, nonpolar covalent']],
      a: 1,
      x: 'ΔEN = <b>bigger − smaller</b>. O–H: 3.44 − 2.20 = <b>1.24</b>. N–H: 3.04 − 2.20 = <b>0.84</b>. Both fall in the 0.4–1.6 range, so both are <b>polar covalent</b>: the electrons are shared unequally, pulled toward O or N (δ−), leaving H δ+. Row (1) adds the values instead of subtracting. Row (3) calls O–H ionic, but two nonmetals always <b>share</b> electrons, and 1.24 is below 1.7 anyway. Row (4) puts 0.84 in the wrong range.'
    },
    {
      type: 'mc', pe: 'HS-PS1-3', tp: ['vsepr', 'snap'],
      ctx: FIGCT.fig(FIGCT.ch4nh3, '<b>Figure 3: Lewis Structures of Methane and Ammonia</b>'),
      q: 'Methane and ammonia each have four pairs of electrons around the central atom. Based on Figure 3, why is a methane molecule nonpolar while an ammonia molecule is polar?',
      o: ['The carbon atom in CH₄ has a lone pair that pushes the H atoms into a symmetrical shape.',
        'CH₄ is linear and NH₃ is bent, so only NH₃ has an uneven charge.',
        'CH₄ is tetrahedral and symmetrical, so its bond polarities cancel; the lone pair on N makes NH₃ pyramidal and asymmetrical, so its charge is uneven.',
        'Any molecule with polar bonds is a polar molecule, and only NH₃ has polar bonds.'],
      a: 2,
      x: 'Use <b>VSEPR</b> and <b>SNAP</b>. In CH₄ all four electron pairs are bonds to H, so they spread out evenly into a <b>tetrahedral</b> shape (think "tetra" = 4 corners). It is <b>Symmetrical</b>, so it is <b>Nonpolar</b>. In NH₃ the <b>lone pair</b> on nitrogen pushes the three N–H bonds down into a <b>pyramidal</b> shape, which is <b>Asymmetrical</b>, so it is <b>Polar</b>. Choice 1 is wrong because carbon in CH₄ has no lone pair. Choice 4 mixes up bond polarity and molecular polarity: CO₂ and CF₄ have polar bonds but are nonpolar molecules.'
    },
    {
      type: 'cer', pe: 'HS-PS1-3', tp: ['imf', 'hb', 'snap'],
      q: 'Make a claim that explains why ammonia and water have much higher boiling points than methane and ethane. Cite evidence from Figure 1, and explain your claim in terms of intermolecular forces.',
      model: '<p><b>Claim:</b> Ammonia and water have much stronger intermolecular forces (IMFs) than methane and ethane, because ammonia and water molecules form <b>hydrogen bonds</b>.</p>' +
        '<p><b>Evidence:</b> Water boils at 100°C and ammonia at −33°C, but ethane boils at −89°C and methane at −162°C.</p>' +
        '<p><b>Explanation:</b> It takes more energy to pull molecules apart when the attractions <b>between</b> them are stronger, so stronger IMFs mean a higher boiling point. In NH₃ and H₂O, hydrogen is bonded to <b>N or O</b>, which are very electronegative, and the molecules are asymmetrical (polar). The δ+ H on one molecule is strongly attracted to the δ− N or O on a neighbor: a hydrogen bond, the strongest IMF. CH₄ and C₂H₆ are symmetrical, nonpolar molecules with H bonded only to C, so they have only weak IMFs and boil at very low temperatures.</p>',
      rubric: ['Claim: ammonia and water have stronger IMFs (hydrogen bonding) than methane and ethane', 'Evidence: quotes boiling points from Figure 1 for at least one substance in each pair (for example, H₂O 100°C vs. CH₄ −162°C)', 'Explanation: hydrogen bonding happens because H is bonded to N or O (F, O, N rule), and CH₄/C₂H₆ are nonpolar', 'Links stronger IMFs to more energy needed to separate the molecules (higher boiling point)']
    },
    {
      type: 'draw', pe: 'HS-PS1-2', tp: ['covl', 'vsepr'],
      ctx: '<p>Small amounts of carbon dioxide (CO₂) have been detected in Titan\'s atmosphere. CO₂ forms when oxygen atoms delivered from space react with carbon compounds in the atmosphere.</p>',
      q: 'Using the Periodic Table, draw a Lewis electron-dot diagram (or structure) of a carbon dioxide molecule that shows all of its valence electrons. Then name the shape of the molecule.',
      model: '<div style="max-width:360px;margin:0 auto">' + FIGCT.co2 + '</div>' +
        '<p>In dots: <b>:Ö::C::Ö:</b> (each O has two lone pairs). Carbon has 4 valence electrons (4 bonding sites) and each oxygen has 6 (2 bonding sites). To give every atom an octet, carbon shares <b>two pairs</b> with each oxygen, making two <b>double bonds</b>. The molecule has 4 + 6 + 6 = 16 valence electrons: 8 in the two double bonds and 8 in the four lone pairs on the oxygens. Carbon has <b>no lone pairs</b>, so the two bonds point in opposite directions: the shape is <b>linear</b>.</p>',
      rubric: ['Carbon in the center with a double bond (2 shared pairs, 4 electrons) to each oxygen', 'Each oxygen has 2 lone pairs; carbon has no lone pairs (16 valence electrons in all)', 'Every atom has 8 valence electrons around it (an octet)', 'Names the shape as linear']
    },
    {
      type: 'short', pe: 'HS-PS1-3', tp: ['en', 'pol', 'snap'],
      q: 'Using Figure 2, calculate the electronegativity difference (ΔEN) for a C–O bond in carbon dioxide and classify the bond. Then explain why CO₂ is a <b>nonpolar</b> molecule even though its bonds are polar.',
      model: '<p>ΔEN = 3.44 − 2.55 = <b>0.89</b>, which is in the 0.4–1.6 range, so each C=O bond is <b>polar covalent</b> (O is δ−, C is δ+).</p>' +
        '<p>CO₂ is <b>linear</b> and <b>symmetrical</b>: it passes the fold test. The two polar bonds are equal and point in <b>opposite directions</b>, so their pulls cancel and the charge is spread evenly. By SNAP, Symmetrical = Nonpolar. Bond polarity is not the same as molecular polarity.</p>',
      rubric: ['ΔEN = 0.89 (3.44 − 2.55)', 'Classifies the C–O bond as polar covalent', 'States CO₂ is linear / symmetrical', 'Explains the two bond polarities are equal and opposite, so they cancel (SNAP)']
    }
  ]
});
