---
title: Owncast
description: Konfiguracja enodia do sondowania produktu Owncast.
---

Odczytuje wersję z `GET /api/status`.

```yaml
targets:
  - id: owncast-main
    product: owncast
    address: https://owncast.example.com
```

## Uwierzytelnianie

Brak — w kodzie źródłowym Owncast ta trasa nie ma żadnego middleware
wymagającego uwierzytelnienia, co potwierdzono na działającym kontenerze
`owncast/owncast:latest`.

## Rejestrowane pola

- `version` — z `versionNumber`
- `extra.online` — `"true"`/`"false"`

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:owncast/owncast` — endoflife.date nie ma kalendarza dla Owncast
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub Releases:
wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym (prerelease), bez dat eol/support/lts
(GitHub nie ma zdania na temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
