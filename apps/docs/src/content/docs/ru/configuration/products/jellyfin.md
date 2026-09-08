---
title: Jellyfin
description: Настройка enodia для опроса Jellyfin.
---

Читает `GET /System/Info/Public` для получения версии — «публичный»
вариант системного эндпоинта Jellyfin, намеренно доступный ещё до входа
в систему.

```yaml
targets:
  - id: jellyfin-main
    product: jellyfin
    address: https://jellyfin.example.com
```

## Аутентификация

Отсутствует — эндпоинт не принимает никакого credential.

## Проверка личности вендора

Поле `ProductName` из ответа сверяется со строкой `"Jellyfin Server"`.
Тот же ответ содержит и собственный `ServerName` этой установки,
постоянный `Id` инсталляции и `LocalAddress` — ничто из этого не
описывает само программное обеспечение, поэтому читаются только
`Version` и `ProductName`.

## Резолвер жизненного цикла

Отсутствует — у endoflife.date нет календаря для Jellyfin (подтверждено
404). Пока только инвентаризация.
