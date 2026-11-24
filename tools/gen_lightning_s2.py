# makes the Lightning round items of Stop 2 (round, add and subtract decimals): [question, [right, wrong, wrong]]
# run from the project folder: python3 tools/gen_lightning_s2.py  -> tools/lightning_s2.txt (pasted into 22-pack-stop2.js)
# Every right answer is worked out with Decimal and checked again with whole numbers (hundredths). The wrong answers
# are the real slips: rounding the wrong way at 5, rounding the wrong place, lining up the last digits, no exchange.
import random, json
from decimal import Decimal as Dc, ROUND_HALF_UP, ROUND_FLOOR
R = random.Random(62)

def s(x, dp=None):
    x = Dc(str(x))
    t = format(x.quantize(Dc(1).scaleb(-dp)) if dp is not None else x.normalize(), 'f')
    w, _, f = t.partition('.')
    return '{:,}'.format(int(w)) + ('.' + f if f else '')

items = []; seen = set(); keys = []   # keys: (kind, data) for the second check
def add(q, right, wrongs, key):
    opts = list(dict.fromkeys([right] + [w for w in wrongs if w != right]))
    if len(opts) < 3 or q in seen or len(q) > 60: return False
    seen.add(q); items.append([q, opts[:3]]); keys.append(key); return True

def rnd(x, unit):            # halfway rounds up
    return (Dc(x) / unit).quantize(Dc(1), rounding=ROUND_HALF_UP) * unit
def floor(x, unit):
    return (Dc(x) / unit).quantize(Dc(1), rounding=ROUND_FLOOR) * unit
TEN, ONE = Dc('0.1'), Dc(1)

EXAM = {Dc('6.38'), Dc('7.62'), Dc('6.75'), Dc('7.81')}       # numbers of the real test: not used here
def two_dp():                # a number with 2 decimal places, last digit not 0
    while True:
        n = Dc(R.randint(1, 19)) + Dc(R.randint(0, 9)) / 10 + Dc(R.randint(1, 9)) / 100
        if n not in EXAM: return n

# 1. round to the nearest tenth (some exactly halfway)
c = 0
while c < 12:
    n = two_dp()
    if c < 4: n = floor(n, TEN) + Dc('0.05')
    a = rnd(n, TEN); lo = floor(n, TEN); other = lo if a != lo else lo + TEN
    if add(f'{s(n)} to the nearest tenth', s(a, 1), [s(other, 1), s(rnd(n, ONE))], ('round', str(n), 1)): c += 1
# 2. round to the nearest whole number (some with 5 tenths)
c = 0
while c < 12:
    n = two_dp()
    if c < 4: n = floor(n, ONE) + Dc('0.5') + Dc(R.randint(0, 4)) / 100
    a = rnd(n, ONE); lo = floor(n, ONE); other = lo if a != lo else lo + ONE
    if add(f'{s(n)} to the nearest whole number', s(a), [s(other), s(rnd(n, TEN), 1)], ('round', str(n), 0)): c += 1
# 3. halfway numbers
c = 0
while c < 5:
    lo = Dc(R.randint(1, 9)) + Dc(R.randint(0, 8)) / 10
    if add(f'Halfway between {s(lo, 1)} and {s(lo + TEN, 1)}', s(lo + Dc("0.05"), 2), [s(lo + TEN, 1), s(lo + Dc("0.5"), 1)], ('half', str(lo), 1)): c += 1
# 4. the smallest and the largest number with 2 decimal places that rounds to a tenth (the smallest number of all
#    that rounds to 6.8 is 6.75, with any number of decimal places; the largest needs "2 decimal places"). One wording
#    for both: the target has 1 decimal place, so it is rounded to the nearest tenth
c = 0
while c < 4:
    t = Dc(R.randint(1, 9)) + Dc(R.randint(1, 8)) / 10
    if t in (Dc('6.9'), Dc('6.8')): continue                                       # the number of the real test
    if add(f'Smallest 2-decimal-place number that rounds to {s(t, 1)}?', s(t - Dc("0.05"), 2), [s(t - Dc("0.04"), 2), s(t - Dc("0.06"), 2)], ('min', str(t), 1)): c += 1
c = 0
while c < 4:
    t = Dc(R.randint(1, 9)) + Dc(R.randint(1, 8)) / 10
    if add(f'Largest 2-decimal-place number that rounds to {s(t, 1)}?', s(t + Dc("0.04"), 2), [s(t + Dc("0.05"), 2), s(t + Dc("0.09"), 2)], ('max', str(t), 1)): c += 1
# 5. estimate with whole numbers
c = 0
while c < 8:
    a = Dc(R.randint(3, 9)) + Dc(R.randint(1, 9)) / 10; b = Dc(R.randint(1, 4)) + Dc(R.randint(1, 9)) / 10 + Dc(R.randint(1, 9)) / 100
    op = R.choice('+−')
    ra, rb = rnd(a, ONE), rnd(b, ONE)
    if ra == floor(a, ONE) and rb == floor(b, ONE): continue          # one number at least must round up
    if op == '−' and ra - rb < 1: continue
    est = ra + rb if op == '+' else ra - rb
    cut = floor(a, ONE) + floor(b, ONE) if op == '+' else floor(a, ONE) - floor(b, ONE)   # the slip: cut off the decimals
    w2 = est + 1 if cut != est + 1 else est - 1
    if add(f'Estimate: {s(a)} {op} {s(b)} is about', s(est), [s(cut), s(w2)], ('est', str(a), str(b), op)): c += 1
# 6. add: different numbers of decimal places. Slips: the last digits lined up; no carry (or one whole out)
def digits_slip(a, b, sub):   # the last digits lined up, not the decimal points: 3.4 + 2.15 -> 34 + 215 = 249 -> 2.49
    ia = int(str(a).replace('.', '')); ib = int(str(b).replace('.', ''))
    return Dc(abs(ia - ib) if sub else ia + ib) / 100
c = 0
while c < 12:
    a = Dc(R.randint(1, 8)) + Dc(R.randint(1, 9)) / 10; b = Dc(R.randint(1, 8)) + Dc(R.randint(0, 9)) / 10 + Dc(R.randint(1, 9)) / 100
    if R.random() < .5: a, b = b, a
    right = a + b
    carry = (a * 10 % 10 + floor(b, TEN) * 10 % 10) >= 10 if a == floor(a, TEN) else (b * 10 % 10 + floor(a, TEN) * 10 % 10) >= 10
    w2 = right - 1 if carry else right + Dc('0.1')
    if add(f'{s(a)} + {s(b)}', s(right), [s(digits_slip(a, b, False)), s(w2)], ('sum', str(a), str(b), '+')): c += 1
# 7. subtract: a tenths number take away a hundredths number. Slips: the extra digit brought down; the last digits lined up
c = 0
while c < 12:
    a = Dc(R.randint(4, 9)) + Dc(R.randint(1, 9)) / 10; b = Dc(R.randint(1, 3)) + Dc(R.randint(0, 9)) / 10 + Dc(R.randint(1, 9)) / 100
    if c >= 9: a = Dc(R.randint(4, 9))                                # a whole number take away a decimal
    right = a - b
    down = (a - floor(b, TEN)) + (b - floor(b, TEN)) if a >= floor(b, TEN) else None      # 5.3 − 2.47 -> 2.9 and the 7: 2.97
    w1 = down if down is not None and a != floor(a, ONE) else right + 1                    # whole number: forgot to take 1 from the ones
    if add(f'{s(a)} − {s(b)}', s(right), [s(w1), s(digits_slip(a, b, True)) if a != floor(a, ONE) else s(a - floor(b, ONE) + (b - floor(b, ONE)))], ('sum', str(a), str(b), '−')): c += 1
# 8. which number rounds to ...?
c = 0
while c < 6:
    t = Dc(R.randint(1, 9)) + Dc(R.randint(1, 8)) / 10
    good = t + Dc(R.choice(['-0.05', '-0.04', '-0.02', '0.03', '0.04']))
    if add(f'Which number rounds to {s(t, 1)} (nearest tenth)?', s(good, 2), [s(t + Dc("0.05"), 2), s(t - Dc("0.06"), 2)], ('which', str(good), str(t))): c += 1

R.shuffle(order := list(range(len(items))))
items = [items[i] for i in order]; keys = [keys[i] for i in order]

# ---- check every right answer again, a different way: whole numbers of hundredths ----
H = lambda x: int((Dc(str(x).replace(',', '')) * 100).to_integral_exact())
def rnd_h(h, unit):          # h hundredths to the nearest unit (10 = tenth, 100 = whole); halfway up
    return (h + unit // 2) // unit * unit
for (q, o), k in zip(items, keys):
    right = H(o[0])
    if k[0] == 'round': want = rnd_h(H(k[1]), 10 if k[2] == 1 else 100)
    elif k[0] == 'half': want = (H(k[1]) + H(k[1]) + 10) // 2
    elif k[0] == 'min': want = min(h for h in range(H(k[1]) - 20, H(k[1]) + 20) if rnd_h(h, 10) == H(k[1]))
    elif k[0] == 'max': want = max(h for h in range(H(k[1]) - 20, H(k[1]) + 20) if rnd_h(h, 10) == H(k[1]))
    elif k[0] == 'est': want = rnd_h(H(k[1]), 100) + rnd_h(H(k[2]), 100) if k[3] == '+' else rnd_h(H(k[1]), 100) - rnd_h(H(k[2]), 100)
    elif k[0] == 'sum': want = H(k[1]) + H(k[2]) if k[3] == '+' else H(k[1]) - H(k[2])
    elif k[0] == 'which':
        want = right; assert rnd_h(right, 10) == H(k[2]), q
        assert all(rnd_h(H(w), 10) != H(k[2]) for w in o[1:]), q      # the wrong numbers must not round to it
    assert right == want, (q, o, want)
    assert all(H(w) != right for w in o[1:]), (q, o)                  # no wrong answer is worth the same as the right one
    assert len(set(o)) == 3 and len(q) <= 60, q
print(len(items), 'items, all checked twice')
open('tools/lightning_s2.txt', 'w', encoding='utf8').write(',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items) + '\n')
