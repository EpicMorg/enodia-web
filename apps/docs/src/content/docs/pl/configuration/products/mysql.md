---
title: MySQL
description: Konfiguracja enodia do sondowania produktu MySQL Server.
---

Surowy protokół TCP, a nie HTTP — `address` to `host` lub `host:port`, bez
schematu `https://`/`http://` (nie ma tu brakującego schematu, przed którym
trzeba by ostrzegać; zobacz [Konfiguracja](/pl/configuration/#targets)).
Gdy port zostanie pominięty, domyślnie używany jest `3306`.

MySQL sam ogłasza swoją wersję w początkowym pakiecie handshake, przed
jakimkolwiek krokiem uwierzytelniania — więc ta sonda nigdy nie
potrzebuje poświadczeń, aby ją zaobserwować.

```yaml
targets:
  - id: mysql-main
    product: mysql
    address: db.example.com:3306
```

## Uwierzytelnianie

Brak — wersja jest odczytywana bezpośrednio z handshake, zanim
poświadczenia w ogóle miałyby znaczenie.

## Blokowanie hosta (ERR 1129)

Od wersji 2.2.1 sonda odpowiada na powitanie jednorazowym logowaniem
(nazwa użytkownika `enodia`, bez hasła) i odczytuje odmowę serwera. Do
wersji 2.2.0 włącznie rozłączała się zaraz po powitaniu, co serwer liczy
jako połączenie przerwane przed uwierzytelnieniem; wystarczająco wiele
takich połączeń z jednego hosta przekracza `max_connect_errors`, a serwer
odrzuca wtedy ten host komunikatem `ERR 1129 Host '…' is blocked` —
każdego klienta na nim, nie tylko enodia. Odrzucone logowanie liczy się
natomiast jako nieudane uwierzytelnienie, które nie przyczynia się do
blokady. Tam, gdzie serwer rejestruje nieudane logowania, każdy przebieg
zostawia wiersz `Access denied for user 'enodia'`. Jeśli wersja 2.2.0
już doprowadziła do zablokowania hosta, należy go odblokować poleceniem
`FLUSH HOSTS` (MySQL 8.0 przyjmuje też
`TRUNCATE TABLE performance_schema.host_cache`).

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
