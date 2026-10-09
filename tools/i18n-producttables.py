#!/usr/bin/env python3
"""Regenerate the two product tables in a locale's products.md.

usage: i18n-producttables.py <locale> <products.md> '<vendor fmt>' <products.txt> <productmap.go>

products.txt is `enodia products` output of the release binary;
productmap.go is `git -C ../enodia show origin/master:internal/cve/productmap.go`.
<vendor fmt> renders the vendor-data CVE cell, e.g. '{} data' (en),
'данные {}' (ru). Rows already in the file keep their (translated) Summary
cell; new rows get the English summary. The OS table keeps its current set
of products; every other product goes to the first table, sorted.
"""
import re,sys
loc=sys.argv[1]; p=sys.argv[2]
src=open(sys.argv[5]).read()
def keys(var):
    body=src.split('var '+var+' = ',1)[1].split('\n}\n',1)[0]
    return set(re.findall(r'^\s*"([\w-]+)":',body,re.M))
bdu=keys('productSoftNames'); nvd=keys('productCPENames')
rows={}
for l in open(sys.argv[4]).read().splitlines()[1:]:
    m=re.match(r'(\S+)\s+(.*?)\s{2,}(\S+)$',l); rows[m[1]]=(m[2],m[3])
t=open(p).read()
# existing rows: keep CVE cells for package/other text, and summary text (localized)
old={}
for m in re.finditer(r'^\| \[`([^`]+)`\]\(([^)]*)\) \| (.*?) \| (.*?) \| (.*?) \|$',t,re.M):
    old[m[1]]=(m[3],m[4],m[5])
vendor={'mariadb':'MariaDB','jira':'Atlassian','confluence':'Atlassian','bitbucket':'Atlassian','bamboo':'Atlassian','postgresql':'PostgreSQL','nginx':'nginx'}
vend_word=sys.argv[3]  # e.g. "table"
def cve(pn):
    k={'dell-idrac':'idrac9'}.get(pn,pn)
    if pn=='ssh': return 'NVD, BDU'
    parts=[x for x,ok in (('NVD',k in nvd),('BDU',k in bdu)) if ok]
    if pn in vendor: parts.append(vend_word.format(vendor[pn]))
    return ', '.join(parts)
def row(pn):
    summ,res=rows[pn]
    if pn in old: summ=old[pn][0]
    rescell='—' if res=='-' else f'`{res}`'+('\\*' if pn=='sonarqube' else '')
    oc=old.get(pn,(None,None,None))[2]
    c=cve(pn)
    if not c: c = oc if oc and '(' in (oc or '') else '—'
    return f'| [`{pn}`](/{loc}/configuration/products/{pn}/) | {summ} | {rescell} | {c} |'
tables=list(re.finditer(r'(\|[^\n]*\|\n\|---\|---\|---\|---\|\n)((?:\| \[`[^\n]*\n)+)',t))
assert len(tables)==2
osset=[re.match(r'\| \[`([^`]+)`',l)[1] for l in tables[1][2].splitlines()]
apps=sorted([x for x in rows if x not in osset], key=lambda x:x.lower())
new_app='\n'.join(row(x) for x in apps)+'\n'
new_os='\n'.join(row(x) for x in osset)+'\n'
t=t[:tables[1].start(2)]+new_os+t[tables[1].end(2):]
t=t[:tables[0].start(2)]+new_app+t[tables[0].end(2):]
open(p,'w').write(t)
print(len(apps),len(osset),len(rows))
missing=[x for x in apps if x not in old]; print('new:',len(missing),missing)
