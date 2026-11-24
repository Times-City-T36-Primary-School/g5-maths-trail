// node test/dump.mjs [stop ...]  - every question of the stops as plain text with its answer key (for a human or a second
// solver to check), written to review/stop-N.txt; and a scan for anything that looks like the real exam (EXAM below).
import { createRequire } from 'node:module';
import path from 'node:path';
import fs from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');
const want = process.argv.slice(2).map(Number).filter(Boolean);
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('file://' + path.resolve(process.env.DIST || 'dist/index.html'));
await p.waitForTimeout(400);
const out = await p.evaluate((want) => {
  const plain = h => { const d = document.createElement('div'); d.innerHTML = String(h || '').replace(/<span class="frs">\/<\/span>/g, '/').replace(/<\/i><span class="frl">/g, '').replace(/<br\s*\/?>/g, ' '); d.querySelectorAll('.fr').forEach(f => { f.textContent = ' ' + f.textContent.trim() + ' '; }); return d.textContent.replace(/\s+/g, ' ').trim(); };
  const res = {};
  (want.length ? want : Object.keys(T.packs).map(Number)).forEach(n => {
    const pk = T.packs[n]; if (!pk || !pk.practise) return;
    const L = [];
    const one = (def, mode, tag) => {
      let t; try { t = MX.make(def, mode); } catch (e) { L.push(tag + ' !! does not build: ' + e.message); return; }
      L.push(tag + ' [' + t.type + ']');
      L.push('   Q: ' + plain(t.q) + (t.says ? ' “' + plain(t.says) + '” ' + plain(t.ask) : '') + (t.sum ? ' | ' + plain(t.sum) : '') + (t.fig ? ' {fig ' + JSON.stringify(t.fig).slice(0, 160) + '}' : '') + (t.ui && t.ui.k ? ' {tool ' + JSON.stringify(t.ui).slice(0, 160) + '}' : ''));
      (t.lines || []).forEach(l => L.push('   L: ' + plain(l)));
      (t.opts || []).forEach((o, i) => L.push('   ' + (o.ok ? '(*)' : '( )') + ' ' + plain(o.html) + (o.fig ? ' {fig ' + JSON.stringify(o.fig).slice(0, 100) + '}' : '') + (o.ok ? '' : '   -> ' + plain(o.why))));
      L.push('   KEY: ' + plain(t.key) + (t.type === 'claim' ? '' : '') + '   WORKED: ' + plain(t.worked && t.worked.text) + (t.worked && t.worked.model ? ' MODEL: ' + plain(t.worked.model) : ''));
      if (t.hint && t.hint.step) L.push('   HINT: ' + plain(t.hint.step));
    };
    L.push('===== STOP ' + n + ': ' + pk.title + ' =====');
    L.push('--- WORDS'); pk.words.sets.forEach(s => s.keys.forEach(k => L.push('   ' + k + ' = ' + pk.words.items[k].def + ' | VI: ' + pk.words.items[k].vi)));
    L.push('--- SEE IT'); pk.see.scenes.forEach(s => { if (s.challenge) s.challenge.rounds.forEach((r, i) => r.v.forEach((d, j) => one(d, r.mode, 'see q' + (i + 1) + ' v' + j))); else (s.steps || []).forEach((st, i) => L.push('   ' + s.id + ' ' + i + ': ' + st.zip.en + ' => ' + st.then.en + ' | VI: ' + st.zip.vi + ' => ' + st.then.vi)); });
    pk.practise.forEach(g => { L.push('--- PRACTISE ' + g.id + ' ' + g.title); g.levels.forEach((l, li) => l.rounds.forEach((r, i) => r.v.forEach((d, j) => one(d, r.mode, g.id + ' L' + (li + 1) + ' r' + (i + 1) + ' v' + j + ' ' + r.lo.join(',') + ' ' + r.twm.join(','))))); });
    L.push('--- NOTES'); pk.notes.items.forEach((it, i) => L.push('   ' + (i + 1) + '. ' + it.en + ' | EX: ' + [].concat(it.example || []).join(' / ') + ' | VI: ' + it.vi)); pk.notes.check.forEach((c, i) => L.push('   check ' + (i + 1) + ': ' + c.sentence + ' => ' + c.answer));
    L.push('--- TEST'); pk.test.items.forEach((x, i) => x.v.forEach((d, j) => one(d, 'your', 'test q' + (i + 1) + ' v' + j + ' DOK' + x.dok + ' ' + x.lo.join(',') + ' ' + x.twm.join(','))));
    L.push('--- LIGHTNING'); pk.lightning.items.forEach(x => L.push('   ' + x[0] + ' => ' + x[1][0] + '   (not: ' + x[1].slice(1).join(' ; ') + ')'));
    L.push('--- SELF-CHECK'); pk.selfcheck.goals.forEach((g, i) => L.push('   I can ' + g + ' [' + pk.selfcheck.again[i] + ']'));
    res[n] = L.join('\n');
  });
  return res;
}, want);
await b.close();
// the fingerprints of the 28 EOS1 items: number sets, names and claim wordings that must not appear in the trail
const EXAM = [/4, ?9, ?16, ?25/, /\b9, ?16, ?25\b/, /diameter of 8 ?cm|8 cm.*centre A/i, /5\/8.*3\/4|3\/4.*5\/8/, /0\.7.{0,12}65 ?%|65 ?%.{0,12}0\.7/, /only common multiple/i, /\b60\b.{0,6}\b90\b.{0,6}\b70\b.{0,6}\b100\b/, /orange/i, /6, ?12, ?18, ?24, ?30/, /\b12\/18\b|12 ?\/ ?18/, /4 right angles must/i, /6\.38|7\.62|7\.81/, /\b9\.36\b/, /5, ?11, ?17, ?23/, /0\.63/, /\b65 ?%.{0,40}3\/5|3\/5.{0,40}65 ?%/, /\b42\b.{0,12}\b56\b/, /radius.{0,12}6 ?cm.{0,60}3 ?cm/i, /4\.6, ?3\.8/, /just add a zero/i, /\b84\.6\b/, /library/i, /4, ?8, ?6, ?10, ?6, ?14/, /35\.724/, /0\.65.{0,20}60 ?%.{0,20}0\.5/, /\b6\/8\b.{0,40}simplest/i, /rounds? to 6\.9\b/, /80 cents|25 ?% less/i, /\b8 ?km\b/, /\b(Nam|Lan|Tuan|Mai|Bao|Bảo|Anh|Nhi|Vy|Khoa|Quan)\b (says|is correct|is incorrect)/];
fs.mkdirSync('review', { recursive: true });
let hits = 0;
for (const n of Object.keys(out)) {
  fs.writeFileSync('review/stop-' + n + '.txt', out[n] + '\n');
  out[n].split('\n').forEach((line, i) => EXAM.forEach(re => { if (re.test(line)) { hits++; console.log('EXAM-LIKE stop ' + n + ' line ' + (i + 1) + ' ' + re + ': ' + line.slice(0, 150)); } }));
  console.log('review/stop-' + n + '.txt', out[n].split('\n').length, 'lines');
}
console.log(hits ? hits + ' lines look like the exam' : 'nothing looks like the exam');

// pictures are not in the text above: list every multiples list a picture or hint can draw (clist/csort/venn of
// multiples, the packs story's hint lists) and look for the exam's run 6, 12, 18, 24, 30
{
  const gcd = (x, y) => y ? gcd(y, x % y) : x;
  let pics = 0;
  for (let n = 1; n <= 9; n++) {
    const f = 'src/js/22-pack-stop' + n + '.js';
    if (!fs.existsSync(f)) continue;
    const src = fs.readFileSync(f, 'utf8');
    for (const m of src.matchAll(/\{[^{}]*"(?:kind|k)":"(?:mult|packs|clist|csort|venn)"[^{}]*\}|\{[^{}]*"kind":"mult"[^{}]*\}/g)) {
      const o = m[0];
      if (!/"(?:kind)":"(?:mult|packs)"/.test(o)) continue;
      const a = +((o.match(/"a":(\d+)/) || [])[1] || 0), b = +((o.match(/"b":(\d+)/) || [])[1] || 0);
      const upto = +((o.match(/"upto":(\d+)/) || [])[1] || (a && b ? a * b / gcd(a, b) : 0));
      for (const x of [a, b]) if (x === 6 && upto >= 30) { pics++; console.log('EXAM-LIKE stop ' + n + ' picture lists 6, 12, 18, 24, 30: ' + o.slice(0, 120)); }
    }
  }
  if (pics) { console.log(pics + ' pictures look like the exam'); process.exitCode = 1; } else console.log('no picture lists the exam run');
}
