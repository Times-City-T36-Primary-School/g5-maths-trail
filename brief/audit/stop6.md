# Stop 6 audit fix list (the pread layout under the pad on phones is fixed in the shared engine: still check it)

1. SPEC test q3 v2: 8 of 25 = 32% is not a multiple of 5% (6Nf.07 shapes): use 20 of 25 = 80% (or another multiple of 5% not used elsewhere).
2. SPEC test q5 is labelled DOK 1 but each part converts then compares (DOK 2): make q5 a one-step DOK 1 item in all variants (e.g. 6Nf.07 "5% of 80 =", "1% of 600 =", "20% of 45 ="), keep 6Nf.08 tested by q6, q8, q10 and every objective at least twice; fix lo tags.
3. SPEC Lightning "12% of a shape is shaded. Not shaded:" -> use multiples of 5% only (e.g. 35% -> 65%); re-run the generator with --write.
5. s6r L2 r2 v1 (75% of 40): the slip 10 (= 25%) needs its own feedback: "That is 25% of 40 (one quarter). 75% is 3 quarters: 3 × 10." (in ofSlip for any 75% item).
6. Test practised in advance: test q7 v0 (15% of 40) = s6a L2 r3 v1: use n 60, p 45 ($33). Replace the Lightning items that give away test answers ("4/5 as a percentage", "3/25 as a percentage", "0.08 as a percentage", "60% as a fraction", "1/20 as a percentage", "5% as a fraction", "Which is greater: 3/4 or 70%?", "9/10 or 0.85", "1/2 or 45%", "1/4 or 0.3") with other numbers; s6a L1 r1 v2 (3/20 = 15%) = test q9 v2: change one. No test answer may appear anywhere else in the stop.
7. EXAM OVERLAP test q5 v1 copies P1(3)'s layout (3/4 vs a fraction, 0.x vs a percentage 5 below): change the numbers and structure (item 2 will replace it anyway).
8. pshade done line: "4 of the 10 parts are 40% of the shape." (are when more than 1).
9. Mixed compare hint: "(a) Give both fractions the same denominator. (b) Change both numbers into percentages. The open side of the sign points to the greater number." (match each item's parts).
10. pcmp feedback when the answer is "=": end with "So write =." (no "greater number").
12. Lightning distractors must be real slips (3/4 -> 34% or 75% vs 30%? use digits side by side 34%, 43%; 1/2 -> 12%; 40% as a fraction -> 4/100 or 40/10? use 4/100 and 1/40; "25% off $40" -> $10 (the discount) and $65; "40% of 25" -> 15 and 4; "10% of 50" -> 500 and 0.5). Re-run the generator.
