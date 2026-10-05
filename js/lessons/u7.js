/* Catalyst - Unit 7: Gas Laws. */
'use strict';
const FIG7 = {
  graphs: (function () {
    function axes(x, xl, yl) {
      return '<line x1="' + x + '" y1="130" x2="' + (x + 150) + '" y2="130" stroke="#22145A" stroke-width="2"/><line x1="' + x + '" y1="130" x2="' + x + '" y2="20" stroke="#22145A" stroke-width="2"/>' +
        SV.t(x + 75, 150, xl, 'sv-s') + '<text class="sv-s" x="' + (x - 14) + '" y="75" transform="rotate(-90 ' + (x - 14) + ' 75)">' + yl + '</text>';
    }
    let s = axes(40, 'Volume', 'Pressure') + '<path d="M50 28 Q70 110 185 122" class="sv-l"/>' + SV.t(115, 172, "Boyle's law", 'sv-t') + SV.t(115, 188, '(temperature constant)', 'sv-s');
    s += axes(250, 'Temperature (K)', 'Volume') + '<line x1="250" y1="130" x2="390" y2="32" class="sv-l"/>' + SV.t(325, 172, "Charles's law", 'sv-t') + SV.t(325, 188, '(pressure constant)', 'sv-s');
    s += axes(460, 'Temperature (K)', 'Pressure') + '<line x1="460" y1="130" x2="600" y2="40" class="sv-l"/>' + SV.t(535, 172, "Gay-Lussac's law", 'sv-t') + SV.t(535, 188, '(volume constant)', 'sv-s');
    return SV.wrap(630, 198, 'Graphs of Boyle’s, Charles’s and Gay-Lussac’s laws', s);
  })(),
  kmt: (function () {
    let s = '<rect x="10" y="10" width="220" height="140" rx="8" fill="#fff" stroke="#9C8FD0" stroke-width="2"/>';
    [[40, 40, 20, 10], [120, 30, -15, 18], [190, 60, -18, -12], [70, 110, 22, -8], [150, 120, 12, -20], [100, 75, -20, 6]].forEach(p => {
      s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="7" fill="#F2B200"/>' + SV.arrow(p[0], p[1], p[0] + p[2], p[1] + p[3], '#C99600');
    });
    return SV.wrap(240, 160, 'Gas particles in constant random straight-line motion', s);
  })()
};

LESSONS.u7 = {
  sections: [
    { t: 'Kinetic molecular theory', h: `
      <h2>Kinetic molecular theory (KMT)</h2>
      <figure>${FIG7.kmt}</figure>
      <p>The KMT explains how an <b>ideal gas</b> behaves:</p>
      <ol><li>Gas particles are in <b>constant, random, straight-line motion</b>.</li>
        <li>The particles are so small and far apart that their own <b>volume is negligible</b>; a gas is mostly empty space.</li>
        <li>There are <b>no attractive forces</b> between the particles.</li>
        <li>Collisions are <b>elastic</b>: energy can be transferred between particles, but no energy is lost.</li>
        <li>The average kinetic energy is proportional to the <b>kelvin temperature</b>.</li></ol>
      <h3>Real gases</h3>
      <p>Real gases act most like ideal gases at <b>high temperature and low pressure</b>, when the particles are far apart and moving fast, so attractions matter less. <b>Hydrogen and helium</b> behave most ideally because they are the smallest and have the weakest attractions.</p>
      <div class="key"><b>Avogadro's hypothesis:</b> equal volumes of different gases, at the same temperature and pressure, contain the <b>same number of particles</b> (molecules).</div>` },
    { t: 'Pressure & temperature', h: `
      <h2>Pressure, temperature and STP</h2>
      <h3>Pressure</h3>
      <p>Gas pressure comes from particles colliding with the walls of their container. More collisions, or harder ones, mean more pressure.</p>
      <div class="key">1 atm = 101.3 kPa = 760 mmHg (or torr)</div>
      <h3>Temperature</h3>
      <p>Gas law problems <b>always use kelvin</b>, because kelvin starts at absolute zero, where particle motion is at its minimum. Using &deg;C could give zero or negative values, which don't work in these formulas.</p>
      <div class="key">K = &deg;C + 273.15 &nbsp;(Reference Table 6)</div>
      <h3>STP: standard temperature and pressure</h3>
      <p><b>273.15 K (0 &deg;C)</b> and <b>1 atm (101.3 kPa)</b>. Both are on Reference Table 6.</p>
      <div class="steps"><div class="st">Quick conversions</div>
        27 &deg;C = 27 + 273.15 = <b>300.15 K</b><br>
        202.6 kPa &divide; 101.3 = <b>2.00 atm</b><br>
        380 mmHg &divide; 760 = <b>0.500 atm</b></div>` },
    { t: 'The three gas laws', h: `
      <h2>Boyle's, Charles's and Gay-Lussac's laws</h2>
      <figure>${FIG7.graphs}</figure>
      <h3>Boyle's law: pressure and volume (temperature constant)</h3>
      <p>P and V are <b>inversely</b> related: squeeze a gas into half the volume and its pressure doubles. <b>P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub></b></p>
      <h3>Charles's law: volume and temperature (pressure constant)</h3>
      <p>V and T are <b>directly</b> related: double the kelvin temperature and the volume doubles. <b>V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub></b></p>
      <h3>Gay-Lussac's law: pressure and temperature (volume constant)</h3>
      <p>P and T are <b>directly</b> related: heat a sealed can and the pressure rises. <b>P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub></b></p>
      <div class="steps"><div class="st">Example (Boyle)</div>A gas at 100. kPa fills 4.0 L. What is its volume at 200. kPa (same temperature)?<br>V<sub>2</sub> = P<sub>1</sub>V<sub>1</sub> / P<sub>2</sub> = (100. &times; 4.0) / 200. = <b>2.0 L</b></div>
      <div class="steps"><div class="st">Example (Charles)</div>A balloon holds 3.0 L at 300. K. What is its volume at 600. K (same pressure)?<br>V<sub>2</sub> = V<sub>1</sub>T<sub>2</sub> / T<sub>1</sub> = (3.0 &times; 600.) / 300. = <b>6.0 L</b></div>` },
    { t: 'Combined gas law', h: `
      <h2>The combined gas law</h2>
      <p>Reference Table 5 gives one formula that covers all three laws:</p>
      <div class="key" style="font-size:18px;text-align:center">P<sub>1</sub>V<sub>1</sub> / T<sub>1</sub> = P<sub>2</sub>V<sub>2</sub> / T<sub>2</sub></div>
      <p>If something stays constant, cross it out on both sides and you get Boyle's, Charles's or Gay-Lussac's law.</p>
      <h3>Problem-solving steps</h3>
      <ol><li>List P<sub>1</sub>, V<sub>1</sub>, T<sub>1</sub>, P<sub>2</sub>, V<sub>2</sub> and T<sub>2</sub>, and mark the unknown.</li>
        <li>Convert all temperatures to <b>kelvin</b>.</li><li>Make sure both pressures (and both volumes) use the same units.</li>
        <li>Rearrange, plug in, and solve. Ask yourself whether the answer makes sense.</li></ol>
      <div class="steps"><div class="st">Worked example</div>A gas occupies 2.00 L at 27 &deg;C and 101.3 kPa. What volume will it occupy at 127 &deg;C and 202.6 kPa?<br>
        T<sub>1</sub> = 27 + 273.15 = 300.15 K &nbsp;&middot;&nbsp; T<sub>2</sub> = 127 + 273.15 = 400.15 K<br>
        V<sub>2</sub> = P<sub>1</sub>V<sub>1</sub>T<sub>2</sub> / (T<sub>1</sub>P<sub>2</sub>) = (101.3 &times; 2.00 &times; 400.15) / (300.15 &times; 202.6) = <b>1.33 L</b><br>
        <span class="rl">Sense check: doubling the pressure would halve the volume, and the higher temperature makes it a bit bigger again.</span></div>
      <div class="br"><button class="btn bt" onclick="go(2)">Open the Gas Laws calculator</button></div>` },
    { t: 'Ideal gas law (enrichment)', h: `
      <h2>The ideal gas law</h2>
      <p>When you know (or need) the number of <b>moles</b> of gas, use:</p>
      <div class="key" style="font-size:18px;text-align:center">PV = nRT</div>
      <ul><li>P is pressure in kPa, V is volume in L, n is moles, and T is temperature in K.</li>
        <li><b>R = 8.31 L&middot;kPa/(mol&middot;K)</b>, the gas constant. (If pressure is in atm, R = 0.0821 L&middot;atm/(mol&middot;K).)</li></ul>
      <div class="steps"><div class="st">Example</div>How many moles of gas are in a 10.0 L tank at 300. K and 249 kPa?<br>
        n = PV / RT = (249 &times; 10.0) / (8.31 &times; 300.) = <b>0.999 mol</b> (about 1.00 mol)</div>
      <div class="tip"><b>Check:</b> at STP, n = 1 mol gives V = (1 &times; 8.31 &times; 273.15) / 101.3 = 22.4 L, the molar volume on Reference Table 6.</div>
      <p class="hint"><b>Enrichment:</b> PV = nRT and R are <i>not</i> on the 2025 Reference Tables (Table 5 has only the combined gas law). Ask your teacher whether you need it.</p>
      <div class="br"><button class="btn bt" onclick="go(2)">Solve PV = nRT</button></div>` }
  ],
  quiz: [
    { q: 'Under which conditions does a real gas behave most like an ideal gas?', o: ['low temperature, low pressure', 'low temperature, high pressure', 'high temperature, low pressure', 'high temperature, high pressure'], a: 2, x: 'At high temperature and low pressure the particles are far apart and fast, so attractions and particle volume matter least.' },
    { q: 'Which gas behaves most like an ideal gas?', o: ['He', 'NH<sub>3</sub>', 'CO<sub>2</sub>', 'H<sub>2</sub>O'], a: 0, x: 'Helium is small with very weak attractions. NH<sub>3</sub> and H<sub>2</sub>O have strong hydrogen bonding, so they deviate the most.' },
    { q: 'What is 50 &deg;C in kelvin?', o: ['223.15 K', '273.15 K', '323.15 K', '350.15 K'], a: 2, x: 'K = &deg;C + 273.15 = 50 + 273.15 = 323.15 K.' },
    { q: 'At constant temperature, if the pressure on a gas doubles, its volume:', o: ['doubles', 'is halved', 'stays the same', 'quadruples'], a: 1, x: 'Boyle\'s law: P and V are inversely proportional. Doubling P halves V.' },
    { q: 'A gas at constant pressure is heated from 200. K to 400. K. Its volume:', o: ['is halved', 'stays the same', 'doubles', 'quadruples'], a: 2, x: 'Charles\'s law: V is directly proportional to kelvin temperature. Doubling T doubles V.' },
    { q: 'What are the conditions at STP?', o: ['0 K and 1 atm', '273.15 K and 1 atm', '298.15 K and 1 atm', '273.15 K and 1 kPa'], a: 1, x: 'Reference Table 6: STP is 273.15 K (0 &deg;C) and 1 atm (101.3 kPa).' },
    { q: 'A gas occupies 6.0 L at 100. kPa. At constant temperature, what is its volume at 300. kPa?', o: ['2.0 L', '3.0 L', '18 L', '50. L'], a: 0, x: 'V<sub>2</sub> = P<sub>1</sub>V<sub>1</sub>/P<sub>2</sub> = (100. &times; 6.0)/300. = 2.0 L.' },
    { q: 'According to the KMT, ideal gas particles:', o: ['attract each other strongly', 'are in constant random motion', 'lose energy in every collision', 'have large volumes'], a: 1, x: 'Ideal gas particles move constantly and randomly, have negligible volume, no attractions, and elastic collisions.' },
    { q: 'Equal volumes of H<sub>2</sub> and O<sub>2</sub> at the same temperature and pressure contain:', o: ['equal masses', 'equal numbers of molecules', 'more O<sub>2</sub> molecules', 'more H<sub>2</sub> molecules'], a: 1, x: 'Avogadro\'s hypothesis: same T, P and V means the same number of particles. Their masses differ, because O<sub>2</sub> molecules are heavier.' },
    { q: 'A sealed rigid container of gas is heated. What happens to the pressure?', o: ['It decreases', 'It increases', 'It stays the same', 'It drops to zero'], a: 1, x: 'At constant volume, P is directly proportional to kelvin temperature (Gay-Lussac). Faster particles hit the walls harder and more often.' }
  ]
};
