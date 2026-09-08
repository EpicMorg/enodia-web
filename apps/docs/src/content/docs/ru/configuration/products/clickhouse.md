---
title: ClickHouse
description: Настройка enodia для опроса ClickHouse.
---

Выполняет `SELECT version()` через HTTP-интерфейс ClickHouse (порт 8123
по умолчанию) и читает ответ в виде обычного текста.

```yaml
targets:
  - id: clickhouse-main
    product: clickhouse
    address: https://clickhouse.example.com:8123
```

## Аутентификация

Опционально. Свежие образы требуют, чтобы `CLICKHOUSE_PASSWORD` был
установлен в принципе — пустого пароля пользователя по умолчанию,
на который можно было бы откатиться, как в старых установках, больше
нет — поэтому неаутентифицированный запрос к защищённому инстансу
получает обычный `401`, обрабатываемый так же, как и у любой другой
пробы:

```yaml
credentials:
  clickhouse-default:
    kind: basic
    username: default
    password: "${CLICKHOUSE_PASSWORD}"
```

Нужны ли credentials конкретной установке — целиком зависит от того,
как она настроена.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Резолвер жизненного цикла

`endoflife:clickhouse`.
