STOP 4 verification audit (DIST=dist/s4/index.html)

1. `s4a L1 r2 v0/v1/v2`, `see q5 v0/v1/v2` (and `test q4` if its yes-line is shown). Severity: MISLEADING. The Zip reply for a right answer says something false. Built screens read "Great! 40 comes first in the 5 and 8 times tables." and "24 comes first in the 3 and 8 times tables." 40 is not first in the 5 times table (5 is), and 24 is not first in the 3 times table. This line came in with fix 13. Source: `src/js/08-g5-models-s4.js:326`, `yes: L + " comes first in the " + a + " and " + b + " times tables."`. Corrected: `yes: L + " is the first number in both lists.",`, which shows as "40 is the first number in both lists." (7 words).

2. `SEE multiples` scene (pack line 40, `clist` with a: 6, b: 9, upto: 36), `NOTES 4` picture (pack line 181, a: 6, b: 9, upto: 36), and the hint and worked pictures of `s4r L3 r1 v2` (csort a: 6, b: 9, upto: 36). Severity: EXAM OVERLAP. Each one shows the list "Multiples of 6: 6, 12, 18, 24, 30, 36". That is the exam's P1 Q7 sequence 6, 12, 18, 24, 30, which fix A said must not be listed anywhere. You can see it on screen in play-4-see-390-04 and play-4-notes-390-04. Fixes:
   - NOTES 4: change the picture's upto from 36 to 18. The lists become 6, 12, 18 and 9, 18, which still shows that 18 is the lowest common multiple, so the text does not need to change.
   - s4r L3 r1 v2: change the data to `{"type":"csort","kind":"mult","a":4,"b":10,"upto":40,"n":30}` with question "Where does 30 go?". The key stays C: Multiples of 10 only. Worked: "30 is not in the 4 times table. 30 = 3 × 10, so it is a multiple of 10. So 30 goes in C: only in the ring for multiples of 10." Hint: "Ask two questions. Is 30 a multiple of 4? Is 30 a multiple of 10?"
   - SEE multiples: use a: 8, b: 12, upto: 48. The step lines become:
     - step 0: "Count on in eights. Tap *Next multiple of 8* two times." => "8, 16, 24: these are *multiples* of 8." VI: "Đếm cách 8 (mỗi lần thêm 8). Bấm *Next multiple of 8* (Bội số tiếp theo của 8) hai lần." => "8, 16, 24: đây là các *bội số* của 8."
     - step 1: "Now tap *Next multiple of 12*." => "Look! *24* is in *both* lists."
     - step 2: "Tap *24*, the number in both lists." => "24 is a *common multiple* of 8 and 12." VI: "Bấm vào *24*, số có trong cả hai danh sách." => "24 là một *bội chung* của 8 và 12."
     - step 3: "*48* too! *24* is the *lowest common multiple*. Tap *Next*." VI: "Cả *48* nữa! *24* là *bội chung nhỏ nhất*."
     - Rename the buttons to match. until { na: 6 } still fits, because the 8s list runs 8 to 48.

3. `s4a L1 r1 v0/v1/v2` (fmrel) and `LIGHTNING "25 is a ___ of 10"` / `"8 is a ___ of 30"`. Severity: LANGUAGE. The stem "7 is a ______ of 35." does not fit the third option: putting it in the gap gives "6 is a not a factor and not a multiple of 20." In Lightning, "25 is a neither of 10" has the same problem. Corrected stem: "Choose the words that fit. 7 is ______ 35." with options "a factor of" / "a multiple of" / "not a factor or a multiple of". v1: "36 is ______ 9." v2: "6 is ______ 20." Keep the same feedback. Lightning: "25 is ___ 10" with answers "neither a factor nor a multiple of" or, to stay under 60 characters, "Is 25 a factor or a multiple of 10? => neither (not: factor ; multiple)". Do the same for "8 is a ___ of 30".

4. `WORDS multiple` and `WORDS factor pair`. Severity: MINOR. The definitions do not match the card pictures. The multiple card shows hops 0→4→8→12→16, but the definition says "6, 12 and 18 are multiples of 6.", which is also the start of the exam run. The factor pair card shows 12 = 2 × 6, but the definition says "3 and 4 are a factor pair of 12." Corrected definitions:
   - multiple: "A number in the times table of another number. 4, 8, 12 and 16 are multiples of 4."
   - factor pair: "Two numbers that multiply to make a number. 2 and 6 are a factor pair of 12."

5. `s4a L2 r3 v0/v2` (cset, yes-line). Severity: MINOR. "1, 2 and 4 are the factors of both 12 and 28." Source: `08-g5-models-s4.js:421`. Corrected: "1, 2 and 4 are the common factors of 12 and 28." Code: `and(com) + " are the common factors of " + a + " and " + b + "."`

What I checked and found correct:
- All 30 test variants, all 42 practise variants, all 15 See it challenge variants, the 7 note checks and all 101 Lightning items, solved independently. Every key is right.
- Marking with `test/answer.mjs`: test q6 v1 accepts both 105 and 140. fmiss accepts any order. The cfix, claim and story-slip feedback all fires.
- Test structure: DOK order 1,1,1,1,1,2,2,2,2,3 with 12 marks in all. No test pair appears elsewhere in the stop.

Solved about 195 items. Issues: 0 WRONG ANSWER, 1 MISLEADING, 1 EXAM OVERLAP, 1 LANGUAGE, 2 MINOR.
FIX DECISION: apply all 5. Also make sure no list anywhere in the stop (see, notes, hints, worked pictures, words, Lightning) shows 6, 12, 18, 24, 30 in a row (dump.mjs should flag it; extend its regex if it did not).
