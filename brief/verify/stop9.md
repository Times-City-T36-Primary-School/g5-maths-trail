I found one remaining problem in Stop 9. Everything else is correct.

1. `test q1 v0`, LANGUAGE (minor). The question sentence is hard for a 10-year-old learning English to follow: "The table shows how many matches a hockey team scores 3, 4, 5, 6 or 7 goals in." The word "in" at the very end makes it unclear what the table is counting. The frequencies add up to 20, so this rewording fits the data. Corrected text: "A hockey team plays 20 matches. The table shows how many matches the team scores 3, 4, 5, 6 or 7 goals in." would still end in "in", so use this instead: "A hockey team plays 20 matches. The table shows the number of goals the team scores in each match. What is the mode?" The key (5), the worked answer and the feedback stay as they are.

What I checked:
- **Arithmetic:** I solved every item myself. That covers 15 See-it items (5 questions × 3 variants), 18 Draw-it items, 24 Solve-it items, 30 test items, the 7 note checks, the note and word examples, and all 80 Lightning items, which I checked with a script using exact fractions. Every key and every worked answer is right.
- **Wrong options and feedback:** every wrong option is a real slip (the total, the median, the largest value, or the frequency instead of the value). No wrong option is also correct, and all the feedback is true.
- **Claims:** the counter-examples in `s9a L3 r2` v0–v2 and `test q10` v0–v2 are all valid.
- **Marking with `test/answer.mjs` (DIST=dist/s9/index.html):** 12.5 and 12.50 are accepted, and so are 10.5 / 10.50, 27.0, 05 and 4.5. Common wrong answers get feedback that helps the child fix the slip. This includes 11 for the 10.5 median, the total typed as the mean, the mean typed as the missing value, and Hung's own wrong answer. The two-part items (`q7`, `q9`) and the claim items (`q10`) mark correctly.
- **Specification:** the Mini test DOK order is 1,1,1,1,1,2,2,2,2,3 and every label is right. The paper is worth 16 marks: 4 marks on `q5` for 4 parts, and 2 marks on each two-part item. The only objective is 6Ss.03 and it is tested on every item.
- **Exam overlap:** nothing copies the real paper's oranges (60, 90, 70, 100 g) or library visits (4, 8, 6, 10, 6, 14) items.
- **Names, pronouns and Vietnamese:** names and pronouns are consistent across the stop, and the Vietnamese terms match the list in the brief.
- **Screens:** the See-it, Practise, Test, Notes and Words runs all ended with "no page problems". The figures match their data: cards 6, 3, 8, 3, 5, 9, 1 give median 5, mode 3 and range 8, and the towers total 16 (mean 4) and 12 (mean 3). Nothing is cut off.

Summary: 174 items solved; 0 WRONG ANSWER, 0 MISLEADING, 0 SPEC, 0 EXAM OVERLAP, 0 LAYOUT, 1 LANGUAGE (minor).
FIX DECISION: use this question text instead of the reviewer's: "The table shows the goals a hockey team scores in 20 matches. What is the mode?" (check the table headings still read clearly with it).
