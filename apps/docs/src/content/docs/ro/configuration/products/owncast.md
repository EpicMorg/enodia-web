---
title: Owncast
description: Configurarea enodia pentru a sonda Owncast.
---

Citește `GET /api/status` pentru versiune.

```yaml
targets:
  - id: owncast-main
    product: owncast
    address: https://owncast.example.com
```

## Autentificare

Niciuna — ruta nu are niciun middleware care să ceară autentificare în
codul sursă al Owncast, confirmat pe un container activ
`owncast/owncast:latest`.

## Câmpuri înregistrate

- `version` — din `versionNumber`
- `extra.online` — `"true"`/`"false"`

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:owncast/owncast` — endoflife.date nu are un calendar pentru
Owncast (404 confirmat),
așa că rezolvarea se face în schimb pe baza GitHub Releases: doar cel mai
recent tag publicat care nu este prerelease, fără date eol/support/lts
(GitHub nu are nicio opinie despre politica ciclului de viață, doar
despre „care este cea mai recentă versiune”).
