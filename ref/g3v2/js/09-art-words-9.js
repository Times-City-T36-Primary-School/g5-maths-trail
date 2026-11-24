/* 09-art-words-9.js - the Stop 9 word card pictures (viewBox 400 x 300), flat like 03-art-words.js. Set A: w-impossible,
   w-maybe, w-certain; B: w-likely, w-spinner, w-tally; C: w-scale, w-litre, w-kilogram. Counters and spinner parts have
   their colour and sign, as in 39-tools-chance.js. No word is written in a picture (the Words quiz asks for the word). */
(function () {
  'use strict';

  const INK = '#2A2F3A';
  const FONT = 'font-family="Arial, Helvetica, sans-serif" font-weight="700"';
  const GOLD = '#F5A623', SOFT = '#FFF1CF';
  const COL = { green: ['#2E9E4F', '#1B6A33', '#FFFFFF', 'M0-5.4L5.2 3.8H-5.2Z'], blue: ['#2F6FD0', '#1C4A94', '#FFFFFF', 'M-3.7-3.7h7.4v7.4h-7.4z'],
    red: ['#E0453A', '#9E2219', '#FFFFFF', 'M-3.4 0a3.4 3.4 0 1 0 6.8 0a3.4 3.4 0 1 0-6.8 0'],
    orange: ['#F28A1E', '#A85A08', '#4A2600', 'M-1.5-5.2h3v3.7h3.7v3H1.5v3.7h-3V1.5h-3.7v-3h3.7z'],
    pink: ['#F27DB4', '#A83A6E', '#5C1238', 'M0 5C-4 2-5.6.3-5.6-1.8c0-1.9 1.4-3.2 3-3.2 1.2 0 2.1.6 2.6 1.6.5-1 1.4-1.6 2.6-1.6 1.6 0 3 1.3 3 3.2C5.6.3 4 2 0 5z'],
    purple: ['#8A4FD3', '#5A2E99', '#FFFFFF', 'M0-5.8L4.6 0 0 5.8-4.6 0z'] };

  function word(id, label, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="art" data-art="' + id +
      '" role="img" aria-label="' + label + '" fill="none" stroke-linejoin="round" stroke-linecap="round">' + body + '</svg>';
  }
  function txt(x, y, size, text, fill, anchor) {
    return '<text x="' + x + '" y="' + y + '" ' + FONT + ' font-size="' + size + '" text-anchor="' + (anchor || 'middle') + '" fill="' + (fill || INK) + '">' + text + '</text>';
  }
  function counter(c, x, y, r) {
    const k = COL[c];
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + r / 10 + ')"><circle r="9.2" fill="' + k[0] + '" stroke="' + k[1] + '" stroke-width="1.6"/><path d="' + k[3] + '" fill="' + k[2] + '"/></g>';
  }
  function bag(x, y, list) {
    let s = '<ellipse cx="' + x + '" cy="' + (y - 4) + '" rx="78" ry="19" fill="#5B2149"/>';
    list.forEach(function (row, i) {
      row.forEach(function (c, j) { s += counter(c, x - (row.length - 1) * 16 + j * 32 + (i % 2) * 8, y - 8 - i * 24, 15); });
    });
    return s + '<path d="M' + (x - 80) + ' ' + y + 'C' + (x - 98) + ' ' + (y + 60) + ' ' + (x - 86) + ' ' + (y + 112) + ' ' + x + ' ' + (y + 114) + 'C' + (x + 86) + ' ' + (y + 112) + ' ' + (x + 98) + ' ' + (y + 60) + ' ' + (x + 80) + ' ' + y +
      'Q' + x + ' ' + (y + 28) + ' ' + (x - 80) + ' ' + y + 'Z" fill="#C8559F" stroke="#7E2E63" stroke-width="4"/>' +
      '<path d="M' + (x - 82) + ' ' + (y - 2) + 'Q' + x + ' ' + (y + 28) + ' ' + (x + 82) + ' ' + (y - 2) + '" stroke="#7E2E63" stroke-width="8"/>';
  }
  function spinner(cx, cy, R, parts) {
    const n = parts.length, pt = function (a) { return (cx + R * Math.cos(a)).toFixed(1) + ' ' + (cy + R * Math.sin(a)).toFixed(1); };
    let s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + (R + 9) + '" fill="#2A3550"/>';
    parts.forEach(function (c, i) {
      const a0 = i / n * 2 * Math.PI - Math.PI / 2, a1 = (i + 1) / n * 2 * Math.PI - Math.PI / 2, am = (a0 + a1) / 2, k = COL[c];
      s += '<path d="M' + cx + ' ' + cy + 'L' + pt(a0) + 'A' + R + ' ' + R + ' 0 0 1 ' + pt(a1) + 'Z" fill="' + k[0] + '" stroke="#FFFFFF" stroke-width="3"/>' +
        '<path transform="translate(' + (cx + R * 0.58 * Math.cos(am)).toFixed(1) + ' ' + (cy + R * 0.58 * Math.sin(am)).toFixed(1) + ') scale(' + (R / 40).toFixed(2) + ')" d="' + k[3] + '" fill="' + k[2] + '"/>';
    });
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="10" fill="#2A3550"/><path d="M' + cx + ' ' + (cy - R + 14) + 'l-13-30h26z" fill="#E0453A" stroke="#FFFFFF" stroke-width="3"/>';
  }
  const tick = function (x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="30" fill="#E3F5E8" stroke="#2E9E4F" stroke-width="5"/><path d="M' + (x - 14) + ' ' + y + 'l9 10 19-21" stroke="#1B6A33" stroke-width="7"/>'; };
  const cross = function (x, y) { return '<path d="M' + (x - 30) + ' ' + (y - 30) + 'l60 60M' + (x + 30) + ' ' + (y - 30) + 'l-60 60" stroke="#C8323F" stroke-width="10"/>'; };
  const ring = function (x, y, rx) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (rx || 26) + '" ry="22" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="5"/>'; };

  const ART = window.T_ART = window.T_ART || {};
  const B = 'blue', G = 'green';

  /* ---------- Set A: will it happen? ---------- */
  ART['w-impossible'] = word('w-impossible', 'A bag with only blue counters. Next to it a red counter with a big red cross over it.',
    bag(140, 140, [[B, B, B, B], [B, B, B]]) + '<path d="M232 150h40" stroke="' + INK + '" stroke-width="5"/><path d="M264 140l12 10-12 10" stroke="' + INK + '" stroke-width="5"/>' +
    counter('red', 320, 150, 34) + cross(320, 150));

  ART['w-maybe'] = word('w-maybe', 'A spinner: half of it is pink and half is blue. Next to it a big question mark.',
    spinner(160, 160, 100, ['pink', B, 'pink', B]) +
    '<circle cx="330" cy="120" r="44" fill="#FCE4F0" stroke="#A83A6E" stroke-width="5"/>' + txt(330, 142, 62, '?', '#A83A6E'));

  ART['w-certain'] = word('w-certain', 'A bag with only green counters. Next to it a green counter with a green tick.',
    bag(140, 140, [[G, G, G, G], [G, G, G]]) + '<path d="M232 150h40" stroke="' + INK + '" stroke-width="5"/><path d="M264 140l12 10-12 10" stroke="' + INK + '" stroke-width="5"/>' +
    counter(G, 320, 150, 34) + tick(352, 110));

  /* ---------- Set B: chance experiments ---------- */
  ART['w-likely'] = word('w-likely', 'A spinner with 4 equal parts: 3 are green and 1 is orange. The arrow points at green.',
    spinner(170, 160, 104, [G, G, 'orange', G]) + counter(G, 330, 150, 26) + '<path d="M306 196h48" stroke="' + INK + '" stroke-width="4"/>' + txt(330, 232, 30, '3 of 4'));

  ART['w-spinner'] = word('w-spinner', 'A spinner with 4 equal parts, green, purple, orange and pink, and curved arrows that show it turning.',
    spinner(200, 158, 100, [G, 'purple', 'orange', 'pink']) +
    '<path d="M70 120A140 140 0 0 1 120 46" stroke="' + INK + '" stroke-width="5"/><path d="M108 40l16 4-6 15" stroke="' + INK + '" stroke-width="5"/>' +
    '<path d="M330 196A140 140 0 0 1 280 270" stroke="' + INK + '" stroke-width="5"/><path d="M292 276l-16-4 6-15" stroke="' + INK + '" stroke-width="5"/>');

  let marks = '';
  for (let j = 0; j < 4; j++) marks += '<path d="M' + (130 + j * 22) + ' 100v80"/>';
  marks += '<path d="M118 164L216 112"/>';
  for (let j = 0; j < 2; j++) marks += '<path d="M' + (250 + j * 22) + ' 100v80"/>';
  ART['w-tally'] = word('w-tally', 'Tally marks: four lines with one line across them make a group of 5, then 2 more lines. Under them: 7.',
    '<rect x="40" y="70" width="320" height="140" rx="18" fill="#F7FBFF" stroke="#DCE8F3" stroke-width="4"/>' + counter(G, 78, 140, 22) +
    '<g stroke="' + INK + '" stroke-width="8">' + marks + '</g>' + ring(200, 248, 34) + txt(200, 262, 40, '7'));

  /* ---------- Set C: scales ---------- */
  let sc = '';
  for (let i = 0; i <= 4; i++) { const x = 60 + i * 70, major = i % 2 === 0; sc += '<path d="M' + x + ' 150v' + (major ? 40 : 24) + '" stroke="#10305E" stroke-width="' + (major ? 6 : 4) + '"/>'; if (major) sc += txt(x, 232, 34, String(i / 2), '#10305E'); }
  ART['w-scale'] = word('w-scale', 'A scale with the numbers 0, 1 and 2 and a small mark halfway between each. A red arrow points at the mark after 1.',
    '<rect x="30" y="130" width="340" height="120" rx="16" fill="#FFF7DF" stroke="#C9A24B" stroke-width="4"/>' + sc +
    '<path d="M270 146l-16-30h9V66h14v50h9z" fill="#E0453A" stroke="#FFFFFF" stroke-width="3"/>');

  let jm = '';
  [1, 2, 3, 4].forEach(function (i) { const y = 240 - i * 40; jm += '<path d="M130 ' + y + 'h' + (i % 2 ? 24 : 44) + '" stroke="#10305E" stroke-width="' + (i % 2 ? 4 : 6) + '"/>'; if (!(i % 2)) jm += txt(112, y + 11, 30, String(i / 2), '#10305E', 'end'); });
  ART['w-litre'] = word('w-litre', 'A measuring jug with the numbers 1 and 2. The water comes up to the 1.',
    '<path d="M270 100c62 0 62 104 0 104" stroke="#9FB6DE" stroke-width="16"/>' +
    '<path d="M130 160h140v68q0 14-14 14h-112q-14 0-14-14z" fill="#58AEF2"/>' +
    '<path d="M130 60h140v168q0 14-14 14h-112q-14 0-14-14z" stroke="#2A3550" stroke-width="6"/><path d="M128 60l-18-14" stroke="#2A3550" stroke-width="6"/>' + jm +
    '<ellipse cx="102" cy="160" rx="24" ry="22" stroke="' + GOLD + '" stroke-width="5"/>');

  let km = '';
  for (let i = 0; i <= 6; i++) { const x = 90 + i * 37, major = i % 2 === 0; km += '<path d="M' + x + ' 196v' + (major ? 22 : 13) + '" stroke="#10305E" stroke-width="' + (major ? 5 : 3.5) + '"/>'; if (major) km += txt(x, 252, 24, String(i / 2), '#10305E'); }
  ART['w-kilogram'] = word('w-kilogram', 'A weighing scale with a melon on it. The scale shows 0, 1, 2 and 3, and the arrow points at 2.',
    '<ellipse cx="200" cy="92" rx="66" ry="50" fill="#6FBF5A" stroke="#2F7A2A" stroke-width="5"/><path d="M160 70q40 20 80 0M150 96q50 22 100 0" stroke="#2F7A2A" stroke-width="4"/>' +
    '<path d="M90 140H310L294 156H106Z" fill="#B9C6DA" stroke="#55657F" stroke-width="5"/>' +
    '<rect x="50" y="160" width="300" height="120" rx="22" fill="#D45BA6" stroke="#7E2E63" stroke-width="5"/><rect x="68" y="174" width="264" height="94" rx="12" fill="#FFF7DF" stroke="#7E2E63" stroke-width="3"/>' + km +
    '<path d="M238 194l-12-20h7v-12h10v12h7z" fill="#E0453A"/>');
})();
