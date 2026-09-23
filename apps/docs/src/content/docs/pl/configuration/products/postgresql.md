---
title: PostgreSQL
description: Konfiguracja enodia do sondowania produktu PostgreSQL.
---

Surowa sonda protokołu przewodowego (wire protocol), a nie HTTP —
`address` to `host` lub `host:port`, bez schematu. Gdy port zostanie
pominięty, domyślnie używany jest `5432`. Jako alias dla `postgresql`
akceptowany jest również `product: postgres`.

Wersja pochodzi z komunikatu `ParameterStatus`, który każdy backend
PostgreSQL wysyła automatycznie tuż po udanym uwierzytelnieniu — bez
potrzeby jawnego zapytania `SHOW server_version`.

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
```

## Uwierzytelnianie

Wymagane tylko wtedy, gdy serwer faktycznie o nie prosi — uwierzytelnianie
trust w ogóle nie potrzebuje poświadczeń. Gdy serwer o nie prosi,
**obsługiwane są trust, cleartext, MD5 i SCRAM-SHA-256, negocjowane
automatycznie** — w tym SCRAM-SHA-256, domyślny w PostgreSQL 14+
i popularny w wersjach 10-13, bez którego większość rzeczywistych wdrożeń
byłaby nieosiągalna.

```yaml
credentials:
  pg-app:
    kind: password
    username: enodia_ro   # opcjonalne — domyślnie "postgres", jeśli pominięte
    password: "${PG_PASSWORD}"
```

Baza danych, z którą następuje połączenie, domyślnie ma tę samą nazwę co
użytkownik (domyślne ustawienie po stronie serwera) — obecnie nie ma pola
konfiguracji pozwalającego jawnie wskazać inną nazwę bazy danych.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:postgresql`.
