// node test/art.mjs <out.png> <id-prefix or ids...>   - a contact sheet of drawings from window.T_ART (dist page in DIST)
// e.g. node test/art.mjs shots/art-w3.png w-sequence w-term   |   node test/art.mjs shots/badges.png badge-
//      NIGHT=1 adds the night class for world scenes; CELL=400 sets the cell width
import { createRequire } from 'node:module';
import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const [out, ...ids] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1300, height: 900 }, deviceScaleFactor: 1 });
const errs = [];
p.on('pageerror', e => errs.push('pageerror: ' + e.message));
await p.goto('file://' + path.resolve(process.env.DIST || 'dist/index.html'));
await p.waitForTimeout(400);
const n = await p.evaluate(({ ids, night, cell }) => {
  const all = Object.keys(window.T_ART), list = [];
  ids.forEach(x => all.filter(k => k === x || (x.endsWith('-') && k.indexOf(x) === 0)).forEach(k => list.push(k)));
  ids.filter(x => !x.endsWith('-') && !all.includes(x)).forEach(x => list.push(x));
  document.body.innerHTML = ''; document.body.style.cssText = 'margin:0;padding:12px;background:#E9F0F7;display:flex;flex-wrap:wrap;gap:12px;overflow:auto;height:auto';
  document.documentElement.style.cssText = 'overflow:auto;height:auto';
  list.forEach(id => {
    const box = document.createElement('div'); box.style.cssText = 'width:' + cell + 'px;background:#F7FBFF;border:1px solid #B8C8DB;border-radius:10px;padding:6px;font:12px sans-serif';
    const art = T.ui.art(id, {}); if (night) art.classList.add(id + '-night'); art.style.cssText = 'display:block;width:100%;height:auto';
    box.appendChild(art); const cap = document.createElement('div'); cap.textContent = id + ' — ' + (art.getAttribute('aria-label') || ''); box.appendChild(cap);
    document.body.appendChild(box);
  });
  return list.length;
}, { ids, night: !!process.env.NIGHT, cell: +(process.env.CELL || 300) });
await p.waitForTimeout(300);
await p.screenshot({ path: out, fullPage: true });
console.log(n + ' drawings -> ' + out); if (errs.length) console.log(errs.join('\n'));
await b.close();
