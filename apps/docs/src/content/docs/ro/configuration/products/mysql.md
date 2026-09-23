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

MariaDB își maschează versiunea reală în spatele unui prefix `5.5.5-`
pentru clienții MySQL anteriori schemei de versionare proprii a MariaDB —
lucru valabil și pe o imagine actuală MariaDB 10.11. `product: mysql`
îndreptat spre un server MariaDB detectează acest lucru și **eșuează
intenționat**, indicând în eroare versiunea reală MariaDB, în loc să o
înregistreze în tăcere ca un fapt MySQL. Nu există încă o sondă dedicată
`mariadb` — aceasta este o oprire fermă, nu ceva de ocolit astăzi cu
[sonda generică](/ro/configuration/products/generic/).

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:mysql`.
