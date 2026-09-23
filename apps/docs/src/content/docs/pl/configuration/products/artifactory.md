---
title: Artifactory
description: Konfiguracja enodia do sondowania produktu JFrog Artifactory.
---

Odczytuje wersję z `GET /artifactory/api/system/version`.

```yaml
targets:
  - id: artifactory-main
    product: artifactory
    address: https://artifactory.example.com
```

## Uwierzytelnianie

Opcjonalne. To, czy ten endpoint wymaga poświadczeń, zależy od instancji —
potwierdzono na dwóch rzeczywistych serwerach: świeża instalacja OSS
odpowiada anonimowo `401`, ale instancja produkcyjna z włączonym „Allow
Anonymous Access” odpowiedziała `200` bez żadnych poświadczeń. W razie
potrzeby działa uwierzytelnianie Basic:

```yaml
credentials:
  artifactory-admin:
    kind: basic
    username: admin
    password: "${ARTIFACTORY_PASSWORD}"
```

## Rejestrowane pola

- `version` — np. `7.161.20`
- `extra.revision`, gdy odpowiedź go zawiera

Odpowiedź zawiera także `license`, `addons` i `entitlements` — celowo
nigdy nieodczytywane. Na rzeczywistej instancji produkcyjnej `license` był
odciskiem specyficznym dla danej instalacji, a nie stałym literałem,
a żadne z tych trzech pól nie opisuje samego oprogramowania.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:artifactory`.
