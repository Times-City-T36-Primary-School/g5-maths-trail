Stop 8 (Circles), verification round. I solved every key myself: 15 See it items, 36 practise variants, 30 test variants, 6 note checks and 70 Lightning items. All keys are right. I tested the typed answers with answer.mjs: 8.50, 16.50 and 15.0 are accepted, and the usual slips are rejected with helpful feedback. I checked the screens at 390 px: practise, See it, and every question of the v0 test paper.

1. `test q5 v0`, EXAM OVERLAP. "Linh wants to draw a circle with a radius of 8 cm" uses the same number and the same task as exam P1(2) (draw a circle, diameter 8 cm, with compasses). Change the radius to 11 cm (key 11 cm). The new text is: "Linh wants to draw a circle with a radius of 11 cm. What is the distance between the point and the pencil of the compasses?" Worked: "The compasses are set to the radius. The radius is given: 11 cm." 11 is not an answer anywhere else in the v0 paper.

2. `s8a L3 r2 v2`, EXAM OVERLAP. Phong says: "The radius of my circle is 7.5 cm. So its diameter is 15 cm." This is the same claim as exam P2(2) (radius 6 cm, "the diameter is 3 cm"). Only the numbers and the verdict are different. Fix 1 removed this kind of item from the stop for the same reason. Make it a different claim:
   - Q: Phong says: "In one circle, a diameter is always longer than a radius." Is Phong correct?
   - Key: correct.
   - (*) "a diameter is 2 radii, so it is double the length of a radius."
   - ( ) "a radius goes through the centre, so it is longer." Feedback: "A radius goes from the centre to the circumference. A diameter goes all the way across: 2 radii."
   - ( ) "it is only true for big circles." Feedback: "It is true for every circle. A diameter is always 2 radii long."
   - Worked: "A diameter goes through the centre. It is made of 2 radii. So it is always double the length of a radius. MODEL: Phong is correct because a diameter is 2 radii long."
   - Hint: "How many radii make one diameter?"

3. `test q2 v1`, MINOR (the test is practised in advance). Radius 6.5 cm → diameter 13 cm, the same way round, is already in Lightning "Compasses open 6.5 cm. How far across is the circle? => 13 cm". The 6.5/13 pair also appears in WORDS double ("Double 6.5 is 13"), `NOTES 2` EX, note check 6, `s8a L2 r2 v0`, and Lightning "Diameter 13 cm. Radius?" and "A circle 13 cm across. Compasses open?". Change test q2 v1 to radius 18.5 cm (key 37 cm). The new text is: "The radius of a circle is 18.5 cm. What is its diameter?" Worked: "Diameter = 2 × radius = 2 × 18.5 = 37 cm." Hint: "The diameter is 2 radii in a straight line. Double 18.5 cm."

4. `NOTES 4`, MINOR. The example "Radius 8.5 cm: diameter = 2 × 8.5 = *17 cm*" is the reverse of `test q3 v0` (diameter 17 cm → radius 8.5 cm), so it gives the test answer. Lightning "Radius 8.5 cm. Diameter? => 17 cm" does the same. Change the note example to "Radius 12.5 cm: diameter = 2 × 12.5 = *25 cm*." Change that Lightning item to "Radius 16 cm. Diameter? => 32 cm (not: 8 cm ; 18 cm)".

5. `LIGHTNING "Radius 35 cm. Diameter?"`, MINOR. It is exactly step 1 of `test q7 v1` (wheel radius 35 cm → 70 cm). Replace it with "Radius 15 cm. Diameter? => 30 cm (not: 7.5 cm ; 17 cm)".

6. `test q4 v0`, MINOR (variants too alike). The figure is lines d 75° A, r 195° B, c 315° C, and the question is "Which line is a radius?" with key Line B. `see q1 v2` uses the same positions (c 75 A, r 195 B, d 315 C), asks the same question and has the same key, Line B. Only the chord and the diameter swap places. Change test q4 v0 to `lines [{"t":"d","a":40,"tag":"A"},{"t":"c","a":160,"tag":"B"},{"t":"r","a":280,"tag":"C"}]`, key Line C, with the worked text in order A diameter, B neither, C radius.

7. `test q8` / `s8a L3 r1` (ccfix model message), LANGUAGE. When the child picks the right reason but types the wrong length, the message starts "The mistake is right." This is wrong English and confusing. Change it to "You found the mistake. Now find the length." and keep the rest of the message ("The opening of the compasses is the radius of the circle. What is the radius when the diameter is 21 cm?").

Totals: 157 items solved. Issues: 0 WRONG ANSWER, 0 MISLEADING, 0 SPEC, 2 EXAM OVERLAP, 0 LAYOUT, 1 LANGUAGE, 4 MINOR.