/* Catalyst - "The new Regents" page: Physical Science: Chemistry (first given June 2026).
   Facts from the NYSED Educator Guide to the Regents Examination in Physical Science: Chemistry (2025)
   and the Reference Tables for Physical Science: Chemistry, 2025 Edition. Keep in sync with HANDOFF.md. */
'use strict';
PAGES.regents = { t: 'The new Regents', nav: 'study' };
const REGENTS_TOPICS = [
  { t: 'Structure & Properties of Matter', w: '30–40%', pe: ['HS-PS1-1', 'HS-PS1-3', 'HS-PS1-8', 'HS-PS1-9', 'HS-PS1-10', 'HS-PS2-6'], u: 'Units 1, 2, 4, 5, 7 (+ Solutions, Nuclear)' },
  { t: 'Chemical Reactions', w: '36–46%', pe: ['HS-PS1-2', 'HS-PS1-4', 'HS-PS1-5', 'HS-PS1-6', 'HS-PS1-7', 'HS-PS1-11', 'HS-PS1-12'], u: 'Units 3, 6 (+ Rates & Equilibrium, Acids & Bases, Redox)' },
  { t: 'Energy', w: '10–14%', pe: ['HS-PS3-1', 'HS-PS3-5'], u: 'Units 1 (heat), 4, 5 (+ Energy in Reactions)' },
  { t: 'Waves & Electromagnetic Radiation', w: '5–7%', pe: ['HS-PS4-4'], u: 'Unit 2 (spectra, EM spectrum)' },
  { t: 'Matter & Energy in Organisms & Ecosystems', w: '2–5%', pe: ['HS-LS1-5'], u: 'Energy in Reactions & Living Systems' },
  { t: 'Engineering Design', w: '5–11%', pe: ['HS-ETS1'], u: 'Design questions inside each unit and the Midterm storyline' }
];

RENDER.regents = function () {
  $('pg').innerHTML = '<button class="btn bs" onclick="goPage(\'study\')">‹ Study Guide</button>' +
    '<div class="pt" style="margin-top:12px">The new Regents: Physical Science: Chemistry</div>' +
    '<div class="ps">Your class follows the new NYS course and exam, built on the NYS P-12 Science Learning Standards. It was first given in June 2026 and replaces the older Physical Setting/Chemistry Regents.</div>' +

    '<div class="card"><div class="ch">How the exam works</div><div class="cb" style="font-size:14px;line-height:1.7"><ul style="margin-left:20px">' +
    '<li><b>Storylines, not stand-alone questions.</b> The test has about 9–11 question <b>clusters</b>. Each one starts from a real-world phenomenon with reading passages, data tables, graphs or diagrams, and the questions ask you to use that information.</li>' +
    '<li>About <b>45–55 questions</b>: roughly 60% multiple choice and 40% written (constructed) response. You have <b>3 hours</b>.</li>' +
    '<li>Scored in <b>Performance Levels 1–5</b> instead of 0–100. In NYSED\'s wording, Level 3 minimally meets the expectations, Level 4 fully meets them, and Level 5 meets them with distinction. Ask your teacher which level counts as passing for you.</li>' +
    '<li><b>Required Investigations:</b> hands-on labs from NYSED that you must complete in class before you can take the exam. About 15% of the test asks about the ideas those Investigations cover.</li>' +
    '<li>You get the <b>2025 Reference Tables</b> and must have a <b>scientific calculator</b>.</li></ul>' +
    '<div class="tip"><b>Every question is "three-dimensional":</b> it mixes a chemistry idea (core idea), a science skill (like analyzing data or building a model) and a big-picture concept (like patterns, or cause and effect). Practice explaining <i>why</i>, using evidence from the data you are given.</div></div></div>' +

    '<div class="card"><div class="ch">The six topic areas</div><div class="cb" style="overflow-x:auto"><table class="tbl"><tr><th>Topic</th><th>Share of test</th><th>Performance Expectations</th><th>In Catalyst</th></tr>' +
    REGENTS_TOPICS.map(r => '<tr><td><b>' + r.t + '</b></td><td>' + r.w + '</td><td><div class="pes">' + peChips(r.pe) + '</div></td><td>' + r.u + '</td></tr>').join('') +
    '</table><p class="hint">HS-PS1-9 to HS-PS1-12 (gas law, solutions, acids and bases, electron transfer) are NYS additions to the national standards.</p></div></div>' +

    '<div class="card"><div class="ch">The 2025 Reference Tables</div><div class="cb" style="font-size:14px;line-height:1.7">' +
    '<table class="tbl"><tr><th>Table</th><th>What it has</th></tr>' +
    '<tr><td>1</td><td>Periodic Table: each element\'s symbol, atomic number and average atomic mass</td></tr>' +
    '<tr><td>2</td><td>The Electromagnetic Spectrum: wavelengths and frequencies, radio to gamma</td></tr>' +
    '<tr><td>3</td><td>Symbols Used in Nuclear Chemistry: alpha, beta, gamma, neutron, positron, proton</td></tr>' +
    '<tr><td>4</td><td>Selected Ions Forming Aqueous Solutions</td></tr>' +
    '<tr><td>5</td><td>Mathematical and Computational Models: combined gas law, q = mcΔT, q = mH<sub>f</sub>, q = mH<sub>v</sub>, ppm, n = MV, Coulomb\'s law F = q<sub>1</sub>q<sub>2</sub>/d<sup>2</sup></td></tr>' +
    '<tr><td>6</td><td>Mathematical Relationships: K = °C + 273.15, 1 atm = 101.3 kPa, 1 mole = molar mass (g) = 6.02 × 10<sup>23</sup> particles = 22.4 L, STP = 273.15 K and 1 atm</td></tr>' +
    '<tr><td>7–8</td><td>Selected Units and Selected Metric Prefixes (kilo, milli, micro, nano)</td></tr></table>' +
    '<div class="key"><b>Shorter than the old tables.</b> The periodic table no longer lists electron configurations, electronegativity, ionization energy or charges, and there are no solubility curves or activity series. Know the patterns; when a question needs a specific value, it gives it to you. Catalyst\'s periodic table still shows those values so you can explore the trends.</div>' +
    '<p class="hint">Catalyst uses the 2025 values: K = °C + 273.15 and STP = 273.15 K and 1 atm. Always use the copy of the Reference Tables your teacher gives you on tests.</p></div></div>' +
    '<footer class="cp">Sources: NYSED Educator Guide to the Regents Examination in Physical Science: Chemistry; Reference Tables for Physical Science: Chemistry, 2025 Edition.</footer>';
};
