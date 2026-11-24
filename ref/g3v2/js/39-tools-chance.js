/* 39-tools-chance.js - the Stop 9 tools (scales and chance), flat on the light art plate (39-tools-chance.css). Ported from
   Maths v2 (mui_e.js TOOLS.trial, jug, match; PICS.bag, spinner, strip, jug, scale; mui_c.js PICS.table) with the v2 answers:
   get() returns what the models' check(r) reads, solve(task.right) shows the right state.
   Every counter and spinner part has its colour AND a sign (green triangle, red dot, blue square, yellow star, purple
   diamond, orange plus, pink heart); the models' <span class="cdot c-green"> gets the same counter.
   trial(host, {kind: 'bag'|'spinner', items, parts, names, seq})  "Pick a counter" (it goes back) or "Spin"; the results come
       in the order of seq and fill a tally table. get() {done, counts}; allow({pick}|{spin}); trade {act: 'pick'|'spin', done}
   jug(host, {max, per, level, fixed})  "Pour out" / "Pour in" one small step. get() {level, read}; allow({pour}); trade 'pour'
   wscale(host, {max, per, base: {at, label}})  See it: a weighing scale, "Add a mango" (one small step), "Take off".
       get() {at}; allow({weigh}); trade 'weigh'
   match(host, {left, right, wide, want})  tap one on the left, then its partner; want (See it): a wrong partner shakes;
       allow({rows}) the left ones to join now. get() {pairs, matched, said}; mark(wrong) turns lines red; trade 'match'
   Pictures: bag {items}, spinner {parts}, table {head, rows, cap}, jug, scale {min, max, per, at, cap}, tally {rows},
       and the results in order {k: 'strip', seq, dev} (38-tools.js sends it here).
   Motion: transform and opacity only; still = the final state at once (00-tokens.css). */
(function (T) {
  'use strict';

  const el = T.util.el;
  const sfx = function (name) { if (T.fx && T.fx.sfx) T.fx.sfx(name); };
  const still = function () {
    try { if (T.fx && T.fx.still) return !!T.fx.still(); } catch (e) { /* fall through */ }
    return !!(T.ui && T.ui.reducedMotion && T.ui.reducedMotion());
  };
  const mount = function (host, node) { if (host) host.appendChild(node); return node; };
  const may = function (can, k) { return !can || !!can[k]; };
  const CAP = function (s) { s = String(s); return s.charAt(0).toUpperCase() + s.slice(1); };
  const r1 = function (v) { return Math.round(v * 10) / 10; };
  function tbtn(label, cls, data, iconStart, aria) {
    const b = el('button', { type: 'button', class: ['btn', 'tl__btn', cls], dataset: data || {} },
      iconStart ? T.ui.icon(iconStart) : null, label ? el('span', { class: 'btn__label' }, label) : null);
    if (aria) b.setAttribute('aria-label', aria);
    return b;
  }

  /* ---------- counters: a colour and a sign each ---------- */

  const COL = {      // fill, edge, sign, sign colour
    green: ['#2E9E4F', '#1B6A33', 'tri', '#FFFFFF'], red: ['#E0453A', '#9E2219', 'dot', '#FFFFFF'],
    blue: ['#2F6FD0', '#1C4A94', 'sq', '#FFFFFF'], yellow: ['#F4C531', '#A8820C', 'star', '#5A4300'],
    purple: ['#8A4FD3', '#5A2E99', 'dia', '#FFFFFF'], orange: ['#F28A1E', '#A85A08', 'plus', '#4A2600'],
    pink: ['#F27DB4', '#A83A6E', 'heart', '#5C1238']
  };
  const SIGN = {
    tri: '<path d="M0-5.4L5.2 3.8H-5.2Z"/>', dot: '<circle r="3.4"/>', sq: '<path d="M-3.7-3.7h7.4v7.4h-7.4z"/>',
    star: '<path d="M0-6l1.7 3.6 3.9.4-2.9 2.7.8 3.9L0 2.7-3.5 4.6l.8-3.9-2.9-2.7 3.9-.4z"/>',
    dia: '<path d="M0-5.8L4.6 0 0 5.8-4.6 0z"/>', plus: '<path d="M-1.5-5.2h3v3.7h3.7v3H1.5v3.7h-3V1.5h-3.7v-3h3.7z"/>',
    heart: '<path d="M0 5C-4 2-5.6.3-5.6-1.8c0-1.9 1.4-3.2 3-3.2 1.2 0 2.1.6 2.6 1.6.5-1 1.4-1.6 2.6-1.6 1.6 0 3 1.3 3 3.2C5.6.3 4 2 0 5z"/>'
  };
  function counter(c, x, y, r) {
    const k = COL[c] || COL.green;
    return '<g transform="translate(' + r1(x) + ' ' + r1(y) + ') scale(' + r1(r / 10 * 100) / 100 + ')"><circle r="9.2" fill="' + k[0] + '" stroke="' + k[1] +
      '" stroke-width="1.7"/><g fill="' + k[3] + '">' + SIGN[k[2]] + '</g></g>';
  }
  const svg = function (vb, body, cls) { return '<svg viewBox="' + vb + '" class="' + cls + '" aria-hidden="true" focusable="false">' + body + '</svg>'; };
  (function () {
    if (typeof document === 'undefined' || document.getElementById('cdot-style')) return;
    let css = '';
    Object.keys(COL).forEach(function (c) {
      css += '.cdot.c-' + c + '{background-image:url("data:image/svg+xml,' +
        encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 20 20">' + counter(c, 0, 0, 10) + '</svg>') + '")}';
    });
    const s = document.createElement('style');
    s.id = 'cdot-style';
    s.textContent = css;
    document.head.appendChild(s);
  })();
  const cdot = function (c) { return '<span class="cdot c-' + c + '" aria-hidden="true"></span>'; };
  const countsSay = function (items) { return items.map(function (x) { return x[1] + ' ' + x[0]; }).join(' and '); };
  function partsSay(parts) {
    const o = [];
    parts.forEach(function (c) { const x = o.find(function (y) { return y[0] === c; }); if (x) x[1]++; else o.push([c, 1]); });
    return o.map(function (x) { return x[1] + ' ' + x[0]; }).join(', ');
  }

  /* ---------- the lucky dip bag: an open cloth bag, the counters inside ---------- */

  function bagSvg(items) {
    const list = [];
    items.forEach(function (x, k) { for (let j = 0; j < x[1]; j++) list.push([x[0], (j + 0.5) / x[1] + k * 0.013]); });
    list.sort(function (a, b) { return a[1] - b[1]; });          // the colours mixed up, as in a real bag
    const n = list.length, per = n <= 5 ? n : n <= 10 ? Math.ceil(n / 2) : Math.ceil(n / 3), rows = Math.ceil(n / per);
    const r = per > 5 ? 11 : 13, gap = r * 2 + 2;
    let s = '<ellipse cx="100" cy="74" rx="66" ry="17" fill="#5B2149"/>', k = 0;
    for (let row = 0; row < rows; row++) {
      const m = Math.min(per, n - k), y = 70 - row * (r * 1.55), x0 = 100 - (m - 1) * gap / 2;
      for (let j = 0; j < m; j++) s += counter(list[k++][0], x0 + j * gap + (row % 2 ? r * 0.5 : 0), y, r);
    }
    const body = '<path d="M36 76C22 118 30 164 100 166C170 164 178 118 164 76Q100 100 36 76Z" fill="#C8559F" stroke="#7E2E63" stroke-width="3"/>' +
      '<path d="M34 74Q100 98 166 74" fill="none" stroke="#7E2E63" stroke-width="7"/><path d="M34 74Q100 98 166 74" fill="none" stroke="#F3B8DA" stroke-width="2.5" stroke-dasharray="6 6"/>' +
      '<path d="M62 120q14 10 30 2M108 136q16 8 30-4" fill="none" stroke="#9E3D7E" stroke-width="3"/>' +
      '<path d="M154 84l14 22M160 82l20 16" stroke="#7E2E63" stroke-width="3"/><circle cx="168" cy="108" r="5" fill="#F5A623" stroke="#7E2E63" stroke-width="2"/><circle cx="182" cy="99" r="5" fill="#F5A623" stroke="#7E2E63" stroke-width="2"/>';
    return '<ellipse cx="100" cy="164" rx="70" ry="7" fill="rgba(16,48,94,.12)"/>' + s + body;
  }
  function bagPic(spec) {
    const n = spec.items.reduce(function (a, x) { return a + x[1]; }, 0);
    const box = el('div', { class: 'bagp', role: 'img', 'aria-label': 'A bag with ' + countsSay(spec.items) + (n === 1 ? ' counter' : ' counters') + '.' });
    box.innerHTML = svg('0 0 200 174', bagSvg(spec.items), 'bagp__svg');
    return box;
  }

  /* ---------- a spinner with equal parts ---------- */

  const CX = 100, CY = 106, R = 80;
  function wheel(parts) {
    const n = parts.length, pt = function (a) { return r1(CX + R * Math.cos(a)) + ' ' + r1(CY + R * Math.sin(a)); };
    let s = '';
    if (n === 1) s = '<circle cx="' + CX + '" cy="' + CY + '" r="' + R + '" fill="' + COL[parts[0]][0] + '"/>' + counter(parts[0], CX, CY - 46, 13).replace(/<circle r="9.2"[^>]*>/, '');
    else parts.forEach(function (c, i) {
      const a0 = i / n * 2 * Math.PI - Math.PI / 2, a1 = (i + 1) / n * 2 * Math.PI - Math.PI / 2, am = (a0 + a1) / 2;
      s += '<path d="M' + CX + ' ' + CY + 'L' + pt(a0) + 'A' + R + ' ' + R + ' 0 0 1 ' + pt(a1) + 'Z" fill="' + COL[c][0] + '" stroke="#FFFFFF" stroke-width="3"/>';
      s += '<g transform="translate(' + r1(CX + 50 * Math.cos(am)) + ' ' + r1(CY + 50 * Math.sin(am)) + ') scale(1.9)" fill="' + COL[c][3] + '"><g class="sp__s">' + SIGN[COL[c][2]] + '</g></g>';
    });
    return s;
  }
  function spinSvg(parts) {
    return '<circle cx="' + CX + '" cy="' + (CY + 5) + '" r="' + (R + 9) + '" fill="rgba(16,48,94,.14)"/><circle cx="' + CX + '" cy="' + CY + '" r="' + (R + 9) + '" fill="#2A3550"/>' +
      '<g class="sp__w">' + wheel(parts) + '</g><circle cx="' + CX + '" cy="' + CY + '" r="11" fill="#2A3550"/><circle cx="' + CX + '" cy="' + CY + '" r="4" fill="#FFE08A"/>' +
      '<path d="M100 34L88 6H112Z" fill="#E0453A" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"/>';
  }
  function spinPic(spec) {
    const box = el('div', { class: 'spn', role: 'img', 'aria-label': 'A spinner with ' + spec.parts.length + ' equal parts: ' + partsSay(spec.parts) + '.' });
    box.innerHTML = svg('0 0 200 200', spinSvg(spec.parts), 'spn__svg');
    return box;
  }

  /* ---------- tables: a results table, a tally table ---------- */

  function table(spec) {
    const head = spec.head ? el('thead', el('tr', spec.head.map(function (h) { return el('th', { scope: 'col', html: h }); }))) : null;
    const body = el('tbody', spec.rows.map(function (row) {
      return el('tr', row.map(function (x, i) { return i ? el('td', { html: String(x) }) : el('th', { scope: 'row', html: String(x) }); }));
    }));
    const box = el('div', { class: 'ctab' }, el('table', { class: 'ctab__t' }, head, body));
    if (spec.cap) box.appendChild(el('p', { class: 'ctab__cap', html: spec.cap }));
    return box;
  }
  function tallySvg(n) {
    const g = Math.floor(n / 5), rest = n % 5, w = Math.max(8, g * 32 + rest * 8 + 4);
    let s = '';
    for (let i = 0; i < g; i++) {
      const x = i * 32 + 3;
      for (let j = 0; j < 4; j++) s += '<path d="M' + (x + j * 6) + ' 3v20"/>';
      s += '<path d="M' + (x - 3) + ' 19L' + (x + 22) + ' 7"/>';
    }
    for (let j = 0; j < rest; j++) s += '<path d="M' + (g * 32 + 3 + j * 8) + ' 3v20"/>';
    return '<svg viewBox="0 0 ' + w + ' 26" width="' + w + '" height="26" class="tly" aria-hidden="true" focusable="false"><g stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none">' + s + '</g></svg>';
  }
  function tallyTable(names) {
    const rows = names.map(function (nm) {
      const tal = el('td', { class: 'tly__cell' }), tot = el('td', { class: 'tly__tot' }, '0');
      return { tr: el('tr', el('th', { scope: 'row', html: cdot(nm) + CAP(nm) }), tal, tot), tal: tal, tot: tot, n: -1 };
    });
    const t = el('table', { class: 'ctab__t tly__t' },
      el('thead', el('tr', el('th', { scope: 'col' }, 'Colour'), el('th', { scope: 'col' }, 'Tally'), el('th', { scope: 'col' }, 'Total'))),
      el('tbody', rows.map(function (r) { return r.tr; })));
    return {
      el: el('div', { class: 'ctab tly' }, t),
      set: function (counts, tick) {
        rows.forEach(function (r, i) {
          if (r.n === counts[i]) return;
          r.n = counts[i];
          r.tal.innerHTML = tallySvg(counts[i]);
          r.tal.setAttribute('aria-label', counts[i] + (counts[i] === 1 ? ' tally mark' : ' tally marks'));
          r.tot.textContent = String(counts[i]);
          if (tick && !still()) { r.tot.classList.remove('is-tick'); void r.tot.offsetWidth; r.tot.classList.add('is-tick'); }
        });
      }
    };
  }
  function tallyPic(spec) {
    const t = tallyTable(spec.rows.map(function (x) { return x[0]; }));
    t.set(spec.rows.map(function (x) { return x[1]; }));
    return t.el;
  }

  function seqStrip(spec) {
    const n = spec.seq.length, per = n > 8 ? Math.ceil(n / 2) : n, gap = 30;
    let s = '';
    spec.seq.forEach(function (c, i) { s += counter(c, 16 + (i % per) * gap, 16 + Math.floor(i / per) * 34, 12.5); });
    const box = el('div', { class: 'ostrip', role: 'img', 'aria-label': 'The results in order: ' + spec.seq.join(', ') + '.' });
    box.innerHTML = svg('0 0 ' + (per * gap + 2) + ' ' + (Math.ceil(n / per) * 34 - 2), s, 'ostrip__svg');
    return box;
  }

  /* ---------- a chance experiment ---------- */

  function trial(host, spec) {
    spec = spec || {};
    const bag = spec.kind === 'bag', seq = spec.seq || [], ev = T.tools.emitter();
    const names = spec.names || (bag ? spec.items.map(function (x) { return x[0]; }) : spec.parts.filter(function (x, i, a) { return a.indexOf(x) === i; }));
    let done = 0, busy = false, locked = !!spec.fixed, can = spec.can || null, turn = 0, timer = null;
    const dev = el('div', { class: 'trl__dev' }, bag ? bagPic({ items: spec.items }) : spinPic({ parts: spec.parts }));
    const out = el('div', { class: 'trl__out', 'aria-live': 'polite' });
    const go = tbtn(bag ? 'Pick a counter' : 'Spin', 'trl__go', { a: 'go' }, bag ? null : 'replay');
    const count = el('p', { class: 'trl__n' });
    const tally = tallyTable(names);
    const root = el('div', { class: ['trl', bag ? 'trl--bag' : 'trl--spin'] }, dev, el('div', { class: 'trl__side' }, out, go, count), tally.el);
    const wheelG = bag ? null : dev.querySelector('.sp__w');
    const counts = function (k) { return names.map(function (nm) { return seq.slice(0, k).filter(function (x) { return x === nm; }).length; }); };
    function paint(tick) {
      tally.set(counts(done), tick);
      count.textContent = done + ' of ' + seq.length + (bag ? ' picks' : ' spins');
      go.disabled = locked || busy || done >= seq.length || !may(can, bag ? 'pick' : 'spin');
      root.dataset.done = String(done);
    }
    function show(nm) {
      out.innerHTML = svg('-12 -12 24 24', counter(nm, 0, 0, 11), 'trl__c') + '<b>' + CAP(nm) + '</b>';
      if (!still()) { out.classList.remove('is-in'); void out.offsetWidth; out.classList.add('is-in'); }
    }
    function one() {
      if (done >= seq.length || busy || locked) return false;
      const nm = seq[done];
      busy = true;
      paint(false);
      let wait = still() ? 0 : bag ? 380 : 950;
      if (bag) { show(nm); sfx('pop'); }
      else {
        const idx = spec.parts.map(function (p, i) { return p === nm ? i : -1; }).filter(function (i) { return i >= 0; });
        const sec = idx[done % idx.length], n = spec.parts.length, nudge = ((done * 37) % 5 - 2) * 0.12;
        turn = (Math.floor(turn / 360) + 2) * 360 - (sec + 0.5 + nudge) / n * 360;
        wheelG.classList.toggle('is-still', still());
        wheelG.style.transform = 'rotate(' + r1(turn) + 'deg)';
        wheelG.querySelectorAll('.sp__s').forEach(function (g) { g.style.transform = 'rotate(' + r1(-turn) + 'deg)'; });
        out.innerHTML = '';
        sfx('slide');
      }
      const land = function () {
        timer = null;
        done++;
        busy = false;
        if (!bag) { show(nm); sfx('snap'); }
        paint(true);
        ev.emit('change', get());
        ev.emit('trade', { act: bag ? 'pick' : 'spin', done: done });
      };
      if (wait) timer = setTimeout(land, wait); else land();
      return true;
    }
    function get() { return { done: done, counts: counts(done) }; }
    go.addEventListener('click', function () { if (one()) { /* the button keeps the focus */ } });
    paint(false);
    mount(host, root);
    return {
      el: root, get: get, on: ev.on,
      set: function () {}, ready: function () { return done >= seq.length; },
      solve: function () { if (timer) { clearTimeout(timer); timer = null; } done = seq.length; busy = false; paint(false); },
      lock: function () { locked = true; paint(false); },
      allow: function (c) { can = c || {}; locked = !!spec.fixed; paint(false); },
      tip: function () { return go.disabled ? null : go; },
      destroy: function () { if (timer) clearTimeout(timer); if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  /* ---------- a measuring jug ---------- */

  let uid = 0;
  const PART = { 2: 'half', 3: 'third', 4: 'quarter', 5: 'fifth', 10: 'tenth' };
  const gcd = function (a, b) { return b ? gcd(b, a % b) : a; };
  function readOf(level, per) {
    const w = Math.floor(level / per), r = level % per, g = r ? gcd(r, per) : 1;
    return r ? (w ? w + ' ' : '') + (r / g) + '/' + (per / g) : String(w);
  }
  const J = { x0: 66, x1: 166, top: 38, bot: 214 };
  function jugSvg(max, per, id) {
    const total = max * per, span = J.bot - J.top - 20, y = function (v) { return J.bot - v / total * span; };
    let marks = '';
    for (let i = 1; i <= total; i++) {
      const major = i % per === 0, yy = r1(y(i));
      marks += '<path d="M' + J.x0 + ' ' + yy + 'h' + (major ? 34 : 18) + '" stroke-width="' + (major ? 3.4 : 2.2) + '"/>';
      if (major) marks += '<text x="' + (J.x0 - 9) + '" y="' + (yy + 7) + '" class="jg__n">' + i / per + '</text>';
    }
    const body = 'M' + J.x0 + ' ' + J.top + 'H' + J.x1 + 'V' + (J.bot - 12) + 'Q' + J.x1 + ' ' + J.bot + ' ' + (J.x1 - 12) + ' ' + J.bot + 'H' + (J.x0 + 12) + 'Q' + J.x0 + ' ' + J.bot + ' ' + J.x0 + ' ' + (J.bot - 12) + 'Z';
    return '<defs><clipPath id="jgc' + id + '"><path d="' + body + '"/></clipPath></defs>' +
      '<path d="M' + J.x1 + ' 70C' + (J.x1 + 46) + ' 70 ' + (J.x1 + 46) + ' 158 ' + J.x1 + ' 158" fill="none" stroke="#9FB6DE" stroke-width="13" stroke-linecap="round"/>' +
      '<path d="' + body + '" fill="#FFFFFF" fill-opacity=".7"/>' +
      '<g clip-path="url(#jgc' + id + ')"><g class="jg__w"><rect x="' + J.x0 + '" y="' + J.bot + '" width="' + (J.x1 - J.x0) + '" height="' + (span + 40) + '" fill="#58AEF2"/>' +
      '<rect x="' + J.x0 + '" y="' + J.bot + '" width="' + (J.x1 - J.x0) + '" height="5" fill="#2F86D6"/></g></g>' +
      '<path d="' + body + '" fill="none" stroke="#2A3550" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="M' + (J.x0 - 2) + ' ' + J.top + 'L' + (J.x0 - 16) + ' ' + (J.top - 10) + '" stroke="#2A3550" stroke-width="4" stroke-linecap="round"/>' +
      '<g stroke="#10305E" stroke-linecap="round">' + marks + '</g>' +
      '<text x="' + ((J.x0 + J.x1) / 2) + '" y="' + (J.top - 12) + '" class="jg__u">litres</text>';
  }
  function jug(host, spec) {
    spec = spec || {};
    const max = spec.max || 2, per = spec.per || 2, total = max * per, fixed = !!spec.fixed, id = ++uid, ev = T.tools.emitter();
    let level = Math.max(0, Math.min(total, spec.level || 0)), locked = fixed, can = spec.can || null;
    const pic = el('div', { class: 'jg', role: 'img' });
    pic.innerHTML = svg('0 0 220 226', jugSvg(max, per, id), 'jg__svg');
    const water = pic.querySelector('.jg__w');
    const root = el('div', { class: ['jgw', fixed && 'jgw--mini'] }, pic);
    let out = null, inn = null;
    if (!fixed) {
      out = tbtn('Pour out', 'jg__b', { a: 'out' }, 'minus');
      inn = tbtn('Pour in', 'jg__b', { a: 'in' }, 'plus');
      [out, inn].forEach(function (b) { b.addEventListener('click', function () { step(b.dataset.a); }); });
      root.appendChild(el('div', { class: 'jg__ctl' }, out, inn));
    }
    function paint() {
      water.style.transform = 'translateY(' + r1(-(level / total) * (J.bot - J.top - 20)) + 'px)';
      pic.setAttribute('aria-label', 'A measuring jug marked in litres, with ' + per + ' small steps for each litre. The water is ' + level + (level === 1 ? ' small step' : ' small steps') + ' high.');
      root.dataset.level = String(level);
      if (out) {
        out.disabled = locked || level <= 0 || !may(can, 'pour');
        inn.disabled = locked || level >= total || !may(can, 'pour');
      }
    }
    function step(a) {
      if (locked || !may(can, 'pour')) return false;
      if (a === 'in' && level < total) level++; else if (a === 'out' && level > 0) level--; else return false;
      sfx(a === 'in' ? 'slide' : 'pop');
      paint();
      ev.emit('change', get());
      ev.emit('trade', { act: 'pour', level: level });
      return true;
    }
    function get() { return { level: level, read: readOf(level, per) + (level ? ' l' : '') }; }
    paint();
    mount(host, root);
    return {
      el: root, get: get, on: ev.on, act: step,
      set: function (v) { if (v && v.level != null) { level = v.level; paint(); } },
      solve: function (r) { if (r && r.level != null) { level = r.level; paint(); } },
      ready: function () { return level > 0; },
      lock: function () { locked = true; paint(); },
      allow: function (c) { can = c || {}; locked = fixed; paint(); },
      tip: function () { return inn && !inn.disabled ? inn : out && !out.disabled ? out : null; },
      destroy: function () { if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  /* ---------- a straight scale (a weighing scale's window) ---------- */

  function ticks(min, max, per, x0, x1, y) {
    const total = (max - min) * per, x = function (i) { return x0 + i / total * (x1 - x0); };
    let s = '';
    for (let i = 0; i <= total; i++) {
      const major = i % per === 0, xx = r1(x(i));
      s += '<path d="M' + xx + ' ' + y + 'v' + (major ? 26 : 15) + '" stroke-width="' + (major ? 3.2 : 2.2) + '"/>';
      if (major) s += '<text x="' + xx + '" y="' + (y + 50) + '" class="sc__n">' + (min + i / per) + '</text>';
    }
    return { s: '<g stroke="#10305E" stroke-linecap="round">' + s + '</g>', x: x };
  }
  const ARROW = 'M0 0L-11-20H-4.5V-44H4.5V-20H11Z';
  function scalePic(spec) {
    const min = spec.min || 0, W = 340, t = ticks(min, spec.max, spec.per, 28, W - 28, 62);
    const arrow = spec.at == null ? '' : '<path transform="translate(' + r1(t.x(spec.at)) + ' 58)" d="' + ARROW + '" fill="#E0453A" stroke="#FFFFFF" stroke-width="2.4" stroke-linejoin="round"/>';
    const box = el('div', { class: 'scl', role: 'img', 'aria-label': 'A scale from ' + min + ' to ' + spec.max + ' with ' + spec.per + ' small steps for each whole number' +
      (spec.at == null ? '' : '. The arrow is ' + spec.at + ' small steps after ' + min) + '.' });
    box.innerHTML = svg('0 0 ' + W + ' 124', '<rect x="10" y="50" width="' + (W - 20) + '" height="72" rx="12" fill="#FFF7DF" stroke="#C9A24B" stroke-width="2.5"/>' + t.s + arrow, 'scl__svg');
    if (spec.cap) box.appendChild(el('p', { class: 'scl__cap', html: spec.cap }));
    return box;
  }

  /* ---------- See it: a weighing scale with fruit on its pan ---------- */

  const MANGO = '<path d="M-15 1C-15-9-4-12 5-10 13-8 17-1 14 6 11 12 1 13-6 11-12 9-15 6-15 1Z" fill="#F6B52E" stroke="#A86A06" stroke-width="2"/>' +
    '<path d="M2-9C6-14 10-14 13-12" fill="none" stroke="#3E8E52" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="7" cy="-2" rx="5" ry="3.4" fill="#F27D52" opacity=".55"/>';
  function wscale(host, spec) {
    spec = spec || {};
    const max = spec.max || 3, per = spec.per || 4, total = max * per, base = spec.base || null, from = base ? base.at : 0, ev = T.tools.emitter();
    let at = Math.max(from, Math.min(total, spec.at != null ? spec.at : from)), locked = !!spec.fixed, can = spec.can || null;
    const W = 360, t = ticks(0, max, per, 52, W - 52, 152);
    const pic = el('div', { class: 'ws', role: 'img' });
    pic.innerHTML = svg('0 0 ' + W + ' 252',
      '<ellipse cx="180" cy="246" rx="150" ry="6" fill="rgba(16,48,94,.12)"/>' +
      '<rect x="166" y="80" width="28" height="26" fill="#8C3A74"/><rect x="24" y="100" width="312" height="144" rx="22" fill="#D45BA6" stroke="#7E2E63" stroke-width="3.5"/>' +
      '<rect x="40" y="114" width="280" height="114" rx="12" fill="#FFF7DF" stroke="#7E2E63" stroke-width="2.5"/>' + t.s +
      '<g class="ws__ptr"><path transform="translate(0 148)" d="' + ARROW + '" fill="#E0453A" stroke="#FFFFFF" stroke-width="2.4" stroke-linejoin="round"/></g>' +
      '<g class="ws__load"></g><path d="M64 84H296L282 96H78Z" fill="#B9C6DA" stroke="#55657F" stroke-width="3" stroke-linejoin="round"/>', 'ws__svg');
    const svgEl = pic.querySelector('svg'), load = pic.querySelector('.ws__load'), ptr = pic.querySelector('.ws__ptr');
    svgEl.appendChild(load);
    const cap = el('p', { class: 'scl__cap' }, 'kilograms (kg)');
    const root = el('div', { class: 'wsw' }, pic, cap);
    const off = tbtn('Take off', 'ws__b', { a: 'off' }, 'minus'), on = tbtn('Add a mango', 'ws__b', { a: 'on' }, 'plus');
    [off, on].forEach(function (b) { b.addEventListener('click', function () { act(b.dataset.a); }); });
    root.appendChild(el('div', { class: 'ws__ctl' }, off, on));
    let drawn = -1;
    function paint(fresh) {
      ptr.style.transform = 'translateX(' + r1(t.x(at)) + 'px)';
      const n = at - from;
      if (n !== drawn) {
        let s = base ? '<g transform="translate(' + (n ? 96 : 180) + ' 84)"><path d="M-30 0V-44Q-30-52-22-54H22Q30-52 30-44V0Z" fill="#F4EBD3" stroke="#8C6B2E" stroke-width="2.5"/>' +
          '<path d="M-22-54Q0-62 22-54" fill="none" stroke="#8C6B2E" stroke-width="2.5"/><text x="0" y="-18" class="ws__lab">' + base.label + '</text></g>' : '';
        const x0 = base ? 150 : 110;
        for (let i = 0; i < n; i++) {
          const row = Math.floor(i / 5), k = i % 5;
          s += '<g class="ws__m' + (fresh && i === n - 1 && !still() ? ' is-new' : '') + '" transform="translate(' + (x0 + k * 32 + row * 16) + ' ' + (72 - row * 20) + ')">' + MANGO + '</g>';
        }
        load.innerHTML = s;
        drawn = n;
      }
      pic.setAttribute('aria-label', 'A weighing scale in kilograms, with ' + per + ' small steps for each kilogram. On the pan: ' +
        (base ? 'a bag of rice' + (n ? ' and ' : '') : '') + (n || !base ? n + (n === 1 ? ' mango' : ' mangoes') : '') + '. The arrow is ' + at + ' small steps after 0.');
      root.dataset.at = String(at);
      off.disabled = locked || at <= from || !may(can, 'weigh');
      on.disabled = locked || at >= total || !may(can, 'weigh');
    }
    function act(a) {
      if (locked || !may(can, 'weigh')) return false;
      if (a === 'on' && at < total) at++; else if (a === 'off' && at > from) at--; else return false;
      sfx(a === 'on' ? 'snap' : 'pop');
      paint(a === 'on');
      ev.emit('change', get());
      ev.emit('trade', { act: 'weigh', at: at });
      return true;
    }
    function get() { return { at: at }; }
    paint(false);
    mount(host, root);
    return {
      el: root, get: get, on: ev.on, act: act,
      set: function (v) { if (v && v.at != null) { at = v.at; paint(false); } },
      solve: function (r) { if (r && r.at != null) { at = r.at; paint(false); } },
      ready: function () { return true; },
      lock: function () { locked = true; paint(false); },
      allow: function (c) { can = c || {}; locked = !!spec.fixed; paint(false); },
      tip: function () { return !on.disabled ? on : !off.disabled ? off : null; },
      destroy: function () { if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  /* ---------- draw a line to match ---------- */

  const LINE = ['#1F3F82', '#A65400', '#1F7A4D', '#7A3FB8'];
  function match(host, spec) {
    spec = spec || {};
    const L = spec.left || [], Rt = spec.right || [], want = spec.want || null, ev = T.tools.emitter();
    const pair = L.map(function () { return -1; });
    let sel = -1, locked = !!spec.fixed, can = spec.can || null, bad = [], timer = null, fresh = -1;
    const lines = el('svg:svg', { class: 'mt__lines', 'aria-hidden': 'true', focusable: 'false' });
    const cell = function (x, side, i) {
      const b = el('button', { type: 'button', class: ['mt__i', 'mt__' + side], dataset: { s: side, i: String(i) } }, el('span', { html: x.html || '' }));
      b.addEventListener('click', function () { tapOn(side, i, b); });
      return b;
    };
    const lb = L.map(function (x, i) { return cell(x, 'l', i); }), rb = Rt.map(function (x, i) { return cell(x, 'r', i); });
    const root = el('div', { class: ['mt', spec.wide && 'mt--wide'] }, lines, el('div', { class: 'mt__col' }, lb), el('div', { class: 'mt__col mt__col--r' }, rb));
    const open = function (i) { return !can || (!!can.rows && can.rows.indexOf(i) >= 0); };      // See it: allow({}) opens none
    const matched = function () { return pair.filter(function (x, i) { return x >= 0 && (!want || want[i] === x); }).length; };
    function paint() {
      const b = root.getBoundingClientRect();
      let s = '';
      if (b.width) pair.forEach(function (r, i) {
        if (r < 0) return;
        const a = lb[i].getBoundingClientRect(), c = rb[r].getBoundingClientRect();
        const x1 = a.right - b.left, y1 = a.top + a.height / 2 - b.top, x2 = c.left - b.left, y2 = c.top + c.height / 2 - b.top;
        s += '<circle cx="' + r1(x1) + '" cy="' + r1(y1) + '" r="5" fill="' + (bad.indexOf(i) >= 0 ? '#C8323F' : LINE[i % 4]) + '"/><circle cx="' + r1(x2) + '" cy="' + r1(y2) + '" r="5" fill="' + (bad.indexOf(i) >= 0 ? '#C8323F' : LINE[i % 4]) + '"/>' +
          '<path class="mt__ln' + (i === fresh && !still() ? ' is-new' : '') + '" pathLength="1" d="M' + r1(x1) + ' ' + r1(y1) + 'L' + r1(x2) + ' ' + r1(y2) + '" stroke="' + (bad.indexOf(i) >= 0 ? '#C8323F' : LINE[i % 4]) +
          '" stroke-width="4" stroke-linecap="round"' + (bad.indexOf(i) >= 0 ? ' stroke-dasharray=".04 .03"' : '') + '/>';
      });
      lines.setAttribute('viewBox', '0 0 ' + r1(b.width || 1) + ' ' + r1(b.height || 1));
      lines.innerHTML = s;
      fresh = -1;
      lb.forEach(function (x, i) {
        x.classList.toggle('is-sel', sel === i);
        x.classList.toggle('is-used', pair[i] >= 0);
        x.classList.toggle('is-bad', bad.indexOf(i) >= 0);
        x.disabled = locked || !open(i) || (!!want && pair[i] >= 0 && want[i] === pair[i]);
        x.setAttribute('aria-pressed', sel === i ? 'true' : 'false');
        x.setAttribute('aria-label', x.textContent + (pair[i] >= 0 ? ' Joined to: ' + rb[pair[i]].textContent + '.' : ''));
      });
      rb.forEach(function (x, i) {
        x.classList.toggle('is-used', pair.indexOf(i) >= 0);
        x.disabled = locked || (!!want && sel < 0) || (!!can && sel < 0);
      });
      root.dataset.matched = String(matched());
    }
    function shake(node) {
      if (still()) return;
      node.classList.remove('is-shake'); void node.offsetWidth; node.classList.add('is-shake');
    }
    function tapOn(side, i, node) {
      if (locked) return;
      bad = [];
      if (side === 'l') {
        if (!open(i)) return;
        if (pair[i] >= 0 && !want) { pair[i] = -1; sfx('pop'); }
        else sfx('tap');
        sel = i;
      } else {
        if (sel < 0) {
          const owner = pair.indexOf(i);
          if (owner >= 0 && !want) { pair[owner] = -1; sel = owner; sfx('pop'); paint(); ev.emit('change', get()); }
          else shake(node);
          return;
        }
        if (want && want[sel] !== i) { shake(node); sfx('no'); return; }       // See it: only the right word takes the line
        const owner = pair.indexOf(i);
        if (owner >= 0) pair[owner] = -1;
        pair[sel] = i;
        fresh = sel;
        sel = pair.findIndex(function (x, k) { return x < 0 && open(k); });
        sfx('snap');
        paint();
        ev.emit('change', get());
        ev.emit('trade', { act: 'match', matched: matched() });
        return;
      }
      paint();
      ev.emit('change', get());
    }
    function get() { return { pairs: pair.slice(), matched: matched(), said: pair.map(function (x, i) { return (i + 1) + '-' + (x >= 0 ? rb[x].textContent : '?'); }).join(' ') }; }
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(function () { paint(); }) : null;
    if (ro) ro.observe(root);
    mount(host, root);
    paint();
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(function () { paint(); });
    return {
      el: root, get: get, on: ev.on,
      set: function (v) { if (v && v.pairs) { v.pairs.forEach(function (x, i) { pair[i] = x; }); paint(); } },
      ready: function () { return pair.every(function (x) { return x >= 0; }); },
      solve: function (r) { if (r && r.pairs) { r.pairs.forEach(function (x, i) { pair[i] = x; }); bad = []; sel = -1; paint(); } },
      mark: function (wrong) {
        bad = (wrong || []).slice();
        paint();
        if (timer) clearTimeout(timer);
        if (locked) return;
        timer = setTimeout(function () { timer = null; if (locked) return; bad.forEach(function (i) { pair[i] = -1; }); bad = []; paint(); ev.emit('change', get()); }, still() ? 900 : 1200);
      },
      lock: function () { locked = true; sel = -1; paint(); },
      allow: function (c) { can = c || {}; locked = !!spec.fixed; sel = pair.findIndex(function (x, k) { return x < 0 && open(k); }); paint(); },
      tip: function () { return lb.find(function (b) { return !b.disabled && !b.classList.contains('is-used'); }) || null; },
      destroy: function () { if (timer) clearTimeout(timer); if (ro) ro.disconnect(); if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  T.tools.trial = trial;
  T.tools.jug = jug;
  T.tools.wscale = wscale;
  if (!T.tools.match) T.tools.match = match;      // a matching tool may come from another stop's file too: the same answers ({pairs})
  const kinds = T.tools.picKinds = T.tools.picKinds || {};
  kinds.bag = bagPic;
  kinds.spinner = spinPic;
  if (!kinds.table) kinds.table = table;
  kinds.tally = tallyPic;
  kinds.seqstrip = seqStrip;
  kinds.jug = function (spec) { return jug(null, Object.assign({}, spec, { fixed: true })).el; };
  kinds.scale = scalePic;
})(window.T = window.T || {});
