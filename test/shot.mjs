// node test/shot.mjs <hash> <out.png> [w] [h] [setup-js]   - open the built page at a route and take a picture
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import path from 'node:path';
const [hash = 'home', out = 'shots/x.png', w = '390', h = '800', setup = ''] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', e => errs.push('pageerror: ' + e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
await p.goto('file://' + path.resolve(process.env.DIST || 'dist/index.html') + '#' + hash);
await p.waitForTimeout(600);
if (setup) { await p.evaluate(setup); await p.waitForTimeout(900); }
await p.screenshot({ path: out });
console.log(await p.evaluate(() => location.hash + ' | ' + document.querySelector('#app').dataset.route));
if (errs.length) console.log(errs.join('\n'));
await b.close();
