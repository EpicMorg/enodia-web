---
title: TorrServer
description: Настройка enodia для опроса TorrServer.
---

Читает `GET /echo`, на который TorrServer отвечает своей версией
обычным текстом. Схема по умолчанию — `https`.

```yaml
targets:
  - id: torrserver-main
    product: torrserver
    address: https://torrserver.example.com
```

## Формат версии

`/echo` отвечает, например, `MatriX.146` — кодовое имя и номер, в том
же написании, что и теги релизов TorrServer на GitHub (`MatriX.146`,
`MatriX.145.2`). Версия записывается как есть; при сравнении
используются числа после кодового имени, с обеих сторон. Ответ другого
вида (например, HTML-страница) считается неподдерживаемым.

## Аутентификация

Опционально. Если задан `basic`, он отправляется — для экземпляра с
включённой собственной аутентификацией; без credential запрос
анонимный. `basic` — единственный принимаемый вид: начиная с 2.2.0
любой другой вид — ошибка конфигурации. См.
[Конфигурация → Credentials](/ru/configuration/#credentials).

```yaml
credentials:
  torrserver-auth:
    kind: basic
    username: admin
    password: "${TORRSERVER_PASSWORD}"
```

## Записываемые поля

Только `version` — например, `MatriX.146` (так ответил на `/echo`
реальный `ghcr.io/yourok/torrserver:latest`). Полей `extra` эта проба
не записывает.

## Сопоставление с CVE

Не сопоставляется — ни в одной из баз нет пригодных данных. См.
[Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).

## Резолвер жизненного цикла

`github:YouROK/TorrServer` — у endoflife.date нет календаря для TorrServer
(подтверждено 404), поэтому резолвинг идёт через GitHub Releases:
только последний опубликованный, не pre-release тег, без данных по
eol/support/lts (у GitHub нет мнения о политике жизненного цикла,
только «какой релиз последний»).
