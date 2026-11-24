# makes the Lightning round items of Stop 8 (Circles): [question, [right, wrong, wrong]]
# run from the project folder: python3 tools/gen_lightning_s8.py [--write]
#   -> tools/lightning_s8.txt; with --write the list is also put into src/js/22-pack-stop8.js, between the two
#      marker lines "// LIGHTNING-BEGIN" and "// LIGHTNING-END".
# The right answers are worked out with Decimal; at the end every one is worked out again from the words of the
# question with Fraction (a second way). The wrong answers are real slips: halve instead of double, double instead of
# halve, the diameter for the compasses, the radius for the width of a circle, add 2 instead of double, the diameter
# kept as the radius (no halving), the diameter doubled instead of halved.
# A number and its unit are joined by a no-break space (NB), so a phone never breaks "12.5 / mm".
import random, json, re, sys
from decimal import Decimal as Dc
from fractions import Fraction as Fr
R = random.Random(86)
def s(x):
    t = format(Dc(str(x)).normalize(), 'f')
    w, _, f = t.partition('.')
    return '{:,}'.format(int(w)) + ('.' + f if f else '')
NB = '\u00a0'
items = []; seen = set()
def add(q, right, wrongs):
    opts = list(dict.fromkeys([right] + [w for w in wrongs if w != right]))
    if len(opts) < 3 or q in seen or len(q) > 60: return False
    seen.add(q); items.append([q, opts[:3]]); return True
# no numbers of the real test: not (radius 4, diameter 8), not (radius 6), not (radius 3, diameter 6)
BAD = {Dc('3'), Dc('4'), Dc('6'), Dc('30'), Dc('40'), Dc('60')}
radii = [Dc(x) for x in ('1.5 2 2.5 3.5 4.5 5 5.5 6.5 7 7.5 8.5 9 10 11 12.5 15 20 25 35 45').split()]
assert not (set(radii) & BAD)
def unit(r): return 'mm' if r in (Dc('12.5'), Dc('25'), Dc('45')) else 'm' if r in (Dc('1.5'), Dc('2')) and R.random() < .3 else 'cm'

# not the pairs of the Mini test (a question there must not be practised here first): the radius of test q2,
# the radius of test q3 (its diameter given), the radius of test q5 and q6 (compasses)
TEST_R2D = {Dc('9'), Dc('18.5'), Dc('36'), Dc('6.5')}   # 6.5 kept out: 6.5 / 13 is used enough in the notes
TEST_D2R = {Dc('8.5'), Dc('9.5'), Dc('11')}
TEST_SET = {Dc('14'), Dc('12'), Dc('5'), Dc('16.5'), Dc('5.5'), Dc('3.5')}
# radius -> diameter
c = 0
for r in R.sample(radii, len(radii)):
    if c >= 13: break
    if r in TEST_R2D: continue
    u = unit(r)
    if add(f'Radius {s(r)}{NB}{u}. Diameter?', f'{s(2 * r)}{NB}{u}', [f'{s(r / 2)}{NB}{u}', f'{s(r + 2)}{NB}{u}']): c += 1
# diameter -> radius
c = 0
for r in R.sample(radii, len(radii)):
    if c >= 13: break
    if r in TEST_D2R: continue
    u = unit(r); d = 2 * r
    # slips: the diameter itself (did not halve) and 2 x the diameter (doubled instead of halved)
    if add(f'Diameter {s(d)}{NB}{u}. Radius?', f'{s(r)}{NB}{u}', [f'{s(d)}{NB}{u}', f'{s(2 * d)}{NB}{u}']): c += 1
# the compasses
small = [r for r in radii if r <= Dc('7.5')]
c = 0
for r in R.sample(small, len(small)):
    if c >= 6: break
    if r in TEST_SET: continue
    d = 2 * r
    if add(f'A circle {s(d)}{NB}cm across. Compasses open?', f'{s(r)}{NB}cm', [f'{s(d)}{NB}cm', f'{s(2 * d)}{NB}cm']): c += 1
c = 0
for r in R.sample(small, len(small)):
    if c >= 5: break
    if r in TEST_SET: continue
    if add(f'A circle of radius {s(r)}{NB}cm. Compasses open?', f'{s(r)}{NB}cm', [f'{s(2 * r)}{NB}cm', f'{s(r / 2)}{NB}cm']): c += 1
c = 0
for r in R.sample(small, len(small)):
    if c >= 5: break
    if add(f'Compasses open {s(r)}{NB}cm. How far across is the circle?', f'{s(2 * r)}{NB}cm', [f'{s(r)}{NB}cm', f'{s(r / 2)}{NB}cm']): c += 1
# circles in a row (two steps); not a row of the pack (n, radius), so no question is the same as one in Practise
# or the test
PACK_ROWS = {(3, Dc('4.5')), (4, Dc('1.5')), (5, Dc('3.5')), (6, Dc('5')), (4, Dc('3.5')), (3, Dc('35')), (5, Dc('1.5'))}
c = 0
while c < 8:
    n = R.choice([2, 3, 4, 5]); r = R.choice([Dc(x) for x in ('1.5 2 2.5 3.5 5 10').split()])
    if n * r == 2 * r or (n, r) in PACK_ROWS: continue
    if add(f'{n} circles touch in a row. Radius {s(r)}{NB}cm. Row length?', f'{s(n * 2 * r)}{NB}cm', [f'{s(n * r)}{NB}cm', f'{s(2 * r)}{NB}cm']): c += 1
# a circle that fits exactly inside a square
c = 0
for r in R.sample([Dc(x) for x in ('2.5 3.5 4.5 5 7 7.5 9 15').split()], 8):
    if c >= 6: break
    if add(f'Circle fits exactly in a square. Radius {s(r)}{NB}cm. Side?', f'{s(2 * r)}{NB}cm', [f'{s(r)}{NB}cm', f'{s(4 * r)}{NB}cm']): c += 1
# the words (each checked by hand, twice)
WORDS = [
    ('The line all the way round a circle is the', ['circumference', 'diameter', 'radius']),
    ('From the centre to the circumference: a', ['radius', 'diameter', 'circle']),
    ('Across a circle, through the centre: a', ['diameter', 'radius', 'circumference']),
    ('The point in the middle of a circle is the', ['centre', 'radius', 'circumference']),
    ('The tool that draws a circle', ['compasses', 'ruler', 'protractor']),
    ('Double the radius. You get the', ['diameter', 'circumference', 'centre']),
    ('Half of the diameter is the', ['radius', 'centre', 'circumference']),
    ('The point of the compasses goes on the', ['centre', 'circumference', 'diameter']),
    ('How many radii make one diameter?', ['2', '1', '4']),
    ('A line across a circle that misses the centre is', ['not a diameter', 'a diameter', 'a radius']),
    ('All radii of one circle are the same length.', ['always true', 'sometimes true', 'never true']),
    ('One circle: radius or diameter, which is longer?', ['the diameter', 'the radius', 'they are equal']),
    ('The compasses are opened to the', ['radius', 'diameter', 'circumference']),
    ('A diameter always passes through the', ['centre', 'radius', 'corner']),
]
for q, o in WORDS: assert add(q, o[0], o[1:]), q
R.shuffle(items)
# swapped in place after the shuffle (so the rest of the list stays the same): "Radius 8.5 -> 17" gave the answer of
# test q3 (diameter 17); "Radius 35 -> 70" was step 1 of test q7 (wheels of radius 35)
SWAP = {f'Radius 8.5{NB}cm. Diameter?': [f'Radius 16{NB}cm. Diameter?', [f'32{NB}cm', f'8{NB}cm', f'18{NB}cm']],
        f'Radius 35{NB}cm. Diameter?': [f'Radius 15{NB}cm. Diameter?', [f'30{NB}cm', f'7.5{NB}cm', f'17{NB}cm']]}
for i, (q, o) in enumerate(items):
    if q in SWAP: items[i] = SWAP.pop(q)
assert not SWAP, SWAP
assert len(set(q for q, o in items)) == len(items)

# ---- every right answer again, a second way: read the numbers back from the question, work with fractions ----
def num(t): return Fr(t.replace(',', ''))
def val(t): return num(t.split(NB)[0])
checked = 0
for q, o in items:
    m = re.match(r'Radius ([\d.,]+)\s\w+\. Diameter\?', q)
    if m: assert val(o[0]) == num(m.group(1)) * 2, q; checked += 1; continue
    m = re.match(r'Diameter ([\d.,]+)\s\w+\. Radius\?', q)
    if m: assert val(o[0]) * 2 == num(m.group(1)), q; checked += 1; continue
    m = re.match(r'A circle ([\d.,]+)\scm across\. Compasses open\?', q)
    if m: assert val(o[0]) + val(o[0]) == num(m.group(1)), q; checked += 1; continue
    m = re.match(r'A circle of radius ([\d.,]+)\scm\. Compasses open\?', q)
    if m: assert val(o[0]) == num(m.group(1)), q; checked += 1; continue
    m = re.match(r'Compasses open ([\d.,]+)\scm\. How far across', q)
    if m: assert val(o[0]) / 2 == num(m.group(1)), q; checked += 1; continue
    m = re.match(r'(\d) circles touch in a row\. Radius ([\d.,]+)\scm', q)
    if m: assert val(o[0]) / int(m.group(1)) / 2 == num(m.group(2)), q; checked += 1; continue
    m = re.match(r'Circle fits exactly in a square\. Radius ([\d.,]+)\scm\. Side\?', q)
    if m: assert val(o[0]) == num(m.group(1)) + num(m.group(1)), q; checked += 1; continue
    assert any(q == w[0] for w in WORDS), 'not checked: ' + q
for q, o in items:
    assert len(o) == 3 and len(set(o)) == 3 and len(q) <= 60, q
    # nothing of the real test: a diameter of 8 with a radius of 4, a radius of 6 with 3 or 12
    q = q.replace(NB, ' ')
    nums = set(re.findall(r'\d+(?:\.\d+)?', q + ' ' + o[0]))
    assert not ({'8', '4'} <= nums and 'Radius 4 ' in q or {'6', '3'} <= nums or 'Radius 6 ' in q or 'Diameter 8 ' in q or 'circle 8 cm' in q), q
n_d = 0
for q, o in items:
    # the wrong answers of "Diameter N. Radius?" are N and 2 x N
    m = re.match(r'Diameter ([\d.,]+)\s\w+\. Radius\?', q)
    if m: n_d += 1; assert val(o[1]) == num(m.group(1)) and val(o[2]) == 2 * num(m.group(1)), q
    assert not re.search(r'\d (cm|mm|m)\b', q + ' '.join(o)), 'a breaking space before a unit: ' + q
assert n_d >= 10, n_d
print(len(items), 'items;', checked, 'numbers checked a second way')
text = ',\n'.join('        ' + json.dumps(i, ensure_ascii=False).replace(NB, '\\u00a0') for i in items)
open('tools/lightning_s8.txt', 'w', encoding='utf8').write(text + '\n')
if '--write' in sys.argv:
    p = 'src/js/22-pack-stop8.js'; src = open(p, encoding='utf8').read()
    a = src.index('// LIGHTNING-BEGIN'); b = src.index('// LIGHTNING-END')
    a = src.index('\n', a) + 1; b = src.rindex('\n', 0, b) + 1
    open(p, 'w', encoding='utf8').write(src[:a] + text + '\n' + src[b:])
    print('written into', p)
