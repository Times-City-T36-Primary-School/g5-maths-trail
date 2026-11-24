# makes the Lightning round items of Stop 3 (sequences and term rules): [question, [right, wrong, wrong]]
# Every right answer is worked out with exact fractions, then checked again a second way (see the end).
# The wrong answers are real slips: a wrong sign, one step too many, adding instead of multiplying, 2 x n for n x n ...
# Number sets of the EOS1 papers are kept out (BAN).
import random, json, re
from fractions import Fraction as Fr
from decimal import Decimal as Dc
R = random.Random(303)
MINUS = '−'

def s(x):
    """a whole number or a decimal as text: -0.5 -> '−0.5', 1200 -> '1,200'"""
    x = Fr(x)
    neg = x < 0; x = abs(x)
    d = Dc(x.numerator) / Dc(x.denominator)
    t = format(d.normalize(), 'f')
    w, _, f = t.partition('.')
    return (MINUS if neg else '') + '{:,}'.format(int(w)) + ('.' + f if f else '')

def ordn(n):
    return str(n) + ('th' if 11 <= n % 100 <= 13 else {1: 'st', 2: 'nd', 3: 'rd'}.get(n % 10, 'th'))

items = []; seen = set(); checks = []
def add(q, right, wrongs, check=None):
    opts = list(dict.fromkeys([right] + [w for w in wrongs if w != right]))
    if len(opts) < 3 or q in seen or len(q) > 60: return False
    seen.add(q); items.append([q, opts[:3]]); checks.append(check); return True

# sequences that must not appear (the real papers)
def banned(a, d):
    return (a, d) in {(Fr(6), Fr(6)), (Fr(5), Fr(6)), (Fr(4), Fr(4)), (Fr('4.6'), Fr('-0.8'))}

# 1. count on and back in decimals: the next term
c = 0
while c < 10:
    d = Fr(R.choice(['0.2', '0.3', '0.4', '0.6', '0.7', '0.9', '1.5', '0.25', '0.05'])) * R.choice([1, -1])
    a = Fr(R.randint(1, 60), 10)
    t = [a + i * d for i in range(4)]
    if banned(a, d) or min(t) <= 0: continue
    step_slip = t[3] + (Fr(1, 10) if d > 0 else Fr(-1, 10))
    if add('Next term: ' + ', '.join(s(x) for x in t[:3]) + ', ...', s(t[3]), [s(t[3] + d), s(step_slip)], ('lin', t[:3], t[3])): c += 1

# 2. count back through zero
c = 0
while c < 9:
    whole = R.random() < .6
    d = -Fr(R.randint(2, 6)) if whole else -Fr(R.choice(['0.2', '0.3', '0.4', '0.5']))
    k = R.randint(1, 2)                      # how many terms are still above zero
    a = -d * k + (Fr(R.randint(1, int(-d) - 1)) if whole else Fr(1, 10))
    t = [a + i * d for i in range(4)]
    if not (t[2] > 0 or t[1] > 0) or t[3] >= 0: continue
    if add('Next term: ' + ', '.join(s(x) for x in t[:3]) + ', ...', s(t[3]), [s(-t[3]), s(t[3] + d)], ('lin', t[:3], t[3])): c += 1

# 3. fractions with the same denominator
c = 0
while c < 6:
    den = R.choice([5, 7, 8, 9, 10]); st = R.randint(2, 3); a = R.randint(1, 2)
    tops = [a + i * st for i in range(4)]
    if tops[3] % den == 0: continue
    f = lambda n, dd=den: f'{n}/{dd}'
    if add('Next term: ' + ', '.join(f(x) for x in tops[:3]) + ', ...', f(tops[3]), [f(tops[3], 2 * den), f(tops[3] + 1)], ('frac', tops, den)): c += 1

# 4. the step (term-to-term rule)
c = 0
while c < 7:
    d = Fr(R.choice(['0.3', '0.4', '0.6', '0.7', '0.9', '1.2'])) * R.choice([1, -1]); a = Fr(R.randint(20, 70), 10)
    t = [a + i * d for i in range(3)]
    if banned(a, d): continue
    w = 'add ' if d > 0 else 'subtract '; wo = 'subtract ' if d > 0 else 'add '
    if add('Rule for ' + ', '.join(s(x) for x in t) + ', ... ?', w + s(abs(d)), [wo + s(abs(d)), w + s(abs(d) * 10)], ('step', t, d)): c += 1

# 5. position-to-term: multiples
c = 0
while c < 8:
    k = R.choice([3, 5, 7, 8, 9, 11, 12]); n = R.randint(8, 20)
    if add(f'Rule: multiply the position by {k}. The {ordn(n)} term is', s(k * n), [s(k + n), s(k * (n - 1))], ('rule', k, 0, n)): c += 1

# 6. position-to-term: k x n + c and k x n - c
c = 0
while c < 9:
    k = R.choice([2, 3, 4, 5, 6, 7, 9]); cc = R.randint(1, k - 1) * R.choice([1, -1]); n = R.choice([10, 11, 12, 20])
    if k == 6 and cc == -1: continue
    txt = f'Position × {k}, then ' + (f'add {cc}' if cc > 0 else f'subtract {-cc}') + f'. The {ordn(n)} term is'
    if add(txt, s(k * n + cc), [s(k * n), s(k * n - cc)], ('rule', k, cc, n)): c += 1

# 7. which position?
c = 0
while c < 6:
    k = R.choice([3, 5, 7, 8, 9]); m = R.randint(6, 12)
    if add(f'{k}, {2 * k}, {3 * k}, {4 * k}, ... {k * m} is in position', str(m), [str(m + 1), str(m - 1)], ('pos', k, m)): c += 1

# 8. which number is a term?
c = 0
while c < 7:
    k = R.choice([3, 4, 5, 7, 8]); cc = R.randint(1, k - 1)
    if k == 4 and cc == 0: continue
    t = [k * i + cc for i in range(1, 5)]; m = R.randint(7, 12)
    good = k * m + cc; bad1 = k * m; bad2 = good + R.choice([1, -1]) * R.randint(1, k - 1)
    if bad2 == bad1 or (bad2 - cc) % k == 0: continue
    if add('Which is a term of ' + ', '.join(map(str, t)) + ', ...?', str(good), [str(bad1), str(bad2)], ('isin', k, cc, good, bad1, bad2)): c += 1

# 9. square numbers
for n in R.sample(range(5, 13), 7):
    add(f'The {ordn(n)} square number is', s(n * n), [s(2 * n), s(n * (n - 1))], ('sq', 0, 0, n))
c = 0
while c < 6:
    cc = R.choice([1, 2, 3, -1]); n = R.randint(6, 10)
    t = [i * i + cc for i in range(1, 5)]
    if n * n + cc in (64, 65): continue
    if (cc, n) == (3, 8): n = 9               # 4, 7, 12, 19 ...: ask for the 9th term (84), not the 8th
    if add(', '.join(map(str, t)) + f', ... The {ordn(n)} term is', s(n * n + cc), [s(n * n), s((n - 1) * (n - 1) + cc)], ('sq', 0, cc, n)): c += 1
# no sequence that starts 9, 16, 25 (a run of the exam's 4, 9, 16, 25)
for sft, n in ((3, 10), (3, 6), (3, 8)):
    t = [(i + sft) ** 2 for i in range(1, 5)]
    add(', '.join(map(str, t)) + f', ... The {ordn(n)} term is', s((n + sft) ** 2), [s(n * n), s((n + sft - 1) ** 2)], ('sq', sft, 0, n))
for cc, n in ((1, 7),):                      # 2, 5, 10, 17 ... the 7th term
    t = [i * i + cc for i in range(1, 5)]
    add(', '.join(map(str, t)) + f', ... The {ordn(n)} term is', s(n * n + cc), [s(n * n), s((n - 1) * (n - 1) + cc)], ('sq', 0, cc, n))

# 10. words
add('In 5, 8, 11, 14, ... the term in position 3 is', '11', ['8', '3'])
add('In 2, 9, 16, 23, ... the 4th term is', '23', ['16', '4'])
add('"Add 6 each time" is a', 'term-to-term rule', ['position-to-term rule', 'square number'])
add('"Multiply the position by 6" is a', 'position-to-term rule', ['term-to-term rule', 'negative number'])
add('Adding 4 five times is the same as', '5 × 4', ['5 + 4', '4 × 4'])

order = list(range(len(items))); R.shuffle(order)
items = [items[i] for i in order]; checks = [checks[i] for i in order]

# ---- check every right answer again, a different way ----
def num(txt): return Dc(txt.replace(',', '').replace(MINUS, '-'))
for (q, o), ch in zip(items, checks):
    assert len(set(o)) == 3 and len(q) <= 60, q
    if not ch: continue
    kind = ch[0]
    if kind == 'lin':                       # decimals: the gap to the answer equals the gap between the terms shown
        t = [Dc(str(float(x))) for x in ch[1]]
        assert num(o[0]) - t[2] == t[2] - t[1] == t[1] - t[0], q
        assert all(num(w) != num(o[0]) for w in o[1:]), q
    elif kind == 'frac':
        tops, den = ch[1], ch[2]; n, dd = map(int, o[0].split('/'))
        assert dd == den and n - tops[2] == tops[2] - tops[1], q
        assert all(Fr(*map(int, w.split('/'))) != Fr(n, dd) for w in o[1:]), q
    elif kind == 'step':
        t, d = ch[1], ch[2]; word, val = o[0].split(' ')
        signed = Dc(val) if word == 'add' else -Dc(val)
        assert all(Dc(str(float(t[i]))) + signed == Dc(str(float(t[i + 1]))) for i in range(2)), q
    elif kind == 'rule':                    # repeated addition instead of multiplication
        k, cc, n = ch[1:]; term = k + cc
        for _ in range(n - 1): term += k
        assert int(num(o[0])) == term, q
        assert all(int(num(w)) != term for w in o[1:]), q
    elif kind == 'pos':
        k, m = ch[1:]; assert int(o[0]) * k == k * m and str(k * m) in q, q
    elif kind == 'isin':
        k, cc, good, b1, b2 = ch[1:]
        terms = set(range(k + cc, 400, k))
        assert good in terms and b1 not in terms and b2 not in terms, q
    elif kind == 'sq':
        sft, cc, n = ch[1:]
        total = sum(n + sft for _ in range(n + sft)) + cc     # n lots of n, by adding
        assert int(num(o[0])) == total, q
        assert all(int(num(w)) != total for w in o[1:]), q
assert not any(re.search(r'4, 9, 16, 25|9, 16, 25', q) for q, o in items)
print(len(items), 'items')
open('tools/lightning_s3.txt', 'w', encoding='utf8').write(',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items))
