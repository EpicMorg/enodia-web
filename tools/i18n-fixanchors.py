#!/usr/bin/env python3
# Rewrites #anchors in translated docs links by heading position: the
# anchor's index among the English page's headings -> the id at the same
# index in the translated page. Needs a fresh build: cd apps/docs && npm run build.
# Usage: tools/i18n-fixanchors.py [locale ...]   then rebuild.
# Run from anywhere; paths are resolved relative to this repo.
import os,re,sys,html,urllib.parse
import os as _os
ROOT=_os.path.join(_os.path.dirname(_os.path.abspath(__file__)),'..','apps','docs'); DIST=ROOT+'/dist'; SRC=ROOT+'/src/content/docs'
LOCS=sys.argv[1:] or sorted(d for d in os.listdir(SRC) if d!='en' and os.path.isdir(os.path.join(SRC,d)))
cache={}
def heads(url):  # url like /en/cve/
    if url in cache: return cache[url]
    p=os.path.join(DIST,url.strip('/'),'index.html')
    if not os.path.isfile(p): cache[url]=None; return None
    t=open(p,encoding='utf-8').read()
    m=re.search(r'<div class="sl-markdown-content">(.*)</div>\s*</div>\s*<footer',t,re.S) or re.search(r'sl-markdown-content">(.*)',t,re.S)
    ids=[urllib.parse.unquote(i) for i in re.findall(r'<h[2-6][^>]*\sid="([^"]+)"',m.group(1))]
    cache[url]=ids; return ids
link=re.compile(r'\]\((/(?:%s)/[^)#\s]*)?#([^)\s]+)\)'%'|'.join(map(re.escape,LOCS)) + r'|\]\(#([^)\s]+)\)')
changed=unfixed=0
for loc in LOCS:
    for d,_,fs in os.walk(os.path.join(SRC,loc)):
        for f in fs:
            if not f.endswith(('.md','.mdx')): continue
            fp=os.path.join(d,f); rel=os.path.relpath(fp,os.path.join(SRC,loc))
            page='/'+re.sub(r'(index)?\.mdx?$','',rel).rstrip('/')
            page=(page+'/') if page!='/' else '/'
            t=open(fp,encoding='utf-8').read()
            def rep(m):
                global changed,unfixed
                if m.group(3) is not None: path=None; anc=m.group(3)
                else: path=m.group(1); anc=m.group(2)
                tgt_loc=path if path else f'/{loc}{page}'
                tgt_loc=tgt_loc if tgt_loc.endswith('/') else tgt_loc+'/'
                lh=heads(tgt_loc); a=urllib.parse.unquote(anc)
                if lh is None or a in lh: return m.group(0)
                en=re.sub(r'^/[^/]+/','/en/',tgt_loc); eh=heads(en)
                if eh and a in eh and len(lh)==len(eh):
                    new=lh[eh.index(a)]; changed+=1
                    return m.group(0).replace('#'+anc,'#'+new)
                unfixed+=1; print('UNFIXED',loc,rel,tgt_loc,anc,'en' if eh and a in eh else 'not-in-en', len(lh or []),len(eh or []))
                return m.group(0)
            n=link.sub(rep,t)
            if n!=t: open(fp,'w',encoding='utf-8').write(n)
print('rewritten',changed,'unfixed',unfixed)
