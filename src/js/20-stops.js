/* 20-stops.js - the nine stops of the Grade 5 Maths trail: what the map and the hubs know about each one.

   T.stops[i] = { n, title, world, place, badge, unit, los, status, quick, dataWorld, badgeArt, sceneArt }
     n         the stop number, 1 to 9 (T.stops[n - 1]); a Number
     title     the maths topic (the same as the pack's title; the nine topics of docs/01-brief.md)
     world     the name of the stop's world (shown on the map, the hub, the big button)
     place     the world as a sentence says it: 'the Number Factory' ("Visit ...", "Try Stop N now: ...",
               "You finished every step of ...")
     badge     the badge that all five steps win
     unit      the unit of the course, for teachers (as in Maths v2)
     los       the learning objective codes of the stop (Cambridge Primary Mathematics Stage 6)
     status    'open' (it can be opened; a stop whose pack has not arrived yet shows a "coming soon" hub) or 'soon'
     quick     true for a quick-practice stop: only its Practise games are ready. Its hub says so ("Quick practice")
     dataWorld the value of data-world on #app inside the stop ('1' to '9'): it switches the world tokens
     badgeArt  the id of the round map picture, 'badge-N' (src/art/02-art-maths.js)
     sceneArt  the id of the world scene for the hub header (until it is drawn, the hub shows the badge on
               the world's own sky and hills)

   Also here: T.OBJECTIVES (code -> skill), T.TWM (the 8 TWM characteristics), T.DOK (the 3 DOK levels) and
   T.DOK_MIX (the DOK of the 10 Mini Practice test questions, in order).

   Session 1: all nine stops are open and every pack holds only its title and blurb, so every step
   says "Coming soon". The steps arrive stop by stop (docs/03-build-plan.md). */
(function (T) {
  'use strict';

  // the Cambridge Primary Mathematics Stage 6 objectives of the test (codes and official 0096 wording, as in the
  // school's "Maths Grade 5 Stage 6 Detailed test specifications", EOS1 SY 26-27): shown with every Practise question
  T.OBJECTIVES = {
    "6Np.01": "Understand and explain the value of each digit in decimals (tenths, hundredths and thousandths).",
    "6Np.02": "Use knowledge of place value to multiply and divide whole numbers and decimals by 10, 100 and 1000.",
    "6Np.04": "Round numbers with two decimal places to the nearest tenth or whole number.",
    "6Nf.09": "Estimate, add and subtract numbers with the same or different number of decimal places.",
    "6Nc.01": "Count on and count back in steps of constant size, including fractions and decimals, and extend beyond zero to include negative numbers.",
    "6Nc.03": "Use the relationship between repeated addition of a constant and multiplication to find and use a position-to-term rule.",
    "6Nc.04": "Use knowledge of square numbers to generate terms in a sequence, given its position.",
    "6Ni.06": "Understand common multiples and common factors.",
    "6Nf.02": "Understand that proper and improper fractions can act as operators.",
    "6Nf.03": "Use knowledge of equivalence to write fractions in their simplest form.",
    "6Nf.04": "Recognise that fractions, decimals (one or two decimal places) and percentages can have equivalent values.",
    "6Nf.07": "Recognise percentages (1%, and multiples of 5% up to 100%) of shapes and whole numbers.",
    "6Nf.08": "Understand the relative size of quantities to compare and order numbers with one or two decimal places, proper fractions with different denominators and percentages, using the symbols =, > and <.",
    "6Gg.01": "Identify, describe, classify and sketch quadrilaterals, including reference to angles, symmetrical properties, parallel sides and diagonals.",
    "6Gg.08": "Identify rotational symmetry in familiar shapes, patterns or images with maximum order 4. Describe rotational symmetry as \u2018order x\u2019.",
    "6Gg.02": "Know the parts of a circle: centre, radius, diameter, circumference.",
    "6Gg.11": "Construct circles of a specified radius or diameter.",
    "6Ss.03": "Understand that the mode, median, mean and range are ways to describe and summarise data sets. Find and interpret the mode (including bimodal data), median, mean and range, and consider their appropriateness for the context."
  };

  // Thinking and Working Mathematically: the 8 characteristics of the Cambridge Primary Mathematics curriculum
  // framework (0096). Every Mini Practice test question and every Practise round names 1 (at most 2) of them
  // (twm: ['TWM.04']); the tagging rule is in docs/05-content-rules.md. Shown as "TWM.04 Convincing".
  T.TWM = {
    "TWM.01": { name: "Specialising", what: "Choosing an example and checking whether it meets given criteria" },
    "TWM.02": { name: "Generalising", what: "Spotting a pattern or rule that works for many examples" },
    "TWM.03": { name: "Conjecturing", what: "Forming a mathematical idea or question that might be true" },
    "TWM.04": { name: "Convincing", what: "Giving evidence to justify or challenge an idea or answer" },
    "TWM.05": { name: "Characterising", what: "Describing the mathematical properties of an object" },
    "TWM.06": { name: "Classifying", what: "Sorting objects into groups by their properties" },
    "TWM.07": { name: "Critiquing", what: "Comparing and judging ideas, methods or answers" },
    "TWM.08": { name: "Improving", what: "Refining an idea or method to make it better" }
  };

  // Depth of Knowledge (Webb), as in the public test specification: every Mini Practice test question has
  // dok 1, 2 or 3 (Grade 5 EOS1: DOK 1 46%, DOK 2 43%, DOK 3 11%; a Mini test is 5, 4 and 1, easy to hard).
  // Shown on the test paper as "DOK 2 Skill and concept".
  T.DOK = {
    1: { name: "Recall", what: "Recall facts and use simple skills: recall, recognise, locate, identify" },
    2: { name: "Skill and concept", what: "Process beyond recall: interpret, classify, organise, compare, use a skill in a new way" },
    3: { name: "Strategic thinking", what: "Reason with a plan or several steps: explain, generalise, support thinking with evidence" }
  };
  T.DOK_MIX = [1, 1, 1, 1, 1, 2, 2, 2, 2, 3];   // the 10 questions of a Mini Practice test, in order

  T.stops = [
    { n: 1, title: 'Decimal place value', world: 'Decimal Lab', place: 'the Decimal Lab', badge: 'Decimal Decoder', unit: 'Unit 1', los: ['6Np.01', '6Np.02'], status: 'open', dataWorld: '1', badgeArt: 'badge-1', sceneArt: 'world-decimal-lab' },
    { n: 2, title: 'Round, add and subtract decimals', world: 'Rounding Reef', place: 'the Rounding Reef', badge: 'Decimal Diver', unit: 'Units 1 and 8', los: ['6Np.04', '6Nf.09'], status: 'open', dataWorld: '2', badgeArt: 'badge-2', sceneArt: 'world-rounding-reef' },
    { n: 3, title: 'Sequences and term rules', world: 'Sequence Station', place: 'the Sequence Station', badge: 'Pattern Pilot', unit: 'Unit 2', los: ['6Nc.01', '6Nc.03', '6Nc.04'], status: 'open', dataWorld: '3', badgeArt: 'badge-3', sceneArt: 'world-sequence-station' },
    { n: 4, title: 'Common multiples and factors', world: 'Factor Forest', place: 'the Factor Forest', badge: 'Factor Finder', unit: 'Unit 2', los: ['6Ni.06'], status: 'open', dataWorld: '4', badgeArt: 'badge-4', sceneArt: 'world-factor-forest' },
    { n: 5, title: 'Fractions: simplest form and amounts', world: 'Fraction Bakery', place: 'the Fraction Bakery', badge: 'Fraction Chef', unit: 'Unit 6', los: ['6Nf.03', '6Nf.02'], status: 'open', dataWorld: '5', badgeArt: 'badge-5', sceneArt: 'world-fraction-bakery' },
    { n: 6, title: 'Fractions, decimals and percentages', world: 'Percent Market', place: 'the Percent Market', badge: 'Percent Pro', unit: 'Unit 6', los: ['6Nf.04', '6Nf.07', '6Nf.08'], status: 'open', dataWorld: '6', badgeArt: 'badge-6', sceneArt: 'world-percent-market' },
    { n: 7, title: 'Quadrilaterals and rotational symmetry', world: 'Shape Studio', place: 'the Shape Studio', badge: 'Shape Detective', unit: 'Unit 5', los: ['6Gg.01', '6Gg.08'], status: 'open', dataWorld: '7', badgeArt: 'badge-7', sceneArt: 'world-shape-studio' },
    { n: 8, title: 'Circles', world: 'Circle Circus', place: 'the Circle Circus', badge: 'Compass Captain', unit: 'Unit 5', los: ['6Gg.02', '6Gg.11'], status: 'open', dataWorld: '8', badgeArt: 'badge-8', sceneArt: 'world-circle-circus' },
    { n: 9, title: 'Mode, median, mean and range', world: 'Data Stadium', place: 'the Data Stadium', badge: 'Data Champion', unit: 'Unit 3', los: ['6Ss.03'], status: 'open', dataWorld: '9', badgeArt: 'badge-9', sceneArt: 'world-data-stadium' }
  ];
})(window.T = window.T || {});
