// node test/answer.mjs <stop> '<tag>' '<answer JSON>'   - marks one answer to one question variant, as the app would.
//   tag: as in review/stop-N.txt: 'test q7 v1' | 's5a L2 r1 v0' | 'see q3 v2'
//   answer: {"v": ["0.50"]} (boxes, as typed strings)  {"pick": 2} (option index as shown, 0 = first)
//           {"dec": "incorrect", "pick": 1} (a claim)   plus any tool state the question uses
// Prints the question's own text, its options in the order shown, and the app's verdict and feedback.
import { createRequire } from 'node:module'; import path from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');
const [stop, tag, ans = '{}'] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage();
await p.goto('file://' + path.resolve(process.env.DIST || 'dist/index.html')); await p.waitForTimeout(400);
const out = await p.evaluate(({ stop, tag, ans }) => {
  const pk = T.packs[+stop], m = tag.trim().split(/\s+/);
  let def, mode = 'your';
  const vi = +m[m.length - 1].slice(1);
  if (m[0] === 'test') { const it = pk.test.items[+m[1].slice(1) - 1]; def = it.v[vi]; }
  else if (m[0] === 'see') { const rs = pk.see.scenes.find(s => s.challenge).challenge.rounds; const r = rs[+m[1].slice(1) - 1]; def = r.v[vi]; mode = r.mode; }
  else { const g = pk.practise.find(x => x.id === m[0]); const r = g.levels[+m[1].slice(1) - 1].rounds[+m[2].slice(1) - 1]; def = r.v[vi]; mode = r.mode; }
  const t = MX.make(def, mode), a = JSON.parse(ans);
  const plain = h => { const d = document.createElement('div'); d.innerHTML = String(h || '').replace(/<span class="frs">\/<\/span>/g, '/'); return d.textContent.replace(/\s+/g, ' ').trim(); };
  let res; try { res = t.check(Object.assign({}, t.right || {}, a)); } catch (e) { res = { error: e.message }; }
  return { q: plain(t.q) + (t.says ? ' “' + plain(t.says) + '”' : ''), lines: (t.lines || []).map(plain), opts: (t.opts || []).map((o, i) => i + ': ' + plain(o.html) + (o.ok ? '  (*)' : '')), marks: t.marks, verdict: res.ok ? 'RIGHT' : 'WRONG', msg: plain(res.msg || res.note || res.error || '') };
}, { stop, tag, ans });
console.log(JSON.stringify(out, null, 1));
await b.close();
