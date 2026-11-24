#!/bin/bash
# tools/review.sh N  - build stop N alone, check it, play it on a phone, dump its questions, make contact sheets
N=$1; export DIST=dist/s$N/index.html
node build.mjs --stop $N 2>&1 | grep -v "^LEFT OUT\|SyntaxError\|^\s*$\|\^" | tail -1
node test/check.mjs $N | tail -4
rm -f shots/play-$N-*-390-*.png
for s in practise see test; do node test/play.mjs $N $s 390 800 1 2>&1 | tail -3 | cut -c1-300; done
node test/dump.mjs $N | tail -3
node test/shots.mjs shots 390 800 stop-$N stop-$N-notes stop-$N-words >/dev/null
python3 - $N <<'P'
import sys,glob
from PIL import Image
n=sys.argv[1]
def sheet(files,out,per=7):
    files=files[:per*3]
    if not files: return
    rows=(len(files)+per-1)//per
    a=Image.new('RGB',(390*min(per,len(files)),800*rows),'white')
    for i,f in enumerate(files): a.paste(Image.open(f),(390*(i%per),800*(i//per)))
    a=a.resize((a.width*2//3,a.height*2//3)); a.save(out); print(out,len(files))
sheet(sorted(glob.glob(f'shots/play-{n}-practise-390-*-q.png')),f'shots/rv{n}-practise.png')
see=sorted(glob.glob(f'shots/play-{n}-see-390-*'))
sheet([f for f in see if 'scene' in f or f.endswith('-q.png')],f'shots/rv{n}-see.png')
sheet(sorted(glob.glob(f'shots/play-{n}-test-390-*'))+[f'shots/stop-{n}-390.png',f'shots/stop-{n}-notes-390.png'],f'shots/rv{n}-test.png')
P
