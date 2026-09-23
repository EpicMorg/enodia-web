---
title: Vizualizări
description: compact, lifecycle, drift și fleet - patru secțiuni ale acelorași date.
---

`check` și `export` afișează amândouă una dintre cele patru perspective,
aleasă cu `--view` (sau cu `render.default_view` din `settings.yaml`
atunci când flag-ul nu este transmis). Fiecare vizualizare este o altă
secțiune a acelorași date de inventar și evaluare, nu o altă sursă de
date.

## `compact` (implicită)

Câte un rând pentru fiecare țintă: cele trei axe, severitatea generală
și motivul, dacă ceva necesită atenție.

```console
$ enodia check
ID           PRODUCT  PATCH   LIFECYCLE  BRANCH     SEVERITY  REASON  CVES
jira-main    jira     behind  active     newer_lts  warn      -       12
gitlab-main  gitlab   behind  eol        newer      fail      -       -
```

Ultima coloană, `CVES`, este numărul de CVE-uri distincte care afectează
exact acea versiune — `-` atunci când nu există niciunul, inclusiv atunci
când nu este configurat niciun [bloc `cve:`](/ro/cve/) sau produsul nu
este potrivit. `drift` are aceeași coloană; `lifecycle` și `fleet` nu o
au. CVE-urile nu modifică niciodată `SEVERITY` sau codul de ieșire.

## `lifecycle`

Când se încheie efectiv ciclul de viață al fiecărei ținte:

```console
$ enodia check --from inventory.jsonl --view lifecycle
ID           PRODUCT  LIFECYCLE  EOL         SUPPORT-ENDS  DAYS-TO-EOL
jira-main    jira     active     2026-12-05  -             338
gitlab-main  gitlab   eol        2025-01-16  2024-11-21    -350
```

## `drift`

Versiunea instalată comparată cu cea mai recentă versiune din același
ciclu:

```console
$ enodia check --from inventory.jsonl --view drift
ID           PRODUCT  CURRENT  LATEST   CYCLE  PATCH   CVES
jira-main    jira     10.3.1   10.3.25  10.3   behind  12
gitlab-main  gitlab   17.5.0   17.5.5   17.5   behind  -
```

## `fleet`

Distribuția versiunilor și accesibilitatea pentru toate instanțele unui
produs, grupate în loc să fie listate câte un rând pentru fiecare țintă.
Aceasta este vizualizarea **exclusiv offline** — nu are nevoie de nimic
în afară de inventarul propriu-zis, niciun rezolvator al ciclului de
viață, niciun acces la internet. Două instanțe eșuate ale aceluiași
produs, cu tipuri diferite de eșec (autentificare vs. inaccesibil),
primesc rânduri proprii, nu o categorie comună `(unknown)`:

```console
$ enodia check --from inventory.jsonl --view fleet
PRODUCT  VERSION    STATUS       COUNT  INSTANCES
gitlab   (unknown)  auth         1      gitlab-2
gitlab   18.2.1     ok           1      gitlab-1
jira     (unknown)  unreachable  1      jira-staging
jira     10.3.1     ok           1      jira-3
jira     10.3.2     ok           2      jira-1, jira-2
```

## Ce ignoră `--view`

`export --format json` și `export --format prometheus` ignoră complet
`--view` — ele conțin întotdeauna fiecare observație și evaluare.
Vizualizările modelează doar ieșirea sub formă de tabel și raportul HTML
(`export --format html`) — consultați [Rapoarte](/ro/reporting/).
