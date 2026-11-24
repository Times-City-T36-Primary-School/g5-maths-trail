// node test/play.mjs <stop> <step: practise|see|test|notes|words|lightning|selfcheck> [w] [h] [shots: 1] [wrongFirst: 0]
// plays a whole step in a real browser with right answers (the test paper, the games, the See it scenes and its
// challenge), takes a picture of every screen into shots/play-<stop>-<step>-NN.png and reports page errors.
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const [stop = '1', step = 'practise', w = '390', h = '800', shots = '1', wrongFirst = '0'] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const errs = []; let n = 0;
p.on('pageerror', e => errs.push('pageerror: ' + e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
await p.addInitScript(() => {
  const now = Date.now();
  try {
    localStorage.setItem('g5-maths-trail-players', JSON.stringify({ v: 1, players: [{ id: 'testchild1', name: 'Test Child', cls: '5B01', stars: 0, created: now, last: now }] }));
    sessionStorage.setItem('g5-maths-trail-playing', 'testchild1');
    localStorage.setItem('g5-maths-trail-guide', JSON.stringify({}));
  } catch (e) {}
});
await p.goto('file://' + path.resolve(process.env.DIST || 'dist/index.html'));
await p.waitForTimeout(500);
await p.evaluate(() => { if (T.guide && T.guide.seen) { const s = T.guide.seen; T.guide.point = function () {}; } });
const snap = async (tag) => { if (shots === '1') await p.screenshot({ path: `shots/play-${stop}-${step}-${w}-${String(++n).padStart(2, '0')}${tag ? '-' + tag : ''}.png` }); };
const primary = () => p.locator('.actionbar__primary:not([hidden])').last();
const label = async () => { try { return (await primary().innerText({ timeout: 1500 })).replace(/\s+/g, ' ').trim(); } catch (e) { return ''; } };
const clickPrimary = async () => { await p.waitForTimeout(250); const ok = await p.evaluate(() => { const bs = [...document.querySelectorAll('.actionbar__primary')].filter(x => !x.hidden && x.offsetParent !== null && !x.disabled); if (!bs.length) return false; bs[bs.length - 1].click(); return true; }); if (!ok) throw new Error('no main button to press'); await p.waitForTimeout(450); };
const overflow = async (tag) => { const o = await p.evaluate(() => { const d = document.documentElement; const wide = [...document.querySelectorAll('#app *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1) && !e.closest('.fx-canvas, .guide-layer, [aria-hidden="true"], .hub__scene, .map'); }).slice(0, 3).map(e => e.className + ' ' + Math.round(e.getBoundingClientRect().right)); return wide; }); if (o.length) errs.push('wider than the screen at ' + tag + ': ' + o.join(' | ')); };
// a tool made inside ask() is remembered, so that play can put it in the right state
await p.evaluate(() => { Object.keys(T.tools).forEach(k => { const f = T.tools[k]; if (typeof f !== 'function' || ['pic', 'emitter', 'numpad', 'svgEl'].includes(k)) return; const g = function (host, spec) { const tool = f.apply(this, arguments); if (host && tool && spec && spec.task) window.__tool = tool; if (host && tool && host.classList && host.classList.contains('see-hands__desk')) window.__seeTool = tool; return tool; }; Object.assign(g, f); T.tools[k] = g; }); });
await p.evaluate(x => { location.hash = '#' + x; }, `stop-${stop}-${step}`);
await p.waitForTimeout(900);

// type the values of the answer boxes with the on-screen pad
async function typeBoxes(vals, root) {
  const blanks = p.locator((root || '') + ' .blank');
  for (let i = 0; i < vals.length; i++) {
    await blanks.nth(i).click(); await p.waitForTimeout(40);
    for (const ch of String(vals[i])) { await p.locator('.npad__key[data-k="' + (ch === '−' ? '-' : ch) + '"]').first().click(); await p.waitForTimeout(25); }
  }
}
// answer the question on screen (52-kit-model.js ask) from T.gameKit.current
async function answerAsk(wrong) {
  const t = await p.evaluate(() => { const t = T.gameKit.current; return { type: t.type, fill: t.fill || null, okPick: t.opts ? t.opts.findIndex(o => o.ok) : -1, verdict: t.verdict, right: t.right || null, k: t.ui && t.ui.k, nopts: t.opts ? t.opts.length : 0 }; });
  if (t.right && t.k) await p.evaluate(() => { /* the tool shows the right state: its own solve() */ const t = T.gameKit.current; const root = document.querySelector('.mk'); if (window.__tool && window.__tool.solve) window.__tool.solve(t.right); });
  if (t.type === 'claim') await p.locator('.mk__vd[data-d="' + (t.verdict ? 'correct' : 'incorrect') + '"]').click();
  if (t.okPick >= 0) await p.locator('.mk__opts .choice').nth(wrong ? (t.okPick + 1) % t.nopts : t.okPick).click();
  if (t.fill) await typeBoxes(wrong ? t.fill.map(x => String((parseFloat(x) || 0) + 1)) : t.fill, '.mk');
  await p.waitForTimeout(150);
  return t;
}

async function playAsk(maxQ) {
  for (let q = 0; q < maxQ; q++) {
    if (!(await p.evaluate(() => !!document.querySelector('.mk') && !document.querySelector('.gm-lvcard, .stage__result, .result')))) break;
    await snap('q'); await overflow('question ' + (q + 1));
    if (wrongFirst === '1') { await answerAsk(true); if ((await label()) === 'Check') { await clickPrimary(); await snap('miss'); await p.evaluate(() => { const pad = document.querySelectorAll('.mk .blank'); }); for (let i = 0; i < 12; i++) await p.locator('.npad__key--back').first().click().catch(() => {}); } }
    const t = await answerAsk(false);
    const l = await label();
    if (l !== 'Check') { errs.push('question ' + (q + 1) + ' (' + t.type + '): the main button says "' + l + '", not Check'); }
    if (await primary().isDisabled()) { errs.push('question ' + (q + 1) + ' (' + t.type + '): Check stays off after the right answer'); await snap('stuck'); break; }
    await clickPrimary(); await p.waitForTimeout(350);
    const ok = await p.evaluate(() => !document.querySelector('.mk__worked'));
    if (!ok) { errs.push('question ' + (q + 1) + ' (' + t.type + '): the right answer was not accepted'); await snap('rejected'); }
    await snap('done');
    await clickPrimary(); await p.waitForTimeout(500);
  }
}

if (step === 'practise') {
  const games = await p.evaluate(s => T.packs[s].practise.map(g => g.id), +stop);
  for (let gi = 0; gi < games.length; gi++) {
    await p.evaluate(x => { location.hash = '#' + x; }, `stop-${stop}-practise`); await p.waitForTimeout(700);
    const cards = p.locator('.gm-card, .game-card, [data-game]');
    if (gi > 0 && await cards.count() > gi) { await cards.nth(gi).click(); await p.waitForTimeout(300); }
    await snap('menu');
    await clickPrimary(); await p.waitForTimeout(700);
    for (let guard = 0; guard < 12; guard++) {
      await playAsk(30);
      const l = await label();
      if (await p.evaluate(() => !!document.querySelector('.gm-lvcard'))) { await snap('level'); await clickPrimary(); await p.waitForTimeout(600); continue; }
      await snap('end'); break;
    }
    console.log('game', games[gi], 'ended at:', await label());
  }
} else if (step === 'see') {
  for (let guard = 0; guard < 12; guard++) {
    if (await p.evaluate(() => !!document.querySelector('.mk'))) { await playAsk(30); await snap('end'); break; }
    await snap('scene'); await overflow('see scene');
    // do the steps of a hands-on scene with the tool's own buttons: press the pointed button until Next pulses
    for (let i = 0; i < 40; i++) {
      if (await p.evaluate(() => !!document.querySelector('.actionbar__primary.see-ready'))) break;
      const did = await p.evaluate(() => { const t = window.__seeTool; const b = t && t.tip && t.tip(); if (b && !b.disabled) { b.click(); return true; } return false; });
      await p.waitForTimeout(did ? 500 : 900);
    }
    if (!(await p.evaluate(() => !!document.querySelector('.actionbar__primary.see-ready')))) errs.push('see scene ' + (guard + 1) + ': the steps did not finish with tip() taps');
    await snap('scene-done');
    await clickPrimary(); await p.waitForTimeout(700);
  }
  console.log('see ended at:', await label());
} else if (step === 'test') {
  await snap('paper');
  const res = await p.evaluate(() => ((T.testPaper.current || {}).tasks || []).map(t => ({ type: t.type, fill: t.fill || null, okPick: t.opts ? t.opts.findIndex(o => o.ok) : -1, verdict: t.verdict })));
  console.log('paper questions:', res.map(x => x.type).join(', '));
  const qs = p.locator('.tp-q');
  for (let i = 0; i < res.length; i++) {
    const t = res[i], q = qs.nth(i);
    await q.scrollIntoViewIfNeeded();
    if (t.type === 'claim') await q.locator('.tp-ring[data-d="' + (t.verdict ? 'correct' : 'incorrect') + '"]').click();
    if (t.okPick >= 0) await q.locator('.tp-tick').nth(t.okPick).click();
    if (t.fill) { const bl = q.locator('.blank'); for (let j = 0; j < t.fill.length; j++) { await bl.nth(j).click(); await p.waitForTimeout(60); for (const ch of String(t.fill[j])) { await p.locator('.npad__key[data-k="' + ch + '"]').first().click(); await p.waitForTimeout(25); } } }
    if (i % 3 === 0) { await snap('q' + (i + 1)); await overflow('paper q' + (i + 1)); }
  }
  await p.waitForTimeout(200);
  const pads = p.locator('.tp-pad__done, .npad-done, .tp__done'); if (await pads.count()) await pads.first().click().catch(() => {});
  await snap('filled');
  console.log('main button:', await label());
  await clickPrimary(); await p.waitForTimeout(1500);
  if (/empty|sure|anyway/i.test(await p.locator('body').innerText())) { const l = await label(); }
  await snap('marked');
  const full = await p.evaluate(() => { try { return JSON.stringify(T.store.get(['stops', String(T.packs && location.hash.match(/stop-(\d)/)[1]), 'test'], null)); } catch (e) { return '?'; } });
  console.log('after marking: saved', full, '|', await label());
  if (!/"best":10/.test(full)) errs.push('the paper filled with right answers did not score 10 out of 10: ' + full);
} else {
  for (let i = 0; i < 40; i++) {
    await snap('s'); await overflow(step + ' screen ' + (i + 1));
    const l = await label();
    if (!l) break;
    if (step === 'notes') { const ch = p.locator('.nt-choice, .nt__choice, .nt-opt'); if (await ch.count()) { const ans = await p.evaluate(() => null); await ch.first().click(); await p.waitForTimeout(300); } }
    if (await primary().isDisabled()) break;
    await clickPrimary(); await p.waitForTimeout(500);
    if (/Back to|Finish|Done/i.test(l) && i > 2) break;
  }
}
console.log(errs.length ? errs.length + ' PROBLEMS:\n' + errs.join('\n') : 'no page problems');
await b.close();
