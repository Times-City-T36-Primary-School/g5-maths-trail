/* 09-art-world-5.js - the Times Table Tower, the world scene of Stop 5 (window.T_ART['world-times-table-tower']).

   The hub header of Stop 5 (35-hub.js buildScene), drawn with the recipe of every world scene (docs/02-architecture.md):
     viewBox 0 0 800 500, preserveAspectRatio xMidYMid slice, data-view, data-safe (x, y, w, h: what must show at every
     size) and data-band (top, bottom: the heart, clear of the floating buttons and the sheet). The heart's main part,
     the tower's lobby (the sign "3 × 4 = 12" over the door), carries data-heart
     (test/scene.mjs checks it stays clear of the buttons).
     Layers, back to front: sky (sun or moon, stars, clouds), far (green hills, two small towers and round trees), floor
     (grass and the paved square), things: the tower in the middle with 3 floors of 4 windows (an array: 3 rows of 4),
     the floors numbered 4, 8 and 12 on teal tabs (the 4 times table: each floor adds 4 windows), the sign over the door
     "3 × 4 = 12", a glass lift on its side whose car stops at every floor (the multiples of 4), a flag with a × on the roof;
     a flower bed in front with 2 rows of 6 tulips (2 × 6 = 12, another factor pair of 12); Zip waving by the lift.
     Maths meaning: equal rows (the windows and the tulips), a times table (the floor numbers), factor pairs of 12.
     Palette: CSS variables on .art (--tt-*), redefined by the class world-times-table-tower-night (the dark theme):
       a dark sky with stars and the moon, the windows are lit.
     Motion: only under .art.is-live (35-hub.js adds it when motion is allowed), transform and opacity only, slow loops:
       the clouds drift, the flag waves, the lift goes up and stops at each floor, the stars twinkle, Zip bobs. Still under
       reduced motion and on the lowest effects tier (html[data-fx="1"]).
   Class names start with the id, so many copies on one page never clash; ids are renamed per copy by T.ui.art. */
(function () {
  'use strict';

  const ID = 'world-times-table-tower';
  const c = function (name) { return 'class="' + ID + '-' + name.split(' ').join(' ' + ID + '-') + '"'; };
  const r1 = function (v) { return Math.round(v * 10) / 10; };

  /* ---------- palette: day, then night ---------- */
  const DAY = {
    sk1: '#BFE9EE', sk2: '#F3FBF8', h1: '#A9DDB4', h2: '#8CCB9C', far: '#CFE7EA', farw: '#FFFFFF', tr: '#5DB56F', trd: '#3E8E52',
    tw: '#F4F1E8', tw2: '#E3DCCB', twl: '#4A5A6A', tl: '#17A2B0', tld: '#0E7682', win: '#BFE6F5', winf: '#7FB6CC',
    gr: '#9FD69B', gr2: '#8BC888', pv: '#E8E2D4', pvl: '#CFC6B2', cld: '#FFFFFF', glass: '#DFF4F7',
    su: '1', mo: '0', sr: '0', cso: '.95', glow: '0'
  };
  const NIGHT = {
    sk1: '#0B1E33', sk2: '#1E4256', h1: '#24503F', h2: '#1C4234', far: '#2C4A58', farw: '#FFD872', tr: '#2E6A44', trd: '#1E4A30',
    tw: '#5C6670', tw2: '#4A535C', twl: '#1A222A', tl: '#13808B', tld: '#0B5A62', win: '#FFD872', winf: '#C9973A',
    gr: '#2E5A3A', gr2: '#284F33', pv: '#4A4A52', pvl: '#3A3A42', cld: '#3E5870', glass: '#2F5864',
    su: '0', mo: '1', sr: '1', cso: '.45', glow: '1'
  };
  const vars = function (p) { return Object.keys(p).map(function (k) { return '--tt-' + k + ':' + p[k]; }).join(';'); };
  const fill = function (names) { return names.map(function (n) { return '.' + ID + '-' + n + '{fill:var(--tt-' + n + ')}'; }).join(''); };

  const S = '.' + ID + '-';
  const live = '.art.is-live ' + S;
  const FONT = 'var(--font-display,Arial,Helvetica,sans-serif)';
  const css =
    '.art{' + vars(DAY) + '}.art.' + ID + '-night{' + vars(NIGHT) + '}' +
    fill(['h1', 'h2', 'far', 'farw', 'tr', 'trd', 'tw', 'tw2', 'tl', 'tld', 'win', 'gr', 'gr2', 'pv', 'cld', 'glass']) +
    S + 'o{stroke:var(--tt-twl);stroke-width:2.5}' + S + 'of{stroke:var(--tt-winf);stroke-width:2}' +
    S + 'pl{stroke:var(--tt-pvl);stroke-width:2;fill:none}' +
    S + 'su{fill:#FFE08A;opacity:var(--tt-su)}' + S + 'sun-ray{stroke:#FFD05A;stroke-width:5;opacity:var(--tt-su)}' +
    S + 'mo{fill:#FFF4CF;opacity:var(--tt-mo)}' + S + 'stars{fill:#FFF4CF;opacity:var(--tt-sr)}' +
    S + 'clouds{opacity:var(--tt-cso)}' + S + 'glow{opacity:var(--tt-glow)}' +
    S + 'n{fill:#FFFFFF;font:800 19px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'sg{fill:#FFFFFF;font:800 20px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'fx{fill:#FFFFFF;font:800 15px/1 ' + FONT + ';text-anchor:middle}' +
    // what moves: each part turns or slides around its own box
    S + 'flag{transform-box:fill-box;transform-origin:0 50%}' + S + 'zip{transform-box:fill-box;transform-origin:50% 100%}' +
    live + 'cloud-a{animation:' + ID + '-drift 30s ease-in-out infinite alternate}' +
    live + 'cloud-b{animation:' + ID + '-drift 38s ease-in-out -12s infinite alternate-reverse}' +
    live + 'flag{animation:' + ID + '-wave 2.6s ease-in-out infinite alternate}' +
    live + 'car{animation:' + ID + '-lift 12s ease-in-out infinite}' +
    live + 'zip{animation:' + ID + '-bob 3.2s ease-in-out infinite alternate}' +
    live + 'stars{animation:' + ID + '-tw 3.4s ease-in-out infinite alternate}' +
    '@keyframes ' + ID + '-drift{0%{transform:translateX(-12px)}100%{transform:translateX(14px)}}' +
    '@keyframes ' + ID + '-wave{0%{transform:scaleX(1) skewY(0)}100%{transform:scaleX(.9) skewY(5deg)}}' +
    // the lift stops at each floor (4, 8, 12), then comes down again
    '@keyframes ' + ID + '-lift{0%,10%{transform:translateY(0)}20%,30%{transform:translateY(-52px)}40%,50%{transform:translateY(-104px)}' +
      '60%,70%{transform:translateY(-156px)}90%,100%{transform:translateY(0)}}' +
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
  const text = function (x, y, t, cls) { return '<text x="' + r1(x) + '" y="' + r1(y) + '" ' + c(cls) + '>' + t + '</text>'; };

  /* ---------- reusable shapes (defs) ---------- */
  const defs = '<defs>' +
    '<linearGradient id="tt-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--tt-sk1)"/><stop offset="1" style="stop-color:var(--tt-sk2)"/></linearGradient>' +
    '<path id="tt-cloud" d="M0 0h70c10 0 13-13 3-17 1-11-12-16-19-10-5-11-22-12-26-1-9-4-18 2-16 11-9 1-10 17 0 17z"/>' +
    // a window of the tower: a frame, the glass (lit at night) and a cross bar
    '<g id="tt-win"><rect x="0" y="0" width="30" height="32" rx="5" class="' + ID + '-win ' + ID + '-o"/><path d="M15 2v28M2 16h26" class="' + ID + '-of"/></g>' +
    // a far window (a lit dot at night)
    '<rect id="tt-fw" width="8" height="10" rx="2" class="' + ID + '-farw"/>' +
    // a round tree
    '<g id="tt-tree"><rect x="-4" y="-6" width="8" height="26" rx="3" fill="#8A5A34"/><circle cx="0" cy="-22" r="22" class="' + ID + '-tr"/><circle cx="-8" cy="-28" r="9" class="' + ID + '-trd" opacity=".35"/></g>' +
    // a tulip
    '<g id="tt-tul"><path d="M0 0v-20" stroke="#3E8E52" stroke-width="3"/><path d="M0-10q-8-2-10-10q8 1 10 8z" fill="#5DB56F"/>' +
    '<path d="M-7-30q0 12 7 12t7-12l-4 4-3-6-3 6z" stroke="#7A1F2C" stroke-width="1.6"/></g>' +
    '</defs>';

  /* ---------- sky: the sun or the moon, stars, clouds ---------- */
  let rays = '';
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    rays += 'M' + r1(110 + Math.cos(a) * 44) + ' ' + r1(78 + Math.sin(a) * 44) + 'L' + r1(110 + Math.cos(a) * 58) + ' ' + r1(78 + Math.sin(a) * 58);
  }
  let stars = '';
  [[44, 34], [196, 56], [292, 24], [372, 62], [610, 30], [668, 70], [742, 40], [776, 120], [26, 130], [560, 110], [700, 168], [236, 128]].forEach(function (p, i) {
    stars += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i % 3 ? 1.6 : 2.4) + '"/>';
  });
  const sky = rect(0, 0, 800, 500, '', 'fill="url(#tt-sky)"') +
    '<g ' + c('stars') + '>' + stars + '</g>' +
    path(rays, 'sun-ray') + '<circle cx="110" cy="78" r="32" ' + c('su') + '/>' +
    '<path d="M124 54a28 28 0 1 0 8 46 24 24 0 1 1-8-46z" ' + c('mo') + '/>' +
    '<g ' + c('clouds') + '><g ' + c('cloud-a') + '>' + use('tt-cloud', 600, 70, c('cld')) + '</g>' +
    '<g ' + c('cloud-b') + '>' + use('tt-cloud', 230, 46, c('cld') + ' transform="translate(230 46) scale(.75) translate(-230 -46)"') + '</g></g>';

  /* ---------- far: hills, two small towers, round trees ---------- */
  const FLOOR = 392;
  const farTower = function (x, w, h) {
    const top = FLOOR - 40 - h;
    let s = rect(x, top, w, h + 40, 'far', 'rx="4"') + path('M' + (x - 4) + ' ' + top + 'L' + (x + w / 2) + ' ' + (top - 20) + 'L' + (x + w + 4) + ' ' + top + 'Z', 'far');
    for (let r = 0; r < Math.floor(h / 26); r++) for (let k = 0; k < 2; k++) s += use('tt-fw', x + 10 + k * (w - 28), top + 12 + r * 26);
    return s;
  };
  const far = path('M0 330Q130 262 280 318T560 300T800 316V420H0Z', 'h1') + path('M0 360Q160 318 330 352T640 338T800 350V420H0Z', 'h2') +
    farTower(70, 46, 110) + farTower(680, 52, 130) +
    use('tt-tree', 160, 356) + use('tt-tree', 236, 362) + use('tt-tree', 604, 360) + use('tt-tree', 742, 366);

  /* ---------- floor: the grass and the paved square in front of the tower ---------- */
  let tiles = '';
  [414, 440, 468].forEach(function (y) { const k = (y - FLOOR) / 108 * 24; tiles += 'M' + r1(336 - k) + ' ' + y + 'H' + r1(464 + k); });
  for (let x = 340; x <= 460; x += 40) tiles += 'M' + x + ' ' + FLOOR + 'L' + r1(400 + (x - 400) * 1.4) + ' 500';
  const floor = rect(0, FLOOR, 800, 108, 'gr') + path('M0 ' + FLOOR + 'H800', '', 'stroke="var(--tt-gr2)" stroke-width="3"') +
    path('M340 ' + FLOOR + 'H460L484 500H316Z', 'pv') + path(tiles, 'pl');

  /* ---------- things ---------- */
  // the tower: a lobby (the door and the sign), 3 floors of 4 windows, the floor numbers 4, 8, 12, a roof with a flag
  const TX = 296, TW = 208, LOBBY = 330, FH = 52;
  let tower = rect(TX, LOBBY - 3 * FH, TW, FLOOR - LOBBY + 3 * FH, 'tw', c('o')) +
    rect(TX, LOBBY - 6, TW, 8, 'tw2', c('o'));
  for (let f = 1; f <= 3; f++) {
    const y = LOBBY - f * FH;
    if (f > 1) tower += path('M' + TX + ' ' + (y + FH) + 'H' + (TX + TW), '', 'stroke="var(--tt-tw2)" stroke-width="3"');
  }
  // the windows of floors 2 and 3 (floor 1 is in the heart, below)
  let wins = '';
  const winRow = function (f) {
    let s = '';
    for (let k = 0; k < 4; k++) s += use('tt-win', TX + 22 + k * 44, LOBBY - f * FH + 10);
    return s;
  };
  wins += winRow(2) + winRow(3);
  // the floor numbers on teal tabs at the left of the tower: 4, 8, 12 (each floor adds 4 windows)
  let tabs = '';
  [[1, '4'], [2, '8'], [3, '12']].forEach(function (p) {
    const y = LOBBY - p[0] * FH + 14;
    tabs += path('M' + (TX - 40) + ' ' + y + 'h34l8 12-8 12h-34z', 'tl', c('o')) + text(TX - 21, y + 19, p[1], 'n');
  });
  // the roof: a teal crown with a round clock face that shows ×, and the flag on its pole
  const roofY = LOBBY - 3 * FH;
  const roof = path('M' + (TX - 10) + ' ' + roofY + 'L' + (TX + 30) + ' ' + (roofY - 40) + 'H' + (TX + TW - 30) + 'L' + (TX + TW + 10) + ' ' + roofY + 'Z', 'tld', c('o')) +
    '<circle cx="400" cy="' + (roofY - 18) + '" r="17" ' + c('tl o') + '/>' + text(400, roofY - 11, '×', 'n') +
    path('M400 ' + (roofY - 40) + 'V' + (roofY - 92), '', 'stroke="var(--tt-twl)" stroke-width="3"') +
    '<g ' + c('flag') + '>' + path('M401 ' + (roofY - 92) + 'h46l-9 12 9 12h-46z', '', 'fill="#E5533D" ' + c('o')) + '</g>';
  // the glass lift on the right of the tower; its car rides up and stops at each floor
  const LX = TX + TW + 6;
  const lift = rect(LX, roofY - 2, 34, FLOOR - roofY + 2, 'glass', c('o') + ' rx="4"') +
    path('M' + (LX + 17) + ' ' + roofY + 'V' + FLOOR, '', 'stroke="var(--tt-twl)" stroke-width="1.5" opacity=".5"') +
    '<g ' + c('car') + '>' + rect(LX + 3, FLOOR - 46, 28, 40, '', 'rx="4" fill="#F5A623" ' + c('o')) + rect(LX + 8, FLOOR - 40, 18, 16, 'win', 'rx="3"') + '</g>';
  // floor 1 with its 4 windows, then the heart (data-heart): the lobby, the sign 3 × 4 = 12 and the door
  const heart = winRow(1) + '<g data-heart="tower">' +
    rect(352, LOBBY + 6, 96, 26, 'tld', 'rx="6" ' + c('o')) + text(400, LOBBY + 26, '3 × 4 = 12', 'sg') +
    path('M380 ' + FLOOR + 'V' + (LOBBY + 42) + 'q20-12 40 0V' + FLOOR + 'z', 'tl', c('o')) + path('M400 ' + (LOBBY + 36) + 'V' + FLOOR, '', c('o')) +
    '</g>';
  // a soft glow behind the lit windows at night
  let glow = '';
  for (let f = 1; f <= 3; f++) for (let k = 0; k < 4; k++) glow += '<circle cx="' + (TX + 37 + k * 44) + '" cy="' + (LOBBY - f * FH + 26) + '" r="22" fill="#FFE38A" opacity=".35"/>';

  // the flower bed in front: 2 rows of 6 tulips (2 × 6 = 12)
  const TUL = ['#E5404A', '#F7B23B'];
  // (inside x 200 to 600, so all 12 show at every size)
  let bed = path('M206 ' + (FLOOR + 34) + 'h100l8 44H198z', '', 'fill="#8A5A34" stroke="#5A3A20" stroke-width="2.5"');
  for (let r = 0; r < 2; r++) for (let k = 0; k < 6; k++) bed += use('tt-tul', 215 + k * 17 + r * 3, FLOOR + 56 + r * 20, 'fill="' + TUL[r] + '" transform="translate(' + r1(215 + k * 17 + r * 3) + ' ' + (FLOOR + 56 + r * 20) + ') scale(.8) translate(-' + r1(215 + k * 17 + r * 3) + ' -' + (FLOOR + 56 + r * 20) + ')"');
  // a small sign by the bed: 2 × 6
  bed += path('M222 ' + (FLOOR + 34) + 'V' + (FLOOR + 14), '', 'stroke="#5A3A20" stroke-width="4"') +
    rect(198, FLOOR - 8, 48, 24, 'tld', 'rx="6" ' + c('o')) + text(222, FLOOR + 9, '2 × 6', 'fx');

  // Zip waving by the lift
  const zip = '<g ' + c('zip') + '><g transform="translate(560 ' + (FLOOR - 32) + ') scale(.42)">' +
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
  // a bench and a lamp on the right of the square
  const bench = rect(612, FLOOR + 22, 92, 10, '', 'rx="3" fill="#C98E52" stroke="#6E4320" stroke-width="2.4"') +
    path('M622 ' + (FLOOR + 32) + 'v22M694 ' + (FLOOR + 32) + 'v22', '', 'stroke="#6E4320" stroke-width="4"') +
    rect(612, FLOOR + 2, 92, 9, '', 'rx="3" fill="#C98E52" stroke="#6E4320" stroke-width="2.4"') +
    path('M736 ' + (FLOOR + 60) + 'V' + (FLOOR - 62), '', 'stroke="#3A4A5A" stroke-width="5"') +
    '<circle cx="736" cy="' + (FLOOR - 70) + '" r="12" fill="#FFE38A" stroke="#3A4A5A" stroke-width="3"/>' +
    '<g ' + c('glow') + '><circle cx="736" cy="' + (FLOOR - 70) + '" r="30" fill="#FFE38A" opacity=".4"/></g>';

  const things = tower + '<g ' + c('glow') + '>' + glow + '</g>' + wins + tabs + roof + lift + heart + bed + zip + bench;

  const label = 'The Times Table Tower: a tall tower with 3 floors of 4 windows, 3 rows of 4. The floors are numbered 4, 8 and 12. ' +
    'Over the door a sign says 3 × 4 = 12. A glass lift on its side stops at every floor, and a flag with a times sign flies on the roof. ' +
    'In front, a flower bed has 2 rows of 6 tulips, 2 × 6. Zip waves by the lift.';

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="art" data-art="' + ID +
    '" data-view="0 0 800 500" data-safe="160,60,480,400" data-band="282,396" role="img" aria-label="' + label +
    '" fill="none" stroke-linejoin="round" stroke-linecap="round"><style>' + css + '</style>' + defs +
    '<g data-layer="sky">' + sky + '</g>' +
    '<g data-layer="building">' + far + '</g>' +
    '<g data-layer="floor">' + floor + '</g>' +
    '<g data-layer="things">' + things + '</g>' +
    '</svg>';

  window.T_ART = window.T_ART || {};
  window.T_ART[ID] = svg;
})();
