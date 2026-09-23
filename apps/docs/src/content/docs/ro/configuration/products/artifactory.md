---
title: Artifactory
description: Configurarea enodia pentru a sonda JFrog Artifactory.
---

Citește `GET /artifactory/api/system/version` pentru versiune.

```yaml
targets:
  - id: artifactory-main
    product: artifactory
    address: https://artifactory.example.com
```

## Autentificare

Opțională. Dacă acest endpoint necesită credențiale variază de la o
instanță la alta — confirmat pe două servere reale: o instalare OSS nouă
răspunde `401` la cererile anonime, dar o instanță de producție cu
„Allow Anonymous Access” activat a răspuns `200` fără nicio credențială.
Basic auth funcționează atunci când este necesar:

```yaml
credentials:
  artifactory-admin:
    kind: basic
    username: admin
    password: "${ARTIFACTORY_PASSWORD}"
```

## Câmpuri înregistrate

- `version` — de exemplu `7.161.20`
- `extra.revision`, atunci când răspunsul conține unul

Răspunsul include și `license`, `addons` și `entitlements` — care nu sunt
citite niciodată, în mod deliberat. Pe o instanță reală de producție,
`license` era o amprentă specifică instalării, nu o valoare fixă, iar
niciunul dintre cele trei nu descrie software-ul în sine.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:artifactory`.
