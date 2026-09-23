---
title: Redis
description: Configurarea enodia pentru a sonda Redis.
---

O sondă pe protocolul RESP nativ, nu HTTP — `address` este `host` sau
`host:port`, fără schemă. Portul implicit este `6379` atunci când este
omis. Citește `redis_version` din `INFO server`.

```yaml
targets:
  - id: redis-main
    product: redis
    address: cache.example.com:6379
```

## Autentificare

Opțională — majoritatea instalărilor Redis nu au `requirepass`, iar
enodia nu poate ști dinainte dacă o anumită instalare îl are. O țintă
fără credențiale configurate încearcă mai întâi `INFO` și trimite `AUTH`
doar atunci când serverul respinge efectiv cererea simplă cu `NOAUTH`.

```yaml
credentials:
  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  # utilizator ACL Redis 6+ — setați și username
  redis-acl-user:
    kind: password
    username: enodia_ro
    password: "${REDIS_PASSWORD}"
```

O parolă greșită sau lipsă, atunci când este necesară, apare ca eroare de
autentificare (`NOAUTH`/`WRONGPASS`), la fel ca la orice altă sondă cu
credențiale de aici.

## Câmpuri înregistrate

Doar `version` — această sondă nu înregistrează niciun câmp `extra`.

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:redis`.
