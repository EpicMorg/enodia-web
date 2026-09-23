---
title: Bitwarden
description: Konfiguracja enodia do sondowania samodzielnie hostowanego serwera Bitwarden.
---

Tylko wersja samodzielnie hostowana (self-hosted) — nie ma powodu
kierować tej sondy na usługę chmurową Bitwarden. Odczytuje
`GET /api/version`, który zwraca sam ciąg JSON (a nie obiekt).
Nie są potrzebne poświadczenia: aplikacje klienckie używają tego endpointu do sprawdzenia zgodności z serwerem, zanim w ogóle nastąpi logowanie.

```yaml
targets:
  - id: bitwarden-main
    product: bitwarden
    address: https://vault.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## To nie ten sam produkt co Vaultwarden

[Vaultwarden](/pl/configuration/products/vaultwarden/) to napisana od zera
w Rust reimplementacja API serwera Bitwarden, a nie fork, z własną,
niezależną numeracją wersji. Udostępnia identyczny endpoint i format
odpowiedzi, ale jest zarejestrowany jako osobny `product:` — wskazanie
instalacji Vaultwarden jako `product: bitwarden` porównywałoby wersję
jednego projektu z historią wydań drugiego.

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:bitwarden/server` — endoflife.date nie ma kalendarza dla `bitwarden`
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub Releases:
wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym (prerelease), bez dat eol/support/lts
(GitHub nie ma zdania na temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
