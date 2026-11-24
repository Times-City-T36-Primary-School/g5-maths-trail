/* 07-art-words-3.js - the Stop 3 word card pictures, in the flat style of 03-art-words.js (viewBox 400 x 300).

   w-compare, w-greater-than, w-less-than         Set A: compare
   w-equal-to, w-order, w-number-line             Set B: signs and order
   w-round, w-nearest, w-halfway                  Set C: rounding

   Meaning in colour, the same as the Stop 3 tools (39-tools-order.css, 39-tools-lines.css): the sign and the number a
   number rounds to are gold, a jump on the number line is orange, numbers below zero are blue, the halfway mark is a
   gold dashed line. No word is written in a picture (the Words quiz asks for the word); numbers use the true minus
   sign (−). Small helpers draw the number line once for the three rounding pictures. */
(function () {
  'use strict';

  const INK = '#2A2F3A';
  const FONT = 'font-family="Arial, Helvetica, sans-serif" font-weight="700"';
  const o = 'stroke="' + INK + '" stroke-width="3"';
  const ON = '#D9730D', BACK_DEEP = '#1D62AE', GOLD = '#F5A623', GOLD_EDGE = '#A66A06', GREEN = '#1E9E6A', SOFT = '#FFF1CF', GREY = '#8A93A3';
  const M = '−';

  function word(id, label, body) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" class="art" data-art="' + id +
      '" role="img" aria-label="' + label + '" fill="none" stroke-linejoin="round" stroke-linecap="round">' + body + '</svg>';
  }
  function txt(x, y, size, text, fill, anchor) {
    return '<text x="' + x + '" y="' + y + '" ' + FONT + ' font-size="' + size + '" text-anchor="' + (anchor || 'middle') +
      '" fill="' + (fill || INK) + '">' + text + '</text>';
  }
  const sg = function (v) { return v < 0 ? M + (-v) : String(v); };
  // dots in rows of `per`, from (x, y), r = radius, gap = distance
  function dots(n, per, x, y, r, gap, fill) {
    let s = '';
    for (let i = 0; i < n; i++) s += '<circle cx="' + (x + (i % per) * gap) + '" cy="' + (y + Math.floor(i / per) * gap) + '" r="' + r + '" fill="' + fill + '" stroke="' + INK + '" stroke-width="2"/>';
    return s;
  }
  // a number line from a to b (one tick each), labels on the ends and on `labs`
  function line(a, b, x0, x1, y, labs) {
    const X = function (v) { return x0 + (v - a) / (b - a) * (x1 - x0); };
    let s = '<path d="M' + (x0 - 16) + ' ' + y + 'H' + (x1 + 16) + '" ' + o + '/>';
    for (let v = a; v <= b; v++) {
      const end = v === a || v === b;
      s += '<path d="M' + X(v) + ' ' + (y - (end ? 14 : 9)) + 'V' + (y + (end ? 14 : 9)) + '" stroke="' + INK + '" stroke-width="' + (end ? 4 : 3) + '"/>';
      if (end || (labs || []).indexOf(v) >= 0) s += txt(X(v), y + 42, end ? 28 : (b - a > 8 ? 20 : 24), sg(v), v < 0 ? BACK_DEEP : INK);
    }
    return { s: s, X: X };
  }
  function arc(x1, x2, y, col) {
    const xm = (x1 + x2) / 2, d = x2 > x1 ? 1 : -1;
    return '<path d="M' + x1 + ' ' + (y - 10) + 'Q' + xm + ' ' + (y - 74) + ' ' + (x2 - d * 2) + ' ' + (y - 13) + '" stroke="' + col + '" stroke-width="5"/>' +
      '<path d="M' + (x2 - d * 14) + ' ' + (y - 22) + 'L' + (x2 - d * 2) + ' ' + (y - 12) + 'L' + (x2 - d * 6) + ' ' + (y - 29) + '" stroke="' + col + '" stroke-width="5"/>';
  }
  // a flag above a number on the line (the number we start from)
  function flag(x, y, t) {
    return '<path d="M' + x + ' ' + (y - 6) + 'V' + (y - 34) + '" stroke="' + INK + '" stroke-width="3"/>' +
      '<rect x="' + (x - 26) + '" y="' + (y - 70) + '" width="52" height="36" rx="18" fill="' + ON + '"/>' + txt(x, y - 43, 24, t, '#FFFFFF') +
      '<circle cx="' + x + '" cy="' + y + '" r="9" fill="' + ON + '" stroke="#FFFFFF" stroke-width="3"/>';
  }
  // a gold ring around a label under the line (the answer)
  function goal(x, y) { return '<ellipse cx="' + x + '" cy="' + (y + 32) + '" rx="30" ry="22" fill="' + SOFT + '" stroke="' + GOLD + '" stroke-width="5"/>'; }

  const ART = window.T_ART = window.T_ART || {};

  /* ---------- Set A: compare ---------- */
  (function () {
    // a balance: 52 is heavier than 25, so its side goes down
    const s = '<path d="M200 262V112" stroke="' + INK + '" stroke-width="6"/><path d="M150 268h100" stroke="' + INK + '" stroke-width="8"/>' +
      '<path d="M78 136L322 88" stroke="' + INK + '" stroke-width="7"/><circle cx="200" cy="112" r="10" fill="' + GOLD + '" ' + o + '/>' +
      '<path d="M78 136L44 200M78 136l34 64M322 88l-34 64M322 88l34 64" stroke="#5F656D" stroke-width="3"/>' +
      '<path d="M36 200h84a42 16 0 0 1-84 0z" fill="#DCE8F3" ' + o + '/><path d="M280 152h84a42 16 0 0 1-84 0z" fill="#DCE8F3" ' + o + '/>' +
      '<rect x="46" y="150" width="64" height="46" rx="10" fill="#FFFFFF" ' + o + '/>' + txt(78, 184, 30, '52') +
      '<rect x="290" y="102" width="64" height="46" rx="10" fill="#FFFFFF" ' + o + '/>' + txt(322, 136, 30, '25');
    ART['w-compare'] = word('w-compare', 'A balance with 52 on one side and 25 on the other. The side with 52 goes down.', s);
  })();
  (function () {
    const s = '<rect x="24" y="40" width="352" height="110" rx="24" fill="#F7FBFF" stroke="#DCE8F3" stroke-width="3"/>' +
      txt(110, 124, 80, '9') + txt(200, 122, 84, '&gt;', GOLD_EDGE) + txt(290, 124, 80, '5') +
      dots(9, 3, 72, 186, 11, 30, ON) + dots(5, 3, 260, 186, 11, 30, ON);
    ART['w-greater-than'] = word('w-greater-than', '9 &gt; 5. Under the 9 are 9 dots, under the 5 are 5 dots.', s);
  })();
  (function () {
    const s = '<rect x="24" y="40" width="352" height="110" rx="24" fill="#F7FBFF" stroke="#DCE8F3" stroke-width="3"/>' +
      txt(110, 124, 80, '3') + txt(200, 122, 84, '&lt;', GOLD_EDGE) + txt(290, 124, 80, '8') +
      dots(3, 3, 80, 202, 11, 30, GREEN) + dots(8, 4, 245, 186, 11, 30, GREEN);
    ART['w-less-than'] = word('w-less-than', '3 &lt; 8. Under the 3 are 3 dots, under the 8 are 8 dots.', s);
  })();

  /* ---------- Set B: signs and order ---------- */
  (function () {
    const s = '<rect x="24" y="40" width="352" height="110" rx="24" fill="#F7FBFF" stroke="#DCE8F3" stroke-width="3"/>' +
      txt(104, 120, 50, '4 + 2') + txt(200, 122, 84, '=', GOLD_EDGE) + txt(290, 124, 80, '6') +
      dots(4, 2, 52, 190, 11, 30, ON) + dots(2, 2, 128, 190, 11, 30, '#2F7FD4') + dots(6, 3, 260, 190, 11, 30, ON);
    ART['w-equal-to'] = word('w-equal-to', '4 + 2 = 6. Under 4 + 2 are 4 dots and 2 dots, under the 6 are 6 dots.', s);
  })();
  (function () {
    // five cards, smallest to largest, on steps that go up; an arrow under them
    const vals = [-3, 0, 4, 9, 15];
    let s = '';
    vals.forEach(function (v, i) {
      const x = 40 + i * 66, h = 60 + i * 30, y = 236 - h;
      s += '<rect x="' + x + '" y="' + y + '" width="56" height="' + h + '" rx="8" fill="' + (i % 2 ? '#DCE8F3' : '#EAF2FD') + '" ' + o + '/>' +
        '<rect x="' + (x + 4) + '" y="' + (y - 50) + '" width="48" height="40" rx="10" fill="#FFFFFF" ' + o + '/>' + txt(x + 28, y - 20, 24, sg(v), v < 0 ? BACK_DEEP : INK);
    });
    s += '<path d="M44 264H356" stroke="' + GOLD_EDGE + '" stroke-width="6"/><path d="M338 250l20 14-20 14" stroke="' + GOLD_EDGE + '" stroke-width="6"/>';
    ART['w-order'] = word('w-order', 'Five cards on steps, from smallest to largest: ' + M + '3, 0, 4, 9 and 15. An arrow points to the larger numbers.', s);
  })();
  (function () {
    const L = line(0, 10, 50, 350, 150, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const s = L.s + '<path d="M26 150l16-10v20zM374 150l-16-10v20z" fill="' + INK + '"/>' +
      '<path d="M120 90H290" stroke="' + GREEN + '" stroke-width="6"/><path d="M272 76l20 14-20 14" stroke="' + GREEN + '" stroke-width="6"/>';
    ART['w-number-line'] = word('w-number-line', 'A number line from 0 to 10. An arrow above it points right, where the numbers get bigger.', s);
  })();

  /* ---------- Set C: rounding ---------- */
  (function () {
    const L = line(40, 50, 60, 340, 180, [45]);
    const s = L.s + goal(L.X(50), 180) + txt(L.X(50), 222, 28, '50') + arc(L.X(47), L.X(50), 180, ON) + flag(L.X(47), 180, '47');
    ART['w-round'] = word('w-round', 'A number line from 40 to 50. An orange jump goes from 47 to 50, and 50 has a gold ring.', s);
  })();
  (function () {
    const L = line(40, 50, 60, 340, 150, []);
    const X = L.X, y = 236;
    const s = L.s + goal(X(50), 150) + txt(X(50), 192, 28, '50') +
      '<path d="M' + X(47) + ' 160V' + (y - 10) + '" stroke="' + GREY + '" stroke-width="3" stroke-dasharray="6 6"/>' +
      '<path d="M' + (X(47) + 6) + ' ' + y + 'H' + (X(50) - 8) + '" stroke="' + GREEN + '" stroke-width="6"/><path d="M' + (X(50) - 20) + ' ' + (y - 11) + 'l12 11-12 11" stroke="' + GREEN + '" stroke-width="6"/>' +
      '<path d="M' + (X(47) - 6) + ' ' + y + 'H' + (X(40) + 8) + '" stroke="' + GREY + '" stroke-width="4"/><path d="M' + (X(40) + 20) + ' ' + (y - 9) + 'l-12 9 12 9" stroke="' + GREY + '" stroke-width="4"/>' +
      txt((X(47) + X(50)) / 2, y + 40, 28, '3', GREEN) + txt((X(40) + X(47)) / 2, y + 40, 28, '7', '#5F656D') + flag(X(47), 150, '47');
    ART['w-nearest'] = word('w-nearest', 'A number line from 40 to 50 with 47 marked. 47 is 3 away from 50 and 7 away from 40, so 50 is the closest.', s);
  })();
  (function () {
    const L = line(40, 50, 60, 340, 200, []);
    const X = L.X;
    const s = L.s + '<path d="M' + X(45) + ' 80V214" stroke="' + GOLD_EDGE + '" stroke-width="4" stroke-dasharray="9 7"/>' +
      '<rect x="' + (X(45) - 32) + '" y="216" width="64" height="40" rx="20" fill="' + GOLD + '"/>' + txt(X(45), 246, 28, '45', '#3A2600') +
      '<path d="M' + (X(40) + 4) + ' 150Q' + ((X(40) + X(45)) / 2) + ' 116 ' + (X(45) - 4) + ' 150" stroke="#2F7FD4" stroke-width="5"/>' +
      '<path d="M' + (X(45) + 4) + ' 150Q' + ((X(45) + X(50)) / 2) + ' 116 ' + (X(50) - 4) + ' 150" stroke="#2F7FD4" stroke-width="5"/>' +
      txt((X(40) + X(45)) / 2, 112, 28, '5', '#1D62AE') + txt((X(45) + X(50)) / 2, 112, 28, '5', '#1D62AE') +
      '<path d="M' + (X(45) - 14) + ' 70l14-16 14 16" stroke="' + GOLD_EDGE + '" stroke-width="5"/>';
    ART['w-halfway'] = word('w-halfway', 'A number line from 40 to 50. 45 is marked in gold, exactly in the middle: 5 to 40 and 5 to 50.', s);
  })();
})();
