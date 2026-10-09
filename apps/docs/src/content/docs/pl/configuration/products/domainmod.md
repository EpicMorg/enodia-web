---
title: DomainMOD
description: Konfiguracja enodia do sondowania produktu DomainMOD.
---

Odczytuje `GET /CHANGELOG` — plik z listą zmian, który DomainMOD dostarcza
w swoim katalogu głównym WWW i który jest serwowany jako plik statyczny.
Domyślnym schematem jest `https`.

```yaml
targets:
  - id: domainmod-main
    product: domainmod
    address: https://domains.example.com
```

Do DomainMOD zainstalowanego w podścieżce (`DOMAINMOD_WEB_ROOT`) można
dotrzeć, umieszczając tę ścieżkę w adresie, np.
`https://www.example.com/domainmod`.

## Dlaczego CHANGELOG

DomainMOD pokazuje `Version 4.23.0` tylko w stopce układu dla
zalogowanych. CHANGELOG jest anonimowy: zaczyna się od `DomainMOD CHANGELOG`,
linii poziomej, a potem najnowszego wpisu na początku — `v4.23.0     2025-01-04`.
Sonda wymaga tego nagłówka, aby lista zmian innej aplikacji nie została
odczytana jako lista zmian DomainMOD. Serwer WWW blokujący ten plik
sprawia, że cel jest „nieobsługiwany”.

## Uwierzytelnianie

Brak — sonda odczytuje plik statyczny i nie przyjmuje żadnego rodzaju
poświadczeń. Od wersji 2.2.0 poświadczenie skonfigurowane dla tego celu
jest błędem konfiguracji, a nie jest ignorowane; zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

Tylko `version` — np. `4.23.0`, z najnowszego wpisu CHANGELOG
`v4.23.0     2025-01-04` (potwierdzone na żywo na `domainmod/domainmod:latest`,
którego `software.inc.php` zawiera `SOFTWARE_VERSION = '4.23.0'`). Ta sonda
nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:domainmod/domainmod` — endoflife.date nie ma kalendarza dla
DomainMOD (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
