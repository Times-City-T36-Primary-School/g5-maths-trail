# Stop 7 fix list (Quadrilaterals and rotational symmetry)

Root cause of most items: the course uses INCLUSIVE definitions (a square is a rectangle, a rhombus and a kite; a
rectangle and a rhombus are parallelograms), but some items answer from one "usual drawing". Every question, option,
feedback, note and Lightning item must be true for EVERY shape the name covers, or must name the shape exactly ("a
rhombus that is not a square", "a parallelogram with no right angles and 2 long and 2 short sides"). After the fixes,
go through the whole dump once more with that rule and fix anything else you find. Also fix the Lightning GENERATOR so it
cannot produce such items again (re-run it and update the pack).

WRONG ANSWERS
1. Lightning "Lines of symmetry: a parallelogram" (key 0): replace with "Lines of symmetry: the letter N" (0; not 1 ; 2) or delete.
2. Lightning "Lines of symmetry + order: a parallelogram" (key 2): replace with "Lines of symmetry + order: the letter H" (4; not 2 ; 6).
3. Lightning "A shape fits after every 180° turn. Its order is" (2, but order 4 also fits): -> "Fits after 180° but not after 90°. Its order is" (2; not 3 ; 4).
4. s7a L1 r2 v0 (clues: 2 pairs of parallel sides, 4 right angles, 2 pairs of opposite equal sides -> Rectangle): a square fits too. Change the third clue to "I have 2 lines of symmetry." or "My 4 sides are not all the same length."

MISLEADING
5. Lightning: "Order of rotational symmetry: a rhombus that is not a square"; "Lines of symmetry: a rectangle that is not a square"; "Lines of symmetry: a rhombus that is not a square"; "Order: a parallelogram that is not a rectangle" (2).
6. NOTES 5 example, NOTES check 5, s7a L3 r2 v1 (why/hint/model), test q10 v1 (worked/model/hint): "A parallelogram that leans has no line of symmetry" is not always true (a leaning rhombus has 2) and "leans" is hard ESL. Use "A parallelogram with 2 long sides, 2 short sides and no right angles has *no* line of symmetry." Check 5 -> "A parallelogram with 2 long sides, 2 short sides and no right angles has {0|2|4} lines of symmetry."
7. s7a L3 r2 v1 worked: "Only rectangles have equal diagonals." is false (isosceles trapezium) -> "Only parallelograms with 4 right angles (rectangles) have equal diagonals."
8. s7a L3 r2 v0, feedback of "every rectangle has 4 equal sides": "Only a square has 4 equal sides." is false (rhombus) -> "The only rectangle with 4 equal sides is a square."
9. Kites: NOTES 3 example -> "A kite (not a rhombus): *no* parallel sides and *1* line of symmetry"; Lightning "Pairs of parallel sides in a kite that is not a rhombus", "Lines of symmetry: a kite that is not a rhombus"; s7r L3 r2 v2 -> "...2 pairs of equal sides, next to each other. Its 4 sides are not all equal."
10. Feedback that quotes a clue the question never gave (make each feedback refer only to clues in the question, ideally generated from the clue list):
    s7a L1 r2 v2 Rhombus -> "A rhombus has 2 lines of symmetry. The shape in the clues has no line of symmetry."; Kite -> "A kite has no parallel sides. The shape in the clues has 2 pairs of parallel sides."
    test q5 v1 Kite -> "A kite has no parallel sides. ..."; Rhombus -> "A rhombus has 2 pairs of parallel sides. The shape in the clues has exactly one pair of parallel sides."
    test q5 v2 Square -> "A square has 4 lines of symmetry. The shape in the clues has 2 lines of symmetry."
    s7a L1 r2 v1 Rhombus -> "A rhombus has 2 pairs of parallel sides. The shape in the clues has no parallel sides."
11. test q6 v2 feedback A -> "Shape A has 2 pairs of parallel sides."; B -> "Shape B has 2 pairs of parallel sides."

EXAM OVERLAP
12. s7a L3 r1 v0 and test q10 v0: "Every quadrilateral with 4 equal sides is a square" is the converse of exam P1(9) ("4 right angles must have 4 equal sides"). Change BOTH to other claims: e.g. test q10 v0 "A quadrilateral with 2 pairs of parallel sides always has rotational symmetry of order 2." (incorrect: a square has order 4); and a different claim for s7a L3 r1 v0 (e.g. "A shape with 2 lines of symmetry always has 2 pairs of equal sides." -> incorrect? check it yourself with the shapes table before using; or "Every kite has exactly 1 line of symmetry." -> incorrect: a rhombus is a kite with 2). Make sure the test claim is not the same as any practise claim.

LANGUAGE
13. Worked answers built from property lists: the comma before "next to / opposite each other" is ambiguous. Make the generator write separate short sentences: "It has no parallel sides. It has no right angles. It has 2 pairs of equal sides next to each other."
14. s7a L3 r2 v1 worked: "one diagonal joins the two far corners..." -> "In a parallelogram like this, one diagonal is long and the other is short. They are not equal."

MINOR
15. Variety: see q4 v2 and s7r L1 r2 v0 are the same (same six shapes, property, answer); s7r L2 r1 v1 = see q1 v0; test q3 v0/v1/v2 reuse the challenge shapes (rhombusl, tri, leth) -> use unused shapes (e.g. recttall, quad, letz, star4); the parallelogram-completion dot items (see q3 v0, the make scene step 2, s7r L3 r1 v1) are nearly the same: vary the positions/shapes.
16. Objective tags: s7a L3 r2 v0/v1 and test q10 v0 are tagged 6Gg.08 but test only 6Gg.01: fix the tags (keep 6Gg.08 tested at least twice in the test).
17. WORDS: add a short example to "trapezium" ("This road sign is a trapezium.") and "rotational symmetry" ("A square has rotational symmetry."); shorten "rhombus", "kite", "line of symmetry", "order of rotational symmetry" definitions to 1-2 sentences.
18. "isosceles" is not a word of this stop: say "a triangle with 2 equal sides" and "a trapezium with 2 equal sloping sides" (Lightning and s7a L2 r1 v2).
19. see q5 v2 (trapezium fourth corner) accepts 5 dots but the text implies one right answer: either make it one right dot or say "Tap a dot that makes a trapezium. There is more than one answer."
