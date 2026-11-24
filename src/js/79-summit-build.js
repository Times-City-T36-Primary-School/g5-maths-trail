/* 79-summit-build.js - the Summit final test: which questions go on the two papers (pure, no screen; Node can load it).

   Built ONLY from the stops' own Mini Practice test items (pack.test.items: their dok, lo, twm and 3 sets of numbers),
   never from a real paper. Each try draws a new mix (a seed), and a set of numbers other than the last try's.

   T.summit.plan(packs, {seed, avoid}) -> { seed, papers: [[Q, ...14], [Q, ...14]] }
     Q = {s, i, v, dok, lo, twm, marks, strand, claim}
     avoid: {'s.i': v} the items of the last try (picked again only when an objective needs them, with other numbers)
   Marks: every set of numbers of an item is made (MX.make) and only the sets worth the same marks as set 1 (and of the
     same kind, claim or not) may be drawn (okSets); T.summit.check makes the drawn set again and counts ITS marks.
   The rules (Grade 5, the shape of the school's EOS1 Stage 6 papers; checked by T.summit.check over many seeds):
     two papers of 14 numbered questions and 20 marks each (40 marks); marks in [ ] come from the models (1 or 2;
       a claim and a question in two parts have (a) and (b), 1 mark each); an item worth more than 2 is not used
     every one of the 18 objectives of T.OBJECTIVES (13 Number, 4 Geometry, 1 Statistics) at least once over the two papers
     DOK by marks on EACH paper (EOS1 specification by items: DOK 1 46%, DOK 2 43%, DOK 3 11%): DOK 1 40-52%,
       DOK 2 38-48%, DOK 3 10-15%, aimed at 9 / 9 / 2 marks; one DOK 3 claim (Number) per paper, at a random place
       from question 5 to 13 (from the seed); question 1 is DOK 1
     claims (pool.claim, any DOK): at most 3 on a paper, never two next to each other
     strands by marks on EACH paper: Number 65-85%, Geometry and measure 10-25%, at least 1 S and 2 G questions;
       over both papers (EOS1 by items: Number 75%, Geometry and measure 18%, Statistics 7%): Number 68-80%,
       Geometry 14-25%, Statistics 5-12%
   T.summit.code(Q) -> 's.i.v' and T.summit.fromCodes(packs, codes) rebuild a saved paper (a test carried on later;
   one paper for the short test, two for the final test). */
(function (T) {
  'use strict';

  const PAPERS = 2, PER = 14, MARKS = 20;
  const DOK_RANGE = { 1: [40, 52], 2: [38, 48], 3: [10, 15] };          // % of the marks, on each paper
  const DOK_AIM = { 1: 9, 2: 9, 3: 2 };                                   // marks a paper, what the search aims at
  const PAPER_STRAND = { N: [65, 85], G: [10, 25] };                      // % of the marks, on each paper
  const STRAND_RANGE = { N: [68, 80], G: [14, 25], S: [5, 12] };          // % of the marks, both papers
  const MAX_CLAIMS = 3;                                                   // claim-style questions on a paper
  const CLAIM_AT = [4, 12];                                               // the DOK 3 claim: question 5 to 13 (index)

  function getMX() { return typeof MX !== 'undefined' ? MX : (typeof window !== 'undefined' ? window.MX : null); }   // eslint-disable-line no-undef

  // a small seeded random (mulberry32): the same seed gives the same test (a test carried on later)
  function rng(seed) {
    let a = (Number(seed) >>> 0) || 1;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(list, r) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }

  const strandOf = lo => { const k = String((lo || [])[0] || '').charAt(1); return k === 'G' || k === 'S' ? k : 'N'; };

  // one set of numbers made: {marks, claim}, or null when the model throws
  function made(def) {
    try { const t = getMX().make(def, 'your'); return { marks: t.marks || 1, claim: t.type === 'claim' }; } catch (e) { return null; }
  }

  // every Mini test item of every stop, with its marks: the sets of numbers worth what set 1 is worth (okSets)
  const cache = new WeakMap();
  function poolOf(packs) {
    if (packs && cache.has(packs)) return cache.get(packs);
    const pool = [];
    Object.keys(packs || {}).sort(function (a, b) { return a - b; }).forEach(function (n) {
      const items = (packs[n] && packs[n].test && packs[n].test.items) || [];
      items.forEach(function (it, i) {
        if (!it || !Array.isArray(it.v) || !it.v.length) return;
        const sets = it.v.map(made), one = sets[0];
        if (!one) return;
        if (one.marks > 2) return;                     // Grade 5: no question on a paper is worth more than 2 marks
        const okSets = [];
        sets.forEach(function (x, k) { if (x && x.marks === one.marks && x.claim === one.claim) okSets.push(k); });
        pool.push({ s: Number(n), i: i, dok: it.dok, lo: (it.lo || []).slice(), twm: (it.twm || []).slice(), marks: one.marks, claim: one.claim,
          strand: strandOf(it.lo), sets: it.v.length, okSets: okSets, setMarks: sets.map(function (x) { return x ? x.marks : 0; }), key: n + '.' + i });
      });
    });
    if (packs) cache.set(packs, pool);
    return pool;
  }

  function objectives() { return Object.keys(T.OBJECTIVES || {}); }

  /* ---------- the figures of a test: marks by DOK and by strand, objectives covered ---------- */

  function stats(list) {
    const o = { questions: list.length, marks: 0, claims: 0, dok: { 1: 0, 2: 0, 3: 0 }, dokQ: { 1: 0, 2: 0, 3: 0 }, strand: { N: 0, G: 0, S: 0 }, strandQ: { N: 0, G: 0, S: 0 }, los: {} };
    list.forEach(function (q) {
      o.marks += q.marks;
      if (q.claim) o.claims += 1;
      o.dok[q.dok] += q.marks; o.dokQ[q.dok] += 1;
      o.strand[q.strand] += q.marks; o.strandQ[q.strand] += 1;
      q.lo.forEach(function (c) { o.los[c] = (o.los[c] || 0) + 1; });
    });
    o.pct = function (part) { return o.marks ? Math.round(part * 1000 / o.marks) / 10 : 0; };
    return o;
  }
  const inRange = function (st, part, range) { const p = part * 100 / st.marks; return p >= range[0] - 1e-9 && p <= range[1] + 1e-9; };
  // how far a part is outside its range, in marks (0 inside)
  const outside = function (total, part, range) { return Math.max(0, range[0] * total / 100 - part, part - range[1] * total / 100); };

  // a drawn question made again from its own set of numbers: its real marks and kind (not what the plan says)
  function remade(q, packs) {
    const P = packs || T.packs, item = P && P[q.s] && P[q.s].test && P[q.s].test.items && P[q.s].test.items[q.i];
    if (!item || !Array.isArray(item.v) || q.v == null || !item.v[q.v] || !getMX()) return null;
    return made(item.v[q.v]);
  }

  // -> '' when a plan keeps every rule, else what is wrong. packs (default T.packs): the marks are made again from them
  function check(plan, packs) {
    const papers = plan && plan.papers;
    if (!Array.isArray(papers) || papers.length !== PAPERS) return 'not two papers';
    const all = [].concat(papers[0], papers[1]), seen = {};
    for (let k = 0; k < all.length; k++) { if (seen[all[k].s + '.' + all[k].i]) return 'a question twice: ' + all[k].s + '.' + all[k].i; seen[all[k].s + '.' + all[k].i] = 1; }
    const real = papers.map(function (p) {
      return p.map(function (q) {
        if (q.v == null) return q;
        const m = remade(q, packs);
        return m ? Object.assign({}, q, { marks: m.marks, claim: m.claim }) : Object.assign({}, q, { marks: 0, broken: true });
      });
    });
    for (let p = 0; p < PAPERS; p++) {
      const list = real[p], st = stats(list), name = 'paper ' + (p + 1);
      const bad = list.filter(function (q) { return q.broken; })[0];
      if (bad) return name + ': ' + bad.s + '.' + bad.i + '.' + bad.v + ' does not build';
      if (st.questions !== PER) return name + ' has ' + st.questions + ' questions';
      if (st.marks !== MARKS) return name + ' has ' + st.marks + ' marks';
      if (st.dokQ[3] !== 1) return name + ' has ' + st.dokQ[3] + ' DOK 3 questions';
      for (let d = 1; d <= 3; d++) if (!inRange(st, st.dok[d], DOK_RANGE[d])) return name + ' DOK ' + d + ' is ' + st.pct(st.dok[d]) + '%';
      const S = Object.keys(PAPER_STRAND);
      for (let k = 0; k < S.length; k++) if (!inRange(st, st.strand[S[k]], PAPER_STRAND[S[k]])) return name + ' strand ' + S[k] + ' is ' + st.pct(st.strand[S[k]]) + '%';
      if (st.strandQ.S < 1 || st.strandQ.G < 2) return name + ' strands ' + JSON.stringify(st.strandQ);
      if (list[0].dok !== 1) return name + ' starts with DOK ' + list[0].dok;
      const at = list.findIndex(function (q) { return q.dok === 3; });
      if (at < CLAIM_AT[0] || at > CLAIM_AT[1]) return name + ' has its DOK 3 claim at question ' + (at + 1);
      if (!list[at].claim || list[at].strand !== 'N') return name + ': its DOK 3 question is not a Number claim';
      if (st.claims > MAX_CLAIMS) return name + ' has ' + st.claims + ' claims';
      for (let k = 1; k < list.length; k++) if (list[k].claim && list[k - 1].claim) return name + ' has two claims next to each other (' + k + ', ' + (k + 1) + ')';
    }
    const st = stats([].concat(real[0], real[1]));
    for (let d = 1; d <= 3; d++) if (!inRange(st, st.dok[d], DOK_RANGE[d])) return 'DOK ' + d + ' is ' + st.pct(st.dok[d]) + '%';
    const S = Object.keys(STRAND_RANGE);
    for (let k = 0; k < S.length; k++) if (!inRange(st, st.strand[S[k]], STRAND_RANGE[S[k]])) return 'strand ' + S[k] + ' is ' + st.pct(st.strand[S[k]]) + '%';
    const missing = objectives().filter(function (c) { return !st.los[c]; });
    if (missing.length) return 'objectives not covered: ' + missing.join(' ');
    return '';
  }

  /* ---------- drawing a test ---------- */

  // what is still wrong with one paper: [hard (must be 0), soft (the aim: 9 / 9 / 2 marks)]
  function paperCost(p) {
    const st = stats(p);
    let hard = Math.abs(st.marks - MARKS) * 4;
    for (let d = 1; d <= 3; d++) hard += outside(st.marks, st.dok[d], DOK_RANGE[d]) * 2;
    Object.keys(PAPER_STRAND).forEach(function (k) { hard += outside(st.marks, st.strand[k], PAPER_STRAND[k]) * 2; });
    hard += Math.max(0, 1 - st.strandQ.S) * 3 + Math.max(0, 2 - st.strandQ.G) * 3;
    hard += Math.max(0, st.claims - MAX_CLAIMS) * 3;
    let soft = 0;
    for (let d = 1; d <= 3; d++) soft += Math.abs(st.dok[d] - DOK_AIM[d]);
    return [hard, soft];
  }
  function wholeCost(papers) {
    const st = stats([].concat(papers[0], papers[1]));
    let hard = 0;
    Object.keys(STRAND_RANGE).forEach(function (k) { hard += outside(st.marks, st.strand[k], STRAND_RANGE[k]) * 2; });
    hard += objectives().filter(function (x) { return !st.los[x]; }).length * 5;
    return hard;
  }
  function cost(papers) {
    const a = paperCost(papers[0]), b = paperCost(papers[1]);
    return (a[0] + b[0] + wholeCost(papers)) * 10 + a[1] + b[1];
  }
  const hardOf = function (papers) { return paperCost(papers[0])[0] + paperCost(papers[1])[0] + wholeCost(papers); };

  function tryOnce(pool, r, avoid) {
    const used = {}, picked = [];
    const fresh = function (q) { return !used[q.key]; };
    const prefer = function (list) {                       // not on the last try, if there is such a one
      const a = list.filter(function (q) { return !(q.key in avoid); });
      return a.length ? a : list;
    };
    const take = function (q) { used[q.key] = 1; picked.push(q); return q; };
    const pick = function (list) { const l = prefer(list.filter(fresh)); return l.length ? take(l[Math.floor(r() * l.length)]) : null; };
    const covered = function () { const o = {}; picked.forEach(function (q) { q.lo.forEach(function (c) { o[c] = 1; }); }); return o; };

    // two DOK 3 claims (Number), from two stops: one a paper
    const claims = shuffle(pool.filter(function (q) { return q.dok === 3 && q.strand === 'N' && q.claim; }), r);
    // the first claim: one that covers two objectives when the trail has one (each Mini test claim now tests one
    // objective, so usually any Number claim; the 13 Number objectives are covered by the rest of the test)
    const wide = claims.filter(function (q) { return q.lo.length > 1; });
    const c1 = pick(wide.length ? wide : claims);
    if (!c1) return null;
    const c2 = pick(claims.filter(function (q) { return q.s !== c1.s; }));
    if (!c2) return null;
    const plain = pool.filter(function (q) { return q.dok !== 3; });

    // Geometry and measure: each objective once, then 1 or 2 more; Statistics: each objective once, sometimes one more
    const G = plain.filter(function (q) { return q.strand === 'G'; }), S = plain.filter(function (q) { return q.strand === 'S'; });
    const gCodes = shuffle(objectives().filter(function (c) { return c.charAt(1) === 'G'; }), r);
    const sCodes = shuffle(objectives().filter(function (c) { return c.charAt(1) === 'S'; }), r);
    gCodes.forEach(function (c) { if (!covered()[c]) pick(G.filter(function (q) { return q.lo.indexOf(c) >= 0; })); });
    sCodes.forEach(function (c) { if (!covered()[c]) pick(S.filter(function (q) { return q.lo.indexOf(c) >= 0; })); });
    // Grade 5 (EOS1: 5 Geometry and 2 Statistics questions of 28): at least 4 G and 2 S, sometimes a fifth or sixth G
    const count = function (k) { return picked.filter(function (q) { return q.strand === k; }).length; };
    const wantG = 4 + Math.floor(r() * 3);
    for (let k = 0; k < 8 && count('G') < wantG; k++) if (!pick(G)) break;
    for (let k = 0; k < 4 && count('S') < 2; k++) if (!pick(S)) break;

    // Number: every objective not covered yet (a greedy cover: the question that covers the most objectives still
    // missing, ties at random), then more Number questions up to 28 (an objective on the test fewer times first)
    const N = plain.filter(function (q) { return q.strand === 'N'; });
    for (let guard = 0; guard < 40; guard++) {
      const have = covered();
      const gain = function (q) { return q.lo.filter(function (x) { return x.charAt(1) === 'N' && !have[x]; }).length; };
      const can = N.filter(function (q) { return fresh(q) && gain(q) > 0; });
      if (!can.length) break;
      const most = Math.max.apply(null, can.map(gain));
      pick(can.filter(function (q) { return gain(q) === most; }));
      if (picked.length > PAPERS * PER) return null;
    }
    if (objectives().some(function (c) { return !covered()[c]; })) return null;
    while (picked.length < PAPERS * PER) {
      const counts = {};
      picked.forEach(function (q) { q.lo.forEach(function (c) { counts[c] = (counts[c] || 0) + 1; }); });
      const most = function (q) { return Math.max.apply(null, q.lo.map(function (c) { return counts[c] || 0; })); };
      const can = N.filter(fresh);
      if (!can.length) return null;
      const least = Math.min.apply(null, can.map(most));
      pick(can.filter(function (q) { return most(q) <= least; }));
    }

    // two papers: one DOK 3 claim each, the rest shared out; then a search (never moving the DOK 3 claims): swap a
    // question for one not on the test (Geometry or Statistics for the same strand when the strands are right), or
    // swap two questions between the papers, until each paper keeps its rules (aimed at 9 / 9 / 2 marks of DOK)
    const rest = shuffle(picked.filter(function (q) { return q.dok !== 3; }), r);
    const papers = [[c1].concat(rest.slice(0, PER - 1)), [c2].concat(rest.slice(PER - 1))];
    const outs = plain.filter(function (q) { return !used[q.key]; });
    let now = cost(papers);
    for (let step = 0; step < 3000 && now > 0; step++) {
      const p = Math.floor(r() * PAPERS), a = 1 + Math.floor(r() * (PER - 1));
      if (r() < 0.5) {                                   // between the papers
        const b = 1 + Math.floor(r() * (PER - 1)), x = papers[p][a], y = papers[1 - p][b];
        papers[p][a] = y; papers[1 - p][b] = x;
        const next = cost(papers);
        if (next <= now) now = next; else { papers[p][a] = x; papers[1 - p][b] = y; }
      } else {                                           // with a question not on the test
        const j = Math.floor(r() * outs.length), x = papers[p][a], y = outs[j];
        if (y.key in avoid && !(x.key in avoid)) continue;
        papers[p][a] = y; outs[j] = x;
        const next = cost(papers);
        if (next <= now) now = next; else { papers[p][a] = x; outs[j] = y; }
      }
    }
    if (hardOf(papers) > 0) return null;
    return { papers: papers.map(function (p) { return order(p, r); }) };
  }

  // the order on a paper: mixed, roughly easy to hard; question 1 is DOK 1; the DOK 3 claim at a random place from
  // question 5 to 13; never two claims next to each other
  function order(list, r) {
    const top = list.filter(function (q) { return q.dok === 3; })[0];
    const keyed = list.filter(function (q) { return q !== top; }).map(function (q) { return { q: q, k: q.dok + (r() - 0.5) * 1.7 }; });
    keyed.sort(function (a, b) { return a.k - b.k; });
    const out = keyed.map(function (x) { return x.q; });
    const first = out.findIndex(function (q) { return q.dok === 1 && !q.claim; });
    if (first > 0) out.unshift(out.splice(first, 1)[0]);
    const at = CLAIM_AT[0] + Math.floor(r() * (CLAIM_AT[1] - CLAIM_AT[0] + 1));
    out.splice(at, 0, top);
    // a claim next to a claim: swap the one that is not the DOK 3 claim with the nearest plain question that can take it
    const isC = function (k) { return k >= 0 && k < out.length && !!out[k].claim; };
    for (let guard = 0; guard < 20; guard++) {
      let k = -1;
      for (let i = 1; i < out.length; i++) if (isC(i) && isC(i - 1)) { k = out[i] === top ? i - 1 : i; break; }
      if (k < 0) break;
      let best = -1;
      for (let d = 1; d < out.length && best < 0; d++) {
        [k - d, k + d].forEach(function (j) {
          if (best >= 0 || j < 1 || j >= out.length || out[j] === top || isC(j)) return;
          const t = out[j]; out[j] = out[k]; out[k] = t;      // try it
          const ok = !(isC(j - 1) || isC(j + 1)) && !((isC(k - 1) && isC(k)) || (isC(k) && isC(k + 1)));
          if (ok) best = j; else { out[k] = out[j]; out[j] = t; }
        });
      }
      if (best < 0) break;
    }
    return out;
  }

  // the set of numbers: one worth the item's marks, random, and not the one this item had on the last try
  function setOf(q, avoid, r) {
    const ok = q.okSets.length ? q.okSets : [0];
    let k = Math.floor(r() * ok.length);
    if (q.key in avoid && ok.length > 1 && ok[k] === avoid[q.key]) k = (k + 1 + Math.floor(r() * (ok.length - 1))) % ok.length;
    return ok[k];
  }
  const asQ = function (q, v) { return { s: q.s, i: q.i, v: v, dok: q.dok, lo: q.lo, twm: q.twm, marks: q.setMarks[v] || q.marks, strand: q.strand, claim: q.claim }; };

  function plan(packs, opts) {
    opts = opts || {};
    const seed = (Number(opts.seed) >>> 0) || (Math.floor(Math.random() * 4294967295) >>> 0) || 7;
    const avoid = opts.avoid || {};
    const pool = poolOf(packs);
    const r = rng(seed);
    let got = null;
    for (let t = 0; t < 400 && !got; t++) {
      const one = tryOnce(pool, r, t < 300 ? avoid : {});
      if (!one) continue;
      const out = { papers: one.papers.map(function (p) { return p.map(function (q) { return asQ(q, setOf(q, avoid, r)); }); }) };
      if (!check(out, packs)) got = out;
    }
    if (!got) return null;
    got.seed = seed;
    return got;
  }

  const code = function (q) { return q.s + '.' + q.i + '.' + q.v; };
  // codes: [paper 1] (the short test) or [paper 1, paper 2]
  function fromCodes(packs, codes) {
    const pool = poolOf(packs), by = {};
    pool.forEach(function (q) { by[q.key] = q; });
    if (!Array.isArray(codes) || codes.length < 1 || codes.length > PAPERS) return null;
    const papers = codes.map(function (list) {
      return (Array.isArray(list) ? list : []).map(function (c) {
        const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(c)), q = m && by[m[1] + '.' + m[2]];
        return q ? asQ(q, Math.min(Number(m[3]), q.sets - 1)) : null;
      });
    });
    return papers.every(function (p) { return p.length === PER && p.every(Boolean); }) ? { papers: papers } : null;
  }

  T.summit = Object.assign(T.summit || {}, {
    plan: plan, check: check, stats: stats, code: code, fromCodes: fromCodes, pool: poolOf,
    PER: PER, MARKS: MARKS, PAPERS: PAPERS, DOK_RANGE: DOK_RANGE, DOK_AIM: DOK_AIM, PAPER_STRAND: PAPER_STRAND,
    STRAND_RANGE: STRAND_RANGE, MAX_CLAIMS: MAX_CLAIMS, CLAIM_AT: CLAIM_AT
  });
})(window.T = window.T || {});
