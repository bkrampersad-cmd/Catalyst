/* Catalyst - Unit 2: Atomic Structure. */
'use strict';
const FIG2 = {
  models: (function () {
    let s = '';
    const xs = [60, 180, 300, 420, 540];
    // Dalton: solid sphere
    s += '<circle cx="60" cy="60" r="34" fill="#9C8FD0"/>';
    // Thomson: positive sphere with embedded electrons
    s += '<circle cx="180" cy="60" r="34" fill="#FFD6C9" stroke="#E07A5F" stroke-width="2"/>';
    [[-14, -14], [12, -18], [-18, 10], [14, 12], [0, 0], [2, 22]].forEach(p => { s += '<circle cx="' + (180 + p[0]) + '" cy="' + (60 + p[1]) + '" r="4.5" fill="#5B3FD0"/>'; });
    // Rutherford: tiny nucleus, electrons around, mostly empty
    s += '<circle cx="300" cy="60" r="34" fill="none" stroke="#C9BFEA" stroke-dasharray="4 4"/><circle cx="300" cy="60" r="5" fill="#E07A5F"/>';
    [[-22, -16], [20, -20], [-10, 26], [26, 14]].forEach(p => { s += '<circle cx="' + (300 + p[0]) + '" cy="' + (60 + p[1]) + '" r="4" fill="#5B3FD0"/>'; });
    // Bohr: rings
    s += '<circle cx="420" cy="60" r="7" fill="#E07A5F"/><circle cx="420" cy="60" r="20" class="sv-g"/><circle cx="420" cy="60" r="34" class="sv-g"/>' +
      '<circle cx="420" cy="40" r="4" fill="#5B3FD0"/><circle cx="420" cy="80" r="4" fill="#5B3FD0"/><circle cx="454" cy="60" r="4" fill="#5B3FD0"/><circle cx="386" cy="60" r="4" fill="#5B3FD0"/><circle cx="420" cy="26" r="4" fill="#5B3FD0"/>';
    // Wave-mechanical: cloud
    s += '<defs><radialGradient id="cl"><stop offset="0" stop-color="#5B3FD0" stop-opacity=".75"/><stop offset="1" stop-color="#5B3FD0" stop-opacity="0"/></radialGradient></defs>' +
      '<circle cx="540" cy="60" r="38" fill="url(#cl)"/><circle cx="540" cy="60" r="5" fill="#E07A5F"/>';
    const names = [['Dalton', '1803'], ['Thomson', '1897'], ['Rutherford', '1911'], ['Bohr', '1913'], ['Wave-mechanical', '1926']];
    names.forEach((n, i) => { s += SV.t(xs[i], 118, n[0]) + SV.t(xs[i], 135, n[1], 'sv-s'); });
    s += SV.arrow(20, 152, 580, 152, '#C9BFEA');
    return SV.wrap(600, 160, 'Five models of the atom, from Dalton to the wave-mechanical model', s);
  })(),
  gold: SV.wrap(520, 170, 'Rutherford gold foil experiment',
    '<rect x="230" y="20" width="16" height="130" fill="#F2C94C" stroke="#C99600"/>' + SV.t(238, 166, 'gold foil', 'sv-s') +
    '<rect x="10" y="70" width="60" height="30" rx="5" fill="#E6E0F8" stroke="#9C8FD0"/>' + SV.t(40, 90, 'alpha', 'sv-s') +
    [60, 75, 85, 95, 110].map(y => SV.arrow(70, y, 500, y, '#0FA89B')).join('') +
    '<path d="M70 82 L238 82 L120 30" fill="none" stroke="#B42318" stroke-width="3"/>' +
    '<path d="M70 88 L238 88 L470 150" fill="none" stroke="#E07A5F" stroke-width="3"/>' +
    SV.t(420, 40, 'most pass straight through', 'sv-s') + SV.t(150, 22, 'a few bounce back', 'sv-s')),
  dots: (function () {
    const list = [['Na', ['r1']], ['Mg', ['t1', 'b1']], ['Al', ['t1', 'r1', 'b1']], ['C', ['t1', 'r1', 'b1', 'l1']], ['N', ['t', 'r1', 'b1', 'l1']], ['O', ['t', 'r', 'b1', 'l1']], ['Cl', ['t', 'r', 'b', 'l1']], ['Ne', ['t', 'r', 'b', 'l']]];
    let s = '';
    list.forEach((a, i) => { const x = 40 + i * 70; s += SV.atom(x, 45, a[0], a[1]) + SV.t(x, 92, a[1].reduce((n, k) => n + (k.length > 1 ? 1 : 2), 0) + ' valence', 'sv-s'); });
    return SV.wrap(560, 104, 'Lewis electron-dot diagrams for Na, Mg, Al, C, N, O, Cl and Ne', s);
  })(),
  excited: SV.wrap(520, 190, 'An electron absorbing energy, jumping to a higher shell, then releasing light',
    '<circle cx="120" cy="95" r="10" fill="#E07A5F"/>' + [35, 60, 85].map(r => '<circle cx="120" cy="95" r="' + r + '" class="sv-g"/>').join('') +
    '<circle cx="180" cy="95" r="5" fill="#5B3FD0"/><circle cx="205" cy="95" r="5" fill="#0FA89B"/>' +
    '<path d="M182 88 Q195 60 203 90" fill="none" stroke="#0FA89B" stroke-width="2" stroke-dasharray="3 3"/>' +
    SV.t(120, 185, 'electron jumps to a higher shell (absorbs energy)', 'sv-s') +
    '<path d="M300 95 q10 -16 20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="#F2B200" stroke-width="3"/>' + SV.arrow(400, 95, 420, 95, '#F2B200') +
    SV.t(360, 70, 'falls back: releases light', 'sv-s') +
    '<rect x="300" y="125" width="200" height="34" fill="#111"/>' +
    [[318, '#7B1FA2'], [352, '#1E88E5'], [410, '#43A047'], [470, '#E53935']].map(l => '<rect x="' + l[0] + '" y="125" width="4" height="34" fill="' + l[1] + '"/>').join('') +
    SV.t(400, 178, 'bright-line spectrum', 'sv-s'))
};

LESSONS.u2 = {
  sections: [
    { t: 'Models of the atom', h: `
      <h2>How our model of the atom developed</h2>
      <p>No one has ever seen an atom directly. Scientists built a model, tested it with experiments, and changed it when new evidence didn't fit.</p>
      <figure>${FIG2.models}<figcaption>Each model kept what worked and fixed what didn't.</figcaption></figure>
      <ul>
        <li><b>Dalton (hard sphere):</b> atoms are tiny, solid, indivisible spheres. Atoms of the same element are alike.</li>
        <li><b>Thomson (plum pudding):</b> discovered the <b>electron</b> with the cathode ray tube. Pictured negative electrons scattered in a positive "pudding".</li>
        <li><b>Rutherford (nuclear model):</b> the gold foil experiment showed the atom has a tiny, dense, positive <b>nucleus</b>.</li>
        <li><b>Bohr (planetary model):</b> electrons travel in specific orbits called <b>shells</b> (energy levels) around the nucleus.</li>
        <li><b>Wave-mechanical (electron cloud):</b> the modern model. Electrons are found in <b>orbitals</b>, regions where an electron is <i>most likely</i> to be found.</li>
      </ul>
      <h3>The gold foil experiment</h3>
      <figure>${FIG2.gold}</figure>
      <ol>
        <li>Most alpha particles went straight through, so the atom is <b>mostly empty space</b>.</li>
        <li>A few were deflected or bounced back, so there must be a small, dense, <b>positively charged nucleus</b> that repels the positive alpha particles.</li>
      </ol>
      <div class="key"><b>Key idea:</b> Almost all of an atom's mass is in its nucleus, but the nucleus takes up almost none of its volume.</div>` },
    { t: 'Protons, neutrons & electrons', h: `
      <h2>Subatomic particles</h2>
      <table class="tbl"><tr><th>Particle</th><th>Charge</th><th>Mass</th><th>Location</th></tr>
        <tr><td><b>Proton</b> (p<sup>+</sup>)</td><td>+1</td><td>1 u</td><td>nucleus</td></tr>
        <tr><td><b>Neutron</b> (n<sup>0</sup>)</td><td>0</td><td>1 u</td><td>nucleus</td></tr>
        <tr><td><b>Electron</b> (e<sup>&minus;</sup>)</td><td>&minus;1</td><td>about 1/1836 u</td><td>outside the nucleus, in shells/orbitals</td></tr></table>
      <p class="hint">u = atomic mass unit. Protons and neutrons together are called <b>nucleons</b>.</p>
      <h3>The numbers that describe an atom</h3>
      <ul>
        <li><b>Atomic number</b> = number of protons. It identifies the element: every atom with 6 protons is carbon.</li>
        <li><b>Nuclear charge</b> = the number of protons, as a positive charge (carbon's is +6).</li>
        <li><b>Mass number</b> = protons + neutrons.</li>
        <li><b>Neutrons</b> = mass number &minus; atomic number.</li>
        <li>In a <b>neutral atom</b>, electrons = protons, so the charges cancel.</li>
      </ul>
      <div class="steps"><div class="st">Worked example: chlorine-37</div>
        Atomic number 17, so 17 protons and (neutral) 17 electrons.<br>
        Neutrons = 37 &minus; 17 = <b>20</b>.<br>Nuclear charge = <b>+17</b>.</div>
      <div class="br"><button class="btn bt" onclick="goPage('table','Cl')">See chlorine on the periodic table</button></div>` },
    { t: 'Isotopes & atomic mass', h: `
      <h2>Isotopes and average atomic mass</h2>
      <p><b>Isotopes</b> are atoms of the same element (same number of protons) with <b>different numbers of neutrons</b>, so they have different mass numbers.</p>
      <h3>Writing isotopes</h3>
      <ul><li>Name form: <b>carbon-12</b>, <b>carbon-14</b> (the number is the mass number).</li>
        <li>Symbol form: <span style="display:inline-flex;flex-direction:column;line-height:1;vertical-align:middle;text-align:right;font-size:12px"><span>14</span><span>6</span></span><b style="font-size:18px">C</b>, with the mass number on top and the atomic number on the bottom.</li></ul>
      <p>Carbon-12 has 6 neutrons and carbon-14 has 8. Both have 6 protons, so both are carbon.</p>
      <h3>Average atomic mass</h3>
      <p>The mass on the periodic table is a <b>weighted average</b> of all the naturally occurring isotopes, based on how common each one is.</p>
      <div class="key">average atomic mass = (mass<sub>1</sub> &times; %<sub>1</sub>) + (mass<sub>2</sub> &times; %<sub>2</sub>) + &hellip; &nbsp;(with the percents written as decimals)</div>
      <div class="steps"><div class="st">Worked example: chlorine</div>
        Chlorine-35: mass 34.97 u, 75.76% &nbsp;&middot;&nbsp; Chlorine-37: mass 36.97 u, 24.24%<br>
        (34.97 &times; 0.7576) + (36.97 &times; 0.2424) = 26.49 + 8.96 = <b>35.45 u</b><br>
        The average is closer to 35 because chlorine-35 is much more common.</div>
      <div class="tip"><b>Check your answer:</b> the average must land between the lightest and heaviest isotope, closer to the most abundant one.</div>
      <div class="br"><button class="btn bt" onclick="go(6)">Open the Average Atomic Mass calculator</button></div>` },
    { t: 'Electron shells', h: `
      <h2>Electron shells and configurations</h2>
      <p>In the Bohr model, electrons fill <b>shells</b> (energy levels) starting closest to the nucleus. Shells farther out hold electrons with <b>more energy</b>.</p>
      <ul><li>The periodic table on your Reference Tables lists each element's <b>electron configuration</b>, such as sodium: <b>2-8-1</b>. That means 2 electrons in the first shell, 8 in the second, and 1 in the third.</li>
        <li>The number of numbers is the number of occupied shells, which equals the element's <b>period</b>.</li>
        <li>The maximum in shell <i>n</i> is 2n&sup2;: 2, 8, 18, 32.</li></ul>
      <h3>Valence electrons</h3>
      <p>The <b>valence electrons</b> are in the outermost shell (the last number). They take part in bonding and decide how an element reacts. Everything else (the nucleus plus the inner electrons) is called the <b>kernel</b>.</p>
      <h3>Lewis electron-dot diagrams</h3>
      <p>Show the element symbol with a dot for each valence electron. Place one dot on each side before pairing any up.</p>
      <figure>${FIG2.dots}<figcaption>Period 3 elements plus carbon, nitrogen, oxygen and neon. Eight valence electrons (an octet) is the most stable arrangement.</figcaption></figure>
      <div class="br"><button class="btn bt" onclick="goPage('table')">Tap any element to see its Bohr diagram</button></div>` },
    { t: 'Excited states & spectra', h: `
      <h2>Ground state, excited state and bright-line spectra</h2>
      <ul><li><b>Ground state:</b> electrons are in the lowest energy shells available. This is the configuration on the periodic table.</li>
        <li><b>Excited state:</b> an electron <b>absorbs energy</b> (from heat, electricity or light) and jumps to a higher shell. The atom has the <i>same total number of electrons</i>, arranged differently.</li></ul>
      <div class="steps"><div class="st">Example: sodium (11 electrons)</div>Ground state: <b>2-8-1</b><br>Possible excited states: <b>2-7-2</b>, 2-8-0-1, 1-8-2. Each still adds up to 11.</div>
      <figure>${FIG2.excited}</figure>
      <p>The excited state is unstable. When the electron falls back to a lower shell, it <b>releases energy as light</b> of specific wavelengths (colors).</p>
      <h3>Bright-line spectra</h3>
      <ul><li>Passing that light through a prism or spectroscope separates it into a pattern of bright lines.</li>
        <li>Each element has its own unique pattern, like a fingerprint, so spectra can identify elements, even in distant stars.</li>
        <li><b>Flame tests</b> use the same idea: lithium and strontium burn red, sodium yellow-orange, potassium violet, and copper blue-green.</li></ul>
      <div class="key"><b>Remember:</b> absorb energy &rarr; jump up (excited). Release energy &rarr; fall down, and light is emitted.</div>` }
  ],
  quiz: [
    { q: 'What did the gold foil experiment show?', o: ['Atoms are solid, indivisible spheres', 'Electrons move in fixed orbits', 'Atoms are mostly empty space with a small, dense, positive nucleus', 'Atoms contain neutrons'], a: 2, x: 'Most alpha particles passed straight through (empty space), and a few bounced back off something small, dense and positive: the nucleus.' },
    { q: 'How many neutrons are in an atom of iron-56?', o: ['26', '30', '56', '82'], a: 1, x: 'Iron\'s atomic number is 26. Neutrons = mass number &minus; atomic number = 56 &minus; 26 = 30.' },
    { q: 'Isotopes of the same element have different numbers of:', o: ['protons', 'electrons', 'neutrons', 'valence electrons'], a: 2, x: 'Isotopes have the same number of protons (same element) but a different number of neutrons, so their mass numbers differ.' },
    { q: 'Which particle has the least mass?', o: ['Proton', 'Neutron', 'Electron', 'Alpha particle'], a: 2, x: 'An electron has about 1/1836 the mass of a proton.' },
    { q: 'How many valence electrons does sulfur (2-8-6) have?', o: ['2', '6', '8', '16'], a: 1, x: 'Valence electrons are in the outermost shell, the last number in the configuration: 6.' },
    { q: 'Which configuration is an excited state of sodium?', o: ['2-8-1', '2-7-2', '2-8-2', '2-8-8-1'], a: 1, x: 'Sodium has 11 electrons. 2-7-2 still has 11, but one electron has moved up a shell. 2-8-1 is the ground state; the other two don\'t add up to 11.' },
    { q: 'Bright-line spectra are produced when electrons:', o: ['absorb energy and move to a higher shell', 'release energy as they fall to a lower shell', 'are removed from the atom', 'collide with the nucleus'], a: 1, x: 'Light is given off when excited electrons return to lower energy levels. Absorbing energy (moving up) does not produce the bright lines.' },
    { q: 'Element X is 80.0% X-11 (11.0 u) and 20.0% X-10 (10.0 u). What is its average atomic mass?', o: ['10.2 u', '10.5 u', '10.8 u', '11.0 u'], a: 2, x: '(11.0 &times; 0.800) + (10.0 &times; 0.200) = 8.80 + 2.00 = 10.8 u. (This is boron.) It is closer to 11 because X-11 is more common.' },
    { q: 'In the wave-mechanical model, an orbital is:', o: ['a fixed circular path of an electron', 'a region where an electron is most likely to be found', 'the location of protons', 'another name for the nucleus'], a: 1, x: 'The modern model replaced fixed orbits with orbitals: regions of most probable electron location.' },
    { q: 'What is the nuclear charge of an oxygen atom?', o: ['+8', '+16', '&minus;2', '0'], a: 0, x: 'Oxygen has 8 protons, so its nucleus has a charge of +8. (The whole atom is neutral because it also has 8 electrons.)' }
  ]
};
