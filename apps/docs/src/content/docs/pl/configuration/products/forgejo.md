---
title: Forgejo
description: Konfiguracja enodia do sondowania produktu Forgejo.
---

Odczytuje `GET /api/v1/version` — endpoint zgodny z API Gitea, który
Forgejo (fork Gitea) nadal udostępnia pod tą samą ścieżką.

```yaml
targets:
  - id: forgejo-main
    product: forgejo
    address: https://forgejo.example.com
```

## Uwierzytelnianie

Opcjonalne — domyślnie anonimowe. Instancja z ustawionym
`REQUIRE_SIGNIN_VIEW = true` (rzeczywista opcja utwardzania) odpowiada
zamiast tego `403`, co jest obsługiwane tak samo jak żądanie
uwierzytelnienia w każdej innej sondzie. Akceptowane są zarówno `basic`,
jak i `token-header` — dokładny format pól każdego z nich opisano w
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:forgejo`.
