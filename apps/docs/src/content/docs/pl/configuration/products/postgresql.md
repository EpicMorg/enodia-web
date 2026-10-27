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

## Baza danych

Sonda prosi o bazę danych `postgres`, którą ma każdy serwer i która
nadaje `CONNECT` wszystkim — więc rola mająca wyłącznie `LOGIN` ujawnia
wersję bez własnej bazy danych. Dla serwera bez bazy `postgres` należy
wskazać inną w `options.database`:

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
    options:
      database: inventory
```

:::caution[Zmiana w wersji 2.2.1]
Do wersji 2.2.0 włącznie sonda prosiła o bazę danych nazwaną tak jak
użytkownik logujący się, więc rola służąca tylko do logowania kończyła
się błędem `database "<user>" does not exist`. Cel, który na tym polegał,
musi teraz wskazać swoją bazę danych w `options.database`.
:::

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/). Od wersji 2.2 `cve.postgresql.path`
dodaje własne strony bezpieczeństwa projektu, które podają poprawkę dla
każdej wersji głównej: dla wersji głównej wymienionej na zapisanych
stronach ich werdykt zastępuje zakresy BDU bez podziału na gałęzie,
które w przeciwnym razie oznaczają najnowsze wydanie każdej starszej
wersji głównej. Zobacz [Własne dane dostawców → PostgreSQL](/pl/cve/#postgresql).

## Resolver cyklu życia

`endoflife:postgresql`.
