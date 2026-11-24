# Stop 3 fix list (Sequences and term rules)

A. Exam overlap: the exam's P1(1) is the square sequence 4, 9, 16, 25 (find the 7th term). The claim of Phong (test q10
   v1) lists "1, 4, 9, 16, 25, ..." and a model hint (`08-g5-models-s3.js` ~line 331) writes "1, 4, 9, 16, 25 ...". Shorten
   both to "1, 4, 9, 16, ..." so the run 4, 9, 16, 25 never appears; grep the dump for "4, 9, 16, 25" after.
1. SEE IT scene "rule" step 1: EN "Every term is *2 more* than position × 3. Now add 2." (keep at most 12 words; shorten if
   needed); VI "Mỗi số hạng *lớn hơn* vị trí × 3 *2 đơn vị*. Bây giờ cộng thêm 2."
2. NOTES 7 second example -> "2, 5, 10, 17 ... Each term is 1 more than a square number. 9th term: 9 × 9 + 1 = *82*."
3. s3r L3 r2 v0: positions [1,2,3,4,6] instead of ending at 9 (exam P2(6) asks position 9 in a table); key 16 ; 36.
   Check no other table item in the stop asks for position 9 with a ×4 rule.
4. Mini test: one variant must be a fraction sequence, e.g. test q1 v1: 2 3/4, 2 1/4, 1 3/4, 1 1/4, {0} -> 3/4 (subtract 1/2).
5. Lightning "4, 7, 12, 19, ... The 8th term is" -> "... The 9th term is" (84; not 81 ; 74). 
6. Lightning "9, 16, 25, 36, ... The 8th term is" -> remove it (it also contains the exam run 9, 16, 25) and use e.g.
   "2, 5, 10, 17, ... The 7th term is" (50; not 49 ; 26). Re-run the generator.
7. test q4: v1 -> "1, 4, 9, 16, ... Which position is the term 121?" (11) or another clearly different square-sequence item;
   no 4, 9, 16, 25.
8. test q10 v1 keyed reason -> "the steps are 3, 5, 7, 9 ... Each step adds two positions next to each other (16 − 9 = 3 + 4). One of two numbers next to each other is odd, so the step is always odd." (keep it short and clear for a 10-year-old).
9. test q9 v0 repeats see q4 v1 (3, 8, 13, 18): change test q9 v0 to 2, 7, 12, 17 (20th term 98). test q3 v0 (7, 14, 21, 28) repeats s3r L3 r1 v0: change test q3 v0 to another multiple sequence, e.g. 8, 16, 24, 32.
10. NOTES 1 VI: "Chỗ đứng của số hạng" -> "Thứ tự của số hạng trong dãy là vị trí của nó."
11. Write fractions as 1/2, 1/4, 3/4, 1 1/4, 1 3/4 (not ½ ¼ ¾ glyphs) in the See it lines, and NOTES 4 "That is 2 1/4."
