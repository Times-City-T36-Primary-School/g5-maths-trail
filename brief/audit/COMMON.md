# Applying an audit fix list (read first)

You are finishing one stop of the Grade 5 Maths Revision Trail in `/home/user/g5-maths-trail` for release tomorrow.
Read `brief/G5-AUTHORING.md` sections 1-4 (rules, files, build/check/play) and `brief/AUDIT.md` (the audit standard).
Apply every item of your stop's fix list in that stop's own files only (`src/js/22-pack-stopN.js`,
`src/js/08-g5-models-sN.js`, `src/js/39-g5-tools-sN.js`, `src/css/39-g5-tools-sN.css`, `tools/gen_lightning_sN.py` and
its output). Never edit other files (shared engine files: report what you need). Where the list suggests numbers or
wording, you may choose better ones, but each change must stay correct, aligned to the objective and the DOK, different
from the 28 exam items (section 6 of the authoring brief), and not repeat numbers used elsewhere in the stop's test.

What a child can type: the on-screen pad has digits, a decimal point (only where the box allows decimals, at most 3
places), a minus sign (only where allowed) and < > = (only in a sign box). A physical keyboard's comma becomes a decimal
point. No letters, no "/" and no "%" can be typed: units and % signs are printed beside the box. So audit points about
typed units, typed fractions with "/", decimal commas or 4+ decimal places cannot happen; skip them.

Answers that are computed are worked out by the models from the data: change the data or the model, never a typed key.
When a test item's variants must test the same objective, change the variant that differs, and fix the `lo` tag.
The Mini test must stay DOK 1,1,1,1,1,2,2,2,2,3, and every stop objective must be tested at least twice.

When done:
```bash
node build.mjs --stop N
DIST=dist/sN/index.html node test/check.mjs N        # must end ALL OK
DIST=dist/sN/index.html node test/play.mjs N practise 390 800 1
DIST=dist/sN/index.html node test/play.mjs N see 390 800 1
DIST=dist/sN/index.html node test/play.mjs N test 390 800 1     # must save best 10
DIST=dist/sN/index.html node test/dump.mjs N         # must say "nothing looks like the exam"
DIST=dist/sN/index.html node test/answer.mjs N '<tag>' '<answer JSON>'   # to test any answer you changed
```
Open the screenshots of every question you changed (shots/play-N-*-390-*.png) and check them. Re-solve every changed
key by hand. Final message: what you changed by item number, and anything you could not do (with the reason).
