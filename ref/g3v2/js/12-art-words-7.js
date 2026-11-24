/* 12-art-words-7.js - the Stop 7 word card pictures, in the flat style of 03-art-words.js (viewBox 400 x 300).

   w-whole, w-equal-parts, w-fraction                        Set A: equal parts
   w-numerator, w-denominator, w-unit-fraction               Set B: top and bottom
   w-half, w-third, w-quarter                                Set C: halves, thirds, quarters

   Meaning in colour, the same as the Stop 7 tools (39-tools-fractions.css): a strip or a shape cut into equal parts is
   pale lime, the parts you take are orange, a number that matters has a gold ring, arrows are lime green (the colour of
   the Fraction Garden). Fractions are written as on paper: the top number over a line over the bottom number.
   No word is written in a picture (the Words quiz asks for the word). Reused shapes are drawn by small helpers. */
(function () {
  'use strict';

  const INK = '#2A2F3A';
  const FONT = 'font-family="Arial, Helvetica, sans-serif" font-weight="700"';
  const GOLD = '#F5A623', SOFT = '#FFF1CF', ORANGE = '#F28B30', PART = '#F3F8E4', LIME = '#66861A';

  function word(id, label, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="art" data-art="' + id +
      '" role="img" aria-label="' + label + '" fill="none" stroke-linejoin="round" stroke-linecap="round">' + body + '</svg>';
  }
  function txt(x, y, size, text, fill) {
    return '<text x="' + x + '" y="' + y + '" ' + FONT + ' font-size="' + size + '" text-anchor="middle" fill="' + (fill || INK) + '">' + text + '</text>';
  }
  // a fraction written as on paper, centred at x; y is the fraction line. ring: 'top' | 'bottom' (a gold ring round it)
  function frac(x, y, n, d, size, ring) {
    const s = size || 44, w = Math.max(String(n).length, String(d).length) * s * 0.62 + 14;
    let out = '';
    if (ring === 'top') out += '<ellipse cx="' + x + '" cy="' + (y - s * 0.42) + '" rx="' + (w / 2 + 8) + '" ry="' + (s * 0.56) + '" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="5"/>';
    if (ring === 'bottom') out += '<ellipse cx="' + x + '" cy="' + (y + s * 0.5) + '" rx="' + (w / 2 + 8) + '" ry="' + (s * 0.56) + '" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="5"/>';
    return out + txt(x, y - 8, s, n) + '<path d="M' + (x - w / 2) + ' ' + y + 'h' + w + '" stroke="' + INK + '" stroke-width="' + Math.max(3, s / 11) + '"/>' + txt(x, y + s * 0.86, s, d);
  }
  // a strip at x, y (w by h) cut into `parts` equal parts, the first `shade` of them orange
  function strip(x, y, w, h, parts, shade) {
    const pw = w / parts;
    let s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="' + PART + '"/>';
    for (let i = 0; i < shade; i++) s += '<rect x="' + (x + i * pw) + '" y="' + y + '" width="' + pw + '" height="' + h + '" fill="' + ORANGE + '"' + (i === 0 ? ' rx="8"' : '') + '/>' + (i === 0 && pw > 16 ? '<rect x="' + (x + 8) + '" y="' + y + '" width="' + (pw - 8) + '" height="' + h + '" fill="' + ORANGE + '"/>' : '');
    for (let i = 1; i < parts; i++) s += '<path d="M' + (x + i * pw) + ' ' + y + 'v' + h + '" stroke="' + INK + '" stroke-width="3"/>';
    return s + '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" stroke="' + INK + '" stroke-width="3.5"/>';
  }
  // a circle at cx, cy cut into `parts` equal slices from the top, the first `shade` orange
  function pie(cx, cy, r, parts, shade) {
    let s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + PART + '"/>';
    const at = function (k) { const a = -Math.PI / 2 + k * 2 * Math.PI / parts; return [(cx + r * Math.cos(a)).toFixed(1), (cy + r * Math.sin(a)).toFixed(1)]; };
    for (let k = 0; k < shade; k++) { const p0 = at(k), p1 = at(k + 1); s += '<path d="M' + cx + ' ' + cy + 'L' + p0[0] + ' ' + p0[1] + 'A' + r + ' ' + r + ' 0 0 1 ' + p1[0] + ' ' + p1[1] + 'Z" fill="' + ORANGE + '"/>'; }
    if (parts > 1) for (let k = 0; k < parts; k++) { const p = at(k); s += '<path d="M' + cx + ' ' + cy + 'L' + p[0] + ' ' + p[1] + '" stroke="' + INK + '" stroke-width="3"/>'; }
    return s + '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" stroke="' + INK + '" stroke-width="3.5"/>';
  }
  const arrow = function (d, head) { return '<path d="' + d + '" stroke="' + LIME + '" stroke-width="5"/><path d="' + head + '" stroke="' + LIME + '" stroke-width="5"/>'; };

  const ART = window.T_ART = window.T_ART || {};

  /* ---------- Set A: equal parts ---------- */
  // a whole pizza, not cut, with 1 under it
  let pizza = '<circle cx="200" cy="128" r="92" fill="#E8A34A" stroke="#9A5B17" stroke-width="5"/><circle cx="200" cy="128" r="76" fill="#F6CF63"/>';
  [[-40, -34], [36, -28], [-14, 30], [40, 34], [4, -4], [-46, 20], [14, -56]].forEach(function (q) { pizza += '<circle cx="' + (200 + q[0]) + '" cy="' + (128 + q[1]) + '" r="9" fill="#C2402C"/>'; });
  ART['w-whole'] = word('w-whole', 'A whole pizza, not cut. Under it: 1.', pizza + txt(200, 278, 52, '1'));

  // a strip in 4 equal parts, each part with the same small bracket over it
  let eq = strip(50, 120, 300, 70, 4, 0);
  for (let i = 0; i < 4; i++) eq += '<path d="M' + (58 + i * 75) + ' 104q0-14 14-14h46q14 0 14 14" stroke="' + LIME + '" stroke-width="4"/>';
  eq += txt(87, 248, 34, '=', LIME) + txt(162, 248, 34, '=', LIME) + txt(237, 248, 34, '=', LIME) + txt(312, 248, 34, '=', LIME);
  ART['w-equal-parts'] = word('w-equal-parts', 'A strip cut into 4 parts that are all the same size. Each part has the same mark.', eq);

  // a circle in 4 equal parts, 3 of them orange, and the fraction 3 over 4
  ART['w-fraction'] = word('w-fraction', 'A circle cut into 4 equal parts, 3 of them orange. Next to it: 3 over 4.',
    pie(140, 150, 90, 4, 3) + frac(300, 150, '3', '4', 58));

  /* ---------- Set B: top and bottom ---------- */
  // 3 over 4 with a gold ring round the 3, an arrow to the 3 orange parts of a strip
  ART['w-numerator'] = word('w-numerator', 'The fraction 3 over 4 with a ring round the top number 3. An arrow points to 3 orange parts of a strip.',
    frac(90, 120, '3', '4', 58, 'top') + arrow('M138 72C200 52 230 70 236 112', 'M222 102l14 12 8-17') + strip(160, 130, 220, 60, 4, 3));

  // 3 over 4 with a gold ring round the 4, an arrow to a bracket under all 4 parts of a strip
  ART['w-denominator'] = word('w-denominator', 'The fraction 3 over 4 with a ring round the bottom number 4. An arrow points to all 4 equal parts of a strip.',
    frac(90, 150, '3', '4', 58, 'bottom') + strip(160, 80, 220, 60, 4, 3) +
    '<path d="M164 154v12h212v-12" stroke="' + LIME + '" stroke-width="5"/>' + arrow('M138 220C220 250 268 230 270 172', 'M258 182l12-12 12 13'));

  // three fractions with 1 on top: 1 over 2, 1 over 5, 1 over 8, each over a strip with one orange part
  ART['w-unit-fraction'] = word('w-unit-fraction', 'Three fractions with 1 on top: 1 over 2, 1 over 5 and 1 over 8. Each has a strip with one orange part.',
    frac(70, 70, '1', '2', 40) + strip(130, 38, 240, 40, 2, 1) +
    frac(70, 158, '1', '5', 40) + strip(130, 126, 240, 40, 5, 1) +
    frac(70, 246, '1', '8', 40) + strip(130, 214, 240, 40, 8, 1));

  /* ---------- Set C: halves, thirds, quarters ---------- */
  ART['w-half'] = word('w-half', 'A circle cut into 2 equal parts, one part orange. Next to it: 1 over 2.',
    pie(140, 150, 92, 2, 1) + frac(305, 150, '1', '2', 62));
  ART['w-third'] = word('w-third', 'A circle cut into 3 equal parts, one part orange. Next to it: 1 over 3.',
    pie(140, 150, 92, 3, 1) + frac(305, 150, '1', '3', 62));
  // a square cut into 4 equal parts (2 by 2), one orange
  ART['w-quarter'] = word('w-quarter', 'A square cut into 4 equal parts, one part orange. Next to it: 1 over 4.',
    '<rect x="56" y="62" width="176" height="176" rx="10" fill="' + PART + '"/><path d="M56 150V72q0-10 10-10h78v88z" fill="' + ORANGE + '"/>' +
    '<path d="M144 62v176M56 150h176" stroke="' + INK + '" stroke-width="3"/><rect x="56" y="62" width="176" height="176" rx="10" stroke="' + INK + '" stroke-width="3.5"/>' +
    frac(315, 150, '1', '4', 62));
})();
