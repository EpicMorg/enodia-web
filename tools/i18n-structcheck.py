#!/usr/bin/env python3
# Checks every translated docs tree against en/: same files, same heading
# levels/order, byte-identical code blocks (# comments and fence titles may
# differ), same number of ::: callouts, no leftover /en/ links.
# Usage: tools/i18n-structcheck.py [locale ...]   (default: all but en)
# Run from anywhere; paths are resolved relative to this repo.
import os,re,sys
import os as _os
SRC=_os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'..','apps','docs','src','content','docs')
LOCS=sys.argv[1:] or sorted(d for d in os.listdir(SRC) if d!='en' and os.path.isdir(os.path.join(SRC,d)))
def parse(t):
    body=re.sub(r'^---\n.*?\n---\n','',t,count=1,flags=re.S)
    blocks=re.findall(r'^```[^\n]*\n.*?^```',body,re.S|re.M)
    nob=re.sub(r'^```[^\n]*\n.*?^```','',body,flags=re.S|re.M)
    heads=re.findall(r'^(#{1,6}) ',nob,re.M)
    strip=lambda b: re.sub(r'#.*','',b) if not b.startswith('```console') else b
    blocks=[re.sub(r"^(```\S*).*", r"\1", b, count=1) for b in blocks]
    return heads,[re.sub(r'[ \t]+$','',strip(b),flags=re.M) for b in blocks], nob.count(':::'), len(re.findall(r'`[^`\n]+`',nob))
en={}
for d,_,fs in os.walk(SRC+'/en'):
    for f in fs: p=os.path.join(d,f); en[os.path.relpath(p,SRC+'/en')]=parse(open(p).read())
for loc in LOCS:
    miss=[r for r in en if not os.path.isfile(f'{SRC}/{loc}/{r}')]
    bad=[]
    for r,(h,b,c,ic) in en.items():
        p=f'{SRC}/{loc}/{r}'
        if not os.path.isfile(p): continue
        t=open(p).read(); h2,b2,c2,ic2=parse(t)
        prob=[]
        if h!=h2: prob.append(f'headings {len(h)}→{len(h2)}')
        if len(b)!=len(b2): prob.append(f'codeblocks {len(b)}→{len(b2)}')
        elif b!=b2: prob.append('codeblock-content')
        if c!=c2: prob.append(f'callouts {c}→{c2}')
        if abs(ic-ic2)>max(2,ic//10): prob.append(f'inline-code {ic}→{ic2}')
        if re.search(r'\]\(/en/',t): prob.append('/en/ link')
        if prob: bad.append((r,prob))
    print(f'{loc}: {len(en)-len(miss)}/{len(en)} files, missing={len(miss)}, issues={len(bad)}')
    for r,p in bad[:15]: print('   ',r,p)
