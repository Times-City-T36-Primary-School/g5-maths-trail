// node test/summit-play.mjs [w] [h]  - signs in as a teacher, does the Summit final test (both papers) with right answers,
// then the Big Lightning round and the certificate; pictures into shots/summit-*.png
import { createRequire } from 'node:module'; import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const [w = '390', h = '800'] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = []; p.on('pageerror', e => errs.push('pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
await p.addInitScript(() => { const now = Date.now(); localStorage.setItem('g5-maths-trail-players', JSON.stringify({ v: 1, players: [{ id: 'testteacher1', name: 'Test Teacher', cls: 'Teacher', stars: 0, created: now, last: now }] })); sessionStorage.setItem('g5-maths-trail-playing', 'testteacher1'); });
await p.goto('file://' + path.resolve(process.env.DIST || 'dist/index.html')); await p.waitForTimeout(600);
await p.evaluate(() => { T.guide.point = function () {}; });
let n = 0; const snap = async t => p.screenshot({ path: `shots/summit-${w}-${String(++n).padStart(2, '0')}-${t}.png` });
const click = async () => { await p.waitForTimeout(300); await p.evaluate(() => { const bs = [...document.querySelectorAll('.actionbar__primary')].filter(x => !x.hidden && x.offsetParent && !x.disabled); bs[bs.length - 1].click(); }); await p.waitForTimeout(900); };
const label = async () => p.evaluate(() => { const bs = [...document.querySelectorAll('.actionbar__primary')].filter(x => !x.hidden && x.offsetParent); return bs.length ? bs[bs.length - 1].innerText.replace(/\s+/g, ' ') : ''; });
await p.evaluate(() => { location.hash = '#summit-test'; }); await p.waitForTimeout(1000); await snap('intro');
console.log('intro button:', await label());
await click();
for (let paper = 1; paper <= 2; paper++) {
  await snap('paper' + paper);
  const tasks = await p.evaluate(() => ((T.testPaper.current || {}).tasks || []).map(t => ({ type: t.type, fill: t.fill || null, okPick: t.opts ? t.opts.findIndex(o => o.ok) : -1, verdict: t.verdict, ab: !!t.ab })));
  console.log('paper', paper, tasks.length, 'questions:', tasks.map(t => t.type).join(','));
  const qs = p.locator('.tp-q');
  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i], q = qs.nth(i); await q.scrollIntoViewIfNeeded();
    if (t.type === 'claim') await q.locator('.tp-ring[data-d="' + (t.verdict ? 'correct' : 'incorrect') + '"]').click();
    if (t.okPick >= 0) await q.locator('.tp-tick').nth(t.okPick).click();
    if (t.fill) { const bl = q.locator('.blank'); for (let j = 0; j < t.fill.length; j++) { await bl.nth(j).click(); await p.waitForTimeout(50); for (const ch of String(t.fill[j])) { await p.locator('.npad__key[data-k="' + ch + '"]:visible').first().click(); await p.waitForTimeout(20); } } }
  }
  await snap('filled' + paper);
  console.log('button:', await label()); await click(); await p.waitForTimeout(1500); await snap('marked' + paper);
  console.log('after marking:', await label());
  if (paper === 1) { await click(); await p.waitForTimeout(800); }
}
const ev = await p.evaluate(() => JSON.stringify(T.store.get(['summit'], null)));
console.log('saved summit:', ev.slice(0, 300));
await click(); await p.waitForTimeout(1500); await snap('after');
await p.evaluate(() => { location.hash = '#summit-cert'; }); await p.waitForTimeout(1200); await snap('cert');
await p.evaluate(() => { location.hash = '#summit-lightning'; }); await p.waitForTimeout(1200); await snap('lightning');
console.log(errs.length ? errs.join('\n') : 'no page problems');
await b.close();
