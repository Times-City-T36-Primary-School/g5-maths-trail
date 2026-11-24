#!/bin/bash
# plays every step of every stop on the complete page (dist/full-snapshot.html), at the sizes given
export DIST=${DIST:-dist/full-snapshot.html}
for size in "$@"; do w=${size%x*}; h=${size#*x}
  for n in $STOPS; do for s in practise see test notes words lightning selfcheck; do
    r=$(timeout 400 node test/play.mjs $n $s $w $h 0 2>&1 | tail -4 | tr '\n' ' ')
    case "$r" in *"no page problems"*) ok=OK;; *) ok=FAIL;; esac
    echo "$ok stop $n $s ${w}x$h :: $(echo $r | cut -c1-200)"
  done; done
done
