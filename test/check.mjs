// node test/check.mjs [stop ...]   - checks the content of the stops in the built page (dist/index.html), in a real browser:
// every question of every set of numbers builds, its own right answer is marked right, every wrong option is marked
// wrong, every picture can be drawn, every word has a picture, the notes checks are sound. Exit code 1 on any problem.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const want = process.argv.slice(2).map(Number).filter(Boolean);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 800 } });
const errs = [];
p.on('pageerror', e => errs.push('pageerror: ' + e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
await p.goto('file://' + path.resolve(process.env.DIST || 'dist/index.html'));
await p.waitForTimeout(400);
const out = await p.evaluate((want) => {
  const bad = [], info = [];
  const stops = (want.length ? want : Object.keys(T.packs).map(Number)).filter(n => T.packs[n]);
  const picOk = (spec, where) => { if (spec == null) return; let e = null; try { e = T.tools.pic(spec); } catch (x) { bad.push(where + ': picture throws ' + x.message); return; } if (!e) bad.push(where + ': picture not drawn ' + JSON.stringify(spec).slice(0, 80)); };
  const plain = h => String(h || '').replace(/<[^>]+>/g, '');
  function checkDef(def, mode, where, onPaper) {
    let t;
    try { t = MX.make(def, mode); } catch (x) { bad.push(where + ': does not build: ' + x.message); return; }
    if (!t.q) bad.push(where + ': no question text');
    const okPick = t.opts ? t.opts.findIndex(o => o.ok) : -1;
    if (t.opts && t.opts.filter(o => o.ok).length !== 1) bad.push(where + ': needs exactly one right option');
    if (t.opts && new Set(t.opts.map(o => plain(o.html) + JSON.stringify(o.fig || o.b || ''))).size !== t.opts.length) bad.push(where + ': two options look the same');
    const base = Object.assign({}, t.right || {});
    if (t.blanks) { if (!t.fill || t.fill.length !== t.blanks.length) bad.push(where + ': fill must give one value per answer box'); base.v = (t.fill || []).map(String); }
    if (t.opts) base.pick = okPick;
    if (t.type === 'claim') base.dec = t.verdict ? 'correct' : 'incorrect';
    try {
      const res = t.check(base) || {};
      if (!res.ok) bad.push(where + ': its own right answer is marked wrong (' + plain(res.msg) + ') ' + JSON.stringify(base).slice(0, 120));
      if (t.ready && !t.ready(base)) bad.push(where + ': ready() is false for the right answer');
      if (t.opts) t.opts.forEach((o, i) => { if (i === okPick) return; const r = t.check(Object.assign({}, base, { pick: i })) || {}; if (r.ok) bad.push(where + ': wrong option ' + i + ' is marked right'); if (!r.msg && !o.why) bad.push(where + ': wrong option ' + i + ' has no feedback'); });
      if (t.blanks) t.blanks.forEach((bl, i) => { const v = base.v.slice(); v[i] = bl.sym ? (v[i] === '<' ? '>' : '<') : String((parseFloat(v[i]) || 0) + 1); const r = t.check(Object.assign({}, base, { v: v })) || {}; if (r.ok) bad.push(where + ': a wrong value in box ' + i + ' is marked right'); if (!r.msg) bad.push(where + ': a wrong box has no feedback'); });
      if (t.type === 'claim') { const r = t.check(Object.assign({}, base, { dec: t.verdict ? 'incorrect' : 'correct' })); if (r.ok) bad.push(where + ': the wrong verdict is marked right'); }
    } catch (x) { bad.push(where + ': check throws: ' + x.message); }
    if (t.ui && t.ui.k && !['chart', 'counters', 'cells', 'slider', 'matpick'].includes(t.ui.k)) {
      if (!T.tools[t.ui.k]) bad.push(where + ': no tool ' + t.ui.k);
      else { try { const host = document.createElement('div'); document.body.appendChild(host); const tool = T.tools[t.ui.k](host, Object.assign({ task: t }, t.ui)); if (!tool || !tool.el) bad.push(where + ': tool ' + t.ui.k + ' has no el'); if (t.right && tool.solve) tool.solve(t.right); host.remove(); } catch (x) { bad.push(where + ': tool ' + t.ui.k + ' throws: ' + x.message); } }
      if (!(T.zipLines.model.doLines[t.ui.k])) bad.push(where + ': no Zip line (T.G5_DO) for tool ' + t.ui.k);
      if (onPaper && !t.ready && !t.blanks && !t.opts) bad.push(where + ': a tool question on the test paper needs task.ready(r)');
    }
    if ((t.type === 'claim' || t.ab) && t.marks !== 2) bad.push(where + ': needs marks: 2');
    if (!t.worked || !t.worked.text) bad.push(where + ': no worked answer');
    if (!t.key) bad.push(where + ': no key');
    picOk(t.fig, where + ' fig'); picOk(t.hint && t.hint.pic, where + ' hint'); picOk(t.worked && t.worked.pic, where + ' worked');
    (t.opts || []).forEach(o => picOk(o.fig, where + ' option'));
    [t.q, t.sub, t.how, t.yes, t.worked && t.worked.text, t.hint && t.hint.step].concat((t.lines || [])).forEach(x => { if (/undefined|NaN|\[object/.test(String(x || ''))) bad.push(where + ': broken text: ' + String(x).slice(0, 90)); });
    return t;
  }
  stops.forEach(n => {
    const pk = T.packs[n], W = 'stop ' + n + ' ';
    const parts = ['words', 'see', 'practise', 'notes', 'test', 'lightning', 'selfcheck'].filter(k => !pk[k]);
    if (parts.length) { bad.push(W + 'missing parts: ' + parts.join(', ')); }
    let count = 0;
    if (pk.words) {
      const seen = {}, arts = {};
      pk.words.sets.forEach(s => s.keys.forEach(k => {
        const it = pk.words.items[k];
        if (!it) { bad.push(W + 'word ' + k + ': no item'); return; }
        if (seen[k]) bad.push(W + 'word ' + k + ' is in two sets'); seen[k] = 1;
        if (!it.def || !it.vi) bad.push(W + 'word ' + k + ': def and vi are needed');
        if (!window.T_ART[it.art]) bad.push(W + 'word ' + k + ': no picture ' + it.art);
        if (arts[it.art]) bad.push(W + 'word ' + k + ': shares its picture with ' + arts[it.art]); arts[it.art] = k;
      }));
      Object.keys(T.packs).forEach(m => { if (+m !== n && T.packs[m].words) Object.keys(pk.words.items).forEach(k => { if (T.packs[m].words.items[k] && +m < n) bad.push(W + 'word ' + k + ' is also in stop ' + m); }); });
      info.push(W + Object.keys(seen).length + ' words');
    }
    if (pk.see) pk.see.scenes.forEach(s => {
      if (s.challenge) s.challenge.rounds.forEach((r, i) => r.v.forEach((d, j) => { checkDef(d, r.mode, W + 'see q' + (i + 1) + ' v' + j); count++; }));
      else {
        const tool = s.tool || 'mat';
        if (!T.tools[tool]) bad.push(W + 'see scene ' + s.id + ': no tool ' + tool);
        (s.steps || []).forEach((st, i) => { if (!st.wait) bad.push(W + 'see scene ' + s.id + ' step ' + i + ': no wait'); ['zip', 'then'].forEach(k => { if (!st[k] || !st[k].en || !st[k].vi) bad.push(W + 'see ' + s.id + ' step ' + i + ': ' + k + ' {en, vi}'); else if (plain(st[k].en).replace(/[*]/g, '').split(/\s+/).length > 12) bad.push(W + 'see ' + s.id + ' step ' + i + ' ' + k + ': more than 12 words'); }); });
        picOk(s.pic, W + 'see ' + s.id);
      }
    });
    (pk.practise || []).forEach(g => (g.levels || []).forEach((l, li) => l.rounds.forEach((r, i) => {
      if (!r.lo || !r.lo.every(c => T.OBJECTIVES[c])) bad.push(W + g.id + ' L' + (li + 1) + ' r' + (i + 1) + ': lo code unknown');
      if (!r.twm || !r.twm.every(c => T.TWM[c])) bad.push(W + g.id + ' L' + (li + 1) + ' r' + (i + 1) + ': twm missing');
      if (!r.v || r.v.length !== 3) bad.push(W + g.id + ' L' + (li + 1) + ' r' + (i + 1) + ': needs 3 sets of numbers');
      (r.v || []).forEach((d, j) => { checkDef(d, r.mode, W + g.id + ' L' + (li + 1) + ' r' + (i + 1) + ' v' + j); count++; });
    })));
    if (pk.notes) {
      pk.notes.items.forEach((it, i) => { if (!it.en || !it.vi) bad.push(W + 'note ' + (i + 1) + ': en and vi'); picOk(it.pic, W + 'note ' + (i + 1)); if (!it.pic && !it.art) bad.push(W + 'note ' + (i + 1) + ': no picture'); });
      pk.notes.check.forEach((c, i) => { const m = /\{([^}]*)\}/.exec(c.sentence); if (!m) { bad.push(W + 'notes check ' + i + ': no gap'); return; } const ch = m[1].split('|').map(x => x.trim()); if (ch[0] !== c.answer) bad.push(W + 'notes check ' + i + ': the first choice must be the answer'); if (new Set(ch).size !== ch.length || ch.length < 3) bad.push(W + 'notes check ' + i + ': 3 different choices'); });
      if (pk.notes.check.length !== pk.notes.items.length) bad.push(W + 'notes: one check per note');
    }
    if (pk.test) {
      const it = pk.test.items;
      if (it.length !== 10) bad.push(W + 'test: 10 items, has ' + it.length);
      if (it.map(x => x.dok).join('') !== '1111122223') bad.push(W + 'test: DOK must be 1,1,1,1,1,2,2,2,2,3 but is ' + it.map(x => x.dok).join(','));
      it.forEach((x, i) => { if (!x.lo || !x.lo.every(c => T.OBJECTIVES[c]) || !x.twm || !x.twm.every(c => T.TWM[c])) bad.push(W + 'test q' + (i + 1) + ': lo / twm'); if (!x.v || x.v.length !== 3) bad.push(W + 'test q' + (i + 1) + ': needs 3 sets'); (x.v || []).forEach((d, j) => { checkDef(d, 'your', W + 'test q' + (i + 1) + ' v' + j, true); count++; }); });
      const los = new Set([].concat(...it.map(x => x.lo))); (pk.los || []).forEach(c => { if (!los.has(c)) bad.push(W + 'test: objective ' + c + ' is not tested'); });
    }
    if (pk.lightning) {
      const li = pk.lightning.items; if (li.length < 40) bad.push(W + 'lightning: at least 40 items, has ' + li.length);
      const qs = {}; li.forEach(x => { if (!x[0] || !Array.isArray(x[1]) || x[1].length !== 3 || new Set(x[1]).size !== 3) bad.push(W + 'lightning: bad item ' + JSON.stringify(x)); if (qs[x[0]]) bad.push(W + 'lightning: twice: ' + x[0]); qs[x[0]] = 1; if (String(x[0]).length > 60) bad.push(W + 'lightning: too long: ' + x[0]); });
    }
    if (pk.selfcheck && (pk.selfcheck.goals.length < 3 || pk.selfcheck.goals.length !== pk.selfcheck.again.length)) bad.push(W + 'selfcheck: goals and again');
    info.push(W + count + ' question variants checked');
  });
  return { bad, info };
}, want);
console.log(out.info.join('\n'));
const all = out.bad.concat(errs);
console.log(all.length ? all.length + ' PROBLEMS:\n' + all.join('\n') : 'ALL OK');
await b.close();
process.exit(all.length ? 1 : 0);
