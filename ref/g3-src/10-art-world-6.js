/* 10-art-world-6.js - the Sharing Harbour, the world scene of Stop 6 (window.T_ART['world-sharing-harbour']).

   The hub header of Stop 6 (35-hub.js buildScene), drawn with the recipe of every world scene (docs/02-architecture.md):
     viewBox 0 0 800 500, preserveAspectRatio xMidYMid slice, data-view, data-safe (x, y, w, h: what must show at every
     size) and data-band (top, bottom: the heart, clear of the floating buttons and the sheet). The heart's main part,
     the sign "13 ÷ 3 = 4 r 1" over the three equal crates of fish and the middle crate, carries data-heart
     (test/scene.mjs checks it stays clear of the buttons).
     Layers, back to front: sky (sun or moon, stars, clouds, gulls), far (the sea to the horizon, a green island with a
     lighthouse, a far hill), floor (the sea with rows of waves, the wooden pier on its posts), things: a fishing boat by
     the pier with a ÷ on its sail and two crates on board; on the pier 3 crates with 4 fish each and 1 gold fish left
     over in a bucket (13 shared into 3 crates: 4 each, remainder 1), the sign; a crane lifting a pallet of 2 rows of 3
     sacks (an array, 2 × 3); a hut with a lamp; Zip waving.
     Maths meaning: sharing equally (the crates), the remainder (the gold fish in the bucket), equal groups and an
     array (the crane's load), multiplying and dividing (the sail and the sign).
     Palette: CSS variables on .art (--sh-*), redefined by the class world-sharing-harbour-night (the dark theme): a dark
     sky with stars and the moon, the lighthouse and the hut's window are lit.
     Motion: only under .art.is-live (35-hub.js adds it when motion is allowed), transform and opacity only, slow loops:
       the clouds drift, the waves roll, the boat bobs, the crane's load sways, the stars twinkle, Zip bobs. Still under
       reduced motion and on the lowest effects tier (html[data-fx="1"]).
   Class names start with the id, so many copies on one page never clash; ids are renamed per copy by T.ui.art. */
(function () {
  'use strict';

  const ID = 'world-sharing-harbour';
  const c = function (name) { return 'class="' + ID + '-' + name.split(' ').join(' ' + ID + '-') + '"'; };
  const r1 = function (v) { return Math.round(v * 10) / 10; };

  /* ---------- palette: day, then night ---------- */
  const DAY = {
    sk1: '#9FD3F5', sk2: '#E9F6FF', sea: '#4D9FE0', sea2: '#2F7FD4', far: '#7FB8EA', isl: '#8CCB9C', isl2: '#6FB683', wv: '#FFFFFF',
    wd: '#C98E52', wd2: '#A8743F', wdl: '#6E4320', cr: '#E2B07A', hut: '#F4F1E8', hutr: '#D9534F', win: '#BFE6F5', ln: '#2A3A4A',
    cld: '#FFFFFF', boat: '#E5533D', boat2: '#B83A28', sail: '#FFFFFF', lh: '#FFFFFF', lhs: '#E5404A',
    su: '1', mo: '0', sr: '0', cso: '.95', glow: '0', wvo: '.55'
  };
  const NIGHT = {
    sk1: '#0B1A33', sk2: '#1E3A5E', sea: '#123A66', sea2: '#0D2C50', far: '#1F4A78', isl: '#24503F', isl2: '#1C4234', wv: '#9CC4EE',
    wd: '#7A5634', wd2: '#634329', wdl: '#3A2614', cr: '#9C7650', hut: '#5C6670', hutr: '#8E3A36', win: '#FFD872', ln: '#101820',
    cld: '#3E5870', boat: '#A8402E', boat2: '#7E2C1F', sail: '#C9D3DE', lh: '#C9D3DE', lhs: '#A8343A',
    su: '0', mo: '1', sr: '1', cso: '.45', glow: '1', wvo: '.45'
  };
  const vars = function (p) { return Object.keys(p).map(function (k) { return '--sh-' + k + ':' + p[k]; }).join(';'); };
  const fill = function (names) { return names.map(function (n) { return '.' + ID + '-' + n + '{fill:var(--sh-' + n + ')}'; }).join(''); };

  const S = '.' + ID + '-';
  const live = '.art.is-live ' + S;
  const FONT = 'var(--font-display,Arial,Helvetica,sans-serif)';
  const css =
    '.art{' + vars(DAY) + '}.art.' + ID + '-night{' + vars(NIGHT) + '}' +
    fill(['sea', 'sea2', 'far', 'isl', 'isl2', 'wd', 'wd2', 'cr', 'hut', 'hutr', 'win', 'cld', 'boat', 'boat2', 'sail', 'lh', 'lhs']) +
    S + 'o{stroke:var(--sh-ln);stroke-width:2.5}' + S + 'wl{stroke:var(--sh-wdl);stroke-width:2.5}' +
    S + 'pk{stroke:var(--sh-wd2);stroke-width:2;fill:none}' +
    S + 'wv{stroke:var(--sh-wv);stroke-width:3;fill:none;opacity:var(--sh-wvo)}' +
    S + 'gull{stroke:#2A3A4A;stroke-width:3;fill:none}' +
    S + 'su{fill:#FFE08A;opacity:var(--sh-su)}' + S + 'sun-ray{stroke:#FFD05A;stroke-width:5;opacity:var(--sh-su)}' +
    S + 'mo{fill:#FFF4CF;opacity:var(--sh-mo)}' + S + 'stars{fill:#FFF4CF;opacity:var(--sh-sr)}' +
    S + 'clouds{opacity:var(--sh-cso)}' + S + 'glow{opacity:var(--sh-glow)}' +
    S + 'fish{fill:#4F9BE8;stroke:#174C8A;stroke-width:1.6}' + S + 'gold{fill:#F5A623;stroke:#A86A00;stroke-width:1.8}' +
    S + 'sg{fill:#FFFFFF;font:800 16px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'sl{fill:#1F5CA0;font:800 30px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'tg{fill:#3A2600;font:800 13px/1 ' + FONT + ';text-anchor:middle}' +
    // what moves: each part turns or slides around its own box
    S + 'boat-b{transform-box:fill-box;transform-origin:50% 90%}' + S + 'load{transform-box:view-box;transform-origin:540px 150px}' +
    S + 'zip{transform-box:fill-box;transform-origin:50% 100%}' +
    live + 'cloud-a{animation:' + ID + '-drift 30s ease-in-out infinite alternate}' +
    live + 'cloud-b{animation:' + ID + '-drift 38s ease-in-out -12s infinite alternate-reverse}' +
    live + 'waves{animation:' + ID + '-roll 7s ease-in-out infinite alternate}' +
    live + 'boat-b{animation:' + ID + '-bob 3.6s ease-in-out infinite alternate}' +
    live + 'load{animation:' + ID + '-sway 4.4s ease-in-out infinite alternate}' +
    live + 'zip{animation:' + ID + '-hop 3.2s ease-in-out infinite alternate}' +
    live + 'stars{animation:' + ID + '-tw 3.4s ease-in-out infinite alternate}' +
    '@keyframes ' + ID + '-drift{0%{transform:translateX(-12px)}100%{transform:translateX(14px)}}' +
    '@keyframes ' + ID + '-roll{0%{transform:translateX(-10px)}100%{transform:translateX(10px)}}' +
    '@keyframes ' + ID + '-bob{0%{transform:translateY(0) rotate(-1.5deg)}100%{transform:translateY(-4px) rotate(1.5deg)}}' +
    '@keyframes ' + ID + '-sway{0%{transform:rotate(-2deg)}100%{transform:rotate(2deg)}}' +
    '@keyframes ' + ID + '-hop{0%{transform:translateY(0)}100%{transform:translateY(-4px)}}' +
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
    '<linearGradient id="sh-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--sh-sk1)"/><stop offset="1" style="stop-color:var(--sh-sk2)"/></linearGradient>' +
    '<path id="sh-cloud" d="M0 0h70c10 0 13-13 3-17 1-11-12-16-19-10-5-11-22-12-26-1-9-4-18 2-16 11-9 1-10 17 0 17z"/>' +
    // a row of waves, 200 units long
    '<path id="sh-wave" d="M0 0q12-8 25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0"/>' +
    // a fish, about 20 units long, its middle at 0 0
    '<g id="sh-fish"><path d="M-10 0q8-9 17 0q-9 9-17 0z"/><path d="M6 0l7-6v12z"/></g>' +
    // a crate (48 x 40) with planks, its top left at 0 0
    '<rect id="sh-cback" width="48" height="40" rx="4" class="' + ID + '-wd2 ' + ID + '-wl"/>' +
    '<g id="sh-cfront"><rect width="48" height="20" rx="3" class="' + ID + '-cr ' + ID + '-wl"/><path d="M0 10h48" class="' + ID + '-pk"/></g>' +
    // a sack on the crane's pallet
    '<rect id="sh-sack" width="18" height="16" rx="5" fill="#E8D3A8" stroke="#8A6A3A" stroke-width="2"/>' +
    '</defs>';

  /* ---------- sky: the sun or the moon, stars, clouds, gulls ---------- */
  let rays = '';
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    rays += 'M' + r1(690 + Math.cos(a) * 44) + ' ' + r1(78 + Math.sin(a) * 44) + 'L' + r1(690 + Math.cos(a) * 58) + ' ' + r1(78 + Math.sin(a) * 58);
  }
  let stars = '';
  [[44, 34], [196, 56], [292, 24], [372, 62], [470, 30], [560, 74], [612, 30], [760, 140], [26, 130], [520, 120], [140, 170], [236, 128]].forEach(function (p, i) {
    stars += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i % 3 ? 1.6 : 2.4) + '"/>';
  });
  const sky = rect(0, 0, 800, 500, '', 'fill="url(#sh-sky)"') +
    '<g ' + c('stars') + '>' + stars + '</g>' +
    path(rays, 'sun-ray') + '<circle cx="690" cy="78" r="32" ' + c('su') + '/>' +
    '<path d="M704 54a28 28 0 1 0 8 46 24 24 0 1 1-8-46z" ' + c('mo') + '/>' +
    '<g ' + c('clouds') + '><g ' + c('cloud-a') + '>' + use('sh-cloud', 150, 70, c('cld')) + '</g>' +
    '<g ' + c('cloud-b') + '>' + use('sh-cloud', 470, 50, c('cld') + ' transform="translate(470 50) scale(.75) translate(-470 -50)"') + '</g></g>' +
    path('M300 120q8-8 16 0q8-8 16 0M350 150q6-6 12 0q6-6 12 0M250 166q6-6 12 0q6-6 12 0', 'gull');

  /* ---------- far: the sea to the horizon, an island with a lighthouse, a far hill ---------- */
  const HZ = 296, PIER = 392;
  const far = rect(0, HZ, 800, 204, 'far') +
    path('M560 ' + HZ + 'q70-52 150-30q50 14 90 4V' + HZ + 'Z', 'isl2') +
    path('M392 ' + HZ + 'q50-40 120-34q44 4 80 34Z', 'isl') +
    // the lighthouse on the island, red and white rings, a lamp that glows at night
    path('M458 ' + (HZ - 26) + 'l6-74h20l6 74z', 'lh', c('o')) + path('M461 ' + (HZ - 52) + 'h26l1 12h-28zM463 ' + (HZ - 78) + 'h22l1 12h-24z', 'lhs') +
    rect(460, HZ - 112, 28, 14, 'win', 'rx="3" ' + c('o')) + path('M456 ' + (HZ - 112) + 'h36l-18-14z', 'lhs', c('o')) +
    '<g ' + c('glow') + '><circle cx="474" cy="' + (HZ - 105) + '" r="26" fill="#FFE38A" opacity=".45"/><path d="M488 ' + (HZ - 110) + 'l110-22v22z" fill="#FFE38A" opacity=".25"/></g>';

  /* ---------- floor: the sea with rows of waves, the pier on its posts ---------- */
  let waves = '';
  [[326, 0], [368, -60], [452, 30], [484, -40]].forEach(function (w) {
    for (let x = w[1] - 40; x < 820; x += 200) waves += use('sh-wave', x, w[0], c('wv'));
  });
  let posts = '', planks = '';
  for (let x = 300; x <= 790; x += 70) posts += rect(x, PIER + 14, 12, 92, 'wd2', c('wl') + ' rx="3"');
  for (let x = 330; x < 800; x += 42) planks += 'M' + x + ' ' + PIER + 'v18';
  const floor = rect(0, HZ + 14, 800, 190, 'sea') + rect(0, 440, 800, 60, 'sea2') +
    '<g ' + c('waves') + '>' + waves + '</g>' +
    posts + rect(282, PIER, 540, 20, 'wd', c('wl')) + path(planks, 'pk');

  /* ---------- things ---------- */
  // the fishing boat by the pier: a red hull, a mast with a white sail and ÷, two crates on board
  const boat = '<g ' + c('boat-b') + '>' +
    path('M128 ' + (PIER - 2) + 'h152l-22 40H150z', 'boat', c('o')) + path('M128 ' + (PIER - 2) + 'h152l-4 8H131z', 'boat2') +
    rect(150, PIER - 30, 40, 28, '', 'rx="3" fill="var(--sh-cr)" ' + c('wl')) + rect(196, PIER - 30, 40, 28, '', 'rx="3" fill="var(--sh-cr)" ' + c('wl')) +
    path('M244 ' + (PIER - 2) + 'V' + (PIER - 132), '', 'stroke="var(--sh-ln)" stroke-width="4"') +
    path('M240 ' + (PIER - 126) + 'L176 ' + (PIER - 42) + 'H240z', 'sail', c('o')) + text(219, PIER - 62, '÷', 'sl') +
    path('M246 ' + (PIER - 132) + 'h24l-6 7 6 7h-24z', '', 'fill="#F5A623" ' + c('o')) + '</g>';

  // the crane on the right of the pier: a tower, a jib, a rope and a pallet of 2 rows of 3 sacks (2 × 3)
  const crane = rect(632, 180, 20, PIER - 180, '', 'fill="#F2C230" ' + c('o')) +
    path('M636 196l12 20M648 216l-12 20M636 236l12 20M648 256l-12 20M636 276l12 20M648 296l-12 20M636 316l12 20M648 336l-12 20M636 356l12 20', '', 'stroke="#B8770E" stroke-width="2"') +
    rect(520, 168, 160, 14, '', 'fill="#F2C230" ' + c('o')) + rect(652, 154, 26, 26, '', 'rx="3" fill="#F2C230" ' + c('o')) +
    rect(654, 158, 20, 12, 'win', 'rx="2"') +
    '<g ' + c('load') + '>' + path('M540 182V232', '', 'stroke="var(--sh-ln)" stroke-width="2.5"') +
    path('M540 232l-34 16M540 232l34 16', '', 'stroke="var(--sh-ln)" stroke-width="2"') +
    rect(500, 248, 80, 8, 'wd', c('wl')) +
    use('sh-sack', 506, 232) + use('sh-sack', 531, 232) + use('sh-sack', 556, 232) +
    use('sh-sack', 506, 214) + use('sh-sack', 531, 214) + use('sh-sack', 556, 214) +
    rect(522, 258, 36, 18, '', 'rx="4" fill="#FFE08A" stroke="#A86A00" stroke-width="2"') + text(540, 272, '2 × 3', 'tg') + '</g>';

  // the hut at the end of the pier, its window lit at night
  const hut = rect(700, PIER - 74, 84, 74, 'hut', c('o')) + path('M692 ' + (PIER - 74) + 'L742 ' + (PIER - 110) + 'L792 ' + (PIER - 74) + 'Z', 'hutr', c('o')) +
    rect(714, PIER - 58, 26, 24, 'win', 'rx="3" ' + c('o')) + rect(752, PIER - 46, 22, 46, 'wd2', c('wl')) +
    '<g ' + c('glow') + '><circle cx="727" cy="' + (PIER - 46) + '" r="24" fill="#FFE38A" opacity=".35"/></g>';

  // the heart (data-heart): 3 crates of 4 fish, the bucket with 1 gold fish left over, the sign 13 ÷ 3 = 4 r 1
  const crate = function (x) {
    let s = use('sh-cback', x, PIER - 40);
    [[13, 32], [35, 32], [16, 23], [38, 23]].forEach(function (p) { s += use('sh-fish', x + p[0], PIER - p[1], c('fish')); });
    return s + use('sh-cfront', x, PIER - 20);
  };
  // (the heart is only the sign and the middle crate: about 128 x 74, so it fits a phone's strip between the buttons)
  const heart = path('M344 340V' + PIER + 'M456 340V' + PIER, '', 'stroke="var(--sh-wdl)" stroke-width="5"') +
    crate(298) + crate(414) + '<g data-heart="crates">' +
    rect(336, 318, 128, 24, '', 'rx="7" fill="#1F5CA0" ' + c('o')) + text(400, 336, '13 ÷ 3 = 4 r 1', 'sg') +
    crate(356) + '</g>' +
    path('M474 ' + (PIER - 30) + 'h30l-4 30h-22z', '', 'fill="#9AA7B8" ' + c('o')) + path('M476 ' + (PIER - 30) + 'q13-16 26 0', '', 'stroke="var(--sh-ln)" stroke-width="2"') +
    use('sh-fish', 489, PIER - 34, c('gold'));

  // Zip waving on the pier, between the crates and the crane
  const zip = '<g ' + c('zip') + '><g transform="translate(560 ' + (PIER - 32) + ') scale(.42)">' +
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

  // a coil of rope and a life ring on the pier
  const extras = '<circle cx="606" cy="' + (PIER - 12) + '" r="12" fill="none" stroke="#E5404A" stroke-width="7"/>' +
    '<circle cx="606" cy="' + (PIER - 12) + '" r="12" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-dasharray="9.4 9.4"/>';

  const things = boat + crane + hut + heart + extras + zip;

  const label = 'The Sharing Harbour: a fishing boat with a division sign on its sail waits by a wooden pier. ' +
    'On the pier, 13 fish are shared into 3 crates: 4 fish in each crate, and 1 gold fish is left over in a bucket. ' +
    'A sign over the crates says 13 ÷ 3 = 4 r 1. A crane lifts a pallet with 2 rows of 3 sacks, 2 × 3. ' +
    'A lighthouse stands on an island, and Zip waves on the pier.';

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="art" data-art="' + ID +
    '" data-view="0 0 800 500" data-safe="160,60,480,400" data-band="300,398" role="img" aria-label="' + label +
    '" fill="none" stroke-linejoin="round" stroke-linecap="round"><style>' + css + '</style>' + defs +
    '<g data-layer="sky">' + sky + '</g>' +
    '<g data-layer="building">' + far + '</g>' +
    '<g data-layer="floor">' + floor + '</g>' +
    '<g data-layer="things">' + things + '</g>' +
    '</svg>';

  window.T_ART = window.T_ART || {};
  window.T_ART[ID] = svg;
})();
