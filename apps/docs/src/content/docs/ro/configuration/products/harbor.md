---
title: Harbor
description: Configurarea enodia pentru a sonda Harbor (registru de containere).
---

Citește `GET /api/v2.0/systeminfo`.

```yaml
targets:
  - id: harbor-main
    product: harbor
    address: https://harbor.example.com
```

## Autentificare

Opțională. Confirmat live pe un stack real `goharbor/harbor` v2.12.2:
`harbor_version` este returnat fără nicio credențială în fiecare versiune
lansată în prezent — credențialele greșite sau inventate sunt tratate în
tăcere ca anonime, în loc să primească `401`; acest endpoint nu respinge
niciodată direct o cerere.

:::note[Urmăriți dacă acest lucru se schimbă în upstream]
Codul sursă al Harbor (începând cu versiunea pe care a fost verificată
această sondă) condiționează deja `harbor_version` de o verificare a
sesiunii autentificate pe ramura principală, nelansată la momentul
redactării — ceea ce indică o versiune viitoare care va cere credențiale
pentru acest câmp. `basic` este deja oferit aici pentru momentul în care
se va întâmpla acest lucru:

```yaml
credentials:
  harbor-admin:
    kind: basic
    username: admin
    password: "${HARBOR_PASSWORD}"
```
:::

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:harbor`.
