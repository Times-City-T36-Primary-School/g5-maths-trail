/* 08-art-world-4.js - the Market Square, the world scene of Stop 4 (window.T_ART['world-market-square']).

   The hub header of Stop 4 (35-hub.js buildScene), drawn with the recipe of every world scene (docs/02-architecture.md):
     viewBox 0 0 800 500, preserveAspectRatio xMidYMid slice, data-view, data-safe (x, y, w, h: what must show at every
     size) and data-band (top, bottom: the heart, clear of the floating buttons and the sheet). The heart's main part,
     the level balance scale (15 + 25 on one pan, 40 on the other), carries data-heart (test/scene.mjs checks it stays
     clear of the buttons).
     Layers, back to front: sky (sun or moon, stars, clouds), far (a row of old shophouses with shutters and balconies, and
     strings of lanterns across the square), floor (the stone square), things: a fruit stall with a striped awning and a
     chalk price board "25 + 18 = 43" (adding prices), Zip at the till; in the middle a balance scale, level, with 15 and
     25 on one pan and 40 on the other (both sides are equal, a missing number); baskets of oranges, ten in each basket,
     and 4 more (34 = 3 tens and 4 ones, regrouping); a dragon fruit stall; a stack of conical hats on a crate.
     Maths meaning: adding (the price board and the till), equal sides (the balance), tens and ones (the baskets).
     Palette: CSS variables on .art (--ms-*), redefined by the class world-market-square-night (the dark theme):
       a dark sky with stars and the moon, the lanterns glow, the windows are lit.
     Motion: only under .art.is-live (35-hub.js adds it when motion is allowed), transform and opacity only, slow loops:
       the clouds drift, the lanterns sway, the stars twinkle, Zip bobs. Still under reduced motion and on the lowest
       effects tier (html[data-fx="1"]).
   Class names start with the id, so many copies on one page never clash; ids are renamed per copy by T.ui.art. */
(function () {
  'use strict';

  const ID = 'world-market-square';
  const c = function (name) { return 'class="' + ID + '-' + name.split(' ').join(' ' + ID + '-') + '"'; };
  const r1 = function (v) { return Math.round(v * 10) / 10; };

  /* ---------- palette: day, then night ---------- */
  const DAY = {
    sk1: '#D9CCF7', sk2: '#FFF1E2', b1: '#F6D98A', b2: '#E6D3F5', b3: '#F4C2C9', bl: '#7A5A3A', rf: '#B4553C', rf2: '#94422E',
    sh: '#3E9A6B', win: '#FFFFFF', fl: '#E9DCC8', fl2: '#DCCBB2', tl: '#C7B392', aw: '#7B5BD6', aw2: '#FFFFFF', awl: '#3F2A86',
    wd: '#C98E52', wd2: '#A8703C', wdl: '#6E4320', cld: '#FFFFFF', str: '#7A5A3A',
    glow: '0', su: '1', mo: '0', sr: '0', cso: '.9'
  };
  const NIGHT = {
    sk1: '#140F2E', sk2: '#3A2C5E', b1: '#6E5A3A', b2: '#4E4268', b3: '#644049', bl: '#2C2012', rf: '#5A2A1E', rf2: '#46201A',
    sh: '#1E5A3E', win: '#FFD872', fl: '#4A4152', fl2: '#3F374A', tl: '#2E2838', aw: '#4E3A96', aw2: '#C9C2DC', awl: '#1E1448',
    wd: '#7A5838', wd2: '#5E4229', wdl: '#2C1C0E', cld: '#4A4E78', str: '#B8A88E',
    glow: '1', su: '0', mo: '1', sr: '1', cso: '.45'
  };
  const vars = function (p) { return Object.keys(p).map(function (k) { return '--ms-' + k + ':' + p[k]; }).join(';'); };
  const fill = function (names) { return names.map(function (n) { return '.' + ID + '-' + n + '{fill:var(--ms-' + n + ')}'; }).join(''); };

  const S = '.' + ID + '-';
  const live = '.art.is-live ' + S;
  const FONT = 'var(--font-display,Arial,Helvetica,sans-serif)';
  const css =
    '.art{' + vars(DAY) + '}.art.' + ID + '-night{' + vars(NIGHT) + '}' +
    fill(['b1', 'b2', 'b3', 'rf', 'rf2', 'sh', 'win', 'fl', 'fl2', 'aw', 'aw2', 'wd', 'wd2', 'cld']) +
    S + 'o{stroke:var(--ms-bl);stroke-width:2.5}' + S + 'ow{stroke:var(--ms-wdl);stroke-width:2.4}' + S + 'oa{stroke:var(--ms-awl);stroke-width:2.4}' +
    S + 'tl{stroke:var(--ms-tl);stroke-width:2;fill:none}' + S + 'str{stroke:var(--ms-str);stroke-width:2;fill:none}' +
    S + 'su{fill:#FFE08A;opacity:var(--ms-su)}' + S + 'sun-ray{stroke:#FFD05A;stroke-width:5;opacity:var(--ms-su)}' +
    S + 'mo{fill:#FFF4CF;opacity:var(--ms-mo)}' + S + 'stars{fill:#FFF4CF;opacity:var(--ms-sr)}' +
    S + 'clouds{opacity:var(--ms-cso)}' + S + 'glow{opacity:var(--ms-glow)}' +
    S + 'chalk{fill:#FFFFFF;font:800 19px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'n{fill:#10305E;font:800 15px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'ns{fill:#FFFFFF;font:800 12px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'nt{fill:#10305E;font:800 17px/1 ' + FONT + ';text-anchor:middle}' +
    // what moves: each part turns or slides around its own box
    S + 'lan{transform-box:fill-box;transform-origin:50% 0}' + S + 'zip{transform-box:fill-box;transform-origin:50% 100%}' +
    live + 'cloud-a{animation:' + ID + '-drift 30s ease-in-out infinite alternate}' +
    live + 'cloud-b{animation:' + ID + '-drift 38s ease-in-out -12s infinite alternate-reverse}' +
    live + 'lan{animation:' + ID + '-sway 4.8s ease-in-out infinite alternate}' +
    live + 'lan-b{animation-delay:-2.4s}' +
    live + 'zip{animation:' + ID + '-bob 3.2s ease-in-out infinite alternate}' +
    live + 'stars{animation:' + ID + '-tw 3.4s ease-in-out infinite alternate}' +
    '@keyframes ' + ID + '-drift{0%{transform:translateX(-12px)}100%{transform:translateX(14px)}}' +
    '@keyframes ' + ID + '-sway{0%{transform:rotate(-4deg)}100%{transform:rotate(4deg)}}' +
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
    '<linearGradient id="ms-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ms-sk1)"/><stop offset="1" style="stop-color:var(--ms-sk2)"/></linearGradient>' +
    '<path id="ms-cloud" d="M0 0h70c10 0 13-13 3-17 1-11-12-16-19-10-5-11-22-12-26-1-9-4-18 2-16 11-9 1-10 17 0 17z"/>' +
    // a window with green shutters (lit at night)
    '<g id="ms-win"><rect x="0" y="0" width="20" height="28" rx="9" class="' + ID + '-win"/><rect x="-8" y="0" width="8" height="28" class="' + ID + '-sh"/><rect x="20" y="0" width="8" height="28" class="' + ID + '-sh"/></g>' +
    // a lantern on its string
    '<g id="ms-lan"><path d="M0 0v8" stroke="#7A5A3A" stroke-width="2"/><rect x="-5" y="7" width="10" height="4" rx="1" fill="#6E4320"/>' +
    '<ellipse cx="0" cy="21" rx="9" ry="11"/><rect x="-5" y="31" width="10" height="4" rx="1" fill="#6E4320"/><path d="M0 35v6" stroke="#A66A06" stroke-width="2"/></g>' +
    // an orange and a mango
    '<circle id="ms-or" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/>' +
    '<ellipse id="ms-mg" rx="10" ry="7" fill="#F7C33C" stroke="#B4820E" stroke-width="1.8"/>' +
    // a dragon fruit
    '<g id="ms-df"><ellipse cx="0" cy="0" rx="10" ry="12" fill="#E4407A" stroke="#9A1F4C" stroke-width="1.8"/><path d="M-6-8l-6-6M6-8l6-6M0-11v-7M-9 2l-7 1M9 2l7 1" stroke="#4AA35A" stroke-width="3"/></g>' +
    // a basket of ten oranges (5 and 5), the tag says 10
    '<g id="ms-bk"><circle cx="-14" cy="-6" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/><circle cx="-7" cy="-6" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/>' +
    '<circle cx="0" cy="-6" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/><circle cx="7" cy="-6" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/><circle cx="14" cy="-6" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/>' +
    '<circle cx="-10.5" cy="-14" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/><circle cx="-3.5" cy="-14" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/><circle cx="3.5" cy="-14" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/><circle cx="10.5" cy="-14" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/><circle cx="0" cy="-20" r="5.5" fill="#F59E2A" stroke="#B4650E" stroke-width="1.6"/>' +
    '<path d="M-22-2h44l-6 28h-32z" fill="#D9A55E" stroke="#6E4320" stroke-width="2.4"/><path d="M-20 8h40M-18 17h36" stroke="#A8703C" stroke-width="2"/>' +
    '<rect x="-11" y="3" width="22" height="16" rx="4" fill="#FFFFFF" stroke="#6E4320" stroke-width="1.6"/><text x="0" y="16" class="' + ID + '-nb">10</text></g>' +
    // a conical hat (non la)
    '<path id="ms-hat" d="M-26 0L0-22 26 0q-26 7-52 0z" fill="#F3E3B5" stroke="#9A7A3A" stroke-width="2"/>' +
    '</defs>';

  /* ---------- sky: the sun or the moon, stars, clouds ---------- */
  let rays = '';
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    rays += 'M' + r1(120 + Math.cos(a) * 44) + ' ' + r1(70 + Math.sin(a) * 44) + 'L' + r1(120 + Math.cos(a) * 58) + ' ' + r1(70 + Math.sin(a) * 58);
  }
  let stars = '';
  [[48, 30], [210, 52], [300, 22], [384, 60], [470, 26], [552, 66], [640, 30], [732, 54], [774, 118], [30, 120], [600, 112], [700, 150]].forEach(function (p, i) {
    stars += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i % 3 ? 1.6 : 2.4) + '"/>';
  });
  const sky = rect(0, 0, 800, 500, '', 'fill="url(#ms-sky)"') +
    '<g ' + c('stars') + '>' + stars + '</g>' +
    path(rays, 'sun-ray') + '<circle cx="120" cy="70" r="32" ' + c('su') + '/>' +
    '<path d="M134 46a28 28 0 1 0 8 46 24 24 0 1 1-8-46z" ' + c('mo') + '/>' +
    '<g ' + c('clouds') + '><g ' + c('cloud-a') + '>' + use('ms-cloud', 520, 60, c('cld')) + '</g>' +
    '<g ' + c('cloud-b') + '>' + use('ms-cloud', 286, 40, c('cld') + ' transform="translate(286 40) scale(.75) translate(-286 -40)"') + '</g></g>';

  /* ---------- far: a row of old shophouses, with lanterns strung across the square ---------- */
  const FLOOR = 330;
  const house = function (x, w, h, k) {
    const top = FLOOR - h;
    let s = rect(x, top, w, h, k, c('o')) + path('M' + (x - 6) + ' ' + top + 'L' + (x + 10) + ' ' + (top - 22) + 'H' + (x + w - 10) + 'L' + (x + w + 6) + ' ' + top + 'Z', 'rf', c('o')) +
      path('M' + (x + 14) + ' ' + (top - 11) + 'H' + (x + w - 14), '', 'stroke="var(--ms-rf2)" stroke-width="3"');
    const cols = [x + w * 0.3 - 10, x + w * 0.7 - 10];
    [top + 22, top + 82].forEach(function (y, row) {
      if (y + 30 > FLOOR - 66) return;
      cols.forEach(function (cx) { s += use('ms-win', cx, y); });
      if (row === 0) s += path('M' + (x + 8) + ' ' + (y + 36) + 'H' + (x + w - 8), '', 'stroke="var(--ms-bl)" stroke-width="3"');
    });
    // a door with a dark opening at the bottom
    s += rect(x + w / 2 - 16, FLOOR - 52, 32, 52, 'rf2', 'rx="3"');
    return s;
  };
  const far = house(-20, 150, 196, 'b1') + house(130, 124, 160, 'b2') + house(254, 150, 206, 'b3') + house(404, 140, 178, 'b1') +
    house(544, 132, 200, 'b2') + house(676, 150, 168, 'b3');
  // two strings of lanterns across the square, sagging between the houses
  const Q = function (x0, y0, xc, yc, x1, y1, t) { const u = 1 - t; return [u * u * x0 + 2 * u * t * xc + t * t * x1, u * u * y0 + 2 * u * t * yc + t * t * y1]; };
  const LANC = ['#E5404A', '#F7B23B', '#8A6CE0'];
  let lans = '', glow = '';
  [[0, 92, 200, 160, 400, 104], [400, 104, 600, 160, 800, 92]].forEach(function (sg, si) {
    lans += path('M' + sg[0] + ' ' + sg[1] + 'Q' + sg[2] + ' ' + sg[3] + ' ' + sg[4] + ' ' + sg[5], 'str');
    [0.14, 0.32, 0.5, 0.68, 0.86].forEach(function (t, i) {
      const p = Q(sg[0], sg[1], sg[2], sg[3], sg[4], sg[5], t), k = (i + si) % 3;
      lans += '<g ' + c('lan' + (i % 2 ? ' lan-b' : '')) + '>' + use('ms-lan', p[0], p[1], 'fill="' + LANC[k] + '" stroke="#6E4320" stroke-width="1.6"') + '</g>';
      glow += '<circle cx="' + r1(p[0]) + '" cy="' + r1(p[1] + 21) + '" r="18" fill="#FFE38A" opacity=".5"/>';
    });
  });

  /* ---------- floor: the stone square ---------- */
  let tiles = '';
  [356, 388, 428, 474].forEach(function (y) { tiles += 'M0 ' + y + 'H800'; });
  for (let x = -40; x <= 840; x += 80) tiles += 'M' + x + ' 330L' + r1(400 + (x - 400) * 1.5) + ' 500';
  const floor = rect(0, FLOOR, 800, 170, 'fl') + path('M0 ' + FLOOR + 'H800', '', 'stroke="var(--ms-tl)" stroke-width="3"') + path(tiles, 'tl');

  /* ---------- things ---------- */
  // a market stall: a striped awning, two posts and a wooden counter
  const stall = function (x, w, top) {
    let s = rect(x + 6, top, 6, FLOOR + 50 - top, 'wd2', c('ow')) + rect(x + w - 12, top, 6, FLOOR + 50 - top, 'wd2', c('ow'));
    const n = 6, sw = w / n;
    for (let i = 0; i < n; i++) s += path('M' + r1(x + i * sw) + ' ' + top + 'h' + r1(sw) + 'v26a' + r1(sw / 2) + ' 9 0 0 1-' + r1(sw) + ' 0z', i % 2 ? 'aw2' : 'aw', c('oa'));
    s += rect(x - 4, top - 8, w + 8, 10, 'aw', 'rx="4" ' + c('oa'));
    s += rect(x, FLOOR + 2, w, 50, 'wd', c('ow') + ' rx="4"') + path('M' + (x + 4) + ' ' + (FLOOR + 18) + 'H' + (x + w - 4) + 'M' + (x + 4) + ' ' + (FLOOR + 34) + 'H' + (x + w - 4), '', 'stroke="var(--ms-wd2)" stroke-width="2"');
    return s;
  };
  // the fruit stall on the left: mangoes and a chalk price board 25 + 18 = 43
  let fruit = '';
  [[56, 0], [78, 0], [100, 0], [67, -11], [89, -11], [146, 0], [168, 0], [190, 0], [157, -11], [179, -11]].forEach(function (p) { fruit += use('ms-mg', p[0], FLOOR - 6 + p[1]); });
  const left = stall(30, 200, 222) + fruit +
    // the chalk price board on its stand, over Zip and the till (inside x 200 to 600, so it shows at every size)
    path('M224 284V' + FLOOR + 'M334 284V' + FLOOR, '', c('ow') + ' stroke-width="4"') +
    rect(214, 252, 130, 36, '', 'rx="6" fill="#2F5D4A" stroke="#6E4320" stroke-width="3"') + text(279, 277, '25 + 18 = 43', 'chalk');
  // the dragon fruit stall on the right
  let dfs = '';
  [628, 652, 676, 700, 724, 748, 640, 664, 688, 712, 736].forEach(function (x, i) { dfs += use('ms-df', x, FLOOR - (i > 5 ? 22 : 8)); });
  const right = stall(606, 170, 226) + dfs;

  // Zip at the till, between the fruit stall and the scale
  const zip = '<g ' + c('zip') + '><g transform="translate(232 322) scale(.4)">' +
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
    '<path d="M47 63Q60 74 73 63" fill="none" stroke="#0E2B58" stroke-width="3" stroke-linecap="round"/></g></g>';
  // the till: a box with a little screen showing the total, 43
  const till = rect(290, FLOOR + 26, 42, 30, 'wd', c('ow') + ' rx="4"') + rect(294, FLOOR + 4, 34, 24, '', 'rx="4" fill="#10305E" stroke="#6E4320" stroke-width="2.4"') +
    '<text x="311" y="' + (FLOOR + 22) + '" class="' + ID + '-ns" style="fill:#7CF0B0">43</text>' + rect(274, FLOOR + 54, 72, 30, 'wd2', c('ow') + ' rx="3"');

  // the heart: a level balance scale, 15 + 25 on the left pan and 40 on the right, and an = sign on its post
  const PX = 440, PY = 314;
  const block = function (x, y, w, t) { return rect(x, y, w, 24, '', 'rx="5" fill="#FFFFFF" stroke="#10305E" stroke-width="2.2"') + text(x + w / 2, y + 18, t, 'n'); };
  const scale = '<g>' +
    rect(PX - 76, PY - 5, 152, 10, '', 'rx="5" fill="#6E52C8" stroke="#3F2A86" stroke-width="2.4"') +
    path('M' + (PX - 68) + ' ' + PY + 'L' + (PX - 94) + ' 352M' + (PX - 68) + ' ' + PY + 'L' + (PX - 42) + ' 352M' + (PX + 68) + ' ' + PY + 'L' + (PX + 42) + ' 352M' + (PX + 68) + ' ' + PY + 'L' + (PX + 94) + ' 352', '', 'stroke="#5C6472" stroke-width="2"') +
    block(PX - 96, 327, 26, '15') + block(PX - 66, 327, 26, '25') + block(PX + 52, 327, 32, '40') +
    path('M' + (PX - 100) + ' 352h64l-8 9h-48zM' + (PX + 36) + ' 352h64l-8 9h-48z', '', 'fill="#DCD2F7" stroke="#3F2A86" stroke-width="2.4"') +
    // the heart (data-heart): the middle of the scale: its post, the pin and the = sign (on a phone it slides between the buttons)
    path('M' + (PX - 40) + ' 404h80l-8-12h-64z', '', 'fill="#8A6CE0" stroke="#3F2A86" stroke-width="2.4"') +
    '<g data-heart="balance">' +
    rect(PX - 5, PY + 5, 10, 76, '', 'rx="4" fill="#B9A6EE" stroke="#3F2A86" stroke-width="2.4"') +
    '<circle cx="' + PX + '" cy="' + PY + '" r="7" fill="#F5A623" stroke="#A66A06" stroke-width="2.4"/>' +
    '<circle cx="' + PX + '" cy="' + (PY + 34) + '" r="13" fill="#1E9E6A" stroke="#FFFFFF" stroke-width="2.5"/>' +
    path('M' + (PX - 6) + ' ' + (PY + 31) + 'h12M' + (PX - 6) + ' ' + (PY + 37) + 'h12', '', 'stroke="#FFFFFF" stroke-width="3"') +
    '</g></g>';

  // baskets of ten oranges and 4 more, with a board: 34
  let loose = '';
  [[692, 398], [704, 398], [698, 388], [710, 388]].forEach(function (p) { loose += use('ms-or', p[0], p[1]); });
  const baskets = use('ms-bk', 562, 380) + use('ms-bk', 610, 380) + use('ms-bk', 658, 380) + loose +
    rect(728, 352, 4, 44, 'wd2') + rect(710, 330, 40, 26, '', 'rx="6" fill="#FFFFFF" stroke="#6E4320" stroke-width="2.4"') + text(730, 349, '34', 'nt');
  // a crate with a stack of conical hats, in front of the dragon fruit stall
  const hats = rect(742, 430, 56, 34, 'wd', c('ow') + ' rx="3"') + path('M746 446H794', '', 'stroke="var(--ms-wd2)" stroke-width="2"') +
    use('ms-hat', 770, 430) + use('ms-hat', 770, 422);

  const things = left + right + till + zip + scale + baskets + hats;

  const label = 'The Market Square: shophouses with green shutters around a stone square, with lanterns strung across. A fruit stall ' +
    'has a chalk board: 25 + 18 = 43, and the till shows 43. In the middle, a balance scale is level: 15 and 25 on one pan, 40 on the other. ' +
    'Three baskets hold ten oranges each, and 4 more lie beside them: 34. Zip stands at the till.';

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="art" data-art="' + ID +
    '" data-view="0 0 800 500" data-safe="150,200,520,220" data-band="300,396" role="img" aria-label="' + label +
    '" fill="none" stroke-linejoin="round" stroke-linecap="round"><style>' + css + S + 'nb{fill:#10305E;font:800 12px/1 ' + FONT + ';text-anchor:middle}</style>' + defs +
    '<g data-layer="sky">' + sky + '</g>' +
    '<g data-layer="building">' + far + '<g ' + c('glow') + '>' + glow + '</g>' + lans + '</g>' +
    '<g data-layer="floor">' + floor + '</g>' +
    '<g data-layer="things">' + things + '</g>' +
    '</svg>';

  window.T_ART = window.T_ART || {};
  window.T_ART[ID] = svg;
})();
