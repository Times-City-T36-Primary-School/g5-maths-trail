/* 12-art-world-7.js - the Fraction Garden, the world scene of Stop 7 (window.T_ART['world-fraction-garden']).

   The hub header of Stop 7 (35-hub.js buildScene), drawn with the recipe of every world scene (docs/02-architecture.md):
     viewBox 0 0 800 500, preserveAspectRatio xMidYMid slice, data-view, data-safe (x, y, w, h: what must show at every
     size) and data-band (top, bottom: the heart, clear of the floating buttons and the sheet). The heart's main part,
     the planter box in 4 equal parts with flowers in one part and the sign "1/4" over it, carries data-heart
     (test/scene.mjs checks it stays clear of the buttons).
     Layers, back to front: sky (sun or moon, stars, clouds), far (lime hills, a glass house, round trees), floor (grass and
     a stone path), things: the planter box in the middle (4 equal parts, tulips in one: one quarter), a fence of fraction
     strips on the right (rails of 1 whole, 2 halves, 4 quarters and 8 eighths, one part of each painted orange: a
     fraction wall), a picnic table on the left with a round cake cut into 4 equal slices and 4 plates (shared fairly),
     a watering can, two butterflies, Zip waving by the fence.
     Maths meaning: equal parts (the box, the cake), more parts make smaller parts (the fence), a unit fraction (the sign).
     Palette: CSS variables on .art (--fg-*), redefined by the class world-fraction-garden-night (the dark theme): a dark
     sky with stars and the moon, paper lanterns on the fence are lit, fireflies glow.
     Motion: only under .art.is-live (35-hub.js adds it when motion is allowed), transform and opacity only, slow loops:
     the clouds drift, the butterflies flap and float, the tulips sway, the stars and fireflies twinkle, Zip bobs. Still under
     reduced motion and on the lowest effects tier (html[data-fx="1"]).
   Class names start with the id, so many copies on one page never clash; ids are renamed per copy by T.ui.art. */
(function () {
  'use strict';

  const ID = 'world-fraction-garden';
  const c = function (name) { return 'class="' + ID + '-' + name.split(' ').join(' ' + ID + '-') + '"'; };
  const r1 = function (v) { return Math.round(v * 10) / 10; };

  /* ---------- palette: day, then night ---------- */
  const DAY = {
    sk1: '#CDEBF5', sk2: '#F7FBEA', h1: '#C5E08A', h2: '#A9D06A', tr: '#6DB24A', trd: '#3F7E2C', gh: '#E6F4F7', ghl: '#7FA6B0',
    gr: '#A8D46F', gr2: '#93C25B', st: '#E9E1CC', stl: '#C9BC9A', wd: '#C98E52', wdd: '#8A5A2B', wdl: '#6E4320', pl: '#F4F1E4',
    soil: '#7A5132', cld: '#FFFFFF', tb: '#E9D3A8', tbl: '#8A6A3A',
    su: '1', mo: '0', sr: '0', cso: '.95', glow: '0'
  };
  const NIGHT = {
    sk1: '#0D1E2E', sk2: '#27402F', h1: '#34512A', h2: '#2A4422', tr: '#2F5A2A', trd: '#1F3F1C', gh: '#2E4A52', ghl: '#5F8690',
    gr: '#30552C', gr2: '#294A26', st: '#55524A', stl: '#45423A', wd: '#7E5A36', wdd: '#5A3E22', wdl: '#3A2814', pl: '#D8D4C2',
    soil: '#4A321F', cld: '#3E5468', tb: '#7A6A4E', tbl: '#4A3A22',
    su: '0', mo: '1', sr: '1', cso: '.45', glow: '1'
  };
  const vars = function (p) { return Object.keys(p).map(function (k) { return '--fg-' + k + ':' + p[k]; }).join(';'); };
  const fill = function (names) { return names.map(function (n) { return '.' + ID + '-' + n + '{fill:var(--fg-' + n + ')}'; }).join(''); };

  const S = '.' + ID + '-';
  const live = '.art.is-live ' + S;
  const FONT = 'var(--font-display,Arial,Helvetica,sans-serif)';
  const css =
    '.art{' + vars(DAY) + '}.art.' + ID + '-night{' + vars(NIGHT) + '}' +
    fill(['h1', 'h2', 'tr', 'trd', 'gh', 'gr', 'gr2', 'st', 'wd', 'wdd', 'pl', 'soil', 'cld', 'tb']) +
    S + 'o{stroke:var(--fg-wdl);stroke-width:2.5}' + S + 'gl{stroke:var(--fg-ghl);stroke-width:2;fill:none}' +
    S + 'sl{stroke:var(--fg-stl);stroke-width:2}' + S + 'tl{stroke:var(--fg-tbl);stroke-width:2.5}' +
    S + 'part{fill:#F3F8E4}' + S + 'on{fill:#F28B30}' +
    S + 'su{fill:#FFE08A;opacity:var(--fg-su)}' + S + 'sun-ray{stroke:#FFD05A;stroke-width:5;opacity:var(--fg-su)}' +
    S + 'mo{fill:#FFF4CF;opacity:var(--fg-mo)}' + S + 'stars{fill:#FFF4CF;opacity:var(--fg-sr)}' +
    S + 'clouds{opacity:var(--fg-cso)}' + S + 'glow{opacity:var(--fg-glow)}' +
    S + 'n{fill:#2A2F3A;font:800 17px/1 ' + FONT + ';text-anchor:middle}' +
    // what moves: each part turns or slides around its own box
    S + 'tulips{transform-box:fill-box;transform-origin:50% 100%}' + S + 'zip{transform-box:fill-box;transform-origin:50% 100%}' +
    S + 'wing{transform-box:fill-box;transform-origin:50% 50%}' +
    live + 'cloud-a{animation:' + ID + '-drift 30s ease-in-out infinite alternate}' +
    live + 'cloud-b{animation:' + ID + '-drift 38s ease-in-out -12s infinite alternate-reverse}' +
    live + 'tulips{animation:' + ID + '-sway 3.6s ease-in-out infinite alternate}' +
    live + 'fly-a{animation:' + ID + '-float 9s ease-in-out infinite alternate}' +
    live + 'fly-b{animation:' + ID + '-float 11s ease-in-out -4s infinite alternate-reverse}' +
    live + 'wing{animation:' + ID + '-flap .5s ease-in-out infinite alternate}' +
    live + 'zip{animation:' + ID + '-bob 3.2s ease-in-out infinite alternate}' +
    live + 'stars{animation:' + ID + '-tw 3.4s ease-in-out infinite alternate}' +
    live + 'flies{animation:' + ID + '-tw 2.2s ease-in-out infinite alternate}' +
    '@keyframes ' + ID + '-drift{0%{transform:translateX(-12px)}100%{transform:translateX(14px)}}' +
    '@keyframes ' + ID + '-sway{0%{transform:rotate(-2.5deg)}100%{transform:rotate(2.5deg)}}' +
    '@keyframes ' + ID + '-float{0%{transform:translate(0,0)}50%{transform:translate(18px,-10px)}100%{transform:translate(34px,4px)}}' +
    '@keyframes ' + ID + '-flap{0%{transform:scaleX(1)}100%{transform:scaleX(.35)}}' +
    '@keyframes ' + ID + '-bob{0%{transform:translateY(0)}100%{transform:translateY(-4px)}}' +
    '@keyframes ' + ID + '-tw{0%{opacity:1}100%{opacity:.35}}' +
    '@media (prefers-reduced-motion:reduce){.art.is-live *{animation:none!important;transition:none!important}}' +
    'html[data-fx="1"] .art.is-live *{animation:none!important}';

  /* ---------- small drawing helpers ---------- */
  const rect = function (x, y, w, h, cls, extra) {
    return '<rect x="' + r1(x) + '" y="' + r1(y) + '" width="' + r1(w) + '" height="' + r1(h) + '"' + (cls ? ' ' + c(cls) : '') + (extra ? ' ' + extra : '') + '/>';
  };
  const path = function (d, cls, extra) { return '<path d="' + d + '"' + (cls ? ' ' + c(cls) : '') + (extra ? ' ' + extra : '') + '/>'; };
  const use = function (id, x, y, extra) { return '<use href="#' + id + '" x="' + r1(x) + '" y="' + r1(y) + '"' + (extra ? ' ' + extra : '') + '/>'; };

  /* ---------- reusable shapes (defs) ---------- */
  const defs = '<defs>' +
    '<linearGradient id="fg-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--fg-sk1)"/><stop offset="1" style="stop-color:var(--fg-sk2)"/></linearGradient>' +
    '<path id="fg-cloud" d="M0 0h70c10 0 13-13 3-17 1-11-12-16-19-10-5-11-22-12-26-1-9-4-18 2-16 11-9 1-10 17 0 17z"/>' +
    // a round tree
    '<g id="fg-tree"><rect x="-4" y="-6" width="8" height="26" rx="3" fill="#8A5A34"/><circle cx="0" cy="-22" r="22" class="' + ID + '-tr"/><circle cx="-8" cy="-28" r="9" class="' + ID + '-trd" opacity=".35"/></g>' +
    // a tulip (its colour from fill)
    '<g id="fg-tul"><path d="M0 0v-24" stroke="#3E8E52" stroke-width="3"/><path d="M0-10q-9-2-11-11q9 1 11 9z" fill="#5DB56F"/>' +
    '<path d="M-7-34q0 12 7 12t7-12l-4 4-3-6-3 6z" stroke="#7A1F2C" stroke-width="1.6"/></g>' +
    // a small sprout
    '<g id="fg-spr"><path d="M0 0v-8" stroke="#3E8E52" stroke-width="2.5"/><path d="M0-6q-7-1-8-7q6 0 8 5zM0-6q7-1 8-7q-6 0-8 5z" fill="#6DB24A"/></g>' +
    // a butterfly: two wings that flap, a body
    '<g id="fg-fly"><ellipse class="' + ID + '-wing" cx="0" cy="0" rx="11" ry="8" fill="#F7B23B" stroke="#8A4B08" stroke-width="1.5"/>' +
    '<path d="M0-7v14" stroke="#3A2A1A" stroke-width="2.5"/></g>' +
    // a paper lantern (lit at night)
    '<g id="fg-lan"><circle cx="0" cy="0" r="14" fill="#FFD872" fill-opacity=".45" class="' + ID + '-glow"/><path d="M0-14v6" stroke="#5A3A20" stroke-width="1.5"/>' +
    '<ellipse cx="0" cy="0" rx="8" ry="10" fill="#E5533D" stroke="#8A2A1A" stroke-width="1.5"/></g>' +
    '</defs>';

  /* ---------- sky: the sun or the moon, stars, clouds ---------- */
  let rays = '';
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    rays += 'M' + r1(110 + Math.cos(a) * 44) + ' ' + r1(78 + Math.sin(a) * 44) + 'L' + r1(110 + Math.cos(a) * 58) + ' ' + r1(78 + Math.sin(a) * 58);
  }
  let stars = '';
  [[44, 34], [196, 56], [292, 24], [372, 62], [610, 30], [668, 70], [742, 40], [776, 120], [26, 130], [560, 110], [700, 168], [236, 128], [470, 40]].forEach(function (p, i) {
    stars += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i % 3 ? 1.6 : 2.4) + '"/>';
  });
  const sky = rect(0, 0, 800, 500, '', 'fill="url(#fg-sky)"') +
    '<g ' + c('stars') + '>' + stars + '</g>' +
    path(rays, 'sun-ray') + '<circle cx="110" cy="78" r="32" ' + c('su') + '/>' +
    '<path d="M124 54a28 28 0 1 0 8 46 24 24 0 1 1-8-46z" ' + c('mo') + '/>' +
    '<g ' + c('clouds') + '><g ' + c('cloud-a') + '>' + use('fg-cloud', 600, 70, c('cld')) + '</g>' +
    '<g ' + c('cloud-b') + '>' + use('fg-cloud', 250, 52, c('cld') + ' transform="translate(250 52) scale(.75) translate(-250 -52)"') + '</g></g>';

  /* ---------- far: hills, a glass house, round trees ---------- */
  const FLOOR = 392;
  let glass = path('M40 ' + (FLOOR - 40) + 'V292l50-34 50 34V' + (FLOOR - 40) + 'Z', 'gh', c('gl'));
  for (let x = 56; x < 140; x += 21) glass += path('M' + x + ' ' + (FLOOR - 40) + 'V' + r1(292 - Math.max(0, 34 - Math.abs(x - 90) * 0.68)), 'gl');
  glass += path('M40 316H140', 'gl');
  const far = path('M0 330Q130 270 290 316T560 302T800 318V420H0Z', 'h1') + path('M0 362Q170 322 340 352T650 338T800 352V420H0Z', 'h2') +
    glass + use('fg-tree', 176, 358) + use('fg-tree', 690, 352) + use('fg-tree', 760, 366) + use('fg-tree', 630, 364);

  /* ---------- floor: the grass and a stone path ---------- */
  let stones = '';
  [[392, 406, 22, 8], [404, 428, 26, 9], [388, 452, 30, 10], [410, 480, 34, 11]].forEach(function (s) {
    stones += '<ellipse cx="' + s[0] + '" cy="' + s[1] + '" rx="' + s[2] + '" ry="' + s[3] + '" ' + c('st sl') + '/>';
  });
  const floor = rect(0, FLOOR, 800, 108, 'gr') + path('M0 ' + FLOOR + 'H800', '', 'stroke="var(--fg-gr2)" stroke-width="3"') + stones;

  /* ---------- things ---------- */
  // the fence of fraction strips (right): rails of 1, 2, 4 and 8 equal parts, one part of each orange
  const FX = 468, FW = 144, RH = 17;
  let fence = rect(FX - 12, 262, 10, FLOOR - 262, 'wdd', c('o')) + rect(FX + FW + 2, 262, 10, FLOOR - 262, 'wdd', c('o')) +
    path('M' + (FX - 16) + ' 264l9-10 9 10M' + (FX + FW - 2) + ' 264l9-10 9 10', 'wdd', c('o'));
  [1, 2, 4, 8].forEach(function (parts, i) {
    const y = 274 + i * (RH + 7), w = FW / parts;
    fence += rect(FX, y, FW, RH, 'part', 'rx="3"') + rect(FX, y, w, RH, 'on', 'rx="3"');
    for (let k = 1; k < parts; k++) fence += path('M' + r1(FX + k * w) + ' ' + y + 'v' + RH, '', 'stroke="#2A2F3A" stroke-width="2"');
    fence += rect(FX, y, FW, RH, '', 'rx="3" fill="none" stroke="#2A2F3A" stroke-width="2.5"');
  });
  // paper lanterns on a string over the fence (lit at night)
  let lanterns = path('M' + (FX - 8) + ' 258Q' + (FX + FW / 2) + ' 276 ' + (FX + FW + 8) + ' 258', '', 'stroke="#5A3A20" stroke-width="1.5"');
  [FX + 22, FX + 72, FX + 122].forEach(function (x) { lanterns += use('fg-lan', x, 280 - (x === FX + 72 ? 2 : 6)); });

  // the picnic table (left) with a round cake cut into 4 equal slices and 4 plates
  const TX = 206, TW = 124, TY = 356;
  let table = rect(TX + 10, TY + 8, 8, FLOOR - TY - 4, 'wdd', c('o')) + rect(TX + TW - 18, TY + 8, 8, FLOOR - TY - 4, 'wdd', c('o')) +
    rect(TX, TY, TW, 10, 'tb', c('tl') + ' rx="3"');
  const CX = TX + TW / 2, CY = TY - 26;
  table += path('M' + (CX - 40) + ' ' + CY + 'v18a40 12 0 0 0 80 0v-18', '', 'fill="#F2B8C6" stroke="#A55A6E" stroke-width="2.5"') +
    '<ellipse cx="' + CX + '" cy="' + CY + '" rx="40" ry="12" fill="#FCE3EA" stroke="#A55A6E" stroke-width="2.5"/>' +
    path('M' + (CX - 40) + ' ' + CY + 'H' + (CX + 40) + 'M' + CX + ' ' + (CY - 12) + 'V' + (CY + 12), '', 'stroke="#7A3A4C" stroke-width="2"') +
    '<circle cx="' + (CX - 16) + '" cy="' + (CY - 5) + '" r="3.5" fill="#D22630"/><circle cx="' + (CX + 16) + '" cy="' + (CY - 5) + '" r="3.5" fill="#D22630"/>' +
    '<circle cx="' + (CX - 16) + '" cy="' + (CY + 5) + '" r="3.5" fill="#D22630"/><circle cx="' + (CX + 16) + '" cy="' + (CY + 5) + '" r="3.5" fill="#D22630"/>' +
    path('M' + (CX - 30) + ' ' + (TY + 1) + 'h60', '', 'stroke="#A55A6E" stroke-width="3"');
  [TX + 8, TX + 34, TX + TW - 34, TX + TW - 8].forEach(function (x) {
    table += '<ellipse cx="' + x + '" cy="' + (TY - 2) + '" rx="11" ry="4" ' + c('pl') + ' stroke="#8A8A80" stroke-width="1.5"/>';
  });

  // the heart (data-heart): the planter box in 4 equal parts, tulips in one part (one quarter), sprouts in the others,
  // and the sign 1/4 on a stake
  const BX = 344, BW = 112, BY = 352;
  let box = rect(BX - 4, BY - 6, BW + 8, 8, 'wdd', c('o') + ' rx="2"') + rect(BX, BY, BW, FLOOR - BY, 'wd', c('o')) +
    rect(BX + 2, BY - 6, BW - 4, 6, 'soil');
  for (let k = 1; k < 4; k++) box += path('M' + (BX + k * BW / 4) + ' ' + (BY - 10) + 'V' + FLOOR, '', 'stroke="var(--fg-wdl)" stroke-width="3.5"');
  let grow = '';
  for (let k = 1; k < 4; k++) grow += use('fg-spr', BX + k * BW / 4 + 9, BY - 6) + use('fg-spr', BX + k * BW / 4 + 20, BY - 6);
  // board lines on the front of the box
  box += path('M' + BX + ' ' + (BY + 14) + 'H' + (BX + BW) + 'M' + BX + ' ' + (BY + 28) + 'H' + (BX + BW), '', 'stroke="var(--fg-wdl)" stroke-width="1.2" opacity=".5"');
  const TUL = ['#E5404A', '#F7B23B', '#E5404A'];
  let tul = '';
  [0, 1, 2].forEach(function (k) { tul += use('fg-tul', BX + 6 + k * 9, BY - 6, 'fill="' + TUL[k] + '"'); });
  grow += '<g ' + c('tulips') + '>' + tul + '</g>';
  // the sign: 1 over 4 on a small board on the front of the fourth part (the heart is the box: short, for a phone's strip)
  const SX = BX + BW * 7 / 8;
  box += rect(SX - 15, BY - 8, 30, 42, 'pl', c('o') + ' rx="5"') +
    '<text x="' + SX + '" y="' + (BY + 9) + '" ' + c('n') + '>1</text>' + path('M' + (SX - 8) + ' ' + (BY + 13) + 'h16', '', 'stroke="#2A2F3A" stroke-width="2.5"') +
    '<text x="' + SX + '" y="' + (BY + 30) + '" ' + c('n') + '>4</text>';
  const heart = grow + '<g data-heart="planter">' + box + '</g>';

  // a watering can by the box
  const can = '<g transform="translate(300 ' + (FLOOR + 10) + ')">' + path('M0 0h26v-20H0z', '', 'fill="#5AB4EE" stroke="#1E5D9F" stroke-width="2.5"') +
    path('M26-14l16-12', '', 'stroke="#1E5D9F" stroke-width="4"') + path('M4-20q9-12 18 0', '', 'stroke="#1E5D9F" stroke-width="3"') + '</g>';

  // two butterflies
  const flies = '<g ' + c('fly-a') + '>' + use('fg-fly', 262, 262) + '</g><g ' + c('fly-b') + '>' + use('fg-fly', 520, 220, 'transform="translate(520 220) scale(.8) translate(-520 -220)"') + '</g>';
  // fireflies at night
  let ff = '';
  [[180, 318], [236, 296], [440, 300], [590, 236], [646, 300], [150, 360]].forEach(function (p) { ff += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3" fill="#FFF0A0"/>'; });
  const fireflies = '<g ' + c('glow') + '><g ' + c('flies') + '>' + ff + '</g></g>';

  // Zip waving by the fence
  const zip = '<g ' + c('zip') + '><g transform="translate(616 ' + (FLOOR - 30) + ') scale(.42)">' +
    '<line x1="60" y1="24" x2="60" y2="13" stroke="#0E2B58" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="11" r="6" fill="#F7B53C" stroke="#B8770E" stroke-width="2.5"/>' +
    '<rect x="9" y="46" width="12" height="22" rx="6" fill="#F7B53C" stroke="#B8770E" stroke-width="2.5"/><rect x="99" y="46" width="12" height="22" rx="6" fill="#F7B53C" stroke="#B8770E" stroke-width="2.5"/>' +
    '<rect x="34" y="92" width="52" height="30" rx="13" fill="#5AB4EE" stroke="#1E5D9F" stroke-width="3"/><circle cx="60" cy="107" r="6" fill="#E5404A"/>' +
    '<path d="M36 100Q13 103 6 75" fill="none" stroke="#1E5D9F" stroke-width="7" stroke-linecap="round"/><circle cx="6" cy="72" r="6.5" fill="#5AB4EE" stroke="#1E5D9F" stroke-width="3"/>' +
    '<path d="M84 100Q110 96 118 62" fill="none" stroke="#1E5D9F" stroke-width="7" stroke-linecap="round"/><circle cx="118" cy="58" r="6.5" fill="#5AB4EE" stroke="#1E5D9F" stroke-width="3"/>' +
    '<rect x="17" y="22" width="86" height="68" rx="24" fill="#1D4F9C" stroke="#0E2B58" stroke-width="3"/>' +
    '<rect x="27" y="33" width="66" height="46" rx="16" fill="#EAF6FF"/>' +
    '<ellipse cx="46" cy="52" rx="6" ry="7.5" fill="#0E2B58"/><ellipse cx="74" cy="52" rx="6" ry="7.5" fill="#0E2B58"/>' +
    '<circle cx="48" cy="49" r="2" fill="#FFFFFF"/><circle cx="76" cy="49" r="2" fill="#FFFFFF"/>' +
    '<circle cx="36" cy="66" r="4.5" fill="#FF9AA2"/><circle cx="84" cy="66" r="4.5" fill="#FF9AA2"/>' +
    '<path d="M47 63Q60 74 73 63" fill="none" stroke="#0E2B58" stroke-width="3" stroke-linecap="round"/></g></g>';

  // sunflowers at the edges (outside the safe box: a bonus on wide screens)
  let sun = '';
  [[34, FLOOR + 6], [70, FLOOR + 14], [748, FLOOR + 8]].forEach(function (p) {
    sun += path('M' + p[0] + ' ' + p[1] + 'V' + (p[1] - 70), '', 'stroke="#3E8E52" stroke-width="4"') +
      '<circle cx="' + p[0] + '" cy="' + (p[1] - 76) + '" r="15" fill="#F7C531" stroke="#B8860B" stroke-width="2"/><circle cx="' + p[0] + '" cy="' + (p[1] - 76) + '" r="7" fill="#7A4A1A"/>';
  });

  const things = fence + lanterns + table + heart + can + flies + zip + sun + fireflies;

  const label = 'The Fraction Garden: in the middle a planter box in 4 equal parts, with tulips in one part and a sign that says 1 over 4. ' +
    'On the right a fence of strips: 1 whole, 2 halves, 4 quarters and 8 eighths, one part of each painted orange. ' +
    'On the left a picnic table with a round cake cut into 4 equal slices and 4 plates. Butterflies fly, and Zip waves by the fence.';

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="art" data-art="' + ID +
    '" data-view="0 0 800 500" data-safe="160,60,480,400" data-band="306,396" role="img" aria-label="' + label +
    '" fill="none" stroke-linejoin="round" stroke-linecap="round"><style>' + css + '</style>' + defs +
    '<g data-layer="sky">' + sky + '</g>' +
    '<g data-layer="building">' + far + '</g>' +
    '<g data-layer="floor">' + floor + '</g>' +
    '<g data-layer="things">' + things + '</g>' +
    '</svg>';

  window.T_ART = window.T_ART || {};
  window.T_ART[ID] = svg;
})();
