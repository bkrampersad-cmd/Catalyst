/* Catalyst - pure chemistry logic (no DOM). Node-testable: see build/test_chem.js.
   Depends on ELEMENTS (elements.js) when run in the browser; tests inject it. */
(function (root) {
  'use strict';
  const BY_SYM = {};
  function index(list) { list.forEach(e => { BY_SYM[e.s] = e; }); }
  if (typeof ELEMENTS !== 'undefined') index(ELEMENTS);

  /* ---------- Formula parsing ----------
     Supports: H2O, Ca(OH)2, Al2(SO4)3, [Cu(NH3)4]SO4, hydrates CuSO4·5H2O / CuSO4*5H2O / CuSO4.5H2O,
     leading coefficients on hydrate parts (5H2O). Unicode subscripts are normalized. */
  const SUBS = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9' };
  function normalize(f) {
    return String(f).replace(/[₀-₉]/g, c => SUBS[c]).replace(/\s+/g, '');
  }

  function parseFormula(formula) {
    const f = normalize(formula);
    if (!f) throw new Error('Enter a formula, e.g. H2O');
    const total = {};
    // split hydrate dots: · * or a '.' followed by a digit/uppercase
    const parts = f.split(/[·•*]|\.(?=[0-9A-Z(\[])/);
    for (const part of parts) {
      if (!part) throw new Error('Check the hydrate dot in "' + formula + '"');
      const m = part.match(/^(\d+)(.*)$/);
      const mult = m ? parseInt(m[1], 10) : 1;
      const body = m ? m[2] : part;
      const counts = parseGroup(body, formula);
      for (const k in counts) total[k] = (total[k] || 0) + counts[k] * mult;
    }
    return total;
  }

  function parseGroup(s, original) {
    let i = 0;
    function readNum() {
      let j = i;
      while (j < s.length && /[0-9]/.test(s[j])) j++;
      const n = j > i ? parseInt(s.slice(i, j), 10) : 1;
      i = j;
      return n;
    }
    function group(close) {
      const out = {};
      while (i < s.length) {
        const c = s[i];
        if (c === '(' || c === '[') {
          i++;
          const inner = group(c === '(' ? ')' : ']');
          const n = readNum();
          for (const k in inner) out[k] = (out[k] || 0) + inner[k] * n;
        } else if (c === ')' || c === ']') {
          if (c !== close) throw new Error('Mismatched brackets in "' + original + '"');
          i++;
          return out;
        } else if (/[A-Z]/.test(c)) {
          let sym = c; i++;
          while (i < s.length && /[a-z]/.test(s[i])) { sym += s[i]; i++; }
          if (!BY_SYM[sym]) throw new Error('"' + sym + '" is not an element symbol (symbols start with a capital letter, e.g. Co vs CO)');
          const n = readNum();
          out[sym] = (out[sym] || 0) + n;
        } else {
          throw new Error('Unexpected "' + c + '" in "' + original + '"');
        }
      }
      if (close) throw new Error('Missing closing bracket in "' + original + '"');
      return out;
    }
    const r = group(null);
    if (!Object.keys(r).length) throw new Error('No elements found in "' + original + '"');
    return r;
  }

  /* Molar mass with per-element breakdown. Masses rounded per NYS practice option. */
  function molarMass(formula, opts) {
    opts = opts || {};
    const counts = parseFormula(formula);
    const rows = [];
    let total = 0;
    for (const sym of Object.keys(counts)) {
      const e = BY_SYM[sym];
      const am = (opts.round !== undefined && opts.round !== null) ? roundTo(e.m, opts.round) : e.m;
      const sub = am * counts[sym];
      rows.push({ sym, name: e.n, count: counts[sym], am, sub });
      total += sub;
    }
    rows.forEach(r => { r.pct = r.sub / total * 100; });
    return { counts, rows, total };
  }

  function roundTo(x, d) { const p = Math.pow(10, d); return Math.round(x * p) / p; }

  /* ---------- Equation balancing (exact integer nullspace) ---------- */
  function gcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { [a, b] = [b, a % b]; } return a; }

  function splitSide(side) {
    return side.split(/\s\+\s|\+(?=\s*[0-9A-Z(\[])/).map(t => t.trim()).filter(Boolean);
  }

  function parseEquation(eq) {
    const s = String(eq).replace(/→|⟶|=>|->|=/g, '>');
    const sides = s.split('>');
    if (sides.length !== 2) throw new Error('Use one arrow between reactants and products, e.g. H2 + O2 -> H2O');
    const L = splitSide(sides[0]).map(stripCoef), R = splitSide(sides[1]).map(stripCoef);
    if (!L.length || !R.length) throw new Error('Need at least one reactant and one product');
    return { L, R };
  }
  function stripCoef(t) {
    const m = normalize(t).match(/^(\d+)([A-Z(\[].*)$/);
    return m ? m[2] : normalize(t);
  }

  function balance(eq) {
    const { L, R } = parseEquation(eq);
    const species = L.concat(R);
    const comps = species.map(parseFormula);
    const els = [];
    comps.forEach(c => Object.keys(c).forEach(k => { if (!els.includes(k)) els.push(k); }));
    // check every element appears on both sides
    for (const el of els) {
      const inL = comps.slice(0, L.length).some(c => c[el]);
      const inR = comps.slice(L.length).some(c => c[el]);
      if (!inL || !inR) throw new Error(el + ' appears on only one side - check the formulas');
    }
    // matrix rows = elements, cols = species (products negative), as BigInt fractions [num, den]
    const n = species.length;
    let M = els.map(el => species.map((_, j) => {
      const v = BigInt(comps[j][el] || 0);
      return j < L.length ? v : -v;
    }));
    // fraction-free Gaussian elimination to RREF over rationals using integer rows
    const rows = M.length;
    let pivotCols = [], r = 0;
    for (let c = 0; c < n && r < rows; c++) {
      let p = -1;
      for (let i = r; i < rows; i++) if (M[i][c] !== 0n) { p = i; break; }
      if (p < 0) continue;
      [M[r], M[p]] = [M[p], M[r]];
      for (let i = 0; i < rows; i++) {
        if (i === r || M[i][c] === 0n) continue;
        const a = M[r][c], b = M[i][c];
        M[i] = M[i].map((v, k) => v * a - M[r][k] * b);
        const g = M[i].reduce((acc, v) => gcd(acc, v), 0n);
        if (g > 1n) M[i] = M[i].map(v => v / g);
      }
      pivotCols.push(c); r++;
    }
    const free = [];
    for (let c = 0; c < n; c++) if (!pivotCols.includes(c)) free.push(c);
    if (free.length === 0) throw new Error('This equation cannot be balanced - check the formulas');
    if (free.length > 1) throw new Error('More than one way to balance this (it may be two reactions combined). Try splitting it.');
    const fc = free[0];
    // set free var = L (lcm of pivot values), solve pivots: M[i][pc]*x_pc + M[i][fc]*x_fc = 0
    let lcm = 1n;
    pivotCols.forEach((pc, i) => { const a = M[i][pc] < 0n ? -M[i][pc] : M[i][pc]; lcm = lcm / gcd(lcm, a) * a; });
    const x = new Array(n).fill(0n);
    x[fc] = lcm;
    pivotCols.forEach((pc, i) => { x[pc] = -M[i][fc] * lcm / M[i][pc]; });
    if (x.some(v => v < 0n)) x.forEach((v, k) => { x[k] = -v; });
    if (x.some(v => v <= 0n)) throw new Error('This equation cannot be balanced with positive coefficients - check reactants vs products');
    const g = x.reduce((acc, v) => gcd(acc, v), 0n);
    const coef = x.map(v => Number(v / g));
    // atom check table
    const check = els.map(el => {
      let l = 0, rr = 0;
      comps.forEach((c, j) => { const v = (c[el] || 0) * coef[j]; if (j < L.length) l += v; else rr += v; });
      return { el, left: l, right: rr };
    });
    return { reactants: L, products: R, coef, check };
  }

  /* ---------- Significant figures ---------- */
  function sigFigs(str) {
    let s = String(str).trim().replace(/,/g, '');
    if (!/^[-+]?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/.test(s)) throw new Error('Enter a number like 0.00450, 1200, or 3.0e5');
    s = s.replace(/^[-+]/, '').replace(/[eE].*$/, '');
    const hasDot = s.includes('.');
    let digits = s.replace('.', '');
    const lead = digits.match(/^0*/)[0].length;
    digits = digits.slice(lead);
    if (!digits.length) return { count: hasDot ? Math.max(1, s.split('.')[1].length) : 1, note: 'Zero: counted by the decimal places shown', ambiguous: false };
    let count, ambiguous = false, note;
    if (hasDot) {
      count = digits.length;
      note = 'Decimal point shown: every digit after the first non-zero counts, including trailing zeros.';
    } else {
      const trail = digits.match(/0*$/)[0].length;
      count = digits.length - trail;
      ambiguous = trail > 0;
      note = ambiguous ? 'No decimal point, so the trailing zeros are placeholders (not significant). Write "' + s + '." or use scientific notation to make them count.'
        : 'All non-zero digits and zeros between them count.';
    }
    if (lead > 0 && /^0*\./.test(s)) note = 'Leading zeros are never significant - they only hold the decimal place. ' + note;
    return { count, ambiguous, note };
  }

  /* Decimal half-up rounding to n sig figs (avoids binary float surprises such as
     0.00405 -> 0.0040). Works on the shortest decimal representation of x. */
  function toPrecisionDecimal(x, n) {
    const neg = x < 0;
    const m = Math.abs(x).toExponential().match(/^(\d)(?:\.(\d+))?e([-+]\d+)$/);
    let digits = (m[1] + (m[2] || '')).split('').map(Number), ex = parseInt(m[3], 10);
    if (digits.length > n) {
      const up = digits[n] >= 5;
      digits = digits.slice(0, n);
      if (up) {
        let i = n - 1;
        while (i >= 0) { digits[i]++; if (digits[i] < 10) break; digits[i] = 0; i--; }
        if (i < 0) { digits.unshift(1); digits.pop(); ex++; }
      }
    }
    while (digits.length < n) digits.push(0);
    return (neg ? -1 : 1) * Number(digits[0] + (digits.length > 1 ? '.' + digits.slice(1).join('') : '') + 'e' + ex);
  }

  function roundSig(x, n) {
    if (x === 0 || !isFinite(x)) return String(x);
    // prefer plain notation for moderate magnitudes
    const v = toPrecisionDecimal(Number(x), n);
    const ex = Math.floor(Math.log10(Math.abs(v)));
    if (ex >= -4 && ex < 15) {
      const dec = Math.max(0, n - 1 - ex);
      let out = v.toFixed(dec);
      // a trailing zero ambiguity (e.g. 1200 at 3 s.f.) -> use sci notation
      if (dec === 0 && ex + 1 > n) return sciStr(v, n);
      if (dec === 0 && /0$/.test(out)) out += '.'; // e.g. 10. has 2 sig figs, 10 has 1
      return out;
    }
    return sciStr(v, n);
  }
  const SUP = { '-': '\u207B', '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3', '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079' };
  function sciStr(v, n) {
    const [c, e] = v.toExponential(n - 1).split('e');
    return c + ' \u00D7 10' + String(parseInt(e, 10)).split('').map(ch => SUP[ch]).join('');
  }

  /* ---------- Constants (match NYS Reference Tables, Table B) ---------- */
  const CONST = {
    NA: 6.02e23,          // Avogadro
    R_kPa: 8.31,          // L·kPa/(mol·K)
    R_atm: 0.0821,        // L·atm/(mol·K)
    STP_P_kPa: 101.3, STP_T_K: 273,
    Kw: 1.0e-14,
  };

  /* Pressure/volume/temperature unit conversion to a base (kPa, L, K) */
  const P_TO_KPA = { kPa: 1, atm: 101.3, mmHg: 101.3 / 760, torr: 101.3 / 760 };
  const V_TO_L = { L: 1, mL: 0.001 };
  function toK(v, u) { return u === 'C' ? v + 273 : v; }
  function fromK(v, u) { return u === 'C' ? v - 273 : v; }

  /* ---------- Average atomic mass ---------- rows: [{mass, pct}] */
  function avgAtomicMass(rows) {
    const r = rows.filter(x => x && isFinite(x.mass) && isFinite(x.pct));
    if (r.length < 1) throw new Error('Enter at least one isotope mass and its percent abundance');
    if (r.some(x => x.mass <= 0 || x.pct < 0)) throw new Error('Masses must be positive and abundances cannot be negative');
    const totalPct = r.reduce((s, x) => s + x.pct, 0);
    const parts = r.map(x => ({ mass: x.mass, pct: x.pct, contrib: x.mass * x.pct / 100 }));
    return { avg: parts.reduce((s, x) => s + x.contrib, 0), parts, totalPct };
  }

  /* ---------- Empirical / molecular formula ---------- rows: [{sym, amt}] (grams or percents) */
  function empiricalFormula(rows, molarMassOfCompound) {
    const r = rows.filter(x => x && x.sym);
    if (r.length < 2) throw new Error('Enter at least two elements');
    const data = r.map(x => {
      const e = BY_SYM[x.sym];
      if (!e) throw new Error('"' + x.sym + '" is not an element symbol');
      if (!(x.amt > 0)) throw new Error('Enter a positive amount for ' + x.sym);
      return { sym: x.sym, amt: x.amt, am: e.m, mol: x.amt / e.m };
    });
    const min = Math.min(...data.map(d => d.mol));
    data.forEach(d => { d.ratio = d.mol / min; });
    let mult = 1;
    for (let k = 1; k <= 8; k++) {
      if (data.every(d => Math.abs(d.ratio * k - Math.round(d.ratio * k)) < 0.1)) { mult = k; break; }
      if (k === 8) mult = 1;
    }
    data.forEach(d => { d.sub = Math.max(1, Math.round(d.ratio * mult)); });
    const formula = data.map(d => d.sym + (d.sub > 1 ? d.sub : '')).join('');
    const efm = data.reduce((s, d) => s + d.sub * d.am, 0);
    const out = { data, mult, formula, efm };
    if (molarMassOfCompound > 0) {
      const n = Math.round(molarMassOfCompound / efm);
      if (n < 1) throw new Error('The molar mass is smaller than the empirical formula mass (' + efm.toFixed(2) + ' g/mol). Check the values.');
      out.n = n;
      out.nExact = molarMassOfCompound / efm;
      out.molecular = data.map(d => d.sym + (d.sub * n > 1 ? d.sub * n : '')).join('');
    }
    return out;
  }

  /* ---------- Stoichiometry ----------
     given: {i, amount, unit:'g'|'mol'}, target index t, optional second reactant {i, amount, unit}
     returns moles/grams of target, limiting reactant analysis. */
  function stoich(eq, given, t, second) {
    const b = balance(eq);
    const species = b.reactants.concat(b.products);
    const mm = species.map(f => molarMass(f).total);
    const toMol = g => g.unit === 'g' ? g.amount / mm[g.i] : g.amount;
    const cands = [given].concat(second ? [second] : []).map(g => {
      if (!(g.amount > 0)) throw new Error('Enter a positive amount');
      const mol = toMol(g);
      return { i: g.i, mol, product: mol * b.coef[t] / b.coef[g.i] };
    });
    let lim = cands[0];
    if (cands.length > 1) {
      if (cands[0].i === cands[1].i) throw new Error('Pick two different reactants to compare');
      if (cands.some(c => c.i >= b.reactants.length)) throw new Error('A limiting-reactant check needs two reactants');
      lim = cands[0].product <= cands[1].product ? cands[0] : cands[1];
    }
    const molT = lim.product;
    const res = { b, species, mm, cands, limiting: lim.i, molT, gT: molT * mm[t] };
    if (cands.length > 1) {
      const ex = cands.find(c => c !== lim);
      const used = lim.mol * b.coef[ex.i] / b.coef[lim.i];
      res.excess = { i: ex.i, used, left: ex.mol - used, leftG: (ex.mol - used) * mm[ex.i] };
    }
    return res;
  }

  /* ---------- Heat (NYS Reference Table B values for water) ---------- */
  const WATER = { C: 4.18, Hf: 334, Hv: 2260 };

  const api = { avgAtomicMass, empiricalFormula, stoich, WATER, index, parseFormula, molarMass, balance, sigFigs, roundSig, CONST, P_TO_KPA, V_TO_L, toK, fromK, normalize, BY_SYM };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Chem = api;
})(this);
