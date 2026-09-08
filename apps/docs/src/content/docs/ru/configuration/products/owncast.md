---
title: Owncast
description: Настройка enodia для опроса Owncast.
---

Читает `GET /api/status` для получения версии.

```yaml
targets:
  - id: owncast-main
    product: owncast
    address: https://owncast.example.com
```

## Аутентификация

Отсутствует — этот маршрут не оборачивается никаким auth-мидлваром в
собственном коде Owncast, подтверждено на живом контейнере
`owncast/owncast:latest`.

## Записываемые поля

- `version` — из `versionNumber`
- `extra.online` — `"true"`/`"false"`

## Резолвер жизненного цикла

`github:owncast/owncast` — у endoflife.date нет календаря для Owncast
(подтверждено 404), поэтому резолвинг идёт через GitHub Releases:
только последний опубликованный, не pre-release тег, без данных по
eol/support/lts (у GitHub нет мнения о политике жизненного цикла,
только «какой релиз последний»).
