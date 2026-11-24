# makes the Lightning round items of Stop 1 (decimal place value): [question, [right, wrong, wrong]]
import random, json
from decimal import Decimal as Dc
R = random.Random(51)
def s(x):
    t = format(Dc(str(x)).normalize(), 'f')
    w, _, f = t.partition('.')
    w = '{:,}'.format(int(w))
    return w + ('.' + f if f else '')
items = []; seen = set()
def add(q, right, wrongs):
    opts = [right] + [w for w in wrongs if w != right]
    opts = list(dict.fromkeys(opts))
    if len(opts) < 3 or q in seen: return False
    seen.add(q); items.append([q, opts[:3]]); return True
def mul(n, by): return Dc(str(n)) * by
def div(n, by): return Dc(str(n)) / by
pool = ['0.6','0.9','1.4','2.7','3.05','4.18','0.52','0.07','6.3','12.5','0.385','7.02','9.1','0.46','5.008','23.4','0.3','8.75']
# x 10, x 100, x 1000
for by, k in ((10, 8), (100, 8), (1000, 6)):
    c = 0
    while c < k:
        n = R.choice(pool)
        if len(n.split('.')[1]) > 2 and by == 10 and R.random() < .5: continue
        a = mul(n, by)
        others = [b for b in (10, 100, 1000) if b != by]
        if add(f'{n} × {by:,}', s(a), [s(mul(n, others[0])), s(mul(n, others[1]))]): c += 1
wpool = ['47','8','360','5.2','91','204','0.6','73.5','6','150','29','3.8','512','0.9','64']
for by, k in ((10, 8), (100, 8), (1000, 6)):
    c = 0
    while c < k:
        n = R.choice(wpool)
        a = div(n, by)
        if -a.as_tuple().exponent > 3: continue
        others = [b for b in (10, 100, 1000) if b != by]
        w = [div(n, o) for o in others]
        w = [x for x in w if -x.as_tuple().exponent <= 4]
        if len(w) < 2: w.append(mul(n, by))
        if add(f'{n} ÷ {by:,}', s(a), [s(x) for x in w]): c += 1
# the value of a digit
PL = [('tenths', Dc('0.1')), ('hundredths', Dc('0.01')), ('thousandths', Dc('0.001'))]
c = 0
while c < 10:
    ds = R.sample(range(1, 10), 4)
    n = f'{ds[0]}.{ds[1]}{ds[2]}{ds[3]}'
    i = R.randrange(3); d = ds[i + 1]
    vals = [s(d * p[1]) for p in PL]
    if add(f'The {d} in {n} is worth', vals[i], [v for j, v in enumerate(vals) if j != i]): c += 1
c = 0
while c < 8:
    ds = R.sample(range(1, 10), 4)
    n = f'{ds[0]}.{ds[1]}{ds[2]}{ds[3]}'
    i = R.randrange(3)
    if add(f'Which digit is in the {PL[i][0]} place in {n}?', str(ds[i + 1]), [str(ds[j + 1]) for j in range(3) if j != i]): c += 1
# make a decimal
c = 0
while c < 8:
    o, a, b = R.randint(1, 9), R.randint(1, 9), R.randint(1, 9)
    kind = R.randrange(3)
    if kind == 0: add(f'{o} + 0.{a} + 0.00{b}', f'{o}.{a}0{b}', [f'{o}.{a}{b}', f'{o}.0{a}{b}']) and (c := c + 1)
    elif kind == 1: add(f'{o} + 0.0{a} + 0.00{b}', f'{o}.0{a}{b}', [f'{o}.{a}{b}', f'{o}.{a}0{b}']) and (c := c + 1)
    else: add(f'{o} ones and {a} hundredths =', f'{o}.0{a}', [f'{o}.{a}', f'{o}.00{a}']) and (c := c + 1)
for n, w in ((10, 'hundredths make 1 tenth'), (10, 'thousandths make 1 hundredth'), (10, 'tenths make 1 whole'), (100, 'hundredths make 1 whole'), (100, 'thousandths make 1 tenth'), (1000, 'thousandths make 1 whole')):
    add('How many ' + w + '?', f'{n:,}', [x for x in ('10', '100', '1,000') if x != f'{n:,}'])
for a, b in (('7 tenths', '0.7'), ('3 hundredths', '0.03'), ('9 thousandths', '0.009'), ('15 hundredths', '0.15'), ('24 tenths', '2.4'), ('60 thousandths', '0.06')):
    num = int(a.split()[0]); unit = a.split()[1]
    vals = [s(Dc(num) * p[1]) for p in PL]
    add(a + ' =', b, [v for v in vals if v != b])
R.shuffle(items)
# check every right answer again, a different way (floats, rounded)
for q, o in items:
    if '×' in q or '÷' in q:
        n, op, by = q.split(' '); f = float(n.replace(',', '')); by = float(by.replace(',', ''))
        assert abs((f * by if op == '×' else f / by) - float(o[0].replace(',', ''))) < 1e-9, q
print(len(items))
open('tools/lightning_s1.txt', 'w', encoding='utf8').write(',\n'.join('        ' + json.dumps(i, ensure_ascii=False) for i in items))
