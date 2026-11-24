// build.mjs - put the parts of src/ together into one page: dist/index.html
// node build.mjs [--check-g3]   (order of the parts: src/order.json)
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const order = JSON.parse(fs.readFileSync('src/order.json', 'utf8'));
const si = process.argv.indexOf('--stop'), only = si > 0 ? process.argv[si + 1] : null;
const stopOf = f => { const m = /(?:-s|stop|words-|world-)(\d)\.(?:js|css)$/.exec(f); return m && /g5|pack/.test(f) ? m[1] : null; };
const parses = f => { try { execFileSync(process.execPath, ['--check', 'src/js/' + f], { stdio: 'pipe' }); return true; } catch (e) { console.warn('LEFT OUT (does not parse): ' + f + '\n' + String(e.stderr).split('\n').slice(0, 4).join('\n')); return false; } };
if (only) {
  order.css = order.css.filter(f => !stopOf(f) || stopOf(f) === only || stopOf(f) === '1');
  order.js = order.js.filter(f => !stopOf(f) || stopOf(f) === only || stopOf(f) === '1');
}
order.js = order.js.filter(f => !/g5|pack/.test(f) || parses(f));
const read = (d, f) => fs.readFileSync(`src/${d}/${f}`, 'utf8').replace(/\n+$/, '');
const css = order.css.map(f => read('css', f)).join('\n\n\n');
const js = order.js.map(f => read('js', f)).join('\n\n');
if (/<\/style/i.test(css)) throw new Error('css: a closing style tag inside the source would end the block early');
if (/<\/script/i.test(js)) throw new Error('js: a closing script tag inside the source would end the block early');
const title = order.title || 'Maths Revision Trail';
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<style>

${css}

</style>
</head>
<body>
<div id="app"></div>
<script>

${js}
</script>
</body>
</html>
`;
const outDir = only ? 'dist/s' + only : 'dist';
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outDir + '/index.html', html);
console.log(outDir + '/index.html', (html.length / 1024).toFixed(0) + ' KB,', order.css.length, 'css,', order.js.length, 'js');
