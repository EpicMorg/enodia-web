---
title: phpIPAM
description: Configurarea enodia pentru a sonda phpIPAM.
---

Citește anonim pagina de autentificare, `GET /index.php?page=login`.
Schema implicită este `https`.

```yaml
targets:
  - id: ipam-main
    product: phpipam
    address: https://ipam.example.com
```

## De unde provine versiunea

Subsolul paginii de autentificare indică `phpIPAM IP address management [v1.8.3]`,
iar fiecare foaie de stil și script de pe ea este încărcat cu
`?v=1.8.3_r002_v46` — prefixul propriu de scripturi al phpIPAM: versiunea
vizibilă, revizia codului și versiunea schemei bazei de date. Subsolul
dă versiunea; sufixul resurselor este varianta de rezervă atunci când
subsolul a fost eliminat prin personalizare, precum și sursa reviziei și a
versiunii schemei. Lansările mai vechi încarcă resursele cu un simplu
`?v=1.7.3` (văzut pe un 1.7.3 de producție), fără părțile de revizie și
schemă — versiunea tot se citește, iar cele două câmpuri `extra` lipsesc
atunci. O pagină fără niciuna dintre ele este raportată ca neacceptată.

## Autentificare

Niciuna — sonda citește o pagină anonimă și nu acceptă niciun tip de
credențială. Începând cu 2.2.0, o credențială configurată pe această țintă
este o eroare de configurare, în loc să fie ignorată; consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — de exemplu `1.8.3`, din `phpIPAM IP address management [v1.8.3]`
  (confirmat live pe `phpipam/phpipam-www:latest`)
- `extra.revision` — revizia codului din sufixul resurselor, de exemplu `002`
- `extra.dbVersion` — versiunea schemei bazei de date din sufixul
  resurselor, de exemplu `46`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un
[bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:phpipam/phpipam` — endoflife.date nu are un calendar pentru
phpIPAM (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
