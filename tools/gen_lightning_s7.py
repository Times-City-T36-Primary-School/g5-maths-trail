# makes the Lightning round items of Stop 7 (quadrilaterals and rotational symmetry): [question, [right, wrong, wrong]]
# Every right answer is found twice: (1) by geometry, from the corners of the shapes (turning and folding them), and
# (2) from a table of facts written by hand. The two must agree, or the script stops.
# INCLUSIVE names: a square is a rectangle, a rhombus, a parallelogram and a kite; a rectangle and a rhombus are
# parallelograms; a rhombus is a kite. A question about a named shape is about EVERY shape the name covers, so the
# answer must be the same for every shape of the table that has the name (subject() checks this and stops the script
# otherwise). When it is not ("lines of symmetry: a rectangle" is 2 or 4), the question must name the shape exactly
# ("a rectangle that is not a square").
# The order of rotational symmetry of a rectangle and of a kite is the real test question: it is not asked here.
# run from the project folder: python3 tools/gen_lightning_s7.py [--write]
#   -> tools/lightning_s7.txt; with --write the list is also put into src/js/22-pack-stop7.js (lightning items)
import json, math, random, sys
R = random.Random(77)
EPS = 1e-6
R3 = math.sqrt(3)
SH = {
    'square': [(0, 0), (4, 0), (4, 4), (0, 4)],
    'tilted square': [(3, 0), (6, 3), (3, 6), (0, 3)],
    'rectangle': [(0, 0), (6, 0), (6, 3), (0, 3)],
    'tall rectangle': [(0, 0), (3, 0), (3, 6), (0, 6)],
    'parallelogram': [(0, 0), (4, 0), (6, 3), (2, 3)],
    'long parallelogram': [(2, 0), (7, 0), (5, 3), (0, 3)],
    'rhombus': [(3, 0), (6, 2), (3, 4), (0, 2)],
    'long rhombus': [(0, 0), (5, 0), (8, 4), (3, 4)],
    'trapezium': [(0, 0), (6, 0), (4, 3), (1, 3)],
    'isosceles trapezium': [(0, 0), (6, 0), (4, 3), (2, 3)],
    'wide isosceles trapezium': [(0, 0), (8, 0), (6, 2), (2, 2)],
    'right trapezium': [(0, 0), (5, 0), (3, 3), (0, 3)],
    'kite': [(2, 0), (4, 5), (2, 6), (0, 5)],
    'wide kite': [(0, 2), (1, 0), (6, 2), (1, 4)],
    'quadrilateral': [(0, 0), (5, 1), (4, 4), (1, 2)],
    'equilateral triangle': [(0, 0), (4, 0), (2, 2 * R3)],
    'isosceles triangle': [(0, 0), (4, 0), (2, 5)],
    'flat isosceles triangle': [(0, 0), (6, 0), (3, 2)],
    'letter H': [(0, 0), (1, 0), (1, 2), (2, 2), (2, 0), (3, 0), (3, 5), (2, 5), (2, 3), (1, 3), (1, 5), (0, 5)],
    'letter Z': [(0, 0), (4, 0), (4, 1), (1.5, 1), (4, 4), (4, 5), (0, 5), (0, 4), (2.5, 4), (0, 1)],
    'letter N': [(0, 0), (1, 0), (1, 3.2), (3, 0), (4, 0), (4, 5), (3, 5), (3, 1.8), (1, 5), (0, 5)],
    'letter T': [(1, 0), (2, 0), (2, 3), (3, 3), (3, 4), (0, 4), (0, 3), (1, 3)],
    'letter L': [(0, 0), (3, 0), (3, 1), (1, 1), (1, 4), (0, 4)],
    'plus sign (+)': [(1, 0), (2, 0), (2, 1), (3, 1), (3, 2), (2, 2), (2, 3), (1, 3), (1, 2), (0, 2), (0, 1), (1, 1)],
    'star with 4 equal points': [(0, 3), (1, 1), (3, 0), (1, -1), (0, -3), (-1, -1), (-3, 0), (-1, 1)],
    'arrow (→)': [(0, 1), (3, 1), (3, 0), (5, 2), (3, 4), (3, 3), (0, 3)],
}
# (2) the facts, written by hand: rot = order of rotational symmetry, sym = lines of symmetry, par = pairs of parallel
# sides, right = right angles, eq = the largest number of equal sides, pairs = pairs of equal sides (groups of 2),
# deq = equal diagonals, dperp = diagonals at 90
FACTS = {
    'square': dict(rot=4, sym=4, par=2, right=4, eq=4, pairs=0, deq=True, dperp=True),
    'tilted square': dict(rot=4, sym=4, par=2, right=4, eq=4, pairs=0, deq=True, dperp=True),
    'rectangle': dict(rot=2, sym=2, par=2, right=4, eq=2, pairs=2, deq=True, dperp=False),
    'tall rectangle': dict(rot=2, sym=2, par=2, right=4, eq=2, pairs=2, deq=True, dperp=False),
    'parallelogram': dict(rot=2, sym=0, par=2, right=0, eq=2, pairs=2, deq=False, dperp=False),
    'long parallelogram': dict(rot=2, sym=0, par=2, right=0, eq=2, pairs=2, deq=False, dperp=False),
    'rhombus': dict(rot=2, sym=2, par=2, right=0, eq=4, pairs=0, deq=False, dperp=True),
    'long rhombus': dict(rot=2, sym=2, par=2, right=0, eq=4, pairs=0, deq=False, dperp=True),
    'trapezium': dict(rot=1, sym=0, par=1, right=0, eq=1, pairs=0, deq=False, dperp=False),
    'isosceles trapezium': dict(rot=1, sym=1, par=1, right=0, eq=2, pairs=1, deq=True, dperp=False),
    'wide isosceles trapezium': dict(rot=1, sym=1, par=1, right=0, eq=2, pairs=1, deq=True, dperp=False),
    'right trapezium': dict(rot=1, sym=0, par=1, right=2, eq=2, pairs=1, deq=False, dperp=False),
    'kite': dict(rot=1, sym=1, par=0, right=0, eq=2, pairs=2, deq=False, dperp=True),
    'wide kite': dict(rot=1, sym=1, par=0, right=0, eq=2, pairs=2, deq=False, dperp=True),
    'quadrilateral': dict(rot=1, sym=0, par=0, right=0, eq=1, pairs=0, deq=False, dperp=False),
    'equilateral triangle': dict(rot=3, sym=3), 'isosceles triangle': dict(rot=1, sym=1), 'flat isosceles triangle': dict(rot=1, sym=1),
    'letter H': dict(rot=2, sym=2), 'letter Z': dict(rot=2, sym=0), 'letter N': dict(rot=2, sym=0), 'letter T': dict(rot=1, sym=1),
    'letter L': dict(rot=1, sym=0), 'plus sign (+)': dict(rot=4, sym=4), 'star with 4 equal points': dict(rot=4, sym=4), 'arrow (→)': dict(rot=1, sym=1),
}

# (1) geometry
def centre(p): return (sum(x for x, y in p) / len(p), sum(y for x, y in p) / len(p))
def near(a, b): return abs(a[0] - b[0]) < EPS and abs(a[1] - b[1]) < EPS
def same(a, b):
    n = len(a)
    return any(all(near(a[i], b[(s + d * i) % n]) for i in range(n)) for s in range(n) for d in (1, -1))
def turned(p, deg):
    c = centre(p); t = math.radians(deg)
    return [(c[0] + (x - c[0]) * math.cos(t) - (y - c[1]) * math.sin(t), c[1] + (x - c[0]) * math.sin(t) + (y - c[1]) * math.cos(t)) for x, y in p]
def folded(p, deg):
    c = centre(p); t = math.radians(2 * deg)
    return [(c[0] + (x - c[0]) * math.cos(t) + (y - c[1]) * math.sin(t), c[1] + (x - c[0]) * math.sin(t) - (y - c[1]) * math.cos(t)) for x, y in p]
def rot(p): return max(k for k in range(1, 13) if same(turned(p, 360 / k), p))
def sym(p):
    # a fold line through the centre passes through a corner, or is at right angles to the line joining two corners:
    # try every such line once
    c = centre(p); cand = []
    dirs = [(x - c[0], y - c[1]) for x, y in p] + [(-(q[1] - r[1]), q[0] - r[0]) for i, q in enumerate(p) for r in p[i + 1:]]
    for d in dirs:
        if abs(d[0]) < EPS and abs(d[1]) < EPS: continue
        a = math.degrees(math.atan2(d[1], d[0])) % 180
        if a > 180 - 1e-4: a = 0
        if all(abs(a - x) > 1e-4 for x in cand): cand.append(a)
    return sum(1 for a in cand if same(folded(p, a), p))
def vec(p, i): return (p[(i + 1) % len(p)][0] - p[i][0], p[(i + 1) % len(p)][1] - p[i][1])
def cross(a, b): return a[0] * b[1] - a[1] * b[0]
def dot(a, b): return a[0] * b[0] + a[1] * b[1]
def geo(name):
    p = SH[name]; g = dict(rot=rot(p), sym=sym(p))
    if len(p) == 4:
        v = [vec(p, i) for i in range(4)]; l = [round(dot(x, x), 6) for x in v]
        d1 = (p[2][0] - p[0][0], p[2][1] - p[0][1]); d2 = (p[3][0] - p[1][0], p[3][1] - p[1][1])
        pa = [abs(cross(v[i], v[i + 2])) < EPS for i in (0, 1)]
        g.update(adj=(abs(l[0] - l[1]) < EPS and abs(l[2] - l[3]) < EPS) or (abs(l[1] - l[2]) < EPS and abs(l[3] - l[0]) < EPS), par=sum(pa), right=sum(1 for i in range(4) if abs(dot(v[i], v[i - 1])) < EPS),
                 eq=max(l.count(x) for x in l), pairs=sum(1 for x in set(l) if l.count(x) == 2), deq=abs(dot(d1, d1) - dot(d2, d2)) < EPS, dperp=abs(dot(d1, d2)) < EPS,
                 # a trapezium with 2 equal sloping sides: the two sides that are not parallel are equal
                 legs=sum(pa) == 1 and abs(l[1 if pa[0] else 0] - l[3 if pa[0] else 2]) < EPS)
    if len(p) == 3:
        l = [round(dot(vec(p, i), vec(p, i)), 6) for i in range(3)]
        g.update(eq=max(l.count(x) for x in l))
    return g
GEO = {n: geo(n) for n in SH}
for n in SH:
    assert {k: v for k, v in GEO[n].items() if k in FACTS[n]} == FACTS[n], (n, GEO[n], FACTS[n])        # the two ways agree for every shape and every fact

# the names (inclusive) and the exact names; each is a rule on the geometry of a shape
QUADS = [n for n in SH if len(SH[n]) == 4]
TRIS = [n for n in SH if len(SH[n]) == 3]
RULE = {'rectangle': lambda g: g['right'] == 4, 'rhombus': lambda g: g['eq'] == 4, 'square': lambda g: g['right'] == 4 and g['eq'] == 4,
        'parallelogram': lambda g: g['par'] == 2, 'trapezium': lambda g: g['par'] == 1, 'kite': lambda g: g['adj']}
NAMED = dict(RULE)
NAMED.update({
    'rectangle that is not a square': lambda g: g['right'] == 4 and g['eq'] != 4,
    'rhombus that is not a square': lambda g: g['eq'] == 4 and g['right'] != 4,
    'parallelogram that is not a rectangle': lambda g: g['par'] == 2 and g['right'] != 4,
    'kite that is not a rhombus': lambda g: g['adj'] and g['eq'] != 4,
    'trapezium with 2 equal sloping sides': lambda g: g['par'] == 1 and g['legs'],
})
TRI = {'equilateral triangle': lambda g: g['eq'] == 3, 'triangle with exactly 2 equal sides': lambda g: g['eq'] == 2}
def family(name):
    if name in NAMED: fam = [n for n in QUADS if NAMED[name](GEO[n])]
    elif name in TRI: fam = [n for n in TRIS if TRI[name](GEO[n])]
    else: fam = [name]                                   # a letter or a pattern: the one drawing
    assert fam, name
    return fam
def subject(name, k):
    """the value of fact k for EVERY shape the name covers (geometry), checked against the hand facts of each"""
    fam = family(name)
    vals = {GEO[n][k] for n in fam}
    assert len(vals) == 1, ('not the same for every ' + name, k, {n: GEO[n][k] for n in fam})
    for n in fam: assert FACTS[n][k] == GEO[n][k], (n, k)
    return vals.pop()

items = []; seen = set()
def add(q, right, wrongs):
    opts = list(dict.fromkeys([str(right)] + [str(w) for w in wrongs if str(w) != str(right)]))
    assert len(opts) >= 3, q
    assert q not in seen and len(q) <= 60, (q, len(q))
    seen.add(q); items.append([q, opts[:3]])
A = lambda n: ('the ' if n.startswith(('letter', 'plus')) else 'an ' if n[0] in 'aeiou' else 'a ') + n
def lead(long, short, rest):
    return long + rest if len(long + rest) <= 60 else short + rest

# the order of rotational symmetry (not the rectangle, not the kite); slips: the lines of symmetry, the number of sides
for n in ['square', 'rhombus that is not a square', 'parallelogram that is not a rectangle', 'trapezium', 'equilateral triangle',
          'triangle with exactly 2 equal sides', 'letter H', 'letter Z', 'letter N', 'letter T', 'letter L', 'plus sign (+)',
          'star with 4 equal points', 'arrow (→)']:
    r = subject(n, 'rot')
    fam = family(n)
    sides = len(SH[fam[0]]) if len(SH[fam[0]]) <= 4 else None
    s = GEO[fam[0]]['sym'] if len({GEO[m]['sym'] for m in fam}) == 1 else None
    wrongs = [x for x in (s, sides, 0 if r == 1 else 1, 2, 4, 3) if x is not None and x != r]
    add(lead('Order of rotational symmetry: ', 'Order: ', A(n)), r, wrongs)
# lines of symmetry; slips: the order, the number of sides
for n in ['square', 'rectangle that is not a square', 'rhombus that is not a square', 'kite that is not a rhombus',
          'trapezium with 2 equal sloping sides', 'equilateral triangle', 'letter Z']:
    s = subject(n, 'sym')
    r = subject(n, 'rot')
    k = len(SH[family(n)[0]])
    add('Lines of symmetry: ' + A(n), s, [x for x in (r, k if k <= 4 else 2, 2, 1, 0) if x != s])
s = subject('letter N', 'sym'); assert s == 0
add('Lines of symmetry: the letter N', s, [1, 2])
# pairs of parallel sides; slip: sides counted, not pairs
for n in ['parallelogram', 'trapezium', 'kite that is not a rhombus', 'rhombus', 'rectangle', 'square']:
    p = subject(n, 'par')
    add('Pairs of parallel sides in ' + A(n), p, [x for x in (p * 2 if p else 1, 1, 2, 0) if x != p])
add('Right angles in a rectangle', subject('rectangle', 'right'), [2, 0])
add('Right angles in a square', subject('square', 'right'), [2, 1])
add('Equal sides in a rhombus', subject('rhombus', 'eq'), [2, 0])
add('Pairs of equal sides in a kite that is not a rhombus', subject('kite that is not a rhombus', 'pairs'), [1, 4])
# always, sometimes or never? The family of a name holds every shape that fits its rule (a square is a rectangle).
def asn(name, test):
    fam = [GEO[n] for n in family(name)]
    hits = sum(1 for g in fam if test(g))
    return 'Always' if hits == len(fam) else 'Never' if hits == 0 else 'Sometimes'
# which shape (always) ...? the right one always has it; a wrong one does not always have it (never, for "has")
def which(q, key, want, right, wrongs):
    assert asn(right, lambda g: g[key] == want) == 'Always', q
    for w in wrongs:
        a = asn(w, lambda g: g[key] == want)
        assert a != 'Always' if 'always' in q else a == 'Never', (q, w, a)
    add(q, right, wrongs)
which('Which shape always has 4 equal sides?', 'eq', 4, 'rhombus', ['rectangle', 'kite'])
which('Which shape has exactly one pair of parallel sides?', 'par', 1, 'trapezium', ['parallelogram', 'kite'])
which('Which shape always has 4 lines of symmetry?', 'sym', 4, 'square', ['rectangle', 'rhombus'])
which('Which shape always has order 4?', 'rot', 4, 'square', ['rhombus', 'parallelogram'])
which('Which shape always has 4 right angles?', 'right', 4, 'rectangle', ['rhombus', 'trapezium'])
which('Which shape always has equal diagonals?', 'deq', True, 'rectangle', ['rhombus', 'parallelogram'])
which('Which shape always has diagonals that cross at right angles?', 'dperp', True, 'rhombus', ['rectangle', 'parallelogram'])
which('Which shape has rotational symmetry of order 3?', 'rot', 3, 'equilateral triangle', ['square', 'triangle with exactly 2 equal sides'])
which('Which letter has no rotational symmetry?', 'rot', 1, 'letter T', ['letter H', 'letter Z'])
which('Which letter has order 2 but no line of symmetry?', 'sym', 0, 'letter N', ['letter H', 'letter T'])
assert subject('letter N', 'rot') == 2 and subject('letter H', 'rot') == 2
# a kite and a rhombus always have a line of symmetry; a parallelogram does not always have one
assert asn('kite', lambda g: g['sym'] > 0) == 'Always' and asn('rhombus', lambda g: g['sym'] > 0) == 'Always' and asn('parallelogram', lambda g: g['sym'] > 0) == 'Sometimes'
add('Which shape does not always have a line of symmetry?', 'parallelogram', ['rhombus', 'kite'])
# a trapezium always has parallel sides, a rhombus too; a kite can have none
assert asn('kite', lambda g: g['par'] == 0) == 'Sometimes' and asn('trapezium', lambda g: g['par'] > 0) == 'Always' and asn('rhombus', lambda g: g['par'] > 0) == 'Always'
add('Which shape can have no parallel sides?', 'kite', ['trapezium', 'rhombus'])
ASN = ['Always', 'Sometimes', 'Never']
for q, name, test, hand in [
    ('A square is a rectangle.', 'square', RULE['rectangle'], 'Always'),
    ('A rectangle is a square.', 'rectangle', RULE['square'], 'Sometimes'),
    ('A square is a rhombus.', 'square', RULE['rhombus'], 'Always'),
    ('A rhombus is a square.', 'rhombus', RULE['square'], 'Sometimes'),
    ('A trapezium is a parallelogram.', 'trapezium', RULE['parallelogram'], 'Never'),
    ('A rhombus is a parallelogram.', 'rhombus', RULE['parallelogram'], 'Always'),
    ('A parallelogram has 4 right angles.', 'parallelogram', lambda g: g['right'] == 4, 'Sometimes'),
    ('A parallelogram has a line of symmetry.', 'parallelogram', lambda g: g['sym'] > 0, 'Sometimes'),
    ('A trapezium has 2 pairs of parallel sides.', 'trapezium', lambda g: g['par'] == 2, 'Never'),
    ('A rhombus has diagonals that cross at right angles.', 'rhombus', lambda g: g['dperp'], 'Always'),
    ('A parallelogram has rotational symmetry.', 'parallelogram', lambda g: g['rot'] > 1, 'Always'),
]:
    assert asn(name, test) == hand, (q, asn(name, test), hand)
    add(q, hand, [x for x in ASN if x != hand])
# turns: 360 shared by the order (worked out), against the fact written by hand. "Fits after every 180° turn" is
# also true of order 4 (and 6), so the question gives the SMALLEST turn that fits: only one order has it.
for n, hand in ((2, 180), (3, 120), (4, 90)):
    assert 360 // n == hand and 360 % n == 0
    assert [k for k in range(1, 13) if abs(360 / k - hand) < EPS] == [n]
    for m in SH:                                        # by turning: a shape fits first after this turn only when its order is n
        first = min(360 / k for k in range(1, 13) if same(turned(SH[m], 360 / k), SH[m]))
        assert (abs(first - hand) < EPS) == (GEO[m]['rot'] == n), (m, first)
    add(f'Order {n}: the shape fits after every turn of', f'{hand}°', [f'{x}°' for x in (90, 180, 120, 45) if x != hand])
    add(f'Fits after {hand}° but not after a smaller turn. Its order is', n, [x for x in (360 // hand + 1, 2, 4, 3) if x != n])
for q, frac, hand in (('A quarter turn is', 4, 90), ('A half turn is', 2, 180), ('A full turn is', 1, 360), ('Three quarter turns make', None, 270)):
    val = 360 // frac if frac else 3 * 360 // 4
    assert val == hand
    add(q, f'{hand}°', [f'{x}°' for x in (180, 90, 360, 45) if x != hand])
for n in (1, 2, 3, 4):
    add(f'A shape fits {n} time{"" if n == 1 else "s"} in one full turn. Its order is', n, [x for x in (n - 1, n + 1, n * 2) if x != n])
add('Order 1 means the shape has', 'no rotational symmetry', ['1 line of symmetry', '1 right angle'])
# more lines of symmetry (plain items, one fact each); slips: the order, a nearby count
for n in ['letter H', 'letter T', 'letter L', 'plus sign (+)']:
    s = subject(n, 'sym')
    r = subject(n, 'rot')
    add('Lines of symmetry: ' + A(n), s, [x for x in (r, 2, 1, 0) if x != s])
# the words
add('Lines that never meet are', 'parallel', ['perpendicular', 'diagonal'])
add('Lines that meet at a right angle are', 'perpendicular', ['parallel', 'equal'])
add('A line that joins opposite corners is a', 'diagonal', ['side', 'line of symmetry'])
add('A shape with 4 straight sides is a', 'quadrilateral', ['triangle', 'pentagon'])
add('How many diagonals does a quadrilateral have?', 2, [4, 1])
add('A right angle measures', '90°', ['180°', '45°'])
add('The diagonals of a rhombus cross at', '90°' if asn('rhombus', lambda g: g['dperp']) == 'Always' else None, ['45°', '60°'])
add('A fold line with two matching halves is a', 'line of symmetry', ['diagonal', 'parallel line'])
# no question may name a shape with a word of another stage
for q, o in items: assert 'isosceles' not in q + ' '.join(o) and 'leans' not in q, q
R.shuffle(items)
for q, o in items: assert len(set(o)) == 3 and 'None' not in o, q
print(len(items))
out = ',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items) + '\n'
open('tools/lightning_s7.txt', 'w', encoding='utf8').write(out)
if '--write' in sys.argv:                 # also put the items into the pack, between "lightning: {" and the self-check
    pk = 'src/js/22-pack-stop7.js'; src = open(pk, encoding='utf8').read()
    i = src.index('items: [\n', src.index('    lightning: {')) + len('items: [\n'); j = src.index('      ]\n    },\n', i)
    open(pk, 'w', encoding='utf8').write(src[:i] + out + src[j:])
    print('written into', pk)
