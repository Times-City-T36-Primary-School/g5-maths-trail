import re,os
L=open('ref/g3-built.html',encoding='utf8').read().split('\n')
def cut(a,b,ext,d):
    os.makedirs(d,exist_ok=True)
    cur=None;buf=[];order=[]
    def flush():
        if cur:
            open(f'{d}/{cur}','w',encoding='utf8').write('\n'.join(buf).strip('\n')+'\n'); order.append(cur)
    for ln in L[a-1:b]:
        m=re.match(r'^/\* ?(\d\d-[a-z0-9-]+\.'+ext+')',ln)
        if m:
            flush(); cur=m.group(1); buf=[]
            assert cur not in order, cur
        buf.append(ln)
    flush(); return order
css=cut(9,5543,'css','src/css'); js=cut(5549,25279,'js','src/js')
open('src/order.json','w').write(__import__('json').dumps({'css':css,'js':js},indent=1))
print(len(css),len(js))
