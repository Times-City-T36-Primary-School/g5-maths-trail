/* 22-pack-stop3.js - ALL the content of Stop 3, Sequences and term rules (Grade 5, Cambridge Stage 6: 6Nc.01, 6Nc.03,
   6Nc.04). Every part is here: words, see, practise, notes, test, lightning, selfcheck. The questions are data for the
   Grade 5 models (08-g5-models-s3.js) and the tools of 39-g5-tools-s3.js. None of the numbers, names or sentences
   are those of the EOS1 papers. */
(function (T) {
  'use strict';

  T.packs[3] = {
    n: 3,
    title: "Sequences and term rules",
    los: ["6Nc.01", "6Nc.03", "6Nc.04"],
    blurb: {
      en: "Count on and back in equal steps. Find any *term* with a rule.",
      vi: "Đếm thêm và đếm lùi theo bước nhảy đều. Tìm *số hạng* bất kì bằng quy luật."
    },
    words: {
      sets: [
        { id: 'A', title: { en: 'Sequences', vi: 'Dãy số' }, keys: ['sequence', 'term', 'position', 'rule'] },
        { id: 'B', title: { en: 'Two kinds of rule', vi: 'Hai loại quy luật' }, keys: ['term-to-term rule', 'position-to-term rule', 'constant'] },
        { id: 'C', title: { en: 'Count and numbers', vi: 'Đếm và các số' }, keys: ['count on', 'count back', 'negative number', 'square number'] }
      ],
      items: {
        'sequence': { art: 'w-sequence', vi: 'dãy số', def: 'A list of numbers in order that follows a rule. 3, 6, 9, 12 ... is a sequence.' },
        'term': { art: 'w-term', vi: 'số hạng', def: 'One number in a sequence. In 3, 6, 9, 12 ... the 2nd term is 6.' },
        'position': { art: 'w-position', vi: 'vị trí', def: 'The place of a term in a sequence: 1st, 2nd, 3rd ... In 3, 6, 9, 12 ... the term 9 is in position 3.' },
        'rule': { art: 'w-rule', vi: 'quy luật', def: 'What you do to make a sequence. The rule "add 3" makes 3, 6, 9, 12 ...' },
        'term-to-term rule': { art: 'w-term-to-term-rule', vi: 'quy luật từ số hạng đến số hạng', def: 'How to get from one term to the next term. For 5, 8, 11, 14 ... it is: add 3.' },
        'position-to-term rule': { art: 'w-position-to-term-rule', vi: 'quy luật từ vị trí đến số hạng', def: 'How to get a term from its position. For 3, 6, 9, 12 ... it is: multiply the position by 3.' },
        'constant': { art: 'w-constant', vi: 'hằng số (số không đổi)', def: 'A number that stays the same. In 5, 8, 11, 14 ... the step is constant: it is always 3.' },
        'count on': { art: 'w-count-on', vi: 'đếm thêm', def: 'To count forwards in equal steps. Count on in 0.5s from 1: 1.5, 2, 2.5 ...' },
        'count back': { art: 'w-count-back', vi: 'đếm lùi', def: 'To count backwards in equal steps. Count back in 2s from 5: 3, 1, −1 ...' },
        'negative number': { art: 'w-negative-number', vi: 'số âm', def: 'A number less than zero. We write it with a minus sign: −3.' },
        'square number': { art: 'w-square-number', vi: 'số chính phương', def: 'The answer when you multiply a whole number by itself. 4 × 4 = 16, so 16 is a square number.' }
      }
    },
    // See it: Concrete. Hop along the sequence track in equal steps (decimals, past zero, fractions); build a
    // position-to-term rule in the table; then the challenge (the data shape is in 45-see.js).
    see: {
      scenes: [
        { id: 'hop', title: { en: 'Hop in equal steps', vi: 'Nhảy những bước đều nhau' }, tool: 'strack', strack: { a: '0.6', d: '-0.3', shown: 1, max: 5, pos: true },
          steps: [
            { can: { hop: true }, wait: 'hop', until: { n: 3 },
              zip: { en: 'Each hop is *− 0.3*. Tap *Hop* two times.', vi: 'Mỗi bước nhảy là *− 0.3*. Bấm *Hop* (Nhảy) hai lần.' },
              then: { en: '0.6, 0.3, 0. The step is always the same.', vi: '0.6, 0.3, 0. Bước nhảy luôn bằng nhau.' } },
            { can: { hop: true }, wait: 'hop', until: { n: 5 },
              zip: { en: 'Now hop past zero. Tap *Hop* two more times.', vi: 'Bây giờ nhảy qua số 0. Bấm *Hop* thêm hai lần.' },
              then: { en: '*−0.3* and *−0.6* are negative numbers.', vi: '*−0.3* và *−0.6* là các số âm.' } },
            { can: { hop: true }, wait: 'hop', until: { n: 4 }, strack: { a: '1/4', d: '1/2', shown: 1, max: 4, pos: true },
              zip: { en: 'Now fractions. Each hop is *+ 1/2*. Hop three times.', vi: 'Bây giờ là phân số. Mỗi bước nhảy là *+ 1/2*. Nhảy ba lần.' },
              then: { en: '1/4, 3/4, 1 1/4, 1 3/4. Equal steps again! Tap *Next*.', vi: '1/4, 3/4, 1 1/4, 1 3/4. Các bước lại đều nhau! Bấm *Next*.' } }] },
        { id: 'rule', title: { en: 'Position to term', vi: 'Vị trí đến số hạng' }, tool: 'srule', srule: { pos: [1, 2, 3, 4], rule: { k: 3, c: 2 }, far: 10 },
          steps: [
            { can: { mul: true }, wait: 'mul', until: { k: 3 },
              zip: { en: 'The terms go up in *3s*. Tap *+* two times.', vi: 'Các số hạng tăng *3 đơn vị* mỗi lần. Bấm *+* hai lần.' },
              then: { en: 'Position × 3 gives 3, 6, 9, 12. Nearly!', vi: 'Vị trí × 3 cho 3, 6, 9, 12. Gần đúng rồi!' } },
            { can: { add: true }, wait: 'add', until: { fit: true },
              zip: { en: 'Every term is *2 more* than position × 3. Now add 2.', vi: 'Mỗi số hạng *lớn hơn* vị trí × 3 *2 đơn vị*. Bây giờ cộng thêm 2.' },
              then: { en: 'The rule fits! The 10th term is *32*. Tap *Next*.', vi: 'Quy luật đã đúng! Số hạng thứ 10 là *32*. Bấm *Next*.' } }] },
        { id: 'challenge', title: { en: 'Sequence challenge', vi: 'Thử thách dãy số' },
          challenge: {
            end: { en: 'You did it! You can hop and use a rule.', vi: 'Em làm được rồi! Em biết nhảy bước đều và dùng quy luật.' },
            result: 'You made sequences and built a rule.',
            rounds: [
          { mode: "our", lo: ["6Nc.01"], v: [
            {"type":"scount","a":"1.2","d":"0.4","shown":3,"ask":2,"track":true},
            {"type":"scount","a":"0.5","d":"0.3","shown":3,"ask":2,"track":true},
            {"type":"scount","a":"3.6","d":"0.7","shown":3,"ask":2,"track":true}] },
          { mode: "your", lo: ["6Nc.01"], v: [
            {"type":"scount","a":9,"d":-4,"shown":3,"ask":2,"track":true},
            {"type":"scount","a":"1.5","d":"-0.5","shown":3,"ask":2,"track":true},
            {"type":"scount","a":12,"d":-5,"shown":3,"ask":2,"track":true}] },
          { mode: "your", lo: ["6Nc.01"], v: [
            {"type":"sfracnext","a":"1/3","d":"2/3","shown":3,"at":1},
            {"type":"sfracnext","a":"1/2","d":"1/4","shown":4,"at":2},
            {"type":"sfracnext","a":"2","d":"-1/3","shown":4,"at":0}] },
          { mode: "your", lo: ["6Nc.03"], v: [
            {"type":"sruleset","k":4,"c":1,"n":4,"far":10},
            {"type":"sruleset","k":5,"c":-2,"n":4,"far":10},
            {"type":"sruleset","k":2,"c":3,"n":4,"far":10}] },
          { mode: "your", lo: ["6Nc.04"], v: [
            {"type":"sqnth","k":6},
            {"type":"sqnth","k":9},
            {"type":"sqnth","k":5}] }] } }]
    },
    // Practise: Pictorial (Draw it: the sequence track and the rule table) then Abstract (Solve it, like the test).
    practise: [
      { id: 's3r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Use the sequence track and the rule table.', vi: 'Dùng đường ray dãy số và bảng quy luật.' },
        levels: [
      { title: { en: "The sequence track", vi: "Đường ray dãy số" }, rounds: [
          { mode: "our", lo: ["6Nc.01"], twm: ["TWM.02"], v: [
            {"type":"scount","a":"0.9","d":"0.6","shown":3,"ask":2,"track":true},
            {"type":"scount","a":"4.2","d":"0.5","shown":3,"ask":2,"track":true},
            {"type":"scount","a":"1.8","d":"0.4","shown":3,"ask":2,"track":true}] },
          { mode: "your", lo: ["6Nc.01"], twm: ["TWM.02"], v: [
            {"type":"scount","a":"0.8","d":"-0.3","shown":3,"ask":2,"track":true},
            {"type":"scount","a":10,"d":-6,"shown":3,"ask":2,"track":true},
            {"type":"scount","a":"1.1","d":"-0.4","shown":3,"ask":2,"track":true}] }] },
      { title: { en: "Find the step", vi: "Tìm bước nhảy" }, rounds: [
          { mode: "your", lo: ["6Nc.01"], twm: ["TWM.01", "TWM.02"], v: [
            {"type":"sfit","a":3,"to":23,"at":5},
            {"type":"sfit","a":"0.4","to":"2.8","at":5},
            {"type":"sfit","a":20,"to":-4,"at":5}] },
          { mode: "your", lo: ["6Nc.01"], twm: ["TWM.02"], v: [
            {"type":"sfractype","a":"1/5","d":"2/5","shown":3,"pic":true},
            {"type":"sfractype","a":"3/8","d":"3/8","shown":3,"pic":true},
            {"type":"sfractype","a":"11/6","d":"-2/6","shown":3,"den":6,"pic":true}] }] },
      { title: { en: "The rule table", vi: "Bảng quy luật" }, rounds: [
          { mode: "your", lo: ["6Nc.03"], twm: ["TWM.02"], v: [
            {"type":"sruleset","k":9,"c":0,"n":4,"far":10},
            {"type":"sruleset","k":3,"c":4,"n":4,"far":10},
            {"type":"sruleset","k":8,"c":-3,"n":4,"far":10}] },
          { mode: "your", lo: ["6Nc.04"], twm: ["TWM.02"], v: [
            {"type":"stable","sq":[0,0],"pos":[1,2,3,4,6],"hide":[3,4],"fig":{"k":"dotseq","ks":[1,2,3]}},
            {"type":"stable","sq":[0,1],"pos":[1,2,3,4,7],"hide":[2,4]},
            {"type":"stable","sq":[2,0],"pos":[1,2,3,4,8],"hide":[3,4]}] }] }] },
      { id: 's3a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Count on and back", vi: "Đếm thêm và đếm lùi" }, rounds: [
          { mode: "your", lo: ["6Nc.01"], twm: ["TWM.02"], v: [
            {"type":"scount","a":"6.1","d":"-0.7","shown":4,"ask":2},
            {"type":"scount","a":"0.35","d":"0.15","shown":4,"ask":2},
            {"type":"scount","a":"2.4","d":"-0.9","shown":4,"ask":2}] },
          { mode: "your", lo: ["6Nc.01"], twm: ["TWM.02"], v: [
            {"type":"sgap","a":-11,"d":4,"n":6,"gaps":[2,4]},
            {"type":"sgap","a":"1.9","d":"-0.6","n":6,"gaps":[1,4]},
            {"type":"sgap","a":13,"d":-5,"n":6,"gaps":[3,5]}] },
          { mode: "your", lo: ["6Nc.01"], twm: ["TWM.02"], v: [
            {"type":"sfracnext","a":"1/8","d":"3/8","shown":4,"at":0},
            {"type":"sstep","a":"2 1/2","d":"-3/4","n":4,"at":1},
            {"type":"sfracnext","a":"2/5","d":"4/5","shown":3,"at":1}] }] },
      { title: { en: "Position-to-term rule", vi: "Quy luật từ vị trí đến số hạng" }, rounds: [
          { mode: "your", lo: ["6Nc.03"], twm: ["TWM.02"], v: [
            {"type":"snth","k":8,"c":0,"n":15,"shown":4},
            {"type":"snth","k":9,"c":0,"n":20,"shown":4},
            {"type":"spos","k":8,"c":0,"term":136,"shown":4}] },
          { mode: "your", lo: ["6Nc.03"], twm: ["TWM.02", "TWM.01"], v: [
            {"type":"stable","k":4,"c":3,"pos":[1,2,3,4,10],"hide":[3,4]},
            {"type":"srule","k":6,"c":3,"shown":4,"at":1},
            {"type":"stable","k":5,"c":-3,"pos":[1,2,3,4,12],"hide":[2,4]}] },
          { mode: "your", lo: ["6Nc.04"], twm: ["TWM.02"], v: [
            {"type":"sqterm","s":0,"c":0,"n":9,"shown":4},
            {"type":"sqrule","s":0,"c":2,"shown":4,"at":2},
            {"type":"sqterm","s":3,"c":0,"n":8,"shown":4}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["6Nc.03"], twm: ["TWM.04", "TWM.01"], v: [
            {"type":"sisin","k":7,"c":3,"target":73,"shown":4,"at":1},
            {"type":"sisin","k":4,"c":-1,"target":60,"shown":4,"at":2},
            {"type":"sisin","k":9,"c":2,"target":101,"shown":4,"at":0}] },
          { mode: "your", lo: ["6Nc.04"], twm: ["TWM.07", "TWM.04"], v: [
            {"type":"claim","who":"Binh","ok":false,"at":0,"says":"In the sequence 1, 4, 9, 16, ... the 12th term is 24.","reasons":[{"t":"the terms are square numbers. The 12th term is 12 × 12 = 144."},{"t":"12 × 2 = 24, and a square number is a number times 2.","why":"A square number is a number times itself: 12 × 12, not 12 × 2."},{"t":"the steps are all + 3, so the 12th term is 1 + 11 × 3 = 34.","why":"The steps are not equal: + 3, + 5, + 7 ... They grow each time."}],"hint":{"pic":{"k":"dotseq","ks":[1,2,3,4]},"step":"1 = 1 × 1, 4 = 2 × 2, 9 = 3 × 3. What is the rule?"},"worked":"The terms are the square numbers: 1 × 1, 2 × 2, 3 × 3, 4 × 4 ... The 12th term is 12 × 12 = 144.","model":"Binh is incorrect because the 12th term is 12 × 12 = 144, not 12 × 2."},
            {"type":"claim","who":"Phong","ok":true,"at":2,"says":"In the sequence of square numbers 1, 4, 9, 16, ... the step from one term to the next is always an odd number.","reasons":[{"t":"the steps are 3, 5, 7, 9 ... Each step is two numbers next to each other added together: 16 − 9 = 7 = 3 + 4. One number is odd and one is even, so the step is always odd."},{"t":"the steps are all the same size: 3, 3, 3 ...","why":"4 − 1 = 3, but 9 − 4 = 5. The steps grow each time."},{"t":"16 − 9 = 6, and 6 is an even number.","why":"Check the subtraction: 16 − 9 = 7, not 6."}],"hint":{"pic":{"k":"dotseq","ks":[1,2,3,4]},"step":"Work out each step: 4 − 1, 9 − 4, 16 − 9, 25 − 16."},"worked":"4 − 1 = 3 = 1 + 2. 9 − 4 = 5 = 2 + 3. 16 − 9 = 7 = 3 + 4. 25 − 16 = 9 = 4 + 5. Each step adds two numbers next to each other. One is odd and one is even, and odd + even is always odd.","model":"Phong is correct because the steps are 3, 5, 7, 9 ...: they are always odd."},
            {"type":"claim","who":"Hai","ok":false,"at":1,"says":"In the sequence 5, 8, 13, 20, ... the 6th term is 6 × 6 = 36.","reasons":[{"t":"each term is 4 more than a square number: 1 + 4, 4 + 4, 9 + 4 ... The 6th term is 6 × 6 + 4 = 40."},{"t":"the 6th term is a square number, and 6 × 6 = 36.","why":"5 is not a square number. Each term is 4 more than a square number: 1 + 4 = 5."},{"t":"the steps are + 3, + 5, + 7, so the 6th term is 20 + 9 = 29.","why":"20 + 9 = 29 is the 5th term. One more step, + 11, gives the 6th term."}],"hint":{"pic":{"k":"stable","pos":[1,2,3,4,6],"sq":{"s":0,"c":4},"hide":[4]},"step":"Compare the terms with the square numbers 1, 4, 9, 16. What is added each time?"},"worked":"1 × 1 + 4 = 5. 2 × 2 + 4 = 8. 3 × 3 + 4 = 13. 4 × 4 + 4 = 20. Each term is 4 more than a square number. The 6th term is 6 × 6 + 4 = 36 + 4 = 40.","model":"Hai is incorrect because each term is 4 more than a square number: the 6th term is 40."}] }] }] }
    ],
    // Notes: how to do it, each with a worked example and a picture made by the maths tools; then one gap
    // sentence per note, in the same order (the first choice in the braces is the right one).
    notes: {
      items: [
        { en: 'A [[sequence]] is a list of numbers that follows a [[rule]]. Each number is a [[term]]. The place of a term is its [[position]].',
          vi: 'Dãy số là một dãy các số tuân theo một quy luật. Mỗi số là một số hạng. Thứ tự của số hạng trong dãy là vị trí của nó.',
          example: ['In 4, 7, 10, 13 ... the 3rd term is *10*.', 'The term 10 is in *position 3*.'],
          pic: { k: 'strack', a: 4, d: 3, n: 4, pos: true } },
        { en: 'To [[count on]] or [[count back]], add or subtract the same step each time. The step is [[constant]].',
          vi: 'Để đếm thêm hoặc đếm lùi, cộng hoặc trừ cùng một bước nhảy mỗi lần. Bước nhảy không đổi.',
          example: ['2.4, 3.1, 3.8, 4.5 ... The step is *+ 0.7*.', 'The next term is 4.5 + 0.7 = *5.2*.'],
          pic: { k: 'strack', a: '2.4', d: '0.7', n: 4, blanks: 1 } },
        { en: 'When you count back past zero, the terms are [[negative numbers|negative number]]. Keep the same step.',
          vi: 'Khi đếm lùi qua số 0, các số hạng là số âm. Vẫn giữ nguyên bước nhảy.',
          example: ['5, 2, −1, −4 ... The step is *− 3*.', 'The next term is −4 − 3 = *−7*.'],
          pic: { k: 'strack', a: 5, d: -3, n: 5, mark: [4] } },
        { en: 'Fractions work in the same way. Write the terms with the same denominator. Then only the numerator changes.',
          vi: 'Phân số cũng làm như vậy. Viết các số hạng với cùng mẫu số. Khi đó chỉ tử số thay đổi.',
          example: ['1/4, 3/4, 5/4, 7/4 ... The step is *+ 2/4*.', 'The next term is *9/4*. That is 2 1/4.'],
          pic: { k: 'strack', a: '1/4', d: '1/2', n: 4, blanks: 1, den: 4 } },
        { en: 'A [[term-to-term rule]] takes you to the next term. A [[position-to-term rule]] takes you to any term. Adding the same step again and again is multiplying.',
          vi: 'Quy luật từ số hạng đến số hạng đưa em đến số hạng kế tiếp. Quy luật từ vị trí đến số hạng đưa em đến bất kì số hạng nào. Cộng lặp lại cùng một bước nhảy chính là phép nhân.',
          example: ['6, 11, 16, 21 ... goes up in 5s. Each term is 1 more than a multiple of 5.', 'Rule: multiply the position by 5, then add 1.', '20th term: 20 × 5 + 1 = *101*.'],
          pic: { k: 'stable', pos: [1, 2, 3, 20], rule: { k: 5, c: 1 }, hl: 3 } },
        { en: 'Is a number in the sequence? Work backwards with the [[position-to-term rule]].',
          vi: 'Một số có thuộc dãy số không? Hãy làm ngược lại với quy luật từ vị trí đến số hạng.',
          example: ['Is 58 in 6, 11, 16, 21 ...? The rule is × 5, then + 1.', '58 − 1 = 57, and 57 is not a multiple of 5.', 'So 58 is *not* in the sequence.'],
          pic: { k: 'smachine', rule: { k: 5, c: 1 }, back: true } },
        { en: 'A [[square number]] is a whole number times itself. In the sequence of square numbers, the term is the position times the position.',
          vi: 'Số chính phương là một số tự nhiên nhân với chính nó. Trong dãy các số chính phương, số hạng bằng vị trí nhân với vị trí.',
          example: ['1, 4, 9, 16 ... 9th term: 9 × 9 = *81*.', '2, 5, 10, 17 ... Each term is 1 more than a square number. 9th term: 9 × 9 + 1 = *82*.'],
          pic: { k: 'dotseq', ks: [1, 2, 3, 4] } }
      ],
      check: [
        { sentence: 'In 4, 7, 10, 13 ... the term in position 2 is {7|4|10}.', answer: '7' },
        { sentence: '1.5, 1.9, 2.3, 2.7 ... The next term is {3.1|3|2.11}.', answer: '3.1' },
        { sentence: '6, 2, −2 ... The next term is {−6|−4|6}.', answer: '−6' },
        { sentence: '2/7, 4/7, 6/7 ... The next term is {8/7|8/14|7/7}.', answer: '8/7' },
        { sentence: 'Rule: multiply the position by 9, then add 2. The 10th term is {92|90|21}.', answer: '92' },
        { sentence: 'The sequence 9, 13, 17, 21 ... {has 41 as its 9th term|has 41 as its 8th term|does not have 41 in it}.', answer: 'has 41 as its 9th term' },
        { sentence: 'The 11th square number is {121|22|111}.', answer: '121' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard: 5 at DOK 1, 4 at DOK 2, 1 at DOK 3 (T.DOK_MIX), each with
    // lo, twm and 3 sets of numbers (play 1 uses v[0]).
    test: {
      items: [
        { dok: 1, lo: ["6Nc.01"], twm: ["TWM.02"], v: [
          {"type":"scount","a":"8.3","d":"-1.2","shown":4,"ask":1},
          {"type":"sfracnext","a":"2 3/4","d":"-1/2","shown":4,"at":1},
          {"type":"scount","a":"9.6","d":"-1.5","shown":4,"ask":1}
        ] },
        { dok: 1, lo: ["6Nc.01"], twm: ["TWM.02"], v: [
          {"type":"scount","a":11,"d":-4,"shown":3,"ask":2},
          {"type":"scount","a":"1","d":"-0.4","shown":3,"ask":2},
          {"type":"scount","a":9,"d":-6,"shown":3,"ask":2}
        ] },
        { dok: 1, lo: ["6Nc.03"], twm: ["TWM.02"], v: [
          {"type":"snth","k":12,"c":0,"n":17,"shown":4},
          {"type":"snth","k":7,"c":0,"n":16,"shown":4},
          {"type":"snth","k":11,"c":0,"n":14,"shown":4}
        ] },
        { dok: 1, lo: ["6Nc.04"], twm: ["TWM.02"], v: [
          {"type":"sqterm","s":0,"c":0,"n":13,"shown":4},
          {"type":"sqterm","s":0,"c":0,"n":15,"shown":4},
          {"type":"sqterm","s":0,"c":0,"n":14,"shown":4}
        ] },
        { dok: 1, lo: ["6Nc.03"], twm: ["TWM.01"], v: [
          {"type":"stable","k":6,"c":1,"say":true,"pos":[1,2,3,10],"hide":[1,2,3]},
          {"type":"stable","k":2,"c":7,"say":true,"pos":[1,2,3,10],"hide":[1,2,3]},
          {"type":"stable","k":5,"c":-4,"say":true,"pos":[1,2,3,10],"hide":[1,2,3]}
        ] },
        { dok: 2, lo: ["6Nc.03"], twm: ["TWM.04", "TWM.01"], v: [
          {"type":"sisin","k":8,"c":3,"target":91,"shown":4,"at":2},
          {"type":"sisin","k":5,"c":2,"target":80,"shown":4,"at":0},
          {"type":"sisin","k":7,"c":-3,"target":95,"shown":4,"at":1}
        ] },
        { dok: 2, lo: ["6Nc.01"], twm: ["TWM.01"], v: [
          {"type":"sstory","a":"18.5","d":"-1.5","n":7,"unit":"cm","start":0,"text":"A candle is {a} cm tall. It burns down {d} cm every hour. How tall is the candle after {n} hours?"},
          {"type":"sstory","a":"12.4","d":"0.8","n":6,"unit":"cm","start":0,"text":"The water in a tank is {a} cm deep. Every minute it gets {d} cm deeper. How deep is the water after {n} minutes?"},
          {"type":"sstory","a":9,"d":-4,"n":5,"unit":"°C","start":0,"text":"The temperature is {a} °C. It falls {d} °C every hour. What is the temperature after {n} hours?"}
        ] },
        { dok: 2, lo: ["6Nc.04"], twm: ["TWM.02"], v: [
          {"type":"sqterm","s":0,"c":5,"n":9,"shown":4},
          {"type":"sqterm","s":0,"c":-1,"n":9,"shown":4},
          {"type":"sqterm","s":6,"c":0,"n":10,"shown":4}
        ] },
        { dok: 2, lo: ["6Nc.03"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Son","ok":false,"at":1,"says":"The sequence 3, 11, 19, 27, ... starts at 3 and goes up in 8s. So the position-to-term rule is: multiply the position by 8, then add 3.","reasons":[{"t":"1 × 8 + 3 = 11, but the 1st term is 3. The rule is: multiply the position by 8, then subtract 5."},{"t":"the 1st term is 3, so the rule must add 3.","why":"Test the rule with position 1: 1 × 8 + 3 = 11, not 3."},{"t":"the rule is: multiply the position by 3, then add 8.","why":"Position 1: 1 × 3 + 8 = 11, not 3. The terms go up in 8s, so multiply the position by 8."}],"hint":{"pic":{"k":"stable","pos":[1,2,3,4],"rule":{"k":8,"c":-5}},"step":"Test Son's rule with position 1. Does it give 3?"},"worked":"Position 1: 1 × 8 + 3 = 11, but the 1st term is 3. The terms go up in 8s, so start with the position × 8: 8, 16, 24, 32. Each term is 5 less than that. So the rule is: multiply the position by 8, then subtract 5.","model":"Son is incorrect because 1 × 8 + 3 = 11, not 3. The rule is: multiply the position by 8, then subtract 5."},
          {"type":"claim","who":"Long","ok":true,"at":2,"says":"For the sequence 8, 15, 22, 29, ... the position-to-term rule is: multiply the position by 7, then add 1.","reasons":[{"t":"1 × 7 + 1 = 8, 2 × 7 + 1 = 15, 3 × 7 + 1 = 22 and 4 × 7 + 1 = 29. The rule gives every term."},{"t":"the rule must be: multiply the position by 8, because the 1st term is 8.","why":"That fits the 1st term only: 2 × 8 = 16, but the 2nd term is 15."},{"t":"the rule is only: add 7.","why":"Add 7 is the term-to-term rule. It does not use the position."}],"hint":{"pic":{"k":"stable","pos":[1,2,3,4],"rule":{"k":7,"c":1}},"step":"Test the rule with positions 1, 2, 3 and 4."},"worked":"1 × 7 + 1 = 8. 2 × 7 + 1 = 15. 3 × 7 + 1 = 22. 4 × 7 + 1 = 29. The rule gives all four terms.","model":"Long is correct because the rule gives every term: 8, 15, 22, 29."},
          {"type":"claim","who":"Kim","ok":false,"at":0,"says":"The sequence 2, 8, 14, 20, ... goes up in 6s. So every term is a multiple of 6.","reasons":[{"t":"8 is a term, and 8 is not a multiple of 6. Each term is 4 less than a multiple of 6."},{"t":"a sequence that goes up in 6s always has multiples of 6.","why":"Only when it starts at a multiple of 6. This sequence starts at 2."},{"t":"2, 8, 14 and 20 are all even, and every even number is a multiple of 6.","why":"8 is even, but 8 is not a multiple of 6."}],"hint":{"pic":{"k":"stable","pos":[1,2,3,4],"rule":{"k":6,"c":-4}},"step":"Say the multiples of 6: 6, 12, 18, 24. Compare them with the terms."},"worked":"The multiples of 6 are 6, 12, 18, 24 ... The terms are 2, 8, 14, 20: each one is 4 less. So no term here is a multiple of 6.","model":"Kim is incorrect because the terms are 4 less than the multiples of 6. For example, 8 is not a multiple of 6."}
        ] },
        { dok: 3, lo: ["6Nc.03"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Thu","ok":true,"at":2,"says":"The rule of a sequence is: multiply the position by 6, then add 4. Every term is always an even number.","reasons":[{"t":"6 is even, so the position × 6 is always even. Even + 4 is even, so every term is even: 10, 16, 22, 28 ..."},{"t":"it is only true for the first terms, 10, 16 and 22.","why":"Every term is made in the same way. 20 × 6 + 4 = 124, and 124 is even too."},{"t":"the position 3 is odd, so the 3rd term is odd.","why":"The position can be odd, but 3 × 6 = 18 is even. 18 + 4 = 22 is even."}],"hint":{"pic":{"k":"stable","pos":[1,2,3,4,10],"rule":{"k":6,"c":4},"hide":[4]},"step":"Test the rule. Find the first four terms. Are they even? Why?"},"worked":"1 × 6 + 4 = 10. 2 × 6 + 4 = 16. 3 × 6 + 4 = 22. 4 × 6 + 4 = 28. Any whole number × 6 is even, because 6 is even. An even number + 4 is even. So every term is even.","model":"Thu is correct because the position × 6 is always even, and even + 4 is even."},
          {"type":"claim","who":"Giang","ok":true,"at":1,"says":"The rule of a sequence is: multiply the position by 10, then subtract 1. Every term always ends in the digit 9.","reasons":[{"t":"a multiple of 10 always ends in 0. One less than that always ends in 9: 9, 19, 29, 39 ..."},{"t":"it is only true for the 1st term, 9.","why":"Try positions 2 and 3: 2 × 10 − 1 = 19 and 3 × 10 − 1 = 29. They end in 9 too."},{"t":"the 10th term is 100, and 100 does not end in 9.","why":"Do not forget to subtract 1: 10 × 10 − 1 = 99."}],"hint":{"pic":{"k":"stable","pos":[1,2,3,4,10],"rule":{"k":10,"c":-1},"hide":[4]},"step":"Test the rule. Find the first four terms. Then try position 10."},"worked":"1 × 10 − 1 = 9. 2 × 10 − 1 = 19. 3 × 10 − 1 = 29. 10 × 10 − 1 = 99. A multiple of 10 ends in 0, so one less always ends in 9.","model":"Giang is correct because one less than a multiple of 10 always ends in 9."},
          {"type":"claim","who":"Duc","ok":false,"at":0,"says":"The rule of a sequence is: multiply the position by 5, then add 4. Some of the terms end in the digit 5.","reasons":[{"t":"a multiple of 5 ends in 0 or 5. 4 more than that ends in 4 or 9, never in 5: 9, 14, 19, 24 ..."},{"t":"the 5th term ends in 5, because 5 × 5 = 25.","why":"Do not forget to add 4: 5 × 5 + 4 = 29. It ends in 9."},{"t":"the terms go up in 5s, so every other term ends in 5.","why":"Adding 5 again and again gives 9, 14, 19, 24, 29 ... The last digit is always 4 or 9."}],"hint":{"pic":{"k":"stable","pos":[1,2,3,4,10],"rule":{"k":5,"c":4},"hide":[4]},"step":"Test the rule. Find the first four terms. Look at the last digits."},"worked":"1 × 5 + 4 = 9. 2 × 5 + 4 = 14. 3 × 5 + 4 = 19. 4 × 5 + 4 = 24. A multiple of 5 ends in 0 or 5, so 4 more ends in 4 or 9. No term ends in 5.","model":"Duc is incorrect because every term ends in 4 or 9, never in 5."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). Made and checked by
    // tools/gen_lightning_s3.py.
    lightning: {
      secs: 60,
      items: [
        ["Rule: multiply the position by 5. The 14th term is", ["70", "19", "65"]],
        ["The 9th square number is", ["81", "18", "72"]],
        ["Next term: 3.7, 4.3, 4.9, ...", ["5.5", "6.1", "5.6"]],
        ["Next term: 1/8, 3/8, 5/8, ...", ["7/8", "7/16", "8/8"]],
        ["Rule for 3.6, 3.2, 2.8, ... ?", ["subtract 0.4", "add 0.4", "subtract 4"]],
        ["Which is a term of 5, 9, 13, 17, ...?", ["45", "44", "48"]],
        ["8, 16, 24, 32, ... 88 is in position", ["11", "12", "10"]],
        ["8, 16, 24, 32, ... 56 is in position", ["7", "8", "6"]],
        ["Which is a term of 13, 20, 27, 34, ...?", ["69", "63", "67"]],
        ["Rule: multiply the position by 5. The 18th term is", ["90", "23", "85"]],
        ["2, 5, 10, 17, ... The 6th term is", ["37", "36", "26"]],
        ["4, 7, 12, 19, ... The 6th term is", ["39", "36", "28"]],
        ["Next term: 1.1, 2, 2.9, ...", ["3.8", "4.7", "3.9"]],
        ["5, 10, 15, 20, ... 30 is in position", ["6", "7", "5"]],
        ["Next term: 8, 3, −2, ...", ["−7", "7", "−12"]],
        ["Position × 6, then subtract 2. The 10th term is", ["58", "60", "62"]],
        ["Next term: 5.1, 4.5, 3.9, ...", ["3.3", "2.7", "3.2"]],
        ["Next term: 0.4, 0.1, −0.2, ...", ["−0.5", "0.5", "−0.8"]],
        ["16, 25, 36, 49, ... The 6th term is", ["81", "36", "64"]],
        ["Next term: 2/7, 5/7, 8/7, ...", ["11/7", "11/14", "12/7"]],
        ["16, 25, 36, 49, ... The 8th term is", ["121", "64", "100"]],
        ["Next term: 3.9, 3.95, 4, ...", ["4.05", "4.1", "4.15"]],
        ["\"Multiply the position by 6\" is a", ["position-to-term rule", "term-to-term rule", "negative number"]],
        ["3, 6, 9, 12, ... 18 is in position", ["6", "7", "5"]],
        ["Next term: 5, 1, −3, ...", ["−7", "7", "−11"]],
        ["Next term: 1/9, 4/9, 7/9, ...", ["10/9", "10/18", "11/9"]],
        ["Position × 5, then subtract 1. The 12th term is", ["59", "60", "61"]],
        ["Next term: 5.1, 3.6, 2.1, ...", ["0.6", "−0.9", "0.5"]],
        ["Rule for 6.1, 5.5, 4.9, ... ?", ["subtract 0.6", "add 0.6", "subtract 6"]],
        ["9, 18, 27, 36, ... 99 is in position", ["11", "12", "10"]],
        ["Rule for 2.2, 1.5, 0.8, ... ?", ["subtract 0.7", "add 0.7", "subtract 7"]],
        ["Rule for 3.4, 2.5, 1.6, ... ?", ["subtract 0.9", "add 0.9", "subtract 9"]],
        ["In 2, 9, 16, 23, ... the 6th term is", ["37", "30", "44"]],
        ["Rule: multiply the position by 12. The 8th term is", ["96", "20", "84"]],
        ["Next term: 1.8, 1.6, 1.4, ...", ["1.2", "1", "1.1"]],
        ["Next term: 3, 1, −1, ...", ["−3", "3", "−5"]],
        ["Next term: 1/8, 4/8, 7/8, ...", ["10/8", "10/16", "11/8"]],
        ["Next term: 3.4, 3.1, 2.8, ...", ["2.5", "2.2", "2.4"]],
        ["\"Add 6 each time\" is a", ["term-to-term rule", "position-to-term rule", "square number"]],
        ["Adding 4 five times is the same as", ["5 × 4", "5 + 4", "4 × 4"]],
        ["Next term: 6, 5.75, 5.5, ...", ["5.25", "5", "5.15"]],
        ["In 5, 8, 11, 14, ... the term in position 7 is", ["23", "20", "21"]],
        ["The 10th square number is", ["100", "20", "90"]],
        ["Which is a term of 12, 20, 28, 36, ...?", ["68", "64", "75"]],
        ["2, 5, 10, 17, ... The 9th term is", ["82", "81", "65"]],
        ["Next term: 2/9, 4/9, 6/9, ...", ["8/9", "8/18", "9/9"]],
        ["Position × 7, then subtract 4. The 11th term is", ["73", "77", "81"]],
        ["The 11th square number is", ["121", "22", "110"]],
        ["Rule for 2.9, 3.6, 4.3, ... ?", ["add 0.7", "subtract 0.7", "add 7"]],
        ["The 6th square number is", ["36", "12", "30"]],
        ["The 5th square number is", ["25", "10", "20"]],
        ["Which is a term of 4, 7, 10, 13, ...?", ["22", "21", "24"]],
        ["Next term: 0.5, 0.1, −0.3, ...", ["−0.7", "0.7", "−1.1"]],
        ["Next term: 0.6, 0.1, −0.4, ...", ["−0.9", "0.9", "−1.4"]],
        ["Rule for 3.6, 3.9, 4.2, ... ?", ["add 0.3", "subtract 0.3", "add 3"]],
        ["3, 6, 11, 18, ... The 8th term is", ["66", "64", "51"]],
        ["Position × 7, then subtract 2. The 12th term is", ["82", "84", "86"]],
        ["Which is a term of 14, 22, 30, 38, ...?", ["70", "64", "71"]],
        ["The 12th square number is", ["144", "24", "132"]],
        ["Rule: multiply the position by 12. The 11th term is", ["132", "23", "120"]],
        ["Position × 9, then subtract 6. The 11th term is", ["93", "99", "105"]],
        ["2, 5, 10, 17, ... The 7th term is", ["50", "49", "37"]],
        ["Rule for 4.3, 4.9, 5.5, ... ?", ["add 0.6", "subtract 0.6", "add 6"]],
        ["Rule: multiply the position by 9. The 8th term is", ["72", "17", "63"]],
        ["Next term: 11, 5, −1, ...", ["−7", "7", "−13"]],
        ["Position × 2, then add 1. The 20th term is", ["41", "40", "39"]],
        ["Next term: 7, 4, 1, ...", ["−2", "2", "−5"]],
        ["Next term: 0.5, 0.3, 0.1, ...", ["−0.1", "0.1", "−0.3"]],
        ["4, 7, 12, 19, ... The 9th term is", ["84", "81", "67"]],
        ["Which is a term of 8, 13, 18, 23, ...?", ["48", "45", "46"]],
        ["Position × 9, then add 5. The 20th term is", ["185", "180", "175"]],
        ["Next term: 4.8, 5, 5.2, ...", ["5.4", "5.6", "5.5"]],
        ["Rule: multiply the position by 7. The 10th term is", ["70", "17", "63"]],
        ["Rule: multiply the position by 11. The 12th term is", ["132", "23", "121"]],
        ["The 7th square number is", ["49", "14", "42"]],
        ["Position × 7, then add 6. The 20th term is", ["146", "140", "134"]],
        ["Position × 9, then add 3. The 10th term is", ["93", "90", "87"]],
        ["Rule: multiply the position by 7. The 9th term is", ["63", "16", "56"]],
        ["Next term: 1.4, 1.6, 1.8, ...", ["2", "2.2", "2.1"]],
        ["Next term: 2/10, 5/10, 8/10, ...", ["11/10", "11/20", "12/10"]],
        ["Which is a term of 7, 11, 15, 19, ...?", ["51", "48", "52"]],
        ["3, 6, 9, 12, ... 27 is in position", ["9", "10", "8"]]
      ]
    },
    // My self-check: the goals of the stop. again: the step to practise again for each goal (c = See it, r and a = Practise).
    selfcheck: {
      goals: ["count on and count back in decimals and fractions", "count back past zero into negative numbers", "use a position-to-term rule to find any term", "say if a number is in a sequence, and why", "find a term of a square number sequence"],
      again: ["c", "r", "a", "a", "a"]
    }
  };
})(window.T = window.T || {});
