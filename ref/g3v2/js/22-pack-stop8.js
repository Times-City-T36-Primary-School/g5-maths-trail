/* 22-pack-stop8.js - ALL the content of Stop 8, Time and timetables (shape: docs/02-architecture.md).
   Every part is here: words, see, practise, notes, test, lightning, selfcheck. The tools (a clock with buttons for its
   hands, with a digital clock and a.m. and p.m. in See it; draw a line to match; a timetable with times to tap and a time
   line) and the pictures (clock, digital clock, two pictures side by side, a table) are in src/toolkit/39-tools-time.js.
   The new models tunits (tick the same time in a smaller unit), ttnext (take the next journey on a timetable) and tnight
   (how long, over midnight) are in src/models/06-mtasks9f.js; the other models are the Maths v2 ones (06-mtasks7.js). */
(function (T) {
  'use strict';

  // the timetables and tables of the Maths v2 Stop 8 questions (data/v2/mdata8.js), copied as they are
  const T1 = { kind: "Train", one: "train", intro: "Here is part of a train [[timetable]] from Old Town to Sea View.", stops: ["Old Town", "Hill Gate", "Sea View"], runs: [["09:05", "09:20", "09:50"], ["11:35", "11:50", "12:20"], ["13:50", "14:05", "14:35"], ["16:15", "16:30", "17:00"]] };
  const T2 = { kind: "Ferry", one: "ferry", intro: "Here is part of a ferry [[timetable]] from the Harbour to the Lighthouse.", stops: ["Harbour", "Pine Island", "Shell Bay", "Lighthouse"], runs: [["08:30", "08:55", "09:15", "09:40"], ["12:10", "12:35", "12:55", "13:20"], ["15:45", "16:10", "16:30", "16:55"]] };
  const T3 = { kind: "Tram", one: "tram", intro: "Here is part of a tram [[timetable]] from the Market to Zoo Gate.", stops: ["Market", "Museum", "Zoo Gate"], runs: [["07:40", "07:52", "08:15"], ["10:25", "10:37", "11:00"], ["14:10", "14:22", "14:45"], ["17:35", "17:47", "18:10"]] };
  const Z1 = { intro: "The table shows feeding times at a zoo.", which: "Which animals are fed", many: "How many kinds of animal are fed", head: ["Animal", "Feeding time"], rows: [["Penguins", "10:45"], ["Lions", "13:30"], ["Seals", "15:10"], ["Elephants", "16:20"]] };
  const Z2 = { intro: "The table shows film times at a cinema.", which: "Which film starts", many: "How many films start", head: ["Film", "Start"], rows: [["The Lost Robot", "11:15"], ["Ocean Friends", "13:40"], ["Space School", "16:05"], ["Dragon Hill", "18:30"]] };
  const Z3 = { intro: "The table shows talks at a science museum.", which: "Which talk starts", many: "How many talks start", head: ["Talk", "Start"], rows: [["Volcanoes", "09:30"], ["Robots", "12:15"], ["Stars", "14:50"], ["Oceans", "17:25"]] };
  // new for v3 (Mini Practice test): a bus, a boat and three tables of start times, with fresh places and times
  const TB = { kind: "Bus", one: "bus", intro: "Here is part of a bus [[timetable]] from Lotus School to River Park.", stops: ["Lotus School", "Library", "Flower Market", "River Park"], runs: [["07:20", "07:35", "07:50", "08:10"], ["11:45", "12:00", "12:15", "12:35"], ["15:30", "15:45", "16:00", "16:20"]] };
  const T4 = { kind: "Boat", one: "boat", intro: "Here is part of a boat [[timetable]] from River Gate to Palm Beach.", stops: ["River Gate", "Coconut Island", "Palm Beach"], runs: [["08:10", "08:45", "09:20"], ["10:40", "11:15", "11:50"], ["13:25", "14:00", "14:35"], ["16:05", "16:40", "17:15"]] };
  const Z4 = { intro: "The table shows swimming lessons at a pool.", which: "Which lesson starts", many: "How many lessons start", head: ["Lesson", "Start"], rows: [["Ducks", "09:15"], ["Frogs", "11:40"], ["Dolphins", "14:25"], ["Sharks", "16:50"]] };
  const Z5 = { intro: "The table shows boat trips on a lake.", which: "Which boat leaves", many: "How many boat trips start", head: ["Boat", "Start"], rows: [["Red boat", "10:20"], ["Blue boat", "12:45"], ["Green boat", "15:30"], ["Yellow boat", "17:05"]] };
  const Z6 = { intro: "The table shows lessons at an art club.", which: "Which lesson starts", many: "How many lessons start", head: ["Lesson", "Start"], rows: [["Painting", "09:40"], ["Clay", "13:25"], ["Paper", "16:15"], ["Drawing", "19:05"]] };
  // See it: the train timetable of the Clock Station (one train takes 20 minutes, then 25 minutes)
  const TS = { kind: "Train", stops: ["Clock Station", "Rice Fields", "Sea View"], runs: [["07:50", "08:10", "08:35"], ["10:40", "11:00", "11:25"], ["14:15", "14:35", "15:00"]] };

  T.packs[8] = {
    n: 8,
    title: "Time and timetables",
    los: ["4Gt.01", "4Gt.02", "4Gt.03", "4Gt.04"],   // the learning objectives (shown to teachers under the last note)
    blurb: {
      en: "Read the *time* on clocks. Use a *timetable*. Find how long something takes.",
      vi: "Đọc *giờ* trên đồng hồ. Dùng *bảng giờ*. Tìm xem một việc kéo dài bao lâu."
    },
    // Words: the 5 Maths v2 Stop 8 key words (WORDS with s: 8; vi and meaning as in v2) and four new ones (hour hand,
    // minute hand, quarter to, midnight), in three sets of picture cards with a quick check. The pictures are in
    // src/art/10-art-words-8.js.
    words: {
      sets: [
        { id: 'A', title: { en: 'Clock hands', vi: 'Kim đồng hồ' }, keys: ['hour hand', 'minute hand', 'quarter to'] },
        { id: 'B', title: { en: 'Morning and afternoon', vi: 'Buổi sáng và buổi chiều' }, keys: ['a.m.', 'p.m.', '24-hour clock'] },
        { id: 'C', title: { en: 'How long?', vi: 'Bao lâu?' }, keys: ['timetable', 'time interval', 'midnight'] }
      ],
      items: {
        'hour hand': { art: 'w-hour-hand', vi: 'kim giờ', def: 'The short hand on a clock. It shows the hour.' },
        'minute hand': { art: 'w-minute-hand', vi: 'kim phút', def: 'The long hand on a clock. It shows the minutes. Each number is 5 minutes.' },
        'quarter to': { art: 'w-quarter-to', vi: 'kém mười lăm phút', def: '15 minutes before the hour. Quarter to 4 is 3:45.' },
        'a.m.': { art: 'w-am', vi: 'buổi sáng (trước 12 giờ trưa)', def: 'The time from midnight to midday. 7:00 a.m. is in the morning.' },
        'p.m.': { art: 'w-pm', vi: 'buổi chiều và tối (sau 12 giờ trưa)', def: 'The time from midday to midnight. 7:00 p.m. is in the evening.' },
        '24-hour clock': { art: 'w-24-hour-clock', vi: 'đồng hồ 24 giờ', def: 'A way to write the time with hours from 00 to 23. 3:30 p.m. is 15:30.' },
        'timetable': { art: 'w-timetable', vi: 'bảng giờ tàu xe', def: 'A table that shows when trains, boats or lessons start and end.' },
        'time interval': { art: 'w-time-interval', vi: 'khoảng thời gian', def: 'How long it is from one time to another time.' },
        'midnight': { art: 'w-midnight', vi: 'nửa đêm (12 giờ đêm)', def: "12 o'clock at night, when a new day starts. In 24-hour time it is 00:00." }
      }
    },
    // See it: Concrete. Three hands-on scenes (move the long hand to quarter past, half past and quarter to; the 24-hour
    // clock: tap p.m. and 3:30 p.m. is 15:30, move the short hand to 7:30 p.m., then a.m.; read a train timetable, then
    // count on along a time line to find how long), then the challenge: the 5 v2 "Build it" slots (CONTENT[8].stages[0])
    // with TWM tags.
    see: {
      scenes: [
        { id: 'hands', title: { en: 'Move the hands', vi: 'Xoay kim đồng hồ' }, tool: 'clock',
          clock: { h: 3, m: 0 },
          steps: [
            { can: { min: true }, wait: 'move', until: { h: 3, m: 15 },
              zip: { en: 'Tap *+ 5 min*. Make *quarter past* 3.', vi: 'Bấm *+ 5 min* (thêm 5 phút). Làm *3 giờ 15 phút*.' },
              then: { en: 'The long hand is on 3. *3:15*!', vi: 'Kim dài chỉ số 3. *3 giờ 15 phút*!' } },
            { can: { min: true }, wait: 'move', until: { h: 3, m: 30 },
              zip: { en: 'Now make *half past* 3.', vi: 'Bây giờ làm *3 giờ rưỡi*.' },
              then: { en: 'The long hand is on 6. *3:30*.', vi: 'Kim dài chỉ số 6. *3 giờ 30 phút*.' } },
            { can: { min: true }, wait: 'move', until: { h: 3, m: 45 },
              zip: { en: 'Now make *quarter to* 4.', vi: 'Bây giờ làm *4 giờ kém 15 phút*.' },
              then: { en: 'Quarter to 4 is *3:45*. 15 minutes to go!', vi: '4 giờ kém 15 là *3 giờ 45*. Còn 15 phút nữa!' } }] },
        { id: 'day', title: { en: 'The 24-hour clock', vi: 'Đồng hồ 24 giờ' }, tool: 'clock',
          clock: { h: 3, m: 30, dig: true },
          steps: [
            { can: { ampm: true }, wait: 'ampm', until: { pm: true },
              zip: { en: 'It is 3:30 in the afternoon. Tap *p.m.*', vi: 'Bây giờ là 3 giờ 30 chiều. Bấm *p.m.* (chiều).' },
              then: { en: '*3:30 p.m. is 15:30*. Add 12 to the hours!', vi: '*3 giờ 30 chiều là 15:30*. Cộng 12 vào số giờ!' } },
            { can: { hour: true }, wait: 'move', until: { h: 7, m: 30, pm: true },
              zip: { en: 'Tap *+ 1 hour* to make *7:30 p.m.*', vi: 'Bấm *+ 1 hour* (thêm 1 giờ) để có *7 giờ 30 tối*.' },
              then: { en: '7 + 12 = 19. So it is *19:30*.', vi: '7 + 12 = 19. Vậy là *19:30*.' } },
            { can: { ampm: true }, wait: 'ampm', until: { pm: false },
              zip: { en: 'Now tap *a.m.* for the morning.', vi: 'Bây giờ bấm *a.m.* (sáng) để chọn buổi sáng.' },
              then: { en: '*7:30 a.m. is 07:30*. The hours stay the same.', vi: '*7 giờ 30 sáng là 07:30*. Số giờ giữ nguyên.' } }] },
        { id: 'timetable', title: { en: 'Read a timetable', vi: 'Đọc bảng giờ tàu' }, tool: 'ttable',
          ttable: { table: TS, line: ['10:40', '11:25'] },
          steps: [
            { can: { cell: true }, wait: 'cell', until: { t: '10:40' },
              zip: { en: 'Train *B* leaves Clock Station. Tap that time.', vi: 'Tàu *B* rời Clock Station (Ga Đồng Hồ). Bấm vào giờ đó.' },
              then: { en: 'Row Clock Station, column B: *10:40*.', vi: 'Hàng Clock Station, cột B: *10:40*.' } },
            { can: { cell: true }, wait: 'cell', until: { t: '11:25' },
              zip: { en: 'When does train B reach *Sea View*? Tap it.', vi: 'Tàu B đến *Sea View* (Bãi Biển) lúc mấy giờ? Bấm vào đó.' },
              then: { en: 'Train B gets to Sea View at *11:25*.', vi: 'Tàu B đến Sea View lúc *11:25*.' } },
            { can: { jump: true }, wait: 'jump', until: { done: true },
              zip: { en: 'How long is the trip? Tap *Jump* to count on.', vi: 'Chuyến đi dài bao lâu? Bấm *Jump* (Nhảy) để đếm thêm.' },
              then: { en: '20 min + 25 min = *45 minutes*.', vi: '20 phút + 25 phút = *45 phút*.' } }] },
        { id: 'challenge', title: { en: 'Clock challenge', vi: 'Thử thách đồng hồ' },
          challenge: {
            end: { en: 'You did it! You can read and set clocks.', vi: 'Em làm được rồi! Em biết đọc và chỉnh đồng hồ.' },
            result: 'You read clocks, moved the hands and wrote 24-hour times.',
            rounds: [
          { mode: "our", lo: ["4Gt.02"], twm: ["TWM.05"], v: [{ type: "clockread", h: 3, m: 40 }, { type: "clockread", h: 7, m: 25 }, { type: "clockread", h: 10, m: 50 }] },
          { mode: "our", lo: ["4Gt.02"], twm: ["TWM.05"], v: [{ type: "clockset", h: 5, m: 35, as: "words" }, { type: "clockset", h: 2, m: 15, as: "words" }, { type: "clockset", h: 8, m: 50, as: "words" }] },
          { mode: "your", lo: ["4Gt.02"], twm: ["TWM.02"], v: [{ type: "clockset", h: 16, m: 10, as: "24" }, { type: "clockset", h: 19, m: 40, as: "24" }, { type: "clockset", h: 13, m: 55, as: "24" }] },
          { mode: "your", lo: ["4Gt.02"], twm: ["TWM.02"], v: [{ type: "to24", h: 19, m: 15 }, { type: "to24", h: 14, m: 50 }, { type: "to24", h: 21, m: 5 }] },
          { mode: "your", lo: ["4Gt.01"], twm: ["TWM.02"], v: [
            { type: "tjump", n: 3, from: "minutes", to: "seconds" },
            { type: "tjump", n: 5, from: "minutes", to: "seconds" },
            { type: "tjump", n: 7, from: "minutes", to: "seconds" }] }] } }]
    },
    // Practise: Pictorial (Draw it: time lines, a timetable, clocks and units) then Abstract (Solve it, like the test).
    // The rounds are the Maths v2 Stop 8 slots (data/v2/mdata8.js CONTENT[8] stages 2 and 3) with TWM tags. Two rounds
    // are new, with fresh times, places and names: in Draw it, take the next journey on a timetable (the v3 model ttnext)
    // takes the place of the v2 "read one time"; in Solve it, how long over midnight (tnight) takes the place of the
    // v2 minutes into seconds (each stage keeps 5 rounds, test/keys.mjs). The first question links the word card
    // "time interval".
    practise: [
      { id: 's8r', kit: 'model', game: 'r', surface: 'board', art: 'icon-step-practise',
        title: 'Draw it', blurb: { en: 'Time lines, timetables and clocks.', vi: 'Trục thời gian, bảng giờ và đồng hồ.' },
        levels: [
      { title: { en: "Time lines", vi: "Trục thời gian" }, rounds: [
          { mode: "our", lo: ["4Gt.04"], twm: ["TWM.01"], v: [
            { type: "tgap", from: [9, 40], to: [11, 25], unit: "hm", line: true, text: "Find the [[time interval]]." },
            { type: "tgap", from: [13, 50], to: [15, 20], unit: "hm", line: true, text: "Find the [[time interval]]." },
            { type: "tgap", from: [7, 35], to: [9, 10], unit: "hm", line: true, text: "Find the [[time interval]]." }] },
          { mode: "your", lo: ["4Gt.04"], twm: ["TWM.01"], v: [{ type: "tgap", from: [10, 35], to: [11, 20], unit: "min", line: "blank" }, { type: "tgap", from: [14, 45], to: [15, 25], unit: "min", line: "blank" }, { type: "tgap", from: [8, 50], to: [9, 40], unit: "min", line: "blank" }] }] },
      { title: { en: "Timetables and clocks", vi: "Bảng giờ và đồng hồ" }, rounds: [
          { mode: "your", lo: ["4Gt.03"], twm: ["TWM.01"], v: [
            { type: "ttnext", table: T3, at: 1, come: [10, 30], to: 2, who: "Mai" },
            { type: "ttnext", table: T2, at: 1, come: [9, 5], to: 3, who: "Tuan", he: true },
            { type: "ttnext", table: T1, at: 1, come: [14, 10], to: 2, who: "Chi" }] },
          { mode: "your", lo: ["4Gt.02"], twm: ["TWM.05", "TWM.01"], v: [
            { type: "timewords", h: 15, m: 45, wrong: [[14, 45], [17, 45], [3, 45]], at: 1 },
            { type: "timewords", h: 20, m: 25, wrong: [[8, 25], [22, 25], [20, 35]], at: 0 },
            { type: "timewords", h: 13, m: 35, wrong: [[15, 35], [13, 25], [1, 35]], at: 2 }] },
          { mode: "your", lo: ["4Gt.01"], twm: ["TWM.05"], v: [{ type: "tconv", n: 3, from: "hours", to: "minutes" }, { type: "tconv", n: 2, from: "days", to: "hours" }, { type: "tconv", n: 5, from: "weeks", to: "days" }] }] }] },
      { id: 's8a', kit: 'model', game: 'a', surface: 'paper', art: 'icon-step-test',
        title: 'Solve it', blurb: { en: 'Answer questions like the test.', vi: 'Trả lời câu hỏi giống bài kiểm tra.' },
        levels: [
      { title: { en: "Times of day", vi: "Các giờ trong ngày" }, rounds: [
          { mode: "your", lo: ["4Gt.04"], twm: ["TWM.01"], v: [
            { type: "tnight", from: [21, 30], to: [6, 15], text: "A night train leaves at {from}. It arrives the next morning at {to}. How long is the journey?" },
            { type: "tnight", from: [22, 10], to: [4, 40], text: "Grandpa goes fishing at {from}. He comes home the next morning at {to}. How long is he out?" },
            { type: "tnight", from: [23, 45], to: [7, 20], text: "A plane leaves Ha Noi at {from}. It lands the next morning at {to}. How long is the flight?" }] },
          { mode: "your", lo: ["4Gt.02"], twm: ["TWM.05"], v: [
            { type: "tmatch", items: [{ h: 16, m: 10, show: "words" }, { h: 8, m: 35, show: "12" }, { h: 21, m: 30, show: "words" }, { h: 13, m: 50, show: "clock" }], order: [2, 3, 0, 1] },
            { type: "tmatch", items: [{ h: 13, m: 25, show: "words" }, { h: 19, m: 50, show: "clock" }, { h: 6, m: 15, show: "12" }, { h: 22, m: 40, show: "words" }], order: [3, 0, 1, 2] },
            { type: "tmatch", items: [{ h: 10, m: 40, show: "12" }, { h: 17, m: 5, show: "clock" }, { h: 20, m: 20, show: "words" }, { h: 14, m: 55, show: "words" }], order: [1, 3, 0, 2] }] }] },
      { title: { en: "Timetables", vi: "Bảng giờ" }, rounds: [
          { mode: "your", lo: ["4Gt.03", "4Gt.04"], twm: ["TWM.01"], v: [
            { type: "ttwo", table: T1, from: 1, to: 2, at: 2, by: "14:00", who: "Thao" },
            { type: "ttwo", table: T2, from: 0, to: 2, at: 3, by: "14:00", who: "Duc", he: true },
            { type: "ttwo", table: T1, from: 0, to: 2, at: 1, by: "12:00", who: "Yen" }] },
          { mode: "your", lo: ["4Gt.03", "4Gt.02"], twm: ["TWM.05", "TWM.01"], v: [
            { type: "tablewhen", intro: Z1.intro, which: Z1.which, many: Z1.many, head: Z1.head, rows: Z1.rows, ask: { k: "at", h: 16, m: 20 } },
            { type: "tablewhen", intro: Z2.intro, which: Z2.which, many: Z2.many, head: Z2.head, rows: Z2.rows, ask: { k: "after", h: 13 } },
            { type: "tablewhen", intro: Z3.intro, which: Z3.which, many: Z3.many, head: Z3.head, rows: Z3.rows, ask: { k: "at", h: 14, m: 50 } }] }] },
      { title: { en: "Over many days", vi: "Qua nhiều ngày" }, rounds: [
          { mode: "your", lo: ["4Gt.04"], twm: ["TWM.01"], v: [
            { type: "tacross", d1: 0, h1: 7, d2: 1, h2: 15, text: "A ship leaves on {from}. It arrives on {to}. How many hours is the journey?" },
            { type: "tacross", d1: 5, h1: 22, d2: 6, h2: 5, text: "A night train leaves on {from}. It arrives on {to}. How many hours is the journey?" },
            { type: "tacross", d1: 3, h1: 8, d2: 5, h2: 8, text: "A camp starts on {from}. It ends on {to}. How many hours does the camp last?" }] }] }] }
    ],
    // Notes: how to do it. Each note has a worked example and a picture made by the maths tools. From Maths v2
    // CONTENT[8].notes and tips, with new examples and two new notes (the clock hands; over midnight).
    // The check: one gap sentence per note, in the same order (each right answer is worked out again by test/stop-steps.mjs).
    notes: {
      items: [
        { en: '1 minute = 60 seconds. 1 hour = 60 minutes. 1 day = 24 hours. 1 week = 7 days. 1 year = 12 months.',
          vi: '1 phút = 60 giây. 1 giờ = 60 phút. 1 ngày = 24 giờ. 1 tuần = 7 ngày. 1 năm = 12 tháng.',
          example: ['3 minutes is 3 lots of 60 seconds.', '3 × 60 = *180*, so 3 minutes = 180 seconds.'],
          pic: { k: 'hops', terms: ['0 s', '60 s', '120 s', '180 s'], labs: ['1 min', '1 min', '1 min'] } },
        { en: 'The short [[hour hand]] shows the hour. The long [[minute hand]] shows the minutes.',
          vi: 'Kim giờ ngắn chỉ giờ. Kim phút dài chỉ phút.',
          example: ['For the long hand, each number is 5 minutes.', 'Long hand on 9: 9 × 5 = 45 minutes. *3:45* is [[quarter to]] 4.'],
          pic: { k: 'clock', h: 3, m: 45, cap: '3:45' } },
        { en: 'On the [[24-hour clock]], add 12 to the hours for [[p.m.]] times. For [[a.m.]] times the hours stay the same.',
          vi: 'Trên đồng hồ 24 giờ, cộng 12 vào số giờ với giờ buổi chiều và tối (p.m.). Với giờ buổi sáng (a.m.), số giờ giữ nguyên.',
          example: ['4:10 p.m.: 4 + 12 = 16, so it is *16:10*.', '9:30 a.m. is *09:30*.'],
          pic: { k: 'pair', a: { k: 'clock', h: 4, m: 10, cap: 'afternoon' }, b: { k: 'dclock', t: '16:10', cap: '4:10 p.m.' } } },
        { en: 'To change a 24-hour time after 12:59 into p.m., take away 12 from the hours.',
          vi: 'Để đổi giờ 24 giờ sau 12:59 sang giờ p.m., lấy số giờ trừ đi 12.',
          example: ['21:45: 21 − 12 = 9, so it is *9:45 p.m.*', '12:00 is midday. 00:00 is [[midnight]].'],
          pic: { k: 'dclock', t: '21:45', cap: '9:45 p.m.' } },
        { en: 'In a [[timetable]], each row is a place. Each column is one journey.',
          vi: 'Trong bảng giờ, mỗi hàng là một địa điểm. Mỗi cột là một chuyến đi.',
          example: ['Find the row of the place. Go across to the column.', 'Train B reaches Sea View at *12:20*.'],
          pic: { k: 'table', head: ['Train', 'A', 'B'], rows: [['Old Town', '09:05', '11:35'], ['Sea View', '09:50', '12:20']] } },
        { en: 'For a [[time interval]], jump to the next whole hour first. Then jump on.',
          vi: 'Để tìm khoảng thời gian, hãy nhảy đến giờ tròn tiếp theo trước. Rồi nhảy tiếp.',
          example: ['09:40 to 10:00 is 20 min. 10:00 to 11:25 is 1 h 25 min.', 'So 09:40 to 11:25 is *1 hour 45 minutes*.'],
          pic: { k: 'hops', terms: ['09:40', '10:00', '11:00', '11:25'], labs: ['20 min', '1 h', '25 min'] } },
        { en: 'If the time goes past [[midnight]], jump to 00:00 first. A new day starts there.',
          vi: 'Nếu thời gian đi qua nửa đêm, hãy nhảy đến 00:00 trước. Ngày mới bắt đầu ở đó.',
          example: ['22:30 to 00:00 is 1 h 30 min. 00:00 to 06:00 is 6 h.', 'So 22:30 to 06:00 is *7 hours 30 minutes*.'],
          pic: { k: 'hops', terms: ['22:30', '00:00', '06:00'], labs: ['1 h 30 min', '6 h'] } }
      ],
      check: [
        { sentence: '2 minutes = {120|200|62} seconds.', answer: '120' },
        { sentence: 'The long hand points to 6. That is {30|6|60} minutes.', answer: '30' },
        { sentence: '7:20 p.m. is {19:20|17:20|07:20}.', answer: '19:20' },
        { sentence: '14:35 is {2:35 p.m.|4:35 p.m.|2:35 a.m.}.', answer: '2:35 p.m.' },
        { sentence: 'In a timetable, each {column|row|place} is one journey.', answer: 'column' },
        { sentence: 'From 10:45 to 11:00 is {15|55|45} minutes.', answer: '15' },
        { sentence: 'From 23:00 to 02:00 is {3|21|25} hours.', answer: '3' }
      ]
    },
    // Mini Practice test: 10 questions, easy to hard, 4 at DOK 1, 5 at DOK 2, 1 at DOK 3 (T.DOK_MIX, docs/05).
    // Each item: dok (its real level, judged with T.DOK), lo, twm (1 or 2, T.TWM) and 3 fresh sets of numbers
    // (play 1 uses v[0]). Written fresh for v3 with the Maths v2 Stop 8 models and the v3 models of 06-mtasks9f.js, with new
    // times, places, names and timetables: tick the same time in a smaller unit (recall 1 minute = 60 seconds, then one
    // step), read a clock, write a p.m. time on the 24-hour clock and read one time in a timetable are DOK 1; how long from
    // one time to another (jumps), how many start after a 12-hour time (change it, then compare each), a time back into the
    // bigger unit, take the next journey (find it, then read down its column) and how long over midnight are DOK 2.
    // Question 10 is a new general claim about the 12-hour and 24-hour clocks, judged and justified with a time from the
    // list (DOK 3). Run by src/steps/70-test.js with the models; answers logged with game letter 'm' and dok.
    test: {
      items: [
        { dok: 1, lo: ["4Gt.01"], twm: ["TWM.05", "TWM.01"], v: [
          { type: "tunits", n: 4, from: "minutes", to: "seconds", wrong: [400, 64, 40], at: 2 },
          { type: "tunits", n: 3, from: "days", to: "hours", wrong: [36, 27, 30], at: 0 },
          { type: "tunits", n: 2, from: "years", to: "months", wrong: [14, 20], at: 1 }
        ] },
        { dok: 1, lo: ["4Gt.02"], twm: ["TWM.05"], v: [
          { type: "clockread", h: 8, m: 20 },
          { type: "clockread", h: 4, m: 35 },
          { type: "clockread", h: 11, m: 50 }
        ] },
        { dok: 1, lo: ["4Gt.02"], twm: ["TWM.02"], v: [
          { type: "to24", h: 18, m: 45 },
          { type: "to24", h: 15, m: 5 },
          { type: "to24", h: 21, m: 40 }
        ] },
        { dok: 1, lo: ["4Gt.03"], twm: ["TWM.01"], v: [
          { type: "ttread", table: TB, run: 1, stop: 2 },
          { type: "ttread", table: TB, run: 2, stop: 3 },
          { type: "ttread", table: TB, run: 0, stop: 1 }
        ] },
        { dok: 2, lo: ["4Gt.04"], twm: ["TWM.01"], v: [
          { type: "tgap", from: [10, 35], to: [12, 10], unit: "hm" },
          { type: "tgap", from: [13, 40], to: [15, 5], unit: "hm" },
          { type: "tgap", from: [8, 25], to: [10, 15], unit: "hm" }
        ] },
        { dok: 2, lo: ["4Gt.02"], twm: ["TWM.06", "TWM.01"], v: [
          { type: "tablewhen", intro: Z4.intro, which: Z4.which, many: Z4.many, head: Z4.head, rows: Z4.rows, ask: { k: "after", h: 15 } },
          { type: "tablewhen", intro: Z5.intro, which: Z5.which, many: Z5.many, head: Z5.head, rows: Z5.rows, ask: { k: "after", h: 14 } },
          { type: "tablewhen", intro: Z6.intro, which: Z6.which, many: Z6.many, head: Z6.head, rows: Z6.rows, ask: { k: "after", h: 13 } }
        ] },
        { dok: 2, lo: ["4Gt.01"], twm: ["TWM.02"], v: [
          { type: "tconv", n: 300, from: "minutes", to: "seconds", back: true },
          { type: "tconv", n: 96, from: "days", to: "hours", back: true },
          { type: "tconv", n: 36, from: "years", to: "months", back: true }
        ] },
        { dok: 2, lo: ["4Gt.03"], twm: ["TWM.01"], v: [
          { type: "ttnext", table: T4, at: 1, come: [11, 20], to: 2, who: "Lan" },
          { type: "ttnext", table: T4, at: 0, come: [14, 15], to: 1, who: "Hung", he: true },
          { type: "ttnext", table: TB, at: 1, come: [12, 5], to: 3, who: "Linh" }
        ] },
        { dok: 2, lo: ["4Gt.04"], twm: ["TWM.01"], v: [
          { type: "tnight", from: [22, 40], to: [5, 15], text: "A night bus leaves the city at {from}. It reaches the beach the next morning at {to}. How long is the journey?" },
          { type: "tnight", from: [21, 35], to: [6, 10], text: "Khoa goes to sleep at {from}. He wakes up the next morning at {to}. How long does he sleep?" },
          { type: "tnight", from: [23, 20], to: [7, 5], text: "A ship leaves the island at {from}. It reaches the port the next morning at {to}. How long is the trip?" }
        ] },
        { dok: 3, lo: ["4Gt.02"], twm: ["TWM.07", "TWM.04"], v: [
          { type: "claim", who: "Phuong", ok: false, at: 1, ctx: "Phuong writes these p.m. times: <b>3:15 p.m., 8:40 p.m., 12:20 p.m.</b>", fact: { k: "pm24", eg: "12:20", list: ["3:15 p.m.", "8:40 p.m.", "12:20 p.m."] },
            says: "To write any p.m. time on the 24-hour clock, add 12 to the hours.",
            reasons: [
              { t: "12:20 p.m. is just after midday. It is 12:20, not 24:20." },
              { t: "3:15 p.m. is 15:15, so the rule always works.", why: "It works for 3:15 p.m. Now try 12:20 p.m." },
              { t: "p.m. times are in the morning.", why: "p.m. means after midday: the afternoon and the evening." }],
            hint: { step: "Try each time in the list. What is 12:20 p.m. on the 24-hour clock?" },
            worked: "3:15 p.m. is 15:15 and 8:40 p.m. is 20:40. But 12:20 p.m. is just after midday, so it is 12:20. There is no 24:20.",
            model: "Phuong is incorrect because 12:20 p.m. is 12:20, not 24:20." },
          { type: "claim", who: "Bao", ok: true, at: 0, ctx: "Bao looks at these 24-hour times: <b>00:45, 06:30, 09:55</b>", fact: { k: "zeroam", eg: "06:30", list: ["00:45", "06:30", "09:55"] },
            says: "A 24-hour time that starts with 0 is always an a.m. time.",
            reasons: [
              { t: "times from 00:00 to 09:59 are before midday. For example, 06:30 is 6:30 a.m." },
              { t: "0 means nothing, so the time is midnight.", why: "06:30 is not midnight. It is 6:30 in the morning." },
              { t: "09:55 is 9:55 p.m.", why: "09:55 is before 12:00, so it is a.m., not p.m." }],
            hint: { step: "Look at each time in the list. Is it before 12:00 or after 12:00?" },
            worked: "A time that starts with 0 is from 00:00 to 09:59. All of these times are before 12:00, midday. For example, 06:30 is 6:30 a.m.",
            model: "Bao is correct because times from 00:00 to 09:59 are before midday, like 06:30." },
          { type: "claim", who: "Ngoc", ok: false, at: 2, ctx: "Ngoc looks at these 24-hour times: <b>15:20, 19:05, 09:30</b>", fact: { k: "minus12", eg: "09:30", list: ["15:20", "19:05", "09:30"] },
            says: "To write any 24-hour time with a.m. or p.m., take away 12 from the hours.",
            reasons: [
              { t: "09:30 is before midday. It is 9:30 a.m., and we do not take away 12." },
              { t: "15:20 is 3:20 p.m., so the rule always works.", why: "It works for 15:20. Now try 09:30." },
              { t: "19:05 is 9:05 p.m.", why: "19 − 12 = 7, so 19:05 is 7:05 p.m." }],
            hint: { step: "Try each time in the list. Can you take 12 away from 09?" },
            worked: "15:20 is 3:20 p.m. and 19:05 is 7:05 p.m. But 09:30 is before 12:00, so it is 9:30 a.m. We take away 12 only after 12:59.",
            model: "Ngoc is incorrect because 09:30 is 9:30 a.m. We do not take away 12." }
        ] }
      ]
    },
    // Lightning round: 60 seconds of quick questions with three answers (the first is right). The 72 Maths v2
    // Stop 8 questions (legacy/maths-v2/src/pool.js LPOOL[8], made by its tools/genpool.mjs), copied as they are.
    lightning: {
      secs: 60,
      items: [
        ["Seconds in 7 minutes",["420","700","67"]],["Seconds in 8 minutes",["480","800","68"]],["Seconds in 3 minutes",["180","300","63"]],
        ["Seconds in 6 minutes",["360","600","66"]],["Seconds in 2 minutes",["120","200","62"]],["Seconds in 5 minutes",["300","500","65"]],
        ["Minutes in 6 hours",["360","600","144"]],["Minutes in 2 hours",["120","200","48"]],["Minutes in 5 hours",["300","500","120"]],
        ["Minutes in 8 hours",["480","800","192"]],["Minutes in 3 hours",["180","300","72"]],["Minutes in 7 hours",["420","700","168"]],
        ["Minutes in 4 hours",["240","400","96"]],["Hours in 3 days",["72","36","180"]],["Hours in 2 days",["48","24","120"]],
        ["Hours in 4 days",["96","48","240"]],["Days in 7 weeks",["49","35","14"]],["Days in 2 weeks",["14","10","9"]],
        ["Days in 6 weeks",["42","30","13"]],["Days in 9 weeks",["63","45","16"]],["Days in 4 weeks",["28","20","11"]],
        ["Days in 5 weeks",["35","25","12"]],["Months in 5 years",["60","50","17"]],["Months in 2 years",["24","20","14"]],
        ["Months in 4 years",["48","40","16"]],["Months in 6 years",["72","60","18"]],["7:05 p.m. in 24-hour time",["19:05","17:05","07:05"]],
        ["6:55 p.m. in 24-hour time",["18:55","16:55","06:55"]],["11:20 p.m. in 24-hour time",["23:20","21:20","11:20"]],["7:40 p.m. in 24-hour time",["19:40","17:40","07:40"]],
        ["5:55 p.m. in 24-hour time",["17:55","15:55","05:55"]],["6:30 p.m. in 24-hour time",["18:30","16:30","06:30"]],["2:25 p.m. in 24-hour time",["14:25","12:25","02:25"]],
        ["3:10 p.m. in 24-hour time",["15:10","13:10","03:10"]],["6:05 p.m. in 24-hour time",["18:05","16:05","06:05"]],["5:45 p.m. in 24-hour time",["17:45","15:45","05:45"]],
        ["4:15 p.m. in 24-hour time",["16:15","14:15","04:15"]],["21:20 in 12-hour time",["9:20 p.m.","11:20 p.m.","9:20 a.m."]],["16:30 in 12-hour time",["4:30 p.m.","6:30 p.m.","4:30 a.m."]],
        ["22:35 in 12-hour time",["10:35 p.m.","12:35 p.m.","10:35 a.m."]],["18:20 in 12-hour time",["6:20 p.m.","8:20 p.m.","6:20 a.m."]],["21:10 in 12-hour time",["9:10 p.m.","11:10 p.m.","9:10 a.m."]],
        ["21:15 in 12-hour time",["9:15 p.m.","11:15 p.m.","9:15 a.m."]],["17:50 in 12-hour time",["5:50 p.m.","7:50 p.m.","5:50 a.m."]],["19:10 in 12-hour time",["7:10 p.m.","9:10 p.m.","7:10 a.m."]],
        ["20:25 in 12-hour time",["8:25 p.m.","10:25 p.m.","8:25 a.m."]],["23:05 in 12-hour time",["11:05 p.m.","13:05 p.m.","11:05 a.m."]],["14:15 in 12-hour time",["2:15 p.m.","4:15 p.m.","2:15 a.m."]],
        ["Minutes from 15:35 to 16:15",["40","20","80"]],["Minutes from 20:55 to 21:10",["15","45","55"]],["Minutes from 15:50 to 16:15",["25","35","65"]],
        ["Minutes from 08:45 to 09:10",["25","35","65"]],["Minutes from 09:45 to 10:05",["20","40","60"]],["Minutes from 12:50 to 13:10",["20","40","60"]],
        ["Minutes from 09:35 to 10:15",["40","20","80"]],["Minutes from 15:50 to 16:10",["20","40","60"]],["Minutes from 09:50 to 10:15",["25","35","65"]],
        ["Minutes from 17:35 to 18:20",["45","15","85"]],["40 minutes after 14:50",["15:30","14:90","15:50"]],["40 minutes after 13:35",["14:15","13:75","14:35"]],
        ["25 minutes after 08:45",["09:10","08:70","09:45"]],["35 minutes after 12:50",["13:25","12:85","13:50"]],["45 minutes after 20:30",["21:15","20:75","21:30"]],
        ["35 minutes after 07:50",["08:25","07:85","08:50"]],["25 minutes after 15:50",["16:15","15:75","16:50"]],["20 minutes after 20:50",["21:10","20:70","21:50"]],
        ["Twenty past nine in the evening is",["21:20","09:20","19:20"]],["Five past two in the afternoon is",["14:05","02:05","12:05"]],["Half past three in the afternoon is",["15:30","03:30","13:30"]],
        ["Five to two in the afternoon is",["13:55","01:55","11:55"]],["Twenty to seven in the evening is",["18:40","06:40","16:40"]],["Twenty-five past seven in the evening is",["19:25","07:25","17:25"]]
      ]
    },
    // My self-check: the 4 Maths v2 Stop 8 goals, in the same order (the dashboard reads the answers by goal number).
    // again: the step to practise again for each goal (v2 CONTENT[8].again: c = See it, r and a = Practise).
    selfcheck: {
      goals: ["change between seconds, minutes, hours and days", "read the time on clocks with hands and on 24-hour clocks", "read a timetable", "work out how long something takes"],
      again: ["r", "c", "r", "r"]
    }
  };
})(window.T = window.T || {});
