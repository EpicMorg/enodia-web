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

MariaDB maskuje swoją prawdziwą wersję prefiksem `5.5.5-` na potrzeby
klientów MySQL starszych niż własny schemat wersjonowania MariaDB — nadal
dotyczy to aktualnego obrazu MariaDB 10.11. `product: mysql` wskazany na
serwer MariaDB wykrywa to i **celowo kończy się błędem**, podając
w komunikacie prawdziwą wersję MariaDB, zamiast po cichu zapisać ją jako
fakt o MySQL. Nie ma jeszcze dedykowanej sondy `mariadb` — to twarda
blokada, a nie coś, co dziś można obejść za pomocą
[sondy generycznej](/pl/configuration/products/generic/).

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:mysql`.
