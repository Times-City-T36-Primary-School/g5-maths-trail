# EOS 1 – G5 Maths Revision Trail

A revision trail for Grade 5 (Cambridge Primary Mathematics Stage 6) before the End of Semester 1 test.
Vinschool Times City T36 Primary School – Advanced Program.

## What is in it

- **9 stops**, one for each part of the EOS1 test specification (18 objectives): Decimal Lab, Rounding Reef,
  Sequence Station, Factor Forest, Fraction Bakery, Percent Market, Shape Studio, Circle Circus, Data Stadium.
- Each stop: Words (English and Vietnamese), See it, Practise (Draw it, Solve it), Notes, a Mini Practice test
  (DOK 1,1,1,1,1,2,2,2,2,3), a Lightning round and My self-check.
- **The Summit**: a final test of two papers (14 questions, 20 marks each) drawn from all the stops, the Summit
  Trophy and a certificate.
- Classes 5B01–5B09, a Teacher/TA view, a progress code to move to another device, and a map button on every
  page to go to any stop.

All questions follow the test specification with new numbers and contexts; none is copied from the real papers.

## The app

On the web: https://times-city-t36-primary-school.github.io/g5-maths-trail/ (GitHub Pages, from `index.html`).

`index.html` (the same as `release/g5-maths-trail.html`) is the whole app in one file: open it in a browser, no server needed.

## Building and checking

```bash
node build.mjs                 # all stops -> dist/index.html
node build.mjs --stop 4        # one stop -> dist/s4/index.html
node test/check.mjs            # every variant of every question
node test/dump.mjs             # every question as text in review/, and a scan for anything like the real exam
node test/summit-seeds.mjs     # 2,000 Summit tests, every rule checked
DIST=dist/index.html node test/play.mjs 4 practise 390 800 1   # plays a step, screenshots in shots/
```

Sources are in `src/js` and `src/css`, joined in the order of `src/order.json`. Authoring and review rules are in
`brief/`.
