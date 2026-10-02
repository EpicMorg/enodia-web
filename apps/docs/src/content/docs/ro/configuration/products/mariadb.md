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

MariaDB și MySQL folosesc un handshake identic și diferă doar printr-un
detaliu: MariaDB își prefixează versiunea cu masca de compatibilitate
`5.5.5-` pentru clienții MySQL vechi (confirmat live, încă valabil pe
MariaDB 10.11). Această sondă cere această mască și o elimină — îndreptată
spre un server MySQL real, eșuează în loc să înregistreze un fapt greșit,
imaginea în oglindă a modului în care
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
