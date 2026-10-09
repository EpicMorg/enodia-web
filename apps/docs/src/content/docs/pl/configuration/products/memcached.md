---
title: memcached
description: Konfiguracja enodia do sondowania produktu memcached.
---

Surowa sonda TCP na protokole tekstowym, a nie HTTP — `address` to `host`
lub `host:port`, bez schematu. Gdy port zostanie pominięty, domyślnie
używany jest `11211`. Wysyła `version` i odczytuje jednowierszową
odpowiedź, `VERSION 1.6.45`.

```yaml
targets:
  - id: memcached-01
    product: memcached
    address: cache.example.com:11211
```

## Uwierzytelnianie

Brak — protokół tekstowy nie ma uwierzytelniania. Serwer uruchomiony
z SASL (`-S`) mówi tylko protokołem binarnym i odpowiada na polecenie
tekstowe błędem; jest to zgłaszane jako nieobsługiwane, zamiast być
zgadywane.

## Rejestrowane pola

Tylko `version` — np. `1.6.45`. Ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:memcached`.
