---
title: Concepte
description: Deciziile de design din spatele enodia - de ce are forma pe care o are.
---

Acestea sunt deciziile fundamentale din designul enodia. Înțelegerea lor
explică o mare parte din comportamentul care altfel ar părea arbitrar.

## Două faze, separabile în mod deliberat

Colectarea comunică cu serviciile dumneavoastră. Evaluarea comunică cu
internetul (calendarele de ciclu de viață ale producătorilor). În multe
infrastructuri reale, nimic nu are acces de rețea la ambele în același
timp.

```
collect  →  inventory.jsonl  →  evaluate  →  assessment  →  render
```

```bash
# în interiorul rețelei închise - nu este nevoie de internet
enodia collect --config config.yaml -o inventory.jsonl

# oriunde altundeva - nu este nevoie de acces la serviciile dumneavoastră
enodia check --from inventory.jsonl
```

`enodia check` fără `--from` înseamnă aceste două faze compuse într-un
singur proces, nu o a doua cale de cod — inventarul produs pe parcurs
este un artefact real, de primă clasă (cu propria schemă și versiune), nu
doar o valoare intermediară din memorie.

## Trei axe ortogonale, nu o singură stare

O ramură poate fi perfect sănătoasă în timp ce există o versiune majoră
mai nouă — Confluence 10 LTS este la zi în cadrul ramurii sale, este
suportat activ și, în același timp, a fost lansată o versiune majoră mai
nouă. Comprimarea acestora într-o singură stare aruncă exact informația
pe care o doreați de fapt.

| Axă | Valori |
|---|---|
| Patch | `current` · `behind` · `ahead` · `unknown` |
| Ciclu de viață | `active` · `security` · `eol` · `unknown` |
| Ramură mai nouă | `latest` · `newer` · `newer_lts` · `unknown` |

`ahead` nu este ceva exotic — versiunile candidate și decalajul dintre
anunțul unui producător și pagina sa de descărcare îl produc în mod
curent.

CVE-urile cunoscute, atunci când sunt [configurate](/ro/cve/), sunt un
fapt separat, alături de cele trei axe, nu o a patra axă: sunt listate
pentru fiecare evaluare, dar nu influențează niciodată severitatea,
codul de ieșire sau `--fail-on`.

## Faptele și judecata sunt separate

Un `Observation` conține ceea ce a fost efectiv văzut: un șir de
versiune, dacă ținta a fost accesibilă, ce eroare a apărut (dacă a
apărut vreuna). Un `Assessment` conține ceea ce crede politica enodia
despre aceste fapte — severitatea, calculată deasupra lor, pe baza unei
politici pe care o controlați dumneavoastră.

Exportul `--format json` emite fapte. Un consumator cu alte priorități
poate aplica propria politică deasupra, în locul celei a enodia.
Includerea severității direct în observație ar face acest lucru
imposibil.

## Timpul este un parametru

Evaluarea primește un timestamp explicit `asOf` — nimic din calea de
evaluare nu apelează direct ceasul sistemului. `check --from` preia
`asOf` din antetul inventarului (`collectedAt`), astfel încât un
inventar vechi de o lună este evaluat la momentul *în care a fost
colectat*, nu rejudecat tacit în raport cu ziua de azi. Rularea
ulterioară a aceleiași evaluări produce același rezultat.

## Sondele sunt compilate, nu un DSL YAML

API-urile producătorilor diferă suficient de mult încât un limbaj
declarativ pentru sonde pare general doar până la primul producător din
afara setului pentru care a fost construit. Fiecare sondă este un singur
fișier Go cu o singură intrare explicită într-un registru — codificarea
cunoștințelor despre producător în cod înseamnă că un `if` este doar un
`if`, lizibil și depanabil, în loc de o condiție reexprimată în YAML.

Aceasta înseamnă că adăugarea unui produs nou necesită o lansare, nu doar
o modificare a propriei configurații. Soluția de rezervă: `product:
generic` acceptă o specificație de parser (`json` / `xml` / `header` /
`plaintext` / `regex`) direct din configurația dumneavoastră, pentru
sistemele interne care nu vor primi niciodată o sondă dedicată —
consultați [Configurare](/ro/configuration/#sonda-generică).
Vocabularul sondei generice este înghețat în mod deliberat: fără
condiții, fără bucle, fără cereri înlănțuite. O țintă care are nevoie de
oricare dintre acestea are nevoie de o sondă reală, scrisă în Go.

## HTTPS mai întâi, credențialele nu sunt niciodată trimise în clar în mod implicit

Rezolvarea schemei pentru o țintă fără `https://`/`http://` explicit în
adresă: se încearcă mai întâi `https`, se revine la `http` și se emite un
avertisment în ambele cazuri. enodia nu încearcă niciodată `http` mai
întâi — prima cerere ar transporta deja o credențială în clar, iar o
redirecționare ulterioară către `https` nu ar anula trimiterea ei. O
țintă `http://` cu credențiale atașate reprezintă o eroare fatală, cu
excepția cazului în care `allow_insecure_transport: true` este setat
pentru acel serviciu anume.

## Niciun server web integrat care interoghează la cerere

`enodia serve` și `export --format html` afișează amândouă cel mai
recent snapshot finalizat — niciunul nu declanșează vreodată o colectare
nouă ca răspuns la o cerere. Un buton de reîmprospătare care interoghează
întreaga flotă la fiecare clic este un atac de tip denial-of-service
autoprovocat asupra propriului mediu de producție. Colectarea rulează
după un program (`serve --interval` sau cron/un timer systemd care
regenerează un export HTML); HTTP citește întotdeauna doar ceea ce a
produs ultimul ciclu reușit.
