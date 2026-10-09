---
title: Apache ZooKeeper
description: Konfiguracja enodia do sondowania produktu Apache ZooKeeper.
---

Surowa sonda TCP na porcie klienta, a nie HTTP — `address` to `host` lub
`host:port`, bez schematu. Gdy port zostanie pominięty, domyślnie używany
jest `2181`. Wysyła czteroliterowe polecenie `srvr` i odczytuje odpowiedź,
dopóki serwer nie zamknie połączenia.

```yaml
targets:
  - id: zk-01
    product: zookeeper
    address: zk-01.example.com:2181
```

## Dlaczego `srvr`

ZooKeeper 3.5+ domyślnie dopuszcza tylko `srvr`
(`4lw.commands.whitelist`): `stat`, `mntr`, `ruok` i pozostałe odpowiadają
„is not executed because it is not in the whitelist”. Jeśli serwer usunął
z białej listy również `srvr`, cel kończy się błędem jako nieobsługiwany.
AdminServer (HTTP, 8080) zawiera te same dane, ale często nie jest
wystawiony; port klienta jest wystawiony zawsze.

## Uwierzytelnianie

Brak — czteroliterowe polecenia nie mają uwierzytelniania.

## Rejestrowane pola

- `version` — np. `3.9.6`, z
  `Zookeeper version: 3.9.6-a355171b081b5b60749db8f19cca1528b0df936f, built on 2026-09-03 19:29 UTC`
- `extra.git` — hash git kompilacji, jeśli występuje
- `extra.mode` — wiersz `Mode:`, np. `standalone`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:zookeeper`.
