---
title: Redis
description: Konfiguracja enodia do sondowania produktu Redis.
---

Surowa sonda protokołu RESP, a nie HTTP — `address` to `host` lub
`host:port`, bez schematu. Gdy port zostanie pominięty, domyślnie używany
jest `6379`. Odczytuje `redis_version` z `INFO server`.

```yaml
targets:
  - id: redis-main
    product: redis
    address: cache.example.com:6379
```

## Uwierzytelnianie

Opcjonalne — większość wdrożeń Redis nie ma `requirepass`, a enodia nie
może z góry wiedzieć, czy dane wdrożenie je ma. Cel bez skonfigurowanych
poświadczeń po prostu najpierw próbuje `INFO` i wysyła `AUTH` dopiero
wtedy, gdy serwer faktycznie odrzuci zwykłe żądanie z `NOAUTH`.

```yaml
credentials:
  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  # użytkownik ACL Redis 6+ — należy ustawić również username
  redis-acl-user:
    kind: password
    username: enodia_ro
    password: "${REDIS_PASSWORD}"
```

Błędne lub brakujące hasło, gdy jest wymagane, objawia się błędem
uwierzytelniania (`NOAUTH`/`WRONGPASS`), tak samo jak w każdej innej sondzie
z poświadczeniami.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:redis`.
