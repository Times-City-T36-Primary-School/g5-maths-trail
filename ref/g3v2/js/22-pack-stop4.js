/* 22-pack-stop4.js - ALL the content of Stop 4, Add and subtract (shape: docs/02-architecture.md).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The tools (take away with blocks, the
   balance scale, counters in pairs) and the pictures (a written sum on squared paper, a bar model, pictures with + and =)
   are in src/toolkit/39-tools-sums.js; the blocks that join are the mat (39-mat.js). The new model colfix (spot the
   mistake in a written calculation, then correct it) is in src/models/06-mtasks9b.js. */
(function (T) {
  'use strict';

  T.packs[4] = {
    n: 4,
    title: "Add and subtract",
    los: ["4Ni.02", "4Nc.03", "4Nc.02"],   // the learning objectives (shown to teachers under the last note)
    blurb: {
      en: "*Add* and *subtract* 3-digit numbers. Estimate first, then check your answer.",
      vi: "*Cộng* và *trừ* các số có 3 chữ số. Ước lượng trước, rồi kiểm tra đáp án."
    },
    // Words: the 6 Maths v2 Stop 4 key words (WORDS with s: 4; vi and meaning as in v2) and three new ones (column method,
    // inverse, pair), in three sets of picture cards with a quick check. The pictures are in src/art/08-art-words-4.js.
    words: {
      sets: [
        { id: 'A', title: { en: 'Add and subtract', vi: 'Cộng và trừ' }, keys: ['sum', 'difference', 'column method'] },
        { id: 'B', title: { en: 'Check your answer', vi: 'Kiểm tra đáp án' }, keys: ['estimate', 'inverse', 'equal'] },
        { id: 'C', title: { en: 'Odd and even', vi: 'Số lẻ và số chẵn' }, keys: ['pair', 'odd number', 'even number'] }
      ],
      items: {
        'sum': { art: 'w-sum', vi: 'tổng', def: 'The answer when you add. The sum of 20 and 30 is 50.' },
        'difference': { art: 'w-difference', vi: 'hiệu', def: 'The answer when you subtract. The difference between 50 and 20 is 30.' },
        'column method': { art: 'w-column-method', vi: 'đặt tính theo cột dọc', def: 'A way to add or subtract. Write the numbers in columns, ones under ones. Start with the ones.' },
        'estimate': { art: 'w-estimate', vi: 'ước lượng', def: 'A sensible guess that is close to the exact answer. Round the numbers first.' },
        'inverse': { art: 'w-inverse', vi: 'phép tính ngược lại', def: 'The opposite. Adding and subtracting undo each other. 30 + 20 = 50, so 50 − 20 = 30.' },
        'equal': { art: 'w-equal', vi: 'bằng nhau', def: 'The same amount. The two sides of the = sign are equal.' },
        'pair': { art: 'w-pair', vi: 'cặp (hai cái đi cùng nhau)', def: 'Two things that go together. 8 counters make 4 pairs.' },
        'odd number': { art: 'w-odd-number', vi: 'số lẻ', def: 'A number with one left over when you make pairs. It ends in 1, 3, 5, 7 or 9.' },
        'even number': { art: 'w-even-number', vi: 'số chẵn', def: 'A number that makes pairs with none left over. It ends in 0, 2, 4, 6 or 8.' }
      }
    },
    // See it: Concrete. Three hands-on scenes (add with blocks and join 10 ones into a ten, then 10 tens into a hundred;
    // take away by breaking a ten and a hundred; odd + odd = even with counters in pairs), then the challenge: the 5 v2
    // "Build it" slots (CONTENT[4].stages[0]) with TWM tags.
    see: {
      scenes: [
        { id: 'add', title: { en: 'Add with blocks', vi: 'Cộng bằng các khối' }, tool: 'mat',
          pic: { k: 'col', a: 256, b: 178, op: '+' },
          mat: { b: [0, 3, 12, 14], counts: true, multi: true },
          steps: [
            { can: { join: ['o'] }, wait: 'join',
              zip: { en: '*14* ones is too many. Tap *Join 10*.', vi: '*14* đơn vị là quá nhiều. Bấm *Join 10* (Gộp 10).' },
              then: { en: '10 ones make *1 ten*. Now there are 13 tens.', vi: '10 đơn vị thành *1 chục*. Bây giờ có 13 chục.' } },
            { can: { join: ['t'] }, wait: 'join',
              zip: { en: '*13* tens is too many. Join 10 again.', vi: '*13* chục là quá nhiều. Gộp 10 lần nữa nhé.' },
              then: { en: '10 tens make *1 hundred*. 256 + 178 = *434*!', vi: '10 chục thành *1 trăm*. 256 + 178 = *434*!' } }] },
        { id: 'take', title: { en: 'Take away', vi: 'Bớt đi' }, tool: 'takeaway',
          pic: { k: 'col', a: 432, b: 156, op: '-' },
          takeaway: { b: [0, 4, 3, 2], take: [0, 1, 5, 6] },
          steps: [
            { can: { brk: ['t'] }, wait: 'brk',
              zip: { en: 'We need 6 ones. Tap a *ten* to break it.', vi: 'Cần 6 đơn vị. Bấm vào một *chục* để tách ra.' },
              then: { en: '1 ten became *10 ones*. That makes 12 ones.', vi: '1 chục thành *10 đơn vị*. Vậy là có 12 đơn vị.' } },
            { can: { brk: ['h'] }, wait: 'brk',
              zip: { en: 'We need 5 tens. Break a *hundred*.', vi: 'Cần 5 chục. Hãy tách một *trăm*.' },
              then: { en: '1 hundred became *10 tens*. That makes 12 tens.', vi: '1 trăm thành *10 chục*. Vậy là có 12 chục.' } },
            { can: { take: true }, wait: 'take',
              zip: { en: 'Now there are enough. Tap *Take away 156*.', vi: 'Bây giờ đã đủ. Bấm *Take away 156* (Bớt đi 156).' },
              then: { en: '432 − 156 = *276*. The difference is 276!', vi: '432 − 156 = *276*. Hiệu là 276!' } }] },
        { id: 'pairs', title: { en: 'Odd and even', vi: 'Số lẻ và số chẵn' }, tool: 'pairs',
          pairs: { groups: [7, 5] },
          steps: [
            { can: { pair: 0 }, wait: 'pair',
              zip: { en: 'Put the *7* counters in pairs. Tap the button.', vi: 'Xếp *7* hạt thành từng cặp. Bấm vào nút.' },
              then: { en: '1 is left over, so 7 is *odd*.', vi: 'Còn thừa 1 hạt, nên 7 là số *lẻ*.' } },
            { can: { pair: 1 }, wait: 'pair',
              zip: { en: 'Now put the *5* counters in pairs.', vi: 'Bây giờ xếp *5* hạt thành từng cặp.' },
              then: { en: '5 is odd too. 1 is left over.', vi: '5 cũng là số lẻ. Còn thừa 1 hạt.' } },
            { can: { join: true }, wait: 'join',
              zip: { en: 'Tap *Put together*. What happens?', vi: 'Bấm *Put together* (Gộp lại). Điều gì xảy ra?' },
              then: { en: 'The two left over make a pair! *Odd + odd = even*.', vi: 'Hai hạt thừa ghép thành một cặp! *Lẻ + lẻ = chẵn*.' } }] },
        { id: 'challenge', title: { en: 'Add, take away, balance', vi: 'Cộng, bớt, cân bằng' },
          challenge: {
            end: { en: 'You did it! You can add and take away.', vi: 'Em làm được rồi! Em biết cộng và trừ.' },
            result: 'You joined, broke and took away blocks, balanced a scale and made pairs.',
            rounds: [
          { mode: "our", lo: ["4Ni.02"], twm: ["TWM.05"], v: [{ type: "addmat", a: 248, b: 135 }, { type: "addmat", a: 326, b: 147 }, { type: "addmat", a: 419, b: 263 }] },
          { mode: "our", lo: ["4Ni.02"], twm: ["TWM.05"], v: [{ type: "submat", a: 342, b: 127 }, { type: "submat", a: 453, b: 218 }, { type: "submat", a: 571, b: 236 }] },
          { mode: "your", lo: ["4Ni.02"], twm: ["TWM.05"], v: [{ type: "addmat", a: 276, b: 158 }, { type: "addmat", a: 185, b: 347 }, { type: "addmat", a: 468, b: 274 }] },
          { mode: "your", lo: ["4Nc.03"], twm: ["TWM.02"], v: [
            { type: "eqbox", l: [25, "+", null], r: [40], scale: true },
            { type: "eqbox", l: [null, "+", 30], r: [20, "+", 45], scale: true },
            { type: "eqbox", l: [60], r: [null, "+", 18], scale: true }] },
          { mode: "your", lo: ["4Nc.02"], twm: ["TWM.05"], v: [{ type: "oddeven", a: 7, b: 5, op: "+", at: 1 }, { type: "oddeven", a: 8, b: 5, op: "+", at: 0 }, { type: "oddeven", a: 9, b: 7, op: "+", at: 0 }] }] } }]
    },
    // Practise: Pictorial (Draw it: the column method on squared paper, estimates, bar models and missing numbers) then
    // Abstract (Solve it, like the test). The rounds are the Maths v2 Stop 4 slots (data/v2/mdata4.js CONTENT[4] stages
    // 2 and 3) with TWM tags; in Solve it, a new round (spot the mistake in a written calculation, then correct it: the v3
    // model colfix) takes the place of the v2 missing number round (still in Draw it and the Mini Practice test).
    practise: [
      { id: 's4r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Columns, estimates and bar models.', vi: 'Đặt tính theo cột, ước lượng và sơ đồ đoạn thẳng.' },
        levels: [
      { title: { en: "Add and subtract in columns", vi: "Cộng và trừ theo cột" }, rounds: [
          { mode: "our", lo: ["4Ni.02"], twm: ["TWM.05"], v: [{ type: "col", a: 367, b: 245, op: "+", text: "Find the [[sum]]." }, { type: "col", a: 428, b: 357, op: "+", text: "Find the [[sum]]." }, { type: "col", a: 586, b: 247, op: "+", text: "Find the [[sum]]." }] },
          { mode: "your", lo: ["4Ni.02"], twm: ["TWM.05"], v: [{ type: "col", a: 532, b: 218, op: "-", text: "Find the [[difference]]." }, { type: "col", a: 641, b: 325, op: "-", text: "Find the [[difference]]." }, { type: "col", a: 754, b: 468, op: "-", text: "Find the [[difference]]." }] }] },
      { title: { en: "Estimate and missing numbers", vi: "Ước lượng và số còn thiếu" }, rounds: [
          { mode: "your", lo: ["4Ni.02"], twm: ["TWM.02"], v: [{ type: "estimate", a: 297, b: 412, op: "+", to: 100 }, { type: "estimate", a: 788, b: 307, op: "-", to: 100 }, { type: "estimate", a: 52, b: 39, op: "+", to: 10 }] },
          { mode: "your", lo: ["4Nc.03"], twm: ["TWM.02"], v: [
            { type: "eqbox", l: [null, "+", 45], r: [120], bar: true },
            { type: "eqbox", l: [150, "-", null], r: [85], bar: true },
            { type: "eqbox", l: [null, "-", 30], r: [55], bar: true }] },
          { mode: "your", lo: ["4Nc.03"], twm: ["TWM.02"], v: [
            { type: "eqbox", l: [70, "-", null], r: [15, "+", 25] },
            { type: "eqbox", l: [45, "+", 35], r: [null, "-", 20] },
            { type: "eqbox", l: [null, "+", 40], r: [130, "-", 50] }] }] }] },
      { id: 's4a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Calculate and check", vi: "Tính và kiểm tra" }, rounds: [
          { mode: "your", lo: ["4Ni.02"], twm: ["TWM.05"], v: [
            { type: "sumdiff", items: [{ a: 457, op: "+", b: 268 }, { a: 742, op: "-", b: 316 }] },
            { type: "sumdiff", items: [{ a: 863, op: "-", b: 427 }, { a: 376, op: "+", b: 459 }] },
            { type: "sumdiff", items: [{ a: 648, op: "+", b: 173 }, { a: 925, op: "-", b: 548 }] }] },
          { mode: "your", lo: ["4Ni.02"], twm: ["TWM.07", "TWM.08"], v: [
            { type: "colfix", who: "Thu", a: 365, b: 278, op: "+", slip: "carry", at: 0 },
            { type: "colfix", who: "Bao", he: true, a: 714, b: 358, op: "-", slip: "flip", at: 1 },
            { type: "colfix", who: "Nhung", a: 623, b: 247, op: "-", slip: "used", at: 2 }] }] },
      { title: { en: "Pictures and patterns", vi: "Hình ảnh và quy luật" }, rounds: [
          { mode: "your", lo: ["4Nc.03"], twm: ["TWM.05"], v: [
            { type: "piceq", img: "star", one: "star", many: "stars", n1: 3, total: 24, n2: 5, unit: "points", text: "In Zip's game you can win stars." },
            { type: "piceq", img: "bolt-gold", one: "bolt", many: "bolts", n1: 4, total: 36, n2: 2, unit: "points", text: "In Zip's game you can win bolts." },
            { type: "piceq", img: "medal-gold", one: "medal", many: "medals", n1: 5, total: 60, n2: 3, unit: "points", text: "In Zip's game you can win medals." }] },
          { mode: "your", lo: ["4Nc.02"], twm: ["TWM.02", "TWM.01"], v: [
            { type: "parityrow", who: "Diep", start: "odd", adds: ["even", "odd", "odd"], wrong: [["odd", "even", "odd", "even"], ["odd", "odd", "even", "even"], ["odd", "even", "even", "odd"]], at: 2 },
            { type: "parityrow", who: "Cuong", he: true, start: "odd", adds: ["odd", "odd", "even"], wrong: [["odd", "even", "even", "odd"], ["odd", "odd", "even", "odd"], ["odd", "even", "odd", "even"]], at: 0 },
            { type: "parityrow", who: "Uyen", start: "even", adds: ["odd", "odd"], wrong: [["even", "even", "odd"], ["even", "odd", "odd"], ["even", "even", "even"]], at: 3 }] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["4Ni.02"], twm: ["TWM.07", "TWM.04"], v: [
            { type: "claim", who: "Kien", ok: false, at: 1, ctx: "Here are two calculations: <b>83 − 38</b> and <b>76 − 41</b>.", fact: { k: "estall", calcs: [[83, "-", 38], [76, "-", 41]], to: 10, rel: "<" },
              says: "When I round both numbers to the nearest 10, my estimate is always less than the exact answer.",
              reasons: [
                { t: "for 76 − 41 the estimate is 40, but the exact answer is 35. The estimate is more." },
                { t: "rounding always makes numbers smaller.", why: "Rounding can go up or down. 38 rounds up to 40." },
                { t: "both estimates are 40, so both are less.", why: "Compare each estimate with its own exact answer: 45 and 35." }],
              hint: { step: "Work out both calculations. Then round, and work out both estimates. Compare them." },
              worked: "83 − 38 = 45 and the estimate is 80 − 40 = 40. That is less. But 76 − 41 = 35 and the estimate is 80 − 40 = 40. That is more.",
              model: "Kien is incorrect because for 76 − 41 the estimate (40) is more than the exact answer (35)." },
            { type: "claim", who: "Vinh", ok: true, at: 0, ctx: "Here are two calculations: <b>44 + 33</b> and <b>52 + 24</b>.", fact: { k: "estall", calcs: [[44, "+", 33], [52, "+", 24]], to: 10, rel: "<" },
              says: "All four numbers round down to the nearest 10. So both estimates are less than the exact answers.",
              reasons: [
                { t: "40 + 30 = 70 is less than 77, and 50 + 20 = 70 is less than 76." },
                { t: "an estimate is always less than the exact answer.", why: "Not always. When numbers round up, the estimate can be more." },
                { t: "both estimates are 70, so the exact answers are the same too.", why: "The exact answers are 77 and 76. They are not the same." }],
              hint: { step: "Round each number down to the nearest 10 and add. Then work out the exact answers." },
              worked: "44 + 33 = 77 and the estimate is 40 + 30 = 70. 52 + 24 = 76 and the estimate is 50 + 20 = 70. Both estimates are less.",
              model: "Vinh is correct because 70 is less than 77 and 70 is less than 76." },
            { type: "claim", who: "Oanh", ok: false, at: 2, ctx: "Here are two calculations: <b>50 + 30</b> and <b>47 + 32</b>.", fact: { k: "estnever", calcs: [[50, "+", 30], [47, "+", 32]], to: 10 },
              says: "An estimate is never the same as the exact answer.",
              reasons: [
                { t: "50 + 30 = 80 and the estimate is also 80. They are the same." },
                { t: "an estimate is only a guess, so it is always wrong.", why: "An estimate can be exactly right, for example when the numbers are already round." },
                { t: "47 + 32 = 79 and the estimate is 80. They are different.", why: "That is true for this one. Now check 50 + 30 too." }],
              hint: { step: "Round the numbers in each calculation to the nearest 10. Is the estimate ever the same as the exact answer?" },
              worked: "50 and 30 are already round numbers. So the estimate for 50 + 30 is 80, and the exact answer is 80 too.",
              model: "Oanh is incorrect because for 50 + 30 the estimate and the exact answer are both 80." }] }] }] }
    ],
    // Notes: how to do it. Each note has a worked example and a picture made by the maths tools. From Maths v2
    // CONTENT[4].notes and tips, with new examples and one new note (check with the inverse). The check: one gap sentence
    // per note, in the same order (each right answer is worked out again by test/stop-steps.mjs).
    notes: {
      items: [
        { en: 'In the [[column method]], start with the ones. If a column makes 10 or more, [[regroup]] 1 to the next column.',
          vi: 'Khi đặt tính theo cột, bắt đầu từ hàng đơn vị. Nếu một cột được 10 trở lên, hãy nhớ 1 sang cột tiếp theo.',
          example: ['458 + 276: ones 8 + 6 = 14. Write 4 and regroup 1 ten.', 'Tens 5 + 7 + 1 = 13. Write 3 and regroup 1 hundred.', 'Hundreds 4 + 2 + 1 = 7. The [[sum]] is *734*.'],
          pic: { k: 'col', a: 458, b: 276, op: '+', ans: 734, marks: [1, 1, 0] } },
        { en: 'To subtract, start with the ones. If the top digit is too small, regroup 1 from the next column.',
          vi: 'Khi trừ, bắt đầu từ hàng đơn vị. Nếu chữ số ở trên nhỏ hơn, hãy mượn 1 từ cột tiếp theo.',
          example: ['742 − 365: 2 is less than 5. Regroup 1 ten: 12 − 5 = 7.', '3 tens are left. Regroup 1 hundred: 13 − 6 = 7.', 'Hundreds 6 − 3 = 3. The [[difference]] is *377*.'],
          pic: { k: 'col', a: 742, b: 365, op: '-', ans: 377 } },
        { en: 'An [[estimate]] tells you if your answer makes sense. Round each number first.',
          vi: 'Ước lượng giúp em biết đáp án có hợp lý không. Hãy làm tròn từng số trước.',
          example: ['487 + 306 is about 500 + 300 = 800.', 'The exact sum is 793. It is close to 800, so it makes sense.'],
          art: 'w-estimate' },
        { en: 'Check with the [[inverse]]. Add back to check a subtraction. Take away to check an addition.',
          vi: 'Kiểm tra bằng phép tính ngược lại. Cộng lại để kiểm tra phép trừ. Trừ đi để kiểm tra phép cộng.',
          example: ['632 − 257 = 375.', 'Check: 375 + 257 = 632. It is right!'],
          pic: { k: 'bar', whole: 632, parts: [257, 375] } },
        { en: 'The two sides of = are [[equal]]. Work out the side with no box first.',
          vi: 'Hai vế của dấu = bằng nhau. Hãy tính vế không có ô trống trước.',
          example: ['45 + ? = 30 + 40', '30 + 40 = 70, and 45 + 25 = 70. So the box is *25*.'],
          pic: { k: 'balance', left: [45, '+', null], right: [30, '+', 40], val: 25 } },
        { en: 'Odd + odd = even. Even + even = even. Odd + even = odd.',
          vi: 'Lẻ + lẻ = chẵn. Chẵn + chẵn = chẵn. Lẻ + chẵn = lẻ.',
          example: ['An [[odd number]] has 1 left over when you make [[pairs|pair]].', '7 + 5 = 12: the two left over make a new pair. 12 is an [[even number]].'],
          pic: { k: 'pairs', groups: [7, 5], sum: true } }
      ],
      check: [
        { sentence: '367 + 248 = {615|505|515}.', answer: '615' },
        { sentence: '804 − 356 = {448|552|458}.', answer: '448' },
        { sentence: 'Round to the nearest 100: 389 + 512 is about {900|800|1,000}.', answer: '900' },
        { sentence: 'To check 741 − 286 = 455, work out {455 + 286|741 + 286|455 − 286}.', answer: '455 + 286' },
        { sentence: '90 − {35|55|125} = 30 + 25.', answer: '35' },
        { sentence: 'Which sum is odd? {27 + 14|36 + 12|45 + 33}', answer: '27 + 14' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard, 4 at DOK 1, 5 at DOK 2, 1 at DOK 3 (T.DOK_MIX, docs/05).
    // Each item: dok (its real level, judged with T.DOK), lo, twm (1 or 2, T.TWM) and 3 fresh sets of numbers
    // (play 1 uses v[0]). Questions 1 to 8 use the Maths v2 Stop 4 models with new numbers, names and contexts (Nov 2026;
    // a one-step missing number and the odd and even rule are DOK 1: one routine step). Question 9 is new: spot the
    // mistake in a written calculation, then correct it (the v3 model colfix, 2 parts). Question 10 is a new general
    // claim about odd and even numbers, judged and justified with an example (DOK 3, Number strand).
    // Run by src/steps/70-test.js with the models; answers logged with game letter 'm' and dok.
    test: {
      items: [
        { dok: 1, lo: ["4Ni.02"], twm: ["TWM.05"], v: [
          { type: "sumdiff", items: [{ a: 476, op: "+", b: 358 }] },
          { type: "sumdiff", items: [{ a: 389, op: "+", b: 247 }] },
          { type: "sumdiff", items: [{ a: 563, op: "+", b: 279 }] }
        ] },
        { dok: 1, lo: ["4Ni.02"], twm: ["TWM.05"], v: [
          { type: "sumdiff", items: [{ a: 723, op: "-", b: 458 }] },
          { type: "sumdiff", items: [{ a: 841, op: "-", b: 376 }] },
          { type: "sumdiff", items: [{ a: 652, op: "-", b: 287 }] }
        ] },
        { dok: 1, lo: ["4Nc.03"], twm: ["TWM.02"], v: [
          { type: "eqbox", l: [null, "+", 47], r: [120] },
          { type: "eqbox", l: [95, "-", null], r: [38] },
          { type: "eqbox", l: [null, "-", 26], r: [64] }
        ] },
        { dok: 1, lo: ["4Nc.02"], twm: ["TWM.02"], v: [
          { type: "oddrule", x: "even", y: "even", op: "+", ex: [4, 6, 8, 2], at: 0 },
          { type: "oddrule", x: "odd", y: "even", op: "+", ex: [5, 4, 9, 2], at: 2 },
          { type: "oddrule", x: "even", y: "odd", op: "-", ex: [8, 3, 6, 1], at: 1 }
        ] },
        { dok: 2, lo: ["4Nc.03"], twm: ["TWM.02"], v: [
          { type: "eqbox", l: [120, "-", null], r: [35, "+", 45] },
          { type: "eqbox", l: [63, "+", 27], r: [null, "-", 40] },
          { type: "eqbox", l: [null, "+", 55], r: [200, "-", 65] }
        ] },
        { dok: 2, lo: ["4Nc.03"], twm: ["TWM.05"], v: [
          { type: "piceq", img: "medal-gold", one: "medal", many: "medals", n1: 4, total: 32, n2: 3, unit: "points", text: "In a quiz game you can win medals." },
          { type: "piceq", img: "star", one: "star", many: "stars", n1: 3, total: 27, n2: 5, unit: "points", text: "In a puzzle game you can win stars." },
          { type: "piceq", img: "bolt-gold", one: "bolt", many: "bolts", n1: 5, total: 40, n2: 2, unit: "points", text: "In a racing game you can win bolts." }
        ] },
        { dok: 2, lo: ["4Ni.02"], twm: ["TWM.02"], v: [
          { type: "estpick", a: 612, b: 187, op: "-", to: 100, wrong: [300, 800, 500], at: 2 },
          { type: "estpick", a: 296, b: 518, op: "+", to: 100, wrong: [700, 900, 1000], at: 0 },
          { type: "estpick", a: 68, b: 47, op: "+", to: 10, wrong: [100, 130, 150], at: 3 }
        ] },
        { dok: 2, lo: ["4Ni.02"], twm: ["TWM.01"], v: [
          { type: "sumstory", a: 645, b: 278, op: "-", unit: "mangoes", text: "A fruit stall has <b>645</b> mangoes. It sells <b>278</b> of them. How many mangoes are left?" },
          { type: "sumstory", a: 386, b: 457, op: "+", unit: "tickets", text: "A school sells <b>386</b> tickets on Monday and <b>457</b> tickets on Tuesday. How many tickets is that altogether?" },
          { type: "sumstory", a: 912, b: 345, op: "-", unit: "pages", text: "A book has <b>912</b> pages. Bao has read <b>345</b> pages. How many pages are left to read?" }
        ] },
        { dok: 2, lo: ["4Ni.02"], twm: ["TWM.07", "TWM.08"], v: [
          { type: "colfix", who: "Duc", he: true, a: 547, b: 286, op: "+", slip: "carry", at: 1 },
          { type: "colfix", who: "Hana", a: 805, b: 362, op: "-", slip: "flip", at: 0 },
          { type: "colfix", who: "Phong", he: true, a: 932, b: 475, op: "-", slip: "used", at: 2 }
        ] },
        { dok: 3, lo: ["4Nc.02"], twm: ["TWM.07", "TWM.04"], v: [
          { type: "claim", who: "Quynh", ok: false, at: 1, fact: { k: "par", terms: ["odd", "odd"], says: "odd" },
            says: "When you add two odd numbers, the answer is always odd.",
            reasons: [
              { t: "5 + 7 = 12, and 12 is even." },
              { t: "5 and 7 are both odd, so the answer is odd.", why: "Add them and look at the answer. 5 + 7 = 12." },
              { t: "odd numbers are smaller than even numbers.", why: "That is not true. 9 is odd and 4 is even." }],
            hint: { pic: { k: "pairs", groups: [5, 7], sum: true }, step: "Try two odd numbers, like 5 and 7. Is the answer odd or even?" },
            worked: "5 + 7 = 12, and 12 is even. The two counters that are left over make a pair, so odd + odd is always even.",
            model: "Quynh is incorrect because 5 + 7 = 12, and 12 is even." },
          { type: "claim", who: "Son", ok: true, at: 0, fact: { k: "par", terms: ["even", "odd"], says: "odd" },
            says: "An even number take away an odd number is always odd.",
            reasons: [
              { t: "10 − 3 = 7 and 8 − 5 = 3. Both answers are odd." },
              { t: "taking away always gives an even number.", why: "Try 10 − 3. The answer is 7, which is odd." },
              { t: "10 is a big number.", why: "How big a number is does not tell us if it is odd or even." }],
            hint: { step: "Try it: 10 − 3 and 8 − 5. Are the answers odd or even?" },
            worked: "10 − 3 = 7 and 8 − 5 = 3. An even number is made of pairs. When you take away an odd number, one counter is left with no partner, so the answer is odd.",
            model: "Son is correct because 10 − 3 = 7 and 8 − 5 = 3, and both answers are odd." },
          { type: "claim", who: "Lily", ok: false, at: 2, fact: { k: "par", terms: ["odd", "even"], says: "even" },
            says: "If you add an odd number and an even number, the answer is always even.",
            reasons: [
              { t: "3 + 6 = 9, and 9 is odd." },
              { t: "6 is even, so the answer is even.", why: "Look at the whole answer. 3 + 6 = 9." },
              { t: "the answer is always bigger than 10.", why: "That does not tell us if it is odd or even. Try 3 + 6." }],
            hint: { pic: { k: "pairs", groups: [3, 6], sum: true }, step: "Try an odd number and an even number, like 3 and 6." },
            worked: "3 + 6 = 9, and 9 is odd. The odd number has one counter left over, and it still has no partner.",
            model: "Lily is incorrect because 3 + 6 = 9, and 9 is odd." }
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). The 72 Maths v2
    // Stop 4 questions (legacy/maths-v2/src/pool.js LPOOL[4], made by its tools/genpool.mjs), copied as they are.
    lightning: {
      secs: 60,
      items: [
        ["60 + 70",["130","140","120"]],["80 + 50",["130","140","120"]],["50 + 20",["70","80","60"]],
        ["80 + 40",["120","130","110"]],["700 + 100",["800","900","600"]],["200 + 500",["700","800","300"]],
        ["40 + 40",["80","90","70"]],["30 + 50",["80","90","70"]],["400 + 200",["600","700","200"]],
        ["800 − 200",["600","700","1,000"]],["700 − 300",["400","500","1,000"]],["140 − 70",["70","80","60"]],
        ["400 − 300",["100","200","700"]],["130 − 90",["40","50","30"]],["120 − 30",["90","100","80"]],
        ["300 − 100",["200","300","400"]],["600 − 100",["500","600","700"]],["900 − 700",["200","300","1,600"]],
        ["100 − 41",["59","69","49"]],["100 − 76",["24","34","14"]],["100 − 18",["82","92","72"]],
        ["100 − 26",["74","84","64"]],["100 − 55",["45","55","35"]],["100 − 82",["18","28","8"]],
        ["100 − 83",["17","27","7"]],["100 − 58",["42","52","32"]],["64 − 18",["46","56","44"]],
        ["50 + 29",["79","69","81"]],["65 + 18",["83","73","85"]],["32 + 28",["60","50","62"]],
        ["56 + 19",["75","65","77"]],["51 + 29",["80","70","82"]],["83 − 18",["65","75","63"]],
        ["54 − 28",["26","36","24"]],["? + 7 = 11",["4","18","5"]],["13 − ? = 7",["6","20","5"]],
        ["? − 5 = 11",["16","6","15"]],["? − 5 = 8",["13","3","12"]],["11 − ? = 5",["6","16","5"]],
        ["18 − ? = 6",["12","24","11"]],["16 − ? = 6",["10","22","9"]],["? + 5 = 13",["8","18","9"]],
        ["even + even is always",["even","odd","zero"]],["odd + even is always",["odd","even","zero"]],["even + odd is always",["odd","even","zero"]],
        ["odd − odd is always",["even","odd","zero"]],["even − odd is always",["odd","even","zero"]],["even − even is always",["even","odd","zero"]],
        ["odd + odd is always",["even","odd","zero"]],["odd − even is always",["odd","even","zero"]],["Which sum is odd: 20 + 11, 20 + 36 or 27 + 41?",["20 + 11","20 + 36","27 + 41"]],
        ["Which sum is odd: 28 + 39, 28 + 38 or 13 + 37?",["28 + 39","28 + 38","13 + 37"]],["Which sum is odd: 32 + 21, 32 + 24 or 27 + 33?",["32 + 21","32 + 24","27 + 33"]],["Which sum is odd: 28 + 45, 28 + 16 or 41 + 17?",["28 + 45","28 + 16","41 + 17"]],
        ["Which sum is odd: 16 + 19, 17 + 21 or 16 + 14?",["16 + 19","16 + 14","17 + 21"]],["Which sum is odd: 11 + 47, 46 + 30 or 46 + 27?",["46 + 27","46 + 30","11 + 47"]],["Which sum is odd: 46 + 34, 46 + 25 or 43 + 29?",["46 + 25","46 + 34","43 + 29"]],
        ["Which sum is odd: 14 + 11, 14 + 42 or 47 + 13?",["14 + 11","14 + 42","47 + 13"]],["Best estimate: 306 − 195",["100","200","500"]],["Best estimate: 603 + 195",["800","900","700"]],
        ["Best estimate: 291 − 195",["100","200","500"]],["Best estimate: 504 + 195",["700","800","600"]],["Best estimate: 191 − 97",["100","200","300"]],
        ["Best estimate: 597 + 104",["700","800","600"]],["Best estimate: 191 + 202",["400","500","300"]],["Best estimate: 606 − 109",["500","600","700"]],
        ["Double 15",["30","20","32"]],["Half of 52",["26","31","21"]],["Double 36",["72","62","74"]],
        ["Double 17",["34","24","36"]],["Half of 70",["35","40","30"]],["Half of 56",["28","33","23"]]
      ]
    },
    // My self-check: the 4 Maths v2 Stop 4 goals, in the same order (the dashboard reads the answers by goal number).
    // again: the step to practise again for each goal (v2 CONTENT[4].again: c = See it, r and a = Practise).
    selfcheck: {
      goals: ["add and subtract 3-digit numbers, also when I must regroup", "estimate an answer by rounding first", "find a missing number in a calculation", "say if an answer is odd or even"],
      again: ["r", "r", "c", "c"]
    }
  };
})(window.T = window.T || {});
