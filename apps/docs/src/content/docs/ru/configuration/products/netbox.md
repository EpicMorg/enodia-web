---
title: NetBox
description: Настройка enodia для опроса NetBox.
---

Читает анонимную страницу входа, `GET /login/`, корневой элемент которой
содержит `data-netbox-version` — например, `4.3.3-Docker-3.3.0` у NetBox,
запущенного из netbox-docker. Если атрибута нет, используется версия, с
которой страница загружает свой бандл (`/static/netbox.js?v=4.3.3`).
Схема по умолчанию — `https`.

```yaml
targets:
  - id: netbox-main
    product: netbox
    address: https://netbox.example.com
```

## Почему страница входа

REST API NetBox (`/api/status/`) требует токен, а страница входа содержит
версию без него (подтверждено вживую на production-NetBox из
netbox-docker). Часть до `-Docker-` — собственная версия NetBox, остаток —
версия образа netbox-docker.

## Аутентификация

Отсутствует — страница входа публичная, и проба не принимает ни одного вида credential.
Начиная с 2.2.0 credential, привязанный к таргету `netbox`, — это ошибка
конфигурации, а не молча игнорируемая настройка; см.
[Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

- `version` — версия NetBox, например `4.3.3`
- `extra.netboxDocker` — версия образа netbox-docker (`3.3.0`), только
  если у `data-netbox-version` есть суффикс `-Docker-`

## Сопоставление с CVE

Сверяется с NVD, если настроен [блок `cve:`](/ru/cve/).
«LenelS2 NetBox» из БДУ — другой продукт и не используется.

## Резолвер жизненного цикла

`github:netbox-community/netbox` — у endoflife.date нет календаря для NetBox
(подтверждено 404), поэтому резолвинг идёт через GitHub Releases:
только последний опубликованный, не pre-release тег, без данных по
eol/support/lts (у GitHub нет мнения о политике жизненного цикла,
только «какой релиз последний»).
