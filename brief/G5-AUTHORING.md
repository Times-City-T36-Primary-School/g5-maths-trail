# Grade 5 (Cambridge Stage 6) Maths Revision Trail: authoring brief

Read this file fully, then `brief/ENGINE-API.md` (the engine reference: tools, pictures, models, test paper, notes,
words, art). **Stop 1 is finished and is your template.** Read its four files before you write anything:

- `src/js/22-pack-stop1.js` the content pack (words, see, practise, notes, test, lightning, selfcheck)
- `src/js/08-g5-models-s1.js` the question models (answers are computed from the numbers in the data)
- `src/js/39-g5-tools-dec.js` + `src/css/39-g5-tools-dec.css` the tools and their pictures
- `src/js/07-g5-models-base.js` shared: exact decimals `MX.D`, fractions `MX.F` / `MX.FB`, `MX.gcd`, `MX.lcm`, and the two
  written-out models `mcq` and `fill`; `src/js/06-models-v2.js` lines 1-545 the model core (`MX.make`, `claim`, helpers)

Who uses it: Grade 5 pupils (age 10-11) in Vietnam, most learning in English as a second language, revising for the
End of Semester 1 test (two 35-minute papers, no calculator). Phones, iPads and the classroom board.

## 1. Rules that cannot be broken

1. **Nothing identical or near-identical to the real exam.** The trail practises the same skills with different numbers,
   contexts, names and sentences. Section 6 lists the 28 exam items. Do not reuse their number sets, their contexts
   (oranges, library visits, juice glasses, pen and pencil, running km, maths test marks), their claim sentences, or the
   names **Nam, Lan, Tuan, Mai, Bao, Anh, Nhi, Vy, Khoa, Quan**. Use these names instead: Minh, Hoa, Linh, Duc, Trang,
   Phong, Thu, Hung, Ngoc, Long, Chi, Son, Hanh, Binh, Giang, Kim, Dung, Tam, Hai, Yen.
2. **Every answer must be right.** Any answer that is arithmetic is computed by a model from the numbers in the data;
   never type a computed answer into the pack by hand. Use exact arithmetic: integers, `MX.D` thousandths, or
   numerator/denominator pairs. No floating point for decimals (0.1 + 0.2 is not 0.3 in JavaScript).
   Written-out items (`claim`, `mcq`, `fill`, notes, lightning) must be checked by you twice, by a different method.
3. **Own only your files** (section 3). Never edit engine files, another stop's files, `order.json`, `build.mjs`, `test/*`.
   If you need an engine change, say so in your final report; do not make it.
4. **Plain English for ESL children.** Short sentences, present tense, common words; the maths words of the stop are
   the only hard words and each is a word card. British spelling (centre, metre, colour). Numbers with a comma in the
   thousands (1,000). Use `×` and `÷` and a real minus `−` in text shown to children; never `*` for multiply
   (`*…*` is a highlight in Zip lines and notes).
5. **Vietnamese** (`vi`) wherever Stop 1 has it (blurb, set titles, word meanings, See it lines, notes, game blurbs,
   level titles). Use the standard Vietnamese school maths terms (section 5 gives the key terms). Keep the English
   number format (decimal point, not comma).
6. Zip's lines (See it `zip` / `then`, `T.G5_DO`) are at most **10 words** in English (12 at the very most).
7. Accessibility and layout: tap targets at least 44 px, text never under 15 px, nothing wider than a 360 px phone,
   works at 390x800, 820x1180 (iPad upright) and 1920x1080 (board). Motion: transform and opacity only, and none when
   `T.ui.reducedMotion()` is true. Tools drawn on the light plate (`.wb`) may use literal colours (the plate is light in
   both themes); everything else uses the CSS tokens only.
8. No new libraries, no network, no fonts, no images: inline SVG and CSS only.

## 2. What a finished stop contains

Exactly the parts of `T.packs[1]`, with the same shapes:

- `n, title, los, blurb {en, vi}` (title and los as in `src/js/20-stops.js`)
- **words**: 2 to 4 sets, the word keys and `art` ids **exactly as listed in section 5** (the art is drawn by another
  engineer from that list: do not rename, add or remove words). You write `vi` and `def` (one or two short sentences with
  an example).
- **see**: 2 hands-on scenes with your tool(s) (2 to 4 steps each, every step has `can`, `wait`, usually `until`, `zip`,
  `then`) and a `challenge` scene with 5 rounds (first round `mode: 'our'`), each round 3 sets of numbers.
- **practise**: two games. `sNr` "Draw it" (`surface: 'board'`, `game: 'r'`, pictorial: questions answered with or beside
  your tools) with 3 levels of 2 rounds, and `sNa` "Solve it" (`surface: 'paper'`, `game: 'a'`, abstract, like the test)
  with 3 levels: 3 + 3 + 2 rounds, the last level titled "Who is correct?" and holding at least one `claim` round.
  Every round: `mode`, `lo`, `twm`, `v` with **3** different sets of numbers.
- **notes**: 5 to 7 notes (`en`, `vi`, `example` lines, `pic` made by a tool picture) and one `check` sentence per note
  (first choice is the answer, 3 choices).
- **test**: exactly 10 items in the DOK order 1,1,1,1,1,2,2,2,2,3; each `{ dok, lo, twm, v: [3 sets] }`; every objective
  of the stop is tested at least twice; the last item is a DOK 3 `claim` about a general rule that the child tests with
  an example or counter-example ("always", "never", "only"), items 6 to 9 include one two-step word problem and one
  DOK 2 `claim` or "spot the mistake". The test uses no interactive tool (typed answers, options, claims, figures).
- **lightning**: at least 60 items `[question, [right, wrong, wrong]]`, plain text, question at most 60 characters,
  made by a small generator script you write and keep as `tools/gen_lightning_sN.py` (it must re-check each right answer
  a second way), with wrong answers that are real slips (not random numbers).
- **selfcheck**: 3 to 5 goals (lower case, no full stop, reads after "I can ...") and `again` letters (`c` See it, `r` or `a` Practise).

Question models: write them in your models file, in the shape of Stop 1's (see ENGINE-API section 11 and
`08-g5-models-s1.js`). Each model returns `q`, `lines`+`blanks` or `opts`, `check(r)` with a helpful `msg` for the
common slips (and `parts` for boxes), `hint: { pic, step }`, `worked: { text, pic }`, `yes`, `key`, `fill` (one string
per box, the right answer), and `right` (the tool state that is right, when a tool is part of the answer; then also
`ready(r)`). A document header comment lists every model type and its data fields. TWM tags: use the 8 codes in
`20-stops.js` sensibly (Specialising = try an example; Generalising = spot/use a rule; Conjecturing; Convincing = justify;
Characterising = name properties; Classifying = sort; Critiquing = judge someone's answer; Improving).

Reuse before you build: `claim` (any topic), `mcq`, `fill`, Stop 1's models and tools (`dchart`, `dslider`, `hgrid`
picture), and the Grade 3 tools and pictures that ENGINE-API marks as working with your numbers (`nline`, `order`,
`pickall`, pictures `hops`, `dots`, `dotseq`, `frain`, `bar`, `msq` ...). The v2 models listed as reusable in ENGINE-API
section 11 may be used by data alone, but check their wording suits Grade 5.

Tools: each new tool follows the contract in ENGINE-API section 1 and Stop 1's tools: `el, on, get, lock, destroy`,
`allow(can)` + `'trade'` events with an `act` for See it, `tip()`, `solve(right)`, `spec.fixed` for pictures, a picture
kind in `T.tools.picKinds`, a Zip line in `T.G5_DO[<tool name>]` (see the end of `39-g5-tools-dec.js`), and a See it desk
rule in your CSS if the tool needs one (`.see-hands__desk > .yourroot { ... }`, see `55-see.css:26-34`). `get()` returns
only numbers, strings and booleans. Class prefix: start every class with a short prefix of your own (for example `s4-`
or a 2-4 letter tool name) so nothing collides.

## 3. Files (N = your stop number)

| You own | What |
|---|---|
| `src/js/22-pack-stopN.js` | the pack (now a stub with title and blurb: replace it, keep the title) |
| `src/js/08-g5-models-sN.js` | your question models |
| `src/js/39-g5-tools-sN.js`, `src/css/39-g5-tools-sN.css` | your tools, pictures, `T.G5_DO` lines |
| `tools/gen_lightning_sN.py` (+ its output) | the Lightning generator |

All are already listed in `src/order.json`. Every JS file starts with a `/* <file name> - ...` header and is one IIFE.

## 4. Build, check, play (run from `/home/user/g5-maths-trail`)

```bash
node build.mjs --stop N                                   # -> dist/sN/index.html (only Stop 1 + your stop; never run plain build)
DIST=dist/sN/index.html node test/check.mjs N             # structure + every question variant: must end with ALL OK
DIST=dist/sN/index.html node test/play.mjs N practise     # plays both games with right answers in a real browser
DIST=dist/sN/index.html node test/play.mjs N see          # plays the See it scenes (taps tool.tip()) and the challenge
DIST=dist/sN/index.html node test/play.mjs N test         # fills and marks the test paper
DIST=dist/sN/index.html node test/play.mjs N practise 1920 1080   # the same on the board; also try 820 1180
DIST=dist/sN/index.html node test/shots.mjs shots 390 800 stop-N stop-N-notes stop-N-see   # pictures of routes
```

`check.mjs` will report "no picture w-..." for your words until the art engineer's file arrives: that one kind of
problem is expected; everything else must be clean. `play.mjs` writes screenshots to `shots/play-N-<step>-<width>-NN-*.png`:
**open them with the Read tool and look**: is every question readable on the phone, is the tool whole, does the answer
box sit where a child expects, is anything cut off or overlapping? Fix what you see. The See it player presses
`tool.tip()` until each scene is ready, so `tip()` must return the control that moves the current step forward.
If `play.mjs` cannot drive your tool, that is a real finding: make `solve(task.right)` and `tip()` work.

Done means: `check.mjs N` clean (except word pictures), all three `play.mjs` runs end with "no page problems" at
390x800 and 1920x1080, you have looked at the screenshots, and you have re-solved by hand every written-out item.

Final report (short): files written, model types, tools, anything not finished or uncertain, any engine change you need.

## 5. The nine stops: objectives, words, and what to build

Colours: world hue / deep hue (light theme) for badges and accents.

**Stop 1. Decimal place value** (Decimal Lab, #E0548A / #AE3465) `6Np.01`, `6Np.02` — done.
Words: decimal, decimal point, tenth, hundredth, thousandth, digit, value, place value, decimal place, multiply, divide, place holder.

**Stop 2. Round, add and subtract decimals** (Rounding Reef, #17A2B0 / #0E7682) `6Np.04`, `6Nf.09`
Words (art id = `w-` + the word with hyphens): round, nearest, halfway, whole number, estimate, sum, difference, line up,
exchange, working.
Build: a decimal rounding line tool (the number sits between two tenths or two whole numbers; the child taps the nearer
end; halfway rounds up) and a column tool for adding and subtracting decimals with different numbers of decimal places
(line up the decimal points, write 0 as a place holder, exchange). Models: round to the nearest whole number / tenth
(typed and tick), which numbers round to X (pick all, with `pickall`), smallest / largest 2-decimal-place number that
rounds to X, estimate then calculate, add and subtract (written method, missing number), two-step money and measure
problems with decimals, claims.

**Stop 3. Sequences and term rules** (Sequence Station, #2F7FD4 / #1F5CA0) `6Nc.01`, `6Nc.03`, `6Nc.04`
Words: sequence, term, position, rule, term-to-term rule, position-to-term rule, constant, count on, count back,
negative number, square number.
Build: a sequence track tool (hop in constant steps, on or back, with whole numbers, decimals, fractions written as
decimals or with `MX.F`, and through zero into negatives) and a position-to-term table tool/picture (position 1, 2, 3 ...
n over term; the rule "multiply the position by k" or "... then add / subtract c"). Models: continue and fill gaps
(decimal and fraction steps, negatives), find the step, the n-th term by the position-to-term rule (multiples of k, and
k × n ± c), complete a position/term table, "is N in the sequence? how do you know" (as yes/no + reason options), square
number sequences: the n-th term of 1, 4, 9, 16 ... and of shifted ones ((n + 1)² and n² + c), claims.
`nline` (jump), pictures `hops`, `dotseq`, `dots` already exist.

**Stop 4. Common multiples and common factors** (Factor Forest, #43A852 / #2D7C3A) `6Ni.06`
Words: multiple, factor, factor pair, common multiple, lowest common multiple, common factor, highest common factor,
divisible, product, counter-example.
Build: a two-list tool (two rows of hops / two lists of multiples; the child marks the numbers in both: the common
multiples; the same for factor lists of two numbers) and a Venn / two-ring sorting picture. Models: list multiples /
factors, pick all common multiples (`pickall`), lowest common multiple, pick all common factors, highest common factor,
"a number between a and b that is a multiple of both", real-life LCM / HCF problems (buses, packs, equal rows), claims
with counter-examples. Pictures `frain`, `hops`, `msq` exist.

**Stop 5. Fractions: simplest form and fractions of amounts** (Fraction Bakery, #E0902F / #AC661A) `6Nf.03`, `6Nf.02`
Words: fraction, numerator, denominator, equivalent fractions, simplify, simplest form, proper fraction, improper fraction,
mixed number, unit fraction, fraction of an amount.
Build: a fraction bar tool (a bar cut into d parts with n shaded; "Merge" groups parts to simplify: 6/8 -> 3/4; a second
bar below to compare equivalents) and a bar-model tool/picture for a fraction of an amount (the amount shared into d
equal boxes, n boxes taken, also more than one whole for improper fractions: 5/4 of 12). Models: simplify (typed with
`MX.FB`, must be fully simplified; feedback when only partly), is it in simplest form, find the common factor used,
equivalent fraction missing number, fraction of an amount (proper and improper operator), which is more, two-step
stories with fractions of amounts, claims.

**Stop 6. Fractions, decimals and percentages** (Percent Market, #7C5FD8 / #5940A8) `6Nf.04`, `6Nf.07`, `6Nf.08`
Words: percentage, per cent, equivalent, convert, compare, greater than, less than, ascending order, descending order, discount.
Build: an interactive hundred square (shade squares / rows: shows fraction, decimal and percentage together; the
`hgrid` picture exists) and a 0-to-1 number line with fraction / decimal / percentage labels for comparing and ordering;
`order` tiles exist (they take numbers: you may need your own tile tool for mixed labels). Models: convert between the
three forms (table with one given), percentage of a shape, percentage of an amount (1%, 5% multiples: 10%, 25%, 50%,
75%, 5%, 20% ...), compare with < > = (sym boxes), order a mixed set, "who has more" stories, percentage less / more
(two-step), claims.

**Stop 7. Quadrilaterals and rotational symmetry** (Shape Studio, #8DB32E / #66861A) `6Gg.01`, `6Gg.08`
Words: quadrilateral, parallel, perpendicular, right angle, diagonal, square, rectangle, parallelogram, rhombus,
trapezium, kite, rotational symmetry, order of rotational symmetry, line of symmetry.
Build: a shape picture kind that draws any named quadrilateral (and other familiar shapes, letters and simple patterns)
with optional marks (equal-side ticks, parallel arrows, right-angle squares, diagonals), a rotate tool (the shape turns
90 degrees a tap over a ghost outline; a counter shows how many times it fits in one full turn: the order, at most 4;
order 1 = no rotational symmetry) and a dot-grid tool where the child completes or draws a quadrilateral by tapping
grid points (checked by geometry: parallel pairs, right angles, equal sides). Models: name the shape from properties,
properties true / false, sort / pick all shapes with a property, order of rotational symmetry (typed / tick, from the
figure), complete the quadrilateral on the grid, diagonals (equal? bisect? perpendicular?), claims answered with a
counter-example shape (as reason options with figures).

**Stop 8. Circles** (Circle Circus, #C050A8 / #92367E) `6Gg.02`, `6Gg.11`
Words: circle, centre, radius, diameter, circumference, compasses, construct, double, half.
Build: a circle picture kind (centre, a radius, a diameter, the circumference, with labels or "?" marks and lengths)
and a compasses tool on a centimetre grid: the child sets the compasses opening with − / + (0.5 cm steps, the ruler
shows the opening), puts the point on a marked centre and taps "Draw" (the pencil sweeps the circle); checked: centre
and radius. Models: name the part shown, radius <-> diameter (typed, whole and decimal cm), which line is a radius /
diameter / neither (chord), set the compasses for a circle of diameter d, how many circles fit / distance across two
touching circles (two-step), spot the mistake (set the compasses to the diameter), claims.

**Stop 9. Mode, median, mean and range** (Data Stadium, #5B8CA8 / #3C6880) `6Ss.03`
Words: data, data set, average, mode, bimodal, median, mean, range, total, frequency.
Build: a data cards tool (number cards the child puts in order by tapping; then the middle card(s) light up for the
median; equal cards stack for the mode; the first and last show the range) and a "level the towers" tool for the mean
(columns of blocks; the child moves blocks from tall to short until all are level, or shares the total). Models:
mode (also bimodal and no mode), median (odd and even counts: halfway between the two middle values), mean (total ÷
count; whole-number and 1-decimal-place answers), range, all four for one set, missing value when the mean / range is
given, which average suits the context (outlier), compare two data sets, claims.

Vietnamese terms to use: số thập phân, làm tròn, gần nhất, ước lượng, tổng, hiệu; dãy số, số hạng, vị trí, quy luật,
số chính phương, số âm; bội số, ước số, bội chung, bội chung nhỏ nhất, ước chung, ước chung lớn nhất, chia hết, tích,
phản ví dụ; phân số, tử số, mẫu số, phân số bằng nhau, rút gọn, phân số tối giản, hỗn số; tỉ số phần trăm, phần trăm,
so sánh, lớn hơn, bé hơn, thứ tự tăng dần / giảm dần, giảm giá; tứ giác, song song, vuông góc, góc vuông, đường chéo,
hình vuông, hình chữ nhật, hình bình hành, hình thoi, hình thang, hình cánh diều, đối xứng quay, bậc đối xứng quay,
trục đối xứng; hình tròn, tâm, bán kính, đường kính, chu vi hình tròn, com-pa; dữ liệu, mốt, trung vị, số trung bình
cộng, khoảng biến thiên, tần số.

## 6. The real exam (EOS1 SY 26-27): what the trail must NOT copy

P1: (1) square numbers 4, 9, 16, 25: 7th term. (2) draw a circle, diameter 8 cm, centre A. (3) compare 5/8 with 3/4 and
0.7 with 65%. (4) order of rotational symmetry of a rectangle and a kite. (5) "The only common multiple of 4 and 6 is
12." (6) mean of 60, 90, 70, 100 g (oranges). (7) 13th term of 6, 12, 18, 24, 30. (8) simplify 12/18. (9) "A
quadrilateral with 4 right angles must have 4 equal sides." (draw a shape). (10) which rounds to 7: 6.38, 7.62, 6.75,
7.81. (11) a number with a digit 6 worth 0.06, a 9 worth 9, a 3 worth 0.3. (12) will 65 appear in 5, 11, 17, 23, 29.
(13) 4.2 litres of juice, 2 glasses of 0.63 litres, how much is left. (14) 65% or 3/5 of the marks: who scored more.
P2: (1) largest common factor of 42 and 56. (2) radius 6 cm, "the diameter is 3 cm": correct it and explain. (3) 4.6,
3.8, 3.0, 2.2, 1.4, next. (4) draw a quadrilateral with two pairs of parallel sides. (5) list 8, 15, 2.5, 40, 0.6:
"When you multiply a number by 10, you just add a zero to the end." (6) position-to-term table 1->4, 2->8, 3->12, 9->?.
(7) library visits 4, 8, 6, 10, 6, 14: mode, median, range. (8) 3 tens, 5 ones, 7 tenths, 2 hundredths, 4 thousandths.
(9) order 0.65, 60%, 0.5, 7/10, 3/4. (10) 84.6 ÷ 100. (11) "6/8 is in its simplest form." (12) smallest number with 2
decimal places that rounds to 6.9. (13) a pen costs 80 cents, a pencil 25% less. (14) 8 km on Monday, 3/4 and 5/4 of
that on the next two days: total for those two days.

The same skill is wanted (that is the point of revision). The same question is not: change the numbers, the setting,
the names and the wording, and for the claim items make a different claim about the same idea.
