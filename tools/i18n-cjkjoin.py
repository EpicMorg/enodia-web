#!/usr/bin/env python3
# Joins soft line breaks between CJK characters in Markdown prose (outside
# code and block markers) - a newline there renders as a stray space.
# Usage: tools/i18n-cjkjoin.py apps/docs/src/content/docs/zh-cn
# Run from anywhere; paths are resolved relative to this repo.
import os,re,sys
ROOT=sys.argv[1]
CJK='　-〿㐀-䶿一-鿿＀-￯'
end=re.compile('[%s]$'%CJK)
start=re.compile(r'^\s*(?:[%s]|\[|\*\*)'%CJK)
block=re.compile(r'^\s*(?:[-*+] |\d+\. |#|\||>|:::|```)')
tot=0
for d,_,fs in os.walk(ROOT):
    for f in fs:
        if not f.endswith(('.md','.mdx')): continue
        p=os.path.join(d,f); lines=open(p,encoding='utf-8').read().split('\n')
        out=[]; fence=False; fm=0; n=0
        for i,l in enumerate(lines):
            if i==0 and l=='---': fm=1; out.append(l); continue
            if fm==1:
                out.append(l)
                if l=='---': fm=2
                continue
            if l.lstrip().startswith('```'): fence=not fence; out.append(l); continue
            if (not fence and out and end.search(out[-1]) and l.strip() and start.search(l)
                and not block.match(l) and not out[-1].lstrip().startswith(('#','|','```',':::'))):
                out[-1]=out[-1]+l.lstrip(); n+=1; continue
            out.append(l)
        if n: open(p,'w',encoding='utf-8').write('\n'.join(out)); tot+=n
print('joined',tot)
