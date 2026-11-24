STOP 6 VERIFICATION AUDIT (dist/s6/index.html, review/stop-6.txt)

All earlier fixes are in. The keys are right in every See it, practise and test variant. All 87 Lightning items are correct; I checked them with exact arithmetic in Python. The test is DOK 1,1,1,1,1,2,2,2,2,3, each objective is tested at least twice, and there are 13 marks. The 28 exam items are not copied. Screens at 390 px look fine (practise, See it, paper), including the compare pad and the pread layout.

Four defects are left:

1. `s6a L2 r1 v2` — MISLEADING. 20 of 25 parts are shaded, and the question asks the percentage NOT shaded, so the key is 20%. A child who just counts the shaded parts and types 20 is marked right for the wrong reason. All 25-part versions with multiples of 5% hit a test answer or a test figure, so use 20 parts:
   - fig `{"k":"pgrid","r":4,"c":5,"shade":5}`
   - Q: "The shape has 20 equal parts. What [[percentage]] of the shape is not shaded?"
   - KEY: 75%
   - WORKED: "15 of the 20 parts are not shaded. 15/20 = 75/100 = 75%."
   - HINT: "15 of the 20 parts are not shaded: 15/20 . 20 × 5 = 100, so multiply the top and the bottom by 5."

2. `test q3 v0/v1/v2` and `s6a L2 r1 v0/v1/v2` (the "number of parts" slip feedback) — LANGUAGE. A child who types the count of parts (for example 7 in `test q3 v0`) gets "That is the number of parts. The shape has 10 parts, not 100…". 7 is not the number of parts, so this is false. Corrected: "That is a number of parts, not a percentage. The shape has 10 parts, not 100. Make the denominator 100." Use 20 or 25 in place of 10 to match each shape.

3. TEST ANSWERS SHOWN ELSEWHERE IN THE STOP (quality: the test is practised in advance). Corrections by tag:
   - `test q2 v2` (1/20 ↔ 5%) is the same pair as `s6a L1 r2 v2` ("5% = 1/20 = 0.05") and `see q2 v1` (shade 5: "5/100 (= 1/20) = 0.05 = 5%").
     - `s6a L1 r2 v2` → "45% = 9/20 = 0.45"; HINT "45% is 45 hundredths."
     - `see q2 v1` → shade 3 (3/100 = 0.03 = 3%).
   - `test q2 v1` (60% ↔ 3/5) is given in NOTES 2 and in `s6a L1 r1 v1` (b) (worked "0.6 = 60/100 = 3/5 = 60%").
     - NOTES 2 example → "9/20 = 45/100 (multiply the top and the bottom by 5) / 45/100 = *45%* = *0.45*".
     - `s6a L1 r1 v1` (b) → "0.3 = {2} %" (key 30; worked "0.3 = 30/100 = 3/10 = 30%"; hint "0.3 is 30 hundredths").
   - `test q8 v1` (0.4 = 2/5) is given in `s6a L1 r2 v0` ("40% = 2/5 = 0.4") and in LIGHTNING "40% as a fraction => 2/5".
     - `s6a L1 r2 v0` → "20% = 1/5 = 0.2" (hint "20% is 20 hundredths").
     - Lightning → "35% as a fraction => 7/20 (not: 7/2 ; 1/35)". Re-run `gen_lightning_s6.py --write`.
   - `test q1 v1` (11/20 = 55%) is given in `see q4 v1` (60% vs 11/20 = 55%). Change the cards to ["60%","9/20"]: key >, worked "9/20 = 45/100 = 45%. 60% is greater than 45%. So 60% > 9/20 ."
   - `test q8 v2` (17/20 = 85%) is given in `see q3 v1` ("0.85 = 85/100 = 17/20"). Change the card to "0.45": worked "0.45 = 45/100 = 9/20 = 45%. The arrow goes to 0.45."
   - `test q3 v0` (7 of 10 = 70%) matches `s6r L1 r1 v2` ("Shade 7/10": 70%). Change it to "Shade 3/10 of the hundred square." Key 30 squares; worked "3/10 = 30/100 = 30%. Shade 30 of the 100 squares: 3 whole columns."; hint "Make the denominator 100: 3/10 = ?/100 ."
   - `test q9 v1` (6/25 = 0.24 = 24%) has the same value as LIGHTNING "12 out of 50 as a percentage => 24%". Replace it with "21 out of 50 as a percentage => 42% (not: 21% ; 50%)".

4. `test q3 v1` vs `test q9 v2` — MINOR. Both test 3/20 = 15%. One sits on paper 2 and the other on paper 3, so a child who sits paper 2 has the paper 3 answer in advance. Change `test q9 v2`:
   - Q: "Hai says: “3/50 is the same as 6%.” Is Hai correct?"
   - Right reason: "3/50 = 6/100 , because 3 × 2 = 6 and 50 × 2 = 100. And 6/100 = 6%."
   - Wrong reasons:
     - "3/50 = 0.3, and 0.3 = 30%." → feedback "3/50 is not 3 tenths. Make the denominator 100: multiply the top and the bottom by 2."
     - "the denominator is 50, so 3/50 = 50%." → keep the current feedback.
   - KEY: correct
   - WORKED: "3/50 = 6/100 (multiply the top and the bottom by 2). 6/100 = 6%."
   - MODEL: "Hai is correct because 3/50 = 6/100 = 6%."
   - HINT: "Make the denominator 100. 50 × 2 = 100, so multiply the top by 2 too."

Solved: 30 test variants, 48 practise variants, 15 See it variants, 7 note checks and 87 Lightning items. Issues: 0 WRONG ANSWER, 1 MISLEADING, 1 LANGUAGE, 2 MINOR/quality (item 3 groups the giveaways). No SPEC, EXAM OVERLAP or LAYOUT issues.