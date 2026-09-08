---
title: Grafana
description: Настройка enodia для опроса Grafana.
---

Читает `GET /api/health` для получения версии.

```yaml
targets:
  - id: grafana-main
    product: grafana
    address: https://grafana.example.com
```

## Аутентификация

Отсутствует — подтверждено на реальном сервере: этот эндпоинт отвечает
`200` с валидным телом даже при неверных Basic auth credentials. Он
существует для проверки живости балансировщиком нагрузки, а не как
защищённый API-маршрут, так что предлагать здесь какой-либо credential
нет смысла.

## Записываемые поля

- `version`
- `extra.commit`, `extra.database`

## Резолвер жизненного цикла

`endoflife:grafana`.
