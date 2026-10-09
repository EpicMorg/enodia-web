---
title: Euro-Office Docs
description: Настройка enodia для опроса Euro-Office Docs.
---

Euro-Office Docs — форк ONLYOFFICE Docs, который поставляет Nextcloud
(`nextcloud/aio-eurooffice`). Как и
[ONLYOFFICE Docs](/ru/configuration/products/onlyoffice/), он читается
анонимно из корня сервера документов, `GET /index.html` — «Version:
9.3.1. Build: 37. Release date: 2016-06-29…», — затем читается
`GET /welcome/`, чтобы проверить бренд. Схема по умолчанию — `https`.

```yaml
targets:
  - id: eurooffice-main
    product: euro-office
    address: https://office.example.com
```

## Одна проба, два продукта

Euro-Office использует общую пробу с
[`onlyoffice`](/ru/configuration/products/onlyoffice/), но у него своя
линейка релизов (Euro-Office/DocumentServer: v9.3.3, v9.3.4,
v9.3.4-hotfix.1), отдельная от линейки ONLYOFFICE (v9.3.1, v9.4.0),
поэтому это отдельный продукт со своим резолвером: при сравнении с
релизами ONLYOFFICE актуальный Euro-Office всегда выглядел бы отстающим.
Дата релиза в его `/index.html` — заглушка, а версия настоящая (пакет в
самом образе — `euro-office-documentserver 9.3.1-dev.1`).

`/index.html` у обоих выглядит одинаково, поэтому бренд берётся из
заголовка `/welcome/`: «Euro-Office Docs Community Edition» или
«ONLYOFFICE Docs Community Edition». **Сервер другого бренда
отклоняется с указанием продукта, который нужно использовать**:
`product: euro-office`, указанный на сервер ONLYOFFICE, завершается
ошибкой `this document server is ONLYOFFICE, not Euro-Office — use
product: onlyoffice`. Если страница приветствия отключена (404), сервер
считается тем, что указано в конфиге.

## Аутентификация

Отсутствует — обе страницы публичные, и проба не принимает ни одного вида
credential. Начиная с 2.2.0 credential, привязанный к таргету
`euro-office`, — это ошибка конфигурации, а не молча игнорируемая
настройка; см. [Конфигурация → Credentials](/ru/configuration/#credentials).

## Записываемые поля

- `version` — например `9.3.1`
- `extra.build` — номер сборки, например `37`
- `extra.edition` — по типу пакета: `community` (0), `enterprise` (1)
  или `developer` (2)
- `extra.brand` — бренд из заголовка `/welcome/` (`Euro-Office`), если
  страница приветствия включена

## Сопоставление с CVE

Не сопоставляется — ни в одной из баз нет пригодных данных. См. [Сопоставление с CVE](/ru/cve/#какие-продукты-сопоставляются).
Это форк без собственных записей; записи ONLYOFFICE к нему не
применяются.

## Резолвер жизненного цикла

`github:Euro-Office/DocumentServer` — у endoflife.date нет календаря для
Euro-Office (подтверждено 404), поэтому резолвинг идёт через GitHub
Releases: только последний опубликованный, не pre-release тег, без
данных по eol/support/lts (у GitHub нет мнения о политике жизненного
цикла, только «какой релиз последний»).
