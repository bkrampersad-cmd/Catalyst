/* Catalyst - Unit 1: Atoms & Water. Follows the class storyline, Sep 2-16, 2026:
   elements for life (Lesson 2), water's properties (Lesson 3), charges and the sticky-tape lab (Lesson 4),
   "The Number of Neutrons" and the Ions activity (Sep 15-16). */
'use strict';
const FIGC1 = {
  /* isotope symbol inline: mass number on top, atomic number on the bottom, optional charge top right */
  iso(A, Z, sym, chg) {
    return '<span style="display:inline-flex;flex-direction:column;line-height:1;vertical-align:middle;text-align:right;font-size:12px"><span>' + A + '</span><span>' + Z + '</span></span><b style="font-size:18px;text-transform:none">' + sym + '</b>' +
      (chg ? '<sup style="font-size:12px;font-weight:700">' + chg + '</sup>' : '');
  },
  /* 2 H atoms + 1 O atom join to make 1 water molecule */
  water: (function () {
    const ball = (x, y, r, sym, fill, stroke) => '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="2"/>' + SV.t(x, y, sym, 'sv-a');
    const H = (x, y) => ball(x, y, 17, 'H', '#E6E0F8', '#9C8FD0'), O = (x, y) => ball(x, y, 26, 'O', '#FFD6C9', '#E07A5F');
    let s = H(40, 72) + SV.t(72, 77, '+') + H(104, 72) + SV.t(136, 77, '+') + O(176, 72);
    s += SV.t(40, 112, 'H atom', 'sv-s') + SV.t(104, 112, 'H atom', 'sv-s') + SV.t(176, 112, 'O atom', 'sv-s');
    s += '<path d="M24 126 v8 h170 v-8" fill="none" stroke="#C9BFEA" stroke-width="1.5"/>' + SV.t(109, 150, '3 separate atoms', 'sv-s');
    s += SV.arrow(220, 72, 292, 72, '#0FA89B') + SV.t(256, 58, 'bond', 'sv-s');
    s += O(380, 64) + H(350, 94) + H(410, 94);
    s += SV.t(380, 136, '1 water molecule, H₂O') + SV.t(380, 154, '2 hydrogen ATOMS + 1 oxygen ATOM', 'sv-s');
    return SV.wrap(520, 166, 'Two hydrogen atoms and one oxygen atom bond to form one water molecule', s);
  })(),
  /* sticky-tape lab: like tapes repel, unlike attract, neutral paper attracts both */
  tape: (function () {
    const strip = (x, fill) => '<rect x="' + x + '" y="28" width="18" height="70" rx="2" fill="' + fill + '" opacity=".85"/>';
    const T = '#9C8FD0', B = '#4FC3B8';
    let s = '';
    // panel 1: top + top repel
    s += strip(76, T) + strip(106, T) + SV.arrow(72, 63, 48, 63, '#B42318') + SV.arrow(128, 63, 152, 63, '#B42318');
    s += SV.t(85, 116, 'top', 'sv-s') + SV.t(115, 116, 'top', 'sv-s') + SV.t(100, 142, 'Repel') + SV.t(100, 160, 'same kind of charge', 'sv-s');
    // panel 2: top + bottom attract
    s += strip(262, T) + strip(320, B) + SV.arrow(282, 63, 297, 63, '#237A57') + SV.arrow(318, 63, 303, 63, '#237A57');
    s += SV.t(271, 116, 'top', 'sv-s') + SV.t(329, 116, 'bottom', 'sv-s') + SV.t(300, 142, 'Attract') + SV.t(300, 160, 'opposite charges', 'sv-s');
    // panel 3: neutral paper attracts both
    s += strip(438, T) + strip(544, B) + '<rect x="481" y="28" width="38" height="70" rx="2" fill="#FFFFFF" stroke="#9C8FD0" stroke-width="1.5"/>';
    [[490, 44, '+'], [510, 44, '−'], [490, 63, '−'], [510, 63, '+'], [490, 82, '+'], [510, 82, '−']].forEach(c => { s += SV.t(c[0], c[1] + 5, c[2], 'sv-s'); });
    s += SV.arrow(459, 63, 477, 63, '#237A57') + SV.arrow(541, 63, 523, 63, '#237A57');
    s += SV.t(447, 116, 'top', 'sv-s') + SV.t(500, 116, 'paper', 'sv-s') + SV.t(553, 116, 'bottom', 'sv-s') + SV.t(500, 142, 'Attracts both') + SV.t(500, 160, 'neutral: equal + and −', 'sv-s');
    return SV.wrap(600, 170, 'Sticky tape lab: two top tapes repel, a top and a bottom tape attract, and neutral paper attracts both tapes', s);
  })(),
  /* labeled atom: nucleus, energy levels, electrons, electron cloud (a carbon-12 atom) */
  atom: (function () {
    const cx = 200, cy = 150, L = 'style="text-anchor:start"';
    let s = '<defs><radialGradient id="c1cloud"><stop offset="0" stop-color="#5B3FD0" stop-opacity=".28"/><stop offset="1" stop-color="#5B3FD0" stop-opacity="0"/></radialGradient></defs>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="135" fill="url(#c1cloud)"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="62" class="sv-g"/><circle cx="' + cx + '" cy="' + cy + '" r="108" class="sv-g"/>';
    for (let i = 0; i < 12; i++) {
      const r = 6.6 * Math.sqrt(i + 0.5), a = i * 2.39996, x = (cx + r * Math.cos(a)).toFixed(1), y = (cy + r * Math.sin(a)).toFixed(1), p = i % 2 === 0;
      s += '<circle cx="' + x + '" cy="' + y + '" r="6.6" fill="' + (p ? '#E07A5F' : '#B8B3C9') + '" stroke="#fff" stroke-width=".8"/>';
      if (p) s += '<text x="' + x + '" y="' + (+y + 3.8).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">+</text>';
    }
    const e = (r, deg) => { const a = deg * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; };
    [e(62, 90), e(62, 270), e(108, 30), e(108, 120), e(108, 210), e(108, 300)].forEach(p => {
      s += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="6.5" fill="#0FA89B"/><text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 3.5).toFixed(1) + '" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">−</text>';
    });
    const lead = (x1, y1, x2, y2) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#6E6888" stroke-width="1"/>';
    s += lead(218, 136, 352, 58) + '<text class="sv-t" x="360" y="50" ' + L + '>Nucleus</text>' +
      '<text class="sv-s" x="360" y="67" ' + L + '>protons (+) and neutrons (no charge)</text>' + '<text class="sv-s" x="360" y="83" ' + L + '>tiny, dense, almost all of the mass</text>';
    const ring = e(108, -8);
    s += lead(ring[0].toFixed(1), ring[1].toFixed(1), 352, 126) + '<text class="sv-t" x="360" y="131" ' + L + '>Energy levels (shells)</text>';
    const el = e(108, 30);
    s += lead((el[0] + 7).toFixed(1), (el[1] - 2).toFixed(1), 352, 190) + '<text class="sv-t" x="360" y="186" ' + L + '>Electron (e⁻)</text>' +
      '<text class="sv-s" x="360" y="203" ' + L + '>negative, about 0 amu</text>';
    s += lead(268, 260, 352, 250) + '<text class="sv-t" x="360" y="246" ' + L + '>Electron cloud</text>' +
      '<text class="sv-s" x="360" y="263" ' + L + '>the area outside the nucleus,</text>' + '<text class="sv-s" x="360" y="279" ' + L + '>mostly empty space</text>';
    s += SV.t(cx, 300, 'carbon-12: 6 p⁺, 6 n⁰, 6 e⁻ (not to scale)', 'sv-s');
    return SV.wrap(600, 310, 'Labeled model of a carbon-12 atom: nucleus with protons and neutrons, energy levels, electrons and the electron cloud', s);
  })(),
  /* isotope notation for argon-40 */
  notation: (function () {
    const L = 'style="text-anchor:start"';
    let s = '<text class="sv-t" x="16" y="34" ' + L + '>mass number</text><text class="sv-s" x="16" y="51" ' + L + '>protons + neutrons</text>';
    s += '<text class="sv-t" x="16" y="104" ' + L + '>atomic number</text><text class="sv-s" x="16" y="121" ' + L + '>protons only</text>';
    s += SV.arrow(160, 38, 204, 38, '#9C8FD0') + SV.arrow(160, 110, 204, 110, '#9C8FD0');
    s += '<text x="244" y="48" text-anchor="end" font-size="24" font-weight="700" fill="#5B3FD0">40</text>';
    s += '<text x="244" y="118" text-anchor="end" font-size="24" font-weight="700" fill="#0FA89B">18</text>';
    s += '<text x="250" y="80" font-size="56" font-weight="700" fill="#22145A" dominant-baseline="central">Ar</text>';
    s += '<text class="sv-t" x="350" y="68" ' + L + '>argon-40</text><text class="sv-s" x="350" y="86" ' + L + '>18 p⁺, 22 n⁰, 18 e⁻</text>';
    return SV.wrap(470, 132, 'Isotope notation for argon-40: mass number 40 on top, atomic number 18 on the bottom', s);
  })(),
  /* two SVGs side by side with a label between */
  pair(a, mid, b) {
    return '<div style="display:flex;align-items:center;justify-content:center;gap:6px"><div style="flex:1 1 0;min-width:0">' + a + '</div>' +
      '<div style="font-size:13px;font-weight:600;color:#4C2A9E;text-align:center;flex:0 0 58px">' + mid + '</div><div style="flex:1 1 0;min-width:0">' + b + '</div></div>';
  }
};

LESSONS.c1 = {
  sections: [
    { t: 'Atoms, elements & molecules', tp: ['aem'], h: `
      <h2>Atoms, elements and molecules</h2>
      <p>Lesson 2 asked why certain substances are so important for life. To answer that, you need three words that sound alike but mean different things.</p>
      <ul>
        <li><b>Atom:</b> the smallest unit of matter, the building block of everything (your shirt, a penny, a red blood cell).</li>
        <li><b>Element:</b> one <i>type</i> of atom. There are <b>118</b> elements, and each has its own symbol (H for hydrogen, O for oxygen, Ag for silver). Every atom of an element has the same number of protons.</li>
        <li><b>Molecule:</b> two or more atoms joined by <b>chemical bonds</b>, for example H₂O, CO₂ and O₂.</li>
      </ul>
      <figure>${FIGC1.water}<figcaption>Three atoms from two elements join to make one molecule.</figcaption></figure>
      <div class="tip"><b>Common mistake:</b> water is <b>not</b> "2 hydrogen molecules and 1 oxygen molecule." One water molecule is made of <b>2 hydrogen ATOMS</b> and <b>1 oxygen ATOM</b>. The H and the O are atoms; only the whole H₂O unit is a molecule.</div>
      <h3>Reading a chemical formula</h3>
      <p>A formula tells you <b>which</b> atoms are in a molecule (the symbols) and <b>how many</b> of each (the small subscript numbers). No subscript means 1.</p>
      <table class="tbl"><tr><th>Formula</th><th>Name</th><th>Atoms in one molecule</th><th class="n">Total</th></tr>
        <tr><td>H₂O</td><td>water</td><td>2 H + 1 O</td><td class="n">3</td></tr>
        <tr><td>CO₂</td><td>carbon dioxide (we breathe it out, plants take it in)</td><td>1 C + 2 O</td><td class="n">3</td></tr>
        <tr><td>O₂</td><td>oxygen gas (we breathe it in)</td><td>2 O</td><td class="n">2</td></tr>
        <tr><td>C₆H₁₂O₆</td><td>glucose, a simple sugar</td><td>6 C + 12 H + 6 O</td><td class="n">24</td></tr></table>
      <div class="steps"><div class="st">Worked example: glucose, C₆H₁₂O₆</div>
        Elements: C, H and O, so <b>3 elements</b>.<br>
        Atoms: 6 + 12 + 6 = <b>24 atoms</b> in one molecule.<br>
        That is "simple" for a molecule of life. Proteins and DNA contain thousands of atoms.</div>
      <h3>What makes substances different</h3>
      <p>The <b>number</b>, <b>type</b> and <b>arrangement</b> of atoms make each substance what it is.</p>
      <ul><li><b>Number:</b> H₂O (water) and H₂O₂ (hydrogen peroxide) use the same two elements, but one extra O atom makes a totally different substance.</li>
        <li><b>Type:</b> CO₂ and H₂O both have 3 atoms, but different elements.</li>
        <li><b>Arrangement:</b> glucose and fructose are both C₆H₁₂O₆, but their atoms are connected differently, so they are different sugars.</li></ul>
      <h3>The elements for life</h3>
      <p>The molecules of life (carbohydrates, proteins, nucleic acids like DNA, and the phospholipids in cell membranes) are built mostly from six elements, easy to remember as <b>CHNOPS</b>.</p>
      <table class="tbl"><tr><th>Element</th><th>Symbol</th><th class="n">About this % of your body mass</th></tr>
        <tr><td>Oxygen</td><td>O</td><td class="n">65%</td></tr><tr><td>Carbon</td><td>C</td><td class="n">18%</td></tr>
        <tr><td>Hydrogen</td><td>H</td><td class="n">10%</td></tr><tr><td>Nitrogen</td><td>N</td><td class="n">3%</td></tr>
        <tr><td>Phosphorus</td><td>P</td><td class="n">1%</td></tr><tr><td>Sulfur</td><td>S</td><td class="n">0.3%</td></tr></table>
      <p>None of these elements is alive by itself. Life comes from how their atoms are put together.</p>
      <div class="key"><b>Why carbon is special:</b> every living thing on Earth contains carbon. A carbon atom can form <b>4 bonds</b>, including bonds to other carbon atoms, so it can build long chains and rings. That makes carbon the backbone of the molecules of life.</div>` },

    { t: 'Why water is special', tp: ['water'], h: `
      <h2>Why is water so important?</h2>
      <p>Every molecule of life you saw in Lesson 2 was surrounded by water. In Lesson 3 you tested water against two other liquids, <b>acetone</b> and <b>mineral oil</b>, to see what makes it different.</p>
      <h3>Three properties to know</h3>
      <ul>
        <li><b>Surface tension:</b> the surface of a liquid acts like a stretched elastic skin that can push back against a force. It lets a water strider walk on a pond.</li>
        <li><b>Conductivity:</b> how well a material lets heat, electricity or sound pass through it. In this unit we mean <b>electrical</b> conductivity.</li>
        <li><b>Solubility:</b> the most of one substance that can dissolve in a given amount of another at a certain temperature and pressure. The substance that dissolves is the <b>solute</b>; the substance it dissolves in is the <b>solvent</b>.</li>
      </ul>
      <div class="steps"><div class="st">Example: salt water</div>
        Stir salt into water. Salt is the <b>solute</b>, water is the <b>solvent</b>, and the result is a solution. Water is such a good solvent for life that it is often called the "universal solvent."</div>
      <h3>The Lesson 3 stations</h3>
      <table class="tbl"><tr><th>Station</th><th>What happened</th><th>Why it matters for life</th></tr>
        <tr><td>Surface tension</td><td>Water held more drops on a penny than mineral oil or acetone</td><td>Water sticks to itself</td></tr>
        <tr><td>Weather data</td><td>Water heats up and cools down slowly</td><td>Water holds onto energy and steadies temperatures</td></tr>
        <tr><td>Aquatic plants</td><td>More life near the surface, where more light reaches</td><td>Light passes through water for photosynthesis</td></tr>
        <tr><td>Static electricity</td><td>A thin stream of water bent toward a charged balloon</td><td>Water molecules have charged ends (Unit 3)</td></tr>
        <tr><td>Solubility</td><td>Salt and sugar dissolved in water but not in mineral oil</td><td>Nutrients dissolve and travel in the body</td></tr>
        <tr><td>Conductivity</td><td>Pure water conducted poorly; salt water conducted well</td><td>Nerve signals depend on dissolved ions</td></tr></table>
      <h3>The penny-drop idea</h3>
      <p>Drip a liquid onto a penny one drop at a time and count how many drops fit before it spills. The more drops, the more the liquid's particles are <b>holding onto each other</b>. In class, water held the most drops and acetone the fewest.</p>
      <div class="key"><b>Seed for later:</b> stronger attractions between water molecules mean <b>higher surface tension</b>. Soap weakens those attractions, so it lowers surface tension.</div>
      <h3>Why does salt water conduct?</h3>
      <p>Pure water barely conducts electricity. When salt dissolves, it breaks apart into charged particles called <b>ions</b> (Na⁺ and Cl⁻). These <b>mobile ions</b> move through the water and carry the electric current.</p>
      <div class="tip"><b>Common mistake:</b> in a solution, the current is carried by <b>mobile ions</b>, not by electrons flowing through the water. And the bending water stream is not about conductivity; pure water barely conducts. It bends because each water molecule has a slightly positive end and a slightly negative end.</div>
      <div class="key"><b>Coming up:</b> Unit 2 explains conductivity with ions and electrolytes, and Unit 3 explains surface tension and the bending stream with polarity and intermolecular forces. Both start with charge, which is the next lesson.</div>` },

    { t: 'Charges & the parts of an atom', tp: ['sub'], h: `
      <h2>Charges and the parts of an atom</h2>
      <h3>The sticky-tape lab</h3>
      <p>In Lesson 4 you pulled "top" and "bottom" tapes apart, which gave them opposite charges, and then tested how they acted.</p>
      <figure>${FIGC1.tape}<figcaption>Like charges repel, unlike charges attract, and a neutral object is attracted to both.</figcaption></figure>
      <ul><li>Top + top and bottom + bottom <b>repel</b>: <b>like charges repel</b>.</li>
        <li>Top + bottom <b>attract</b>: <b>unlike (opposite) charges attract</b>.</li>
        <li>Paper and aluminum foil attracted <b>both</b> tapes. They are <b>neutral</b>.</li></ul>
      <div class="key"><b>Neutral means equal + and −, not "no charge."</b> Paper is made of atoms full of positive and negative particles. Near a charged tape, those charges shift a tiny bit, so the closer side is attracted.</div>
      <div class="tip"><b>Test-taking clue:</b> if an object attracts <b>both</b> tapes, it is <b>neutral</b>. A charged object would <b>repel</b> one of them. Repulsion is the only proof that something is charged.</div>
      <p>When you rub a balloon on your hair, <b>electrons</b> move from your hair to the balloon, so the balloon becomes <b>negative</b>. Only electrons move; protons are locked inside the nucleus. Charge is a property of particles, not a kind of energy, and it is a different force from magnetism.</p>
      <h3>The three subatomic particles</h3>
      <table class="tbl"><tr><th>Particle</th><th>Location</th><th class="n">Mass (amu)</th><th>Charge</th><th>Symbol</th></tr>
        <tr><td><b>Proton</b></td><td>nucleus</td><td class="n">1</td><td>positive (+1)</td><td>p⁺</td></tr>
        <tr><td><b>Neutron</b></td><td>nucleus</td><td class="n">1</td><td>neutral (0)</td><td>n⁰</td></tr>
        <tr><td><b>Electron</b></td><td>electron cloud</td><td class="n">0</td><td>negative (−1)</td><td>e⁻</td></tr></table>
      <p><b>amu</b> = atomic mass unit. <b>1 amu is 1/12 the mass of one carbon-12 atom</b>, about 1.66 &times; 10⁻²⁴ g. An electron's mass is so small (about 0.00055 amu) that we count it as 0.</p>
      <figure>${FIGC1.atom}<figcaption>If the nucleus were the size of a marble, the whole atom would be about the size of a football stadium.</figcaption></figure>
      <ul><li>The <b>nucleus</b> is tiny and dense and holds <b>almost all of the atom's mass</b>. It contains protons and neutrons, so its total charge is <b>positive</b>.</li>
        <li>The <b>electron cloud</b> is the area outside the nucleus, mostly empty space. Electrons move in <b>energy levels</b> (shells), and the cloud's total charge is <b>negative</b>.</li></ul>
      <div class="steps"><div class="st">Worked example: why atoms are neutral</div>
        A carbon atom has 6 protons (+6) and 6 electrons (−6).<br>
        +6 + (−6) = <b>0</b>. Atoms are neutral because <b># protons = # electrons</b>.<br>
        Neutrons have no charge, so they don't change this at all.</div>` },

    { t: 'Isotopes & atomic mass', tp: ['iso', 'sub'], h: `
      <h2>Isotopes and atomic mass</h2>
      <h3>Two numbers that describe an atom</h3>
      <ul><li><b>Atomic number</b> = number of <b>protons</b>. It identifies the element and never changes for that element: every atom with 6 protons is carbon.</li>
        <li><b>Mass number</b> = <b>protons + neutrons</b>. It is always a whole number and belongs to one specific isotope.</li></ul>
      <div class="tip"><b>Don't mix them up:</b> protons + neutrons is the <b>mass number</b>, not the atomic number. The atomic number counts protons only.</div>
      <h3>Isotopes</h3>
      <p><b>Isotopes</b> are atoms of the same element with the <b>same number of protons</b> but a <b>different number of neutrons</b>, so they have different mass numbers. Isotopes are named with the mass number, like <b>carbon-14</b> or <b>C-14</b>.</p>
      <figure>${FIGC1.notation}<figcaption>Isotope notation: mass number on top, atomic number on the bottom. An ion's charge goes at the top right.</figcaption></figure>
      <div class="key">neutrons = mass number − atomic number</div>
      <h3>Finding neutrons from the periodic table</h3>
      <p>The mass on the periodic table is the <b>average atomic mass</b>, a <b>weighted average</b> of all the element's isotopes based on how common each one is. Round it to a whole number to get the mass number of the <b>most abundant isotope</b>, then subtract the atomic number.</p>
      <div class="steps"><div class="st">Worked example: lithium</div>
        Atomic number 3, average atomic mass <b>6.94</b>, which rounds to <b>7</b>.<br>
        Lithium-7 is the most abundant isotope (about 92% of lithium atoms; lithium-6 is about 8%). That is why the average sits so close to 7.<br>
        Protons = 3, electrons = 3, neutrons = 7 − 3 = <b>4</b>.</div>
      <div class="steps"><div class="st">Worked example: argon-40</div>
        Atomic number 18, so 18 protons and 18 electrons. Mass number 40.<br>
        Neutrons = 40 − 18 = <b>22</b>. Symbol: ${FIGC1.iso(40, 18, 'Ar')}</div>
      <div class="steps"><div class="st">Worked example: chlorine-35 vs. chlorine-37</div>
        <table class="tbl"><tr><th></th><th class="n">${FIGC1.iso(35, 17, 'Cl')}</th><th class="n">${FIGC1.iso(37, 17, 'Cl')}</th></tr>
          <tr><td>Protons (atomic number)</td><td class="n">17</td><td class="n">17</td></tr>
          <tr><td>Neutrons</td><td class="n">35 − 17 = 18</td><td class="n">37 − 17 = 20</td></tr>
          <tr><td>Electrons (neutral atom)</td><td class="n">17</td><td class="n">17</td></tr></table>
        Chlorine's average mass is 35.45, which rounds to 35, so chlorine-35 is the most common (about 76%).</div>
      <div class="tip"><b>Common mistake with Cl-35:</b> the electrons equal the <b>protons</b> (17), and the 18 belongs to the <b>neutrons</b>. Don't swap them.</div>
      <div class="steps"><div class="st">Worked example: carbon-12 vs. carbon-14</div>
        Both have 6 protons and 6 electrons, so both are carbon and react the same way.<br>
        Carbon-12: 12 − 6 = <b>6 neutrons</b> (not 12!). Carbon-14: 14 − 6 = <b>8 neutrons</b>.<br>
        Carbon-12 is stable and makes up most carbon. Carbon-14 is radioactive and is used to date ancient remains of living things.</div>
      <h3>Atomic mass across the table</h3>
      <p>Because the table mass is an average, it usually rises with atomic number, but not always:</p>
      <figure>${FIG4.massPairs}</figure>
      <p>Argon (Z = 18) is heavier than potassium (Z = 19) because most argon atoms are argon-40 (22 neutrons) while most potassium atoms are potassium-39 (20 neutrons). The table is ordered by <b>atomic number</b>, not mass.</p>
      <div class="br"><button class="btn bt" onclick="go(11)">Practice with the Atom &amp; Ion Counter</button></div>` },

    { t: 'Ions', tp: ['ion', 'sub'], h: `
      <h2>Ions</h2>
      <p>Isotopes change the <b>neutrons</b>. Ions change the <b>electrons</b>. When an atom <b>gains or loses electrons</b>, its charges no longer cancel, and it becomes a charged particle called an <b>ion</b>.</p>
      <div class="key">protons − electrons = charge</div>
      <ul><li>A <b>cation</b> is a <b>positive</b> ion. <b>Metals</b> tend to <b>lose</b> electrons and form cations (Na⁺, Mg²⁺, Al³⁺).</li>
        <li>An <b>anion</b> is a <b>negative</b> ion. <b>Nonmetals</b> tend to <b>gain</b> electrons and form anions (Cl⁻, O²⁻, P³⁻).</li>
        <li>The charge is written at the <b>top right</b> of the symbol. A neutral atom has no charge written.</li></ul>
      <div class="tip"><b>Protons never change</b> when an ion forms. Changing the number of protons changes the atomic number, which makes a <b>different element</b>. Adding 3 protons to aluminum (13) would give 16 protons: that's sulfur, not Al³⁺.</div>
      <div class="tip"><b>Watch the math:</b> gaining an electron makes the charge <b>more negative</b>, because you are adding a negative particle. Losing an electron makes it <b>more positive</b>.</div>
      <h3>Element vs. isotope vs. ion</h3>
      <table class="tbl"><tr><th></th><th class="n">Al (element)</th><th class="n">Al-29 (isotope)</th><th class="n">Al³⁺ (ion)</th></tr>
        <tr><td>Protons</td><td class="n">13</td><td class="n">13</td><td class="n">13</td></tr>
        <tr><td>Neutrons</td><td class="n">14</td><td class="n"><b>16</b></td><td class="n">14</td></tr>
        <tr><td>Electrons</td><td class="n">13</td><td class="n">13</td><td class="n"><b>10</b></td></tr>
        <tr><td>Mass number</td><td class="n">27</td><td class="n">29</td><td class="n">27</td></tr></table>
      <table class="tbl" style="margin-top:10px"><tr><th></th><th class="n">P (element)</th><th class="n">P-32 (isotope)</th><th class="n">P³⁻ (ion)</th></tr>
        <tr><td>Protons</td><td class="n">15</td><td class="n">15</td><td class="n">15</td></tr>
        <tr><td>Neutrons</td><td class="n">16</td><td class="n"><b>17</b></td><td class="n">16</td></tr>
        <tr><td>Electrons</td><td class="n">15</td><td class="n">15</td><td class="n"><b>18</b></td></tr>
        <tr><td>Mass number</td><td class="n">31</td><td class="n">32</td><td class="n">31</td></tr></table>
      <div class="steps"><div class="st">Worked example: check the charges</div>
        Al³⁺: lost 3 electrons. 13 − 10 = <b>+3</b> (a cation).<br>
        P³⁻: gained 3 electrons. 15 − 18 = <b>−3</b> (an anion).</div>
      <h3>Ions and the noble gases</h3>
      <p>The <b>noble gases</b> (Group 18) have <b>completely filled outer shells</b>, so they hardly react at all. The outermost shell is called the <b>valence shell</b>. When atoms form ions, they often end up with the <b>same number of electrons as a noble gas</b>.</p>
      <ul><li>Al³⁺ has 10 electrons, the same as <b>neon</b> (atomic number 10).</li>
        <li>P³⁻ has 18 electrons, the same as <b>argon</b> (atomic number 18).</li></ul>
      <figure>${FIGC1.pair(SV.bohrIon('Na', 11, 12, [2, 8, 1], 0), 'loses 1 e⁻ &rarr;', SV.bohrIon('Na', 11, 12, [2, 8], 1))}
        ${FIGC1.pair(SV.bohrIon('Cl', 17, 18, [2, 8, 7], 0), 'gains 1 e⁻ &rarr;', SV.bohrIon('Cl', 17, 18, [2, 8, 8], -1))}
        <figcaption>Sodium loses its 1 outer electron and is left with 10, like neon. Chlorine gains 1 electron to reach 18, like argon. The nucleus does not change.</figcaption></figure>
      <div class="br"><button class="btn bt" onclick="go(11)">Count particles with the Atom &amp; Ion Counter</button></div>` }
  ],
  quiz: [
    { q: 'A lab report says water is made of "2 hydrogen molecules and 1 oxygen molecule." Which correction is right?', o: ['Water is made of 3 different elements', 'One water molecule is made of 2 hydrogen atoms and 1 oxygen atom', 'One water molecule is made of 1 hydrogen atom and 2 oxygen atoms', 'No correction is needed; H and O are molecules'], a: 1, tp: ['aem'],
      x: 'H₂O is <b>one molecule</b> built from <b>3 atoms</b>: 2 hydrogen atoms and 1 oxygen atom. The H and O are atoms, not molecules. There are only 2 elements (H and O), and the subscript 2 belongs to hydrogen.' },
    { q: 'Which of these is a molecule?', o: ['He', 'Mg²⁺', 'O₂', 'Fe'], a: 2, tp: ['aem'],
      x: 'O₂ is two oxygen atoms joined by a bond, so it is a molecule (made of just one element). He is a single atom, Mg²⁺ is an ion, and Fe is an element whose atoms are not grouped into molecules.' },
    { ctx: '<h3>Penny drop</h3>A class counted how many drops of each liquid fit on a penny before the liquid spilled over the edge.<br><br><b>Figure 1: Drops on a penny</b><table class="tbl"><tr><th>Liquid</th><th class="n">Average drops</th></tr><tr><td>Water</td><td class="n">31</td></tr><tr><td>Mineral oil</td><td class="n">20</td></tr><tr><td>Acetone</td><td class="n">14</td></tr></table>',
      q: 'Based on Figure 1, which liquid has the strongest attractions between its particles?', o: ['Water', 'Mineral oil', 'Acetone', 'They are all the same, because all three are liquids'], a: 0, tp: ['water'],
      x: 'The more drops a penny holds, the higher the <b>surface tension</b>, and surface tension comes from particles holding onto each other. Water held the most drops (31), so its molecules attract each other most strongly. Acetone held the fewest.' },
    { q: 'Pure water barely conducts electricity, but salt water conducts well. Why?', o: ['Salt adds extra electrons that flow through the water', 'Water molecules break apart into hydrogen and oxygen atoms', 'Salt makes the water warmer, so it conducts better', 'Dissolved salt breaks into mobile ions (Na⁺ and Cl⁻) that carry the current'], a: 3, tp: ['water', 'ion'],
      x: 'When NaCl dissolves, it separates into Na⁺ and Cl⁻ ions that can move. These <b>mobile ions</b> carry the current. Electrons do not travel through the solution, and the water molecules stay whole.' },
    { ctx: '<h3>Sticky tape investigation</h3>Students prepared "top" and "bottom" tapes and tested how they and an unknown object X interact.<br><br><b>Figure 2: Results</b><table class="tbl"><tr><th>Objects tested</th><th>Result</th></tr><tr><td>top tape + top tape</td><td>repel</td></tr><tr><td>top tape + bottom tape</td><td>attract</td></tr><tr><td>bottom tape + bottom tape</td><td>repel</td></tr><tr><td>object X + top tape</td><td>attract</td></tr><tr><td>object X + bottom tape</td><td>attract</td></tr></table>',
      q: 'Which statement best describes object X?', o: ['X has the same charge as the top tape', 'X has the same charge as the bottom tape', 'X is neutral: it has equal amounts of positive and negative charge', 'X contains no charged particles at all'], a: 2, tp: ['sub'],
      x: 'If X had the same charge as either tape, it would <b>repel</b> that tape. It attracts both, so it is <b>neutral</b>. Neutral does not mean "no charges": X is made of atoms with protons and electrons in equal numbers.' },
    { q: 'Which statement about the nucleus of an atom is correct?', o: ['It is tiny and dense, holds almost all of the mass, and has a positive charge', 'It contains the electrons and has a negative charge', 'It takes up most of the volume of the atom', 'It is neutral because the protons and neutrons cancel out'], a: 0, tp: ['sub'],
      x: 'The nucleus holds the protons (+) and neutrons (no charge), so it is positive and contains almost all the mass, yet it is tiny. Neutrons have no charge, so they cannot cancel the protons. The electrons are outside, in the mostly empty electron cloud.' },
    { q: 'How many neutrons and electrons are in a neutral atom of chlorine-35?', o: ['17 neutrons and 18 electrons', '35 neutrons and 17 electrons', '18 neutrons and 18 electrons', '18 neutrons and 17 electrons'], a: 3, tp: ['iso', 'sub'],
      x: 'Chlorine\'s atomic number is 17, so it has 17 protons, and a neutral atom has the same number of electrons: <b>17</b>. Neutrons = 35 − 17 = <b>18</b>. The first choice swaps the electrons and neutrons.' },
    { q: 'How many neutrons are in a neutral atom of carbon-12?', o: ['12', '6', '8', '18'], a: 1, tp: ['iso'],
      x: 'Neutrons = mass number − atomic number = 12 − 6 = <b>6</b>. The 12 is the mass number (protons + neutrons), not the neutron count. Carbon-14 is the isotope with 8 neutrons.' },
    { q: 'In the isotope symbol ' + FIGC1.iso(56, 26, 'Fe') + ', what does the 56 represent?', o: ['The atomic number', 'The number of protons', 'The mass number: protons + neutrons', 'The number of neutrons'], a: 2, tp: ['iso'],
      x: 'The top number is the <b>mass number</b> (protons + neutrons). The bottom number, 26, is the atomic number (protons). This iron atom has 56 − 26 = 30 neutrons.' },
    { q: 'The periodic table lists the average atomic mass of lithium as 6.94. Which statement is best supported?', o: ['Every lithium atom has a mass of 6.94 amu', 'Most lithium atoms are lithium-6', 'A lithium atom has 6.94 protons', 'Most lithium atoms are lithium-7'], a: 3, tp: ['iso'],
      x: 'The table mass is a <b>weighted average</b> of the isotopes. 6.94 rounds to 7 and sits very close to 7, so lithium-7 is by far the most common isotope. No single atom has a mass of 6.94, and protons always come in whole numbers (lithium has 3).' },
    { q: 'Which change turns a neutral aluminum atom into the ion Al³⁺?', o: ['It loses 3 electrons', 'It gains 3 protons', 'It gains 3 electrons', 'It loses 3 neutrons'], a: 0, tp: ['ion', 'sub'],
      x: 'Losing 3 electrons leaves 13 protons and 10 electrons: 13 − 10 = +3. Adding 3 protons would give 16 protons, which is a different element (sulfur). Gaining electrons would make a negative ion, and neutrons have no charge.' },
    { ctx: '<h3>Four particles</h3><b>Figure 3: Particle counts</b><table class="tbl"><tr><th>Particle</th><th class="n">Protons</th><th class="n">Neutrons</th><th class="n">Electrons</th></tr><tr><td>A</td><td class="n">15</td><td class="n">16</td><td class="n">15</td></tr><tr><td>B</td><td class="n">15</td><td class="n">17</td><td class="n">15</td></tr><tr><td>C</td><td class="n">15</td><td class="n">16</td><td class="n">18</td></tr><tr><td>D</td><td class="n">16</td><td class="n">16</td><td class="n">16</td></tr></table>',
      q: 'Based on Figure 3, which two particles are neutral atoms that are isotopes of the same element?', o: ['A and C', 'A and B', 'A and D', 'C and D'], a: 1, tp: ['iso', 'ion'],
      x: 'A and B both have 15 protons (phosphorus) and equal electrons, but different neutrons (16 and 17), so they are isotopes: P-31 and P-32. C has 3 extra electrons, so it is the ion P³⁻ (15 − 18 = −3). D has 16 protons, so it is a different element (sulfur).' }
  ]
};
