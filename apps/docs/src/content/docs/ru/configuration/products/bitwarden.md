---
title: Bitwarden
description: Настройка enodia для опроса самостоятельно размещённого сервера Bitwarden.
---

Только для self-hosted — нет смысла указывать сюда облачный сервис
самого Bitwarden. Читает `GET /api/version`, который возвращает голую
JSON-строку (не объект). Credentials не нужны: клиентские приложения
используют этот эндпоинт для проверки совместимости с сервером ещё до
того, как появляется сессия.

```yaml
targets:
  - id: bitwarden-main
    product: bitwarden
    address: https://vault.example.com
```

## Аутентификация

Отсутствует — эндпоинт не принимает никакого credential.

## Это не тот же продукт, что Vaultwarden

[Vaultwarden](/ru/configuration/products/vaultwarden/) — это
переписанная с нуля на Rust реализация серверного API Bitwarden, а не
форк, с собственной независимой нумерацией версий. Она отдаёт
идентичный эндпоинт и форму ответа, но зарегистрирована как отдельный
`product:` — указание установки Vaultwarden как `product: bitwarden`
сравнило бы версию не того проекта с историей релизов другого.

## Резолвер жизненного цикла

`github:bitwarden/server` — у endoflife.date нет календаря `bitwarden`
(подтверждено 404), поэтому резолвинг идёт через GitHub Releases:
только последний опубликованный, не pre-release тег, без данных по
eol/support/lts (у GitHub нет мнения о политике жизненного цикла,
только «какой релиз последний»).
