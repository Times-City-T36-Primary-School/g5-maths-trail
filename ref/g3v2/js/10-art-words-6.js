/* 10-art-words-6.js - the Stop 6 word card pictures, in the flat style of 03-art-words.js (viewBox 400 x 300).

   w-lots-of, w-partition, w-grid-method                      Set A: multiply
   w-share, w-equal-groups, w-remainder                       Set B: share equally
   w-left-over, w-exact, w-sensible                           Set C: stories and checks

   Meaning in colour, the same as the Stop 6 tools (39-tools-share.css): counters are red, what is left over is gold
   (the remainder), the parts of a number wear the place colours (hundreds green, tens blue, ones amber), the grid's
   multiplier is harbour blue. No word is written in a picture (the Words quiz asks for the word). Reused shapes are drawn
   by small helpers. */
(function () {
  'use strict';

  const INK = '#2A2F3A';
  const FONT = 'font-family="Arial, Helvetica, sans-serif" font-weight="700"';
  const GOLD = '#F5A623', SOFT = '#FFF1CF', RED = '#E5404A', RED_D = '#A31A22', BLUE = '#1F5CA0', BLUE_SOFT = '#D5E6F8';
  const PL = { h: ['#1E9E6A', '#147A51'], t: ['#2F7FD4', '#1D62AE'], o: ['#E89B12', '#8A5800'] };
  const GO = '#1E7A4C', NO = '#C2252E';

  function word(id, label, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="art" data-art="' + id +
      '" role="img" aria-label="' + label + '" fill="none" stroke-linejoin="round" stroke-linecap="round">' + body + '</svg>';
  }
  function txt(x, y, size, text, fill, anchor) {
    return '<text x="' + x + '" y="' + y + '" ' + FONT + ' font-size="' + size + '" text-anchor="' + (anchor || 'middle') +
      '" fill="' + (fill || INK) + '">' + text + '</text>';
  }
  function dot(x, y, r, gold) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 12) + '" fill="' + (gold ? GOLD : RED) + '" stroke="' + (gold ? '#A86A00' : RED_D) + '" stroke-width="3"/>';
  }
  // n counters in a small grid of cols across, centred at x, y
  function dots(n, cols, x, y, gap, r, gold) {
    let s = '';
    const rows = Math.ceil(n / cols);
    for (let i = 0; i < n; i++) s += dot(x - (cols - 1) * gap / 2 + (i % cols) * gap, y - (rows - 1) * gap / 2 + Math.floor(i / cols) * gap, r, gold);
    return s;
  }
  // a plate (an ellipse) centred at x, y
  function plate(x, y, rx) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (rx || 52) + '" ry="' + Math.round((rx || 52) * 0.68) + '" fill="#FFFFFF" stroke="#8796AC" stroke-width="3"/>'; }
  // a box with a number in a place colour
  function chip(x, y, w, v, p) { return '<rect x="' + (x - w / 2) + '" y="' + (y - 26) + '" width="' + w + '" height="44" rx="10" fill="' + PL[p][0] + '" stroke="' + PL[p][1] + '" stroke-width="3"/>' + txt(x, y + 6, 28, v, p === 'o' ? '#3A2600' : '#FFFFFF'); }
  const tick = function (x, y) { return '<path d="M' + (x - 14) + ' ' + y + 'l10 11 20-24" stroke="' + GO + '" stroke-width="7"/>'; };
  const cross = function (x, y) { return '<path d="M' + (x - 12) + ' ' + (y - 12) + 'l24 24M' + (x + 12) + ' ' + (y - 12) + 'l-24 24" stroke="' + NO + '" stroke-width="7"/>'; };

  const ART = window.T_ART = window.T_ART || {};

  /* ---------- Set A: multiply ---------- */
  // 3 lots of the same blocks: 1 hundred, 2 tens and 4 ones each
  const lot = function (x) {
    let s = '<rect x="' + x + '" y="60" width="56" height="56" rx="4" fill="' + PL.h[0] + '" stroke="' + PL.h[1] + '" stroke-width="3"/>' +
      '<path d="M' + x + ' 88h56M' + (x + 28) + ' 60v56" stroke="#FFFFFF" stroke-width="2" opacity=".6"/>';
    for (let i = 0; i < 2; i++) s += '<rect x="' + (x + 66 + i * 14) + '" y="60" width="10" height="56" rx="3" fill="' + PL.t[0] + '" stroke="' + PL.t[1] + '" stroke-width="2.5"/>';
    for (let i = 0; i < 4; i++) s += '<rect x="' + (x + 8 + (i % 2) * 16) + '" y="' + (126 + Math.floor(i / 2) * 16) + '" width="11" height="11" rx="2" fill="' + PL.o[0] + '" stroke="' + PL.o[1] + '" stroke-width="2.5"/>';
    return '<rect x="' + (x - 10) + '" y="48" width="114" height="124" rx="14" fill="#F7FBFF" stroke="#DCE8F3" stroke-width="3"/>' + s;
  };
  ART['w-lots-of'] = word('w-lots-of', '3 equal groups of blocks, each 124: 1 hundred, 2 tens and 4 ones. Under them: 3 × 124.',
    lot(22) + lot(146) + lot(270) + txt(200, 248, 48, '3 × 124'));

  ART['w-partition'] = word('w-partition', 'The number 124 splits into 100, 20 and 4, with arrows.',
    txt(200, 74, 56, '124') + '<path d="M176 92L100 168M200 94V166M224 92L300 168" stroke="' + INK + '" stroke-width="4"/>' +
    '<path d="M100 168l2-16M100 168l15-6M200 166l-8-12M200 166l8-12M300 168l-15-6M300 168l-2-16" stroke="' + INK + '" stroke-width="4"/>' +
    chip(100, 214, 88, '100', 'h') + chip(200, 214, 70, '20', 't') + chip(300, 214, 60, '4', 'o'));

  // the grid: × and the parts on top, the multiplier at the side, the products below
  const cell = function (x, y, w, fill, line, v, col) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="62" rx="6" fill="' + fill + '" stroke="' + line + '" stroke-width="3"/>' + txt(x + w / 2, y + 42, 30, v, col || INK); };
  ART['w-grid-method'] = word('w-grid-method', 'A grid for 3 × 124: 100, 20 and 4 along the top, 3 at the side, and the products 300, 60 and 12.',
    cell(40, 70, 62, '#FFFFFF', INK, '×') + cell(108, 70, 90, PL.h[0], PL.h[1], '100', '#FFFFFF') + cell(204, 70, 80, PL.t[0], PL.t[1], '20', '#FFFFFF') + cell(290, 70, 70, PL.o[0], PL.o[1], '4', '#3A2600') +
    cell(40, 140, 62, BLUE_SOFT, BLUE, '3', '#123C6E') + cell(108, 140, 90, '#FFFFFF', INK, '300') + cell(204, 140, 80, '#FFFFFF', INK, '60') + cell(290, 140, 70, '#FFFFFF', INK, '12') +
    txt(200, 262, 34, '300 + 60 + 12'));

  /* ---------- Set B: share equally ---------- */
  ART['w-share'] = word('w-share', '12 counters shared equally on 3 plates: 4 on each plate.',
    '<path d="M200 40v40M200 80l-110 50M200 80l110 50M200 80v50" stroke="#8796AC" stroke-width="4" stroke-dasharray="2 10"/>' +
    '<circle cx="200" cy="40" r="18" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="4"/>' + txt(200, 50, 26, '12') +
    plate(82, 196) + dots(4, 2, 82, 196, 28) + plate(200, 196) + dots(4, 2, 200, 196, 28) + plate(318, 196) + dots(4, 2, 318, 196, 28));

  const ring = function (x, y) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="60" ry="70" fill="#F7FBFF" stroke="' + BLUE + '" stroke-width="4" stroke-dasharray="12 8"/>'; };
  ART['w-equal-groups'] = word('w-equal-groups', '3 groups with 5 counters in each group.',
    ring(78, 130) + dots(5, 2, 78, 130, 30) + ring(200, 130) + dots(5, 2, 200, 130, 30) + ring(322, 130) + dots(5, 2, 322, 130, 30) +
    txt(78, 258, 34, '5', BLUE) + txt(200, 258, 34, '5', BLUE) + txt(322, 258, 34, '5', BLUE));

  // 17 shared on 5 plates: 3 on each, 2 left over (gold, in a dashed box)
  let rem = '';
  for (let i = 0; i < 5; i++) rem += plate(48 + i * 76, 110, 34) + dots(3, 3, 48 + i * 76, 110, 18, 8);
  ART['w-remainder'] = word('w-remainder', '17 counters on 5 plates: 3 on each plate, and 2 left over in a dashed box.',
    rem + '<rect x="146" y="164" width="108" height="64" rx="12" fill="#FFF8E6" stroke="#A86A00" stroke-width="3" stroke-dasharray="9 6"/>' +
    dot(180, 196, 13, true) + dot(220, 196, 13, true) + txt(200, 280, 40, '17 ÷ 5'));

  /* ---------- Set C: stories and checks ---------- */
  // two full egg boxes of 6, and 2 eggs outside
  const eggBox = function (x) {
    let s = '<rect x="' + x + '" y="70" width="150" height="100" rx="14" fill="#C9D9E8" stroke="#5C7590" stroke-width="3"/>';
    for (let i = 0; i < 6; i++) s += '<ellipse cx="' + (x + 28 + (i % 3) * 47) + '" cy="' + (98 + Math.floor(i / 3) * 44) + '" rx="16" ry="20" fill="#FFF6E6" stroke="#B08A5A" stroke-width="3"/>';
    return s;
  };
  ART['w-left-over'] = word('w-left-over', '14 eggs: 2 full boxes of 6 eggs, and 2 eggs outside the boxes.',
    eggBox(30) + eggBox(220) + '<ellipse cx="200" cy="240" rx="72" ry="40" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="4" stroke-dasharray="10 7"/>' +
    '<ellipse cx="176" cy="240" rx="16" ry="20" fill="#FFF6E6" stroke="#B08A5A" stroke-width="3"/><ellipse cx="224" cy="240" rx="16" ry="20" fill="#FFF6E6" stroke="#B08A5A" stroke-width="3"/>');

  ART['w-exact'] = word('w-exact', '4 × 298. A dashed card says about 1,200. A solid card with a gold ring says 1,192.',
    txt(200, 64, 44, '4 × 298') +
    '<rect x="34" y="108" width="150" height="84" rx="14" fill="#F7FBFF" stroke="#8796AC" stroke-width="3" stroke-dasharray="10 8"/>' + txt(109, 164, 36, '≈ 1,200', '#5C6472') +
    '<rect x="216" y="102" width="156" height="96" rx="16" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="5"/>' + txt(294, 164, 40, '1,192') +
    tick(294, 246));

  ART['w-sensible'] = word('w-sensible', '3 × 124 is about 300. The answer 372 has a green tick. The answer 3,720 has a red cross.',
    txt(200, 60, 44, '3 × 124') + txt(200, 104, 28, '≈ 300', '#5C6472') +
    '<rect x="40" y="136" width="140" height="76" rx="14" fill="#E3F4EA" stroke="' + GO + '" stroke-width="4"/>' + txt(110, 186, 38, '372') + tick(110, 252) +
    '<rect x="220" y="136" width="140" height="76" rx="14" fill="#FBE4E6" stroke="' + NO + '" stroke-width="4"/>' + txt(290, 186, 38, '3,720') + cross(290, 252));
})();
