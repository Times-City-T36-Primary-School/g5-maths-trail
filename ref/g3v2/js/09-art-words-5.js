/* 09-art-words-5.js - the Stop 5 word card pictures, in the flat style of 03-art-words.js (viewBox 400 x 300).

   w-array, w-row, w-column                                   Set A: equal rows
   w-times-table, w-product, w-multiplication-square          Set B: times tables
   w-multiple, w-factor, w-factor-pair                        Set C: multiples and factors

   Meaning in colour, the same as the Stop 5 tools (39-tools-times.css): counters are red, a row or a column and a times
   table are teal (the colour of the Times Table Tower), the answer is gold, the arcs of factor pairs have one colour each.
   No word is written in a picture (the Words quiz asks for the word). Reused shapes are drawn by small helpers. */
(function () {
  'use strict';

  const INK = '#2A2F3A';
  const FONT = 'font-family="Arial, Helvetica, sans-serif" font-weight="700"';
  const o = 'stroke="' + INK + '" stroke-width="3"';
  const GOLD = '#F5A623', SOFT = '#FFF1CF', RED = '#E5404A', RED_D = '#A31A22', TEAL = '#0E7682', TEAL_SOFT = '#D3EEF1', TEAL_L = '#17A2B0';
  const ARC = ['#C2252E', '#1F7A4D', '#2F6FD0'];

  function word(id, label, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="art" data-art="' + id +
      '" role="img" aria-label="' + label + '" fill="none" stroke-linejoin="round" stroke-linecap="round">' + body + '</svg>';
  }
  function txt(x, y, size, text, fill, anchor) {
    return '<text x="' + x + '" y="' + y + '" ' + FONT + ' font-size="' + size + '" text-anchor="' + (anchor || 'middle') +
      '" fill="' + (fill || INK) + '">' + text + '</text>';
  }
  // a gold ring round a number (the answer)
  function ring(x, y, rx) { return '<ellipse cx="' + x + '" cy="' + (y - 13) + '" rx="' + (rx || 40) + '" ry="28" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="5"/>'; }
  // a counter, and an array of them (rows x cols, the first one centred at x, y, gap apart)
  function dot(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 15) + '" fill="' + RED + '" stroke="' + RED_D + '" stroke-width="3"/>'; }
  function arr(rows, cols, x, y, gap, r) {
    let s = '';
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) s += dot(x + j * gap, y + i * gap, r);
    return s;
  }
  const arrow = function (d, head) { return '<path d="' + d + '" stroke="' + TEAL + '" stroke-width="5"/><path d="' + head + '" stroke="' + TEAL + '" stroke-width="5"/>'; };
  const lit = function (x, y, w, h) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + Math.min(w, h) / 2 + '" fill="' + TEAL_SOFT + '" stroke="' + TEAL_L + '" stroke-width="4" stroke-dasharray="10 7"/>'; };

  const ART = window.T_ART = window.T_ART || {};

  /* ---------- Set A: equal rows ---------- */
  ART['w-array'] = word('w-array', '3 rows of 4 counters, an array. Under it: 3 × 4.',
    '<path d="M92 66v104" stroke="' + TEAL + '" stroke-width="4"/>' + txt(70, 130, 30, '3', TEAL) +
    '<path d="M130 38h140" stroke="' + TEAL + '" stroke-width="4"/>' + txt(200, 30, 30, '4', TEAL) +
    arr(3, 4, 131, 72, 46) + txt(200, 262, 48, '3 × 4'));

  ART['w-row'] = word('w-row', '2 rows of 5 counters. The top row is lit up, with an arrow going across.',
    lit(78, 88, 244, 56) + arr(2, 5, 104, 116, 48) +
    arrow('M90 60H306', 'M292 48l14 12-14 12'));

  ART['w-column'] = word('w-column', '2 rows of 5 counters, 5 columns. One column is lit up, with an arrow going down.',
    lit(126, 88, 52, 104) + arr(2, 5, 104, 116, 48) +
    arrow('M152 210V262', 'M140 248l12 14 12-14'));

  /* ---------- Set B: times tables ---------- */
  ART['w-times-table'] = word('w-times-table', 'A list: 1 × 6 = 6, 2 × 6 = 12, 3 × 6 = 18, 4 × 6 = 24.',
    '<rect x="70" y="22" width="260" height="256" rx="20" fill="#F7FBFF" stroke="#DCE8F3" stroke-width="3"/>' +
    [[1, 6], [2, 12], [3, 18], [4, 24]].map(function (p, i) {
      const y = 78 + i * 58;
      return txt(178, y, 36, p[0] + ' × 6 =', INK, 'end') + txt(196, y, 36, String(p[1]), TEAL, 'start');
    }).join(''));

  ART['w-product'] = word('w-product', '3 rows of 4 counters. 3 × 4 = 12, with a ring around 12.',
    arr(3, 4, 152, 52, 32, 11) + txt(156, 250, 46, '3 × 4 =') + ring(296, 250, 44) + txt(296, 250, 46, '12'));

  ART['w-multiplication-square'] = word('w-multiplication-square', 'A small multiplication square, 1 to 4. Row 3 and column 4 are lit up and meet at 12.',
    (function () {
      const x0 = 74, y0 = 22, c = 51;
      let s = '<rect x="' + (x0 - 6) + '" y="' + (y0 - 6) + '" width="' + (5 * c + 12) + '" height="' + (5 * c + 12) + '" rx="14" fill="#EEF2F7"/>';
      for (let r = 0; r <= 4; r++) for (let k = 0; k <= 4; k++) {
        const x = x0 + k * c, y = y0 + r * c, head = r === 0 || k === 0;
        const on = r === 3 && k === 4, band = (r === 3 && k > 0 && k < 4) || (k === 4 && r > 0 && r < 3);
        const hl = (r === 0 && k === 4) || (k === 0 && r === 3);
        const fill = on ? GOLD : hl ? TEAL : band ? TEAL_SOFT : head ? '#DDEFF1' : '#FFFFFF';
        s += '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="' + (c - 4) + '" height="' + (c - 4) + '" rx="6" fill="' + fill + '" stroke="#B9C8DA" stroke-width="1.5"/>';
        const t = r === 0 && k === 0 ? '×' : r === 0 ? String(k) : k === 0 ? String(r) : String(r * k);
        s += txt(x + c / 2, y + c / 2 + 9, 25, t, hl ? '#FFFFFF' : on ? '#3A2600' : INK);
      }
      return s;
    })());

  /* ---------- Set C: multiples and factors ---------- */
  ART['w-multiple'] = word('w-multiple', 'Jumps of 4: 4, 8, 12, 16, 20.',
    (function () {
      let s = '';
      [4, 8, 12, 16, 20].forEach(function (v, i) {
        const x = 52 + i * 74;
        if (i < 4) s += '<path d="M' + (x + 10) + ' 150Q' + (x + 37) + ' 96 ' + (x + 64) + ' 150" stroke="' + TEAL + '" stroke-width="4"/><path d="M' + (x + 52) + ' 144l12 6 0-13" stroke="' + TEAL + '" stroke-width="4"/>' +
          txt(x + 37, 108, 22, '+ 4', TEAL);
        s += '<rect x="' + (x - 30) + '" y="162" width="60" height="52" rx="26" fill="#FFFFFF" ' + o + '/>' + txt(x, 199, 30, String(v));
      });
      return s;
    })());

  ART['w-factor'] = word('w-factor', '12 counters shared into 3 equal groups of 4. None are left over. 12 ÷ 3 = 4.',
    [70, 200, 330].map(function (x) {
      return '<circle cx="' + x + '" cy="112" r="56" fill="' + TEAL_SOFT + '" stroke="' + TEAL_L + '" stroke-width="4" stroke-dasharray="10 7"/>' + arr(2, 2, x - 19, 93, 38, 15);
    }).join('') + txt(200, 258, 46, '12 ÷ 3 = 4'));

  ART['w-factor-pair'] = word('w-factor-pair', 'The factors of 12 in a row: 1, 2, 3, 4, 6, 12. Arcs join the pairs: 1 and 12, 2 and 6, 3 and 4.',
    (function () {
      const fs = [1, 2, 3, 4, 6, 12], cw = 62, x0 = 45, base = 196;
      let s = txt(200, 56, 44, '12');
      for (let i = 0; i < 3; i++) {
        const j = 5 - i, x1 = x0 + i * cw, x2 = x0 + j * cw, top = base - 30 - (j - i) * 18;
        s += '<path d="M' + x1 + ' ' + (base - 6) + 'C' + x1 + ' ' + top + ' ' + x2 + ' ' + top + ' ' + x2 + ' ' + (base - 6) + '" stroke="' + ARC[i] + '" stroke-width="' + (i === 1 ? 7 : 4) + '"/>';
      }
      fs.forEach(function (v, i) {
        const x = x0 + i * cw;
        s += '<rect x="' + (x - 27) + '" y="' + base + '" width="54" height="50" rx="25" fill="' + (v === 2 || v === 6 ? SOFT : '#FFFFFF') + '" stroke="' + (v === 2 || v === 6 ? GOLD : INK) + '" stroke-width="3"/>' + txt(x, base + 35, 28, String(v));
      });
      return s;
    })());
})();
