/* Catalyst - Study Guide. Units follow the class syllabus order (Enriched Chemistry 2026-27, 1st semester).
   Second-semester units are typical Regents topics and are marked tentative until the syllabus/textbook confirms them.
   To add a lesson: add an entry to LESSONS keyed by unit id, with sections [{t, h}] and quiz [{q, o:[...], a, x}]. */
'use strict';
const UNITS = [
  { id: 'u1', t: 'Matter & Measurement', d: 'Classifying matter, physical vs. chemical changes, states of matter, SI units, significant figures, density and percent error.' },
  { id: 'u2', t: 'Atomic Structure', d: 'Protons, neutrons and electrons, isotopes, average atomic mass, the history of the atom, electron shells and excited states.' },
  { id: 'u3', t: 'Formulas & Equations', d: 'Ions, writing and naming compounds, balancing equations and types of reactions.' },
  { id: 'u4', t: 'Periodic Table', d: 'Groups and periods, metals vs. nonmetals, and trends in radius, electronegativity and ionization energy.' },
  { id: 'u5', t: 'Bonding', d: 'Ionic, covalent and metallic bonds, Lewis dot structures, molecular shape and polarity, intermolecular forces.' },
  { id: 'u6', t: 'Mathematics of Chemistry', d: 'The mole, molar mass, percent composition, empirical formulas and stoichiometry.' },
  { id: 'u7', t: 'Gas Laws', d: 'Kinetic molecular theory, pressure, and Boyle\'s, Charles\'s, Gay-Lussac\'s and the combined gas law.' },
  { id: 'mid', t: 'Midterm Review', d: 'Mixed practice across Units 1–7.' },
  { id: 'u8', t: 'Solutions', d: 'Solubility curves, molarity, ppm, and colligative properties.', s2: true },
  { id: 'u9', t: 'Kinetics & Equilibrium', d: 'Reaction rates, energy diagrams, and Le Chatelier\'s principle.', s2: true },
  { id: 'u10', t: 'Acids & Bases', d: 'Arrhenius theory, pH, indicators and neutralization/titration.', s2: true },
  { id: 'u11', t: 'Redox & Electrochemistry', d: 'Oxidation numbers, half-reactions, voltaic and electrolytic cells.', s2: true },
  { id: 'u12', t: 'Organic Chemistry', d: 'Hydrocarbons, functional groups and organic reactions.', s2: true },
  { id: 'u13', t: 'Nuclear Chemistry', d: 'Radioactive decay, half-life, fission and fusion.', s2: true }
];

/* ---------- SVG diagrams for Unit 1 ---------- */
const FIG = {
  tree: '<svg viewBox="0 0 640 250" role="img" aria-label="Classification of matter">' +
    '<style>.fbx{fill:#F3F0FC;stroke:#5B3FD0;stroke-width:1.5}.ftx{font:600 14px Segoe UI,sans-serif;fill:#22145A;text-anchor:middle}.fsm{font:12px Segoe UI,sans-serif;fill:#6E6888;text-anchor:middle}.fln{stroke:#9C8FD0;stroke-width:2}</style>' +
    '<rect class="fbx" x="260" y="8" width="120" height="38" rx="10"/><text class="ftx" x="320" y="32">Matter</text>' +
    '<line class="fln" x1="320" y1="46" x2="170" y2="80"/><line class="fln" x1="320" y1="46" x2="470" y2="80"/>' +
    '<rect class="fbx" x="90" y="80" width="160" height="38" rx="10" style="fill:#E8FBF8;stroke:#0FA89B"/><text class="ftx" x="170" y="104">Pure substance</text>' +
    '<rect class="fbx" x="390" y="80" width="160" height="38" rx="10" style="fill:#FFF7E0;stroke:#F2B200"/><text class="ftx" x="470" y="104">Mixture</text>' +
    '<line class="fln" x1="170" y1="118" x2="90" y2="150"/><line class="fln" x1="170" y1="118" x2="250" y2="150"/>' +
    '<line class="fln" x1="470" y1="118" x2="390" y2="150"/><line class="fln" x1="470" y1="118" x2="550" y2="150"/>' +
    '<rect class="fbx" x="30" y="150" width="120" height="38" rx="10"/><text class="ftx" x="90" y="174">Element</text>' +
    '<rect class="fbx" x="190" y="150" width="120" height="38" rx="10"/><text class="ftx" x="250" y="174">Compound</text>' +
    '<rect class="fbx" x="320" y="150" width="140" height="38" rx="10"/><text class="ftx" x="390" y="174">Homogeneous</text>' +
    '<rect class="fbx" x="480" y="150" width="140" height="38" rx="10"/><text class="ftx" x="550" y="174">Heterogeneous</text>' +
    '<text class="fsm" x="90" y="208">one kind of atom</text><text class="fsm" x="90" y="224">Fe, O₂, He</text>' +
    '<text class="fsm" x="250" y="208">elements chemically bonded</text><text class="fsm" x="250" y="224">H₂O, NaCl, CO₂</text>' +
    '<text class="fsm" x="390" y="208">uniform (a solution)</text><text class="fsm" x="390" y="224">salt water, air</text>' +
    '<text class="fsm" x="550" y="208">not uniform</text><text class="fsm" x="550" y="224">sand + water, salad</text></svg>',
  states: (function () {
    function dots(x0, y0, kind) {
      let s = '', k = 0;
      const pts = kind === 's' ? [] : kind === 'l' ? [[22, 92], [44, 98], [66, 90], [88, 96], [108, 92], [30, 72], [54, 76], [78, 70], [100, 74], [40, 52], [68, 56], [92, 50]] :
        [[24, 30], [96, 22], [60, 62], [30, 98], [104, 90], [76, 108]];
      if (kind === 's') for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) pts.push([20 + c * 22, 40 + r * 22]);
      pts.forEach(p => { s += '<circle cx="' + (x0 + p[0]) + '" cy="' + (y0 + p[1]) + '" r="9" fill="' + (kind === 's' ? '#5B3FD0' : kind === 'l' ? '#0FA89B' : '#F2B200') + '"/>'; k++; });
      if (kind === 'g') pts.forEach(p => { s += '<line x1="' + (x0 + p[0] + 10) + '" y1="' + (y0 + p[1]) + '" x2="' + (x0 + p[0] + 22) + '" y2="' + (y0 + p[1] - 8) + '" stroke="#C99600" stroke-width="2"/>'; });
      return s;
    }
    let s = '<svg viewBox="0 0 470 190" role="img" aria-label="Particles in a solid, liquid and gas"><style>.flb{font:600 14px Segoe UI,sans-serif;fill:#22145A;text-anchor:middle}.fds{font:11.5px Segoe UI,sans-serif;fill:#6E6888;text-anchor:middle}</style>';
    [['s', 'Solid', 'fixed shape and volume'], ['l', 'Liquid', 'fixed volume, takes shape'], ['g', 'Gas', 'fills its container']].forEach((a, i) => {
      const x = 15 + i * 155;
      s += '<rect x="' + x + '" y="10" width="130" height="125" rx="8" fill="#fff" stroke="#9C8FD0" stroke-width="2"/>' + dots(x, 10, a[0]) +
        '<text class="flb" x="' + (x + 65) + '" y="158">' + a[1] + '</text><text class="fds" x="' + (x + 65) + '" y="176">' + a[2] + '</text>';
    });
    return s + '</svg>';
  })(),
  phase: '<svg viewBox="0 0 520 210" role="img" aria-label="Names of phase changes"><style>.fp{font:700 15px Segoe UI,sans-serif;fill:#fff;text-anchor:middle}.fa{font:12.5px Segoe UI,sans-serif;fill:#22145A;text-anchor:middle}</style>' +
    '<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#5B3FD0"/></marker></defs>' +
    '<rect x="10" y="130" width="120" height="44" rx="10" fill="#5B3FD0"/><text class="fp" x="70" y="158">SOLID</text>' +
    '<rect x="200" y="130" width="120" height="44" rx="10" fill="#0FA89B"/><text class="fp" x="260" y="158">LIQUID</text>' +
    '<rect x="390" y="130" width="120" height="44" rx="10" fill="#E0A100"/><text class="fp" x="450" y="158">GAS</text>' +
    '<path d="M130 140 H200" stroke="#5B3FD0" stroke-width="2" marker-end="url(#ar)"/><text class="fa" x="165" y="128">melting</text>' +
    '<path d="M200 166 H130" stroke="#5B3FD0" stroke-width="2" marker-end="url(#ar)"/><text class="fa" x="165" y="192">freezing</text>' +
    '<path d="M320 140 H390" stroke="#5B3FD0" stroke-width="2" marker-end="url(#ar)"/><text class="fa" x="355" y="128">vaporization</text>' +
    '<path d="M390 166 H320" stroke="#5B3FD0" stroke-width="2" marker-end="url(#ar)"/><text class="fa" x="355" y="192">condensation</text>' +
    '<path d="M70 130 C120 30 400 30 450 130" fill="none" stroke="#5B3FD0" stroke-width="2" marker-end="url(#ar)"/><text class="fa" x="260" y="40">sublimation (solid → gas)</text>' +
    '<path d="M440 130 C400 60 120 60 80 130" fill="none" stroke="#9C8FD0" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ar)"/><text class="fa" x="260" y="80">deposition (gas → solid)</text></svg>',
  target: (function () {
    function t(x, label, pts) {
      let s = '<g transform="translate(' + x + ',0)">';
      [56, 40, 24, 9].forEach((r, i) => { s += '<circle cx="62" cy="66" r="' + r + '" fill="' + (i % 2 ? '#fff' : '#E6E0F8') + '" stroke="#9C8FD0"/>'; });
      pts.forEach(p => { s += '<circle cx="' + (62 + p[0]) + '" cy="' + (66 + p[1]) + '" r="4.5" fill="#B42318"/>'; });
      return s + '<text x="62" y="146" text-anchor="middle" style="font:600 12.5px Segoe UI,sans-serif;fill:#22145A">' + label + '</text></g>';
    }
    return '<svg viewBox="0 0 420 160" role="img" aria-label="Accuracy versus precision">' +
      t(0, 'accurate + precise', [[2, -3], [-3, 2], [3, 3], [-2, -2]]) +
      t(140, 'precise, not accurate', [[32, -30], [36, -26], [30, -25], [35, -33]]) +
      t(280, 'neither', [[-38, 10], [20, -40], [40, 25], [-10, 44]]) + '</svg>';
  })()
};

const LESSONS = {
  u1: {
    sections: [
      { t: 'Classifying matter', h:
        '<h2>Classifying matter</h2><p><b>Matter</b> is anything that has mass and takes up space. Chemists sort matter by what it is made of.</p>' +
        '<figure>' + FIG.tree + '<figcaption>Every sample of matter fits somewhere on this tree.</figcaption></figure>' +
        '<h3>Pure substances</h3><ul><li><b>Element:</b> made of only one kind of atom. It cannot be broken down by chemical means. (Everything on the periodic table.)</li>' +
        '<li><b>Compound:</b> two or more elements <i>chemically combined</i> in a fixed ratio. Water is always H₂O: 2 hydrogen atoms for every 1 oxygen atom. A compound can only be separated by a <b>chemical</b> change.</li></ul>' +
        '<h3>Mixtures</h3><ul><li>Two or more substances <i>physically</i> combined, in any proportion. Each part keeps its own properties.</li>' +
        '<li><b>Homogeneous</b> (a solution): the same throughout. Salt water looks like one substance.</li>' +
        '<li><b>Heterogeneous:</b> you can see different parts, like sand in water.</li>' +
        '<li>Mixtures can be separated by <b>physical</b> means: filtration, evaporation, distillation, or chromatography.</li></ul>' +
        '<div class="key"><b>Key idea:</b> Compound = fixed ratio, chemically bonded, separated only chemically. Mixture = any ratio, physically combined, separated physically.</div>' },
      { t: 'Physical vs. chemical', h:
        '<h2>Physical vs. chemical properties and changes</h2>' +
        '<h3>Physical change</h3><p>The substance stays the same substance. Only its form or state changes. Examples: melting ice, cutting paper, dissolving sugar in water, boiling water.</p>' +
        '<h3>Chemical change (a chemical reaction)</h3><p>New substances with new properties are formed. Examples: burning wood, rusting iron, baking a cake, digesting food.</p>' +
        '<div class="tip"><b>Signs a chemical change happened:</b> a gas is produced (bubbles), a color change, a precipitate (solid) forms, light or heat is given off, or a new odor appears.</div>' +
        '<h3>Properties</h3><ul><li><b>Physical properties</b> can be observed without changing the substance: color, density, melting point, boiling point, conductivity, malleability.</li>' +
        '<li><b>Chemical properties</b> describe how a substance <i>reacts</i>: flammability, reactivity with acid, ability to rust.</li></ul>' +
        '<h3>Energy</h3><ul><li><b>Exothermic:</b> releases energy (feels hot). Freezing, condensation and burning are exothermic.</li>' +
        '<li><b>Endothermic:</b> absorbs energy (feels cold). Melting, boiling and photosynthesis are endothermic.</li></ul>' },
      { t: 'States & phase changes', h:
        '<h2>States of matter and phase changes</h2><figure>' + FIG.states + '<figcaption>Particle diagrams: how tightly the particles are packed and how freely they move.</figcaption></figure>' +
        '<ul><li><b>Solid:</b> particles locked in a regular pattern (a crystal) and vibrate in place. Definite shape and volume.</li>' +
        '<li><b>Liquid:</b> particles close together but able to slide past each other. Definite volume, but takes the shape of its container.</li>' +
        '<li><b>Gas:</b> particles far apart, moving fast and randomly. No definite shape or volume.</li></ul>' +
        '<figure>' + FIG.phase + '<figcaption>Going right (toward gas) absorbs energy: endothermic. Going left releases energy: exothermic.</figcaption></figure>' +
        '<div class="key"><b>Temperature</b> measures the average kinetic energy of the particles. During a phase change, temperature stays constant: the energy goes into changing the arrangement of the particles, not into speeding them up.</div>' +
        '<p><b>Temperature scales:</b> K = °C + 273. Water freezes at 0 °C (273 K) and boils at 100 °C (373 K).</p>' },
      { t: 'Measurement & SI units', h:
        '<h2>Measurement and SI units</h2><p>Every measurement needs a <b>number and a unit</b>. Science uses the metric (SI) system:</p>' +
        '<table class="tbl"><tr><th>Quantity</th><th>Unit</th><th>Symbol</th></tr><tr><td>Mass</td><td>gram / kilogram</td><td>g / kg</td></tr><tr><td>Length</td><td>meter</td><td>m</td></tr><tr><td>Volume</td><td>liter (or cm³)</td><td>L, mL</td></tr><tr><td>Temperature</td><td>kelvin</td><td>K</td></tr><tr><td>Amount of substance</td><td>mole</td><td>mol</td></tr><tr><td>Pressure</td><td>kilopascal</td><td>kPa</td></tr><tr><td>Energy</td><td>joule</td><td>J</td></tr></table>' +
        '<h3>Metric prefixes</h3><table class="tbl"><tr><th>Prefix</th><th>Symbol</th><th>Means</th></tr><tr><td>kilo-</td><td>k</td><td>10³ = 1000</td></tr><tr><td>deci-</td><td>d</td><td>10⁻¹ = 0.1</td></tr><tr><td>centi-</td><td>c</td><td>10⁻² = 0.01</td></tr><tr><td>milli-</td><td>m</td><td>10⁻³ = 0.001</td></tr><tr><td>micro-</td><td>μ</td><td>10⁻⁶</td></tr><tr><td>nano-</td><td>n</td><td>10⁻⁹</td></tr></table>' +
        '<p class="hint">These prefixes are on your Reference Tables. 1 mL = 1 cm³, and 1000 mL = 1 L.</p>' +
        '<h3>Accuracy vs. precision</h3><figure>' + FIG.target + '</figure>' +
        '<ul><li><b>Accuracy:</b> how close a measurement is to the true (accepted) value.</li><li><b>Precision:</b> how close repeated measurements are to <i>each other</i>.</li></ul>' },
      { t: 'Significant figures', h:
        '<h2>Significant figures</h2><p>Significant figures (sig figs) are the digits in a measurement that you actually know, plus one estimated digit. They show how precise a measurement is.</p>' +
        '<h3>Counting rules</h3><ol><li>Non-zero digits are <b>always</b> significant. (<b>347</b> has 3)</li><li>Zeros <b>between</b> non-zero digits are significant. (<b>4005</b> has 4)</li>' +
        '<li><b>Leading</b> zeros are <b>never</b> significant. (0.00<b>52</b> has 2)</li><li><b>Trailing</b> zeros are significant only if there is a decimal point. (<b>25.0</b> has 3; <b>2500</b> has 2; <b>2500.</b> has 4)</li></ol>' +
        '<div class="tip"><b>Shortcut (Atlantic-Pacific rule):</b> If a decimal point is <b>P</b>resent, start counting from the <b>P</b>acific (left) side at the first non-zero digit. If it is <b>A</b>bsent, start from the <b>A</b>tlantic (right) side at the first non-zero digit.</div>' +
        '<h3>Calculating with sig figs</h3><ul><li><b>Multiply or divide:</b> the answer has the same number of sig figs as the measurement with the <i>fewest sig figs</i>. 2.5 × 3.42 = 8.55 → <b>8.6</b> (2 sig figs)</li>' +
        '<li><b>Add or subtract:</b> the answer has the same number of <i>decimal places</i> as the measurement with the fewest decimal places. 12.11 + 0.3 = 12.41 → <b>12.4</b></li></ul>' +
        '<h3>Scientific notation</h3><p>Write numbers as a coefficient between 1 and 10 times a power of 10. 0.00052 = 5.2 × 10⁻⁴, and 2500 (with 3 sig figs) = 2.50 × 10³.</p>' +
        '<div class="br"><button class="btn bt" onclick="go(5)">Practice with the Sig Figs calculator</button></div>' },
      { t: 'Density & % error', h:
        '<h2>Density and percent error</h2><h3>Density</h3><p><b>Density = mass ÷ volume</b> (D = m/V), usually in g/cm³ or g/mL. Density is a physical property that helps identify a substance, because it stays the same no matter how big the sample is.</p>' +
        '<ul><li>An object less dense than water (1.0 g/mL) floats; more dense sinks.</li><li>To find the volume of an irregular solid, use <b>water displacement</b>: volume = final water level − starting water level.</li></ul>' +
        '<div class="steps"><div class="st">Worked example</div>A metal cube has a mass of 54.0 g. It raises the water in a graduated cylinder from 20.0 mL to 40.0 mL.<br>V = 40.0 − 20.0 = 20.0 mL<br>D = 54.0 g ÷ 20.0 mL = <b>2.70 g/mL</b> (aluminum!)</div>' +
        '<h3>Percent error</h3><p>How far off a lab measurement is from the accepted value:</p><div class="key">% error = (measured value − accepted value) ÷ accepted value × 100</div>' +
        '<div class="steps"><div class="st">Worked example</div>You measure the density of aluminum as 2.60 g/mL. The accepted value is 2.70 g/mL.<br>(2.60 − 2.70) ÷ 2.70 × 100 = <b>−3.7%</b> (the measurement was 3.7% too low)</div>' +
        '<div class="br"><button class="btn bt" onclick="go(5)">Open the Measurement calculator</button></div>' }
    ],
    quiz: [
      { q: 'Which of these is a compound?', o: ['Oxygen gas (O₂)', 'Salt water', 'Sodium chloride (NaCl)', 'Iron (Fe)'], a: 2, x: 'NaCl is two different elements chemically combined in a fixed ratio. O₂ and Fe are elements; salt water is a homogeneous mixture.' },
      { q: 'Which is a chemical change?', o: ['Ice melting', 'Iron rusting', 'Sugar dissolving in tea', 'Cutting a wire'], a: 1, x: 'Rusting forms a new substance (iron oxide). The others change form, not identity.' },
      { q: 'How many significant figures are in 0.04050?', o: ['3', '4', '5', '6'], a: 1, x: 'Leading zeros don\'t count. The digits 4, 0, 5 and the trailing 0 (after a decimal point) are significant: 4 sig figs.' },
      { q: 'A rock has a mass of 30.0 g and a volume of 12.0 cm³. What is its density?', o: ['0.400 g/cm³', '2.50 g/cm³', '18.0 g/cm³', '360. g/cm³'], a: 1, x: 'D = m/V = 30.0 ÷ 12.0 = 2.50 g/cm³.' },
      { q: 'Which phase change is exothermic?', o: ['Melting', 'Boiling', 'Sublimation', 'Freezing'], a: 3, x: 'Freezing releases energy as particles lock into place. Melting, boiling and sublimation all absorb energy.' },
      { q: 'Which mixture is heterogeneous?', o: ['Air', 'Sand and water', 'Sugar water', 'Brass (a metal alloy)'], a: 1, x: 'You can see the separate parts of sand in water. The others are uniform throughout (solutions).' },
      { q: 'A student measures 9.5 g for a sample whose accepted mass is 10.0 g. What is the percent error?', o: ['−5.0%', '−0.5%', '5.3%', '95%'], a: 0, x: '(9.5 − 10.0) ÷ 10.0 × 100 = −5.0%.' },
      { q: 'What is 25 °C in kelvin?', o: ['248 K', '273 K', '298 K', '25 K'], a: 2, x: 'K = °C + 273 = 25 + 273 = 298 K.' }
    ]
  }
};

/* ---------- rendering ---------- */
function unitProgress(id) {
  const L = LESSONS[id]; if (!L) return 0;
  const seen = Store.get('seen.' + id, []), q = Store.get('quiz.' + id, null);
  const total = L.sections.length + 1;
  return Math.round((seen.length + (q ? 1 : 0)) / total * 100);
}

RENDER.study = function (arg) {
  if (arg) return renderLesson(arg);
  const first = UNITS.filter(u => !u.s2), second = UNITS.filter(u => u.s2);
  const card = (u, i) => {
    const has = !!LESSONS[u.id], p = unitProgress(u.id);
    return '<div class="unit' + (has ? '' : ' locked') + '" onclick="goPage(\'study\',\'' + u.id + '\')"><div class="unum">' + (u.id === 'mid' ? '★' : i) + '</div><div style="flex:1"><h3>' + u.t +
      (has ? '' : ' <span class="badge">coming soon</span>') + '</h3><p>' + u.d + '</p>' + (has ? '<div class="prog"><i style="width:' + p + '%"></i></div><div class="rl" style="margin-top:3px">' + p + '% complete</div>' : '') + '</div></div>';
  };
  let n = 0;
  $('pg').innerHTML = '<div class="pt">Study Guide</div><div class="ps">Units follow your class syllabus, in the same order. Each unit has short lessons with diagrams, then a practice quiz with explanations.</div>' +
    '<div class="grp" style="color:var(--mu);padding-left:0">First semester</div>' + first.map(u => card(u, u.id === 'mid' ? 0 : ++n)).join('') +
    '<div class="grp" style="color:var(--mu);padding-left:0;margin-top:14px">Second semester (tentative - typical Regents topics)</div>' + second.map(u => card(u, ++n)).join('');
};

function renderLesson(arg) {
  const [id, secRaw] = String(arg).split('.');
  const unit = UNITS.find(u => u.id === id), L = LESSONS[id];
  if (!unit) return RENDER.study();
  if (!L) {
    $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'study\')">‹ All units</button><div class="pt" style="margin-top:12px">' + unit.t + '</div>' +
      '<div class="ps">' + unit.d + '</div><div class="card"><div class="cb" style="font-size:14px;line-height:1.6">This unit\'s lessons are coming soon. They will follow your textbook and class notes once those are added.' +
      (id === 'u4' ? '<div class="br"><button class="btn bc" onclick="goPage(\'table\')">Explore the Periodic Table now</button></div>' : '') +
      (id === 'u6' ? '<div class="br"><button class="btn bc" onclick="go(0)">Try the Molar Mass calculator</button></div>' : '') +
      (id === 'u7' ? '<div class="br"><button class="btn bc" onclick="go(2)">Try the Gas Laws calculator</button></div>' : '') +
      (id === 'u3' ? '<div class="br"><button class="btn bc" onclick="go(1)">Try the Equation Balancer</button></div>' : '') +
      '</div></div>';
    return;
  }
  const sec = secRaw === 'quiz' ? 'quiz' : Math.max(0, Math.min(L.sections.length - 1, parseInt(secRaw || '0', 10) || 0));
  const nav = L.sections.map((s, i) => '<button class="' + (i === sec ? 'on' : '') + '" onclick="goPage(\'study\',\'' + id + '.' + i + '\')">' + (i + 1) + '. ' + s.t + '</button>').join('') +
    '<button class="' + (sec === 'quiz' ? 'on' : '') + '" onclick="goPage(\'study\',\'' + id + '.quiz\')">✍️ Practice quiz</button>';
  let body;
  if (sec === 'quiz') body = renderQuiz(id, L.quiz);
  else {
    const seen = Store.get('seen.' + id, []); if (!seen.includes(sec)) { seen.push(sec); Store.set('seen.' + id, seen); }
    Store.set('lastLesson', { id: id + '.' + sec, title: unit.t + ': ' + L.sections[sec].t });
    const next = sec < L.sections.length - 1 ? '\'' + id + '.' + (sec + 1) + '\'' : '\'' + id + '.quiz\'';
    body = '<div class="lesson">' + L.sections[sec].h + '</div><div class="br">' +
      (sec > 0 ? '<button class="btn bs" onclick="goPage(\'study\',\'' + id + '.' + (sec - 1) + '\')">‹ Back</button>' : '') +
      '<button class="btn bc" onclick="goPage(\'study\',' + next + ')">' + (sec < L.sections.length - 1 ? 'Next: ' + L.sections[sec + 1].t + ' ›' : 'Take the practice quiz ›') + '</button></div>';
  }
  $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'study\')">‹ All units</button><div class="pt" style="margin-top:12px">' + unit.t + '</div><div class="ps">' + unit.d + '</div>' +
    '<div class="lnav">' + nav + '</div>' + body;
  if (sec === 'quiz') bindQuiz(id, L.quiz);
}

function renderQuiz(id, quiz) {
  const best = Store.get('quiz.' + id, null);
  return '<div class="ps">' + quiz.length + ' questions. Tap an answer to check it and see the explanation.' + (best ? ' Your best score: <b>' + best + '/' + quiz.length + '</b>.' : '') + '</div>' +
    quiz.map((q, i) => '<div class="q" data-q="' + i + '"><div class="qt">' + (i + 1) + '. ' + q.q + '</div>' +
      q.o.map((o, j) => '<button class="opt" data-j="' + j + '">' + o + '</button>').join('') + '<div class="qx"></div></div>').join('') +
    '<div id="qscore"></div>';
}
function bindQuiz(id, quiz) {
  const answered = {};
  document.querySelectorAll('.q').forEach(qe => {
    const i = +qe.dataset.q, q = quiz[i];
    qe.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (answered[i] !== undefined) return;
      const j = +b.dataset.j; answered[i] = j === q.a;
      qe.querySelectorAll('.opt').forEach(x => { if (+x.dataset.j === q.a) x.classList.add('right'); });
      if (j !== q.a) b.classList.add('wrong');
      const qx = qe.querySelector('.qx'); qx.innerHTML = (j === q.a ? '✅ <b>Correct.</b> ' : '❌ <b>Not quite.</b> ') + q.x; qx.classList.add('show');
      const done = Object.keys(answered).length;
      if (done === quiz.length) {
        const score = Object.values(answered).filter(Boolean).length;
        const best = Store.get('quiz.' + id, 0); if (score > best) Store.set('quiz.' + id, score);
        $('qscore').innerHTML = '<div class="rb"><div class="big">' + score + ' / ' + quiz.length + '</div><div class="rl">' +
          (score === quiz.length ? 'Perfect! You\'ve got this unit.' : score >= quiz.length * 0.75 ? 'Nice work. Review the explanations for the ones you missed.' : 'Go back over the lessons for the questions you missed, then try again.') +
          '</div><div class="br"><button class="btn bc" onclick="goPage(\'study\',\'' + id + '.quiz\')">Try again</button></div></div>';
      }
    });
  });
}
