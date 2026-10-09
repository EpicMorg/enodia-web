---
title: Apache ZooKeeper
description: Configurarea enodia pentru a sonda Apache ZooKeeper.
---

O sondă TCP brută pe portul client, nu HTTP — `address` este `host` sau
`host:port`, fără schemă. Portul implicit este `2181` atunci când este
omis. Trimite cuvântul de patru litere `srvr` și citește răspunsul până
când serverul închide conexiunea.

```yaml
targets:
  - id: zk-01
    product: zookeeper
    address: zk-01.example.com:2181
```

## De ce `srvr`

ZooKeeper 3.5+ permite implicit doar `srvr`
(`4lw.commands.whitelist`): `stat`, `mntr`, `ruok` și celelalte răspund
„is not executed because it is not in the whitelist”. Dacă un server a
eliminat și `srvr` din whitelist, ținta eșuează ca neacceptată.
AdminServer (HTTP, 8080) conține aceleași date, dar adesea nu este
expus; portul client este întotdeauna expus.

## Autentificare

Niciuna — cuvintele de patru litere nu au autentificare.

## Câmpuri înregistrate

- `version` — de exemplu `3.9.6`, din
  `Zookeeper version: 3.9.6-a355171b081b5b60749db8f19cca1528b0df936f, built on 2026-09-03 19:29 UTC`
- `extra.git` — hash-ul git al build-ului, atunci când este prezent
- `extra.mode` — linia `Mode:`, de exemplu `standalone`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:zookeeper`.
