/* 20-stops.js - the nine stops of the Grade 3 Maths trail: what the map and the hubs know about each one.

   T.stops[i] = { n, title, world, place, badge, unit, los, status, quick, dataWorld, badgeArt, sceneArt }
     n         the stop number, 1 to 9 (T.stops[n - 1]); a Number
     title     the maths topic (the same as the pack's title; the nine topics of docs/01-brief.md)
     world     the name of the stop's world (shown on the map, the hub, the big button)
     place     the world as a sentence says it: 'the Number Factory' ("Visit ...", "Try Stop N now: ...",
               "You finished every step of ...")
     badge     the badge that all five steps win
     unit      the unit of the course, for teachers (as in Maths v2)
     los       the learning objective codes of the stop (Cambridge Primary Mathematics Stage 4, as in Maths v2)
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

  // the Cambridge Primary Mathematics Stage 4 objectives of the test (codes and wording as in the public test
  // specification, legacy/maths-v2/spec_grade3.txt): shown with every Practise question (code + skill)
  T.OBJECTIVES = {
    "4Nc.04": "Recognise and extend linear sequences; describe term-to-term rule; recognise and extend nonlinear sequences",
    "4Nc.05": "Recognise square number patterns",
    "4Ni.01": "Read and write numbers greater than 1,000 and numbers less than zero",
    "4Nc.01": "Count on and back in steps of 1s, 10s, 100s or 1,000s including beyond zero into negative numbers",
    "4Np.04": "Understand the relative size of quantities to compare and order positive and negative numbers, using the symbols =, > and <.",
    "4Np.05": "Round whole numbers to the nearest 10, 100, 1,000, 10,000 or 100,000",
    "4Np.01": "Understand each digit’s value based on place value in whole numbers",
    "4Np.02": "Multiply and divide numbers by 10 and 100 using place-value knowledge",
    "4Np.03": "Compose, decompose and regroup whole numbers",
    "4Nc.03": "Represent and solve for missing numbers or operations in calculations",
    "4Ni.02": "Estimate an answer and choose an appropriate mental or written method for addition and subtraction",
    "4Nc.02": "Make and test generalisations about adding and subtracting odd/even numbers",
    "4Ni.04": "Recall multiplication facts up to 10 × 10",
    "4Ni.07": "Recognise and find multiples and factors; understand their relationship",
    "4Ni.03": "Group numbers in multiplication to make a calculation easier",
    "4Ni.05": "Estimate and calculate multiplication of whole numbers (up to 1,000 by a 1-digit number)",
    "4Ni.06": "Estimate and divide whole numbers up to 100 by 1-digit whole numbers.",
    "4Nf.01": "Show that dividing a whole into more parts creates smaller fractional pieces",
    "4Nf.02": "Recognise a fraction as a division of the numerator by the denominator",
    "4Nf.03": "Use unit fractions as operators",
    "4Gg.09": "Read and interpret measuring scales that include fractions",
    "4Gt.01": "Understand relationships between units of time and convert between them",
    "4Gt.02": "Read and record time in digital (12-hour & 24-hour) and analogue formats",
    "4Gt.03": "Read and use timetables in both 12-hour and 24-hour time formats",
    "4Gt.04": "Calculate time intervals across days, weeks, months, years; seconds, minutes, hours",
    "4Sp.01": "Use everyday probability language (maybe, likely, certain, impossible)",
    "4Sp.02": "Conduct chance experiments; record and describe results using probability language"
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
  // dok 1, 2 or 3 (Grade 3: DOK 1 30-45%, DOK 2 40-55%, DOK 3 10-15%; a Mini test is 4, 5 and 1, easy to hard).
  // Shown on the test paper as "DOK 2 Skill and concept".
  T.DOK = {
    1: { name: "Recall", what: "Recall facts and use simple skills: recall, recognise, locate, identify" },
    2: { name: "Skill and concept", what: "Process beyond recall: interpret, classify, organise, compare, use a skill in a new way" },
    3: { name: "Strategic thinking", what: "Reason with a plan or several steps: explain, generalise, support thinking with evidence" }
  };
  T.DOK_MIX = [1, 1, 1, 1, 2, 2, 2, 2, 2, 3];   // the 10 questions of a Mini Practice test, in order

  T.stops = [
    { n: 1, title: 'Place value', world: 'Number Factory', place: 'the Number Factory', badge: 'Place Value Pro', unit: 'Unit 1', los: ['4Ni.01', '4Np.01', '4Np.02', '4Np.03'], status: 'open', dataWorld: '1', badgeArt: 'badge-1', sceneArt: 'world-number-factory' },
    { n: 2, title: 'Patterns and negative numbers', world: 'Pattern Canyon', place: 'the Pattern Canyon', badge: 'Pattern Spotter', unit: 'Unit 1', los: ['4Nc.01', '4Nc.04', '4Nc.05', '4Np.04', '4Ni.01'], status: 'open', dataWorld: '2', badgeArt: 'badge-2', sceneArt: 'world-pattern-canyon' },
    { n: 3, title: 'Compare, order and round', world: 'Rounding River', place: 'the Rounding River', badge: 'Round-up Ranger', unit: 'Unit 9', los: ['4Np.04', '4Np.05'], status: 'open', dataWorld: '3', badgeArt: 'badge-3', sceneArt: 'world-rounding-river' },
    { n: 4, title: 'Add and subtract', world: 'Market Square', place: 'the Market Square', badge: 'Sum Star', unit: 'Unit 3', los: ['4Nc.03', '4Ni.02', '4Nc.02'], status: 'open', dataWorld: '4', badgeArt: 'badge-4', sceneArt: 'world-market-square' },
    { n: 5, title: 'Times tables, multiples and factors', world: 'Times Table Tower', place: 'the Times Table Tower', badge: 'Table Champion', unit: 'Unit 5', los: ['4Ni.04', '4Ni.07', '4Ni.03'], status: 'open', dataWorld: '5', badgeArt: 'badge-5', sceneArt: 'world-times-table-tower' },
    { n: 6, title: 'Multiply and divide', world: 'Sharing Harbour', place: 'the Sharing Harbour', badge: 'Share Master', unit: 'Units 5 and 9', los: ['4Ni.05', '4Ni.06'], status: 'open', dataWorld: '6', badgeArt: 'badge-6', sceneArt: 'world-sharing-harbour' },
    { n: 7, title: 'Fractions', world: 'Fraction Garden', place: 'the Fraction Garden', badge: 'Fraction Hero', unit: 'Unit 7', los: ['4Nf.01', '4Nf.02', '4Nf.03'], status: 'open', dataWorld: '7', badgeArt: 'badge-7', sceneArt: 'world-fraction-garden' },
    { n: 8, title: 'Time and timetables', world: 'Clock Station', place: 'the Clock Station', badge: 'Time Keeper', unit: 'Unit 2', los: ['4Gt.01', '4Gt.02', '4Gt.03', '4Gt.04'], status: 'open', dataWorld: '8', badgeArt: 'badge-8', sceneArt: 'world-clock-station' },
    { n: 9, title: 'Scales and chance', world: 'Chance Fair', place: 'the Chance Fair', badge: 'Chance Champ', unit: 'Unit 4', los: ['4Gg.09', '4Sp.01', '4Sp.02'], status: 'open', dataWorld: '9', badgeArt: 'badge-9', sceneArt: 'world-chance-fair' }
  ];
})(window.T = window.T || {});
