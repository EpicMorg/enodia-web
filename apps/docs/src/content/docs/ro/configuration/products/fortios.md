---
title: Fortinet FortiOS (FortiGate)
description: Configurarea enodia pentru a sonda un Fortinet FortiGate care rulează FortiOS.
---

Citește `GET /api/v2/monitor/system/status` — API-ul REST propriu al
FortiOS. Verificat pe un FortiGate 601E real care rulează FortiOS 7.4.12.

```yaml
targets:
  - id: fw-edge
    product: fortios
    address: https://fw.example.com
    credentials: fortigate-api
```

## Autentificare — obligatorie

Un token de **REST API Admin**: creați un REST API Admin în interfața
grafică FortiGate (System → Administrators) și copiați cheia API pe care
o generează — FortiOS o afișează o singură dată. Este trimisă ca simplu
bearer token; fără autentificare prin sesiune, fără token CSRF, fără
parametrul de interogare `access_token`:

```yaml
credentials:
  fortigate-api:
    kind: bearer
    value: "${FORTIGATE_API_TOKEN}"
```

Un token lipsă sau greșit primește `401` (cu o pagină de eroare HTML, nu
JSON) — raportat ca eroare de autentificare, la fel ca la orice altă
sondă. Un REST API Admin poate fi limitat la gazde de încredere chiar în
FortiOS; dacă faceți acest lucru, includeți adresa de la care se
conectează enodia.

## Câmpuri înregistrate

- `version` — așa cum o raportează FortiOS, de exemplu `v7.4.12`
  (prefixul `v` este eliminat la comparare, nu la înregistrare)
- `extra.model` — de exemplu `FG6H1E` (modelul 601E)
- `extra.build` — numărul de build FortiOS

Numele de gazdă al dispozitivului se află în același răspuns, dar în mod
deliberat nu este înregistrat.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:fortios`. Pagina FortiOS de pe endoflife.date conține cicluri
de lansare și date, dar nicio „cea mai recentă versiune” pentru vreun
ciclu, așa că axa ciclului de viață funcționează, în timp ce `drift`
afișează `LATEST: -` și `PATCH: unknown` — o lacună în datele sursă, nu
o eroare a sondei.
