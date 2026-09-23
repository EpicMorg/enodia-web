---
title: YouTrack
description: Konfiguracja enodia do sondowania produktu YouTrack.
---

Odczytuje `GET /api/config?fields=version`.

```yaml
targets:
  - id: youtrack-main
    product: youtrack
    address: https://youtrack.example.com
```

## Uwierzytelnianie

Niepotrzebne — potwierdzono na żywo na rzeczywistej, dostępnej
z internetu instancji YouTrack: ten endpoint nie wymaga poświadczeń,
a żądanie jakiegokolwiek pola poza `version` (`buildDate`, `edition`, ...)
jest dla anonimowego wywołującego po cichu ignorowane, zamiast zostać
zwrócone. Jeśli mimo to uwierzytelnianie jest preferowane, akceptowany jest
`bearer`.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:youtrack`.
