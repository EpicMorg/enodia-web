---
title: Ghost
description: Konfiguracja enodia do sondowania produktu Ghost.
---

Odczytuje `GET /ghost/api/admin/site/` — jedyny endpoint Admin API, który
Ghost serwuje bez sesji i klucza (aplikacja administracyjna odczytuje go
przed zalogowaniem) — i pobiera `site.version`. Domyślnym schematem jest
`https`.

```yaml
targets:
  - id: ghost-main
    product: ghost
    address: https://blog.example.com
```

## Publiczne jest tylko major.minor

Potwierdzone na żywo na `ghost:6`: endpoint podał `6.69`, tak samo jak
`<meta name="generator">` i nagłówek `Content-Version`, podczas gdy
zainstalowany pakiet miał wersję 6.69.0. Pełna wersja jest dostępna
dopiero z kluczem Admin API, czyli podpisanym JWT — nowy rodzaj
poświadczenia dla jednej cyfry nie jest tego wart: wydania Ghost niemal
bez wyjątku mają postać `x.y.0`, a `6.69` jest w porównaniu równe tagowi
`v6.69.0`.

## Uwierzytelnianie

Brak — endpoint jest publiczny, a sonda nie przyjmuje żadnego rodzaju
poświadczeń. Od wersji 2.2.0 poświadczenie przypisane do celu `ghost` jest
błędem konfiguracji, a nie jest po cichu ignorowane — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

Tylko `version` — major.minor, np. `6.69`; ta sonda nie zapisuje żadnych
pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:TryGhost/Ghost` — endoflife.date nie ma kalendarza dla Ghost
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub
Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym
(prerelease), bez dat eol/support/lts (GitHub nie ma zdania na temat
polityki cyklu życia, zna tylko „najnowsze wydanie”).
