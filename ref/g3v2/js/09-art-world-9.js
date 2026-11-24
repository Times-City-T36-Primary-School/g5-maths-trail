/* 09-art-world-9.js - the Chance Fair, the world scene of Stop 9 (window.T_ART['world-chance-fair']), drawn with the
   recipe of every world scene (docs/02-architecture.md): viewBox 800 x 500, data-view, data-safe, data-band; the heart
   (data-heart) is the big spinner wheel. Layers: sky (sun or moon, stars, clouds, a string of flags), far (a big wheel,
   striped tents), floor, things: the spinner wheel (6 equal parts, each a colour and a sign), the lucky dip stall (an open
   bag of counters, balloons), the juice stall (jugs at a half and 1 and a half, a weighing scale with mangoes), Zip.
   Palette: --cf-* on .art, night in .world-chance-fair-night (stars, lit bulbs and lamps). Motion only under .art.is-live,
   transform and opacity, slow loops; still under reduced motion and html[data-fx="1"]. */
(function () {
  'use strict';

  const ID = 'world-chance-fair';
  const c = function (name) { return 'class="' + ID + '-' + name.split(' ').join(' ' + ID + '-') + '"'; };
  const r1 = function (v) { return Math.round(v * 10) / 10; };

  /* ---------- palette: day, then night ---------- */
  const DAY = {
    sk1: '#F9D7EC', sk2: '#FFF6FA', far: '#E8C8DE', far2: '#D9B2CD', gr: '#9FD69B', gr2: '#8BC888', pa: '#F1E2C6', pal: '#D9C39C',
    st: '#C050A8', std: '#92367E', stw: '#FFFFFF', wd: '#C98E52', wdd: '#6E4320', cld: '#FFFFFF', lamp: '#FFE38A',
    su: '1', mo: '0', sr: '0', cso: '.95', glow: '0'
  };
  const NIGHT = {
    sk1: '#1A0F2E', sk2: '#4A2350', far: '#3B2546', far2: '#4C2F57', gr: '#2E5A3A', gr2: '#284F33', pa: '#5A4E44', pal: '#4A4038',
    st: '#9A3C86', std: '#6E2A60', stw: '#D8CFE0', wd: '#8E6238', wdd: '#4A2E16', cld: '#4A3B62', lamp: '#FFD872',
    su: '0', mo: '1', sr: '1', cso: '.4', glow: '1'
  };
  const vars = function (p) { return Object.keys(p).map(function (k) { return '--cf-' + k + ':' + p[k]; }).join(';'); };
  const fill = function (names) { return names.map(function (n) { return '.' + ID + '-' + n + '{fill:var(--cf-' + n + ')}'; }).join(''); };

  const S = '.' + ID + '-';
  const live = '.art.is-live ' + S;
  const css =
    '.art{' + vars(DAY) + '}.art.' + ID + '-night{' + vars(NIGHT) + '}' +
    fill(['far', 'far2', 'gr', 'gr2', 'pa', 'st', 'std', 'stw', 'wd', 'wdd', 'cld', 'lamp']) +
    S + 'o{stroke:#3A2A40;stroke-width:2.5}' + S + 'pl{stroke:var(--cf-pal);stroke-width:2;fill:none}' +
    S + 'su{fill:#FFE08A;opacity:var(--cf-su)}' + S + 'sun-ray{stroke:#FFD05A;stroke-width:5;opacity:var(--cf-su)}' +
    S + 'mo{fill:#FFF4CF;opacity:var(--cf-mo)}' + S + 'stars{fill:#FFF4CF;opacity:var(--cf-sr)}' +
    S + 'clouds{opacity:var(--cf-cso)}' + S + 'glow{opacity:var(--cf-glow)}' +
    S + 'n{fill:#10305E;font:800 13px/1 var(--font-display,Arial,Helvetica,sans-serif);text-anchor:end}' +
    S + 'wheel,' + S + 'big,' + S + 'flags,' + S + 'zip,' + S + 'bal{transform-box:fill-box;transform-origin:50% 50%}' +
    S + 'flags{transform-origin:50% 0}' + S + 'zip{transform-origin:50% 100%}' + S + 'bal{transform-origin:50% 100%}' +
    live + 'cloud-a{animation:' + ID + '-drift 30s ease-in-out infinite alternate}' +
    live + 'cloud-b{animation:' + ID + '-drift 38s ease-in-out -12s infinite alternate-reverse}' +
    live + 'flags{animation:' + ID + '-sway 4s ease-in-out infinite alternate}' +
    live + 'wheel{animation:' + ID + '-turn 40s linear infinite}' +
    live + 'big{animation:' + ID + '-turn 60s linear infinite}' +
    live + 'bal{animation:' + ID + '-float 3.6s ease-in-out infinite alternate}' +
    live + 'zip{animation:' + ID + '-bob 3.2s ease-in-out infinite alternate}' +
    live + 'stars{animation:' + ID + '-tw 3.4s ease-in-out infinite alternate}' +
    '@keyframes ' + ID + '-drift{0%{transform:translateX(-12px)}100%{transform:translateX(14px)}}' +
    '@keyframes ' + ID + '-sway{0%{transform:rotate(-.6deg)}100%{transform:rotate(.6deg)}}' +
    '@keyframes ' + ID + '-turn{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}' +
    '@keyframes ' + ID + '-float{0%{transform:translateY(0) rotate(-2deg)}100%{transform:translateY(-6px) rotate(2deg)}}' +
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

  const COL = { green: ['#2E9E4F', '#FFFFFF', 'M0-5.4L5.2 3.8H-5.2Z'], purple: ['#8A4FD3', '#FFFFFF', 'M0-5.8L4.6 0 0 5.8-4.6 0z'],
    orange: ['#F28A1E', '#4A2600', 'M-1.5-5.2h3v3.7h3.7v3H1.5v3.7h-3V1.5h-3.7v-3h3.7z'], pink: ['#F27DB4', '#5C1238', 'M0 5C-4 2-5.6.3-5.6-1.8c0-1.9 1.4-3.2 3-3.2 1.2 0 2.1.6 2.6 1.6.5-1 1.4-1.6 2.6-1.6 1.6 0 3 1.3 3 3.2C5.6.3 4 2 0 5z'],
    blue: ['#2F6FD0', '#FFFFFF', 'M-3.7-3.7h7.4v7.4h-7.4z'], yellow: ['#F4C531', '#5A4300', 'M0-6l1.7 3.6 3.9.4-2.9 2.7.8 3.9L0 2.7-3.5 4.6l.8-3.9-2.9-2.7 3.9-.4z'] };
  const counter = function (col, x, y, r) {
    return '<g transform="translate(' + r1(x) + ' ' + r1(y) + ') scale(' + r / 10 + ')"><circle r="9.2" fill="' + COL[col][0] + '" stroke="#3A2A40" stroke-width="1.6"/><path d="' + COL[col][2] + '" fill="' + COL[col][1] + '"/></g>';
  };

  /* ---------- reusable shapes (defs) ---------- */
  const defs = '<defs>' +
    '<linearGradient id="cf-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--cf-sk1)"/><stop offset="1" style="stop-color:var(--cf-sk2)"/></linearGradient>' +
    '<path id="cf-cloud" d="M0 0h70c10 0 13-13 3-17 1-11-12-16-19-10-5-11-22-12-26-1-9-4-18 2-16 11-9 1-10 17 0 17z"/>' +
    '<g id="cf-mango"><path d="M-9 1C-9-6-2-8 3-6 8-5 10 0 8 4 6 8 0 8-4 7-7 6-9 4-9 1Z" fill="#F6B52E" stroke="#A86A06" stroke-width="1.4"/><path d="M1-6c2-3 5-3 7-2" stroke="#3E8E52" stroke-width="1.8"/></g>' +
    '</defs>';

  /* ---------- sky: the sun or the moon, stars, clouds, a string of flags ---------- */
  let rays = '';
  for (let i = 0; i < 10; i++) {
    const a = i / 10 * Math.PI * 2;
    rays += 'M' + r1(690 + Math.cos(a) * 44) + ' ' + r1(70 + Math.sin(a) * 44) + 'L' + r1(690 + Math.cos(a) * 58) + ' ' + r1(70 + Math.sin(a) * 58);
  }
  let stars = '';
  [[44, 34], [196, 56], [292, 24], [372, 62], [520, 30], [598, 80], [742, 140], [776, 30], [26, 130], [460, 110], [250, 128], [120, 90]].forEach(function (p, i) {
    stars += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i % 3 ? 1.6 : 2.4) + '"/>';
  });
  const FL = ['#C050A8', '#F5A623', '#2E9E4F', '#2F6FD0', '#F27DB4', '#8A4FD3'];
  let flags = path('M0 118Q200 168 400 132T800 120', '', 'stroke="#5A4060" stroke-width="2"'), bulbs = '';
  for (let i = 0; i < 20; i++) {
    const x = 20 + i * 40, y = i < 10 ? 118 + Math.sin((x / 400) * Math.PI) * 26 : 132 - Math.sin(((x - 400) / 400) * Math.PI) * 10;
    flags += path('M' + r1(x - 10) + ' ' + r1(y) + 'h20l-10 20z', '', 'fill="' + FL[i % 6] + '" stroke="#5A4060" stroke-width="1.2"');
    bulbs += '<circle cx="' + r1(x + 10) + '" cy="' + r1(y + 2) + '" r="3.5" ' + c('lamp') + '/>';
  }
  const sky = rect(0, 0, 800, 500, '', 'fill="url(#cf-sky)"') +
    '<g ' + c('stars') + '>' + stars + '</g>' +
    path(rays, 'sun-ray') + '<circle cx="690" cy="70" r="32" ' + c('su') + '/>' +
    '<path d="M704 46a28 28 0 1 0 8 46 24 24 0 1 1-8-46z" ' + c('mo') + '/>' +
    '<g ' + c('clouds') + '><g ' + c('cloud-a') + '>' + use('cf-cloud', 520, 64, c('cld')) + '</g>' +
    '<g ' + c('cloud-b') + '>' + use('cf-cloud', 150, 40, c('cld') + ' transform="translate(150 40) scale(.75) translate(-150 -40)"') + '</g></g>' +
    '<g ' + c('flags') + '>' + flags + '<g ' + c('glow') + '>' + bulbs + '</g></g>';

  /* ---------- far: a big wheel and striped tents ---------- */
  const FLOOR = 392;
  let big = '<circle cx="0" cy="0" r="70" fill="none" stroke="var(--cf-far2)" stroke-width="6"/>';
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2;
    big += path('M0 0L' + r1(Math.cos(a) * 70) + ' ' + r1(Math.sin(a) * 70), '', 'stroke="var(--cf-far2)" stroke-width="3"') +
      '<rect x="' + r1(Math.cos(a) * 70 - 8) + '" y="' + r1(Math.sin(a) * 70 - 6) + '" width="16" height="12" rx="3" fill="' + FL[i % 6] + '" opacity=".8"/>';
  }
  const tent = function (x, w, h) {
    const top = FLOOR - h, eave = top + 40, ax = x + w / 2;
    let s = rect(x, eave, w, FLOOR - eave, 'stw');
    for (let k = 0; k < 6; k += 2) s += rect(x + w * k / 6, eave, w / 6, FLOOR - eave, 'st');
    s += path('M' + (ax - 14) + ' ' + FLOOR + 'V' + (eave + 24) + 'q14-12 28 0V' + FLOOR + 'Z', '', 'fill="#3A2A40" opacity=".75"') + rect(x, eave, w, FLOOR - eave, '', c('o'));
    s += path('M' + ax + ' ' + top + 'L' + (x - 8) + ' ' + eave + 'H' + (x + w + 8) + 'Z', 'stw');
    for (let k = 0; k < 6; k += 2) s += path('M' + ax + ' ' + top + 'L' + r1(x - 8 + (w + 16) * k / 6) + ' ' + eave + 'H' + r1(x - 8 + (w + 16) * (k + 1) / 6) + 'Z', 'st');
    s += path('M' + ax + ' ' + top + 'L' + (x - 8) + ' ' + eave + 'H' + (x + w + 8) + 'Z', '', c('o'));
    return s + path('M' + ax + ' ' + top + 'v-18', '', 'stroke="#3A2A40" stroke-width="2"') + path('M' + ax + ' ' + (top - 18) + 'h14l-4 5 4 5h-14z', '', 'fill="#F5A623"');
  };
  const far = '<g transform="translate(560 150)">' + path('M-46 242L0 0L46 242', '', 'stroke="var(--cf-far2)" stroke-width="6"') + '<g ' + c('big') + '>' + big + '</g></g>' +
    path('M0 330Q200 300 400 324T800 316V' + FLOOR + 'H0Z', 'far') +
    tent(54, 120, 120) + tent(650, 130, 128);

  /* ---------- floor: grass and the path ---------- */
  const floor = rect(0, FLOOR, 800, 108, 'gr') + path('M0 ' + (FLOOR + 30) + 'Q400 ' + (FLOOR + 16) + ' 800 ' + (FLOOR + 30) + 'V500H0Z', 'gr2') +
    path('M300 500L360 ' + FLOOR + 'H440L500 500Z', 'pa') + path('M330 452H470M346 420H454', 'pl');

  /* ---------- things ---------- */
  const stall = function (x, w) {
    let s = rect(x + 6, 250, 8, FLOOR - 250, 'wd') + rect(x + w - 14, 250, 8, FLOOR - 250, 'wd') + rect(x, 322, w, 14, 'wd', c('o') + ' rx="3"') +
      rect(x + 10, 336, w - 20, FLOOR - 336, 'wdd', 'opacity=".55"');
    let aw = path('M' + (x - 10) + ' 254L' + (x + 8) + ' 222H' + (x + w - 8) + 'L' + (x + w + 10) + ' 254Z', 'stw', c('o'));
    const n = 6;
    for (let k = 0; k < n; k += 2) aw += path('M' + r1(x - 10 + (w + 20) * k / n) + ' 254L' + r1(x + 8 + (w - 16) * k / n) + ' 222H' + r1(x + 8 + (w - 16) * (k + 1) / n) + 'L' + r1(x - 10 + (w + 20) * (k + 1) / n) + ' 254Z', 'st');
    for (let k = 0; k < n; k++) aw += path('M' + r1(x - 10 + (w + 20) * k / n) + ' 254a' + r1((w + 20) / n / 2) + ' 9 0 0 0 ' + r1((w + 20) / n) + ' 0', k % 2 ? 'stw' : 'st', c('o'));
    return s + aw;
  };

  const BX = 270;
  let dip = stall(206, 128);
  dip += '<ellipse cx="' + BX + '" cy="292" rx="34" ry="8" fill="#5B2149"/>';
  [['green', -20, 290], ['orange', -4, 288], ['blue', 12, 290], ['pink', 26, 291], ['purple', -12, 280], ['yellow', 6, 279], ['green', 20, 281]].forEach(function (p) { dip += counter(p[0], BX + p[1], p[2], 7.5); });
  dip += path('M' + (BX - 36) + ' 292C' + (BX - 44) + ' 312 ' + (BX - 38) + ' 322 ' + BX + ' 323C' + (BX + 38) + ' 322 ' + (BX + 44) + ' 312 ' + (BX + 36) + ' 292Q' + BX + ' 304 ' + (BX - 36) + ' 292Z', '', 'fill="#C8559F" stroke="#7E2E63" stroke-width="2.5"') +
    path('M' + (BX - 37) + ' 291Q' + BX + ' 305 ' + (BX + 37) + ' 291', '', 'stroke="#7E2E63" stroke-width="4"');
  const bal = '<g ' + c('bal') + '>' + path('M214 250C218 230 210 214 222 196M214 250C210 228 200 214 198 190M214 250C214 226 230 212 240 204', '', 'stroke="#5A4060" stroke-width="1.5"') +
    '<ellipse cx="222" cy="180" rx="15" ry="18" fill="#F27DB4" ' + c('o') + '/><ellipse cx="196" cy="176" rx="15" ry="18" fill="#F5A623" ' + c('o') + '/><ellipse cx="242" cy="190" rx="14" ry="17" fill="#2F6FD0" ' + c('o') + '/></g>';

  const jug = function (x, y, lv) {
    let s = path('M' + (x + 26) + ' ' + (y - 38) + 'c12 0 12 22 0 22', '', 'stroke="#9FB6DE" stroke-width="5"') +
      rect(x, y - 6 - lv * 9, 26, 6 + lv * 9, '', 'fill="#58AEF2"') +
      path('M' + x + ' ' + (y - 46) + 'H' + (x + 26) + 'V' + y + 'H' + x + 'Z', '', 'fill="#FFFFFF" fill-opacity=".35" stroke="#2A3550" stroke-width="2.5"') + path('M' + x + ' ' + (y - 46) + 'l-6-5', '', 'stroke="#2A3550" stroke-width="2.5"');
    for (let i = 1; i <= 4; i++) s += path('M' + x + ' ' + (y - 6 - i * 9) + 'h' + (i % 2 ? 7 : 12), '', 'stroke="#10305E" stroke-width="' + (i % 2 ? 1.6 : 2.4) + '"');
    return s + '<text x="' + (x + 23) + '" y="' + (y - 20) + '" ' + c('n') + '>1</text><text x="' + (x + 23) + '" y="' + (y - 38) + '" ' + c('n') + '>2</text>';
  };
  let juice = stall(466, 134) + jug(478, 322, 1) + jug(518, 322, 3);
  juice += rect(558, 300, 36, 22, '', 'rx="4" fill="#D45BA6" stroke="#7E2E63" stroke-width="2"') + rect(562, 304, 28, 12, '', 'rx="2" fill="#FFF7DF"') +
    path('M566 314v-4M572 314v-2M578 314v-4M584 314v-2', '', 'stroke="#10305E" stroke-width="1.2"') + path('M579 306l-2-3h4z', '', 'fill="#E0453A"') +
    rect(574, 294, 4, 6, '', 'fill="#8C3A74"') + path('M558 294H594l-3 4H561Z', '', 'fill="#B9C6DA" stroke="#55657F" stroke-width="1.5"') +
    use('cf-mango', 568, 287) + use('cf-mango', 584, 287) + use('cf-mango', 576, 278);
  const lamps = '<g ' + c('glow') + '><circle cx="270" cy="232" r="26" fill="#FFE38A" opacity=".35"/><circle cx="533" cy="232" r="26" fill="#FFE38A" opacity=".35"/></g>' +
    '<circle cx="270" cy="236" r="5" ' + c('lamp') + '/><circle cx="533" cy="236" r="5" ' + c('lamp') + '/>';

  const WX = 400, WY = 350, WR = 38, parts = ['green', 'purple', 'orange', 'pink', 'blue', 'yellow'];
  let wheel = '';
  parts.forEach(function (col, i) {
    const a0 = i / 6 * Math.PI * 2 - Math.PI / 2, a1 = (i + 1) / 6 * Math.PI * 2 - Math.PI / 2, am = (a0 + a1) / 2;
    wheel += path('M' + WX + ' ' + WY + 'L' + r1(WX + WR * Math.cos(a0)) + ' ' + r1(WY + WR * Math.sin(a0)) + 'A' + WR + ' ' + WR + ' 0 0 1 ' + r1(WX + WR * Math.cos(a1)) + ' ' + r1(WY + WR * Math.sin(a1)) + 'Z', '', 'fill="' + COL[col][0] + '" stroke="#FFFFFF" stroke-width="2.5"') +
      '<path transform="translate(' + r1(WX + 24 * Math.cos(am)) + ' ' + r1(WY + 24 * Math.sin(am)) + ') scale(1.05)" d="' + COL[col][2] + '" fill="' + COL[col][1] + '"/>';
  });
  const spinner = path('M' + (WX - 26) + ' ' + FLOOR + 'L' + WX + ' ' + (WY + 16) + 'L' + (WX + 26) + ' ' + FLOOR, '', 'stroke="#5A4060" stroke-width="7"') +
    '<circle cx="' + WX + '" cy="' + WY + '" r="' + (WR + 6) + '" fill="#2A3550"/>' +
    '<g data-heart="spinner"><g ' + c('wheel') + '>' + wheel + '</g></g>' +
    '<circle cx="' + WX + '" cy="' + WY + '" r="8" fill="#2A3550"/><circle cx="' + WX + '" cy="' + WY + '" r="3" fill="#FFE08A"/>' +
    path('M' + WX + ' ' + (WY - WR + 7) + 'l-8-17h16z', '', 'fill="#E0453A" stroke="#FFFFFF" stroke-width="2.5"');

  const zip = '<g ' + c('zip') + '><g transform="translate(452 ' + (FLOOR - 50) + ') scale(.42)">' +
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

  const things = dip + bal + juice + lamps + spinner + zip;

  const label = 'The Chance Fair: a big spinner wheel in the middle with 6 equal parts, each a different colour, and a red arrow on top. ' +
    'On the left, a lucky dip stall with an open bag of coloured counters and balloons. On the right, a juice stall with two measuring jugs, ' +
    'one filled to a half and one to 1 and a half, and a weighing scale with mangoes. Flags hang across the sky, tents and a big wheel stand behind. Zip waves by the spinner.';

  const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" class="art" data-art="' + ID +
    '" data-view="0 0 800 500" data-safe="180,60,440,400" data-band="300,384" role="img" aria-label="' + label +
    '" fill="none" stroke-linejoin="round" stroke-linecap="round"><style>' + css + '</style>' + defs +
    '<g data-layer="sky">' + sky + '</g>' +
    '<g data-layer="building">' + far + '</g>' +
    '<g data-layer="floor">' + floor + '</g>' +
    '<g data-layer="things">' + things + '</g>' +
    '</svg>';

  window.T_ART = window.T_ART || {};
  window.T_ART[ID] = svg;
})();
