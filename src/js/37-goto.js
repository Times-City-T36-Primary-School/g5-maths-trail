/* 37-goto.js - the "Go to" button (a map icon) in the top bar of every step, stop hub and Summit page: one tap opens a
   menu with the trail map, the nine stops and the Summit, so a child can jump anywhere at any time (Jovan, 25 Nov 2026).
   T.goto.button({kind, here}) -> the icon button; here: the stop number the child is in (0 or 'summit' for the Summit). */
(function (T) {
  'use strict';
  const el = T.util.el;

  function open(here, beforeLeave, warn) {
    let handle = null;
    const go = function (route) {
      if (handle) handle.close();
      if (typeof beforeLeave === 'function') beforeLeave();
      T.router.go(route);
    };
    const row = function (o) {
      return el('li', null, el('button', {
        type: 'button', class: ['goto__item', 'pressable', o.here && 'is-here', o.locked && 'is-locked'],
        dataset: o.hue ? { hue: String(o.hue) } : {},
        'aria-current': o.here ? 'page' : null,
        onClick: function () { go(o.route); }
      },
        el('span', { class: 'goto__num', 'aria-hidden': 'true' }, o.num),
        el('span', { class: 'goto__text' }, el('b', { class: 'goto__name' }, o.name), o.sub ? el('span', { class: 'goto__sub' }, o.sub) : null,
          o.here ? el('span', { class: 'goto__here' }, 'You are here') : null)));
    };
    const stops = (T.stops || []).map(function (s) {
      return row({ route: 'stop-' + s.n, hue: s.n, num: String(s.n), name: s.world, sub: s.title, here: Number(here) === s.n });
    });
    const sumOpen = !!(T.summit && T.summit.isOpen && T.summit.isOpen());
    const list = el('ul', { class: 'goto__list' },
      row({ route: 'home', num: '', name: 'Trail map', sub: 'See the whole trail' }),
      stops,
      row({ route: 'summit', hue: 10, num: '', name: 'The Summit', sub: sumOpen ? 'The final test' : 'Opens after ' + ((T.summit && T.summit.OPEN_AT) || 7) + ' Mini tests', here: here === 'summit', locked: !sumOpen }));
    // the map and the Summit rows get a picture in place of a number
    const items = list.querySelectorAll('.goto__num');
    items[0].appendChild(T.ui.icon('map')); items[items.length - 1].appendChild(T.ui.icon('trophy'));
    const body = el('div', { class: 'goto__body' }, warn ? el('p', { class: 'goto__warn' }, warn) : null, list);
    handle = T.ui.dialog({ title: 'Where do you want to go?', body: body, cls: 'goto', sheet: true, dismiss: true });
    return handle;
  }

  function button(opts) {
    opts = opts || {};
    return T.ui.iconButton({ icon: 'map', label: 'Go to the map or another stop', kind: opts.kind || 'band', cls: 'goto__btn' + (opts.cls ? ' ' + opts.cls : ''),
      onClick: function () { open(opts.here, opts.beforeLeave, typeof opts.warn === 'function' ? opts.warn() : opts.warn); } });
  }

  T.goto = { button: button, open: open };
})(window.T = window.T || {});
