# How to apply a fix list (read first)

You are finishing one stop of the Grade 5 Maths Revision Trail in `/home/user/g5-maths-trail`. Read
`brief/G5-AUTHORING.md` sections 1-4 (rules, files, how to build/check/play). The stop was built by another engineer who
stopped part-way; an independent reviewer then re-solved every question. Your job: apply every item of the fix list
for your stop, in your stop's own files only (`src/js/22-pack-stopN.js`, `src/js/08-g5-models-sN.js`,
`src/js/39-g5-tools-sN.js`, `src/css/39-g5-tools-sN.css`, `tools/gen_lightning_sN.py` and its output). Never edit
other files. Some items may already be done: check the current file and skip those.

Answers that are arithmetic are computed by the models from the data: change the data, not a typed key. Keep exact
arithmetic. After changing a Lightning generator, re-run it and make sure the pack's lightning items match its output.

When done:
```bash
node build.mjs --stop N
DIST=dist/sN/index.html node test/check.mjs N        # must end ALL OK
DIST=dist/sN/index.html node test/play.mjs N practise 390 800 0
DIST=dist/sN/index.html node test/play.mjs N see 390 800 0
DIST=dist/sN/index.html node test/play.mjs N test 390 800 0     # must save best 10
DIST=dist/sN/index.html node test/dump.mjs N         # must say "nothing looks like the exam"; then read review/stop-N.txt
                                                     # around every line you changed and confirm the new keys by hand
```
Do not run `play.mjs` with the wrong-answer-first flag (it is slow). Final message: a short list of what you changed
(by item number) and anything you could not do.
