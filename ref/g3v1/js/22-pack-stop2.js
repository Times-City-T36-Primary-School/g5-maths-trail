/* 22-pack-stop2.js - ALL the content of Stop 2, Patterns and negative numbers (shape: docs/02-architecture.md).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The tools (number line, thermometer,
   the growing square of counters) and the pictures (dots, dotseq, hops) are in src/toolkit/39-tools-lines.js. */
(function (T) {
  'use strict';

  T.packs[2] = {
    n: 2,
    title: "Patterns and negative numbers",
    los: ["4Nc.01", "4Nc.04", "4Nc.05", "4Np.04", "4Ni.01"],   // the learning objectives (shown to teachers under the last note)
    blurb: {
      en: "Find the *rule* of a pattern. Count on and count back, also below zero.",
      vi: "Tìm *quy luật* của dãy số. Đếm thêm và đếm lùi, cả khi xuống dưới 0."
    },
    // Words: the 7 Maths v2 Stop 2 key words (WORDS with s: 2; vi and meaning as in v2) and two new ones (minus sign,
    // thermometer), in three sets of picture cards with a quick check. The pictures are in src/art/04-art-words-2.js.
    words: {
      sets: [
        { id: 'A', title: { en: 'Count past zero', vi: 'Đếm qua số 0' }, keys: ['count on', 'count back', 'negative number'] },
        { id: 'B', title: { en: 'Hot and cold', vi: 'Nóng và lạnh' }, keys: ['temperature', 'thermometer', 'minus sign'] },
        { id: 'C', title: { en: 'Patterns', vi: 'Dãy số và quy luật' }, keys: ['sequence', 'rule', 'square number'] }
      ],
      items: {
        'count on': { art: 'w-count-on', vi: 'đếm thêm', def: 'To count forwards. Count on in 10s from 25: 35, 45, 55.' },
        'count back': { art: 'w-count-back', vi: 'đếm lùi', def: 'To count backwards. Count back in 2s from 4: 2, 0, −2.' },
        'negative number': { art: 'w-negative-number', vi: 'số âm', def: 'A number less than zero. We write it with a minus sign: −4.' },
        'temperature': { art: 'w-temperature', vi: 'nhiệt độ', def: 'How hot or cold something is. We measure it in degrees Celsius (°C).' },
        'thermometer': { art: 'w-thermometer', vi: 'nhiệt kế', def: 'A tool that shows the temperature. Each small line is 1 degree.' },
        'minus sign': { art: 'w-minus-sign', vi: 'dấu trừ (đứng trước số âm)', def: 'The short line in front of a negative number. −4 is negative four.' },
        'sequence': { art: 'w-sequence', vi: 'dãy số', def: 'A list of numbers that follows a rule. 3, 7, 11, 15 is a sequence.' },
        'rule': { art: 'w-rule', vi: 'quy luật', def: 'What you do to get the next number. In 3, 7, 11, 15 the rule is add 4.' },
        'square number': { art: 'w-square-number', vi: 'số chính phương', def: 'A number times itself. 4 × 4 = 16, so 16 is a square number.' }
      }
    },
    // See it: Concrete. Three hands-on scenes (the number line past zero, the thermometer, a square of counters that
    // grows), then the challenge: the 5 v2 "Build it" slots (CONTENT[2].stages[0]) with TWM tags.
    see: {
      scenes: [
        { id: 'zero', title: { en: 'Jump past zero', vi: 'Nhảy qua số 0' }, tool: 'nline',
          nline: { mode: 'jump', skin: 'wood', min: -6, max: 10, start: 4, jump: 2 },
          steps: [
            { can: { on: true }, wait: 'jump', until: { pos: 8 },
              zip: { en: 'Count on in 2s. Tap *Jump on* two times.', vi: 'Đếm thêm 2. Bấm *Jump on* (Nhảy tới) hai lần.' },
              then: { en: 'Yes! *4, 6, 8*.', vi: 'Đúng rồi! *4, 6, 8*.' } },
            { can: { back: true }, wait: 'jump', until: { pos: 0 }, fresh: true,
              zip: { en: 'Now count back in 2s to *zero*.', vi: 'Bây giờ đếm lùi 2 cho đến *số 0*.' },
              then: { en: '*8, 6, 4, 2, 0*. We are at zero!', vi: '*8, 6, 4, 2, 0*. Chúng ta đến số 0 rồi!' } },
            { can: { back: true }, wait: 'jump', until: { pos: -4 },
              zip: { en: 'Keep going! Jump back *two more* times.', vi: 'Tiếp tục nào! Nhảy lùi thêm *hai* lần.' },
              then: { en: '*−2, −4* are below zero: *negative numbers*.', vi: '*−2, −4* ở dưới số 0: đó là các *số âm*.' } }] },
        { id: 'thermo', title: { en: 'Hot and cold', vi: 'Nóng và lạnh' }, tool: 'thermo',
          thermo: { min: -10, max: 10, start: 3 },
          steps: [
            { can: { down: true }, wait: 'cold', until: { pos: 0 },
              zip: { en: 'It is *3 °C*. Tap *Colder* down to 0 °C.', vi: 'Trời đang *3 °C*. Bấm *Colder* (Lạnh hơn) cho đến 0 °C.' },
              then: { en: '*0 °C*. Water turns to ice!', vi: '*0 °C*. Nước đóng băng rồi!' } },
            { can: { down: true }, wait: 'cold', until: { pos: -4 },
              zip: { en: 'Make it *4 degrees colder*.', vi: 'Hãy làm lạnh thêm *4 độ*.' },
              then: { en: '*−4 °C*. That is below zero!', vi: '*−4 °C*. Dưới 0 độ rồi!' } },
            { can: { up: true }, wait: 'warm', until: { pos: 2 },
              zip: { en: 'Now make it *6 degrees warmer*.', vi: 'Bây giờ hãy làm ấm thêm *6 độ*.' },
              then: { en: '*−4* up *6* degrees is *2 °C*.', vi: '*−4* tăng *6* độ là *2 °C*.' } }] },
        { id: 'squares', title: { en: 'Square numbers', vi: 'Số chính phương' }, tool: 'grid',
          grid: { mode: 'square', rows: 1, cols: 1, max: 5 },
          steps: [
            { can: { more: true }, wait: 'grow', until: { rows: 2 },
              zip: { en: '1 counter is a tiny square. Tap *Bigger*.', vi: '1 hạt tính là một hình vuông nhỏ. Bấm *Bigger* (Lớn hơn).' },
              then: { en: '*2 rows of 2*. 2 × 2 = *4*.', vi: '*2 hàng, mỗi hàng 2*. 2 × 2 = *4*.' } },
            { can: { more: true }, wait: 'grow', until: { rows: 3 },
              zip: { en: 'Add a row and a column. Tap *Bigger*.', vi: 'Thêm một hàng và một cột. Bấm *Bigger*.' },
              then: { en: '*3 rows of 3*. 3 × 3 = *9*.', vi: '*3 hàng, mỗi hàng 3*. 3 × 3 = *9*.' } },
            { can: { more: true }, wait: 'grow', until: { rows: 4 },
              zip: { en: 'Once more! Tap *Bigger*.', vi: 'Thêm lần nữa! Bấm *Bigger*.' },
              then: { en: '*1, 4, 9, 16* are *square numbers*.', vi: '*1, 4, 9, 16* là các *số chính phương*.' } }] },
        { id: 'challenge', title: { en: 'Jump and build', vi: 'Nhảy và xếp hình' },
          challenge: {
            end: { en: 'You did it! You can count past zero.', vi: 'Em làm được rồi! Em biết đếm qua số 0.' },
            result: 'You jumped past zero, built squares and read temperatures.',
            rounds: [
          { mode: "our", lo: ["4Nc.01"], twm: ["TWM.02"], v: [
            { type: "jump", start: 6, step: 2, n: 5, dir: "back", min: -6, max: 10 },
            { type: "jump", start: 5, step: 3, n: 4, dir: "back", min: -8, max: 8 },
            { type: "jump", start: 3, step: 4, n: 3, dir: "back", min: -10, max: 6 }] },
          { mode: "our", lo: ["4Nc.05"], twm: ["TWM.05"], v: [{ type: "sqbuild", k: 3 }, { type: "sqbuild", k: 4 }, { type: "sqbuild", k: 5 }] },
          { mode: "your", lo: ["4Nc.01", "4Ni.01"], twm: ["TWM.02"], v: [
            { type: "jump", start: 30, step: 10, n: 5, dir: "back", min: -30, max: 40, tick: 10 },
            { type: "jump", start: 200, step: 100, n: 4, dir: "back", min: -300, max: 300, tick: 100 },
            { type: "jump", start: -40, step: 10, n: 6, dir: "on", min: -50, max: 30, tick: 10 }] },
          { mode: "your", lo: ["4Np.04"], twm: ["TWM.01"], v: [{ type: "temp", start: 3, change: -7 }, { type: "temp", start: -5, change: 8 }, { type: "temp", start: -2, change: -6 }] },
          { mode: "your", lo: ["4Nc.05"], twm: ["TWM.06", "TWM.01"], v: [
            { type: "sqpick", opts: [[3, 3], [2, 5], [3, 4]], at: 1 },
            { type: "sqpick", opts: [[4, 4], [3, 5], [2, 6]], at: 2 },
            { type: "sqpick", opts: [[2, 2], [1, 5], [2, 3]], at: 0 }] }] } }]
    },
    // Practise: Pictorial (Draw it: sequences drawn with jumps, square patterns) then Abstract (Solve it, like the
    // test). The rounds are the Maths v2 Stop 2 slots (data/v2/mdata2.js CONTENT[2] stages 2 and 3), with TWM tags.
    practise: [
      { id: 's2r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Draw sequences with jumps.', vi: 'Vẽ dãy số bằng các bước nhảy.' },
        levels: [
      { title: { en: "Jumps and rules", vi: "Bước nhảy và quy luật" }, rounds: [
          { mode: "our", lo: ["4Nc.04"], twm: ["TWM.02"], v: [
            { type: "seqnext", a: 3, d: 4, shown: 4, ask: 2, line: true },
            { type: "seqnext", a: 6, d: 5, shown: 4, ask: 2, line: true },
            { type: "seqnext", a: 40, d: -6, shown: 4, ask: 2, line: true }] },
          { mode: "your", lo: ["4Nc.01", "4Nc.04"], twm: ["TWM.02"], v: [
            { type: "seqnext", a: 8, d: -3, shown: 4, ask: 2, line: true },
            { type: "seqnext", a: -11, d: 4, shown: 4, ask: 2, line: true },
            { type: "seqnext", a: 150, d: -100, shown: 3, ask: 2, line: true }] }] },
      { title: { en: "Find the rule", vi: "Tìm quy luật" }, rounds: [
          { mode: "your", lo: ["4Nc.04"], twm: ["TWM.02", "TWM.01"], v: [
            { type: "seqrule", a: 45, d: -6, n: 4, at: 1 },
            { type: "seqrule", a: 17, d: 8, n: 4, at: 2 },
            { type: "seqrule", a: -20, d: 5, n: 4, at: 0 }] },
          { mode: "your", lo: ["4Nc.04"], twm: ["TWM.02"], v: [
            { type: "seqnext", a: 1, kind: "double", shown: 4, ask: 1, line: true },
            { type: "seqnext", a: 2, kind: "grow", d: 1, g: 1, shown: 5, ask: 1, line: true },
            { type: "seqnext", a: 80, kind: "halve", shown: 3, ask: 1, line: true }] }] },
      { title: { en: "Square patterns", vi: "Mẫu hình vuông" }, rounds: [
          { mode: "your", lo: ["4Nc.05"], twm: ["TWM.02"], v: [{ type: "sqnth", k: 5 }, { type: "sqnth", k: 6 }, { type: "sqnth", k: 4 }] }] }] },
      { id: 's2a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Missing numbers", vi: "Số còn thiếu" }, rounds: [
          { mode: "your", lo: ["4Nc.04"], twm: ["TWM.02"], v: [
            { type: "seqgap", a: 12, d: 7, n: 5, gaps: [1, 4] },
            { type: "seqgap", a: 50, d: -8, n: 5, gaps: [2, 4] },
            { type: "seqgap", a: -9, d: 6, n: 5, gaps: [0, 3] }] },
          { mode: "your", lo: ["4Nc.01", "4Ni.01"], twm: ["TWM.02"], v: [
            { type: "seqnext", a: 3000, d: -1000, shown: 3, ask: 2 },
            { type: "seqnext", a: -35, d: 10, shown: 3, ask: 2 },
            { type: "seqnext", a: 120, d: -50, shown: 3, ask: 2 }] }] },
      { title: { en: "Temperatures and squares", vi: "Nhiệt độ và số chính phương" }, rounds: [
          { mode: "your", lo: ["4Np.04"], twm: ["TWM.01"], v: [
            { type: "temp", start: -4, change: 9, paper: true, text: "A cold room is at <b>−4 °C</b>. The door is left open and the temperature rises by <b>9 degrees</b>. What is the temperature now?" },
            { type: "temp", start: 2, change: -8, paper: true, text: "At midday the temperature on a mountain is <b>2 °C</b>. By midnight it has fallen by <b>8 degrees</b>. What is the temperature at midnight?" },
            { type: "temp", start: -7, change: 4, paper: true, text: "Ice cream is kept at <b>−7 °C</b>. The power goes off and the temperature rises by <b>4 degrees</b>. What is the temperature now?" }] },
          { mode: "your", lo: ["4Nc.05"], twm: ["TWM.06", "TWM.01"], v: [
            { type: "sqtick", opts: [25, 20, 30, 24], at: 2 },
            { type: "sqtick", opts: [36, 32, 40, 26], at: 0 },
            { type: "sqtick", opts: [49, 45, 50, 54], at: 3 }] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["4Nc.04", "4Nc.05"], twm: ["TWM.07", "TWM.04"], v: [
            { type: "claim", who: "Phong", ok: false, at: 1, fact: { k: "inseq", a: 6, d: 5, n: 40 },
              says: "My sequence is 6, 11, 16, 21. The number 40 will be in my sequence.",
              reasons: [
                { t: "the sequence goes on 26, 31, 36, 41. It jumps over 40." },
                { t: "the sequence gets bigger, and 40 is a big number.", why: "The sequence gets bigger, but it only lands on some numbers. Carry it on with the rule." },
                { t: "the rule is add 5, and 40 is in the 5 times table.", why: "The rule is add 5, but the sequence starts at 6, not at 5. Carry it on to check." }],
              hint: { pic: { k: "hops", terms: [6, 11, 16, 21], blanks: 2, labs: ["+ 5", "+ 5", "+ 5"] }, step: "The rule is add 5. Carry on the sequence past 40." },
              worked: "The rule is add 5: 6, 11, 16, 21, 26, 31, 36, 41. The sequence jumps over 40.",
              model: "Phong is incorrect because the sequence goes 31, 36, 41 and jumps over 40." },
            { type: "claim", who: "Ngoc", ok: true, at: 0, fact: { k: "inseq", a: 30, d: -4, n: 2 },
              says: "My sequence is 30, 26, 22, 18. The number 2 will be in my sequence.",
              reasons: [
                { t: "the sequence goes on 14, 10, 6, 2." },
                { t: "2 is smaller than 30.", why: "Not every smaller number is in the sequence. Carry it on with the rule." },
                { t: "the sequence stops at 18.", why: "A sequence carries on with the same rule. Take away 4 each time." }],
              hint: { pic: { k: "hops", terms: [30, 26, 22, 18], blanks: 2, labs: ["− 4", "− 4", "− 4"] }, step: "The rule is subtract 4. Carry on the sequence down to 2." },
              worked: "The rule is subtract 4: 30, 26, 22, 18, 14, 10, 6, 2. So 2 is in the sequence.",
              model: "Ngoc is correct because the sequence goes on 14, 10, 6, 2." },
            { type: "claim", who: "Son", ok: false, at: 2, fact: { k: "sqnext", after: 49, says: 59 },
              says: "The next square number after 49 is 59, because you add 10.",
              reasons: [
                { t: "49 is 7 × 7. The next square number is 8 × 8 = 64." },
                { t: "square numbers go up by 10 each time.", why: "Square numbers do not go up by the same amount each time. Work out 8 × 8." },
                { t: "59 is an odd number.", why: "Square numbers can be odd or even. Work out 8 × 8." }],
              hint: { pic: { k: "dotseq", ks: [1, 2, 3] }, step: "49 is 7 × 7. What is the next number times itself?" },
              worked: "49 is 7 × 7. The next square number is 8 × 8 = 64, not 59.",
              model: "Son is incorrect because the next square number is 8 × 8 = 64." }] }] }] }
    ],
    // Notes: how to do it. Each note has a worked example and a picture made by the maths tools. From Maths v2
    // CONTENT[2].notes, with one new note on temperatures. The check: one gap sentence per note, in the same order
    // (each right answer is worked out again by test/stop-steps.mjs).
    notes: {
      items: [
        { en: 'To [[count back]] below zero, keep the same jump. After 0 come the [[negative numbers|negative number]].',
          vi: 'Để đếm lùi xuống dưới số 0, hãy giữ nguyên bước nhảy. Sau số 0 là các số âm.',
          example: ['Count back in 2s from 4:', '4, 2, 0, *−2, −4*'],
          pic: { k: 'nline', mode: 'jump', skin: 'board', min: -6, max: 6, start: 4, jump: 2, to: -4 } },
        { en: 'A [[negative number]] is less than zero. The further below zero, the smaller the number.',
          vi: 'Số âm nhỏ hơn 0. Càng xa số 0 về phía dưới thì số càng nhỏ.',
          example: ['−7 is further below zero than −3.', 'So *−7 is less than −3*.'],
          pic: { k: 'nline', mode: 'show', skin: 'board', min: -8, max: 2, marks: [-7, -3] } },
        { en: 'A [[temperature]] can be below zero. Count the degrees one at a time. Do not miss 0.',
          vi: 'Nhiệt độ có thể dưới 0. Đếm từng độ một. Đừng bỏ qua số 0.',
          example: ['2 °C, then 5 degrees colder:', '2, 1, 0, −1, −2, *−3 °C*'],
          pic: { k: 'thermo', t: -3, min: -10, max: 10 } },
        { en: 'Every [[sequence]] has a [[rule]]. Find the jump between two numbers that are next to each other.',
          vi: 'Mỗi dãy số đều có một quy luật. Tìm bước nhảy giữa hai số đứng cạnh nhau.',
          example: ['3, 7, 11, 15: the rule is *add 4*.', 'The next number is 15 + 4 = *19*.'],
          pic: { k: 'hops', terms: [3, 7, 11, 15], blanks: 1, labs: ['+ 4', '+ 4', '+ 4'] } },
        { en: 'In some sequences the jump changes. Check every jump, not only the first one.',
          vi: 'Trong một số dãy, bước nhảy thay đổi. Hãy kiểm tra mọi bước nhảy, không chỉ bước đầu tiên.',
          example: ['1, 2, 4, 8: each number is *double* the one before.', 'The next number is *16*.'],
          pic: { k: 'hops', terms: [1, 2, 4, 8], blanks: 1, labs: ['× 2', '× 2', '× 2'] } },
        { en: 'A [[square number]] is a number times itself. Its dots make a square.',
          vi: 'Số chính phương là một số nhân với chính nó. Các chấm của nó xếp thành hình vuông.',
          example: ['1, 4, 9, 16, 25, 36, 49, 64, 81, 100', '4 × 4 = *16*, so 16 is a square number.'],
          pic: { k: 'dotseq', ks: [1, 2, 3, 4] } }
      ],
      check: [
        { sentence: 'Count back in 3s: 5, 2, −1, {−4|−3|4}.', answer: '−4' },
        { sentence: 'Of −2, −8 and 0, the smallest is {−8|−2|0}.', answer: '−8' },
        { sentence: '1 °C, then 4 degrees colder, is {−3 °C|3 °C|−5 °C}.', answer: '−3 °C' },
        { sentence: '12, 18, 24, 30: the rule is {add 6|add 12|subtract 6}.', answer: 'add 6' },
        { sentence: '3, 6, 12, 24: the next number is {48|30|36}.', answer: '48' },
        { sentence: 'The 7th square number is {49|14|77}.', answer: '49' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard, 4 at DOK 1, 5 at DOK 2, 1 at DOK 3 (T.DOK_MIX, docs/05).
    // Each item: dok (its real level, judged with T.DOK), lo, twm (1 or 2, T.TWM) and 3 fresh sets of numbers
    // (play 1 uses v[0]). Questions 1 to 9 use the Maths v2 Stop 2 mini test models with new numbers (Nov 2026);
    // v2's "the 10th number" item (seqnth: a routine two-step) is DOK 2 here. Question 10 is new: a general claim
    // about square numbers, judged and justified with evidence (DOK 3, Number strand).
    // Run by src/steps/70-test.js with the models; answers logged with game letter 'm' and dok.
    test: {
      items: [
        { dok: 1, lo: ["4Nc.01"], twm: ["TWM.02"], v: [
          { type: "seqnext", a: 760, d: 100, shown: 3, ask: 1 },
          { type: "seqnext", a: 470, d: 10, shown: 3, ask: 1 },
          { type: "seqnext", a: 870, d: 10, shown: 3, ask: 1 }
        ] },
        { dok: 1, lo: ["4Nc.01", "4Ni.01"], twm: ["TWM.02"], v: [
          { type: "seqnext", a: 7, d: -2, shown: 4, ask: 1 },
          { type: "seqnext", a: 10, d: -4, shown: 3, ask: 1 },
          { type: "seqnext", a: 12, d: -5, shown: 3, ask: 1 }
        ] },
        { dok: 1, lo: ["4Nc.05"], twm: ["TWM.05"], v: [{ type: "sqval", k: 9 }, { type: "sqval", k: 4 }, { type: "sqval", k: 10 }] },
        { dok: 1, lo: ["4Np.04", "4Ni.01"], twm: ["TWM.05"], v: [{ type: "thermoread", t: -4 }, { type: "thermoread", t: -7 }, { type: "thermoread", t: -2 }] },
        { dok: 2, lo: ["4Nc.04"], twm: ["TWM.02"], v: [
          { type: "seqgap", a: 15, d: 8, n: 5, gaps: [1, 4] },
          { type: "seqgap", a: 44, d: -7, n: 5, gaps: [0, 3] },
          { type: "seqgap", a: -13, d: 5, n: 5, gaps: [2, 4] }
        ] },
        { dok: 2, lo: ["4Nc.04"], twm: ["TWM.02", "TWM.01"], v: [
          { type: "seqrule", a: 83, d: -9, n: 4, at: 1 },
          { type: "seqrule", a: 26, d: 7, n: 4, at: 2 },
          { type: "seqrule", a: -15, d: -6, n: 4, at: 0 }
        ] },
        { dok: 2, lo: ["4Np.04"], twm: ["TWM.01"], v: [
          { type: "temp", start: 3, change: -7, paper: true, text: "In the evening the temperature in Sa Pa is <b>3 °C</b>. By midnight it falls by <b>7 degrees</b>. What is the temperature at midnight?" },
          { type: "temp", start: -6, change: 9, paper: true, text: "A box of fish is kept on ice at <b>−6 °C</b>. It is left in the sun. The temperature rises by <b>9 degrees</b>. What is the temperature now?" },
          { type: "temp", start: -9, change: 5, paper: true, text: "Ice lollies are in a freezer at <b>−9 °C</b>. The door is left open. The temperature rises by <b>5 degrees</b>. What is the temperature now?" }
        ] },
        { dok: 2, lo: ["4Nc.04"], twm: ["TWM.02"], v: [
          { type: "seqnext", a: 5, kind: "double", shown: 4, ask: 1 },
          { type: "seqnext", a: 2, kind: "grow", d: 1, g: 1, shown: 5, ask: 1 },
          { type: "seqnext", a: 96, kind: "halve", shown: 4, ask: 1 }
        ] },
        { dok: 2, lo: ["4Nc.04"], twm: ["TWM.02"], v: [
          { type: "seqnth", a: 4, d: 3, n: 10 },
          { type: "seqnth", a: 60, d: -4, n: 9 },
          { type: "seqnth", a: -15, d: 4, n: 8 }
        ] },
        { dok: 3, lo: ["4Nc.05"], twm: ["TWM.07", "TWM.04"], v: [
          { type: "claim", who: "Kim", ok: true, at: 1, fact: { k: "sqpar" },
            says: "The square numbers go odd, even, odd, even, and so on.",
            reasons: [
              { t: "1, 4, 9, 16, 25, 36 go odd, even, odd, even, odd, even." },
              { t: "every square number is even.", why: "9 = 3 × 3, and 9 is odd. Check the list 1, 4, 9, 16, 25." },
              { t: "16 is a square number, and 16 is even.", why: "That is one square number only. Check the list 1, 4, 9, 16, 25." }],
            hint: { pic: { k: "dotseq", ks: [1, 2, 3, 4] }, step: "Write the square numbers: 1, 4, 9, 16, 25, 36. Is each one odd or even?" },
            worked: "1 is odd, 4 is even, 9 is odd, 16 is even, 25 is odd, 36 is even. They go odd, even, odd, even.",
            model: "Kim is correct because 1, 4, 9, 16, 25, 36 go odd, even, odd, even, odd, even." },
          { type: "claim", who: "Lam", ok: false, at: 0, fact: { k: "sqall", even: true, eg: 9 },
            says: "Every square number is an even number.",
            reasons: [
              { t: "3 × 3 = 9, and 9 is an odd number." },
              { t: "2 × 2 = 4 and 4 × 4 = 16, and both are even.", why: "These two are even, but one odd square number shows the claim is wrong. Try 3 × 3." },
              { t: "square numbers make a square of counters.", why: "That is true, but it does not say odd or even. Try 3 × 3." }],
            hint: { pic: { k: "dotseq", ks: [1, 2, 3] }, step: "Try the square numbers one by one: 1 × 1, 2 × 2, 3 × 3. Are they all even?" },
            worked: "3 × 3 = 9, and 9 is odd. So not every square number is even.",
            model: "Lam is incorrect because 3 × 3 = 9, and 9 is odd." },
          { type: "claim", who: "Duy", ok: false, at: 2, fact: { k: "sqsum", eg: [1, 4] },
            says: "9 + 16 = 25. If you add two square numbers, you always get a square number.",
            reasons: [
              { t: "1 + 4 = 5, and 5 is not a square number." },
              { t: "9 + 16 = 25, and 25 is 5 × 5.", why: "That example works, but one example does not show always. Try 1 + 4." },
              { t: "you cannot add two square numbers.", why: "You can add any two numbers. Try 1 + 4. Is the answer a square number?" }],
            hint: { pic: { k: "dotseq", ks: [1, 2, 3] }, step: "Try two other square numbers, like 1 and 4. Add them. Is the answer a square number?" },
            worked: "1 + 4 = 5. 2 × 2 = 4 and 3 × 3 = 9, so 5 is not a square number. It does not always work.",
            model: "Duy is incorrect because 1 + 4 = 5, and 5 is not a square number." }
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). The 72 Maths v2
    // Stop 2 questions (legacy/maths-v2/src/pool.js LPOOL[2], made by its tools/genpool.mjs), copied as they are.
    lightning: {
      secs: 60,
      items: [
        ["27, 32, 37, ?",["42","47","41"]],["18, 23, 28, ?",["33","38","32"]],["30, 39, 48, ?",["57","66","56"]],
        ["53, 57, 61, ?",["65","69","64"]],["28, 36, 44, ?",["52","60","51"]],["13, 17, 21, ?",["25","29","24"]],
        ["38, 42, 46, ?",["50","54","49"]],["7, 16, 25, ?",["34","43","33"]],["14, 20, 26, ?",["32","38","31"]],
        ["50, 52, 54, ?",["56","58","55"]],["30, 33, 36, ?",["39","42","38"]],["5, 1, −3, ?",["−7","7","−8"]],
        ["4, 2, 0, ?",["−2","2","−3"]],["8, 3, −2, ?",["−7","7","−8"]],["2, −2, −6, ?",["−10","10","−11"]],
        ["3, 0, −3, ?",["−6","6","−7"]],["5, 2, −1, ?",["−4","4","−5"]],["7, 2, −3, ?",["−8","8","−9"]],
        ["4, −1, −6, ?",["−11","11","−12"]],["11, 6, 1, ?",["−4","4","−5"]],["3, 1, −1, ?",["−3","3","−4"]],
        ["10 less than 1",["−9","9","−19"]],["100 less than 40",["−60","60","−160"]],["100 less than 30",["−70","70","−170"]],
        ["10 less than 6",["−4","4","−14"]],["100 less than 10",["−90","90","−190"]],["10 less than 2",["−8","8","−18"]],
        ["100 less than 20",["−80","80","−180"]],["100 less than 90",["−10","10","−110"]],["5 × 5",["25","10","30"]],
        ["4 × 4",["16","8","20"]],["3 × 3",["9","6","12"]],["9 × 9",["81","18","90"]],["8 × 8",["64","16","72"]],
        ["6 × 6",["36","12","42"]],["7 × 7",["49","14","56"]],["10 × 10",["100","20","110"]],
        ["The 5th square number",["25","10","30"]],["The 6th square number",["36","12","42"]],["The 8th square number",["64","16","72"]],
        ["The 4th square number",["16","8","20"]],["The 9th square number",["81","18","90"]],["The 7th square number",["49","14","56"]],
        ["The 10th square number",["100","20","110"]],["The 3rd square number",["9","6","12"]],
        ["Which is a square number: 47, 49 or 46?",["49","47","46"]],["Which is a square number: 22, 17 or 16?",["16","17","22"]],
        ["Which is a square number: 49, 52 or 53?",["49","52","53"]],["Which is a square number: 36, 39 or 33?",["36","39","33"]],
        ["Which is a square number: 30, 28 or 25?",["25","28","30"]],["Which is a square number: 9, 11 or 13?",["9","11","13"]],
        ["Which is a square number: 21, 18 or 16?",["16","18","21"]],["Which is a square number: 41, 35 or 36?",["36","35","41"]],
        ["6 °C, then 11 degrees down",["−5 °C","5 °C","−17 °C"]],["3 °C, then 7 degrees down",["−4 °C","4 °C","−10 °C"]],
        ["−4 °C, then 3 degrees up",["−1 °C","−7 °C","1 °C"]],["−6 °C, then 5 degrees up",["−1 °C","−11 °C","1 °C"]],
        ["1 °C, then 7 degrees down",["−6 °C","6 °C","−8 °C"]],["3 °C, then 9 degrees down",["−6 °C","6 °C","−12 °C"]],
        ["5 °C, then 11 degrees down",["−6 °C","6 °C","−16 °C"]],["−3 °C, then 6 degrees up",["3 °C","−9 °C","−3 °C"]],
        ["6 °C, then 8 degrees down",["−2 °C","2 °C","−14 °C"]],["5 °C, then 10 degrees down",["−5 °C","5 °C","−15 °C"]],
        ["2 °C, then 8 degrees down",["−6 °C","6 °C","−10 °C"]],["19, 27, 35, 43. The rule is",["add 8","subtract 8","add 9"]],
        ["78, 69, 60, 51. The rule is",["subtract 9","add 9","subtract 10"]],["68, 62, 56, 50. The rule is",["subtract 6","add 6","subtract 7"]],
        ["84, 82, 80, 78. The rule is",["subtract 2","add 2","subtract 3"]],["47, 44, 41, 38. The rule is",["subtract 3","add 3","subtract 4"]],
        ["82, 76, 70, 64. The rule is",["subtract 6","add 6","subtract 7"]],["46, 40, 34, 28. The rule is",["subtract 6","add 6","subtract 7"]],
        ["16, 24, 32, 40. The rule is",["add 8","subtract 8","add 9"]]
      ]
    },
    // My self-check: the 4 Maths v2 Stop 2 goals, in the same order (the dashboard reads the answers by goal number).
    // again: the step to practise again for each goal (v2 CONTENT[2].again: c = See it, r and a = Practise).
    selfcheck: {
      goals: ["count on and back in steps, also below zero", "use negative numbers, like temperatures below zero", "find the rule of a sequence and carry it on", "spot and make square numbers"],
      again: ["c", "c", "r", "r"]
    }
  };
})(window.T = window.T || {});
