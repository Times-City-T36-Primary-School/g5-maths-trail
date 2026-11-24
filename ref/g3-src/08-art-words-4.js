/* 08-art-words-4.js - the Stop 4 word card pictures, in the flat style of 03-art-words.js (viewBox 400 x 300).

   w-sum, w-difference, w-column-method            Set A: add and subtract
   w-estimate, w-inverse, w-equal                  Set B: check your answer
   w-pair, w-odd-number, w-even-number             Set C: odd and even

   Meaning in colour, the same as the Stop 4 tools (39-tools-sums.css): a bar model's parts are amber and green under a
   lilac whole, the part to find and the answer are gold, adding is green and taking away orange, counters are red and
   blue, the one left over has a gold dashed ring. No word is written in a picture (the Words quiz asks for the word);
   numbers use the true minus sign (−). */
(function () {
  'use strict';

  const INK = '#2A2F3A';
  const FONT = 'font-family="Arial, Helvetica, sans-serif" font-weight="700"';
  const o = 'stroke="' + INK + '" stroke-width="3"';
  const GOLD = '#F5A623', GOLD_EDGE = '#A66A06', SOFT = '#FFF1CF', LILAC = '#E8E1FB', AMBER = '#FFE9B8', MINT = '#D8F0DD';
  const ADD = '#1E9E6A', TAKE = '#D9730D', RED = '#E5404A', RED_D = '#A31A22', BLUE = '#2F7FD4', BLUE_D = '#1D62AE';
  const M = '−';

  function word(id, label, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="art" data-art="' + id +
      '" role="img" aria-label="' + label + '" fill="none" stroke-linejoin="round" stroke-linecap="round">' + body + '</svg>';
  }
  function txt(x, y, size, text, fill, anchor) {
    return '<text x="' + x + '" y="' + y + '" ' + FONT + ' font-size="' + size + '" text-anchor="' + (anchor || 'middle') +
      '" fill="' + (fill || INK) + '">' + text + '</text>';
  }
  function box(x, y, w, h, fill, label, extra) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + fill + '" ' + (extra || o) + '/>' +
      (label != null ? txt(x + w / 2, y + h / 2 + 11, 30, label) : '');
  }
  // a gold ring round a number (the answer)
  function ring(x, y, rx) { return '<ellipse cx="' + x + '" cy="' + (y - 11) + '" rx="' + (rx || 38) + '" ry="26" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="5"/>'; }
  // a counter
  function dot(x, y, col) {
    const f = col === 'b' ? BLUE : RED, s = col === 'b' ? BLUE_D : RED_D;
    return '<circle cx="' + x + '" cy="' + y + '" r="15" fill="' + f + '" stroke="' + s + '" stroke-width="3"/>';
  }
  // n counters in pairs (columns of 2) from x, rows at y and y + 40; the one left over gets a gold dashed ring
  function pairs(n, x, y, gap, rings, col) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const c = Math.floor(i / 2), r = i % 2, cx = x + c * gap, cy = y + r * 40;
      s += dot(cx, cy, col);
      if (i === n - 1 && n % 2) s += '<circle cx="' + cx + '" cy="' + cy + '" r="23" stroke="' + GOLD_EDGE + '" stroke-width="3.5" stroke-dasharray="7 6"/>';
    }
    if (rings) for (let c = 0; c < Math.floor(n / 2); c++) s += '<rect x="' + (x + c * gap - 23) + '" y="' + (y - 23) + '" width="46" height="86" rx="23" stroke="' + ADD + '" stroke-width="3" stroke-dasharray="8 6"/>';
    return s;
  }

  const ART = window.T_ART = window.T_ART || {};

  /* ---------- Set A: add and subtract ---------- */
  ART['w-sum'] = word('w-sum', 'A bar of 50. Under it, a bar of 20 and a bar of 30. 20 + 30 = 50.',
    box(50, 36, 300, 58, LILAC, '50') + box(50, 104, 120, 58, AMBER, '20') + box(176, 104, 174, 58, MINT, '30') +
    txt(150, 250, 40, '20 + 30 =') + ring(290, 250) + txt(290, 250, 40, '50'));

  ART['w-difference'] = word('w-difference', 'A bar of 50 and a bar of 20 under it. The gap between them is 30. 50 ' + M + ' 20 = 30.',
    box(50, 36, 300, 58, LILAC, '50') + box(50, 104, 120, 58, AMBER, '20') +
    '<rect x="176" y="104" width="174" height="58" rx="8" fill="' + SOFT + '" stroke="' + GOLD_EDGE + '" stroke-width="3" stroke-dasharray="9 7"/>' + txt(263, 144, 30, '30', GOLD_EDGE) +
    txt(150, 250, 40, '50 ' + M + ' 20 =') + ring(290, 250) + txt(290, 250, 40, '30'));

  (function () {
    // squared paper with 245 + 132 in columns, ones under ones, and the answer 377
    let grid = '';
    for (let x = 100; x <= 300; x += 25) grid += 'M' + x + ' 30V270';
    for (let y = 30; y <= 270; y += 25) grid += 'M100 ' + y + 'H300';
    const col = function (y, ds, fill) { return ds.map(function (d, i) { return txt(187 + i * 50, y, 44, d, fill); }).join(''); };
    ART['w-column-method'] = word('w-column-method', 'Squared paper: 245 and 132 in columns, ones under ones, tens under tens. The answer under the line is 377.',
      '<rect x="100" y="30" width="200" height="240" rx="10" fill="#FFFFFF" stroke="#C8D5E6" stroke-width="3"/><path d="' + grid + '" stroke="#E3EBF6" stroke-width="1.5"/>' +
      '<rect x="270" y="38" width="24" height="210" rx="10" fill="' + SOFT + '"/>' +
      col(92, ['2', '4', '5']) + txt(135, 160, 44, '+') + col(160, ['1', '3', '2']) +
      '<path d="M122 186H296" stroke="' + INK + '" stroke-width="5"/>' + col(240, ['3', '7', '7'], ADD));
  })();

  /* ---------- Set B: check your answer ---------- */
  ART['w-estimate'] = word('w-estimate', '297 + 412. Round each number: 300 + 400 = 700. The exact answer is close to 700.',
    txt(200, 74, 44, '297 + 412') +
    '<path d="M150 96v46M250 96v46" stroke="' + TAKE + '" stroke-width="5"/><path d="M140 130l10 14 10-14M240 130l10 14 10-14" stroke="' + TAKE + '" stroke-width="5"/>' +
    '<rect x="40" y="160" width="320" height="110" rx="20" fill="#F7FBFF" stroke="#DCE8F3" stroke-width="3"/>' +
    txt(160, 232, 44, '300 + 400 =') + ring(316, 232, 46) + txt(316, 232, 44, '700'));

  ART['w-inverse'] = word('w-inverse', 'From 30, add 20 to get 50. From 50, take away 20 to get 30 again.',
    box(40, 116, 100, 70, '#FFFFFF', '30') + box(260, 116, 100, 70, '#FFFFFF', '50') +
    '<path d="M96 108Q200 18 304 108" stroke="' + ADD + '" stroke-width="6"/><path d="M286 96l18 12-2-22" stroke="' + ADD + '" stroke-width="6"/>' +
    '<rect x="160" y="34" width="80" height="44" rx="22" fill="' + ADD + '"/>' + txt(200, 66, 28, '+ 20', '#FFFFFF') +
    '<path d="M304 194Q200 284 96 194" stroke="' + TAKE + '" stroke-width="6"/><path d="M114 206l-18-12 2 22" stroke="' + TAKE + '" stroke-width="6"/>' +
    '<rect x="160" y="222" width="80" height="44" rx="22" fill="' + TAKE + '"/>' + txt(200, 254, 28, M + ' 20', '#FFFFFF'));

  ART['w-equal'] = word('w-equal', 'A level balance. On one side 15 and 25, on the other side 40. Both sides are the same.',
    '<path d="M200 270V92" stroke="' + INK + '" stroke-width="7"/><path d="M146 274h108" stroke="' + INK + '" stroke-width="9"/>' +
    '<path d="M70 92H330" stroke="#6E52C8" stroke-width="10"/><circle cx="200" cy="92" r="11" fill="' + GOLD + '" ' + o + '/>' +
    '<path d="M70 92L28 170M70 92l42 78M330 92l-42 78M330 92l42 78" stroke="#5F656D" stroke-width="3"/>' +
    '<path d="M18 170h104l-12 16H30z" fill="#DCD2F7" ' + o + '/><path d="M278 170h104l-12 16h-80z" fill="#DCD2F7" ' + o + '/>' +
    box(22, 126, 46, 42, '#FFFFFF', null) + txt(45, 158, 26, '15') + box(72, 126, 46, 42, '#FFFFFF', null) + txt(95, 158, 26, '25') +
    box(302, 126, 56, 42, '#FFFFFF', null) + txt(330, 158, 26, '40') +
    txt(200, 60, 52, '=', ADD));

  /* ---------- Set C: odd and even ---------- */
  ART['w-pair'] = word('w-pair', '8 counters in 4 pairs. Each pair has a ring around it.',
    pairs(8, 110, 120, 60, true));

  ART['w-odd-number'] = word('w-odd-number', '7 counters in pairs: 3 pairs and 1 left over. The number 7.',
    txt(60, 168, 84, '7') + pairs(7, 160, 110, 58, true));

  ART['w-even-number'] = word('w-even-number', '6 counters in pairs: 3 pairs and none left over. The number 6.',
    txt(60, 168, 84, '6') + pairs(6, 170, 110, 70, true, 'b'));
})();
