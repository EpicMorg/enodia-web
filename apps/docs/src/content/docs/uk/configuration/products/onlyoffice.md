---
title: ONLYOFFICE Docs
description: Налаштування enodia для опитування ONLYOFFICE Docs.
---

Анонімно читає корінь сервера документів, `GET /index.html`, — він
відповідає навіть з увімкненим JWT: "Server is functioning normally. Version:
9.4.0. Build: 129. Release date: … Package type: 0. …". Потім читає
`GET /welcome/` для перевірки бренду. Схема за замовчуванням — `https`.

```yaml
targets:
  - id: onlyoffice-main
    product: onlyoffice
    address: https://office.example.com
```

## Одна проба, два продукти

ONLYOFFICE Docs і його форк [Euro-Office](/uk/configuration/products/euro-office/)
(у вигляді, що постачається для Nextcloud) — це той самий сервер і одна
спільна проба, але кожен має власну лінійку релізів, тому кожен є окремим
продуктом із власним резолвером — у порівнянні з релізами ONLYOFFICE
актуальний Euro-Office завжди виглядав би відсталим.

`/index.html` на обох виглядає однаково, тому бренд визначається за
заголовком `/welcome/`: "ONLYOFFICE Docs Community Edition" проти
"Euro-Office Docs Community Edition". **Сервер іншого бренду відхиляється із
зазначенням продукту, який слід використати**: `product: onlyoffice`,
спрямований на сервер Euro-Office, завершується помилкою `this document
server is Euro-Office, not ONLYOFFICE — use product: euro-office`, замість
того щоб записати це як факт про ONLYOFFICE (так само, як
[`mysql`](/uk/configuration/products/mysql/) відхиляє MariaDB). Якщо
сторінку привітання вимкнено (404), сервер вважається тим, що вказано в
конфігурації.

Команда `version` сервісу спільного редагування потребує секрету JWT, а
`api.js` не містить версії — звідси `/index.html`.

## Автентифікація

Немає — обидві сторінки публічні, і проба не приймає жодного виду
облікових даних. Починаючи з 2.2.0, облікові дані, привʼязані до цілі
`onlyoffice`, є помилкою конфігурації, а не мовчки ігноруються — див.
[Конфігурація → Облікові дані](/uk/configuration/#облікові-дані).

## Записувані поля

- `version` — напр. `9.4.0`
- `extra.build` — номер збірки, напр. `129`
- `extra.edition` — за типом пакета: `community` (0), `enterprise`
  (1) або `developer` (2)
- `extra.brand` — бренд із заголовка `/welcome/` (`ONLYOFFICE`), якщо
  сторінку привітання ввімкнено

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).
Використовується `onlyoffice:document_server` з NVD — `onlyoffice:server`
означає окремий Community Server.

## Резолвер життєвого циклу

`github:ONLYOFFICE/DocumentServer` — endoflife.date не має календаря
ONLYOFFICE (підтверджено 404), тому резолвінг натомість виконується через
GitHub Releases: лише останній опублікований тег, що не є пре-релізом, без
дат eol/support/lts (GitHub не має позиції щодо політики життєвого циклу,
лише «який реліз останній»).
