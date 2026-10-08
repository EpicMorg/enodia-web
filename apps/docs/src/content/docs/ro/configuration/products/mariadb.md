---
title: MariaDB
description: Configurarea enodia pentru a sonda MariaDB Server.
---

Un protocol TCP nativ, nu HTTP — `address` este `host` sau `host:port`,
fără schemă. Portul implicit este `3306` atunci când este omis. Același
handshake ca la [MySQL](/ro/configuration/products/mysql/): MariaDB își
anunță versiunea din proprie inițiativă, în pachetul inițial de
handshake, înaintea oricărui pas de autentificare, așa că această sondă
nu are niciodată nevoie de o credențială.

```yaml
targets:
  - id: mariadb-main
    product: mariadb
    address: db.example.com:3306
```

## Autentificare

Niciuna — versiunea este citită direct din handshake.

## Verificarea identității producătorului

MariaDB și MySQL folosesc un handshake identic și diferă doar prin șirul
de versiune, care vine în două forme, ambele confirmate live:

- **MariaDB 10.x** își maschează versiunea în spatele unui prefix de
  compatibilitate `5.5.5-` pentru clienții MySQL vechi:
  `5.5.5-10.11.19-MariaDB-ubu2204`. Masca este eliminată.
- **MariaDB 11.0+** a renunțat la mască: `11.4.13-MariaDB-ubu2404`,
  `12.3.3-MariaDB-ubu2404`. `-MariaDB` din versiune este atunci singurul
  semnal. Recunoscut începând cu 2.1.1 — 2.1.0 refuza aceste servere.

Oricare dintre cele două forme este acceptată. Îndreptată spre un server
MySQL real, a cărui versiune nu are niciuna dintre ele, sonda eșuează în
loc să înregistreze un fapt greșit, imaginea în oglindă a modului în care
[`mysql`](/ro/configuration/products/mysql/#mariadb-este-un-produs-diferit)
refuză un server MariaDB.

## Câmpuri înregistrate

- `version` — versiunea numerică, de exemplu `10.11.19`
- `extra.tag` — eticheta producătorului care urmează după ea, de exemplu
  `MariaDB-ubu2204`, atunci când este prezentă

## Corelare CVE

Încă nu se corelează — MariaDB este nou în 2.1, iar în amonte maparea
sa CVE a fost lăsată pentru o etapă ulterioară, dedicată. Consultați
[Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:mariadb`.
