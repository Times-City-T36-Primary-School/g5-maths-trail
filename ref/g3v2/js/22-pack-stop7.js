/* 22-pack-stop7.js - ALL the content of Stop 7, Fractions (shape: docs/02-architecture.md).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The tools (a strip cut into equal parts,
   counters shared among plates, two unit fractions compared) and the pictures (strips, strips to compare, pizzas or cakes
   shared equally) are in src/toolkit/39-tools-fractions.js. The questions are the Maths v2 Stop 7 models
   (src/models/06-mtasks6.js), unchanged. */
(function (T) {
  'use strict';

  // a fraction written as on paper: the top number over the bottom number (39-tools-fractions.css .fr)
  const F = function (n, d) { return '<span class="fr"><i>' + n + '</i><span class="frs">/</span><i>' + d + '</i></span>'; };

  T.packs[7] = {
    n: 7,
    title: "Fractions",
    los: ["4Nf.01", "4Nf.02", "4Nf.03"],   // the learning objectives (shown to teachers under the last note)
    blurb: {
      en: "Cut a whole into *equal parts*. Compare *fractions*. Find a fraction of an amount.",
      vi: "Chia một hình thành các *phần bằng nhau*. So sánh *phân số*. Tìm phân số của một số."
    },
    // Words: the 5 Maths v2 Stop 7 key words (WORDS with s: 7; vi and meaning as in v2) and four new ones (whole, half,
    // third, quarter), in three sets of picture cards with a quick check. The pictures are in src/art/12-art-words-7.js.
    words: {
      sets: [
        { id: 'A', title: { en: 'Equal parts', vi: 'Các phần bằng nhau' }, keys: ['whole', 'equal parts', 'fraction'] },
        { id: 'B', title: { en: 'Top and bottom', vi: 'Tử số và mẫu số' }, keys: ['numerator', 'denominator', 'unit fraction'] },
        { id: 'C', title: { en: 'Halves, thirds, quarters', vi: 'Phần hai, phần ba, phần tư' }, keys: ['half', 'third', 'quarter'] }
      ],
      items: {
        'whole': { art: 'w-whole', vi: 'cái nguyên (cả một hình)', def: 'One whole thing, before it is cut. A whole pizza is 1 whole.' },
        'equal parts': { art: 'w-equal-parts', vi: 'các phần bằng nhau', def: 'Parts that are all the same size. This strip has 4 equal parts.' },
        'fraction': { art: 'w-fraction', vi: 'phân số', def: 'A part of a whole. One of 4 equal parts is one quarter.' },
        'numerator': { art: 'w-numerator', vi: 'tử số', def: 'The top number of a fraction. It tells how many parts you take.' },
        'denominator': { art: 'w-denominator', vi: 'mẫu số', def: 'The bottom number of a fraction. It tells how many equal parts make the whole.' },
        'unit fraction': { art: 'w-unit-fraction', vi: 'phân số đơn vị (tử số là 1)', def: 'A fraction with 1 on top, like one half or one fifth.' },
        'half': { art: 'w-half', vi: 'một phần hai (một nửa)', def: 'One of 2 equal parts. One half of 10 is 5.' },
        'third': { art: 'w-third', vi: 'một phần ba', def: 'One of 3 equal parts. One third of 9 is 3.' },
        'quarter': { art: 'w-quarter', vi: 'một phần tư', def: 'One of 4 equal parts. One quarter of 12 is 3.' }
      }
    },
    // See it: Concrete. Three hands-on scenes (cut a strip into 2, 4 and 8 equal parts and see the parts get smaller, a
    // small fraction wall growing under it; compare one third and one sixth on two strips of the same length, then the
    // sign; share 12 counters among 4 plates: one plate is one quarter of 12), then the challenge: the 5 v2 "Build it"
    // slots (CONTENT[7].stages[0]) with TWM tags.
    see: {
      scenes: [
        { id: 'cut', title: { en: 'Cut the strip', vi: 'Cắt băng giấy' }, tool: 'strip',
          strip: { parts: 1, wall: [2, 4, 8] },
          steps: [
            { can: { more: true }, wait: 'cut', until: { parts: 2 },
              zip: { en: 'This strip is 1 whole. Tap *More* to cut it.', vi: 'Băng giấy này là 1 cái nguyên. Bấm *More* (Thêm) để cắt.' },
              then: { en: '2 equal parts. Each part is *one half*.', vi: '2 phần bằng nhau. Mỗi phần là *một phần hai*.' } },
            { can: { more: true }, wait: 'cut', until: { parts: 4 },
              zip: { en: 'Now cut it into *4 equal parts*.', vi: 'Bây giờ cắt thành *4 phần bằng nhau*.' },
              then: { en: 'Each part is *one quarter*. It is smaller!', vi: 'Mỗi phần là *một phần tư*. Phần này nhỏ hơn!' } },
            { can: { more: true }, wait: 'cut', until: { parts: 8 },
              zip: { en: 'Now cut it into *8 equal parts*.', vi: 'Bây giờ cắt thành *8 phần bằng nhau*.' },
              then: { en: '*More parts* make *smaller parts*. One eighth!', vi: '*Càng nhiều phần*, mỗi phần *càng nhỏ*. Một phần tám!' } }] },
        { id: 'compare', title: { en: 'The bigger part', vi: 'Phần lớn hơn' }, tool: 'fcmp',
          fcmp: { a: 3, b: 6 },
          steps: [
            { can: { pick: 3 }, wait: 'pick', until: { pick: 3 },
              zip: { en: 'Tap the strip with the *bigger* orange part.', vi: 'Bấm vào băng giấy có phần màu cam *lớn hơn*.' },
              then: { en: 'Thirds are bigger than sixths. *Fewer parts*, bigger parts.', vi: 'Phần ba lớn hơn phần sáu. *Ít phần hơn*, mỗi phần lớn hơn.' } },
            { can: { sign: '>' }, wait: 'sign', until: { sym: '>' },
              zip: { en: 'Now tap the right *sign* for the box.', vi: 'Bây giờ bấm *dấu* đúng để điền vào ô.' },
              then: { en: 'One third *is greater than* one sixth.', vi: 'Một phần ba *lớn hơn* một phần sáu.' } }] },
        { id: 'share', title: { en: 'One quarter of 12', vi: 'Một phần tư của 12' }, tool: 'fshare',
          fshare: { n: 12, plates: 4, frac: true },
          steps: [
            { can: { deal: true }, wait: 'deal', until: { each: 1 },
              zip: { en: 'Tap *Give 1 to each plate* to share.', vi: 'Bấm *Give 1 to each plate* (Chia mỗi đĩa 1) để chia.' },
              then: { en: '1 on each plate. 8 are still left.', vi: 'Mỗi đĩa có 1 hạt. Vẫn còn 8 hạt.' } },
            { can: { deal: true }, wait: 'deal', until: { each: 3 },
              zip: { en: 'Keep going until *no counters* are left.', vi: 'Tiếp tục cho đến khi *không còn hạt* nào.' },
              then: { en: '3 on each plate. *One quarter of 12 is 3*.', vi: 'Mỗi đĩa 3 hạt. *Một phần tư của 12 là 3*.' } }] },
        { id: 'challenge', title: { en: 'Fraction challenge', vi: 'Thử thách phân số' },
          challenge: {
            end: { en: 'You did it! You can cut, compare and share.', vi: 'Em làm được rồi! Em biết cắt, so sánh và chia.' },
            result: 'You cut strips, compared fractions and shared counters.',
            rounds: [
          { mode: "our", lo: ["4Nf.01"], twm: ["TWM.05"], v: [{ type: "cutbar", parts: 4 }, { type: "cutbar", parts: 6 }, { type: "cutbar", parts: 8 }] },
          { mode: "our", lo: ["4Nf.01"], twm: ["TWM.05"], v: [{ type: "ucmp", a: 3, b: 5, at: 1 }, { type: "ucmp", a: 2, b: 6, at: 0 }, { type: "ucmp", a: 4, b: 10, at: 1 }] },
          { mode: "your", lo: ["4Nf.01"], twm: ["TWM.05"], v: [{ type: "fsym", rows: [[4, 8]], bars: true }, { type: "fsym", rows: [[6, 3]], bars: true }, { type: "fsym", rows: [[5, 10]], bars: true }] },
          { mode: "your", lo: ["4Nf.03"], twm: ["TWM.02"], v: [{ type: "fracof", n: 20, d: 4, tool: true }, { type: "fracof", n: 18, d: 3, tool: true }, { type: "fracof", n: 30, d: 5, tool: true }] },
          { mode: "your", lo: ["4Nf.03"], twm: ["TWM.02"], v: [{ type: "fracof", n: 24, d: 6, tool: true }, { type: "fracof", n: 16, d: 2, tool: true }, { type: "fracof", n: 21, d: 3, tool: true }] }] } }]
    },
    // Practise: Pictorial (Draw it: pizzas and cakes shared, a division as a fraction, a bar for a fraction of an amount,
    // the smallest or largest unit fraction) then Abstract (Solve it, like the test). The rounds are the Maths v2 Stop 7
    // slots (data/v2/mdata7.js CONTENT[7] stages 2 and 3) with TWM tags; the first story also asks for "a [[fraction]]"
    // (a word link on the first question).
    practise: [
      { id: 's7r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Share pizzas and cakes. Draw a bar.', vi: 'Chia bánh pizza và bánh ngọt. Vẽ thanh.' },
        levels: [
      { title: { en: "Sharing pizzas and cakes", vi: "Chia bánh pizza và bánh ngọt" }, rounds: [
          { mode: "our", lo: ["4Nf.02"], twm: ["TWM.05"], v: [
            { type: "fdiv", a: 3, b: 4, one: "pizza", many: "pizzas", text: "<b>3</b> pizzas are shared equally among <b>4</b> children. How much pizza does each child get? Write it as a [[fraction]]." },
            { type: "fdiv", a: 2, b: 3, one: "pizza", many: "pizzas", text: "<b>2</b> pizzas are shared equally among <b>3</b> children. How much pizza does each child get? Write it as a [[fraction]]." },
            { type: "fdiv", a: 3, b: 5, one: "pizza", many: "pizzas", text: "<b>3</b> pizzas are shared equally among <b>5</b> children. How much pizza does each child get? Write it as a [[fraction]]." }] },
          { mode: "your", lo: ["4Nf.02"], twm: ["TWM.05"], v: [
            { type: "fdiv", a: 2, b: 5, one: "cake", many: "cakes", kind: "cake", text: "<b>2</b> cakes are shared equally among <b>5</b> children. How much cake does each child get?" },
            { type: "fdiv", a: 3, b: 8, one: "cake", many: "cakes", kind: "cake", text: "<b>3</b> cakes are shared equally among <b>8</b> children. How much cake does each child get?" },
            { type: "fdiv", a: 5, b: 6, one: "cake", many: "cakes", kind: "cake", text: "<b>5</b> cakes are shared equally among <b>6</b> children. How much cake does each child get?" }] },
          { mode: "your", lo: ["4Nf.02"], twm: ["TWM.05"], v: [{ type: "fdivsent", a: 5, b: 6, miss: "frac" }, { type: "fdivsent", a: 2, b: 3, miss: "div" }, { type: "fdivsent", a: 7, b: 10, miss: "frac" }] }] },
      { title: { en: "Parts of amounts", vi: "Phân số của một số" }, rounds: [
          { mode: "your", lo: ["4Nf.03"], twm: ["TWM.02"], v: [{ type: "fracof", n: 30, d: 5, bar: true }, { type: "fracof", n: 24, d: 8, bar: true }, { type: "fracof", n: 36, d: 4, bar: true }] },
          { mode: "your", lo: ["4Nf.01"], twm: ["TWM.05", "TWM.01"], v: [{ type: "upick", ds: [8, 4, 3], ask: "smallest", at: 2 }, { type: "upick", ds: [2, 6, 10], ask: "largest", at: 0 }, { type: "upick", ds: [9, 5, 7], ask: "smallest", at: 1 }] }] }] },
      { id: 's7a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Compare and share", vi: "So sánh và chia" }, rounds: [
          { mode: "your", lo: ["4Nf.01"], twm: ["TWM.05"], v: [{ type: "fsym", rows: [[3, 6], [10, 8]] }, { type: "fsym", rows: [[5, 4], [2, 9]] }, { type: "fsym", rows: [[12, 6], [3, 7]] }] },
          { mode: "your", lo: ["4Nf.02"], twm: ["TWM.05"], v: [
            { type: "fdiv", a: 3, b: 4, one: "melon", many: "melons", pic: false, text: "<b>4</b> children share <b>3</b> melons equally. What fraction of a melon does each child get?" },
            { type: "fdiv", a: 2, b: 5, one: "pizza", many: "pizzas", pic: false, text: "<b>5</b> friends share <b>2</b> pizzas equally. What fraction of a pizza does each friend get?" },
            { type: "fdiv", a: 5, b: 8, one: "cake", many: "cakes", pic: false, text: "<b>8</b> children share <b>5</b> cakes equally. What fraction of a cake does each child get?" }] }] },
      { title: { en: "Fractions of amounts", vi: "Phân số của một số" }, rounds: [
          { mode: "your", lo: ["4Nf.03"], twm: ["TWM.02"], v: [{ type: "fcalc", items: [[3, 27], [8, 40]] }, { type: "fcalc", items: [[4, 36], [6, 42]] }, { type: "fcalc", items: [[5, 45], [9, 63]] }] },
          { mode: "your", lo: ["4Nf.03"], twm: ["TWM.01"], v: [
            { type: "fstory", n: 60, d: 4, unit: "cm", text: "A ribbon is <b>60</b> cm long. Ngan uses <b>one quarter</b> of it. How many centimetres does she use?" },
            { type: "fstory", n: 32, d: 8, unit: "children", text: "There are <b>32</b> children in a class. <b>One eighth</b> of them wear glasses. How many children wear glasses?" },
            { type: "fstory", n: 40, d: 5, rest: true, unit: "marbles", text: "Phu has <b>40</b> marbles. He gives <b>one fifth</b> of them to his sister. How many marbles does he have left?" }] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["4Nf.01", "4Nf.02", "4Nf.03"], twm: ["TWM.07", "TWM.04"], v: [
            { type: "claim", who: "Trinh", ok: false, at: 1, fact: { k: "ucmp", a: 8, b: 4, rel: ">" },
              says: "One eighth is bigger than one quarter, because 8 is bigger than 4.",
              reasons: [
                { t: "more parts make smaller parts. An eighth is smaller than a quarter." },
                { t: "8 is bigger than 4, so one eighth is bigger.", why: "8 means the whole is cut into 8 parts. More parts are smaller parts." },
                { t: "they are the same size.", why: "Look at the strips. A quarter is twice as big as an eighth." }],
              hint: { pic: { k: "fbars", list: [4, 8] }, step: "Cut one strip into 4 parts and the same strip into 8 parts. Which parts are bigger?" },
              worked: "A strip cut into 8 parts has smaller parts than the same strip cut into 4 parts. So one eighth is smaller than one quarter.",
              model: "Trinh is incorrect because a whole cut into 8 parts has smaller parts than a whole cut into 4 parts." },
            { type: "claim", who: "Duy", ok: true, at: 0, fact: { k: "fdiv", a: 3, b: 5, says: [3, 5] },
              says: "3 ÷ 5 is the same as three fifths.",
              reasons: [
                { t: "3 shared into 5 equal parts gives 3 parts of size one fifth." },
                { t: "3 and 5 are both odd numbers.", why: "Odd or even does not matter here. Think of sharing." },
                { t: "you can never divide 3 by 5.", why: "You can: share 3 pizzas among 5 children." }],
              hint: { pic: { k: "pizzas", wholes: 3, people: 5 }, step: "Think of 3 pizzas shared among 5 children. What does each child get?" },
              worked: "Cut each of the 3 pizzas into 5 equal parts. Each child gets 3 parts of size one fifth. That is three fifths.",
              model: "Duy is correct because 3 shared into 5 equal parts gives three fifths." },
            { type: "claim", who: "Quyen", ok: false, at: 2, fact: { k: "fracof", n: 24, d: 3, says: 21 },
              says: "One third of 24 is 21.",
              reasons: [
                { t: "one third means 24 ÷ 3, and that is 8." },
                { t: "24 − 3 = 21, so she is right.", why: "One third does not mean take away 3. It means divide by 3." },
                { t: "one third of 24 is 72.", why: "72 is 24 × 3. One third means divide by 3." }],
              hint: { pic: { k: "bar", whole: 24, parts: [null, null, null] }, step: "One third means: share into 3 equal parts." },
              worked: "24 shared into 3 equal parts is 8 in each part. So one third of 24 is 8, not 21.",
              model: "Quyen is incorrect because one third of 24 is 24 ÷ 3 = 8." }] }] }] }
    ],
    // Notes: how to do it. Each note has a worked example and a picture made by the maths tools. From Maths v2
    // CONTENT[7].notes and tips, with new examples. The check: one gap sentence per note, in the same order (each right
    // answer is worked out again by test/stop-steps.mjs).
    notes: {
      items: [
        { en: 'The [[denominator]] is the bottom number. It tells how many [[equal parts]] make the whole.',
          vi: 'Mẫu số là số ở dưới. Nó cho biết cái nguyên được chia thành bao nhiêu phần bằng nhau.',
          example: ['A strip is cut into 4 equal parts.', 'One part is *one quarter*. We write 1 over 4.'],
          pic: { k: 'fbar', parts: 4, shade: 1, cap: F(1, 4) } },
        { en: 'More parts make smaller parts. Cut the same strip into 2, 4 and 8.',
          vi: 'Càng nhiều phần thì mỗi phần càng nhỏ. Cắt cùng một băng giấy thành 2, 4 và 8 phần.',
          example: ['One half is bigger than one quarter.', 'One eighth is the *smallest*: it has the most parts.'],
          pic: { k: 'fbars', list: [2, 4, 8] } },
        { en: 'The [[numerator]] is the top number. It tells how many parts you take.',
          vi: 'Tử số là số ở trên. Nó cho biết em lấy bao nhiêu phần.',
          example: ['3 of 4 equal parts are orange.', 'That is *three quarters*: 3 over 4.'],
          pic: { k: 'fbar', parts: 4, shade: 3, cap: F(3, 4) } },
        { en: 'A [[fraction]] is a division. 3 pizzas shared by 4 children is 3 ÷ 4.',
          vi: 'Phân số là một phép chia. 3 bánh pizza chia đều cho 4 bạn là 3 ÷ 4.',
          example: ['Cut each pizza into 4. Each child gets 3 slices.', '3 ÷ 4 is *three quarters*: 3 over 4.'],
          pic: { k: 'pizzas', wholes: 3, people: 4 } },
        { en: 'To find a [[unit fraction]] of an amount, divide by the bottom number.',
          vi: 'Để tìm phân số đơn vị của một số, em chia cho mẫu số.',
          example: ['One fifth of 30 is 30 ÷ 5 = *6*.', 'Backwards: if one fifth is 6, the whole is 5 × 6 = 30.'],
          pic: { k: 'bar', whole: 30, parts: [6, 6, 6, 6, 6] } },
        { en: 'Read the question again. Does it ask for the part, or for what is left?',
          vi: 'Đọc lại câu hỏi. Câu hỏi hỏi phần được lấy, hay phần còn lại?',
          example: ['40 cards. One fifth are given away: 40 ÷ 5 = 8.', 'Cards left: 40 − 8 = *32*.'],
          pic: { k: 'bar', whole: 40, parts: [8, 32] } }
      ],
      check: [
        { sentence: 'How many sixths make 1 whole? {6|1|12}', answer: '6' },
        { sentence: 'Which is smaller? {one eighth|one quarter|one half}', answer: 'one eighth' },
        { sentence: '3 of 8 equal parts are orange. That is {three eighths|eight thirds|three fifths}.', answer: 'three eighths' },
        { sentence: '2 ÷ 5 is the same as {two fifths|five halves|seven fifths}.', answer: 'two fifths' },
        { sentence: 'One quarter of 28 is {7|24|32}.', answer: '7' },
        { sentence: 'One fifth of 35 is given away. Left: {28|7|30}.', answer: '28' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard, 4 at DOK 1, 5 at DOK 2, 1 at DOK 3 (T.DOK_MIX, docs/05).
    // Each item: dok (its real level, judged with T.DOK), lo, twm (1 or 2, T.TWM) and 3 fresh sets of numbers
    // (play 1 uses v[0]). Written fresh for v3 with the Maths v2 Stop 7 models and new numbers, names and contexts:
    // how many unit fractions make a whole (recall), the largest or smallest of three unit fractions (tick one), a division
    // written as a fraction or back, and two bare fractions of amounts are DOK 1 (recall, one routine step); signs between
    // unit fractions in two rows (both directions), a sharing story written as a fraction, a unit fraction backwards (one
    // part known, find the whole), a story with one fraction of an amount and a story in two steps (what is left) are DOK 2.
    // Question 10 is a new general claim about fractions of a number, judged and justified with a number (DOK 3, Number).
    // Run by src/steps/70-test.js with the models; answers logged with game letter 'm' and dok.
    test: {
      items: [
        { dok: 1, lo: ["4Nf.01"], twm: ["TWM.05"], v: [
          { type: "fwhole", d: 8 },
          { type: "fwhole", d: 5 },
          { type: "fwhole", d: 3 }
        ] },
        { dok: 1, lo: ["4Nf.01"], twm: ["TWM.05", "TWM.01"], v: [
          { type: "upick", ds: [5, 9, 2], ask: "largest", at: 2 },
          { type: "upick", ds: [4, 7, 6], ask: "smallest", at: 0 },
          { type: "upick", ds: [10, 3, 8], ask: "largest", at: 1 }
        ] },
        { dok: 1, lo: ["4Nf.02"], twm: ["TWM.05"], v: [
          { type: "fdivsent", a: 2, b: 7, miss: "frac" },
          { type: "fdivsent", a: 5, b: 9, miss: "div" },
          { type: "fdivsent", a: 3, b: 10, miss: "frac" }
        ] },
        { dok: 1, lo: ["4Nf.03"], twm: ["TWM.02"], v: [
          { type: "fcalc", items: [[3, 24], [5, 45]] },
          { type: "fcalc", items: [[4, 36], [2, 50]] },
          { type: "fcalc", items: [[6, 42], [10, 80]] }
        ] },
        { dok: 2, lo: ["4Nf.01"], twm: ["TWM.05"], v: [
          { type: "fsym", rows: [[5, 8], [10, 3]] },
          { type: "fsym", rows: [[7, 4], [6, 9]] },
          { type: "fsym", rows: [[2, 5], [12, 4]] }
        ] },
        { dok: 2, lo: ["4Nf.02"], twm: ["TWM.05"], v: [
          { type: "fdiv", a: 3, b: 8, one: "pizza", many: "pizzas", text: "At a party, <b>3</b> pizzas are shared equally among <b>8</b> children. How much pizza does each child get?" },
          { type: "fdiv", a: 4, b: 7, one: "cake", many: "cakes", kind: "cake", text: "Grandma shares <b>4</b> cakes equally among <b>7</b> children. How much cake does each child get?" },
          { type: "fdiv", a: 2, b: 9, one: "pizza", many: "pizzas", text: "<b>9</b> children share <b>2</b> pizzas equally. How much pizza does each child get?" }
        ] },
        { dok: 2, lo: ["4Nf.03"], twm: ["TWM.02"], v: [
          { type: "fback", d: 6, part: 4 },
          { type: "fback", d: 3, part: 7 },
          { type: "fback", d: 8, part: 5 }
        ] },
        { dok: 2, lo: ["4Nf.03"], twm: ["TWM.01"], v: [
          { type: "fstory", n: 36, d: 4, unit: "lanterns", text: "There are <b>36</b> lanterns at the Mid-Autumn Festival. <b>One quarter</b> of them are red. How many lanterns are red?" },
          { type: "fstory", n: 70, d: 10, unit: "km", text: "A bus trip to the beach is <b>70</b> km long. The bus stops after <b>one tenth</b> of the trip. How many km has it gone?" },
          { type: "fstory", n: 27, d: 3, unit: "mangoes", text: "Nam picks <b>27</b> mangoes from a tree. <b>One third</b> of them are still green. How many mangoes are green?" }
        ] },
        { dok: 2, lo: ["4Nf.03"], twm: ["TWM.01"], v: [
          { type: "fstory", n: 48, d: 6, rest: true, unit: "eggs", text: "A farmer has <b>48</b> eggs. <b>One sixth</b> of them break on the way to the market. How many eggs are left?" },
          { type: "fstory", n: 50, d: 5, rest: true, unit: "balloons", text: "A class blows up <b>50</b> balloons for a party. <b>One fifth</b> of them pop. How many balloons are left?" },
          { type: "fstory", n: 32, d: 4, rest: true, unit: "stickers", text: "Hanh has <b>32</b> stickers. She gives <b>one quarter</b> of them to her friend. How many stickers does Hanh have left?" }
        ] },
        { dok: 3, lo: ["4Nf.01", "4Nf.03"], twm: ["TWM.07", "TWM.04"], v: [
          { type: "claim", who: "Thu", ok: false, at: 1, ctx: "Thu thinks about one fifth and one quarter of the same number.", fact: { k: "ofmore", a: 5, b: 4, eg: 40 },
            says: "One fifth of a number is more than one quarter of it, because 5 is bigger than 4.",
            reasons: [
              { t: "one fifth of 40 is 8 and one quarter of 40 is 10. 8 is less than 10." },
              { t: "5 is bigger than 4, so one fifth is more.", why: "A bigger bottom number means more parts. More parts are smaller parts." },
              { t: "one fifth and one quarter of a number are always the same.", why: "Work them out for 40: 40 ÷ 5 and 40 ÷ 4." }],
            hint: { pic: { k: "fbars", list: [4, 5] }, step: "Try a number. Work out 40 ÷ 5 and 40 ÷ 4. Which is more?" },
            worked: "One fifth of 40 is 40 ÷ 5 = 8. One quarter of 40 is 40 ÷ 4 = 10. 8 is less than 10.",
            model: "Thu is incorrect because one fifth of 40 is 8 and one quarter of 40 is 10." },
          { type: "claim", who: "Hieu", ok: true, at: 0, ctx: "Hieu finds one quarter of <b>12, 28, 36</b>.", fact: { k: "halve2", eg: 28, list: [12, 28, 36] },
            says: "To find one quarter of a number, halve it, then halve it again.",
            reasons: [
              { t: "half of 28 is 14 and half of 14 is 7. 28 ÷ 4 is 7 too." },
              { t: "a half is bigger than a quarter.", why: "That is true, but it does not test the claim. Try it with 28." },
              { t: "you must always divide by 4 to find a quarter.", why: "Dividing by 4 works. Halving two times gives the same answer. Try it with 28." }],
            hint: { pic: { k: "bar", whole: 28, parts: [14, 14] }, step: "Halve 28. Then halve the answer. Is it the same as 28 ÷ 4?" },
            worked: "Half of 12 is 6, and half of 6 is 3. 12 ÷ 4 = 3 too. Half of 28 is 14, and half of 14 is 7. 28 ÷ 4 = 7 too.",
            model: "Hieu is correct because half of 28 is 14, half of 14 is 7, and 28 ÷ 4 = 7." },
          { type: "claim", who: "Kim", ok: false, at: 2, ctx: "Kim finds one half of <b>10, 30, 20, 50</b>.", fact: { k: "halfend", eg: 20, list: [10, 30, 20, 50] },
            says: "One half of a number that ends in 0 always ends in 5.",
            reasons: [
              { t: "20 ends in 0, but one half of 20 is 10, and 10 ends in 0." },
              { t: "one half of 10 is 5, and 5 ends in 5.", why: "That is true for 10. Now look at 20." },
              { t: "one half of 30 is 15.", why: "That is true, but 15 fits the claim. Look for a number that does not fit." }],
            hint: { pic: { k: "bar", whole: 20, parts: [null, null] }, step: "Find one half of each number in the list. Does every answer end in 5?" },
            worked: "Half of 10 is 5, half of 30 is 15 and half of 50 is 25. But half of 20 is 10, and 10 ends in 0.",
            model: "Kim is incorrect because one half of 20 is 10, and 10 does not end in 5." }
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). The 72 Maths v2
    // Stop 7 questions (legacy/maths-v2/src/pool.js LPOOL[7], made by its tools/genpool.mjs), copied as they are.
    lightning: {
      secs: 60,
      items: [
        ["1/5 of 15",["3","10","4"]],["1/4 of 28",["7","24","8"]],["1/4 of 12",["3","8","4"]],
        ["1/2 of 14",["7","12","8"]],["1/3 of 15",["5","12","6"]],["1/10 of 70",["7","60","8"]],
        ["1/4 of 24",["6","20","7"]],["1/5 of 30",["6","25","7"]],["1/10 of 50",["5","40","6"]],
        ["1/5 of 10",["2","5","3"]],["1/2 of 4",["2","4","3"]],["1/3 of 21",["7","18","8"]],
        ["1/2 of 18",["9","16","10"]],["1/2 of 10",["5","8","6"]],["1/2 of 8",["4","6","5"]],
        ["1/3 of 27",["9","24","10"]],["1/5 of 20",["4","15","5"]],["1/5 of 25",["5","20","6"]],
        ["1/2 of 16",["8","14","9"]],["1/10 of 40",["4","30","5"]],["1/2 of 12",["6","10","7"]],
        ["1/3 of 9",["3","6","4"]],["Which is bigger: 1/6 or 1/3?",["1/3","1/6","they are equal"]],["Which is bigger: 1/4 or 1/8?",["1/4","1/8","they are equal"]],
        ["Which is bigger: 1/4 or 1/10?",["1/4","1/10","they are equal"]],["Which is bigger: 1/8 or 1/5?",["1/5","1/8","they are equal"]],["Which is bigger: 1/10 or 1/4?",["1/4","1/10","they are equal"]],
        ["Which is bigger: 1/8 or 1/6?",["1/6","1/8","they are equal"]],["Which is bigger: 1/5 or 1/8?",["1/5","1/8","they are equal"]],["Which is bigger: 1/5 or 1/6?",["1/5","1/6","they are equal"]],
        ["Which is bigger: 1/4 or 1/2?",["1/2","1/4","they are equal"]],["Which is bigger: 1/3 or 1/8?",["1/3","1/8","they are equal"]],["Which is bigger: 1/6 or 1/10?",["1/6","1/10","they are equal"]],
        ["Which is bigger: 1/8 or 1/10?",["1/8","1/10","they are equal"]],["Which is smallest: 1/5, 1/4 or 1/8?",["1/8","1/5","1/4"]],["Which is smallest: 1/4, 1/3 or 1/10?",["1/10","1/4","1/3"]],
        ["Which is smallest: 1/3, 1/5 or 1/6?",["1/6","1/3","1/5"]],["Which is smallest: 1/2, 1/5 or 1/8?",["1/8","1/2","1/5"]],["Which is smallest: 1/2, 1/5 or 1/6?",["1/6","1/2","1/5"]],
        ["Which is smallest: 1/3, 1/5 or 1/4?",["1/5","1/3","1/4"]],["Which is smallest: 1/8, 1/10 or 1/2?",["1/10","1/8","1/2"]],["Which is smallest: 1/2, 1/3 or 1/10?",["1/10","1/2","1/3"]],
        ["3 ÷ 10 as a fraction",["3/10","10/3","1/10"]],["6 ÷ 8 as a fraction",["6/8","8/6","1/8"]],["1 ÷ 6 as a fraction",["1/6","6/1","1/7"]],
        ["2 ÷ 6 as a fraction",["2/6","6/2","1/6"]],["3 ÷ 4 as a fraction",["3/4","4/3","1/4"]],["4 ÷ 8 as a fraction",["4/8","8/4","1/8"]],
        ["5 ÷ 7 as a fraction",["5/7","7/5","1/7"]],["2 ÷ 10 as a fraction",["2/10","10/2","1/10"]],["5 ÷ 6 as a fraction",["5/6","6/5","1/6"]],
        ["6 ÷ 9 as a fraction",["6/9","9/6","1/9"]],["How many fifths make 1 whole?",["5","1","10"]],["How many sixths make 1 whole?",["6","1","12"]],
        ["How many quarters make 1 whole?",["4","1","8"]],["How many halves make 1 whole?",["2","1","4"]],["How many eighths make 1 whole?",["8","1","16"]],
        ["How many thirds make 1 whole?",["3","1","6"]],["How many tenths make 1 whole?",["10","1","20"]],["1/4 of a number is 6. The number is",["24","10","6"]],
        ["1/2 of a number is 9. The number is",["18","11","9"]],["1/2 of a number is 4. The number is",["8","6","4"]],["1/3 of a number is 5. The number is",["15","8","5"]],
        ["1/4 of a number is 8. The number is",["32","12","8"]],["1/3 of a number is 3. The number is",["9","6","3"]],["1/4 of a number is 9. The number is",["36","13","9"]],
        ["A whole is cut into 7 equal parts. One part is",["1/7","7/1","1/6"]],["A whole is cut into 8 equal parts. One part is",["1/8","8/1","1/7"]],["A whole is cut into 11 equal parts. One part is",["1/11","11/1","1/10"]],
        ["A whole is cut into 5 equal parts. One part is",["1/5","5/1","1/4"]],["A whole is cut into 10 equal parts. One part is",["1/10","10/1","1/9"]],["A whole is cut into 4 equal parts. One part is",["1/4","4/1","1/3"]]
      ]
    },
    // My self-check: the 4 Maths v2 Stop 7 goals, in the same order (the dashboard reads the answers by goal number).
    // again: the step to practise again for each goal (v2 CONTENT[7].again: c = See it, r and a = Practise).
    selfcheck: {
      goals: ["say why more parts make smaller parts", "compare unit fractions", "write a division as a fraction", "find a unit fraction of an amount"],
      again: ["c", "c", "r", "c"]
    }
  };
})(window.T = window.T || {});
