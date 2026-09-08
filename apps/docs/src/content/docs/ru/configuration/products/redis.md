---
title: Redis
description: Настройка enodia для опроса Redis.
---

Проба на сыром протоколе RESP, не HTTP — `address` это `host` или
`host:port`, без схемы. Порт по умолчанию — `6379`, если не указан.
Читает `redis_version` из `INFO server`.

```yaml
targets:
  - id: redis-main
    product: redis
    address: cache.example.com:6379
```

## Аутентификация

Опционально — у большинства установок Redis не настроен `requirepass`,
и enodia не может заранее знать, настроен ли он у конкретной. Таргет
без настроенного credential сначала просто пробует `INFO`, и только
если сервер отвечает `NOAUTH`, отправляет `AUTH`.

```yaml
credentials:
  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  # ACL-пользователь Redis 6+ — дополнительно укажите username
  redis-acl-user:
    kind: password
    username: enodia_ro
    password: "${REDIS_PASSWORD}"
```

Неверный или отсутствующий пароль, когда он обязателен, проявляется как
ошибка аутентификации (`NOAUTH`/`WRONGPASS`) — так же, как и у любой
другой пробы с credentials.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Резолвер жизненного цикла

`endoflife:redis`.
