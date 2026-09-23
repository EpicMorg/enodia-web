---
title: Generic
description: Konfiguracja generycznej sondy enodia dla systemów wewnętrznych lub nieobsługiwanych.
---

Wyjście awaryjne dla wszystkiego, co nie ma dedykowanej sondy — ręcznie
napisany blok `parser:` zamiast wkompilowanej logiki w Go. Pełny opis pól,
zamrożony słownik `json`/`xml`/`header`/`plaintext`/`regex` oraz uwaga
o pisowni pola `clean_regex` znajdują się w
[Konfiguracja → Sonda generyczna](/pl/configuration/#sonda-generyczna);
ta strona istnieje tylko po to, by `generic` pojawiał się na pasku bocznym
obok pozostałych 89 produktów.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex
      regex: 'v(\d+\.\d+\.\d+)'
```

## Uwierzytelnianie

Akceptowane są `none`, `bearer`, `token-header` i `basic` — zależnie od tego,
czego faktycznie wymaga dana usługa wewnętrzna.

## Korelacja CVE

Brak dopasowania — ręcznie napisany parser nie ma tożsamości produktu, według której można by wyszukać CVE. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — ręcznie przygotowany cel z definicji nie ma kalendarza, który
można by sprawdzić. Brakuje produktu na liście 89 dedykowanych
sond? Na stronie [Obsługiwane produkty](/pl/products/#nie-ma-tu-potrzebnego-produktu)
opisano dwie drogi: to wyjście awaryjne albo zgłoszenie prośby o prawdziwą
sondę.
