/* Catalyst - Regents-style cluster: "Building a Mars Probe" (Catalyst original).
   Facts: Perseverance landed in Jezero Crater on Feb 18, 2021; its wheels are aluminum with titanium spokes; its MMRTG holds
   about 4.8 kg of plutonium dioxide (Pu-238) and makes about 110 W at launch; Curiosity's SAM instrument measured
   carbon-13/carbon-12 ratios in Mars rocks. Relative conductivities use standard values (Cu 59.6, Al 37.7, Ti 2.4 MS/m). */
'use strict';
const FIGCP = {
  materials: '<div style="text-align:center;margin-top:8px"><b>Figure 1: Some Elements Used to Build a Probe</b></div><table class="tbl" style="background:#fff">' +
    '<tr><th>Element</th><th>Appearance</th><th>When Hammered</th><th>Relative Electrical Conductivity (copper = 100)</th><th>Use on the Probe</th></tr>' +
    '<tr><td>Copper</td><td>shiny, reddish</td><td>bends; can be drawn into wire</td><td class="n">100</td><td>wiring</td></tr>' +
    '<tr><td>Aluminum</td><td>shiny, silver</td><td>bends</td><td class="n">63</td><td>wheels, body panels</td></tr>' +
    '<tr><td>Titanium</td><td>shiny, gray</td><td>bends</td><td class="n">4</td><td>wheel spokes, fittings</td></tr>' +
    '<tr><td>Silicon</td><td>shiny, blue-gray</td><td>shatters</td><td class="n">less than 0.001</td><td>computer chips</td></tr>' +
    '<tr><td>Sulfur</td><td>dull, yellow</td><td>shatters</td><td class="n">about 0</td><td>(not used; for comparison)</td></tr></table>' +
    '<p class="hint">Pure silicon is a semiconductor: its conductivity is very low but rises when light hits it or when tiny amounts of other elements are added, which is why it is used in chips and solar cells.</p>',
  isotopes: '<div style="text-align:center;margin-top:8px"><b>Figure 2: Isotopes of Carbon</b></div><table class="tbl" style="background:#fff">' +
    '<tr><th>Isotope</th><th>Atomic Number</th><th>Mass Number</th><th>Natural Abundance on Earth</th></tr>' +
    '<tr><td>Carbon-12</td><td class="n">6</td><td class="n">12</td><td class="n">98.9%</td></tr><tr><td>Carbon-13</td><td class="n">6</td><td class="n">13</td><td class="n">1.1%</td></tr>' +
    '<tr><td>Carbon-14</td><td class="n">6</td><td class="n">14</td><td class="n">trace (about 1 in a trillion atoms)</td></tr></table>'
};

CLUSTERS.push({
  id: 'probe', t: 'Building a Mars Probe', sub: 'Metals, metalloids and isotopes on Perseverance', src: 'Catalyst original',
  pe: ['HS-PS1-1', 'HS-PS1-3', 'HS-PS2-6'],
  intro: '<h3>Building a Mars Probe</h3><p>NASA\'s Perseverance rover landed in Jezero Crater on Mars on February 18, 2021. Jezero was once a lake, so it is a good place to look for signs of ancient microscopic life. To survive the trip and years of driving over sharp rocks, the rover had to be built from carefully chosen elements. Its wheels are made of <b>aluminum</b>, with curved <b>titanium</b> spokes for springy support. <b>Copper</b> wires carry electric current to its motors and instruments, and its computers run on <b>silicon</b> chips. Figure 1 compares some of these elements with sulfur, a nonmetal.</p>' + FIGCP.materials,
  items: [
    {
      type: 'mc', pe: 'HS-PS2-6', tp: ['metb', 'metal'],
      q: 'Copper is used for the rover\'s wiring because it conducts electricity well and can be drawn into thin wires. Which description of copper\'s structure explains both properties?',
      o: ['Positive copper ions in a "sea" of mobile electrons that move freely through the metal',
        'Copper atoms that share pairs of electrons in fixed covalent bonds between two atoms',
        'Positive and negative ions locked in place in a crystal lattice',
        'Mobile ions dissolved in water that move between the copper atoms'],
      a: 0,
      x: 'In <b>metallic bonding</b>, metal atoms give up their valence electrons into a shared <b>sea of mobile (delocalized) electrons</b> around positive metal ions. The mobile electrons can flow, so the metal <b>conducts</b> electricity. The ions can slide past each other while the electron sea keeps holding them together, so the metal is <b>ductile</b> (can be stretched into wire) and malleable (bendable). Fixed covalent bonds (choice 2) and locked ionic lattices (choice 3) don\'t let charges flow and make brittle solids. Mobile ions in water (choice 4) carry current in <i>solutions</i>, not in solid metals.'
    },
    {
      type: 'row', pe: 'HS-PS1-1', tp: ['metal', 'aem', 'pg'],
      ctx: '<p>The rover\'s power source, a radioisotope generator, contains about 4.8 kilograms of <b>plutonium dioxide</b> (PuO₂).</p>',
      q: 'Using Figure 1 and the Periodic Table, which row correctly classifies silicon and plutonium dioxide?',
      cols: ['Row', 'Silicon (Si)', 'Plutonium Dioxide (PuO₂)'],
      rows: [
        ['(1)', 'an element that is a metal', 'a compound of a metal and a nonmetal'],
        ['(2)', 'an element that is a metalloid', 'a compound of two nonmetals'],
        ['(3)', 'an element that is a nonmetal', 'an element made of plutonium and oxygen atoms'],
        ['(4)', 'an element that is a metalloid', 'a compound of a metal and a nonmetal']
      ],
      a: 3,
      x: 'Silicon sits on the <b>staircase</b> line of the Periodic Table, so it is a <b>metalloid</b>. Figure 1 shows why: it is shiny like a metal, but brittle (it shatters) and a poor conductor like a nonmetal. Shiny alone does not make it a metal (row 1). PuO₂ has two kinds of atoms chemically combined, so it is a <b>compound</b>, not an element (row 3). Plutonium is in the actinide row at the bottom of the Periodic Table, on the metal side of the staircase, so it is a <b>metal</b>, and oxygen is a nonmetal (row 2 is wrong).'
    },
    {
      type: 'short', pe: 'HS-PS1-1', tp: ['iso', 'sub'],
      ctx: '<p>Mars is far from the Sun and often dusty, so Perseverance does not rely on solar panels. Instead, a <b>Multi-Mission Radioisotope Thermoelectric Generator</b> turns the heat given off by the natural radioactive decay of <b>plutonium-238</b> into electricity. It made about 110 watts when the rover launched.</p>',
      q: 'Using the Periodic Table, determine the number of protons, neutrons and electrons in one neutral atom of plutonium-238. Then state how an atom of plutonium-239 would be different.',
      model: '<p>Plutonium\'s atomic number is <b>94</b>, so the atom has <b>94 protons</b>. A neutral atom has as many electrons as protons: <b>94 electrons</b>. Neutrons = mass number − atomic number = 238 − 94 = <b>144 neutrons</b>.</p>' +
        '<p>Plutonium-239 is another <b>isotope</b> of plutonium: it has the same 94 protons and 94 electrons but <b>one more neutron</b> (239 − 94 = 145 neutrons).</p>',
      rubric: ['94 protons (the atomic number)', '144 neutrons (238 − 94)', '94 electrons (neutral atom, so electrons = protons)', 'Pu-239 has 145 neutrons; same number of protons and electrons']
    },
    {
      type: 'mc', pe: 'HS-PS1-1', tp: ['iso', 'sub'],
      ctx: '<p>Perseverance collects rock samples, and an older NASA rover, Curiosity, exploring a different crater, analyzes rock powder in a lab inside the rover. Curiosity\'s SAM instrument measured how much carbon-13 and carbon-12 Mars rocks contain. On Earth, living things take in slightly more of the lighter carbon-12, so an unusual ratio can be a clue (but not proof) of past life. Carbon-14 is used on Earth to find the age of once-living things. Figure 2 lists the isotopes of carbon.</p>' + FIGCP.isotopes,
      q: 'Using Figure 2, which statement correctly compares an atom of carbon-12 with an atom of carbon-14?',
      o: ['Carbon-14 has 8 protons, and carbon-12 has 6 protons.',
        'Carbon-14 has 14 neutrons, and carbon-12 has 12 neutrons.',
        'Both have 6 protons, but carbon-14 has 8 neutrons and carbon-12 has 6 neutrons.',
        'Both have 6 neutrons, but carbon-14 has 8 electrons and carbon-12 has 6 electrons.'],
      a: 2,
      x: '<b>Isotopes</b> of an element have the same number of <b>protons</b> (the atomic number, 6 for every carbon atom) but different numbers of <b>neutrons</b>. Neutrons = mass number − atomic number: carbon-12 has 12 − 6 = <b>6</b>, and carbon-14 has 14 − 6 = <b>8</b>. Choice 2 uses the mass number as the neutron count; the mass number is protons + neutrons. Changing the number of protons (choice 1) would make a different element, and a neutral carbon atom always has 6 electrons (choice 4).'
    },
    {
      type: 'draw', pe: 'HS-PS1-1', tp: ['bohr', 'sub', 'pg'],
      q: 'Using the Periodic Table, draw a Bohr diagram of an atom of aluminum-27, the main isotope in the rover\'s wheels. Then use your diagram to identify the period and the group of aluminum, and give the number of valence electrons.',
      model: '<div style="width:230px;margin:0 auto">' + SV.bohrIon('Al', 13, 14, [2, 8, 3], 0) + '</div>' +
        '<p>Aluminum has atomic number 13: <b>13 protons</b> and 13 electrons. Neutrons = 27 − 13 = <b>14</b>. Electrons fill the shells 2, then 8, then the last shell holds what is left: <b>2-8-3</b>.</p>' +
        '<p>It has <b>3 energy levels</b>, so it is in <b>Period 3</b>. It has <b>3 valence electrons</b>, which places it in <b>Group 13</b>.</p>',
      rubric: ['Nucleus labeled 13 protons and 14 neutrons', 'Electrons arranged 2-8-3 in three shells (13 in all)', 'Period 3 (three shells) and Group 13', 'States 3 valence electrons']
    },
    {
      type: 'sr', pe: 'HS-PS2-6', tp: ['metal', 'metb'], a: 'refute',
      q: 'A student claims that silicon would be a good replacement for copper in the rover\'s wiring because silicon is shiny like a metal. Decide whether you <b>support</b> or <b>refute</b> the claim. Use data from Figure 1 and your knowledge of bonding.',
      model: '<p><b>Refute.</b></p><p><b>Evidence:</b> In Figure 1, silicon\'s relative conductivity is less than 0.001, while copper\'s is 100. Silicon also shatters when hammered, but copper bends and can be drawn into wire.</p>' +
        '<p><b>Reasoning:</b> Being shiny does not make an element a metal. Silicon is a <b>metalloid</b> on the staircase: it has some metal properties (luster) but is brittle and conducts poorly. Copper is a metal with <b>metallic bonding</b>, a sea of mobile electrons around positive ions, so its electrons flow easily and the ions can slide into a wire shape without breaking.</p>',
      rubric: ['Checks "Refute"', 'Cites Figure 1: silicon conductivity less than 0.001 vs. copper 100 (and/or silicon shatters, copper bends into wire)', 'Identifies silicon as a metalloid; luster alone does not make it a metal', 'Explains copper conducts because of metallic bonding (a sea of mobile electrons)']
    }
  ]
});
