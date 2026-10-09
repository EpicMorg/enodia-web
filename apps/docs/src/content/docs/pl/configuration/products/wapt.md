---
title: WAPT
description: Konfiguracja enodia do sondowania produktu WAPT.
---

Odczytuje `GET /ping` serwera WAPT (Tranquil IT), serwowany bez sesji.

```yaml
targets:
  - id: wapt-main
    product: wapt
    address: https://wapt.example.com
```

## Która wersja jest zgłaszana

`/ping` zawiera zarówno `version` (`1.8.2`), jak i `git_hash`
(`1.8.2.7334-2d15afd9-debian-10-amd64`), który zaczyna się od pełnego
numeru kompilacji. Gdy ten numer kompilacji rozszerza `version`, jest
zgłaszany zamiast niego — `1.8.2.7334`, a nie `1.8.2`. Potwierdzone na
żywo na produkcyjnym serwerze WAPT 1.8.2.

## Uwierzytelnianie

Brak — endpoint nie przyjmuje żadnego rodzaju poświadczeń.

## Rejestrowane pola

- `version` — np. `1.8.2.7334`
- `extra.edition` — np. `community`
- `extra.apiVersion` — np. `v3`
- `extra.gitHash` — np. `1.8.2.7334-2d15afd9-debian-10-amd64`

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

Z uwzględnieniem edycji: własna edycja WAPT (`community`/`enterprise`)
jest już zapisana słowami NVD i jest przekazywana bez zmian. Każda inna
wartość jest traktowana jako nieznana edycja, co zachowuje wszystkie
znaleziska.

## Resolver cyklu życia

Brak — WAPT nie ma strony na endoflife.date (potwierdzone 404), a tagi
Tranquil IT na GitHubie kończą się na 1.5; wydania są publikowane na ich
własnej witrynie, której żaden tutejszy resolver nie odczytuje. Wyłącznie
do inwentarza.
