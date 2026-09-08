---
title: Vaultwarden
description: Настройка enodia для опроса Vaultwarden.
---

Читает `GET /api/version`, который возвращает голую JSON-строку (не
объект) — тот же эндпоинт и та же форма ответа, что и у самого
[Bitwarden](/ru/configuration/products/bitwarden/). Credentials не
нужны: клиентские приложения используют этот эндпоинт для проверки
совместимости с сервером ещё до того, как появляется сессия.

```yaml
targets:
  - id: vaultwarden-main
    product: vaultwarden
    address: https://vault.example.com
```

## Аутентификация

Отсутствует — эндпоинт не принимает никакого credential.

## Это не тот же продукт, что Bitwarden

Vaultwarden — это переписанная с нуля на Rust реализация серверного API
Bitwarden, а не форк — у неё собственная независимая нумерация версий,
которая не следует релизам Bitwarden. Именно поэтому она
зарегистрирована как отдельный `product:`: сравнивать версию установки
Vaultwarden с календарём жизненного цикла, помеченным `bitwarden`,
означало бы сравнивать две несвязанные схемы нумерации.

## Резолвер жизненного цикла

`github:dani-garcia/vaultwarden` — у endoflife.date нет календаря
`vaultwarden` (подтверждено 404), поэтому резолвинг идёт через GitHub
Releases: только последний опубликованный, не pre-release тег, без
данных по eol/support/lts (у GitHub нет мнения о политике жизненного
цикла, только «какой релиз последний»).
