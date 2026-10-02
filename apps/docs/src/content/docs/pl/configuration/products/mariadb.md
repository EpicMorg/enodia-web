---
title: MariaDB
description: Konfiguracja enodia do sondowania produktu MariaDB Server.
---

Surowy protokół TCP, a nie HTTP — `address` to `host` lub `host:port`,
bez schematu. Gdy port zostanie pominięty, domyślnie używany jest
`3306`. Ten sam handshake co w [MySQL](/pl/configuration/products/mysql/):
MariaDB sama ogłasza swoją wersję w początkowym pakiecie handshake,
przed jakimkolwiek krokiem uwierzytelniania, więc ta sonda nigdy nie
potrzebuje poświadczeń.

```yaml
targets:
  - id: mariadb-main
    product: mariadb
    address: db.example.com:3306
```

## Uwierzytelnianie

Brak — wersja jest odczytywana bezpośrednio z handshake.

## Weryfikacja tożsamości producenta

MariaDB i MySQL używają identycznego handshake i różnią się tylko jednym
szczegółem: MariaDB poprzedza swoją wersję maską zgodności `5.5.5-` na
potrzeby starych klientów MySQL (potwierdzone na żywo, nadal dotyczy to
MariaDB 10.11). Ta sonda wymaga tej maski i ją usuwa — wskazana na
prawdziwy serwer MySQL kończy się błędem, zamiast zapisać nieprawdziwy
fakt; to lustrzane odbicie tego, jak
[`mysql`](/pl/configuration/products/mysql/#mariadb-to-inny-produkt)
odrzuca serwer MariaDB.

## Rejestrowane pola

- `version` — wersja liczbowa, np. `10.11.19`
- `extra.tag` — następujący po niej znacznik dostawcy, np.
  `MariaDB-ubu2204`, jeśli występuje

## Korelacja CVE

Jeszcze bez dopasowania — MariaDB jest nowa w 2.1, a upstream odłożył jej
mapowanie CVE na późniejszy, osobny etap. Zobacz stronę
[Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:mariadb`.
