/* 39-tools-fractions.js - the maths tools of Stop 7 (fractions), flat on the light art plate (39-tools-fractions.css).
   Ported from Maths v2 (legacy/maths-v2/src/mui_d.js TOOLS.strip, TOOLS.share, PICS.fbar, PICS.fbars, PICS.pizzas,
   PICS.share), drawn in the Grade 4 flat style, with the v2 answers kept: get() returns what the models' check(r) reads,
   solve(task.right) shows the right state.

   Every tool: T.tools.<name>(host, spec) -> { el, get(), on('change' | 'trade', fn), lock(), destroy(), ready(), solve(right),
     tip(), allow(can) }. host may be null. allow(can) is used by See it (one step at a time); without it everything works.

   T.tools.strip(host, spec)   a paper strip cut into equal parts, "Fewer" and "More"; one part is orange (the model cutbar).
       spec = { parts (1), max (12), wall: [2, 4, 8] (See it: a strip of each of these sizes stays under the big one once it
       is reached, with its unit fraction: a small fraction wall) }. get() -> { parts }; allow({ more, less });
       trade { act: 'cut', parts }
   T.tools.fshare(host, spec)  n counters shared among plates: "Give 1 to each plate" and "Take back" (the model fracof with
       counters; the v2 TOOLS.share). spec = { n, plates, each (0), frac (one plate is marked as the unit fraction; on by
       itself in a fracof question) }. get() -> { each, left }; allow({ deal, back }); trade { act: 'deal' | 'back', each }.
       T.tools.share is the same tool, unless another file (Stop 6) has made its own first.
   T.tools.fcmp(host, spec)    See it only: two unit fractions compared. Two strips of the same length, cut into a and b
       parts, one part of each orange. Tap the strip whose part is bigger, then the sign (<, > or =) between the fractions.
       spec = { a, b }. get() -> { pick (the bottom number of the strip tapped), sym }; allow({ pick: 3 } | { sign: '>' }):
       a wrong tap shakes; trade { act: 'pick', pick } and { act: 'sign', sym }
   Pictures (T.tools.pic): { k: 'fbar', parts, shade, cap }, { k: 'fbars', list } (strips of the same length under each
       other, each with its unit fraction), { k: 'pizzas', wholes, people, kind: 'pizza' | 'cake', cut, take } (each one cut
       into as many slices as there are people, one person's slices blue), { k: 'share', n, plates, each } (only if no
       other file has made it)
   T.tools.fracText(node): every "1/4" written in the text of node becomes a fraction as on paper (the Lightning round).
   Motion: transform and opacity only (the orange part shrinks or grows along the strip, a new cut fades in, counters pop
   onto the plates one plate after another, a wrong tap shakes); still = the final state at once (00-tokens.css). */
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
  let uid = 0;
  const NAMES = { 1: 'whole', 2: 'half', 3: 'third', 4: 'quarter', 5: 'fifth', 6: 'sixth', 7: 'seventh', 8: 'eighth', 9: 'ninth', 10: 'tenth', 11: 'eleventh', 12: 'twelfth' };
  const name = function (d) { return NAMES[d] || d + 'th'; };
  // a fraction as it is written on paper: the top number over the bottom number (39-tools-fractions.css .fr)
  const F = function (n, d) { return '<span class="fr"><i>' + n + '</i><span class="frs">/</span><i>' + d + '</i></span>'; };
  function tbtn(label, cls, data, iconStart, aria) {
    const b = el('button', { type: 'button', class: ['btn', 'tl__btn', cls], dataset: data || {} },
      iconStart ? T.ui.icon(iconStart) : null, label ? el('span', { class: 'btn__label' }, label) : null);
    if (aria) b.setAttribute('aria-label', aria);
    return b;
  }
  function shake(node) {
    if (!node || still()) return;
    node.classList.remove('is-shake');
    void node.getBoundingClientRect();
    node.classList.add('is-shake');
    setTimeout(function () { node.classList.remove('is-shake'); }, 400);
  }

  /* ---------- a strip cut into equal parts (SVG) ---------- */

  const SW = 480, SH = 64;
  // the svg of a strip: parts, the first `shade` of them orange; lit: the orange part as one rect that can shrink (the tool)
  function stripSvg(parts, shade, opts) {
    opts = opts || {};
    const id = 'fsc' + (++uid), w = SW / parts, h = opts.h || SH, r = Math.min(12, h / 4);
    let s = '<defs><clipPath id="' + id + '"><rect x="4" y="4" width="' + SW + '" height="' + h + '" rx="' + r + '"/></clipPath></defs>' +
      '<rect class="fs__bg" x="4" y="4" width="' + SW + '" height="' + h + '" rx="' + r + '"/><g clip-path="url(#' + id + ')">';
    if (opts.lit) s += '<rect class="fs__lit" x="4" y="4" width="' + SW + '" height="' + h + '" style="transform:scaleX(' + (1 / parts).toFixed(4) + ')"/>';
    else for (let i = 0; i < shade; i++) s += '<rect class="fs__on" x="' + (4 + i * w).toFixed(2) + '" y="4" width="' + w.toFixed(2) + '" height="' + h + '"/>';
    s += '</g>';
    for (let i = 1; i < parts; i++) s += '<path class="fs__cut' + (opts.fresh && i >= opts.fresh ? ' is-new' : '') + '" d="M' + (4 + i * w).toFixed(2) + ' 4V' + (4 + h) + '"/>';
    s += '<rect class="fs__edge" x="4" y="4" width="' + SW + '" height="' + h + '" rx="' + r + '"/>';
    return '<svg class="fs__svg" viewBox="0 0 ' + (SW + 8) + ' ' + (h + 8) + '" aria-hidden="true" focusable="false">' + s + '</svg>';
  }

  function strip(host, spec) {
    spec = spec || {};
    const mx = spec.max || 12, ev = T.tools.emitter(), wall = Array.isArray(spec.wall) ? spec.wall : null;
    let parts = Math.max(1, Math.min(mx, spec.parts || 1)), locked = !!spec.fixed, can = spec.can || null;
    const seen = [];
    const felt = el('div', { class: 'fs__felt', role: 'img' });
    const big = el('div', { class: 'fs__big' });
    felt.appendChild(big);
    const wallBox = wall ? el('div', { class: 'fs__wall' }) : null;
    if (wallBox) felt.appendChild(wallBox);
    const root = el('div', { class: 'fs' }, felt);
    const less = tbtn('Fewer', 'fs__btn', { a: 'less' }, 'minus', 'Fewer parts');
    const more = tbtn('More', 'fs__btn fs__btn--more', { a: 'more' }, 'plus', 'More parts');
    const info = el('b', { class: 'fs__info', 'aria-live': 'polite' });
    less.addEventListener('click', function () { step(-1); });
    more.addEventListener('click', function () { step(1); });
    root.appendChild(el('div', { class: 'fs__ctl' }, less, info, more));

    function paintWall(fresh) {
      if (!wallBox) return;
      if (wall.indexOf(parts) >= 0 && seen.indexOf(parts) < 0) seen.push(parts);
      if (wallBox.childNodes.length === seen.length) return;
      T.ui.empty(wallBox);
      seen.forEach(function (p, i) {
        const row = el('div', { class: ['fs__row', fresh && i === seen.length - 1 && !still() && 'is-new'] },
          el('span', { class: 'fs__lab', html: F(1, p) }), el('span', { class: 'fs__mini', html: stripSvg(p, 1, { h: 40 }) }));
        wallBox.appendChild(row);
      });
    }
    let shown = parts;
    function paint(fresh) {
      const grow = fresh && parts > shown ? shown : 0;
      // the orange part is drawn at its old size, then shrinks (or grows) to one part: a transform only
      big.innerHTML = stripSvg(parts, 1, { lit: true, fresh: grow });
      const lit = big.querySelector('.fs__lit');
      if (fresh && !still() && lit && shown !== parts) {
        lit.style.transform = 'scaleX(' + (1 / shown).toFixed(4) + ')';
        void lit.getBoundingClientRect();
        lit.style.transform = 'scaleX(' + (1 / parts).toFixed(4) + ')';
      }
      shown = parts;
      const say = parts === 1 ? '1 whole' : parts + ' equal parts';
      info.textContent = say;
      felt.setAttribute('aria-label', parts === 1 ? 'A strip: 1 whole, not cut yet.' : 'A strip cut into ' + parts + ' equal parts. One part is orange: one ' + name(parts) + '.');
      less.disabled = locked || parts <= 1 || !may(can, 'less');
      more.disabled = locked || parts >= mx || !may(can, 'more');
      paintWall(fresh);
    }
    function step(k) {
      if (locked || !may(can, k > 0 ? 'more' : 'less')) return false;
      if ((k > 0 && parts >= mx) || (k < 0 && parts <= 1)) return false;
      parts += k;
      sfx(k > 0 ? 'snap' : 'pop');
      paint(true);
      ev.emit('change', get());
      ev.emit('trade', { act: 'cut', parts: parts });
      return true;
    }
    function get() { return { parts: parts }; }
    paint(false);
    mount(host, root);
    return {
      el: root, get: get, on: ev.on, step: step,
      solve: function (r) { if (r && r.parts) { parts = r.parts; paint(true); } },
      ready: function () { return true; },
      lock: function () { locked = true; paint(false); },
      allow: function (c) { can = c || {}; locked = !!spec.fixed; paint(false); },
      tip: function () { return !more.disabled ? more : !less.disabled ? less : null; },
      destroy: function () { if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  /* ---------- counters shared among plates ---------- */

  const dot = function (x, y, r, cls, delay) {
    return '<circle class="' + cls + '" cx="' + x + '" cy="' + y + '" r="' + r + '"' + (delay != null ? ' style="animation-delay:' + delay + 'ms"' : '') + '/>';
  };
  // a plate seen from above with up to 12 counters on it (3 a row)
  function plateSvg(count, freshFrom, delay, lit) {
    let s = '<circle class="sh__plate' + (lit ? ' is-lit' : '') + '" cx="50" cy="50" r="46"/><circle class="sh__rim" cx="50" cy="50" r="34"/>';
    const rows = Math.ceil(count / 3), y0 = 50 - (rows - 1) * 11;
    for (let i = 0; i < count; i++) {
      const r = Math.floor(i / 3), inRow = Math.min(3, count - r * 3), c = i % 3, x0 = 50 - (inRow - 1) * 11;
      const fresh = freshFrom != null && i >= freshFrom;
      s += dot(x0 + c * 22, y0 + r * 22, 9.5, 'sh__c' + (fresh ? ' is-new' : ''), fresh ? delay : null);
    }
    return '<svg class="sh__psvg" viewBox="0 0 100 100" aria-hidden="true" focusable="false">' + s + '</svg>';
  }
  // the counters still to share, in rows of 10
  function pileSvg(left, cls) {
    const per = 10, rows = Math.max(1, Math.ceil(left / per)), W = per * 22 + 4, H = rows * 22 + 4;
    let s = '';
    for (let i = 0; i < left; i++) s += dot(13 + (i % per) * 22, 13 + Math.floor(i / per) * 22, 9.5, cls || 'sh__c sh__c--pile');
    return '<svg class="sh__pile" viewBox="0 0 ' + W + ' ' + H + '" style="--sh-w:' + W + '" aria-hidden="true" focusable="false">' + s + '</svg>';
  }

  function share(host, spec) {
    spec = spec || {};
    const n = spec.n || 12, k = Math.max(1, spec.plates || 4), fixed = !!spec.fixed, ev = T.tools.emitter(), maxEach = Math.floor(n / k);
    const frac = !!spec.frac || !!(spec.task && spec.task.type === 'fracof');
    let each = Math.max(0, Math.min(maxEach, spec.each || 0)), locked = fixed, can = spec.can || null, shownEach = each;
    const tray = el('div', { class: 'sh__tray' });
    const plates = el('div', { class: 'sh__plates', dataset: { k: String(k) } });
    const felt = el('div', { class: 'sh__felt', role: 'img' }, tray, plates);
    const say = el('p', { class: 'sh__say', 'aria-live': 'polite' });
    const root = el('div', { class: ['sh', fixed && 'sh--mini'] }, felt);
    let back = null, deal = null;
    if (!fixed) {
      back = tbtn('Take back', 'sh__btn', { a: 'back' }, 'minus');
      deal = tbtn('Give 1 to each plate', 'sh__btn sh__btn--deal', { a: 'deal' }, 'plus');
      back.addEventListener('click', function () { act('back'); });
      deal.addEventListener('click', function () { act('deal'); });
      root.appendChild(el('div', { class: 'sh__ctl' }, back, deal));
    }
    root.appendChild(say);

    function paint(fresh) {
      const left = n - each * k, pop = fresh && !still() && each > shownEach;
      T.ui.empty(tray);
      tray.hidden = fixed && left === 0;
      if (left > 0) tray.appendChild(el('span', { class: 'sh__pilebox', html: pileSvg(left) }));
      tray.appendChild(el('b', { class: 'sh__cap' }, fixed ? (left ? left + ' left over' : '') : !left ? 'All shared' : left + (left === 1 ? ' counter' : ' counters') + ' to share'));
      T.ui.empty(plates);
      for (let p = 0; p < k; p++) {
        const lit = frac && p === 0;
        const box = el('span', { class: ['sh__pl', lit && 'is-lit'], html: plateSvg(each, pop ? shownEach : null, p * 60, lit) });
        if (lit) box.appendChild(el('span', { class: 'sh__frac', html: F(1, k) }));
        plates.appendChild(box);
      }
      shownEach = each;
      const nothing = !each;
      say.innerHTML = nothing ? 'The plates are empty.' : '<b>' + each + '</b> on each plate' + (left === 0 ? '. Nothing is left over.' : left < k ? ', <b>' + left + '</b> left over.' + (fixed ? '' : ' You cannot share ' + (left === 1 ? 'it' : 'them') + ' equally.') : '.');
      felt.setAttribute('aria-label', n + ' counters, ' + k + ' plates: ' + each + ' on each plate, ' + left + ' not on a plate' + (frac ? '. One plate is one ' + name(k) + '.' : ''));
      if (deal) {
        deal.disabled = locked || left < k || !may(can, 'deal');
        back.disabled = locked || each < 1 || !may(can, 'back');
      }
    }
    function act(a) {
      if (locked || !may(can, a)) return false;
      const left = n - each * k;
      if (a === 'deal' && left >= k) each++;
      else if (a === 'back' && each > 0) each--;
      else return false;
      sfx(a === 'deal' ? 'snap' : 'pop');
      paint(true);
      ev.emit('change', get());
      ev.emit('trade', { act: a, each: each });
      return true;
    }
    function get() { return { each: each, left: n - each * k }; }
    paint(false);
    mount(host, root);
    return {
      el: root, get: get, on: ev.on, act: act,
      solve: function (r) { if (r && r.each != null) { each = Math.min(maxEach, r.each); paint(true); } },
      ready: function () { return true; },
      lock: function () { locked = true; paint(false); },
      allow: function (c) { can = c || {}; locked = fixed; paint(false); },
      tip: function () { return deal && !deal.disabled ? deal : back && !back.disabled ? back : null; },
      destroy: function () { if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  /* ---------- two unit fractions compared (See it) ---------- */

  function fcmp(host, spec) {
    spec = spec || {};
    const a = spec.a || 3, b = spec.b || 6, ev = T.tools.emitter(), small = Math.max(a, b);
    let can = spec.can || null, pick = 0, sym = '';
    const rows = [a, b].map(function (d) {
      const row = el('button', { type: 'button', class: 'fc__row', dataset: { d: String(d) }, 'aria-label': 'One ' + name(d) + ': a strip cut into ' + d + ' equal parts, one part orange' },
        el('span', { class: 'fc__lab', html: F(1, d) }), el('span', { class: 'fc__strip', html: stripSvg(d, 1) }));
      row.addEventListener('click', function () { tapRow(d, row); });
      return row;
    });
    // a dashed line at the end of the smaller part, down both strips: the bigger part goes past it
    const guide = el('span', { class: 'fc__guide', style: '--at:' + (1 / small).toFixed(4) });
    const strips = el('div', { class: 'fc__strips' }, rows[0], rows[1], guide);
    const box = el('span', { class: 'fc__box', 'aria-label': 'The sign, empty' });
    const sent = el('p', { class: 'fc__sent' }, el('span', { html: F(1, a) }), box, el('span', { html: F(1, b) }));
    const signs = ['<', '>', '='].map(function (s) {
      const btn = el('button', { type: 'button', class: ['btn', 'tl__btn', 'fc__sign'], dataset: { s: s }, 'aria-label': s === '<' ? 'is less than' : s === '>' ? 'is greater than' : 'is equal to' }, s);
      btn.addEventListener('click', function () { tapSign(s, btn); });
      return btn;
    });
    const signRow = el('div', { class: 'fc__signs' }, signs);
    const root = el('div', { class: 'fc' }, strips, sent, signRow);

    function paint() {
      rows.forEach(function (row) {
        const d = +row.dataset.d;
        row.classList.toggle('is-picked', pick === d);
        row.disabled = !(can && can.pick != null);
      });
      guide.hidden = !pick;
      box.textContent = sym;
      box.classList.toggle('is-filled', !!sym);
      box.setAttribute('aria-label', sym ? 'The sign: ' + (sym === '<' ? 'is less than' : sym === '>' ? 'is greater than' : 'is equal to') : 'The sign, empty');
      signs.forEach(function (s) { s.disabled = !(can && can.sign); });
      signRow.hidden = !(can && can.sign) && !sym;
    }
    function tapRow(d, row) {
      if (!can || can.pick == null) return;
      if (can.pick !== d) { shake(row); sfx('no'); return; }
      pick = d;
      sfx('snap');
      paint();
      ev.emit('change', get());
      ev.emit('trade', { act: 'pick', pick: d });
    }
    function tapSign(s, btn) {
      if (!can || !can.sign) return;
      if (can.sign !== s) { shake(btn); sfx('no'); return; }
      sym = s;
      sfx('snap');
      paint();
      ev.emit('change', get());
      ev.emit('trade', { act: 'sign', sym: s });
    }
    function get() { return { pick: pick, sym: sym }; }
    paint();
    mount(host, root);
    return {
      el: root, get: get, on: ev.on,
      solve: function () { /* See it only */ },
      ready: function () { return true; },
      lock: function () { can = {}; paint(); },
      allow: function (c) { can = c || {}; paint(); },
      tip: function () {
        if (can && can.pick != null) return rows.find(function (r) { return +r.dataset.d === can.pick; }) || null;
        if (can && can.sign) return signs.find(function (s) { return s.dataset.s === can.sign; }) || null;
        return null;
      },
      destroy: function () { if (root.parentNode) root.parentNode.removeChild(root); }
    };
  }

  /* ---------- pictures ---------- */

  // a strip cut into equal parts, some of them orange; cap: a line under it (HTML)
  function fbar(spec) {
    const parts = Math.max(1, spec.parts || 1), shade = spec.shade || 0;
    const fig = el('figure', { class: 'fbar', role: 'img', 'aria-label': 'A strip cut into ' + parts + ' equal parts' + (shade ? ', ' + shade + ' orange' : '') },
      el('span', { class: 'fbar__strip', html: stripSvg(parts, shade) }));
    if (spec.cap) fig.appendChild(el('figcaption', { class: 'fbar__cap', html: spec.cap }));
    return fig;
  }
  // strips of the same length under each other, each with its unit fraction at the left: compare one part of each
  function fbars(spec) {
    const list = spec.list || [];
    return el('div', { class: 'fbars', role: 'img', 'aria-label': 'Strips of the same length cut into ' + list.join(', ') + ' equal parts. One part of each is orange.' },
      list.map(function (d) { return el('div', { class: 'fbars__row' }, el('span', { class: 'fbars__lab', html: F(1, d) }), el('span', { class: 'fbars__strip', html: stripSvg(d, 1, { h: 48 }) })); }));
  }
  // whole pizzas (or cakes) shared equally: each is cut into as many slices as there are people; one person's slices blue
  function pizzas(spec) {
    const n = spec.wholes || 1, p = spec.people || 1, R = 44, gap = 14, W = n * (2 * R + gap) + gap, H = 2 * R + 16, cake = spec.kind === 'cake';
    let s = '';
    for (let w = 0; w < n; w++) {
      const cx = gap + R + w * (2 * R + gap), cy = R + 8;
      s += '<circle class="pz__base' + (cake ? ' is-cake' : '') + '" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>' +
        '<circle class="pz__top' + (cake ? ' is-cake' : '') + '" cx="' + cx + '" cy="' + cy + '" r="' + (R - 8) + '"/>';
      (cake ? [[-0.3, -0.3], [0.32, -0.18], [0, 0.38], [-0.38, 0.2]] : [[-0.4, -0.32], [0.36, -0.26], [-0.14, 0.32], [0.4, 0.34], [0.04, -0.04]]).forEach(function (q) {
        s += '<circle class="' + (cake ? 'pz__cherry' : 'pz__dot') + '" cx="' + (cx + q[0] * R).toFixed(1) + '" cy="' + (cy + q[1] * R).toFixed(1) + '" r="' + (cake ? 5 : 5.5) + '"/>';
      });
      if (spec.cut === false) continue;                       // whole, before they are cut
      const a0 = -Math.PI / 2, a1 = a0 + 2 * Math.PI / p;
      if (spec.take !== false) {
        const x0 = cx + R * Math.cos(a0), y0 = cy + R * Math.sin(a0), x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1);
        s += p === 1 ? '<circle class="pz__mine" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>' :
          '<path class="pz__mine" d="M' + cx + ' ' + cy + 'L' + x0.toFixed(1) + ' ' + y0.toFixed(1) + 'A' + R + ' ' + R + ' 0 0 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + 'Z"/>';
      }
      for (let k = 0; k < p && p > 1; k++) {
        const a = a0 + k * 2 * Math.PI / p;
        s += '<path class="pz__cut" d="M' + cx + ' ' + cy + 'L' + (cx + R * Math.cos(a)).toFixed(1) + ' ' + (cy + R * Math.sin(a)).toFixed(1) + '"/>';
      }
      s += '<circle class="pz__edge" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>';
    }
    const thing = cake ? 'cakes' : 'pizzas';
    const label = n + ' ' + (n === 1 ? thing.slice(0, -1) : thing) + (spec.cut === false ? '.' : ', each cut into ' + p + ' equal slices.' + (spec.take === false ? '' : ' One slice of each is blue.'));
    const box = el('div', { class: 'pz' });
    box.innerHTML = '<svg class="pz__svg" viewBox="0 0 ' + W + ' ' + H + '" style="--pz-w:' + W + '" role="img" aria-label="' + label + '">' + s + '</svg>';
    return box;
  }

  // plain text "1/4" inside a node (a Lightning question and its answers) -> the fraction as on paper; textContent stays
  // the same (the line between the numbers is a hidden "/")
  function fracText(node) {
    if (!node) return;
    const walk = document.createTreeWalker(node, NodeFilter.SHOW_TEXT), list = [];
    while (walk.nextNode()) if (/\d\/\d/.test(walk.currentNode.nodeValue) && !walk.currentNode.parentNode.closest('.fr, kbd')) list.push(walk.currentNode);
    list.forEach(function (t) {
      const span = el('span', { html: t.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/(\d+)\/(\d+)/g, function (m, a, b) { return F(a, b); }) });
      t.parentNode.replaceChild(span, t);
    });
  }
  T.tools.fracText = fracText;
  T.tools.strip = strip;
  T.tools.fshare = share;
  T.tools.fcmp = fcmp;
  if (!T.tools.share) T.tools.share = share;
  const kinds = T.tools.picKinds = T.tools.picKinds || {};
  kinds.fbar = fbar;
  kinds.fbars = fbars;
  kinds.pizzas = pizzas;
  if (!kinds.share) kinds.share = function (spec) { return share(null, Object.assign({}, spec, { fixed: true })).el; };
})(window.T = window.T || {});
