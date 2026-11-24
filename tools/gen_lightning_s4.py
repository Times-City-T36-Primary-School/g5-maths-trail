# makes the Lightning round items of Stop 4 (common multiples and common factors): [question, [right, wrong, wrong]]
# Every right answer is worked out one way (math.gcd, a formula) and checked again another way (lists, brute force);
# every wrong answer is a real slip (the product, a common multiple that is not the lowest, the other number's
# factor, a factor instead of a multiple) and is checked to be wrong.
# Run from the project folder: python3 tools/gen_lightning_s4.py   -> tools/lightning_s4.txt, and the lines between
# "// lightning:begin" and "// lightning:end" in src/js/22-pack-stop4.js
import random, json, math, re
R = random.Random(64)
BAN = {(4, 6), (42, 56), (12, 18), (6, 8)}     # pairs of the real test (also 12/18 and 6/8, its fractions): never asked as a pair
def facts(n): return [d for d in range(1, n + 1) if n % d == 0]
def lcm(a, b): return a * b // math.gcd(a, b)
def lcm2(a, b):                                # the second way: count on in the bigger number
    v = max(a, b)
    while v % a or v % b: v += max(a, b)
    return v
def hcf2(a, b): return max(set(facts(a)) & set(facts(b)))   # the second way: the biggest number in both lists
items = []; seen = set()
def add(q, right, wrongs, ok):
    """ok(x) -> is x a right answer? It must be true for `right` and false for every wrong answer."""
    opts = [str(right)] + [str(w) for w in wrongs]
    assert len(q) <= 60, q
    assert len(set(opts)) == 3, (q, opts)
    assert q not in seen, q
    assert ok(right), (q, right)
    for w in wrongs: assert not ok(w), (q, w)
    seen.add(q); items.append([q, opts])
def pair_ok(a, b): assert (min(a, b), max(a, b)) not in BAN and a != b

# 1. the lowest common multiple
for a, b in [(2, 7), (3, 5), (4, 10), (9, 15), (6, 9), (8, 12), (9, 12), (10, 15), (6, 10), (8, 10), (5, 8), (12, 20), (5, 10), (3, 12)]:
    pair_ok(a, b)
    L, g = lcm(a, b), math.gcd(a, b)
    assert L == lcm2(a, b)
    w1 = a * b if a * b != L else 2 * L        # a common multiple, but not the lowest
    w2 = g if g > 1 else a + b                 # the highest common factor, or the sum
    add(f'Lowest common multiple of {a} and {b}', L, [w1, w2], lambda x, a=a, b=b: x == lcm2(a, b))
# 2. the highest common factor
for a, b in [(8, 12), (12, 16), (10, 25), (16, 24), (18, 27), (20, 30), (14, 35), (24, 36), (15, 40), (28, 35), (32, 48), (9, 30), (12, 30), (18, 45)]:
    pair_ok(a, b)
    g = math.gcd(a, b)
    assert g == hcf2(a, b)
    common = sorted(set(facts(a)) & set(facts(b)))
    w1 = common[-2]                            # a common factor, but not the highest
    only = [f for f in facts(min(a, b)) if f not in common]
    w2 = only[-1]                              # a factor of one number only
    add(f'Highest common factor of {a} and {b}', g, [w1, w2], lambda x, a=a, b=b: x == hcf2(a, b))
# 3. which number is a common multiple?
for a, b, k in [(2, 3, 3), (3, 4, 2), (2, 5, 4), (4, 5, 2), (3, 7, 1), (8, 12, 2), (4, 10, 3), (5, 6, 2), (3, 8, 1), (6, 9, 2)]:
    pair_ok(a, b)
    L = lcm(a, b); right = k * L
    ma = next(v for v in range(right - a, 0, -a) if v % b)      # a multiple of a only, just below
    mb = next(v for v in range(right + b, right + 9 * b, b) if v % a)   # a multiple of b only, just above
    add(f'Which is a common multiple of {a} and {b}?', right, [ma, mb], lambda x, a=a, b=b: x % a == 0 and x % b == 0)
# 4. which number is a common factor?
for a, b in [(12, 20), (20, 30), (16, 24), (18, 30), (24, 32), (27, 36), (20, 28), (30, 45), (12, 32), (40, 60)]:
    pair_ok(a, b)
    common = sorted(set(facts(a)) & set(facts(b)))
    right = R.choice([c for c in common if c > 1])
    oa = [f for f in facts(a) if f not in common]; ob = [f for f in facts(b) if f not in common]
    add(f'Which is a common factor of {a} and {b}?', right, [R.choice(oa), R.choice(ob)], lambda x, a=a, b=b: a % x == 0 and b % x == 0)
# 5. factor or multiple?
for x, y in [(8, 40), (7, 28), (9, 54), (6, 30), (4, 36), (45, 9), (32, 8), (60, 12), (21, 7), (48, 6), (8, 30), (25, 10)]:
    word = 'factor' if y % x == 0 else 'multiple' if x % y == 0 else 'neither'
    rel = lambda w, x=x, y=y: w == ('factor' if x * (y // x) == y else 'multiple' if y * (x // y) == x else 'neither')
    add(f'Is {x} a factor or a multiple of {y}?', word, [w for w in ('factor', 'multiple', 'neither') if w != word], rel)
# 6. the n-th multiple
ORD = {3: '3rd', 4: '4th', 5: '5th', 6: '6th', 7: '7th', 8: '8th'}
for k, n in [(13, 3), (25, 3), (7, 6), (6, 7), (12, 3), (20, 4), (15, 4)]:
    add(f'The {ORD[n]} multiple of {k} is', n * k, [(n - 1) * k, (n + 1) * k], lambda x, k=k, n=n: x == sum([k] * n))
# 7. how many factors?
for n in [9, 12, 16, 18, 20, 25, 28, 30]:
    c = len(facts(n))
    add(f'How many factors does {n} have?', c, [c - 1, c - 2] if c > 3 else [c - 1, c + 1], lambda x, n=n: x == sum(1 for d in range(1, n + 1) if n % d == 0))
# 8. which number is NOT a factor?
for n, bad in [(24, 9), (30, 4), (36, 8), (40, 6), (18, 4), (28, 6), (32, 6), (45, 6)]:
    fs = [f for f in facts(n) if 1 < f < n]
    assert n % bad != 0
    add(f'Which is NOT a factor of {n}?', bad, R.sample(fs, 2), lambda x, n=n: n % x != 0)
# 9. the missing factor in a list
for n in [18, 20, 28, 32, 45, 50, 44, 27]:
    fs = facts(n); i = R.randrange(1, len(fs) - 1); miss = fs[i]
    shown = ', '.join('?' if j == i else str(f) for j, f in enumerate(fs))
    near = [v for v in range(fs[i - 1] + 1, fs[i + 1]) if n % v]      # numbers in the gap that are not factors
    if len(near) < 2: near += [v for v in (miss + 1, miss - 1, miss + 2, miss + 3, miss + 4) if v > 1 and n % v and v not in near]
    add(f'Factors of {n}: {shown}', miss, near[:2], lambda x, n=n, fs=fs, i=i: n % x == 0 and fs[i - 1] < x < fs[i + 1])
# 10. the words of the stop (written out; each one is checked below by a small test of its own)
add('A number in two times tables is a common ...', 'multiple', ['factor', 'product'], lambda w: w == 'multiple')
add('The smallest factor of every whole number (not 0) is', 1, [0, 2], lambda x: x != 0 and all(n % x == 0 for n in range(1, 200)))
add('The biggest factor of 36 is', 36, [18, 6], lambda x: x == max(facts(36)))
add('The first multiple of 9 is', 9, [18, 1], lambda x: x == 9 * 1)
add('5 × 8 = 40. So 40 is the ___ of 5 and 8', 'product', ['sum', 'factor'], lambda w: w == 'product' and 5 * 8 == 40 and 5 + 8 != 40)
add('Which is a factor pair of 20?', '4 and 5', ['4 and 6', '2 and 20'], lambda s: math.prod(int(v) for v in s.split(' and ')) == 20)
add('12 is divisible by', 4, [5, 8], lambda x: 12 % x == 0)
add('35 is divisible by', 7, [6, 15], lambda x: 35 % x == 0)
add('Which is a factor pair of 36?', '4 and 9', ['4 and 8', '3 and 9'], lambda s: math.prod(int(v) for v in s.split(' and ')) == 36)
add('1 is a common factor of', 'every pair of whole numbers', ['odd numbers only', 'no numbers'], lambda w: w == 'every pair of whole numbers' and all(a % 1 == 0 for a in range(1, 100)))

R.shuffle(items)
# no item uses the pairs of the real test
for q, o in items:
    nums = tuple(sorted(int(v) for v in re.findall(r'\d+', q.split(':')[0])[:2])) if ' and ' in q else ()
    assert nums not in BAN, q
print(len(items), 'items')
lines = ',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items)
open('tools/lightning_s4.txt', 'w', encoding='utf8').write(lines + '\n')
pack = 'src/js/22-pack-stop4.js'
s = open(pack, encoding='utf8').read()
a, b = s.index('// lightning:begin'), s.index('// lightning:end')
s = s[:a] + '// lightning:begin\n' + lines + '\n        ' + s[b:]
open(pack, 'w', encoding='utf8').write(s)
