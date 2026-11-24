// node test/summit-seeds.mjs - builds the Summit for seeds 1..2000 and checks every paper (nul and fail must be 0)
import { createRequire } from 'node:module'; import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const b = await chromium.launch(); const p = await b.newPage();
p.on('pageerror', e => console.log('pageerror', e.message));
await p.goto('file://' + path.resolve(process.env.DIST || 'dist/index.html')); await p.waitForTimeout(500);
console.log(await p.evaluate(() => {
  let fail = 0, nul = 0; const pos = {}, dok = {}, claims = {}; let minN = 100, maxG = 0, t0 = performance.now();
  for (let s = 1; s <= 2000; s++) {
    const pl = T.summit.plan(T.packs, { seed: s });
    if (!pl) { nul++; continue; }
    if (T.summit.check(pl, T.packs)) fail++;
    pl.papers.forEach(pp => {
      const st = T.summit.stats(pp);
      const k = st.dok[1] + '/' + st.dok[2] + '/' + st.dok[3] + ' m' + st.marks; dok[k] = (dok[k] || 0) + 1;
      pos[pp.findIndex(q => q.dok === 3) + 1] = (pos[pp.findIndex(q => q.dok === 3) + 1] || 0) + 1;
      claims[st.claims] = (claims[st.claims] || 0) + 1;
      minN = Math.min(minN, st.strand.N); maxG = Math.max(maxG, st.strand.G);
      if (pp[0].dok !== 1) fail++;
    });
  }
  return JSON.stringify({ nul, fail, dok, pos, claims, minN, maxG, ms: Math.round((performance.now() - t0) / 2000) });
}));
await b.close();

