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

Отсутствует — у endoflife.date нет календаря для Owncast (подтверждено
404). Пока только инвентаризация.
