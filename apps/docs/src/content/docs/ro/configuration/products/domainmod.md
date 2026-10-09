---
title: DomainMOD
description: Configurarea enodia pentru a sonda DomainMOD.
---

Citește `GET /CHANGELOG`, fișierul changelog pe care DomainMOD îl livrează
în rădăcina sa web, servit ca fișier static. Schema implicită este `https`.

```yaml
targets:
  - id: domainmod-main
    product: domainmod
    address: https://domains.example.com
```

Un DomainMOD instalat într-o subcale (`DOMAINMOD_WEB_ROOT`) este accesat
punând acea cale în adresă, de exemplu
`https://www.example.com/domainmod`.

## De ce CHANGELOG

DomainMOD afișează `Version 4.23.0` doar în subsolul interfeței pentru
utilizatorii autentificați. CHANGELOG este anonim: începe cu `DomainMOD
CHANGELOG`, o linie de separare, apoi cea mai nouă intrare mai întâi —
`v4.23.0     2025-01-04`. Sonda cere acel titlu, astfel încât changelogul
altei aplicații să nu fie citit ca fiind al DomainMOD. Un server web care
blochează fișierul face ca ținta să fie „neacceptată”.

## Autentificare

Niciuna — sonda citește un fișier static și nu acceptă niciun tip de
credențială. Începând cu 2.2.0, o credențială configurată pe această țintă
este o eroare de configurare, în loc să fie ignorată; consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

Doar `version` — de exemplu `4.23.0`, din cea mai nouă intrare a
CHANGELOG-ului, `v4.23.0     2025-01-04` (confirmat live pe
`domainmod/domainmod:latest`, al cărui `software.inc.php` indică
`SOFTWARE_VERSION = '4.23.0'`). Această sondă nu înregistrează niciun
câmp `extra`.

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:domainmod/domainmod` — endoflife.date nu are un calendar pentru
DomainMOD (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
