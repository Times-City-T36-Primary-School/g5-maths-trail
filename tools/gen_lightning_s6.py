# makes the Lightning round items of Stop 6 (fractions, decimals and percentages): [question, [right, wrong, wrong]]
# python3 tools/gen_lightning_s6.py          -> tools/lightning_s6.txt
# python3 tools/gen_lightning_s6.py --write  -> also puts the items into src/js/22-pack-stop6.js (between the two marks)
# The items are made with whole-number arithmetic (hundredths). At the end every right answer is worked out again
# from the words of the question with fractions.Fraction, and every wrong answer is checked to be really wrong.
import random, json, re, sys
from fractions import Fraction as Fr
R = random.Random(66)
items = []; seen = set()

def dec(h):                      # hundredths -> '0.6', '0.07', '4.5'
    s = '%d.%02d' % (h // 100, h % 100)
    return s.rstrip('0').rstrip('.')
def val(t):                      # '3/5' | '0.45' | '70%' -> Fraction (the second way: straight from the text)
    t = t.replace('$', '').replace(',', '').strip()
    if t.endswith('%'): return Fr(t[:-1]) / 100
    if '/' in t: a, b = t.split('/'); return Fr(int(a), int(b))
    return Fr(t)
def add(q, right, wrongs, kind):
    opts = list(dict.fromkeys([right] + [w for w in wrongs if w != right]))
    if len(opts) < 3: raise SystemExit('too few different answers: ' + q)
    if q in seen: raise SystemExit('twice: ' + q)
    if len(q) > 60: raise SystemExit('too long: ' + q)
    seen.add(q); items.append([q, opts[:3], kind])

# A. a fraction as a percentage. Slips: the two numbers side by side (3/5 -> 35%), the top times 10, the bottom
for n, d in [(1, 2), (1, 4), (3, 4), (1, 5), (2, 5), (4, 5), (3, 10), (9, 10), (7, 20), (3, 25), (1, 10), (1, 20)]:
    h = n * 100 // d
    cand = ['%d%d%%' % (n, d) if n * 10 + d <= 100 and d < 10 else None, '%d%%' % (n * 10), '%d%%' % d, '%d%%' % n, '%d%%' % (h + 10)]
    add('%d/%d as a percentage' % (n, d), '%d%%' % h, [c for c in cand if c and c != '%d%%' % h], 'A')
# B. a decimal as a percentage. Slips: the digits only (0.4 -> 4%), no change (0.4 -> 0.4%)
for h in [40, 7, 30, 90, 25, 5, 8, 60, 45, 1]:
    wrong = ['%d%%' % (h // 10)] if h % 10 == 0 else ['%d%%' % (h * 10)] if h < 10 else ['%s%%' % dec(h * 10)]
    add('%s as a percentage' % dec(h), '%d%%' % h, wrong + ['%s%%' % dec(h)], 'B')
# C. a percentage as a decimal. Slips: one place only, three places
for h in [45, 5, 70, 8, 12, 90, 3, 60]:
    add('%d%% as a decimal' % h, dec(h), [dec(h * 10), '0.' + ('%03d' % h).rstrip('0') if h % 10 else '0.0' + str(h // 10)], 'C')
# D. a percentage as a fraction in its simplest form. Slips: 1 over the percentage, the percentage over 10
for h in [50, 25, 75, 10, 20, 40, 5, 30, 60, 80, 1]:
    f = Fr(h, 100)
    cand = ['1/%d' % h, '%d/10' % h, '%d/100' % (h // 10) if h % 10 == 0 else None, '%d/50' % h]
    add('%d%% as a fraction' % h, '%d/%d' % (f.numerator, f.denominator), [c for c in cand if c and val(c) != f], 'D')
# E. a percentage of a number. Slips: 10% of it, the number divided by the percentage, what is left, half
for p, n in [(10, 50), (10, 120), (50, 90), (50, 18), (25, 40), (25, 200), (75, 20), (20, 50), (20, 30), (5, 40), (5, 200), (1, 300), (1, 700), (30, 50), (15, 20), (40, 25), (100, 37)]:
    a = n * p // 100
    assert n * p % 100 == 0
    cand = [n // 10 if n % 10 == 0 else None, n // p if n % p == 0 else None, n - a, a * 2, n // 2 if n % 2 == 0 else None, a + 10, p]
    cand = [c for c in cand if c and c != a and c > 0]
    add('%d%% of %s' % (p, '{:,}'.format(n)), '{:,}'.format(a), ['{:,}'.format(c) for c in cand], 'E')
# F. which is greater?
for a, b in [('0.4', '35%'), ('1/2', '45%'), ('3/10', '0.25'), ('3/4', '70%'), ('1/5', '0.25'), ('0.09', '10%'), ('9/10', '0.85'), ('2/5', '0.5'), ('1/4', '0.3'), ('0.6', '55%'), ('1/4', '25%'), ('0.8', '4/5')]:
    def hun(t):
        if t.endswith('%'): return int(t[:-1])
        if '/' in t: x, y = t.split('/'); assert int(x) * 100 % int(y) == 0; return int(x) * 100 // int(y)
        w, _, f = t.partition('.'); return int(w) * 100 + int((f + '00')[:2])
    ha, hb = hun(a), hun(b)
    right = 'They are equal' if ha == hb else a if ha > hb else b
    add('Which is greater: %s or %s?' % (a, b), right, [x for x in (a, b, 'They are equal') if x != right], 'F')
# G. so many out of so many, as a percentage
for n, t in [(7, 10), (3, 4), (1, 5), (9, 20), (12, 50), (4, 25)]:
    h = n * 100 // t
    cand = ['%d%%' % n, '%d%%' % t, '%d%%' % (n * 10) if n * 10 <= 100 else None, '%d%%' % (100 - h)]
    add('%d out of %d as a percentage' % (n, t), '%d%%' % h, [c for c in cand if c and c != '%d%%' % h], 'G')
# H. the part that is not shaded
for p in [30, 45, 85, 12, 60]:
    add('%d%% of a shape is shaded. Not shaded:' % p, '%d%%' % (100 - p), ['%d%%' % p, '%d%%' % (100 - p + 10) if p % 10 else '%d%%' % (90 - p)], 'H')
# I. a discount. Slips: the discount itself, the price take away the number
for p, n in [(10, 40), (20, 50), (10, 90), (25, 60), (20, 30), (25, 40)]:
    a = n * p // 100
    assert n * p % 100 == 0 and n - p != n - a and n - p > 0
    add('%d%% off $%d. New price:' % (p, n), '$%d' % (n - a), ['$%d' % a, '$%d' % (n - p)], 'I')

# ---- every right answer again, a second way: from the words of the question, with fractions ----
for q, o, kind in items:
    r = o[0]
    if kind in 'AB': want = val(q.split(' as ')[0]); ok = val(r) == want and r.endswith('%'); bad = [val(w) == want for w in o[1:]]
    elif kind == 'C': want = val(q.split(' as ')[0]); ok = val(r) == want and '.' in r; bad = [val(w) == want for w in o[1:]]
    elif kind == 'D':
        want = val(q.split(' as ')[0]); f = val(r); ok = f == want and r == '%d/%d' % (want.numerator, want.denominator); bad = [val(w) == want for w in o[1:]]
    elif kind == 'E':
        m = re.match(r'(\d+)% of ([\d,]+)$', q); want = Fr(int(m.group(1)), 100) * int(m.group(2).replace(',', '')); ok = val(r) == want; bad = [val(w) == want for w in o[1:]]
    elif kind == 'F':
        m = re.match(r'Which is greater: (\S+) or (\S+)\?$', q); a, b = m.group(1), m.group(2)
        want = 'They are equal' if val(a) == val(b) else a if val(a) > val(b) else b; ok = r == want; bad = [w == want for w in o[1:]]
    elif kind == 'G':
        m = re.match(r'(\d+) out of (\d+) ', q); want = Fr(int(m.group(1)), int(m.group(2))); ok = val(r) == want; bad = [val(w) == want for w in o[1:]]
    elif kind == 'H':
        m = re.match(r'(\d+)%', q); want = 1 - Fr(int(m.group(1)), 100); ok = val(r) == want; bad = [val(w) == want for w in o[1:]]
    else:
        m = re.match(r'(\d+)% off \$(\d+)', q); n = int(m.group(2)); want = n * (1 - Fr(int(m.group(1)), 100)); ok = val(r) == want; bad = [val(w) == want for w in o[1:]]
    assert ok, ('wrong right answer', q, o)
    assert not any(bad), ('a wrong answer is right', q, o)
    assert len(set(o)) == 3, q

R.shuffle(items)
lines = ',\n'.join('        ' + json.dumps([q, o], ensure_ascii=False) for q, o, k in items)
open('tools/lightning_s6.txt', 'w', encoding='utf8').write(lines + '\n')
print(len(items), 'items')
if '--write' in sys.argv:
    path = 'src/js/22-pack-stop6.js'; src = open(path, encoding='utf8').read()
    a, b = '/*LIGHTNING-START*/\n', '        /*LIGHTNING-END*/'
    i, j = src.index(a) + len(a), src.index(b)
    open(path, 'w', encoding='utf8').write(src[:i] + lines + '\n' + src[j:])
    print('written into', path)
