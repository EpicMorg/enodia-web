---
title: LibreTranslate
description: Настройка enodia для опроса LibreTranslate.
---

Читает `GET /spec` — собственный документ OpenAPI (Swagger 2.0) этого
API, который публичен даже там, где для перевода нужен API-ключ. Схема
по умолчанию — `https`.

```yaml
targets:
  - id: translate-main
    product: libretranslate
    address: https://translate.example.com
```

## Проверка личности вендора

`info.version` — это версия сервера. Проба также требует, чтобы
`info.title` был равен `"LibreTranslate"`, — чтобы документ Swagger
другого сервиса не был принят за документ LibreTranslate.

## Аутентификация

Отсутствует — `/spec` публичен, и проба не принимает ни одного вида
credential (API-ключ нужен только для перевода, а проба ничего не
переводит). Начиная с 2.2.0 credential, заданный для такого target, не игнорируется молча,
а считается ошибкой конфигурации; см.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

Только `version` — например, `1.9.6`, из `info.version` (подтверждено
вживую на `libretranslate/libretranslate:latest`, релиз v1.9.6). Полей
`extra` эта проба не записывает.

## Сопоставление с CVE

Не сопоставляется — ни в одной из баз нет пригодных данных. См.
[Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).

## Резолвер жизненного цикла

`github:LibreTranslate/LibreTranslate` — у endoflife.date нет календаря для LibreTranslate
(подтверждено 404), поэтому резолвинг идёт через GitHub Releases:
только последний опубликованный, не pre-release тег, без данных по
eol/support/lts (у GitHub нет мнения о политике жизненного цикла,
только «какой релиз последний»).
