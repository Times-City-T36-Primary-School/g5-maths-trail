/* 22-pack-stop2.js - ALL the content of Stop 2, Round, add and subtract decimals (Grade 5, Cambridge Stage 6:
   6Np.04, 6Nf.09). Every part is here: words, see, practise, notes, test, lightning, selfcheck. The questions are
   data for the Stop 2 models (08-g5-models-s2.js) and the tools of 39-g5-tools-s2.js (the rounding line and the
   column tool). None of the numbers, names or sentences are those of the EOS1 papers. */
(function (T) {
  'use strict';

  T.packs[2] = {
    n: 2,
    title: "Round, add and subtract decimals",
    los: ["6Np.04", "6Nf.09"],
    blurb: {
      en: "Round *decimals* to the nearest tenth or whole number. Add and subtract decimals.",
      vi: "Làm tròn *số thập phân* đến hàng phần mười hoặc số tự nhiên gần nhất. Cộng và trừ số thập phân."
    },
    words: {
      sets: [
        { id: 'A', title: { en: 'Rounding', vi: 'Làm tròn số' }, keys: ['round', 'nearest', 'halfway', 'whole number'] },
        { id: 'B', title: { en: 'Add and subtract', vi: 'Cộng và trừ' }, keys: ['estimate', 'sum', 'difference'] },
        { id: 'C', title: { en: 'Written method', vi: 'Đặt tính rồi tính' }, keys: ['line up', 'exchange', 'working'] }
      ],
      items: {
        'round': { art: 'w-round', vi: 'làm tròn', def: 'To change a number to a near number that is easier to use. 4.73 rounds to 4.7.' },
        'nearest': { art: 'w-nearest', vi: 'gần nhất', def: 'The closest one. 4.73 is between 4.7 and 4.8. The nearest tenth is 4.7.' },
        'halfway': { art: 'w-halfway', vi: 'ở chính giữa', def: 'In the middle of two numbers. 4.75 is halfway between 4.7 and 4.8. A halfway number rounds up.' },
        'whole number': { art: 'w-whole-number', vi: 'số tự nhiên', def: 'A number with no decimal part and no fraction, like 0, 5 or 12. The number 4.73 is not a whole number.' },
        'estimate': { art: 'w-estimate', vi: 'ước lượng', def: 'To find an answer that is close, not exact. Round first: 4.73 + 2.2 is about 5 + 2 = 7.' },
        'sum': { art: 'w-sum', vi: 'tổng', def: 'The answer when you add. The sum of 2.5 and 1.3 is 3.8.' },
        'difference': { art: 'w-difference', vi: 'hiệu', def: 'The answer when you subtract. The difference between 2.5 and 1.3 is 1.2.' },
        'line up': { art: 'w-line-up', vi: 'đặt thẳng cột', def: 'To put things in a straight line. In a written calculation, line up the decimal points. Then tenths are under tenths.' },
        'exchange': { art: 'w-exchange', vi: 'đổi (mượn 1 ở hàng bên trái)', def: 'To swap 1 for 10 of the next smaller place. 1 tenth = 10 hundredths. Exchange when the top digit is too small.' },
        'working': { art: 'w-working', vi: 'các bước tính (phần trình bày bài làm)', def: 'The steps you write to find an answer. Show your working in columns.' }
      }
    },
    // See it: Concrete. The rounding line (find halfway, tap the nearer end); the column tool (line up the points,
    // write 0, exchange); then the challenge (the data shape is in 45-see.js).
    see: {
      scenes: [
        { id: 'line', title: { en: 'The rounding line', vi: 'Trục số làm tròn' }, tool: 'dround', dround: { n: '3.47', to: 'tenth' },
          steps: [
            { can: { mid: true }, wait: 'mid', until: { mid: true },
              zip: { en: '*3.47* is between 3.4 and 3.5. Tap *Halfway*.', vi: '*3.47* nằm giữa 3.4 và 3.5. Bấm *Halfway* (Chính giữa).' },
              then: { en: 'Halfway is *3.45*. 3.47 is past halfway.', vi: 'Số ở chính giữa là *3.45*. 3.47 đã qua điểm chính giữa.' } },
            { can: { pick: '3.5' }, wait: 'pick', until: { choice: '3.5' },
              zip: { en: 'Which end is nearer to 3.47? Tap it.', vi: 'Đầu nào gần 3.47 hơn? Hãy bấm vào đó.' },
              then: { en: '*3.47 rounds to 3.5*, to the nearest tenth.', vi: '*3.47 làm tròn thành 3.5*, đến hàng phần mười gần nhất.' } },
            { dround: { n: '8.25', to: 'tenth', mid: true }, can: { pick: '8.3' }, wait: 'pick', until: { choice: '8.3' },
              zip: { en: '*8.25* is exactly halfway. Halfway rounds *up*. Tap 8.3.', vi: '*8.25* ở đúng chính giữa. Ở chính giữa thì làm tròn *lên*. Bấm 8.3.' },
              then: { en: '*8.25 rounds to 8.3*. Tap *Next*.', vi: '*8.25 làm tròn thành 8.3*. Bấm *Next*.' } }] },
        { id: 'column', title: { en: 'Line up the points', vi: 'Đặt thẳng cột dấu thập phân' }, tool: 'dcol', dcol: { a: '5.3', b: '2.47', op: '-' },
          steps: [
            { can: { line: true }, wait: 'line', until: { lined: true },
              zip: { en: 'Tenths must be under tenths. Tap *Line up the points*.', vi: 'Phần mười phải thẳng cột với phần mười. Bấm *Line up the points* (Đặt thẳng cột).' },
              then: { en: 'Now the *decimal points* are in a line.', vi: 'Bây giờ các *dấu thập phân* đã thẳng cột.' } },
            { can: { zero: true }, wait: 'zero', until: { zeros: true },
              zip: { en: '5.3 has no hundredths. Tap *Write 0*.', vi: '5.3 không có hàng phần trăm. Bấm *Write 0* (Viết số 0).' },
              then: { en: '*5.3 = 5.30*. The 0 is a place holder.', vi: '*5.3 = 5.30*. Số 0 là chữ số giữ chỗ.' } },
            { can: { exchange: true, col: true }, wait: 'col', until: { done: 1 },
              zip: { en: '0 − 7? Tap *Exchange*. Then subtract the hundredths.', vi: '0 − 7? Bấm *Exchange* (Đổi). Rồi trừ hàng phần trăm.' },
              then: { en: '1 tenth = 10 hundredths. *10 − 7 = 3*.', vi: '1 phần mười = 10 phần trăm. *10 − 7 = 3*.' } },
            { can: { exchange: true, col: true }, wait: 'col', until: { complete: true },
              zip: { en: 'Now the tenths and the ones. Exchange again!', vi: 'Bây giờ đến hàng phần mười và hàng đơn vị. Lại đổi nhé!' },
              then: { en: '*5.3 − 2.47 = 2.83*. Tap *Next*.', vi: '*5.3 − 2.47 = 2.83*. Bấm *Next*.' } }] },
        { id: 'challenge', title: { en: 'Rounding Reef challenge', vi: 'Thử thách Rạn san hô Làm tròn' },
          challenge: {
            end: { en: 'You did it! You can round and line up decimals.', vi: 'Em làm được rồi! Em biết làm tròn và đặt thẳng cột số thập phân.' },
            result: 'You rounded decimals and added and subtracted them in columns.',
            rounds: [
          { mode: "our", lo: ["6Np.04"], v: [
            {"type":"drline","n":"4.72","to":"whole"},
            {"type":"drline","n":"9.36","to":"whole"},
            {"type":"drline","n":"2.81","to":"whole"}] },
          { mode: "your", lo: ["6Np.04"], v: [
            {"type":"drline","n":"5.28","to":"tenth"},
            {"type":"drline","n":"7.63","to":"tenth"},
            {"type":"drline","n":"1.45","to":"tenth"}] },
          { mode: "your", lo: ["6Np.04"], v: [
            {"type":"droundto","n":"4.96","to":"tenth","at":1,"line":true},
            {"type":"droundto","n":"12.75","to":"whole","at":2,"line":true},
            {"type":"droundto","n":"0.38","to":"tenth","at":0,"line":true}] },
          { mode: "your", lo: ["6Nf.09"], v: [
            {"type":"dcolsum","a":"3.6","b":"2.75","op":"+"},
            {"type":"dcolsum","a":"4.58","b":"1.7","op":"+"},
            {"type":"dcolsum","a":"6.4","b":"2.83","op":"+"}] },
          { mode: "your", lo: ["6Nf.09"], v: [
            {"type":"dcolsum","a":"6.4","b":"2.18","op":"-"},
            {"type":"dcolsum","a":"8.2","b":"3.56","op":"-"},
            {"type":"dcolsum","a":"7.5","b":"4.39","op":"-"}] }] } }]
    },
    // Practise: Pictorial (Draw it: the rounding line, the rings and the column tool) then Abstract (Solve it, like the test).
    practise: [
      { id: 's2r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Use the rounding line and the columns.', vi: 'Dùng trục số làm tròn và cách đặt tính theo cột.' },
        levels: [
      { title: { en: "Round on the line", vi: "Làm tròn trên trục số" }, rounds: [
          { mode: "our", lo: ["6Np.04"], twm: ["TWM.05"], v: [
            {"type":"drline","n":"3.27","to":"whole"},
            {"type":"drline","n":"6.42","to":"tenth"},
            {"type":"drline","n":"8.5","to":"whole"}] },
          { mode: "your", lo: ["6Np.04"], twm: ["TWM.01"], v: [
            {"type":"droundall","nums":["4.61","4.55","4.65","4.58","4.54"],"to":"tenth","target":"4.6"},
            {"type":"droundall","nums":["12.5","13.4","13.5","12.49","12.8"],"to":"whole","target":"13"},
            {"type":"droundall","nums":["0.85","0.94","0.95","0.84","0.88"],"to":"tenth","target":"0.9"}] }] },
      { title: { en: "Add in columns", vi: "Cộng theo cột" }, rounds: [
          { mode: "your", lo: ["6Nf.09"], twm: ["TWM.02"], v: [
            {"type":"dcolsum","a":"2.4","b":"3.15","op":"+"},
            {"type":"dcolsum","a":"1.36","b":"4.5","op":"+"},
            {"type":"dcolsum","a":"5.7","b":"2.18","op":"+"}] },
          { mode: "your", lo: ["6Nf.09"], twm: ["TWM.02"], v: [
            {"type":"dcolsum","a":"7.85","b":"4.6","op":"+"},
            {"type":"dcolsum","a":"6.8","b":"5.47","op":"+"},
            {"type":"dcolsum","a":"8.75","b":"3.8","op":"+"}] }] },
      { title: { en: "Subtract in columns", vi: "Trừ theo cột" }, rounds: [
          { mode: "your", lo: ["6Nf.09"], twm: ["TWM.02"], v: [
            {"type":"dcolsum","a":"7.3","b":"2.45","op":"-"},
            {"type":"dcolsum","a":"9.1","b":"3.64","op":"-"},
            {"type":"dcolsum","a":"6.2","b":"1.58","op":"-"}] },
          { mode: "your", lo: ["6Nf.09"], twm: ["TWM.02"], v: [
            {"type":"dcolsum","a":"6","b":"2.35","op":"-"},
            {"type":"dcolsum","a":"9","b":"4.72","op":"-"},
            {"type":"dcolsum","a":"5","b":"1.84","op":"-"}] }] }] },
      { id: 's2a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Round and estimate", vi: "Làm tròn và ước lượng" }, rounds: [
          { mode: "your", lo: ["6Np.04"], twm: ["TWM.05"], v: [
            {"type":"dround","items":[{"n":"4.83","to":"tenth"},{"n":"15.62","to":"whole"}]},
            {"type":"dround","items":[{"n":"9.47","to":"whole"},{"n":"0.65","to":"tenth"}]},
            {"type":"dround","items":[{"n":"12.35","to":"tenth"},{"n":"3.5","to":"whole"}]}] },
          { mode: "your", lo: ["6Np.04"], twm: ["TWM.02"], v: [
            {"type":"drange","target":"3.4","to":"tenth","ask":"min","dp":2},
            {"type":"drange","target":"8","to":"whole","ask":"max","dp":2},
            {"type":"drange","target":"5.2","to":"tenth","ask":"max","dp":2}] },
          { mode: "your", lo: ["6Nf.09"], twm: ["TWM.08"], v: [
            {"type":"dest","a":"4.8","b":"3.25","op":"+"},
            {"type":"dest","a":"9.2","b":"3.75","op":"-"},
            {"type":"dest","a":"6.71","b":"2.9","op":"+"}] }] },
      { title: { en: "Add and subtract", vi: "Cộng và trừ" }, rounds: [
          { mode: "your", lo: ["6Nf.09"], twm: ["TWM.02"], v: [
            {"type":"dsum","items":[{"a":"3.45","b":"2.8","op":"+"},{"a":"8.4","b":"5.67","op":"-"}]},
            {"type":"dsum","items":[{"a":"0.96","b":"4.7","op":"+"},{"a":"10","b":"3.48","op":"-"}]},
            {"type":"dsum","items":[{"a":"12.6","b":"7.59","op":"+"},{"a":"6.05","b":"2.8","op":"-"}]}] },
          { mode: "your", lo: ["6Nf.09"], twm: ["TWM.02"], v: [
            {"type":"dmiss","items":[{"a":"2.65","b":"1.9","op":"+","hide":"a"},{"a":"7.2","b":"2.35","op":"-","hide":"b"}]},
            {"type":"dmiss","items":[{"a":"3.4","b":"5.28","op":"+","hide":"b"},{"a":"9.15","b":"4.6","op":"-","hide":"a"}]},
            {"type":"dmiss","items":[{"a":"6.08","b":"1.7","op":"+","hide":"a"},{"a":"5","b":"1.25","op":"-","hide":"b"}]}] },
          { mode: "your", lo: ["6Nf.09"], twm: ["TWM.01"], v: [
            {"type":"dstory","kind":"change","have":"10","items":["3.75","1.48"],"pre":"$","dp":2,"text":"Hoa has <b>$10</b>. She buys a notebook for <b>$3.75</b> and a ruler for <b>$1.48</b>. How much money does she have left?"},
            {"type":"dstory","kind":"left","start":"6","each":"1.45","n":3,"unit":"m","text":"A roll of ribbon is <b>6 m</b> long. Linh cuts off <b>3</b> pieces. Each piece is <b>1.45 m</b> long. How much ribbon is left on the roll?"},
            {"type":"dstory","kind":"both","a":"3.45","d":"1.8","more":true,"unit":"m","text":"A blue rope is <b>3.45 m</b> long. A red rope is <b>1.8 m</b> longer than the blue rope. How long are the two ropes together?"}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["6Nf.09"], twm: ["TWM.07"], v: [
            {"type":"dcolfix","who":"Duc","a":"3.4","b":"2.15","op":"+","slip":"right","at":1},
            {"type":"dcolfix","who":"Trang","a":"6.2","b":"3.48","op":"-","slip":"nozero","at":0},
            {"type":"dcolfix","who":"Son","a":"5.31","b":"2.74","op":"-","slip":"noex","at":2}] },
          { mode: "your", lo: ["6Np.04", "6Nf.09"], twm: ["TWM.07", "TWM.04"], v: [
            {"type":"claim","who":"Phong","ok":true,"at":1,"says":"7.96 rounded to the nearest tenth is 8.0.","reasons":[{"t":"7.96 is between 7.9 and 8.0. The hundredths digit is 6, so it rounds up to 8.0."},{"t":"the tenths digit must stay 9, so the answer is 7.9.","why":"The hundredths digit is 6, so round up. 9 tenths and 1 more tenth make 10 tenths: one more whole."},{"t":"the tenth after 7.9 is 7.10, so the answer is 7.10.","why":"7.10 is the same as 7.1. Ten tenths make 1 whole, so the tenth after 7.9 is 8.0."}],"hint":{"pic":{"k":"dround","n":"7.96","to":"tenth","mid":true},"step":"7.96 is between 7.9 and 8.0. Look at the hundredths digit."},"worked":"7.96 is between 7.9 and 8.0. Halfway is 7.95. 7.96 is past halfway, so it rounds up to 8.0.","model":"Phong is correct because 7.96 is nearer to 8.0 than to 7.9."},
            {"type":"claim","who":"Yen","ok":false,"at":0,"says":"2.6 + 1.35 = 1.61, because 26 + 135 = 161.","reasons":[{"t":"the decimal points must be in a line. 2.60 + 1.35 = 3.95."},{"t":"you can always add the digits like whole numbers and then put the point back.","why":"That only works when both numbers have the same number of decimal places. Write 2.6 as 2.60 first."},{"t":"the sum of two decimals is always smaller than both numbers.","why":"Adding makes a bigger number. The sum must be more than 2.6."}],"fig":{"k":"dcol","a":"2.6","b":"1.35","op":"+","lined":false,"shown":"1.61"},"hint":{"pic":{"k":"dcol","a":"2.6","b":"1.35","op":"+"},"step":"Estimate first: 3 + 1 = 4. Is 1.61 close to 4? Then line up the decimal points."},"worked":"Estimate: 3 + 1 = 4, so 1.61 is much too small. Line up the points: 2.60 + 1.35 = 3.95.","model":"Yen is incorrect because the decimal points are not in a line. 2.60 + 1.35 = 3.95."},
            {"type":"claim","who":"Binh","ok":true,"at":2,"says":"6.82 − 2.19 is about 5, because 7 − 2 = 5.","reasons":[{"t":"6.82 rounds to 7 and 2.19 rounds to 2. The exact answer, 4.63, is close to 5."},{"t":"an estimate must be the exact answer, and the exact answer is not 5.","why":"An estimate does not have to be exact. It only has to be close."},{"t":"both numbers must round down, so the estimate is 6 − 2 = 4.","why":"6.82 is nearer to 7 than to 6, because its tenths digit is 8."}],"hint":{"pic":[{"k":"dround","n":"6.82","to":"whole","mid":true},{"k":"dround","n":"2.19","to":"whole","mid":true}],"step":"Round each number to the nearest whole number. Then subtract."},"worked":"6.82 rounds to 7. 2.19 rounds to 2. 7 − 2 = 5. The exact answer is 6.82 − 2.19 = 4.63, which is close to 5.","model":"Binh is correct because 6.82 is about 7 and 2.19 is about 2, and 7 − 2 = 5."}] }] }] }
    ],
    // Notes: how to do it, each with a worked example and a picture made by the maths tools; then one gap
    // sentence per note, in the same order (the first choice in the braces is the right one).
    notes: {
      items: [
        { en: 'To [[round]] a number, find the two numbers it is between. Then choose the [[nearest]] one.',
          vi: 'Để làm tròn một số, hãy tìm hai số mà nó nằm giữa. Rồi chọn số gần nhất.',
          example: ['4.73 is between 4.7 and 4.8.', 'It is nearer to 4.7. So 4.73 rounds to *4.7*.'],
          pic: { k: 'dround', n: '4.73', to: 'tenth', show: true } },
        { en: 'Look at the next digit. Less than 5: round down. 5 or more: round up. A [[halfway]] number rounds up.',
          vi: 'Nhìn chữ số tiếp theo. Bé hơn 5: làm tròn xuống. Từ 5 trở lên: làm tròn lên. Số ở chính giữa thì làm tròn lên.',
          example: ['2.85 is halfway between 2.8 and 2.9.', 'So 2.85 rounds *up* to 2.9.'],
          pic: { k: 'dround', n: '2.85', to: 'tenth', mid: true, show: true } },
        { en: 'To the nearest [[tenth]], look at the hundredths digit. To the nearest [[whole number]], look at the tenths digit.',
          vi: 'Làm tròn đến hàng phần mười: nhìn chữ số hàng phần trăm. Làm tròn đến số tự nhiên gần nhất: nhìn chữ số hàng phần mười.',
          example: ['9.26 to the nearest tenth is *9.3*.', '9.26 to the nearest whole number is *9*.'],
          pic: { k: 'dround', n: '9.26', to: 'tenth', mid: true, show: true } },
        { en: '[[Estimate|estimate]] before you calculate. Round each number to a whole number. Your answer must be close to the estimate.',
          vi: 'Hãy ước lượng trước khi tính. Làm tròn mỗi số đến số tự nhiên gần nhất. Kết quả của em phải gần với số ước lượng.',
          example: ['5.8 + 3.15 is about 6 + 3 = *9*.', 'The exact [[sum]] is 8.95. It is close to 9.'],
          pic: { k: 'dround', n: '5.8', to: 'whole', mid: true, show: true } },
        { en: 'To add or subtract decimals, [[line up]] the decimal points. Write 0 as a [[place holder]] in an empty place.',
          vi: 'Để cộng hoặc trừ số thập phân, hãy đặt các dấu thập phân thẳng cột. Viết số 0 giữ chỗ vào hàng còn trống.',
          example: ['3.7 + 1.25: write 3.7 as 3.70.', 'Then add each column: *4.95*.'],
          pic: { k: 'dcol', a: '3.7', b: '1.25', op: '+', ans: true } },
        { en: 'When the top digit is smaller, [[exchange]]: 1 tenth = 10 hundredths. Show your [[working]].',
          vi: 'Khi chữ số ở trên bé hơn, hãy đổi: 1 phần mười = 10 phần trăm. Hãy trình bày các bước tính.',
          example: ['6.4 − 2.58: write 6.4 as 6.40.', '0 − 8? Exchange. The [[difference]] is *3.82*.'],
          pic: { k: 'dcol', a: '6.4', b: '2.58', op: '-', ans: true } }
      ],
      check: [
        { sentence: '6.18 is between 6.1 and 6.2. It rounds to {6.2|6.1|6.0}.', answer: '6.2' },
        { sentence: '3.45 rounded to the nearest tenth is {3.5|3.4|3.0}.', answer: '3.5' },
        { sentence: '7.52 rounded to the nearest whole number is {8|7|7.5}.', answer: '8' },
        { sentence: 'A good estimate for 8.9 − 4.3 is {5|4|13}.', answer: '5' },
        { sentence: '2.5 + 1.34 = {3.84|1.59|3.8}.', answer: '3.84' },
        { sentence: '5.2 − 1.75 = {3.45|4.55|3.55}.', answer: '3.45' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard: 5 at DOK 1, 4 at DOK 2, 1 at DOK 3 (T.DOK_MIX), each with
    // lo, twm and 3 sets of numbers (play 1 uses v[0]).
    test: {
      items: [
        { dok: 1, lo: ["6Np.04"], twm: ["TWM.05"], v: [
          {"type":"dround","items":[{"n":"3.72","to":"whole"}]},
          {"type":"dround","items":[{"n":"18.29","to":"whole"}]},
          {"type":"dround","items":[{"n":"5.53","to":"whole"}]}
        ] },
        { dok: 1, lo: ["6Np.04"], twm: ["TWM.05"], v: [
          {"type":"dround","items":[{"n":"5.84","to":"tenth"}]},
          {"type":"dround","items":[{"n":"2.37","to":"tenth"}]},
          {"type":"dround","items":[{"n":"10.65","to":"tenth"}]}
        ] },
        { dok: 1, lo: ["6Np.04"], twm: ["TWM.01"], v: [
          {"type":"droundpick","target":"4.6","to":"tenth","opts":["4.57","4.67","4.51","4.66"],"at":2},
          {"type":"droundpick","target":"12","to":"whole","opts":["11.52","12.5","11.48","12.61"],"at":0},
          {"type":"droundpick","target":"0.3","to":"tenth","opts":["0.25","0.35","0.24","0.36"],"at":3}
        ] },
        { dok: 1, lo: ["6Nf.09"], twm: ["TWM.02"], v: [
          {"type":"dsum","items":[{"a":"4.35","b":"2.8","op":"+"}]},
          {"type":"dsum","items":[{"a":"6.7","b":"1.86","op":"+"}]},
          {"type":"dsum","items":[{"a":"0.59","b":"3.6","op":"+"}]}
        ] },
        { dok: 1, lo: ["6Nf.09"], twm: ["TWM.02"], v: [
          {"type":"dsum","items":[{"a":"7.6","b":"3.25","op":"-"}]},
          {"type":"dsum","items":[{"a":"9.04","b":"5.3","op":"-"}]},
          {"type":"dsum","items":[{"a":"8","b":"2.65","op":"-"}]}
        ] },
        { dok: 2, lo: ["6Np.04"], twm: ["TWM.02"], v: [
          {"type":"drange","target":"7.3","to":"tenth","ask":"max","dp":2},
          {"type":"drange","target":"2.8","to":"tenth","ask":"min","dp":2},
          {"type":"drange","target":"15","to":"whole","ask":"max","dp":2}
        ] },
        { dok: 2, lo: ["6Nf.09"], twm: ["TWM.08"], v: [
          {"type":"dest","a":"5.9","b":"2.35","op":"+"},
          {"type":"dest","a":"8.1","b":"3.64","op":"-"},
          {"type":"dest","a":"3.78","b":"4.6","op":"+"}
        ] },
        { dok: 2, lo: ["6Nf.09"], twm: ["TWM.01"], v: [
          {"type":"dstory","kind":"change","have":"20","items":["8.45","2.69"],"pre":"$","dp":2,"text":"Thu pays with a <b>$20</b> note. She buys a kite for <b>$8.45</b> and some string for <b>$2.69</b>. How much change does she get?"},
          {"type":"dstory","kind":"left","start":"4","each":"0.85","n":3,"unit":"m","text":"A plank of wood is <b>4 m</b> long. Hung saws off <b>3</b> pieces. Each piece is <b>0.85 m</b> long. How long is the plank now?"},
          {"type":"dstory","kind":"both","a":"3.8","d":"2.75","more":true,"unit":"kg","text":"A cat has a mass of <b>3.8 kg</b>. A dog is <b>2.75 kg</b> heavier than the cat. What is the total mass of the cat and the dog?"}
        ] },
        { dok: 2, lo: ["6Nf.09"], twm: ["TWM.07"], v: [
          {"type":"dcolfix","who":"Hai","a":"4.7","b":"1.32","op":"+","slip":"right","at":0},
          {"type":"dcolfix","who":"Kim","a":"8.5","b":"2.36","op":"-","slip":"nozero","at":2},
          {"type":"dcolfix","who":"Tam","a":"7.24","b":"4.58","op":"-","slip":"noex","at":1}
        ] },
        { dok: 3, lo: ["6Np.04", "6Nf.09"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Giang","ok":false,"at":1,"says":"When you round a decimal to the nearest whole number, the answer is always bigger than the decimal.","reasons":[{"t":"4.3 rounds to 4, and 4 is smaller than 4.3. One example like this shows the rule is not always true."},{"t":"rounding always goes up, like 4.7 rounds to 5.","why":"That example fits. But try a number with a small tenths digit, like 4.3."},{"t":"a rounded number is always equal to the decimal.","why":"4.7 rounds to 5, and 5 is not equal to 4.7."}],"hint":{"pic":{"k":"dround","n":"4.3","to":"whole","mid":true},"step":"Test the rule. Try 4.7. Then try a number with a small tenths digit, like 4.3."},"worked":"4.7 rounds up to 5, which is bigger. But 4.3 rounds down to 4, which is smaller than 4.3. So the rule is not always true.","model":"Giang is incorrect because 4.3 rounds to 4, and 4 is smaller than 4.3."},
          {"type":"claim","who":"Dung","ok":false,"at":2,"says":"When you add two decimals, the sum is never a whole number.","reasons":[{"t":"2.5 + 3.5 = 6, and 6 is a whole number. One example like this shows that “never” is wrong."},{"t":"a decimal plus a decimal is always a decimal, like 2.4 + 3.1 = 5.5.","why":"That example fits. But try 2.5 + 3.5. The tenths make one more whole."},{"t":"the sum of two decimals is always less than 1.","why":"2.4 + 3.1 = 5.5, and 5.5 is more than 1."}],"hint":{"pic":{"k":"dcol","a":"2.5","b":"3.5","op":"+"},"step":"Test the rule. Try 2.4 + 3.1. Then try two numbers whose tenths make 10 tenths, like 2.5 + 3.5."},"worked":"2.4 + 3.1 = 5.5 is a decimal. But 2.5 + 3.5 = 6.0, and that is the whole number 6. So “never” is wrong.","model":"Dung is incorrect because 2.5 + 3.5 = 6, and 6 is a whole number."},
          {"type":"claim","who":"Hanh","ok":true,"at":0,"says":"A number with 2 decimal places that rounds to 5, to the nearest whole number, is always less than 5.5.","reasons":[{"t":"5.5 is halfway between 5 and 6, and halfway rounds up to 6. So the numbers that round to 5 stop at 5.49."},{"t":"5.5 rounds to 5, so the number can be 5.5.","why":"5.5 is exactly halfway between 5 and 6. Halfway rounds up, to 6."},{"t":"only the number 5.00 rounds to 5.","why":"Try 4.8 and 5.3. They round to 5 too."}],"hint":{"pic":{"k":"dround","from":"5","to":"whole","mid":true},"step":"Test the rule. Round 5.49, then 5.5, then 5.51 to the nearest whole number."},"worked":"5.49 rounds down to 5. 5.5 is halfway, so it rounds up to 6, and so does every bigger number. So the numbers that round to 5 are all less than 5.5.","model":"Hanh is correct because 5.5 and every number above it rounds up to 6."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). Made and checked by
    // tools/gen_lightning_s2.py.
    lightning: {
      secs: 60,
      items: [
        ["9.54 to the nearest whole number", ["10", "9", "9.5"]],
        ["Estimate: 9.6 − 1.39 is about", ["9", "8", "10"]],
        ["19.25 to the nearest tenth", ["19.3", "19.2", "19"]],
        ["19.26 to the nearest whole number", ["19", "20", "19.3"]],
        ["17.06 to the nearest tenth", ["17.1", "17.0", "17"]],
        ["6.5 − 3.12", ["3.38", "3.42", "2.47"]],
        ["4.59 + 5.9", ["10.49", "5.18", "9.49"]],
        ["My 2-decimal-place number rounds to 7.6. Largest it can be?", ["7.64", "7.65", "7.69"]],
        ["Which number rounds to 8.3 (nearest tenth)?", ["8.28", "8.35", "8.24"]],
        ["13.57 to the nearest whole number", ["14", "13", "13.6"]],
        ["5.69 to the nearest whole number", ["6", "5", "5.7"]],
        ["6.97 + 2.8", ["9.77", "7.25", "8.77"]],
        ["4.6 − 1.57", ["3.03", "3.17", "1.11"]],
        ["My 2-decimal-place number rounds to 7.7. Largest it can be?", ["7.74", "7.75", "7.79"]],
        ["My 2-decimal-place number rounds to 3.1. Largest it can be?", ["3.14", "3.15", "3.19"]],
        ["Halfway between 5.4 and 5.5", ["5.45", "5.5", "5.9"]],
        ["6.25 to the nearest tenth", ["6.3", "6.2", "6"]],
        ["9.22 to the nearest tenth", ["9.2", "9.3", "9"]],
        ["18.82 to the nearest whole number", ["19", "18", "18.8"]],
        ["7 − 3.49", ["3.51", "4.51", "4.49"]],
        ["5.46 + 1.8", ["7.26", "5.64", "6.26"]],
        ["6.4 − 1.48", ["4.92", "5.08", "0.84"]],
        ["Which number rounds to 9.6 (nearest tenth)?", ["9.64", "9.65", "9.54"]],
        ["Which number rounds to 8.7 (nearest tenth)?", ["8.65", "8.75", "8.64"]],
        ["Halfway between 6.2 and 6.3", ["6.25", "6.3", "6.7"]],
        ["5.8 + 1.96", ["7.76", "2.54", "6.76"]],
        ["12.25 to the nearest tenth", ["12.3", "12.2", "12"]],
        ["Estimate: 4.7 − 3.29 is about", ["2", "1", "3"]],
        ["Which number rounds to 9.1 (nearest tenth)?", ["9.08", "9.15", "9.04"]],
        ["1.07 + 8.4", ["9.47", "1.91", "9.57"]],
        ["Which number rounds to 6.5 (nearest tenth)?", ["6.48", "6.55", "6.44"]],
        ["4.9 − 1.33", ["3.57", "3.63", "0.84"]],
        ["6.34 + 7.6", ["13.94", "7.1", "14.04"]],
        ["4.7 − 2.97", ["1.73", "1.87", "2.5"]],
        ["13.46 to the nearest tenth", ["13.5", "13.4", "13"]],
        ["Estimate: 9.2 − 3.98 is about", ["5", "6", "4"]],
        ["My number rounds to 6.1. What is the smallest it can be?", ["6.05", "6.06", "6.04"]],
        ["My number rounds to 8.5. What is the smallest it can be?", ["8.45", "8.46", "8.44"]],
        ["19.24 to the nearest tenth", ["19.2", "19.3", "19"]],
        ["6 − 3.58", ["2.42", "3.42", "3.58"]],
        ["6.34 + 6.5", ["12.84", "6.99", "12.94"]],
        ["8.3 + 1.94", ["10.24", "2.77", "9.24"]],
        ["10.51 to the nearest whole number", ["11", "10", "10.5"]],
        ["4.08 to the nearest whole number", ["4", "5", "4.1"]],
        ["My number rounds to 7.2. What is the smallest it can be?", ["7.15", "7.16", "7.14"]],
        ["Halfway between 2.3 and 2.4", ["2.35", "2.4", "2.8"]],
        ["Estimate: 5.1 − 2.52 is about", ["2", "3", "1"]],
        ["10.36 to the nearest whole number", ["10", "11", "10.4"]],
        ["Which number rounds to 2.3 (nearest tenth)?", ["2.28", "2.35", "2.24"]],
        ["Estimate: 5.3 + 1.93 is about", ["7", "6", "8"]],
        ["12.78 to the nearest whole number", ["13", "12", "12.8"]],
        ["Halfway between 9.5 and 9.6", ["9.55", "9.6", "10.0"]],
        ["12.71 to the nearest tenth", ["12.7", "12.8", "13"]],
        ["7.6 − 3.14", ["4.46", "4.54", "2.38"]],
        ["Estimate: 7.1 + 4.54 is about", ["12", "11", "13"]],
        ["My number rounds to 2.7. What is the smallest it can be?", ["2.65", "2.66", "2.64"]],
        ["8.9 − 2.14", ["6.76", "6.84", "1.25"]],
        ["Halfway between 7.1 and 7.2", ["7.15", "7.2", "7.6"]],
        ["1.5 to the nearest whole number", ["2", "1", "1.5"]],
        ["My 2-decimal-place number rounds to 4.3. Largest it can be?", ["4.34", "4.35", "4.39"]],
        ["5.62 + 5.8", ["11.42", "6.2", "10.42"]],
        ["6 − 1.19", ["4.81", "5.81", "5.19"]],
        ["8.75 to the nearest tenth", ["8.8", "8.7", "9"]],
        ["1.3 + 6.81", ["8.11", "6.94", "7.11"]],
        ["1.78 to the nearest tenth", ["1.8", "1.7", "2"]],
        ["2.3 + 4.18", ["6.48", "4.41", "6.58"]],
        ["4.7 − 1.07", ["3.63", "3.77", "0.6"]],
        ["16.06 to the nearest whole number", ["16", "17", "16.1"]],
        ["4.1 + 3.31", ["7.41", "3.72", "7.51"]],
        ["15.91 to the nearest tenth", ["15.9", "16.0", "16"]],
        ["6.5 − 2.75", ["3.75", "3.85", "2.1"]],
        ["3.59 to the nearest tenth", ["3.6", "3.5", "4"]],
        ["Estimate: 9.7 + 4.63 is about", ["15", "13", "16"]],
        ["5.5 to the nearest whole number", ["6", "5", "5.5"]],
        ["Estimate: 6.3 + 3.78 is about", ["10", "9", "11"]]
      ]
    },
    // My self-check: the goals of the stop. again: the step to practise again for each goal (c = See it, r and a = Practise).
    selfcheck: {
      goals: ["round a decimal to the nearest tenth", "round a decimal to the nearest whole number", "estimate an answer before I calculate", "add decimals with different numbers of decimal places", "subtract decimals and exchange when I need to"],
      again: ["c", "r", "a", "r", "a"]
    }
  };
})(window.T = window.T || {});
