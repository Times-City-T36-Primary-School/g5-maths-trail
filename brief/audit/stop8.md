# Stop 8 audit fix list

1. MISLEADING: line colours give the answer away (radius blue, diameter magenta, chord grey, circumference green, taught
   in See it) in test q1, see q2, s8a L1 r1, s8a L1 r2. In every question that asks the child to NAME or PICK a part,
   draw the figure with one ink colour for every line kind (a `plain: true` option in partFig/cshow); keep colours in
   See it scenes, notes and worked answers.
2. SPEC: s8a L3 r1 v1 (Kim, clock, no compasses) tests only 6Gg.02 while v0/v2 are compasses: change v1 to a compasses
   slip, e.g. { who: 'Kim', kind: 'set', d: '9', unit: 'cm' } (4.5 cm), so all three variants test the same objectives.
3. SPEC: test q4 v2 (DOK 1) asks "not a radius and not a diameter" (double negative, harder than v0/v1): ask a positive
   question like v0/v1, e.g. "Which line is a diameter of the circle?".
4. LAYOUT: `crow` figure length labels are about 10 px on a phone: make the labels at least 15 px on screen (bigger SVG
   text or a bigger drawing).
5. LAYOUT: `cwhich` (s8r L3 r1) option pictures are ~100 px wide, a 1 cm square ~10 px: make the option figures one per
   row and at least 200 px wide on phones (or a coarser grid) so the squares can be counted.
6. LAYOUT: `cdraw` (s8r practise, see q... ) at 390x800: the centre point sits at the bottom edge and most of the grid is
   below the fold: make the compasses tool compact enough that the whole grid fits above the action bar at 390x800.
7. LAYOUT: numbers and units split across lines ("radius of 5 / cm"): use a non-breaking space between number and unit
   everywhere the models write "N cm" / "N mm" / "N m".
8. LANGUAGE: See it draw step 0 -> "A circle *5 cm* across. Open the compasses to *2.5 cm*." (VI to match).
9. test q8 v1 = s8a L3 r1 v2 (diameter 15, opened to 15): change test q8 v1 to d 27 (13.5 cm).
10. test q2 v2 = Lightning "Radius 25 mm. Diameter?": change test q2 v2 to radius 36 mm (72 mm).
11. Test practised in advance by repeated pairs: test q8 v0 d 21 (10.5); q8 v2 d 23 (11.5); q6 v0 210 mm (10.5 cm) -
    but q8 v0 and q6 v0 must not both be 10.5 in the same paper: pick distinct values; q5 v0/v1 radius 8 cm / 4.5 cm.
    Make sure no answer repeats inside one paper (v0 paper, v1 paper, v2 paper).
12. Trivially the same variants: see q4 v2 = s8r L2 r1 v2 -> see q4 v2 radius 4.5 cm; see q5 v2 = s8r L2 r2 v1 -> see q5
    v2 9 cm across; see q2 v0 = s8a L1 r1 v1 (circumference) -> change one; test q1 v0 vs see q2 v1 -> change the angle
    and the part.
13. The option "There is no mistake. ..." contradicts a stem that already says the circle is wrong: replace it with
    "The point must go on the circumference, not on the centre." (feedback: "The point of the compasses goes on the
    centre. The pencil draws the circumference.") in s8a L3 r1 and test q8.
14. Lightning "Diameter N. Radius?": wrong options must be real slips: the diameter itself (did not halve) and 2 × the
    diameter (doubled instead of halved). No "radius + 2" or "diameter − 2". Re-run the generator.
15. s8r L3 r2 v0 has the same answer as v1 (12 cm), and Lightning "4 circles touch in a row. Radius 1.5 cm" repeats v1:
    v0 -> n 3, r 3 (18 cm); change that Lightning item. Lightning "Radius or diameter: which is longer?" -> "One circle:
    radius or diameter, which is longer?".
