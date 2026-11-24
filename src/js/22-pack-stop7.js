/* 22-pack-stop7.js - ALL the content of Stop 7, Quadrilaterals and rotational symmetry (Grade 5, Cambridge Stage 6:
   6Gg.01, 6Gg.08). Every part is here: words, see, practise, notes, test, lightning, selfcheck. The questions are
   data for the Stop 7 models (08-g5-models-s7.js: every property is worked out from the corners of the shape) and
   the tools of 39-g5-tools-s7.js. None of the shapes asked, names or sentences are those of the EOS1 papers: the
   order of rotational symmetry of a rectangle and of a kite is never asked here. */
(function (T) {
  'use strict';

  // a small drawing inside a sentence (the counter-example of a claim): the same drawing code as the pictures
  const S = function (id, marks) { return window.MX.G7.svg(id, Object.assign({ ticks: true, right: true }, marks)); };
  const MK = { ticks: true, par: true, right: true };

  T.packs[7] = {
    n: 7,
    title: "Quadrilaterals and rotational symmetry",
    los: ["6Gg.01", "6Gg.08"],
    blurb: {
      en: "Name and sort *quadrilaterals*. Find the order of rotational symmetry.",
      vi: "Gọi tên và phân loại *tứ giác*. Tìm bậc đối xứng quay."
    },
    words: {
      sets: [
        { id: 'A', title: { en: 'Sides and angles', vi: 'Cạnh và góc' }, keys: ['quadrilateral', 'parallel', 'perpendicular', 'right angle', 'diagonal'] },
        { id: 'B', title: { en: 'Quadrilaterals', vi: 'Các loại tứ giác' }, keys: ['square', 'rectangle', 'parallelogram', 'rhombus', 'trapezium', 'kite'] },
        { id: 'C', title: { en: 'Symmetry', vi: 'Đối xứng' }, keys: ['line of symmetry', 'rotational symmetry', 'order of rotational symmetry'] }
      ],
      items: {
        'quadrilateral': { art: 'w-quadrilateral', vi: 'tứ giác', def: 'A flat shape with 4 straight sides and 4 corners. A square and a kite are quadrilaterals.' },
        'parallel': { art: 'w-parallel', vi: 'song song', def: 'Parallel lines go the same way. They are always the same distance apart, so they never meet.' },
        'perpendicular': { art: 'w-perpendicular', vi: 'vuông góc', def: 'Two lines that meet at a right angle. Two sides of a square that meet are perpendicular.' },
        'right angle': { art: 'w-right-angle', vi: 'góc vuông', def: 'A square corner. It measures 90°. A rectangle has 4 right angles.' },
        'diagonal': { art: 'w-diagonal', vi: 'đường chéo', def: 'A straight line that joins two opposite corners of a shape. A quadrilateral has 2 diagonals.' },
        'square': { art: 'w-square', vi: 'hình vuông', def: 'A quadrilateral with 4 equal sides and 4 right angles. It is a special rectangle and a special rhombus.' },
        'rectangle': { art: 'w-rectangle', vi: 'hình chữ nhật', def: 'A quadrilateral with 4 right angles. Its opposite sides are equal and parallel.' },
        'parallelogram': { art: 'w-parallelogram', vi: 'hình bình hành', def: 'A quadrilateral with 2 pairs of parallel sides. Its opposite sides are equal.' },
        'rhombus': { art: 'w-rhombus', vi: 'hình thoi', def: 'A quadrilateral with 4 equal sides. Its opposite sides are parallel. Its diagonals cross at right angles.' },
        'trapezium': { art: 'w-trapezium', vi: 'hình thang', def: 'A quadrilateral with exactly one pair of parallel sides.' },
        'kite': { art: 'w-kite', vi: 'hình cánh diều', def: 'A quadrilateral with 2 pairs of equal sides. The equal sides are next to each other. It has a line of symmetry.' },
        'line of symmetry': { art: 'w-line-of-symmetry', vi: 'trục đối xứng', def: 'A fold line. One half of the shape fits exactly on the other half. A square has 4 lines of symmetry.' },
        'rotational symmetry': { art: 'w-rotational-symmetry', vi: 'đối xứng quay', def: 'A shape has rotational symmetry when it fits its own outline more than once in one full turn.' },
        'order of rotational symmetry': { art: 'w-order-of-rotational-symmetry', vi: 'bậc đối xứng quay', def: 'How many times a shape fits its own outline in one full turn. A square has order 4. Order 1 means no rotational symmetry.' }
      }
    },
    // See it: Concrete. Make quadrilaterals on the dot grid and read their properties; turn shapes over their
    // outline and count the fits; then the challenge (the data shape is in 45-see.js).
    see: {
      scenes: [
        { id: 'make', title: { en: 'Make a quadrilateral', vi: 'Tạo một tứ giác' }, tool: 'qgrid', qgrid: { cols: 7, rows: 6, info: true },
          steps: [
            { qgrid: { given: [[1, 4], [5, 4], [4, 1]], goal: [[2, 1]] }, can: { dot: true }, wait: 'dot', until: { name: 'trapezium' },
              zip: { en: 'Tap the *gold dot*. Make a shape with 4 corners.', vi: 'Chạm vào *chấm vàng*. Tạo một hình có 4 đỉnh.' },
              then: { en: 'One pair of *parallel* sides: a *trapezium*.', vi: 'Một cặp cạnh *song song*: đó là *hình thang*.' } },
            { qgrid: { given: [[1, 4], [5, 4], [6, 1]], goal: [[2, 1]] }, can: { dot: true }, wait: 'dot', until: { name: 'parallelogram' },
              zip: { en: 'Now make *two pairs* of parallel sides.', vi: 'Bây giờ tạo *hai cặp* cạnh song song.' },
              then: { en: 'Two pairs of parallel sides: a *parallelogram*.', vi: 'Hai cặp cạnh song song: *hình bình hành*.' } },
            { qgrid: { given: [[3, 0], [1, 2], [3, 5]], goal: [[5, 2]] }, can: { dot: true }, wait: 'dot', until: { name: 'kite' },
              zip: { en: 'Find the last corner of a *kite*.', vi: 'Tìm đỉnh cuối cùng của *hình cánh diều*.' },
              then: { en: 'Equal sides next to each other: a *kite*. Tap *Next*.', vi: 'Các cạnh bằng nhau nằm kề nhau: *hình cánh diều*. Bấm *Next*.' } }] },
        { id: 'turn', title: { en: 'Turn the shape', vi: 'Xoay hình' }, tool: 'rot', rot: { tell: true },
          steps: [
            { rot: { id: 'para' }, can: { turn: true }, wait: 'turn', until: { full: true },
              zip: { en: 'Tap *Turn*. Does the *parallelogram* fit its outline?', vi: 'Bấm *Turn* (Xoay). *Hình bình hành* có khớp với đường viền không?' },
              then: { en: 'It fits *2 times* in a full turn: *order 2*.', vi: 'Nó khớp *2 lần* trong một vòng quay: *bậc 2*.' } },
            { rot: { id: 'square' }, can: { turn: true }, wait: 'turn', until: { full: true },
              zip: { en: 'Now turn the *square* all the way round.', vi: 'Bây giờ xoay *hình vuông* hết một vòng.' },
              then: { en: 'It fits *4 times*: *order 4*.', vi: 'Nó khớp *4 lần*: *bậc 4*.' } },
            { rot: { id: 'isotrap' }, can: { turn: true }, wait: 'turn', until: { full: true },
              zip: { en: 'Turn this *trapezium*. Count the fits.', vi: 'Xoay *hình thang* này. Đếm số lần khớp.' },
              then: { en: 'Only *once*: order 1. No rotational symmetry.', vi: 'Chỉ *một lần*: bậc 1. Không có đối xứng quay.' } },
            { rot: { id: 'tri' }, can: { turn: true }, wait: 'turn', until: { full: true },
              zip: { en: 'Three equal sides. Turn the triangle.', vi: 'Ba cạnh bằng nhau. Hãy xoay hình tam giác.' },
              then: { en: 'It fits *3 times*: *order 3*. Tap *Next*.', vi: 'Nó khớp *3 lần*: *bậc 3*. Bấm *Next*.' } }] },
        { id: 'challenge', title: { en: 'Shape challenge', vi: 'Thử thách hình học' },
          challenge: {
            end: { en: 'You did it! You can make shapes and turn them.', vi: 'Em làm được rồi! Em biết tạo hình và xoay hình.' },
            result: 'You made quadrilaterals and found orders of rotational symmetry.',
            rounds: [
          { mode: "our", lo: ["6Gg.08"], v: [
            {"type":"rorder","id":"paral","tool":true},
            {"type":"rorder","id":"rhombusl","tool":true},
            {"type":"rorder","id":"leth","tool":true}] },
          { mode: "your", lo: ["6Gg.08"], v: [
            {"type":"rorder","id":"squaret","tool":true},
            {"type":"rorder","id":"tri","tool":true},
            {"type":"rorder","id":"arrow","tool":true}] },
          { mode: "your", lo: ["6Gg.01"], v: [
            {"type":"gdraw","shape":"parallelogram","given":[[1,4],[4,4],[5,1]],"need":["par2"],"ex":[[2,1]]},
            {"type":"gdraw","shape":"parallelogram","given":[[2,1],[5,1],[4,4]],"need":["par2"],"ex":[[1,4]]},
            {"type":"gdraw","shape":"parallelogram","given":[[1,1],[1,4],[5,5]],"need":["par2"],"ex":[[5,2]]}] },
          { mode: "your", lo: ["6Gg.01"], v: [
            {"type":"spick","ids":["trap","rect","kite","rtrap","isotrap","para"],"prop":"par1"},
            {"type":"spick","ids":["rect","rhombus","squaret","kite","para","rhombusl"],"prop":"eq4"},
            {"type":"spick","ids":["square","para","rtrap","rhombus","recttall","rect"],"prop":"right4"}] },
          { mode: "your", lo: ["6Gg.01"], v: [
            {"type":"gdraw","shape":"kite","given":[[3,0],[1,2],[3,5]],"need":["kite"],"ex":[[5,2]]},
            {"type":"gdraw","shape":"rhombus","given":[[3,0],[0,2],[3,4]],"need":["eq4"],"ex":[[6,2]]},
            {"type":"gdraw","shape":"trapezium","given":[[1,4],[5,4],[4,2]],"need":["par1"],"ex":[[2,2]]}] }] } }]
    },
    // Practise: Pictorial (Draw it: sort the shapes, turn them, draw on the dots) then Abstract (Solve it, like the test).
    practise: [
      { id: 's7r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Sort shapes, turn them and draw on the dots.', vi: 'Phân loại hình, xoay hình và vẽ trên lưới chấm.' },
        levels: [
      { title: { en: "Sort the shapes", vi: "Phân loại hình" }, rounds: [
          { mode: "our", lo: ["6Gg.01"], twm: ["TWM.06"], v: [
            {"type":"spick","ids":["kite","para","rhombus","trap","quad","rect"],"prop":"par2"},
            {"type":"spick","ids":["trap","kitew","squaret","rtrap","paral","quad"],"prop":"par1"},
            {"type":"spick","ids":["kite","recttall","rhombusl","quad","kitew","trap"],"prop":"par0"}] },
          { mode: "your", lo: ["6Gg.01"], twm: ["TWM.06"], v: [
            {"type":"spick","ids":["square","rtrap","rhombus","para","recttall","rect"],"prop":"right4"},
            {"type":"spick","ids":["rhombusl","kite","rect","squaret","isotrap","rhombus"],"prop":"eq4"},
            {"type":"spick","ids":["rect","kite","para","rhombus","isotrap","squaret"],"prop":"dperp"}] }] },
      { title: { en: "Turn it", vi: "Xoay hình" }, rounds: [
          { mode: "your", lo: ["6Gg.08"], twm: ["TWM.05"], v: [
            {"type":"rorder","id":"rhombus","tool":true},
            {"type":"rorder","id":"paral","tool":true},
            {"type":"rorder","id":"twosq","tool":true}] },
          { mode: "your", lo: ["6Gg.08"], twm: ["TWM.05"], v: [
            {"type":"rorder","id":"windmill","tool":true},
            {"type":"rorder","id":"fan3","tool":true},
            {"type":"rorder","id":"lett","tool":true}] }] },
      { title: { en: "Draw on the dots", vi: "Vẽ trên lưới chấm" }, rounds: [
          { mode: "your", lo: ["6Gg.01"], twm: ["TWM.05"], v: [
            {"type":"gdraw","shape":"rectangle","given":[[1,2],[3,0],[6,3]],"need":["right4"],"ex":[[4,5]]},
            {"type":"gdraw","shape":"parallelogram","given":[[0,4],[4,4],[6,1]],"need":["par2"],"ex":[[2,1]]},
            {"type":"gdraw","shape":"square","given":[[2,0],[0,3],[3,5]],"need":["eq4","right4"],"ex":[[5,2]]}] },
          { mode: "your", lo: ["6Gg.01"], twm: ["TWM.01"], v: [
            {"type":"gdraw","need":["eq4","right0"],"ex":[[3,0],[6,2],[3,4],[0,2]]},
            {"type":"gdraw","need":["par1"],"ex":[[1,4],[5,4],[4,1],[2,1]]},
            {"type":"gdraw","need":["kite"],"ex":[[3,0],[5,2],[3,5],[1,2]]}] }] }] },
      { id: 's7a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Name and describe", vi: "Gọi tên và mô tả" }, rounds: [
          { mode: "your", lo: ["6Gg.01"], twm: ["TWM.05"], v: [
            {"type":"qname","id":"rhombusl","opts":["rectangle","trapezium","square"],"at":1},
            {"type":"qname","id":"isotrap","opts":["parallelogram","kite","rhombus"],"at":2},
            {"type":"qname","id":"kitew","opts":["rhombus","trapezium","parallelogram"],"at":0}] },
          { mode: "your", lo: ["6Gg.01"], twm: ["TWM.06"], v: [
            {"type":"qclue","id":"rect","clues":["par","right","eq"],"opts":["square","rhombus","trapezium"],"at":2},
            {"type":"qclue","id":"kite","clues":["par","eq","sym"],"opts":["rhombus","trapezium","parallelogram"],"at":0},
            {"type":"qclue","id":"para","clues":["par","right","sym"],"opts":["rectangle","rhombus","kite"],"at":3}] },
          { mode: "your", lo: ["6Gg.01"], twm: ["TWM.05"], v: [
            {"type":"qnum","id":"rtrap","ask":["par","right"]},
            {"type":"qnum","id":"rhombus","ask":["par","sym"]},
            {"type":"qnum","id":"kite","ask":["right","sym"]}] }] },
      { title: { en: "Rotational symmetry", vi: "Đối xứng quay" }, rounds: [
          { mode: "your", lo: ["6Gg.08"], twm: ["TWM.05"], v: [
            {"type":"rorder","id":"para"},
            {"type":"rorder","id":"plus"},
            {"type":"rorder","id":"isotri"}] },
          { mode: "your", lo: ["6Gg.08"], twm: ["TWM.06"], v: [
            {"type":"swhich","ids":["letz","lett","arrow","letl"],"prop":"rot2","at":2},
            {"type":"swhich","ids":["isotrap","rhombus","para","squaret"],"prop":"rot1","at":1},
            {"type":"swhich","ids":["star4","leth","tri","letn"],"prop":"rot4","at":3}] },
          { mode: "your", lo: ["6Gg.08"], twm: ["TWM.02"], v: [
            {"type":"rtiles","who":"Hoa","items":[["rhombus",3],["square",2]]},
            {"type":"rtiles","who":"Phong","he":true,"items":[["tri",4],["para",5]]},
            {"type":"rtiles","who":"Thu","items":[["isotrap",7],["plus",3]]}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["6Gg.01"], twm: ["TWM.01", "TWM.04"], v: [
            {"type":"swhich","ids":["rhombus","squaret","rect","kite"],"prop":["eq4","right0"],"at":1,"text":"Hung says: “Every quadrilateral with 4 equal sides is a square.” Which shape shows that Hung is wrong?"},
            {"type":"swhich","ids":["rtrap","para","kite","rhombusl"],"prop":["par1"],"at":2,"text":"Kim says: “Every quadrilateral with parallel sides is a parallelogram.” Which shape shows that Kim is wrong?"},
            {"type":"swhich","ids":["rhombusl","rect","kitew","para"],"prop":["sym2","right0"],"at":0,"marks":MK,"text":"Tam says: “A quadrilateral with 2 lines of symmetry is always a rectangle.” Which shape shows that Tam is wrong?"}] },
          { mode: "your", lo: ["6Gg.01", "6Gg.08"], twm: ["TWM.07", "TWM.04"], v: [
            {"type":"claim","who":"Dung","ok":true,"at":1,"says":"A square is a special rectangle.","reasons":[{"t":"a rectangle is a quadrilateral with 4 right angles, and a square has 4 right angles too."},{"t":"a square and a rectangle are two different shapes, so one cannot be the other.","why":"A square fits the rule for a rectangle: 4 right angles. Its 4 equal sides make it a special one."},{"t":"every rectangle has 4 equal sides, like a square.","why":"No. Most rectangles have 2 long sides and 2 short sides. Only a square has 4 equal sides."}],"hint":{"pic":{"k":"shapes","letters":false,"list":[{"id":"rect","cap":"Rectangle"},{"id":"square","cap":"Square"}],"marks":MK},"step":"What must a shape have to be a rectangle? Does a square have it?"},"worked":"A rectangle is a quadrilateral with 4 right angles. A square has 4 right angles, so it is a rectangle. Its 4 equal sides make it a special one.","model":"Dung is correct because a square has 4 right angles, like every rectangle."},
            {"type":"claim","who":"Giang","ok":false,"at":0,"says":"The two diagonals of every parallelogram are equal in length.","reasons":[{"t":"in this parallelogram one diagonal is longer than the other. " + S('para', { diag: true })},{"t":"a parallelogram has 2 pairs of equal sides, so its diagonals are equal too.","why":"Equal sides do not make equal diagonals. Look at a parallelogram that leans: one diagonal is longer."},{"t":"a rectangle is a parallelogram, and its diagonals are equal.","why":"That is one example that fits. The claim says “every”, so look for a parallelogram that does not fit."}],"hint":{"pic":{"k":"shapes","letters":false,"list":[{"id":"para"},{"id":"paral"}],"marks":{"diag":true,"ticks":true}},"step":"Draw the two diagonals of a parallelogram that leans. Compare them."},"worked":"In a parallelogram that leans, one diagonal joins the two far corners and the other joins the two near corners. They are not equal. Only rectangles have equal diagonals.","model":"Giang is incorrect because a parallelogram that leans has one long diagonal and one short diagonal."},
            {"type":"claim","who":"Hai","ok":false,"at":2,"fig":{"k":"shape","id":"paral","ticks":true,"par":true},"says":"This parallelogram has no line of symmetry, so it has no rotational symmetry.","reasons":[{"t":"it fits its outline after a half turn. It has rotational symmetry of order 2."},{"t":"a shape needs a line of symmetry to have rotational symmetry.","why":"No. Turn the parallelogram half way round: it fits, with no fold line at all."},{"t":"this parallelogram has 2 lines of symmetry.","why":"Fold it along a diagonal or across the middle: the halves do not match. It has no line of symmetry."}],"hint":{"pic":{"k":"rot","id":"paral","turns":0},"step":"Turn the parallelogram half way round. Does it fit its outline?"},"worked":"This parallelogram has no line of symmetry. But after a half turn (180°) it fits its outline, and again after the full turn. That is order 2.","model":"Hai is incorrect because the parallelogram has rotational symmetry of order 2, with no line of symmetry."}] }] }] }
    ],
    // Notes: how to do it, each with a worked example and a picture made by the shape tools; then one gap
    // sentence per note, in the same order (the first choice in the braces is the right one).
    notes: {
      items: [
        { en: 'A [[quadrilateral]] has 4 straight sides. [[Parallel|parallel]] sides never meet. [[Perpendicular|perpendicular]] sides meet at a [[right angle]].',
          vi: 'Tứ giác có 4 cạnh thẳng. Các cạnh song song không bao giờ gặp nhau. Các cạnh vuông góc gặp nhau tạo thành góc vuông.',
          example: ['The same arrows show *parallel* sides.', 'A small square shows a *right angle*. The same ticks show *equal* sides.'],
          pic: { k: 'shape', id: 'rtrap', par: true, right: true, ticks: true } },
        { en: 'A [[parallelogram]] has 2 pairs of parallel sides. A [[rectangle]] has 4 right angles. A [[rhombus]] has 4 equal sides. A [[square]] has both.',
          vi: 'Hình bình hành có 2 cặp cạnh song song. Hình chữ nhật có 4 góc vuông. Hình thoi có 4 cạnh bằng nhau. Hình vuông có cả hai.',
          example: ['A square is a *special rectangle* and a *special rhombus*.', 'Rectangles, rhombuses and squares are all *parallelograms*.'],
          pic: { k: 'shapes', letters: false, list: [{ id: 'rect', cap: 'Rectangle' }, { id: 'rhombus', cap: 'Rhombus' }, { id: 'square', cap: 'Square' }], marks: MK } },
        { en: 'A [[trapezium]] has exactly one pair of parallel sides. A [[kite]] has 2 pairs of equal sides that are next to each other.',
          vi: 'Hình thang có đúng một cặp cạnh song song. Hình cánh diều có 2 cặp cạnh bằng nhau nằm kề nhau.',
          example: ['Trapezium: *one pair* of parallel sides, not two.', 'Kite: *no* parallel sides and *1* line of symmetry.'],
          pic: { k: 'shapes', letters: false, list: [{ id: 'trap', cap: 'Trapezium' }, { id: 'kite', cap: 'Kite' }], marks: MK } },
        { en: 'A [[diagonal]] joins two opposite corners. The diagonals of a rectangle are equal. The diagonals of a rhombus and of a kite cross at right angles.',
          vi: 'Đường chéo nối hai đỉnh đối diện. Hai đường chéo của hình chữ nhật bằng nhau. Hai đường chéo của hình thoi và của hình cánh diều vuông góc với nhau.',
          example: ['Rectangle: *equal* diagonals.', 'Rhombus: diagonals cross at *right angles*.', 'Square: *both*.'],
          pic: { k: 'shapes', letters: false, list: [{ id: 'rect', cap: 'Rectangle' }, { id: 'rhombus', cap: 'Rhombus' }], marks: { diag: true, ticks: true, right: true } } },
        { en: 'A [[line of symmetry]] is a fold line: both halves match. A square has 4. Other rectangles and rhombuses have 2. A kite has 1.',
          vi: 'Trục đối xứng là đường gấp: hai nửa trùng khít nhau. Hình vuông có 4 trục. Các hình chữ nhật và hình thoi khác có 2 trục. Hình cánh diều có 1 trục.',
          example: ['A parallelogram that leans has *no* line of symmetry.', 'Fold it in your head: the halves do not match.'],
          pic: { k: 'shapes', letters: false, list: [{ id: 'square', cap: '4 lines' }, { id: 'rhombus', cap: '2 lines' }, { id: 'para', cap: 'No line' }], marks: { sym: true } } },
        { en: 'Turn a shape about its centre. The [[order of rotational symmetry]] is how many times it fits its outline in one full turn.',
          vi: 'Xoay một hình quanh tâm của nó. Bậc đối xứng quay là số lần hình khớp với đường viền của nó trong một vòng quay.',
          example: ['A square fits *4 times*: order 4.', 'A parallelogram fits *2 times*: order 2.', 'A triangle with 3 equal sides: order 3.'],
          pic: { k: 'rot', id: 'para', cap: 'Parallelogram: order 2' } },
        { en: 'A shape that fits only at the end of the full turn has order 1. It has no [[rotational symmetry]]. The order is never 0.',
          vi: 'Hình chỉ khớp khi xoay hết một vòng thì có bậc 1. Hình đó không có đối xứng quay. Bậc không bao giờ bằng 0.',
          example: ['This trapezium has 1 line of symmetry, but *order 1*.', 'Lines of symmetry and order are *not* the same thing.'],
          pic: { k: 'rot', id: 'isotrap', cap: 'Trapezium: order 1' } }
      ],
      check: [
        { sentence: 'Sides that never meet are {parallel|perpendicular|equal}.', answer: 'parallel' },
        { sentence: 'A quadrilateral with 4 equal sides and no right angles is a {rhombus|square|rectangle}.', answer: 'rhombus' },
        { sentence: 'A trapezium has {one pair|two pairs|no pairs} of parallel sides.', answer: 'one pair' },
        { sentence: 'The diagonals of a rhombus cross at {right angles|the corners|one end}.', answer: 'right angles' },
        { sentence: 'A parallelogram that leans has {0|2|4} lines of symmetry.', answer: '0' },
        { sentence: 'A square has rotational symmetry of order {4|2|1}.', answer: '4' },
        { sentence: 'A shape with no rotational symmetry has order {1|0|2}.', answer: '1' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard: 5 at DOK 1, 4 at DOK 2, 1 at DOK 3 (T.DOK_MIX), each with
    // lo, twm and 3 sets (play 1 uses v[0]). No tool: the drawing question is answered with drawings to tick.
    test: {
      items: [
        { dok: 1, lo: ["6Gg.01"], twm: ["TWM.05"], v: [
          {"type":"qname","id":"para","opts":["rectangle","rhombus","trapezium"],"at":2},
          {"type":"qname","id":"trap","opts":["parallelogram","kite","rhombus"],"at":0},
          {"type":"qname","id":"rhombus","opts":["square","rectangle","trapezium"],"at":1}
        ] },
        { dok: 1, lo: ["6Gg.01"], twm: ["TWM.05"], v: [
          {"type":"qnum","id":"isotrap","ask":["par"]},
          {"type":"qnum","id":"rtrap","ask":["right"]},
          {"type":"qnum","id":"paral","ask":["par"]}
        ] },
        { dok: 1, lo: ["6Gg.08"], twm: ["TWM.05"], v: [
          {"type":"rorder","id":"rhombusl"},
          {"type":"rorder","id":"tri"},
          {"type":"rorder","id":"leth"}
        ] },
        { dok: 1, lo: ["6Gg.08"], twm: ["TWM.06"], v: [
          {"type":"swhich","ids":["squaret","para","isotrap","rhombus"],"prop":"rot4","at":1},
          {"type":"swhich","ids":["letl","letn","plus","twosq"],"prop":"rot1","at":2},
          {"type":"swhich","ids":["fan3","windmill","leth","arrow"],"prop":"rot3","at":0}
        ] },
        { dok: 1, lo: ["6Gg.01"], twm: ["TWM.06"], v: [
          {"type":"qclue","id":"rhombus","clues":["par","eq","right"],"opts":["square","rectangle","trapezium"],"at":1},
          {"type":"qclue","id":"isotrap","clues":["par","sym"],"opts":["parallelogram","kite","rhombus"],"at":0},
          {"type":"qclue","id":"rect","clues":["right","eq","sym"],"opts":["square","rhombus","kite"],"at":2}
        ] },
        { dok: 2, lo: ["6Gg.01"], twm: ["TWM.01"], v: [
          {"type":"swhich","ids":["rtrap","para","kite","rect"],"prop":"par1","at":2,"marks":{"grid":true},"text":"Chi must draw a quadrilateral with exactly one pair of parallel sides. Which drawing is right?"},
          {"type":"swhich","ids":["rhombus","squaret","paral","kitew"],"prop":["eq4","right0"],"at":0,"marks":{"grid":true},"text":"Duc must draw a quadrilateral with 4 equal sides and no right angles. Which drawing is right?"},
          {"type":"swhich","ids":["kitew","rhombusl","recttall","isotrap"],"prop":["kite","par0"],"at":3,"marks":{"grid":true},"text":"Hanh must draw a quadrilateral with no parallel sides and 2 pairs of equal sides. Which drawing is right?"}
        ] },
        { dok: 2, lo: ["6Gg.01"], twm: ["TWM.05"], v: [
          {"type":"qperim","id":"kite","len":[12,5],"unit":"cm","text":"Son puts tape along all 4 sides of this kite. How much tape does he need?"},
          {"type":"qperim","id":"rhombusl","len":[15],"unit":"m","text":"A flower bed is a rhombus like this. Yen walks once around it. How far does she walk?"},
          {"type":"qperim","id":"paral","len":[11,8],"unit":"cm","text":"Binh glues ribbon along every side of this parallelogram card. How much ribbon does he need?"}
        ] },
        { dok: 2, lo: ["6Gg.08"], twm: ["TWM.02"], v: [
          {"type":"rtiles","who":"Linh","items":[["squaret",3],["paral",4]]},
          {"type":"rtiles","who":"Long","he":true,"items":[["tri",5],["rhombus",3]]},
          {"type":"rtiles","who":"Ngoc","items":[["plus",2],["isotrap",9]]}
        ] },
        { dok: 2, lo: ["6Gg.01", "6Gg.08"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Minh","ok":false,"at":1,"fig":{"k":"shape","id":"para","ticks":true,"par":true},"says":"This parallelogram has 2 lines of symmetry.","reasons":[{"t":"no fold line gives two halves that match. It has no line of symmetry."},{"t":"it has 2 pairs of parallel sides, so it has 2 lines of symmetry.","why":"Parallel sides are not fold lines. Fold the shape in your head: do the halves match?"},{"t":"it fits its outline 2 times in one full turn.","why":"That is rotational symmetry of order 2. It is not the same as lines of symmetry."}],"hint":{"pic":{"k":"shape","id":"para","diag":true},"step":"Fold the shape along a diagonal in your head. Then fold it across the middle. Do the halves match?"},"worked":"Fold along a diagonal: the corners do not meet. Fold across the middle: the halves do not match. A parallelogram like this has no line of symmetry. (It has rotational symmetry of order 2.)","model":"Minh is incorrect because no fold line gives two matching halves."},
          {"type":"claim","who":"Trang","ok":false,"at":0,"fig":{"k":"shape","id":"rhombus","ticks":true},"says":"This rhombus has rotational symmetry of order 4, because it has 4 equal sides.","reasons":[{"t":"it fits its outline only 2 times in one full turn: after a half turn and after the full turn."},{"t":"a shape with 4 equal sides fits after every quarter turn.","why":"Turn the rhombus a quarter turn: now it stands tall and does not fit. Only a square fits after every quarter turn."},{"t":"the order is the number of sides, and a rhombus has 4 sides.","why":"The order is how many times the shape fits its outline in one full turn. It is not the number of sides."}],"hint":{"pic":{"k":"rot","id":"rhombus","turns":0},"step":"Turn the rhombus a quarter turn in your head. Does it fit its outline?"},"worked":"After a quarter turn (90°) the rhombus does not fit. After a half turn (180°) it fits. After 270° it does not fit. After the full turn it fits. That is 2 times: order 2.","model":"Trang is incorrect because the rhombus fits only 2 times in one full turn: order 2."},
          {"type":"claim","who":"Thu","ok":true,"at":2,"fig":{"k":"shape","id":"isotrap","ticks":true,"par":true},"says":"This trapezium has 1 line of symmetry, but it has no rotational symmetry.","reasons":[{"t":"the fold line down the middle gives two matching halves, and the shape fits its outline only at the end of the full turn."},{"t":"every shape with a line of symmetry has rotational symmetry of order 2.","why":"Turn the trapezium half way round: the short side is at the bottom. It does not fit."},{"t":"a trapezium never has a line of symmetry.","why":"This trapezium has two equal sloping sides. Fold it down the middle: the halves match."}],"hint":{"pic":{"k":"shape","id":"isotrap","sym":true},"step":"First look for a fold line. Then turn the shape half way round in your head."},"worked":"The line down the middle is a line of symmetry: the two sloping sides are equal. When you turn the shape, it fits only at the end of the full turn: order 1, so no rotational symmetry.","model":"Thu is correct because the trapezium has one fold line and fits only once in a full turn."}
        ] },
        { dok: 3, lo: ["6Gg.01", "6Gg.08"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Hoa","ok":false,"at":2,"says":"A quadrilateral with 4 equal sides is always a square.","reasons":[{"t":"this shape has 4 equal sides but no right angles. It is a rhombus, not a square. " + S('rhombus')},{"t":"this shape has 4 equal sides and it is a square. " + S('squaret'),"why":"That is one example that fits. To test “always”, look for a shape with 4 equal sides that is not a square."},{"t":"this kite has 2 pairs of equal sides and it is not a square. " + S('kite'),"why":"A kite does not have 4 equal sides, so it does not test the claim."}],"hint":{"pic":{"k":"shkey"},"step":"Test the claim. Can you think of a shape with 4 equal sides that has no right angles?"},"worked":"A square needs 4 equal sides and 4 right angles. A rhombus has 4 equal sides, but its angles do not have to be right angles. One example like this shows the claim is not always true.","model":"Hoa is incorrect because a rhombus with no right angles has 4 equal sides and is not a square."},
          {"type":"claim","who":"Son","ok":false,"at":0,"says":"A quadrilateral with rotational symmetry of order 2 always has a line of symmetry.","reasons":[{"t":"this parallelogram fits its outline after a half turn, so it has order 2. But no fold line gives two matching halves. " + S('para')},{"t":"this rhombus has order 2 and it has 2 lines of symmetry. " + S('rhombus'),"why":"That is one example that fits. To test “always”, look for a shape of order 2 with no line of symmetry."},{"t":"this trapezium has a line of symmetry but no rotational symmetry. " + S('isotrap'),"why":"This trapezium has order 1, so it does not test a claim about order 2."}],"hint":{"pic":{"k":"rot","id":"para","turns":0},"step":"Test the claim with a parallelogram that leans. What is its order? Can you fold it into two matching halves?"},"worked":"A parallelogram that leans fits its outline after a half turn and after the full turn: order 2. But it has no line of symmetry. One example like this shows the claim is not always true.","model":"Son is incorrect because a parallelogram that leans has order 2 and no line of symmetry."},
          {"type":"claim","who":"Giang","ok":true,"at":1,"says":"Only one kind of quadrilateral has rotational symmetry of order 4: the square.","reasons":[{"t":"to fit after every quarter turn, each side must land on the next side and each angle on the next angle. So all 4 sides are equal and all 4 angles are equal: a square."},{"t":"this rhombus has 4 equal sides, so it has order 4 too. " + S('rhombus'),"why":"Turn the rhombus a quarter turn: it does not fit. It fits only after a half turn and the full turn: order 2."},{"t":"every quadrilateral has 4 sides, so every quadrilateral has order 4.","why":"The order is not the number of sides. A trapezium fits only at the end of the full turn: order 1."}],"hint":{"pic":{"k":"rot","id":"square","turns":0},"step":"Order 4 means the shape fits after every quarter turn. Test a rhombus, then a square."},"worked":"Order 4 means the shape fits after every quarter turn. Then every side lands on the next side, so the 4 sides are equal. Every angle lands on the next angle, so the 4 angles are equal: 4 right angles. That is a square.","model":"Giang is correct because a shape that fits after every quarter turn has 4 equal sides and 4 equal angles."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). Made and checked by
    // tools/gen_lightning_s7.py (geometry from the corners of each shape, against a table of facts written by hand).
    lightning: {
      secs: 60,
      items: [
        ["Pairs of equal sides in a kite", ["2", "1", "4"]],
        ["Which shape has rotational symmetry of order 3?", ["equilateral triangle", "square", "isosceles triangle"]],
        ["A rectangle is a square.", ["Sometimes", "Always", "Never"]],
        ["Order of rotational symmetry: the letter N", ["2", "0", "1"]],
        ["Pairs of parallel sides in a square", ["2", "4", "1"]],
        ["Order of rotational symmetry: a parallelogram", ["2", "0", "4"]],
        ["Which shape does not always have a line of symmetry?", ["parallelogram", "rhombus", "kite"]],
        ["Order of rotational symmetry: the letter T", ["1", "0", "2"]],
        ["A shape fits 1 time in one full turn. Its order is", ["1", "0", "2"]],
        ["Order of rotational symmetry: the letter L", ["1", "0", "2"]],
        ["Pairs of parallel sides in a rectangle", ["2", "4", "1"]],
        ["Order 1 means the shape has", ["no rotational symmetry", "1 line of symmetry", "1 right angle"]],
        ["Which shape has exactly one pair of parallel sides?", ["trapezium", "parallelogram", "kite"]],
        ["A parallelogram has a line of symmetry.", ["Sometimes", "Always", "Never"]],
        ["A rhombus has diagonals that cross at right angles.", ["Always", "Sometimes", "Never"]],
        ["The diagonals of a rhombus cross at", ["90°", "45°", "60°"]],
        ["Pairs of parallel sides in a trapezium", ["1", "2", "0"]],
        ["Lines of symmetry: a rectangle", ["2", "4", "1"]],
        ["Which shape can have no parallel sides?", ["kite", "trapezium", "rhombus"]],
        ["Order 4: the shape fits after every turn of", ["90°", "180°", "120°"]],
        ["A right angle measures", ["90°", "180°", "45°"]],
        ["Lines of symmetry: an isosceles trapezium", ["1", "4", "2"]],
        ["Lines of symmetry + order: an equilateral triangle", ["6", "3", "8"]],
        ["A rhombus is a square.", ["Sometimes", "Always", "Never"]],
        ["Order of rotational symmetry: a rhombus", ["2", "4", "1"]],
        ["Order 2: the shape fits after every turn of", ["180°", "90°", "120°"]],
        ["A half turn is", ["180°", "90°", "360°"]],
        ["A shape fits 3 times in one full turn. Its order is", ["3", "2", "4"]],
        ["A fold line with two matching halves is a", ["line of symmetry", "diagonal", "parallel line"]],
        ["Lines of symmetry + order: a square", ["8", "4", "10"]],
        ["Lines that never meet are", ["parallel", "perpendicular", "diagonal"]],
        ["A square is a rhombus.", ["Always", "Sometimes", "Never"]],
        ["Lines of symmetry: a parallelogram", ["0", "2", "4"]],
        ["Which shape always has 4 right angles?", ["rectangle", "rhombus", "trapezium"]],
        ["Lines that meet at a right angle are", ["perpendicular", "parallel", "equal"]],
        ["Right angles in a square", ["4", "2", "1"]],
        ["Which letter has no rotational symmetry?", ["letter T", "letter H", "letter Z"]],
        ["A trapezium is a parallelogram.", ["Never", "Always", "Sometimes"]],
        ["A quarter turn is", ["90°", "180°", "360°"]],
        ["A trapezium has 2 pairs of parallel sides.", ["Never", "Always", "Sometimes"]],
        ["Order of rotational symmetry: the letter H", ["2", "1", "4"]],
        ["A shape fits after every 180° turn. Its order is", ["2", "3", "4"]],
        ["A parallelogram has rotational symmetry.", ["Always", "Sometimes", "Never"]],
        ["Which shape always has diagonals that cross at right angles?", ["rhombus", "rectangle", "parallelogram"]],
        ["Right angles in a rectangle", ["4", "2", "0"]],
        ["Order 3: the shape fits after every turn of", ["120°", "90°", "180°"]],
        ["A square is a rectangle.", ["Always", "Sometimes", "Never"]],
        ["A parallelogram has 4 right angles.", ["Sometimes", "Always", "Never"]],
        ["A shape fits after every 120° turn. Its order is", ["3", "4", "2"]],
        ["Order of rotational symmetry: an equilateral triangle", ["3", "1", "2"]],
        ["Order of rotational symmetry: a star with 4 points", ["4", "1", "2"]],
        ["A line that joins opposite corners is a", ["diagonal", "side", "line of symmetry"]],
        ["Order of rotational symmetry: an arrow", ["1", "0", "2"]],
        ["Lines of symmetry + order: a parallelogram", ["2", "0", "4"]],
        ["Which shape always has 4 lines of symmetry?", ["square", "rectangle", "rhombus"]],
        ["Lines of symmetry: a rhombus", ["2", "4", "1"]],
        ["A shape fits 2 times in one full turn. Its order is", ["2", "1", "3"]],
        ["A shape fits 4 times in one full turn. Its order is", ["4", "3", "5"]],
        ["Order of rotational symmetry: an isosceles triangle", ["1", "3", "0"]],
        ["Order of rotational symmetry: the letter Z", ["2", "0", "1"]],
        ["Lines of symmetry: an equilateral triangle", ["3", "2", "1"]],
        ["Lines of symmetry: the letter Z", ["0", "2", "1"]],
        ["Order of rotational symmetry: the plus sign (+)", ["4", "1", "2"]],
        ["A rhombus is a parallelogram.", ["Always", "Sometimes", "Never"]],
        ["A shape with 4 straight sides is a", ["quadrilateral", "triangle", "pentagon"]],
        ["Pairs of parallel sides in a parallelogram", ["2", "4", "1"]],
        ["A full turn is", ["360°", "180°", "90°"]],
        ["Order of rotational symmetry: an isosceles trapezium", ["1", "4", "0"]],
        ["Which shape always has order 4?", ["square", "rhombus", "parallelogram"]],
        ["Order of rotational symmetry: a square", ["4", "1", "2"]],
        ["Three quarter turns make", ["270°", "180°", "90°"]],
        ["Lines of symmetry: a kite", ["1", "4", "2"]],
        ["How many diagonals does a quadrilateral have?", ["2", "4", "1"]],
        ["Lines of symmetry + order: a rhombus", ["4", "2", "6"]],
        ["A shape fits after every 90° turn. Its order is", ["4", "5", "2"]],
        ["Which shape always has equal diagonals?", ["rectangle", "rhombus", "parallelogram"]],
        ["Lines of symmetry: a square", ["4", "2", "1"]],
        ["Pairs of parallel sides in a kite", ["0", "1", "2"]],
        ["Equal sides in a rhombus", ["4", "2", "0"]],
        ["Pairs of parallel sides in a rhombus", ["2", "4", "1"]],
        ["Which letter has order 2 but no line of symmetry?", ["letter N", "letter H", "letter T"]],
        ["Which shape always has 4 equal sides?", ["rhombus", "rectangle", "kite"]]
      ]
    },
    // My self-check: the goals of the stop. again: the step to practise again for each goal (c = See it, r and a = Practise).
    selfcheck: {
      goals: ["name a quadrilateral from its sides and angles", "say how many pairs of parallel sides and right angles a shape has", "describe the diagonals and the lines of symmetry of a quadrilateral", "find the order of rotational symmetry of a shape", "draw a quadrilateral from its properties"],
      again: ["a", "r", "a", "c", "r"]
    }
  };
})(window.T = window.T || {});
