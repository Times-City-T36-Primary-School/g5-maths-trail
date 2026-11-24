/* 10-art-world-8.js - the Clock Station, the world scene of Stop 8 (window.T_ART['world-clock-station']).

   The hub header of Stop 8 (35-hub.js buildScene), drawn with the recipe of every world scene (docs/02-architecture.md):
     viewBox 0 0 800 500, preserveAspectRatio xMidYMid slice, data-view, data-safe (x, y, w, h: what must show at every
     size) and data-band (top, bottom: the heart, clear of the floating buttons and the sheet). The heart's main part,
     the face of the big platform clock (not its rim or its post), carries data-heart (test/scene.mjs checks it stays clear of the buttons).
     Layers, back to front: sky (sun or moon, stars, clouds), far (a city skyline and hills), floor (the platform, the
     rails), things: the station in the middle with its steel blue roof, the big platform clock (at 3:30) in front of it, the
     arched door under a calendar (page 12 of the month) on the left, a departures board on the right with three 24-hour times
     (09:15, 13:40, 18:25), a train coming in on the left with a puff of steam, Zip waving on the platform, a lamp.
     Maths meaning: reading a clock with hands, 24-hour times on a timetable, days on a calendar.
     Palette: CSS variables on .art (--cs-*, steel blue), redefined by the class world-clock-station-night (the dark
       theme): a dark sky with stars and the moon, the windows and the board are lit.
     Motion: only under .art.is-live (35-hub.js adds it when motion is allowed), transform and opacity only, slow loops:
       the clouds drift, the clock's long hand goes round once a minute (the short hand slowly), the train rocks and its
       steam puffs, the stars twinkle, Zip bobs. Still under reduced motion and on the lowest effects tier (html[data-fx="1"]).
   Class names start with the id, so many copies on one page never clash; ids are renamed per copy by T.ui.art. */
(function () {
  'use strict';

  const ID = 'world-clock-station';
  const c = function (name) { return 'class="' + ID + '-' + name.split(' ').join(' ' + ID + '-') + '"'; };
  const r1 = function (v) { return Math.round(v * 10) / 10; };

  /* ---------- palette: day, then night ---------- */
  const DAY = {
    sk1: '#BFD9EE', sk2: '#F2F8FC', h1: '#B5D3C2', h2: '#9CC4AE', far: '#D3E2EE', farw: '#FFFFFF', wall: '#F1ECE1', wall2: '#DCD3C1', ln: '#3A4A5A',
    roof: '#3F6E9E', roofd: '#2B4F78', win: '#BFE0F5', winf: '#7FA9CC', pf: '#D9D4CA', pf2: '#C4BDB0', gr: '#A9D3A0', cld: '#FFFFFF',
    su: '1', mo: '0', sr: '0', cso: '.95', glow: '0'
  };
  const NIGHT = {
    sk1: '#0B1A30', sk2: '#21405A', h1: '#25463E', h2: '#1D3B33', far: '#2B455A', farw: '#FFD872', wall: '#5E6670', wall2: '#4C545E', ln: '#1A222A',
    roof: '#2B4F78', roofd: '#1D3756', win: '#FFD872', winf: '#C9973A', pf: '#4E4C4A', pf2: '#3E3C3A', gr: '#2E5A3A', cld: '#3E5870',
    su: '0', mo: '1', sr: '1', cso: '.45', glow: '1'
  };
  const vars = function (p) { return Object.keys(p).map(function (k) { return '--cs-' + k + ':' + p[k]; }).join(';'); };
  const fill = function (names) { return names.map(function (n) { return '.' + ID + '-' + n + '{fill:var(--cs-' + n + ')}'; }).join(''); };

  const S = '.' + ID + '-';
  const live = '.art.is-live ' + S;
  const FONT = 'var(--font-display,Arial,Helvetica,sans-serif)';
  const css =
    '.art{' + vars(DAY) + '}.art.' + ID + '-night{' + vars(NIGHT) + '}' +
    fill(['h1', 'h2', 'far', 'farw', 'wall', 'wall2', 'roof', 'roofd', 'win', 'pf', 'pf2', 'gr', 'cld']) +
    S + 'o{stroke:var(--cs-ln);stroke-width:2.5}' + S + 'of{stroke:var(--cs-winf);stroke-width:2}' +
    S + 'su{fill:#FFE08A;opacity:var(--cs-su)}' + S + 'sun-ray{stroke:#FFD05A;stroke-width:5;opacity:var(--cs-su)}' +
    S + 'mo{fill:#FFF4CF;opacity:var(--cs-mo)}' + S + 'stars{fill:#FFF4CF;opacity:var(--cs-sr)}' +
    S + 'clouds{opacity:var(--cs-cso)}' + S + 'glow{opacity:var(--cs-glow)}' +
    S + 'n{fill:#10305E;font:700 9px/1 ' + FONT + ';text-anchor:middle}' +
    S + 'bd{fill:#7CF0C5;font:600 13px/1 ' + FONT + ';text-anchor:start}' +
    S + 'bl{fill:#FFD872;font:700 13px/1 ' + FONT + ';text-anchor:start}' +
    S + 'cal{fill:#10305E;font:800 26px/1 ' + FONT + ';text-anchor:middle}' +
    // what moves: each part turns or slides around its own box (the clock's hands turn about the clock's centre)
    S + 'mh,' + S + 'hh{transform-box:view-box;transform-origin:400px 356px}' + S + 'zip{transform-box:fill-box;transform-origin:50% 100%}' +
    S + 'puff{transform-box:fill-box;transform-origin:50% 100%}' +
    live + 'cloud-a{animation:' + ID + '-drift 30s ease-in-out infinite alternate}' +
    live + 'cloud-b{animation:' + ID + '-drift 38s ease-in-out -12s infinite alternate-reverse}' +
    live + 'mh{animation:' + ID + '-turn 60s linear infinite}' +
    live + 'hh{animation:' + ID + '-turn 720s linear infinite}' +
    live + 'train{animation:' + ID + '-rock 2.4s ease-in-out infinite alternate}' +
    live + 'puff{animation:' + ID + '-puff 3s ease-out infinite}' +
    live + 'zip{animation:' + ID + '-bob 3.2s ease-in-out infinite alternate}' +
    live + 'stars{animation:' + ID + '-tw 3.4s ease-in-out infinite alternate}' +
    '@keyframes ' + ID + '-drift{0%{transform:translateX(-12px)}100%{transform:translateX(14px)}}' +
    '@keyframes ' + ID + '-turn{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}' +
    '@keyframes ' + ID + '-rock{0%{transform:translateY(0)}100%{transform:translateY(-1.5px)}}' +
    '@keyframes ' + ID + '-puff{0%{transform:translateY(6px) scale(.7);opacity:0}30%{opacity:.9}100%{transform:translateY(-18px) scale(1.15);opacity:0}}' +
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
    '<linearGradient id="cs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--cs-sk1)"/><stop offset="1" style="stop-color:var(--cs-sk2)"/></linearGradient>' +
    '<path id="cs-cloud" d="M0 0h70c10 0 13-13 3-17 1-11-12-16-19-10-5-11-22-12-26-1-9-4-18 2-16 11-9 1-10 17 0 17z"/>' +
    // an arched window of the station (lit at night)
    '<g id="cs-win"><path d="M0 40V14a14 14 0 0 1 28 0v26z" class="' + ID + '-win ' + ID + '-o"/><path d="M14 2v38M1 22h26" class="' + ID + '-of"/></g>' +
    '<rect id="cs-fw" width="8" height="10" rx="2" class="' + ID + '-farw"/>' +
    // a rail tie
    '<rect id="cs-tie" width="10" height="30" rx="2" fill="#8A6A4A"/>' +
    '</defs>';

  /* ---------- sky: the sun or the moon, stars, clouds ---------- */
  let rays = '';
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    rays += 'M' + r1(690 + Math.cos(a) * 44) + ' ' + r1(78 + Math.sin(a) * 44) + 'L' + r1(690 + Math.cos(a) * 58) + ' ' + r1(78 + Math.sin(a) * 58);
  }
  let stars = '';
  [[44, 34], [196, 56], [292, 24], [372, 62], [520, 30], [610, 120], [742, 40], [776, 150], [26, 130], [470, 104], [150, 150], [236, 128]].forEach(function (p, i) {
    stars += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i % 3 ? 1.6 : 2.4) + '"/>';
  });
  const sky = rect(0, 0, 800, 500, '', 'fill="url(#cs-sky)"') +
    '<g ' + c('stars') + '>' + stars + '</g>' +
    path(rays, 'sun-ray') + '<circle cx="690" cy="78" r="32" ' + c('su') + '/>' +
    '<path d="M704 54a28 28 0 1 0 8 46 24 24 0 1 1-8-46z" ' + c('mo') + '/>' +
    '<g ' + c('clouds') + '><g ' + c('cloud-a') + '>' + use('cs-cloud', 120, 74, c('cld')) + '</g>' +
    '<g ' + c('cloud-b') + '>' + use('cs-cloud', 470, 50, c('cld') + ' transform="translate(470 50) scale(.75) translate(-470 -50)"') + '</g></g>';

  /* ---------- far: hills and a city skyline ---------- */
  const FLOOR = 392;
  const farBlock = function (x, w, h) {
    const top = FLOOR - 30 - h;
    let s = rect(x, top, w, h + 30, 'far', 'rx="3"');
    for (let r = 0; r < Math.floor(h / 24); r++) for (let k = 0; k < Math.floor((w - 8) / 18); k++) s += use('cs-fw', x + 8 + k * 18, top + 10 + r * 24);
    return s;
  };
  const far = path('M0 320Q140 270 290 312T580 296T800 314V420H0Z', 'h1') +
    farBlock(30, 62, 120) + farBlock(100, 44, 80) + farBlock(170, 56, 100) + farBlock(560, 52, 96) + farBlock(624, 70, 136) + farBlock(706, 48, 84) +
    path('M0 352Q170 318 340 346T660 334T800 346V420H0Z', 'h2');

  /* ---------- floor: the platform and the rails in front of it ---------- */
  let ties = '';
  for (let x = -6; x < 800; x += 30) ties += use('cs-tie', x, 440);
  const floor = rect(0, FLOOR, 800, 108, 'gr') +
    rect(0, FLOOR, 800, 38, 'pf') + path('M0 ' + (FLOOR + 38) + 'H800', '', 'stroke="var(--cs-pf2)" stroke-width="5"') +
    path('M0 ' + FLOOR + 'H800', '', 'stroke="var(--cs-pf2)" stroke-width="3"') +
    path('M0 ' + (FLOOR + 6) + 'H800', '', 'stroke="#F5C542" stroke-width="4" stroke-dasharray="18 12"') +
    ties + path('M0 448H800M0 462H800', '', 'stroke="#6B7480" stroke-width="5"');

  /* ---------- things ---------- */
  // the station: walls, a steel blue roof, arched windows; the clock and the door are the heart (below)
  const SX = 286, SW = 228, TOP = 250;
  const station = rect(SX, TOP, SW, FLOOR - TOP, 'wall', c('o')) + rect(SX, FLOOR - 14, SW, 14, 'wall2', c('o')) +
    path('M' + (SX - 14) + ' ' + TOP + 'L' + (SX + 30) + ' ' + (TOP - 44) + 'H' + (SX + SW - 30) + 'L' + (SX + SW + 14) + ' ' + TOP + 'Z', 'roof', c('o')) +
    rect(SX - 14, TOP - 4, SW + 28, 10, 'roofd', c('o') + ' rx="3"') +
    // two small towers at the ends of the roof
    rect(SX + 2, TOP - 70, 26, 30, 'roof', c('o') + ' rx="3"') + path('M' + (SX - 2) + ' ' + (TOP - 70) + 'l17-16 17 16z', 'roofd', c('o')) +
    rect(SX + SW - 28, TOP - 70, 26, 30, 'roof', c('o') + ' rx="3"') + path('M' + (SX + SW - 32) + ' ' + (TOP - 70) + 'l17-16 17 16z', 'roofd', c('o')) +
    use('cs-win', SX + SW - 42, TOP + 74) +
    // the arched door, on the left under the calendar
    path('M302 ' + FLOOR + 'V344a20 20 0 0 1 40 0V' + FLOOR + 'z', 'roofd', c('o')) + path('M322 324V' + FLOOR, '', c('o')) +
    // a round window high in the middle of the wall
    '<circle cx="400" cy="' + (TOP + 4) + '" r="15" ' + c('win o') + '/>';
  // a soft glow behind the lit windows at night
  const glow = '<circle cx="' + (SX + 28) + '" cy="' + (TOP + 96) + '" r="24" fill="#FFE38A" opacity=".35"/><circle cx="' + (SX + SW - 28) + '" cy="' + (TOP + 96) + '" r="24" fill="#FFE38A" opacity=".35"/>';

  // the calendar on the left of the door: page 12, a grid of days
  let days = '';
  for (let r = 0; r < 2; r++) for (let k = 0; k < 5; k++) days += '<rect x="' + (SX + 16 + k * 8) + '" y="' + (TOP + 50 + r * 7) + '" width="5" height="4" rx="1" fill="' + (r === 1 && k === 1 ? '#E5404A' : '#9FB3C8') + '"/>';
  const calendar = rect(SX + 10, TOP + 12, 52, 56, '', 'rx="5" fill="#FFFFFF" ' + c('o')) +
    path('M' + (SX + 10) + ' ' + (TOP + 26) + 'v-9a5 5 0 0 1 5-5h42a5 5 0 0 1 5 5v9z', '', 'fill="#E5404A"') +
    '<circle cx="' + (SX + 24) + '" cy="' + (TOP + 12) + '" r="3" fill="#3A4A5A"/><circle cx="' + (SX + 48) + '" cy="' + (TOP + 12) + '" r="3" fill="#3A4A5A"/>' +
    text(SX + 36, TOP + 48, '12', 'cal') + days;

  // the departures board on the right of the door: three trains and their 24-hour times
  const BX = SX + SW - 74;
  const board = rect(BX, TOP + 10, 66, 60, '', 'rx="6" fill="#173B63" stroke="#0E2744" stroke-width="3"') +
    text(BX + 7, TOP + 28, 'A', 'bl') + text(BX + 22, TOP + 28, '09:15', 'bd') +
    text(BX + 7, TOP + 46, 'B', 'bl') + text(BX + 22, TOP + 46, '13:40', 'bd') +
    text(BX + 7, TOP + 64, 'C', 'bl') + text(BX + 22, TOP + 64, '18:25', 'bd');

  // the heart (data-heart): the big platform clock on its post in front of the station, at 3:30 (the post is outside the heart)
  const CX = 400, CY = 356, R = 26;
  let ticks = '';
  for (let i = 0; i < 12; i++) {
    const a = i * 30 * Math.PI / 180;
    ticks += 'M' + r1(CX + (R - 6) * Math.sin(a)) + ' ' + r1(CY - (R - 6) * Math.cos(a)) + 'L' + r1(CX + (R - 2) * Math.sin(a)) + ' ' + r1(CY - (R - 2) * Math.cos(a));
  }
  const nums = [[12, 0], [3, 90], [6, 180], [9, 270]].map(function (p) {
    const a = p[1] * Math.PI / 180;
    return text(CX + (R - 12) * Math.sin(a), CY - (R - 12) * Math.cos(a) + 3, String(p[0]), 'n');
  }).join('');
  const heart = '<circle cx="' + CX + '" cy="' + CY + '" r="' + (R + 5) + '" ' + c('roof o') + '/>' +
    '<g data-heart="clock"><circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" fill="#FFFFFF" ' + c('o') + '/>' +
    path(ticks, '', 'stroke="#2A2F3A" stroke-width="2.5"') + nums +
    // the hands at 3:30: the short hand half way between 3 and 4, the long hand on 6
    '<g ' + c('hh') + '><path d="M' + CX + ' ' + CY + 'L' + r1(CX + 10 * Math.sin(105 * Math.PI / 180)) + ' ' + r1(CY - 10 * Math.cos(105 * Math.PI / 180)) + '" stroke="#1F4FA8" stroke-width="5"/></g>' +
    '<g ' + c('mh') + '><path d="M' + CX + ' ' + CY + 'V' + (CY + 19) + '" stroke="#D22630" stroke-width="3"/></g>' +
    '<circle cx="' + CX + '" cy="' + CY + '" r="3.5" fill="#2A2F3A"/>' +
    '</g>' +
    // the post of the clock, standing on the platform
    rect(395, CY + R + 5, 10, FLOOR - CY - R - 5 + 4, '', 'rx="3" fill="#2B4F78" ' + c('o')) + rect(384, FLOOR - 2, 32, 8, '', 'rx="3" fill="#2B4F78" ' + c('o'));

  // the train coming in on the left: an engine and a carriage on the rails, steam from the chimney
  // (drawn at full size, then made smaller on the rails in front of the platform: its front at x 330, inside x 200 to 600)
  const train = '<g transform="translate(127 125) scale(.75)"><g ' + c('train') + '>' +
    rect(10, 366, 150, 66, '', 'rx="10" fill="#E5533D" ' + c('o')) + rect(22, 378, 30, 24, 'win', 'rx="4" ' + c('o')) + rect(60, 378, 30, 24, 'win', 'rx="4" ' + c('o')) + rect(98, 378, 30, 24, 'win', 'rx="4" ' + c('o')) +
    rect(166, 350, 84, 82, '', 'rx="12" fill="#3F6E9E" ' + c('o')) + rect(180, 362, 36, 28, 'win', 'rx="5" ' + c('o')) +
    path('M250 400h14a6 6 0 0 1 0 12h-14z', '', 'fill="#F5C542" ' + c('o')) + rect(226, 330, 14, 22, '', 'rx="3" fill="#2A2F3A"') +
    [36, 80, 124, 186, 230].map(function (x) { return '<circle cx="' + x + '" cy="436" r="10" fill="#2A2F3A"/><circle cx="' + x + '" cy="436" r="3.5" fill="#C9D6E5"/>'; }).join('') +
    rect(160, 412, 8, 8, '', 'fill="#2A2F3A"') + '</g>' +
    '<g ' + c('puff') + '><circle cx="233" cy="316" r="9" fill="#FFFFFF" opacity=".85"/><circle cx="244" cy="306" r="7" fill="#FFFFFF" opacity=".7"/></g>' + '</g>';

  // Zip waving on the platform, right of the station
  const zip = '<g ' + c('zip') + '><g transform="translate(536 ' + (FLOOR - 30) + ') scale(.42)">' +
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
  // a lamp and a bench on the platform, right
  const lamp = path('M650 ' + FLOOR + 'V' + (FLOOR - 92), '', 'stroke="#3A4A5A" stroke-width="5"') +
    '<circle cx="650" cy="' + (FLOOR - 100) + '" r="12" fill="#FFE38A" stroke="#3A4A5A" stroke-width="3"/>' +
    '<g ' + c('glow') + '><circle cx="650" cy="' + (FLOOR - 100) + '" r="30" fill="#FFE38A" opacity=".4"/></g>' +
    rect(670, FLOOR - 26, 84, 9, '', 'rx="3" fill="#C98E52" stroke="#6E4320" stroke-width="2.4"') +
    path('M680 ' + (FLOOR - 17) + 'v17M744 ' + (FLOOR - 17) + 'v17', '', 'stroke="#6E4320" stroke-width="4"') +
    rect(670, FLOOR - 44, 84, 9, '', 'rx="3" fill="#C98E52" stroke="#6E4320" stroke-width="2.4"');

  const things = station + '<g ' + c('glow') + '>' + glow + '</g>' + calendar + board + heart + train + zip + lamp;

  const label = 'The Clock Station: a station with a steel blue roof and a big clock on a post in front of it, showing half past 3. ' +
    'On the left, a calendar on page 12 hangs over the arched door. On the right, a departures board shows trains A, B and C at 09:15, 13:40 and 18:25. ' +
    'A red and blue train comes in on the rails, with a puff of steam. Zip waves on the platform.';

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="art" data-art="' + ID +
    '" data-view="0 0 800 500" data-safe="200,170,400,300" data-band="318,394" role="img" aria-label="' + label +
    '" fill="none" stroke-linejoin="round" stroke-linecap="round"><style>' + css + '</style>' + defs +
    '<g data-layer="sky">' + sky + '</g>' +
    '<g data-layer="building">' + far + '</g>' +
    '<g data-layer="floor">' + floor + '</g>' +
    '<g data-layer="things">' + things + '</g>' +
    '</svg>';

  window.T_ART = window.T_ART || {};
  window.T_ART[ID] = svg;
})();
