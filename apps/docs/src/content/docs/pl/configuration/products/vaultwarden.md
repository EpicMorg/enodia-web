---
title: Vaultwarden
description: Konfiguracja enodia do sondowania produktu Vaultwarden.
---

Odczytuje `GET /api/version`, który zwraca sam ciąg JSON (a nie obiekt) —
identyczny endpoint i format odpowiedzi jak w samym
[Bitwarden](/pl/configuration/products/bitwarden/).
Nie są potrzebne poświadczenia: aplikacje klienckie używają tego endpointu do sprawdzenia zgodności z serwerem, zanim w ogóle nastąpi logowanie.

```yaml
targets:
  - id: vaultwarden-main
    product: vaultwarden
    address: https://vault.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## To nie ten sam produkt co Bitwarden

Vaultwarden to napisana od zera w Rust reimplementacja API serwera
Bitwarden, a nie fork — ma własną, niezależną numerację wersji, która nie
podąża za wydaniami Bitwarden. Właśnie dlatego jest zarejestrowany jako
odrębny `product:`: porównywanie wersji instalacji Vaultwarden
z kalendarzem cyklu życia oznaczonym jako `bitwarden` oznaczałoby
porównywanie dwóch niepowiązanych schematów numeracji.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:dani-garcia/vaultwarden` — endoflife.date nie ma kalendarza dla `vaultwarden`
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub Releases:
wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym (prerelease), bez dat eol/support/lts
(GitHub nie ma zdania na temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
