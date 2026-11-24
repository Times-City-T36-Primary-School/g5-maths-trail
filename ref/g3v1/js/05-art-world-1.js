/* 05-art-world-1.js - the Number Factory, the world scene of Stop 1 (window.T_ART['world-number-factory']).

   The hub header of Stop 1 (35-hub.js buildScene). The recipe every world scene follows (docs/02-architecture.md):
     viewBox 0 0 800 500, preserveAspectRatio xMidYMid slice, and three hints for fitScene():
       data-view  the whole drawing;  data-safe  x, y, w, h: the part that must show at every size;
       data-band  top, bottom: the heart, kept clear of the buttons that float on the scene and of the sheet.
       The heart's main part carries data-heart (test/scene.mjs checks it stays clear of the buttons).
     Layers, back to front: sky (sun or moon, stars, clouds), hills, the building (roof, chimney, windows, the
       Th H T O sign), the floor, then the things on it from left to right in place value order:
       a thousand cube on a crate, a stack of hundreds, the tens the machine makes, the machine (10 ones in,
       1 ten out, two gears), the belt with the ones, Zip at the control panel.
     Palette: CSS variables on .art (--nf-*), redefined by the class world-number-factory-night (the dark theme):
       a dark sky with stars and the moon, lit windows. Block colours are the place colours of 39-mat.css.
     Motion: only under .art.is-live (35-hub.js adds it when motion is allowed), transform and opacity only,
       slow loops: the clouds drift, smoke rises, the ones ride the belt and drop into the machine, every 10
       ones a ten slides out, the gears turn, the lamp glows, Zip waves now and then. Still under reduced
       motion and on the lowest effects tier (html[data-fx="1"]).
   Class names start with the id, so many copies on one page never clash; ids are renamed per copy by T.ui.art. */
(function () {
  'use strict';

  const ID = 'world-number-factory';
  const c = function (name) { return 'class="' + ID + '-' + name.split(' ').join(' ' + ID + '-') + '"'; };
  const r1 = function (v) { return Math.round(v * 10) / 10; };

  /* ---------- palette: day, then night ---------- */
  const DAY = {
    sk1: '#F7C9DB', sk2: '#FFF4F8', hl: '#F3C2D5', hl2: '#EAA9C2', wl: '#FCE6EE', wl2: '#F4CFDD', wl3: '#EDBDD0',
    rf: '#D14D7E', rf2: '#AE3465', gl: '#D4EEFB', gll: '#7FB4D6', fl: '#F3DFE7', fl2: '#E8CAD6', ln: '#5E1E3C',
    wd: '#EDBB83', wd2: '#C98A50', mc: '#E0548A', mc2: '#B83A6C', mp: '#FFFFFF', bt: '#5B4657', mt: '#D5CEDD',
    mt2: '#A79EB8', sh: 'rgba(120,36,74,.16)', sb: '#FFFFFF', rg: '#FFFFFF', cl: '#FFFFFF', sm: '#FFFFFF',
    su: '1', mo: '0', st: '0', lit: '0', sco: '.7'
  };
  const NIGHT = {
    sk1: '#140F33', sk2: '#3A2A5E', hl: '#2B2251', hl2: '#231B45', wl: '#3B2C58', wl2: '#33264E', wl3: '#2C2046',
    rf: '#7A2C5C', rf2: '#5A1F46', gl: '#FFD98A', gll: '#C98E2A', fl: '#2E2348', fl2: '#261D3E', ln: '#170E2C',
    wd: '#A67A52', wd2: '#7C5535', mc: '#C2477D', mc2: '#8E2E5E', mp: '#F2E8F7', bt: '#2F2540', mt: '#8C86A8',
    mt2: '#625C80', sh: 'rgba(6,4,24,.36)', sb: '#F6EEF8', rg: '#B9AECF', cl: '#5A4C82', sm: '#9D92BF',
    su: '0', mo: '1', st: '1', lit: '.55', sco: '.35'
  };
  const vars = function (p) { return Object.keys(p).map(function (k) { return '--nf-' + k + ':' + p[k]; }).join(';'); };
  const fill = function (names) { return names.map(function (n) { return '.' + ID + '-' + n + '{fill:var(--nf-' + n + ')}'; }).join(''); };

  /* the place colours (39-mat.css): face, top, side, outline */
  const TH = ['#D3C5FC', '#E8E0FF', '#AF9AF0', '#5B3FB8'];
  const HU = ['#B4E8CD', '#D6F4E4', '#8FD6B2', '#147A51'];
  const TE = ['#B5D5F7', '#D9EAFB', '#8DBDEB', '#1D62AE'];
  const ON = ['#FFD47E', '#FFE6AE', '#F2B84A', '#A76A00'];

  const S = '.' + ID + '-';
  const live = '.art.is-live ' + S;
  const css =
    '.art{' + vars(DAY) + '}.art.' + ID + '-night{' + vars(NIGHT) + '}' +
    fill(['wl', 'wl2', 'wl3', 'hl', 'hl2', 'rf', 'rf2', 'fl', 'fl2', 'wd', 'mc', 'mc2', 'mp', 'bt', 'mt', 'mt2', 'sh', 'sb', 'cl', 'sm']) +
    S + 'o{stroke:var(--nf-ln);stroke-width:2.5}' + S + 'o2{stroke:var(--nf-ln);stroke-width:1.6}' +
    S + 'wdl{stroke:var(--nf-wd2);stroke-width:2}' +
    S + 'gl{fill:var(--nf-gl);stroke:var(--nf-gll);stroke-width:2}' +
    S + 'su{fill:#FFE38A;opacity:var(--nf-su)}' + S + 'mo{fill:#FFF4CF;opacity:var(--nf-mo)}' +
    S + 'stars{fill:#FFF4CF;opacity:var(--nf-st)}' + S + 'lit{fill:#FFE7A6;opacity:var(--nf-lit)}' +
    S + 'clouds{opacity:var(--nf-sco)}' +
    S + 'tx{fill:#FFFFFF;font:800 23px/1 var(--font-display,Arial,Helvetica,sans-serif);text-anchor:middle}' +
    S + 'dg{fill:var(--nf-ln);font:800 12px/1 var(--font-display,Arial,Helvetica,sans-serif);text-anchor:middle}' +
    S + 'tg{fill:#FFFFFF;font:800 11px/1 var(--font-display,Arial,Helvetica,sans-serif);text-anchor:middle}' +
    S + 'scr{fill:#2E3B55}' + S + 'scd{fill:#9EF0C6;font:800 13px/1 var(--font-display,Arial,Helvetica,sans-serif);text-anchor:middle}' +
    // what moves: each part turns or slides around its own box
    S + 'gear,' + S + 'arm,' + S + 'puff,' + S + 'glow{transform-box:fill-box;transform-origin:center}' +
    S + 'arm{transform-origin:6% 92%}' +
    // the still picture (no motion, or motion paused): four ones wait on the belt; the new ten hides in the machine
    S + 'k0{transform:translateX(-26px)}' + S + 'k1{transform:translateX(-58px)}' + S + 'k2{transform:translateX(-90px)}' +
    S + 'k3{transform:translateX(-122px)}' + S + 'k4{opacity:0}' +
    live + 'c1{animation:' + ID + '-drift 34s ease-in-out infinite alternate}' +
    live + 'c2{animation:' + ID + '-drift 26s ease-in-out -11s infinite alternate-reverse}' +
    live + 'puff{animation:' + ID + '-puff 9s ease-out infinite}' +
    live + 'p2{animation-delay:-3s}' + live + 'p3{animation-delay:-6s}' +
    live + 'tw{animation:' + ID + '-tw 3.6s ease-in-out infinite alternate}' +
    live + 'g1{animation:' + ID + '-turn 18s linear infinite}' +
    live + 'g2{animation:' + ID + '-back 10.8s linear infinite}' +
    live + 'belt{animation:' + ID + '-belt 1.2s linear infinite}' +
    live + 'one{animation:' + ID + '-ride 9s linear infinite}' +
    live + 'k1{animation-delay:-1.8s}' + live + 'k2{animation-delay:-3.6s}' + live + 'k3{animation-delay:-5.4s}' + live + 'k4{animation-delay:-7.2s}' +
    live + 'rod{animation:' + ID + '-rod 18s ease-in-out -2s infinite}' +
    live + 'glow{animation:' + ID + '-glow 3s ease-in-out infinite alternate}' +
    live + 'arm{animation:' + ID + '-wave 7s ease-in-out infinite}' +
    '@keyframes ' + ID + '-drift{0%{transform:translateX(-10px)}100%{transform:translateX(12px)}}' +
    '@keyframes ' + ID + '-puff{0%{transform:translate(0,8px) scale(.5);opacity:0}20%{opacity:.9}100%{transform:translate(10px,-46px) scale(1.25);opacity:0}}' +
    '@keyframes ' + ID + '-tw{0%{opacity:1}100%{opacity:.3}}' +
    '@keyframes ' + ID + '-turn{to{transform:rotate(360deg)}}' +
    '@keyframes ' + ID + '-back{to{transform:rotate(-360deg)}}' +
    '@keyframes ' + ID + '-belt{to{transform:translateX(-12px)}}' +
    // a one rides 5 places along the belt (80% of the time), then drops into the hopper and is gone
    '@keyframes ' + ID + '-ride{0%{transform:translate(0,0);opacity:1}80%{transform:translate(-128px,0);opacity:1;animation-timing-function:ease-in}' +
      '90%{transform:translate(-134px,22px);opacity:0}100%{transform:translate(-134px,22px);opacity:0}}' +
    // every 10 ones (18 s), a ten slides out of the machine onto the pile, then fades into it
    '@keyframes ' + ID + '-rod{0%,12%{transform:translateX(0);opacity:0}14%{opacity:1}30%{transform:translateX(-66px);opacity:1}' +
      '40%{transform:translateX(-66px);opacity:1}48%,100%{transform:translateX(-66px);opacity:0}}' +
    '@keyframes ' + ID + '-glow{0%{opacity:.35;transform:scale(.85)}100%{opacity:.9;transform:scale(1.1)}}' +
    '@keyframes ' + ID + '-wave{0%,62%,100%{transform:rotate(0)}68%{transform:rotate(-16deg)}74%{transform:rotate(10deg)}80%{transform:rotate(-16deg)}86%{transform:rotate(8deg)}92%{transform:rotate(0)}}' +
    '@media (prefers-reduced-motion:reduce){.art.is-live *{animation:none!important}}' +
    'html[data-fx="1"] .art.is-live *{animation:none!important}';

  /* ---------- small drawing helpers ---------- */
  const rect = function (x, y, w, h, cls, extra) {
    return '<rect x="' + r1(x) + '" y="' + r1(y) + '" width="' + r1(w) + '" height="' + r1(h) + '"' + (cls ? ' ' + c(cls) : '') + (extra ? ' ' + extra : '') + '/>';
  };
  const path = function (d, cls, extra) { return '<path d="' + d + '"' + (cls ? ' ' + c(cls) : '') + (extra ? ' ' + extra : '') + '/>'; };
  const poly = function (pts, extra) { return '<polygon points="' + pts.map(r1).join(' ') + '" ' + extra + '/>'; };
  const use = function (id, x, y, extra) { return '<use href="#' + id + '" x="' + r1(x) + '" y="' + r1(y) + '"' + (extra ? ' ' + extra : '') + '/>'; };
  const col = function (p, k) { return 'fill="' + p[k] + '"'; };
  const line = function (p, w) { return 'stroke="' + p[3] + '" stroke-width="' + (w || 1.6) + '"'; };
  // n - 1 grid lines across a box, from (x0 + i dx, y0 + i dy), each (lx, ly) long
  const grid = function (n, x0, y0, dx, dy, lx, ly) {
    let d = '';
    for (let i = 1; i < n; i++) d += 'M' + r1(x0 + i * dx) + ' ' + r1(y0 + i * dy) + 'l' + r1(lx) + ' ' + r1(ly);
    return d;
  };
  const faint = function (p) { return 'stroke="' + p[3] + '" stroke-width="1" stroke-opacity=".45"'; };
  // a gear: n teeth, outer radius R, inner radius r, a hub hole
  const gearPath = function (n, R, r) {
    let d = '';
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, w = Math.PI / n;
      const pts = [[r, a - w * 0.62], [R, a - w * 0.36], [R, a + w * 0.36], [r, a + w * 0.62]];
      pts.forEach(function (q, j) { d += (i === 0 && j === 0 ? 'M' : 'L') + r1(Math.cos(q[1]) * q[0]) + ' ' + r1(Math.sin(q[1]) * q[0]); });
    }
    return d + 'Z';
  };

  /* ---------- reusable shapes (defs) ---------- */
  const ONE = 13;                        // a one: a small cube, front 13, depth 4
  const defs = '<defs>' +
    '<linearGradient id="nf-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--nf-sk1)"/><stop offset="1" style="stop-color:var(--nf-sk2)"/></linearGradient>' +
    '<g id="nf-one">' + poly([0, 4, 4, 0, ONE + 4, 0, ONE, 4], col(ON, 1) + ' ' + line(ON, 1.4)) +
      poly([ONE, 4, ONE + 4, 0, ONE + 4, ONE, ONE, ONE + 4], col(ON, 2) + ' ' + line(ON, 1.4)) +
      rect(0, 4, ONE, ONE, '', col(ON, 0) + ' ' + line(ON, 1.6) + ' rx="1.5"') + '</g>' +
    // a ten lying down: 60 long, 10 high, 10 squares, a top face
    '<g id="nf-ten">' + poly([0, 3, 3, 0, 63, 0, 60, 3], col(TE, 1) + ' ' + line(TE, 1.3)) +
      rect(0, 3, 60, 10, '', col(TE, 0) + ' ' + line(TE, 1.6) + ' rx="1.5"') + path(grid(10, 0, 3, 6, 0, 0, 10), '', faint(TE)) + '</g>' +
    '<g id="nf-win">' + rect(0, 0, 40, 42, 'gl', 'rx="7"') + path('M20 1V41M1 21H39', '', 'stroke="var(--nf-gll)" stroke-width="2"') + '</g>' +
    '<path id="nf-cloud" d="M0 0h64c9 0 12-12 3-16 1-10-11-15-18-9-4-10-20-11-24-1-8-4-17 2-15 10-8 1-9 16 0 16z"/>' +
    '</defs>';

  /* ---------- the sky ---------- */
  const stars = [[60, 40, 2], [150, 26, 1.6], [236, 60, 2.2], [330, 22, 1.6], [420, 50, 1.8], [500, 18, 2], [588, 46, 1.6], [672, 24, 2.2], [742, 64, 1.8], [380, 96, 1.4], [700, 120, 1.6], [104, 110, 1.4]];
  const sky = rect(0, 0, 800, 500, '', 'fill="url(#nf-sky)"') +
    '<g ' + c('stars') + '>' + stars.map(function (s, i) {
      return '<circle cx="' + s[0] + '" cy="' + s[1] + '" r="' + s[2] + '"' + (i % 3 === 0 ? ' ' + c('tw') : '') + '/>';
    }).join('') + '</g>' +
    '<circle cx="472" cy="74" r="40" ' + c('su') + ' style="opacity:calc(var(--nf-su) * .35)"/><circle cx="472" cy="74" r="27" ' + c('su') + '/>' +
    '<path d="M486 52a26 26 0 1 0 0 46a21 21 0 1 1 0-46z" ' + c('mo') + '/>' +
    '<g ' + c('clouds') + '>' +
      '<g ' + c('c1') + '>' + use('nf-cloud', 354, 76, c('cl')) + '</g>' +
      '<g ' + c('c2') + '>' + use('nf-cloud', 588, 112, c('cl') + ' transform="translate(612 120) scale(.75) translate(-612 -120)"') + '</g>' +
    '</g>' +
    path('M0 268C90 226 170 232 250 250S420 222 520 238 690 214 800 236V350H0Z', 'hl') +
    path('M0 300C120 276 240 290 360 296S600 270 800 286V350H0Z', 'hl2');

  /* ---------- the building: roof, chimney, wall, windows, the sign ---------- */
  let roof = '';
  for (let i = 0; i < 5; i++) {
    const x = 96 + i * 121.6;
    roof += poly([x, 152, x, 108, x + 121.6, 152], c('rf o')) + rect(x + 7, 118, 22, 32, 'lit', 'rx="5"') + rect(x + 9, 120, 18, 28, 'gl', 'rx="3"');
  }
  const chimney = '<g ' + c('sm') + '>' +
      '<circle cx="306" cy="58" r="11" ' + c('puff') + '/><circle cx="306" cy="58" r="9" ' + c('puff p2') + '/><circle cx="306" cy="58" r="12" ' + c('puff p3') + '/></g>' +
    rect(292, 62, 28, 72, 'rf2 o') + rect(288, 58, 36, 12, 'rf o', 'rx="3"') + rect(292, 88, 28, 8, '', 'fill="#F7B53C"');
  const wins = [114, 166, 218, 546, 598, 650].map(function (x) {
    return rect(x - 4, 168, 48, 50, 'lit', 'rx="10"') + use('nf-win', x, 172);
  }).join('');
  const OT = ['#E89B12', 0, 0, '#8A5800'];            // the amber sign: its darker shade carries white text (4.5:1)
  const TILES = [['Th', TH], ['H', HU], ['T', TE], ['O', OT]];
  const sign = rect(268, 172, 264, 56, 'sb o', 'rx="12"') +
    TILES.map(function (t, i) {
      const x = 278 + i * 62;
      return rect(x, 179, 56, 42, '', 'fill="' + t[1][3] + '" rx="8"') + rect(x + 3, 181, 50, 6, '', 'fill="#FFFFFF" opacity=".22" rx="3"') +
        '<text x="' + (x + 28) + '" y="209" ' + c('tx') + '>' + t[0] + '</text>';
    }).join('');
  const building = roof + chimney +
    rect(96, 152, 608, 198, 'wl o') + rect(98, 154, 604, 8, 'wl2') + rect(98, 300, 604, 48, 'wl2') + path('M98 300H702', '', 'stroke="var(--nf-wl3)" stroke-width="2"') +
    wins + sign;

  /* ---------- the floor ---------- */
  const floor = rect(0, 350, 800, 150, 'fl') + path('M0 350H800', 'o') + rect(0, 452, 800, 48, 'fl2') +
    path('M40 404h60M170 404h60M300 404h60M430 404h60M560 404h60M690 404h60', '', 'stroke="var(--nf-fl2)" stroke-width="6" stroke-linecap="round"') +
    '<g ' + c('sh') + '><ellipse cx="195" cy="352" rx="44" ry="6"/><ellipse cx="267" cy="352" rx="36" ry="6"/><ellipse cx="333" cy="363" rx="38" ry="6"/>' +
    '<ellipse cx="412" cy="352" rx="62" ry="7"/><ellipse cx="510" cy="352" rx="30" ry="5"/><ellipse cx="566" cy="352" rx="24" ry="5"/></g>';

  // a small place tag on a crate: the place's dark shade, white letters
  const tag = function (x, y, text, p) {
    return rect(x - 14, y - 9, 28, 18, '', 'fill="' + p[3] + '" rx="5"') + '<text x="' + x + '" y="' + (y + 4.5) + '" ' + c('tg') + '>' + text + '</text>';
  };

  /* ---------- left: a thousand cube on a crate ---------- */
  const F = 44, D = 11, cx = 168, cy = 268;          // the cube's front square: x, y, size F; depth D
  const cube = rect(158, 312, 74, 38, 'wd o', 'rx="4"') + path('M162 324H228M162 338H228', 'wdl') + tag(195, 331, 'Th', TH) +
    poly([cx, cy, cx + D, cy - D, cx + F + D, cy - D, cx + F, cy], col(TH, 1) + ' ' + line(TH, 2)) +
    poly([cx + F, cy, cx + F + D, cy - D, cx + F + D, cy + F - D, cx + F, cy + F], col(TH, 2) + ' ' + line(TH, 2)) +
    rect(cx, cy, F, F, '', col(TH, 0) + ' ' + line(TH, 2.2) + ' rx="1.5"') +
    path(grid(10, cx, cy, F / 10, 0, 0, F) + grid(10, cx, cy, 0, F / 10, F, 0) +
      grid(10, cx, cy, F / 10, 0, D, -D) + grid(10, cx + F, cy, 0, F / 10, D, -D), '', faint(TH));

  /* ---------- a stack of hundreds on a low crate ---------- */
  let flats = rect(236, 328, 62, 22, 'wd o', 'rx="3"') + tag(267, 339, 'H', HU);
  const HX = 240, HW = 44, HD = 8, HT = 6;
  for (let i = 0; i < 5; i++) {
    const y = 328 - i * HT;
    flats += poly([HX + HW, y - HT, HX + HW + HD, y - HT - HD, HX + HW + HD, y - HD, HX + HW, y], col(HU, 2) + ' ' + line(HU, 1.3)) +
      rect(HX, y - HT, HW, HT, '', col(HU, 0) + ' ' + line(HU, 1.4));
  }
  const top = 328 - 5 * HT;
  flats += poly([HX, top, HX + HD, top - HD, HX + HW + HD, top - HD, HX + HW, top], col(HU, 1) + ' ' + line(HU, 1.6)) +
    path(grid(10, HX, top, HW / 10, 0, HD, -HD) + grid(10, HX, top, HD / 10, -HD / 10, HW, 0), '', faint(HU));

  /* ---------- the machine: 10 ones in at the top, 1 ten out at the side ---------- */
  const gear1 = '<g transform="translate(366 268)"><path d="' + gearPath(10, 26, 20) + '" ' + c('mt2 o g1 gear') + '/></g>';
  const gear2 = '<g transform="translate(331 262)"><path d="' + gearPath(6, 15, 11) + '" ' + c('mt o g2 gear') + '/></g>';
  const hubs = '<circle cx="366" cy="268" r="7" ' + c('mc2 o2') + '/><circle cx="331" cy="262" r="4.5" ' + c('mc2 o2') + '/>';
  const tens = rect(300, 346, 66, 14, 'wd o', 'rx="3"') + use('nf-ten', 302, 320) + use('nf-ten', 299, 307) + use('nf-ten', 304, 294) + tag(333, 353, 'T', TE);
  const newTen = use('nf-ten', 368, 281, c('rod'));
  let ones10 = '';
  for (let i = 0; i < 10; i++) ones10 += rect(378 + (i % 5) * 9.4, 291 + Math.floor(i / 5) * 9.4, 8, 8, '', col(ON, 0) + ' ' + line(ON, 1.2) + ' rx="1"');
  const machine =
    rect(360, 272, 104, 78, 'mc o', 'rx="14"') + rect(354, 264, 116, 14, 'mc2 o', 'rx="6"') +
    rect(370, 283, 84, 58, 'mp o2', 'rx="9"') + ones10 +
    path('M427 300h10m-4-4l4 4-4 4', '', 'stroke="var(--nf-ln)" stroke-width="2.4" fill="none"') +
    rect(442, 287, 8, 30, '', col(TE, 0) + ' ' + line(TE, 1.4) + ' rx="1"') + path(grid(10, 442, 287, 0, 3, 8, 0), '', faint(TE)) +
    '<text x="399" y="333" ' + c('dg') + '>10</text><text x="446" y="333" ' + c('dg') + '>1</text>' +
    rect(356, 282, 7, 16, 'bt', 'rx="2"') +
    '<circle cx="388" cy="262" r="15" ' + c('lit glow') + ' style="opacity:.5"/>' +
    path('M377 264a11 11 0 0 1 22 0z', 'o2', 'fill="#FFC43D"');
  // the hopper the ones drop into (drawn over them), on the machine's right shoulder
  const hopperBack = poly([432, 262, 484, 262, 472, 280, 446, 280], c('bt'));
  const hopper = path('M430 260H486L472 280H444Z', 'mc2 o') + rect(426, 256, 64, 8, 'mc o', 'rx="3"');

  /* ---------- the belt, the ones on it, the box of ones it starts from ---------- */
  let rollers = '';
  for (let x = 482; x <= 602; x += 20) rollers += '<circle cx="' + x + '" cy="255" r="3.6" ' + c('mt') + '/>';
  let ticks = '';
  for (let x = 470; x <= 626; x += 12) ticks += 'M' + x + ' 248.5h5';
  let riding = '';
  for (let i = 0; i < 5; i++) riding += use('nf-one', 600, 229, c('one k' + i));
  const belt =
    rect(588, 260, 7, 90, 'mt2 o2') + rect(472, 246, 140, 16, 'bt o', 'rx="8"') + rollers +
    '<clipPath id="nf-bc"><rect x="476" y="246" width="132" height="6"/></clipPath>' +
    '<g clip-path="url(#nf-bc)"><path d="' + ticks + '" ' + c('belt') + ' stroke="#8C7A8A" stroke-width="2"/></g>';
  const feeder = rect(598, 212, 50, 34, 'wd o', 'rx="4"') + path('M602 224H644', 'wdl') + tag(623, 234, 'O', ON) +
    use('nf-one', 602, 196) + use('nf-one', 617, 194) + use('nf-one', 631, 197) + use('nf-one', 610, 182);

  /* ---------- Zip at the control panel, under the belt, waving ---------- */
  const panel = poly([548, 312, 584, 304, 584, 350, 548, 350], c('mt o')) + poly([544, 312, 588, 302, 588, 309, 544, 319], c('mt2 o2')) +
    rect(553, 322, 26, 16, 'scr', 'rx="3"') + '<text x="566" y="335" ' + c('scd') + '>10</text>' +
    '<circle cx="554" cy="310" r="3.2" fill="#E5404A"/><circle cx="566" cy="307.5" r="3.2" fill="#3BB273"/><circle cx="578" cy="304.8" r="3.2" fill="#F7B53C"/>';
  const zip = '<g transform="translate(474 276) scale(.58)">' +
    '<path d="M36 102Q20 106 18 122" fill="none" stroke="#1E5D9F" stroke-width="7" stroke-linecap="round"/>' +
    '<line x1="60" y1="24" x2="60" y2="13" stroke="#0E2B58" stroke-width="4" stroke-linecap="round"/><circle cx="60" cy="11" r="6" fill="#F7B53C" stroke="#B8770E" stroke-width="2.5"/>' +
    '<rect x="9" y="46" width="12" height="22" rx="6" fill="#F7B53C" stroke="#B8770E" stroke-width="2.5"/><rect x="99" y="46" width="12" height="22" rx="6" fill="#F7B53C" stroke="#B8770E" stroke-width="2.5"/>' +
    '<rect x="34" y="92" width="52" height="30" rx="13" fill="#5AB4EE" stroke="#1E5D9F" stroke-width="3"/><circle cx="60" cy="107" r="6" fill="#E5404A"/>' +
    '<rect x="17" y="22" width="86" height="68" rx="24" fill="#1D4F9C" stroke="#0E2B58" stroke-width="3"/>' +
    '<rect x="27" y="33" width="66" height="46" rx="16" fill="#EAF6FF"/>' +
    '<ellipse cx="46" cy="52" rx="6" ry="7.5" fill="#0E2B58"/><ellipse cx="74" cy="52" rx="6" ry="7.5" fill="#0E2B58"/>' +
    '<circle cx="48" cy="49" r="2" fill="#FFFFFF"/><circle cx="76" cy="49" r="2" fill="#FFFFFF"/>' +
    '<circle cx="36" cy="66" r="4.5" fill="#FF9AA2"/><circle cx="84" cy="66" r="4.5" fill="#FF9AA2"/>' +
    '<path d="M47 63Q60 74 73 63" fill="none" stroke="#0E2B58" stroke-width="3" stroke-linecap="round"/>' +
    '<g ' + c('arm') + '><path d="M84 100Q107 103 114 75" fill="none" stroke="#1E5D9F" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="114" cy="72" r="6.5" fill="#5AB4EE" stroke="#1E5D9F" stroke-width="3"/></g></g>';

  /* ---------- in front: a place value mat on the floor with 1 thousand, 2 hundreds, 3 tens and 4 ones ---------- */
  const MAT = [TH, HU, TE, ON];
  let rug = poly([246, 392, 554, 392, 578, 446, 222, 446], c('o2') + ' style="fill:var(--nf-rg)"');
  for (let i = 0; i < 4; i++) {
    const a = 252 + i * 75, b = 230 + i * 85;
    rug += poly([a, 397, a + 71, 397, b + 81, 441, b, 441], 'fill="' + MAT[i][0] + '" opacity=".55"');
  }
  rug += rect(262, 406, 24, 24, '', col(TH, 0) + ' ' + line(TH, 1.4) + ' rx="1"') + poly([262, 406, 268, 400, 292, 400, 286, 406], col(TH, 1) + ' ' + line(TH, 1.4)) +
    poly([286, 406, 292, 400, 292, 424, 286, 430], col(TH, 2) + ' ' + line(TH, 1.4)) +
    poly([316, 432, 325, 414, 351, 414, 342, 432], col(HU, 0) + ' ' + line(HU, 1.4)) + poly([350, 432, 359, 414, 385, 414, 376, 432], col(HU, 0) + ' ' + line(HU, 1.4)) +
    use('nf-ten', 408, 408) + use('nf-ten', 404, 420) + use('nf-ten', 400, 432, 'transform="translate(0 -1)"') +
    use('nf-one', 498, 408) + use('nf-one', 518, 408) + use('nf-one', 500, 425) + use('nf-one', 520, 425);
  const loose = use('nf-one', 612, 386, 'transform="rotate(-8 622 396)"');

  const label = 'The Number Factory: a machine packs 10 ones into 1 ten. A thousand cube, a stack of hundreds, ' +
    'tens and ones in their colours, under a big Th H T O sign. Zip waves from the control panel.';

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="art" data-art="' + ID +
    '" data-view="0 0 800 500" data-safe="150,150,500,210" data-band="222,334" role="img" aria-label="' + label +
    '" fill="none" stroke-linejoin="round" stroke-linecap="round"><style>' + css + '</style>' + defs +
    '<g data-layer="sky">' + sky + '</g>' +
    '<g data-layer="building">' + building + '</g>' +
    '<g data-layer="floor">' + floor + '</g>' +
    '<g data-layer="things">' + cube + flats + gear1 + gear2 + hubs + newTen + '<g data-heart="machine">' + machine + '</g>' + tens + hopperBack + riding + hopper + belt + feeder + panel + zip + rug + loose + '</g>' +
    '</svg>';

  window.T_ART = window.T_ART || {};
  window.T_ART[ID] = svg;
})();
