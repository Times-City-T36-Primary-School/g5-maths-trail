/* 10-art-words-8.js - the Stop 8 word card pictures, in the flat style of 03-art-words.js (viewBox 400 x 300).

   w-hour-hand, w-minute-hand, w-quarter-to          Set A: clock hands
   w-am, w-pm, w-24-hour-clock                       Set B: morning and afternoon
   w-timetable, w-time-interval, w-midnight          Set C: how long?

   Meaning in colour, the same as the Stop 8 tools (39-tools-time.css): the short (hour) hand is blue, the long (minute)
   hand is red, the part of the clock that is counted is gold, a digital clock is a dark screen with mint digits, a
   timetable has a steel blue head. No word is written in a picture (the Words quiz asks for the word). */
(function () {
  'use strict';

  const INK = '#2A2F3A';
  const FONT = 'font-family="Arial, Helvetica, sans-serif" font-weight="700"';
  const GOLD = '#F5A623', SOFT = '#FFF1CF', BLUE = '#1F4FA8', RED = '#D22630', STEEL = '#2B4F78', RIM = '#3F6E9E', MINT = '#7CF0C5', SCREEN = '#173B63';

  function word(id, label, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="art" data-art="' + id +
      '" role="img" aria-label="' + label + '" fill="none" stroke-linejoin="round" stroke-linecap="round">' + body + '</svg>';
  }
  function txt(x, y, size, text, fill, anchor) {
    return '<text x="' + x + '" y="' + y + '" ' + FONT + ' font-size="' + size + '" text-anchor="' + (anchor || 'middle') +
      '" fill="' + (fill || INK) + '">' + text + '</text>';
  }
  const pt = function (cx, cy, r, deg) { const a = deg * Math.PI / 180; return [(cx + r * Math.sin(a)).toFixed(1), (cy - r * Math.cos(a)).toFixed(1)]; };
  // a clock face at cx, cy with radius r; h, m the time; o = { dimH, dimM, boldH, boldM, wedge: [fromMin, toMin], nums }
  function clock(cx, cy, r, h, m, o) {
    o = o || {};
    let s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + RIM + '"/><circle cx="' + cx + '" cy="' + cy + '" r="' + (r * .89).toFixed(1) + '" fill="#FFFFFF" stroke="' + STEEL + '" stroke-width="2"/>';
    if (o.wedge) {
      const a = pt(cx, cy, r * .82, o.wedge[0] * 6), b = pt(cx, cy, r * .82, o.wedge[1] * 6);
      s += '<path d="M' + cx + ' ' + cy + 'L' + a[0] + ' ' + a[1] + 'A' + (r * .82).toFixed(1) + ' ' + (r * .82).toFixed(1) + ' 0 0 1 ' + b[0] + ' ' + b[1] + 'Z" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="4"/>';
    }
    for (let i = 0; i < 12; i++) { const a = pt(cx, cy, r * .8, i * 30), b = pt(cx, cy, r * .88, i * 30); s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + INK + '" stroke-width="3"/>'; }
    if (o.nums !== false) for (let n = 1; n <= 12; n++) { const p = pt(cx, cy, r * .64, n * 30); s += txt(p[0], (+p[1] + r * .085).toFixed(1), Math.round(r * .23), String(n), '#10305E'); }
    const hand = function (deg, len, w, col, op) {
      const tip = pt(cx, cy, len, deg), l = pt(cx, cy, w, deg - 90), rr = pt(cx, cy, w, deg + 90), tail = pt(cx, cy, len * .18, deg + 180);
      return '<path d="M' + tip[0] + ' ' + tip[1] + 'L' + l[0] + ' ' + l[1] + 'L' + tail[0] + ' ' + tail[1] + 'L' + rr[0] + ' ' + rr[1] + 'Z" fill="' + col + '" stroke="#FFFFFF" stroke-width="2"' + (op ? ' opacity="' + op + '"' : '') + '/>';
    };
    s += hand((h % 12) * 30 + m * .5, r * .5, o.boldH ? r * .1 : r * .07, BLUE, o.dimH ? .3 : 0);
    s += hand(m * 6, r * .76, o.boldM ? r * .08 : r * .05, RED, o.dimM ? .3 : 0);
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * .07).toFixed(1) + '" fill="' + INK + '"/>';
    return s;
  }
  function screen(x, y, w, h, t, size) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="' + SCREEN + '" stroke="#0E2744" stroke-width="4"/>' + txt(x + w / 2, y + h / 2 + size * .36, size, t, MINT);
  }
  const star = function (x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#FFF4CF"/>'; };

  const ART = window.T_ART = window.T_ART || {};

  /* ---------- Set A: clock hands ---------- */
  ART['w-hour-hand'] = word('w-hour-hand', 'A clock showing 4 o\'clock. The short blue hand points to 4 and has a gold ring at its tip. The long hand is pale.',
    clock(200, 150, 125, 4, 0, { boldH: true, dimM: true }) + (function () { const p = pt(200, 150, 125 * .64, 120); return '<circle cx="' + p[0] + '" cy="' + (+p[1] - 3) + '" r="24" stroke="' + GOLD + '" stroke-width="5"/>'; })());

  ART['w-minute-hand'] = word('w-minute-hand', 'A clock. The long red hand points to 4. Gold numbers 5, 10, 15 and 20 go round the edge from 12 to 4. The short hand is pale.',
    clock(200, 160, 112, 2, 20, { boldM: true, dimH: true, nums: false }) +
    [5, 10, 15, 20].map(function (v, i) { const p = pt(200, 160, 136, (i + 1) * 30); return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="17" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="3"/>' + txt(p[0], (+p[1] + 7).toFixed(1), 18, String(v), '#7B4E00'); }).join('') +
    (function () { const p = pt(200, 160, 136, 0); return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="17" fill="#FFFFFF" stroke="' + INK + '" stroke-width="3"/>' + txt(p[0], (+p[1] + 7).toFixed(1), 18, '0'); })());

  ART['w-quarter-to'] = word('w-quarter-to', 'A clock showing 3:45. The quarter from 9 to 12 is gold: 15 minutes to go until 4 o\'clock.',
    clock(200, 150, 125, 3, 45, { wedge: [45, 60] }) +
    '<path d="M330 70q30 30 10 70" stroke="' + GOLD + '" stroke-width="6"/><path d="M328 128l12 14 10-16" stroke="' + GOLD + '" stroke-width="6"/>' + txt(352, 60, 30, '15', '#7B4E00'));

  /* ---------- Set B: morning and afternoon ---------- */
  ART['w-am'] = word('w-am', 'Morning: the sun rises over green hills, and a clock shows 7 o\'clock.',
    '<rect x="20" y="20" width="360" height="260" rx="26" fill="#FFF4D6"/>' +
    '<circle cx="110" cy="190" r="56" fill="#FFD25A"/>' + [0, 30, 60, 90, 120, 150, 180].map(function (d) { const a = pt(110, 190, 70, d - 90), b = pt(110, 190, 92, d - 90); return '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="#F5A623" stroke-width="7"/>'; }).join('') +
    '<path d="M20 200q90-46 180-6t180-14v80a26 26 0 0 1-26 26H46a26 26 0 0 1-26-26z" fill="#8CCB9C"/>' +
    clock(286, 128, 82, 7, 0));

  ART['w-pm'] = word('w-pm', 'Evening: the moon and stars are out over dark hills, and a clock shows 7 o\'clock.',
    '<rect x="20" y="20" width="360" height="260" rx="26" fill="#22325E"/>' +
    '<path d="M126 70a44 44 0 1 0 22 80 38 38 0 1 1-22-80z" fill="#FFF4CF"/>' + star(60, 60, 4) + star(176, 48, 3) + star(70, 140, 3) + star(196, 110, 4) +
    '<path d="M20 214q90-40 180-6t180-14v60a26 26 0 0 1-26 26H46a26 26 0 0 1-26-26z" fill="#1C4234"/>' +
    clock(286, 128, 82, 7, 0));

  ART['w-24-hour-clock'] = word('w-24-hour-clock', 'A clock showing half past 3 in the afternoon, an equals sign, and a digital clock showing 15:30.',
    clock(104, 150, 84, 3, 30) + txt(206, 166, 48, '=') + screen(236, 108, 150, 84, '15:30', 46));

  /* ---------- Set C: how long? ---------- */
  ART['w-timetable'] = word('w-timetable', 'A train timetable: places down the side, trains A and B across the top, and their times.',
    (function () {
      const rows = [['', 'A', 'B'], ['', '09:05', '11:35'], ['', '09:20', '11:50'], ['', '09:50', '12:20']], x0 = 40, y0 = 50, cw = [96, 112, 112], rh = 50;
      let s = '<rect x="' + x0 + '" y="' + y0 + '" width="320" height="200" rx="14" fill="#FFFFFF" stroke="' + STEEL + '" stroke-width="4"/>' +
        '<path d="M' + x0 + ' ' + (y0 + 14) + 'a14 14 0 0 1 14-14h292a14 14 0 0 1 14 14v36H' + x0 + 'z" fill="' + STEEL + '"/>' +
        '<rect x="' + (x0 + 2) + '" y="' + (y0 + rh) + '" width="' + (cw[0] - 2) + '" height="148" fill="#E3ECF6"/>';
      rows.forEach(function (r, i) {
        let x = x0;
        r.forEach(function (v, j) { if (v) s += txt(x + cw[j] / 2, y0 + i * rh + 34, i ? 26 : 28, v, i ? '#10305E' : '#FFFFFF'); x += cw[j]; });
        if (i > 1) s += '<path d="M' + x0 + ' ' + (y0 + i * rh) + 'h320" stroke="#C9D6E5" stroke-width="2"/>';
      });
      // the places: a little station, a hill, the sea (pictures, not words)
      s += '<rect x="68" y="122" width="40" height="22" rx="3" fill="#C98E52"/><path d="M64 124l24-14 24 14z" fill="' + RIM + '"/>' +
        '<path d="M60 194l18-22 14 12 12-10 14 20z" fill="#5DB56F"/>' +
        '<path d="M58 238q8-8 16 0t16 0 16 0 16 0" stroke="#3B8ED0" stroke-width="5"/>';
      [136, 248].forEach(function (x) { s += '<path d="M' + x + ' ' + (y0) + 'v200" stroke="#C9D6E5" stroke-width="2"/>'; });
      return s;
    })());

  ART['w-time-interval'] = word('w-time-interval', 'A time line from 09:40 to 11:25. A big gold jump between them shows how long: 1 h 45 min.',
    '<path d="M30 200h340" stroke="' + INK + '" stroke-width="4"/>' +
    '<rect x="22" y="178" width="96" height="46" rx="23" fill="#FFFFFF" stroke="' + STEEL + '" stroke-width="4"/>' + txt(70, 210, 26, '09:40', '#10305E') +
    '<rect x="282" y="178" width="96" height="46" rx="23" fill="#FFFFFF" stroke="' + STEEL + '" stroke-width="4"/>' + txt(330, 210, 26, '11:25', '#10305E') +
    '<path d="M76 170Q200 30 324 170" stroke="' + GOLD + '" stroke-width="7"/><path d="M304 160l20 12 2-24" stroke="' + GOLD + '" stroke-width="7"/>' +
    '<rect x="128" y="62" width="144" height="46" rx="23" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="4"/>' + txt(200, 94, 26, '1 h 45 min', '#7B4E00'));

  ART['w-midnight'] = word('w-midnight', 'Night: the moon and stars, a clock with both hands on 12, and a digital clock showing 00:00.',
    '<rect x="20" y="20" width="360" height="260" rx="26" fill="#1B2A4E"/>' +
    '<path d="M352 44a30 30 0 1 0 14 54 26 26 0 1 1-14-54z" fill="#FFF4CF"/>' + star(250, 46, 3) + star(300, 120, 4) + star(46, 260, 3) + star(214, 254, 3) +
    clock(124, 150, 96, 12, 0) + screen(236, 168, 130, 72, '00:00', 40));
})();
