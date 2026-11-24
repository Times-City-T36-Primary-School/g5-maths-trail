# Stop 5 audit fix list

1. MISLEADING: fequiv with hide 0 or 1 (s5r L3 r1 v2, test q5 hint): the figure labels the top bar with the ANSWER (2/3) and puts "?" on the known bar. Build the picture so the known fraction is shown and the "?" bar is the unknown one (e.g. {k:'fbar', n:v[2], d:v[3], to:[v[0], v[1]], ask:true}); fig and hint.pic.
2. SPEC test q10 (DOK 3): v1 (Phong, 6Nf.02) differs from v0/v2 (6Nf.03): lo ["6Nf.03"] and replace v1, e.g. Phong: "A fraction with the denominator 12 can always be simplified." (incorrect: 5/12), reasons/feedback as in a counter-example claim. Check 6Nf.02 is still tested at least twice in the test.
3. SPEC s5a L3 r2: v1 (Tam, 6Nf.02) differs: lo ["6Nf.03"] and replace v1, e.g. Tam: "When you simplify a fraction, the fraction gets smaller." (incorrect: 4/10 = 2/5, same value).
4. SPEC test q5: v0/v1 scale up (3/7 = ?/21) while v2 simplifies: make all three find the simplest/smaller form, e.g. v0 "?/7 = 9/21" (3), v1 "4/? = 24/30" (5), v2 (see 9).
5. WORDS "fraction of an amount": "A part of a number." is false for improper fractions -> "What you get when a fraction acts on a number. 3/4 of 20: divide by 4, multiply by 3: 15. 5/4 of 20 is 25, more than 20."
6. test q6 v1/v2 option "... can be simplified again" feedback when that fraction is already simplest: "Only 1 divides both 2 and 5, so 2/5 cannot be simplified again."
7. NOTES 2: EN "by the same number (not 0)"; VI "nhân cả tử số và mẫu số với cùng một số khác 0, hoặc chia cả hai cho cùng một số khác 0."
8. Test practised in advance (test q6): v0 {n:24,d:32,slip:'part'}, v1 {n:20,d:45,slip:'two'}, v2 {n:15,d:35,slip:'top'} (check each wrong answer is NOT itself simplifiable in a way that makes an option true).
9. Other repeats: test q7 v2 -> a = 5/4 of 28, b = 7/6 of 30 (both 35, equal); test q5 v2 -> "?/9 = 12/27" (4); keep the test DOK 3 claim distinct from all practise claims.
10. s5a L2 r3 v2 step 2: "multiply the number of chocolate muffins by 2 dollars".
11. "The mistake is right." -> "You found the mistake. Now ..." (fsimpfix and fopfix slip messages).
12. s5a L1 r2 v2 asks a different thing and equals a Lightning item: use {type:'fcomf', n:16, d:24, k:8} and change the Lightning item to another pair (18 and 24: 6; not 3 ; 12).
13. TWM: "Which is more?" items TWM.07; story items TWM.02 (not TWM.01).
