1. `LIGHTNING "1 ones and 2 hundredths ="`: LANGUAGE. The prompt says "1 ones". It should be singular, as the stop already does in `s1a L1 r2` and in the WORDS and NOTES. The line is in src/js/22-pack-stop1.js:290.
   Corrected text: `["1 one and 2 hundredths =", ["1.02", "1.2", "1.002"]]`

I solved all 99 questions: 15 See it, 36 practise variants and 30 Mini test variants (every variant), plus 18 Lightning items. I checked every "×/÷ =>" and "The d in n is worth" Lightning line with Decimal arithmetic. Lightning items that are not of those two kinds I solved by hand. All keys, options, feedback, hints and worked answers are correct.

The marking checks with `test/answer.mjs` (DIST=dist/s1/index.html) all came out as expected. These forms are accepted: 1206, 1,206, 1206.0, .04, 0.040, 1000, 4.150, 027.038, 47.00, .39. These common slips are rejected with helpful feedback: 85, 3.65, 0.144, 0.58, 27.38, 30.65, 12.74.

- **Specification:** the `lo` tags match all three variants of each item. 6Np.01 is tested in q1, q2, q5 and q7; 6Np.02 in q3, q4, q6, q8, q9 and q10. The DOK pattern is 1,1,1,1,1,2,2,2,2,3, and the paper totals 12 marks.
- **Exam overlap:** none. P1(11), P2(8), P2(10) and P2(5) test the same skills, but with different numbers and claims.
- **Screens:** I looked at the See it, Practise, Mini test, Notes and Words screenshots (77 files, shots/play-1-*.png). No figure contradicts its text and nothing is cut off or covered.

Totals: 99 questions + 18 Lightning items solved; 1 issue (LANGUAGE 1; WRONG ANSWER 0, MISLEADING 0, SPEC 0, EXAM OVERLAP 0, LAYOUT 0, MINOR 0).