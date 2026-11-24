// node test/shots.mjs <outdir> <w> <h> route1 route2 ...   - sign in as a test child, then picture each route
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const [dir, w, h, ...routes] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', e => errs.push('pageerror: ' + e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
// a saved child on this device, already playing in this tab (both grade prefixes, so the script works on g3 and g5)
await p.addInitScript((CLS) => {
  for (const g of ['g3', 'g5']) {
    const now = Date.now();
    try {
      localStorage.setItem(g + '-maths-trail-players', JSON.stringify({ v: 1, players: [{ id: 'testchild1', name: 'Test Child', cls: CLS || (g[1] + 'B01'), stars: 0, created: now, last: now }] }));
      sessionStorage.setItem(g + '-maths-trail-playing', 'testchild1');
    } catch (e) {}
  }
}, process.env.CLS || '');
await p.goto('file://' + path.resolve(process.env.DIST || 'dist/index.html'));
await p.waitForTimeout(500);
for (const r of routes) {
  await p.evaluate(x => { location.hash = '#' + x; }, r);
  await p.waitForTimeout(1200);
  await p.screenshot({ path: `${dir}/${r.replace(/[^a-z0-9-]/gi, '_')}-${w}.png` });
  console.log(r, '->', await p.evaluate(() => document.querySelector('#app').dataset.route));
}
if (errs.length) console.log(errs.join('\n'));
await b.close();
