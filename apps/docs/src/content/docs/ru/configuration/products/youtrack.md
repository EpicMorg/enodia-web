---
title: YouTrack
description: Настройка enodia для опроса YouTrack.
---

Читает `GET /api/config?fields=version`.

```yaml
targets:
  - id: youtrack-main
    product: youtrack
    address: https://youtrack.example.com
```

## Аутентификация

Не нужна — подтверждено вживую на реальном, доступном из интернета
инстансе YouTrack: этот эндпоинт не требует credentials, а запрос
любого поля кроме `version` (`buildDate`, `edition`, ...) для
анонимного вызова молча игнорируется, а не возвращается. `bearer`
принимается, если вы всё же хотите аутентифицироваться.

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Резолвер жизненного цикла

`endoflife:youtrack`.
