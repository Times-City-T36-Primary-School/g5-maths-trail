/* 39-tools-time.js - the maths tools of Stop 8 (time and timetables), flat on the light art plate (39-tools-time.css).
   Ported from Maths v2 (legacy/maths-v2/src/mui_e.js TOOLS.clock, TOOLS.match, PICS.clock, PICS.dclock, PICS.pair;
   mui_c.js PICS.table), drawn in the Grade 4 flat style, with the v2 answers kept: get() returns what the models'
   check(r) reads, solve(task.right) shows the right state.

   Every tool: T.tools.<name>(host, spec) -> { el, get(), on('change' | 'trade', fn), lock(), destroy(), ready(), solve(right),
     tip(), allow(can) }. host may be null. allow(can) is used by See it (one step at a time); without it everything works.

   T.tools.clock(host, spec)   a classroom clock. The blue buttons move the short hand 1 hour, the red buttons move the long
       hand 5 minutes (the hour hand turns with it, as on a real clock). spec = { h, m, fixed, secret (a picture that does
       not say its time), cap, dig (See it: a digital clock beside it with the 24-hour time and two buttons, a.m. and p.m.),
       pm }. get() -> { h (1 to 12), m } (and pm with dig); allow({ min, hour, ampm }); trade { act: 'move' | 'ampm', h, m }
   T.tools.match(host, spec)   draw a line to match (the model tmatch): tap a card on the left, then its partner on the right.
       spec = { left: [card], right: [card], wide }, card = { html, fig, alt }. get() -> { pairs: [right index per left card,
       -1 = none] }; ready() when every card has a partner; mark(wrong) shows the wrong lines in red, then rubs them out.
       Only made here when no other file has made T.tools.match (the same v2 shapes: { pairs }).
   T.tools.ttable(host, spec)  See it: a timetable whose times are buttons, and a time line under it.
       spec = { table: { kind, stops, runs }, line: ['10:40', '11:25'] }. Tap a time: its row and its column light up.
       Jump counts on along the time line (to the next whole hour first, then whole hours, then the minutes left).
       get() -> { t (the time tapped), done (every jump made) }; allow({ cell, jump }); trade { act: 'cell', t } and
       { act: 'jump', done }
   Pictures (T.tools.pic): { k: 'clock', h, m, secret, cap }, { k: 'dclock', t, cap } (a digital clock),
       { k: 'pair', a, b, mid } (two pictures with a sign between them), { k: 'dayhops', terms: ['Mon 7 a.m.', ...], labs }
       (jumps over days: each box shows the day, then the time), { k: 'table', head, rows, cap } (a timetable or a
       table: the first row and the first column are headings)
   Motion: transform and opacity only (the hands turn, a time pops, a line and an arc draw themselves like a pen);
   still = the final state at once (00-tokens.css). */
(function (T) {
  'use strict';

  const el = T.util.el;
  const sfx = function (name) { if (T.fx && T.fx.sfx) T.fx.sfx(name); };
  const mount = function (host, node) { if (host) host.appendChild(node); return node; };
  const may = function (can, k) { return !can || !!can[k]; };
  const pad = function (n) { return (n < 10 ? '0' : '') + n; };
  function tbtn(label, cls, data, iconStart, aria) {
    const b = el('button', { type: 'button', class: ['btn', 'tl__btn', cls], dataset: data || {} },
      iconStart ? T.ui.icon(iconStart) : null, label ? el('span', { class: 'btn__label' }, label) : null);
    if (aria) b.setAttribute('aria-label', aria);
    return b;
  }
  const mins = function (s) { const p = String(s).split(':'); return +p[0] * 60 + +p[1]; };
  const hhmm = function (t) { t = ((t % 1440) + 1440) % 1440; return pad(Math.floor(t / 60)) + ':' + pad(t % 60); };
  const short = function (n) { return n >= 60 ? Math.floor(n / 60) + ' h' + (n % 60 ? ' ' + n % 60 + ' min' : '') : n + ' min'; };

  /* ---------- the clock face (flat: a steel blue rim, ticks, numbers, two hands) ---------- */

  function faceSvg(cls) {
    let s = '<circle class="tc__rim" cx="100" cy="100" r="95"/><circle class="tc__face" cx="100" cy="100" r="85"/>';
    for (let i = 0; i < 60; i++) {
      const a = i * 6 * Math.PI / 180, big = i % 5 === 0, r1 = big ? 72 : 77;
      s += '<line class="' + (big ? 'tc__tk tc__tk--big' : 'tc__tk') + '" x1="' + (100 + r1 * Math.sin(a)).toFixed(1) + '" y1="' + (100 - r1 * Math.cos(a)).toFixed(1) +
        '" x2="' + (100 + 82 * Math.sin(a)).toFixed(1) + '" y2="' + (100 - 82 * Math.cos(a)).toFixed(1) + '"/>';
    }
    for (let n = 1; n <= 12; n++) {
      const a = n * 30 * Math.PI / 180;
      s += '<text class="tc__n" x="' + (100 + 57 * Math.sin(a)).toFixed(1) + '" y="' + (100 - 57 * Math.cos(a) + 6.5).toFixed(1) + '">' + n + '</text>';
    }
    s += '<g class="tc__hh"><path d="M100 54 L107 98 L100 112 L93 98 Z"/></g>' +
      '<g class="tc__mh"><path d="M100 30 L104.5 98 L100 114 L95.5 98 Z"/></g>' +
      '<circle class="tc__pin" cx="100" cy="100" r="7"/><circle class="tc__pin2" cx="100" cy="100" r="2.6"/>';
    return '<svg class="' + cls + '" viewBox="0 0 200 200" aria-hidden="true" focusable="false">' + s + '</svg>';
  }

  function clock(host, spec) {
    spec = spec || {};
    const fixed = !!spec.fixed, dig = !!spec.dig && !fixed, DAY = dig ? 1440 : 720, ev = T.tools.emitter();
    let t = (((spec.h == null ? 12 : spec.h) % 12) + (dig && spec.pm ? 12 : 0)) * 60 + (spec.m || 0);
    t = ((t % DAY) + DAY) % DAY;
    let locked = fixed, can = spec.can || null;
    let spinM = (t % 60) * 6, spinH = (t % 720) * 0.5;      // the hands keep turning the same way, they never jump back at 12
    const box = el('div', { class: 'tc__box', html: faceSvg('tc__svg') });
    const faceEl = el('div', { class: 'tc__clock', role: 'img' }, box);
    const root = el('div', { class: ['tc', fixed && 'tc--mini', dig && 'tc--dig'] }, faceEl);
    const hh = box.querySelector('.tc__hh'), mh = box.querySelector('.tc__mh');
    const btn = {};
    let read24 = null, read12 = null, ap = {};
    if (!fixed) {
      btn.h0 = tbtn('1 hour', 'tc__b tc__b--h', { d: '-60' }, 'minus', 'Short hand back 1 hour');
      btn.h1 = tbtn('1 hour', 'tc__b tc__b--h', { d: '60' }, 'plus', 'Short hand on 1 hour');
      btn.m0 = tbtn('5 min', 'tc__b tc__b--m', { d: '-5' }, 'minus', 'Long hand back 5 minutes');
      btn.m1 = tbtn('5 min', 'tc__b tc__b--m', { d: '5' }, 'plus', 'Long hand on 5 minutes');
      const ctl = el('div', { class: 'tc__ctl' },
        el('div', { class: 'tc__pair' }, el('span', { class: 'tc__lab tc__lab--h' }, 'Short hand'), el('div', { class: 'tc__row' }, btn.h0, btn.h1)),
        el('div', { class: 'tc__pair' }, el('span', { class: 'tc__lab tc__lab--m' }, 'Long hand'), el('div', { class: 'tc__row' }, btn.m0, btn.m1)));
      ctl.addEventListener('click', function (e) {
        const b = e.target.closest('[data-d]');
        if (!b || b.disabled) return;
        move(+b.dataset.d);
      });
      if (dig) {
        read24 = el('b', { class: 'tc__d24' });
        read12 = el('span', { class: 'tc__d12' });
        ['am', 'pm'].forEach(function (k) {
          ap[k] = el('button', { type: 'button', class: 'btn tl__btn tc__ap', dataset: { ap: k }, 'aria-pressed': 'false' }, k === 'am' ? 'a.m.' : 'p.m.');
          ap[k].addEventListener('click', function () { flip(k === 'pm'); });
        });
        root.appendChild(el('div', { class: 'tc__digi' },
          el('div', { class: 'tc__screen', 'aria-live': 'polite' }, read24, read12),
          el('div', { class: 'tc__aps', role: 'group', 'aria-label': 'Morning or afternoon' }, ap.am, ap.pm)));
      }
      root.appendChild(ctl);
    }
    if (spec.cap) root.appendChild(el('p', { class: 'tc__cap', html: spec.cap }));

    function get() {
      const x = { h: Math.floor((t % 720) / 60) || 12, m: t % 60 };
      if (dig) x.pm = t >= 720;
      return x;
    }
    function say() {
      const x = get();
      return x.h + ':' + pad(x.m) + (dig ? (x.pm ? ' p.m.' : ' a.m.') : '');
    }
    function paint() {
      hh.style.transform = 'rotate(' + spinH + 'deg)';
      mh.style.transform = 'rotate(' + spinM + 'deg)';
      faceEl.setAttribute('aria-label', 'Clock' + (fixed && spec.secret ? '' : ' showing ' + say()));
      Object.keys(btn).forEach(function (k) { btn[k].disabled = locked || !may(can, k.charAt(0) === 'h' ? 'hour' : 'min'); });
      if (dig) {
        const x = get();
        read24.textContent = hhmm(t);
        read12.textContent = x.h + ':' + pad(x.m) + (x.pm ? ' p.m.' : ' a.m.');
        ['am', 'pm'].forEach(function (k) {
          const on = (k === 'pm') === x.pm;
          ap[k].classList.toggle('is-on', on);
          ap[k].setAttribute('aria-pressed', on ? 'true' : 'false');
          ap[k].disabled = locked || on || !may(can, 'ampm');
        });
      }
      root.setAttribute('data-get', JSON.stringify(get()));
    }
    function move(d) {
      if (locked) return;
      t = ((t + d) % DAY + DAY) % DAY;
      spinM += d * 6; spinH += d * 0.5;
      sfx('snap');
      paint();
      ev.emit('change', get());
      ev.emit('trade', Object.assign({ act: 'move' }, get()));
    }
    function flip(pm) {
      if (locked || !may(can, 'ampm') || (t >= 720) === pm) return;
      t = (t + 720) % 1440;
      sfx('pick');
      if (read24) { read24.classList.remove('is-tick'); void read24.offsetWidth; read24.classList.add('is-tick'); }
      paint();
      ev.emit('change', get());
      ev.emit('trade', Object.assign({ act: 'ampm' }, get()));
    }
    paint();
    mount(host, root);
    return {
      el: root, get: get, on: ev.on, move: move,
      solve: function (r) {
        if (!r) return;
        let goal = ((r.h % 12) + (dig && r.pm ? 12 : 0)) * 60 + r.m, d = goal - t;
        if (!dig && d < 0) d += 720;                        // turn on, the way a clock goes
        spinM += d * 6; spinH += d * 0.5; t = goal;
        paint();
      },
      ready: function () { return true; },
      lock: function () { locked = true; paint(); },
      allow: function (c) { can = c || {}; locked = fixed; paint(); },
      tip: function () { return btn.m1 && !btn.m1.disabled ? btn.m1 : btn.h1 && !btn.h1.disabled ? btn.h1 : ap.pm && !ap.pm.disabled ? ap.pm : ap.am && !ap.am.disabled ? ap.am : null; },
      destroy: function () { if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  /* ---------- draw a line to match (the v2 TOOLS.match, flat) ---------- */

  const LINE = ['#1F4FA8', '#B25A00', '#1F7A4D', '#7A3FB8'];
  function match(host, spec) {
    spec = spec || {};
    const L = spec.left || [], R = spec.right || [], pair = L.map(function () { return -1; }), ev = T.tools.emitter();
    let sel = -1, locked = false, bad = [], fresh = -1, ro = null, timer = null;
    const svg = el('svg:svg', { class: 'lm__lines', 'aria-hidden': 'true', focusable: 'false' });
    const card = function (x, side, i) {
      const b = el('button', { type: 'button', class: ['lm__i', 'lm__i--' + side], dataset: { s: side, i: String(i) } });
      if (x.html) b.appendChild(el('span', { class: 'lm__t', html: x.html }));
      if (x.fig) { const p = T.tools.pic(x.fig); if (p) b.appendChild(p); }
      b.dataset.say = x.alt || (b.textContent || '').trim() || (side === 'l' ? 'card ' : 'partner ') + (i + 1);
      return b;
    };
    const lefts = L.map(function (x, i) { return card(x, 'l', i); }), rights = R.map(function (x, i) { return card(x, 'r', i); });
    const root = el('div', { class: ['lm', spec.wide && 'lm--wide'] }, svg,
      el('div', { class: 'lm__col', role: 'group', 'aria-label': 'Left' }, lefts), el('div', { class: 'lm__col', role: 'group', 'aria-label': 'Right' }, rights));
    function paint() {
      const b = root.getBoundingClientRect();
      let s = '';
      pair.forEach(function (r, i) {
        if (r < 0) return;
        const a = lefts[i].getBoundingClientRect(), c = rights[r].getBoundingClientRect();
        const x1 = a.right - b.left, y1 = a.top + a.height / 2 - b.top, x2 = c.left - b.left, y2 = c.top + c.height / 2 - b.top;
        s += '<line class="lm__ln' + (i === fresh ? ' is-new' : '') + '" pathLength="1" x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) +
          '" stroke="' + (bad.indexOf(i) >= 0 ? '#D9475F' : LINE[i % LINE.length]) + '"/>' +
          '<circle cx="' + x1.toFixed(1) + '" cy="' + y1.toFixed(1) + '" r="5" fill="' + LINE[i % LINE.length] + '"/><circle cx="' + x2.toFixed(1) + '" cy="' + y2.toFixed(1) + '" r="5" fill="' + LINE[i % LINE.length] + '"/>';
      });
      svg.setAttribute('viewBox', '0 0 ' + Math.max(1, b.width).toFixed(1) + ' ' + Math.max(1, b.height).toFixed(1));
      svg.innerHTML = s;
      fresh = -1;
      lefts.forEach(function (x, i) {
        x.classList.toggle('is-sel', sel === i);
        x.classList.toggle('is-used', pair[i] >= 0);
        x.classList.toggle('is-bad', bad.indexOf(i) >= 0);
        x.disabled = locked;
        x.setAttribute('aria-pressed', sel === i ? 'true' : 'false');
        x.setAttribute('aria-label', x.dataset.say + (pair[i] >= 0 ? ', joined to ' + rights[pair[i]].dataset.say : ''));
      });
      rights.forEach(function (x, j) { x.classList.toggle('is-used', pair.indexOf(j) >= 0); x.disabled = locked; x.setAttribute('aria-label', x.dataset.say); });
      root.setAttribute('data-get', JSON.stringify({ pairs: pair }));
    }
    root.addEventListener('click', function (e) {
      const x = e.target.closest('.lm__i');
      if (!x || locked) return;
      const i = +x.dataset.i;
      bad = [];
      if (x.dataset.s === 'l') {
        if (pair[i] >= 0) { pair[i] = -1; sfx('pop'); } else sfx('pick');
        sel = i;
      } else {
        const owner = pair.indexOf(i);
        if (sel >= 0) { if (owner >= 0) pair[owner] = -1; pair[sel] = i; fresh = sel; sel = pair.indexOf(-1); sfx('snap'); }
        else if (owner >= 0) { pair[owner] = -1; sel = owner; sfx('pop'); }
        else { x.classList.remove('is-shake'); void x.offsetWidth; x.classList.add('is-shake'); return; }
      }
      paint();
      ev.emit('change', { pairs: pair.slice() });
    });
    mount(host, root);
    if (window.ResizeObserver) { ro = new ResizeObserver(function () { paint(); }); ro.observe(root); }
    requestAnimationFrame(paint);
    return {
      el: root, on: ev.on,
      get: function () { return { pairs: pair.slice() }; },
      ready: function () { return pair.every(function (x) { return x >= 0; }); },
      lock: function () { locked = true; sel = -1; paint(); },
      mark: function (wrong) {
        bad = (wrong || []).slice(); paint();
        clearTimeout(timer);
        timer = setTimeout(function () { if (locked) return; bad.forEach(function (i) { pair[i] = -1; }); sel = bad.length ? bad[0] : sel; bad = []; paint(); ev.emit('change', { pairs: pair.slice() }); }, 1000);
      },
      solve: function (r) { if (!r || !r.pairs) return; r.pairs.forEach(function (x, i) { pair[i] = x; }); bad = []; sel = -1; paint(); },
      tip: function () { return lefts[0] || null; },
      allow: function () {},
      destroy: function () { clearTimeout(timer); if (ro) ro.disconnect(); if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  /* ---------- a table (a timetable: the first row and the first column are headings) ---------- */

  function tableEl(spec, cell) {
    const head = spec.head, rows = spec.rows || [];
    const t = el('table', { class: ['ttb__t', 'ttb__t--c' + Math.min(5, (head || rows[0] || []).length)] });
    if (head) t.appendChild(el('thead', el('tr', head.map(function (x, j) { return el('th', { scope: 'col', html: String(x), dataset: { c: String(j) } }); }))));
    t.appendChild(el('tbody', rows.map(function (r, i) {
      return el('tr', r.map(function (x, j) {
        return j ? el('td', { dataset: { r: String(i), c: String(j) } }, cell ? cell(x, i, j) : el('span', { html: String(x) })) : el('th', { scope: 'row', html: String(x), dataset: { r: String(i) } });
      }));
    })));
    return t;
  }
  function tablePic(spec) {
    const box = el('div', { class: 'ttb' }, el('div', { class: 'ttb__wrap' }, tableEl(spec)));
    if (spec.cap) box.appendChild(el('p', { class: 'ttb__cap', html: spec.cap }));
    return box;
  }

  /* ---------- See it: a timetable with times to tap, and a time line to count on ---------- */

  // the jumps from a to b (times in minutes): to the next whole hour, then whole hours, then the minutes left
  function jumps(a, b) {
    const out = [a];
    let x = a;
    if (x % 60) { x = Math.min(b, (Math.floor(x / 60) + 1) * 60); out.push(x); }
    if (b - x >= 60) { x = Math.floor(b / 60) * 60; if (x !== out[out.length - 1]) out.push(x); }
    if (x < b) out.push(b);
    return out;
  }

  function ttable(host, spec) {
    spec = spec || {};
    const tb = spec.table || { stops: [], runs: [] }, ev = T.tools.emitter();
    const LET = 'ABCDE';
    let locked = false, can = spec.can || null, picked = '', hop = 0;
    const cells = [];
    const table = tableEl({ head: [tb.kind || ''].concat(tb.runs.map(function (x, i) { return LET[i]; })), rows: tb.stops.map(function (s, i) { return [s].concat(tb.runs.map(function (run) { return run[i]; })); }) },
      function (x, i, j) {
        const b = el('button', { type: 'button', class: 'tt__cell', dataset: { t: x, r: String(i), c: String(j) }, 'aria-label': tb.stops[i] + ', ' + (tb.kind || '') + ' ' + LET[j - 1] + ': ' + x }, x);
        cells.push(b);
        return b;
      });
    table.addEventListener('click', function (e) {
      const b = e.target.closest('.tt__cell');
      if (!b || b.disabled) return;
      pick(b);
    });
    const line = spec.line ? jumps(mins(spec.line[0]), mins(spec.line[1])) : null;
    const lineBox = el('div', { class: 'tt__line', hidden: true });
    const jumpBtn = line ? tbtn('Jump', 'tt__jump', { a: 'jump' }, 'next', 'Jump on along the time line') : null;
    const total = el('b', { class: 'tt__total', 'aria-live': 'polite' });
    if (jumpBtn) jumpBtn.addEventListener('click', function () { jump(); });
    const root = el('div', { class: 'tt' }, el('div', { class: 'ttb tt__table' }, el('div', { class: 'ttb__wrap' }, table)));
    if (line) root.appendChild(el('div', { class: 'tt__foot' }, lineBox, el('div', { class: 'tt__ctl' }, jumpBtn, total)));

    function drawLine(popAt) {
      const n = line.length, cw = 104, bw = 80, bh = 40, W = n * cw, cy = 70, H = cy + bh / 2 + 4, top = cy - bh / 2 - 4;
      let s = '';
      for (let i = 0; i < n; i++) {
        const x = i * cw + cw / 2, shown = i === 0 || i === n - 1 || i <= hop;
        if (i < n - 1 && i < hop) {
          const x1 = x + 10, x2 = x + cw - 10, xm = x + cw / 2, isNew = i === popAt - 1;
          s += '<path class="tt__arc' + (isNew ? ' is-new' : '') + '" pathLength="1" d="M' + x1 + ' ' + top + ' Q' + xm + ' ' + (top - 34) + ' ' + x2 + ' ' + top + '"/>' +
            '<text class="tt__lab' + (isNew ? ' is-new' : '') + '" x="' + xm + '" y="' + (top - 22) + '">' + short(line[i + 1] - line[i]) + '</text>';
        }
        if (shown) s += '<g class="tt__node' + (i === popAt ? ' is-new' : '') + (i === n - 1 ? ' is-end' : '') + '"><rect x="' + (x - bw / 2) + '" y="' + (cy - bh / 2) + '" width="' + bw + '" height="' + bh + '" rx="' + bh / 2 + '"/>' +
          '<text x="' + x + '" y="' + (cy + 7) + '">' + hhmm(line[i]) + '</text></g>';
      }
      lineBox.innerHTML = '<svg class="tt__svg" viewBox="0 -6 ' + W + ' ' + (H + 6) + '" role="img" aria-label="A time line from ' + hhmm(line[0]) + ' to ' + hhmm(line[n - 1]) +
        (hop ? ': ' + line.slice(1, hop + 1).map(function (v, i) { return short(v - line[i]); }).join(', then ') : '') + '">' + s + '</svg>';
      const done = hop >= n - 1;
      total.textContent = done ? '= ' + short(line[n - 1] - line[0]) : '';
      total.hidden = !done;
    }
    function pick(b) {
      if (locked || !may(can, 'cell')) return;
      picked = b.dataset.t;
      const r = b.dataset.r, c = b.dataset.c;
      cells.forEach(function (x) { x.classList.toggle('is-on', x === b); x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      T.util.$$('th[data-r], th[data-c]', table).forEach(function (h) { h.classList.toggle('is-lit', h.dataset.r === r || h.dataset.c === c); });
      T.util.$$('td', table).forEach(function (d) { d.classList.toggle('is-lit', d.dataset.r === r || d.dataset.c === c); });
      sfx('pick');
      paint();
      ev.emit('change', get());
      ev.emit('trade', { act: 'cell', t: picked });
    }
    function jump() {
      if (locked || !line || !may(can, 'jump') || hop >= line.length - 1) return;
      hop++;
      sfx('slide');
      drawLine(hop);
      paint();
      ev.emit('change', get());
      ev.emit('trade', { act: 'jump', done: hop >= line.length - 1 });
    }
    function get() { return { t: picked, done: !!line && hop >= line.length - 1 }; }
    function paint() {
      cells.forEach(function (x) { x.disabled = locked || !may(can, 'cell'); });
      if (line) {
        const show = (can && can.jump) || hop > 0;
        if (show && lineBox.hidden) { lineBox.hidden = false; drawLine(-1); }
        lineBox.hidden = !show;
        jumpBtn.hidden = !show;
        jumpBtn.disabled = locked || !may(can, 'jump') || hop >= line.length - 1;
      }
      root.setAttribute('data-get', JSON.stringify(get()));
    }
    if (line) drawLine(-1);
    paint();
    mount(host, root);
    return {
      el: root, get: get, on: ev.on,
      ready: function () { return true; },
      lock: function () { locked = true; paint(); },
      allow: function (c) { can = c || {}; locked = false; paint(); },
      tip: function () { return jumpBtn && !jumpBtn.hidden && !jumpBtn.disabled ? jumpBtn : cells.filter(function (x) { return !x.disabled; })[0] || null; },
      destroy: function () { if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  /* ---------- the pictures ---------- */

  function dclock(spec) {
    const box = el('div', { class: 'dck', role: 'img', 'aria-label': 'Digital clock showing ' + spec.t + (spec.cap ? ', ' + String(spec.cap).replace(/<[^>]+>/g, '') : '') },
      el('span', { class: 'dck__screen' }, el('b', { class: 'dck__t' }, spec.t)));
    if (spec.cap) box.appendChild(el('small', { class: 'dck__cap', html: spec.cap }));
    return box;
  }
  function pairPic(spec) {
    const a = T.tools.pic(spec.a), b = T.tools.pic(spec.b);
    return el('div', { class: 'tpair' }, a, el('b', { class: 'tpair__mid', 'aria-hidden': 'true' }, spec.mid || '='), b);
  }

  // jumps over days (the model tacross): each time in a box on two lines, the day on top ("Mon", then "7 a.m."), so a
  // long time fits its box; the arcs and their labels as in the hops picture (39-tools-lines.js)
  function dayHops(spec) {
    const terms = spec.terms || [], labs = spec.labs || [], n = terms.length, cw = 118, bw = 100, bh = 62, W = n * cw, cy = 84, top = cy - bh / 2 - 4, H = cy + bh / 2 + 6;
    let s = '';
    terms.forEach(function (t, i) {
      const x = i * cw + cw / 2, k = String(t).indexOf(' '), day = k > 0 ? t.slice(0, k) : '', time = k > 0 ? t.slice(k + 1) : t;
      if (i < n - 1) {
        const x1 = x + 10, x2 = x + cw - 10, xm = x + cw / 2;
        s += '<path class="hp__a" d="M' + x1 + ' ' + top + ' Q' + xm + ' ' + (top - 34) + ' ' + x2 + ' ' + top + '"/>' +
          '<path class="hp__a" d="M' + (x2 - 9) + ' ' + (top - 3) + ' L' + x2 + ' ' + top + ' L' + (x2 - 2) + ' ' + (top - 10) + '"/>' +
          (labs[i] ? '<text class="hp__l" x="' + xm + '" y="' + (top - 24) + '">' + labs[i] + '</text>' : '');
      }
      s += '<rect class="hp__b" x="' + (x - bw / 2) + '" y="' + (cy - bh / 2) + '" width="' + bw + '" height="' + bh + '" rx="18"/>' +
        '<text class="hp__t tdh__d" x="' + x + '" y="' + (cy - 6) + '">' + day + '</text><text class="hp__t" x="' + x + '" y="' + (cy + 21) + '">' + time + '</text>';
    });
    const box = el('div', { class: 'hops tdh' });
    box.innerHTML = '<svg class="hops__svg" viewBox="0 0 ' + W + ' ' + H + '" style="max-width:' + Math.round(W * 1.1) + 'px" role="img" aria-label="' +
      terms.join(', then ') + (labs.length ? '. Jumps: ' + labs.join(' and ') : '') + '">' + s + '</svg>';
    return box;
  }

  T.tools.clock = clock;
  if (!T.tools.match) T.tools.match = match;
  T.tools.ttable = ttable;
  T.tools.timeJumps = jumps;
  const kinds = T.tools.picKinds = T.tools.picKinds || {};
  kinds.clock = function (spec) { return clock(null, Object.assign({}, spec, { fixed: true })).el; };
  kinds.dclock = dclock;
  kinds.pair = pairPic;
  kinds.dayhops = dayHops;
  if (!kinds.table) kinds.table = tablePic;
})(window.T = window.T || {});
