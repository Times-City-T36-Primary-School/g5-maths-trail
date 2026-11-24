/* 22-pack-stop9.js - ALL the content of Stop 9, Mode, median, mean and range (Grade 5, Cambridge Stage 6: 6Ss.03).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The questions are data for the
   Grade 5 models (08-g5-models-s9.js, which work every answer out from the numbers) and the tools of
   39-g5-tools-s9.js. None of the data sets, contexts, names or sentences are those of the EOS1 papers. */
(function (T) {
  'use strict';

  T.packs[9] = {
    n: 9,
    title: "Mode, median, mean and range",
    los: ["6Ss.03"],
    blurb: {
      en: "Describe a set of *data* with the mode, median, mean and range.",
      vi: "Mô tả một bộ *dữ liệu* bằng mốt, trung vị, số trung bình cộng và khoảng biến thiên."
    },
    words: {
      sets: [
        { id: 'A', title: { en: 'Data', vi: 'Dữ liệu' }, keys: ['data', 'data set', 'total', 'frequency'] },
        { id: 'B', title: { en: 'The most common', vi: 'Phổ biến nhất' }, keys: ['average', 'mode', 'bimodal'] },
        { id: 'C', title: { en: 'Middle and spread', vi: 'Ở giữa và trải rộng' }, keys: ['median', 'mean', 'range'] }
      ],
      items: {
        'data': { art: 'w-data', vi: 'dữ liệu', def: 'Facts or numbers that we collect. The heights of the pupils in a class are data.' },
        'data set': { art: 'w-data-set', vi: 'bộ dữ liệu', def: 'A group of data about one thing. 3, 5, 5, 8 is a data set with four values.' },
        'total': { art: 'w-total', vi: 'tổng', def: 'The answer when you add all the values. The total of 3, 5, 5 and 8 is 21.' },
        'frequency': { art: 'w-frequency', vi: 'tần số', def: 'How many times a value appears. In 3, 5, 5, 8 the frequency of 5 is 2.' },
        'average': { art: 'w-average', vi: 'giá trị đại diện (số đo trung tâm)', def: 'One value that describes a whole data set. The mode, the median and the mean are averages.' },
        'mode': { art: 'w-mode', vi: 'mốt', def: 'The value that appears most often. The mode of 3, 5, 5, 8 is 5.' },
        'bimodal': { art: 'w-bimodal', vi: 'có hai mốt', def: 'With two modes. The data set 2, 2, 6, 9, 9 is bimodal: the modes are 2 and 9.' },
        'median': { art: 'w-median', vi: 'trung vị', def: 'The middle value when the data is in order. The median of 2, 4, 9 is 4.' },
        'mean': { art: 'w-mean', vi: 'số trung bình cộng', def: 'The total divided by the number of values. The mean of 2, 4, 9 is 15 ÷ 3 = 5.' },
        'range': { art: 'w-range', vi: 'khoảng biến thiên', def: 'The largest value take away the smallest. The range of 2, 4, 9 is 9 − 2 = 7.' }
      }
    },
    // See it: Concrete. Put number cards in order to find the median, the mode and the range; move blocks until
    // the towers are level to find the mean; then the challenge (the data shape is in 45-see.js).
    see: {
      scenes: [
        { id: 'cards', title: { en: 'Put the data in order', vi: 'Sắp xếp dữ liệu theo thứ tự' }, tool: 'dcards', dcards: { nums: [6, 3, 8, 3, 5, 9, 1] },
          steps: [
            { can: { place: true }, wait: 'place', until: { sorted: true },
              zip: { en: 'Tap the cards in order. Start with the *smallest*.', vi: 'Bấm các thẻ theo thứ tự. Bắt đầu từ số *bé nhất*.' },
              then: { en: 'In order! Now we can find the *median*.', vi: 'Đã đúng thứ tự! Bây giờ ta tìm *trung vị*.' } },
            { can: { cross: true }, wait: 'cross', until: { left: 1 },
              zip: { en: 'Tap *Cross off the ends* until one card is left.', vi: 'Bấm *Cross off the ends* (Gạch hai đầu) đến khi còn một thẻ.' },
              then: { en: 'The middle card is *5*. The *median* is 5.', vi: 'Thẻ ở giữa là *5*. *Trung vị* là 5.' } },
            { can: { view: 'mode' }, wait: 'view', until: { view: 'mode' },
              zip: { en: 'Now tap *Mode*. Equal cards make a pile.', vi: 'Bây giờ bấm *Mode* (Mốt). Các thẻ bằng nhau xếp thành chồng.' },
              then: { en: 'The tallest pile is *3*. The *mode* is 3.', vi: 'Chồng cao nhất là *3*. *Mốt* là 3.' } },
            { can: { view: 'range' }, wait: 'view', until: { view: 'range' },
              zip: { en: 'Tap *Range*. Look at the first and last card.', vi: 'Bấm *Range* (Khoảng biến thiên). Nhìn thẻ đầu và thẻ cuối.' },
              then: { en: '*9 − 1 = 8*. The *range* is 8.', vi: '*9 − 1 = 8*. *Khoảng biến thiên* là 8.' } }] },
        { id: 'towers', title: { en: 'Make the towers level', vi: 'Làm cho các tháp cao bằng nhau' }, tool: 'dtowers', dtowers: { nums: [2, 7, 4, 3], labels: ['Mon', 'Tue', 'Wed', 'Thu'] },
          steps: [
            { can: { move: true }, wait: 'move', until: { moves: 1 },
              zip: { en: 'Tap the *tallest* tower. Then tap the *shortest*.', vi: 'Bấm tháp *cao nhất*. Rồi bấm tháp *thấp nhất*.' },
              then: { en: 'One block moved. The *total* is still 16.', vi: 'Một khối đã chuyển. *Tổng* vẫn là 16.' } },
            { can: { move: true }, wait: 'move', until: { level: true },
              zip: { en: 'Keep moving blocks until all towers are *level*.', vi: 'Tiếp tục chuyển khối đến khi các tháp *cao bằng nhau*.' },
              then: { en: 'Every tower has *4*. The *mean* is 4.', vi: 'Mỗi tháp có *4*. *Số trung bình cộng* là 4.' } },
            { can: { move: true }, wait: 'move', until: { level: true }, dtowers: { nums: [5, 0, 4, 3] },
              zip: { en: 'New data. One day has *0*. Make them level.', vi: 'Dữ liệu mới. Một ngày có *0*. Hãy làm cho bằng nhau.' },
              then: { en: '*12 ÷ 4 = 3*. The 0 counts too!', vi: '*12 ÷ 4 = 3*. Số 0 cũng được tính!' } }] },
        { id: 'challenge', title: { en: 'Data challenge', vi: 'Thử thách dữ liệu' },
          challenge: {
            end: { en: 'You did it! You can describe a data set.', vi: 'Em làm được rồi! Em biết mô tả một bộ dữ liệu.' },
            result: 'You found the median, mode, range and mean of a data set.',
            rounds: [
          { mode: "our", lo: ["6Ss.03"], v: [
            {"type":"smedian","tool":true,"nums":[7,2,9,4,6]},
            {"type":"smedian","tool":true,"nums":[12,5,8,16,10]},
            {"type":"smedian","tool":true,"nums":[3,11,9,6,4]}] },
          { mode: "your", lo: ["6Ss.03"], v: [
            {"type":"smodes","tool":true,"nums":[4,7,4,2,7,4],"at":1},
            {"type":"smodes","tool":true,"nums":[5,9,5,2,9,6],"at":0},
            {"type":"smodes","tool":true,"nums":[8,3,8,6,3,8,1],"at":2}] },
          { mode: "your", lo: ["6Ss.03"], v: [
            {"type":"srange","tool":true,"nums":[14,6,11,19,8]},
            {"type":"srange","tool":true,"nums":[25,12,30,18,21]},
            {"type":"srange","tool":true,"nums":[9,16,4,13,7,10]}] },
          { mode: "your", lo: ["6Ss.03"], v: [
            {"type":"smean","tool":true,"nums":[5,8,2,9]},
            {"type":"smean","tool":true,"nums":[1,8,3,2,6]},
            {"type":"smean","tool":true,"nums":[6,2,7,5]}] },
          { mode: "your", lo: ["6Ss.03"], v: [
            {"type":"smedian","tool":true,"nums":[8,3,11,5]},
            {"type":"smedian","tool":true,"nums":[12,7,9,4,16,10]},
            {"type":"smedian","tool":true,"nums":[6,1,10,4]}] }] } }]
    },
    // Practise: Pictorial (Draw it: the data cards and the towers) then Abstract (Solve it, like the test).
    practise: [
      { id: 's9r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Use the data cards and the towers.', vi: 'Dùng các thẻ dữ liệu và các tháp khối.' },
        levels: [
      { title: { en: "The data cards", vi: "Các thẻ dữ liệu" }, rounds: [
          { mode: "our", lo: ["6Ss.03"], twm: ["TWM.05"], v: [
            {"type":"smedian","tool":true,"nums":[5,9,2,7,4]},
            {"type":"smedian","tool":true,"nums":[13,6,15,8,10]},
            {"type":"smedian","tool":true,"nums":[4,12,7,3,9,6,11]}] },
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.05"], v: [
            {"type":"srange","tool":true,"nums":[17,9,22,13,6]},
            {"type":"srange","tool":true,"nums":[30,45,28,52,39]},
            {"type":"srange","tool":true,"nums":[8,3,14,10,5,12]}] }] },
      { title: { en: "Level the towers", vi: "Làm cho các tháp bằng nhau" }, rounds: [
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.05"], v: [
            {"type":"smean","tool":true,"nums":[4,8,3,5]},
            {"type":"smean","tool":true,"nums":[2,6,9,3]},
            {"type":"smean","tool":true,"nums":[5,9,4,6]}] },
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.05", "TWM.01"], v: [
            {"type":"smean","tool":true,"nums":[8,0,5,7],"labels":["Mon","Tue","Wed","Thu"],"ctx":"The towers show the goals a team scores on 4 days."},
            {"type":"smean","tool":true,"nums":[9,0,6,7,3],"labels":["Mon","Tue","Wed","Thu","Fri"],"ctx":"The towers show the pages Hoa reads on 5 days."},
            {"type":"smean","tool":true,"nums":[7,0,8,9],"labels":["Mon","Tue","Wed","Thu"],"ctx":"The towers show the birds Duc sees on 4 days."}] }] },
      { title: { en: "Piles and middles", vi: "Chồng thẻ và giá trị ở giữa" }, rounds: [
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.06"], v: [
            {"type":"smodes","tool":true,"nums":[6,2,6,9,2,6],"at":2},
            {"type":"smodes","tool":true,"nums":[3,8,3,5,8,1],"at":1},
            {"type":"smodes","tool":true,"nums":[7,4,9,2,5],"at":0}] },
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.05"], v: [
            {"type":"smedian","tool":true,"nums":[9,4,6,12]},
            {"type":"smedian","tool":true,"nums":[5,11,8,3,10,6]},
            {"type":"smedian","tool":true,"nums":[14,9,12,6]}] }] }] },
      { id: 's9a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Mode, median, mean", vi: "Mốt, trung vị, số trung bình cộng" }, rounds: [
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.05"], v: [
            {"type":"smode","nums":[4,0,3,4,1,2,5],"unit":"goals","ctx":"A football team plays 7 matches. Here are the goals it scores."},
            {"type":"sfreq","head":["Shoe size","Frequency"],"vals":[33,34,35,36,37],"freqs":[2,5,8,4,1],"ctx":"A shop sells children's shoes on Saturday."},
            {"type":"mcq","at":1,"q":"A shoe shop sells these sizes in one day: <b>35, 36, 36, 37, 36, 38, 36</b>. The shop wants to know which size to order most. Which value helps most?","opts":["The mode","The mean","The range"],"whys":[null,"The mean here is not a whole number, so it is not a real shoe size. The shop needs the size sold most often.","The range only tells how spread out the sizes are: 38 − 35 = 3. The shop needs the size sold most often."],"hint":{"pic":{"k":"dcards","nums":[35,36,36,37,36,38,36],"sorted":true,"cap":"The sizes in order"},"step":"Which size is sold most often? What is that average called?"},"worked":{"text":"Size 36 is sold 4 times, more than any other size. The most common value is the mode. So the mode, 36, helps most.","pic":{"k":"dcards","nums":[35,36,36,37,36,38,36],"show":"mode","cap":"mode = 36"}},"yes":"The mode, 36, is the size sold most often."}] },
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.05"], v: [
            {"type":"smedian","nums":[142,128,150,135,139],"unit":"cm","ctx":"Here are the heights, in cm, of 5 sunflowers."},
            {"type":"smedian","nums":[31,28,33,29,34,30],"unit":"°C","ctx":"Here are the temperatures, in °C, at noon on 6 days."},
            {"type":"smedian","nums":[48,62,55,40,71,58,66],"unit":"skips","ctx":"Seven children count their skips in one minute."}] },
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.05"], v: [
            {"type":"smean","nums":[12,0,7,15,6],"unit":"mm","ctx":"Here is the rainfall, in mm, on 5 days."},
            {"type":"smean","nums":[14,9,18,11],"unit":"points","ctx":"Here are the points Hung scores in 4 basketball games."},
            {"type":"smean","nums":[5,3,4,7,4,4],"unit":"m","ctx":"Here are the lengths, in m, of 6 ropes."}] }] },
      { title: { en: "Use the measures", vi: "Dùng các số đo" }, rounds: [
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.05"], v: [
            {"type":"sall","nums":[6,9,4,9,8,4,9],"unit":"points","ctx":"Here are the points of 7 teams in a science quiz."},
            {"type":"sall","nums":[10,7,19,7,12],"unit":"years","ctx":"Here are the ages, in years, of 5 cousins."},
            {"type":"sall","nums":[14,12,23,10,18,12,16],"unit":"cars","ctx":"Here are the numbers of cars that pass a school gate in each of 7 minutes."}] },
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.01"], v: [
            {"type":"smissmean","known":[7,9,4,8],"mean":8,"what":"score","ctx":"Phong plays 5 rounds of a game."},
            {"type":"smissrange","known":[15,22,18,11],"range":16,"end":"max","ctx":"Five children count the books on their shelves."},
            {"type":"smissmean","known":[20,35,25],"mean":30,"what":"time","short":true,"unit":"minutes","ctx":"Yen practises the piano on 4 days."}] },
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.07"], v: [
            {"type":"scompare","by":"mean","ask":"greater","at":1,"unit":"points","a":{"name":"Hoa","nums":[8,12,6,10]},"b":{"name":"Duc","nums":[11,7,9,13]},"q":"Hoa and Duc each play 4 games of basketball. Here are their points. Who has the greater <b>mean</b> score?"},
            {"type":"sbest","nums":[8,10,9,12,46],"unit":"minutes","thing":"walk to school","at":2,"ctx":"Here are the minutes 5 children take to walk to school."},
            {"type":"scompare","by":"range","ask":"smaller","at":0,"unit":"seconds","a":{"name":"Giang","nums":[52,58,55,61,54]},"b":{"name":"Kim","nums":[56,57,53,59,55]},"q":"Giang and Kim each run 5 laps. Here are their lap times, in seconds. Whose times are closer together? Use the <b>range</b>."}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.07"], v: [
            {"type":"sspot","who":"Son","he":true,"nums":[12,5,9,3,8],"slip":"unsorted","at":1},
            {"type":"sspot","who":"Hanh","he":false,"nums":[9,0,7,8],"slip":"zero","at":0},
            {"type":"sspot","who":"Tam","he":false,"nums":[15,8,21,12,17],"slip":"max","at":2}] },
          { mode: "your", lo: ["6Ss.03"], twm: ["TWM.07", "TWM.04"], v: [
            {"type":"claim","who":"Kim","ok":false,"at":1,"says":"The median of 9, 2, 7, 4, 5 is 7.","reasons":[{"t":"in order the data is 2, 4, 5, 7, 9. The middle value is 5."},{"t":"7 is in the middle of the list, so it is the median.","why":"The list is not in order yet. Put the data in order first. Then find the middle."},{"t":"9 − 2 = 7, so the median is 7.","why":"9 − 2 = 7 is the range, not the median. The median is the middle value of the data in order."}],"hint":{"pic":{"k":"dcards","nums":[9,2,7,4,5]},"step":"Write the five numbers in order, from smallest to largest. Which one is in the middle?"},"worked":"In order: 2, 4, 5, 7, 9. The middle value is 5, so the median is 5, not 7.","model":"Kim is incorrect because in order the data is 2, 4, 5, 7, 9, and the middle value is 5."},
            {"type":"claim","who":"Dung","ok":true,"at":0,"says":"The mean of 4, 6 and 11 is 7.","reasons":[{"t":"4 + 6 + 11 = 21 and 21 ÷ 3 = 7."},{"t":"the mean must be one of the numbers, and 7 is not in the list.","why":"The mean does not have to be in the data set. Work it out: total ÷ number of values."},{"t":"the middle number is 6, so the mean is 6.","why":"6 is the median. The mean is the total divided by the number of values."}],"hint":{"pic":{"k":"dtowers","nums":[4,6,11],"sum":true},"step":"Add the three numbers. Then divide the total by 3."},"worked":"4 + 6 + 11 = 21. There are 3 values. 21 ÷ 3 = 7. The mean is 7.","model":"Dung is correct because 4 + 6 + 11 = 21 and 21 ÷ 3 = 7."},
            {"type":"claim","who":"Hai","ok":false,"at":2,"says":"The data set 5, 8, 5, 2, 8, 6 has no mode, because two numbers appear twice.","reasons":[{"t":"5 and 8 both appear twice, more often than the other values. The data has two modes: it is bimodal."},{"t":"only the bigger number, 8, is the mode.","why":"5 appears twice too. Both values are modes."},{"t":"when two numbers appear twice, they cancel out.","why":"Values do not cancel out. 5 and 8 are both the most common values, so both are modes."}],"hint":{"pic":{"k":"dcards","nums":[5,8,5,2,8,6],"sorted":true,"cap":"The data in order"},"step":"Count how many times each value appears. Can two values both be the most common?"},"worked":"In order: 2, 5, 5, 6, 8, 8. 5 appears twice and 8 appears twice. The other values appear once. So there are two modes, 5 and 8.","model":"Hai is incorrect because 5 and 8 both appear twice, so the data has two modes."}] }] }] }
    ],
    // Notes: how to do it, each with a worked example and a picture made by the maths tools; then one gap
    // sentence per note, in the same order (the first choice in the braces is the right one).
    notes: {
      items: [
        { en: 'An [[average]] is one value that describes a whole [[data set]]. The [[mode]], the [[median]] and the [[mean]] are three averages.',
          vi: 'Giá trị đại diện (average) là một giá trị mô tả cả bộ dữ liệu. Mốt, trung vị và số trung bình cộng là ba giá trị đại diện.',
          example: ['Data: 3, 5, 5, 6, 11', 'mode *5*, median *5*, mean *6*'],
          pic: { k: 'dcards', nums: [3, 5, 5, 6, 11], sorted: true } },
        { en: 'The [[mode]] is the value that appears most often. With two modes, the data is [[bimodal]]. If every value appears once, there is no mode.',
          vi: 'Mốt là giá trị xuất hiện nhiều lần nhất. Bộ dữ liệu có hai mốt gọi là bimodal (hai mốt). Nếu mỗi giá trị chỉ xuất hiện một lần thì không có mốt.',
          example: ['2, 4, 4, 7, 4: the mode is *4*.', '1, 1, 5, 8, 8: the modes are *1 and 8*.'],
          pic: { k: 'dcards', nums: [2, 4, 4, 7, 4], show: 'mode', cap: 'mode = 4' } },
        { en: 'For the [[median]], put the [[data]] in order. The median is the middle value. With two middle values, it is halfway between them.',
          vi: 'Để tìm trung vị, hãy sắp xếp dữ liệu theo thứ tự. Trung vị là giá trị ở giữa. Nếu có hai giá trị ở giữa, trung vị nằm chính giữa hai giá trị đó.',
          example: ['9, 2, 6 in order is 2, 6, 9: the median is *6*.', '2, 6, 8, 9: halfway between 6 and 8 is *7*.'],
          pic: { k: 'dcards', nums: [8, 2, 9, 6], show: 'median', cap: 'halfway between 6 and 8: median = 7' } },
        { en: 'For the [[mean]], add all the values to find the [[total]]. Then divide by the number of values. A value of 0 still counts.',
          vi: 'Để tìm số trung bình cộng, cộng tất cả các giá trị để được tổng. Rồi chia cho số các giá trị. Giá trị 0 vẫn được tính.',
          example: ['2, 7, 4, 3: the total is *16*.', '16 ÷ 4 = *4*, so the mean is 4.'],
          pic: { k: 'dtowers', nums: [2, 7, 4, 3], line: true, cap: 'Level towers would all have 4' } },
        { en: 'The [[range]] is the largest value take away the smallest. It tells how spread out the data is. It is not an average.',
          vi: 'Khoảng biến thiên là giá trị lớn nhất trừ giá trị bé nhất. Nó cho biết dữ liệu trải rộng thế nào. Nó không phải là một giá trị đại diện.',
          example: ['3, 12, 7, 9: the largest is 12, the smallest is 3.', '12 − 3 = *9*, so the range is 9.'],
          pic: { k: 'dcards', nums: [3, 12, 7, 9], show: 'range', cap: '12 − 3 = 9' } },
        { en: 'Choose the average that fits. One very large or very small value pulls the mean. Then the median is better. Use the mode for the most common one, like a shoe size.',
          vi: 'Hãy chọn giá trị đại diện phù hợp. Một giá trị rất lớn hoặc rất bé kéo số trung bình cộng về phía nó. Khi đó trung vị tốt hơn. Dùng mốt cho thứ phổ biến nhất, như cỡ giày.',
          example: ['1, 1, 2, 2, 9: the mean is *3*, the median is *2*.', 'The 9 pulls the mean up. The median describes the data better.'],
          pic: { k: 'dtowers', nums: [1, 1, 2, 2, 9], line: true, cap: 'The mean, 3, is above four of the five towers' } },
        { en: 'The [[frequency]] of a value is how many times it appears. In a frequency table, the mode has the highest frequency.',
          vi: 'Tần số của một giá trị là số lần giá trị đó xuất hiện. Trong bảng tần số, mốt có tần số cao nhất.',
          example: ['Size 35 has the highest frequency, 8.', 'So the mode is *35*.'],
          pic: { k: 'dfreq', head: ['Shoe size', 'Frequency'], vals: [34, 35, 36], freqs: [5, 8, 4], hl: 1 } }
      ],
      check: [
        { sentence: 'The mode, the median and the mean are three {averages|ranges|totals}.', answer: 'averages' },
        { sentence: 'The mode of 6, 9, 6, 2, 9, 6 is {6|9|2}.', answer: '6' },
        { sentence: 'The median of 7, 1, 10, 4, 5 is {5|10|4}.', answer: '5' },
        { sentence: 'The mean of 3, 0, 9, 8 is {5|20|10}.', answer: '5' },
        { sentence: 'The range of 15, 6, 20, 9 is {14|20|5}.', answer: '14' },
        { sentence: 'For the data 2, 3, 3, 4, 38 the best average is the {median|mean|range}.', answer: 'median' },
        { sentence: 'In a frequency table, the mode has the {highest|lowest|middle} frequency.', answer: 'highest' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard: 5 at DOK 1, 4 at DOK 2, 1 at DOK 3 (T.DOK_MIX), each with
    // lo, twm and 3 sets of numbers (play 1 uses v[0]). One objective, ten different jobs: each of the four
    // measures, all four for one set, a missing value, two sets to compare, the average that fits, a mistake to
    // spot and a general claim to test.
    test: {
      items: [
        { dok: 1, lo: ["6Ss.03"], twm: ["TWM.05"], v: [
          {"type":"sfreq","head":["Number of goals","Frequency"],"vals":[3,4,5,6,7],"freqs":[2,6,7,4,1],"ctx":"A handball team plays 20 matches."},
          {"type":"smodes","nums":[29,31,30,33,28,32,27],"unit":"°C","at":2,"ctx":"Here are the temperatures, in °C, at noon on the 7 days of one week."},
          {"type":"smodes","nums":[8,5,9,5,7,9,6],"unit":"stickers","at":0,"ctx":"Here are the numbers of stickers 7 children have."}
        ] },
        { dok: 1, lo: ["6Ss.03"], twm: ["TWM.05"], v: [
          {"type":"smedian","nums":[24,17,30,21,26],"unit":"cm","ctx":"Here are the heights, in cm, of 5 bean plants."},
          {"type":"smedian","nums":[9,12,8,11,10,15],"unit":"years","ctx":"Here are the ages, in years, of the 6 children in a chess club."},
          {"type":"smedian","nums":[38,52,41,60,47],"unit":"cm","ctx":"Here are the lengths, in cm, of 5 fish."}
        ] },
        { dok: 1, lo: ["6Ss.03"], twm: ["TWM.05"], v: [
          {"type":"srange","nums":[45,120,80,15,95,60],"unit":"mm","ctx":"Here is the rainfall, in mm, in 6 months."},
          {"type":"srange","nums":[12,27,8,19,33],"unit":"kg","ctx":"Here are the masses, in kg, of 5 dogs."},
          {"type":"srange","nums":[41,26,58,33,47,29],"unit":"points","ctx":"Here are the scores of 6 players in a darts game."}
        ] },
        { dok: 1, lo: ["6Ss.03"], twm: ["TWM.05"], v: [
          {"type":"smean","nums":[7,10,6,13],"unit":"points","ctx":"Here are the points Ngoc scores in 4 rounds of a quiz."},
          {"type":"smean","nums":[18,22,15,19,26],"unit":"m","ctx":"Here are the lengths, in metres, of 5 ball throws."},
          {"type":"smean","nums":[12,16,8,14],"unit":"laps","ctx":"Here are the numbers of laps Long swims on 4 days."}
        ] },
        { dok: 1, lo: ["6Ss.03"], twm: ["TWM.05"], v: [
          {"type":"sall","nums":[9,6,17,6,12],"unit":"press-ups","ctx":"Here are the numbers of press-ups Binh does on 5 days."},
          {"type":"sall","nums":[14,8,11,14,5,10,22],"unit":"goals","ctx":"Here are the goals a team scores in 7 netball matches."},
          {"type":"sall","nums":[20,35,20,45,30,24],"unit":"minutes","ctx":"Here are the minutes Chi cycles on 6 days."}
        ] },
        { dok: 2, lo: ["6Ss.03"], twm: ["TWM.01"], v: [
          {"type":"smissmean","known":[6,11,7,8],"mean":9,"what":"score","ctx":"Hanh plays 5 rounds of a game."},
          {"type":"smissrange","known":[138,145,141,150],"range":17,"end":"min","unit":"cm","ctx":"Five friends measure their heights in cm."},
          {"type":"smissmean","known":[12,15,11,14,13],"mean":14,"what":"time","short":true,"unit":"minutes","ctx":"Son measures how long 6 bus journeys take."}
        ] },
        { dok: 2, lo: ["6Ss.03"], twm: ["TWM.07"], v: [
          {"type":"scompare","by":"mean","ask":"greater","at":2,"unit":"tomatoes","a":{"name":"Linh","nums":[9,14,11,6]},"b":{"name":"Phong","nums":[12,8,13,11]},"q":"Linh and Phong each grow 4 tomato plants. Here are the numbers of tomatoes on each plant. Who has the greater <b>mean</b> number of tomatoes?"},
          {"type":"scompare","by":"range","ask":"smaller","at":0,"unit":"points","a":{"name":"Yen","nums":[7,9,4,10,6]},"b":{"name":"Hai","nums":[8,6,7,9,8]},"q":"Yen and Hai each shoot 5 arrows. Here are their scores. Whose scores are closer together? Use the <b>range</b>."},
          {"type":"scompare","by":"median","ask":"greater","at":1,"unit":"seconds","a":{"name":"Class A","nums":[34,29,41,37,32]},"b":{"name":"Class B","nums":[36,30,33,40,38]},"q":"Two classes run a race. Here are the times, in seconds, of 5 runners from each class. Which class has the greater <b>median</b> time?"}
        ] },
        { dok: 2, lo: ["6Ss.03"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"sbest","nums":[9,10,10,11,60],"unit":"years","thing":"age at the table","at":1,"ctx":"Here are the ages, in years, of the 5 people at one table at a party."},
          {"type":"sbest","nums":[3,5,4,6,2,40],"unit":"minutes","thing":"wait","at":2,"ctx":"Here are the minutes 6 people wait for a bus."},
          {"type":"sbest","nums":[16,18,2,17,22],"unit":"points","thing":"game","at":0,"ctx":"Here are the points Dung scores in 5 basketball games."}
        ] },
        { dok: 2, lo: ["6Ss.03"], twm: ["TWM.07"], v: [
          {"type":"sspot","who":"Giang","he":false,"nums":[14,6,11,3,9],"slip":"unsorted","at":2},
          {"type":"sspot","who":"Hung","he":true,"nums":[12,0,9,15],"slip":"zero","at":1},
          {"type":"sspot","who":"Kim","he":false,"nums":[26,9,18,31,14],"slip":"max","at":0}
        ] },
        { dok: 3, lo: ["6Ss.03"], twm: ["TWM.01", "TWM.04"], v: [
          {"type":"claim","who":"Trang","ok":false,"at":2,"says":"The mean of a data set is always one of the numbers in the data set.","reasons":[{"t":"the mean of 2, 3 and 7 is 4, and 4 is not in the data set. One example like this shows the rule is not always true."},{"t":"the mean of 2, 4 and 6 is 4, and 4 is in the data set.","why":"That example fits. But one example that fits is not enough for “always”. Try 2, 3 and 7."},{"t":"the mean is the middle number, so it is always in the data set.","why":"The middle number is the median. The mean is the total divided by the number of values."}],"hint":{"pic":{"k":"dtowers","nums":[2,3,7],"sum":true},"step":"Test the rule. Find the mean of 2, 4 and 6. Then find the mean of 2, 3 and 7."},"worked":"2 + 4 + 6 = 12 and 12 ÷ 3 = 4: this mean is in the data set. But 2 + 3 + 7 = 12 and 12 ÷ 3 = 4: this mean is not in the data set. So the rule is not always true.","model":"Trang is incorrect because the mean of 2, 3 and 7 is 4, and 4 is not in the data set."},
          {"type":"claim","who":"Minh","ok":false,"at":0,"says":"A data set can never have more than one mode.","reasons":[{"t":"in 1, 1, 4, 6, 6 both 1 and 6 appear twice. This data set has two modes."},{"t":"the mode is the most common value, and only one value can be the most common.","why":"Two values can appear the same number of times, more often than all the others. Try 1, 1, 4, 6, 6."},{"t":"in 2, 5, 5, 9 the only mode is 5.","why":"That example has one mode. But “never” must be true for every data set. Try 1, 1, 4, 6, 6."}],"hint":{"pic":{"k":"dcards","nums":[1,1,4,6,6],"show":"mode"},"step":"Test the rule. Look for the mode of 2, 5, 5, 9. Then look for the mode of 1, 1, 4, 6, 6."},"worked":"In 1, 1, 4, 6, 6 the values 1 and 6 both appear twice, and 4 appears once. So this data set has two modes, 1 and 6: it is bimodal. The rule is not true.","model":"Minh is incorrect because 1, 1, 4, 6, 6 has two modes, 1 and 6."},
          {"type":"claim","who":"Yen","ok":false,"at":1,"says":"When you put one more value into a data set, and it is larger than all the other values, the median always changes.","reasons":[{"t":"the median of 3, 5, 5, 8 is 5. Put in 20: the median of 3, 5, 5, 8, 20 is still 5."},{"t":"the median of 2, 4, 6 is 4. Put in 10: the median of 2, 4, 6, 10 is 5.","why":"That example fits. But “always” must be true for every data set. Try 3, 5, 5, 8 and put in 20."},{"t":"a larger value always makes every average bigger.","why":"It makes the mean bigger. The median can stay the same: try 3, 5, 5, 8 and put in 20."}],"hint":{"pic":[{"k":"dcards","nums":[3,5,5,8],"show":"median","cap":"3, 5, 5, 8"},{"k":"dcards","nums":[3,5,5,8,20],"show":"median","cap":"3, 5, 5, 8, 20"}],"step":"Test the rule. Find the median of 3, 5, 5, 8. Then put in 20 and find the median again."},"worked":"The median of 3, 5, 5, 8 is halfway between 5 and 5: it is 5. With 20 put in, the data is 3, 5, 5, 8, 20 and the middle value is 5. The median did not change. So the rule is not always true.","model":"Yen is incorrect because the median of 3, 5, 5, 8 is 5, and with 20 put in it is still 5."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). Made and checked by
    // tools/gen_lightning_s9.py.
    lightning: {
      secs: 60,
      items: [
        ["Which one tells how spread out data is?", ["range", "mean", "mode"]],
        ["Range of 12, 23, 28, 26, 13", ["16", "28", "1"]],
        ["Median of 7, 19, 14, 3", ["10.5", "7", "14"]],
        ["Mean of 0, 6, 13, 13, 2", ["6.8", "34", "8.5"]],
        ["Median of 17, 2, 10, 5, 8, 6", ["7", "6", "8"]],
        ["Median of 19, 17, 1, 16, 1", ["16", "1", "19"]],
        ["Total 42, 6 values. The mean is", ["7", "36", "42"]],
        ["Mean of 10, 14, 7, 1, 0", ["6.4", "32", "8"]],
        ["Range of 5, 20, 8, 24, 13, 11", ["19", "24", "6"]],
        ["Total 24, 4 values. The mean is", ["6", "20", "24"]],
        ["Mode of 10, 10, 6, 11, 3", ["10", "11", "2"]],
        ["4 values have a mean of 9. Their total is", ["36", "13", "9"]],
        ["Mean of 10, 15, 6, 13, 11", ["11", "55", "15"]],
        ["Mode of 5, 5, 7, 8, 6, 6", ["5 and 6", "5 only", "no mode"]],
        ["The middle value of data in order is the", ["median", "mode", "range"]],
        ["Data with two modes is", ["bimodal", "in order", "level"]],
        ["Mean of 5, 0, 15, 14", ["8.5", "34", "9.5"]],
        ["Median of 9, 17, 8, 5, 14, 6, 8", ["8", "5", "17"]],
        ["Mode of 4, 3, 1, 5, 8, 5, 7", ["5", "8", "2"]],
        ["Which one is NOT an average?", ["range", "mode", "median"]],
        ["Mean of 0, 12, 7, 1, 3", ["4.6", "23", "3"]],
        ["Mode of 4, 9, 10, 11, 4", ["4", "9", "11"]],
        ["6 values have a mean of 7. Their total is", ["42", "13", "7"]],
        ["Total 18, 4 values. The mean is", ["4.5", "14", "18"]],
        ["Range of 2, 4, 10, 25, 15", ["23", "25", "13"]],
        ["Mean of 8, 2, 2, 5, 10", ["5.4", "27", "5"]],
        ["Mode of 7, 9, 3, 10, 12", ["no mode", "12", "9"]],
        ["Largest value − smallest value gives the", ["range", "mean", "mode"]],
        ["Median of 5, 3, 2, 8", ["4", "3", "5"]],
        ["Mode of 8, 3, 2, 3, 2, 1", ["2 and 3", "2 only", "no mode"]],
        ["Mean of 11, 12, 4", ["9", "27", "11"]],
        ["Range of 14, 16, 2, 4, 13, 25", ["23", "25", "11"]],
        ["Total 27, 3 values. The mean is", ["9", "24", "27"]],
        ["Mode of 10, 1, 2, 7, 3", ["no mode", "10", "3"]],
        ["5 values have a mean of 6. Their total is", ["30", "11", "6"]],
        ["Mode of 10, 5, 7, 11, 7", ["7", "11", "2"]],
        ["Median of 17, 15, 5, 7, 18", ["15", "5", "18"]],
        ["Mode of 6, 8, 2, 4, 5", ["no mode", "8", "5"]],
        ["Median of 7, 12, 4, 20", ["9.5", "7", "12"]],
        ["Median of 3, 2, 13, 18, 11", ["11", "13", "18"]],
        ["Median of 18, 4, 20, 19", ["18.5", "18", "19"]],
        ["3 values have a mean of 12. Their total is", ["36", "15", "12"]],
        ["Median of 19, 11, 20, 14, 20", ["19", "20", "11"]],
        ["Median of 12, 19, 11, 3, 12", ["12", "11", "19"]],
        ["Range of 28, 16, 14, 4, 30, 2", ["28", "30", "26"]],
        ["Range of 8, 29, 26, 9, 22", ["21", "29", "14"]],
        ["Every value appears once. The data has", ["no mode", "no median", "no range"]],
        ["Median of 15, 12, 9, 1, 8, 18, 14", ["12", "1", "18"]],
        ["Total ÷ number of values gives the", ["mean", "median", "range"]],
        ["Median of 12, 5, 19, 4, 17", ["12", "19", "4"]],
        ["Median of 15, 14, 13, 5", ["13.5", "13", "14"]],
        ["Mode of 5, 5, 11, 5, 9, 7", ["5", "6", "11"]],
        ["How many times a value appears is its", ["frequency", "range", "total"]],
        ["Range of 16, 29, 11, 9, 10", ["20", "29", "6"]],
        ["Range of 18, 11, 23, 30, 3", ["27", "30", "15"]],
        ["The best average for favourite colours is the", ["mode", "mean", "median"]],
        ["Mean of 8, 3, 7, 6", ["6", "24", "6.5"]],
        ["Total 35, 5 values. The mean is", ["7", "30", "35"]],
        ["Mode of 10, 12, 3, 3, 1", ["3", "12", "2"]],
        ["Mode of 8, 10, 8, 6, 1", ["8", "10", "2"]],
        ["Median of 13, 14, 3, 16, 11, 15", ["13.5", "13", "14"]],
        ["Range of 2, 27, 11, 16, 18", ["25", "27", "16"]],
        ["Range of 20, 19, 6, 29", ["23", "29", "9"]],
        ["Mode of 6, 2, 8, 8, 5, 5", ["5 and 8", "5 only", "no mode"]],
        ["Median of 13, 8, 18, 11, 16, 20, 7", ["13", "11", "20"]],
        ["Mean of 14, 0, 6, 0, 10", ["6", "30", "7.5"]],
        ["Before you find the median, you", ["order the data", "add the data", "halve the data"]],
        ["Median of 2, 19, 18, 17, 4", ["17", "18", "19"]],
        ["One very large value pulls up the", ["mean", "median", "mode"]],
        ["Median of 11, 10, 3, 5, 8, 15", ["9", "8", "10"]],
        ["Mean of 6, 9, 13, 3, 11", ["8.4", "42", "9"]],
        ["Mean of 7, 9, 1, 3, 0", ["4", "20", "5"]],
        ["Mode of 12, 5, 12, 4, 2", ["12", "5", "2"]],
        ["Mode of 11, 3, 11, 9, 2", ["11", "9", "2"]],
        ["Mode of 8, 4, 8, 10, 7, 12, 9", ["8", "12", "2"]],
        ["Mode of 2, 9, 7, 7, 6", ["7", "9", "2"]],
        ["The value that appears most often is the", ["mode", "median", "mean"]],
        ["Mode of 4, 3, 3, 5, 2, 8, 10", ["3", "4", "10"]],
        ["Mean of 2, 12, 7", ["7", "21", "12"]],
        ["Median of 7, 5, 14, 8", ["7.5", "7", "8"]]
      ]
    },
    // My self-check: the goals of the stop. again: the step to practise again for each goal (c = See it, r and a = Practise).
    selfcheck: {
      goals: ["find the mode, also when there are two modes or no mode", "put data in order and find the median", "find the mean: the total divided by the number of values", "find the range: the largest value take away the smallest", "choose the average that describes the data best"],
      again: ["r", "c", "r", "a", "a"]
    }
  };
})(window.T = window.T || {});
