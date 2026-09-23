---
title: YouTrack
description: Configurarea enodia pentru a sonda YouTrack.
---

Citește `GET /api/config?fields=version`.

```yaml
targets:
  - id: youtrack-main
    product: youtrack
    address: https://youtrack.example.com
```

## Autentificare

Nu este necesară — confirmat live pe o instanță YouTrack reală, expusă
la internet: acest endpoint nu necesită credențiale, iar solicitarea
oricărui câmp în afară de `version` (`buildDate`, `edition`, ...) este
ignorată în tăcere pentru un apelant anonim, în loc să fie returnată.
`bearer` este acceptat dacă preferați totuși să vă autentificați.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:youtrack`.
