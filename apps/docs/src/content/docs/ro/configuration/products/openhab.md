---
title: openHAB
description: Configurarea enodia pentru a sonda openHAB.
---

Citește rădăcina API-ului REST, `GET /rest/`, pe care openHAB o servește
fără autentificare.

```yaml
targets:
  - id: openhab-main
    product: openhab
    address: https://openhab.example.com
```

## Care versiune este care

`/rest/` răspunde cu două versiuni: un `version` de nivel superior (`"8"`),
care este al API-ului REST, și `runtimeInfo.version` (`"5.2.2"`), care
este al openHAB — confirmat live pe `openhab/openhab:latest`, al cărui
`version.properties` indica openhab-distro 5.2.2. Sonda raportează
`runtimeInfo.version`; versiunea API-ului REST ajunge în `extra`.

## Autentificare

Opțională. `/rest/` răspunde implicit anonim; `/rest/systeminfo` necesită
autentificare și nu este folosit. Pentru o instanță care dezactivează
accesul anonim, credențialele `bearer` sau `basic` sunt transmise dacă
sunt configurate:

```yaml
credentials:
  openhab-token:
    kind: bearer
    value: "${OPENHAB_TOKEN}"
```

Orice alt tip este o eroare de configurare. Consultați
[Configurare → Credențiale](/ro/configuration/#credențiale).

## Câmpuri înregistrate

- `version` — `runtimeInfo.version`, de exemplu `5.2.2`
- `extra.build` — `runtimeInfo.buildString`, de exemplu `Release Build`
- `extra.restApiVersion` — `version` de nivel superior, de exemplu `8`

## Corelare CVE

Se corelează cu NVD atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`github:openhab/openhab-distro` — endoflife.date nu are un calendar pentru
openHAB (404 confirmat), așa că rezolvarea se face în schimb pe baza
GitHub Releases: doar cel mai recent tag publicat care nu este prerelease,
fără date eol/support/lts (GitHub nu are nicio opinie despre politica
ciclului de viață, doar despre „care este cea mai recentă versiune”).
openhab-distro publică milestone-urile (`5.3.0.M2`) ca lansări obișnuite,
nemarcate ca versiuni preliminare; rezolvatorul le omite după numele
tag-ului, astfel încât un milestone să nu facă orice openHAB stabil să
apară ca rămas în urmă.
