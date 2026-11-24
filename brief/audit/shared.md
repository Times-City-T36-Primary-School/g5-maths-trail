# Shared screens + Summit fix list (from the global audit; Stop fixers own src/js/22-pack-stop*, 08-g5-models-s*, 39-g5-tools-*: do NOT touch those)

Files you own: src/js/79-summit-build.js, 79-summit.js, 19-summit-text.js, 26-progress-code.js, 31-howto-text.js, 71-test-paper.js (tag join only), src/css/47-players.css, 49-label.css, other shared CSS, home/start screen JS for item 10.
Already done by me (keep): 52-kit-model.js scroll -> .gm-level.is-scrolled; 60-games.css pill fade.

1. WRONG 79-summit-build.js: marks taken from it.v[0] only. In poolOf work out the marks of every variant set (MX.make on each) and keep only sets whose marks equal set 1's (okSets); plan draws v only from okSets; check re-computes each question's marks from MX.make(item.v[q.v]) instead of trusting q.marks. (Stop 4 item 8 set 3 is 1 mark while sets 1-2 are 2.)
2. WRONG 19-summit-text.js:57 "Paper 1: {n} out of 20." and 79-summit.js:55 total 40 hard-coded: save each paper's max in resume, show "out of {m}", total = sum of maxes.
3. SPEC DOK mix: DOK_RANGE {1:[40,52], 2:[38,48], 3:[10,15]} per paper, cost aimed at 9/9/2 marks per paper. Confirm the pool can supply it (1000+ seeds all valid).
4. SPEC: put the DOK 3 claim at a random position from question 5 to 13 (deterministic from the seed's rng).
5. SPEC: per-paper strand range (Number 65-85, Geometry 10-25 in marks %) in both check and split.
6. SPEC: at most 3 claim-style (pool.claim) items per paper, never two claims next to each other.
7. LAYOUT 47-players.css: at 600-1023px the child's name in the map header is cut ("Li…"): give .who a flex basis so the name shows at least 6ch; let the school line shrink first.
8. LAYOUT: text under 15px at 390: school footer (49-label.css), Vietnamese lines under the start-screen tabs, card sub-lines ("Opens after 7 Mini tests" etc.), the class under the name, the "New!" tag: raise to at least .9375rem (footer may stay smaller only if it would wrap badly; prefer .875rem min there).
9. LAYOUT: at 390 the How to use and My trophies pages show no title: add .howto__head .brand__name, .trophies__head .brand__name to the "show again" rule near 47-players.css:154 in the max-width:599px block.
10. LAYOUT at 390x800: the pointing hand on the start screen covers class button 5B04 -> rest it inside 5B01; Zip on the map covers Stop 1's number marker -> move Zip.
11. LANGUAGE 19-summit-text.js:13 used at 79-summit.js:116: when the Summit is locked show en "The top of the trail. Do 7 Mini tests to open the final test." vi "Đỉnh của hành trình. Làm 7 bài kiểm tra nhỏ để mở bài kiểm tra cuối." (check the real unlock number in code).
12. LANGUAGE 31-howto-text.js:10 "Each step wins up to 3 stars." / "Mỗi bước được tối đa 3 sao."
13. LANGUAGE 19-summit-text.js:60 -> "You got at least half the marks for every stop. Brilliant!" (+ VI).
14. MINOR progress-code dialog: add the line "The Summit Trophy stays on this device." / "Cúp Đỉnh núi chỉ được lưu trên thiết bị này."
15. MINOR 71-test-paper.js T.testPaper.tag: strip the final full stop of each objective before joining (no ".;").
16. MINOR 79-summit-build.js header comments: "[Q, ...14]", "13 Number objectives", "up to 28" (check real numbers).
17. MINOR 79-summit.js:184-185 short test ("One paper only"): store only [codes[0]] in resume.codes and only codes[0] in lastItems; fromCodes must accept a single paper.

Verify: node build.mjs (full build to dist/index.html); a Chromium script over T.summit.plan for seeds 1..2000 checking 14 questions, 20 marks each paper (recomputed from MX.make), DOK and strand ranges, claim position/count, all 18 objectives; node test/summit-play.mjs at 390x800 and 1920x1080 with no page errors (look at the screenshots); shots of the start screen, map (390 and 820x1180), How to use, My trophies. Report what you changed and the numbers.
