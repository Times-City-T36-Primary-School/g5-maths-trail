/* 22-pack-stop5.js - ALL the content of Stop 5, Fractions: simplest form and amounts (Grade 5, Cambridge Stage 6:
   6Nf.03, 6Nf.02). Every part is here: words, see, practise, notes, test, lightning, selfcheck. The questions are data
   for the Grade 5 models (08-g5-models-s5.js) and the tools of 39-g5-tools-s5.js: every answer is worked out by a
   model from the numbers. None of the numbers, names or sentences are those of the EOS1 papers. */
(function (T) {
  'use strict';

  // a fraction written in a sentence of the data (the same markup as MX.F): F(3, 4)
  const F = function (n, d) { return '<span class="fr"><i>' + n + '</i><span class="frs">/</span><i>' + d + '</i></span>'; };

  T.packs[5] = {
    n: 5,
    title: "Fractions: simplest form and amounts",
    los: ["6Nf.03", "6Nf.02"],
    blurb: {
      en: "Write a *fraction* in its simplest form. Find a fraction of an amount.",
      vi: "Viết *phân số* ở dạng tối giản. Tìm phân số của một số."
    },
    words: {
      sets: [
        { id: 'A', title: { en: 'Parts of a fraction', vi: 'Các phần của phân số' }, keys: ['fraction', 'numerator', 'denominator', 'unit fraction'] },
        { id: 'B', title: { en: 'The same value', vi: 'Cùng một giá trị' }, keys: ['equivalent fractions', 'simplify', 'simplest form'] },
        { id: 'C', title: { en: 'Kinds and amounts', vi: 'Các loại phân số và số lượng' }, keys: ['proper fraction', 'improper fraction', 'mixed number', 'fraction of an amount'] }
      ],
      items: {
        'fraction': { art: 'w-fraction', vi: 'phân số', def: 'A number that shows equal parts of a whole. 3/4 means 3 of 4 equal parts.' },
        'numerator': { art: 'w-numerator', vi: 'tử số', def: 'The top number of a fraction. It tells how many parts we take. In 3/4 the numerator is 3.' },
        'denominator': { art: 'w-denominator', vi: 'mẫu số', def: 'The bottom number of a fraction. It tells how many equal parts make the whole. In 3/4 the denominator is 4.' },
        'unit fraction': { art: 'w-unit-fraction', vi: 'phân số đơn vị (tử số là 1)', def: 'A fraction with the numerator 1. 1/5 is one of 5 equal parts.' },
        'equivalent fractions': { art: 'w-equivalent-fractions', vi: 'phân số bằng nhau', def: 'Fractions that look different but have the same value. 2/3 and 4/6 are equivalent fractions.' },
        'simplify': { art: 'w-simplify', vi: 'rút gọn', def: 'To divide the numerator and the denominator by the same number (bigger than 1). 8/12 becomes 2/3.' },
        'simplest form': { art: 'w-simplest-form', vi: 'phân số tối giản', def: 'A fraction is in its simplest form when only 1 divides both numbers. 2/3 is in its simplest form. 4/6 is not.' },
        'proper fraction': { art: 'w-proper-fraction', vi: 'phân số bé hơn 1 (tử số bé hơn mẫu số)', def: 'A fraction that is less than 1 whole. The numerator is smaller than the denominator, as in 3/5.' },
        'improper fraction': { art: 'w-improper-fraction', vi: 'phân số lớn hơn hoặc bằng 1 (tử số không bé hơn mẫu số)', def: 'A fraction that is 1 whole or more. The numerator is not smaller than the denominator, as in 7/5.' },
        'mixed number': { art: 'w-mixed-number', vi: 'hỗn số', def: 'A whole number and a fraction together. 1 2/5 is a mixed number. It is the same as 7/5.' },
        'fraction of an amount': { art: 'w-fraction-of-an-amount', vi: 'phân số của một số', def: 'What you get when a fraction acts on a number. 3/4 of 20: divide by 4, multiply by 3: 15. 5/4 of 20 is 25, more than 20.' }
      }
    },
    // See it: Concrete. Merge the parts of a fraction bar until the fraction is in its simplest form; share an amount
    // into equal parts and take some of them (more than one whole for an improper fraction); then the challenge.
    see: {
      scenes: [
        { id: 'merge', title: { en: 'Merge the parts', vi: 'Gộp các phần' }, tool: 'fbar', fbar: { n: 12, d: 24, tell: true },
          steps: [
            { can: { merge: [2] }, wait: 'merge', until: { d: 12 },
              zip: { en: 'This bar shows *12/24*. Tap *÷ 2*.', vi: 'Thanh này biểu diễn *12/24*. Bấm *÷ 2*.' },
              then: { en: '*6/12*. Bigger parts, but the same amount is shaded.', vi: '*6/12*. Các phần to hơn, nhưng phần tô màu vẫn thế.' } },
            { can: { merge: [2] }, wait: 'merge', until: { d: 6 },
              zip: { en: '6 and 12 are both even. Tap *÷ 2* again.', vi: '6 và 12 đều là số chẵn. Bấm *÷ 2* lần nữa.' },
              then: { en: 'Now it is *3/6*. Can we go on?', vi: 'Bây giờ là *3/6*. Còn rút gọn được nữa không?' } },
            { can: { merge: [3] }, wait: 'merge', until: { d: 2 },
              zip: { en: '3 divides both 3 and 6. Tap *÷ 3*.', vi: '3 và 6 đều chia hết cho 3. Bấm *÷ 3*.' },
              then: { en: '*1/2* is the *simplest form*. Tap *Next*.', vi: '*1/2* là *phân số tối giản*. Bấm *Next*.' } }] },
        { id: 'share', title: { en: 'Share and take', vi: 'Chia đều rồi lấy' }, tool: 'famt', famt: { amt: 12, d: 3, total: true },
          steps: [
            { can: { share: true }, wait: 'share', until: { shared: true },
              zip: { en: 'Find *2/3 of 12*. Tap *Share into 3*.', vi: 'Tìm *2/3 của 12*. Bấm *Share into 3* (Chia thành 3).' },
              then: { en: '3 equal parts. *12 ÷ 3 = 4* in each part.', vi: '3 phần bằng nhau. Mỗi phần là *12 ÷ 3 = 4*.' } },
            { can: { take: true }, wait: 'take', until: { parts: 2 },
              zip: { en: 'Take *2 parts*. Tap *+ 1 part* two times.', vi: 'Lấy *2 phần*. Bấm *+ 1 part* hai lần.' },
              then: { en: '*2 × 4 = 8*. So 2/3 of 12 is 8.', vi: '*2 × 4 = 8*. Vậy 2/3 của 12 là 8.' } },
            { can: { take: true }, wait: 'take', until: { parts: 4 },
              zip: { en: 'Now find *4/3 of 12*. Take *4 parts*.', vi: 'Bây giờ tìm *4/3 của 12*. Lấy *4 phần*.' },
              then: { en: '*4 × 4 = 16*. More than the whole! Tap *Next*.', vi: '*4 × 4 = 16*. Nhiều hơn cả số ban đầu! Bấm *Next*.' } }] },
        { id: 'challenge', title: { en: 'Fraction challenge', vi: 'Thử thách phân số' },
          challenge: {
            end: { en: 'You did it! You can simplify and share.', vi: 'Em làm được rồi! Em biết rút gọn và chia phần.' },
            result: 'You simplified fractions and found fractions of amounts.',
            rounds: [
          { mode: "our", lo: ["6Nf.03"], v: [
            {"type":"fsimp","tool":true,"n":6,"d":9},
            {"type":"fsimp","tool":true,"n":4,"d":10},
            {"type":"fsimp","tool":true,"n":12,"d":15}] },
          { mode: "your", lo: ["6Nf.03"], v: [
            {"type":"fsimp","tool":true,"n":8,"d":20},
            {"type":"fsimp","tool":true,"n":9,"d":12},
            {"type":"fsimp","tool":true,"n":16,"d":20}] },
          { mode: "your", lo: ["6Nf.02"], v: [
            {"type":"fopamt","tool":true,"n":3,"d":5,"amt":20},
            {"type":"fopamt","tool":true,"n":2,"d":3,"amt":15},
            {"type":"fopamt","tool":true,"n":3,"d":4,"amt":12}] },
          { mode: "your", lo: ["6Nf.02"], v: [
            {"type":"fopamt","tool":true,"n":4,"d":3,"amt":9},
            {"type":"fopamt","tool":true,"n":7,"d":5,"amt":10},
            {"type":"fopamt","tool":true,"n":3,"d":2,"amt":12}] },
          { mode: "your", lo: ["6Nf.03"], v: [
            {"type":"fequiv","bar":true,"n":2,"d":3,"k":2,"hide":2},
            {"type":"fequiv","bar":true,"n":3,"d":4,"k":3,"hide":3},
            {"type":"fequiv","bar":true,"n":1,"d":2,"k":5,"hide":2}] }] } }]
    },
    // Practise: Pictorial (Draw it: the fraction bar and the bar model) then Abstract (Solve it, like the test).
    practise: [
      { id: 's5r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Use the fraction bar and the bar model.', vi: 'Dùng thanh phân số và sơ đồ đoạn thẳng.' },
        levels: [
      { title: { en: "The fraction bar", vi: "Thanh phân số" }, rounds: [
          { mode: "our", lo: ["6Nf.03"], twm: ["TWM.02"], v: [
            {"type":"fsimp","tool":true,"n":4,"d":6},
            {"type":"fsimp","tool":true,"n":6,"d":10},
            {"type":"fsimp","tool":true,"n":6,"d":15}] },
          { mode: "your", lo: ["6Nf.03"], twm: ["TWM.02"], v: [
            {"type":"fsimp","tool":true,"n":8,"d":12},
            {"type":"fsimp","tool":true,"n":15,"d":20},
            {"type":"fsimp","tool":true,"n":20,"d":24}] }] },
      { title: { en: "Share the amount", vi: "Chia đều một số" }, rounds: [
          { mode: "your", lo: ["6Nf.02"], twm: ["TWM.02"], v: [
            {"type":"fopamt","tool":true,"n":3,"d":4,"amt":24},
            {"type":"fopamt","tool":true,"n":2,"d":5,"amt":25},
            {"type":"fopamt","tool":true,"n":5,"d":6,"amt":30}] },
          { mode: "your", lo: ["6Nf.02"], twm: ["TWM.02"], v: [
            {"type":"fopamt","tool":true,"n":5,"d":4,"amt":16},
            {"type":"fopamt","tool":true,"n":4,"d":3,"amt":18},
            {"type":"fopamt","tool":true,"n":7,"d":5,"amt":15}] }] },
      { title: { en: "Equal fractions and wholes", vi: "Phân số bằng nhau và số ban đầu" }, rounds: [
          { mode: "your", lo: ["6Nf.03"], twm: ["TWM.02"], v: [
            {"type":"fequiv","bar":true,"n":3,"d":5,"k":2,"hide":2},
            {"type":"fequiv","bar":true,"n":2,"d":5,"k":2,"hide":3},
            {"type":"fequiv","bar":true,"n":2,"d":3,"k":4,"hide":0}] },
          { mode: "your", lo: ["6Nf.02"], twm: ["TWM.01"], v: [
            {"type":"fopmiss","bar":true,"n":3,"d":4,"amt":20},
            {"type":"fopmiss","bar":true,"n":2,"d":3,"amt":18},
            {"type":"fopmiss","bar":true,"n":2,"d":5,"amt":30}] }] }] },
      { id: 's5a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Simplest form", vi: "Phân số tối giản" }, rounds: [
          { mode: "your", lo: ["6Nf.03"], twm: ["TWM.02"], v: [
            {"type":"fsimp","n":14,"d":21},
            {"type":"fsimp","n":18,"d":30},
            {"type":"fsimp","n":16,"d":40}] },
          { mode: "your", lo: ["6Nf.03"], twm: ["TWM.02"], v: [
            {"type":"fcomf","n":12,"d":20,"k":4},
            {"type":"fcomf","n":18,"d":27,"k":9},
            {"type":"fcomf","n":16,"d":24,"k":8}] },
          { mode: "your", lo: ["6Nf.03"], twm: ["TWM.05"], v: [
            {"type":"fsimpis","ask":"is","at":1,"fr":[[7,9],[6,9],[3,9]]},
            {"type":"fsimpis","ask":"not","at":2,"fr":[[9,21],[10,21],[8,21]]},
            {"type":"fsimpis","ask":"is","at":0,"fr":[[11,15],[10,15],[9,15],[12,15]]}] }] },
      { title: { en: "Fractions of amounts", vi: "Phân số của một số" }, rounds: [
          { mode: "your", lo: ["6Nf.02"], twm: ["TWM.02"], v: [
            {"type":"fopcalc","items":[{"n":3,"d":8,"amt":48},{"n":7,"d":4,"amt":28}]},
            {"type":"fopcalc","items":[{"n":5,"d":6,"amt":54},{"n":4,"d":3,"amt":21}]},
            {"type":"fopcalc","items":[{"n":7,"d":10,"amt":90},{"n":9,"d":5,"amt":40}]}] },
          { mode: "your", lo: ["6Nf.02"], twm: ["TWM.07"], v: [
            {"type":"fopmore","a":{"n":2,"d":3,"amt":24},"b":{"n":3,"d":5,"amt":25}},
            {"type":"fopmore","a":{"n":2,"d":3,"amt":36},"b":{"n":7,"d":6,"amt":24}},
            {"type":"fopmore","a":{"n":5,"d":8,"amt":40},"b":{"n":5,"d":6,"amt":30}}] },
          { mode: "your", lo: ["6Nf.02"], twm: ["TWM.02"], v: [
            {"type":"fopstory","kind":"left","n":5,"d":8,"amt":56,"unit":"rolls","text":"A baker makes <b>56</b> bread rolls. She sells {f} of them. How many rolls are left?"},
            {"type":"fopstory","kind":"extra","n":7,"d":5,"amt":45,"unit":"cakes","text":"A café sells <b>45</b> cakes in Week 1. In Week 2 it sells {f} of that number. How many <b>more</b> cakes does it sell in Week 2 than in Week 1?"},
            {"type":"fopstory","kind":"each","n":3,"d":8,"amt":32,"by":2,"unit":"dollars","step2":"multiply the number of chocolate muffins by 2 dollars.","text":"There are <b>32</b> muffins on a tray. {f} of them are chocolate muffins. One chocolate muffin costs <b>2</b> dollars. How much do all the chocolate muffins cost?"}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["6Nf.02"], twm: ["TWM.07", "TWM.08"], v: [
            {"type":"fopfix","who":"Hung","he":true,"n":2,"d":3,"amt":18,"slip":"nodiv","at":1},
            {"type":"fopfix","who":"Yen","he":false,"n":3,"d":5,"amt":40,"slip":"unit","at":2},
            {"type":"fopfix","who":"Binh","he":true,"n":3,"d":4,"amt":24,"slip":"flip","at":0}] },
          { mode: "your", lo: ["6Nf.03"], twm: ["TWM.07", "TWM.04"], v: [
            {"type":"claim","who":"Giang","ok":false,"at":1,"says":F(20, 28) + " = " + F(10, 14) + ", so the simplest form of " + F(20, 28) + " is " + F(10, 14) + ".","reasons":[{"t":"10 and 14 are both even, so they can be divided by 2 again: " + F(10, 14) + " = " + F(5, 7) + "."},{"t":"Giang divided both numbers by 2, so " + F(10, 14) + " is the simplest form.","why":"Dividing both by 2 is right, but it is only the first step. 10 and 14 are both even: divide again."},{"t":"the simplest form of " + F(20, 28) + " is " + F(10, 28) + ".","why":"Divide the numerator and the denominator by the same number. 28 ÷ 2 = 14, not 28."}],"hint":{"pic":{"k":"fbar","n":10,"d":14},"step":"Look at " + F(10, 14) + ". Is there a number bigger than 1 that divides both 10 and 14?"},"worked":"20 ÷ 2 = 10 and 28 ÷ 2 = 14, so " + F(20, 28) + " = " + F(10, 14) + ". But 10 ÷ 2 = 5 and 14 ÷ 2 = 7, so " + F(10, 14) + " = " + F(5, 7) + ". Only 1 divides both 5 and 7. Or in one step: divide 20 and 28 by 4.","model":"Giang is incorrect because 10 and 14 can both be divided by 2: the simplest form is " + F(5, 7) + "."},
            {"type":"claim","who":"Tam","ok":false,"at":0,"says":"When you simplify a fraction, the fraction gets smaller.","reasons":[{"t":F(4, 10) + " = " + F(2, 5) + ". The numbers get smaller, but the value stays the same: the two fractions are equivalent."},{"t":"the numerator and the denominator both get smaller, so the fraction is smaller.","why":"The numbers get smaller, but each part gets bigger. The shaded amount stays the same: " + F(4, 10) + " = " + F(2, 5) + "."},{"t":"you divide, and dividing always makes a number smaller.","why":"You divide both numbers by the same number. That does not change the value of the fraction."}],"hint":{"pic":{"k":"fbar","n":4,"d":10,"to":[2,5]},"step":"Simplify " + F(4, 10) + ". Look at the two bars: is the shaded part smaller?"},"worked":"4 ÷ 2 = 2 and 10 ÷ 2 = 5, so " + F(4, 10) + " = " + F(2, 5) + ". The two bars show the same shaded amount. Simplifying does not change the value of a fraction.","model":"Tam is incorrect because " + F(4, 10) + " = " + F(2, 5) + ": the numbers are smaller, but the value is the same."},
            {"type":"claim","who":"Dung","ok":true,"at":2,"says":F(10, 16) + " and " + F(15, 24) + " are equivalent fractions.","reasons":[{"t":"both fractions are " + F(5, 8) + " in their simplest form: 10 ÷ 2 = 5, 16 ÷ 2 = 8 and 15 ÷ 3 = 5, 24 ÷ 3 = 8."},{"t":"they cannot be equal, because all four numbers are different.","why":"Equivalent fractions look different but have the same value. Simplify each one, then compare."},{"t":F(15, 24) + " is bigger, because its numbers are bigger.","why":"Bigger numbers do not make a bigger fraction. Simplify both fractions, then compare."}],"hint":{"pic":[{"k":"fbar","n":10,"d":16},{"k":"fbar","n":15,"d":24}],"step":"Write each fraction in its simplest form. Are the two answers the same?"},"worked":"10 ÷ 2 = 5 and 16 ÷ 2 = 8, so " + F(10, 16) + " = " + F(5, 8) + ". 15 ÷ 3 = 5 and 24 ÷ 3 = 8, so " + F(15, 24) + " = " + F(5, 8) + " too.","model":"Dung is correct because both fractions simplify to " + F(5, 8) + "."}] }] }] }
    ],
    // Notes: how to do it, each with a worked example and a picture made by the maths tools; then one gap
    // sentence per note, in the same order (the first choice in the braces is the right one).
    notes: {
      items: [
        { en: 'A [[fraction]] has a [[numerator]] on top and a [[denominator]] below. The denominator tells how many equal parts make the whole. The numerator tells how many parts we take.',
          vi: 'Phân số có tử số ở trên và mẫu số ở dưới. Mẫu số cho biết cái toàn thể được chia thành bao nhiêu phần bằng nhau. Tử số cho biết ta lấy bao nhiêu phần.',
          example: ['In 3/5 the bar has *5* equal parts.', '*3* parts are shaded.'],
          pic: { k: 'fbar', n: 3, d: 5 } },
        { en: '[[Equivalent fractions]] have the same value. To make one, multiply or divide the numerator and the denominator by the same number (not 0).',
          vi: 'Các phân số bằng nhau có cùng giá trị. Để tạo phân số bằng nhau, nhân cả tử số và mẫu số với cùng một số khác 0, hoặc chia cả hai cho cùng một số khác 0.',
          example: ['2/3 = *4/6* (both numbers × 2)', '2/3 = *6/9* (both numbers × 3)'],
          pic: { k: 'fbar', n: 2, d: 3, to: [4, 6] } },
        { en: 'To [[simplify]] a fraction, divide the numerator and the denominator by a number bigger than 1 that divides both.',
          vi: 'Để rút gọn một phân số, chia cả tử số và mẫu số cho một số lớn hơn 1 mà cả hai cùng chia hết.',
          example: ['8/12: both numbers are even, so divide by 2.', '8 ÷ 2 = 4 and 12 ÷ 2 = 6, so 8/12 = *4/6*.'],
          pic: { k: 'fbar', n: 8, d: 12, to: [4, 6] } },
        { en: 'A fraction is in its [[simplest form]] when only 1 divides both numbers. Keep dividing until you cannot go on.',
          vi: 'Phân số là tối giản khi tử số và mẫu số chỉ cùng chia hết cho 1. Hãy chia tiếp cho đến khi không chia được nữa.',
          example: ['8/12 = 4/6 = *2/3*', 'Or in one step, divide both by 4: 8 ÷ 4 = 2 and 12 ÷ 4 = 3.', 'Check: only 1 divides both 2 and 3.'],
          pic: { k: 'fbar', n: 8, d: 12, to: [2, 3] } },
        { en: 'To find a [[fraction of an amount]], divide by the denominator to find one part. Then multiply by the numerator.',
          vi: 'Để tìm phân số của một số, chia số đó cho mẫu số để tìm một phần. Rồi nhân với tử số.',
          example: ['3/5 of 20: 20 ÷ 5 = 4', '3 × 4 = *12*'],
          pic: { k: 'famt', amt: 20, n: 3, d: 5 } },
        { en: 'An [[improper fraction]] with a numerator bigger than its denominator is more than 1 whole: 7/5 is the [[mixed number]] 1 2/5. So 7/5 of an amount is more than the amount.',
          vi: 'Phân số có tử số lớn hơn mẫu số thì lớn hơn 1: 7/5 là hỗn số 1 2/5. Vì vậy 7/5 của một số thì lớn hơn số đó.',
          example: ['7/5 of 20: 20 ÷ 5 = 4', '7 × 4 = *28* (more than 20)'],
          pic: { k: 'famt', amt: 20, n: 7, d: 5 } }
      ],
      check: [
        { sentence: 'In 4/9 the denominator is {9|4|13}.', answer: '9' },
        { sentence: '3/4 and {9|6|10}/12 are equivalent fractions.', answer: '9' },
        { sentence: 'To simplify 10/15, divide both numbers by {5|2|10}.', answer: '5' },
        { sentence: 'In its simplest form, 14/21 is {2/3|7/14|2/21}.', answer: '2/3' },
        { sentence: '2/7 of 35 is {10|5|70}.', answer: '10' },
        { sentence: '6/5 of 40 is {more than|less than|equal to} 40.', answer: 'more than' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard: 5 at DOK 1, 4 at DOK 2, 1 at DOK 3 (T.DOK_MIX), each with
    // lo, twm and 3 sets of numbers (play 1 uses v[0]).
    test: {
      items: [
        { dok: 1, lo: ["6Nf.03"], twm: ["TWM.02"], v: [
          {"type":"fsimp","n":16,"d":18},
          {"type":"fsimp","n":9,"d":21},
          {"type":"fsimp","n":15,"d":40}
        ] },
        { dok: 1, lo: ["6Nf.03"], twm: ["TWM.05"], v: [
          {"type":"fsimpis","ask":"is","at":2,"fr":[[3,10],[4,10],[5,10]]},
          {"type":"fsimpis","ask":"is","at":0,"fr":[[5,6],[3,6],[4,6]]},
          {"type":"fsimpis","ask":"is","at":1,"fr":[[9,14],[7,14],[6,14]]}
        ] },
        { dok: 1, lo: ["6Nf.02"], twm: ["TWM.02"], v: [
          {"type":"fopcalc","items":[{"n":3,"d":5,"amt":35}]},
          {"type":"fopcalc","items":[{"n":5,"d":7,"amt":42}]},
          {"type":"fopcalc","items":[{"n":4,"d":9,"amt":63}]}
        ] },
        { dok: 1, lo: ["6Nf.02"], twm: ["TWM.02"], v: [
          {"type":"fopcalc","items":[{"n":7,"d":4,"amt":12}]},
          {"type":"fopcalc","items":[{"n":5,"d":3,"amt":27}]},
          {"type":"fopcalc","items":[{"n":9,"d":7,"amt":14}]}
        ] },
        { dok: 1, lo: ["6Nf.03"], twm: ["TWM.02"], v: [
          {"type":"fequiv","n":7,"d":10,"k":3,"hide":0},
          {"type":"fequiv","n":4,"d":5,"k":6,"hide":1},
          {"type":"fequiv","n":5,"d":9,"k":4,"hide":0}
        ] },
        { dok: 2, lo: ["6Nf.03"], twm: ["TWM.07", "TWM.08"], v: [
          {"type":"fsimpfix","who":"Son","he":true,"n":24,"d":32,"slip":"part","at":2},
          {"type":"fsimpfix","who":"Hanh","he":false,"n":20,"d":45,"slip":"two","at":0},
          {"type":"fsimpfix","who":"Hai","he":true,"n":15,"d":35,"slip":"top","at":1}
        ] },
        { dok: 2, lo: ["6Nf.02"], twm: ["TWM.07"], v: [
          {"type":"fopmore","a":{"n":3,"d":4,"amt":28},"b":{"n":2,"d":3,"amt":33}},
          {"type":"fopmore","a":{"n":5,"d":6,"amt":36},"b":{"n":7,"d":8,"amt":32}},
          {"type":"fopmore","a":{"n":5,"d":4,"amt":28},"b":{"n":7,"d":6,"amt":30}}
        ] },
        { dok: 2, lo: ["6Nf.02"], twm: ["TWM.02"], v: [
          {"type":"fopstory","kind":"sum2","n":5,"d":6,"amt":24,"n2":2,"d2":5,"amt2":30,"unit":"pies and tarts","text":"A bakery has <b>24</b> pies and <b>30</b> tarts. It sells {f} of the pies and {f2} of the tarts. How many pies and tarts does it sell altogether?"},
          {"type":"fopstory","kind":"left","n":4,"d":9,"amt":72,"unit":"stickers","text":"Thu has <b>72</b> stickers. She gives {f} of them to her friends. How many stickers does she have left?"},
          {"type":"fopstory","kind":"extra","n":7,"d":5,"amt":60,"unit":"loaves","text":"A shop sells <b>60</b> loaves of bread on Friday. On Saturday it sells {f} of that number. How many <b>more</b> loaves does it sell on Saturday than on Friday?"}
        ] },
        { dok: 2, lo: ["6Nf.02"], twm: ["TWM.01"], v: [
          {"type":"fopmiss","n":3,"d":5,"amt":45},
          {"type":"fopmiss","n":5,"d":8,"amt":48},
          {"type":"fopmiss","n":4,"d":3,"amt":21}
        ] },
        { dok: 3, lo: ["6Nf.03"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Linh","ok":false,"at":2,"says":"A fraction with an odd numerator and an odd denominator is always in its simplest form.","reasons":[{"t":F(3, 9) + " has two odd numbers, but both can be divided by 3: " + F(3, 9) + " = " + F(1, 3) + ". One example like this shows the rule is not always true."},{"t":"odd numbers cannot be divided by 2, so the fraction cannot be simplified.","why":"Dividing by 2 is not the only way. Try " + F(3, 9) + ": divide both numbers by 3."},{"t":F(5, 7) + " has two odd numbers, and it is in its simplest form.","why":"That example fits. But one example that fits does not show 'always'. Try " + F(3, 9) + "."}],"hint":{"pic":{"k":"fbar","n":3,"d":9},"step":"Test the rule. Try " + F(5, 7) + ". Then try " + F(3, 9) + ": can you divide both numbers by 3?"},"worked":F(5, 7) + " fits the rule. But 3 ÷ 3 = 1 and 9 ÷ 3 = 3, so " + F(3, 9) + " = " + F(1, 3) + ". Two odd numbers can still share a factor. The rule is not always true.","model":"Linh is incorrect because " + F(3, 9) + " has two odd numbers and it can be simplified to " + F(1, 3) + "."},
          {"type":"claim","who":"Phong","ok":false,"at":0,"says":"A fraction with the denominator 12 can always be simplified.","reasons":[{"t":F(11, 12) + " has the denominator 12, but only 1 divides both 11 and 12. One example like this shows the rule is not always true."},{"t":F(10, 12) + " = " + F(5, 6) + ", so the rule is true.","why":"That example fits. But one example that fits does not show 'always'. Try " + F(11, 12) + "."},{"t":"12 has many factors (2, 3, 4 and 6), so the fraction can always be divided.","why":"The numerator must share a factor with 12 too. Try " + F(11, 12) + ": only 1 divides both 11 and 12."}],"hint":{"pic":{"k":"fbar","n":11,"d":12},"step":"Test the rule. Try " + F(10, 12) + ". Then try " + F(11, 12) + ": is there a number bigger than 1 that divides both 11 and 12?"},"worked":F(10, 12) + " = " + F(5, 6) + " fits the rule. But only 1 divides both 11 and 12, so " + F(11, 12) + " is already in its simplest form. The rule is not always true.","model":"Phong is incorrect because " + F(11, 12) + " has the denominator 12, and it cannot be simplified."},
          {"type":"claim","who":"Chi","ok":true,"at":1,"says":"If the numerator and the denominator are both even, the fraction is never in its simplest form.","reasons":[{"t":"every even number can be divided by 2. So you can always divide both numbers by 2."},{"t":F(4, 6) + " is in its simplest form, and 4 and 6 are both even.","why":F(4, 6) + " is not in its simplest form: 4 ÷ 2 = 2 and 6 ÷ 2 = 3, so " + F(4, 6) + " = " + F(2, 3) + "."},{"t":"even numbers are always bigger than odd numbers.","why":"That is not true (2 is smaller than 9), and it does not help. Think: which number divides every even number?"}],"hint":{"pic":{"k":"fbar","n":4,"d":6,"to":[2,3]},"step":"Try some fractions with two even numbers, like " + F(4, 6) + " or " + F(2, 10) + ". Can you always divide both numbers by 2?"},"worked":"Every even number is in the 2 times table. So when both numbers are even, you can divide both by 2: " + F(4, 6) + " = " + F(2, 3) + ", " + F(2, 10) + " = " + F(1, 5) + ". The fraction was not in its simplest form.","model":"Chi is correct because 2 divides every even number, so both numbers can always be divided by 2."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). Made and checked by
    // tools/gen_lightning_s5.py (it writes tools/lightning_s5.txt and puts the items between the two markers).
    lightning: {
      secs: 60,
      items: [
        /* LIGHTNING:START */
        ["2/3 of 18 is ___ 18", ["less than", "equal to", "more than"]],
        ["18/27 in its simplest form is", ["2/3", "6/9", "2/27"]],
        ["9/15 in its simplest form is", ["3/5", "3/15", "6/12"]],
        ["9/8 of 16", ["18", "14", "2"]],
        ["6/21 = 2/?", ["7", "17", "3"]],
        ["12/30 in its simplest form is", ["2/5", "6/15", "2/30"]],
        ["4/3 of 15", ["20", "10", "5"]],
        ["9/15 = 3/?", ["5", "9", "3"]],
        ["5/6 of 42", ["35", "7", "210"]],
        ["3/8 of 40", ["15", "5", "35"]],
        ["8/5 of 10", ["16", "8", "2"]],
        ["5/2 of 8", ["20", "4", "8"]],
        ["5/6 of a number is 10. The number is", ["12", "2", "60"]],
        ["5/3 of 9", ["15", "6", "3"]],
        ["Biggest number that divides both 18 and 24", ["6", "2", "18"]],
        ["2/3 of 21", ["14", "7", "42"]],
        ["16/24 in its simplest form is", ["2/3", "8/12", "2/24"]],
        ["9/8 of 40 is ___ 40", ["more than", "less than", "equal to"]],
        ["Biggest number that divides both 15 and 25", ["5", "10", "15"]],
        ["Which is in its simplest form: 6/9, 4/10 or 5/9?", ["5/9", "4/10", "6/9"]],
        ["10/16 = ?/8", ["5", "2", "6"]],
        ["2 1/3 is", ["a mixed number", "a proper fraction", "a unit fraction"]],
        ["2/5 of a number is 10. The number is", ["25", "5", "50"]],
        ["4/4 of 36 is ___ 36", ["equal to", "less than", "more than"]],
        ["10/15 in its simplest form is", ["2/3", "2/15", "5/10"]],
        ["Which is in its simplest form: 7/12, 9/12 or 4/12?", ["7/12", "9/12", "4/12"]],
        ["Biggest number that divides both 9 and 15", ["3", "6", "9"]],
        ["Which is in its simplest form: 9/15, 5/15 or 8/15?", ["8/15", "5/15", "9/15"]],
        ["5/8 of 32", ["20", "4", "28"]],
        ["7/5 of 20", ["28", "16", "4"]],
        ["14/21 in its simplest form is", ["2/3", "2/21", "7/14"]],
        ["10/25 in its simplest form is", ["2/5", "2/25", "5/20"]],
        ["4/6 in its simplest form is", ["2/3", "2/6", "2/4"]],
        ["5/6 of 30 is ___ 30", ["less than", "equal to", "more than"]],
        ["5/3 of 12 is ___ 12", ["more than", "less than", "equal to"]],
        ["14/20 = ?/10", ["7", "4", "2"]],
        ["3/5 of 45", ["27", "9", "36"]],
        ["3/5 of 20 is ___ 20", ["less than", "equal to", "more than"]],
        ["Biggest number that divides both 8 and 12", ["4", "2", "8"]],
        ["12/20 in its simplest form is", ["3/5", "6/10", "3/20"]],
        ["3/4 of a number is 12. The number is", ["16", "4", "48"]],
        ["3/5 of a number is 12. The number is", ["20", "4", "60"]],
        ["20/30 in its simplest form is", ["2/3", "10/15", "2/30"]],
        ["2/5 = ?/20", ["8", "17", "4"]],
        ["15/25 in its simplest form is", ["3/5", "3/25", "10/20"]],
        ["9/4 is", ["more than 1", "less than 1", "equal to 1"]],
        ["Which is in its simplest form: 3/8, 2/8 or 4/8?", ["3/8", "4/8", "2/8"]],
        ["3/2 of 14", ["21", "7", "14"]],
        ["5/4 of 12", ["15", "9", "3"]],
        ["6/10 in its simplest form is", ["3/5", "3/10", "4/8"]],
        ["Which is in its simplest form: 5/20, 9/20 or 8/20?", ["9/20", "5/20", "8/20"]],
        ["5/6 = 10/?", ["12", "11", "2"]],
        ["8/20 in its simplest form is", ["2/5", "4/10", "2/20"]],
        ["4/5 = ?/20", ["16", "19", "4"]],
        ["1/3 = ?/18", ["6", "16", "1"]],
        ["6/5 of 15 is ___ 15", ["more than", "less than", "equal to"]],
        ["4/5 of 35", ["28", "7", "140"]],
        ["Which is in its simplest form: 4/9, 6/9 or 3/9?", ["4/9", "3/9", "6/9"]],
        ["2/3 of a number is 10. The number is", ["15", "5", "30"]],
        ["4/10 in its simplest form is", ["2/5", "2/10", "2/8"]],
        ["7/4 of 20", ["35", "15", "5"]],
        ["7/5 is", ["an improper fraction", "a proper fraction", "a unit fraction"]],
        ["Biggest number that divides both 12 and 20", ["4", "2", "8"]],
        ["20/25 = 4/?", ["5", "9", "6"]],
        ["11/10 of 30", ["33", "27", "3"]],
        ["3/7 of 28", ["12", "4", "24"]],
        ["8/12 = ?/3", ["2", "4", "3"]],
        ["6/15 in its simplest form is", ["2/5", "2/15", "3/12"]],
        ["16/20 in its simplest form is", ["4/5", "8/10", "4/20"]],
        ["6/9 in its simplest form is", ["2/3", "2/9", "3/6"]],
        ["3/8 is", ["a proper fraction", "an improper fraction", "a mixed number"]],
        ["2/5 of 30", ["12", "6", "24"]],
        ["7/10 of 50", ["35", "5", "45"]],
        ["5/9 of 27", ["15", "3", "24"]],
        ["7/7 of 20 is ___ 20", ["equal to", "less than", "more than"]],
        ["Biggest number that divides both 20 and 30", ["10", "2", "20"]],
        ["15/20 in its simplest form is", ["3/4", "3/20", "10/15"]],
        ["To simplify a fraction, you", ["divide both numbers", "subtract from both", "add to both"]],
        ["Which is in its simplest form: 7/10, 8/10 or 5/10?", ["7/10", "5/10", "8/10"]],
        ["3/4 of 20", ["15", "5", "60"]],
        ["In 4/7 the denominator is", ["7", "4", "11"]],
        ["2/9 = 4/?", ["18", "11", "2"]],
        ["1/9 is", ["a unit fraction", "an improper fraction", "a mixed number"]],
        ["3/8 = ?/16", ["6", "11", "2"]],
        ["5/6 of 18", ["15", "3", "90"]],
        ["9/12 in its simplest form is", ["3/4", "3/12", "6/9"]],
        ["2/7 = ?/21", ["6", "16", "3"]],
        ["6/5 of 25", ["30", "20", "5"]],
        ["2/3 of 60", ["40", "20", "120"]],
        ["In 5/9 the numerator is", ["5", "9", "14"]],
        ["Which is in its simplest form: 5/12, 3/12 or 10/12?", ["5/12", "3/12", "10/12"]],
        ["21/28 in its simplest form is", ["3/4", "3/28", "14/21"]],
        ["3/10 = 9/?", ["30", "16", "3"]],
        ["1/6 = 5/?", ["30", "10", "5"]],
        ["8/12 in its simplest form is", ["2/3", "4/6", "2/12"]],
        ["8/14 in its simplest form is", ["4/7", "4/14", "6/12"]],
        ["3/4 = 15/?", ["20", "16", "5"]],
        ["3/10 of 70", ["21", "7", "63"]],
        ["7/6 of 24", ["28", "20", "4"]]
        /* LIGHTNING:END */
      ]
    },
    // My self-check: the goals of the stop. again: the step to practise again for each goal (c = See it, r and a = Practise).
    selfcheck: {
      goals: ["write a fraction in its simplest form", "find a missing number in two equivalent fractions", "find a proper fraction of an amount", "find an improper fraction of an amount"],
      again: ["r", "r", "c", "a"]
    }
  };
})(window.T = window.T || {});
