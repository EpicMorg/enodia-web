---
title: PostgreSQL
description: Настройка enodia для опроса PostgreSQL.
---

Проба на сыром wire-протоколе, не HTTP — `address` это `host` или
`host:port`, без схемы. Порт по умолчанию — `5432`, если не указан.
`product: postgres` тоже принимается как алиас `postgresql`.

Версия берётся из сообщения `ParameterStatus`, которое любой backend
PostgreSQL отправляет автоматически сразу после успешной
аутентификации — явный запрос `SHOW server_version` не нужен.

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
```

## Аутентификация

Требуется, только если сервер сам её запрашивает — trust-аутентификация
вообще обходится без credential. Когда сервер её запрашивает,
**поддерживаются и автоматически согласуются trust, cleartext, MD5 и
SCRAM-SHA-256** — включая SCRAM-SHA-256, метод по умолчанию на
PostgreSQL 14+ и часто встречающийся на 10-13, без которого большинство
реальных установок были бы недостижимы.

```yaml
credentials:
  pg-app:
    kind: password
    username: enodia_ro   # опционально — по умолчанию "postgres"
    password: "${PG_PASSWORD}"
```

База данных, к которой идёт подключение, по умолчанию совпадает со
значением username (серверный дефолт) — отдельного поля конфига, чтобы
явно указать другое имя базы, сейчас нет.

## Резолвер жизненного цикла

`endoflife:postgresql`.
