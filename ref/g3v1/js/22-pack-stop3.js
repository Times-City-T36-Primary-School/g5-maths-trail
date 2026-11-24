/* 22-pack-stop3.js - ALL the content of Stop 3, Compare, order and round (shape: docs/02-architecture.md).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The tools (two numbers compared place by
   place, number tiles to put in order, a ring around every number that fits) are in src/toolkit/39-tools-order.js; the
   rounding line (the number line's round mode) and its picture rline are in src/toolkit/39-tools-lines.js. */
(function (T) {
  'use strict';

  T.packs[3] = {
    n: 3,
    title: "Compare, order and round",
    los: ["4Np.04", "4Np.05"],   // the learning objectives (shown to teachers under the last note)
    blurb: {
      en: "Which number is *greater*? Put numbers in order. *Round* to the nearest 10 or 100.",
      vi: "Số nào *lớn hơn*? Sắp xếp các số theo thứ tự. *Làm tròn* đến số tròn chục hoặc tròn trăm gần nhất."
    },
    // Words: the 7 Maths v2 Stop 3 key words (WORDS with s: 3; vi and meaning as in v2) and two new ones (equal to,
    // number line), in three sets of picture cards with a quick check. The pictures are in src/art/07-art-words-3.js.
    words: {
      sets: [
        { id: 'A', title: { en: 'Compare', vi: 'So sánh' }, keys: ['compare', 'greater than', 'less than'] },
        { id: 'B', title: { en: 'Signs and order', vi: 'Dấu và thứ tự' }, keys: ['equal to', 'order', 'number line'] },
        { id: 'C', title: { en: 'Rounding', vi: 'Làm tròn số' }, keys: ['round', 'nearest', 'halfway'] }
      ],
      items: {
        'compare': { art: 'w-compare', vi: 'so sánh', def: 'To look at two numbers and say which one is greater. 4,075 > 4,057.' },
        'greater than': { art: 'w-greater-than', vi: 'lớn hơn', def: 'Bigger than. The sign is >. For example 9 > 5.' },
        'less than': { art: 'w-less-than', vi: 'bé hơn', def: 'Smaller than. The sign is <. For example −9 < −6.' },
        'equal to': { art: 'w-equal-to', vi: 'bằng', def: 'The same value. The sign is =. For example 3,050 = 3,050.' },
        'order': { art: 'w-order', vi: 'sắp xếp theo thứ tự', def: 'To put numbers in a line, from smallest to largest or from largest to smallest.' },
        'number line': { art: 'w-number-line', vi: 'trục số', def: 'A line with numbers in order. The numbers get bigger to the right.' },
        'round': { art: 'w-round', vi: 'làm tròn', def: 'To change a number to a near number that is easier to use. 47 rounds to 50.' },
        'nearest': { art: 'w-nearest', vi: 'gần nhất', def: 'The closest. 47 is between 40 and 50. The nearest 10 is 50.' },
        'halfway': { art: 'w-halfway', vi: 'ở chính giữa', def: 'Exactly in the middle. 45 is halfway between 40 and 50. Halfway numbers round up.' }
      }
    },
    // See it: Concrete. Three hands-on scenes (two numbers compared place by place on a place value chart, numbers put
    // in order with a number line, Zip rounds on the number line and finds halfway), then the challenge: the 5 v2
    // "Build it" slots (CONTENT[3].stages[0]) with TWM tags.
    see: {
      scenes: [
        { id: 'compare', title: { en: 'Which is greater?', vi: 'Số nào lớn hơn?' }, tool: 'pvcmp',
          pic: [{ k: 'mat', b: [3, 2, 6, 4], counts: false, u: 4.2, cap: '3,264' }, { k: 'mat', b: [3, 2, 4, 6], counts: false, u: 4.2, cap: '3,246' }],
          pvcmp: { a: 3264, b: 3246, cols: 4 },
          steps: [
            { can: { look: true }, wait: 'look', until: { at: 0 },
              zip: { en: 'Compare the *biggest place* first. Tap *Next place*.', vi: 'So sánh hàng *lớn nhất* trước. Bấm *Next place* (Hàng tiếp theo).' },
              then: { en: '*3* thousands and *3* thousands. The same!', vi: '*3* nghìn và *3* nghìn. Bằng nhau!' } },
            { can: { look: true }, wait: 'look', until: { at: 1 },
              zip: { en: 'Tap *Next place* again.', vi: 'Bấm *Next place* lần nữa.' },
              then: { en: '*2* hundreds and *2* hundreds. Still the same!', vi: '*2* trăm và *2* trăm. Vẫn bằng nhau!' } },
            { can: { look: true }, wait: 'look', until: { at: 2 },
              zip: { en: 'Now look at the *tens*.', vi: 'Bây giờ em nhìn hàng *chục*.' },
              then: { en: '*6* tens is more than *4* tens!', vi: '*6* chục nhiều hơn *4* chục!' } },
            { can: { sign: '>' }, wait: 'sign', until: { sym: '>' },
              zip: { en: 'Which *sign* fits? Tap it.', vi: '*Dấu* nào phù hợp? Bấm vào dấu đó.' },
              then: { en: '*3,264 > 3,246*. The open side faces the greater number.', vi: '*3,264 > 3,246*. Phía mở của dấu quay về số lớn hơn.' } }] },
        { id: 'order', title: { en: 'Put them in order', vi: 'Sắp xếp theo thứ tự' }, tool: 'order',
          pic: { k: 'nline', mode: 'show', skin: 'board', min: -6, max: 4, marks: [-5, -2, 0, 3] },
          order: { nums: [3, -5, 0, -2] },
          steps: [
            { can: { place: [-5] }, wait: 'place', until: { placed: 1 },
              zip: { en: 'Which number is the *smallest*? Tap it.', vi: 'Số nào *bé nhất*? Bấm vào số đó.' },
              then: { en: '*−5* is furthest left. It is the smallest!', vi: '*−5* ở xa nhất bên trái. Đó là số bé nhất!' } },
            { can: { place: [-2] }, wait: 'place', until: { placed: 2 },
              zip: { en: 'Now tap the *next smallest* number.', vi: 'Bây giờ bấm số *bé tiếp theo*.' },
              then: { en: '*−2* is next. It is left of zero.', vi: '*−2* đứng tiếp theo. Số này ở bên trái số 0.' } },
            { can: { place: [0, 3] }, wait: 'place', until: { placed: 4 },
              zip: { en: 'Tap the last *two* numbers in order.', vi: 'Bấm *hai* số cuối theo thứ tự.' },
              then: { en: '*−5, −2, 0, 3*: smallest to largest!', vi: '*−5, −2, 0, 3*: từ bé nhất đến lớn nhất!' } }] },
        { id: 'round', title: { en: 'Round to the nearest', vi: 'Làm tròn đến số gần nhất' }, tool: 'nline',
          nline: { mode: 'round', skin: 'wood', n: 38, to: 10 },
          steps: [
            { can: { mid: true }, wait: 'mid',
              zip: { en: 'Zip is on *38*. Tap *Halfway*.', vi: 'Zip đang ở số *38*. Bấm *Halfway* (Chính giữa).' },
              then: { en: '*35* is halfway. 38 is past it.', vi: '*35* ở chính giữa. 38 đã qua số đó.' } },
            { can: { pick: 40 }, wait: 'pick', until: { choice: 40 },
              zip: { en: 'Is 38 nearer *30* or *40*? Tap it.', vi: '38 gần *30* hay *40* hơn? Bấm vào số đó.' },
              then: { en: '38 is nearer 40. It *rounds up* to 40!', vi: '38 gần 40 hơn. Làm tròn *lên* thành 40!' } },
            { nline: { n: 65, mid: true }, can: { pick: 70 }, wait: 'pick', until: { choice: 70 },
              zip: { en: '*65* is exactly halfway. Tap the answer.', vi: '*65* ở đúng chính giữa. Bấm vào đáp án.' },
              then: { en: 'Halfway numbers *round up*. 65 rounds to *70*.', vi: 'Số ở chính giữa thì *làm tròn lên*. 65 thành *70*.' } },
            { nline: { n: 720, to: 100, mid: true }, can: { pick: 700 }, wait: 'pick', until: { choice: 700 },
              zip: { en: 'Now round *720* to the nearest *hundred*.', vi: 'Bây giờ làm tròn *720* đến hàng *trăm* gần nhất.' },
              then: { en: '720 is nearer 700. It *rounds down*.', vi: '720 gần 700 hơn. Làm tròn *xuống*.' } }] },
        { id: 'challenge', title: { en: 'Compare and round', vi: 'So sánh và làm tròn' },
          challenge: {
            end: { en: 'You did it! You can compare and round.', vi: 'Em làm được rồi! Em biết so sánh và làm tròn.' },
            result: 'You compared, ordered and rounded numbers.',
            rounds: [
          { mode: "our", lo: ["4Np.04"], twm: ["TWM.05"], v: [
            { type: "cmp", items: [{ a: 1243, b: 1234 }], mats: true },
            { type: "cmp", items: [{ a: 2051, b: 2105 }], mats: true },
            { type: "cmp", items: [{ a: 1320, b: 1302 }], mats: true }] },
          { mode: "our", lo: ["4Np.05"], twm: ["TWM.02"], v: [{ type: "roundline", n: 63, to: 10 }, { type: "roundline", n: 28, to: 10 }, { type: "roundline", n: 85, to: 10 }] },
          { mode: "your", lo: ["4Np.04"], twm: ["TWM.05"], v: [
            { type: "cmp", items: [{ a: 1099, b: 1100 }], mats: true },
            { type: "cmp", items: [{ a: 2004, b: 1999 }], mats: true },
            { type: "cmp", items: [{ a: 1210, b: 1201 }], mats: true }] },
          { mode: "your", lo: ["4Np.04"], twm: ["TWM.06"], v: [
            { type: "order", nums: [3205, 3052, 3250, 3025] },
            { type: "order", nums: [6718, 6781, 6178, 6871] },
            { type: "order", nums: [9040, 9004, 9400, 9044] }] },
          { mode: "your", lo: ["4Np.05"], twm: ["TWM.02"], v: [{ type: "roundline", n: 3462, to: 100 }, { type: "roundline", n: 718, to: 100 }, { type: "roundline", n: 2350, to: 100 }] }] } }]
    },
    // Practise: Pictorial (Draw it: rounding on a number line, numbers below zero on a line) then Abstract (Solve it,
    // like the test). The rounds are the Maths v2 Stop 3 slots (data/v2/mdata3.js CONTENT[3] stages 2 and 3), with TWM
    // tags; Draw it starts with rounding (a word link in the first question), then the line below zero.
    practise: [
      { id: 's3r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Round and order on a number line.', vi: 'Làm tròn và sắp xếp trên trục số.' },
        levels: [
      { title: { en: "Round on a line", vi: "Làm tròn trên trục số" }, rounds: [
          { mode: "our", lo: ["4Np.05"], twm: ["TWM.02"], v: [{ type: "round", n: 4730, to: 1000, line: true }, { type: "round", n: 8260, to: 1000, line: true }, { type: "round", n: 15500, to: 1000, line: true }] },
          { mode: "your", lo: ["4Np.05"], twm: ["TWM.02"], v: [{ type: "round", n: 47300, to: 10000, line: true }, { type: "round", n: 62800, to: 10000, line: true }, { type: "round", n: 85000, to: 10000, line: true }] },
          { mode: "your", lo: ["4Np.05"], twm: ["TWM.02"], v: [{ type: "roundline", n: 2500, to: 1000, skin: "board" }, { type: "roundline", n: 450, to: 100, skin: "board" }, { type: "roundline", n: 35000, to: 10000, skin: "board" }] }] },
      { title: { en: "Below zero", vi: "Dưới số 0" }, rounds: [
          { mode: "your", lo: ["4Np.04"], twm: ["TWM.05"], v: [
            { type: "cmp", items: [{ a: -8, b: -2 }], line: { min: -10, max: 10, lab: 5 } },
            { type: "cmp", items: [{ a: -4, b: -9 }], line: { min: -10, max: 10, lab: 5 } },
            { type: "cmp", items: [{ a: -5, b: 3 }], line: { min: -10, max: 10, lab: 5 } }] },
          { mode: "your", lo: ["4Np.04"], twm: ["TWM.06"], v: [
            { type: "order", nums: [3, -8, 0, -2, 6] },
            { type: "order", nums: [-5, 4, -9, 1, -1] },
            { type: "order", nums: [7, -3, -10, 2, -6] }] }] }] },
      { id: 's3a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Signs and order", vi: "Dấu so sánh và thứ tự" }, rounds: [
          { mode: "your", lo: ["4Np.04"], twm: ["TWM.05"], v: [
            { type: "cmp", items: [{ a: 4075, b: 4057 }, { a: -6, b: -9 }] },
            { type: "cmp", items: [{ a: 18300, b: 18030 }, { a: -12, b: -8 }] },
            { type: "cmp", items: [{ a: 9909, b: 9990 }, { a: 0, b: -4 }] }] },
          { mode: "your", lo: ["4Np.04"], twm: ["TWM.06"], v: [
            { type: "order", nums: [12, -7, -15, 4, 0] },
            { type: "order", nums: [-20, 15, -5, -25, 10] },
            { type: "order", nums: [8, -1, -11, 1, -8] }] }] },
      { title: { en: "Rounding", vi: "Làm tròn" }, rounds: [
          { mode: "your", lo: ["4Np.05"], twm: ["TWM.02"], v: [{ type: "round", n: 38460, to: 1000 }, { type: "round", n: 6752, to: 100 }, { type: "round", n: 74900, to: 10000 }] },
          { mode: "your", lo: ["4Np.05"], twm: ["TWM.06", "TWM.01"], v: [
            { type: "roundall", target: 400, to: 100, nums: [350, 450, 349, 462, 438, 340] },
            { type: "roundall", target: 70, to: 10, nums: [65, 74, 75, 64, 68, 71] },
            { type: "roundall", target: 3000, to: 1000, nums: [2500, 3499, 3500, 2499, 2900, 3620] }] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["4Np.04", "4Np.05"], twm: ["TWM.07", "TWM.04"], v: [
            { type: "claim", who: "Long", ok: false, at: 0, fact: { k: "cmp", a: -12, b: -8, sym: ">" },
              says: "−12 is greater than −8, because 12 is greater than 8.",
              reasons: [
                { t: "−12 is further to the left of zero than −8, so −12 is less." },
                { t: "12 is greater than 8, so −12 is greater than −8.", why: "For negative numbers it is the other way round. Think of the number line." },
                { t: "all negative numbers are the same size.", why: "Negative numbers have different sizes. −12 is further below zero than −8." }],
              hint: { pic: { k: "nline", mode: "show", skin: "board", min: -15, max: 5, lab: 5, marks: [-12, -8] }, step: "Find −12 and −8 on the number line. Which one is further to the left?" },
              worked: "On the number line, −12 is further to the left than −8. So −12 is less than −8.",
              model: "Long is incorrect because −12 is further below zero than −8, so it is less." },
            { type: "claim", who: "Thao", ok: true, at: 1, fact: { k: "round", n: 7449, to: 100, r: 7400 },
              says: "When I round 7,449 to the nearest 100, I get 7,400.",
              reasons: [
                { t: "the tens digit is 4, and 4 or less rounds down." },
                { t: "the ones digit is 9, and 9 rounds up.", why: "To round to the nearest 100, look at the tens digit, not the ones digit." },
                { t: "you always round down.", why: "You do not always round down. A tens digit of 5 or more rounds up." }],
              hint: { pic: { k: "rline", n: 7449, to: 100 }, step: "To round to the nearest 100, look at the tens digit." },
              worked: "7,449 is between 7,400 and 7,500. The tens digit is 4, so round down to 7,400.",
              model: "Thao is correct because the tens digit is 4, so 7,449 rounds down to 7,400." },
            { type: "claim", who: "Quan", ok: false, at: 2, fact: { k: "round", n: 3950, to: 100, r: 3900 },
              says: "3,950 rounded to the nearest 100 is 3,900.",
              reasons: [
                { t: "the tens digit is 5, so 3,950 rounds up to 4,000." },
                { t: "3,950 starts with 39, so the answer is 3,900.", why: "Look at the tens digit. 5 or more rounds up to the next hundred." },
                { t: "a number can never round up to a new thousand.", why: "It can. The next hundred after 3,900 is 4,000." }],
              hint: { pic: { k: "rline", n: 3950, to: 100 }, step: "3,950 is exactly halfway between 3,900 and 4,000." },
              worked: "3,950 is halfway between 3,900 and 4,000. Halfway numbers round up, so the answer is 4,000.",
              model: "Quan is incorrect because the tens digit is 5, so 3,950 rounds up to 4,000." }] }] }] }
    ],
    // Notes: how to do it. Each note has a worked example and a picture made by the maths tools. From Maths v2
    // CONTENT[3].notes, with one new note on ordering. The check: one gap sentence per note, in the same order (each
    // right answer is worked out again by test/stop-steps.mjs).
    notes: {
      items: [
        { en: 'To [[compare]] two numbers, start with the biggest place. If it is the same, look at the next place.',
          vi: 'Để so sánh hai số, hãy bắt đầu từ hàng lớn nhất. Nếu bằng nhau, hãy nhìn sang hàng tiếp theo.',
          example: ['4,075 and 4,057: the thousands and the hundreds are the same.', 'Tens: 7 > 5, so *4,075 > 4,057*.'],
          pic: { k: 'stack', cols: 4, parts: [4075, 4057] } },
        { en: 'The open side of < and > faces the greater number. The point faces the smaller number.',
          vi: 'Phía mở của dấu < và > quay về số lớn hơn. Đầu nhọn quay về số bé hơn.',
          example: ['9 > 5: 9 is [[greater than]] 5.', '3 < 8: 3 is [[less than]] 8.'],
          art: 'w-greater-than' },
        { en: 'Below zero, the number further from zero is smaller. −9 is [[less than]] −6.',
          vi: 'Dưới số 0, số nào càng xa số 0 thì càng bé. −9 bé hơn −6.',
          example: ['On a [[number line]], −9 is further left than −6.', 'So *−9 < −6*.'],
          pic: { k: 'nline', mode: 'show', skin: 'board', min: -10, max: 0, marks: [-9, -6] } },
        { en: 'To [[order]] numbers, find the smallest first. Negative numbers come before zero.',
          vi: 'Để sắp xếp các số theo thứ tự, hãy tìm số bé nhất trước. Số âm đứng trước số 0.',
          example: ['Order 5, −3, 12, 0, −8.', 'Smallest first: *−8, −3, 0, 5, 12*.'],
          pic: { k: 'nline', mode: 'show', skin: 'board', min: -10, max: 15, lab: 5, marks: [-8, -3, 0, 5, 12] } },
        { en: 'To [[round]], look one place to the right. 5 or more rounds up. 4 or less rounds down.',
          vi: 'Để làm tròn, hãy nhìn chữ số ở hàng ngay bên phải. Từ 5 trở lên thì làm tròn lên. Từ 4 trở xuống thì làm tròn xuống.',
          example: ['Round 6,480 to the [[nearest]] 1,000.', 'The hundreds digit is 4, so round down: *6,000*.'],
          pic: { k: 'rline', n: 6480, to: 1000, show: 6000 } },
        { en: 'A [[halfway]] number rounds up. 2,500 to the [[nearest]] 1,000 is 3,000.',
          vi: 'Số ở chính giữa thì làm tròn lên. 2,500 làm tròn đến hàng nghìn gần nhất là 3,000.',
          example: ['2,500 is halfway between 2,000 and 3,000.', 'Halfway rounds up: *3,000*.'],
          pic: { k: 'rline', n: 2500, to: 1000, show: 3000 } }
      ],
      check: [
        { sentence: 'In 6,318 and 6,381, the first place that is different is the {tens|hundreds|ones}.', answer: 'tens' },
        { sentence: '7,204 {>|<|=} 7,042.', answer: '>' },
        { sentence: 'Of −6, −1 and −10, the smallest is {−10|−1|−6}.', answer: '−10' },
        { sentence: 'Smallest first: −5, {−3|3|−8}, 0, 2.', answer: '−3' },
        { sentence: '8,349 to the nearest 100 is {8,300|8,400|8,000}.', answer: '8,300' },
        { sentence: '750 to the nearest 100 is {800|700|750}.', answer: '800' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard, 4 at DOK 1, 5 at DOK 2, 1 at DOK 3 (T.DOK_MIX, docs/05).
    // Each item: dok (its real level, judged with T.DOK), lo, twm (1 or 2, T.TWM) and 3 fresh sets of numbers
    // (play 1 uses v[0]). Questions 1 to 8 use the Maths v2 Stop 3 mini test models with new numbers and contexts
    // (Nov 2026; v2's "smallest or largest number that rounds to" is DOK 2 here: working back, one rule). Question 9 is
    // new: tick the one number that rounds to a target (the v3 model roundpick, src/models/06-mtasks9.js). Question 10
    // is new: a general claim about rounding, judged and justified with evidence (DOK 3, Number strand).
    // Run by src/steps/70-test.js with the models; answers logged with game letter 'm' and dok.
    test: {
      items: [
        { dok: 1, lo: ["4Np.04"], twm: ["TWM.05"], v: [
          { type: "cmp", items: [{ a: 5182, b: 5218 }, { a: 30470, b: 30407 }] },
          { type: "cmp", items: [{ a: 7609, b: 7690 }, { a: 12305, b: 12305 }] },
          { type: "cmp", items: [{ a: 9381, b: 9318 }, { a: 46052, b: 46205 }] }
        ] },
        { dok: 1, lo: ["4Np.05"], twm: ["TWM.02"], v: [{ type: "round", n: 463, to: 10 }, { type: "round", n: 2718, to: 10 }, { type: "round", n: 1095, to: 10 }] },
        { dok: 1, lo: ["4Np.05"], twm: ["TWM.02"], v: [{ type: "round", n: 3829, to: 100 }, { type: "round", n: 651, to: 100 }, { type: "round", n: 7962, to: 100 }] },
        { dok: 1, lo: ["4Np.04"], twm: ["TWM.05"], v: [
          { type: "cmp", items: [{ a: -7, b: -3 }] },
          { type: "cmp", items: [{ a: -12, b: -15 }] },
          { type: "cmp", items: [{ a: 0, b: -6 }] }
        ] },
        { dok: 2, lo: ["4Np.04"], twm: ["TWM.06"], v: [
          { type: "order", nums: [6, -11, 0, -4, 9] },
          { type: "order", nums: [-3, 15, -16, 2, -8] },
          { type: "order", nums: [-1, 7, -20, 0, 12] }
        ] },
        { dok: 2, lo: ["4Np.05"], twm: ["TWM.02"], v: [
          { type: "round", n: 14560, to: 1000, text: "A school library has <b>14,560</b> books." },
          { type: "round", n: 28350, to: 1000, text: "<b>28,350</b> people ran in a city race." },
          { type: "round", n: 63500, to: 1000, text: "A farm grew <b>63,500</b> mangoes this year." }
        ] },
        { dok: 2, lo: ["4Np.05"], twm: ["TWM.06", "TWM.01"], v: [
          { type: "roundall", target: 60, to: 10, nums: [55, 64, 65, 54, 58, 61] },
          { type: "roundall", target: 7000, to: 1000, nums: [6500, 7499, 7500, 6499, 7210, 6080] },
          { type: "roundall", target: 2400, to: 100, nums: [2350, 2449, 2450, 2349, 2418, 2391] }
        ] },
        { dok: 2, lo: ["4Np.05"], twm: ["TWM.02", "TWM.01"], v: [
          { type: "roundrange", r: 80, to: 10, ask: "min" },
          { type: "roundrange", r: 600, to: 100, ask: "max" },
          { type: "roundrange", r: 5000, to: 1000, ask: "min" }
        ] },
        { dok: 2, lo: ["4Np.05"], twm: ["TWM.02", "TWM.01"], v: [
          { type: "roundpick", target: 4000, to: 1000, opts: [3620, 3490, 4500, 4710], at: 2 },
          { type: "roundpick", target: 900, to: 100, opts: [851, 849, 950, 960], at: 0 },
          { type: "roundpick", target: 250, to: 10, opts: [246, 244, 255, 257], at: 3 }
        ] },
        { dok: 3, lo: ["4Np.05"], twm: ["TWM.07", "TWM.04"], v: [
          { type: "claim", who: "Khanh", ok: false, at: 1, fact: { k: "rndgt", to: 10, eg: 43 },
            says: "When you round a number to the nearest 10, the answer is always greater than the number.",
            reasons: [
              { t: "43 rounds to 40, and 40 is less than 43." },
              { t: "47 rounds to 50, and 50 is greater than 47.", why: "That number rounds up. But some numbers round down. Try 43." },
              { t: "rounding always makes a number bigger.", why: "Rounding can make a number smaller. Is 43 nearer to 40 or to 50?" }],
            hint: { pic: { k: "rline", n: 43, to: 10 }, step: "Try a number with a small ones digit, like 43. What does it round to?" },
            worked: "43 is between 40 and 50. The ones digit is 3, so 43 rounds down to 40. 40 is less than 43.",
            model: "Khanh is incorrect because 43 rounds to 40, and 40 is less than 43." },
          { type: "claim", who: "Linh", ok: true, at: 0, fact: { k: "rndall", lo: 350, hi: 449, to: 100, r: 400 },
            says: "Every number from 350 to 449 rounds to 400, to the nearest 100.",
            reasons: [
              { t: "350 is halfway, so it rounds up to 400. 449 has 4 tens, so it rounds down to 400." },
              { t: "350 and 449 both have three digits.", why: "Three digits does not decide it. Round the smallest and the largest number." },
              { t: "every number with 4 hundreds rounds to 400.", why: "Not every one: 460 has 4 hundreds, but it rounds to 500. Round 350 and 449." }],
            hint: { pic: [{ k: "rline", n: 350, to: 100 }, { k: "rline", n: 449, to: 100 }], step: "Round the smallest number, 350, and the largest number, 449, to the nearest 100." },
            worked: "350 is halfway between 300 and 400, so it rounds up to 400. 449 has 4 tens, so it rounds down to 400. The numbers between them round to 400 too.",
            model: "Linh is correct because 350 rounds up to 400 and 449 rounds down to 400." },
          { type: "claim", who: "Phuc", ok: false, at: 2, fact: { k: "rndsame", a: 100, b: 1000, eg: 2640 },
            says: "If you round a number to the nearest 100 and to the nearest 1,000, you always get the same answer.",
            reasons: [
              { t: "2,640 rounds to 2,600 to the nearest 100, but to 3,000 to the nearest 1,000." },
              { t: "3,000 rounds to 3,000 both ways.", why: "That number is already round. One number with two different answers shows the claim is wrong." },
              { t: "rounding to the nearest 1,000 always gives a bigger answer.", why: "Not always. Round 2,640 both ways and compare the answers." }],
            hint: { pic: [{ k: "rline", n: 2640, to: 100 }, { k: "rline", n: 2640, to: 1000 }], step: "Round 2,640 to the nearest 100. Then round 2,640 to the nearest 1,000." },
            worked: "2,640 to the nearest 100 is 2,600. 2,640 to the nearest 1,000 is 3,000. The two answers are not the same.",
            model: "Phuc is incorrect because 2,640 rounds to 2,600 to the nearest 100, but to 3,000 to the nearest 1,000." }
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). The 72 Maths v2
    // Stop 3 questions (legacy/maths-v2/src/pool.js LPOOL[3], made by its tools/genpool.mjs), copied as they are.
    lightning: {
      secs: 60,
      items: [
        ["4,273 ? 2,473",["&gt;","&lt;","="]],["2,241 ? 2,214",["&gt;","&lt;","="]],["2,135 ? 2,315",["&lt;","&gt;","="]],
        ["4,836 ? 4,863",["&lt;","&gt;","="]],["7,657 ? 7,567",["&gt;","&lt;","="]],["5,644 ? 5,464",["&gt;","&lt;","="]],
        ["7,492 ? 4,792",["&gt;","&lt;","="]],["3,331 ? 3,313",["&gt;","&lt;","="]],["7,282 ? 7,822",["&lt;","&gt;","="]],
        ["−12 ? −1",["&lt;","&gt;","="]],["−15 ? −6",["&lt;","&gt;","="]],["−9 ? 8",["&lt;","&gt;","="]],
        ["−13 ? −11",["&lt;","&gt;","="]],["−8 ? 6",["&lt;","&gt;","="]],["−2 ? −1",["&lt;","&gt;","="]],
        ["−13 ? −8",["&lt;","&gt;","="]],["Which is greatest: 9,548, 5,498 or 5,948?",["9,548","5,948","5,498"]],["Which is greatest: 1,159, 1,519 or 1,591?",["1,591","1,159","1,519"]],
        ["Which is greatest: 1,431, 4,131 or 1,413?",["4,131","1,431","1,413"]],["Which is greatest: 1,087, 1,807 or 8,107?",["8,107","1,807","1,087"]],["Which is greatest: 1,751, 7,151 or 7,511?",["7,511","7,151","1,751"]],
        ["Which is greatest: 1,561, 5,161 or 5,116?",["5,161","5,116","1,561"]],["Which is greatest: 9,088, 9,808 or 8,908?",["9,808","9,088","8,908"]],["Which is greatest: 9,203, 2,903 or 2,093?",["9,203","2,903","2,093"]],
        ["Which is greatest: 8,860, 6,880 or 8,680?",["8,860","8,680","6,880"]],["Which is smallest: −9, 6 or −8?",["−9","−8","6"]],["Which is smallest: 7, −1 or −2?",["−2","−1","7"]],
        ["Which is smallest: −12, −5 or 6?",["−12","−5","6"]],["Which is smallest: 3, −3 or −12?",["−12","−3","3"]],["Which is smallest: −9, −12 or 3?",["−12","−9","3"]],
        ["Which is smallest: 6, −2 or −9?",["−9","−2","6"]],["Which is smallest: 5, −1 or −12?",["−12","−1","5"]],["Round 882 to the nearest 10",["880","890","870"]],
        ["Round 358 to the nearest 10",["360","350","370"]],["Round 364 to the nearest 10",["360","370","350"]],["Round 716 to the nearest 10",["720","710","730"]],
        ["Round 62 to the nearest 10",["60","70","50"]],["Round 705 to the nearest 10",["710","700","720"]],["Round 753 to the nearest 10",["750","760","740"]],
        ["Round 348 to the nearest 10",["350","340","360"]],["Round 833 to the nearest 10",["830","840","820"]],["Round 124 to the nearest 10",["120","130","110"]],
        ["Round 213 to the nearest 10",["210","220","200"]],["Round 849 to the nearest 10",["850","840","860"]],["Round 9,167 to the nearest 100",["9,200","9,100","9,300"]],
        ["Round 6,274 to the nearest 100",["6,300","6,200","6,400"]],["Round 4,701 to the nearest 100",["4,700","4,800","4,600"]],["Round 9,617 to the nearest 100",["9,600","9,700","9,500"]],
        ["Round 6,033 to the nearest 100",["6,000","6,100","5,900"]],["Round 9,772 to the nearest 100",["9,800","9,700","9,900"]],["Round 3,242 to the nearest 100",["3,200","3,300","3,100"]],
        ["Round 7,013 to the nearest 100",["7,000","7,100","6,900"]],["Round 9,723 to the nearest 100",["9,700","9,800","9,600"]],["Round 2,638 to the nearest 100",["2,600","2,700","2,500"]],
        ["Round 6,871 to the nearest 100",["6,900","6,800","7,000"]],["Round 2,760 to the nearest 100",["2,800","2,700","2,900"]],["Round 62,812 to the nearest 1,000",["63,000","62,000","64,000"]],
        ["Round 57,019 to the nearest 1,000",["57,000","58,000","56,000"]],["Round 34,998 to the nearest 1,000",["35,000","34,000","36,000"]],["Round 55,696 to the nearest 1,000",["56,000","55,000","57,000"]],
        ["Round 24,378 to the nearest 1,000",["24,000","25,000","23,000"]],["Round 73,911 to the nearest 1,000",["74,000","73,000","75,000"]],["Round 22,204 to the nearest 1,000",["22,000","23,000","21,000"]],
        ["Round 9,341 to the nearest 1,000",["9,000","10,000","8,000"]],["Round 53,419 to the nearest 1,000",["53,000","54,000","52,000"]],["Round 13,664 to the nearest 1,000",["14,000","13,000","15,000"]],
        ["Round 42,107 to the nearest 10,000",["40,000","50,000","30,000"]],["Round 40,964 to the nearest 10,000",["40,000","50,000","30,000"]],["Round 85,564 to the nearest 10,000",["90,000","80,000","100,000"]],
        ["Round 75,698 to the nearest 10,000",["80,000","70,000","90,000"]],["Round 36,617 to the nearest 10,000",["40,000","30,000","50,000"]],["Round 48,781 to the nearest 10,000",["50,000","40,000","60,000"]]
      ]
    },
    // My self-check: the 4 Maths v2 Stop 3 goals, in the same order (the dashboard reads the answers by goal number).
    // again: the step to practise again for each goal (v2 CONTENT[3].again: c = See it, r and a = Practise).
    selfcheck: {
      goals: ["compare numbers with <, > and =", "put numbers in order, also numbers below zero", "round numbers to the nearest 10 and 100", "round numbers to the nearest 1,000 and 10,000"],
      again: ["c", "r", "c", "r"]
    }
  };
})(window.T = window.T || {});
