/* 22-pack-stop9.js - ALL the content of Stop 9, Scales and chance (shape: docs/02-architecture.md). Tools and pictures:
   src/toolkit/39-tools-chance.js. Questions: the Maths v2 Stop 9 models (src/models/06-mtasks8.js). */
(function (T) {
  'use strict';

  // a results table for a claim, each colour with its counter (the same look as the models' tables)
  const dot = function (c) { return '<span class="cdot c-' + c.toLowerCase() + '"></span>' + c; };
  const TB = function (rows) { return { k: 'table', head: ['Colour', 'Number of times'], rows: rows.map(function (r) { return [dot(r[0]), String(r[1])]; }) }; };
  // the order of colours in an experiment, from letters (G green, R red, B blue, Y yellow, P purple, O orange, K pink)
  const S = function (s) { return s.split(' ').map(function (c) { return { G: 'green', R: 'red', B: 'blue', Y: 'yellow', P: 'purple', O: 'orange', K: 'pink' }[c]; }); };
  const BAG30 = 'A counter is picked from a bag 30 times. The counter goes back each time. The table shows the results.';
  const BAG20 = 'A counter is picked from a bag 20 times. The table shows the results.';
  const ANI24 = 'A spinner has pictures of animals. It is spun 24 times. The table shows the results.';

  T.packs[9] = {
    n: 9,
    title: "Scales and chance",
    los: ["4Gg.09", "4Sp.01", "4Sp.02"],   // the learning objectives (shown to teachers under the last note)
    blurb: {
      en: "Read the *scale* on jugs and weighing machines. Say how *likely* something is.",
      vi: "Đọc *vạch chia* trên ca đong và cân. Nói xem một việc *có khả năng* xảy ra nhiều hay ít."
    },
    // Words: the 5 v2 key words and four new ones (pictures: src/art/09-art-words-9.js)
    words: {
      sets: [
        { id: 'A', title: { en: 'Will it happen?', vi: 'Việc đó có xảy ra không?' }, keys: ['impossible', 'maybe', 'certain'] },
        { id: 'B', title: { en: 'Chance experiments', vi: 'Thí nghiệm về khả năng' }, keys: ['likely', 'spinner', 'tally'] },
        { id: 'C', title: { en: 'Scales', vi: 'Vạch chia' }, keys: ['scale', 'litre', 'kilogram'] }
      ],
      items: {
        'impossible': { art: 'w-impossible', vi: 'không thể', def: 'It cannot happen. You cannot pick red from a bag of blue counters.' },
        'maybe': { art: 'w-maybe', vi: 'có thể', def: 'It might happen. It might not. Half the spinner is pink: pink is maybe.' },
        'certain': { art: 'w-certain', vi: 'chắc chắn', def: 'It will happen for sure. Every counter is green, so you will pick green.' },
        'likely': { art: 'w-likely', vi: 'có nhiều khả năng xảy ra', def: 'It will probably happen. 3 of the 4 parts are green, so green is likely.' },
        'spinner': { art: 'w-spinner', vi: 'vòng quay', def: 'A wheel with equal parts. Spin it. The arrow stops on one part.' },
        'tally': { art: 'w-tally', vi: 'vạch đếm', def: 'A quick way to count. Draw one line for each result. The fifth line goes across.' },
        'scale': { art: 'w-scale', vi: 'thang đo', def: 'The marks and numbers on a jug, a ruler or a weighing machine.' },
        'litre': { art: 'w-litre', vi: 'lít', def: 'We measure how much water a jug holds in litres. A big bottle holds 1 litre.' },
        'kilogram': { art: 'w-kilogram', vi: 'ki-lô-gam', def: 'We measure how heavy something is in kilograms (kg). A melon is about 2 kg.' }
      }
    },
    // See it: four hands-on scenes (a jug in halves, a scale in quarters, spin and tally, chance words), then the
    // challenge: the 5 v2 "Build it" slots with TWM tags
    see: {
      scenes: [
        { id: 'jug', title: { en: 'Fill the jug', vi: 'Rót nước vào ca' }, tool: 'jug',
          jug: { max: 2, per: 2, level: 0 },
          steps: [
            { can: { pour: true }, wait: 'pour', until: { level: 1 },
              zip: { en: 'Tap *Pour in* once. Watch the water.', vi: 'Bấm *Pour in* (Rót vào) một lần. Xem nước nhé.' },
              then: { en: '2 steps make 1 litre. One step is *half*.', vi: '2 vạch nhỏ là 1 lít. Một vạch là *nửa* lít.' } },
            { can: { pour: true }, wait: 'pour', until: { level: 3 },
              zip: { en: 'Now pour to *1 and a half* litres.', vi: 'Bây giờ rót đến *1 lít rưỡi*.' },
              then: { en: '1 litre and one more half: *1 and a half*!', vi: '1 lít và thêm nửa lít: *1 lít rưỡi*!' } }] },
        { id: 'weigh', title: { en: 'Weigh mangoes', vi: 'Cân xoài' }, tool: 'wscale',
          wscale: { max: 3, per: 4 },
          steps: [
            { can: { weigh: true }, wait: 'weigh', until: { at: 1 },
              zip: { en: 'Tap *Add a mango*. Watch the arrow.', vi: 'Bấm *Add a mango* (Thêm xoài). Xem mũi tên nhé.' },
              then: { en: 'The arrow moved *one small step*.', vi: 'Mũi tên đi được *một vạch nhỏ*.' } },
            { can: { weigh: true }, wait: 'weigh', until: { at: 4 },
              zip: { en: 'Add mangoes until the arrow points at *1*.', vi: 'Thêm xoài đến khi mũi tên chỉ số *1*.' },
              then: { en: '4 steps make 1 kg. One step is *a quarter*.', vi: '4 vạch nhỏ là 1 kg. Một vạch là *một phần tư*.' } },
            { wscale: { max: 3, per: 4, base: { at: 8, label: '2 kg' } },
              can: { weigh: true }, wait: 'weigh', until: { at: 11 },
              zip: { en: 'The rice is *2 kg*. Add 3 mangoes.', vi: 'Túi gạo nặng *2 kg*. Thêm 3 quả xoài.' },
              then: { en: '*2 and three quarters* kilograms. Well read!', vi: '*2 và ba phần tư* ki-lô-gam. Đọc giỏi lắm!' } }] },
        { id: 'spin', title: { en: 'Spin and count', vi: 'Quay và đếm' }, tool: 'trial',
          trial: { kind: 'spinner', parts: ['green', 'green', 'orange', 'green'], names: ['green', 'orange'], seq: S('G G O G G G O G G G G O') },
          steps: [
            { can: { spin: true }, wait: 'spin', until: { done: 1 },
              zip: { en: 'Tap *Spin*. See where the arrow stops.', vi: 'Bấm *Spin* (Quay). Xem mũi tên dừng ở đâu.' },
              then: { en: 'A *tally* mark goes in the table.', vi: 'Một *vạch đếm* được ghi vào bảng.' } },
            { can: { spin: true }, wait: 'spin', until: { done: 12 },
              zip: { en: 'Spin *11 more* times. Watch the tally grow.', vi: 'Quay thêm *11 lần* nữa. Xem vạch đếm tăng lên.' },
              then: { en: 'Green came up most. Green is *likely*.', vi: 'Màu xanh lá ra nhiều nhất. Xanh lá *có nhiều khả năng*.' } }] },
        { id: 'words', title: { en: 'Chance words', vi: 'Từ chỉ khả năng' }, tool: 'match',
          match: {
            wide: true,
            left: [{ html: 'A fish will ride a bike.' }, { html: 'The sun will rise tomorrow.' }, { html: 'A coin lands on heads.' }, { html: 'You pick red from 9 red counters and 1 blue.' }],
            right: [{ html: 'Impossible' }, { html: 'Maybe' }, { html: 'Likely' }, { html: 'Certain' }],
            want: [0, 3, 1, 2] },
          steps: [
            { can: { rows: [0, 1] }, wait: 'match', until: { matched: 2 },
              zip: { en: 'Tap a sentence. Then tap its *chance word*.', vi: 'Bấm vào một câu. Rồi bấm *từ chỉ khả năng* của câu đó.' },
              then: { en: 'Impossible: it *never* happens. Certain: it always does.', vi: 'Không thể: *không bao giờ* xảy ra. Chắc chắn: luôn xảy ra.' } },
            { can: { rows: [2, 3] }, wait: 'match', until: { matched: 4 },
              zip: { en: 'Now join the last *two* sentences.', vi: 'Bây giờ nối *hai* câu cuối.' },
              then: { en: 'Maybe: it might happen. Likely: it *probably* will.', vi: 'Có thể: có khi xảy ra. Có nhiều khả năng: *thường* sẽ xảy ra.' } }] },
        { id: 'challenge', title: { en: 'Chance and scales', vi: 'Khả năng và vạch chia' },
          challenge: {
            end: { en: 'You did it! You can do chance experiments.', vi: 'Em làm được rồi! Em biết làm thí nghiệm về khả năng.' },
            result: 'You did chance experiments, filled a jug and read its scale.',
            rounds: [
          { mode: "our", lo: ["4Sp.02"], twm: ["TWM.06"], v: [
            { type: "trial", kind: "bag", items: [["blue", 4], ["yellow", 2]], seq: S("B B Y B B Y B B B Y B Y"), ask: "most" },
            { type: "trial", kind: "bag", items: [["red", 5], ["green", 1]], seq: S("R R G R R R R G R R R G"), ask: "most" },
            { type: "trial", kind: "bag", items: [["yellow", 4], ["blue", 2]], seq: S("Y B Y Y B Y Y B Y B Y B"), ask: "most" }] },
          { mode: "our", lo: ["4Sp.02"], twm: ["TWM.06"], v: [
            { type: "trial", kind: "spinner", parts: ["green", "green", "purple", "orange"], seq: S("G P G O G P G G P O G P"), ask: "least" },
            { type: "trial", kind: "spinner", parts: ["pink", "pink", "pink", "green"], seq: S("K K G K K K G K"), ask: "least" },
            { type: "trial", kind: "spinner", parts: ["purple", "orange", "orange", "green"], seq: S("O G O P O G O O G P O G"), ask: "least" }] },
          { mode: "your", lo: ["4Sp.01"], twm: ["TWM.06"], v: [
            { type: "chance", dev: { k: "bag", items: [["green", 6]] }, target: "green" },
            { type: "chance", dev: { k: "bag", items: [["red", 4], ["blue", 4]] }, target: "red" },
            { type: "chance", dev: { k: "bag", items: [["yellow", 6]] }, target: "blue" }] },
          { mode: "your", lo: ["4Gg.09"], twm: ["TWM.05"], v: [{ type: "jugset", max: 2, per: 2, tick: 3 }, { type: "jugset", max: 3, per: 2, tick: 5 }, { type: "jugset", max: 2, per: 4, tick: 5 }] },
          { mode: "your", lo: ["4Gg.09"], twm: ["TWM.05"], v: [{ type: "scaleread", dev: "jug", max: 3, per: 2, tick: 3, at: 1 }, { type: "scaleread", dev: "jug", max: 2, per: 4, tick: 6, at: 2 }, { type: "scaleread", dev: "jug", max: 3, per: 2, tick: 1, at: 0 }] }] } }]
    },
    // Practise: the v2 Stop 9 slots (Draw it, Solve it) with TWM tags; the first question links the scale card
    practise: [
      { id: 's9r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Read scales and results tables.', vi: 'Đọc vạch chia và bảng kết quả.' },
        levels: [
      { title: { en: "Read the scale", vi: "Đọc vạch chia" }, rounds: [
          { mode: "our", lo: ["4Gg.09"], twm: ["TWM.05"], v: [
            { type: "scaleread", dev: "line", max: 4, per: 2, tick: 3, as: "write", ctx: "Look at the [[scale]]." },
            { type: "scaleread", dev: "line", max: 5, per: 2, tick: 7, as: "write", ctx: "Look at the [[scale]]." },
            { type: "scaleread", dev: "line", max: 3, per: 4, tick: 5, as: "write", ctx: "Look at the [[scale]]." }] },
          { mode: "your", lo: ["4Gg.09"], twm: ["TWM.05"], v: [{ type: "scalestep", dev: "line", max: 3, per: 4, at: 1 }, { type: "scalestep", dev: "jug", max: 2, per: 2, at: 0 }, { type: "scalestep", dev: "line", max: 2, per: 5, at: 2 }] }] },
      { title: { en: "Results", vi: "Kết quả" }, rounds: [
          { mode: "your", lo: ["4Sp.02"], twm: ["TWM.06"], v: [
            { type: "tallyfill", intro: "These counters came out of a bag, one at a time.", dev: "bag", names: ["green", "red", "blue"], seq: S("G R G B G R G G R B G R") },
            { type: "tallyfill", intro: "A spinner landed on these colours, one after the other.", dev: "spinner", names: ["purple", "orange", "green"], seq: S("P O G P P G O P G O P G") },
            { type: "tallyfill", intro: "These counters came out of a bag, one at a time.", dev: "bag", names: ["yellow", "blue"], seq: S("Y B Y Y B Y B Y Y B Y B") }] },
          { mode: "your", lo: ["4Sp.02"], twm: ["TWM.03"], v: [
            { type: "results", intro: "A spinner is spun 20 times. The table shows the results.", col: "Colour", end: "to come up next", rows: [["Green", 4], ["Purple", 9], ["Orange", 2], ["Pink", 5]], ask: "most" },
            { type: "results", intro: BAG30, col: "Colour", end: "to come out next", rows: [["Red", 16], ["Green", 8], ["Yellow", 6]], ask: "most" },
            { type: "results", intro: ANI24, col: "Animal", end: "to come up next", rows: [["Cat", 7], ["Dog", 12], ["Fish", 5]], ask: "most" }] },
          { mode: "your", lo: ["4Sp.02"], twm: ["TWM.03"], v: [
            { type: "results", intro: BAG20, col: "Colour", end: "to come out next", rows: [["Blue", 13], ["Green", 5], ["Red", 2]], ask: "least" },
            { type: "results", intro: ANI24, col: "Animal", end: "to come up next", rows: [["Bird", 3], ["Frog", 9], ["Rabbit", 12]], ask: "least" },
            { type: "results", intro: "A spinner is spun 40 times. The table shows the results.", col: "Colour", end: "to come up next", rows: [["Purple", 10], ["Pink", 6], ["Orange", 14], ["Green", 10]], ask: "least" }] }] }] },
      { id: 's9a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "How likely?", vi: "Khả năng ra sao?" }, rounds: [
          { mode: "your", lo: ["4Sp.02"], twm: ["TWM.03"], v: [
            { type: "results", intro: BAG30, col: "Colour", end: "to come out next", rows: [["Green", 17], ["Yellow", 9], ["Red", 4]], ask: "most" },
            { type: "results", intro: ANI24, col: "Animal", end: "to come up next", rows: [["Tiger", 5], ["Panda", 13], ["Koala", 6]], ask: "most" },
            { type: "results", intro: "A spinner is spun 40 times. The table shows the results.", col: "Colour", end: "to come up next", rows: [["Purple", 8], ["Orange", 11], ["Pink", 21]], ask: "most" }] },
          { mode: "your", lo: ["4Sp.01"], twm: ["TWM.06", "TWM.01"], v: [
            { type: "ematch", order: ["maybe", "certain", "likely", "impossible"], items: [{ t: "The sun will rise tomorrow morning.", w: "certain" }, { t: "A cow will fly over the school.", w: "impossible" }, { t: "A coin will land on heads.", w: "maybe", p: [1, 2] }, { t: "You pick green from 9 green counters and 1 red counter.", w: "likely", p: [9, 10] }] },
            { type: "ematch", order: ["likely", "impossible", "certain", "maybe"], items: [{ t: "You roll an even number on a dice.", w: "maybe", p: [3, 6] }, { t: "Ice will melt in a hot pan.", w: "certain" }, { t: "You pick red from 8 red counters and 2 blue counters.", w: "likely", p: [8, 10] }, { t: "A fish will climb a tree.", w: "impossible" }] },
            { type: "ematch", order: ["certain", "maybe", "impossible", "likely"], items: [{ t: "You pick blue from a bag of yellow counters.", w: "impossible" }, { t: "You pick pink from 7 pink counters and 1 green counter.", w: "likely", p: [7, 8] }, { t: "It will get dark tonight.", w: "certain" }, { t: "A spinner that is half green lands on green.", w: "maybe", p: [1, 2] }] }] }] },
      { title: { en: "Scales and spinners", vi: "Vạch chia và vòng quay" }, rounds: [
          { mode: "your", lo: ["4Gg.09"], twm: ["TWM.05"], v: [{ type: "scaleread", dev: "line", max: 5, per: 2, tick: 7, at: 2 }, { type: "scaleread", dev: "jug", max: 2, per: 4, tick: 5, at: 0 }, { type: "scaleread", dev: "line", max: 4, per: 4, tick: 11, at: 1 }] },
          { mode: "your", lo: ["4Sp.01"], twm: ["TWM.06"], v: [
            { type: "chance", dev: { k: "spinner", parts: ["green", "green", "green", "purple"] }, target: "green" },
            { type: "chance", dev: { k: "spinner", parts: ["orange", "pink"] }, target: "orange" },
            { type: "chance", dev: { k: "spinner", parts: ["purple", "purple", "purple", "purple"] }, target: "green" }] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["4Sp.01", "4Sp.02"], twm: ["TWM.07", "TWM.04"], v: [
            { type: "claim", who: "Giang", ok: false, at: 1, fact: { k: "nextsure", counts: [14, 6] }, fig: TB([["Green", 14], ["Red", 6]]),
              ctx: "Giang picks a counter from a bag 20 times. The table shows the results.", says: "The next counter is certain to be green.",
              reasons: [
                { t: "red can still come out. Green is likely, but not certain." },
                { t: "green came out the most times.", why: "That makes green likely. It does not make green certain." },
                { t: "the bag has no red counters.", why: "Red came out 6 times. So there are red counters in the bag." }],
              hint: { step: "Certain means it happens every time. Can another colour still come out?" },
              worked: "Red came out 6 times, so red is in the bag. The next counter can be red. Green is likely, not certain.",
              model: "Giang is incorrect because red can still come out, so green is likely but not certain." },
            { type: "claim", who: "Hieu", ok: true, at: 0, fact: { k: "mostcount", counts: [3, 15, 2], i: 1 }, fig: TB([["Purple", 3], ["Orange", 15], ["Green", 2]]),
              ctx: "Hieu spins a spinner 20 times. The table shows the results.", says: "Orange is the most likely colour next time.",
              reasons: [
                { t: "orange came up the most times: 15 out of 20." },
                { t: "orange is the brightest colour.", why: "How bright a colour is does not change the chance." },
                { t: "orange came up fewer times than purple.", why: "Read the table again: orange 15, purple 3." }],
              hint: { step: "Which colour has the biggest number in the table?" },
              worked: "Orange came up 15 times. That is the biggest number in the table. So orange is most likely next time.",
              model: "Hieu is correct because orange came up the most times, 15 out of 20." },
            { type: "claim", who: "Thu", ok: false, at: 2, fact: { k: "lik", target: "green", says: "certain" }, fig: { k: "spinner", parts: ["green", "green", "green", "purple"] },
              ctx: "Look at the spinner.", says: "Landing on green is certain.",
              reasons: [
                { t: "one part is purple, so the spinner can land on purple." },
                { t: "three parts are green.", why: "Three of the four parts are green. That makes green likely, not certain." },
                { t: "green is impossible on this spinner.", why: "Three parts are green, so green can happen." }],
              hint: { step: "Certain means every part is green. Is every part green?" },
              worked: "Three parts are green and one part is purple. The spinner can land on purple. So green is likely, not certain.",
              model: "Thu is incorrect because one part is purple, so green is likely but not certain." }] }] }] }
    ],
    // Notes: from v2 notes and tips, new examples and a new note (tally); one check sentence per note (test/stop-steps.mjs)
    notes: {
      items: [
        { en: '[[Impossible|impossible]] means it cannot happen. [[Certain|certain]] means it will happen for sure.',
          vi: 'Không thể nghĩa là việc đó không bao giờ xảy ra. Chắc chắn nghĩa là việc đó chắc chắn sẽ xảy ra.',
          example: ['A bag has only blue counters.', 'Picking blue is *certain*. Picking red is *impossible*.'],
          pic: { k: 'bag', items: [['blue', 6]] } },
        { en: '[[Likely|likely]] means it will probably happen. [[Maybe|maybe]] means it might happen, or it might not.',
          vi: 'Có nhiều khả năng nghĩa là việc đó thường sẽ xảy ra. Có thể nghĩa là việc đó có khi xảy ra, có khi không.',
          example: ['3 of the 4 parts are green. Green is *likely*.', 'Half of the parts are pink. Pink is *maybe*.'],
          pic: [{ k: 'spinner', parts: ['green', 'green', 'orange', 'green'] }, { k: 'spinner', parts: ['pink', 'blue', 'pink', 'blue'] }] },
        { en: 'In an experiment, draw a [[tally]] mark for each result. Count the marks in fives.',
          vi: 'Trong thí nghiệm, vẽ một vạch đếm cho mỗi kết quả. Đếm các vạch theo nhóm năm.',
          example: ['Four lines and one across make 5.', 'One group of 5 and 2 more make *7*.'],
          pic: { k: 'tally', rows: [['green', 7], ['orange', 3]] } },
        { en: 'In a results table, the biggest number shows what is most likely next time. The smallest shows the least likely.',
          vi: 'Trong bảng kết quả, số lớn nhất cho biết điều gì có nhiều khả năng xảy ra nhất lần sau. Số nhỏ nhất là ít khả năng nhất.',
          example: ['Blue 11, red 4, green 5.', 'Blue is *most likely*. Red is least likely.'],
          pic: TB([['Blue', 11], ['Red', 4], ['Green', 5]]) },
        { en: 'On a [[scale]], first count the small steps from 0 to 1. 2 steps: each is one half. 4 steps: each is one quarter.',
          vi: 'Trên thang đo, trước hết đếm số vạch nhỏ từ 0 đến 1. 2 vạch: mỗi vạch là một nửa. 4 vạch: mỗi vạch là một phần tư.',
          example: ['From 0 to 1 on this jug there are 2 small steps.', 'The water is 3 steps up: *1 and a half* [[litres|litre]].'],
          pic: { k: 'jug', max: 2, per: 2, level: 3 } },
        { en: 'Read a scale in two parts: the whole number the arrow has passed, then the small steps after it.',
          vi: 'Đọc thang đo theo hai phần: số nguyên mà mũi tên vừa đi qua, rồi các vạch nhỏ sau số đó.',
          example: ['Each step is one quarter. The arrow is 3 steps after 2.', 'It shows *2 and three quarters* [[kilograms|kilogram]].'],
          pic: { k: 'scale', min: 0, max: 3, per: 4, at: 11, cap: 'kilograms (kg)' } }
      ],
      check: [
        { sentence: 'A bag has only red counters. Picking red is {certain|impossible|maybe}.', answer: 'certain' },
        { sentence: '6 red and 2 blue counters. Picking red is {likely|certain|impossible}.', answer: 'likely' },
        { sentence: 'Two groups of 5 and 1 more make {11|21|7}.', answer: '11' },
        { sentence: 'Results: yellow 3, purple 12, pink 6. Least likely next is {purple|yellow|pink}.', answer: 'yellow' },
        { sentence: 'A scale has 4 equal steps from 0 to 1. Each step is {one quarter|one fifth|4}.', answer: 'one quarter' },
        { sentence: 'Each step is one half. The arrow is 1 step after 3. It shows {3 and a quarter|4|3 and a half} kg.', answer: '3 and a half' }
      ]
    },
    // Mini Practice test: written fresh for v3, 4 at DOK 1 (a chance word, the most likely of 3, one small step, a reading in
    // halves), 5 at DOK 2 (results into a table, a total, the least likely of 4, four sentences to four words, a reading in
    // quarters written), 1 at DOK 3 (a claim about chance from an experiment or a spinner). 3 sets each (play 1 uses v[0]).
    test: {
      items: [
        { dok: 1, lo: ["4Sp.01"], twm: ["TWM.06"], v: [
          { type: "chance", dev: { k: "bag", items: [["pink", 7]] }, target: "pink" },
          { type: "chance", dev: { k: "bag", items: [["orange", 5]] }, target: "purple" },
          { type: "chance", dev: { k: "bag", items: [["green", 3], ["yellow", 3]] }, target: "green" }
        ] },
        { dok: 1, lo: ["4Sp.02"], twm: ["TWM.03"], v: [
          { type: "results", intro: "A spinner has fruit pictures. It is spun 25 times. The table shows the results.", col: "Fruit", end: "to come up next", rows: [["Mango", 6], ["Banana", 14], ["Lychee", 5]], ask: "most" },
          { type: "results", intro: "A counter is picked from a bag 18 times. It goes back each time. The table shows the results.", col: "Colour", end: "to come out next", rows: [["Pink", 4], ["Orange", 11], ["Purple", 3]], ask: "most" },
          { type: "results", intro: "A spinner has shapes on it. It is spun 30 times. The table shows the results.", col: "Shape", end: "to come up next", rows: [["Heart", 9], ["Star", 16], ["Circle", 5]], ask: "most" }
        ] },
        { dok: 1, lo: ["4Gg.09"], twm: ["TWM.05"], v: [
          { type: "scalestep", dev: "line", max: 3, per: 4, at: 0 },
          { type: "scalestep", dev: "jug", max: 3, per: 2, at: 2 },
          { type: "scalestep", dev: "line", max: 2, per: 5, at: 1 }
        ] },
        { dok: 1, lo: ["4Gg.09"], twm: ["TWM.05"], v: [
          { type: "scaleread", dev: "jug", max: 4, per: 2, tick: 5, at: 2 },
          { type: "scaleread", dev: "line", max: 6, per: 2, tick: 9, at: 0 },
          { type: "scaleread", dev: "jug", max: 2, per: 2, tick: 1, at: 1 }
        ] },
        { dok: 2, lo: ["4Sp.02"], twm: ["TWM.06"], v: [
          { type: "tallyfill", intro: "A spinner landed on these colours, one after the other.", dev: "spinner", names: ["green", "orange", "purple"], seq: S("G O G P G G O G P G O G") },
          { type: "tallyfill", intro: "These counters came out of a bag, one at a time.", dev: "bag", names: ["red", "blue", "yellow"], seq: S("R B R R Y R B R B R") },
          { type: "tallyfill", intro: "These counters came out of a bag, one at a time.", dev: "bag", names: ["pink", "green", "blue"], seq: S("K G K B K K G K G K B") }
        ] },
        { dok: 2, lo: ["4Sp.02"], twm: ["TWM.05"], v: [
          { type: "results", intro: "The table shows how many times a spinner landed on each fruit.", col: "Fruit", unit: "spins", rows: [["Mango", 8], ["Durian", 3], ["Lychee", 12]], ask: "total" },
          { type: "results", intro: "The table shows how many times each colour came out of a bag.", col: "Colour", unit: "picks", rows: [["Pink", 7], ["Orange", 9], ["Blue", 5]], ask: "total" },
          { type: "results", intro: "The table shows how many times a spinner landed on each shape.", col: "Shape", unit: "spins", rows: [["Heart", 6], ["Star", 11], ["Moon", 9]], ask: "total" }
        ] },
        { dok: 2, lo: ["4Sp.02"], twm: ["TWM.03"], v: [
          { type: "results", intro: "A spinner is spun 36 times. The table shows the results.", col: "Colour", end: "to come up next", rows: [["Green", 10], ["Purple", 12], ["Orange", 5], ["Pink", 9]], ask: "least" },
          { type: "results", intro: "A counter is picked from a bag 32 times. It goes back each time. The table shows the results.", col: "Colour", end: "to come out next", rows: [["Yellow", 11], ["Blue", 9], ["Red", 4], ["Green", 8]], ask: "least" },
          { type: "results", intro: "A spinner has pictures of animals. It is spun 28 times. The table shows the results.", col: "Animal", end: "to come up next", rows: [["Duck", 8], ["Goat", 6], ["Cat", 11], ["Pig", 3]], ask: "least" }
        ] },
        { dok: 2, lo: ["4Sp.01"], twm: ["TWM.06", "TWM.01"], v: [
          { type: "ematch", order: ["likely", "certain", "maybe", "impossible"], items: [{ t: "A dog will lay an egg.", w: "impossible" }, { t: "You pick pink from 6 pink counters and 2 yellow counters.", w: "likely", p: [6, 8] }, { t: "A spinner that is half orange lands on orange.", w: "maybe", p: [1, 2] }, { t: "Monday comes after Sunday.", w: "certain" }] },
          { type: "ematch", order: ["impossible", "maybe", "certain", "likely"], items: [{ t: "You roll a number less than 4 on a dice.", w: "maybe", p: [3, 6] }, { t: "A week has seven days.", w: "certain" }, { t: "You pick blue from 9 blue counters and 3 red counters.", w: "likely", p: [9, 12] }, { t: "A cat will read a book to you.", w: "impossible" }] },
          { type: "ematch", order: ["certain", "likely", "impossible", "maybe"], items: [{ t: "You pick red from 4 red and 4 blue counters.", w: "maybe", p: [4, 8] }, { t: "The day after Friday is Saturday.", w: "certain" }, { t: "You pick orange from 8 orange counters and 1 pink counter.", w: "likely", p: [8, 9] }, { t: "A pencil will turn into a frog.", w: "impossible" }] }
        ] },
        { dok: 2, lo: ["4Gg.09"], twm: ["TWM.05"], v: [
          { type: "scaleread", dev: "jug", max: 3, per: 4, tick: 9, as: "write" },
          { type: "scaleread", dev: "line", max: 4, per: 4, tick: 7, as: "write" },
          { type: "scaleread", dev: "line", max: 5, per: 4, tick: 14, as: "write" }
        ] },
        { dok: 3, lo: ["4Sp.01", "4Sp.02"], twm: ["TWM.07", "TWM.04"], v: [
          { type: "claim", who: "Nhi", ok: false, at: 1, fact: { k: "never", target: "purple", parts: ["green", "orange", "green", "purple"] }, fig: { k: "spinner", parts: ["green", "orange", "green", "purple"] },
            ctx: "Nhi spins this spinner 6 times. It never lands on purple.", says: "Landing on purple is impossible.",
            reasons: [
              { t: "one part of the spinner is purple, so it can still land on purple." },
              { t: "purple did not come up in 6 spins.", why: "That is true. But 6 spins are not every spin. Look at the spinner." },
              { t: "the spinner has no purple part.", why: "Look again: one of the 4 parts is purple." }],
            hint: { step: "Impossible means it can never happen. Is there a purple part on the spinner?" },
            worked: "One of the 4 parts is purple. So the spinner can land on purple. It is not impossible.",
            model: "Nhi is incorrect because one part is purple, so the spinner can land on purple." },
          { type: "claim", who: "Hung", ok: true, at: 0, fact: { k: "lesscount", counts: [4, 17, 9], i: 0, j: 2 }, fig: TB([["Red", 4], ["Blue", 17], ["Green", 9]]),
            ctx: "Hung picks a counter from a bag 30 times. It goes back each time. The table shows the results.", says: "Red is less likely than green to come out next.",
            reasons: [
              { t: "red came out 4 times and green came out 9 times." },
              { t: "red is a brighter colour than green.", why: "The colour does not change the chance. Look at the numbers." },
              { t: "red came out more times than green.", why: "Read the table again: red 4, green 9." }],
            hint: { step: "Find red and green in the table. Which number is smaller?" },
            worked: "Red came out 4 times. Green came out 9 times. 4 is less than 9, so red is less likely than green.",
            model: "Hung is correct because red came out 4 times and green came out 9 times." },
          { type: "claim", who: "Thuy", ok: false, at: 2, fact: { k: "mostcount", counts: [9, 9, 6], i: 0 }, fig: TB([["Orange", 9], ["Green", 9], ["Purple", 6]]),
            ctx: "Thuy spins a spinner 24 times. The table shows the results.", says: "Orange is the most likely colour next time.",
            reasons: [
              { t: "green came up 9 times too, the same as orange." },
              { t: "orange is at the top of the table.", why: "The place in the table does not matter. Look at the numbers." },
              { t: "orange came up 9 times.", why: "That is true. But look at green too." }],
            hint: { step: "Look at every number. Does orange have the biggest number on its own?" },
            worked: "Orange came up 9 times and green came up 9 times. They are the same, so orange is not more likely than green.",
            model: "Thuy is incorrect because green came up 9 times too, the same as orange." }
        ] }
      ]
    },
    // Lightning: the 72 v2 LPOOL[9] questions ("7 blue counters and 1 yellow counter" corrected)
    lightning: {
      secs: 60,
      items: [
        ["A bag has only blue counters. Picking blue is",["certain","likely","impossible"]],["A bag has only green counters. Picking green is",["certain","likely","impossible"]],
        ["A bag has only yellow counters. Picking yellow is",["certain","likely","impossible"]],["A bag has only red counters. Picking red is",["certain","likely","impossible"]],
        ["A bag has only blue counters. Picking green is",["impossible","maybe","certain"]],["A bag has only blue counters. Picking yellow is",["impossible","maybe","certain"]],
        ["A bag has only yellow counters. Picking green is",["impossible","maybe","certain"]],["A bag has only red counters. Picking yellow is",["impossible","maybe","certain"]],
        ["A bag has only red counters. Picking blue is",["impossible","maybe","certain"]],["A bag has only green counters. Picking blue is",["impossible","maybe","certain"]],
        ["A bag has only green counters. Picking red is",["impossible","maybe","certain"]],["A bag has only red counters. Picking green is",["impossible","maybe","certain"]],
        ["4 blue and 4 green counters. Picking green is",["maybe","certain","impossible"]],["5 yellow and 5 green counters. Picking green is",["maybe","certain","impossible"]],
        ["4 red and 4 yellow counters. Picking red is",["maybe","certain","impossible"]],["3 green and 3 blue counters. Picking green is",["maybe","certain","impossible"]],
        ["3 red and 3 green counters. Picking green is",["maybe","certain","impossible"]],["2 red and 2 green counters. Picking red is",["maybe","certain","impossible"]],
        ["6 blue and 2 green counters. Picking blue is",["likely","certain","impossible"]],["8 yellow and 2 blue counters. Picking yellow is",["likely","certain","impossible"]],
        ["7 blue counters and 1 yellow counter. Picking blue is",["likely","certain","impossible"]],["7 yellow counters and 1 red counter. Picking yellow is",["likely","certain","impossible"]],
        ["8 green and 2 blue counters. Picking green is",["likely","certain","impossible"]],["9 green counters and 1 blue counter. Picking green is",["likely","certain","impossible"]],
        ["Results: green 3, purple 8, orange 12. Most likely next is",["orange","green","purple"]],["Results: pink 1, orange 7, purple 11. Most likely next is",["purple","pink","orange"]],
        ["Results: orange 12, purple 8, pink 3. Most likely next is",["orange","purple","pink"]],["Results: purple 2, pink 6, green 11. Most likely next is",["green","purple","pink"]],
        ["Results: pink 14, green 9, purple 1. Most likely next is",["pink","green","purple"]],["Results: orange 15, purple 4, green 9. Most likely next is",["orange","purple","green"]],
        ["Results: purple 4, green 8, orange 11. Most likely next is",["orange","purple","green"]],["Results: pink 7, orange 14, purple 3. Most likely next is",["orange","pink","purple"]],
        ["Results: pink 16, orange 6, purple 1. Most likely next is",["pink","orange","purple"]],["Results: pink 11, orange 6, purple 3. Most likely next is",["pink","orange","purple"]],
        ["Results: green 3, purple 8, orange 12. Least likely next is",["green","purple","orange"]],["Results: pink 1, orange 7, purple 11. Least likely next is",["pink","orange","purple"]],
        ["Results: orange 12, purple 8, pink 3. Least likely next is",["pink","orange","purple"]],["Results: purple 2, pink 6, green 11. Least likely next is",["purple","pink","green"]],
        ["Results: pink 14, green 9, purple 1. Least likely next is",["purple","pink","green"]],["Results: orange 15, purple 4, green 9. Least likely next is",["purple","orange","green"]],
        ["Results: purple 4, green 8, orange 11. Least likely next is",["purple","green","orange"]],["Results: pink 7, orange 14, purple 3. Least likely next is",["purple","pink","orange"]],
        ["Results: pink 16, orange 6, purple 1. Least likely next is",["purple","pink","orange"]],["Results: pink 11, orange 6, purple 3. Least likely next is",["purple","pink","orange"]],
        ["Results: 11, 3 and 4. Total tries",["18","14","28"]],["Results: 14, 9 and 3. Total tries",["26","23","36"]],
        ["Results: 11, 8 and 4. Total tries",["23","19","33"]],["Results: 14, 6 and 4. Total tries",["24","20","34"]],
        ["Results: 7, 5 and 3. Total tries",["15","12","25"]],["Results: 7, 6 and 2. Total tries",["15","13","25"]],
        ["Results: 9, 8 and 3. Total tries",["20","17","30"]],["Results: 7, 3 and 4. Total tries",["14","10","24"]],
        ["A scale has 5 equal steps from 0 to 1. Each step is",["1/5","1/6","5"]],["A scale has 2 equal steps from 0 to 1. Each step is",["1/2","1/3","2"]],
        ["A scale has 4 equal steps from 0 to 1. Each step is",["1/4","1/5","4"]],["A scale has 10 equal steps from 0 to 1. Each step is",["1/10","1/11","10"]],
        ["A scale has 3 equal steps from 0 to 1. Each step is",["1/3","1/4","3"]],["Halfway between 6 and 7 on a scale is",["6 1/2","6 1/4","7 1/2"]],
        ["Halfway between 1 and 2 on a scale is",["1 1/2","1 1/4","2 1/2"]],["Halfway between 5 and 6 on a scale is",["5 1/2","5 1/4","6 1/2"]],
        ["Halfway between 8 and 9 on a scale is",["8 1/2","8 1/4","9 1/2"]],["Halfway between 3 and 4 on a scale is",["3 1/2","3 1/4","4 1/2"]],
        ["Each step is 1/4. The arrow is 1 step after 4. It shows",["4 1/4","5","4 1/2"]],["Each step is 1/4. The arrow is 3 steps after 2. It shows",["2 3/4","5","2 1/2"]],
        ["Each step is 1/4. The arrow is 3 steps after 3. It shows",["3 3/4","6","3 1/2"]],["Each step is 1/4. The arrow is 2 steps after 3. It shows",["3 1/2","5","3 1/4"]],
        ["Each step is 1/2. The arrow is 1 step after 2. It shows",["2 1/2","3","2 1/4"]],["Each step is 1/2. The arrow is 1 step after 1. It shows",["1 1/2","2","1 1/4"]],
        ["Each step is 1/2. The arrow is 1 step after 3. It shows",["3 1/2","4","3 1/4"]],["Each step is 1/2. The arrow is 1 step after 4. It shows",["4 1/2","5","4 1/4"]],
        ["Each step is 1/4. The arrow is 1 step after 5. It shows",["5 1/4","6","5 1/2"]],["Each step is 1/4. The arrow is 3 steps after 6. It shows",["6 3/4","9","6 1/2"]]
      ]
    },
    // Self-check: the 4 v2 goals in order (the dashboard reads them by number), again: c See it, r and a Practise
    selfcheck: {
      goals: ["do a chance experiment and record the results", "use the words certain, likely, maybe and impossible", "say what is most likely or least likely from a results table", "read a scale that has fractions"],
      again: ["c", "a", "r", "r"]
    }
  };
})(window.T = window.T || {});
