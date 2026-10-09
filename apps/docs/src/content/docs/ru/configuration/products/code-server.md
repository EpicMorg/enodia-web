---
title: code-server
description: Настройка enodia для опроса code-server.
---

Читает `GET /login` анонимно. Схема по умолчанию — `https`. Страница
входа содержит `<meta id="coder-options" data-settings="{...}">` —
JSON, экранированный под HTML, — и его поле `codeServerVersion` и есть
версия сервера; проба снимает экранирование с атрибута и разбирает JSON.

```yaml
targets:
  - id: code-main
    product: code-server
    address: https://code.example.com
```

## Почему страница входа

Собственный `/version` у code-server требует пароль, а `/healthz` версии
не содержит. Страница входа доступна без входа в систему и несёт те же
параметры, с которыми запускается редактор. Страница без элемента
`coder-options` считается неподдерживаемой (это не code-server).

## Аутентификация

Отсутствует — проба читает анонимную страницу и не принимает ни одного
вида credential. Начиная с 2.2.0 credential, заданный для такого target,
не игнорируется молча, а считается ошибкой конфигурации; см.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

Только `version` — например, `4.141.0` (подтверждено вживую на
`codercom/code-server:latest`, чей `code-server --version` сообщил
4.141.0 с Code 1.141.0). Полей `extra` эта проба не записывает.

## Сопоставление с CVE

Сверяется с NVD, если настроен [блок `cve:`](/ru/cve/).

## Резолвер жизненного цикла

`github:coder/code-server` — у endoflife.date нет календаря для code-server
(подтверждено 404), поэтому резолвинг идёт через GitHub Releases:
только последний опубликованный, не pre-release тег, без данных по
eol/support/lts (у GitHub нет мнения о политике жизненного цикла,
только «какой релиз последний»).
