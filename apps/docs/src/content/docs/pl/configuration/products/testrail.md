---
title: TestRail
description: Konfiguracja enodia do sondowania produktu TestRail.
---

Odczytuje `GET /version.txt` — zwykły plik statyczny, który TestRail
dostarcza w katalogu głównym serwera WWW, a nie odpowiedź REST API.
Udokumentowane REST API TestRail (`get_current_user` i podobne) wymaga
poświadczeń i w ogóle nie zawiera wersji produktu, dlatego ta sonda
odczytuje zamiast tego plik statyczny.

```yaml
targets:
  - id: testrail-main
    product: testrail
    address: https://testrail.example.com
```

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Rejestrowane pola

Tylko `version` — przycięta zawartość pliku, dokładnie w takiej postaci,
w jakiej jest serwowana.

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

Brak — endoflife.date nie ma kalendarza dla TestRail (potwierdzone 404).
Na razie wyłącznie do inwentarza.
