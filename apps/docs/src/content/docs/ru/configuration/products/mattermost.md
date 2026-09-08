---
title: Mattermost
description: Настройка enodia для опроса Mattermost.
---

Читает `GET /api/v4/config/client?format=old` для получения версии —
тот же публичный эндпоинт клиентского конфига, который нужен странице
входа ещё до появления сессии.

```yaml
targets:
  - id: mattermost-main
    product: mattermost
    address: https://mattermost.example.com
```

## Аутентификация

Отсутствует — эндпоинт не принимает никакого credential.

Реальный ответ — это полный дамп клиентского конфига, больше сотни
ключей, включая feature-флаги, цвета кнопок SSO и поля, реально
идентифицирующие конкретную установку (`SiteName`, `SupportEmail`,
telemetry/diagnostic ID, публичный ключ для подписи). Ничто из этого не
описывает само программное обеспечение, поэтому читаются только
`Version` и поля `Build*`.

## Записываемые поля

- `version`
- `extra.buildNumber`, `extra.buildHash`

## Резолвер жизненного цикла

`endoflife:mattermost`.
