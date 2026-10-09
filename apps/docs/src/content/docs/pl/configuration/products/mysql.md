---
title: MySQL
description: Konfiguracja enodia do sondowania produktu MySQL Server.
---

Surowy protokół TCP, a nie HTTP — `address` to `host` lub `host:port`, bez
schematu `https://`/`http://` (nie ma tu brakującego schematu, przed którym
trzeba by ostrzegać; zobacz [Konfiguracja](/pl/configuration/#targets)).
Gdy port zostanie pominięty, domyślnie używany jest `3306`.

Żadne żądanie nie jest nigdy wysyłane: MySQL sam ogłasza swoją wersję
w początkowym pakiecie handshake, przed jakimkolwiek krokiem
uwierzytelniania — więc ta sonda nigdy nie potrzebuje poświadczeń, aby ją
zaobserwować.

```yaml
targets:
  - id: mysql-main
    product: mysql
    address: db.example.com:3306
```

## Uwierzytelnianie

Brak — wersja jest odczytywana bezpośrednio z handshake, zanim
poświadczenia w ogóle miałyby znaczenie.

## MariaDB to inny produkt

MariaDB zdradza wersja w handshake: MariaDB 10.x maskuje ją prefiksem
`5.5.5-` na potrzeby starych klientów MySQL
(`5.5.5-10.11.19-MariaDB-ubu2204`), a MariaDB 11.0+ wysyła ją bez maski,
ale oznaczoną (`11.4.13-MariaDB-ubu2404`). `product: mysql` wskazany na
serwer MariaDB wykrywa każdą z tych postaci i **celowo kończy się
błędem**, podając w komunikacie prawdziwą wersję MariaDB, zamiast po
cichu zapisać ją jako fakt o MySQL. Od wersji 2.1 MariaDB ma własną
sondę — należy dla niej użyć
[`product: mariadb`](/pl/configuration/products/mariadb/).

:::caution[MariaDB 11.0+ przed wersją 2.1.1]
Do wersji 2.1.0 włącznie rozpoznawana była tylko maska `5.5.5-`, więc
serwer MariaDB 11.0+ za celem `product: mysql` był zapisywany **jako
MySQL** i sprawdzany względem cyklu życia MySQL. Od wersji 2.1.1 taki
cel zamiast tego kończy się błędem — należy przełączyć go na
`product: mariadb`.
:::

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:mysql`.
