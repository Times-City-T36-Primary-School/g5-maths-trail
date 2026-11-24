# Stop 2 fix list (Round, add and subtract decimals)

The original builder was stopped part-way by a usage limit. Its files pass `check.mjs` and play cleanly. Besides the
items below, compare the pack with section 2 of `brief/G5-AUTHORING.md` (what a finished stop contains: counts of
levels, rounds, notes, test items in DOK order 1,1,1,1,1,2,2,2,2,3 with a two-step word problem in items 6-9 and a DOK 3
claim last, at least 60 Lightning items, self-check) and complete anything that is missing. Look at
`shots/rv2-practise.png`, `shots/rv2-see.png`, `shots/rv2-test.png` (phone screenshots) and fix layout problems.
Note: I already changed `drline` 9.36 -> 8.34 (9.36 is an exam number); keep it.

1. test q10 v2 WORKED -> "5.49 rounds down to 5. 5.5 is halfway, so it rounds up to 6. Every number bigger than 5.5 rounds to 6 or more. So the numbers that round to 5 are all less than 5.5." MODEL -> "Hanh is correct because 5.5 rounds up to 6, so a number that rounds to 5 must be less than 5.5."
2. s2a L2 r2 hints: label the parts and do not call a second subtraction "the inverse". v0 -> "(a) Use the inverse: work out 4.55 − 1.9. (b) The missing number is the difference: work out 7.2 − 4.85. Line up the decimal points." v2 -> "(a) Use the inverse: work out 7.78 − 1.7. (b) The missing number is the difference: work out 5 − 3.75. Line up the decimal points." v1: add (a)/(b) labels. Make the model build these hints from the data (whichever side is missing), not by hand.
3. s2a L3 r1 v1 and test q9 v1 keyed option -> "Trang did not write 6.2 as 6.20, so she did not exchange in the hundredths." (same for Kim with "8.5 as 8.50").
4. test q10 v2: feedback of the option "only the number 5.00 rounds to 5" -> "Try 4.87 and 5.32. They round to 5 too."; HINT -> "Round 5.49, then 5.50, then 5.51 to the nearest whole number."
5. s2a L3 r1 v2 and test q9 v2 HINT -> "Set the calculation out again. Line up the decimal points. When the top digit is smaller, exchange. Then compare with Son's working." (Tam's for the other one).
6. NOTES 2: "Look at the next digit" -> "Look at the digit to the right of the place you are rounding to." (and the VI line: "Nhìn chữ số ở bên phải hàng em cần làm tròn đến.").
7. Lightning rounding-range items: one wording for all, e.g. "My 2-decimal-place number rounds to 6.1 (nearest tenth). Smallest it can be?" and the same for Largest; keep them under 60 characters (re-run the generator).
8. see q2 v0-v2: set `"mid":true` (their hints use the halfway number).
