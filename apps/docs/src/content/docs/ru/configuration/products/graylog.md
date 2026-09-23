---
title: Graylog
description: Настройка enodia для опроса Graylog.
---

Читает `GET /api/` — корневой ресурс REST API, публичный документ
обнаружения, на который любая нода Graylog отвечает без credentials.

```yaml
targets:
  - id: graylog-main
    product: graylog
    address: https://graylog.example.com
```

## Аутентификация

Отсутствует — подтверждено вживую на реальном контейнере
`graylog/graylog` (плюс MongoDB и Elasticsearch, от которых он зависит):
корень отвечает анонимно.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`endoflife:graylog`.
