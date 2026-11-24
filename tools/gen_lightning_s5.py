# makes the Lightning round items of Stop 5 (fractions: simplest form, fractions of amounts): [question, [right, wrong, wrong]]
# Fractions are whole-number pairs. Every right answer is checked again a second way at the end (fractions.Fraction and
# cross-multiplying). The wrong answers are real slips: stopping too soon, dividing only one number, subtracting,
# finding only one part, forgetting to divide. Nothing here uses 12/18, 6/8 or the numbers of the EOS1 papers.
import random, json, re
from math import gcd
from fractions import Fraction
R = random.Random(505)
BAN = {'12/18', '6/8'}
items = []; seen = set()
def add(q, right, wrongs):
    opts = list(dict.fromkeys([right] + [w for w in wrongs if w != right]))
    if len(opts) < 3 or q in seen or len(q) > 60: return False
    if any(b in t for b in BAN for t in [q] + opts[:3]): return False
    seen.add(q); items.append([q, opts[:3]]); return True
def simp(n, d): g = gcd(n, d); return n // g, d // g
def f(n, d): return f'{n}/{d}'
def prime(a, b): return next((p for p in (2, 3, 5, 7) if a % p == 0 and b % p == 0), 0)

# 1. simplify: the slips are stopping too soon, dividing only the numerator, subtracting the same number
S = [(4, 6), (6, 9), (8, 12), (10, 15), (4, 10), (6, 10), (9, 12), (8, 20), (12, 20), (15, 20), (14, 21), (10, 25), (16, 24),
     (9, 15), (20, 30), (8, 14), (15, 25), (12, 30), (21, 28), (18, 27), (16, 20), (6, 15)]
for n, d in S:
    g = gcd(n, d); a, b = simp(n, d); p = prime(n, d)
    wrongs = []
    if g != p: wrongs.append(f(n // p, d // p))            # stopped too soon
    wrongs += [f(a, d), f(n - g, d - g), f(b, a)]          # only the numerator; subtracted; upside down
    wrongs = [w for w in wrongs if Fraction(*map(int, w.split('/'))) != Fraction(n, d) or w == f(n // p, d // p)]
    add(f'{f(n, d)} in its simplest form is', f(a, b), wrongs)

# 2. which one is in its simplest form (the others can be divided)
T = [((5, 9), (4, 10), (6, 9)), ((7, 10), (5, 10), (8, 10)), ((3, 8), (4, 8), (2, 8)), ((4, 9), (3, 9), (6, 9)), ((8, 15), (5, 15), (9, 15)),
     ((5, 12), (3, 12), (10, 12)), ((9, 20), (5, 20), (8, 20)), ((7, 12), (9, 12), (4, 12))]
for a, b, c in T:
    assert gcd(*a) == 1 and gcd(*b) > 1 and gcd(*c) > 1
    three = [a, b, c]; R.shuffle(three)
    add(f'Which is in its simplest form: {f(*three[0])}, {f(*three[1])} or {f(*three[2])}?', f(*a), [f(*b), f(*c)])

# 3. equal fractions with a missing number: the slip is adding instead of multiplying
E = [(2, 5, 4), (3, 4, 5), (1, 3, 6), (5, 6, 2), (2, 7, 3), (3, 10, 3), (4, 5, 4), (1, 6, 5), (3, 8, 2), (2, 9, 2)]
for i, (n, d, k) in enumerate(E):
    N, D = n * k, d * k
    if i % 2 == 0: add(f'{f(n, d)} = ?/{D}', str(N), [str(n + (D - d)), str(k), str(n)])
    else: add(f'{f(n, d)} = {N}/?', str(D), [str(d + (N - n)), str(k), str(d)])
B = [(8, 12, 4), (9, 15, 3), (10, 16, 2), (20, 25, 5), (14, 20, 2), (6, 21, 3)]
for i, (n, d, k) in enumerate(B):
    a, b = n // k, d // k
    if i % 2 == 0: add(f'{f(n, d)} = ?/{b}', str(a), [w for w in (str(n - (d - b)), str(k), str(a + 1), str(n)) if int(w) > 0])
    else: add(f'{f(n, d)} = {a}/?', str(b), [str(d - (n - a)), str(k), str(b + 1)])

# 4. a proper fraction of an amount: the slips are one part only, and multiplying without dividing
P = [(3, 4, 20), (2, 5, 30), (5, 6, 18), (2, 3, 21), (3, 8, 40), (7, 10, 50), (4, 5, 35), (3, 7, 28), (5, 9, 27), (2, 3, 60), (3, 5, 45), (5, 8, 32), (3, 10, 70), (5, 6, 42)]
for n, d, amt in P:
    each = amt // d
    add(f'{f(n, d)} of {amt}', str(n * each), [str(each), str(amt - each), str(amt * n)])

# 5. an improper fraction of an amount: more than the whole. Slips: one part; the amount less one part; the amount itself
I = [(5, 4, 12), (4, 3, 15), (7, 5, 20), (3, 2, 14), (5, 3, 9), (9, 8, 16), (7, 4, 20), (6, 5, 25), (5, 2, 8), (11, 10, 30), (7, 6, 24), (8, 5, 10)]
for n, d, amt in I:
    each = amt // d
    add(f'{f(n, d)} of {amt}', str(n * each), [str(amt - each) if amt - each != n * each else str(each), str(each), str(amt)])
for n, d, amt in [(5, 3, 12), (3, 5, 20), (7, 7, 20), (9, 8, 40), (2, 3, 18), (6, 5, 15), (4, 4, 36), (5, 6, 30)]:
    r = 'more than' if n > d else 'equal to' if n == d else 'less than'
    add(f'{f(n, d)} of {amt} is ___ {amt}', r, [x for x in ('less than', 'equal to', 'more than') if x != r])

# 6. the biggest number that divides both (the number to divide by in one step)
for n, d in [(8, 12), (10, 15), (12, 20), (9, 15), (18, 24), (14, 21), (20, 30), (15, 25)]:
    g = gcd(n, d); p = prime(n, d)
    wrongs = ([str(p)] if p != g else []) + [str(d - n), str(n), str(g * 2)]
    wrongs = [w for w in wrongs if not (n % int(w) == 0 and d % int(w) == 0 and int(w) >= g)]
    add(f'Biggest number that divides both {n} and {d}', str(g), wrongs)

# 7. the whole from a part
for n, d, amt in [(3, 4, 16), (2, 3, 15), (3, 5, 20), (2, 5, 25), (5, 6, 12)]:
    part = n * (amt // d)
    add(f'{f(n, d)} of a number is {part}. The number is', str(amt), [str(part // n), str(part * d), str(part + d)])

# 8. the words
for q, r, w in [('7/5 is', 'an improper fraction', ['a proper fraction', 'a unit fraction']),
                ('3/8 is', 'a proper fraction', ['an improper fraction', 'a mixed number']),
                ('1/9 is', 'a unit fraction', ['an improper fraction', 'a mixed number']),
                ('2 1/3 is', 'a mixed number', ['a proper fraction', 'a unit fraction']),
                ('In 5/9 the numerator is', '5', ['9', '14']),
                ('In 4/7 the denominator is', '7', ['4', '11']),
                ('9/4 is', 'more than 1', ['less than 1', 'equal to 1']),
                ('To simplify a fraction, you', 'divide both numbers', ['subtract from both', 'add to both'])]:
    add(q, r, w)

R.shuffle(items)

# ---------- check every right answer again, a different way ----------
def fr(t): n, d = t.split('/'); return Fraction(int(n), int(d))
for q, o in items:
    right = o[0]
    m = re.match(r'^(\d+)/(\d+) in its simplest form is$', q)
    if m:
        n, d = int(m[1]), int(m[2]); a, b = map(int, right.split('/'))
        assert a * d == b * n and gcd(a, b) == 1, q                          # equal by cross-multiplying, and fully simplified
        for w in o[1:]:
            c, e = map(int, w.split('/')); assert not (c * d == e * n and gcd(c, e) == 1), q
        continue
    if q.startswith('Which is in its simplest form:'):
        a, b = map(int, right.split('/')); assert all(a % p or b % p for p in range(2, a + 1)), q
        for w in o[1:]:
            c, e = map(int, w.split('/')); assert any(c % p == 0 and e % p == 0 for p in range(2, c + 1)), q
        continue
    m = re.match(r'^(\d+)/(\d+) = (\?|\d+)/(\?|\d+)$', q)
    if m:
        full = q.replace('?', right).split(' = '); assert fr(full[0]) == fr(full[1]), q
        for w in o[1:]: assert fr(full[0]) != fr(q.replace('?', w).split(' = ')[1]), q
        continue
    m = re.match(r'^(\d+)/(\d+) of (\d+)$', q)
    if m:
        v = Fraction(int(m[1]), int(m[2])) * int(m[3]); assert v.denominator == 1 and str(v.numerator) == right, q
        continue
    m = re.match(r'^(\d+)/(\d+) of (\d+) is ___ (\d+)$', q)
    if m:
        v = Fraction(int(m[1]), int(m[2])) * int(m[3]); a = int(m[4])
        assert right == ('more than' if v > a else 'less than' if v < a else 'equal to'), q
        continue
    m = re.match(r'^Biggest number that divides both (\d+) and (\d+)$', q)
    if m:
        n, d = int(m[1]), int(m[2]); g = int(right)
        assert n % g == 0 and d % g == 0 and not any(n % k == 0 and d % k == 0 for k in range(g + 1, d + 1)), q
        continue
    m = re.match(r'^(\d+)/(\d+) of a number is (\d+)\. The number is$', q)
    if m:
        assert Fraction(int(m[1]), int(m[2])) * int(right) == int(m[3]), q
        continue
    assert q in ('7/5 is', '3/8 is', '1/9 is', '2 1/3 is', 'In 5/9 the numerator is', 'In 4/7 the denominator is', '9/4 is', 'To simplify a fraction, you'), q
for q, o in items: assert len(o) == 3 and len(set(o)) == 3 and len(q) <= 60, q
print(len(items))
open('tools/lightning_s5.txt', 'w', encoding='utf8').write(',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items))
# put the items into the pack, between the two markers
pack = 'src/js/22-pack-stop5.js'
src = open(pack, encoding='utf8').read()
a, b = '/* LIGHTNING:START */', '/* LIGHTNING:END */'
if a in src and b in src:
    body = ',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items)
    src = src[:src.index(a) + len(a)] + '\n' + body + '\n        ' + src[src.index(b):]
    open(pack, 'w', encoding='utf8').write(src)
