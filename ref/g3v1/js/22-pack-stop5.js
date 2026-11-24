/* 22-pack-stop5.js - ALL the content of Stop 5, Times tables, multiples and factors (shape: docs/02-architecture.md).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The tools (an array of counters that turns
   round, counters in equal rows with the ones left over, the multiplication square) and the pictures (factor pairs joined
   by arcs, three numbers with the easy pair joined) are in src/toolkit/39-tools-times.js. The new model multstory (a story
   in two steps: equal groups, then some more or fewer) is in src/models/06-mtasks9c.js. */
(function (T) {
  'use strict';

  T.packs[5] = {
    n: 5,
    title: "Times tables, multiples and factors",
    los: ["4Ni.04", "4Ni.07", "4Ni.03"],   // the learning objectives (shown to teachers under the last note)
    blurb: {
      en: "Know your *times tables*. Find *multiples* and *factors*.",
      vi: "Thuộc *bảng cửu chương*. Tìm *bội số* và *ước số*."
    },
    // Words: the 5 Maths v2 Stop 5 key words (WORDS with s: 5; vi and meaning as in v2) and four new ones (row, column,
    // multiplication square, factor pair), in three sets of picture cards with a quick check. The pictures are in
    // src/art/09-art-words-5.js.
    words: {
      sets: [
        { id: 'A', title: { en: 'Equal rows', vi: 'Các hàng bằng nhau' }, keys: ['array', 'row', 'column'] },
        { id: 'B', title: { en: 'Times tables', vi: 'Bảng nhân' }, keys: ['times table', 'product', 'multiplication square'] },
        { id: 'C', title: { en: 'Multiples and factors', vi: 'Bội số và ước số' }, keys: ['multiple', 'factor', 'factor pair'] }
      ],
      items: {
        'array': { art: 'w-array', vi: 'mảng (hàng và cột)', def: 'Things set out in equal rows. 3 rows of 4 is an array for 3 × 4.' },
        'row': { art: 'w-row', vi: 'hàng (theo chiều ngang)', def: 'A line of things that goes across, from left to right. This array has 2 rows.' },
        'column': { art: 'w-column', vi: 'cột (theo chiều dọc)', def: 'A line of things that goes from top to bottom. This array has 5 columns.' },
        'times table': { art: 'w-times-table', vi: 'bảng cửu chương', def: 'The list of multiplication facts for one number. 6, 12, 18, 24 are in the 6 times table.' },
        'product': { art: 'w-product', vi: 'tích', def: 'The answer when you multiply. The product of 3 and 4 is 12.' },
        'multiplication square': { art: 'w-multiplication-square', vi: 'bảng nhân dạng ô vuông', def: 'A square of all the times tables. Go along a row and down a column. They meet at the product.' },
        'multiple': { art: 'w-multiple', vi: 'bội số', def: 'A number in a times table. 18 is a multiple of 6 because 3 × 6 = 18.' },
        'factor': { art: 'w-factor', vi: 'ước số', def: 'A number that divides another number exactly. 3 is a factor of 12 because 3 × 4 = 12.' },
        'factor pair': { art: 'w-factor-pair', vi: 'cặp ước số', def: 'Two factors that multiply to make a number. 2 and 6 are a factor pair of 12.' }
      }
    },
    // See it: Concrete. Three hands-on scenes (turn an array round: 3 × 4 = 4 × 3, then a new row adds 3; find 6 × 7 on
    // the multiplication square and light up the multiples of 6; put 12 counters in equal rows to find its factors, and
    // see that 5 rows leave 2 over), then the challenge: the 5 v2 "Build it" slots (CONTENT[5].stages[0]) with TWM tags.
    see: {
      scenes: [
        { id: 'turn', title: { en: 'Turn it round', vi: 'Xoay mảng' }, tool: 'array',
          array: { rows: 3, cols: 4, turn: true },
          steps: [
            { can: { turn: true }, wait: 'turn',
              zip: { en: '3 rows of 4. Tap *Turn* to turn it round.', vi: '3 hàng, mỗi hàng 4. Bấm *Turn* (Xoay) để xoay mảng.' },
              then: { en: '*3 × 4 = 4 × 3*. Both make 12!', vi: '*3 × 4 = 4 × 3*. Cả hai đều bằng 12!' } },
            { can: { rows: true }, wait: 'row', until: { rows: 5 },
              zip: { en: 'Tap *+* next to Rows. Make *5 rows* of 3.', vi: 'Bấm *+* cạnh Rows (Hàng). Làm *5 hàng*, mỗi hàng 3.' },
              then: { en: 'Each new row adds 3. *5 × 3 = 15*.', vi: 'Mỗi hàng mới thêm 3. *5 × 3 = 15*.' } }] },
        { id: 'square', title: { en: 'The multiplication square', vi: 'Bảng nhân' }, tool: 'msq',
          msq: { rowTap: true },
          steps: [
            { can: { tap: true }, wait: 'tap', until: { p: 42 },
              zip: { en: 'Find *6 × 7*: row 6, column 7. Tap it.', vi: 'Tìm *6 × 7*: hàng 6, cột 7. Bấm vào ô đó.' },
              then: { en: 'Row 6 and column 7 meet at *42*.', vi: 'Hàng 6 và cột 7 gặp nhau ở số *42*.' } },
            { can: { row: 6 }, wait: 'row', until: { row: 6 },
              zip: { en: 'Now tap the *6* at the start of row 6.', vi: 'Bây giờ bấm số *6* ở đầu hàng 6.' },
              then: { en: 'Row 6 shows the *multiples of 6*: 6, 12, 18 ...', vi: 'Hàng 6 cho thấy các *bội số của 6*: 6, 12, 18 ...' } }] },
        { id: 'factors', title: { en: 'Factors of 12', vi: 'Ước số của 12' }, tool: 'rows',
          rows: { n: 12, rows: 1 },
          steps: [
            { can: { more: true }, wait: 'rows', until: { rows: 2 },
              zip: { en: 'Put 12 counters in *2 equal rows*. Tap *More*.', vi: 'Xếp 12 hạt thành *2 hàng bằng nhau*. Bấm *More* (Thêm).' },
              then: { en: '2 rows of 6. So *2 and 6* are factors.', vi: '2 hàng, mỗi hàng 6. Vậy *2 và 6* là ước số.' } },
            { can: { more: true }, wait: 'rows', until: { rows: 3 },
              zip: { en: 'Now make *3 equal rows*.', vi: 'Bây giờ làm *3 hàng bằng nhau*.' },
              then: { en: '3 rows of 4. *3 and 4* are factors too.', vi: '3 hàng, mỗi hàng 4. *3 và 4* cũng là ước số.' } },
            { can: { more: true }, wait: 'rows', until: { rows: 5 },
              zip: { en: 'Try *5 rows*. Tap *More* two times.', vi: 'Thử *5 hàng*. Bấm *More* (Thêm) hai lần.' },
              then: { en: '2 are left over. *5 is not* a factor.', vi: 'Còn thừa 2 hạt. *5 không phải* là ước số.' } }] },
        { id: 'challenge', title: { en: 'Arrays and factors', vi: 'Mảng và ước số' },
          challenge: {
            end: { en: 'You did it! You can use arrays and factors.', vi: 'Em làm được rồi! Em biết dùng mảng và ước số.' },
            result: 'You built arrays, put counters in equal rows and found factors.',
            rounds: [
          { mode: "our", lo: ["4Ni.04"], twm: ["TWM.05"], v: [{ type: "arr", r: 3, c: 6 }, { type: "arr", r: 4, c: 7 }, { type: "arr", r: 6, c: 5 }] },
          { mode: "our", lo: ["4Ni.07"], twm: ["TWM.05"], v: [{ type: "rowsof", n: 12, rows: 3 }, { type: "rowsof", n: 18, rows: 6 }, { type: "rowsof", n: 20, rows: 4 }] },
          { mode: "your", lo: ["4Ni.07"], twm: ["TWM.05"], v: [{ type: "isfactor", n: 14, k: 4, at: 1 }, { type: "isfactor", n: 24, k: 6, at: 0 }, { type: "isfactor", n: 15, k: 2, at: 0 }] },
          { mode: "your", lo: ["4Ni.07"], twm: ["TWM.02"], v: [
            { type: "jump", start: 0, step: 6, n: 4, dir: "on", min: 0, max: 60, tick: 6 },
            { type: "jump", start: 0, step: 7, n: 5, dir: "on", min: 0, max: 70, tick: 7 },
            { type: "jump", start: 0, step: 9, n: 3, dir: "on", min: 0, max: 90, tick: 9 }] },
          { mode: "your", lo: ["4Ni.04"], twm: ["TWM.05", "TWM.01"], v: [
            { type: "arrpick", r: 3, c: 5, wrong: [[3, 4], [5, 5]], at: 1 },
            { type: "arrpick", r: 4, c: 6, wrong: [[4, 5], [6, 6]], at: 2 },
            { type: "arrpick", r: 2, c: 7, wrong: [[3, 7], [2, 6]], at: 0 }] }] } }]
    },
    // Practise: Pictorial (Draw it: the multiplication square, multiples, factor pairs, three numbers) then Abstract
    // (Solve it, like the test). The rounds are the Maths v2 Stop 5 slots (data/v2/mdata5.js CONTENT[5] stages 2 and 3)
    // with TWM tags. Two rounds are new, with fresh numbers and stories: in Draw it, a box with a times table fact on the
    // other side (the v3 model mulbox) takes the place of the v2 missing factor; in Solve it, a story in two steps
    // (multstory) takes the place of the v2 "who has more" (each stage keeps 5 rounds, test/keys.mjs).
    practise: [
      { id: 's5r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'The multiplication square, multiples and factors.', vi: 'Bảng nhân, bội số và ước số.' },
        levels: [
      { title: { en: "The multiplication square", vi: "Bảng nhân" }, rounds: [
          { mode: "our", lo: ["4Ni.04"], twm: ["TWM.05"], v: [
            { type: "msqfind", r: 6, c: 7, ctx: "Each box shows a [[product]]." },
            { type: "msqfind", r: 8, c: 4, ctx: "Each box shows a [[product]]." },
            { type: "msqfind", r: 9, c: 6, ctx: "Each box shows a [[product]]." }] },
          { mode: "your", lo: ["4Ni.04"], twm: ["TWM.02"], v: [
            { type: "mulbox", left: [3, null], right: [2, 9] },
            { type: "mulbox", left: [null, 4], right: [2, 10] },
            { type: "mulbox", left: [9, null], right: [3, 6] }] }] },
      { title: { en: "Multiples and factors", vi: "Bội số và ước số" }, rounds: [
          { mode: "your", lo: ["4Ni.07"], twm: ["TWM.06", "TWM.01"], v: [
            { type: "multall", k: 6, nums: [12, 26, 30, 44, 54, 16] },
            { type: "multall", k: 7, nums: [14, 27, 35, 48, 63, 54] },
            { type: "multall", k: 9, nums: [18, 29, 45, 56, 72, 64] }] },
          { mode: "your", lo: ["4Ni.07"], twm: ["TWM.05"], v: [{ type: "fpairs", n: 12, hide: [1, 2] }, { type: "fpairs", n: 18, hide: [1, 2] }, { type: "fpairs", n: 20, hide: [1, 2] }] },
          { mode: "your", lo: ["4Ni.03"], twm: ["TWM.02", "TWM.08"], v: [
            { type: "group3", nums: [5, 7, 2], pair: [0, 2], arc: true },
            { type: "group3", nums: [2, 9, 5], pair: [0, 2], arc: true },
            { type: "group3", nums: [4, 6, 5], pair: [0, 2], arc: true }] }] }] },
      { id: 's5a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Facts and multiples", vi: "Phép nhân và bội số" }, rounds: [
          { mode: "your", lo: ["4Ni.07"], twm: ["TWM.06", "TWM.01"], v: [
            { type: "notmult", k: 6, nums: [18, 30, 44, 54, 12] },
            { type: "notmult", k: 7, nums: [21, 49, 36, 63, 14] },
            { type: "notmult", k: 9, nums: [27, 54, 81, 46, 18] }] },
          { mode: "your", lo: ["4Ni.04"], twm: ["TWM.05"], v: [
            { type: "factcmp", rows: [[[36, "d", 4], [40, "d", 5]], [[24, "d", 6], [35, "d", 7]]] },
            { type: "factcmp", rows: [[[63, "d", 9], [42, "d", 6]], [[30, "d", 5], [32, "d", 4]]] },
            { type: "factcmp", rows: [[[81, "d", 9], [64, "d", 8]], [[28, "d", 7], [27, "d", 3]]] }] }] },
      { title: { en: "Stories", vi: "Bài toán có lời văn" }, rounds: [
          { mode: "your", lo: ["4Ni.04"], twm: ["TWM.01"], v: [
            { type: "divstory", n: 54, k: 6, unit: "trays", text: "A baker has <b>54</b> buns. He puts <b>6</b> buns on each tray. How many trays does he fill?" },
            { type: "divstory", n: 63, k: 7, unit: "teams", text: "<b>63</b> children make teams of <b>7</b>. How many teams are there?" },
            { type: "divstory", n: 40, k: 8, unit: "tubes", text: "A coach puts <b>40</b> tennis balls into tubes of <b>8</b>. How many tubes does she fill?" }] },
          { mode: "your", lo: ["4Ni.04"], twm: ["TWM.01"], v: [
            { type: "multstory", n: 6, k: 8, extra: 5, unit: "stickers", text: "Lan buys <b>6</b> packs of stickers. There are <b>8</b> stickers in each pack. Her friend gives her <b>5</b> more stickers. How many stickers does Lan have now?" },
            { type: "multstory", n: 4, k: 9, extra: -6, unit: "pencils", text: "A class has <b>4</b> tables. There are <b>9</b> pencils on each table. The teacher takes <b>6</b> pencils away. How many pencils are left on the tables?" },
            { type: "multstory", n: 7, k: 5, extra: 4, unit: "plants", text: "A farmer plants <b>7</b> rows of rice. There are <b>5</b> plants in each row. Then she plants <b>4</b> more. How many plants is that?" }] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["4Ni.07"], twm: ["TWM.07", "TWM.04"], v: [
            { type: "claim", who: "Khanh", ok: false, at: 1, ctx: "Khanh writes these multiples of 5: <b>5, 10, 15, 20, 25</b>.", fact: { k: "multend", a: 5, digit: 5, eg: 10, list: [5, 10, 15, 20, 25] },
              says: "All multiples of 5 end in 5.",
              reasons: [
                { t: "10 is a multiple of 5, but it ends in 0." },
                { t: "5, 15 and 25 all end in 5.", why: "That is true for those three. Now look at 10 and 20." },
                { t: "multiples of 5 are odd numbers.", why: "10 and 20 are multiples of 5, and they are even." }],
              hint: { step: "Look at every number in the list. Does each one end in 5?" },
              worked: "10 = 2 × 5 and 20 = 4 × 5. They are multiples of 5 and they end in 0.",
              model: "Khanh is incorrect because 10 is a multiple of 5 and it ends in 0." },
            { type: "claim", who: "Trung", ok: true, at: 0, ctx: "Trung writes these multiples of 8: <b>8, 16, 24, 32, 40</b>.", fact: { k: "multsub", a: 8, b: 4, eg: 24, list: [8, 16, 24, 32, 40] },
              says: "All multiples of 8 are also multiples of 4.",
              reasons: [
                { t: "8 is 4 × 2, so every multiple of 8 is 4 times a number. For example 24 = 4 × 6." },
                { t: "8 is bigger than 4.", why: "Being bigger does not make a multiple. Check with the 4 times table." },
                { t: "24 is not in the 4 times table.", why: "It is: 4 × 6 = 24." }],
              hint: { pic: { k: "msq", row: 4 }, step: "Check each number in the list. Is it in the 4 times table?" },
              worked: "8 = 4 × 2, 16 = 4 × 4 and 24 = 4 × 6. Also 32 = 4 × 8 and 40 = 4 × 10. Every one is a multiple of 4.",
              model: "Trung is correct because 8 is 4 × 2, so every multiple of 8 is in the 4 times table." },
            { type: "claim", who: "Viet", ok: false, at: 2, ctx: "Viet writes these multiples of 9: <b>9, 18, 27, 36, 45</b>.", fact: { k: "multodd", a: 9, eg: 18, list: [9, 18, 27, 36, 45] },
              says: "All multiples of 9 are odd.",
              reasons: [
                { t: "18 is a multiple of 9, and 18 is even." },
                { t: "9 is odd, so all its multiples are odd.", why: "9 × 2 = 18, and 18 is even." },
                { t: "9, 27 and 45 are odd.", why: "That is true for those three. Now look at 18 and 36." }],
              hint: { step: "Look at every number in the list. Is each one odd?" },
              worked: "18 = 2 × 9 and 36 = 4 × 9. They are multiples of 9 and they are even.",
              model: "Viet is incorrect because 18 is a multiple of 9 and it is even." }] }] }] }
    ],
    // Notes: how to do it. Each note has a worked example and a picture made by the maths tools. From Maths v2
    // CONTENT[5].notes and tips, with new examples and two new notes (turn an array round; the multiplication square).
    // The check: one gap sentence per note, in the same order (each right answer is worked out again by test/stop-steps.mjs).
    notes: {
      items: [
        { en: 'An [[array]] shows a multiplication. Count the [[rows|row]], then count how many are in each row.',
          vi: 'Một mảng cho thấy một phép nhân. Đếm số hàng, rồi đếm xem mỗi hàng có bao nhiêu.',
          example: ['3 rows of 5 is 3 × 5.', 'Count in 5s: 5, 10, 15. The [[product]] is *15*.'],
          pic: { k: 'dots', r: 3, c: 5 } },
        { en: 'You can multiply in any order. Turn an array round: the product stays the same.',
          vi: 'Em có thể nhân theo thứ tự nào cũng được. Xoay mảng lại thì tích vẫn như cũ.',
          example: ['3 × 4 = 12 and 4 × 3 = 12.', 'If you know 3 × 4, you know 4 × 3 too.'],
          pic: [{ k: 'dots', r: 3, c: 4, cap: '3 × 4' }, { k: 'dots', r: 4, c: 3, cap: '4 × 3' }] },
        { en: 'On the [[multiplication square]], go along a row and down a [[column]]. They meet at the product.',
          vi: 'Trên bảng nhân, đi theo một hàng và xuống một cột. Chúng gặp nhau ở tích.',
          example: ['7 × 8: row 7 and column 8 meet at *56*.', 'Use it backwards to divide: 56 ÷ 8 = 7.'],
          pic: { k: 'msq', cross: [7, 8] } },
        { en: 'A [[multiple]] of 6 is a number in the 6 [[times table]]. Multiples of 6 go up in 6s.',
          vi: 'Bội số của 6 là một số trong bảng nhân 6. Các bội số của 6 cứ tăng thêm 6.',
          example: ['6, 12, 18, 24, 30 ...', 'Is 42 a multiple of 6? 6 × 7 = 42, so *yes*.'],
          pic: { k: 'hops', terms: [6, 12, 18, 24], blanks: 0, labs: ['+ 6', '+ 6', '+ 6'] } },
        { en: 'A [[factor]] divides a number with nothing left over. Factors come in [[factor pairs|factor pair]].',
          vi: 'Ước số chia hết một số, không còn thừa. Các ước số đi theo từng cặp.',
          example: ['12 = 1 × 12 = 2 × 6 = 3 × 4.', 'The factors of 12 are 1, 2, 3, 4, 6 and 12.'],
          pic: { k: 'frain', n: 12 } },
        { en: 'With three numbers, multiply the easy pair first. Look for 2 × 5 = 10.',
          vi: 'Khi có ba số, hãy nhân cặp số dễ trước. Tìm 2 × 5 = 10.',
          example: ['5 × 9 × 2: first 5 × 2 = 10.', 'Then 10 × 9 = *90*.'],
          pic: { k: 'grp', nums: [5, 9, 2], pair: [0, 2], show: true } }
      ],
      check: [
        { sentence: '4 rows of 7 is {28|11|21}.', answer: '28' },
        { sentence: '6 × 8 = 8 × {6|8|48}.', answer: '6' },
        { sentence: '63 ÷ 9 = {7|6|8}.', answer: '7' },
        { sentence: 'Which is a multiple of 7? {35|27|17}', answer: '35' },
        { sentence: 'Which is a factor of 20? {4|3|6}', answer: '4' },
        { sentence: '2 × 7 × 5 = {70|14|35}.', answer: '70' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard, 4 at DOK 1, 5 at DOK 2, 1 at DOK 3 (T.DOK_MIX, docs/05).
    // Each item: dok (its real level, judged with T.DOK), lo, twm (1 or 2, T.TWM) and 3 fresh sets of numbers
    // (play 1 uses v[0]). Written fresh for v3 (Session 9) with the Maths v2 Stop 5 models and new numbers, names and
    // contexts: two times table facts, a sign between two products (two recalls, then compare), the next two multiples
    // and a ring around all the multiples are DOK 1 (recall, one routine step); factor pairs to complete, a box with a
    // times table fact on the other side (the v3 model mulbox), three numbers in an easy order, a riddle with two clues and
    // a story in two steps (the v3 model multstory) are DOK 2. Question 10
    // is a new general claim about factors, judged and justified with a number (DOK 3, Number strand).
    // Run by src/steps/70-test.js with the models; answers logged with game letter 'm' and dok.
    test: {
      items: [
        { dok: 1, lo: ["4Ni.04"], twm: ["TWM.05"], v: [
          { type: "facts", items: [[7, "x", 6], [8, "x", 9]] },
          { type: "facts", items: [[6, "x", 9], [4, "x", 7]] },
          { type: "facts", items: [[9, "x", 8], [3, "x", 7]] }
        ] },
        { dok: 1, lo: ["4Ni.04"], twm: ["TWM.05"], v: [
          { type: "factcmp", rows: [[[4, "x", 9], [6, "x", 6]], [[7, "x", 8], [9, "x", 6]]] },
          { type: "factcmp", rows: [[[8, "x", 3], [5, "x", 5]], [[2, "x", 9], [3, "x", 6]]] },
          { type: "factcmp", rows: [[[6, "x", 7], [5, "x", 8]], [[10, "x", 4], [5, "x", 8]]] }
        ] },
        { dok: 1, lo: ["4Ni.07"], twm: ["TWM.02"], v: [
          { type: "nextmult", k: 6, shown: 4 },
          { type: "nextmult", k: 4, shown: 5 },
          { type: "nextmult", k: 7, shown: 4 }
        ] },
        { dok: 1, lo: ["4Ni.07"], twm: ["TWM.06", "TWM.01"], v: [
          { type: "multall", k: 4, nums: [12, 18, 20, 26, 32, 36] },
          { type: "multall", k: 8, nums: [16, 28, 40, 42, 56, 60, 72] },
          { type: "multall", k: 3, nums: [9, 14, 21, 25, 27, 32] }
        ] },
        { dok: 2, lo: ["4Ni.07"], twm: ["TWM.05"], v: [
          { type: "fpairs", n: 24, hide: [1, 3] },
          { type: "fpairs", n: 16, hide: [1, 2] },
          { type: "fpairs", n: 30, hide: [2, 3] }
        ] },
        { dok: 2, lo: ["4Ni.04"], twm: ["TWM.02"], v: [
          { type: "mulbox", left: [4, null], right: [3, 8] },
          { type: "mulbox", left: [null, 6], right: [2, 9] },
          { type: "mulbox", left: [8, null], right: [4, 10] }
        ] },
        { dok: 2, lo: ["4Ni.03"], twm: ["TWM.02", "TWM.08"], v: [
          { type: "group3", nums: [6, 5, 2], pair: [1, 2] },
          { type: "group3", nums: [4, 7, 5], pair: [0, 2] },
          { type: "group3", nums: [5, 9, 2], pair: [0, 2] }
        ] },
        { dok: 2, lo: ["4Ni.07"], twm: ["TWM.01"], v: [
          { type: "riddle", a: 4, b: 6, lo: 10, hi: 20 },
          { type: "riddle", a: 7, b: 2, lo: 20, hi: 40 },
          { type: "riddle", a: 9, b: 2, lo: 10, hi: 30 }
        ] },
        { dok: 2, lo: ["4Ni.04"], twm: ["TWM.01"], v: [
          { type: "multstory", n: 5, k: 4, extra: -3, unit: "mooncakes", text: "Minh has <b>5</b> boxes of mooncakes. Each box holds <b>4</b> mooncakes. He eats <b>3</b> of them. How many mooncakes are left?" },
          { type: "multstory", n: 8, k: 6, extra: 4, unit: "chairs", text: "A cafe has <b>8</b> tables. Each table has <b>6</b> chairs. There are <b>4</b> more chairs by the door. How many chairs are there in all?" },
          { type: "multstory", n: 7, k: 9, extra: 5, unit: "pages", text: "Mai reads <b>9</b> pages each day for <b>7</b> days. Then she reads <b>5</b> more pages. How many pages does she read in all?" }
        ] },
        { dok: 3, lo: ["4Ni.07"], twm: ["TWM.07", "TWM.04"], v: [
          { type: "claim", who: "Thao", ok: false, at: 1, ctx: "Thao looks at the factors of <b>10</b> and <b>11</b>.", fact: { k: "fcount", small: 10, big: 11 },
            says: "A bigger number always has more factors.",
            reasons: [
              { t: "11 is bigger than 10, but 11 has 2 factors and 10 has 4." },
              { t: "11 is bigger, so it has more factors.", why: "Count them. The factors of 11 are only 1 and 11." },
              { t: "10 and 11 both have 1 as a factor.", why: "That is true, but it does not test the claim. Count all the factors." }],
            hint: { step: "Find all the factors of 10. Then find all the factors of 11. How many has each number?" },
            worked: "The factors of 10 are 1, 2, 5 and 10. The factors of 11 are 1 and 11. 11 is bigger, but it has fewer factors.",
            model: "Thao is incorrect because 11 is bigger than 10, but 11 has 2 factors and 10 has 4." },
          { type: "claim", who: "Long", ok: true, at: 0, ctx: "Long writes these numbers: <b>10, 30, 50</b>.", fact: { k: "endfac", end: 0, f: 5, eg: 30, list: [10, 30, 50] },
            says: "If a number ends in 0, then 5 is a factor of it.",
            reasons: [
              { t: "a number that ends in 0 is in the 10 times table, and 10 = 2 × 5. For example 30 = 5 × 6." },
              { t: "5 does not end in 0.", why: "That does not matter. Count in 5s: 5, 10, 15, 20, 25, 30." },
              { t: "30 ÷ 5 leaves 1 left over.", why: "It does not. 5 × 6 = 30, so nothing is left over." }],
            hint: { pic: { k: "msq", row: 5 }, step: "Count in 5s. Do you reach 10, 30 and 50?" },
            worked: "10 = 5 × 2, 30 = 5 × 6 and 50 = 5 × 10. A number that ends in 0 is in the 10 times table. Every number in the 10 times table is in the 5 times table too.",
            model: "Long is correct because 10, 30 and 50 are in the 5 times table, like 30 = 5 × 6." },
          { type: "claim", who: "Yen", ok: false, at: 2, ctx: "Yen writes these numbers: <b>14, 24, 34</b>.", fact: { k: "endfac", end: 4, f: 4, eg: 14, list: [14, 24, 34] },
            says: "If a number ends in 4, then 4 is a factor of it.",
            reasons: [
              { t: "14 ends in 4, but 14 ÷ 4 leaves 2 left over." },
              { t: "24 = 4 × 6, so 4 is a factor of 24.", why: "That is true for 24. Now check 14 and 34." },
              { t: "4 is an even number.", why: "That does not tell us. Try to put 14 counters in 4 equal rows." }],
            hint: { pic: { k: "rows", n: 14, rows: 4 }, step: "Check each number in the list. Is it in the 4 times table?" },
            worked: "4 × 3 = 12 and 4 × 4 = 16, so 14 is not in the 4 times table. 14 ends in 4, but 4 is not a factor of 14.",
            model: "Yen is incorrect because 14 ends in 4, but 14 ÷ 4 leaves 2 left over." }
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). The 72 Maths v2
    // Stop 5 questions (legacy/maths-v2/src/pool.js LPOOL[5], made by its tools/genpool.mjs), copied as they are.
    lightning: {
      secs: 60,
      items: [
        ["4 × 3",["12","16","9"]],["5 × 3",["15","20","12"]],["4 × 4",["16","20","12"]],
        ["6 × 5",["30","36","25"]],["9 × 9",["81","90","72"]],["5 × 9",["45","50","36"]],
        ["7 × 3",["21","28","18"]],["3 × 4",["12","15","8"]],["8 × 6",["48","56","42"]],
        ["3 × 9",["27","30","18"]],["7 × 9",["63","70","54"]],["5 × 4",["20","25","16"]],
        ["7 × 6",["42","49","36"]],["6 × 8",["48","54","40"]],["4 × 5",["20","24","15"]],
        ["9 × 8",["72","81","64"]],["3 × 7",["21","24","14"]],["6 × 6",["36","42","30"]],
        ["16 ÷ 2",["8","9","7"]],["42 ÷ 7",["6","7","5"]],["15 ÷ 3",["5","6","4"]],
        ["25 ÷ 5",["5","6","4"]],["54 ÷ 6",["9","10","8"]],["54 ÷ 9",["6","7","5"]],
        ["32 ÷ 8",["4","5","3"]],["21 ÷ 7",["3","4","2"]],["27 ÷ 9",["3","4","2"]],
        ["56 ÷ 8",["7","8","6"]],["36 ÷ 6",["6","7","5"]],["10 ÷ 2",["5","6","4"]],
        ["6 ÷ 2",["3","4","2"]],["28 ÷ 4",["7","8","6"]],["? × 5 = 20",["4","5","3"]],
        ["? × 5 = 25",["5","6","4"]],["? × 3 = 9",["3","4","2"]],["? × 6 = 18",["3","4","2"]],
        ["? × 8 = 56",["7","8","6"]],["? × 9 = 54",["6","7","5"]],["? × 9 = 45",["5","6","4"]],
        ["? × 3 = 27",["9","10","8"]],["? × 4 = 28",["7","8","6"]],["? × 3 = 21",["7","8","6"]],
        ["Which is a multiple of 4: 17, 11 or 12?",["12","11","17"]],["Which is a multiple of 3: 21, 17 or 23?",["21","23","17"]],["Which is a multiple of 6: 27, 32 or 30?",["30","32","27"]],
        ["Which is a multiple of 9: 43, 45 or 50?",["45","43","50"]],["Which is a multiple of 7: 21, 20 or 24?",["21","20","24"]],["Which is a multiple of 3: 18, 17 or 23?",["18","17","23"]],
        ["Which is a multiple of 9: 53, 54 or 51?",["54","53","51"]],["Which is a multiple of 8: 56, 55 or 59?",["56","55","59"]],["Which is a multiple of 7: 31, 36 or 35?",["35","36","31"]],
        ["Which is a multiple of 4: 28, 31 or 27?",["28","27","31"]],["Which is a factor of 42: 4, 7 or 9?",["7","4","9"]],["Which is a factor of 24: 5, 6 or 7?",["6","7","5"]],
        ["Which is a factor of 36: 4, 5 or 7?",["4","5","7"]],["Which is a factor of 28: 5, 7 or 8?",["7","5","8"]],["Which is a factor of 16: 2, 5 or 9?",["2","5","9"]],
        ["Which is a factor of 30: 3, 8 or 9?",["3","9","8"]],["Which is a factor of 20: 5, 6 or 9?",["5","6","9"]],["Which is a factor of 16: 2, 3 or 5?",["2","3","5"]],
        ["5 × 3 × 2",["30","40","10"]],["5 × 6 × 2",["60","70","13"]],["2 × 9 × 5",["90","100","16"]],
        ["2 × 3 × 5",["30","40","10"]],["2 × 6 × 5",["60","70","13"]],["2 × 4 × 5",["40","50","11"]],
        ["4 × 16",["64","32","68"]],["4 × 25",["100","50","104"]],["4 × 15",["60","30","64"]],
        ["4 × 35",["140","70","144"]],["4 × 13",["52","26","56"]],["4 × 21",["84","42","88"]]
      ]
    },
    // My self-check: the 4 Maths v2 Stop 5 goals, in the same order (the dashboard reads the answers by goal number).
    // again: the step to practise again for each goal (v2 CONTENT[5].again: c = See it, r and a = Practise).
    selfcheck: {
      goals: ["remember the times tables up to 10 × 10", "find multiples of a number", "find factors of a number", "multiply three numbers in an easy order"],
      again: ["r", "r", "c", "r"]
    }
  };
})(window.T = window.T || {});
