---
title: Redis
description: Налаштування enodia для опитування Redis.
---

Проба на сирому протоколі RESP, а не HTTP — `address` має вигляд `host` або
`host:port`, без схеми. Якщо порт не вказано, використовується `6379`.
Читає `redis_version` з `INFO server`.

```yaml
targets:
  - id: redis-main
    product: redis
    address: cache.example.com:6379
```

## Автентифікація

Необовʼязкова — більшість розгортань Redis не мають `requirepass`, а enodia
не може заздалегідь знати, чи є він у конкретному. Ціль без налаштованих
облікових даних спочатку просто пробує `INFO` і надсилає `AUTH` лише тоді,
коли сервер справді відхиляє звичайний запит із `NOAUTH`.

```yaml
credentials:
  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  # ACL-користувач Redis 6+ — задайте також username
  redis-acl-user:
    kind: password
    username: enodia_ro
    password: "${REDIS_PASSWORD}"
```

Неправильний або відсутній пароль, коли він потрібен, проявляється як
помилка автентифікації (`NOAUTH`/`WRONGPASS`), так само як і в будь-якої
іншої проби з обліковими даними.

## Записувані поля

Лише `version` — ця проба не записує полів `extra`.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:redis`.
