---
title: NetBox
description: Configurarea enodia pentru a sonda NetBox.
---

Citește pagina de autentificare anonimă, `GET /login/`, al cărei element
rădăcină conține `data-netbox-version` — de exemplu `4.3.3-Docker-3.3.0`
pe un NetBox rulat din netbox-docker. Dacă atributul lipsește, se
folosește în schimb versiunea cu care pagina își încarcă bundle-ul
(`/static/netbox.js?v=4.3.3`). Schema implicită este `https`.

```yaml
targets:
  - id: netbox-main
    product: netbox
    address: https://netbox.example.com
```

## De ce pagina de autentificare

API-ul REST al NetBox (`/api/status/`) necesită un token; pagina de
autentificare conține versiunea fără unul (confirmat live pe un NetBox de
producție din netbox-docker). Partea dinaintea lui `-Docker-` este
versiunea proprie a NetBox; restul este versiunea imaginii netbox-docker.

## Autentificare

Niciuna — pagina de autentificare este publică, iar sonda nu acceptă
niciun tip de credențială. Începând cu 2.2.0, o credențială atașată unei
ținte `netbox` este o eroare de configurare, nu este ignorată în tăcere —
consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — versiunea NetBox, de exemplu `4.3.3`
- `extra.netboxDocker` — versiunea imaginii netbox-docker (`3.3.0`), doar
  atunci când `data-netbox-version` are un sufix `-Docker-`

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).
„LenelS2 NetBox” din BDU este un alt produs și nu este folosit.

## Rezolvatorul ciclului de viață

`github:netbox-community/netbox` — endoflife.date nu are un calendar
pentru NetBox (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
