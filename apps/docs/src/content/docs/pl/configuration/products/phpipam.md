---
title: phpIPAM
description: Konfiguracja enodia do sondowania produktu phpIPAM.
---

Odczytuje anonimowo stronę logowania, `GET /index.php?page=login`.
Domyślnym schematem jest `https`.

```yaml
targets:
  - id: ipam-main
    product: phpipam
    address: https://ipam.example.com
```

## Skąd pochodzi wersja

Stopka strony logowania brzmi `phpIPAM IP address management [v1.8.3]`,
a każdy arkusz stylów i skrypt na niej jest ładowany z `?v=1.8.3_r002_v46` —
własnym prefiksem skryptów phpIPAM: widoczna wersja, rewizja kodu i wersja
schematu bazy danych. Stopka podaje wersję; przyrostek zasobów jest
rozwiązaniem zapasowym, gdy stopka została usunięta przez dostosowanie,
oraz źródłem rewizji i wersji schematu. Starsze wydania ładują zasoby
z samym `?v=1.7.3` (zaobserwowane na produkcyjnym 1.7.3), bez części
z rewizją i schematem — wersja nadal jest odczytywana, a dwa pola `extra`
są wtedy nieobecne. Strona bez żadnego z nich jest zgłaszana jako
nieobsługiwana.

## Uwierzytelnianie

Brak — sonda odczytuje anonimową stronę i nie przyjmuje żadnego rodzaju
poświadczeń. Od wersji 2.2.0 poświadczenie skonfigurowane dla tego celu
jest błędem konfiguracji, a nie jest ignorowane; zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — np. `1.8.3`, z `phpIPAM IP address management [v1.8.3]`
  (potwierdzone na żywo na `phpipam/phpipam-www:latest`)
- `extra.revision` — rewizja kodu z przyrostka zasobów, np. `002`
- `extra.dbVersion` — wersja schematu bazy danych z przyrostka zasobów,
  np. `46`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:phpipam/phpipam` — endoflife.date nie ma kalendarza dla phpIPAM
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub
Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym
(prerelease), bez dat eol/support/lts (GitHub nie ma zdania na temat
polityki cyklu życia, zna tylko „najnowsze wydanie”).
