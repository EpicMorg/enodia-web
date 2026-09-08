---
title: Forgejo
description: Настройка enodia для опроса Forgejo.
---

Читает `GET /api/v1/version` — совместимый с API Gitea эндпоинт,
который Forgejo (форк Gitea) всё ещё поставляет по тому же пути.

```yaml
targets:
  - id: forgejo-main
    product: forgejo
    address: https://forgejo.example.com
```

## Аутентификация

Опционально — по умолчанию анонимно. Инстанс с включённым
`REQUIRE_SIGNIN_VIEW = true` (реальная настройка hardening) отвечает
вместо этого `403`, что обрабатывается так же, как и любой другой
auth-вызов у других проб. Принимаются и `basic`, и `token-header` — точную
форму полей каждого из них см. в
[Конфигурации → Credentials](/ru/configuration/#credentials).

## Записываемые поля

Только `version` — эта проба не записывает никаких полей `extra`.

## Резолвер жизненного цикла

`endoflife:forgejo`.
