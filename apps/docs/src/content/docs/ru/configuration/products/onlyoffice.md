---
title: ONLYOFFICE Docs
description: Настройка enodia для опроса ONLYOFFICE Docs.
---

Читает корень сервера документов, `GET /index.html`, анонимно — он
отвечает даже при включённом JWT: «Server is functioning normally.
Version: 9.4.0. Build: 129. Release date: … Package type: 0. …». Затем
читает `GET /welcome/`, чтобы проверить бренд. Схема по умолчанию —
`https`.

```yaml
targets:
  - id: onlyoffice-main
    product: onlyoffice
    address: https://office.example.com
```

## Одна проба, два продукта

ONLYOFFICE Docs и его форк [Euro-Office](/ru/configuration/products/euro-office/)
(в том виде, в каком он поставляется для Nextcloud) — один и тот же
сервер с общей пробой, но у каждого своя линейка релизов, поэтому каждый
— отдельный продукт со своим резолвером: при сравнении с релизами
ONLYOFFICE актуальный Euro-Office всегда выглядел бы отстающим.

`/index.html` у обоих выглядит одинаково, поэтому бренд берётся из
заголовка `/welcome/`: «ONLYOFFICE Docs Community Edition» или
«Euro-Office Docs Community Edition». **Сервер другого бренда
отклоняется с указанием продукта, который нужно использовать**:
`product: onlyoffice`, указанный на сервер Euro-Office, завершается
ошибкой `this document server is Euro-Office, not ONLYOFFICE — use
product: euro-office`, а не записывается как факт про ONLYOFFICE (так же,
как [`mysql`](/ru/configuration/products/mysql/) отклоняет MariaDB). Если
страница приветствия отключена (404), сервер считается тем, что указано
в конфиге.

Команда `version` сервиса совместного редактирования требует JWT-секрет,
а `api.js` версии не содержит, — поэтому используется `/index.html`.

## Аутентификация

Отсутствует — обе страницы публичные, и проба не принимает ни одного вида
credential. Начиная с 2.2.0 credential, привязанный к таргету
`onlyoffice`, — это ошибка конфигурации, а не молча игнорируемая
настройка; см. [Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

- `version` — например `9.4.0`
- `extra.build` — номер сборки, например `129`
- `extra.edition` — по типу пакета: `community` (0), `enterprise` (1)
  или `developer` (2)
- `extra.brand` — бренд из заголовка `/welcome/` (`ONLYOFFICE`), если
  страница приветствия включена

## Сопоставление с CVE

Сверяется с NVD и БДУ ФСТЭК, если настроен [блок `cve:`](/ru/cve/).
Используется `onlyoffice:document_server` из NVD — `onlyoffice:server`
относится к отдельному продукту Community Server.

## Резолвер жизненного цикла

`github:ONLYOFFICE/DocumentServer` — у endoflife.date нет календаря для
ONLYOFFICE (подтверждено 404), поэтому резолвинг идёт через GitHub
Releases: только последний опубликованный, не pre-release тег, без
данных по eol/support/lts (у GitHub нет мнения о политике жизненного
цикла, только «какой релиз последний»).
