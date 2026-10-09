---
title: MySQL
description: Configurarea enodia pentru a sonda MySQL Server.
---

Un protocol TCP nativ, nu HTTP — `address` este `host` sau `host:port`,
fără schema `https://`/`http://` (nu există nimic de semnalat în privința
unei scheme lipsă; consultați [Configurare](/ro/configuration/#targets)).
Portul implicit este `3306` atunci când este omis.

Nu se trimite niciodată vreo cerere: MySQL își anunță versiunea din
proprie inițiativă, în pachetul inițial de handshake, înaintea oricărui
pas de autentificare — așa că această sondă nu are niciodată nevoie de o
credențială pentru a o observa.

```yaml
targets:
  - id: mysql-main
    product: mysql
    address: db.example.com:3306
```

## Autentificare

Niciuna — versiunea este citită direct din handshake, înainte de momentul
în care o credențială ar conta măcar.

## MariaDB este un produs diferit

Versiunea din handshake trădează MariaDB: MariaDB 10.x o maschează în
spatele unui prefix `5.5.5-` pentru clienții MySQL vechi
(`5.5.5-10.11.19-MariaDB-ubu2204`), iar MariaDB 11.0+ o trimite fără
mască, dar etichetată (`11.4.13-MariaDB-ubu2404`). `product: mysql`
îndreptat spre un server MariaDB detectează oricare dintre forme și
**eșuează intenționat**, indicând în eroare versiunea reală MariaDB, în
loc să o înregistreze în tăcere ca un fapt MySQL. Începând cu 2.1,
MariaDB are propria sondă — folosiți
[`product: mariadb`](/ro/configuration/products/mariadb/) pentru ea.

:::caution[MariaDB 11.0+ înainte de 2.1.1]
Până la 2.1.0 inclusiv era recunoscută doar masca `5.5.5-`, așa că un
server MariaDB 11.0+ din spatele unei ținte `product: mysql` era
înregistrat **ca MySQL** și verificat față de ciclul de viață MySQL.
Începând cu 2.1.1, o astfel de țintă eșuează în schimb — schimbați-o în
`product: mariadb`.
:::

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:mysql`.
