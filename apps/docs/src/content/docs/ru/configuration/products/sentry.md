---
title: Sentry
description: Настройка enodia для опроса Sentry.
---

Читает анонимную страницу входа self-hosted Sentry, `GET /auth/login/`
(она перенаправляет на страницу входа единственной организации). Каждая
страница встраивает `window.__initialData = {...}`, и его
`version.current` — это версия. Схема по умолчанию — `https`.

```yaml
targets:
  - id: sentry-main
    product: sentry
    address: https://sentry.example.com
```

## Почему страница входа

Подтверждено вживую, анонимно, на production self-hosted 26.2.1. В том же
объекте `version` есть и поле `latest` — собственная проверка обновлений
Sentry, — которое **не** используется: при выключенной проверке оно было
устаревшим (`21.7.0`). Корень API `/api/0/` тоже анонимен, но его
`"version": "0"` — версия API, а не сервера; `/api/0/internal/health/`
требует аутентификации.

## Аутентификация

Отсутствует — страница входа публичная, и проба не принимает ни одного вида credential.
Начиная с 2.2.0 credential, привязанный к таргету `sentry`, — это ошибка
конфигурации, а не молча игнорируемая настройка; см.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

- `version` — из `version.current`, например `26.2.1`
- `extra.build` — git-коммит из `version.build`
- `extra.mode` — `sentryMode`, например `SELF_HOSTED`

## Сопоставление с CVE

Сверяется с NVD, если настроен [блок `cve:`](/ru/cve/).
Записи БДУ «Sentry» относятся к SDK, а не к серверу, и не используются.

## Резолвер жизненного цикла

`github:getsentry/self-hosted` — у endoflife.date нет календаря для Sentry
(подтверждено 404), поэтому резолвинг идёт через GitHub Releases:
только последний опубликованный, не pre-release тег, без данных по
eol/support/lts (у GitHub нет мнения о политике жизненного цикла,
только «какой релиз последний»).
Теги релизов getsentry/self-hosted (`26.8.0`, `26.9.0`, …) — это версии
сервера, которые он устанавливает.
