# ENGINE-API: Maths Revision Trail engine reference (for the Grade 5 / Stage 6 build)

Source of every claim: `src/js/*.js`, `src/css/*.css` (file:line given). `UNCLEAR` marks what the code does not settle.
Paths are relative to `src/js/` unless they end in `.css` (then `src/css/`).

**Build facts.** `src/order.json` lists 30 CSS and 60 JS files; they are concatenated in that order into one `<style>` and one
`<script>`. A new file must be added to `order.json`. `split.py:11` cut the files at lines that start with `/* NN-name.ext`,
so a new file should start with that header. The MX model files had no such header: that is why they sit inside
`06-art-world-2.js` (line 262 on). Comments point at `brief/api-ui.md`, `brief/api-core.md`, `docs/02…05`, `test/*.mjs`:
none of these are in this repository.

---

## 1. Tool contract

### 1.1 Registration and shape

A tool is a function on `T.tools`: `T.tools.<name> = function (host, spec) { … return api; }` (`38-tools.js:4-6,237`;
`39-tools-lines.js:489-492`). It builds its own root node, appends it to `host` **when host is not null**, and returns an object.
The name is what a task puts in `task.ui.k` and what a See it scene puts in `tool:`.

`T.tools.emitter()` (`38-tools.js:28-34`, exported 237) is the shared event helper:

```js
const ev = T.tools.emitter();   // { on(name, fn), emit(name, value) }
// return { …, on: ev.on };  inside the tool: ev.emit('change', get()); ev.emit('trade', { act: 'jump', pos });
```

`spec` as the callers pass it:

| Caller | Call | What is added to the spec |
|---|---|---|
| `ask()` Practise / See it challenge | `T.tools[ui.k](left or right, Object.assign({ task: task }, ui))` `52-kit-model.js:213-215` | `spec.task` = the whole task (only `msq` reads it: `task.right` for its hint, `39-tools-times.js:237,311`). The `msq` tool goes in the right column, all others in the left (214). |
| Test paper | `T.tools[ui.k](cell, Object.assign({ task: task }, ui))` `71-test-paper.js:274` | same |
| See it hands-on scene | `make(desk, Object.assign({}, spec, { can: {}, room: room }))` `45-see.js:216` | `spec.can = {}` (nothing may be done until `allow()`), `spec.room` = function -> px height left for the tool (`45-see.js:206-211`: scene box height - 16, less the picture when it sits above) |
| `T.tools.pic` | `tool(null, Object.assign({}, spec, { fixed: true }))` e.g. `39-tools-lines.js:494-498` | `fixed: true` (and usually `mini: true`); host is `null`; only `.el` is used |

`ui.k` values `chart`, `counters`, `cells` go to `T.tools.chart(left, ui)` and `slider` to `T.tools.slider(left, ui)` **without**
`task` (`52-kit-model.js:207-212`, `71-test-paper.js:272-273`). `ui.k: 'matpick'` has no tool: the options carry blocks (`op.b`).

### 1.2 Methods: who calls what

`G` = guarded (`if (tool.x)`), so optional. `!` = called without a guard, so required by that caller.

| Member | Caller, when, arguments | Opt. |
|---|---|---|
| `el` | `ask()` `answerNode()` for the burst/shake when there are no options or boxes (`52:390`); `T.tools.pic` returns `.el` | needed |
| `on('change', fn)` | `ask()` once after creation (`52:215`); `fn()` re-reads `resp()`, calls `tool.live`, refreshes the Check button (`52:330-335`). **Not used by the test paper** (it recounts on any click on the sheet, `70-test.js:163`). | G in ask |
| `on('trade', fn)` | See it, once per tool (`45-see.js:217`): `fn(t)` -> `done(t)` | `!` in See it |
| `get()` | `ask()` `resp()`: `Object.assign(r, tool.get())` (`52:303`) before `task.ready(r)` / `task.check(r)`; paper `answer()` (`71:288`); See it `reached()` for `until` (`45-see.js:240`) | G |
| `ready()` | `ask()` only, and only when the task has no `task.ready` (`52:312-313`): false keeps Check disabled. Never called by the paper or See it. | G |
| `lock()` | `ask()` `lockAll()` when the question is over (`52:347`); paper `lock()` when marked (`71:300`) | G |
| `mark(parts)` | `ask()` on the first miss, with `out.parts` from `task.check` (`52:362`); paper review of a wrong tool question with no boxes (`71:330-334`). `parts` is whatever the model returns: `order` gets `[true/false per place]`, `pickall` gets the wrong values (`39-tools-order.js:131,188`). | G |
| `solve(right)` | `ask()` `reveal()` after two misses or "Show me how": `tool.solve(task.right)`, only when `task.right` exists (`52:432`). Never on the paper. | G |
| `reveal(what)` | `ask()` first hint step: `tool.reveal(task.hint.reveal)` when the string does not start with `hl:` (`52:467-469`). `hl:<place>` is for the chart: `chart.setHl(place)`. | G |
| `live(r)` | `ask()` on every change with the whole response `r` (`52:332`), and in `reveal()` with `{ v: pad.get() }` (`52:426`). Only `balance` has it. | G |
| `tip()` | -> the element a pointing hand shows. `ask()` `guideFirst()` (key `tool-<k>`, not for `mat`; `52:515`); See it each step (key `see-<tool>`, `45-see.js:234`). May return null. | G |
| `allow(can)` | See it: `allow(st.can or {})` at the start of a step, `allow({})` when the step is done (`45-see.js:228,247`). Not called elsewhere: without it everything works. | G |
| `restart()` | See it when the step has `fresh: true` (`45-see.js:227`). Only `nline`. | G |
| `fit()` | See it on every resize of the scene (`45-see.js:219`). `mat`, `takeaway`, `msq`. | G |
| `destroy()` | See it when a step brings a new tool and on leaving (`45-see.js:214,257`) | `!` in See it |
| `setHl(k)` | chart only (`52:468`) | - |
| `set(v)` | not called by any step (tools use it internally: `takeaway` -> `mat.set`, `39-tools-sums.js:85,101`) | free |
| `move`, `act`, `step`, `pick`, `place`, `brk`, `join`, `take`, `pair`, `tapCell`, `showCounts` | exported per tool, not called by the steps (tests / internal) | free |

`ask()` never calls `tool.destroy()`: its cleanup only destroys the number pad (`52:522`); the tool leaves with
`T.ui.empty(g.body)` (`52:554`). The paper never destroys tools either. Keep listeners on the tool's own nodes.

### 1.3 Events and See it `wait` / `until`

- `'change'`: "the answer changed". Value = `get()` in most tools; `ask()` ignores the value.
- `'trade'`: "the child did one action": `{ act: '<name>', … }`. See it is the only listener.

See it step logic (`45-see.js:222-254`): at step start `allow(st.can)`; on every `'trade'` `t`:

```js
if (!st || !st.wait || st.wait !== t.act || !reached(st)) return;      // 45-see.js:246
// reached(st): no st.until -> true; else every key k of st.until: tool.get()[k] === st.until[k]   (238-242)
```

So: a step **without `wait` never ends**; `wait` must equal `t.act` exactly; `until` compares `get()` values with `===`
(numbers, strings, booleans only; an array in `get()` cannot be matched). After a hit: `allow({})`, Zip says `st.then`, the next
step begins 2600 ms later (`45-see.js:253`); after the last step `sc.ready()` pulses Next. A step with `st[<tool>]` builds a new
tool from `Object.assign({}, s[<tool>], st[<tool>])` (226). The scene's tool name `s.tool` defaults to `'mat'` (215, 220).

### 1.4 What `ask()` reads from a tool question (cross-reference)

`r` (the response given to `task.ready`, `task.check`, `task.given`) = `tool.get()` keys + `v` (number pad strings) + `pick`
(option index, -1 none) + `dec` (claim) + `b` (chart counters) (`52:300-308`). `ask()` does **not** add `slider.get()`
(the paper does, `71:289`). Zip's first line comes from `DO[ui.k]` (`52:48-80,83-100`): **a new tool needs a `DO.<k>` entry**
(`{en, vi}`, 10 words at most), else a tool-only question says "Tap one answer." (`52:94-99`).
The answer log text: `task.given(r)` if present, else `toolGiven(r)` which knows only `order`, `picks`, `choice`, `r/c/p`
(`52:143-149,319-323`). The paper ignores `task.given` (`70-test.js:205-206`).

### 1.5 Smallest real tools

The shortest real tool, quoted in full (`39-tools-lines.js:481-487`): pictures only, nothing to answer.

```js
function pics(host, spec) {
  const box = el('div', { class: 'toolpics' });
  (spec && spec.list || []).forEach(function (x) { const p = T.tools.pic(x); if (p) box.appendChild(p); });
  mount(host, box);        // mount = function (host, node) { if (host) host.appendChild(node); return node; }
  return { el: box, get: function () { return {}; }, on: function () {}, lock: function () {}, ready: function () { return true; },
    destroy: function () { if (box.parentNode) box.parentNode.removeChild(box); } };
}
```

The shortest tool with an answer, `pickall` (`39-tools-order.js:144-200`, lightly condensed; `ring()` is the pencil-ring SVG, 41-44):

```js
function pickall(host, spec) {
  spec = spec || {};
  const nums = (spec.nums || []).slice(), ev = T.tools.emitter(), on = {};
  let locked = !!spec.fixed, bad = [];
  const root = el('div', { class: 'pkall', role: 'group', 'aria-label': 'Numbers. Put a ring around every one that fits.' });
  const btns = nums.map(function (v) {
    const b = el('button', { type: 'button', class: 'pk', dataset: { v: String(v) }, 'aria-pressed': 'false' }, el('span', { class: 'pk__n' }, sg(v)));
    b.addEventListener('click', function () { toggle(v); });
    root.appendChild(b);
    return b;
  });
  const btnOf = function (v) { return btns.filter(function (b) { return +b.dataset.v === v; })[0]; };
  const picks = function () { return nums.filter(function (v) { return on[v]; }).sort(function (x, y) { return x - y; }); };
  function setOn(v, yes, fresh) { /* on[v] = yes; class is-on, aria-pressed, add or remove ring() (is-new when fresh && !still()) */ }
  function paint() { btns.forEach(function (b) { const v = +b.dataset.v;
    b.classList.toggle('is-bad', bad.indexOf(v) >= 0 && !!on[v]); b.disabled = locked; }); }
  function toggle(v) {
    if (locked) return;
    setOn(v, !on[v], true); bad = [];
    sfx(on[v] ? 'pick' : 'pop'); paint();
    ev.emit('change', { picks: picks() });
    ev.emit('trade', { act: on[v] ? 'ring' : 'rub', v: v });
  }
  paint(); mount(host, root);
  return {
    el: root, on: ev.on, get: function () { return { picks: picks() }; },
    ready: function () { return picks().length > 0; },
    lock: function () { locked = true; root.classList.add('is-locked'); paint(); },
    mark: function (list) { bad = Array.isArray(list) ? list.filter(function (x) { return typeof x === 'number'; }) : []; paint(); },
    solve: function (r) { if (!r || !Array.isArray(r.picks)) return;
      nums.forEach(function (v) { setOn(v, r.picks.indexOf(v) >= 0, true); }); bad = []; paint(); },
    set: function (r) { /* as solve, without the animation */ },
    allow: function () { locked = !!spec.fixed; paint(); },
    tip: function () { return btns.filter(function (b) { return !b.disabled; })[0] || null; },
    destroy: function () { if (root.parentNode) root.parentNode.removeChild(root); }
  };
}
T.tools.pickall = pickall;                                   // 39-tools-order.js:288
```

Shared habits of every 39-tools file (`39-tools-lines.js:38-63`): `still()` = `T.fx.still()` (no motion: final state at once);
`sfx(name)`; `canDo(can, k)` = `!can || !!can[k]`; a tool button is `el('button', { class: ['btn', 'tl__btn', cls] }, icon, el('span', { class: 'btn__label' }, label))`
(never the green main button); a fixed picture sets `role="img"` and an `aria-label`; `locked = fixed`, and `allow(c)` does
`can = c || {}; locked = fixed`.

### 1.6 Every existing tool

Numbers column: I = whole numbers >= 0 only; N = negatives work; D = decimals work (labels go through `MX.sg`/`MX.fmt`).

| Tool (`T.tools.x`) | File:lines | Spec fields | `get()` | `change` value / `trade` acts | `allow` keys, extras | Numbers |
|---|---|---|---|---|---|---|
| `chart` (`k: 'chart'`) | `38-tools.js:53-128` | `cols` (4; places come from `MX.places`, at most 5: TTh Th H T O), `n`, `hl`, `dots`, `digitsRow`, `vals`, `ask`, `cap`, `mini` | `{ b }` | none (display) | `setHl(k)`; no `ready/solve/tip/allow`, no `trade` | I (no decimal places exist in `MX.P`, `06-art-world-2.js:270-275`) |
| `chart` (`k: 'counters'`) | same | `cols`, `max` (9), `hl` | `{ b: [count per place] }` | change `{ b }` | - | I |
| `chart` (`k: 'cells'`) | same, 81-84 | `cols` | `{ b }` (zeros); the answer is typed: one `.blank.blank--cell[data-i]` per place, filled by the number pad | - | - | I |
| `slider` | `38-tools.js:132-190` | `n`, `cols` (5), `shift`, `fixed`, `zeros`, `mini`, `cap` | `{ shift }` | change `{ shift }` | `move(d)` | I (`String(n)` digits; trailing zeros limit the right shift) |
| `mat` | `39-mat.js:109-458` | `b: [th,h,t,o]`, `ctl`, `max`, `counts`, `total`, `can: { brk: [k], join: [k] }`, `multi`, `mini`, `fixed`, `u`, `hmax`, `room`, `cap` | `{ b, traded }` | change `get()`; trade `{ act: 'brk'/'join', k }` | `allow({brk, join})`, `ready()` false while blocks move, `reveal('counts')`, `fit()`, `brk(k)`, `join(k)`, `showCounts()` | I, 4 places |
| `blocks` | `39-mat.js:495` | `mat` with `{ mini: true, fixed: true }` | - | - | picture | I |
| `nline` jump | `39-tools-lines.js:72-262` | `mode: 'jump'`, `skin: 'wood'/'board'`, `min`, `max`, `tick` (1), `lab` (label every lab-th tick), `start`, `jump` (= tick), `dir: 'on'/'back'`, `to` (draw the jumps to this number), `mini`, `fixed`, `cap` | `{ pos, hops }` | change `get()`; trade `{ act: 'jump', pos, d }` | `allow({ on, back })`, `restart()`, `solve({pos})`, `move(d)` | N, D: ticks and positions are rounded to 3 places (95, 195); a zero inside the range tints the cold side (90-91). `solve()` adds `jump` without rounding (235): float drift possible with decimals |
| `nline` show | same | `mode: 'show'`, `min`, `max`, `tick`, `lab`, `marks: [numbers]`, `skin` | `{}` | none (always fixed, 74) | - | N, D |
| `nline` round | same, 78-83, 208-231 | `mode: 'round'`, `n`, `to`, `show` (the end it rounds to), `mid` (halfway shown), `skin` | `{ choice }` | change; trade `{ act: 'pick', choice }`, `{ act: 'mid' }` | `allow({ pick: true or the one end, mid })`, `ready()` once an end is tapped, `reveal('mid')`, `solve({choice})` | line = `floor(n/to)*to` to `+to`, 10 ticks. Decimal `n` with `to >= 1` uses only whole ends; `to < 1`: UNCLEAR (float maths, never used) |
| `thermo` | `39-tools-lines.js:292-351` | `min` (-10), `max` (10), `start` or `t`, `dir: 1/-1`, `fixed`, `cap` | `{ pos }` | change; trade `{ act: 'warm'/'cold', pos }` | `allow({ up, down })`, `solve({pos})` | N, whole degrees only (loop `v++`, 273) |
| `grid` (square) | `39-tools-lines.js:357-428` | `mode: 'square'`, `rows`, `cols`, `max` (9), `fixed`, `cap`; `mode: 'array'` forwards to `array` (360) | `{ rows, cols }` | change; trade `{ act: 'grow'/'shrink', rows }` | `allow({ more, less })`, `solve({rows})` | I |
| `pics` | `39-tools-lines.js:481-487` | `list: [pic specs]` | `{}` | none | - | - |
| `order` | `39-tools-order.js:48-140` | `nums`, `from` ('smallest'), `to` ('largest'), `fixed` | `{ order: [v or null], placed }` | change; trade `{ act: 'place', v, placed }` | `allow({ place: true or [values in order] })`, `ready()` when full, `mark([bool per place])`, `solve({order})` | N, D (values compared with `===`, shown with `MX.sg`) |
| `pickall` | `39-tools-order.js:144-200` | `nums`, `fixed` | `{ picks: [sorted] }` | change `{ picks }`; trade `{ act: 'ring'/'rub', v }` | `ready()` with 1 ring or more, `mark([wrong values])`, `solve({picks})` | N, D; numbers only (`+dataset.v`, 155) |
| `pvcmp` | `39-tools-order.js:206-285` | `a`, `b`, `cols` (4), `fixed` | `{ at, sym }` | change `{ at, sym }` on a sign; trade `{ act: 'look', at }`, `{ act: 'sign', sym }` | `allow({ look, sign: true or '<' })`, `ready()` once a sign is chosen, `solve()` | I (digits by place) |
| `share` | `39-tools-share.js:49-132` | `n` (12), `plates` (3), `each`, `skin: 'fish'`, `fixed`, `cap` | `{ each, left }` | change; trade `{ act: 'deal'/'back', each, left }` | `allow({ deal, back })`, `solve({each})` | I |
| `gridm` | `39-tools-share.js:139-218` | `n` (124), `m` (3), `show`, `fixed`, `cap` | `{ show, added }` | change; trade `{ act: 'fill', i, show }`, `{ act: 'add' }` | `allow({ fill, add })`, `solve()` | I (`partsOf(String(n))`, 137) |
| `takeaway` | `39-tools-sums.js:41-109` | `b`, `take`, `room`, `fixed`, `can` | `{ b, taken }` | change; trade `{ act: 'brk', k }` (from the mat), `{ act: 'take' }` | `allow({ brk: [k], take: true })`, `reveal`, `fit`, `solve({b})` | I |
| `balance` | `39-tools-sums.js:114-178` | `left`, `right` (sides like `[25, '+', null]`, null = the box), `val`, `fixed` | `{}` | none (`on` is a no-op) | `live(r)` takes `r.v[0]` from the number pad; `set(v)` | numbers shown with `fmt`; `L === R` on sums (156) |
| `pairs` | `39-tools-sums.js:214-284` | `groups: [7, 5]`, `fixed` | `{ paired: [bool, bool], joined }` | change; trade `{ act: 'pair', g }`, `{ act: 'join' }` | `allow({ pair: 0/1/true, join })`, `solve()` | I |
| `array` | `39-tools-times.js:49-154` | `rows`, `cols`, `max` (10), `turn`, `fixed`, `cap` | `{ rows, cols }` | change; trade `{ act: 'row'/'col'/'turn', rows, cols }` | `allow({ rows, cols, turn })`, `solve({rows, cols})` | I |
| `rows` | `39-tools-times.js:158-231` | `n` (12), `rows`, `fixed`, `cap` | `{ rows, cols, left }` | change; trade `{ act: 'rows', rows }` | `allow({ more, less })`, `solve({rows})` | I |
| `msq` | `39-tools-times.js:235-321` | `fixed`, `row`, `hl`, `cross: [r, c]`, `rowTap`, `task`, `room`, `cap` | `{ r, c, p, row }` | change; trade `{ act: 'tap', r, c, p }`, `{ act: 'row', row }` | `allow({ tap, row: true or n })`, `ready()` once tapped, `reveal()` lights the row and column of `task.right`, `fit()`, `solve({r, c})` | 1 to 10 fixed (243-254) |
| `numpad` | `39-numpad.js:19-122` | not a host tool: `({ blanks, defs, onChange, onEnter })`; defs `{ len, w, neg, sym }` | `get()` -> raw strings | - | keys: 0-9, minus (only `neg`), `< > =` (only `sym`), rub out. **No decimal point, no `/`, no `%`** (33-36, 79, 97) | I, N |

Reuse for Stage 6: number lines with decimals and negatives -> `nline` (jump/show) as is; ordering tiles and pick-all with decimals
or negatives -> `order`, `pickall` as is; sequences as pictures -> pic `hops`; square numbers -> `grid` square, pics `dots`, `dotseq`;
factor rainbow -> pic `frain`; multiplication square -> `msq` (10 x 10 only); grids of counters -> `array`, `rows`.
Not available: a decimal place value chart, a decimal key on the number pad, fraction bars, percent grids, shapes, circles, data charts.

---

## 2. `T.tools.pic(spec)`

`38-tools.js:196-235`. Returns an element or `null`.

- `null`/`undefined` -> `null`.
- An **array** -> `<div class="pics">` with each non-null picture; `null` when all are null (199-203).
- An **object** `{ k, … }` -> the switch below, else `T.tools.picKinds[k](spec)` (233). **Unknown `k` -> `null`, silently.**

| `k` | Spec fields | Drawn by |
|---|---|---|
| `chart` | chart spec (forced `k: 'chart'`, `mini: true`) | `38-tools.js:205` |
| `slider` | slider spec (`mini`, `fixed`) | `38-tools.js:206` |
| `mat` | mat spec -> `T.tools.blocks(null, spec)` | `38-tools.js:207` |
| `rule` | `op: 'x'/'d'`, `by: 10/100` | `38-tools.js:208-214` |
| `stack` | `cols`, `parts: [numbers]` | `38-tools.js:215-224` |
| `name` | `n` (number name with place colours) | `38-tools.js:225-232` |
| `legend` | - (the four blocks) | `39-mat.js:470-479` |
| `swap` | `p: 'th'/'h'/'t'`, `join` | `39-mat.js:482-491` |
| `nline` | as the tool, forced `fixed`, default `mini` | `39-tools-lines.js:494` |
| `rline` | `n`, `to`, `show`, `cap` (round mode, board skin) | `39-tools-lines.js:497` |
| `thermo` | `t`, `min`, `max`, `cap` | `39-tools-lines.js:498` |
| `dots` | `r`, `c`, `col` (place colour class, default `t`), `cap` | `39-tools-lines.js:433-445` |
| `dotseq` | `ks: [1, 2, 3]`, `ask` | `39-tools-lines.js:448-453` |
| `hops` | `terms` (numbers **or strings**), `blanks` (extra "?" boxes), `labs` (text over each arrow) | `39-tools-lines.js:457-478` |
| `pairs` | `groups`, `sum` | `39-tools-sums.js:289-303` |
| `col` | `a`, `b`, `op: '+'/'-'/'x'`, `ans`, `marks`, `upto` (needs `MX.colwork`) | `39-tools-sums.js:307-332` |
| `bar` | `whole`, `parts: [n or null]` (null = "?") | `39-tools-sums.js:335-348` |
| `piceq` | `pic` (a `T_ART` id or an icon name), `n`, `total`, `unit`, `alt` | `39-tools-sums.js:351-364` |
| `balance` | `left`, `right`, `val` | `39-tools-sums.js:374` |
| `share` | `n`, `plates`, `each`, `skin` | `39-tools-share.js:223` |
| `gridm` | `n`, `m`, `show` (9 = all, with the total) | `39-tools-share.js:224` |
| `rows` | `n`, `rows`, `cap` | `39-tools-times.js:368` |
| `msq` | `row`, `hl`, `cross`, `cap` | `39-tools-times.js:369` |
| `array` | `rows`, `cols`, `cap` | `39-tools-times.js:370` |
| `frain` | `n`, `hide: [factors shown as "?"]` | `39-tools-times.js:326-348` |
| `grp` | `nums: [3]`, `pair: [i, j]`, `show` | `39-tools-times.js:351-362` |

**Add a kind:** in any file loaded after `38-tools.js`:

```js
const kinds = T.tools.picKinds = T.tools.picKinds || {};
kinds.mykind = function (spec) { return el('div', { class: 'mypic', role: 'img', 'aria-label': '…' }, …); };   // -> element or null
```

Where a pic spec is accepted (all through `T.tools.pic`, so object, array or null everywhere):

| Field | Read at | Shown |
|---|---|---|
| `task.fig` | `52-kit-model.js:190`; paper `71:239,261,270` | in the question card (first in the card for a claim). `MX.make` copies `def.fig` to `task.fig` (`06-art-world-2.js:790`) |
| `task.hint.pic` | `52:449,470` | first hint step; skipped when it is JSON-equal to `task.fig` (448). Not on the paper |
| `task.worked.pic` | `52:437`; paper `71:338` | under the worked answer |
| option `fig` (`task.opts[i].fig`) | `52:252`; paper `71:206` | inside the answer option. Option `b: [th,h,t,o]` draws blocks instead (`52:253`, `71:208`) |
| notes `items[].pic` | `60-notes.js:140` | the picture of a note (else `items[].art`, a `T_ART` id) |
| See it scene `pic` | `45-see.js:198` | above (phone) or beside the tool |
| tool `pics` `list` | `39-tools-lines.js:483` | the tool itself |
| `task.real` | set by `M.story` and by `MX.make` from `def.pic` (`06-art-world-2.js:737,789`) | **never rendered** by any file in `src/js` (no other reference) |

---

## 3. Test paper (`70-test.js`, `71-test-paper.js`)

**Item -> question.** `pack.test.items` are filtered to those with a non-empty `v` array (`70-test.js:63`). Per paper:
`round = stops.N.test.plays` (86); `task = T.gameKit.modelTask({ mode: 'your', v: item.v }, round)` (94) =
`MX.make(v[round % v.length], 'your')` (`52:581-585`). A model that throws is left off the paper (94). Each question:
`T.testPaper.question(task, { num, lo: item.lo, dok: item.dok, twm: item.twm, onTap })` (123). All answer boxes of the paper
share one number pad (139-147).

**Rendering differences from `ask()`:**

| Task field | `ask()` (`52-kit-model.js`) | Paper (`71-test-paper.js`) |
|---|---|---|
| `q` | HTML, as is (183) | first word bolded when it is a command verb: Write, Calculate, Tick, Circle, Complete, Find, Draw, Shade, Show, Explain, Join, Choose, Use, Work out, Round, Order, Put, Colour, Measure, Fill in (41-42, 267) |
| `says`, `ask`, `who` (claim) | card: q, says, ask; then buttons "correct"/"incorrect" + options (184-187, 235-243) | stem row, then part **(a)** "Circle one word." (two rings), part **(b)** "Tick the best reason." with "because " before each option (236-257) |
| `name`, `sum` | shown (188-189) | shown (268-269) |
| `fig` | 190 | 239, 261, 270 |
| `sub` | in the answer box; "Tick (✓) one box." is rewritten to "Tap one answer." (221-222) | under the question, **before** the tool, verb bolded (271) |
| `ui` (tool) | interactive, with `change`, `ready`, `mark`, `solve`, `reveal`, `tip`, `live` | the same tool, but only `get()`, `lock()`, `mark()` are used (272-274, 285-301, 333). No hints, no `solve`, no `live` (the balance does not follow typing) |
| `lines` + `blanks` | `{0}`..`{9}` -> `<button class="blank blank--<w or big>" data-i>` (227-229), own pad | same markup (229-231), shared pad; boxes beyond `task.blanks` (chart `cells`) get `{ len: 1, w: 'cell' }` (345) |
| `opts` | `T.ui.choice` buttons, 2 columns when exactly 4 and not a claim (247); `letters` -> A, B, C … (`MX.LET` has 5) | tick rows, one per option, the box at the right (199-223) |
| `ab` + `abAsk` | options first, then `abAsk`, then the lines (266-270) | stem, (a) tick rows with `sub`, (b) `abAsk` + lines (258-264) |
| `optsFirst` | as `ab` (266) | **ignored**: lines, then options |
| `marks` | shown as `[n]` only on `surface: 'paper'` (172) | `[n]` in the margin per part (187-195) |
| `how`, `hint`, `yes`, `fill`, `right`, `mode`, `given` | used | **not used** |
| `key` | not used | "Answer: **key**" in the review of a wrong question that has boxes, or a tool and no options (335); HTML entities decoded, ` ; ` -> `; ` |
| `worked.text/.model/.pic` | after the 2nd miss or "Show me how" (433-438) | "How to do it" under a question that is not fully right (328-340) |

**Marking** (`T.testPaper.mark(task, r)`, `71:99-148`; flow `70-test.js:187-233`):

- A claim: 2 parts of 1 mark: (a) verdict, (b) reason. When both are given `task.check(r)` decides (`ok`, `decOk`, `reasonOk`), else
  `task.verdict` and `opts[pick].ok` (103-113).
- `task.ab`: (a) `opts[pick].ok`; (b) all of `check(r).parts` true (114-124).
- Anything else: one part worth `task.marks || 1`. `out = task.check(r)`; full marks when `out.ok`; else, when `marks > 1` and there
  are boxes, `min(marks - 1, right boxes)` (139). A box left empty is wrong. A tool question with no boxes is all or nothing.
- `full` = score equals `task.marks || 1` **and** every part ok (147). So a claim or `ab` task **must set `marks: 2`**, or it can
  never be fully right.
- "Has an answer" (`answered()`, 84-97; used for the progress count and the "Question n is empty" warning): boxes all filled,
  `pick >= 0`, `r.order` full, `r.picks` non-empty, `'choice' in r` not null, and `task.ready(r)` when the task has one.
  **`tool.ready()` is never asked on the paper**: a new tool whose `get()` has other keys counts as answered at once unless the
  model defines `task.ready(r)`. Note that in `ask()` `task.ready` replaces every other readiness test (`52:312`).
- Saved: unit `paper` = questions fully right out of N (`70-test.js:218`); `stops.N.test.best`, `.plays` (215-217). Logged per
  question with `g: 'm'`, `dok: item.dok` (207). Medals by questions fully right: **gold 10, silver 8, bronze 6** (27-31), fixed.

**`T.DOK_MIX`** is defined at `20-stops.js:81` and **read by no code** (only comments). `item.dok` is used for the label
(`71:154`) and the log. N = `items.length` everywhere (progress, "x out of N", trophies `33-trophies.js:58`); more than 10 items
shows "3 of 12" instead of dots (`10-ui.js:633`). A different count or mix breaks nothing in code, but with fewer than 10 items
gold is impossible, with fewer than 6 no medal can be won, and Zip's line "Get *6 right* to win a medal." (`70-test.js:50`) is fixed text.

**Labels.** Practise shows a code only if `T.OBJECTIVES[code]` exists (`52:175`) and a TWM only if `T.TWM[code]` exists (176).
The paper shows every code, with its name when known (`71:152-157`). The strand chips come from the **second character** of each
`lo` code: `N`, `G`, `S` (`70-test.js:32,105`).

---

## 4. Notes (`60-notes.js`)

Reads `ctx.pack.notes = { items: [...], check: [...] }` and `ctx.pack.los` (134-138, shown as "For teachers: …" under the last note).

| Field | Type | Use |
|---|---|---|
| `items[].en` | string, **required** (59) | `T.ui.richText` (125) |
| `items[].vi` | string | plain text behind the VI button (120) |
| `items[].example` | string or array of strings | "Example" box, each line `T.ui.richText` (126-129) |
| `items[].pic` | `T.tools.pic` spec | the picture (140-142) |
| `items[].art` | `T_ART` id | used only when there is no `pic` (143) |
| `check[].sentence` | `'… {right\|wrong\|wrong} …'` | the **first** `{…}` is the gap; choices split on `\|` and trimmed (50-55); before/after go through `richText` |
| `check[].answer` | string | must equal one of the choices exactly, else the check is **dropped silently** (61-66) |

Rich text (`T.ui.richText`, `10-ui.js:750-778`): `*words*` = gold highlight (no `*` or newline inside; so never write `3 * 4`);
`[[word]]` or `[[shown|key]]` = key word that opens `T.ui.wordCard(key)`. Everything else is plain text: **no HTML** in notes.
The key is looked up in every pack's `words.items`, case-insensitive, this stop first (`10-ui.js:1065-1078`); an unknown key still
draws a key-word button, and tapping it only logs a warning (1088-1090).
Flow: one note per screen, then one check per screen with the choices shuffled (180), one try each. Unit `check`: score out of the
number of usable checks; 1/1 when there are none (155). No length or count limits in code. `pack.ui.notes.<read|last|lastNo|check|right|wrong|empty>`
`{en, vi}` overrides Zip's lines (42-45).

---

## 5. Words (`40-words.js`)

Reads `ctx.pack.words = { sets: [{ id, title: {en, vi} | string, keys: [word, …] }], items: { word: { art, vi, def, cue, chunks } } }` (8, 77).

| Field | Use |
|---|---|
| `sets[].id` | the unit id (`ctx.saveUnit(set.id, score, total)`, 329; `00-core.js:487`): unique in the stop, never change it later |
| `sets[].title` | menu and top bar; over 20 characters the main button says "Start: Set n" (141-143) |
| `sets[].keys` | words; a key with no entry in `items` is skipped; a set with no usable key is hidden (49-51, 78) |
| item key | the word itself: card title, quiz answer; a word with a part of 12 letters or more gets a smaller title (`10-ui.js:1084`) |
| `art` | `T_ART` id for the card front, back, quiz and set card (the first key's art is the set's picture, 116). Missing art -> placeholder |
| `def` | English meaning on the back (210) |
| `vi` | Vietnamese meaning behind a VI button (198-199) |
| `cue` | optional sentence under the front picture; `___` (2+ underscores) is drawn as a gap (59-66, 194) |
| `chunks` | optional `'skel·e·ton'` (split on `·`, `•`, `\|`), shown when there is more than one part (69-72, 203-206) |

Quiz per set (230-324): words shuffled; question 1, 3, 5 … = the picture with **3 words** (the word + 2 from the same set first,
then other sets, 250-258); question 2, 4 … = the word with up to **4 pictures with different `art` ids** (same set first; other sets
only to reach 3, 270-282). So two words must not share an `art`, and **no picture may contain its word** (`03-art-words.js:10`).
One tap answers. Stars of a set result: 90% 3, 75% 2, else 1 (53-56). `pack.ui.words.<name>` overrides Zip's lines (38-41).

**Audio.** None, and no per-word data is needed. `speechParts()` returns null unless `T.NO_VOICE === false` (`05-fx.js:501`);
`80-polish.js:30-40` replaces `T.fx.sayWord` with `() => false` and forces `status().speech = false`; the word card builds its
"Hear the word" button only when `T.fx.status().speech` (`10-ui.js:1093-1097`).

**Word art conventions** (`03-art-words.js`, `04/07/08/09/10-art-words-*.js`, `30-art.css`):

- id `w-<word-with-hyphens>`; `viewBox="0 0 400 300"`; root attributes exactly as `svg()` below.
- **Literal hex colours** as attributes; ink `#2A2F3A`, outline `stroke-width="3"`, thin grid lines 1.4 at opacity .45; text in
  `Arial, Helvetica, sans-serif` bold. No CSS classes or `<style>` needed. No theme handling: the art plate is light in both themes
  "so the colours of a drawing never change" (`30-art.css:3-6`; `--plate` in `00-tokens.css:68`).
- Place colours (`03-art-words.js:20-27`): tth `#C2456E`, th `#7A5BD6`, h `#1E9E6A`, t `#2F7FD4`, o `#E89B12`; gold ring `#F5A623`.
- If a drawing uses `id="…"`, `T.ui.art` renames ids per copy; class names should start with the art id (`02-art-maths.js:10`).

Template (`03-art-words.js:29-41, 101-111, 215`):

```js
function svg(id, label, w, h, body) {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" class="art" data-art="' + id +
    '" role="img" aria-label="' + label + '" fill="none" stroke-linejoin="round" stroke-linecap="round">' + body + '</svg>';
}
function word(id, label, body) { return svg(id, label, 400, 300, body); }
function txt(x, y, size, text, fill, anchor) {
  return '<text x="' + x + '" y="' + y + '" ' + FONT + ' font-size="' + size + '" text-anchor="' + (anchor || 'middle') +
    '" fill="' + (fill || INK) + '">' + text + '</text>';
}
ART['w-digit'] = word('w-digit', 'Ten number cards: 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9.',
  (function () {
    const ks = ['o', 't', 'h', 'th', 'tth'];
    let s = '';
    for (let i = 0; i < 10; i++) {
      const x = 38 + (i % 5) * 68, y = i < 5 ? 62 : 162;
      s += '<rect x="' + x + '" y="' + y + '" width="56" height="76" rx="10" fill="#FFFFFF" stroke="' + PC[ks[i % 5]] + '" stroke-width="5"/>' +
        txt(x + 28, y + 55, 46, String(i), PC[ks[i % 5]]);
    }
    return s;
  })());
window.T_ART = Object.assign(window.T_ART || {}, ART);
```

---

## 6. Art registry

`window.T_ART` is a plain object: **id -> one `<svg>…</svg>` string**. Files add with `Object.assign(window.T_ART || {}, ART)`.

`T.ui.art(id, opts)` (`10-ui.js:335-354`) -> an inline `<svg>`: parses `T_ART[id]`, gives every `id="x"` / `url(#x)` / `href="#x"`
a per-copy suffix (274-289), ties a bare `.art{…}` rule in the drawing's `<style>` to `.art[data-art="<id>"]` (270-272), adds class
`art` and `data-art`. Options: `play`, `grey`, `label`, `decorative`, `cls`, `only`/`pad`/`ghost`. **Unknown id -> a dashed
placeholder that shows the id** (292-307), sized by prefix: `badge-` 200x200 round, `icon-` 96x96, `world-` 800x450, else 400x300.
`T.ui.plate(artOrId, opts)` (382-393) wraps a drawing in the light plate: `size: xs/sm/md/lg`, `shape: square/wide/tall/round/fill/bleed`,
`replay: false`, `play`, `cls`. A drawing with `data-anim-ms="N"` plays once under class `is-playing` (358-377).

**All ids in `src/js`:**

| File | Ids |
|---|---|
| `01-art-g4.js` (3 lines: a comment and one `Object.assign` of JSON copied from the Grade 4 trail) | `icon-step-practise`, `icon-step-notes`, `icon-step-see`, `icon-step-test`, `icon-step-words` (96x96, each with its own `<style>` palette) |
| `02-art-maths.js` | `badge-1` … `badge-9` (200x200), `icon-extra-lightning`, `icon-extra-selfcheck` (96x96) |
| `03-art-words.js` | `w-digit`, `w-value`, `w-place-value`, `w-place-holder`, `w-ones`, `w-tens`, `w-hundreds`, `w-thousands`, `w-ten-thousands`, `w-regroup`, `w-expanded-form`, `w-multiply`, `w-divide`; `medal-gold/silver/bronze`, `bolt-gold/silver/bronze` (96x96) |
| `04-art-words-2.js` | `w-count-back`, `w-count-on`, `w-minus-sign`, `w-negative-number`, `w-rule`, `w-sequence`, `w-square-number`, `w-temperature`, `w-thermometer` |
| `07-art-words-3.js` | `w-compare`, `w-equal-to`, `w-greater-than`, `w-halfway`, `w-less-than`, `w-nearest`, `w-number-line`, `w-order`, `w-round` |
| `08-art-words-4.js` | `w-column-method`, `w-difference`, `w-equal`, `w-estimate`, `w-even-number`, `w-inverse`, `w-odd-number`, `w-pair`, `w-sum` |
| `09-art-words-5.js` | `w-array`, `w-column`, `w-factor`, `w-factor-pair`, `w-multiple`, `w-multiplication-square`, `w-product`, `w-row`, `w-times-table` |
| `10-art-words-6.js` | `w-equal-groups`, `w-exact`, `w-grid-method`, `w-left-over`, `w-lots-of`, `w-partition`, `w-remainder`, `w-sensible`, `w-share` |
| `05/06/07/08/09/10-art-world-N.js` | `world-number-factory`, `world-pattern-canyon`, `world-rounding-river`, `world-market-square`, `world-times-table-tower`, `world-sharing-harbour`. **No scene exists for stops 7, 8, 9** (`world-fraction-garden`, `world-clock-station`, `world-chance-fair` are only named in `20-stops.js:90-92`) |

Ids the engine asks for by name: step icons and extras (`T.STEP_ART`, `16-stage.js:429-432`), `medal-<gold|silver|bronze>`
(`70-test.js:249`, `32-howto.js:45`, `33-trophies.js:126`), `bolt-<k>` (`75-lightning.js:76,124,211`), `icon-step-practise`
as the default game picture (`50-practise.js:282,310`), `T.stops[i].badgeArt`, `T.stops[i].sceneArt`.

**Badge template** (`02-art-maths.js:17-25, 32, 42-45, 120-125`): 200x200, `data-shape="circle"`, a full-bleed circle in a pale
world tint, an inner ring and a ground shadow in the world's deep hue, literal colours, ink outline 3, label = "World: what it shows".

```js
function badge(n, label, bg, ring, body) {
  const id = 'badge-' + n;
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="art" data-art="' + id +
    '" data-shape="circle" role="img" aria-label="' + label + '" fill="none" stroke-linejoin="round" stroke-linecap="round">' +
    '<circle cx="100" cy="100" r="100" fill="' + bg + '"/>' +
    '<circle cx="100" cy="100" r="92" fill="none" stroke="' + ring + '" stroke-width="4" opacity=".35"/>' +
    '<ellipse cx="100" cy="160" rx="62" ry="10" fill="' + ring + '" opacity=".25"/>' +
    body + '</svg>';
}
const o = 'stroke="' + INK + '" stroke-width="3"';           // INK = '#2A2F3A'
ART['badge-7'] = badge(7, 'Fraction Garden: a round flower bed in 4 equal parts. One quarter has flowers.', '#E5F1CF', '#66861A',
  '<circle cx="100" cy="104" r="50" fill="#B98A5E" ' + o + '/>' +
  '<path d="M100 104V54a50 50 0 0 1 50 50z" fill="#8DB32E"/>' +
  '<path d="M100 54v100M50 104h100" ' + o + '/><circle cx="100" cy="104" r="50" ' + o + '/>' +
  '<circle cx="118" cy="80" r="7" fill="#F7889B" ' + o + '/><circle cx="132" cy="94" r="7" fill="#F5C24A" ' + o + '/>' +
  txt(64, 44, 18, '1') + '<path d="M54 50h20" ' + o + '/>' + txt(64, 70, 18, '4'));
```

The `ring` argument equals the world's `--world-N-deep` (light theme) in all nine badges (e.g. `#66861A`, `00-tokens.css:121`).
A badge must read at the map disc size: 5.25 to 7.75rem (`40-home.css:61-63,254-255`).

**Where badge and scene are used:**

| Place | Code | How |
|---|---|---|
| Map node | `30-home.js:136` | `T.ui.plate(T.ui.art(info.badgeArt, { decorative: true }), { shape: 'round bleed', replay: false })`; ring colour from `data-hue` (`40-home.css:123`) |
| Hub header, scene drawn | `35-hub.js:206-239` | when `T_ART[info.sceneArt]` is a string: `T.ui.art(sceneArt, { cls: 'hub__art' })`, absolutely fills `.hub__scene` (`45-hub.css:20-29`), `preserveAspectRatio="xMidYMid slice"`, class `is-live` unless reduced motion (221), class `<sceneArt>-night` while `T.ui.isDark()` (210-211, 223) |
| Hub header, no scene | `35-hub.js:180-204` | a placeholder made of world tokens with the **badge** in the middle (`46-worlds.css:502-519`) |
| Coming-soon hub | `35-hub.js:471` | badge in a round plate with a lock or pencil |
| Result card, big moment, trophies, how-to | `16-stage.js:274,277`, `33-trophies.js:125`, `32-howto.js:31,44` | `info.badgeArt` |

**World scene recipe** (`05-art-world-1.js:1-18, 283-293`; the same in all six scene files):

- id `world-<kebab-name>`; `viewBox="0 0 800 500"`, `preserveAspectRatio="xMidYMid slice"`.
- Root hints read by `fitScene` (`35-hub.js:120-143`): `data-view="0 0 800 500"`; `data-safe="x,y,w,h"` (must show at every size,
  e.g. `150,150,500,210`); `data-band="top,bottom"` (the heart, kept clear of the floating buttons and the sheet, e.g. `222,334`).
  One group `data-heart="…"` marks the heart's main part (`intoGap`, `35-hub.js:148-159`).
- Layers back to front as `<g data-layer="sky|building|floor|things">`; Zip drawn in the scene; the maths of the stop shown in it.
- **Colours are CSS variables**, not literals: one `<style>` inside the SVG declares the day palette on `.art{--xx-*: …}` and the
  night palette on `.art.<id>-night{…}` (`05-art-world-1.js:27-53`); shapes use classes `<id>-<name>` with `fill:var(--xx-name)`.
  A few fixed colours (place colours, Zip) are literal.
- Motion only under `.art.is-live …`, transform and opacity only, slow loops; the `<style>` ends with
  `@media (prefers-reduced-motion:reduce){.art.is-live *{animation:none!important}}` and `html[data-fx="1"] .art.is-live *{animation:none!important}` (98-99).
- Size: one file of about 220 to 300 lines per scene, built by string helpers; keyframe names start with the id.

---

## 7. Worlds and tokens (`00-tokens.css`, `46-worlds.css`)

**Switches.** The router sets `data-world` on `#app` to the route's stop number, or `''` (`15-router.js:208`).
`T.stops[i].dataWorld` (`20-stops.js:14`) is **not read by any code**. `#app[data-world="N"]` maps the world's tokens onto the app
tokens (`00-tokens.css:277-298` for world 1, `46-worlds.css:321-496` for 2 to 9). `[data-hue="N"]` sets `--hue: var(--world-N)` and
`--hue-deep: var(--world-N-deep)` on one element (`00-tokens.css:301-309`); it is put on the hub root (`35-hub.js:427,488`), map nodes
and ground blobs (`30-home.js:152-153`) and player avatars (`25-players.js:185-194`, hue 1 to 9 hashed from the child's id).

**Per-world tokens** (20 each; world 1 at `00-tokens.css:127-146`, worlds 2 to 9 at `46-worlds.css:23-198`):

`--wN-bg`, `--wN-bg-deep`, `--wN-surface`, `--wN-surface-2`, `--wN-line`, `--wN-line-strong`, `--wN-bar`, `--wN-ctl`,
`--wN-ctl-line`, `--wN-ctl-edge`, `--wN-band`, `--wN-band-2`, `--wN-band-ink`, `--wN-band-ink-2`, `--wN-accent`,
`--wN-accent-text`, `--wN-accent-ink`, `--wN-accent-soft`, `--wN-glow`, `--wN-map-dot`

mapped to `--bg`, `--bg-deep`, `--surface`, `--surface-2`, `--line`, `--line-strong`, `--bar`, `--ctl`, `--ctl-line`, `--ctl-edge`,
`--band`, `--band-2`, `--band-ink`, `--band-ink-2`, `--accent`, `--accent-text`, `--accent-ink`, `--accent-soft`, `--glow`, `--map-dot`.
Plus the two hues `--world-N`, `--world-N-deep`. Rule: text on the band and on the accent reads at 4.5:1 or more; where white on the
accent would not, `--wN-accent-ink` is a deep ink of the same hue (`46-worlds.css:9-11`).

**The nine hues now** (`00-tokens.css:115-123` light; `215-223` dark):

| N | World | `--world-N` / `-deep` (light) | dark |
|---|---|---|---|
| 1 | Number Factory | `#E0548A` / `#AE3465` | `#F386B0` / `#671E3A` |
| 2 | Pattern Canyon | `#E0902F` / `#AC661A` | `#E3AA64` / `#67461E` |
| 3 | Rounding River | `#43A852` / `#2D7C3A` | `#3AD050` / `#265E2F` |
| 4 | Market Square | `#7C5FD8` / `#5940A8` | `#A187F2` / `#322263` |
| 5 | Times Table Tower | `#17A2B0` / `#0E7682` | `#2CC8D8` / `#1E6067` |
| 6 | Sharing Harbour | `#2F7FD4` / `#1F5CA0` | `#6EADF1` / `#1F4165` |
| 7 | Fraction Garden | `#8DB32E` / `#66861A` | `#9ECA31` / `#506223` |
| 8 | Clock Station | `#5B8CA8` / `#3C6880` | `#87BAD8` / `#264A5E` |
| 9 | Chance Fair | `#C050A8` / `#92367E` | `#E785D2` / `#5E2652` |

**To recolour world N**, every value exists **three times** (theme contract, `00-tokens.css:8-10`): `:root`, the guarded
`@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }`, and `:root[data-theme="dark"]`.

- Hues `--world-N(-deep)`: `00-tokens.css:115-123`, `215-223`, `258-266`, and again for 2 to 9 in `46-worlds.css:14-21`, `202-209`,
  and the `:root[data-theme="dark"]` block (261 on). `46-worlds.css` comes later and wins.
- World 1 tokens: `00-tokens.css:127-146`, `226-230`, `268-272`. Worlds 2 to 9: `46-worlds.css:23-198`, `210-257`, `261-318`.
- The `#app[data-world="N"]` mapping blocks hold no colours and need no change.

**To rename a world:** `20-stops.js` (`world`, `place`, `badge`, `sceneArt`), the CSS comments, the scene id and its `-night`
class, the badge label, and the background motes per world in `80-polish.js:98-101` (`MOTIF`: `'1': 'grain'` … `'9': 'streak'`).

---

## 8. Lightning and Self-check

**Lightning** (`75-lightning.js`) reads `pack.lightning = { secs: 60, items: [[question, [right, wrong, wrong]], …] }` or a plain
array of items (43-47).

- An item is kept when `x[0]` is truthy and `x[1]` is an array of 2 or more (46). The **first option is the right one** (135).
  All options are shown, shuffled (135); the keys 1, 2, 3 answer (168); the layout has 3 columns from 640px (`75-lightning.css`, `.lt-opts`).
- Text is plain: only `&lt;`, `&gt;`, `&amp;` are decoded (36); set with `textContent`, so no HTML, no `*bold*`, no `[[word]]`.
  No length limit in code: the question is `--fs-h2` with `overflow-wrap: anywhere`, an option `--fs-lead` in a 3.75rem button.
- `secs`: `T.steps.lightning.secs` (tests), else `pack.lightning.secs`, else 60 (51). Questions are shuffled each round and start
  again when the pool runs out (`order[qi % order.length]`, 129).
- Bolts: gold 20, silver 14, bronze 8 right (19-23), fixed. Saved: `stops.N.lightning.best`, `.plays`; one log entry `g: 'l'` (199-201).

**Self-check** (`78-selfcheck.js`) reads `pack.selfcheck = { goals: [string, …], again: ['r', 'c', …] }` (32-34).

- A goal is printed as "I can **goal**." (57): write it lower case, with no full stop. No limits in code.
- Three answers per goal: `can`, `better`, `help` (17-21). Saved as `stops.N.selfcheck.answers = { 0: 'can', … }` by **goal index**
  (76-78) and logged as `g: 's'`, `v: 'can,better,…'` (79): do not reorder goals after release.
- `again[i]`: `c` -> See it, `r` and `a` -> Practise (`AGAIN`, 22); anything else or missing -> Practise (103). It labels the
  "Practise again" button of every goal that is not `can` (100-108).

---

## 9. Stage ctx and UI kit

**`ctx`** = `T.stage.open(…)` (`16-stage.js:308-322`), given to `T.steps[step].mount(ctx)`; a function returned by `mount` runs on leaving (458-459).

| Member | Meaning |
|---|---|
| `stop`, `step`, `pack`, `body`, `root` | stop number, step id, `T.packs[stop]`, the element to build in, the stage root |
| `instruct({en, vi, mood})` | Zip's line (`*bold*` and `[[word]]` allowed); a string = English only; `null` hides it (186-190). mood: `happy`, `cheer`, `oops`, `think` |
| `zip(mood)` | change Zip's face only |
| `title(text)` | top bar title |
| `primary(opts)` / `secondary(opts)` | the ONE main button / the quiet one: `{ label, onClick, disabled, kind, icon, iconEnd, sub, aria, cls, sfx }`; `null` hides; returns the button node. A changed label ignores taps for 280 ms (`10-ui.js:512,551`) |
| `progress(i, n, {count})` | dots and "i of n" in the top bar; `null` hides; `count: true` = i are done (170-173) |
| `later(fn, ms)`, `every(fn, ms)`, `frame(fn)` | timers that stop when the child leaves; each returns `cancel()` (104-123) |
| `onLeave(fn)`, `onBack(fn)` | cleanup; back-arrow handler (return `true` = handled, 142-145) |
| `saveUnit(unitId, score, max)` | `T.progress.saveUnit(stop, step, …)`: keeps the best; -> true when it became the saved result |
| `result({stars, max, title, lines, primary, secondary, art, mood, artMove, burst, best, prize, onDone})` | a result card over the stage -> `{ el, close }` (205-246) |
| `finish({title, lines, art, artMove, burst, best, won, again})` | the step's result with its stars and the way on (251-281) |
| `reset()`, `leave()` | used by the stage itself |

Step units (`00-core.js:482-494`): words = set ids; see = `challenge`; practise = entry ids; notes = `check`; test = `paper`.
Stars: all units played, then 75% = 2, 90% = 3 (569-576). A stop has 15 stars; all five steps done = the badge (605-607).

**See it scene `sc`** (`45-see.js:97-109`): `el`, `stage` (the ctx), `index`, `count`, `instruct`, `zip`, `later`, `every`, `frame`,
`onLeave`, `onResize(fn)`, `ready()`, `primary(opts)`, `next()`. Own scenes: `T.see.register(stop, { scenes: [{ id, title: {en, vi}, mount(sc) }] })` (61-65).

**`g` for `T.gameKit.ask(g, task, meta)`** (`52:153-155, 609-611`): `{ ctx: { primary, secondary, instruct, later, zip }, body, stop,
score(points, max), right(el), wrong(el), streak(first)? }`; `meta = { q, total, game, lo, twm, showLo, surface: 'board'|'paper', last, done(result), dok?, chip? }`;
`result = { ok, first, tries, hints, shown, v }` (403).

**`T.util`** (`00-core.js:36-173`): `$(sel, root)`, `$$(sel, root)` -> array, `esc(s)`, `shuffle(a)`, `sample(a, n)`, `clamp(v, lo, hi)`, `uid(prefix)`, and

```js
el(tag, attrs?, ...kids)   // attrs: class (string | array with falsy skipped | {name: cond}), dataset {…}, style {…} | string,
                           // html (trusted markup), text, onClick/on<Event>, any attribute; null skipped; false omits (but
                           // writes "false" for aria-* and data-*). SVG tag names get the SVG namespace; force with 'svg:svg',
                           // 'svg:path', 'svg:text' … kids: nodes, strings, numbers, nested arrays; null/false skipped.
```

**`T.ui`** (`10-ui.js:1148-1157`):

| Helper | Signature and meaning |
|---|---|
| `icon(name, {label})` | 24x24 stroke icon. Names (`T.ui.icons`, 120-152): `back next check cross star heart lock sound-on sound-off flip speaker vi replay home trophy pencil play chevron info help map people device shield share plus minus up down bulb`. Unknown name -> a dot |
| `art(id, opts)`, `plate(artOrId, opts)`, `playArt(svg)` | section 6 |
| `zip(mood)`, `zipMood(svg, mood, react)` | Zip the robot (viewBox 120x128) |
| `button({label, kind, icon, iconEnd, onClick, big, sub, disabled, full, aria, cls, sfx})` | kinds `primary secondary quiet good danger` |
| `iconButton({icon, label, onClick, kind: 'band'\|'float', cls, sfx})` | square icon button, `label` = aria-label |
| `choice({label, art, onClick, layout: 'row'\|'tile'\|'word', value, aria, cls, sfx})` | big answer button; `label` may be a node; the caller sets state classes `is-picked`, `is-right`, `is-wrong`, `is-dim` (480-504) |
| `richText(str)` | fragment: `*bold*`, `[[word]]`, `[[shown\|key]]`; all else plain text |
| `instruction({en, vi, mood, zip: false, plain, sound: false, cls})` | the Zip strip -> `{ el, set(line), zip(mood) }` |
| `viButton(onToggle)` | the small VI button; `onToggle(open)` |
| `stars(n, max)`, `hearts`, `dots(i, n, {count, text})`, `bar(f)`, `meter(el, v)`, `revealStars`, `countUp(node, to, {from, ms, format})` | meters |
| `dialog({title, body, actions, sheet, dismiss, cls})`, `toast(text, {ms})`, `celebrate({title, sub, art, over})`, `wordCard(key, {stop})`, `closeOverlays()` | overlays |
| `resultCard(opts)`, `actionBar()` -> `{ el, primary, secondary }` | cards and the bottom bar |
| `empty(node)` -> node, `stagger(parent)`, `reducedMotion()`, `isDark()`, `onTheme(fn)` -> stop(), `longWord(w)` | helpers |

**`T.fx`** (`05-fx.js:913-917`): `sfx(name, opts)` never throws, silent when sound is off. Names (337-447): `tap pick drop ok no pop
star win whoosh flip boing thud tick level chime note xylo step snap slide stretch bubble splat buzzer firework scan beep fall gurgle
hiss shimmer zip`. Seen options: `ok {streak}`, `chime {i}`, `boing {v}`. Tools use: `snap` (place/add), `pop` (remove), `pick` (select),
`no` (refused), `slide`, `tap`, `chime` (done), `thud`, `whoosh`, `tick`, `drop`, `boing`.
`burst(el, n)` confetti + sparkles + ring from an element's middle; `confetti(x, y, n)`, `sparkle(x, y, n, colour)`, `ring(x, y, colour)`,
`flyStar(from, to, opts)` -> promise; `still()` true = no motion (reduced motion or `html[data-fx="1"]`, 586-594).

Others: `T.guide.point(key, elementOrFn, {delay, ms, at, scope})` shows the pointing hand once per child and key (`17-guide.js:4-17`);
`T.events.log(e)` (`02-events.js:21`); `T.store.get(path, fallback)` / `set(path, value)` (`00-core.js:319-351`);
`T.router.go(route)` (`'home'`, `'stop-3'`, `'stop-3-words'`), `T.rewards.counter(stop, kind)` -> `{ hit(first) }` (`18-rewards.js`).

---

## 10. Checklist: what is hard-coded outside `20-stops.js` and the packs

Grade 5 = Cambridge Stage 6, classes 5B01 to 5B09. "Text" = what must change; "check" = works for nine stops, verify only.

| File:line | Now | Action |
|---|---|---|
| `00-core.js:187` | `STORE_KEY = 'g3-maths-trail-v3'` | new key (must equal `TRAIL_KEY` without the colon) |
| `00-core.js:1,4-5,386` | comments "Grade 3 … Stage 4", key name | text |
| `25-players.js:28` | `T.CLASSES = ['3B01', … '3B12']` | `['5B01', … '5B09']` |
| `25-players.js:30-33` | `'g3-maths-trail-players'`, `'g3-maths-trail-playing'`, `'g3-maths-trail-home-tip'`, `'g3-maths-trail-v3:'` | new keys |
| `25-players.js:60` | probe key `'g3-maths-trail-probe'` | new key |
| `25-players.js:470` | `'Maths Revision Trail'` (start screen brand) | check / text |
| `17-guide.js:21` | `DEVICE_KEY = 'g3-maths-trail-guide'` | new key |
| `30-home.js:22` | `app: 'Maths Revision Trail'` | check / text |
| `30-home.js:27-28` | "This app helps Grade 3 pupils revise maths for the End of Semester 1 test. It follows Cambridge Primary Mathematics Stage 4." + VI "lớp 3 … Stage 4" | text (EN and VI) |
| `30-home.js:126-129` | map positions: 3x3 snake; second row of the laptop layout `[4, 2.5, 1.5, 0.5][i - 5]` | check: assumes exactly 9 stops |
| `40-home.css:301,324,331-333,337-339,345` | `.map-node:nth-child(3)`, `(4)`, `(9)`, `(n+6)`: Zip and label positions | check: assumes 9 nodes |
| `33-trophies.css:124` | `.shelf__item:nth-child(9n+1)` | check |
| `20-stops.js:29-57` | `T.OBJECTIVES`: Stage 4 codes `4Nc.04` … | replace with Stage 6 codes (a code missing here is hidden in Practise, `52:175`) |
| `20-stops.js:74,81` | DOK comment "Grade 3"; `T.DOK_MIX` | text; mix unused by code |
| `20-stops.js:84-92` | the nine stops: `title`, `world`, `place`, `badge`, `unit`, `los`, `status`, `badgeArt`, `sceneArt` | replace |
| `18-rewards-text.js:21` | `finale: { over: 'All nine badges', title: 'Trail Champion!' }` | check (nine stays true) |
| `18-rewards-text.js:30,44` | "Finish all 5 steps …", "{n} more stops are coming soon." | check |
| `31-howto-text.js:9` | "9 worlds. Go from Stop 1 to Stop 9." / "9 thế giới. Đi từ Trạm 1 đến Trạm 9." | check |
| `31-howto-text.js:22` | `steps.see: 'See it with blocks'` | text if See it is not blocks |
| `35-hub.js:23` | `WHY.see = 'Next: see it with blocks.'` | text if See it is not blocks |
| `35-hub.js:77,83,85,91,92` | step lines "picture words", "pictures to explore, then a challenge", "games: pictures, then numbers", "things to remember", "questions, from easy to hard" | check wording |
| `35-hub.js:329-330,440-441`, `30-home.js:173,181,238`, `33-trophies.js:135` | "/ 15" stars per stop (5 steps x 3) | check |
| `52-kit-model.js:48-80` | `DO`: Zip's first line per tool (blocks, chart, slider, nline …) | add a line per new tool |
| `52-kit-model.js:508-515`, `45-see.js:232-234` | guide keys `mat-plus`, `mat-join`, `mat-break`, `counters`, `slider`, `tool-<k>`, `see-<tool>` | automatic for new tools with `tip()` |
| `70-test.js:27-31,50` | medals 10 / 8 / 6; "Get *6 right* to win a medal." | check (10-item papers) |
| `70-test.js:32` | `STRANDS = { N, G, S }` by the 2nd character of the code | check Stage 6 codes fit |
| `75-lightning.js:19-23,30` | bolts 20 / 14 / 8; "Get *8 right* …" | check |
| `80-polish.js:98-101` | `MOTIF` background motes per world `'1'` … `'9'` | retune per new world |
| `80-polish.js:276` | `SCHOOL = 'Vinschool Times City Primary School - T36'` (masthead on Home) | check |
| `85-devkit.js:79-88,158-169,199,217,233,244` | samples: `badge-1`, `badge-2`, `world-number-factory`, `world-sharing-harbour`, "Place Value Pro", "the Number Factory", "Grade 3 Maths Revision Trail", `'*6*,215'` | text (dev routes `dev-kit`, `dev-stage`, not linked) |
| `02-events.js:3-9` | log shape; game letters c, r, a, m, l, s | no change (comment example `'4Np.01'`) |
| `90-boot.js` | nothing stop- or grade-specific | none |
| `16-stage.js:33-39,429-432` | result titles and lines; `T.STEP_ART` | none |
| `00-tokens.css:113-146,215-230,258-272`, `46-worlds.css` (all) | world hues, tokens, comments with world names ("the Flower Lab at night", 225) | recolour / rename (section 7) |
| `10-shell.css:163-168` | `#app[data-route="stop-:n-see"] .stage__strip .instruct__text` keeps 3 lines of height on a phone | none (all stops) |
| `39-tools-order.css:118-119` | `.see-scene--compare …` (a See it scene with `id: 'compare'`) | only matters if a new scene reuses the id `compare`. No `.see-scene--meet` rule exists |
| `55-see.css:27-30`, `39-tools-order.css:116-117`, `39-tools-share.css:17,62-63`, `39-tools-times.css:44-45,96,118` | See it desk layout per tool root class: `.see-hands__desk:has(> .nl, > .th, > .cg)`, `> .mat`, `> .pc, > .ord`, `.see-hands .sh__…`, `.ar__felt`, `.rw__felt`, `.msq__g` | a new tool needs its own desk rule |
| page shell (not in `src/`; `ref/g3-built.html`) | `<title>Maths Revision Trail</title>`, `<html lang="en">`, `<div id="app"></div>` | check |
| packs `22-pack-stopN.js` | `T.packs[N] = { n, title, los, blurb: {en, vi}, words, see, practise, notes, test, lightning, selfcheck, ui }`; practise ids unique across stops (`50-practise.js:5`) | replace |

A stop is "playable" when `status === 'open'` and `T.packs[n]` exists; each step shows "coming soon" until its part is in the pack
(`T.stage.hasPart`, `16-stage.js:404-425`: words needs a set with a known key; see needs scenes; practise a non-empty array; notes
`items`; test `items`; lightning any `pack.lightning`; selfcheck `goals`). `info.quick: true` marks a practise-only stop (`35-hub.js:414-424`).

---

## 11. MX model files (`06-art-world-2.js`, line 262 on)

`var MX` is a global (266). `MX.make(def, mode)` (785-795) calls `MX.M[def.type](def, mode)`, then sets `type`, `mode`,
`marks` (default 1), `def`; puts `def.ctx + ' '` in front of `q`; copies `def.fig` to `task.fig` when the model set none; copies
`def.pic` to the unused `task.real`. Exports (800-801): `P, PI, places, fmt, sg, ORD (to 12th), digits, colsFor, total, cnt, cap, say,
words, nameParts, SYM, LET (A-E), make, M, arrange, same, slipMsg, ruleText, types`. Later files add `MX.colwork, MX.eqSolve, MX.rnd`
(1487), `MX.F` (2006), `MX.time` (2200), `MX.chance` (2459), `MX.slipped` (2656).

**How a later file extends MX** (808-810, 2605-2607): an IIFE that takes what it needs and assigns to `MX.M`:

```js
(function () {
"use strict";
const M = MX.M, fmt = MX.fmt, sg = MX.sg, arrange = MX.arrange, LET = MX.LET;
M.mytype = function (d, mode) {            // d = one DEF from the pack ({ type: 'mytype', … }); mode 'our' | 'your'
  return { q, how, sub, ui, fig, lines, blanks, opts, letters, marks, ready, check(r), hint: { pic, step, reveal },
           worked: { text, model, pic }, yes, key, fill, right, given };
};
})();
```

A model is only looked up when a step opens, so the file may sit anywhere after `06-art-world-2.js` in `order.json`.
All model text is HTML (`innerHTML`, `52:127-131`): `<b>`, entities, and `[[word]]` links that fall back to bold when no pack has
the word (`52:104-110,134`). `arrange(list, at)` puts the first (right) option at index `at` (324-328).
`check(r)` returns `{ ok }` or `{ ok: false, msg, parts, pickOk, decOk, reasonOk }`; `{ ok: true, note }` is also read (`52:415`).

Reuse column: **G** = generic, usable for Stage 6 by data alone; **I** = works but whole numbers only (text uses `fmt`, answers are
typed on the digit-only pad); **S3** = Stage 4 content, little use; **X** = needs a tool or picture kind that is **not in `src/`**.

| Type (line) | Def fields | Tool `ui.k` / pics | Answer | Reuse |
|---|---|---|---|---|
| `build` (356) | `n` | `mat` (ctl) | the mat | S3, to 9,999 |
| `read` (376) | `b` | `mat` | box | S3 |
| `trade` (398) | `b, p, act` | `mat` (brk/join); pic `swap` | boxes | S3 |
| `pickmat` (443) | `n, opts, at, regrouped` | `matpick` (options with `b`) | options | S3 |
| `digit` (460) | `n, d` | `chart` | options | I (5 places at most) |
| `counters` (478) | `n` | `counters` | chart counters | S3 |
| `slide` (499) | `n, op, by` | `slider`; pic `rule` | box | I: x and ÷ by 10 or 100 only, no decimals |
| `expand` (516) | `parts` | `cells`; pic `stack` | one digit per place | I |
| `calc` (537) | `items` | - | boxes | I: x ÷ 10/100 lines |
| `missing` (557) | `items` | - | boxes | I |
| `fromexp` (584) | `parts` | pic `stack` | box | I |
| `part` (602) | `n, miss` | - | box | I |
| `value` (622) | `n, d` | - | box | I |
| `name` (642) | `n` | pic `name` | box | I (number names to thousands, 303-321) |
| `regroup` (660) | `n, opts, at, letters, tip` | pic `mat` | options | S3 |
| `same` (676) | `b, opts, at` | pic `mat` | options | S3 |
| **`claim`** (691) | `who, says, ok, reasons: [{ t, why }]` (first = right), `at, hint, worked, model`; plus `fig` via `MX.make` | none | verdict + reason, `marks: 2` | **G: any topic**, all text from data |
| `story` (712) | `kind: times/share/need/(else)`, `text, unit, n, by, total, have, big, small, nb, ns, one, many, pic` | - | box | I: x ÷ 10/100 stories |
| `chain` (754) | `start, ops: [['x'/'d', n]], give` | pic `chart` | boxes | I: function machine with x and ÷ only |
| `jump` (819) | `start, step, n, dir, min, max, tick, lab` | `nline` jump | box (`neg`) | I, negatives yes; decimal steps would display but cannot be typed |
| `sqbuild` (842) | `k` | `grid` square | box | **G: square numbers** to 9 x 9 |
| `temp` (865) | `start, change, min, max, paper, text` | `thermo` or fig | box (`neg`) | G: negative numbers, whole degrees |
| `thermoread` (889) | `t, min, max` | fig `thermo` | box | G |
| `sqpick` (907) | `opts: [[r, c]], at` | option figs `dots` | options | **G: square numbers** |
| `seqnext` (924) | `a, d, kind: (linear)/double/halve/grow, g, shown, ask (1-3), line` | `pics` with `hops` when `line` | boxes (`neg`) | **G: term-to-term sequences**, whole numbers |
| `seqgap` (946) | `a, d, kind, n, gaps: [indexes]` | pic `hops` | boxes | G |
| `seqrule` (963) | `a, d, n, off, at` | pic `hops` | options: add/subtract d | G, linear only; term-to-term rule only |
| `seqnth` (978) | `a, d, n` (n up to 12, `ORD`) | pic `hops` | box | **closest to position-to-term**: asks the nth term of a linear sequence by counting jumps (`a + (n-1)d`); it does not ask for or state a position-to-term rule |
| `sqnth` (998) | `k` | fig `dotseq`, pic `dots` | box | **G: square numbers** |
| `sqval` (1015) | `k` | pic `dotseq` | box | **G** |
| `sqtick` (1031) | `opts: [numbers], at` | pic `dotseq` | options | **G**: "Which number is a square number?" |
| `cmp` (1054) | `items: [{ a, b }], mats, line: { min, max, tick, lab }` | `pics` (`mat` or `nline` show) | `sym` boxes | I, N: the "why" text reads digits by place (1044-1053); decimals not handled |
| `order` (1080) | `nums, text` | `order` | tiles | N; the tool takes decimals but the hint text speaks of places |
| `round` (1104) | `n, to (10 … 100000), line, text` | fig/pic `rline` | box | I: `LOOK` has no decimal places (1102) |
| `roundline` (1125) | `n, to, skin` | `nline` round | tap | I |
| `roundall` (1141) | `nums, to, target` | `pickall`; pic `rline` | rings | I |
| `roundrange` (1159) | `r, to, ask: min/max` | - | box | I |
| `roundpick` (2611) | `target, to, opts, at` | pic `rline` | options | I |
| `addmat` (1241) | `a, b` | `mat` (join) | box | S3 |
| `submat` (1262) | `a, b` | `takeaway` | box | S3 |
| `eqbox` (1300) | `l, r` (sides `[x]` or `[x, op, y]`, null = box), `scale, bar, text` | `balance` when `scale`; pic `bar` | box | I: + and - only |
| `oddeven` (1321) | `a, b, op, at` | pic `pairs` | options | S3 |
| `oddrule` (1334) | `x, y, op, ex, at` | - | options | S3 |
| `col` (1347) | `a, b, op: + / -, text` | pic `col` | one digit per column | I |
| `sumdiff` (1369) | `items, text` | pic `col` | boxes | I |
| `sumstory` (1386) | `a, b, op, text, unit` | pics `bar`, `col` | box | I |
| `estimate` (1399) | `a, b, op, to` | pic `rline` | boxes | I |
| `estpick` (1417) | `a, b, op, to, wrong, at, text` | pic `rline` | options | I |
| `piceq` (1430) | `img, one, many, n1, total, n2, unit, text` | fig `piceq`, pic `bar` | box | I |
| `parityrow` (1449) | `who, he, start, adds, wrong, at` | - | options | S3 |
| `digitpuzzle` (1466) | `a, b, op, hide` | pic `col` | boxes | I |
| `colfix` (2669) | `who, he, a, b, op, slip: carry/flip/used, at` | fig `col` | `ab`: options then box, `marks: 2` | I; the pattern for "spot the mistake" |
| `arr` (1500) | `r, c` | `grid` array | box | I |
| `rowsof` (1519) | `n, rows` | `rows` | box | I |
| `isfactor` (1538) | `n, k, at` | `rows` | options | **G: factors** (counters; `rows` allows up to 10 rows, 12 in a row) |
| `arrpick` (1553) | `r, c, wrong, at` | option figs `dots` | options | I |
| `msqfind` (1565) | `r, c` | `msq` | tap | I (10 x 10) |
| `missfact` (1582) | `a, b, miss` | pic `msq` | box | I |
| `multall` (1594) | `k, nums` | `pickall`; pic `msq` | rings | **G: multiples**; hint lights row k of the 10 x 10 square. One k only: no common multiples |
| `notmult` (1611) | `k, nums` (the answer is the first non-multiple in the list, 1612, 1618) | pic `msq` | box | G |
| `nextmult` (1628) | `k, shown` | pic `hops` | 2 boxes | G |
| `factorpick` (1640) | `n, opts, at` | - | options | **G: factors**; one n only: no common factors |
| `fpairs` (1652) | `n, hide: [pair indexes], pic` | fig/pic `frain` | boxes (`len: 2`) | **G: factor pairs** (hidden factor at most 2 digits) |
| `group3` (1666) | `nums, pair, arc, text` | pic `grp` | boxes | I |
| `facts` (1679) | `items: [[a, 'x'/'d', b]]` | pic `msq` | boxes | I |
| `factcmp` (1696) | `rows` | - | `sym` boxes | I |
| `twofacts` (1714) | `a, b, text, unit` | pic `dots` | options + boxes | I |
| `divstory` (1734) | `n, k, text, unit` | pic `msq` | box | I |
| `riddle` (1745) | `a, b, lo, hi` | - | box (`len: 3`) | **G: common multiples** in riddle form: "I am a multiple of a. I am also a multiple of b. I am between lo and hi." Answer = the first number strictly between `lo` and `hi` divisible by both (1746-1749); the words "common multiple" are not used |
| `multstory` (2715) | `text, n, k, extra, unit` | pic `dots` | box | I |
| `mulbox` (2732) | `left, right` (null = box) | pic `msq` | box | I |
| `mulmat` (1774) | `n, k` | `mat` | box | S3 |
| `sharec` (1794) | `n, k` | `share` | boxes | I |
| `jumpdiv` (1813) | `n, k` | `nline` jump | box | I |
| `gridmul` (1833) | `n, k` | pic `gridm` | boxes | I |
| `estmul` (1853), `estmulpick` (1869) | `n, k, to` (+ `wrong, at, text`) | pic `rline` | boxes / options | I |
| `partdiv` (1881) | `n, k, parts` | pic `bar` | boxes | I |
| `colmul` (1899) | `n, k, text` | pics `col`, `gridm` | digits | I |
| `calcmd` (1920) | `items, text` | pic `gridm` | boxes | I |
| `divrem` (1938) | `n, k` | pic `share` | boxes | I |
| `remstory` (1955) | `n, k, text, unit, want, why` | pic `share` | box | I |
| `findmistake` (1974) | `who, he, n, k, shown, opts, at` | pics `col`, `gridm` | `optsFirst`: options then box | I (on the paper the order is boxes, then options) |
| `mdbox` (2768) | `items` | pic `gridm` | boxes | I |
| `bigstory` (2799) | `text, n, k, extra, unit` | pic `gridm` | box | I |
| `mulderive` (2817) | `who, know, ask` | - | box | I |
| `cutbar` (2009) | `parts` | `strip` **X**; pic `fbar` **X** | 2 boxes `w: 'fr'` | X |
| `ucmp` (2028) | `a, b, ask, bars, at` | option figs `fbar` **X** | options | X unless `bars: false` (then only the hint pic is missing) |
| `fsym` (2041) | `rows: [[d1, d2]], bars` | fig `fbars` **X**, pic `fbar` **X** | `sym` boxes | unit fractions only; pictures X |
| `upick` (2060) | `ds, ask, at, text` | pic `fbar` **X** | options | unit fractions only |
| `fracof` (2072) | `n, d, tool, bar, text, unit` | `share`; pic `bar` | box | I: unit fraction of an amount |
| `fcalc` (2092) | `items` | pic `bar` | boxes | I: unit fractions |
| `fdiv` (2109) | `a, b, kind, one, many, pic, text` | pic `pizzas` **X** | boxes | X for the picture |
| `fdivsent` (2128) | `a, b, miss` | - | boxes | G: fraction as division |
| `fwhole` (2145) | `d` | pic `fbar` **X** | box | unit fractions |
| `fback` (2156) | `d, part` | pic `bar` | box | I |
| `fstory` (2169) | `n, d, rest, text, unit` | pic `bar` | box | I |
| `clockread` (2204), `clockset` (2223) | `h, m` (+ `as`) | fig / tool `clock` **X** | boxes / the clock | X |
| `to24` (2240) | `h, m` | - | boxes | S3 (time) |
| `timewords` (2257) | `h, m, as, wrong, at, text` | fig `dclock` **X** | options | X |
| `tconv` (2270), `tjump` (2286) | `n, from, to` (+ `back, text`) | - | box | S3 (time) |
| `tgap` (2316) | `from, to, h12, line, unit, text` | pic `hops` | boxes | S3 |
| `ttread` (2338), `ttwo` (2351), `tablewhen` (2373) | `table, run, stop` / `table, from, to, by, who, he, at` / `head, rows, cap, intro, ask, which, many` | pic `table` **X** | boxes / options | X |
| `tacross` (2396) | `d1, h1, d2, h2, text` | pic `hops` | box | S3 |
| `tmatch` (2415), `ematch` (2527) | `items, order` | `match` **X** | lines drawn | X |
| `trial` (2462) | `kind, items, parts, seq, ask` | `trial` **X** | options | X |
| `chance` (2479) | `dev, target` | - | options | S3 (chance words) |
| `results` (2495) | `intro, col, rows, ask, end, unit` | pic `table` **X** | options or box | X |
| `tallyfill` (2515) | `dev, intro, names, seq` | pic `strip` **X** | boxes | X |
| `jugset` (2544) | `max, per, tick` | `jug` **X** | the jug | X |
| `scaleread` (2557), `scalestep` (2586) | `dev, min, max, per, tick, at, as` | figs `jug`, `scale` **X** | options or boxes | X |

Summary for Stage 6: sequences (`seqnext`, `seqgap`, `seqrule`, `seqnth`), square numbers (`sqbuild`, `sqpick`, `sqnth`, `sqval`,
`sqtick`), multiples and factors (`multall`, `notmult`, `nextmult`, `factorpick`, `fpairs`, `isfactor`, `riddle` for a common multiple), negative numbers
(`jump`, `temp`, `thermoread`, `cmp`, `order`) and the all-purpose `claim` are reusable by data. **Nothing exists** for decimals,
position-to-term rules as such, common factors, common multiples by name (only `riddle`), non-unit fractions, percentages, quadrilaterals, rotational
symmetry, circles, or mean/median/mode/range. `MX.F(n, d)` (2002) writes `<span class="fr"><i>n</i><span class="frs">/</span><i>d</i></span>`
and the answer-box pair uses classes `frb`, `frl` and box width `fr` (2003, 2014): **no rule for `.fr`, `.frs`, `.frb`, `.frl` or
`.blank--fr` exists in `src/css`**, so the fraction models (and the Stop 7 to 9 tools and pictures marked X) were never finished in this build.

---

## 12. Gotchas

1. **Number pad is digits only**: keys 0-9, minus, `< > =`, rub out (`39-numpad.js:33-36`); the keyboard filter is `/^[0-9<>=-]$/` (97).
   `len` counts digits; a typed value is shown through `MX.fmt` (40). Decimals, fractions and percentages need an extension, or
   questions answered with options, tiles or a tool.
2. **`MX.fmt`** (`06-art-world-2.js:278`) adds thousands commas with a regex on the whole string: fine for up to 3 decimal places
   (`1234.5` -> `1,234.5`), wrong for 4 or more (`0.1234` -> `0.1,234`). `MX.sg` (798) = `fmt` with a real minus sign.
3. **Blanks**: `{0}` … `{9}` only (`/\{(\d)\}/`, `52:227`, `71:229`): at most 10 boxes per question. Box width class comes from
   `blanks[i].w`; CSS exists for `cell`, `cbox` (and `box`, `mid` on the paper); `big`, `mid`, `sym`, `fr` have no own rule (`38-tools.css:62-70`, `71-test-paper.css:82-85`).
4. **`task.ready(r)`**, when defined, is the only readiness test in `ask()` (`52:312`): it must check boxes and options too.
   On the paper it is the only way a new tool is seen as "answered" (section 3).
5. **`ab` and claim tasks need `marks: 2`** (`71:101,147`).
6. **A new tool needs**: a `DO.<k>` Zip line (`52:48-80`); `on('trade')` and `destroy()` for See it; honouring `spec.can = {}`
   (everything off until `allow`); `spec.fixed` for use as a picture; a desk rule in CSS for See it (section 10); a look under
   `.tp-sheet` for the paper (see `39-tools-order.css` header); primitive values in `get()` for `until`.
7. **Unknown names fail silently**: `T.tools.pic` with an unknown `k` -> null; `task.ui.k` with no `T.tools[k]` -> no tool (`52:213`);
   a model that throws is skipped (`52:557`, `70-test.js:94`); a check whose `answer` is not a choice is dropped (`60-notes.js:64`);
   a word key missing from `items` is skipped; a missing art id shows the placeholder with its id.
8. **`*` and `[[ ]]`**: in `richText` (Zip lines, notes, result lines, pack blurb) `*…*` is a highlight, so use `×` for multiply.
   Model text is HTML instead; `ask()` turns `<b>` into `*…*` for Zip's strip (`toLine`, `52:119-124`). Pack strings that reach
   models (`def.ctx`, `d.text`, claim reasons) are inserted as HTML.
9. **Load order.** `var MX` must exist before a step opens (it is defined right after the Stop 2 scene). `38-tools.js` creates
   `T.tools.emitter` and the `picKinds` registry; the `39-*` files only add to them. Read **at load**: `T.REWARDS` by `18-rewards.js:38`
   (so `18-rewards-text.js` first); `T.HOWTO` by `32-howto.js:15`; `T.STEP_ART` by `35-hub.js:18`; `T.STEPS`/`T.EXTRAS` by
   `16-stage.js:471-473` (routes registered at load); `53-kit-loader.js` wraps `T.steps.practise.mount` (after `50-practise.js`).
   Tools, pictures, models, packs and art are looked up at run time, so their order among themselves is free. `90-boot.js` runs last.
10. **`data-world` is the stop number** from the route (`15-router.js:208`); `dataWorld` in `T.stops` is unused. Stop numbers are also
    the keys of `T.packs`, the saved document (`stops.N…`), `badge-N` by convention only (the id comes from `badgeArt`).
11. **Colours.** Rule: "Components never use a literal colour" (`00-tokens.css:8-10`); `65-notes.css`, `55-see.css` say "tokens only".
    Exceptions in practice: things drawn on the light art plate use literals (place colours `38-tools.css:3-7`; `39-tools-share.css:26`;
    `39-tools-lines.css:158`), the test sheet is white with `#222222` in both themes (`71-test-paper.css` header, 82), all art uses
    literal hex (word cards, badges) or its own CSS variables with a `-night` class (scenes). Ink on the plate is `--plate-ink`.
12. **CSS prefixes** (one per file): tools `wb pv sl` (chart, slider), `mat blk bpic`, `nl th cg dpic dotseq hp hops toolpics`,
    `ord pk pkall pc`, `sh gm`, `tk bal pr prpic cs cspic barm peq`, `ar rw msq fr__ gp`; shared `tl__btn`, `ar__cap`, `p-<place>`,
    `blank`, `npad`. Steps: `mk` (question), `tp` (paper), `nt`, `wd`, `lt`, `mt`, `sc`, `see`, `gm`, `hub`, `step-card`, `map`, `home`.
13. **Motion.** Transform and opacity only; ask `still()` (`T.fx.still()` / `T.ui.reducedMotion()`) and show the final state at once.
    Global CSS kills animation and transition time under `prefers-reduced-motion` (`00-tokens.css:369-378`); the lowest effects tier
    sets `html[data-fx="1"]` (`80-polish.js`), which `still()` also reports (`05-fx.js:586-594`). Tokens: `--dur-quick 150ms`,
    `--dur-base 250ms`, `--dur-slow 400ms`, `--dur-max 700ms`, `--stagger 60ms` (`00-tokens.css:172-183`).
14. **Zip lines: 10 words at most**, each `{en, vi}`. Engine lines are collected in `T.zipLines` (`model` `52:613`, `test` `70:261`,
    `notes` `60:30`, `words` `40:373`, `practise` `50:135`, `lightning` `75:33`, `selfcheck` `78:130`, `rewards` `18-rewards-text.js:52`)
    and "checked by test/guide.mjs", which is not in this repository. UNCLEAR whether pack lines (See it `zip`/`then`, `challenge.end`)
    are checked by it; they are not registered in `T.zipLines`.
15. **Sizes.** `--fs-small: .9375rem` "15px on a phone: nothing a child must read is smaller" (`00-tokens.css:163`); `--tap: 3rem`
    "the smallest touch target (48px on a phone)" (157); tool CSS headers say "tap targets 48 px" (the 100 boxes of `msq` are smaller
    on a phone). Root font size is fluid, 16px to about 22px (317). Vietnamese always uses `--font-body` (357).
16. **Vietnamese** sits behind a VI button everywhere; `vi` strings are plain text except in `instruct` (rich text).
17. **Ids that must stay stable** once children have data: word set ids, practise entry ids (unique across all stops), self-check
    goal order, stop numbers. The store keeps only the best result per unit (`00-core.js:535-547`).
18. **Scenes for stops 7 to 9 and their packs are stubs** in this source: packs 7-9 hold only `n`, `title`, `blurb`
    (`22-pack-stop7.js`); the hub shows the placeholder scene and every step says "coming soon".
19. **See it tool heights**: only tools that read `spec.room` and offer `fit()` shrink to the scene (`mat`, `takeaway`, `msq`);
    others rely on CSS widths under `.see-hands`.
20. `T.gameKit.current` and `T.testPaper.current` hold the task(s) on screen "for the tests only" (`52:157`, `70-test.js:153`).
