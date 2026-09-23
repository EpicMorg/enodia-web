---
title: TeamCity
description: Configurarea enodia pentru a sonda JetBrains TeamCity.
---

Citește `GET /app/rest/server` — punctul de intrare indicat primul de
referința API-ului REST al TeamCity — pentru versiune.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    credentials: teamcity-pat
```

## Autentificare — obligatorie și ușor de configurat invers

Implicit nu există acces anonim — o instanță nouă răspunde `401` cu
provocări atât Basic, cât și Bearer (autentificarea ca guest este
dezactivată implicit). TeamCity are **două tipuri distincte de token,
confirmate live, care funcționează doar ca tipuri de credențiale opuse**:

- **Tokenul de bootstrap al superutilizatorului**, de unică folosință,
  pe care un server nou îl scrie în log la prima pornire, funcționează
  doar ca **Basic** — nume de utilizator gol, tokenul ca parolă. Trimis
  ca simplu `Authorization: Bearer`, este respins.
- **Personal access token**-ul unui utilizator obișnuit (Profile → Access
  Tokens — modul în care se autentifică de fapt automatizarea reală, de
  lungă durată) este opusul: confirmat pe șapte instanțe reale de
  producție, funcționează ca **Bearer** și este respins categoric ca
  Basic („Incorrect username or password”, chiar și cu un nume de
  utilizator gol).

```yaml
credentials:
  # token de bootstrap — Basic, nume de utilizator gol
  teamcity-bootstrap:
    kind: basic
    username: ""
    password: "${TEAMCITY_BOOTSTRAP_TOKEN}"

  # personal access token — Bearer
  teamcity-pat:
    kind: bearer
    value: "${TEAMCITY_TOKEN}"
```

Folosiți personal access token-ul în orice configurație de lungă durată
— tokenul de bootstrap este destinat să fie înlocuit după prima
autentificare.

## Câmpuri înregistrate

- `version` — șirul complet, de exemplu `2026.2 (build 238924)`
- `extra.buildNumber`, `extra.internalId`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are un calendar pentru TeamCity (404
confirmat). Doar pentru inventar, deocamdată.
