# makes the Lightning round items of Stop 8 (Circles): [question, [right, wrong, wrong]]
# run from the project folder: python3 tools/gen_lightning_s8.py [--write]
#   -> tools/lightning_s8.txt; with --write the list is also put into src/js/22-pack-stop8.js, between the two
#      marker lines "// LIGHTNING-BEGIN" and "// LIGHTNING-END".
# The right answers are worked out with Decimal; at the end every one is worked out again from the words of the
# question with Fraction (a second way). The wrong answers are real slips: halve instead of double, double instead of
# halve, the diameter for the compasses, the radius for the width of a circle, add 2 instead of double, the diameter
# kept as the radius (no halving), the .5 dropped when an odd diameter is halved.
import random, json, re, sys
from decimal import Decimal as Dc
from fractions import Fraction as Fr
R = random.Random(86)
def s(x):
    t = format(Dc(str(x)).normalize(), 'f')
    w, _, f = t.partition('.')
    return '{:,}'.format(int(w)) + ('.' + f if f else '')
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

# radius -> diameter
c = 0
for r in R.sample(radii, len(radii)):
    if c >= 13: break
    u = unit(r)
    if add(f'Radius {s(r)} {u}. Diameter?', f'{s(2 * r)} {u}', [f'{s(r / 2)} {u}', f'{s(r + 2)} {u}']): c += 1
# diameter -> radius
c = 0
for r in R.sample(radii, len(radii)):
    if c >= 13: break
    u = unit(r); d = 2 * r
    # slips: the diameter itself (no halving); half of an odd number with the .5 dropped; or + 2 for "halve"
    wrong2 = r - Dc('0.5') if r % 1 else r + 2
    if add(f'Diameter {s(d)} {u}. Radius?', f'{s(r)} {u}', [f'{s(d)} {u}', f'{s(wrong2)} {u}']): c += 1
# the compasses
small = [r for r in radii if r <= Dc('7.5')]
c = 0
for r in R.sample(small, len(small)):
    if c >= 6: break
    d = 2 * r
    if add(f'A circle {s(d)} cm across. Compasses open?', f'{s(r)} cm', [f'{s(d)} cm', f'{s(2 * d)} cm']): c += 1
c = 0
for r in R.sample(small, len(small)):
    if c >= 5: break
    if add(f'A circle of radius {s(r)} cm. Compasses open?', f'{s(r)} cm', [f'{s(2 * r)} cm', f'{s(r / 2)} cm']): c += 1
c = 0
for r in R.sample(small, len(small)):
    if c >= 5: break
    if add(f'Compasses open {s(r)} cm. How far across is the circle?', f'{s(2 * r)} cm', [f'{s(r)} cm', f'{s(r / 2)} cm']): c += 1
# circles in a row (two steps)
c = 0
while c < 8:
    n = R.choice([2, 3, 4, 5]); r = R.choice([Dc(x) for x in ('1.5 2 2.5 3.5 5 10').split()])
    if n * r == 2 * r: continue
    if add(f'{n} circles touch in a row. Radius {s(r)} cm. Row length?', f'{s(n * 2 * r)} cm', [f'{s(n * r)} cm', f'{s(2 * r)} cm']): c += 1
# a circle that fits exactly inside a square
c = 0
for r in R.sample([Dc(x) for x in ('2.5 3.5 4.5 5 7 7.5 9 15').split()], 8):
    if c >= 6: break
    if add(f'Circle fits exactly in a square. Radius {s(r)} cm. Side?', f'{s(2 * r)} cm', [f'{s(r)} cm', f'{s(4 * r)} cm']): c += 1
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
    ('Radius or diameter: which is longer?', ['the diameter', 'the radius', 'they are equal']),
    ('The compasses are opened to the', ['radius', 'diameter', 'circumference']),
    ('A diameter always passes through the', ['centre', 'radius', 'corner']),
]
for q, o in WORDS: assert add(q, o[0], o[1:]), q
R.shuffle(items)

# ---- every right answer again, a second way: read the numbers back from the question, work with fractions ----
def num(t): return Fr(t.replace(',', ''))
def val(t): return num(t.split(' ')[0])
checked = 0
for q, o in items:
    m = re.match(r'Radius ([\d.,]+) \w+\. Diameter\?', q)
    if m: assert val(o[0]) == num(m.group(1)) * 2, q; checked += 1; continue
    m = re.match(r'Diameter ([\d.,]+) \w+\. Radius\?', q)
    if m: assert val(o[0]) * 2 == num(m.group(1)), q; checked += 1; continue
    m = re.match(r'A circle ([\d.,]+) cm across\. Compasses open\?', q)
    if m: assert val(o[0]) + val(o[0]) == num(m.group(1)), q; checked += 1; continue
    m = re.match(r'A circle of radius ([\d.,]+) cm\. Compasses open\?', q)
    if m: assert val(o[0]) == num(m.group(1)), q; checked += 1; continue
    m = re.match(r'Compasses open ([\d.,]+) cm\. How far across', q)
    if m: assert val(o[0]) / 2 == num(m.group(1)), q; checked += 1; continue
    m = re.match(r'(\d) circles touch in a row\. Radius ([\d.,]+) cm', q)
    if m: assert val(o[0]) / int(m.group(1)) / 2 == num(m.group(2)), q; checked += 1; continue
    m = re.match(r'Circle fits exactly in a square\. Radius ([\d.,]+) cm\. Side\?', q)
    if m: assert val(o[0]) == num(m.group(1)) + num(m.group(1)), q; checked += 1; continue
    assert any(q == w[0] for w in WORDS), 'not checked: ' + q
for q, o in items:
    assert len(o) == 3 and len(set(o)) == 3 and len(q) <= 60, q
    # nothing of the real test: a diameter of 8 with a radius of 4, a radius of 6 with 3 or 12
    nums = set(re.findall(r'\d+(?:\.\d+)?', q + ' ' + o[0]))
    assert not ({'8', '4'} <= nums and 'Radius 4 ' in q or {'6', '3'} <= nums or 'Radius 6 ' in q or 'Diameter 8 ' in q or 'circle 8 cm' in q), q
print(len(items), 'items;', checked, 'numbers checked a second way')
text = ',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items)
open('tools/lightning_s8.txt', 'w', encoding='utf8').write(text + '\n')
if '--write' in sys.argv:
    p = 'src/js/22-pack-stop8.js'; src = open(p, encoding='utf8').read()
    a = src.index('// LIGHTNING-BEGIN'); b = src.index('// LIGHTNING-END')
    a = src.index('\n', a) + 1; b = src.rindex('\n', 0, b) + 1
    open(p, 'w', encoding='utf8').write(src[:a] + text + '\n' + src[b:])
    print('written into', p)
