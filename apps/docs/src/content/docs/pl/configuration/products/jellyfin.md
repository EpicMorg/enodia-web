---
title: Jellyfin
description: Konfiguracja enodia do sondowania produktu Jellyfin.
---

Odczytuje wersję z `GET /System/Info/Public` — „publicznego” wariantu
endpointu informacji systemowych Jellyfin, celowo dostępnego przed
zalogowaniem.

```yaml
targets:
  - id: jellyfin-main
    product: jellyfin
    address: https://jellyfin.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Weryfikacja tożsamości producenta

`ProductName` z odpowiedzi jest porównywane z `"Jellyfin Server"`. Ta sama
odpowiedź zawiera również `ServerName` danego wdrożenia, trwały
identyfikator instalacji `Id` oraz jego `LocalAddress` — nic z tego nie
opisuje samego oprogramowania, dlatego odczytywane są tylko `Version`
i `ProductName`.

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:jellyfin/jellyfin` — endoflife.date nie ma kalendarza dla Jellyfin
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub Releases:
wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym (prerelease), bez dat eol/support/lts
(GitHub nie ma zdania na temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
