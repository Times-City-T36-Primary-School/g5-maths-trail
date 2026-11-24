1. `test q1 v0`: MINOR (repeat from practise to test). The test asks the child to write 10/14 in its simplest form, key 5/7. The practise claim `s5a L3 r2 v0` (Giang) already works this exact step out in its key option, feedback, hint and worked answer ("10 and 14 are both even, so they can be divided by 2 again: 10/14 = 5/7"). So the test item is answered in advance.
   Fix: in `src/js/22-pack-stop5.js`, test item 1, change `{"type":"fsimp","n":10,"d":14}` to `{"type":"fsimp","n":16,"d":18}`. That gives Q "Write 16/18 in its simplest form." with key 8/9. Neither 16/18 nor 8/9 appears anywhere else in the stop.
   (If you would rather change the practise claim, change Giang's 20/28 → 10/14 → 5/7 to 28/44 → 14/22 → 7/11. Every reason, hint, worked answer and model line in that variant would then need the same numbers changed.)

No other defects found. What I checked:
- **Arithmetic:** every see, practise and test variant solved again. All 99 Lightning items were re-checked with exact fractions in a script: every key is right, no wrong option is actually right, and every question is 60 characters or fewer.
- **Marking:** I ran `test/answer.mjs` with `DIST=dist/s5/index.html`. Right forms are accepted (including leading zeros such as 05/07). Fractions that are equal but not simplest are rejected, with helpful feedback. Common slips get messages for fopcalc, fopstory, fopmiss, fsimpfix and fopfix. The claims mark correctly.
- **Test structure:** DOK order is 1,1,1,1,1,2,2,2,2,3. 6Nf.03 is tested 5 times and 6Nf.02 5 times. Marks total 12 (2 marks only on q6 and q10, which have two parts). DOK labels, `lo` tags and the DOK 3 claims are sound.
- **Exam overlap:** none against the 28 items. 12/18, 6/8 as a claim, and 3/4 or 5/4 of 8 are all absent.
- **Screens:** I opened every practise, see and test screenshot at 390 px. Figures match the text and nothing is cut off. The claim reasons read well after "because". Words, notes and the Vietnamese are correct.

Solved: about 110 items (all 69 question variants plus the Lightning items). Issues: WRONG ANSWER 0, MISLEADING 0, SPEC 0, EXAM OVERLAP 0, LAYOUT 0, LANGUAGE 0, MINOR 1.