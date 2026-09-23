---
title: TrueNAS
description: Configurarea enodia pentru a sonda TrueNAS.
---

Citește `GET /api/v2.0/system/info`.

```yaml
targets:
  - id: truenas-main
    product: truenas
    address: https://truenas.example.com
    credentials: truenas-key
```

## Autentificare — obligatorie

Confirmat live pe o gazdă reală TrueNAS 25.10.7: acest endpoint răspunde
`401` fără credențiale. O cheie API funcționează ca simplu bearer token:

```yaml
credentials:
  truenas-key:
    kind: bearer
    value: "${TRUENAS_API_KEY}"
```

## Nu este o sondă SSH, deși este un sistem de operare de tip appliance

O versiune anterioară a acestei sonde citea în schimb `/etc/version` prin
SSH (`/etc/os-release` al TrueNAS raportează baza Debian de dedesubt, nu
TrueNAS în sine — aceeași lacună a fișierului de identitate pe care o are
[Astra Linux](/ro/configuration/products/astra-linux/)). Odată ce a
devenit disponibilă o țintă API reală pentru verificare, varianta HTTP a
înlocuit complet varianta SSH — enodia nu are o revenire pe două
transporturi per produs, așa că forma mai simplă și mai potrivită
câștigă, în loc să coexiste ambele.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Nu se corelează — prea puține intrări, versionate diferit față de ceea ce raportează sonda. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:truenas`.
