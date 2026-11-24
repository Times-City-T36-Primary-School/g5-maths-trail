STOP 7 verification audit. I found 4 issues: 2 misleading, 2 minor. There are no wrong keys, and no spec or exam-overlap problems.

1. **`s7a L3 r1 v0`: MISLEADING.** This is the "Every kite has exactly 1 line of symmetry" counter-example item.
   - The feedback for option C (rect) is "Shape C has 2 pairs of equal sides opposite each other, so it is not a kite." The worked answer repeats it.
   - That reason is false as a rule. The keyed answer, the rhombus, also has 2 pairs of equal opposite sides, and the item's whole point is that a rhombus is a kite. So the feedback contradicts the lesson of the item.
   - Corrected text, in the `why` and in the worked answer: "Shape C is a rectangle. Its sides next to each other are not equal, so it is not a kite."

2. **`s7r L3 r1 v2` hint: MISLEADING.** This is the square with given dots [2,0],[0,3],[3,5]; the answer is (5,2).
   - The hint is "A square has 4 equal sides and 4 right angles. Sides with the same steps across and the same steps up or down are equal."
   - This square's sides are 2 across and 3 up/down, then 3 across and 2 up/down. They are equal, but the hint's rule says nothing about them, so a child following it may decide the sides are not equal.
   - Corrected hint: "A square has 4 equal sides and 4 right angles. Sides with the same steps across and the same steps up or down are equal. Swapped steps are equal too: 2 across and 3 up is as long as 3 across and 2 up."
   - The same sentence is generated for every `eq` gdraw hint. It is only wrong when the sides use swapped steps, which happens in this variant.

3. **`test q3 v0` and `test q3 v2`: MINOR (practise-to-test repeat, added by fix 15).**
   - `test q3 v0` asks the order of the four-point star (key 4). That is the keyed answer of `s7a L2 r2 v2` ("Which shape has order 4?" → star4).
   - `test q3 v2` asks the order of the letter Z (key 2). That is the keyed answer of `s7a L2 r2 v0` ("Which shape has order 2?" → letz).
   - So the test answer is practised in advance. Replace with shapes the trail does not use for an order question:
     - v0: `{"type":"rorder","id":"recttall"}` (order 2: fits after 180° and 360°)
     - v2: `{"type":"rorder","id":"rtri"}` (right-angled triangle, order 1)

4. **`test q7 v1`: MINOR (feedback).** This is the rhombus flower bed with one side of 15 m.
   - Typing 15 gives "You added only the lengths in the picture. This rhombus has 4 equal sides. Find the other sides first." Only one length is shown, so the child added nothing.
   - Corrected feedback when the picture has one length: "You wrote only the length in the picture. This rhombus has 4 equal sides. Add all 4 sides."

**What checked out:**
- Brute-forcing every dot showed each "fourth corner" item has exactly one accepted dot. `see q5 v2` accepts 3 dots, which matches its "more than one answer" text.
- The free-draw checks accept and reject the right shapes (rhombus, trapezium, kite; darts and rhombuses rejected for the kite).
- Every claim key and the perimeter and tile sums are confirmed with `test/answer.mjs`.
- The practise, see, test, notes and words screenshots show figures that match their text, with nothing cut off.

I solved 56 question variants, 83 Lightning items and 7 note checks. Issues: WRONG ANSWER 0, MISLEADING 2, SPEC 0, EXAM OVERLAP 0, LAYOUT 0, LANGUAGE 0, MINOR 2.