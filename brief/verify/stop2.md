I found no WRONG ANSWER, MISLEADING, SPEC, EXAM OVERLAP, LAYOUT, LANGUAGE or Vietnamese defects in this round. The only issues left are four MINOR cases where a test item repeats numbers from See it, Practise or Lightning, so the child meets the test in advance. All of them are practise-to-test repeats, none is practise-to-practise only.

1. `test q1 v0` (MINOR, repeat). "Round 3.72 to the nearest whole number" is the same task as `see q1 v0` "Round 4.72 to the nearest whole number": the same .72 decimal and the same skill.
   Change the number to 7.68, key 8.
   - Q: "Round 7.68 to the [[nearest]] [[whole number]]."
   - WORKED: "7.68 is between 7 and 8. The tenths digit is 6. 6 is 5 or more, so round up: 8."
   - HINT: "To round to the nearest whole number, look at the tenths digit of 7.68. 5 or more rounds up."

2. `test q3 v0` (MINOR, repeat). "Which number rounds to 4.6" uses the same target as `s2r L1 r2 v0` "Put a ring around all the numbers that round to 4.6". Its options (4.57, 4.51, 4.66, 4.67) are close to the practise numbers (4.58, 4.54, 4.65, 4.61).
   Change the target to 3.8.
   - Options: 3.87 / 3.71 / (*) 3.77 / 3.86
   - Feedback: "3.87 rounds to 3.9: its hundredths digit is 7." / "3.71 rounds to 3.7: its hundredths digit is 1." / "3.86 rounds to 3.9: its hundredths digit is 6."
   - WORKED: "3.77 rounds to 3.8 ✓. 3.87 rounds to 3.9. 3.71 rounds to 3.7. 3.86 rounds to 3.9."

3. `test q7 v1` (MINOR, repeat). "8.1 − 3.64" uses the same subtrahend as `s2r L3 r1 v1` "9.1 − 3.64", and the same exchange pattern. Its answer, 4.46, is also a Lightning answer ("7.6 − 3.14 => 4.46").
   Change it to 8.1 − 3.67, key 8 ; 4 ; 4 ; 4.43.
   - Q: "[[Estimate|estimate]] 8.1 − 3.67 first. Then calculate."
   - WORKED: "8.1 is about 8 and 3.67 is about 4. Estimate: 8 − 4 = 4. Exact: 8.1 − 3.67 = 4.43. It is close to 4, so it looks right."

4. `test q4 v0` (MINOR, repeat). "4.35 + 2.8" is almost the same as `s2a L2 r1 v0 (a)` "3.45 + 2.8": the same 2.8, the same digits in a different order, and the same carry from the tenths.
   Change it to 5.26 + 2.9, key 8.16.
   - Line: "5.26 + 2.9 = {0}"
   - WORKED: "5.26 + 2.9 = 8.16. Hundredths: 6 + 0 = 6. Tenths: 2 + 9 = 11. Write 1 and carry 1. Ones: 5 + 2 + 1 = 8."

**What I checked:**
- **Answers:** I solved all 87 question variants (See it 15, Draw it 18, Solve it 24, test 30), all 75 Lightning items, the 6 notes checks and the worked examples in the notes and words. Every key, figure, feedback line, hint and worked answer is correct.
- **Wrong-working figures:** Duc 2.49, Trang 2.88, Son 3.43, Yen 1.61, Tam 3.34, Hai 1.79 and Kim 6.26 each match the slip they describe.
- **Marking (test/answer.mjs):** it accepts trailing zeros (10.70, 7.150, 8.70, 2.660). It rejects the common slips with helpful feedback. Claims mark correct/incorrect plus the reason properly.
- **Mini test:** DOK order is 1,1,1,1,1,2,2,2,2,3. 6Np.04 is tested in q1, q2, q3, q6 and q10; 6Nf.09 in q4, q5, q7, q8 and q9. Marks total 13.
- **App check:** `test/check.mjs 2` reports ALL OK.
- **Screens:** I viewed the See it, Practise, test and notes screenshots at 390 px. Nothing is cut off and the number lines are placed correctly.
- **Exam overlap:** none found.

Total: 87 variants + 75 Lightning + 6 checks solved. Issues: WRONG ANSWER 0, MISLEADING 0, SPEC 0, EXAM OVERLAP 0, LAYOUT 0, LANGUAGE 0, MINOR 4.