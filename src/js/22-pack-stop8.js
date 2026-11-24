/* 22-pack-stop8.js - ALL the content of Stop 8, Circles (Grade 5, Cambridge Stage 6: 6Gg.02, 6Gg.11).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The questions are data for the
   Grade 5 models (08-g5-models-s8.js) and the tools of 39-g5-tools-s8.js. Each question gives ONE length (r or d);
   the model works the other one out. None of the numbers, names or sentences are those of the EOS1 papers
   (no diameter of 8 cm, no radius of 6 cm, no centre A). */
(function (T) {
  'use strict';

  T.packs[8] = {
    n: 8,
    title: "Circles",
    los: ["6Gg.02", "6Gg.11"],
    blurb: {
      en: "Know the parts of a *circle*. Draw a circle with compasses.",
      vi: "Biết các phần của *hình tròn*. Vẽ hình tròn bằng com-pa."
    },
    words: {
      sets: [
        { id: 'A', title: { en: 'Parts of a circle', vi: 'Các phần của hình tròn' }, keys: ['circle', 'centre', 'radius', 'diameter', 'circumference'] },
        { id: 'B', title: { en: 'Draw a circle', vi: 'Vẽ hình tròn' }, keys: ['compasses', 'construct', 'double', 'half'] }
      ],
      items: {
        'circle': { art: 'w-circle', vi: 'hình tròn', def: 'A round flat shape. Every point on its edge is the same distance from the middle.' },
        'centre': { art: 'w-centre', vi: 'tâm', def: 'The point in the middle of a circle. The point of the compasses goes here.' },
        'radius': { art: 'w-radius', vi: 'bán kính', def: 'A straight line from the centre of a circle to its edge. For more than one we say radii.' },
        'diameter': { art: 'w-diameter', vi: 'đường kính', def: 'A straight line across a circle, through the centre. It is as long as 2 radii.' },
        'circumference': { art: 'w-circumference', vi: 'đường tròn (độ dài của nó là chu vi hình tròn)', def: 'The line all the way round a circle. Also the distance all the way round it.' },
        'compasses': { art: 'w-compasses', vi: 'com-pa', def: 'A tool for drawing circles. It has a sharp point and a pencil.' },
        'construct': { art: 'w-construct', vi: 'dựng hình (vẽ chính xác bằng dụng cụ)', def: 'To draw a shape exactly, with tools like compasses and a ruler.' },
        'double': { art: 'w-double', vi: 'gấp đôi', def: 'Two times as much. Double 6.5 is 13. Double the radius to get the diameter.' },
        'half': { art: 'w-half', vi: 'một nửa', def: 'One of 2 equal parts. Half of 7 is 3.5. The radius is half of the diameter.' }
      }
    },
    // See it: Concrete. Light up the parts of a circle; draw a circle with the compasses (halve the diameter first);
    // then the challenge (the data shape is in 45-see.js).
    see: {
      scenes: [
        { id: 'parts', title: { en: 'Parts of a circle', vi: 'Các phần của hình tròn' }, tool: 'cparts', cparts: { r: '5', unit: 'cm' },
          steps: [
            { can: { show: 'centre' }, wait: 'show', until: { part: 'centre' },
              zip: { en: 'This is a *circle*. Tap *centre*.', vi: 'Đây là một *hình tròn*. Bấm *centre* (tâm).' },
              then: { en: 'The *centre* is the point in the middle.', vi: '*Tâm* là điểm ở chính giữa.' } },
            { can: { show: 'radius' }, wait: 'show', until: { part: 'radius' },
              zip: { en: 'Now tap *radius*.', vi: 'Bây giờ bấm *radius* (bán kính).' },
              then: { en: 'A *radius*: from the centre to the edge. *5\u00a0cm*.', vi: '*Bán kính*: từ tâm đến đường tròn. *5\u00a0cm*.' } },
            { can: { show: 'diameter' }, wait: 'show', until: { part: 'diameter' },
              zip: { en: 'Tap *diameter*. It goes through the centre.', vi: 'Bấm *diameter* (đường kính). Nó đi qua tâm.' },
              then: { en: 'The *diameter* is 2 radii: *10\u00a0cm*.', vi: '*Đường kính* bằng 2 bán kính: *10\u00a0cm*.' } },
            { can: { show: 'circumference' }, wait: 'show', until: { part: 'circumference' },
              zip: { en: 'Last one. Tap *circumference*.', vi: 'Phần cuối. Bấm *circumference* (đường tròn).' },
              then: { en: 'The *circumference* goes all the way round. Tap *Next*.', vi: '*Đường tròn* đi hết một vòng. Bấm *Next*.' } }] },
        { id: 'draw', title: { en: 'Draw with compasses', vi: 'Vẽ bằng com-pa' }, tool: 'compass', compass: { pts: [['P', 5, 5]], h: 2, measure: true },
          steps: [
            { can: { set: 5 }, wait: 'set', until: { h: 5 },
              zip: { en: 'A circle *5\u00a0cm* across. Open the compasses to *2.5\u00a0cm*.', vi: 'Một hình tròn rộng *5\u00a0cm*. Mở com-pa *2.5\u00a0cm*.' },
              then: { en: 'Half of 5 is 2.5. That is the *radius*.', vi: 'Một nửa của 5 là 2.5. Đó là *bán kính*.' } },
            { can: { point: 'P' }, wait: 'point', until: { at: 'P' },
              zip: { en: 'Put the point on *P*. Tap the dot.', vi: 'Đặt đầu nhọn vào *P*. Bấm vào chấm.' },
              then: { en: '*P* is the *centre* of your circle.', vi: '*P* là *tâm* của hình tròn.' } },
            { can: { draw: true }, wait: 'draw', until: { drawn: true },
              zip: { en: 'Now tap *Draw*. Watch the pencil.', vi: 'Bây giờ bấm *Draw* (Vẽ). Nhìn đầu bút chì.' },
              then: { en: 'The pencil drew the *circumference*.', vi: 'Bút chì đã vẽ *đường tròn*.' } },
            { can: { across: true }, wait: 'across', until: { across: true },
              zip: { en: 'Tap *Measure across*.', vi: 'Bấm *Measure across* (Đo chiều ngang).' },
              then: { en: '*5\u00a0cm* across: the *diameter*. Double the radius. Tap *Next*.', vi: 'Rộng *5\u00a0cm*: *đường kính*. Gấp đôi bán kính. Bấm *Next*.' } }] },
        { id: 'challenge', title: { en: 'Circle challenge', vi: 'Thử thách hình tròn' },
          challenge: {
            end: { en: 'You did it! You know circles and compasses.', vi: 'Em làm được rồi! Em hiểu hình tròn và com-pa.' },
            result: 'You named the parts of a circle and drew circles with compasses.',
            rounds: [
          { mode: "our", lo: ["6Gg.02"], v: [
            {"type":"cline","ask":"r","lines":["d","c","r"],"tap":true},
            {"type":"cline","ask":"r","lines":["r","d","c"],"turn":20,"tap":true},
            {"type":"cline","ask":"r","lines":["c","r","d"],"turn":-15,"tap":true}] },
          { mode: "your", lo: ["6Gg.02"], v: [
            {"type":"cname","part":"centre","at":1},
            {"type":"cname","part":"radius","a":235,"at":0},
            {"type":"cname","part":"diameter","a":130,"at":3}] },
          { mode: "your", lo: ["6Gg.02"], v: [
            {"type":"crd","items":[{"r":"5.5"}],"unit":"cm","fig":true},
            {"type":"crd","items":[{"d":"7"}],"unit":"cm","fig":true},
            {"type":"crd","items":[{"r":"7.5"}],"unit":"cm","fig":true}] },
          { mode: "your", lo: ["6Gg.11"], v: [
            {"type":"cdraw","r":"3.5","at":"P"},
            {"type":"cdraw","r":"2","at":"M"},
            {"type":"cdraw","r":"4.5","at":"K"}] },
          { mode: "your", lo: ["6Gg.11"], v: [
            {"type":"cdraw","d":"10","at":"M"},
            {"type":"cdraw","d":"4","at":"K"},
            {"type":"cdraw","d":"9","at":"C"}] }] } }]
    },
    // Practise: Pictorial (Draw it: the circle and the compasses) then Abstract (Solve it, like the test).
    practise: [
      { id: 's8r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Use the circle and the compasses.', vi: 'Dùng hình tròn và com-pa.' },
        levels: [
      { title: { en: "Lines in a circle", vi: "Các đoạn thẳng trong hình tròn" }, rounds: [
          { mode: "our", lo: ["6Gg.02"], twm: ["TWM.05"], v: [
            {"type":"cline","ask":"d","lines":["r","c","d"],"tap":true},
            {"type":"cline","ask":"d","lines":["d","r","c"],"turn":25,"tap":true},
            {"type":"cline","ask":"d","lines":["c","d","s","r"],"tap":true}] },
          { mode: "your", lo: ["6Gg.02"], twm: ["TWM.06"], v: [
            {"type":"cline","ask":"none","lines":["r","d","c"],"turn":10,"tap":true},
            {"type":"cline","ask":"none","lines":["d","s","r"],"turn":-20,"tap":true},
            {"type":"cline","ask":"none","lines":["c","r","d","r"],"tap":true}] }] },
      { title: { en: "Use the compasses", vi: "Dùng com-pa" }, rounds: [
          { mode: "your", lo: ["6Gg.11"], twm: ["TWM.02"], v: [
            {"type":"cdraw","r":"5","at":"P"},
            {"type":"cdraw","r":"1","at":"M"},
            {"type":"cdraw","r":"1.5","at":"K","pts":[["K",6,5],["T",2,2]]}] },
          { mode: "your", lo: ["6Gg.11"], twm: ["TWM.02"], v: [
            {"type":"cdraw","d":"2","at":"C"},
            {"type":"cdraw","d":"7","at":"P"},
            {"type":"cdraw","d":"3","at":"M","pts":[["S",3,3],["M",6,6]]}] }] },
      { title: { en: "How big is the circle?", vi: "Hình tròn to bao nhiêu?" }, rounds: [
          { mode: "your", lo: ["6Gg.11", "6Gg.02"], twm: ["TWM.02"], v: [
            {"type":"cwhich","d":"3","wrong":["3","1"],"at":1},
            {"type":"cwhich","r":"2","wrong":["1","3.5"],"at":2},
            {"type":"cwhich","d":"2","wrong":["2","0.5"],"at":0}] },
          { mode: "your", lo: ["6Gg.02"], twm: ["TWM.02"], v: [
            {"type":"crow","n":3,"r":"4.5","give":"r","ask":"len","unit":"cm"},
            {"type":"crow","n":4,"r":"1.5","give":"r","ask":"len","unit":"cm"},
            {"type":"crow","n":5,"r":"3.5","give":"d","ask":"len","unit":"cm"}] }] }] },
      { id: 's8a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Parts of a circle", vi: "Các phần của hình tròn" }, rounds: [
          { mode: "your", lo: ["6Gg.02"], twm: ["TWM.05"], v: [
            {"type":"cname","part":"radius","a":40,"at":2},
            {"type":"cname","part":"circumference","at":0},
            {"type":"cname","part":"diameter","a":75,"at":3}] },
          { mode: "your", lo: ["6Gg.02"], twm: ["TWM.05"], v: [
            {"type":"cshow","part":"diameter","opts":["diameter","chord","radius"],"at":1},
            {"type":"cshow","part":"radius","opts":["radius","short","diameter"],"at":2},
            {"type":"cshow","part":"diameter","opts":["diameter","radius","chord"],"a":70,"at":0}] },
          { mode: "your", lo: ["6Gg.02"], twm: ["TWM.06"], v: [
            {"type":"cline","ask":"d","lines":["c","d","r"],"turn":15},
            {"type":"cline","ask":"none","lines":["r","c","d"],"turn":-10},
            {"type":"cline","ask":"r","lines":["s","d","r","c"]}] }] },
      { title: { en: "Radius and diameter", vi: "Bán kính và đường kính" }, rounds: [
          { mode: "your", lo: ["6Gg.02"], twm: ["TWM.02"], v: [
            {"type":"crd","items":[{"r":"7"},{"d":"11"}],"unit":"cm"},
            {"type":"crd","items":[{"d":"15"},{"r":"9.5"}],"unit":"cm"},
            {"type":"crd","items":[{"r":"12.5"},{"d":"30"}],"unit":"mm"}] },
          { mode: "your", lo: ["6Gg.11"], twm: ["TWM.02"], v: [
            {"type":"ccset","d":"13","unit":"cm","who":"Hoa"},
            {"type":"ccset","r":"5.5","unit":"cm","who":"Duc"},
            {"type":"ccset","d":"30","unit":"mm","to":"cm","who":"Linh"}] },
          { mode: "your", lo: ["6Gg.02"], twm: ["TWM.01"], v: [
            {"type":"crow","n":6,"r":"5","give":"r","ask":"len","unit":"cm","obj":["plate","plates"],"text":"{n} round plates touch in a row on a shelf. Each plate has a radius of {r}. How long is the row of plates?"},
            {"type":"csq","r":"7.5","give":"r","ask":"perim","unit":"cm"},
            {"type":"crow","n":5,"r":"3.5","give":"r","ask":"r","unit":"cm"}] }] },
      { title: { en: "Who is correct?", vi: "Ai đúng?" }, rounds: [
          { mode: "your", lo: ["6Gg.11", "6Gg.02"], twm: ["TWM.07", "TWM.08"], v: [
            {"type":"ccfix","who":"Hung","kind":"set","d":"11","unit":"cm","at":1},
            {"type":"ccfix","who":"Kim","kind":"set","d":"29","unit":"cm","at":0},
            {"type":"ccfix","who":"Giang","kind":"set","d":"15","unit":"cm","at":2}] },
          { mode: "your", lo: ["6Gg.02"], twm: ["TWM.07", "TWM.04"], v: [
            {"type":"claim","who":"Minh","ok":true,"at":1,"says":"All the radii of one circle are the same length.","reasons":[{"t":"every point on the circumference is the same distance from the centre."},{"t":"a radius that goes up is longer than a radius that goes to the side.","why":"Turn the page and the circle looks the same. Measure the two radii: they are equal."},{"t":"it is only true for small circles.","why":"It is true for every circle. The compasses stay open the same distance all the way round."}],"hint":{"pic":{"k":"circle","lines":[{"t":"r","a":20},{"t":"r","a":140},{"t":"r","a":260}]},"step":"Think how compasses draw a circle. Does the opening change when the pencil goes round?"},"worked":"The compasses stay open the same distance all the way round. So every point on the circumference is the same distance from the centre, and every radius has the same length.","model":"Minh is correct because every point on the circumference is the same distance from the centre."},
            {"type":"claim","who":"Trang","ok":false,"at":0,"fig":{"k":"circle","plain":true,"lines":[{"t":"c","a":250}]},"says":"This line goes from one side of the circle to the other side. So it is a diameter.","reasons":[{"t":"the line does not pass through the centre. A diameter must pass through the centre."},{"t":"the line is straight and it touches the circumference two times.","why":"That is true, but it is not enough. A diameter also passes through the centre."},{"t":"a diameter must start at the centre.","why":"A line that starts at the centre is a radius. A diameter goes through the centre, from side to side."}],"hint":{"pic":{"k":"circle","lines":[{"t":"d","a":0,"lab":"diameter"}]},"step":"Find the centre of the circle. Does the line pass through it?"},"worked":"The line goes from side to side, but it misses the centre. A diameter always passes through the centre. So this line is not a diameter.","model":"Trang is incorrect because the line does not pass through the centre of the circle."},
            {"type":"claim","who":"Phong","ok":true,"at":2,"says":"In one circle, a diameter is always longer than a radius.","reasons":[{"t":"a diameter is 2 radii, so it is double the length of a radius."},{"t":"a radius goes through the centre, so it is longer.","why":"A radius goes from the centre to the circumference. A diameter goes all the way across: 2 radii."},{"t":"it is only true for big circles.","why":"It is true for every circle. A diameter is always 2 radii long."}],"hint":{"pic":{"k":"circle","lines":[{"t":"r","a":0,"lab":"radius"},{"t":"r","a":180,"lab":"radius","dash":true}]},"step":"How many radii make one diameter?"},"worked":"A diameter goes through the centre. It is made of 2 radii. So it is always double the length of a radius.","model":"Phong is correct because a diameter is 2 radii long."}] }] }] }
    ],
    // Notes: how to do it, each with a worked example and a picture made by the circle tools; then one gap
    // sentence per note, in the same order (the first choice in the braces is the right one).
    notes: {
      items: [
        { en: 'A [[circle]] has a [[centre]] in the middle. The line all the way round is the [[circumference]].',
          vi: 'Hình tròn có tâm ở chính giữa. Đường bao quanh hình tròn gọi là đường tròn (circumference).',
          example: ['Every point on the circumference is the *same distance* from the centre.'],
          pic: { k: 'circle', ring: 'hl', ringLab: 'circumference', dotLab: 'centre' } },
        { en: 'A [[radius]] is a straight line from the centre to the circumference. All the radii of one circle are the same length.',
          vi: 'Bán kính là đoạn thẳng nối tâm với một điểm trên đường tròn. Mọi bán kính của một hình tròn đều dài bằng nhau.',
          example: ['This circle has a radius of *6.5\u00a0cm*.', 'Every radius of this circle is 6.5\u00a0cm long.'],
          pic: { k: 'circle', lines: [{ t: 'r', a: 150, dim: true }, { t: 'r', a: 270, dim: true }, { t: 'r', a: 30, lab: '6.5\u00a0cm' }] } },
        { en: 'A [[diameter]] is a straight line across the circle, through the centre. A line that misses the centre is not a diameter.',
          vi: 'Đường kính là đoạn thẳng nối hai điểm trên đường tròn và đi qua tâm. Đoạn thẳng không đi qua tâm thì không phải là đường kính.',
          example: ['The line through the centre is a *diameter*.', 'The other line misses the centre. It is *not* a diameter.'],
          pic: { k: 'circle', lines: [{ t: 'd', a: 0, lab: 'diameter' }, { t: 'c', a: 270, lab: 'not a diameter' }] } },
        { en: 'The diameter is [[double]] the radius. The radius is [[half]] of the diameter.',
          vi: 'Đường kính gấp đôi bán kính. Bán kính bằng một nửa đường kính.',
          example: ['Radius 12.5\u00a0cm: diameter = 2 × 12.5 = *25\u00a0cm*.', 'Diameter 7\u00a0cm: radius = 7 ÷ 2 = *3.5\u00a0cm*.'],
          pic: { k: 'circle', lines: [{ t: 'd', a: 0, lab: '25\u00a0cm' }, { t: 'r', a: 125, lab: '12.5\u00a0cm' }] } },
        { en: 'To [[construct]] a circle, use [[compasses]]. Open them to the radius. Put the point on the centre. Turn the pencil all the way round.',
          vi: 'Để dựng hình tròn, hãy dùng com-pa. Mở com-pa bằng bán kính. Đặt đầu nhọn vào tâm. Quay đầu bút chì đủ một vòng.',
          example: ['A circle with a radius of 3.5\u00a0cm:', 'open the compasses to *3.5\u00a0cm* on the ruler.'],
          pic: { k: 'cruler', r: '3.5' } },
        { en: 'When you know the diameter, halve it first. The compasses are set to the radius, never to the diameter.',
          vi: 'Khi biết đường kính, hãy chia đôi trước. Com-pa luôn mở bằng bán kính, không bao giờ bằng đường kính.',
          example: ['A circle 3\u00a0cm across: 3 ÷ 2 = 1.5.', 'Open the compasses to *1.5\u00a0cm*.'],
          pic: { k: 'cgrid', r: '1.5', across: true, big: true } }
      ],
      check: [
        { sentence: 'The line all the way round a circle is the {circumference|diameter|radius}.', answer: 'circumference' },
        { sentence: 'A radius goes from the centre to the {circumference|other side|middle}.', answer: 'circumference' },
        { sentence: 'A line across a circle that misses the centre is {not a diameter|a diameter|a radius}.', answer: 'not a diameter' },
        { sentence: 'A circle has a radius of 5.5\u00a0cm. Its diameter is {11\u00a0cm|2.75\u00a0cm|7.5\u00a0cm}.', answer: '11\u00a0cm' },
        { sentence: 'For a circle with a radius of 2\u00a0cm, open the compasses to {2\u00a0cm|4\u00a0cm|1\u00a0cm}.', answer: '2\u00a0cm' },
        { sentence: 'For a circle with a diameter of 13\u00a0cm, open the compasses to {6.5\u00a0cm|13\u00a0cm|26\u00a0cm}.', answer: '6.5\u00a0cm' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard: 5 at DOK 1, 4 at DOK 2, 1 at DOK 3 (T.DOK_MIX), each with
    // lo, twm and 3 sets of numbers (play 1 uses v[0]). No tool on the paper: boxes, ticks, claims, figures.
    test: {
      items: [
        { dok: 1, lo: ["6Gg.02"], twm: ["TWM.05"], v: [
          {"type":"cname","part":"diameter","a":155,"at":1},
          {"type":"cname","part":"radius","a":60,"at":3},
          {"type":"cshow","part":"circumference","opts":["circumference","radius","diameter"],"at":1}
        ] },
        { dok: 1, lo: ["6Gg.02"], twm: ["TWM.02"], v: [
          {"type":"crd","items":[{"r":"9"}],"unit":"cm"},
          {"type":"crd","items":[{"r":"18.5"}],"unit":"cm"},
          {"type":"crd","items":[{"r":"36"}],"unit":"mm"}
        ] },
        { dok: 1, lo: ["6Gg.02"], twm: ["TWM.02"], v: [
          {"type":"crd","items":[{"d":"17"}],"unit":"cm","fig":true},
          {"type":"crd","items":[{"d":"19"}],"unit":"cm","fig":true},
          {"type":"crd","items":[{"d":"22"}],"unit":"cm","fig":true}
        ] },
        { dok: 1, lo: ["6Gg.02"], twm: ["TWM.06"], v: [
          {"type":"cline","ask":"r","lines":["c","d","r"],"turn":-50},
          {"type":"cline","ask":"d","lines":["r","c","d"],"turn":20},
          {"type":"cline","ask":"d","lines":["r","s","c","d"]}
        ] },
        { dok: 1, lo: ["6Gg.11"], twm: ["TWM.02"], v: [
          {"type":"ccset","r":"14","unit":"cm","who":"Linh"},
          {"type":"ccset","r":"12","unit":"cm","who":"Son"},
          {"type":"ccset","r":"5","unit":"cm","who":"Yen"}
        ] },
        { dok: 2, lo: ["6Gg.11"], twm: ["TWM.02"], v: [
          {"type":"ccset","d":"330","unit":"mm","to":"cm","who":"Binh"},
          {"type":"ccset","d":"110","unit":"mm","to":"cm","who":"Hanh"},
          {"type":"ccset","d":"70","unit":"mm","to":"cm","who":"Tam"}
        ] },
        { dok: 2, lo: ["6Gg.02"], twm: ["TWM.01"], v: [
          {"type":"crow","n":4,"r":"3.5","give":"r","ask":"len","unit":"cm","box":true,"obj":["biscuit","biscuits"],"text":"{n} round biscuits touch in a row in a box. Each biscuit has a radius of {r}. How long is the row of biscuits?"},
          {"type":"crow","n":3,"r":"35","give":"r","ask":"len","unit":"cm","obj":["wheel","wheels"],"text":"A truck carries {n} equal wheels in a row. The wheels touch. Each wheel has a radius of {r}. How long is the row of wheels?"},
          {"type":"crow","n":5,"r":"1.5","give":"r","ask":"len","unit":"m","obj":["flower bed","flower beds"],"text":"{n} round flower beds touch in a row in a park. Each flower bed has a radius of {r}. How long is the row of flower beds?"}
        ] },
        { dok: 2, lo: ["6Gg.11"], twm: ["TWM.07"], v: [
          {"type":"ccfix","who":"Dung","kind":"set","d":"21","unit":"cm","at":2},
          {"type":"ccfix","who":"Hai","kind":"set","d":"27","unit":"cm","at":0},
          {"type":"ccfix","who":"Chi","kind":"set","d":"23","unit":"cm","at":1}
        ] },
        { dok: 2, lo: ["6Gg.02"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Long","ok":false,"at":1,"says":"I can draw many diameters in this circle. They all have different lengths.","fig":{"k":"circle","plain":true,"lines":[{"t":"d","a":0},{"t":"d","a":60},{"t":"d","a":125}]},"reasons":[{"t":"every diameter is 2 radii long, so all the diameters of one circle have the same length."},{"t":"a circle has only one diameter.","why":"Every straight line through the centre, from side to side, is a diameter. You can draw many."},{"t":"a diameter that goes up and down is longer than a diameter that goes across.","why":"Turn the page and the circle looks the same. Every diameter is 2 radii long."}],"hint":{"pic":{"k":"circle","lines":[{"t":"r","a":0},{"t":"r","a":180,"dash":true}]},"step":"How many radii make one diameter? Are all the radii the same length?"},"worked":"Every diameter goes through the centre. It is 2 radii long. All the radii of one circle have the same length, so all the diameters have the same length too.","model":"Long is incorrect because every diameter is 2 radii long, so all the diameters of one circle are the same length."},
          {"type":"claim","who":"Ngoc","ok":false,"at":2,"fig":{"k":"circle","plain":true,"lines":[{"t":"s","a":35}]},"says":"This line starts at the centre of the circle. So it is a radius.","reasons":[{"t":"the line stops before the circumference. A radius must reach the circumference."},{"t":"a radius must go through the centre to the other side.","why":"A line through the centre, from side to side, is a diameter. A radius starts at the centre."},{"t":"every line that starts at the centre is a radius.","why":"A radius must also end on the circumference. Look where this line ends."}],"hint":{"pic":{"k":"circle","lines":[{"t":"r","a":35,"lab":"radius"}]},"step":"A radius starts at the centre. Where must it end?"},"worked":"A radius goes from the centre to the circumference. This line starts at the centre, but it stops inside the circle. So it is not a radius.","model":"Ngoc is incorrect because the line does not reach the circumference."},
          {"type":"claim","who":"Hanh","ok":true,"at":0,"says":"The centre of a circle is exactly in the middle of every diameter.","reasons":[{"t":"a diameter is 2 radii, and the 2 radii are the same length. They meet at the centre."},{"t":"the centre is at one end of a diameter.","why":"A line from the centre to the circumference is a radius. A diameter goes through the centre, to the other side."},{"t":"it is only true for the longest diameter.","why":"All the diameters of one circle have the same length. Each one passes through the centre."}],"hint":{"pic":{"k":"circle","lines":[{"t":"r","a":30,"lab":"radius"},{"t":"r","a":210,"lab":"radius","dash":true}]},"step":"A diameter is made of 2 radii. Where do they meet?"},"worked":"A diameter goes through the centre. The centre cuts it into 2 radii, and all the radii of one circle have the same length. So the centre is exactly in the middle of every diameter.","model":"Hanh is correct because every diameter is 2 equal radii that meet at the centre."}
        ] },
        { dok: 3, lo: ["6Gg.02"], twm: ["TWM.07", "TWM.04"], v: [
          {"type":"claim","who":"Yen","ok":true,"at":2,"says":"The longest straight line you can draw inside a circle is always a diameter.","reasons":[{"t":"a line across the circle that misses the centre is always shorter than a line through the centre."},{"t":"a radius is longer than a diameter.","why":"A diameter is 2 radii long, so it is longer than a radius."},{"t":"all straight lines inside a circle have the same length.","why":"A line near the edge of the circle is short. The lines get longer when they come nearer to the centre."}],"hint":{"pic":{"k":"circle","lines":[{"t":"d","a":0,"lab":"diameter"},{"t":"c","a":90,"off":0.45},{"t":"c","a":90,"off":0.8}]},"step":"Draw lines across a circle. Which are longer: lines near the edge or lines near the centre?"},"worked":"Lines across a circle get longer when they come nearer to the centre. The longest one passes through the centre: a diameter. No line inside the circle can be longer.","model":"Yen is correct because every line that misses the centre is shorter than a diameter."},
          {"type":"claim","who":"Binh","ok":true,"at":0,"says":"If you double the radius of a circle, the diameter always doubles too.","reasons":[{"t":"the diameter is always 2 × the radius. A radius of 5\u00a0cm gives 10\u00a0cm. A radius of 10\u00a0cm gives 20\u00a0cm."},{"t":"the diameter stays the same when the radius changes.","why":"A longer radius makes a bigger circle. Try a radius of 5\u00a0cm, then 10\u00a0cm."},{"t":"the diameter only gets 2\u00a0cm longer.","why":"Try it. A radius of 5\u00a0cm gives a diameter of 10\u00a0cm. A radius of 10\u00a0cm gives 20\u00a0cm: double."}],"hint":{"pic":[{"k":"circle","lines":[{"t":"d","a":0,"lab":"? cm"},{"t":"r","a":125,"lab":"5\u00a0cm"}]}],"step":"Test it with numbers. Try a radius of 5\u00a0cm. Then double it: a radius of 10\u00a0cm."},"worked":"Radius 5\u00a0cm: diameter = 2 × 5 = 10\u00a0cm. Radius 10\u00a0cm: diameter = 2 × 10 = 20\u00a0cm. The radius doubled and the diameter doubled too. It works for every radius, because the diameter is always 2 × the radius.","model":"Binh is correct because the diameter is always 2 × the radius, so it doubles when the radius doubles."},
          {"type":"claim","who":"Giang","ok":false,"at":1,"says":"When the diameter of a circle is a whole number of centimetres, the radius is always a whole number too.","reasons":[{"t":"a diameter of 7\u00a0cm gives a radius of 3.5\u00a0cm, and 3.5 is not a whole number. One example like this shows the rule is not always true."},{"t":"half of a whole number is always a whole number, like half of 10 is 5.","why":"That example fits. But try an odd number, like 7."},{"t":"the radius is double the diameter, so it is a whole number.","why":"The radius is half of the diameter, not double."}],"hint":{"pic":{"k":"circle","lines":[{"t":"d","a":0,"lab":"7\u00a0cm"},{"t":"r","a":125,"lab":"?"}]},"step":"Test the rule. Try a diameter of 10\u00a0cm. Then try an odd number, like 7\u00a0cm."},"worked":"Diameter 10\u00a0cm: radius 5\u00a0cm, a whole number. But diameter 7\u00a0cm: radius = 7 ÷ 2 = 3.5\u00a0cm, not a whole number. So the rule is not always true.","model":"Giang is incorrect because a diameter of 7\u00a0cm gives a radius of 3.5\u00a0cm."}
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). Made and checked by
    // tools/gen_lightning_s8.py (python3 tools/gen_lightning_s8.py --write puts the list between the two markers).
    lightning: {
      secs: 60,
      items: [
        // LIGHTNING-BEGIN
        ["The point of the compasses goes on the", ["centre", "circumference", "diameter"]],
        ["Compasses open 7.5\u00a0cm. How far across is the circle?", ["15\u00a0cm", "7.5\u00a0cm", "3.75\u00a0cm"]],
        ["A circle 4\u00a0cm across. Compasses open?", ["2\u00a0cm", "4\u00a0cm", "8\u00a0cm"]],
        ["The tool that draws a circle", ["compasses", "ruler", "protractor"]],
        ["Diameter 4\u00a0m. Radius?", ["2\u00a0m", "4\u00a0m", "8\u00a0m"]],
        ["Diameter 15\u00a0cm. Radius?", ["7.5\u00a0cm", "15\u00a0cm", "30\u00a0cm"]],
        ["Diameter 13\u00a0cm. Radius?", ["6.5\u00a0cm", "13\u00a0cm", "26\u00a0cm"]],
        ["A circle 9\u00a0cm across. Compasses open?", ["4.5\u00a0cm", "9\u00a0cm", "18\u00a0cm"]],
        ["Double the radius. You get the", ["diameter", "circumference", "centre"]],
        ["Radius 1.5\u00a0cm. Diameter?", ["3\u00a0cm", "0.75\u00a0cm", "3.5\u00a0cm"]],
        ["A circle 13\u00a0cm across. Compasses open?", ["6.5\u00a0cm", "13\u00a0cm", "26\u00a0cm"]],
        ["5 circles touch in a row. Radius 10\u00a0cm. Row length?", ["100\u00a0cm", "50\u00a0cm", "20\u00a0cm"]],
        ["Circle fits exactly in a square. Radius 7\u00a0cm. Side?", ["14\u00a0cm", "7\u00a0cm", "28\u00a0cm"]],
        ["Compasses open 1.5\u00a0cm. How far across is the circle?", ["3\u00a0cm", "1.5\u00a0cm", "0.75\u00a0cm"]],
        ["4 circles touch in a row. Radius 5\u00a0cm. Row length?", ["40\u00a0cm", "20\u00a0cm", "10\u00a0cm"]],
        ["Radius 15\u00a0cm. Diameter?", ["30\u00a0cm", "7.5\u00a0cm", "17\u00a0cm"]],
        ["Compasses open 3.5\u00a0cm. How far across is the circle?", ["7\u00a0cm", "3.5\u00a0cm", "1.75\u00a0cm"]],
        ["Diameter 40\u00a0cm. Radius?", ["20\u00a0cm", "40\u00a0cm", "80\u00a0cm"]],
        ["Radius 2.5\u00a0cm. Diameter?", ["5\u00a0cm", "1.25\u00a0cm", "4.5\u00a0cm"]],
        ["A circle 15\u00a0cm across. Compasses open?", ["7.5\u00a0cm", "15\u00a0cm", "30\u00a0cm"]],
        ["Radius 7\u00a0cm. Diameter?", ["14\u00a0cm", "3.5\u00a0cm", "9\u00a0cm"]],
        ["Radius 7.5\u00a0cm. Diameter?", ["15\u00a0cm", "3.75\u00a0cm", "9.5\u00a0cm"]],
        ["Diameter 9\u00a0cm. Radius?", ["4.5\u00a0cm", "9\u00a0cm", "18\u00a0cm"]],
        ["The line all the way round a circle is the", ["circumference", "diameter", "radius"]],
        ["4 circles touch in a row. Radius 2.5\u00a0cm. Row length?", ["20\u00a0cm", "10\u00a0cm", "5\u00a0cm"]],
        ["3 circles touch in a row. Radius 5\u00a0cm. Row length?", ["30\u00a0cm", "15\u00a0cm", "10\u00a0cm"]],
        ["A diameter always passes through the", ["centre", "radius", "corner"]],
        ["Across a circle, through the centre: a", ["diameter", "radius", "circumference"]],
        ["Circle fits exactly in a square. Radius 7.5\u00a0cm. Side?", ["15\u00a0cm", "7.5\u00a0cm", "30\u00a0cm"]],
        ["A circle of radius 7.5\u00a0cm. Compasses open?", ["7.5\u00a0cm", "15\u00a0cm", "3.75\u00a0cm"]],
        ["3 circles touch in a row. Radius 2.5\u00a0cm. Row length?", ["15\u00a0cm", "7.5\u00a0cm", "5\u00a0cm"]],
        ["Radius 25\u00a0mm. Diameter?", ["50\u00a0mm", "12.5\u00a0mm", "27\u00a0mm"]],
        ["A circle of radius 7\u00a0cm. Compasses open?", ["7\u00a0cm", "14\u00a0cm", "3.5\u00a0cm"]],
        ["From the centre to the circumference: a", ["radius", "diameter", "circle"]],
        ["Radius 16\u00a0cm. Diameter?", ["32\u00a0cm", "8\u00a0cm", "18\u00a0cm"]],
        ["Circle fits exactly in a square. Radius 15\u00a0cm. Side?", ["30\u00a0cm", "15\u00a0cm", "60\u00a0cm"]],
        ["Radius 11\u00a0cm. Diameter?", ["22\u00a0cm", "5.5\u00a0cm", "13\u00a0cm"]],
        ["The compasses are opened to the", ["radius", "diameter", "circumference"]],
        ["Circle fits exactly in a square. Radius 3.5\u00a0cm. Side?", ["7\u00a0cm", "3.5\u00a0cm", "14\u00a0cm"]],
        ["Radius 3.5\u00a0cm. Diameter?", ["7\u00a0cm", "1.75\u00a0cm", "5.5\u00a0cm"]],
        ["Diameter 10\u00a0cm. Radius?", ["5\u00a0cm", "10\u00a0cm", "20\u00a0cm"]],
        ["One circle: radius or diameter, which is longer?", ["the diameter", "the radius", "they are equal"]],
        ["Diameter 25\u00a0mm. Radius?", ["12.5\u00a0mm", "25\u00a0mm", "50\u00a0mm"]],
        ["Diameter 11\u00a0cm. Radius?", ["5.5\u00a0cm", "11\u00a0cm", "22\u00a0cm"]],
        ["How many radii make one diameter?", ["2", "1", "4"]],
        ["A circle of radius 6.5\u00a0cm. Compasses open?", ["6.5\u00a0cm", "13\u00a0cm", "3.25\u00a0cm"]],
        ["A line across a circle that misses the centre is", ["not a diameter", "a diameter", "a radius"]],
        ["A circle 5\u00a0cm across. Compasses open?", ["2.5\u00a0cm", "5\u00a0cm", "10\u00a0cm"]],
        ["Radius 4.5\u00a0cm. Diameter?", ["9\u00a0cm", "2.25\u00a0cm", "6.5\u00a0cm"]],
        ["4 circles touch in a row. Radius 10\u00a0cm. Row length?", ["80\u00a0cm", "40\u00a0cm", "20\u00a0cm"]],
        ["Diameter 30\u00a0cm. Radius?", ["15\u00a0cm", "30\u00a0cm", "60\u00a0cm"]],
        ["Compasses open 6.5\u00a0cm. How far across is the circle?", ["13\u00a0cm", "6.5\u00a0cm", "3.25\u00a0cm"]],
        ["All radii of one circle are the same length.", ["always true", "sometimes true", "never true"]],
        ["Diameter 20\u00a0cm. Radius?", ["10\u00a0cm", "20\u00a0cm", "40\u00a0cm"]],
        ["4 circles touch in a row. Radius 2\u00a0cm. Row length?", ["16\u00a0cm", "8\u00a0cm", "4\u00a0cm"]],
        ["A circle of radius 4.5\u00a0cm. Compasses open?", ["4.5\u00a0cm", "9\u00a0cm", "2.25\u00a0cm"]],
        ["Diameter 5\u00a0cm. Radius?", ["2.5\u00a0cm", "5\u00a0cm", "10\u00a0cm"]],
        ["Circle fits exactly in a square. Radius 4.5\u00a0cm. Side?", ["9\u00a0cm", "4.5\u00a0cm", "18\u00a0cm"]],
        ["The point in the middle of a circle is the", ["centre", "radius", "circumference"]],
        ["Half of the diameter is the", ["radius", "centre", "circumference"]],
        ["Compasses open 4.5\u00a0cm. How far across is the circle?", ["9\u00a0cm", "4.5\u00a0cm", "2.25\u00a0cm"]],
        ["5 circles touch in a row. Radius 2.5\u00a0cm. Row length?", ["25\u00a0cm", "12.5\u00a0cm", "5\u00a0cm"]],
        ["A circle 14\u00a0cm across. Compasses open?", ["7\u00a0cm", "14\u00a0cm", "28\u00a0cm"]],
        ["Radius 12.5\u00a0mm. Diameter?", ["25\u00a0mm", "6.25\u00a0mm", "14.5\u00a0mm"]],
        ["A circle of radius 1.5\u00a0cm. Compasses open?", ["1.5\u00a0cm", "3\u00a0cm", "0.75\u00a0cm"]],
        ["Radius 45\u00a0mm. Diameter?", ["90\u00a0mm", "22.5\u00a0mm", "47\u00a0mm"]],
        ["Circle fits exactly in a square. Radius 5\u00a0cm. Side?", ["10\u00a0cm", "5\u00a0cm", "20\u00a0cm"]],
        ["Radius 5.5\u00a0cm. Diameter?", ["11\u00a0cm", "2.75\u00a0cm", "7.5\u00a0cm"]],
        ["Diameter 18\u00a0cm. Radius?", ["9\u00a0cm", "18\u00a0cm", "36\u00a0cm"]],
        ["Diameter 90\u00a0mm. Radius?", ["45\u00a0mm", "90\u00a0mm", "180\u00a0mm"]]
        // LIGHTNING-END
      ]
    },
    // My self-check: the goals of the stop. again: the step to practise again for each goal (c = See it, r and a = Practise).
    selfcheck: {
      goals: ["name the centre, radius, diameter and circumference of a circle", "tell if a line is a radius, a diameter or neither", "find the diameter from the radius, and the radius from the diameter", "set compasses to draw a circle with a given radius or diameter"],
      again: ["c", "r", "a", "r"]
    }
  };
})(window.T = window.T || {});
