/* 31-howto-text.js - the captions of the "How to use" page (32-howto.js), as data only, so that build.mjs can put
   them in dist/dump.txt with the rest of the child-facing text. Short captions, {en, vi} (Jovan's plan, Phase 2). */
(function (T) {
  'use strict';

  T.HOWTO = {
    title: { en: 'How to use the trail', vi: 'Cách dùng hành trình' },
    cards: {
      trail: { t: 'The trail', en: '9 worlds. Go from Stop\u00a01 to Stop\u00a09.', vi: '9 thế giới. Đi từ Trạm 1 đến Trạm 9.' },
      steps: { t: '5 steps', en: 'Do the steps in order. Each step wins 3 stars.', vi: 'Làm các bước theo thứ tự. Mỗi bước được 3 sao.' },
      extras: { t: '2 extras', en: 'Beat the clock. Then tell your teacher how it went.', vi: 'Thi nhanh với đồng hồ. Rồi cho thầy cô biết em học thế nào.' },
      win: { t: 'Win', en: 'Stars, a badge for each stop, medals and bolts.', vi: 'Sao, huy hiệu cho mỗi trạm, huy chương và tia chớp.' },
      zip: { t: 'Zip helps you', en: 'Zip says what to do. Tap VI for Vietnamese.', vi: 'Zip nói em cần làm gì. Bấm VI để xem tiếng Việt.' },
      stuck: { t: 'Stuck?', en: 'Tap Hint for help. Show me how shows each step.', vi: 'Bấm Hint để được gợi ý. Show me how chỉ từng bước.' },
      paper: { t: 'The test paper', en: 'Write on the dotted lines. Then tap Mark my paper.', vi: 'Viết vào dòng chấm. Rồi bấm Mark my paper (Chấm bài).' },
      hand: { t: 'Where to tap', en: 'The first time, a hand shows where to tap.', vi: 'Lần đầu, một bàn tay chỉ chỗ em cần bấm.' },
      saved: { t: 'Saved', en: 'Your stars are saved. Your teacher can see them.', vi: 'Sao của em được lưu. Thầy cô có thể xem.' },
      device: { t: 'Saved', en: 'Your stars are saved on this device.', vi: 'Sao của em được lưu trên thiết bị này.' }
    },
    zipLine: { en: 'Tap the *word* for this picture.', vi: 'Chạm vào *từ* đúng với bức tranh này.' },
    // the line under each step's name on the "5 steps" card
    steps: { words: 'Learn the words', see: 'See how it works', practise: 'Play maths games', notes: 'Read the notes', test: 'Do a test paper' }
  };

})(window.T = window.T || {});
