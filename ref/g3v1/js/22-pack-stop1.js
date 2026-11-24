/* 22-pack-stop1.js - ALL the content of Stop 1, Place value (shape: docs/02-architecture.md).
   Every part is here: words, see (Session 3), practise (Session 2), notes, test, lightning, selfcheck (Session 4). */
(function (T) {
  'use strict';

  T.packs[1] = {
    n: 1,
    title: "Place value",
    los: ["4Ni.01", "4Np.01", "4Np.02", "4Np.03"],          // the learning objectives (shown to teachers under the last note)
    blurb: {
      en: "What is each *digit* worth? Multiply and divide by 10 and 100.",
      vi: "Mỗi *chữ số* có giá trị bao nhiêu? Nhân và chia cho 10 và 100."
    },
    // Words: the 13 Maths v2 Stop 1 key words (WORDS with s: 1; vi and meaning as in v2), in three sets of picture
    // cards with a quick check. The pictures are in src/art/03-art-words.js. A card also opens from a [[word]] link.
    words: {
      sets: [
        { id: 'A', title: { en: 'Digits and value', vi: 'Chữ số và giá trị' }, keys: ['digit', 'value', 'place value', 'place holder'] },
        { id: 'B', title: { en: 'The places', vi: 'Các hàng' }, keys: ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands'] },
        { id: 'C', title: { en: 'Change a number', vi: 'Biến đổi một số' }, keys: ['regroup', 'expanded form', 'multiply', 'divide'] }
      ],
      items: {
        'digit': { art: 'w-digit', vi: 'chữ số', def: 'One of the ten symbols 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. The number 2,315 has four digits.' },
        'value': { art: 'w-value', vi: 'giá trị', def: 'How much a digit is worth. In 2,315 the value of the 3 is 300.' },
        'place value': { art: 'w-place-value', vi: 'giá trị theo vị trí của chữ số', def: 'The value a digit has because of its place in the number.' },
        'place holder': { art: 'w-place-holder', vi: 'chữ số 0 giữ chỗ', def: 'A zero that keeps a place when there is nothing in it. In 2,035 the 0 holds the hundreds place.' },
        'ones': { art: 'w-ones', vi: 'hàng đơn vị', def: 'The first place from the right. In 2,315 there are 5 ones.' },
        'tens': { art: 'w-tens', vi: 'hàng chục', def: 'The second place from the right. One ten is 10 ones.' },
        'hundreds': { art: 'w-hundreds', vi: 'hàng trăm', def: 'The third place from the right. One hundred is 10 tens.' },
        'thousands': { art: 'w-thousands', vi: 'hàng nghìn', def: 'The fourth place from the right. One thousand is 10 hundreds.' },
        'ten thousands': { art: 'w-ten-thousands', vi: 'hàng chục nghìn', def: 'The fifth place from the right. One ten thousand is 10 thousands.' },
        'regroup': { art: 'w-regroup', vi: 'đổi hàng (ví dụ: 1 trăm = 10 chục)', def: 'To make the same number in a different way. 1 hundred is the same as 10 tens.' },
        'expanded form': { art: 'w-expanded-form', vi: 'viết số thành tổng', def: 'A number written as a sum of its parts. 2,315 = 2,000 + 300 + 10 + 5.' },
        'multiply': { art: 'w-multiply', vi: 'nhân', def: 'To find the product. 47 × 10 = 470.' },
        'divide': { art: 'w-divide', vi: 'chia', def: 'To share or group equally. 470 ÷ 10 = 47.' }
      }
    },
    // See it: Concrete, real base-ten blocks (the data shape is in src/steps/45-see.js). Two hands-on scenes from
    // the v2 Stop 1 "Build it" example, then the challenge: the 5 v2 "Build it" slots (CONTENT[1].stages[0]).
    see: {
      scenes: [
        { id: 'meet', title: { en: 'Meet the blocks', vi: 'Làm quen với các khối' }, tool: 'mat', pic: { k: 'legend' },
          steps: [
            { mat: { b: [0, 0, 0, 10], counts: true }, can: { join: ['o'] }, wait: 'join',
              zip: { en: 'Ten ones make *1 ten*. Tap *Join 10*.',
                     vi: 'Mười đơn vị là *1 chục*. Bấm *Join 10* (Gộp 10).' },
              then: { en: 'Yes! *10 ones = 1 ten*.', vi: 'Đúng rồi! *10 đơn vị = 1 chục*.' } },
            { mat: { b: [0, 0, 10, 0], counts: true }, can: { join: ['t'] }, wait: 'join',
              zip: { en: 'Ten tens make *1 hundred*. Tap *Join 10*.', vi: 'Mười chục là *1 trăm*. Bấm *Join 10*.' },
              then: { en: 'Yes! *10 tens = 1 hundred*.', vi: 'Đúng rồi! *10 chục = 1 trăm*.' } },
            { mat: { b: [0, 10, 0, 0], counts: true }, can: { join: ['h'] }, wait: 'join',
              zip: { en: 'Ten hundreds make *1 thousand*. Tap *Join 10*.', vi: 'Mười trăm là *1 nghìn*. Bấm *Join 10*.' },
              then: { en: 'Great! *10 hundreds = 1 thousand*. Tap *Next*.', vi: 'Tuyệt vời! *10 trăm = 1 nghìn*. Bấm *Next*.' } }] },
        { id: 'ways', title: { en: 'One number, many ways', vi: 'Một số, nhiều cách' }, tool: 'mat',
          mat: { b: [2, 3, 1, 5], counts: true, total: true },
          steps: [
            { can: { brk: ['h'] }, wait: 'brk',
              zip: { en: 'This is *2,315*. Tap a *hundred* to break it.', vi: 'Đây là số *2,315*. Bấm vào một *khối trăm* để tách nó.' },
              then: { en: 'Now 2 hundreds and 11 tens. Still *2,315*!', vi: 'Bây giờ có 2 trăm và 11 chục. Vẫn là *2,315*!' } },
            { can: { brk: ['t'] }, wait: 'brk',
              zip: { en: 'Your turn! Tap a *ten* to break it.', vi: 'Đến lượt em! Bấm vào một *thanh chục* để tách nó.' },
              then: { en: 'Now 10 tens and *15 ones*. Still *2,315*!',
                      vi: 'Bây giờ có 10 chục và *15 đơn vị*. Vẫn là *2,315*!' } }] },
        { id: 'challenge', title: { en: 'Block challenge', vi: 'Thử thách với khối' },
          challenge: {
            end: { en: 'You did it! You can build, break and join blocks.', vi: 'Em làm được rồi! Em biết lập, tách và gộp các khối.' },
            result: 'You built, broke and joined numbers with blocks.',
            rounds: [
          { mode: "our", lo: ["4Np.03"], v: [
            {"type":"build","n":1253},
            {"type":"build","n":2146},
            {"type":"build","n":1362}] },
          { mode: "our", lo: ["4Np.01","4Ni.01"], v: [
            {"type":"read","b":[2,0,3,5]},
            {"type":"read","b":[1,2,0,6]},
            {"type":"read","b":[3,0,4,0]}] },
          { mode: "your", lo: ["4Np.03"], v: [
            {"type":"trade","act":"break","b":[2,3,4,0],"p":"h"},
            {"type":"trade","act":"break","b":[1,2,5,0],"p":"th"},
            {"type":"trade","act":"break","b":[1,3,2,6],"p":"t"}] },
          { mode: "your", lo: ["4Np.03"], v: [
            {"type":"trade","act":"join","b":[1,1,17,2],"p":"t"},
            {"type":"trade","act":"join","b":[1,12,3,6],"p":"h"},
            {"type":"trade","act":"join","b":[2,1,3,18],"p":"o"}] },
          { mode: "your", lo: ["4Np.01","4Np.03"], v: [
            {"type":"pickmat","n":2304,"at":1,"opts":[[2,3,0,4],[2,0,3,4],[2,3,4,0]]},
            {"type":"pickmat","n":1420,"regrouped":true,"at":2,"opts":[[0,14,2,0],[1,4,0,2],[0,12,4,0]]},
            {"type":"pickmat","n":3052,"at":0,"opts":[[3,0,5,2],[3,5,0,2],[3,0,2,5]]}] }] } }]
    },
    // Practise: Pictorial (Draw it, the place value chart) then Abstract (Solve it, like the test).
    // The rounds are the Maths v2 Stop 1 slots, copied as they are (legacy/maths-v2/src/mdata.js CONTENT[1]).
    practise: [
      { id: 's1r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Use the place value chart.', vi: 'Dùng bảng giá trị theo hàng.' },
        levels: [
      { title: { en: "The place value chart", vi: "Bảng giá trị theo hàng" }, rounds: [
          { mode: "our", lo: ["4Np.01"], twm: ["TWM.05"], v: [
            {"type":"digit","n":4650,"d":6},
            {"type":"digit","n":28517,"d":8},
            {"type":"digit","n":7194,"d":9}] },
          { mode: "your", lo: ["4Ni.01","4Np.03"], twm: ["TWM.05"], v: [
            {"type":"counters","n":3205},
            {"type":"counters","n":1064},
            {"type":"counters","n":4017}] }] },
      { title: { en: "Slide the digits", vi: "Trượt các chữ số" }, rounds: [
          { mode: "your", lo: ["4Np.02"], twm: ["TWM.02"], v: [
            {"type":"slide","n":38,"op":"x","by":10},
            {"type":"slide","n":209,"op":"x","by":10},
            {"type":"slide","n":64,"op":"x","by":100}] },
          { mode: "your", lo: ["4Np.02"], twm: ["TWM.02"], v: [
            {"type":"slide","n":3200,"op":"d","by":100},
            {"type":"slide","n":1470,"op":"d","by":10},
            {"type":"slide","n":90400,"op":"d","by":100}] }] },
      { title: { en: "Parts of a number", vi: "Các phần của một số" }, rounds: [
          { mode: "your", lo: ["4Np.03"], twm: ["TWM.05"], v: [
            {"type":"expand","parts":[5000,30,8]},
            {"type":"expand","parts":[20000,4000,70,1]},
            {"type":"expand","parts":[6000,200,9]}] }] }] },
      { id: 's1a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Calculate and write", vi: "Tính và viết số" }, rounds: [
          { mode: "your", lo: ["4Np.02"], twm: ["TWM.02"], v: [
            {"type":"calc","items":[{"n":305,"op":"x","by":10},{"n":2700,"op":"d","by":100}]},
            {"type":"calc","items":[{"n":49,"op":"x","by":100},{"n":8060,"op":"d","by":10}]},
            {"type":"missing","items":[{"a":53,"op":"x","by":100,"hide":"a"},{"a":36000,"op":"d","by":100,"hide":"by"}]}] },
          { mode: "your", lo: ["4Np.03"], twm: ["TWM.05"], v: [
            {"type":"fromexp","parts":[40000,3000,50,2]},
            {"type":"part","n":38406,"miss":"h"},
            {"type":"fromexp","parts":[60000,800,30,4]}] }] },
      { title: { en: "Chains and other ways", vi: "Chuỗi phép tính và cách khác" }, rounds: [
          { mode: "your", lo: ["4Np.02"], twm: ["TWM.02"], v: [
            {"type":"chain","start":70,"ops":[["d",10],["x",100]],"give":2},
            {"type":"chain","start":45,"ops":[["x",100],["d",10]],"give":2},
            {"type":"chain","start":5200,"ops":[["d",100],["x",10]],"give":1}] },
          { mode: "your", lo: ["4Np.03"], twm: ["TWM.05","TWM.01"], v: [
            {"type":"regroup","n":2640,"letters":true,"at":2,"tip":"Try it with blocks: break 1 hundred into 10 tens. What do you have now?","opts":[[2,5,14,0],[2,6,14,0],[1,6,4,0],[2,5,4,0]]},
            {"type":"regroup","n":586,"at":1,"tip":"Try it with blocks: break 1 ten into 10 ones. What do you have now?","opts":[[0,5,7,16],[0,5,8,16],[0,5,7,6]]},
            {"type":"same","b":[0,12,4,0],"at":1,"opts":[1240,124,12400]}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["4Np.01","4Np.02"], twm: ["TWM.07","TWM.04"], v: [
            {"type":"claim","who":"Trang","ok":true,"at":1,"says":"In 250 the 5 is worth 50. When I multiply 250 by 10, the 5 is worth 500.","reasons":[{"t":"250 × 10 = 2,500. The 5 moves one place to the left, from the tens to the hundreds."},{"t":"the 5 is always worth 50. Multiplying does not change the value of a digit.","why":"When you multiply by 10, every digit moves one place to the left. So its value changes."},{"t":"250 × 10 = 260, and there is no 5 in 260.","why":"250 × 10 is not 250 + 10. Move every digit one place to the left."}],"hint":{"pic":{"k":"chart","n":250,"cols":5,"cap":"250 × 10"},"step":"First work out 250 × 10. Then find the 5 in your answer."},"worked":"250 × 10 = 2,500. The 5 is now in the hundreds place, so it is worth 500.","model":"Trang is correct because 250 × 10 = 2,500, and the 5 in 2,500 is worth 500."},
            {"type":"claim","who":"Khoa","ok":false,"at":0,"says":"6,040 and 6,400 are the same number, because they have the same digits.","reasons":[{"t":"the 4 is in a different place. It is worth 40 in 6,040 and 400 in 6,400."},{"t":"both numbers have a 6, a 4 and two zeros.","why":"That is true, but the place of each digit matters. Look at where the 4 is."},{"t":"a zero has no value, so you can move it.","why":"A zero holds a place. If you move it, the other digits change their value."}],"hint":{"pic":[{"k":"chart","n":6040,"cols":4},{"k":"chart","n":6400,"cols":4}],"step":"Find the 4 in each number. Which place is it in?"},"worked":"In 6,040 the 4 is in the tens place: 40. In 6,400 the 4 is in the hundreds place: 400. The numbers are different.","model":"Khoa is incorrect because the 4 is worth 40 in 6,040 and 400 in 6,400."},
            {"type":"claim","who":"Vy","ok":false,"at":2,"says":"In 3,507 the digit 7 is worth more than the digit 3, because 7 is bigger than 3.","reasons":[{"t":"the 3 is in the thousands place, so it is worth 3,000. The 7 is worth only 7."},{"t":"7 is a bigger digit than 3.","why":"The digit is bigger, but its place is smaller. Find the value of each digit."},{"t":"the 7 is the last digit, and the last digit is always worth the most.","why":"The last digit is in the ones place. It is worth the least."}],"hint":{"pic":{"k":"chart","n":3507,"cols":4},"step":"Find the value of the 3 and the value of the 7."},"worked":"The 3 is in the thousands place: 3,000. The 7 is in the ones place: 7. So the 3 is worth more.","model":"Vy is incorrect because the 3 is worth 3,000 and the 7 is worth only 7."}] }] }] }
    ],
    // Notes: how to do it. Each note has a worked example (example: short lines) and a picture made by the maths
    // tools (pic: a T.tools.pic spec). From Maths v2 CONTENT[1].notes, with one new note on expanded form.
    // The check: one gap sentence per note, in the same order (the right answer is checked by test/stop-steps.mjs).
    notes: {
      items: [
        { en: 'The place of a [[digit]] tells you its [[value]]. Find the place, then say what the digit is worth.',
          vi: 'Vị trí của một chữ số cho biết giá trị của nó. Tìm hàng của chữ số, rồi nói chữ số đó có giá trị bao nhiêu.',
          example: ['In 2,315 the 3 is in the *hundreds* place.', 'So the 3 is worth *300*.'],
          pic: { k: 'chart', n: 2315, cols: 4, hl: 'h' } },
        { en: 'Zero is a [[place holder]]. When a place has nothing in it, write 0 there.',
          vi: 'Số 0 là chữ số giữ chỗ. Khi một hàng không có gì, hãy viết số 0 vào hàng đó.',
          example: ['2 thousands, no hundreds, 3 tens and 5 ones.', 'Write *2,035*. The 0 holds the hundreds place.'],
          pic: { k: 'chart', n: 2035, cols: 4, hl: 'h' } },
        { en: 'Split a number into its parts. This is its [[expanded form]].',
          vi: 'Tách một số thành các phần của nó. Đó là cách viết số thành tổng.',
          example: ['2,315 = *2,000 + 300 + 10 + 5*', 'Put the parts back together: 2,315.'],
          pic: { k: 'stack', parts: [2000, 300, 10, 5], cols: 4 } },
        { en: 'You can [[regroup]] a number. 1 hundred is the same as 10 [[tens]].',
          vi: 'Em có thể đổi hàng một số. 1 trăm bằng 10 chục.',
          example: ['2,340 is 2 [[thousands]], 3 hundreds and 4 tens.', 'It is also 2 thousands, 2 hundreds and *14 tens*.'],
          pic: { k: 'swap', p: 'h' } },
        { en: 'To [[multiply]] by 10, move every digit one place to the left. To multiply by 100, move two places.',
          vi: 'Để nhân với 10, chuyển mỗi chữ số sang trái một hàng. Để nhân với 100, chuyển sang trái hai hàng.',
          example: ['47 × 10 = *470*', '47 × 100 = *4,700*'],
          pic: { k: 'slider', n: 47, cols: 5, shift: 1, zeros: true } },
        { en: 'To [[divide]] by 10, move every digit one place to the right. To divide by 100, move two places.',
          vi: 'Để chia cho 10, chuyển mỗi chữ số sang phải một hàng. Để chia cho 100, chuyển sang phải hai hàng.',
          example: ['470 ÷ 10 = *47*', '4,700 ÷ 100 = *47*'],
          pic: { k: 'slider', n: 470, cols: 5, shift: -1, zeros: true } }
      ],
      check: [
        { sentence: 'In 4,862 the 8 is worth {800|8|80}.', answer: '800' },
        { sentence: 'In 6,094 the 0 holds the {hundreds|tens|ones} place.', answer: 'hundreds' },
        { sentence: '5,000 + 600 + 40 + 2 = {5,642|5,624|56,402}.', answer: '5,642' },
        { sentence: '1 hundred is the same as {10 tens|10 ones|100 tens}.', answer: '10 tens' },
        { sentence: '36 × 10 = {360|3,600|46}.', answer: '360' },
        { sentence: '5,800 ÷ 100 = {58|580|5,700}.', answer: '58' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard, with the DOK mix of the public test specification (Grade 3:
    // DOK 1 30-45%, DOK 2 40-55%, DOK 3 10-15%), so 4 at DOK 1, 5 at DOK 2, 1 at DOK 3 (T.DOK_MIX, docs/05).
    // Each item: dok (its real level, judged with T.DOK), lo (Cambridge codes), twm (1 or 2 TWM characteristics,
    // T.TWM; the tagging rule is in docs/05) and 3 sets of numbers (play 1 uses v[0]). Questions 1 to 9 are the
    // Maths v2 Stop 1 mini test items (numbers as they were): v2 question 6 ("part", really DOK 1) is left out,
    // and the two v2 DOK 3 items are DOK 2 (one fact to check with a given reason; a routine two-step story).
    // Question 10 is new (Nov 2026): a "Who is correct?" claim about a rule, tested with an example (DOK 3).
    // Run by src/steps/70-test.js with the models; answers logged with game letter 'm' and dok.
    test: {
      items: [
        { dok: 1, lo: ["4Np.01"], twm: ["TWM.05"], v: [
          {"type":"value","n":5731,"d":7},
          {"type":"value","n":46208,"d":6,"ctx":"A step counter shows this number of steps.","pic":"counter"},
          {"type":"value","n":9354,"d":5}
        ] },
        { dok: 1, lo: ["4Ni.01"], twm: ["TWM.05"], v: [
          {"type":"name","n":4072},
          {"type":"name","n":13506},
          {"type":"name","n":8310}
        ] },
        { dok: 1, lo: ["4Np.02"], twm: ["TWM.02"], v: [
          {"type":"calc","items":[{"n":73,"op":"x","by":10}]},
          {"type":"calc","items":[{"n":620,"op":"x","by":100}]},
          {"type":"calc","items":[{"n":4500,"op":"d","by":10}]}
        ] },
        { dok: 1, lo: ["4Np.03"], twm: ["TWM.05"], v: [
          {"type":"fromexp","parts":[7000,400,6]},
          {"type":"fromexp","parts":[30000,500,20,9]},
          {"type":"fromexp","parts":[9000,80,1]}
        ] },
        { dok: 2, lo: ["4Np.02"], twm: ["TWM.02"], v: [
          {"type":"missing","items":[{"a":86,"op":"x","by":100,"hide":"by"}]},
          {"type":"missing","items":[{"a":5900,"op":"d","by":10,"hide":"a"}]},
          {"type":"missing","items":[{"a":407,"op":"x","by":10,"hide":"a"}]}
        ] },
        { dok: 2, lo: ["4Np.03"], twm: ["TWM.05","TWM.01"], v: [
          {"type":"regroup","n":5308,"at":1,"opts":[[5,2,10,8],[5,3,10,8],[5,2,0,18]]},
          {"type":"same","b":[0,23,0,5],"at":2,"opts":[2305,235,23005]},
          {"type":"regroup","n":906,"at":0,"opts":[[0,8,10,6],[0,9,10,6],[0,8,0,16]]}
        ] },
        { dok: 2, lo: ["4Np.02"], twm: ["TWM.02"], v: [
          {"type":"story","kind":"times","n":46,"by":10,"one":"tray","many":"trays","unit":"eggs","pic":"eggs","text":"One tray holds 10 eggs. How many eggs are in <b>46</b> trays?"},
          {"type":"story","kind":"times","n":38,"by":100,"one":"pack","many":"packs","unit":"sheets","pic":"paper","text":"One pack holds 100 sheets of paper. How many sheets are in <b>38</b> packs?"},
          {"type":"story","kind":"share","total":1250,"by":10,"one":"tray","many":"trays","unit":"trays","pic":"eggs","text":"A farm has <b>1,250</b> eggs. One tray holds 10 eggs. How many trays can the farm fill?"}
        ] },
        { dok: 2, lo: ["4Np.03","4Np.01"], twm: ["TWM.07","TWM.04"], v: [
          {"type":"claim","who":"Lan","ok":false,"at":1,"says":"40 tens is the same as 4,000.","reasons":[{"t":"10 tens make 100. So 40 tens make 400, not 4,000."},{"t":"40 tens is 40 + 10, and that is 50.","why":"40 tens means 40 lots of ten. Work out 40 × 10."},{"t":"tens are always smaller than hundreds.","why":"One ten is smaller than one hundred. But here there are 40 tens. Work out what they make."}],"hint":{"pic":{"k":"mat","b":[0,0,10,0],"counts":true,"cap":"10 tens = 100"},"step":"10 tens make 100. So what do 40 tens make?"},"worked":"10 tens make 100. 40 tens make 400. That is not 4,000.","model":"Lan is incorrect because 40 tens make 400, not 4,000."},
          {"type":"claim","who":"Tuan","ok":true,"at":0,"says":"When I divide 5,200 by 100, the 5 moves to the tens place.","reasons":[{"t":"5,200 ÷ 100 = 52. The 5 moves two places to the right, from the thousands to the tens."},{"t":"dividing by 100 moves every digit two places to the left.","why":"Dividing makes this number smaller. The digits move to the right."},{"t":"the 5 always stays in the thousands place.","why":"When you divide by 100, every digit moves. Work out 5,200 ÷ 100."}],"hint":{"pic":{"k":"chart","n":5200,"cols":5,"cap":"5,200 ÷ 100"},"step":"First work out 5,200 ÷ 100. Then find the 5 in your answer."},"worked":"5,200 ÷ 100 = 52. In 52 the 5 is in the tens place.","model":"Tuan is correct because 5,200 ÷ 100 = 52, and the 5 in 52 is in the tens place."},
          {"type":"claim","who":"Nga","ok":false,"at":2,"says":"In 8,030 the 3 is worth 300.","reasons":[{"t":"the 3 is in the tens place, so it is worth 30. The 0 holds the hundreds place."},{"t":"the 3 is the third digit, and the third digit is always the hundreds.","why":"Count the places from the right: ones, tens, hundreds."},{"t":"8,030 is bigger than 300.","why":"That is true, but it does not tell us what the 3 is worth."}],"hint":{"pic":{"k":"chart","n":8030,"cols":4},"step":"Find the 3 in the chart. Which place is it in?"},"worked":"In 8,030 the 3 is in the tens place. It is worth 30, not 300.","model":"Nga is incorrect because the 3 is in the tens place, so it is worth 30."}
        ] },
        { dok: 2, lo: ["4Np.03"], twm: ["TWM.05"], v: [
          {"type":"story","kind":"need","total":340,"big":100,"have":2,"small":10,"unit":"strips","text":"Stamps come in sheets of 100 and strips of 10. Duc needs <b>340</b> stamps. He takes <b>2</b> sheets. How many strips does he need?"},
          {"type":"story","kind":"need","total":2500,"big":1000,"have":1,"small":100,"unit":"tubes","text":"Beads come in bags of 1,000 and tubes of 100. Thu needs <b>2,500</b> beads. She takes <b>1</b> bag. How many tubes does she need?"},
          {"type":"story","kind":"sum","big":100,"nb":2,"small":10,"ns":19,"unit":"cakes","text":"A baker packs cakes in boxes of 100 and trays of 10. There are <b>2</b> boxes and <b>19</b> trays. How many cakes are there?"}
        ] },
        { dok: 3, lo: ["4Np.02","4Np.01"], twm: ["TWM.07","TWM.04"], v: [
          {"type":"claim","who":"Minh","ok":true,"at":2,"says":"Multiplying a number by 10 and then by 10 again is the same as multiplying it by 100.","reasons":[{"t":"× 10 moves every digit one place to the left. Doing it two times moves them two places, the same as × 100."},{"t":"10 + 10 = 20, so it is the same as multiplying by 20.","why":"Multiplying two times is not adding. Try 36: 36 × 10 = 360, and 360 × 10 = 3,600."},{"t":"it only works for numbers that end in 0.","why":"Try a number that does not end in 0, like 36. 36 × 10 × 10 = 3,600, and 36 × 100 = 3,600."}],"hint":{"pic":{"k":"chart","n":36,"cols":5,"cap":"36 × 10 × 10"},"step":"Try it with a number, like 36. Work out 36 × 10, then × 10 again. Then work out 36 × 100."},"worked":"36 × 10 = 360, and 360 × 10 = 3,600. 36 × 100 = 3,600 too. Two moves of one place are the same as one move of two places.","model":"Minh is correct because two moves of one place to the left are the same as × 100."},
          {"type":"claim","who":"Hoa","ok":false,"at":0,"says":"Divide a number by 10, then multiply by 100. You get back the number you started with.","reasons":[{"t":"÷ 10 moves the digits one place to the right, but × 100 moves them two places to the left. 380 becomes 38, then 3,800."},{"t":"dividing and multiplying always undo each other.","why":"÷ 10 and × 10 undo each other. But × 100 moves the digits two places. Try it with 380."},{"t":"380 ÷ 10 = 370, and 370 × 100 = 37,000.","why":"÷ 10 is not − 10. Move every digit one place to the right."}],"hint":{"pic":{"k":"chart","n":380,"cols":5,"cap":"380 ÷ 10, then × 100"},"step":"Try it with a number, like 380. Work out 380 ÷ 10. Then multiply your answer by 100."},"worked":"380 ÷ 10 = 38. 38 × 100 = 3,800. That is not 380, so the number does not come back.","model":"Hoa is incorrect because 380 ÷ 10 = 38 and 38 × 100 = 3,800, not 380."},
          {"type":"claim","who":"Mai","ok":true,"at":1,"says":"Dividing a number by 10 and then by 10 again is the same as dividing it by 100.","reasons":[{"t":"÷ 10 moves every digit one place to the right. Doing it two times moves them two places, the same as ÷ 100."},{"t":"10 + 10 = 20, so it is the same as dividing by 20.","why":"Dividing two times is not adding. Try 5,300: 5,300 ÷ 10 = 530, and 530 ÷ 10 = 53."},{"t":"÷ 10 two times moves the digits two places to the left.","why":"When you divide, the digits move to the right, not to the left. Try 5,300 ÷ 10."}],"hint":{"pic":{"k":"chart","n":5300,"cols":5,"cap":"5,300 ÷ 10 ÷ 10"},"step":"Try it with a number, like 5,300. Work out 5,300 ÷ 10, then ÷ 10 again. Then work out 5,300 ÷ 100."},"worked":"5,300 ÷ 10 = 530, and 530 ÷ 10 = 53. 5,300 ÷ 100 = 53 too. Two moves of one place are the same as one move of two places.","model":"Mai is correct because two moves of one place to the right are the same as ÷ 100."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). The 72 Maths v2
    // Stop 1 questions (legacy/maths-v2/src/pool.js LPOOL[1], made by its tools/genpool.mjs), copied as they are.
    lightning: {
      secs: 60,
      items: [
        ["58 × 10",["580","5,800","508"]],
        ["624 × 10",["6,240","62,400","634"]],
        ["578 × 10",["5,780","57,800","588"]],
        ["85 × 10",["850","8,500","805"]],
        ["244 × 10",["2,440","24,400","254"]],
        ["36 × 10",["360","3,600","306"]],
        ["44 × 10",["440","4,400","404"]],
        ["23 × 10",["230","2,300","203"]],
        ["63 × 100",["6,300","630","63,000"]],
        ["62 × 100",["6,200","620","62,000"]],
        ["48 × 100",["4,800","480","48,000"]],
        ["85 × 100",["8,500","850","85,000"]],
        ["82 × 100",["8,200","820","82,000"]],
        ["78 × 100",["7,800","780","78,000"]],
        ["39 × 100",["3,900","390","39,000"]],
        ["2,570 ÷ 10",["257","2,560","25,700"]],
        ["660 ÷ 10",["66","650","6,600"]],
        ["7,350 ÷ 10",["735","7,340","73,500"]],
        ["9,660 ÷ 10",["966","9,650","96,600"]],
        ["3,010 ÷ 10",["301","3,000","30,100"]],
        ["1,550 ÷ 10",["155","1,540","15,500"]],
        ["7,370 ÷ 10",["737","7,360","73,700"]],
        ["5,520 ÷ 10",["552","5,510","55,200"]],
        ["6,200 ÷ 100",["62","620","6,100"]],
        ["8,500 ÷ 100",["85","850","8,400"]],
        ["2,400 ÷ 100",["24","240","2,300"]],
        ["8,300 ÷ 100",["83","830","8,200"]],
        ["4,500 ÷ 100",["45","450","4,400"]],
        ["1,400 ÷ 100",["14","140","1,300"]],
        ["1,800 ÷ 100",["18","180","1,700"]],
        ["The 5 in 5,716 is worth",["5,000","500","50"]],
        ["The 6 in 5,694 is worth",["600","6,000","60"]],
        ["The 4 in 7,354 is worth",["4","40","400"]],
        ["The 4 in 8,649 is worth",["40","400","4"]],
        ["The 1 in 4,351 is worth",["1","10","100"]],
        ["The 2 in 3,421 is worth",["20","200","2"]],
        ["The 6 in 5,637 is worth",["600","6,000","60"]],
        ["The 2 in 1,542 is worth",["2","20","200"]],
        ["Which digit is in the ones place in 9,714?",["4","7","1"]],
        ["Which digit is in the ones place in 9,678?",["8","7","9"]],
        ["Which digit is in the tens place in 1,867?",["6","7","8"]],
        ["Which digit is in the thousands place in 4,732?",["4","3","7"]],
        ["Which digit is in the ones place in 6,985?",["5","6","8"]],
        ["Which digit is in the ones place in 7,392?",["2","3","9"]],
        ["Which digit is in the ones place in 9,563?",["3","9","6"]],
        ["3,000 + 10 + 4",["3,014","3,104","314"]],
        ["2,000 + 400 + 2",["2,402","2,420","242"]],
        ["6,000 + 50 + 9",["6,059","6,509","659"]],
        ["6,000 + 500 + 3",["6,503","6,530","653"]],
        ["9,000 + 30 + 5",["9,035","9,305","935"]],
        ["2,000 + 30 + 6",["2,036","2,306","236"]],
        ["1,000 + 70 + 2",["1,072","1,702","172"]],
        ["41 tens =",["410","41","4,100"]],
        ["28 hundreds =",["2,800","280","28,000"]],
        ["21 hundreds =",["2,100","210","21,000"]],
        ["37 hundreds =",["3,700","370","37,000"]],
        ["38 tens =",["380","38","3,800"]],
        ["16 tens =",["160","16","1,600"]],
        ["37 tens =",["370","37","3,700"]],
        ["46 tens =",["460","46","4,600"]],
        ["How many hundreds make 3,000?",["30","3","300"]],
        ["How many hundreds make 5,000?",["50","5","500"]],
        ["How many hundreds make 6,000?",["60","6","600"]],
        ["How many hundreds make 9,000?",["90","9","900"]],
        ["How many tens make 300?",["30","3","300"]],
        ["How many tens make 700?",["70","7","700"]],
        ["Seven thousand and seventeen =",["7,017","7,107","717"]],
        ["Seven thousand, four hundred and nine =",["7,409","7,490","749"]],
        ["Two thousand and ten =",["2,010","2,100","210"]],
        ["Three thousand and sixty =",["3,060","3,600","360"]],
        ["Seven thousand, six hundred and nine =",["7,609","7,690","769"]],
        ["Eight thousand and fifty =",["8,050","8,500","850"]]
      ]
    },
    // My self-check: the 4 Maths v2 Stop 1 goals, in the same order (the dashboard reads the answers by goal number).
    // again: the step to practise again for each goal (v2 CONTENT[1].again: c = See it, r and a = Practise).
    selfcheck: {
      goals: ["read and write numbers bigger than 1,000", "say what each digit is worth", "make a number in different ways", "multiply and divide by 10 and 100"],
      again: ["r", "r", "c", "r"]
    }
  };
})(window.T = window.T || {});
