/* 04-art-words-2.js - the Stop 2 word card pictures, in the flat style of 03-art-words.js (viewBox 400 x 300).

   w-count-on, w-count-back, w-negative-number     Set A: count past zero
   w-temperature, w-thermometer, w-minus-sign      Set B: hot and cold
   w-sequence, w-rule, w-square-number             Set C: patterns

   Meaning in colour, the same as the Stop 2 tools (39-tools-lines.css): counting on is orange, counting back and
   numbers below zero are blue, the red line of a thermometer is red. No word is written in a picture (the Words
   quiz asks for the word); numbers use the true minus sign (−). */
(function () {
  'use strict';

  const INK = '#2A2F3A';
  const FONT = 'font-family="Arial, Helvetica, sans-serif" font-weight="700"';
  const o = 'stroke="' + INK + '" stroke-width="3"';
  const ON = '#D9730D', ON_SOFT = '#FCE3C6', BACK = '#2F7FD4', BACK_DEEP = '#1D62AE', COLD = '#DCEBFB', RED = '#E5404A', GOLD = '#F5A623';
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

  // a number line from a to b: x of each number, ticks and labels; zero tall; below zero tinted blue
  function line(a, b, x0, x1, y) {
    const X = function (v) { return x0 + (v - a) / (b - a) * (x1 - x0); };
    let s = '';
    if (a < 0) s += '<rect x="' + (x0 - 14) + '" y="' + (y - 8) + '" width="' + (X(0) - x0 + 14) + '" height="16" rx="8" fill="' + COLD + '"/>';
    s += '<path d="M' + (x0 - 14) + ' ' + y + 'H' + (x1 + 14) + '" ' + o + '/>';
    for (let v = a; v <= b; v++) {
      const zero = v === 0;
      s += '<path d="M' + X(v) + ' ' + (y - (zero ? 13 : 9)) + 'V' + (y + (zero ? 13 : 9)) + '" stroke="' + INK + '" stroke-width="' + (zero ? 4 : 3) + '"/>' +
        txt(X(v), y + 40, zero ? 26 : 23, sg(v), v < 0 ? BACK_DEEP : INK);
    }
    return { s: s, X: X };
  }
  // a jump arc from x1 to x2 above y, with its arrow head at x2
  function arc(x1, x2, y, col) {
    const xm = (x1 + x2) / 2, d = x2 > x1 ? 1 : -1;
    return '<path d="M' + x1 + ' ' + (y - 8) + 'Q' + xm + ' ' + (y - 62) + ' ' + (x2 - d * 2) + ' ' + (y - 11) + '" stroke="' + col + '" stroke-width="5"/>' +
      '<path d="M' + (x2 - d * 14) + ' ' + (y - 20) + 'L' + (x2 - d * 2) + ' ' + (y - 10) + 'L' + (x2 - d * 6) + ' ' + (y - 27) + '" stroke="' + col + '" stroke-width="5"/>';
  }
  function ring(x, y, col) { return '<circle cx="' + x + '" cy="' + (y + 32) + '" r="20" stroke="' + col + '" stroke-width="4"/>'; }

  const ART = window.T_ART = window.T_ART || {};

  /* ---------- Set A ---------- */
  (function () {
    const L = line(0, 8, 40, 360, 172);
    let s = L.s;
    [2, 4, 6].forEach(function (v) { s += arc(L.X(v), L.X(v + 2), 172, ON); });
    [2, 4, 6, 8].forEach(function (v) { s += ring(L.X(v), 172, ON); });
    ART['w-count-on'] = word('w-count-on', 'A number line from 0 to 8. Orange jumps go forwards from 2 to 4, 6 and 8.', s);
  })();
  (function () {
    const L = line(-4, 4, 40, 360, 172);
    let s = L.s;
    [4, 2, 0].forEach(function (v) { s += arc(L.X(v), L.X(v - 2), 172, BACK); });
    [4, 2, 0, -2].forEach(function (v) { s += ring(L.X(v), 172, BACK); });
    ART['w-count-back'] = word('w-count-back', 'A number line from ' + M + '4 to 4. Blue jumps go backwards from 4 to 2, 0 and ' + M + '2.', s);
  })();
  (function () {
    const Y = function (v) { return 150 - v * 38; };
    let s = '<rect x="20" y="20" width="360" height="130" rx="18" fill="#FFF3DC"/>' +
      '<path d="M20 150H380V268a14 14 0 0 1-14 14H34a14 14 0 0 1-14-14z" fill="' + COLD + '"/>' +
      '<path d="M20 150c30-10 60 10 90 0s60-10 90 0 60 10 90 0 60-10 90 0" stroke="' + BACK + '" stroke-width="4"/>' +
      '<path d="M200 28V272" ' + o + '/>';
    for (let v = 3; v >= -3; v--) {
      const y = Y(v), neg = v < 0;
      s += '<path d="M' + (v === 0 ? 180 : 186) + ' ' + y + 'H' + (v === 0 ? 220 : 214) + '" stroke="' + INK + '" stroke-width="' + (v === 0 ? 5 : 3) + '"/>' +
        (neg ? '<rect x="104" y="' + (y - 16) + '" width="62" height="32" rx="16" fill="' + BACK_DEEP + '"/>' : '') +
        (v === 0 ? '<rect x="110" y="' + (y - 16) + '" width="50" height="32" rx="16" fill="#FFFFFF" ' + o + '/>' : '') +
        txt(135, y + 9, 26, sg(v), neg ? '#FFFFFF' : INK);
    }
    // a little boat at 0 and a fish below zero
    s += '<path d="M250 140h70l-12 18h-46z" fill="#E9C08A" ' + o + '/><path d="M284 140V102l22 30z" fill="#FFFFFF" ' + o + '/>' +
      '<path d="M262 226q22-22 48 0q-26 22-48 0z" fill="' + GOLD + '" ' + o + '/><path d="M310 226l16-12v24z" fill="' + GOLD + '" ' + o + '/><circle cx="276" cy="222" r="3" fill="' + INK + '"/>';
    ART['w-negative-number'] = word('w-negative-number', 'A tall number line by the sea. 0 is at the water. Below the water are ' + M + '1, ' + M + '2 and ' + M + '3 in blue, and a fish.', s);
  })();

  /* ---------- Set B ---------- */
  (function () {
    let sun = '<circle cx="110" cy="120" r="44" fill="#FFD24A" ' + o + '/>';
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4, c = Math.cos(a), sn = Math.sin(a);
      sun += '<path d="M' + (110 + c * 58).toFixed(1) + ' ' + (120 + sn * 58).toFixed(1) + 'L' + (110 + c * 76).toFixed(1) + ' ' + (120 + sn * 76).toFixed(1) + '" stroke="#E89B12" stroke-width="7"/>';
    }
    let flake = '';
    for (let i = 0; i < 3; i++) {
      const a = i * Math.PI / 3, c = Math.cos(a) * 52, sn = Math.sin(a) * 52;
      flake += '<path d="M' + (290 - c).toFixed(1) + ' ' + (120 - sn).toFixed(1) + 'L' + (290 + c).toFixed(1) + ' ' + (120 + sn).toFixed(1) + '" stroke="' + BACK + '" stroke-width="8"/>';
    }
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3, x = 290 + Math.cos(a) * 34, y = 120 + Math.sin(a) * 34, b1 = a + 0.7, b2 = a - 0.7;
      flake += '<path d="M' + (x + Math.cos(b1) * 16).toFixed(1) + ' ' + (y + Math.sin(b1) * 16).toFixed(1) + 'L' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + (x + Math.cos(b2) * 16).toFixed(1) + ' ' + (y + Math.sin(b2) * 16).toFixed(1) + '" stroke="' + BACK + '" stroke-width="6"/>';
    }
    const s = '<rect x="22" y="24" width="174" height="252" rx="20" fill="#FFF1D6"/><rect x="204" y="24" width="174" height="252" rx="20" fill="' + COLD + '"/>' +
      sun + flake +
      '<rect x="46" y="214" width="128" height="46" rx="23" fill="#FFFFFF" ' + o + '/>' + txt(110, 246, 28, '35 °C', '#B3541E') +
      '<rect x="226" y="214" width="128" height="46" rx="23" fill="#FFFFFF" ' + o + '/>' + txt(290, 246, 28, M + '5 °C', BACK_DEEP);
    ART['w-temperature'] = word('w-temperature', 'A hot sun at 35 °C and a cold snowflake at ' + M + '5 °C.', s);
  })();
  (function () {
    const top = 40, per = 9, Y = function (v) { return top + (10 - v) * per; };      // 10 to -10
    let s = '<rect x="120" y="22" width="160" height="262" rx="22" fill="#F7FBFF" stroke="#DCE8F3" stroke-width="3"/>' +
      '<rect x="160" y="' + Y(0) + '" width="92" height="' + (Y(-10) - Y(0) + 6) + '" rx="6" fill="' + COLD + '"/>' +
      '<path d="M170 ' + (Y(-10) + 4) + 'V' + (top - 4) + 'a12 12 0 0 1 24 0V' + (Y(-10) + 4) + '" fill="#FFFFFF" ' + o + '/>' +
      '<rect x="176" y="' + Y(6) + '" width="12" height="' + (Y(-10) - Y(6) + 12) + '" fill="' + RED + '"/>' +
      '<circle cx="182" cy="' + (Y(-10) + 24) + '" r="20" fill="' + RED + '" stroke="#A31A22" stroke-width="3"/>';
    for (let v = -10; v <= 10; v++) {
      const y = Y(v), big = v % 5 === 0;
      s += '<path d="M198 ' + y + 'h' + (v === 0 ? 22 : big ? 16 : 8) + '" stroke="' + INK + '" stroke-width="' + (v === 0 ? 4 : big ? 3 : 2) + '"/>';
      if (big) s += txt(226, y + 7, 20, sg(v), v < 0 ? BACK_DEEP : INK, 'start');
    }
    ART['w-thermometer'] = word('w-thermometer', 'A thermometer. The red line is at 6. The scale goes from ' + M + '10 to 10.', s);
  })();
  (function () {
    const s = '<rect x="96" y="58" width="208" height="170" rx="26" fill="' + COLD + '" ' + o + '/>' +
      '<ellipse cx="160" cy="146" rx="42" ry="30" stroke="' + GOLD + '" stroke-width="6"/>' +
      '<rect x="134" y="138" width="52" height="16" rx="4" fill="' + BACK_DEEP + '"/>' +
      txt(248, 190, 130, '4', BACK_DEEP) +
      '<path d="M120 262c18-22 30-50 36-78" stroke="' + GOLD + '" stroke-width="6"/><path d="M144 196l12-14 6 18" stroke="' + GOLD + '" stroke-width="6"/>';
    ART['w-minus-sign'] = word('w-minus-sign', 'A card with ' + M + '4. The short line in front of the 4 has a gold ring.', s);
  })();

  /* ---------- Set C ---------- */
  (function () {
    const xs = [52, 136, 220, 304], vals = ['3', '7', '11', '15'];
    let s = '';
    xs.forEach(function (x, i) {
      if (i) s += '<path d="M' + (xs[i - 1] + 26) + ' 118Q' + ((xs[i - 1] + x) / 2) + ' 78 ' + (x - 26) + ' 118" stroke="' + ON + '" stroke-width="5"/><path d="M' + (x - 38) + ' 112l12 6-4-13" stroke="' + ON + '" stroke-width="5"/>';
      s += '<rect x="' + (x - 36) + '" y="128" width="72" height="56" rx="28" fill="#FFFFFF" ' + o + '/>' + txt(x, 166, 30, vals[i]);
    });
    s += '<path d="M330 118Q358 78 368 116" stroke="' + ON + '" stroke-width="5"/>' +
      '<rect x="334" y="196" width="56" height="56" rx="28" fill="#FFF1CF" stroke="#C17B08" stroke-width="3" stroke-dasharray="7 6"/>' + txt(362, 234, 30, '?', '#7B4E00') +
      '<path d="M368 120V188" stroke="' + ON + '" stroke-width="5" stroke-dasharray="2 10"/>';
    ART['w-sequence'] = word('w-sequence', 'Numbers in a row: 3, 7, 11, 15, with a jump from each one to the next, and a question mark.', s);
  })();
  (function () {
    const s = '<rect x="132" y="70" width="136" height="150" rx="18" fill="#FCE3C6" ' + o + '/>' +
      '<rect x="152" y="96" width="96" height="58" rx="12" fill="#FFFFFF" ' + o + '/>' + txt(200, 137, 34, '+ 4', ON) +
      '<circle cx="168" cy="188" r="10" fill="' + GOLD + '" ' + o + '/><circle cx="200" cy="188" r="10" fill="#7DD3A8" ' + o + '/><circle cx="232" cy="188" r="10" fill="' + RED + '" ' + o + '/>' +
      '<path d="M150 220v22M250 220v22" ' + o + '/><path d="M120 244h160" ' + o + '/>' +
      '<rect x="28" y="110" width="64" height="56" rx="14" fill="#FFFFFF" ' + o + '/>' + txt(60, 148, 30, '7') +
      '<path d="M96 138h28m-10-10l10 10-10 10" stroke="' + INK + '" stroke-width="4"/>' +
      '<path d="M276 138h28m-10-10l10 10-10 10" stroke="' + INK + '" stroke-width="4"/>' +
      '<rect x="308" y="110" width="68" height="56" rx="14" fill="#FFFFFF" ' + o + '/>' + txt(342, 148, 30, '11');
    ART['w-rule'] = word('w-rule', 'A machine that adds 4: 7 goes in and 11 comes out.', s);
  })();
  (function () {
    let s = '<rect x="104" y="34" width="192" height="192" rx="18" fill="#F7FBFF" stroke="#DCE8F3" stroke-width="3"/>';
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
      const edge = r === 3 || c === 3;
      s += '<circle cx="' + (134 + c * 44) + '" cy="' + (64 + r * 44) + '" r="17" fill="' + (edge ? GOLD : RED) + '" stroke="' + (edge ? '#C17B08' : '#A31A22') + '" stroke-width="3"/>';
    }
    s += txt(200, 272, 30, '4 × 4 = 16');
    ART['w-square-number'] = word('w-square-number', 'Sixteen counters in a square: 4 rows of 4. 4 times 4 is 16.', s);
  })();
})();
