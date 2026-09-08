---
title: Portainer
description: Настройка enodia для опроса Portainer.
---

Читает `GET /api/system/status` для получения версии (более старый алиас
`/api/status` отвечает идентично, но эта проба всегда использует
актуальный путь).

```yaml
targets:
  - id: portainer-main
    product: portainer
    address: https://portainer.example.com
```

## Аутентификация

Отсутствует — эндпоинт намеренно публичный, доступен ещё до создания
обязательной учётной записи администратора при первом запуске.

## Записываемые поля

- `version`
- `extra.instanceId`

## Резолвер жизненного цикла

Отсутствует — у endoflife.date нет календаря для Portainer (подтверждено
404). Пока только инвентаризация.
