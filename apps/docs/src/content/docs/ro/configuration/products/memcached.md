---
title: memcached
description: Configurarea enodia pentru a sonda memcached.
---

O sondă TCP brută pe protocolul text, nu HTTP — `address` este `host` sau
`host:port`, fără schemă. Portul implicit este `11211` atunci când este
omis. Trimite `version` și citește răspunsul de o linie, `VERSION 1.6.45`.

```yaml
targets:
  - id: memcached-01
    product: memcached
    address: cache.example.com:11211
```

## Autentificare

Niciuna — protocolul text nu are autentificare. Un server pornit cu SASL
(`-S`) vorbește doar protocolul binar și răspunde la comanda text cu o
eroare; aceasta este raportată ca neacceptată, în loc să fie ghicită.

## Câmpuri înregistrate

Doar `version` — de exemplu `1.6.45`. Această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:memcached`.
