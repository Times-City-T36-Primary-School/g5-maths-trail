/* 22-pack-stop1.js - ALL the content of Stop 1, Decimal place value (Grade 5, Cambridge Stage 6: 6Np.01, 6Np.02).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The questions are data for the
   Grade 5 models (08-g5-models-s1.js) and the tools of 39-g5-tools-dec.js. None of the numbers, names or sentences
   are those of the EOS1 papers. */
(function (T) {
  'use strict';

  T.packs[1] = {
    n: 1,
    title: "Decimal place value",
    los: ["6Np.01", "6Np.02"],
    blurb: {
      en: "What is each *digit* of a decimal worth? Multiply and divide by 10, 100 and 1,000.",
      vi: "Mỗi *chữ số* của số thập phân có giá trị bao nhiêu? Nhân và chia cho 10, 100 và 1,000."
    },
    words: {
      sets: [
        { id: 'A', title: { en: 'Decimals', vi: 'Số thập phân' }, keys: ['decimal', 'decimal point', 'tenth', 'hundredth', 'thousandth'] },
        { id: 'B', title: { en: 'Digits and value', vi: 'Chữ số và giá trị' }, keys: ['digit', 'value', 'place value', 'decimal place'] },
        { id: 'C', title: { en: 'Change a number', vi: 'Biến đổi một số' }, keys: ['multiply', 'divide', 'place holder'] }
      ],
      items: {
        'decimal': { art: 'w-decimal', vi: 'số thập phân', def: 'A number with a decimal point. 3.75 is a decimal. It is more than 3 and less than 4.' },
        'decimal point': { art: 'w-decimal-point', vi: 'dấu thập phân', def: 'The dot in a decimal. It comes after the ones. In 3.75 it is between the 3 and the 7.' },
        'tenth': { art: 'w-tenth', vi: 'một phần mười', def: 'One of 10 equal parts of one whole. We write 0.1. The first place after the decimal point.' },
        'hundredth': { art: 'w-hundredth', vi: 'một phần trăm', def: 'One of 100 equal parts of one whole. We write 0.01. The second place after the decimal point.' },
        'thousandth': { art: 'w-thousandth', vi: 'một phần nghìn', def: 'One of 1,000 equal parts of one whole. We write 0.001. The third place after the decimal point.' },
        'digit': { art: 'w-digit', vi: 'chữ số', def: 'One of the ten symbols 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. The number 3.75 has three digits.' },
        'value': { art: 'w-value', vi: 'giá trị', def: 'How much a digit is worth. In 3.75 the value of the 7 is 0.7, or 7 tenths.' },
        'place value': { art: 'w-place-value', vi: 'giá trị theo vị trí của chữ số', def: 'The value a digit has because of its place in the number.' },
        'decimal place': { art: 'w-decimal-place', vi: 'chữ số thập phân (hàng thập phân)', def: 'A place after the decimal point. 3.75 has two decimal places. 3.758 has three.' },
        'multiply': { art: 'w-multiply', vi: 'nhân', def: 'To make a number so many times as big. 3.75 × 10 = 37.5.' },
        'divide': { art: 'w-divide', vi: 'chia', def: 'To share into equal parts. 37.5 ÷ 10 = 3.75.' },
        'place holder': { art: 'w-place-holder', vi: 'chữ số 0 giữ chỗ', def: 'A zero that keeps a place when there is nothing in it. In 6.049 the 0 holds the tenths place.' }
      }
    },
    // See it: Concrete. Cut one whole into tenths, hundredths and thousandths; slide the digits across the decimal
    // point; then the challenge (the data shape is in 45-see.js).
    see: {
      scenes: [
        { id: 'cut', title: { en: 'Smaller than one', vi: 'Nhỏ hơn một' }, tool: 'dzoom', dzoom: { level: 0 },
          steps: [
            { can: { cut: true }, wait: 'cut', until: { level: 1 },
              zip: { en: 'This square is *1 whole*. Tap *Cut into 10*.', vi: 'Hình vuông này là *1 đơn vị*. Bấm *Cut into 10* (Cắt thành 10).' },
              then: { en: 'Ten strips. One strip is *1 tenth = 0.1*.', vi: 'Mười dải. Một dải là *1 phần mười = 0.1*.' } },
            { can: { cut: true }, wait: 'cut', until: { level: 2 },
              zip: { en: 'Now cut the tenth. Tap *Cut into 10*.', vi: 'Bây giờ cắt một phần mười. Bấm *Cut into 10*.' },
              then: { en: 'One small square is *1 hundredth = 0.01*.', vi: 'Một ô vuông nhỏ là *1 phần trăm = 0.01*.' } },
            { can: { cut: true }, wait: 'cut', until: { level: 3 },
              zip: { en: 'Cut one more time. Look closely!', vi: 'Cắt thêm một lần nữa. Nhìn kỹ nhé!' },
              then: { en: '*1 thousandth = 0.001*. Each cut is 10 times smaller. Tap *Next*.', vi: '*1 phần nghìn = 0.001*. Mỗi lần cắt nhỏ đi 10 lần. Bấm *Next*.' } }] },
        { id: 'slide', title: { en: 'Slide the digits', vi: 'Trượt các chữ số' }, tool: 'dslider', dslider: { n: '3.75', zeros: true },
          steps: [
            { can: { slide: true }, wait: 'slide', until: { shift: 1 },
              zip: { en: 'This is *3.75*. Tap *Move left* once.', vi: 'Đây là số *3.75*. Bấm *Move left* (Sang trái) một lần.' },
              then: { en: '*3.75 × 10 = 37.5*. The point did not move!', vi: '*3.75 × 10 = 37.5*. Dấu thập phân không di chuyển!' } },
            { can: { slide: true }, wait: 'slide', until: { shift: 2 },
              zip: { en: 'Tap *Move left* again. That is *× 100*.', vi: 'Bấm *Move left* lần nữa. Đó là *× 100*.' },
              then: { en: '*3.75 × 100 = 375*. Two places to the left.', vi: '*3.75 × 100 = 375*. Sang trái hai hàng.' } },
            { can: { slide: true, dir: 'right' }, wait: 'slide', until: { shift: -1 }, fresh: true,
              zip: { en: 'Back to *3.75*. Now tap *Move right*.', vi: 'Trở lại *3.75*. Bây giờ bấm *Move right* (Sang phải).' },
              then: { en: '*3.75 ÷ 10 = 0.375*. A zero holds the ones. Tap *Next*.', vi: '*3.75 ÷ 10 = 0.375*. Số 0 giữ hàng đơn vị. Bấm *Next*.' } }] },
        { id: 'challenge', title: { en: 'Decimal challenge', vi: 'Thử thách số thập phân' },
          challenge: {
            end: { en: 'You did it! You can read and slide decimals.', vi: 'Em làm được rồi! Em biết đọc và trượt số thập phân.' },
            result: 'You read decimals and moved their digits.',
            rounds: [
          { mode: "our", lo: ["6Np.01"], v: [
            {"type":"dvalue","n":"4.268","d":6},
            {"type":"dvalue","n":"7.931","d":3},
            {"type":"dvalue","n":"2.584","d":8}] },
          { mode: "your", lo: ["6Np.01"], v: [
            {"type":"dvalue","n":"16.395","d":5},
            {"type":"dvalue","n":"20.714","d":7},
            {"type":"dvalue","n":"53.862","d":2}] },
          { mode: "your", lo: ["6Np.01"], v: [
            {"type":"dmake","cells":true,"parts":[["o",8],["hu",3],["te",5]]},
            {"type":"dmake","cells":true,"parts":[["te",2],["o",6],["hu",9]]},
            {"type":"dmake","cells":true,"parts":[["hu",4],["o",1],["te",7]]}] },
          { mode: "your", lo: ["6Np.02"], v: [
            {"type":"dslide","n":"2.46","op":"x","by":10},
            {"type":"dslide","n":"5.19","op":"x","by":100},
            {"type":"dslide","n":"0.83","op":"x","by":10}] },
          { mode: "your", lo: ["6Np.02"], v: [
            {"type":"dslide","n":"61.2","op":"d","by":10},
            {"type":"dslide","n":"49","op":"d","by":100},
            {"type":"dslide","n":"7.5","op":"d","by":10}] }] } }]
    },
    // Practise: Pictorial (Draw it: the decimal chart and the slider) then Abstract (Solve it, like the test).
    practise: [
      { id: 's1r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Use the decimal chart and the slider.', vi: 'Dùng bảng giá trị và thanh trượt số thập phân.' },
        levels: [
      { title: { en: "The decimal chart", vi: "Bảng giá trị số thập phân" }, rounds: [
          { mode: "our", lo: ["6Np.01"], twm: ["TWM.05"], v: [
            {"type":"dvalue","n":"9.416","d":1},
            {"type":"dvalue","n":"3.857","d":7},
            {"type":"dvalue","n":"6.203","d":3}] },
          { mode: "your", lo: ["6Np.01"], twm: ["TWM.05"], v: [
            {"type":"dmake","cells":true,"parts":[["o",5],["ths",2],["te",6],["hu",1]]},
            {"type":"dmake","cells":true,"parts":[["hu",8],["o",3],["ths",4]]},
            {"type":"dmake","cells":true,"parts":[["ths",7],["o",9],["te",2]]}] }] },
      { title: { en: "Slide the digits", vi: "Trượt các chữ số" }, rounds: [
          { mode: "your", lo: ["6Np.02"], twm: ["TWM.02"], v: [
            {"type":"dslide","n":"1.92","op":"x","by":100},
            {"type":"dslide","n":"0.305","op":"x","by":1000},
            {"type":"dslide","n":"7.4","op":"x","by":100}] },
          { mode: "your", lo: ["6Np.02"], twm: ["TWM.02"], v: [
            {"type":"dslide","n":"530","op":"d","by":1000},
            {"type":"dslide","n":"26.8","op":"d","by":100},
            {"type":"dslide","n":"9","op":"d","by":100}] }] },
      { title: { en: "Parts of a decimal", vi: "Các phần của số thập phân" }, rounds: [
          { mode: "your", lo: ["6Np.01"], twm: ["TWM.05"], v: [
            {"type":"dexp","n":"8.527","miss":"hu"},
            {"type":"dexp","n":"14.063","miss":"ths"},
            {"type":"dexp","n":"2.904","miss":"te"}] },
          { mode: "your", lo: ["6Np.01"], twm: ["TWM.05"], v: [
            {"type":"dfracval","n":"5.39","d":9,"at":1},
            {"type":"dfracval","n":"0.728","d":8,"at":2},
            {"type":"dfracval","n":"6.41","d":4,"at":0}] }] }] },
      { id: 's1a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Value and number", vi: "Giá trị và số" }, rounds: [
          { mode: "your", lo: ["6Np.01"], twm: ["TWM.05"], v: [
            {"type":"dvaluew","n":"48.175","d":7},
            {"type":"dvaluew","n":"3.962","d":2},
            {"type":"dvaluew","n":"70.584","d":5}] },
          { mode: "your", lo: ["6Np.01"], twm: ["TWM.05"], v: [
            {"type":"dmake","parts":[["hu",6],["t",1],["ths",3],["o",8]]},
            {"type":"dmake","parts":[["ths",5],["o",2],["te",9]]},
            {"type":"dmake","parts":[["te",4],["t",6],["o",0],["ths",1]]}] },
          { mode: "your", lo: ["6Np.01"], twm: ["TWM.01"], v: [
            {"type":"dclue","whole":3,"te":6,"hu":0,"ths":2,"order":[1,2,0]},
            {"type":"dclue","whole":9,"te":0,"hu":4,"ths":7,"order":[2,0,1]},
            {"type":"dclue","whole":14,"te":8,"hu":1,"ths":0,"order":[0,2,1]}] }] },
      { title: { en: "Calculate", vi: "Tính" }, rounds: [
          { mode: "your", lo: ["6Np.02"], twm: ["TWM.02"], v: [
            {"type":"dcalc","items":[{"n":"6.07","op":"x","by":100},{"n":"83","op":"d","by":10}]},
            {"type":"dcalc","items":[{"n":"0.59","op":"x","by":1000},{"n":"417","op":"d","by":100}]},
            {"type":"dcalc","items":[{"n":"12.8","op":"x","by":10},{"n":"6","op":"d","by":1000}]}] },
          { mode: "your", lo: ["6Np.02"], twm: ["TWM.02"], v: [
            {"type":"dmissing","items":[{"a":"3.4","op":"x","by":100,"hide":"by"},{"a":"28","op":"d","by":10,"hide":"a"}]},
            {"type":"dmissing","items":[{"a":"0.076","op":"x","by":1000,"hide":"a"},{"a":"915","op":"d","by":1000,"hide":"by"}]},
            {"type":"dmissing","items":[{"a":"50.2","op":"d","by":100,"hide":"by"},{"a":"1.09","op":"x","by":10,"hide":"a"}]}] },
          { mode: "your", lo: ["6Np.02"], twm: ["TWM.02"], v: [
            {"type":"dchain","start":"0.48","ops":[["x",100],["d",10]],"give":0},
            {"type":"dchain","start":"7.3","ops":[["d",10],["x",1000]],"give":2},
            {"type":"dchain","start":"62","ops":[["d",1000],["x",10]],"give":1}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["6Np.02"], twm: ["TWM.02", "TWM.01"], v: [
            {"type":"dsame","n":"2.9","op":"x","by":100,"at":1,"opts":[{"n":"29","op":"x","by":10},{"n":"0.29","op":"x","by":100},{"n":"290","op":"d","by":10}]},
            {"type":"dsame","n":"560","op":"d","by":100,"at":2,"opts":[{"n":"56","op":"d","by":10},{"n":"5.6","op":"d","by":10},{"n":"5,600","op":"d","by":100}]},
            {"type":"dsame","n":"0.04","op":"x","by":1000,"at":0,"opts":[{"n":"0.4","op":"x","by":100},{"n":"4","op":"x","by":100},{"n":"0.4","op":"x","by":10}]}] },
          { mode: "your", lo: ["6Np.01", "6Np.02"], twm: ["TWM.07", "TWM.04"], v: [
            {"type":"claim","who":"Minh","ok":true,"at":1,"says":"In 6.25 the 5 is worth 5 hundredths. When I multiply 6.25 by 10, the 5 is worth 5 tenths.","reasons":[{"t":"6.25 × 10 = 62.5. The 5 moves one place to the left, from the hundredths to the tenths."},{"t":"the 5 is always worth 0.05. Multiplying does not change the value of a digit.","why":"When you multiply by 10, every digit moves one place to the left. So its value changes."},{"t":"6.25 × 10 = 6.250, and there the 5 is still in the hundredths place.","why":"Writing a 0 at the end does not multiply by 10. Move every digit one place to the left."}],"hint":{"pic":{"k":"dslider","n":"6.25","cap":"6.25 × 10"},"step":"First work out 6.25 × 10. Then find the 5 in your answer."},"worked":"6.25 × 10 = 62.5. The 5 is now in the tenths place, so it is worth 0.5.","model":"Minh is correct because 6.25 × 10 = 62.5, and the 5 in 62.5 is worth 5 tenths."},
            {"type":"claim","who":"Hoa","ok":false,"at":0,"says":"0.7 and 0.07 are the same number, because they have the same digits.","reasons":[{"t":"the 7 is in a different place. It is worth 7 tenths in 0.7 and 7 hundredths in 0.07."},{"t":"both numbers have a 7 and zeros.","why":"That is true, but the place of each digit matters. Look at where the 7 is."},{"t":"a zero has no value, so it changes nothing.","why":"A zero after the decimal point holds a place. It pushes the 7 into the hundredths place."}],"hint":{"pic":[{"k":"dchart","n":"0.7","to":"hu"},{"k":"dchart","n":"0.07","to":"hu"}],"step":"Find the 7 in each number. Which place is it in?"},"worked":"In 0.7 the 7 is in the tenths place: 0.7. In 0.07 the 7 is in the hundredths place: 0.07. So 0.7 is ten times as big as 0.07.","model":"Hoa is incorrect because the 7 is worth 0.7 in the first number and only 0.07 in the second."},
            {"type":"claim","who":"Duc","ok":false,"at":2,"says":"In 3.418 the digit 8 is worth more than the digit 4, because 8 is bigger than 4.","reasons":[{"t":"the 4 is in the tenths place, so it is worth 0.4. The 8 is worth only 0.008."},{"t":"8 is a bigger digit than 4.","why":"The digit is bigger, but its place is smaller. Find the value of each digit."},{"t":"the 8 is the last digit, and the last digit is always worth the most.","why":"The last digit here is in the thousandths place. It is worth the least."}],"hint":{"pic":{"k":"dchart","n":"3.418"},"step":"Find the value of the 4 and the value of the 8."},"worked":"The 4 is in the tenths place: 0.4. The 8 is in the thousandths place: 0.008. So the 4 is worth more.","model":"Duc is incorrect because the 4 is worth 0.4 and the 8 is worth only 0.008."}] }] }] }
    ],
    // Notes: how to do it, each with a worked example and a picture made by the maths tools; then one gap
    // sentence per note, in the same order (the first choice in the braces is the right one).
    notes: {
      items: [
        { en: 'The [[decimal point]] comes after the ones. After it come the [[tenths|tenth]], the [[hundredths|hundredth]] and the [[thousandths|thousandth]].',
          vi: 'Dấu thập phân đứng sau hàng đơn vị. Sau nó là hàng phần mười, hàng phần trăm và hàng phần nghìn.',
          example: ['In 5.384 the 3 is in the *tenths* place.', 'The 8 is in the *hundredths* place and the 4 in the *thousandths* place.'],
          pic: { k: 'dchart', n: '5.384' } },
        { en: 'The place of a [[digit]] tells you its [[value]]. Find the place, then say what the digit is worth.',
          vi: 'Vị trí của một chữ số cho biết giá trị của nó. Tìm hàng của chữ số, rồi nói chữ số đó có giá trị bao nhiêu.',
          example: ['In 5.384 the 8 is in the hundredths place.', 'So the 8 is worth *0.08*, or 8 hundredths.'],
          pic: { k: 'dchart', n: '5.384', hl: 'hu', vals: true } },
        { en: 'Zero is a [[place holder]]. When a [[decimal place]] has nothing in it, write 0 there.',
          vi: 'Số 0 là chữ số giữ chỗ. Khi một hàng thập phân không có gì, hãy viết số 0 vào hàng đó.',
          example: ['6 ones, no tenths, 4 hundredths and 9 thousandths.', 'Write *6.049*. The 0 holds the tenths place.'],
          pic: { k: 'dchart', n: '6.049', hl: 'te' } },
        { en: 'Each place is worth 10 times the place on its right. 10 hundredths make 1 tenth. 10 tenths make 1 whole.',
          vi: 'Mỗi hàng có giá trị gấp 10 lần hàng bên phải nó. 10 phần trăm bằng 1 phần mười. 10 phần mười bằng 1 đơn vị.',
          example: ['0.01 × 10 = *0.1*', '0.1 × 10 = *1*'],
          pic: { k: 'hgrid', shade: 10, cols: true, cap: '10 hundredths = 1 tenth' } },
        { en: 'To [[multiply]] by 10, move every digit 1 place to the left. By 100: 2 places. By 1,000: 3 places.',
          vi: 'Để nhân với 10, chuyển mỗi chữ số sang trái 1 hàng. Nhân với 100: 2 hàng. Nhân với 1,000: 3 hàng.',
          example: ['4.7 × 10 = *47*', '4.7 × 100 = *470*', 'Do not just write a 0 at the end: 4.70 is still 4.7.'],
          pic: { k: 'dslider', n: '4.7', shift: 1 } },
        { en: 'To [[divide]] by 10, move every digit 1 place to the right. By 100: 2 places. By 1,000: 3 places.',
          vi: 'Để chia cho 10, chuyển mỗi chữ số sang phải 1 hàng. Chia cho 100: 2 hàng. Chia cho 1,000: 3 hàng.',
          example: ['52 ÷ 10 = *5.2*', '52 ÷ 100 = *0.52*', '52 ÷ 1,000 = *0.052*'],
          pic: { k: 'dslider', n: '52', shift: -2 } }
      ],
      check: [
        { sentence: 'In 7.615 the 1 is in the {hundredths|tenths|thousandths} place.', answer: 'hundredths' },
        { sentence: 'In 2.936 the 3 is worth {0.03|0.3|3}.', answer: '0.03' },
        { sentence: '8 ones and 5 hundredths is {8.05|8.5|8.005}.', answer: '8.05' },
        { sentence: '10 thousandths make 1 {hundredth|tenth|whole}.', answer: 'hundredth' },
        { sentence: '0.58 × 100 = {58|5.8|580}.', answer: '58' },
        { sentence: '9.4 ÷ 100 = {0.094|0.94|940}.', answer: '0.094' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard: 5 at DOK 1, 4 at DOK 2, 1 at DOK 3 (T.DOK_MIX), each with
    // lo, twm and 3 sets of numbers (play 1 uses v[0]).
    test: {
      items: [
        { dok: 1, lo: ["6Np.01"], twm: ["TWM.05"], v: [
          {"type":"dvaluew","n":"27.461","d":6},
          {"type":"dvaluew","n":"8.305","d":5},
          {"type":"dvaluew","n":"190.28","d":8}
        ] },
        { dok: 1, lo: ["6Np.01"], twm: ["TWM.05"], v: [
          {"type":"dmake","parts":[["o",4],["te",9],["hu",1],["ths",6]]},
          {"type":"dmake","parts":[["hu",3],["t",2],["ths",8],["o",7]]},
          {"type":"dmake","parts":[["te",5],["ths",2],["o",6]]}
        ] },
        { dok: 1, lo: ["6Np.02"], twm: ["TWM.02"], v: [
          {"type":"dcalc","items":[{"n":"5.38","op":"x","by":10}]},
          {"type":"dcalc","items":[{"n":"0.47","op":"x","by":100}]},
          {"type":"dcalc","items":[{"n":"1.206","op":"x","by":1000}]}
        ] },
        { dok: 1, lo: ["6Np.02"], twm: ["TWM.02"], v: [
          {"type":"dcalc","items":[{"n":"72.9","op":"d","by":10}]},
          {"type":"dcalc","items":[{"n":"316","op":"d","by":100}]},
          {"type":"dcalc","items":[{"n":"58","op":"d","by":1000}]}
        ] },
        { dok: 1, lo: ["6Np.01"], twm: ["TWM.05"], v: [
          {"type":"dexp","n":"7.042"},
          {"type":"dexp","n":"30.605"},
          {"type":"dexp","n":"9.18"}
        ] },
        { dok: 2, lo: ["6Np.02"], twm: ["TWM.02"], v: [
          {"type":"dmissing","items":[{"a":"0.92","op":"x","by":100,"hide":"by"}]},
          {"type":"dmissing","items":[{"a":"4.7","op":"d","by":10,"hide":"a"}]},
          {"type":"dmissing","items":[{"a":"63","op":"d","by":1000,"hide":"by"}]}
        ] },
        { dok: 2, lo: ["6Np.01"], twm: ["TWM.01"], v: [
          {"type":"dclue","whole":5,"te":0,"hu":8,"ths":3,"order":[2,0,1]},
          {"type":"dclue","whole":12,"te":6,"hu":0,"ths":9,"order":[1,2,0]},
          {"type":"dclue","whole":7,"te":1,"hu":5,"order":[1,0]}
        ] },
        { dok: 2, lo: ["6Np.02"], twm: ["TWM.02"], v: [
          {"type":"dscale","n":"0.85","op":"x","by":100,"unit":"g","text":"One paper clip has a mass of <b>0.85</b> g. What is the mass of <b>100</b> paper clips?"},
          {"type":"dscale","n":"36.5","op":"d","by":10,"unit":"m","text":"A ribbon is <b>36.5</b> m long. It is cut into <b>10</b> equal pieces. How long is one piece?"},
          {"type":"dscale","n":"94","op":"d","by":1000,"unit":"mm","text":"<b>1,000</b> sheets of paper make a pile <b>94</b> mm high. How thick is one sheet?"}
        ] },
        { dok: 2, lo: ["6Np.02"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Trang","ok":true,"at":1,"says":"45 ÷ 100 = 0.45","reasons":[{"t":"÷ 100 moves every digit two places to the right. The 4 goes to the tenths and the 5 to the hundredths."},{"t":"45 ÷ 100 = 4.5, because the digits move one place.","why":"÷ 100 is two places, not one. 45 ÷ 10 = 4.5."},{"t":"you cannot divide 45 by 100, because 45 is smaller than 100.","why":"You can. The answer is smaller than 1: a decimal."}],"hint":{"pic":{"k":"dslider","n":"45","cap":"45 ÷ 100"},"step":"Move the digits of 45 two places to the right."},"worked":"The 4 moves from the tens to the tenths. The 5 moves from the ones to the hundredths. 45 ÷ 100 = 0.45.","model":"Trang is correct because every digit of 45 moves two places to the right: 0.45."},
          {"type":"claim","who":"Phong","ok":false,"at":0,"says":"0.36 × 100 = 0.3600","reasons":[{"t":"× 100 moves every digit two places to the left. 0.36 × 100 = 36."},{"t":"0.3600 is 100 times as big as 0.36.","why":"0.3600 and 0.36 are the same number. Zeros at the end of a decimal change nothing."},{"t":"× 100 moves the digits two places to the right.","why":"Multiplying makes this number bigger. The digits move to the left."}],"hint":{"pic":{"k":"dslider","n":"0.36","cap":"0.36 × 100"},"step":"Zeros at the end of a decimal do not change it. Move the digits two places to the left."},"worked":"0.3600 is the same as 0.36. To multiply by 100, move each digit two places to the left: 0.36 × 100 = 36.","model":"Phong is incorrect because 0.36 × 100 = 36. The number 0.3600 is still 0.36."},
          {"type":"claim","who":"Thu","ok":true,"at":2,"says":"8 ÷ 1,000 = 0.008","reasons":[{"t":"÷ 1,000 moves the 8 three places to the right, into the thousandths place."},{"t":"8 ÷ 1,000 = 0.08, because the 8 moves two places.","why":"Two places is ÷ 100: 8 ÷ 100 = 0.08. ÷ 1,000 is three places."},{"t":"the answer must be bigger than 8.","why":"Dividing by 1,000 makes the number smaller."}],"hint":{"pic":{"k":"dslider","n":"8","cap":"8 ÷ 1,000"},"step":"Move the 8 three places to the right. Which place is it in now?"},"worked":"The 8 moves from the ones to the thousandths. Zeros hold the ones, tenths and hundredths places: 0.008.","model":"Thu is correct because the 8 moves three places to the right: 8 ÷ 1,000 = 0.008."}
        ] },
        { dok: 3, lo: ["6Np.02", "6Np.01"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Ngoc","ok":false,"at":2,"says":"When you divide a whole number by 10, the answer is always a decimal.","reasons":[{"t":"70 ÷ 10 = 7, and 7 is a whole number. One example like this shows the rule is not always true."},{"t":"dividing always makes a decimal, like 23 ÷ 10 = 2.3.","why":"That example fits. But try a number that ends in 0, like 70."},{"t":"you cannot divide a whole number by 10.","why":"You can: move every digit one place to the right."}],"hint":{"pic":{"k":"dslider","n":"70","cap":"70 ÷ 10"},"step":"Test the rule. Try 23 ÷ 10. Then try a number that ends in 0, like 70 ÷ 10."},"worked":"23 ÷ 10 = 2.3 is a decimal. But 70 ÷ 10 = 7 is a whole number. So the rule is not always true.","model":"Ngoc is incorrect because 70 ÷ 10 = 7, and 7 is a whole number."},
          {"type":"claim","who":"Long","ok":true,"at":0,"says":"Dividing a number by 10, then by 10 again, then by 10 again is the same as dividing it by 1,000.","reasons":[{"t":"each ÷ 10 moves the digits one place to the right. Three moves of one place are the same as one move of three places."},{"t":"10 + 10 + 10 = 30, so it is the same as dividing by 30.","why":"Dividing three times is not adding. Try 62: 6.2, then 0.62, then 0.062."},{"t":"it only works for numbers that end in three zeros.","why":"Try 62. 62 ÷ 10 ÷ 10 ÷ 10 = 0.062, and 62 ÷ 1,000 = 0.062."}],"hint":{"pic":{"k":"dslider","n":"62","cap":"62 ÷ 10 ÷ 10 ÷ 10"},"step":"Try it with a number, like 62. Divide by 10 three times. Then work out 62 ÷ 1,000."},"worked":"62 ÷ 10 = 6.2. 6.2 ÷ 10 = 0.62. 0.62 ÷ 10 = 0.062. And 62 ÷ 1,000 = 0.062 too.","model":"Long is correct because three moves of one place are the same as one move of three places."},
          {"type":"claim","who":"Chi","ok":true,"at":1,"says":"In the number 4.444, each 4 is worth ten times as much as the 4 on its right.","reasons":[{"t":"the values are 4, 0.4, 0.04 and 0.004. Each place is worth ten times the place on its right."},{"t":"all the 4s are worth the same, because they are the same digit.","why":"The same digit in a different place has a different value. Find the value of each 4."},{"t":"each 4 is worth ten times as much as the 4 on its left.","why":"Places get smaller as you go to the right: 0.4 is smaller than 4."}],"hint":{"pic":{"k":"dchart","n":"4.444","vals":true},"step":"Write the value of each 4. Then compare each one with its neighbour on the right."},"worked":"The values are 4, 0.4, 0.04 and 0.004. 4 = 10 × 0.4, 0.4 = 10 × 0.04 and 0.04 = 10 × 0.004.","model":"Chi is correct because each place is worth ten times the place on its right."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). Made and checked by
    // tools/gen_lightning_s1.py.
    lightning: {
      secs: 60,
      items: [
        ["7 tenths =", ["0.7", "0.07", "0.007"]],
        ["Which digit is in the tenths place in 8.947?", ["9", "4", "7"]],
        ["The 5 in 6.835 is worth", ["0.005", "0.5", "0.05"]],
        ["64 ÷ 100", ["0.64", "6.4", "0.064"]],
        ["4.18 × 10", ["41.8", "418", "4,180"]],
        ["The 4 in 8.134 is worth", ["0.004", "0.4", "0.04"]],
        ["How many thousandths make 1 hundredth?", ["10", "100", "1,000"]],
        ["24 tenths =", ["2.4", "0.24", "0.024"]],
        ["8 ÷ 100", ["0.08", "0.8", "0.008"]],
        ["15 hundredths =", ["0.15", "1.5", "0.015"]],
        ["64 ÷ 1,000", ["0.064", "6.4", "0.64"]],
        ["0.6 × 100", ["60", "6", "600"]],
        ["The 7 in 2.753 is worth", ["0.7", "0.07", "0.007"]],
        ["7.02 × 100", ["702", "70.2", "7,020"]],
        ["Which digit is in the thousandths place in 6.845?", ["5", "8", "4"]],
        ["8 ÷ 10", ["0.8", "0.08", "0.008"]],
        ["29 ÷ 1,000", ["0.029", "2.9", "0.29"]],
        ["1 + 0.4 + 0.007", ["1.407", "1.47", "1.047"]],
        ["6 ÷ 1,000", ["0.006", "0.6", "0.06"]],
        ["0.6 × 1,000", ["600", "6", "60"]],
        ["1 + 0.06 + 0.001", ["1.061", "1.61", "1.601"]],
        ["The 6 in 9.861 is worth", ["0.06", "0.6", "0.006"]],
        ["0.07 × 10", ["0.7", "7", "70"]],
        ["4.18 × 1,000", ["4,180", "41.8", "418"]],
        ["3.8 ÷ 10", ["0.38", "0.038", "0.0038"]],
        ["0.9 ÷ 10", ["0.09", "0.009", "0.0009"]],
        ["23.4 × 100", ["2,340", "234", "23,400"]],
        ["Which digit is in the hundredths place in 7.938?", ["3", "9", "8"]],
        ["How many hundredths make 1 whole?", ["100", "10", "1,000"]],
        ["3 hundredths =", ["0.03", "0.3", "0.003"]],
        ["The 5 in 9.145 is worth", ["0.005", "0.5", "0.05"]],
        ["Which digit is in the hundredths place in 7.318?", ["1", "3", "8"]],
        ["5 ones and 1 hundredths =", ["5.01", "5.1", "5.001"]],
        ["8 ÷ 1,000", ["0.008", "0.8", "0.08"]],
        ["The 3 in 9.253 is worth", ["0.003", "0.3", "0.03"]],
        ["360 ÷ 10", ["36", "3.6", "0.36"]],
        ["6.3 × 100", ["630", "63", "6,300"]],
        ["60 thousandths =", ["0.06", "6", "0.6"]],
        ["360 ÷ 100", ["3.6", "36", "0.36"]],
        ["0.9 ÷ 100", ["0.009", "0.09", "0.0009"]],
        ["The 9 in 8.925 is worth", ["0.9", "0.09", "0.009"]],
        ["9.1 × 10", ["91", "910", "9,100"]],
        ["The 6 in 3.647 is worth", ["0.6", "0.06", "0.006"]],
        ["512 ÷ 100", ["5.12", "51.2", "0.512"]],
        ["0.9 × 100", ["90", "9", "900"]],
        ["73.5 ÷ 10", ["7.35", "0.735", "0.0735"]],
        ["512 ÷ 10", ["51.2", "5.12", "0.512"]],
        ["How many hundredths make 1 tenth?", ["10", "100", "1,000"]],
        ["Which digit is in the thousandths place in 2.586?", ["6", "5", "8"]],
        ["47 ÷ 1,000", ["0.047", "4.7", "0.47"]],
        ["Which digit is in the thousandths place in 1.364?", ["4", "3", "6"]],
        ["204 ÷ 1,000", ["0.204", "20.4", "2.04"]],
        ["9.1 × 100", ["910", "91", "9,100"]],
        ["2.7 × 100", ["270", "27", "2,700"]],
        ["73.5 ÷ 100", ["0.735", "7.35", "0.0735"]],
        ["How many thousandths make 1 whole?", ["1,000", "10", "100"]],
        ["150 ÷ 100", ["1.5", "15", "0.15"]],
        ["12.5 × 1,000", ["12,500", "125", "1,250"]],
        ["0.385 × 10", ["3.85", "38.5", "385"]],
        ["8.75 × 10", ["87.5", "875", "8,750"]],
        ["6 ÷ 100", ["0.06", "0.6", "0.006"]],
        ["6.3 × 10", ["63", "630", "6,300"]],
        ["47 ÷ 10", ["4.7", "0.47", "0.047"]],
        ["6 + 0.01 + 0.009", ["6.019", "6.19", "6.109"]],
        ["Which digit is in the hundredths place in 5.376?", ["7", "3", "6"]],
        ["5.008 × 10", ["50.08", "500.8", "5,008"]],
        ["3 + 0.07 + 0.004", ["3.074", "3.74", "3.704"]],
        ["64 ÷ 10", ["6.4", "0.64", "0.064"]],
        ["The 2 in 5.942 is worth", ["0.002", "0.2", "0.02"]],
        ["The 3 in 8.453 is worth", ["0.003", "0.3", "0.03"]],
        ["5 ones and 2 hundredths =", ["5.02", "5.2", "5.002"]],
        ["8 ones and 2 hundredths =", ["8.02", "8.2", "8.002"]],
        ["5.008 × 1,000", ["5,008", "50.08", "500.8"]],
        ["7.02 × 1,000", ["7,020", "70.2", "702"]],
        ["Which digit is in the tenths place in 6.851?", ["8", "5", "1"]],
        ["How many thousandths make 1 tenth?", ["100", "10", "1,000"]],
        ["0.52 × 1,000", ["520", "5.2", "52"]],
        ["9 + 0.09 + 0.003", ["9.093", "9.93", "9.903"]],
        ["9 thousandths =", ["0.009", "0.9", "0.09"]],
        ["0.3 × 10", ["3", "30", "300"]],
        ["How many tenths make 1 whole?", ["10", "100", "1,000"]],
        ["8.75 × 100", ["875", "87.5", "8,750"]]
      ]
    },
    // My self-check: the goals of the stop. again: the step to practise again for each goal (c = See it, r and a = Practise).
    selfcheck: {
      goals: ["say what each digit of a decimal is worth", "write a decimal from its tenths, hundredths and thousandths", "multiply by 10, 100 and 1,000", "divide by 10, 100 and 1,000"],
      again: ["r", "a", "c", "a"]
    }
  };
})(window.T = window.T || {});
