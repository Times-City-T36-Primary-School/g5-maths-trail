// node test/collide.mjs - finds names that two Grade 5 stop files both define: question models (MX.M.x), MX helpers,
// tools (T.tools.x), picture kinds, Zip lines (T.G5_DO), and CSS class names. A later file silently replaces an earlier one.
import fs from 'node:fs';
const own = {};                      // name -> [files]
const add = (kind, name, f) => { const k = kind + ' ' + name; (own[k] = own[k] || []).includes(f) || own[k].push(f); };
const js = fs.readdirSync('src/js').filter(f => /^(07|08|39)-g5-|^06-models-v2/.test(f));
for (const f of js) {
  const s = fs.readFileSync('src/js/' + f, 'utf8');
  for (const m of s.matchAll(/\bM\.([A-Za-z0-9_]+)\s*=\s*function/g)) add('model', m[1], f);
  for (const m of s.matchAll(/\bMX\.([A-Za-z0-9_]+)\s*=(?!=)/g)) add('MX', m[1], f);
  for (const m of s.matchAll(/(?:kinds|picKinds|pics)\.([A-Za-z0-9_]+)\s*=(?!=)/g)) add('pic', m[1], f);
  const reg = s.match(/T\.tools\s*=\s*Object\.assign\(T\.tools \|\| \{\}, \{([^}]*)\}/g) || [];
  reg.forEach(r => (r.match(/([A-Za-z0-9_]+)\s*:/g) || []).forEach(x => add('tool', x.replace(/\s*:/, ''), f)));
  for (const m of s.matchAll(/T\.tools\.([A-Za-z0-9_]+)\s*=(?!=)/g)) add('tool', m[1], f);
  const g = s.match(/T\.G5_DO\s*=\s*Object\.assign\(T\.G5_DO \|\| \{\}, \{([\s\S]*?)\}\);/);
  if (g) for (const m of g[1].matchAll(/^\s*([A-Za-z0-9_]+)\s*:/gm)) add('zip', m[1], f);
}
// models defined in the v2 file are fine to share only if a Grade 5 file does not redefine them
const css = fs.readdirSync('src/css').filter(f => /g5/.test(f));
for (const f of css) {
  const s = fs.readFileSync('src/css/' + f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of s.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)) add('class', m[1], f);
}
const shared = new Set(['wb', 'pv__h', 'pv__d', 'pv__v', 'blank', 'blank--cell', 'see-hands__desk', 'npad', 'is-on', 'is-off', 'is-new', 'is-hl', 'is-shake', 'is-locked', 'is-right', 'is-wrong', 'is-good', 'is-bad', 'icon', 'btn', 'mk', 'tp-sheet', 'tp', 'nt-pic', 'art', 'wb--mini', 'wb__cap', 'sl__ctl', 'sl__b', 'choice', 'is-ok', 'is-picked', 'is-done', 'is-live', 'is-still', 'is-dim', 'rule', 'rule__op', 'rule__arrows', 'fr', 'frb', 'frl', 'mk__q', 'mk__card', 'mk__col', 'tl__btn', 'btn--quiet', 'btn__label', 'is-shown', 'is-sel', 'is-active', 'is-fill', 'is-ghost', 'is-mark', 'is-ask', 'pv__dg', 'pics', 'see-hands', 'nt', 'tp-cell', 'tp-q', 'mk__opts', 'is-filled', 'blank--box', 'blank--big', 'blank--mid', 'mk__line', 'mk__lines', 'tp-line', 'tp-lines', 'cbox', 'chain', 'carw', 'see-hands__pic', 'mk--split', 'mk__fb', 'mk__hint', 'mk__worked', 'tp-fix', 'choice__label', 'mk__opt', 'p-o', 'p-t', 'p-h', 'p-te', 'p-hu', 'p-ths', 'p-th', 'wd', 'ar__cap', 'is-pressed', 'is-wide', 'is-narrow', 'tp-tick', 'tp-ticks', 'mk__answer', 'tp-fig', 'see-scene', 'mk__sub', 'stage__body', 'screen', 'is-entering', 'see', 'nt-card', 'nt-ex', 'npad__key', 'is-current', 'is-match', 'is-empty', 'is-big', 'is-small', 'is-open', 'is-hidden', 'is-lit', 'is-sorted', 'is-up', 'is-down', 'is-left', 'is-right-side', 'is-first', 'is-last', 'is-even', 'is-odd']);
let bad = 0;
for (const [k, files] of Object.entries(own)) {
  if (files.length < 2) continue;
  const [kind, name] = k.split(' ');
  if (kind === 'class' && (shared.has(name) || /^is-|^has-/.test(name))) continue;
  const g5 = files.filter(f => /g5/.test(f));
  if (kind === 'model' && g5.length < 2 && files.some(f => /06-models-v2/.test(f))) { console.log('OVERRIDES v2 model:', name, files.join(', ')); bad++; continue; }
  console.log('CLASH ' + kind + ' ' + name + ': ' + files.join(', ')); bad++;
}
console.log(bad ? bad + ' clashes' : 'no clashes');
