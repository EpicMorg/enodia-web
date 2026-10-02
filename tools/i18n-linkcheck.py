#!/usr/bin/env python3
# Checks every internal link and #anchor in the built docs (apps/docs/dist):
# each target page must exist and each anchor must match a real id there.
# Usage: (cd apps/docs && npm run build) && tools/i18n-linkcheck.py
import os,re,html,urllib.parse
DIST=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','apps','docs','dist')
pages={};ids={};bad=[]
for d,_,fs in os.walk(DIST):
    for f in fs:
        if f.endswith('.html'):
            p=os.path.join(d,f); t=open(p,encoding='utf-8').read(); pages[p]=t
            ids[p]=set(urllib.parse.unquote(i) for i in re.findall(r'\sid="([^"]+)"',t))
def target(path):
    c=os.path.join(DIST,urllib.parse.unquote(path).lstrip('/'))
    for x in [c,os.path.join(c,'index.html'),c+'.html']:
        if os.path.isfile(x): return x
for p,t in pages.items():
    for h in re.findall(r'href="(/[^"]*|#[^"]*)"',t):
        h=html.unescape(h); u,_,frag=h.partition('#')
        if u.startswith(('/_astro','/pagefind')): continue
        tp=target(u) if u else p
        if not tp: bad.append((os.path.relpath(p,DIST),h,'no page')); continue
        if frag and urllib.parse.unquote(frag) not in ids[tp]: bad.append((os.path.relpath(p,DIST),h,'no anchor'))
print(len(pages),'pages',len(set(bad)),'broken')
for b in sorted(set(bad))[:50]: print('  ',b)
