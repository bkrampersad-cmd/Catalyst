/* Catalyst - Pre-lab review: Bend and Stretch (NYS required Investigation, HS-PS2-6).
   General background only: the exact procedure comes from the teacher's Investigation packet. */
'use strict';
const FIGL1 = {
  slide: SV.wrap(620, 200, 'Metal layers slide and stay bonded; ionic layers shift, like charges meet, and the crystal shatters',
    (function () {
      let s = '';
      // metal: two rows of + ions in a sea of electrons, top row shifted
      s += '<rect x="10" y="30" width="270" height="110" rx="12" fill="#E8FBF8"/>';
      for (let i = 0; i < 5; i++) { s += '<circle cx="' + (45 + i * 50) + '" cy="62" r="16" fill="#B5ABD6"/><text class="sv-t" x="' + (45 + i * 50) + '" y="67">+</text>'; }
      for (let i = 0; i < 5; i++) { s += '<circle cx="' + (62 + i * 50) + '" cy="108" r="16" fill="#B5ABD6"/><text class="sv-t" x="' + (62 + i * 50) + '" y="113">+</text>'; }
      [[30, 40], [95, 88], [150, 132], [210, 44], [262, 86], [120, 50], [180, 92], [60, 128], [240, 130]].forEach(p => { s += '<circle class="sv-d" cx="' + p[0] + '" cy="' + p[1] + '" r="3.2"/>'; });
      s += SV.arrow(40, 20, 120, 20, '#5B3FD0') + SV.t(145, 170, 'Metal: layers slide, the electron sea', 'sv-s') + SV.t(145, 186, 'keeps holding them → bends', 'sv-s');
      // ionic: shifted rows put + next to +
      s += '<rect x="330" y="30" width="280" height="110" rx="12" fill="#FDE4E1"/>';
      ['+', '−', '+', '−', '+'].forEach((c, i) => { s += '<circle cx="' + (375 + i * 50) + '" cy="62" r="16" fill="' + (c === '+' ? '#B5ABD6' : '#F2B200') + '"/><text class="sv-t" x="' + (375 + i * 50) + '" y="67">' + c + '</text>'; });
      ['+', '−', '+', '−', '+'].forEach((c, i) => { s += '<circle cx="' + (375 + i * 50) + '" cy="108" r="16" fill="' + (c === '+' ? '#B5ABD6' : '#F2B200') + '"/><text class="sv-t" x="' + (375 + i * 50) + '" y="113">' + c + '</text>'; });
      s += SV.arrow(360, 20, 410, 20, '#C62828') + SV.t(470, 170, 'Ionic: shift one row, + meets +', 'sv-s') + SV.t(470, 186, 'and − meets − → they repel and it shatters', 'sv-s');
      return s;
    })()),
  chains: SV.wrap(620, 180, 'Polymer chains: tangled, stretched straight, and cross-linked chains that snap back',
    (function () {
      let s = '';
      s += '<path d="M20 90 C40 40, 70 130, 95 80 S140 40, 160 100 M30 115 C60 70, 90 130, 120 60 S150 110, 170 50 M25 60 C55 110, 85 30, 110 115 S150 125, 175 80" class="sv-l"/>';
      s += SV.t(98, 170, 'Relaxed: tangled chains', 'sv-s');
      s += '<path d="M220 60 C260 55, 300 65, 380 60 M220 90 C260 85, 300 95, 380 90 M220 120 C260 115, 300 125, 380 120" class="sv-l"/>' + SV.arrow(220, 30, 380, 30, '#5B3FD0');
      s += SV.t(300, 170, 'Pulled: chains straighten and slide', 'sv-s');
      s += '<path d="M420 90 C440 40, 470 130, 495 80 S540 40, 560 100 M430 115 C460 70, 490 130, 520 60 S550 110, 575 50" class="sv-l"/>';
      [[455, 92], [508, 84], [548, 76]].forEach(p => { s += '<line x1="' + p[0] + '" y1="' + (p[1] - 18) + '" x2="' + p[0] + '" y2="' + (p[1] + 18) + '" stroke="#C62828" stroke-width="3"/>'; });
      s += SV.t(500, 170, 'Cross-links (red) pull it back', 'sv-s');
      return s;
    })())
};
LESSONS.lab1 = {
  sections: [
    { t: 'What this investigation is about', tp: ['metb'], h: `
      <h2>Bend and Stretch: structure and function of designed materials</h2>
      <p><b>Bend and Stretch</b> is one of the three <b>required Investigations</b> for the new Regents course. You have to complete the required Investigations to be allowed to take the Regents exam. About <b>15% of the written exam</b> covers the ideas behind them.</p>
      <div class="key"><b>The big idea (HS-PS2-6):</b> how a material is built at the <b>particle level</b> (its atoms, ions, molecules and the forces between them) explains how it <b>behaves at the bulk level</b>: whether it bends, stretches, snaps back or shatters. Engineers choose a material's structure to fit the job it has to do.</div>
      <p>Your teacher's packet has the exact steps and materials. This review covers the chemistry you'll use to explain your results, and the lab skills you'll need to collect good data.</p>
      <div class="tip">Before the lab, review <b>metallic bonding</b>, <b>ionic bonds</b> and <b>intermolecular forces</b> in Unit 3 and Unit 2. The explanations in this lab come straight from those lessons.</div>` },
    { t: 'Why materials bend, stretch or break', tp: ['metb', 'ionic', 'imf', 'metal'], h: `
      <h2>Why materials bend, stretch or break</h2>
      <h3>Metals bend</h3>
      <p>A metal is a lattice of positive ions in a <b>sea of mobile electrons</b>. When you bend it, layers of ions <b>slide past each other</b>, but the electron sea keeps holding them together. That's why metals are <b>malleable</b> (bendable) and <b>ductile</b> (can be drawn into wire).</p>
      <h3>Salts shatter</h3>
      <p>An ionic crystal is a lattice of + and − ions. Shift one layer by a single ion and <b>+ lines up with +</b> and <b>− with −</b>. Like charges repel, so the crystal <b>cracks apart</b>. That's why salts are hard but <b>brittle</b>.</p>
      <figure>${FIGL1.slide}<figcaption>The same push, two very different results: it depends on the bonding.</figcaption></figure>
      <h3>Polymers stretch</h3>
      <p>Plastics and rubber are <b>polymers</b>: very long chain molecules made of many repeating units. The chains are tangled like cooked spaghetti, and they are held to each other by <b>intermolecular forces</b>, which are weaker than the bonds inside each chain.</p>
      <ul><li>Pull on a polymer and the chains <b>uncoil and straighten</b>, so the material gets longer.</li>
        <li>If the chains can <b>slide past each other</b>, the material stays stretched (like a plastic bag that thins out).</li>
        <li>If the chains are tied together by <b>cross-links</b> (covalent bonds between chains, as in a rubber band), they <b>snap back</b> when you let go. That's elastic.</li>
        <li>More cross-links make a material <b>stiffer</b>; stronger forces between chains make it harder to stretch.</li></ul>
      <figure>${FIGL1.chains}<figcaption>Stretching straightens the chains. Cross-links pull them back to where they started.</figcaption></figure>
      <table class="tbl"><tr><th>Material</th><th>Particle-level structure</th><th>Bulk behavior</th><th>Designed for…</th></tr>
        <tr><td>Copper</td><td>metal ions in an electron sea</td><td>bends, draws into wire, conducts</td><td>electrical wiring</td></tr>
        <tr><td>Table salt</td><td>lattice of + and − ions</td><td>hard, brittle, shatters</td><td>(not a building material)</td></tr>
        <tr><td>Rubber band</td><td>cross-linked polymer chains</td><td>stretches and snaps back</td><td>holding things together</td></tr>
        <tr><td>Plastic bag</td><td>long chains, few cross-links</td><td>stretches and stays stretched</td><td>light, flexible packaging</td></tr></table>` },
    { t: 'Lab skills for good data', tp: ['metal'], h: `
      <h2>Lab skills for good data</h2>
      <ul><li><b>Independent variable:</b> what you change on purpose (for example, the material, or the mass hung from it).</li>
        <li><b>Dependent variable:</b> what you measure because of it (for example, how far it stretches).</li>
        <li><b>Controlled variables:</b> everything you keep the same so the test is fair (same starting length, same width, same temperature).</li></ul>
      <div class="steps"><div class="st">Example: stretch data</div>A 10.0 cm strip stretches to 13.5 cm. Stretch = final length − starting length = 13.5 − 10.0 = <b>3.5 cm</b>. Do <b>three trials</b> and average them so one odd result doesn't mislead you.</div>
      <ul><li>Record measurements in a <b>data table</b> with units in the headings.</li>
        <li>Graph the independent variable on the <b>x-axis</b> and the dependent variable on the <b>y-axis</b>, then describe the pattern.</li>
        <li>Explain results with <b>claim, evidence and reasoning</b>: the claim answers the question, the evidence quotes your data, and the reasoning uses particle-level structure (chains, cross-links, the electron sea, ions) to explain why.</li></ul>
      <div class="key">A strong conclusion connects the <b>bulk</b> result you measured to the <b>particle-level</b> structure that causes it.</div>` }
  ],
  quiz: [
    { q: 'Why can a copper wire be bent without breaking?', o: ['Its ions are locked in place by full charges', 'Layers of metal ions slide past each other while the sea of mobile electrons keeps holding them together', 'Copper atoms share electrons in a polar covalent bond', 'Copper molecules have strong hydrogen bonds'], a: 1, x: 'Metallic bonding is positive ions in a sea of mobile electrons. The layers can slide and still be held, so metals are malleable and ductile. Hydrogen bonding is between molecules, and copper isn\'t made of molecules.', tp: ['metb'] },
    { q: 'A salt crystal shatters when struck with a hammer. What happens at the particle level?', o: ['The electron sea flows away', 'Shifting a layer lines up ions with the same charge, and they repel', 'The covalent bonds inside each NaCl molecule break', 'The ions gain extra electrons'], a: 1, x: 'In an ionic lattice, a small shift puts + next to + and − next to −. Like charges repel and the crystal cracks. Salts are made of ions in a lattice, not molecules, so there are no "NaCl molecules" to break.', tp: ['ionic'] },
    { q: 'What makes a rubber band snap back after it is stretched?', o: ['Cross-links between its polymer chains pull them back into place', 'Its ions attract each other', 'It has a sea of mobile electrons', 'Its chains break and re-form'], a: 0, x: 'Rubber is a polymer with cross-links (bonds that tie the chains together). Stretching straightens the chains; the cross-links pull them back when you let go.', tp: ['imf'] },
    { q: 'Polymer chains in a plastic are held to each other mainly by:', o: ['Ionic bonds', 'Metallic bonds', 'Intermolecular forces', 'Nuclear forces'], a: 2, x: 'Inside each chain the atoms are joined by covalent bonds. Between chains, the attractions are intermolecular forces, which are weaker. That\'s why chains can slide past each other when the plastic is stretched.', tp: ['imf'] },
    { q: 'A student hangs different masses from strips of plastic and measures how much each strip stretches. What is the dependent variable?', o: ['The mass hung from the strip', 'The starting length of the strip', 'The type of plastic', 'How much the strip stretches'], a: 3, x: 'The dependent variable is what you measure in response to the change: the stretch. The mass is the independent variable, and the starting length should be kept the same (a controlled variable).', tp: ['metal'] },
    { q: 'Which change would most likely make a polymer stiffer and harder to stretch?', o: ['Adding more cross-links between the chains', 'Removing all cross-links', 'Making the chains shorter and weaker', 'Heating it until the chains slide easily'], a: 0, x: 'More cross-links tie the chains together more tightly, so they can\'t straighten or slide as easily. The material becomes stiffer.', tp: ['imf'] },
    { q: 'Why is copper, not salt, used for electrical wiring?', o: ['Copper is an ionic compound', 'Copper is ductile and its mobile electrons conduct, while salt is brittle and its ions are locked in place as a solid', 'Salt conducts electricity as a solid', 'Copper has polar covalent bonds'], a: 1, x: 'Metals are ductile (can be drawn into wire) and conduct because of the electron sea. Solid salt is brittle and does not conduct, because its ions can\'t move until it is melted or dissolved.', tp: ['metb', 'metal'] },
    { q: 'Which conclusion best connects bulk behavior to particle-level structure?', o: ['The rubber band stretched 4.2 cm.', 'Rubber is better than plastic.', 'The rubber band returned to its starting length because cross-links between its polymer chains pulled the chains back.', 'We did three trials.'], a: 2, x: 'A strong conclusion states the result (returned to its starting length) and explains it with structure (cross-links pulling the chains back). The others are only data, an opinion, or a procedure step.', tp: ['imf'] }
  ]
};
