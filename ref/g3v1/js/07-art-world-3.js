/* 07-art-world-3.js - the Rounding River, the world scene of Stop 3 (window.T_ART['world-rounding-river']).

   The hub header of Stop 3 (35-hub.js buildScene), drawn with the recipe of every world scene (docs/02-architecture.md):
     viewBox 0 0 800 500, preserveAspectRatio xMidYMid slice, data-view, data-safe (x, y, w, h: what must show at every
     size) and data-band (top, bottom: the heart, clear of the floating buttons and the sheet). The heart's main part,
     the frog on 47 and its jump to the 50 post, carries data-heart (test/scene.mjs checks it stays clear of the buttons).
     Layers, back to front: sky (sun or moon, stars, clouds, birds), far (round green hills, trees), banks (the left and
     the right bank, reeds, a signpost), floor (the river between the banks, ripples), things: a wooden bridge over the
     river that is a number line from 40 to 50 (a post at every number, boards with 40, 45 and 50), the halfway post 45
     with a gold dashed line and a gold buoy under it in the water; a frog on 47 jumps to 50 (a dashed arc, a gold ring
     round the 50 board: 47 rounds to 50); three boats in order of size, 9, 16, 24; Zip on the left bank; a signpost on the far
     bank with 52 > 25.
     Maths meaning: rounding to the nearest ten (the frog), halfway (the buoy and the dashed line), comparing (the sign),
     ordering (the boats).
     Palette: CSS variables on .art (--rr-*), redefined by the class world-rounding-river-night (the dark theme):
       a dark sky with stars and the moon, deeper grass and water, the lanterns on the end posts glow.
     Motion: only under .art.is-live (35-hub.js adds it when motion is allowed), transform and opacity only, slow
       loops: the clouds drift, the birds glide, the river's ripples slide, the buoy and the boats bob, the frog hops now
       and then, the reeds sway. Still under reduced motion and on the lowest effects tier (html[data-fx="1"]).
   Class names start with the id, so many copies on one page never clash; ids are renamed per copy by T.ui.art. */
(function () {
  'use strict';

  const ID = 'world-rounding-river';
  const c = function (name) { return 'class="' + ID + '-' + name.split(' ').join(' ' + ID + '-') + '"'; };
  const r1 = function (v) { return Math.round(v * 10) / 10; };

  /* ---------- palette: day, then night ---------- */
  const DAY = {
    sk1: '#BFE6F5', sk2: '#EEF9F0', h1: '#9FD39A', h2: '#7EC27C', h3: '#B8E0AE', tr: '#4E9E52', tr2: '#3C8642', tk: '#8A5A2E',
    g1: '#7CC56E', g2: '#5DAE55', g3: '#A6DB8E', gl: '#2D7C3A', wa: '#5DB6E8', wa2: '#3E97D1', wt: '#D4F0FC',
    wd: '#C98E52', wd2: '#A8703C', wdl: '#6E4320', bd: '#FFFFFF', bdi: '#20402A', cld: '#FFFFFF', bird: '#2D5A36', reed: '#3C8642',
    lamp: '0', su: '1', mo: '0', sr: '0', cso: '.9'
  };
  const NIGHT = {
    sk1: '#0D1B2E', sk2: '#24405A', h1: '#24463A', h2: '#1C3A30', h3: '#2C5244', tr: '#1E4A30', tr2: '#163C26', tk: '#3E2A1A',
    g1: '#2E5A34', g2: '#244A2A', g3: '#3A6A40', gl: '#0E2414', wa: '#1F4E7A', wa2: '#173E64', wt: '#6A9CC4',
    wd: '#7A5838', wd2: '#5E4229', wdl: '#2C1C0E', bd: '#EEF3EC', bdi: '#1B3020', cld: '#4A5E80', bird: '#C8DCCB', reed: '#2C5A34',
    lamp: '1', su: '0', mo: '1', sr: '1', cso: '.45'
  };
  const vars = function (p) { return Object.keys(p).map(function (k) { return '--rr-' + k + ':' + p[k]; }).join(';'); };
  const fill = function (names) { return names.map(function (n) { return '.' + ID + '-' + n + '{fill:var(--rr-' + n + ')}'; }).join(''); };

  const S = '.' + ID + '-';
  const live = '.art.is-live ' + S;
  const FONT = 'var(--font-display,Arial,Helvetica,sans-serif)';
  const css =
    '.art{' + vars(DAY) + '}.art.' + ID + '-night{' + vars(NIGHT) + '}' +
    fill(['h1', 'h2', 'h3', 'tr', 'tr2', 'tk', 'g1', 'g2', 'g3', 'wd', 'wd2', 'bd', 'cld']) +
    S + 'o{stroke:var(--rr-gl);stroke-width:2.5}' + S + 'ow{stroke:var(--rr-wdl);stroke-width:2.4}' +
    S + 'wt{stroke:var(--rr-wt);stroke-width:3;fill:none}' +
    S + 'su{fill:#FFE08A;opacity:var(--rr-su)}' + S + 'sun-ray{stroke:#FFD05A;stroke-width:5;opacity:var(--rr-su)}' +
    S + 'mo{fill:#FFF4CF;opacity:var(--rr-mo)}' + S + 'stars{fill:#FFF4CF;opacity:var(--rr-sr)}' +
    S + 'clouds{opacity:var(--rr-cso)}' + S + 'birds{stroke:var(--rr-bird);stroke-width:2.5;fill:none}' +
    S + 'reeds{stroke:var(--rr-reed);stroke-width:3;fill:none}' +
    S + 'lamp{opacity:var(--rr-lamp)}' +
    S + 'n{fill:var(--rr-bdi);font:800 21px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'nb{fill:#3A2600;font:800 22px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'ns{fill:var(--rr-bdi);font:800 17px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'jump{stroke:#D9730D;stroke-width:3.5;fill:none;stroke-dasharray:9 7}' +
    S + 'half{stroke:#A66A06;stroke-width:3;stroke-dasharray:8 6;fill:none}' +
    // what moves: each part slides or turns around its own box
    S + 'frog,' + S + 'buoy,' + S + 'boat{transform-box:fill-box;transform-origin:50% 100%}' +
    live + 'cloud-a{animation:' + ID + '-drift 28s ease-in-out infinite alternate}' +
    live + 'cloud-b{animation:' + ID + '-drift 36s ease-in-out -11s infinite alternate-reverse}' +
    live + 'birds{animation:' + ID + '-glide 19s ease-in-out infinite alternate}' +
    live + 'ripple{animation:' + ID + '-ripple 6s linear infinite}' +
    live + 'buoy{animation:' + ID + '-bob 3.6s ease-in-out infinite alternate}' +
    live + 'boat{animation:' + ID + '-bob 4.4s ease-in-out -1.2s infinite alternate}' +
    live + 'frog{animation:' + ID + '-hop 5.2s ease-in-out infinite}' +
    S + 'reeds{transform-box:fill-box;transform-origin:50% 100%}' + live + 'reeds{animation:' + ID + '-sway 5s ease-in-out infinite alternate}' +
    live + 'stars{animation:' + ID + '-tw 3.4s ease-in-out infinite alternate}' +
    '@keyframes ' + ID + '-drift{0%{transform:translateX(-12px)}100%{transform:translateX(14px)}}' +
    '@keyframes ' + ID + '-glide{0%{transform:translate(-10px,4px)}100%{transform:translate(16px,-6px)}}' +
    '@keyframes ' + ID + '-ripple{to{transform:translateX(-40px)}}' +
    '@keyframes ' + ID + '-bob{0%{transform:translateY(0)}100%{transform:translateY(4px)}}' +
    '@keyframes ' + ID + '-hop{0%,72%,100%{transform:translateY(0)}78%{transform:translateY(-12px)}84%{transform:translateY(0)}90%{transform:translateY(-5px)}95%{transform:translateY(0)}}' +
    '@keyframes ' + ID + '-sway{0%{transform:rotate(-1.5deg)}100%{transform:rotate(1.5deg)}}' +
    '@keyframes ' + ID + '-tw{0%{opacity:1}100%{opacity:.35}}' +
    '@media (prefers-reduced-motion:reduce){.art.is-live *{animation:none!important;transition:none!important}}' +
    'html[data-fx="1"] .art.is-live *{animation:none!important}';

  /* ---------- small drawing helpers ---------- */
  const rect = function (x, y, w, h, cls, extra) {
    return '<rect x="' + r1(x) + '" y="' + r1(y) + '" width="' + r1(w) + '" height="' + r1(h) + '"' + (cls ? ' ' + c(cls) : '') + (extra ? ' ' + extra : '') + '/>';
  };
  const path = function (d, cls, extra) { return '<path d="' + d + '"' + (cls ? ' ' + c(cls) : '') + (extra ? ' ' + extra : '') + '/>'; };
  const use = function (id, x, y, extra) { return '<use href="#' + id + '" x="' + r1(x) + '" y="' + r1(y) + '"' + (extra ? ' ' + extra : '') + '/>'; };
  const text = function (x, y, t, cls) { return '<text x="' + r1(x) + '" y="' + r1(y) + '" ' + c(cls) + '>' + t + '</text>'; };

  /* ---------- reusable shapes (defs) ---------- */
  const LEFT = 'M0 500V262c40-10 90-14 140-8 34 4 60 14 82 30 14 10 24 26 30 46l18 170z';      // the left bank (to x 270)
  const RIGHT = 'M800 500V258c-46-10-96-12-140-6-30 4-56 16-76 32-14 12-22 28-28 46l-16 170z';   // the right bank (from x 540)
  const defs = '<defs>' +
    '<linearGradient id="rr-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--rr-sk1)"/><stop offset="1" style="stop-color:var(--rr-sk2)"/></linearGradient>' +
    '<linearGradient id="rr-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--rr-wa)" stop-opacity=".82"/><stop offset="1" style="stop-color:var(--rr-wa2)" stop-opacity=".95"/></linearGradient>' +
    '<clipPath id="rr-river"><rect x="0" y="318" width="800" height="182"/></clipPath>' +
    '<path id="rr-cloud" d="M0 0h70c10 0 13-13 3-17 1-11-12-16-19-10-5-11-22-12-26-1-9-4-18 2-16 11-9 1-10 17 0 17z"/>' +
    '<g id="rr-tree"><path d="M-3 0v-18h6v18z" class="' + ID + '-tk"/><circle cx="0" cy="-30" r="17" class="' + ID + '-tr"/><circle cx="-9" cy="-24" r="10" class="' + ID + '-tr2"/></g>' +
    '<path id="rr-reed" d="M0 0c-2-14-1-28 3-40M6 0c1-12 4-22 10-30M-6 0c-3-10-8-18-14-22"/>' +
    '<path id="rr-post" d="M-4 0h8v34h-8z"/>' +
    '</defs>';

  /* ---------- sky: the sun or the moon, stars, clouds, birds ---------- */
  let rays = '';
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    rays += 'M' + r1(676 + Math.cos(a) * 46) + ' ' + r1(82 + Math.sin(a) * 46) + 'L' + r1(676 + Math.cos(a) * 60) + ' ' + r1(82 + Math.sin(a) * 60);
  }
  let stars = '';
  [[48, 36], [130, 96], [226, 40], [306, 82], [404, 26], [492, 92], [566, 40], [744, 50], [774, 132], [88, 150], [360, 140], [620, 160]].forEach(function (p, i) {
    stars += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i % 3 ? 1.6 : 2.4) + '"/>';
  });
  const sky = rect(0, 0, 800, 500, '', 'fill="url(#rr-sky)"') +
    '<g ' + c('stars') + '>' + stars + '</g>' +
    path(rays, 'sun-ray') + '<circle cx="676" cy="82" r="34" ' + c('su') + '/>' +
    '<path d="M690 56a30 30 0 1 0 8 50 26 26 0 1 1-8-50z" ' + c('mo') + '/>' +
    '<g ' + c('clouds') + '><g ' + c('cloud-a') + '>' + use('rr-cloud', 110, 78, c('cld')) + '</g>' +
    '<g ' + c('cloud-b') + '>' + use('rr-cloud', 452, 54, c('cld') + ' transform="translate(452 54) scale(.8) translate(-452 -54)"') + '</g></g>' +
    '<g ' + c('birds') + '><path d="M300 112q8-8 14 0q6-8 14 0"/><path d="M334 96q6-6 11 0q5-6 11 0"/></g>';

  /* ---------- far: round green hills and trees ---------- */
  const far = path('M0 290V226c60-34 130-38 196-12 50-30 120-34 170-6 44-26 110-30 160-4 56-34 130-36 196-8 30 6 56 16 78 28V290Z', 'h3') +
    path('M0 300V248c70-24 150-22 214 6 64-22 150-24 214 2 66-26 150-22 214 4 54-18 110-16 158 2V300Z', 'h1') +
    use('rr-tree', 70, 244) + use('rr-tree', 104, 250, 'transform="translate(104 250) scale(.8) translate(-104 -250)"') +
    use('rr-tree', 694, 244) + use('rr-tree', 730, 252, 'transform="translate(730 252) scale(.85) translate(-730 -252)"') +
    use('rr-tree', 452, 236, 'transform="translate(452 236) scale(.7) translate(-452 -236)"');

  /* ---------- floor: the river between the banks, with ripples ---------- */
  let ripples = '';
  for (let i = 0; i < 14; i++) ripples += 'M' + (200 + i * 40) + ' 352q10-6 20 0t20 0';
  const river = rect(0, 318, 800, 182, '', 'fill="url(#rr-water)"') +
    '<g clip-path="url(#rr-river)"><g ' + c('ripple') + '>' + path(ripples, 'wt') +
    path(ripples.replace(/ 352q/g, ' 402q'), 'wt', 'opacity=".55" transform="translate(-16 0)"') +
    path(ripples.replace(/ 352q/g, ' 452q'), 'wt', 'opacity=".4"') + '</g></g>' +
    path('M0 318H800', '', 'stroke="var(--rr-wt)" stroke-width="3"');

  /* ---------- banks: grass, reeds, the signpost on the far bank ---------- */
  const banks = path(LEFT, 'g1', c('o')) + path('M0 262c40-10 90-14 140-8 34 4 60 14 82 30', '', 'stroke="var(--rr-g3)" stroke-width="7"') +
    path(RIGHT, 'g1', c('o')) + path('M800 258c-46-10-96-12-140-6-30 4-56 16-76 32', '', 'stroke="var(--rr-g3)" stroke-width="7"') +
    path('M0 360c50-8 120-6 180 4l60 140H0z', 'g2') + path('M800 356c-50-8-120-6-180 4l-56 140H800z', 'g2') +
    '<g ' + c('reeds') + '>' + use('rr-reed', 246, 332) + use('rr-reed', 262, 344) + use('rr-reed', 548, 336) + use('rr-reed', 532, 350) + '</g>' +
    // the signpost on the left bank: 52 > 25 (compare)
    rect(307, 224, 8, 34, 'wd2', c('ow')) + rect(268, 190, 86, 36, 'bd', 'rx="10" ' + c('ow')) + text(311, 215, '52 &gt; 25', 'ns') +
    // flowers
    '<g fill="#F5C142">' + '<circle cx="156" cy="300" r="4"/><circle cx="176" cy="310" r="4"/><circle cx="640" cy="300" r="4"/><circle cx="722" cy="290" r="4"/></g>';

  /* ---------- things: the number line bridge from 40 to 50, the frog's jump, the halfway buoy, the boats ---------- */
  const X = function (v) { return 228 + (v - 40) * 30; };          // 40 at x 228, 50 at x 528 (inside x 200 to 600)
  const DECK = 300;
  let bridge = rect(204, DECK - 4, 348, 14, 'wd', c('ow') + ' rx="4"') + path('M208 ' + (DECK + 10) + 'L228 ' + (DECK + 38) + 'M548 ' + (DECK + 10) + 'L528 ' + (DECK + 38), '', c('ow')) +
    path('M228 ' + (DECK + 10) + 'Q378 ' + (DECK + 62) + ' 528 ' + (DECK + 10), '', 'stroke="var(--rr-wd2)" stroke-width="7" fill="none"');
  let heart = '', outer = '';
  for (let v = 40; v <= 50; v++) {
    const x = X(v), end = v === 40 || v === 50, mid = v === 45;
    const post = path('M' + x + ' ' + (DECK - 4) + 'V' + (DECK - (end ? 40 : mid ? 26 : 16)), '', 'stroke="var(--rr-wdl)" stroke-width="' + (end ? 6 : 4) + '"');
    if (v >= 47) heart += post; else outer += post;
  }
  // boards with 40, 45 and 50 under the deck (the 50 board has a gold ring: 47 rounds to 50)
  const board = function (v, gold) {
    const x = X(v);
    return rect(x - 24, DECK + 14, 48, 30, gold ? '' : 'bd', 'rx="8" ' + (gold ? 'fill="#F7B23B" stroke="#A66A06" stroke-width="2.5"' : c('ow'))) +
      text(x, DECK + 37, String(v), gold ? 'nb' : 'n');
  };
  outer += board(40) + board(45, true);
  outer += board(50) + '<ellipse cx="' + X(50) + '" cy="' + (DECK + 29) + '" rx="34" ry="24" fill="none" stroke="#F5A623" stroke-width="4"/>';
  // the halfway line over 45, and the lanterns on the end posts (they glow at night)
  outer += path('M' + X(45) + ' ' + (DECK - 30) + 'V' + (DECK - 92), 'half') +
    '<path d="M' + X(45) + ' ' + (DECK - 92) + 'h18l-6 8 6 8h-18z" fill="#F7B23B" stroke="#A66A06" stroke-width="2"/>' +
    '<g ' + c('lamp') + '><circle cx="' + X(40) + '" cy="' + (DECK - 48) + '" r="14" fill="#FFE38A" opacity=".55"/><circle cx="' + X(50) + '" cy="' + (DECK - 48) + '" r="14" fill="#FFE38A" opacity=".55"/></g>' +
    '<circle cx="' + X(40) + '" cy="' + (DECK - 48) + '" r="6" fill="#FFD05A" stroke="#A66A06" stroke-width="2"/><circle cx="' + X(50) + '" cy="' + (DECK - 48) + '" r="6" fill="#FFD05A" stroke="#A66A06" stroke-width="2"/>';
  // the frog on 47, ready to jump to 50 (the dashed jump and its arrow head)
  const fx = X(47), tx = X(50);
  heart += path('M' + (fx + 10) + ' ' + (DECK - 34) + 'Q' + ((fx + tx) / 2 + 4) + ' ' + (DECK - 92) + ' ' + (tx - 4) + ' ' + (DECK - 56), 'jump') +
    path('M' + (tx - 16) + ' ' + (DECK - 63) + 'L' + (tx - 4) + ' ' + (DECK - 55) + 'L' + (tx - 3) + ' ' + (DECK - 71), '', 'stroke="#D9730D" stroke-width="3.5" fill="none"');
  const frog = '<g ' + c('frog') + '><g transform="translate(' + fx + ' ' + (DECK - 4) + ')">' +
    '<ellipse cx="0" cy="-14" rx="19" ry="14" fill="#6CC04A" stroke="#2D7C3A" stroke-width="2.5"/>' +
    '<path d="M-17-4c-8 2-10 6-6 8h10M17-4c8 2 10 6 6 8H13" fill="#6CC04A" stroke="#2D7C3A" stroke-width="2.5"/>' +
    '<circle cx="-9" cy="-28" r="7" fill="#FFFFFF" stroke="#2D7C3A" stroke-width="2.5"/><circle cx="9" cy="-28" r="7" fill="#FFFFFF" stroke="#2D7C3A" stroke-width="2.5"/>' +
    '<circle cx="-8" cy="-28" r="3" fill="#1B2A1E"/><circle cx="10" cy="-28" r="3" fill="#1B2A1E"/>' +
    '<path d="M-8-12q8 6 16 0" stroke="#2D7C3A" stroke-width="2.5" fill="none"/></g></g>';
  // the halfway buoy in the river under 45
  const buoy = '<g ' + c('buoy') + '><g transform="translate(' + X(45) + ' 392)">' +
    '<path d="M-16 0a16 16 0 0 1 32 0z" fill="#F7B23B" stroke="#A66A06" stroke-width="2.5"/><path d="M-12-8h24" stroke="#FFFFFF" stroke-width="4"/>' +
    '<path d="M0-16v-18" stroke="#A66A06" stroke-width="3"/><path d="M0-34h14l-5 6 5 6H0" fill="#F7B23B" stroke="#A66A06" stroke-width="2"/>' +
    '<ellipse cx="0" cy="2" rx="22" ry="5" fill="none" stroke="var(--rr-wt)" stroke-width="2.5"/></g></g>';
  // three boats in order of size: 9, 16, 24
  const boat = function (x, y, k, v) {
    const w = 46 * k, h = 15 * k;
    return '<g transform="translate(' + x + ' ' + y + ')">' +
      path('M' + (-w / 2) + ' 0h' + w + 'l' + (-10 * k) + ' ' + h + 'h' + (-(w - 20 * k)) + 'z', 'wd', c('ow')) +
      path('M0 0V' + (-30 * k), '', c('ow')) + path('M2 ' + (-28 * k) + 'l' + (18 * k) + ' ' + (22 * k) + 'H2z', 'bd', c('ow')) +
      text(-w / 4, h * 0.72, String(v), 'ns') + '</g>';
  };
  const boats = '<g ' + c('boat') + '>' + boat(300, 446, 0.9, 9) + boat(410, 456, 1.1, 16) + boat(540, 466, 1.3, 24) + '</g>';

  // Zip on the left bank, at the start of the bridge
  const zip = '<g transform="translate(146 222) scale(.36)">' +
    '<line x1="60" y1="24" x2="60" y2="13" stroke="#0E2B58" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="11" r="6" fill="#F7B53C" stroke="#B8770E" stroke-width="2.5"/>' +
    '<rect x="9" y="46" width="12" height="22" rx="6" fill="#F7B53C" stroke="#B8770E" stroke-width="2.5"/><rect x="99" y="46" width="12" height="22" rx="6" fill="#F7B53C" stroke="#B8770E" stroke-width="2.5"/>' +
    '<rect x="34" y="92" width="52" height="30" rx="13" fill="#5AB4EE" stroke="#1E5D9F" stroke-width="3"/><circle cx="60" cy="107" r="6" fill="#E5404A"/>' +
    '<path d="M36 100Q13 103 6 75" fill="none" stroke="#1E5D9F" stroke-width="7" stroke-linecap="round"/><circle cx="6" cy="72" r="6.5" fill="#5AB4EE" stroke="#1E5D9F" stroke-width="3"/>' +
    '<path d="M84 100Q107 103 114 75" fill="none" stroke="#1E5D9F" stroke-width="7" stroke-linecap="round"/><circle cx="114" cy="72" r="6.5" fill="#5AB4EE" stroke="#1E5D9F" stroke-width="3"/>' +
    '<rect x="17" y="22" width="86" height="68" rx="24" fill="#1D4F9C" stroke="#0E2B58" stroke-width="3"/>' +
    '<rect x="27" y="33" width="66" height="46" rx="16" fill="#EAF6FF"/>' +
    '<ellipse cx="46" cy="52" rx="6" ry="7.5" fill="#0E2B58"/><ellipse cx="74" cy="52" rx="6" ry="7.5" fill="#0E2B58"/>' +
    '<circle cx="48" cy="49" r="2" fill="#FFFFFF"/><circle cx="76" cy="49" r="2" fill="#FFFFFF"/>' +
    '<circle cx="36" cy="66" r="4.5" fill="#FF9AA2"/><circle cx="84" cy="66" r="4.5" fill="#FF9AA2"/>' +
    '<path d="M47 63Q60 74 73 63" fill="none" stroke="#0E2B58" stroke-width="3" stroke-linecap="round"/></g>';

  const things = bridge + outer + '<g data-heart="jump">' + heart + frog + '</g>' + buoy + boats + zip;

  const label = 'The Rounding River: a wooden bridge over a river is a number line from 40 to 50. A frog on 47 jumps to 50, ' +
    'the nearest ten. A gold buoy floats under 45, halfway. Three boats go in order of size: 9, 16 and 24. Zip stands by a sign: 52 &gt; 25.';

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="art" data-art="' + ID +
    '" data-view="0 0 800 500" data-safe="150,150,500,210" data-band="228,318" role="img" aria-label="' + label +
    '" fill="none" stroke-linejoin="round" stroke-linecap="round"><style>' + css + '</style>' + defs +
    '<g data-layer="sky">' + sky + '</g>' +
    '<g data-layer="far">' + far + '</g>' +
    '<g data-layer="floor">' + river + '</g>' +
    '<g data-layer="banks">' + banks + '</g>' +
    '<g data-layer="things">' + things + '</g>' +
    '</svg>';

  window.T_ART = window.T_ART || {};
  window.T_ART[ID] = svg;
})();
