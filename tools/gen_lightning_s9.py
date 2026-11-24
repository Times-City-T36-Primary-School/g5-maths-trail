# makes the Lightning round items of Stop 9 (mode, median, mean and range): [question, [right, wrong, wrong]]
# The right answer is worked out here from the list, then checked again a second way (the statistics module and
# fractions). The wrong answers are real slips: the median without ordering, the largest value as the range, the
# total as the mean, the median or the largest value as the mode. No list is one of the exam's lists.
import random, json, statistics
from fractions import Fraction
from collections import Counter
R = random.Random(909)
EXAM = [sorted([60, 90, 70, 100]), sorted([4, 8, 6, 10, 6, 14])]
def s(x):
    x = Fraction(x)
    if x.denominator == 1: return '{:,}'.format(int(x))
    assert (x * 10).denominator == 1, x
    return '{:,}'.format(int(x)) + '.' + str(int(x * 10) % 10)
def lst(a): return ', '.join(str(x) for x in a)
items = []; seen = set(); checks = []
def add(q, right, wrongs, check=None):
    opts = list(dict.fromkeys([right] + [w for w in wrongs if w != right]))
    if len(opts) < 3 or q in seen or len(q) > 60: return False
    seen.add(q); items.append([q, opts[:3]]); checks.append(check); return True
def median(a):
    b = sorted(a); n = len(b)
    return Fraction(b[n // 2]) if n % 2 else Fraction(b[n // 2 - 1] + b[n // 2], 2)
def rawmid(a):
    n = len(a)
    return Fraction(a[n // 2]) if n % 2 else Fraction(a[n // 2 - 1] + a[n // 2], 2)
def modes(a):
    c = Counter(a); m = max(c.values())
    return sorted(v for v in c if c[v] == m) if m > 1 else []
def ok(a): return sorted(a) not in EXAM and a != sorted(a)
# the mode: one value appears most often
c = 0
while c < 12:
    n = R.choice([5, 6, 7]); a = [R.randint(1, 12) for _ in range(n)]
    md = modes(a)
    if len(md) != 1 or not ok(a): continue
    m = md[0]; f = Counter(a)[m]
    wrongs = [s(median(a)), s(max(a)), s(f), s(min(a))]
    if add(f'Mode of {lst(a)}', s(m), wrongs, ('mode', a)): c += 1
# two modes and no mode
c = 0
while c < 3:
    a = [R.randint(1, 9) for _ in range(6)]
    md = modes(a)
    if len(md) != 2 or len(set(a)) < 3 or not ok(a): continue
    if add(f'Mode of {lst(a)}', f'{md[0]} and {md[1]}', [f'{md[0]} only', 'no mode'], ('modes', a)): c += 1
c = 0
while c < 3:
    a = R.sample(range(1, 13), 5)
    if not ok(a): continue
    if add(f'Mode of {lst(a)}', 'no mode', [s(max(a)), s(median(a))], ('nomode', a)): c += 1
# the median: an odd number of values (the slip: the middle of the list as it is written)
c = 0
while c < 10:
    n = R.choice([5, 5, 7]); a = [R.randint(1, 20) for _ in range(n)]
    md = median(a)
    if rawmid(a) == md or not ok(a) or len(set(a)) < n - 1: continue
    mean = Fraction(sum(a), n)
    wrongs = [s(rawmid(a)), s(max(a)), s(min(a))]
    if add(f'Median of {lst(a)}', s(md), wrongs, ('median', a)): c += 1
# the median: an even number of values (the slips: one of the two middle values)
c = 0
while c < 9:
    n = R.choice([4, 4, 6]); a = [R.randint(1, 20) for _ in range(n)]
    b = sorted(a); lo, hi = b[n // 2 - 1], b[n // 2]
    if lo == hi or not ok(a) or len(set(a)) < n: continue
    if add(f'Median of {lst(a)}', s(median(a)), [s(lo), s(hi)], ('median', a)): c += 1
# the mean (whole, or one decimal place)
c = 0
while c < 12:
    n = R.choice([3, 4, 4, 5]); a = [R.randint(0, 15) for _ in range(n)]
    mean = Fraction(sum(a), n)
    if (mean * 10).denominator != 1 or not ok(a) or len(set(a)) < n - 1: continue
    wrongs = [s(sum(a)), s(median(a)), s(max(a))]
    if c >= 9 and 0 not in a: continue                      # some lists with a 0: the 0 counts
    if 0 in a and (Fraction(sum(a), n - 1) * 10).denominator == 1: wrongs.insert(1, s(Fraction(sum(a), n - 1)))
    if add(f'Mean of {lst(a)}', s(mean), wrongs, ('mean', a)): c += 1
# the range (the slips: the largest value; last − first)
c = 0
while c < 10:
    n = R.choice([4, 5, 5, 6]); a = [R.randint(2, 30) for _ in range(n)]
    r = max(a) - min(a); lf = abs(a[-1] - a[0])
    if not ok(a) or len(set(a)) < n or lf == r: continue
    if add(f'Range of {lst(a)}', s(r), [s(max(a)), s(lf), s(max(a) + min(a))], ('range', a)): c += 1
# from a total to a mean and back
for tot, n in ((24, 4), (35, 5), (42, 6), (27, 3), (18, 4)):
    add(f'Total {tot}, {n} values. The mean is', s(Fraction(tot, n)), [s(tot - n), s(tot)], ('div', tot, n))
for mean, n in ((6, 5), (9, 4), (7, 6), (12, 3)):
    add(f'{n} values have a mean of {mean}. Their total is', s(mean * n), [s(mean + n), s(mean)], ('mul', mean, n))
# the words
for q, o in (
    ('The value that appears most often is the', ['mode', 'median', 'mean']),
    ('The middle value of data in order is the', ['median', 'mode', 'range']),
    ('Total ÷ number of values gives the', ['mean', 'median', 'range']),
    ('Largest value − smallest value gives the', ['range', 'mean', 'mode']),
    ('Data with two modes is', ['bimodal', 'no mode', 'the median']),
    ('Before you find the median, you', ['order the data', 'add the data', 'halve the data']),
    ('Which one is NOT an average?', ['range', 'mode', 'median']),
    ('Which one tells how spread out data is?', ['range', 'mean', 'mode']),
    ('One very large value pulls up the', ['mean', 'median', 'mode']),
    ('Every value appears once. The data has', ['no mode', 'no median', 'no range']),
    ('How many times a value appears is its', ['frequency', 'range', 'total']),
    ('The best average for favourite colours is the', ['mode', 'mean', 'median'])):
    add(q, o[0], o[1:])
order = list(range(len(items))); R.shuffle(order)
items = [items[i] for i in order]; checks = [checks[i] for i in order]
# check every right answer again, a different way
for (q, o), ch in zip(items, checks):
    if not ch: continue
    k = ch[0]; right = o[0]
    if k == 'mode': assert statistics.multimode(ch[1]) == [int(right)], q
    elif k == 'modes': assert sorted(statistics.multimode(ch[1])) == [int(x) for x in right.split(' and ')], q
    elif k == 'nomode': assert len(statistics.multimode(ch[1])) == len(ch[1]), q
    elif k == 'median': assert abs(statistics.median(ch[1]) - float(right)) < 1e-9, q
    elif k == 'mean': assert abs(statistics.fmean(ch[1]) - float(right)) < 1e-9, q
    elif k == 'range': assert sorted(ch[1])[-1] - sorted(ch[1])[0] == int(right), q
    elif k == 'div': assert abs(float(right) * ch[2] - ch[1]) < 1e-9, q
    elif k == 'mul': assert int(right) / ch[2] == ch[1], q
    assert len(set(o)) == 3 and len(q) <= 60, q
print(len(items))
open('tools/lightning_s9.txt', 'w', encoding='utf8').write(',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items))
