/* 22-pack-stop6.js - ALL the content of Stop 6, Multiply and divide (shape: docs/02-architecture.md).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The tools (sharing things equally among
   plates, or fish into crates, with the remainder left over; the grid method) and their pictures are in
   src/toolkit/39-tools-share.js; the written multiplication on squared paper is the picture 'col' with op 'x'
   (39-tools-sums.js). The new models mdbox (missing numbers, worked backwards), bigstory (a story in two steps with a
   2-digit or 3-digit number) and mulderive (use a fact you know) are in src/models/06-mtasks9d.js. */
(function (T) {
  'use strict';

  T.packs[6] = {
    n: 6,
    title: "Multiply and divide",
    los: ["4Ni.05", "4Ni.06"],   // the learning objectives (shown to teachers under the last note)
    blurb: {
      en: "*Multiply* and *divide* big numbers. Find the *remainder*.",
      vi: "*Nhân* và *chia* số lớn. Tìm *số dư*."
    },
    // Words: the 3 Maths v2 Stop 6 key words (WORDS with s: 6; vi and meaning as in v2) and six new ones (lots of, grid
    // method, equal groups, left over, exact, sensible), in three sets of picture cards with a quick check. The pictures
    // are in src/art/10-art-words-6.js.
    words: {
      sets: [
        { id: 'A', title: { en: 'Multiply', vi: 'Phép nhân' }, keys: ['lots of', 'partition', 'grid method'] },
        { id: 'B', title: { en: 'Share equally', vi: 'Chia đều' }, keys: ['share', 'equal groups', 'remainder'] },
        { id: 'C', title: { en: 'Stories and checks', vi: 'Bài toán và kiểm tra' }, keys: ['left over', 'exact', 'sensible'] }
      ],
      items: {
        'lots of': { art: 'w-lots-of', vi: 'lần (các nhóm bằng nhau)', def: 'Equal groups of the same number. 3 lots of 124 is 3 × 124.' },
        'partition': { art: 'w-partition', vi: 'tách số', def: 'To split a number into parts. 124 is 100, 20 and 4.' },
        'grid method': { art: 'w-grid-method', vi: 'cách nhân theo lưới', def: 'Partition the number along the top of a grid. Multiply each part, then add.' },
        'share': { art: 'w-share', vi: 'chia đều', def: 'To give out equally. 12 shared among 3 is 4 each.' },
        'equal groups': { art: 'w-equal-groups', vi: 'các nhóm bằng nhau', def: 'Groups with the same number in each. 15 is 3 equal groups of 5.' },
        'remainder': { art: 'w-remainder', vi: 'số dư', def: 'What is left over after you share equally. 17 ÷ 5 = 3 remainder 2.' },
        'left over': { art: 'w-left-over', vi: 'còn thừa', def: 'Not in a full group. 14 eggs in boxes of 6: 2 eggs are left over.' },
        'exact': { art: 'w-exact', vi: 'chính xác', def: 'Worked out in full, not an estimate. 4 × 298 is about 1,200. The exact answer is 1,192.' },
        'sensible': { art: 'w-sensible', vi: 'hợp lý', def: 'An answer that makes sense. 3 × 124 is about 300, so 372 is sensible.' }
      }
    },
    // See it: Concrete. Three hands-on scenes (3 lots of 136 in blocks: join 10 ones, then 10 tens; the grid method for
    // 4 × 216, after an estimate; share 19 fish into 4 crates, 3 are left over), then the challenge: the 5 v2 "Build it"
    // slots (CONTENT[6].stages[0]) with TWM tags.
    see: {
      scenes: [
        { id: 'blocks', title: { en: 'Multiply with blocks', vi: 'Nhân bằng các khối' }, tool: 'mat',
          pic: { k: 'col', a: 136, b: 3, op: 'x' },
          mat: { b: [0, 3, 9, 18], counts: true, multi: true },
          steps: [
            { can: { join: ['o'] }, wait: 'join',
              zip: { en: '3 lots of 136. *18* ones: tap *Join 10*.', vi: '3 lần 136. *18* đơn vị: bấm *Join 10* (Gộp 10).' },
              then: { en: '10 ones make *1 ten*. Now there are 10 tens.', vi: '10 đơn vị thành *1 chục*. Bây giờ có 10 chục.' } },
            { can: { join: ['t'] }, wait: 'join',
              zip: { en: '*10* tens make a hundred. Join them too.', vi: '*10* chục thành một trăm. Gộp chúng lại nhé.' },
              then: { en: '4 hundreds and 8 ones: 3 × 136 = *408*!', vi: '4 trăm và 8 đơn vị: 3 × 136 = *408*!' } }] },
        { id: 'grid', title: { en: 'The grid method', vi: 'Nhân theo lưới' }, tool: 'gridm',
          pic: { k: 'rline', n: 216, to: 100 },
          gridm: { n: 216, m: 4 },
          steps: [
            { can: { fill: true }, wait: 'fill', until: { show: 1 },
              zip: { en: 'Estimate first. Tap the *?* under 200.', vi: 'Ước lượng trước. Bấm vào *?* dưới số 200.' },
              then: { en: '4 × 200 = *800*. The answer is near 800.', vi: '4 × 200 = *800*. Đáp án gần 800.' } },
            { can: { fill: true }, wait: 'fill', until: { show: 3 },
              zip: { en: 'Now tap the *other two* boxes.', vi: 'Bây giờ bấm vào *hai ô còn lại*.' },
              then: { en: '4 × 10 = 40 and 4 × 6 = *24*.', vi: '4 × 10 = 40 và 4 × 6 = *24*.' } },
            { can: { add: true }, wait: 'add',
              zip: { en: 'Tap *Add the parts*.', vi: 'Bấm *Add the parts* (Cộng các phần).' },
              then: { en: '800 + 40 + 24 = *864*. Near 800, so sensible!', vi: '800 + 40 + 24 = *864*. Gần 800, vậy là hợp lý!' } }] },
        { id: 'share', title: { en: 'Share with a remainder', vi: 'Chia có số dư' }, tool: 'share',
          share: { n: 19, plates: 4, skin: 'fish' },
          steps: [
            { can: { deal: true }, wait: 'deal', until: { each: 1 },
              zip: { en: 'Share *19 fish* into 4 crates. Tap *Give 1*.', vi: 'Chia đều *19 con cá* vào 4 thùng. Bấm *Give 1* (Cho 1).' },
              then: { en: 'Each crate has *1 fish*. 15 are still to share.', vi: 'Mỗi thùng có *1 con cá*. Còn 15 con chưa chia.' } },
            { can: { deal: true }, wait: 'deal', until: { each: 4 },
              zip: { en: 'Keep giving 1 to each crate. Stop when you cannot.', vi: 'Tiếp tục cho mỗi thùng 1 con. Dừng khi không chia được nữa.' },
              then: { en: 'The *remainder* is 3. 19 ÷ 4 = 4 remainder 3.', vi: '*Số dư* là 3. 19 ÷ 4 = 4 dư 3.' } }] },
        { id: 'challenge', title: { en: 'Multiply and share', vi: 'Nhân và chia đều' },
          challenge: {
            end: { en: 'You did it! You can multiply and share.', vi: 'Em làm được rồi! Em biết nhân và chia đều.' },
            result: 'You joined blocks to multiply, shared counters and jumped back to divide.',
            rounds: [
          { mode: "our", lo: ["4Ni.05"], twm: ["TWM.05"], v: [{ type: "mulmat", n: 124, k: 3 }, { type: "mulmat", n: 216, k: 3 }, { type: "mulmat", n: 142, k: 4 }] },
          { mode: "our", lo: ["4Ni.06"], twm: ["TWM.05"], v: [{ type: "sharec", n: 17, k: 5 }, { type: "sharec", n: 23, k: 4 }, { type: "sharec", n: 19, k: 6 }] },
          { mode: "your", lo: ["4Ni.05"], twm: ["TWM.05"], v: [{ type: "mulmat", n: 146, k: 3 }, { type: "mulmat", n: 164, k: 3 }, { type: "mulmat", n: 276, k: 2 }] },
          { mode: "your", lo: ["4Ni.06"], twm: ["TWM.05"], v: [{ type: "sharec", n: 26, k: 4 }, { type: "sharec", n: 31, k: 5 }, { type: "sharec", n: 29, k: 3 }] },
          { mode: "your", lo: ["4Ni.06"], twm: ["TWM.02"], v: [{ type: "jumpdiv", n: 24, k: 6 }, { type: "jumpdiv", n: 35, k: 7 }, { type: "jumpdiv", n: 36, k: 9 }] }] } }]
    },
    // Practise: Pictorial (Draw it: the grid method, columns, estimates, partition to divide) then Abstract (Solve it,
    // like the test). The rounds are the Maths v2 Stop 6 slots (data/v2/mdata6.js CONTENT[6] stages 2 and 3) with TWM
    // tags. One round is new, with fresh numbers and stories: in Solve it, a story in two steps with a 2-digit or 3-digit
    // number (the v3 model bigstory) takes the place of the v2 "best estimate" (estimates stay in Draw it and the Mini
    // test; each stage keeps 5 rounds, test/keys.mjs).
    practise: [
      { id: 's6r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'The grid method, columns, estimates and sharing.', vi: 'Nhân theo lưới, đặt tính, ước lượng và chia.' },
        levels: [
      { title: { en: "Partition and multiply", vi: "Tách số và nhân" }, rounds: [
          { mode: "our", lo: ["4Ni.05"], twm: ["TWM.05"], v: [{ type: "gridmul", n: 132, k: 4 }, { type: "gridmul", n: 215, k: 3 }, { type: "gridmul", n: 124, k: 6 }] },
          { mode: "your", lo: ["4Ni.05"], twm: ["TWM.05"], v: [{ type: "gridmul", n: 47, k: 6 }, { type: "gridmul", n: 68, k: 4 }, { type: "gridmul", n: 59, k: 7 }] },
          { mode: "your", lo: ["4Ni.05"], twm: ["TWM.05"], v: [{ type: "colmul", n: 126, k: 3 }, { type: "colmul", n: 247, k: 2 }, { type: "colmul", n: 153, k: 4 }] }] },
      { title: { en: "Estimate and divide", vi: "Ước lượng và chia" }, rounds: [
          { mode: "your", lo: ["4Ni.05"], twm: ["TWM.02"], v: [{ type: "estmul", n: 289, k: 4, to: 100 }, { type: "estmul", n: 412, k: 3, to: 100 }, { type: "estmul", n: 68, k: 5, to: 10 }] },
          { mode: "your", lo: ["4Ni.06"], twm: ["TWM.05"], v: [{ type: "partdiv", n: 84, k: 4, parts: [80, 4] }, { type: "partdiv", n: 96, k: 3, parts: [90, 6] }, { type: "partdiv", n: 65, k: 5, parts: [50, 15] }] }] }] },
      { id: 's6a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Calculate and check", vi: "Tính và kiểm tra" }, rounds: [
          { mode: "your", lo: ["4Ni.05", "4Ni.06"], twm: ["TWM.05"], v: [
            { type: "calcmd", items: [[236, "x", 4], [96, "d", 4]] },
            { type: "calcmd", items: [[318, "x", 3], [85, "d", 5]] },
            { type: "calcmd", items: [[145, "x", 6], [78, "d", 6]] }] },
          { mode: "your", lo: ["4Ni.05"], twm: ["TWM.07", "TWM.08"], v: [
            { type: "findmistake", who: "Truc", n: 126, k: 4, shown: 4824, kind: { k: "noregroup" }, at: 1, opts: [
              { t: "She wrote 24 in the ones place. She did not regroup the 2 tens." },
              { t: "She multiplied the hundreds wrongly.", why: "4 × 1 hundred = 4 hundreds. That part is right." },
              { t: "She forgot to multiply the tens.", why: "She did multiply the tens: 4 × 2 = 8." }] },
            { type: "findmistake", who: "Thinh", he: true, n: 312, k: 3, shown: 336, kind: { k: "skipH" }, at: 2, opts: [
              { t: "He did not multiply the hundreds digit." },
              { t: "He multiplied the ones wrongly.", why: "3 × 2 = 6. The ones are right." },
              { t: "He forgot to regroup.", why: "Nothing needs regrouping here: 3 × 2 = 6 and 3 × 1 = 3." }] },
            { type: "findmistake", who: "Toan", he: true, n: 152, k: 6, shown: 962, kind: { k: "fact", at: 1, says: 35 }, at: 0, opts: [
              { t: "He made a times table mistake: 6 × 5 is 30, not 35." },
              { t: "He did not regroup the ones.", why: "He did: 6 × 2 = 12, and he wrote 2 in the ones." },
              { t: "He did not multiply the hundreds.", why: "He did: 6 × 1 = 6, and 3 more makes 9." }] }] }] },
      { title: { en: "Stories", vi: "Bài toán có lời văn" }, rounds: [
          { mode: "your", lo: ["4Ni.06"], twm: ["TWM.01"], v: [
            { type: "remstory", n: 40, k: 6, want: "up", unit: "trips", why: "The 4 people who are left need a trip too.", text: "A boat takes <b>6</b> people. <b>40</b> people want to cross the river. How many trips does the boat make?" },
            { type: "remstory", n: 50, k: 8, want: "down", unit: "bows", why: "2 cm is not enough for another bow.", text: "A ribbon is <b>50</b> cm long. One bow needs <b>8</b> cm of ribbon. How many bows can you make?" },
            { type: "remstory", n: 23, k: 5, want: "rem", unit: "children", why: "4 teams use 20 children. The others are left over.", text: "<b>23</b> children get into teams of <b>5</b>. How many children are not in a team?" }] },
          { mode: "your", lo: ["4Ni.05"], twm: ["TWM.01"], v: [
            { type: "bigstory", n: 125, k: 4, extra: -60, unit: "pencils", text: "A shop has <b>4</b> boxes of pencils. There are <b>125</b> pencils in each box. It sells <b>60</b> pencils. How many pencils are left?" },
            { type: "bigstory", n: 48, k: 3, extra: 15, unit: "spring rolls", text: "Grandma makes <b>3</b> trays of spring rolls. There are <b>48</b> rolls on each tray. Then she makes <b>15</b> more. How many spring rolls does she make?" },
            { type: "bigstory", n: 215, k: 3, extra: 35, unit: "people", text: "A ferry carries <b>215</b> people on each trip. It makes <b>3</b> trips in the morning. <b>35</b> more people ride in the afternoon. How many people ride the ferry in all?" }] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["4Ni.05", "4Ni.06"], twm: ["TWM.07", "TWM.04"], v: [
            { type: "claim", who: "Kha", ok: false, at: 1, fact: { k: "cmpcalc", calc: [298, "x", 4], rel: ">", than: 1200 },
              says: "4 × 298 is more than 1,200.",
              reasons: [
                { t: "298 is less than 300, and 4 × 300 = 1,200. So 4 × 298 is less than 1,200." },
                { t: "298 is nearly 300, so the answer is more than 1,200.", why: "Nearly 300 means a bit less than 300. So the answer is a bit less than 1,200." },
                { t: "4 × 298 = 1,292.", why: "Check: 4 × 300 = 1,200, and you must take away 4 × 2 = 8." }],
              hint: { pic: { k: "rline", n: 298, to: 100 }, step: "Use an estimate: 4 × 300. Is 298 more or less than 300?" },
              worked: "4 × 300 = 1,200. 298 is 2 less than 300, so 4 × 298 is 8 less. That is 1,192.",
              model: "Kha is incorrect because 298 is less than 300, so 4 × 298 is less than 1,200." },
            { type: "claim", who: "Ha", ok: true, at: 0, fact: { k: "cmpcalc", calc: [96, "d", 4], rel: ">", than: 20 },
              says: "96 ÷ 4 is more than 20.",
              reasons: [
                { t: "80 ÷ 4 = 20, and 96 is more than 80. So 96 ÷ 4 is more than 20." },
                { t: "96 is a big number, so the answer is big.", why: "Use numbers to show it. What is 80 ÷ 4?" },
                { t: "96 ÷ 4 = 20 exactly.", why: "20 × 4 = 80, not 96." }],
              hint: { step: "Think of 80 ÷ 4 first. Is 96 more or less than 80?" },
              worked: "80 ÷ 4 = 20. 96 is 16 more than 80, and 16 ÷ 4 = 4. So 96 ÷ 4 = 24.",
              model: "Ha is correct because 80 ÷ 4 = 20 and 96 is more than 80." },
            { type: "claim", who: "Luan", ok: false, at: 2, fact: { k: "cmpcalc", calc: [201, "x", 5], rel: "<", than: 1000 },
              says: "5 × 201 is less than 1,000.",
              reasons: [
                { t: "5 × 200 = 1,000, and 201 is more than 200. So 5 × 201 is more than 1,000." },
                { t: "201 rounds to 200, so the answer is less.", why: "201 is more than 200. So the answer is more than 5 × 200." },
                { t: "5 × 201 = 105.", why: "5 × 200 is already 1,000." }],
              hint: { step: "Use an estimate: 5 × 200. Is 201 more or less than 200?" },
              worked: "5 × 200 = 1,000. 201 is 1 more than 200, so 5 × 201 is 5 more. That is 1,005.",
              model: "Luan is incorrect because 5 × 200 = 1,000 and 201 is more than 200." }] }] }] }
    ],
    // Notes: how to do it. Each note has a worked example and a picture made by the maths tools. From Maths v2
    // CONTENT[6].notes and tips, with new examples and one new note (partition to divide).
    // The check: one gap sentence per note, in the same order (each right answer is worked out again by test/stop-steps.mjs).
    notes: {
      items: [
        { en: 'To multiply a big number, [[partition]] it. Multiply each part, then add.',
          vi: 'Để nhân một số lớn, hãy tách số đó. Nhân từng phần, rồi cộng lại.',
          example: ['5 × 213: 5 × 200 = 1,000, 5 × 10 = 50 and 5 × 3 = 15.', '1,000 + 50 + 15 = *1,065*.'],
          pic: { k: 'gridm', n: 213, m: 5, show: 9 } },
        { en: 'In columns, start with the ones. [[Regroup|regroup]] to the next column.',
          vi: 'Khi nhân theo cột, bắt đầu từ hàng đơn vị. Nhớ sang cột tiếp theo.',
          example: ['4 × 132: ones 4 × 2 = 8.', 'Tens 4 × 3 = 12. Write 2 and regroup 1 hundred.', 'Hundreds 4 × 1 = 4, and 1 more makes 5. The answer is *528*.'],
          pic: { k: 'col', a: 132, b: 4, op: 'x', ans: 528, marks: [0, 1, 0] } },
        { en: '[[Estimate|estimate]] first. Round the big number, then multiply.',
          vi: 'Hãy ước lượng trước. Làm tròn số lớn, rồi nhân.',
          example: ['5 × 403: 403 is about 400.', '5 × 400 = 2,000. The answer is near *2,000*.'],
          pic: { k: 'rline', n: 403, to: 100 } },
        { en: 'To [[share]] equally, give 1 to each group again and again. What is left is the [[remainder]].',
          vi: 'Để chia đều, cho mỗi nhóm 1, lặp lại nhiều lần. Phần còn lại là số dư.',
          example: ['22 ÷ 5: 5 × 4 = 20, and 2 are left.', '22 ÷ 5 = *4 remainder 2*.', 'The remainder is always smaller than 5.'],
          pic: { k: 'share', n: 22, plates: 5, each: 4 } },
        { en: 'To divide a big number, partition it into parts that divide easily.',
          vi: 'Để chia một số lớn, hãy tách nó thành các phần dễ chia.',
          example: ['72 ÷ 3: 72 = 60 + 12.', '60 ÷ 3 = 20 and 12 ÷ 3 = 4. So 72 ÷ 3 = *24*.', 'Check by multiplying back: 24 × 3 = 72.'],
          pic: { k: 'bar', whole: 72, parts: [60, 12] } },
        { en: 'In a story, think about the remainder. Does it need one more group, or is it left out?',
          vi: 'Trong bài toán có lời văn, hãy nghĩ về số dư. Cần thêm một nhóm, hay bỏ ra ngoài?',
          example: ['18 children, 4 in each car: 18 ÷ 4 = 4 remainder 2.', 'The 2 children who are left need a car too: *5 cars*.'],
          pic: { k: 'share', n: 18, plates: 4, each: 4 } }
      ],
      check: [
        { sentence: '3 × 142 = {426|326|3,142}.', answer: '426' },
        { sentence: '3 × 254 = {762|652|7,512}.', answer: '762' },
        { sentence: 'Round to the nearest 100: 6 × 389 is about {2,400|1,800|240}.', answer: '2,400' },
        { sentence: '23 ÷ 4 = 5 remainder {3|1|4}.', answer: '3' },
        { sentence: '84 ÷ 4 = {21|20|12}.', answer: '21' },
        { sentence: '27 children, 5 in each car: they need {6|5|2} cars.', answer: '6' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard, 4 at DOK 1, 5 at DOK 2, 1 at DOK 3 (T.DOK_MIX, docs/05).
    // Each item: dok (its real level, judged with T.DOK), lo, twm (1 or 2, T.TWM) and 3 fresh sets of numbers
    // (play 1 uses v[0]). Written fresh for v3 (Session 10) with the Maths v2 Stop 6 models and the new v3 models, new
    // numbers, names and contexts: a tens or hundreds number times a 1-digit number, a bare written multiplication, a
    // division with a remainder and a bare division beyond the tables are DOK 1 (a known fact or one standard calculation);
    // the best estimate (round, multiply, then choose), missing numbers worked backwards (mdbox), a new fact from a fact
    // you know (mulderive), a story where the remainder decides the answer and a story in two steps (bigstory) are DOK 2.
    // Question 10 is a new general claim about multiplying or dividing, judged and justified with a calculation from the
    // list or the rule (DOK 3, Number strand). Run by src/steps/70-test.js with the models; answers logged with game
    // letter 'm' and dok.
    test: {
      items: [
        { dok: 1, lo: ["4Ni.05"], twm: ["TWM.02"], v: [
          { type: "calcmd", items: [[60, "x", 7], [500, "x", 4]] },
          { type: "calcmd", items: [[80, "x", 6], [300, "x", 9]] },
          { type: "calcmd", items: [[90, "x", 5], [700, "x", 3]] }
        ] },
        { dok: 1, lo: ["4Ni.05"], twm: ["TWM.05"], v: [
          { type: "calcmd", items: [[247, "x", 3]] },
          { type: "calcmd", items: [[158, "x", 4]] },
          { type: "calcmd", items: [[329, "x", 2]] }
        ] },
        { dok: 1, lo: ["4Ni.06"], twm: ["TWM.05"], v: [
          { type: "divrem", n: 31, k: 4 },
          { type: "divrem", n: 46, k: 7 },
          { type: "divrem", n: 39, k: 5 }
        ] },
        { dok: 1, lo: ["4Ni.06"], twm: ["TWM.05"], v: [
          { type: "calcmd", items: [[78, "d", 3], [64, "d", 4]] },
          { type: "calcmd", items: [[92, "d", 4], [57, "d", 3]] },
          { type: "calcmd", items: [[84, "d", 6], [95, "d", 5]] }
        ] },
        { dok: 2, lo: ["4Ni.05"], twm: ["TWM.02"], v: [
          { type: "estmulpick", n: 391, k: 7, to: 100, wrong: [280, 28000, 2100], at: 2, text: "A ferry carries <b>391</b> people on each trip. It makes <b>7</b> trips." },
          { type: "estmulpick", n: 604, k: 6, to: 100, wrong: [360, 36000, 4200], at: 0, text: "A farm packs <b>604</b> eggs each day for <b>6</b> days." },
          { type: "estmulpick", n: 83, k: 9, to: 10, wrong: [72, 7200, 810], at: 3, text: "A box holds <b>83</b> crayons. A teacher buys <b>9</b> boxes." }
        ] },
        { dok: 2, lo: ["4Ni.06"], twm: ["TWM.02"], v: [
          { type: "mdbox", items: [[null, "d", 3, 24], [5, "x", null, 85]] },
          { type: "mdbox", items: [[null, "d", 4, 19], [6, "x", null, 84]] },
          { type: "mdbox", items: [[null, "d", 6, 15], [4, "x", null, 96]] }
        ] },
        { dok: 2, lo: ["4Ni.05"], twm: ["TWM.02"], v: [
          { type: "mulderive", who: "Bich", know: [4, 125], ask: 8 },
          { type: "mulderive", who: "Tam", know: [3, 214], ask: 4 },
          { type: "mulderive", who: "Khoi", know: [6, 150], ask: 5 }
        ] },
        { dok: 2, lo: ["4Ni.06"], twm: ["TWM.01"], v: [
          { type: "remstory", n: 45, k: 8, want: "up", unit: "minibuses", why: "The 5 children who are left need a minibus too.", text: "A minibus has seats for <b>8</b> children. <b>45</b> children go on a school trip. How many minibuses do they need?" },
          { type: "remstory", n: 52, k: 7, want: "rem", unit: "mangoes", why: "7 bags hold 49 mangoes. The others are left over.", text: "Mr Hai puts <b>52</b> mangoes into bags of <b>7</b>. He fills as many bags as he can. How many mangoes are left over?" },
          { type: "remstory", n: 26, k: 4, want: "up", unit: "tables", why: "The 2 guests who are left need a table too.", text: "Each table at a party seats <b>4</b> guests. <b>26</b> guests come. How many tables are needed?" }
        ] },
        { dok: 2, lo: ["4Ni.05"], twm: ["TWM.01"], v: [
          { type: "bigstory", n: 136, k: 4, extra: -50, unit: "fish", text: "A boat brings back <b>4</b> crates of fish. Each crate holds <b>136</b> fish. <b>50</b> fish are sold at the harbour. How many fish are left?" },
          { type: "bigstory", n: 245, k: 3, extra: 28, unit: "tickets", text: "A water park sells <b>245</b> tickets each day for <b>3</b> days. On the fourth day it sells <b>28</b> tickets. How many tickets is that in all?" },
          { type: "bigstory", n: 78, k: 6, extra: -9, unit: "eggs", text: "A farmer collects <b>78</b> eggs each day for <b>6</b> days. <b>9</b> of the eggs break. How many eggs are not broken?" }
        ] },
        { dok: 3, lo: ["4Ni.05", "4Ni.06"], twm: ["TWM.07", "TWM.04"], v: [
          { type: "claim", who: "Hieu", ok: false, at: 1, ctx: "Hieu works out <b>2 × 315</b>, <b>3 × 124</b> and <b>4 × 260</b>.", fact: { k: "mul3d", calcs: [[2, 315], [3, 124], [4, 260]], eg: [4, 260] },
            says: "A 3-digit number times a 1-digit number always has a 3-digit answer.",
            reasons: [
              { t: "4 × 260 = 1,040, and 1,040 has 4 digits." },
              { t: "3 × 124 = 372, and 372 has 3 digits.", why: "That is true for 3 × 124. Now work out 4 × 260." },
              { t: "a 1-digit number is small, so the answer stays small.", why: "4 × 250 is already 1,000. So 4 × 260 is more than 1,000." }],
            hint: { pic: { k: "gridm", n: 260, m: 4 }, step: "Work out each calculation. Count the digits of each answer." },
            worked: "2 × 315 = 630 and 3 × 124 = 372. But 4 × 260 = 1,040, and 1,040 has 4 digits.",
            model: "Hieu is incorrect because 4 × 260 = 1,040, and 1,040 has 4 digits." },
          { type: "claim", who: "Nhi", ok: true, at: 0, ctx: "Nhi divides each of these numbers by 6: <b>20, 35, 47</b>.", fact: { k: "remlt", by: 6, eg: 35, list: [20, 35, 47] },
            says: "When you divide by 6, the remainder is always less than 6.",
            reasons: [
              { t: "if 6 or more were left over, you could make one more group of 6. For example, 35 ÷ 6 = 5 remainder 5." },
              { t: "6 is an even number.", why: "That does not tell us. Think about what is left after you make groups of 6." },
              { t: "47 ÷ 6 = 7 remainder 6.", why: "6 × 7 = 42 and 47 − 42 = 5. The remainder is 5." }],
            hint: { pic: { k: "share", n: 35, plates: 6, each: 5 }, step: "Work out each division. If 6 were left over, could you make one more group?" },
            worked: "20 ÷ 6 = 3 remainder 2. 35 ÷ 6 = 5 remainder 5. 47 ÷ 6 = 7 remainder 5. If 6 were left over, you could give 1 more to each group.",
            model: "Nhi is correct because if 6 or more were left over, you could make one more group of 6." },
          { type: "claim", who: "Duy", ok: false, at: 2, ctx: "Duy divides each of these numbers by 2: <b>40, 70, 60</b>.", fact: { k: "half0", eg: 70, list: [40, 70, 60] },
            says: "When you divide a number that ends in 0 by 2, the answer always ends in 0.",
            reasons: [
              { t: "70 ends in 0, but 70 ÷ 2 = 35, and 35 ends in 5." },
              { t: "40 ÷ 2 = 20, and 20 ends in 0.", why: "That is true for 40. Now work out 70 ÷ 2." },
              { t: "2 is an even number, so the answer ends in 0.", why: "Check every number in the list. What is 70 ÷ 2?" }],
            hint: { step: "Work out each division. Look at the last digit of each answer." },
            worked: "40 ÷ 2 = 20 and 60 ÷ 2 = 30. But 70 ÷ 2 = 35, and 35 does not end in 0.",
            model: "Duy is incorrect because 70 ends in 0, but 70 ÷ 2 = 35." }
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). The 72 Maths v2
    // Stop 6 questions (legacy/maths-v2/src/pool.js LPOOL[6], made by its tools/genpool.mjs), copied as they are.
    lightning: {
      secs: 60,
      items: [
        ["7 × 30",["210","21","280"]],["3 × 50",["150","15","180"]],["2 × 40",["80","8","100"]],
        ["8 × 90",["720","72","800"]],["8 × 40",["320","32","400"]],["6 × 40",["240","24","300"]],
        ["4 × 30",["120","12","160"]],["5 × 60",["300","30","350"]],["6 × 80",["480","48","540"]],
        ["3 × 90",["270","27","300"]],["9 × 30",["270","27","360"]],["7 × 20",["140","14","210"]],
        ["8 × 200",["1,600","160","1,700"]],["9 × 600",["5,400","540","5,500"]],["5 × 500",["2,500","250","2,600"]],
        ["8 × 300",["2,400","240","2,500"]],["2 × 300",["600","60","700"]],["7 × 300",["2,100","210","2,200"]],
        ["9 × 200",["1,800","180","1,900"]],["2 × 200",["400","40","500"]],["80 ÷ 8",["10","1","20"]],
        ["90 ÷ 9",["10","1","20"]],["40 ÷ 2",["20","2","30"]],["60 ÷ 6",["10","1","20"]],
        ["70 ÷ 7",["10","1","20"]],["60 ÷ 2",["30","3","40"]],["80 ÷ 4",["20","2","30"]],
        ["60 ÷ 3",["20","2","30"]],["100 ÷ 5",["20","2","30"]],["40 ÷ 4",["10","1","20"]],
        ["Remainder of 51 ÷ 8",["3","4","6"]],["Remainder of 21 ÷ 4",["1","2","5"]],["Remainder of 23 ÷ 4",["3","2","5"]],
        ["Remainder of 22 ÷ 6",["4","5","3"]],["Remainder of 51 ÷ 9",["6","7","5"]],["Remainder of 27 ÷ 4",["3","2","6"]],
        ["Remainder of 15 ÷ 4",["3","2","4"]],["Remainder of 17 ÷ 4",["1","2","4"]],["Remainder of 22 ÷ 4",["2","3","5"]],
        ["Remainder of 46 ÷ 7",["4","5","6"]],["Remainder of 20 ÷ 3",["2","1","6"]],["Remainder of 47 ÷ 9",["2","3","5"]],
        ["4 × 32",["128","132","118"]],["5 × 31",["155","160","145"]],["3 × 13",["39","42","29"]],
        ["2 × 12",["24","26","14"]],["3 × 21",["63","66","53"]],["5 × 21",["105","110","95"]],
        ["3 × 12",["36","39","26"]],["5 × 13",["65","70","55"]],["5 × 12",["60","65","50"]],
        ["2 × 23",["46","48","36"]],["Best estimate: 2 × 308",["600","800","60"]],["Best estimate: 6 × 608",["3,600","4,200","360"]],
        ["Best estimate: 2 × 608",["1,200","1,400","120"]],["Best estimate: 2 × 198",["400","600","40"]],["Best estimate: 2 × 291",["600","800","60"]],
        ["Best estimate: 3 × 606",["1,800","2,100","180"]],["Best estimate: 5 × 598",["3,000","3,500","300"]],["Best estimate: 6 × 306",["1,800","2,400","180"]],
        ["80 ÷ 5",["16","17","15"]],["32 ÷ 2",["16","17","15"]],["44 ÷ 4",["11","12","10"]],
        ["22 ÷ 2",["11","12","10"]],["39 ÷ 3",["13","14","12"]],["42 ÷ 2",["21","22","20"]],
        ["45 ÷ 3",["15","16","14"]],["70 ÷ 5",["14","15","13"]],["24 ÷ 2",["12","13","11"]],
        ["65 ÷ 5",["13","14","12"]],["96 ÷ 6",["16","17","15"]],["69 ÷ 3",["23","24","22"]]
      ]
    },
    // My self-check: the 4 Maths v2 Stop 6 goals, in the same order (the dashboard reads the answers by goal number).
    // again: the step to practise again for each goal (v2 CONTENT[6].again: c = See it, r and a = Practise).
    selfcheck: {
      goals: ["multiply a 2-digit or 3-digit number by a 1-digit number", "divide a 2-digit number by a 1-digit number, also with a remainder", "estimate before I calculate", "find and fix a mistake in a calculation"],
      again: ["r", "c", "r", "a"]
    }
  };
})(window.T = window.T || {});
