/* 22-pack-stop6.js - ALL the content of Stop 6, Fractions, decimals and percentages (Grade 5, Cambridge Stage 6:
   6Nf.04, 6Nf.07, 6Nf.08). Every part is here: words, see, practise, notes, test, lightning, selfcheck. The questions
   are data for the Stop 6 models (08-g5-models-s6.js: every calculated answer is worked out there) and the tools of
   39-g5-tools-s6.js. A quantity is text: '3/5', '0.45', '70%'. None of the numbers, names or sentences are those of
   the EOS1 papers. */
(function (T) {
  'use strict';

  const F = window.MX.F;          // a fraction on the page, for the sentences that are written out here

  T.packs[6] = {
    n: 6,
    title: "Fractions, decimals and percentages",
    los: ["6Nf.04", "6Nf.07", "6Nf.08"],
    blurb: {
      en: "Match, compare and order *fractions*, *decimals* and *percentages*.",
      vi: "Nối, so sánh và sắp xếp *phân số*, *số thập phân* và *tỉ số phần trăm*."
    },
    words: {
      sets: [
        { id: 'A', title: { en: 'Percentages', vi: 'Tỉ số phần trăm' }, keys: ['percentage', 'per cent', 'equivalent', 'convert', 'discount'] },
        { id: 'B', title: { en: 'Compare and order', vi: 'So sánh và sắp xếp' }, keys: ['compare', 'greater than', 'less than', 'ascending order', 'descending order'] }
      ],
      items: {
        'percentage': { art: 'w-percentage', vi: 'tỉ số phần trăm', def: 'A number of parts out of 100. We write it with the sign %. 45% means 45 out of 100.' },
        'per cent': { art: 'w-per-cent', vi: 'phần trăm', def: 'Out of every 100. 7 per cent is 7 out of 100. We write 7%.' },
        'equivalent': { art: 'w-equivalent', vi: 'bằng nhau (có cùng giá trị)', def: 'Equal in value. 1/2, 0.5 and 50% are equivalent: they are the same amount.' },
        'convert': { art: 'w-convert', vi: 'đổi (chuyển đổi)', def: 'To change a number into another form. Convert 0.3 into a percentage: 30%.' },
        'discount': { art: 'w-discount', vi: 'giảm giá', def: 'Money taken off a price. A 10% discount on $50 is $5 off. The new price is $45.' },
        'compare': { art: 'w-compare', vi: 'so sánh', def: 'To look at two numbers and say which is greater, or if they are equal. Compare 0.4 and 35%: 0.4 is greater.' },
        'greater than': { art: 'w-greater-than', vi: 'lớn hơn', def: 'Bigger than. The sign is >. 1/2 > 0.4, because 1/2 = 50% and 0.4 = 40%.' },
        'less than': { art: 'w-less-than', vi: 'bé hơn', def: 'Smaller than. The sign is <. 20% < 1/4, because 1/4 = 25%.' },
        'ascending order': { art: 'w-ascending-order', vi: 'thứ tự tăng dần', def: 'From the smallest to the largest. 0.2, 1/4, 30% are in ascending order.' },
        'descending order': { art: 'w-descending-order', vi: 'thứ tự giảm dần', def: 'From the largest to the smallest. 30%, 1/4, 0.2 are in descending order.' }
      }
    },
    // See it: Concrete. Shade a hundred square and watch the fraction, the decimal and the percentage change
    // together; put a fraction, a decimal and a percentage on one number line; then the challenge.
    see: {
      scenes: [
        { id: 'grid', title: { en: 'Out of 100', vi: 'Trên 100' }, tool: 'pgrid', pgrid: { shade: 0, show: 'nfdp' },
          steps: [
            { can: { shade: true, to: 10 }, wait: 'shade', until: { shade: 10 },
              zip: { en: 'This square has *100* small squares. Tap *+ 10*.', vi: 'Hình vuông này có *100* ô nhỏ. Bấm *+ 10*.' },
              then: { en: '*10 out of 100* is *10%*. That is 0.1.', vi: '*10 trên 100* là *10%*. Đó là 0.1.' } },
            { can: { shade: true, to: 50 }, wait: 'shade', until: { shade: 50 },
              zip: { en: 'Now shade *half* of the square.', vi: 'Bây giờ tô màu *một nửa* hình vuông.' },
              then: { en: '*50%* = 0.5 = 1/2. Three ways, one number.', vi: '*50%* = 0.5 = 1/2. Ba cách viết, một số.' } },
            { can: { shade: true, to: 51 }, wait: 'shade', until: { shade: 51 },
              zip: { en: 'Tap *+ 1*. One small square is *1%*.', vi: 'Bấm *+ 1*. Một ô nhỏ là *1%*.' },
              then: { en: '*51%* = 0.51 = 51/100.', vi: '*51%* = 0.51 = 51/100.' } },
            { can: { shade: true, to: 75 }, wait: 'shade', until: { shade: 75 },
              zip: { en: 'Now make *75%*. Use both buttons.', vi: 'Bây giờ tạo *75%*. Dùng cả hai nút.' },
              then: { en: '*75%* = 0.75 = 3/4. Tap *Next*.', vi: '*75%* = 0.75 = 3/4. Bấm *Next*.' } }] },
        { id: 'line', title: { en: 'On the number line', vi: 'Trên trục số' }, tool: 'fdpline', fdpline: { cards: ['1/2', '0.25', '70%', '9/10'], scale: 'p' },
          steps: [
            { can: { place: ['1/2'] }, wait: 'place', until: { placed: 1 },
              zip: { en: 'Where is *1/2* on the line? Tap the card.', vi: '*1/2* ở đâu trên trục số? Bấm vào thẻ.' },
              then: { en: '*1/2 = 50%*. It is in the middle.', vi: '*1/2 = 50%*. Nó ở chính giữa.' } },
            { can: { place: ['0.25'] }, wait: 'place', until: { placed: 2 },
              zip: { en: 'Now tap the card *0.25*.', vi: 'Bây giờ bấm vào thẻ *0.25*.' },
              then: { en: '*0.25 = 25%*. It is left of 1/2: *less*.', vi: '*0.25 = 25%*. Nó ở bên trái 1/2: *bé hơn*.' } },
            { can: { place: true }, wait: 'place', until: { placed: 4 },
              zip: { en: 'Put *70%* and *9/10* on the line too.', vi: 'Đặt *70%* và *9/10* lên trục số nữa.' },
              then: { en: 'Left to right is *ascending order*. Tap *Next*.', vi: 'Từ trái sang phải là *thứ tự tăng dần*. Bấm *Next*.' } }] },
        { id: 'challenge', title: { en: 'Percent challenge', vi: 'Thử thách phần trăm' },
          challenge: {
            end: { en: 'You did it! You can match and compare them.', vi: 'Em làm được rồi! Em biết nối và so sánh chúng.' },
            result: 'You matched fractions, decimals and percentages.',
            rounds: [
          { mode: "our", lo: ["6Nf.04"], v: [
            {"type":"pshade","v":"20%"},
            {"type":"pshade","v":"0.5"},
            {"type":"pshade","v":"1/4"}] },
          { mode: "your", lo: ["6Nf.04"], v: [
            {"type":"pread","shade":36},
            {"type":"pread","shade":3},
            {"type":"pread","shade":70}] },
          { mode: "your", lo: ["6Nf.04"], v: [
            {"type":"lplace","v":"1/5"},
            {"type":"lplace","v":"0.45"},
            {"type":"lplace","v":"30%"}] },
          { mode: "your", lo: ["6Nf.08"], v: [
            {"type":"pcmp","line":true,"items":[{"a":"1/4","b":"0.3"}]},
            {"type":"pcmp","line":true,"items":[{"a":"60%","b":"9/20"}]},
            {"type":"pcmp","line":true,"items":[{"a":"0.5","b":"1/2"}]}] },
          { mode: "your", lo: ["6Nf.08"], v: [
            {"type":"porder","items":["0.5","1/5","35%"]},
            {"type":"porder","items":["3/4","0.6","90%"]},
            {"type":"porder","items":["1/10","0.25","15%"]}] }] } }]
    },
    // Practise: Pictorial (Draw it: the hundred square, shapes, the bar, the number line, the cards) then Abstract
    // (Solve it, like the test).
    practise: [
      { id: 's6r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Use the hundred square and the number line.', vi: 'Dùng bảng một trăm ô và trục số.' },
        levels: [
      { title: { en: "The hundred square", vi: "Bảng một trăm ô" }, rounds: [
          { mode: "our", lo: ["6Nf.04"], twm: ["TWM.05"], v: [
            {"type":"pshade","v":"35%"},
            {"type":"pshade","v":"0.6"},
            {"type":"pshade","v":"7/10"}] },
          { mode: "your", lo: ["6Nf.04"], twm: ["TWM.05"], v: [
            {"type":"pread","shade":48},
            {"type":"pread","shade":7},
            {"type":"pread","shade":90}] }] },
      { title: { en: "Shapes and amounts", vi: "Hình và số lượng" }, rounds: [
          { mode: "your", lo: ["6Nf.07"], twm: ["TWM.01"], v: [
            {"type":"pshade","v":"40%","r":2,"c":5},
            {"type":"pshade","v":"25%","r":4,"c":5},
            {"type":"pshade","v":"20%","r":5,"c":5}] },
          { mode: "your", lo: ["6Nf.07"], twm: ["TWM.02"], v: [
            {"type":"pof","bar":true,"items":[{"p":30,"n":60}]},
            {"type":"pof","bar":true,"items":[{"p":75,"n":40}]},
            {"type":"pof","bar":true,"items":[{"p":15,"n":80}]}] }] },
      { title: { en: "The number line", vi: "Trục số" }, rounds: [
          { mode: "your", lo: ["6Nf.08"], twm: ["TWM.05"], v: [
            {"type":"pcmp","line":true,"items":[{"a":"3/4","b":"0.8"}]},
            {"type":"pcmp","line":true,"items":[{"a":"1/2","b":"45%"}]},
            {"type":"pcmp","line":true,"items":[{"a":"0.35","b":"7/20"}]}] },
          { mode: "your", lo: ["6Nf.08"], twm: ["TWM.06"], v: [
            {"type":"porder","items":["0.3","1/4","45%","2/5"]},
            {"type":"porder","dir":"desc","items":["9/10","0.75","80%","0.7"]},
            {"type":"porder","items":["15%","1/5","0.1","0.12"]}] }] }] },
      { id: 's6a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Equal values", vi: "Các giá trị bằng nhau" }, rounds: [
          { mode: "your", lo: ["6Nf.04"], twm: ["TWM.02"], v: [
            {"type":"pconv","items":[{"v":"9/10"},{"v":"0.07","ask":"p"}]},
            {"type":"pconv","items":[{"v":"1/4"},{"v":"0.3","ask":"p"}]},
            {"type":"pconv","items":[{"v":"13/25"},{"v":"0.09","ask":"p"}]}] },
          { mode: "your", lo: ["6Nf.04"], twm: ["TWM.02"], v: [
            {"type":"pconv","items":[{"v":"20%","ask":"fd"}]},
            {"type":"pconv","items":[{"v":"0.75","ask":"fp"}]},
            {"type":"pconv","items":[{"v":"45%","ask":"fd"}]}] },
          { mode: "your", lo: ["6Nf.04"], twm: ["TWM.01"], v: [
            {"type":"psame","v":"0.3","at":1,"opts":["3/10","3%","0.03"]},
            {"type":"psame","v":"45%","at":2,"opts":["9/20","4/5","4.5"]},
            {"type":"psame","v":"1/5","at":0,"opts":["20%","0.5","15%"]}] }] },
      { title: { en: "Percentages", vi: "Tỉ số phần trăm" }, rounds: [
          { mode: "your", lo: ["6Nf.07"], twm: ["TWM.05"], v: [
            {"type":"pshape","r":2,"c":5,"shade":3},
            {"type":"pshape","r":4,"c":5,"shade":9},
            {"type":"pshape","r":4,"c":5,"shade":5,"not":true}] },
          { mode: "your", lo: ["6Nf.07"], twm: ["TWM.02"], v: [
            {"type":"pof","items":[{"p":10,"n":90},{"p":25,"n":48}]},
            {"type":"pof","items":[{"p":50,"n":70},{"p":5,"n":60}]},
            {"type":"pof","items":[{"p":20,"n":35},{"p":1,"n":400}]}] },
          { mode: "your", lo: ["6Nf.07"], twm: ["TWM.01"], v: [
            {"type":"pchange","n":60,"p":20,"dir":"less","pre":"$","labs":["Discount","Sale price"],"text":"A kite costs <b>$60</b>. In a sale there is a <b>20%</b> [[discount]]. Find the discount. Then find the sale price."},
            {"type":"pchange","n":40,"p":15,"dir":"more","unit":"cm","labs":["It grows","New height"],"text":"A plant is <b>40</b> cm tall. In one month it grows <b>15%</b> taller. How much does it grow? How tall is it now?"},
            {"type":"pchange","n":50,"p":30,"dir":"less","pre":"$","labs":["Discount","Sale price"],"text":"A school bag costs <b>$50</b>. In a sale there is a <b>30%</b> [[discount]]. Find the discount. Then find the sale price."}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["6Nf.08"], twm: ["TWM.06"], v: [
            {"type":"pordopt","at":1,"items":["0.4","35%","3/10","9/20"]},
            {"type":"pordopt","at":2,"dir":"desc","items":["4/5","0.78","72%","3/4"]},
            {"type":"pordopt","at":0,"items":["1/5","0.25","15%","0.22"]}] },
          { mode: "your", lo: ["6Nf.08"], twm: ["TWM.07", "TWM.04"], v: [
            {"type":"claim","who":"Kim","ok":false,"at":1,"says":"0.4 is less than 0.25, because 4 is less than 25.","reasons":[{"t":"0.4 = 0.40. That is 40 hundredths, and 40 hundredths is more than 25 hundredths."},{"t":"0.25 has more digits than 0.4, so 0.25 is the greater number.","why":"More digits after the decimal point do not make a number greater. Write 0.4 as 0.40."},{"t":"25 is greater than 4, so 0.25 is greater than 0.4.","why":"Compare the tenths first: 0.4 has 4 tenths and 0.25 has only 2 tenths."}],"hint":{"pic":{"k":"fdpline","cards":["0.4","0.25"]},"step":"Change both decimals into percentages. Then compare."},"worked":"0.4 = 40% and 0.25 = 25%. 40% is greater than 25%, so 0.4 is greater than 0.25.","model":"Kim is incorrect because 0.4 is 40 hundredths and 0.25 is only 25 hundredths."},
            {"type":"claim","who":"Son","ok":true,"at":2,"says":F(7, 20) + " is less than 0.4.","reasons":[{"t":F(7, 20) + " = " + F(35, 100) + " = 35% and 0.4 = 40%. 35% is less than 40%."},{"t":"7 is greater than 4, so " + F(7, 20) + " is greater than 0.4.","why":"You cannot compare 7 and 4 as they are. Change both numbers into percentages."},{"t":F(7, 20) + " = 0.7, and 0.7 is greater than 0.4.","why":F(7, 20) + " is not 7 tenths. Make the denominator 100: " + F(7, 20) + " = " + F(35, 100) + "."}],"hint":{"pic":{"k":"pgrid","r":4,"c":5,"shade":7,"cap":"7 out of 20"},"step":"Make the denominator 100: 20 × 5 = 100. Then write 0.4 as a percentage too."},"worked":F(7, 20) + " = " + F(35, 100) + " = 35%. 0.4 = 40%. 35% is less than 40%, so " + F(7, 20) + " is less than 0.4.","model":"Son is correct because " + F(7, 20) + " is 35% and 0.4 is 40%."},
            {"type":"claim","who":"Hanh","ok":false,"at":0,"says":"30% is greater than 0.5, because 30 is greater than 5.","reasons":[{"t":"0.5 = 50%, and 30% is less than 50%."},{"t":"30 is a bigger number than 0.5.","why":"30% is not the number 30. It means 30 out of 100, and that is 0.3."},{"t":"a percentage is always greater than a decimal.","why":"Not always. 0.5 = 50%, and 50% is greater than 30%."}],"hint":{"pic":[{"k":"hgrid","shade":30,"cols":true,"cap":"30%"},{"k":"hgrid","shade":50,"cols":true,"cap":"0.5"}],"step":"Change 0.5 into a percentage. Then compare the two percentages."},"worked":"0.5 = 5 tenths = 50 hundredths = 50%. 30% is less than 50%, so 30% is less than 0.5.","model":"Hanh is incorrect because 0.5 is 50%, and 30% is less than 50%."}] }] }] }
    ],
    // Notes: how to do it, each with a worked example and a picture made by the maths tools; then one gap
    // sentence per note, in the same order (the first choice in the braces is the right one).
    notes: {
      items: [
        { en: '[[Per cent]] means "out of 100". A [[percentage]] is a number of hundredths. 1% is 1 out of 100.',
          vi: 'Phần trăm nghĩa là "trên 100". Tỉ số phần trăm cho biết có bao nhiêu phần trong 100 phần. 1% là 1 trên 100.',
          example: ['37 squares out of 100 are shaded.', '37% = 37/100 = *0.37*'],
          pic: { k: 'hgrid', shade: 37, cols: true, cap: '37 out of 100' } },
        { en: 'A fraction, a decimal and a percentage can be [[equivalent]]: three ways to write one number. To [[convert]] a fraction into a percentage, make the denominator 100 (multiply the top and the bottom by the same number).',
          vi: 'Phân số, số thập phân và tỉ số phần trăm có thể bằng nhau: ba cách viết của cùng một số. Để đổi phân số thành tỉ số phần trăm, hãy đưa mẫu số về 100 (nhân cả tử số và mẫu số với cùng một số).',
          example: ['9/20 = 45/100 (multiply the top and the bottom by 5)', '45/100 = *45%* = *0.45*'],
          pic: { k: 'hgrid', shade: 45, cols: true, cap: '9/20 = 45/100' } },
        { en: 'To change a decimal into a percentage, multiply by 100. To change a percentage into a decimal, divide by 100.',
          vi: 'Để đổi số thập phân thành tỉ số phần trăm, nhân với 100. Để đổi tỉ số phần trăm thành số thập phân, chia cho 100.',
          example: ['0.4 = *40%*', '0.04 = *4%*', '85% = *0.85*'],
          pic: [{ k: 'hgrid', shade: 40, cols: true, cap: '0.4 = 40%' }, { k: 'hgrid', shade: 4, cols: true, cap: '0.04 = 4%' }] },
        { en: '50% is one half. 25% is one quarter. 10% is one tenth. 1% is one hundredth. Use 10% to find 5%, 20%, 30% and more.',
          vi: '50% là một nửa. 25% là một phần tư. 10% là một phần mười. 1% là một phần trăm. Dùng 10% để tìm 5%, 20%, 30% và nhiều hơn nữa.',
          example: ['10% of 60 = 60 ÷ 10 = *6*', '5% of 60 = half of 6 = *3*', '15% of 60 = 6 + 3 = *9*'],
          pic: { k: 'pctbar', n: 60, parts: 20, take: 3 } },
        { en: 'To [[compare]] a fraction, a decimal and a percentage, change them into the same form. Then write < (is [[less than]]), > (is [[greater than]]) or =.',
          vi: 'Để so sánh phân số, số thập phân và tỉ số phần trăm, hãy đổi chúng về cùng một dạng. Rồi viết < (bé hơn), > (lớn hơn) hoặc =.',
          example: ['Compare 3/4 and 0.8.', '3/4 = 75% and 0.8 = 80%', '75% < 80%, so *3/4 < 0.8*'],
          pic: { k: 'fdpline', cards: ['3/4', '0.8'] } },
        { en: '[[Ascending order]] goes from the smallest to the largest. [[Descending order]] goes from the largest to the smallest.',
          vi: 'Thứ tự tăng dần đi từ số bé nhất đến số lớn nhất. Thứ tự giảm dần đi từ số lớn nhất đến số bé nhất.',
          example: ['Order 0.5, 1/5 and 35%.', '0.5 = 50% and 1/5 = 20%', 'Ascending order: *1/5, 35%, 0.5*'],
          pic: { k: 'ftiles', items: ['0.5', '1/5', '35%'], seq: '1,2,0' } },
        { en: 'A [[discount]] makes a price smaller. First find the percentage of the price. Then take it away from the price.',
          vi: 'Giảm giá làm cho giá tiền nhỏ đi. Trước tiên tìm số tiền được giảm (tìm giá trị phần trăm của giá tiền, ví dụ 10% của 30). Rồi lấy giá tiền trừ đi số đó.',
          example: ['A hat costs $30. The discount is 10%.', '10% of 30 = *3*', '30 − 3 = *27*. The new price is $27.'],
          pic: { k: 'pctbar', n: 30, parts: 10, take: 1, cut: true, pre: '$' } }
      ],
      check: [
        { sentence: '9% means 9 out of {100|10|1,000}.', answer: '100' },
        { sentence: '7/20 = {35%|27%|7%}.', answer: '35%' },
        { sentence: '0.06 = {6%|60%|0.6%}.', answer: '6%' },
        { sentence: '25% of 44 = {11|22|4}.', answer: '11' },
        { sentence: '0.3 is {greater than|less than|equal to} 25%.', answer: 'greater than' },
        { sentence: 'In descending order: {1/2, 40%, 0.3|0.3, 40%, 1/2|40%, 0.3, 1/2}.', answer: '1/2, 40%, 0.3' },
        { sentence: 'A toy costs $20. With a 50% discount it costs {$10|$15|$30}.', answer: '$10' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard: 5 at DOK 1, 4 at DOK 2, 1 at DOK 3 (T.DOK_MIX), each with
    // lo, twm and 3 sets of numbers (play 1 uses v[0]). No tool on the paper: boxes, ticks and claims.
    test: {
      items: [
        { dok: 1, lo: ["6Nf.04"], twm: ["TWM.02"], v: [
          {"type":"pconv","items":[{"v":"4/5"}]},
          {"type":"pconv","items":[{"v":"11/20"}]},
          {"type":"pconv","items":[{"v":"3/25"}]}
        ] },
        { dok: 1, lo: ["6Nf.04"], twm: ["TWM.01"], v: [
          {"type":"psame","v":"0.08","at":1,"opts":["8%","80%","0.8"]},
          {"type":"psame","v":"60%","at":0,"opts":["3/5","6/100","6/50"]},
          {"type":"psame","v":"1/20","at":2,"opts":["5%","20%","0.2"]}
        ] },
        { dok: 1, lo: ["6Nf.07"], twm: ["TWM.05"], v: [
          {"type":"pshape","r":5,"c":5,"shade":14},
          {"type":"pshape","r":4,"c":5,"shade":3},
          {"type":"pshape","r":5,"c":5,"shade":10}
        ] },
        { dok: 1, lo: ["6Nf.07"], twm: ["TWM.02"], v: [
          {"type":"pof","items":[{"p":10,"n":130}]},
          {"type":"pof","items":[{"p":50,"n":86}]},
          {"type":"pof","items":[{"p":25,"n":36}]}
        ] },
        { dok: 1, lo: ["6Nf.07"], twm: ["TWM.02"], v: [
          {"type":"pof","items":[{"p":5,"n":220}]},
          {"type":"pof","items":[{"p":1,"n":600}]},
          {"type":"pof","items":[{"p":20,"n":95}]}
        ] },
        { dok: 2, lo: ["6Nf.08"], twm: ["TWM.06"], v: [
          {"type":"pordopt","at":2,"items":["0.3","1/4","35%","0.28","2/5"]},
          {"type":"pordopt","at":0,"dir":"desc","items":["9/10","0.85","88%","4/5","0.95"]},
          {"type":"pordopt","at":1,"items":["1/2","45%","0.55","11/25","0.6"]}
        ] },
        { dok: 2, lo: ["6Nf.07"], twm: ["TWM.01"], v: [
          {"type":"pchange","n":140,"p":45,"dir":"less","pre":"$","text":"A board game costs <b>$140</b>. In a sale its price is <b>45%</b> less. What is the sale price?"},
          {"type":"pchange","n":120,"p":10,"dir":"more","unit":"members","text":"Last year a chess club had <b>120</b> members. This year it has <b>10%</b> more members. How many members does the club have this year?"},
          {"type":"pchange","n":200,"p":35,"dir":"less","unit":"litres","text":"A tank holds <b>200</b> litres of water. A farmer uses <b>35%</b> of the water. How much water is left in the tank?"}
        ] },
        { dok: 2, lo: ["6Nf.08"], twm: ["TWM.04"], v: [
          {"type":"pwho","a":{"who":"Trang","v":"3/4"},"b":{"who":"Phong","v":"70%"},"same":"They have planted the same amount","text":"Trang and Phong each have a garden of the same size. Trang has planted " + F(3, 4) + " of her garden. Phong has planted <b>70%</b> of his garden. Who has planted more?"},
          {"type":"pwho","a":{"who":"Thu","v":"0.4"},"b":{"who":"Hung","v":"2/5"},"same":"They have finished the same amount","text":"Thu and Hung each have the same jigsaw puzzle. Thu has finished <b>0.4</b> of her puzzle. Hung has finished " + F(2, 5) + " of his puzzle. Who has finished more?"},
          {"type":"pwho","ask":"less","a":{"who":"Giang","v":"0.8"},"b":{"who":"Binh","v":"17/20"},"same":"They have painted the same amount","text":"Giang and Binh each paint a wall of the same size. Giang has painted <b>0.8</b> of her wall. Binh has painted " + F(17, 20) + " of his wall. Who has painted less?"}
        ] },
        { dok: 2, lo: ["6Nf.04"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Tam","ok":false,"at":2,"says":"0.5 is the same as 5%.","reasons":[{"t":"0.5 = " + F(5, 10) + " = " + F(50, 100) + " = 50%. And 5% is only 0.05."},{"t":"0.5 and 5% both have the digit 5.","why":"The place of the 5 matters. 0.5 is 5 tenths. 5% is 5 hundredths."},{"t":"0.5 = " + F(5, 100) + ", and " + F(5, 100) + " = 5%.","why":"0.5 is 5 tenths, not 5 hundredths. 5 tenths = 50 hundredths."}],"hint":{"pic":[{"k":"hgrid","shade":50,"cols":true,"cap":"0.5"},{"k":"hgrid","shade":5,"cols":true,"cap":"5%"}],"step":"Write 0.5 as hundredths. How many squares out of 100 is that?"},"worked":"0.5 = 5 tenths = 50 hundredths = 50%. 5% = 5 hundredths = 0.05. They are not the same.","model":"Tam is incorrect because 0.5 is 50%, not 5%."},
          {"type":"claim","who":"Yen","ok":true,"at":0,"says":F(6, 25) + " is the same as 0.24.","reasons":[{"t":F(6, 25) + " = " + F(24, 100) + ", because 6 × 4 = 24 and 25 × 4 = 100. And " + F(24, 100) + " = 0.24."},{"t":F(6, 25) + " = 0.6, because the top number is 6.","why":"0.6 is " + F(6, 10) + ", not " + F(6, 25) + ". Make the denominator 100 first: multiply the top and the bottom by 4."},{"t":"a fraction and a decimal can never be the same.","why":"They can be equivalent: " + F(1, 2) + " = 0.5. Make the denominator 100 and look again."}],"hint":{"pic":{"k":"hgrid","shade":24,"cols":true,"cap":"0.24"},"step":"Make the denominator 100. 25 × 4 = 100, so multiply the top by 4 too."},"worked":F(6, 25) + " = " + F(24, 100) + " (multiply the top and the bottom by 4). " + F(24, 100) + " = 0.24. So they are the same.","model":"Yen is correct because " + F(6, 25) + " = " + F(24, 100) + " = 0.24."},
          {"type":"claim","who":"Hai","ok":true,"at":1,"says":F(3, 50) + " is the same as 6%.","reasons":[{"t":F(3, 50) + " = " + F(6, 100) + ", because 3 × 2 = 6 and 50 × 2 = 100. And " + F(6, 100) + " = 6%."},{"t":F(3, 50) + " = 0.3, and 0.3 = 30%.","why":F(3, 50) + " is not 3 tenths. Make the denominator 100: multiply the top and the bottom by 2."},{"t":"the denominator is 50, so " + F(3, 50) + " = 50%.","why":"The denominator is the number of equal parts. Make it 100 to read the percentage."}],"hint":{"pic":{"k":"pgrid","r":5,"c":10,"shade":3,"cap":"3 out of 50"},"step":"Make the denominator 100. 50 × 2 = 100, so multiply the top by 2 too."},"worked":F(3, 50) + " = " + F(6, 100) + " (multiply the top and the bottom by 2). " + F(6, 100) + " = 6%.","model":"Hai is correct because " + F(3, 50) + " = " + F(6, 100) + " = 6%."}
        ] },
        { dok: 3, lo: ["6Nf.08"], twm: ["TWM.07", "TWM.01"], v: [
          {"type":"claim","who":"Dung","ok":false,"at":1,"says":"A fraction with a bigger denominator is always the smaller fraction.","reasons":[{"t":F(9, 10) + " has a bigger denominator than " + F(1, 2) + ", but " + F(9, 10) + " = 90% is greater than " + F(1, 2) + " = 50%. One example like this shows the rule is not always true."},{"t":F(1, 10) + " is smaller than " + F(1, 2) + ", so a bigger denominator always makes a smaller fraction.","why":"That example fits, but one example does not prove a rule. Try a fraction with a bigger numerator, like " + F(9, 10) + "."},{"t":"the denominator is the only number you need to compare two fractions.","why":"The numerator matters too. Compare " + F(9, 10) + " and " + F(1, 2) + "."}],"hint":{"pic":{"k":"fdpline","cards":["1/10","1/2","9/10"]},"step":"Test the rule. Try " + F(1, 10) + " and " + F(1, 2) + ". Then try " + F(9, 10) + " and " + F(1, 2) + "."},"worked":F(1, 10) + " = 10% is less than " + F(1, 2) + " = 50%: the rule fits. But " + F(9, 10) + " = 90% is greater than " + F(1, 2) + " = 50%, and 10 is a bigger denominator than 2. So the rule is not always true.","model":"Dung is incorrect because " + F(9, 10) + " is greater than " + F(1, 2) + ", and its denominator is bigger."},
          {"type":"claim","who":"Linh","ok":true,"at":2,"says":"A decimal that starts with 0.0, like 0.04, is always less than 10%.","reasons":[{"t":"10% = " + F(10, 100) + " = 0.1. A decimal that starts with 0.0 has 0 tenths, so it is always less than 0.1. Even 0.09 = 9% is less than 10%."},{"t":"it only works for 0.04, because 4 is less than 10.","why":"Try more numbers. 0.01 = 1% and 0.09 = 9%. They are all less than 10%."},{"t":"a decimal is always less than a percentage.","why":"Not always. 0.5 = 50%, and 50% is greater than 10%. Look at the tenths digit."}],"hint":{"pic":[{"k":"hgrid","shade":9,"cols":true,"cap":"0.09"},{"k":"hgrid","shade":10,"cols":true,"cap":"10%"}],"step":"Change 10% into a decimal. Then test the rule with 0.04 and 0.09."},"worked":"10% = " + F(10, 100) + " = 0.1. A decimal that starts with 0.0 has 0 tenths, so it is less than 1 tenth. For example, 0.04 = 4% and 0.09 = 9%, and both are less than 10%. So the rule is always true.","model":"Linh is correct because 10% = 0.1, and a decimal that starts with 0.0 has 0 tenths, so it is less than 0.1."},
          {"type":"claim","who":"Binh","ok":false,"at":0,"says":"A decimal with two decimal places is always greater than a decimal with one decimal place.","reasons":[{"t":"0.25 has two decimal places and 0.3 has one, but 0.25 = 25% is less than 0.3 = 30%. One example like this shows the rule is not always true."},{"t":"0.75 is greater than 0.5, so two decimal places always make a greater number.","why":"That example fits, but one example does not prove a rule. Try 0.25 and 0.3."},{"t":"a number with more digits is always greater.","why":"That is true for whole numbers, not for decimals. 0.3 = 0.30, and 30 hundredths is more than 25 hundredths."}],"hint":{"pic":{"k":"fdpline","cards":["0.25","0.3","0.75"]},"step":"Test the rule. Try 0.75 and 0.5. Then try 0.25 and 0.3."},"worked":"0.75 is greater than 0.5: the rule fits. But 0.25 = 25% is less than 0.3 = 30%. So the rule is not always true.","model":"Binh is incorrect because 0.25 is less than 0.3."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). Made and checked by
    // tools/gen_lightning_s6.py (python3 tools/gen_lightning_s6.py --write puts them between the two marks).
    lightning: {
      secs: 60,
      items: [
        /*LIGHTNING-START*/
        ["3% as a decimal", ["0.03", "0.3", "0.003"]],
        ["9 out of 20 as a percentage", ["45%", "9%", "20%"]],
        ["90% as a decimal", ["0.9", "9", "0.09"]],
        ["3/4 as a percentage", ["75%", "43%", "34%"]],
        ["Which is greater: 1/5 or 0.25?", ["0.25", "1/5", "They are equal"]],
        ["1 out of 5 as a percentage", ["20%", "1%", "5%"]],
        ["25% off $40. New price:", ["$30", "$10", "$50"]],
        ["13 out of 50 as a percentage", ["26%", "13%", "50%"]],
        ["10% as a fraction", ["1/10", "1/100", "10/10"]],
        ["2% as a fraction", ["1/50", "1/2", "2/10"]],
        ["Which is greater: 2/5 or 0.5?", ["0.5", "2/5", "They are equal"]],
        ["30% of 50", ["15", "5", "35"]],
        ["50% as a decimal", ["0.5", "5", "0.05"]],
        ["70% as a decimal", ["0.7", "7", "0.07"]],
        ["4 out of 25 as a percentage", ["16%", "4%", "25%"]],
        ["10% off $40. New price:", ["$36", "$4", "$44"]],
        ["3/10 as a percentage", ["30%", "10%", "3%"]],
        ["35% of a shape is shaded. Not shaded:", ["65%", "35%", "75%"]],
        ["1/50 as a percentage", ["2%", "10%", "50%"]],
        ["0.9 as a percentage", ["90%", "9%", "0.9%"]],
        ["1/10 as a percentage", ["10%", "1%", "0.1%"]],
        ["25% off $60. New price:", ["$45", "$15", "$75"]],
        ["10% off $90. New price:", ["$81", "$9", "$99"]],
        ["21 out of 50 as a percentage", ["42%", "21%", "50%"]],
        ["90% of a shape is shaded. Not shaded:", ["10%", "90%", "1%"]],
        ["35% as a fraction", ["7/20", "7/2", "1/35"]],
        ["Which is greater: 3/10 or 0.25?", ["3/10", "0.25", "They are equal"]],
        ["50% of 90", ["45", "9", "90"]],
        ["20% as a fraction", ["1/5", "2/100", "1/20"]],
        ["1% of 700", ["7", "70", "700"]],
        ["5% of 40", ["2", "4", "8"]],
        ["Which is greater: 0.6 or 55%?", ["0.6", "55%", "They are equal"]],
        ["10% of 50", ["5", "500", "0.5"]],
        ["9/10 as a percentage", ["90%", "10%", "9%"]],
        ["Which is greater: 3/10 or 30%?", ["They are equal", "3/10", "30%"]],
        ["45% of a shape is shaded. Not shaded:", ["55%", "45%", "65%"]],
        ["1% as a fraction", ["1/100", "1/1", "1/10"]],
        ["1/25 as a percentage", ["4%", "10%", "25%"]],
        ["20% of 50", ["10", "5", "40"]],
        ["Which is greater: 1/4 or 25%?", ["They are equal", "1/4", "25%"]],
        ["30% as a decimal", ["0.3", "3", "0.03"]],
        ["45% as a decimal", ["0.45", "4.5", "0.045"]],
        ["Which is greater: 0.5 or 9/20?", ["0.5", "9/20", "They are equal"]],
        ["5% of 200", ["10", "20", "40"]],
        ["75% of 20", ["15", "2", "5"]],
        ["7/50 as a percentage", ["14%", "70%", "50%"]],
        ["0.06 as a percentage", ["6%", "60%", "0.06%"]],
        ["85% of a shape is shaded. Not shaded:", ["15%", "85%", "25%"]],
        ["0.6 as a percentage", ["60%", "6%", "0.6%"]],
        ["50% as a fraction", ["1/2", "5/100", "1/50"]],
        ["45% as a fraction", ["9/20", "1/45", "4/5"]],
        ["0.45 as a percentage", ["45%", "4.5%", "0.45%"]],
        ["10% of 70", ["7", "63", "14"]],
        ["20% off $50. New price:", ["$40", "$10", "$60"]],
        ["20% off $30. New price:", ["$24", "$6", "$36"]],
        ["60% as a decimal", ["0.6", "6", "0.06"]],
        ["50% of 18", ["9", "18", "36"]],
        ["0.07 as a percentage", ["7%", "70%", "0.07%"]],
        ["25% of 40", ["10", "4", "30"]],
        ["1/2 as a percentage", ["50%", "12%", "10%"]],
        ["40% of 25", ["10", "15", "4"]],
        ["1/4 as a percentage", ["25%", "14%", "10%"]],
        ["30% of a shape is shaded. Not shaded:", ["70%", "30%", "7%"]],
        ["0.2 as a percentage", ["20%", "2%", "0.2%"]],
        ["20% of 30", ["6", "3", "24"]],
        ["0.3 as a percentage", ["30%", "3%", "0.3%"]],
        ["1/5 as a percentage", ["20%", "15%", "10%"]],
        ["Which is greater: 0.35 or 3/10?", ["0.35", "3/10", "They are equal"]],
        ["Which is greater: 0.4 or 35%?", ["0.4", "35%", "They are equal"]],
        ["1% of 300", ["3", "30", "300"]],
        ["0.01 as a percentage", ["1%", "10%", "0.01%"]],
        ["25% of 200", ["50", "20", "8"]],
        ["7/20 as a percentage", ["35%", "70%", "20%"]],
        ["0.25 as a percentage", ["25%", "2.5%", "0.25%"]],
        ["Which is greater: 1/5 or 0.18?", ["1/5", "0.18", "They are equal"]],
        ["Which is greater: 2/5 or 45%?", ["45%", "2/5", "They are equal"]],
        ["2% as a decimal", ["0.02", "0.2", "0.002"]],
        ["Which is greater: 0.2 or 1/4?", ["1/4", "0.2", "They are equal"]],
        ["0.32 as a percentage", ["32%", "3.2%", "0.32%"]],
        ["3 out of 4 as a percentage", ["75%", "3%", "4%"]],
        ["75% as a fraction", ["3/4", "1/75", "7/5"]],
        ["30% as a fraction", ["3/10", "3/100", "1/30"]],
        ["100% of 37", ["37", "74", "0.37"]],
        ["25% as a fraction", ["1/4", "1/25", "2/5"]],
        ["15% of 60", ["9", "6", "4"]],
        ["95% as a fraction", ["19/20", "1/95", "9/5"]],
        ["9/25 as a percentage", ["36%", "90%", "25%"]]
        /*LIGHTNING-END*/
      ]
    },
    // My self-check: the goals of the stop. again: the step to practise again for each goal (c = See it, r and a = Practise).
    selfcheck: {
      goals: ["write a fraction, a decimal and a percentage with the same value", "find a percentage of a shape", "find a percentage of a whole number", "compare fractions, decimals and percentages with <, > and =", "put fractions, decimals and percentages in order"],
      again: ["c", "r", "a", "r", "a"]
    }
  };
})(window.T = window.T || {});
