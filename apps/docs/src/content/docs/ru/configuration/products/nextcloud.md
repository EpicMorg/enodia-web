---
title: Nextcloud
description: Настройка enodia для опроса Nextcloud.
---

Читает `GET /status.php` для получения версии — эндпоинт для проверки
живости балансировщиком нагрузки, доступный ещё до выполнения setup и
во время включённого режима обслуживания.

```yaml
targets:
  - id: nextcloud-main
    product: nextcloud
    address: https://nextcloud.example.com
```

## Аутентификация

Отсутствует — эндпоинт не принимает никакого credential.

## Какое поле версии используется

Записывается `versionstring` (например, `34.0.3`), а не `version`
(например, `34.0.3.2`) — подтверждено вживую: именно `versionstring`
используют циклы [endoflife.date](https://endoflife.date/nextcloud) для
`latest`, а внутренний четвёртый компонент из `version` в календаре
жизненного цикла не встречается вообще никогда.

## Записываемые поля

- `version` — из `versionstring`
- `extra.installed`, `extra.maintenance` — `"true"`/`"false"`
- `extra.buildVersion` — необработанное поле `version`, сохранено для
  справки

## Резолвер жизненного цикла

`endoflife:nextcloud`.
