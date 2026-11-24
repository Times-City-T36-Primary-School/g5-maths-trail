/* 22-pack-stop4.js - ALL the content of Stop 4, Common multiples and factors (Grade 5, Cambridge Stage 6: 6Ni.06).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The questions are data for the
   Grade 5 models (08-g5-models-s4.js) and the tools of 39-g5-tools-s4.js: every list, lowest common multiple and
   highest common factor is worked out there from the two numbers. None of the numbers, names or sentences are
   those of the EOS1 papers. */
(function (T) {
  'use strict';

  T.packs[4] = {
    n: 4,
    title: "Common multiples and factors",
    los: ["6Ni.06"],
    blurb: {
      en: "Find *multiples* and *factors* that two numbers share.",
      vi: "Tìm *bội số* và *ước số* chung của hai số."
    },
    words: {
      sets: [
        { id: 'A', title: { en: 'Multiple and factor', vi: 'Bội số và ước số' }, keys: ['multiple', 'factor', 'factor pair', 'product'] },
        { id: 'B', title: { en: 'Common multiples', vi: 'Bội chung' }, keys: ['common multiple', 'lowest common multiple', 'divisible'] },
        { id: 'C', title: { en: 'Common factors', vi: 'Ước chung' }, keys: ['common factor', 'highest common factor', 'counter-example'] }
      ],
      items: {
        'multiple': { art: 'w-multiple', vi: 'bội số', def: 'A number in the times table of another number. 4, 8, 12 and 16 are multiples of 4.' },
        'factor': { art: 'w-factor', vi: 'ước số', def: 'A number that divides another number exactly. 3 is a factor of 12, because 12 ÷ 3 = 4.' },
        'factor pair': { art: 'w-factor-pair', vi: 'cặp ước số', def: 'Two numbers that multiply to make a number. 2 and 6 are a factor pair of 12.' },
        'product': { art: 'w-product', vi: 'tích', def: 'The answer when you multiply. The product of 3 and 4 is 12.' },
        'common multiple': { art: 'w-common-multiple', vi: 'bội chung', def: 'A multiple of two numbers at the same time. 12 is a common multiple of 3 and 4.' },
        'lowest common multiple': { art: 'w-lowest-common-multiple', vi: 'bội chung nhỏ nhất', def: 'The smallest number that is a multiple of both numbers. For 6 and 9 it is 18.' },
        'divisible': { art: 'w-divisible', vi: 'chia hết', def: 'Can be divided exactly, with nothing left over. 20 is divisible by 5.' },
        'common factor': { art: 'w-common-factor', vi: 'ước chung', def: 'A factor of two numbers at the same time. 5 is a common factor of 10 and 15.' },
        'highest common factor': { art: 'w-highest-common-factor', vi: 'ước chung lớn nhất', def: 'The biggest number that is a factor of both numbers. For 18 and 24 it is 6.' },
        'counter-example': { art: 'w-counter-example', vi: 'phản ví dụ', def: 'One example that shows a rule is wrong. “All factors of 10 are even.” 5 is a counter-example.' }
      }
    },
    // See it: Concrete. Grow the two lists of multiples and mark the numbers in both; find factors in pairs and
    // mark the common factors; then the challenge (the data shape is in 45-see.js).
    see: {
      scenes: [
        { id: 'multiples', title: { en: 'Lists of multiples', vi: 'Danh sách bội số' }, tool: 'clist', clist: { kind: 'mult', a: 8, b: 12, upto: 48, shown: [1, 1] },
          steps: [
            { can: { growA: 3 }, wait: 'grow', until: { na: 3 },
              zip: { en: 'Count on in eights. Tap *Next multiple of 8* two times.', vi: 'Đếm cách 8 (mỗi lần thêm 8). Bấm *Next multiple of 8* (Bội số tiếp theo của 8) hai lần.' },
              then: { en: '8, 16, 24: these are *multiples* of 8.', vi: '8, 16, 24: đây là các *bội số* của 8.' } },
            { can: { growB: 2 }, wait: 'grow', until: { nb: 2 },
              zip: { en: 'Now tap *Next multiple of 12*.', vi: 'Bây giờ bấm *Next multiple of 12* (Bội số tiếp theo của 12).' },
              then: { en: 'Look! *24* is in *both* lists.', vi: 'Nhìn này! *24* có trong *cả hai* danh sách.' } },
            { can: { mark: true }, wait: 'mark', until: { count: 1 },
              zip: { en: 'Tap *24*, the number in both lists.', vi: 'Bấm vào *24*, số có trong cả hai danh sách.' },
              then: { en: '24 is a *common multiple* of 8 and 12.', vi: '24 là một *bội chung* của 8 và 12.' } },
            { can: { growA: 6, growB: 4, mark: true }, wait: 'mark', until: { count: 2 },
              zip: { en: 'Make both lists longer. Find the next common multiple.', vi: 'Kéo dài cả hai danh sách. Tìm bội chung tiếp theo.' },
              then: { en: '*48* too! *24* is the *lowest common multiple*. Tap *Next*.', vi: 'Cả *48* nữa! *24* là *bội chung nhỏ nhất*. Bấm *Next*.' } }] },
        { id: 'factors', title: { en: 'Lists of factors', vi: 'Danh sách ước số' }, tool: 'clist', clist: { kind: 'fact', a: 18, b: 24, shown: [0, 0] },
          steps: [
            { can: { growA: true }, wait: 'grow', until: { na: 6 },
              zip: { en: 'Tap *Next factor pair of 18* three times.', vi: 'Bấm *Next factor pair of 18* (Cặp ước số tiếp theo của 18) ba lần.' },
              then: { en: 'Three factor pairs: 18 has six *factors*.', vi: 'Ba cặp ước số: 18 có sáu *ước số*.' } },
            { can: { growB: true }, wait: 'grow', until: { nb: 8 },
              zip: { en: 'Now find the factor pairs of 24. Tap four times.', vi: 'Bây giờ tìm các cặp ước số của 24. Bấm bốn lần.' },
              then: { en: 'Four factor pairs: 24 has eight factors.', vi: 'Bốn cặp ước số: 24 có tám ước số.' } },
            { can: { mark: true }, wait: 'mark', until: { done: true },
              zip: { en: 'Tap every number that is in *both* lists.', vi: 'Bấm vào mọi số có trong *cả hai* danh sách.' },
              then: { en: '*Common factors*: 1, 2, 3, 6. The *highest* is 6.', vi: '*Ước chung*: 1, 2, 3, 6. *Lớn nhất* là 6.' } }] },
        { id: 'challenge', title: { en: 'Common numbers challenge', vi: 'Thử thách bội chung, ước chung' },
          challenge: {
            end: { en: 'You did it! You can find common multiples and factors.', vi: 'Em làm được rồi! Em tìm được bội chung và ước chung.' },
            result: 'You found the numbers that two lists share.',
            rounds: [
          { mode: "our", lo: ["6Ni.06"], v: [
            {"type":"cmmark","a":2,"b":3,"upto":18},
            {"type":"cmmark","a":3,"b":9,"upto":27},
            {"type":"cmmark","a":4,"b":5,"upto":40}] },
          { mode: "your", lo: ["6Ni.06"], v: [
            {"type":"cfmark","a":10,"b":25},
            {"type":"cfmark","a":8,"b":20},
            {"type":"cfmark","a":9,"b":21}] },
          { mode: "your", lo: ["6Ni.06"], v: [
            {"type":"cmpick","a":2,"b":9,"nums":[6,18,27,36,45,54]},
            {"type":"cmpick","a":3,"b":10,"nums":[15,30,40,60,75,90]},
            {"type":"cmpick","a":4,"b":9,"nums":[18,27,36,54,72,96]}] },
          { mode: "your", lo: ["6Ni.06"], v: [
            {"type":"cfpick","a":12,"b":30,"nums":[1,2,3,4,5,6]},
            {"type":"cfpick","a":16,"b":40,"nums":[1,2,4,5,8,16]},
            {"type":"cfpick","a":18,"b":27,"nums":[1,2,3,6,9,18]}] },
          { mode: "your", lo: ["6Ni.06"], v: [
            {"type":"lcm","a":3,"b":8},
            {"type":"lcm","a":9,"b":15},
            {"type":"lcm","a":8,"b":10}] }] } }]
    },
    // Practise: Pictorial (Draw it: the two lists, the rings) then Abstract (Solve it, like the test).
    practise: [
      { id: 's4r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Use the two lists and the two rings.', vi: 'Dùng hai danh sách và hai vòng tròn.' },
        levels: [
      { title: { en: "Lists of multiples", vi: "Danh sách bội số" }, rounds: [
          { mode: "our", lo: ["6Ni.06"], twm: ["TWM.06"], v: [
            {"type":"cmmark","a":3,"b":4,"upto":24},
            {"type":"cmmark","a":2,"b":5,"upto":20},
            {"type":"cmmark","a":3,"b":5,"upto":30}] },
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.06"], v: [
            {"type":"cmmark","a":8,"b":10,"upto":80,"box":true},
            {"type":"cmmark","a":4,"b":10,"upto":40,"box":true},
            {"type":"cmmark","a":9,"b":12,"upto":72,"box":true}] }] },
      { title: { en: "Lists of factors", vi: "Danh sách ước số" }, rounds: [
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.06"], v: [
            {"type":"cfmark","a":12,"b":20},
            {"type":"cfmark","a":15,"b":25},
            {"type":"cfmark","a":16,"b":28}] },
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.06"], v: [
            {"type":"cfmark","a":24,"b":30,"box":true},
            {"type":"cfmark","a":20,"b":32,"box":true},
            {"type":"cfmark","a":27,"b":45,"box":true}] }] },
      { title: { en: "Rings and real life", vi: "Vòng tròn và đời sống" }, rounds: [
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.06"], v: [
            {"type":"csort","kind":"mult","a":3,"b":4,"upto":24,"n":24},
            {"type":"csort","kind":"fact","a":20,"b":30,"n":4},
            {"type":"csort","kind":"mult","a":4,"b":10,"upto":40,"n":30}] },
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.01"], v: [
            {"type":"lcmstory","a":4,"b":14,"unit":"seconds","tool":true,"names":["Red light flashes (seconds)","Green light flashes (seconds)"],"text":"A red light flashes every <b>4</b> seconds. A green light flashes every <b>14</b> seconds. They flash together now. After how many seconds do they next flash together?"},
            {"type":"hcfstory","a":18,"b":30,"unit":"bunches","tool":true,"names":["Factors of 18 (roses)","Factors of 30 (tulips)"],"sumIs":"flowers in each bunch","asks":"how many bunches she can make","text":"Hoa has <b>18</b> roses and <b>30</b> tulips. She makes bunches of flowers. Every bunch has the same number of roses and the same number of tulips. She uses every flower. What is the greatest number of bunches she can make?"},
            {"type":"lcmstory","a":8,"b":12,"unit":"minutes","tool":true,"names":["Bus A leaves (minutes)","Bus B leaves (minutes)"],"text":"Bus A leaves every <b>8</b> minutes. Bus B leaves every <b>12</b> minutes. They leave together at 7 o’clock. After how many minutes do they next leave together?"}] }] }] },
      { id: 's4a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Common multiples", vi: "Bội chung" }, rounds: [
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.05"], v: [
            {"type":"fmrel","x":7,"y":35},
            {"type":"fmrel","x":36,"y":9},
            {"type":"fmrel","x":6,"y":20}] },
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.05"], v: [
            {"type":"lcm","a":5,"b":8},
            {"type":"lcm","a":9,"b":24},
            {"type":"lcm","a":10,"b":12}] },
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.01"], v: [
            {"type":"cmrange","a":3,"b":8,"lo":40,"hi":60},
            {"type":"cmrange","a":5,"b":9,"lo":80,"hi":100},
            {"type":"cmrange","a":4,"b":10,"lo":50,"hi":70}] }] },
      { title: { en: "Common factors", vi: "Ước chung" }, rounds: [
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.05"], v: [
            {"type":"flist","n":18},
            {"type":"flist","n":32},
            {"type":"flist","n":45}] },
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.05"], v: [
            {"type":"hcf","a":18,"b":45},
            {"type":"hcf","a":28,"b":40},
            {"type":"hcf","a":36,"b":60}] },
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.06"], v: [
            {"type":"cset","kind":"cf","a":12,"b":28,"at":1,"opts":[[1,2,4],[2,4],[1,2,4,7]]},
            {"type":"cset","kind":"cm","a":8,"b":12,"at":2,"opts":[[24,48,72],[12,24,48],[16,24,48]]},
            {"type":"cset","kind":"cf","a":20,"b":50,"at":0,"opts":[[1,2,5,10],[1,2,5],[1,2,4,5,10]]}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.07", "TWM.08"], v: [
            {"type":"cfix","who":"Hai","he":true,"kind":"lcm","a":4,"b":18,"slip":"product","at":1},
            {"type":"fmiss","who":"Yen","he":false,"n":40,"shown":4},
            {"type":"cfix","who":"Tam","he":true,"kind":"hcf","a":24,"b":40,"slip":"low","at":2}] },
          { mode: "your", lo: ["6Ni.06"], twm: ["TWM.07", "TWM.04"], v: [
            {"type":"claim","who":"Linh","ok":true,"at":1,"says":"28 is the lowest common multiple of 4 and 7.","reasons":[{"t":"28 is in both lists, and 7, 14 and 21 are not multiples of 4."},{"t":"14 is a common multiple of 4 and 7, and it is lower.","why":"14 is a multiple of 7, but 14 ÷ 4 is not exact. So 14 is not a common multiple."},{"t":"the lowest common multiple of 4 and 7 is 1.","why":"1 is a common factor. A multiple of 7 is 7 or more."}],"hint":{"pic":{"k":"clist","kind":"mult","a":4,"b":7,"upto":28},"step":"Count on in 7s: 7, 14, 21, 28. Which is the first one that is also a multiple of 4?"},"worked":"Multiples of 7: 7, 14, 21, 28. Multiples of 4: 4, 8, 12, 16, 20, 24, 28. The first number in both lists is 28.","model":"Linh is correct because 28 is the first number that is in both lists."},
            {"type":"claim","who":"Son","ok":false,"at":0,"says":"12 and 16 have exactly two common factors: 2 and 4.","reasons":[{"t":"1 is a common factor too: 12 ÷ 1 = 12 and 16 ÷ 1 = 16."},{"t":"8 is a common factor of 12 and 16 too.","why":"8 is a factor of 16, but 12 ÷ 8 is not exact. So 8 is not a common factor."},{"t":"2 and 4 are the only numbers in both factor lists.","why":"Write both lists from the start. Every factor list begins with 1."}],"hint":{"pic":{"k":"clist","kind":"fact","a":12,"b":16},"step":"List all the factors of 12 and all the factors of 16. Start each list with 1."},"worked":"Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 16: 1, 2, 4, 8, 16. In both lists: 1, 2 and 4. Son forgot 1.","model":"Son is incorrect because 1 is a common factor of 12 and 16 too. There are three common factors."},
            {"type":"claim","who":"Hanh","ok":false,"at":2,"says":"8 is a multiple of 24, because 8 × 3 = 24.","reasons":[{"t":"8 × 3 = 24 shows that 8 is a factor of 24. The multiple is 24."},{"t":"8 is in the 24 times table.","why":"The 24 times table is 24, 48, 72 ... 8 is not in it."},{"t":"8 is not a factor of 24 and not a multiple of 24.","why":"24 ÷ 8 = 3 exactly. So 8 is a factor of 24."}],"hint":{"pic":{"k":"hops","terms":[8,16,24],"labs":["+ 8","+ 8"]},"step":"Say the multiples of 24: 24, 48, 72 ... Is 8 one of them?"},"worked":"The multiples of 24 are 24, 48, 72 ... They are 24 or more. 8 × 3 = 24 means that 8 divides 24 exactly: 8 is a factor of 24.","model":"Hanh is incorrect because 8 is a factor of 24. 24 is a multiple of 8."}] }] }] }
    ],
    // Notes: how to do it, each with a worked example and a picture made by the maths tools; then one gap
    // sentence per note, in the same order (the first choice in the braces is the right one).
    notes: {
      items: [
        { en: 'A [[multiple]] of a number is in its times table. To list multiples, count on in equal steps. The list never ends.',
          vi: 'Bội số của một số nằm trong bảng nhân của số đó. Để liệt kê các bội số, hãy đếm cách đều: mỗi lần cộng thêm chính số đó. Danh sách không bao giờ kết thúc.',
          example: ['Multiples of 7: *7, 14, 21, 28* ...', '28 is a multiple of 7, because 4 × 7 = 28.'],
          pic: { k: 'hops', terms: [7, 14, 21, 28], labs: ['+ 7', '+ 7', '+ 7'] } },
        { en: 'A [[factor]] divides a number exactly: the number is [[divisible]] by it. Find factors in [[factor pairs|factor pair]], so you do not miss one. Start with 1.',
          vi: 'Ước số của một số là số mà số đó chia hết cho nó (chia không dư). Tìm ước số theo từng cặp để không bỏ sót. Bắt đầu từ 1.',
          example: ['20 = 1 × 20 = 2 × 10 = 4 × 5', 'The factors of 20 are *1, 2, 4, 5, 10, 20*.'],
          pic: { k: 'frain', n: 20 } },
        { en: 'A [[common multiple]] of two numbers is in both lists of multiples. There are always more of them.',
          vi: 'Bội chung của hai số có trong cả hai danh sách bội số. Luôn luôn còn thêm các bội chung khác.',
          example: ['Multiples of 3: 3, 6, 9, *12*, 15, 18, 21, *24* ...', 'Multiples of 4: 4, 8, *12*, 16, 20, *24* ...', '12 and 24 are common multiples of 3 and 4. The next one is 36.'],
          pic: { k: 'clist', kind: 'mult', a: 3, b: 4, upto: 24, marked: 'all' } },
        { en: 'The [[lowest common multiple]] is the first number in both lists. The [[product]] of the two numbers is always a common multiple, but it is not always the lowest.',
          vi: 'Bội chung nhỏ nhất là số đầu tiên có trong cả hai danh sách. Tích của hai số luôn là một bội chung, nhưng không phải lúc nào cũng là bội chung nhỏ nhất.',
          example: ['6 and 9: the lowest common multiple is *18*.', '6 × 9 = 54 is a common multiple too, but it is not the lowest.'],
          pic: { k: 'clist', kind: 'mult', a: 6, b: 9, upto: 18, marked: 'all', hl: 'low' } },
        { en: 'A [[common factor]] of two numbers is in both lists of factors. 1 is a common factor of every pair of whole numbers (not 0).',
          vi: 'Ước chung của hai số có trong cả hai danh sách ước số. 1 là ước chung của mọi cặp số tự nhiên khác 0.',
          example: ['Factors of 12: *1, 2, 3*, 4, *6*, 12', 'Factors of 30: *1, 2, 3*, 5, *6*, 10, 15, 30', 'The common factors are 1, 2, 3 and 6.'],
          pic: { k: 'venn', kind: 'fact', a: 12, b: 30 } },
        { en: 'The [[highest common factor]] is the biggest number in both lists of factors. Write both lists to the end, then look.',
          vi: 'Ước chung lớn nhất là số lớn nhất có trong cả hai danh sách ước số. Viết cả hai danh sách đến hết, rồi mới tìm.',
          example: ['Factors of 16: 1, 2, 4, 8, 16', 'Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24', 'The highest common factor of 16 and 24 is *8*.'],
          pic: { k: 'clist', kind: 'fact', a: 16, b: 24, marked: 'all', hl: 'high' } },
        { en: 'Is a rule always true? Test it with numbers. One [[counter-example]] is enough to show that a rule is not always true.',
          vi: 'Một quy tắc có luôn đúng không? Hãy thử với các số. Chỉ cần một phản ví dụ là đủ để chứng tỏ quy tắc không phải lúc nào cũng đúng.',
          example: ['Rule: “Two even numbers always have 4 as a common factor.”', 'Test 6 and 10: the common factors are *1 and 2*. 4 is not a factor of 6 or of 10.', 'So the rule is not always true.'],
          pic: { k: 'clist', kind: 'fact', a: 6, b: 10, marked: 'all' } }
      ],
      check: [
        { sentence: 'The fourth multiple of 9 is {36|27|45}.', answer: '36' },
        { sentence: 'The factors of 28 are 1, 2, 4, 7, {14|8|21} and 28.', answer: '14' },
        { sentence: '{40|30|45} is a common multiple of 5 and 8.', answer: '40' },
        { sentence: 'The lowest common multiple of 9 and 12 is {36|108|3}.', answer: '36' },
        { sentence: 'The common factors of 10 and 15 are 1 and {5|3|10}.', answer: '5' },
        { sentence: 'The highest common factor of 18 and 30 is {6|3|90}.', answer: '6' },
        { sentence: 'One example that shows a rule is wrong is a {counter-example|common factor|factor pair}.', answer: 'counter-example' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard: 5 at DOK 1, 4 at DOK 2, 1 at DOK 3 (T.DOK_MIX), each with
    // lo, twm and 3 sets of numbers (play 1 uses v[0]). One objective, ten different kinds of question.
    test: {
      items: [
        { dok: 1, lo: ["6Ni.06"], twm: ["TWM.05"], v: [
          {"type":"mlist","k":8,"n":5},
          {"type":"mlist","k":9,"n":5},
          {"type":"mlist","k":11,"n":5}
        ] },
        { dok: 1, lo: ["6Ni.06"], twm: ["TWM.05"], v: [
          {"type":"flist","n":52},
          {"type":"flist","n":75},
          {"type":"flist","n":63}
        ] },
        { dok: 1, lo: ["6Ni.06"], twm: ["TWM.06"], v: [
          {"type":"cmis","a":6,"b":7,"n":63,"at":2},
          {"type":"cmis","a":4,"b":15,"n":60,"at":0},
          {"type":"cmis","a":9,"b":10,"n":80,"at":1}
        ] },
        { dok: 1, lo: ["6Ni.06"], twm: ["TWM.05"], v: [
          {"type":"lcm","a":20,"b":25},
          {"type":"lcm","a":8,"b":18},
          {"type":"lcm","a":15,"b":18}
        ] },
        { dok: 1, lo: ["6Ni.06"], twm: ["TWM.05"], v: [
          {"type":"hcf","a":21,"b":35},
          {"type":"hcf","a":32,"b":40},
          {"type":"hcf","a":45,"b":60}
        ] },
        { dok: 2, lo: ["6Ni.06"], twm: ["TWM.01"], v: [
          {"type":"cmrange","a":4,"b":11,"lo":60,"hi":100},
          {"type":"cmrange","a":5,"b":7,"lo":100,"hi":150},
          {"type":"cmrange","a":12,"b":14,"lo":70,"hi":100}
        ] },
        { dok: 2, lo: ["6Ni.06"], twm: ["TWM.01"], v: [
          {"type":"lcmstory","a":10,"b":16,"unit":"seconds","text":"A blue lamp flashes every <b>10</b> seconds. A yellow lamp flashes every <b>16</b> seconds. They flash together now. After how many seconds do they next flash together?"},
          {"type":"hcfstory","a":36,"b":54,"unit":"cm","sumIs":"pieces","asks":"for the greatest length of each piece","text":"Phong has a ribbon <b>36</b> cm long and a ribbon <b>54</b> cm long. He cuts both into pieces. All the pieces have the same length, a whole number of centimetres, and no ribbon is left. What is the greatest length of each piece?"},
          {"type":"lcmstory","a":15,"b":20,"unit":"minutes","text":"A school bell rings every <b>15</b> minutes. A clock bell rings every <b>20</b> minutes. They ring together at 12 o’clock. After how many minutes do they next ring together?"}
        ] },
        { dok: 2, lo: ["6Ni.06"], twm: ["TWM.01"], v: [
          {"type":"twostep","kind":"packs","a":20,"b":24,"unit":"packs","things":["plates","cups"],"text":"Paper plates come in packs of <b>20</b>. Cups come in packs of <b>24</b>. Duc wants the same number of plates and cups. He buys as few packs as he can. How many packs does he buy altogether?"},
          {"type":"twostep","kind":"each","a":20,"b":45,"unit":"beads","things":["red beads","blue beads"],"groups":"bags","text":"Chi has <b>20</b> red beads and <b>45</b> blue beads. She makes the greatest number of bags she can. Every bag has the same number of red beads and the same number of blue beads. No bead is left. How many beads are in each bag?"},
          {"type":"twostep","kind":"packs","a":14,"b":21,"unit":"packs","things":["stickers","badges"],"text":"Stickers come in packs of <b>14</b>. Badges come in packs of <b>21</b>. Long wants the same number of stickers and badges. He buys as few packs as he can. How many packs does he buy altogether?"}
        ] },
        { dok: 2, lo: ["6Ni.06"], twm: ["TWM.07", "TWM.08"], v: [
          {"type":"cfix","who":"Hung","he":true,"kind":"lcm","a":10,"b":35,"slip":"product","at":2},
          {"type":"cfix","who":"Thu","he":false,"kind":"hcf","a":30,"b":40,"slip":"low","at":0},
          {"type":"cfix","who":"Minh","he":true,"kind":"hcf","a":36,"b":48,"slip":"low","w":6,"at":1}
        ] },
        { dok: 3, lo: ["6Ni.06"], twm: ["TWM.01", "TWM.04"], v: [
          {"type":"claim","who":"Giang","ok":false,"at":2,"says":"The lowest common multiple of two numbers is always the two numbers multiplied together.","reasons":[{"t":"for 6 and 14 the product is 84, but 42 is a lower common multiple. One example like this shows the rule is not always true."},{"t":"3 × 11 = 33, and 33 is the lowest common multiple of 3 and 11. So the rule is always true.","why":"One example that fits does not prove the rule. Try 6 and 14."},{"t":"two numbers multiplied together never make a common multiple.","why":"They always do: 6 × 14 = 84 is in both times tables. But it is not always the lowest."}],"hint":{"step":"Test the rule with two numbers that have a common factor bigger than 1, like two numbers in the 2 times table."},"worked":"6 × 14 = 84. The multiples of 14 are 14, 28, 42 ... 14 and 28 are not multiples of 6, but 42 = 7 × 6. So the lowest common multiple of 6 and 14 is 42, not 84.","model":"Giang is incorrect because for 6 and 14 the product is 84, but the lowest common multiple is 42."},
          {"type":"claim","who":"Kim","ok":true,"at":0,"says":"Two even numbers always have 2 as a common factor.","reasons":[{"t":"every even number is in the 2 times table. So 2 divides both numbers exactly."},{"t":"8 and 28 are even, and their highest common factor is 4, not 2.","why":"The rule does not say “highest”. 8 ÷ 2 = 4 and 28 ÷ 2 = 14, so 2 is a common factor too."},{"t":"an even number can have an odd factor: 5 is a factor of 10.","why":"That is true, but the rule is about 2. 10 ÷ 2 = 5, so 2 is a factor of 10 too."}],"hint":{"pic":{"k":"clist","kind":"fact","a":10,"b":22},"step":"Test the rule. Choose two even numbers, like 10 and 22. Is 2 in both lists of factors?"},"worked":"Factors of 10: 1, 2, 5, 10. Factors of 22: 1, 2, 11, 22. 2 is in both lists. Every even number is in the 2 times table, so 2 divides it exactly.","model":"Kim is correct because every even number divides by 2 exactly, so 2 is always a common factor."},
          {"type":"claim","who":"Binh","ok":false,"at":1,"says":"The highest common factor of two different numbers is always smaller than both numbers.","reasons":[{"t":"for 5 and 15 the highest common factor is 5, and 5 is one of the two numbers. One example like this shows the rule is not always true."},{"t":"for 16 and 20 the highest common factor is 4, and 4 is smaller than both. So the rule is always true.","why":"That example fits. But one example does not prove “always”. Try 5 and 15."},{"t":"the highest common factor of two numbers is always 1.","why":"1 is always a common factor, but often it is not the highest. For 5 and 15 the highest is 5."}],"hint":{"step":"Test the rule with a pair where one number is a multiple of the other."},"worked":"Factors of 5: 1, 5. Factors of 15: 1, 3, 5, 15. The highest common factor is 5. It is not smaller than 5.","model":"Binh is incorrect because the highest common factor of 5 and 15 is 5, and 5 is not smaller than 5."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). Made and checked by
    // tools/gen_lightning_s4.py (it writes the lines between the two marks).
    lightning: {
      secs: 60,
      items: [
        // lightning:begin
        ["Which is NOT a factor of 30?", ["4", "5", "3"]],
        ["How many factors does 30 have?", ["8", "7", "6"]],
        ["Lowest common multiple of 12 and 20", ["60", "240", "4"]],
        ["Lowest common multiple of 5 and 8", ["40", "80", "13"]],
        ["Highest common factor of 18 and 27", ["9", "3", "18"]],
        ["The 3rd multiple of 25 is", ["75", "50", "100"]],
        ["The 3rd multiple of 13 is", ["39", "26", "52"]],
        ["Highest common factor of 16 and 24", ["8", "4", "16"]],
        ["Lowest common multiple of 3 and 5", ["15", "30", "8"]],
        ["Which is a common multiple of 3 and 8?", ["24", "21", "32"]],
        ["Is 4 a factor or a multiple of 36?", ["factor", "multiple", "neither"]],
        ["A number in two times tables is a common ...", ["multiple", "factor", "product"]],
        ["Lowest common multiple of 3 and 12", ["12", "36", "3"]],
        ["Lowest common multiple of 6 and 9", ["18", "54", "3"]],
        ["Which is NOT a factor of 28?", ["6", "7", "14"]],
        ["Is 6 a factor or a multiple of 30?", ["factor", "multiple", "neither"]],
        ["How many factors does 16 have?", ["5", "4", "3"]],
        ["Factors of 27: 1, 3, ?, 27", ["9", "4", "5"]],
        ["How many factors does 12 have?", ["6", "5", "4"]],
        ["The 4th multiple of 15 is", ["60", "45", "75"]],
        ["How many factors does 20 have?", ["6", "5", "4"]],
        ["Is 7 a factor or a multiple of 28?", ["factor", "multiple", "neither"]],
        ["Lowest common multiple of 5 and 10", ["10", "50", "5"]],
        ["Factors of 44: 1, ?, 4, 11, 22, 44", ["2", "3", "5"]],
        ["Which is a common factor of 16 and 24?", ["2", "16", "6"]],
        ["How many factors does 28 have?", ["6", "5", "4"]],
        ["Which is a common multiple of 3 and 4?", ["24", "21", "28"]],
        ["Is 8 a factor or a multiple of 40?", ["factor", "multiple", "neither"]],
        ["Is 25 a factor or a multiple of 10?", ["neither", "factor", "multiple"]],
        ["Which is a common factor of 18 and 30?", ["6", "9", "5"]],
        ["Lowest common multiple of 2 and 7", ["14", "28", "9"]],
        ["Highest common factor of 12 and 30", ["6", "3", "12"]],
        ["Which is a common factor of 12 and 32?", ["2", "12", "8"]],
        ["Which is a common multiple of 6 and 9?", ["36", "30", "45"]],
        ["Highest common factor of 28 and 35", ["7", "1", "28"]],
        ["Highest common factor of 32 and 48", ["16", "8", "32"]],
        ["Highest common factor of 9 and 30", ["3", "1", "9"]],
        ["Lowest common multiple of 6 and 10", ["30", "60", "2"]],
        ["The 3rd multiple of 12 is", ["36", "24", "48"]],
        ["Which is a common factor of 20 and 30?", ["10", "20", "3"]],
        ["Which is NOT a factor of 24?", ["9", "6", "3"]],
        ["How many factors does 9 have?", ["3", "2", "4"]],
        ["The 6th multiple of 7 is", ["42", "35", "49"]],
        ["How many factors does 18 have?", ["6", "5", "4"]],
        ["Lowest common multiple of 8 and 10", ["40", "80", "2"]],
        ["Is 48 a factor or a multiple of 6?", ["multiple", "factor", "neither"]],
        ["Is 60 a factor or a multiple of 12?", ["multiple", "factor", "neither"]],
        ["Which is a common multiple of 4 and 10?", ["60", "56", "70"]],
        ["Which is NOT a factor of 32?", ["6", "16", "8"]],
        ["Factors of 50: 1, 2, ?, 10, 25, 50", ["5", "3", "4"]],
        ["12 is divisible by", ["4", "5", "8"]],
        ["Is 8 a factor or a multiple of 30?", ["neither", "factor", "multiple"]],
        ["Which is a common factor of 30 and 45?", ["3", "2", "45"]],
        ["The 7th multiple of 6 is", ["42", "36", "48"]],
        ["Which is a common factor of 20 and 28?", ["2", "5", "7"]],
        ["The biggest factor of 36 is", ["36", "18", "6"]],
        ["Factors of 28: 1, 2, 4, 7, ?, 28", ["14", "8", "9"]],
        ["Which is a common factor of 27 and 36?", ["3", "27", "12"]],
        ["Lowest common multiple of 4 and 10", ["20", "40", "2"]],
        ["Factors of 45: 1, 3, ?, 9, 15, 45", ["5", "4", "6"]],
        ["Is 9 a factor or a multiple of 54?", ["factor", "multiple", "neither"]],
        ["1 is a common factor of", ["every pair of whole numbers", "odd numbers only", "no numbers"]],
        ["Is 45 a factor or a multiple of 9?", ["multiple", "factor", "neither"]],
        ["Which is a common multiple of 3 and 7?", ["21", "18", "28"]],
        ["Which is a common factor of 24 and 32?", ["4", "24", "16"]],
        ["Which is NOT a factor of 36?", ["8", "9", "6"]],
        ["Lowest common multiple of 10 and 15", ["30", "150", "5"]],
        ["The 4th multiple of 20 is", ["80", "60", "100"]],
        ["Highest common factor of 12 and 16", ["4", "2", "12"]],
        ["The first multiple of 9 is", ["9", "18", "1"]],
        ["Lowest common multiple of 9 and 12", ["36", "108", "3"]],
        ["Highest common factor of 10 and 25", ["5", "1", "10"]],
        ["Lowest common multiple of 8 and 12", ["24", "96", "4"]],
        ["Which is NOT a factor of 18?", ["4", "6", "9"]],
        ["Highest common factor of 15 and 40", ["5", "1", "15"]],
        ["Factors of 20: 1, 2, ?, 5, 10, 20", ["4", "3", "6"]],
        ["Which is a common multiple of 5 and 6?", ["60", "55", "66"]],
        ["Highest common factor of 24 and 36", ["12", "6", "24"]],
        ["Which is a common factor of 40 and 60?", ["2", "8", "15"]],
        ["Which is a factor pair of 20?", ["4 and 5", "4 and 6", "2 and 20"]],
        ["Is 21 a factor or a multiple of 7?", ["multiple", "factor", "neither"]],
        ["Is 32 a factor or a multiple of 8?", ["multiple", "factor", "neither"]],
        ["Which is a common multiple of 8 and 12?", ["48", "40", "60"]],
        ["Which is NOT a factor of 40?", ["6", "5", "10"]],
        ["Highest common factor of 20 and 30", ["10", "5", "20"]],
        ["35 is divisible by", ["7", "6", "15"]],
        ["Factors of 18: 1, ?, 3, 6, 9, 18", ["2", "4", "5"]],
        ["Which is a common multiple of 2 and 5?", ["40", "38", "45"]],
        ["Which is a factor pair of 36?", ["4 and 9", "4 and 8", "3 and 9"]],
        ["How many factors does 25 have?", ["3", "2", "4"]],
        ["Which is NOT a factor of 45?", ["6", "5", "3"]],
        ["Which is a common multiple of 2 and 3?", ["18", "16", "21"]],
        ["5 × 8 = 40. So 40 is the ___ of 5 and 8", ["product", "sum", "factor"]],
        ["Highest common factor of 14 and 35", ["7", "1", "14"]],
        ["Highest common factor of 8 and 12", ["4", "2", "8"]],
        ["Which is a common factor of 12 and 20?", ["4", "3", "20"]],
        ["The smallest factor of every whole number (not 0) is", ["1", "0", "2"]],
        ["Lowest common multiple of 9 and 15", ["45", "135", "3"]],
        ["Which is a common multiple of 4 and 5?", ["40", "36", "45"]],
        ["Factors of 32: 1, 2, ?, 8, 16, 32", ["4", "3", "5"]],
        ["Highest common factor of 18 and 45", ["9", "3", "18"]]
        // lightning:end
      ]
    },
    // My self-check: the goals of the stop. again: the step to practise again for each goal (c = See it, r and a = Practise).
    selfcheck: {
      goals: ["list the multiples and all the factors of a number", "find common multiples and the lowest common multiple", "find common factors and the highest common factor", "solve real-life problems with common multiples and factors", "test a rule with a counter-example"],
      again: ["c", "r", "r", "a", "a"]
    }
  };
})(window.T = window.T || {});
