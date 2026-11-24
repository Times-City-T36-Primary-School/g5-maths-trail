# makes the Lightning round items of Stop 7 (quadrilaterals and rotational symmetry): [question, [right, wrong, wrong]]
# Every right answer is found twice: (1) by geometry, from the corners of the shape (turning and folding it), and
# (2) from a table of facts written by hand. The two must agree, or the script stops.
# The order of rotational symmetry of a rectangle and of a kite is the real test question: it is not asked here.
import json, math, random
R = random.Random(77)
EPS = 1e-6
R3 = math.sqrt(3)
SH = {
    'square': [(0, 0), (4, 0), (4, 4), (0, 4)],
    'rectangle': [(0, 0), (6, 0), (6, 3), (0, 3)],
    'parallelogram': [(0, 0), (4, 0), (6, 3), (2, 3)],
    'rhombus': [(3, 0), (6, 2), (3, 4), (0, 2)],
    'trapezium': [(0, 0), (6, 0), (4, 3), (1, 3)],
    'isosceles trapezium': [(0, 0), (6, 0), (4, 3), (2, 3)],
    'kite': [(2, 0), (4, 5), (2, 6), (0, 5)],
    'equilateral triangle': [(0, 0), (4, 0), (2, 2 * R3)],
    'isosceles triangle': [(0, 0), (4, 0), (2, 5)],
    'letter H': [(0, 0), (1, 0), (1, 2), (2, 2), (2, 0), (3, 0), (3, 5), (2, 5), (2, 3), (1, 3), (1, 5), (0, 5)],
    'letter Z': [(0, 0), (4, 0), (4, 1), (1.5, 1), (4, 4), (4, 5), (0, 5), (0, 4), (2.5, 4), (0, 1)],
    'letter N': [(0, 0), (1, 0), (1, 3.2), (3, 0), (4, 0), (4, 5), (3, 5), (3, 1.8), (1, 5), (0, 5)],
    'letter T': [(1, 0), (2, 0), (2, 3), (3, 3), (3, 4), (0, 4), (0, 3), (1, 3)],
    'letter L': [(0, 0), (3, 0), (3, 1), (1, 1), (1, 4), (0, 4)],
    'plus sign (+)': [(1, 0), (2, 0), (2, 1), (3, 1), (3, 2), (2, 2), (2, 3), (1, 3), (1, 2), (0, 2), (0, 1), (1, 1)],
    'star with 4 points': [(0, 3), (1, 1), (3, 0), (1, -1), (0, -3), (-1, -1), (-3, 0), (-1, 1)],
    'arrow': [(0, 1), (3, 1), (3, 0), (5, 2), (3, 4), (3, 3), (0, 3)],
}
# (2) the facts, written by hand: rot = order of rotational symmetry, sym = lines of symmetry, par = pairs of parallel
# sides, right = right angles, eq = the largest number of equal sides, deq = equal diagonals, dperp = diagonals at 90
FACTS = {
    'square': dict(rot=4, sym=4, par=2, right=4, eq=4, deq=True, dperp=True),
    'rectangle': dict(rot=2, sym=2, par=2, right=4, eq=2, deq=True, dperp=False),
    'parallelogram': dict(rot=2, sym=0, par=2, right=0, eq=2, deq=False, dperp=False),
    'rhombus': dict(rot=2, sym=2, par=2, right=0, eq=4, deq=False, dperp=True),
    'trapezium': dict(rot=1, sym=0, par=1, right=0, eq=1, deq=False, dperp=False),
    'isosceles trapezium': dict(rot=1, sym=1, par=1, right=0, eq=2, deq=True, dperp=False),
    'kite': dict(rot=1, sym=1, par=0, right=0, eq=2, deq=False, dperp=True),
    'equilateral triangle': dict(rot=3, sym=3), 'isosceles triangle': dict(rot=1, sym=1),
    'letter H': dict(rot=2, sym=2), 'letter Z': dict(rot=2, sym=0), 'letter N': dict(rot=2, sym=0), 'letter T': dict(rot=1, sym=1),
    'letter L': dict(rot=1, sym=0), 'plus sign (+)': dict(rot=4, sym=4), 'star with 4 points': dict(rot=4, sym=4), 'arrow': dict(rot=1, sym=1),
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
def sym(p):                                           # try a fold line every quarter of a degree
    return sum(1 for i in range(720) if same(folded(p, i / 4), p))
def vec(p, i): return (p[(i + 1) % len(p)][0] - p[i][0], p[(i + 1) % len(p)][1] - p[i][1])
def cross(a, b): return a[0] * b[1] - a[1] * b[0]
def dot(a, b): return a[0] * b[0] + a[1] * b[1]
def geo(name):
    p = SH[name]; g = dict(rot=rot(p), sym=sym(p))
    if len(p) == 4:
        v = [vec(p, i) for i in range(4)]; l = [round(dot(x, x), 6) for x in v]
        d1 = (p[2][0] - p[0][0], p[2][1] - p[0][1]); d2 = (p[3][0] - p[1][0], p[3][1] - p[1][1])
        g.update(adj=(abs(l[0] - l[1]) < EPS and abs(l[2] - l[3]) < EPS) or (abs(l[1] - l[2]) < EPS and abs(l[3] - l[0]) < EPS), par=sum(1 for i in (0, 1) if abs(cross(v[i], v[i + 2])) < EPS), right=sum(1 for i in range(4) if abs(dot(v[i], v[i - 1])) < EPS),
                 eq=max(l.count(x) for x in l), deq=abs(dot(d1, d1) - dot(d2, d2)) < EPS, dperp=abs(dot(d1, d2)) < EPS)
    return g
GEO = {n: geo(n) for n in SH}
for n in SH:
    assert {k: v for k, v in GEO[n].items() if k != 'adj'} == FACTS[n], (n, GEO[n], FACTS[n])            # the two ways agree for every shape and every fact
def fact(name, k):
    assert GEO[name][k] == FACTS[name][k]
    return FACTS[name][k]

items = []; seen = set()
def add(q, right, wrongs):
    opts = list(dict.fromkeys([str(right)] + [str(w) for w in wrongs if str(w) != str(right)]))
    assert len(opts) >= 3, q
    assert q not in seen and len(q) <= 60, q
    seen.add(q); items.append([q, opts[:3]])
A = lambda n: ('an ' if n[0] in 'aeiou' else 'a ') + n

# the order of rotational symmetry (not the rectangle, not the kite); slips: the lines of symmetry, the number of sides
for n in ['square', 'rhombus', 'parallelogram', 'isosceles trapezium', 'equilateral triangle', 'isosceles triangle', 'letter H', 'letter Z',
          'letter N', 'letter T', 'letter L', 'plus sign (+)', 'star with 4 points', 'arrow']:
    r, s = fact(n, 'rot'), fact(n, 'sym')
    sides = len(SH[n]) if len(SH[n]) <= 4 else None
    wrongs = [x for x in (s, sides, 0 if r == 1 else 1, 2, 4, 3) if x is not None and x != r]
    q = 'Order of rotational symmetry: ' + ('the ' if n.startswith('letter') or n.startswith('plus') else A(n).split(' ')[0] + ' ') + n
    add(q, r, wrongs)
# lines of symmetry; slips: the order, the number of sides
for n in ['square', 'rectangle', 'rhombus', 'parallelogram', 'kite', 'isosceles trapezium', 'equilateral triangle', 'letter Z']:
    r, s = fact(n, 'rot'), fact(n, 'sym')
    add('Lines of symmetry: ' + ('the ' if n.startswith('letter') else A(n).split(' ')[0] + ' ') + n, s, [x for x in (r, len(SH[n]) if len(SH[n]) <= 4 else 2, 2, 1, 0) if x != s])
# pairs of parallel sides; slip: sides counted, not pairs
for n in ['parallelogram', 'trapezium', 'kite', 'rhombus', 'rectangle', 'square']:
    p = fact(n, 'par')
    add('Pairs of parallel sides in ' + A(n), p, [x for x in (p * 2 if p else 1, 1, 2, 0) if x != p])
add('Right angles in a rectangle', fact('rectangle', 'right'), [2, 0])
add('Right angles in a square', fact('square', 'right'), [2, 1])
add('Equal sides in a rhombus', fact('rhombus', 'eq'), [2, 0])
add('Pairs of equal sides in a kite', 2 if fact('kite', 'eq') == 2 and fact('kite', 'par') == 0 else None, [1, 4])
# always, sometimes or never? The family of a name holds every shape that fits its rule (a square is a rectangle).
RULE = {'rectangle': lambda g: g['right'] == 4, 'rhombus': lambda g: g['eq'] == 4, 'square': lambda g: g['right'] == 4 and g['eq'] == 4,
        'parallelogram': lambda g: g['par'] == 2, 'trapezium': lambda g: g['par'] == 1, 'kite': lambda g: g['adj']}
QUADS = [n for n in SH if len(SH[n]) == 4]
def asn(family, test):
    fam = [GEO[n] for n in QUADS if RULE[family](GEO[n])]
    hits = sum(1 for g in fam if test(g))
    return 'Always' if hits == len(fam) else 'Never' if hits == 0 else 'Sometimes'
# which shape always ...? "always" is tested on the whole family of each name (asn), and on the usual drawing (fact)
def which(q, key, want, right, wrongs, always=True):
    assert fact(right, key) == want and all(fact(w, key) != want for w in wrongs), q
    if always:
        assert asn(right, lambda g: g[key] == want) == 'Always', q
        assert all(asn(w, lambda g: g[key] == want) != 'Always' for w in wrongs), q
    add(q, right, wrongs)
which('Which shape always has 4 equal sides?', 'eq', 4, 'rhombus', ['rectangle', 'kite'])
which('Which shape has exactly one pair of parallel sides?', 'par', 1, 'trapezium', ['parallelogram', 'kite'])
which('Which shape always has 4 lines of symmetry?', 'sym', 4, 'square', ['rectangle', 'rhombus'])
which('Which shape always has order 4?', 'rot', 4, 'square', ['rhombus', 'parallelogram'])
which('Which shape always has 4 right angles?', 'right', 4, 'rectangle', ['rhombus', 'trapezium'])
which('Which shape always has equal diagonals?', 'deq', True, 'rectangle', ['rhombus', 'parallelogram'])
which('Which shape always has diagonals that cross at right angles?', 'dperp', True, 'rhombus', ['rectangle', 'parallelogram'])
which('Which shape has rotational symmetry of order 3?', 'rot', 3, 'equilateral triangle', ['square', 'isosceles triangle'], False)
which('Which letter has no rotational symmetry?', 'rot', 1, 'letter T', ['letter H', 'letter Z'], False)
which('Which letter has order 2 but no line of symmetry?', 'sym', 0, 'letter N', ['letter H', 'letter T'], False)
assert fact('letter N', 'rot') == 2 and fact('letter H', 'rot') == 2
# a kite and a rhombus always have a line of symmetry; a parallelogram does not always have one
assert asn('kite', lambda g: g['sym'] > 0) == 'Always' and asn('rhombus', lambda g: g['sym'] > 0) == 'Always' and asn('parallelogram', lambda g: g['sym'] > 0) == 'Sometimes'
add('Which shape does not always have a line of symmetry?', 'parallelogram', ['rhombus', 'kite'])
# a trapezium always has parallel sides, a rhombus too; the usual kite has none
assert fact('kite', 'par') == 0 and asn('trapezium', lambda g: g['par'] > 0) == 'Always' and asn('rhombus', lambda g: g['par'] > 0) == 'Always'
add('Which shape can have no parallel sides?', 'kite', ['trapezium', 'rhombus'])
ASN = ['Always', 'Sometimes', 'Never']
for q, family, test, hand in [
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
    assert asn(family, test) == hand, (q, asn(family, test), hand)
    add(q, hand, [x for x in ASN if x != hand])
# turns: 360 shared by the order (worked out), against the fact written by hand
for n, hand in ((2, 180), (3, 120), (4, 90)):
    assert 360 // n == hand and 360 % n == 0
    add(f'Order {n}: the shape fits after every turn of', f'{hand}°', [f'{x}°' for x in (90, 180, 120, 45) if x != hand])
    add(f'A shape fits after every {hand}° turn. Its order is', n, [x for x in (360 // hand + 1, 2, 4, 3) if x != n])
for q, frac, hand in (('A quarter turn is', 4, 90), ('A half turn is', 2, 180), ('A full turn is', 1, 360), ('Three quarter turns make', None, 270)):
    val = 360 // frac if frac else 3 * 360 // 4
    assert val == hand
    add(q, f'{hand}°', [f'{x}°' for x in (180, 90, 360, 45) if x != hand])
for n in (1, 2, 3, 4):
    add(f'A shape fits {n} time{"" if n == 1 else "s"} in one full turn. Its order is', n, [x for x in (n - 1, n + 1, n * 2) if x != n])
add('Order 1 means the shape has', 'no rotational symmetry', ['1 line of symmetry', '1 right angle'])
# lines of symmetry + order
for n in ['square', 'rhombus', 'parallelogram', 'equilateral triangle']:
    r, s = fact(n, 'rot'), fact(n, 'sym')
    add('Lines of symmetry + order: ' + A(n), r + s, [x for x in (r, s, r + s + 2, r * s, 1) if x != r + s])
# the words
add('Lines that never meet are', 'parallel', ['perpendicular', 'diagonal'])
add('Lines that meet at a right angle are', 'perpendicular', ['parallel', 'equal'])
add('A line that joins opposite corners is a', 'diagonal', ['side', 'line of symmetry'])
add('A shape with 4 straight sides is a', 'quadrilateral', ['triangle', 'pentagon'])
add('How many diagonals does a quadrilateral have?', 2, [4, 1])
add('A right angle measures', '90°', ['180°', '45°'])
add('The diagonals of a rhombus cross at', '90°' if fact('rhombus', 'dperp') else None, ['45°', '60°'])
add('A fold line with two matching halves is a', 'line of symmetry', ['diagonal', 'parallel line'])
R.shuffle(items)
for q, o in items: assert len(set(o)) == 3 and 'None' not in o, q
print(len(items))
open('tools/lightning_s7.txt', 'w', encoding='utf8').write(',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items))
