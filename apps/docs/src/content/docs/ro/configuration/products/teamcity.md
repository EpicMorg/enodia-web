---
title: TeamCity
description: Configurarea enodia pentru a sonda JetBrains TeamCity.
---

Citește versiunea anonim din `GET /app/rest/server/version` atunci când
nu sunt configurate credențiale, sau din `GET /app/rest/server` —
punctul de intrare indicat primul de referința API-ului REST al
TeamCity — atunci când este configurat un token.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    # credentials: teamcity-pat    # opțional, vedeți mai jos
```

## Autentificare — opțională și ușor de configurat invers dacă o adăugați

**Nu sunt necesare credențiale.** TeamCity servește
`/app/rest/server/version` oricui, ca text simplu —
`2026.1.1 (build 222577)` — chiar și cu autentificarea ca guest
dezactivată. Confirmat pe servere noi de la 2017.2 până la 2026.1, fără
niciun administrator creat, și pe șapte instanțe de producție (2024.03
până la 2026.1.3) fără credențiale. Nu este acces de guest:
`/app/rest/server` și endpointurile rezervate guest sunt refuzate pe
aceleași servere. Cât timp TeamCity pornește, răspunde la orice cale cu
o pagină HTML de mentenanță cu codul 200, așa că răspunsul trebuie să
corespundă integral formatului `YYYY.N[.N] (build N)`, altfel ținta
eșuează ca neparsabilă.

**Cu un token configurat**, sonda citește în schimb `/app/rest/server` —
ați cerut o citire autentificată, aceasta conține și `internalId`, iar
un token greșit rămâne o eroare de autentificare vizibilă, în loc să fie
mascat de calea anonimă. `/app/rest/server` nu este niciodată anonim: o
instanță nouă răspunde `401` cu provocări atât Basic, cât și Bearer.
TeamCity are **două tipuri distincte de token,
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
- `extra.buildNumber`
- `extra.internalId` — doar cu un token (`/app/rest/server`)

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are un calendar pentru TeamCity (404
confirmat). Doar pentru inventar, deocamdată.
