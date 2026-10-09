---
title: Euro-Office Docs
description: Налаштування enodia для опитування Euro-Office Docs.
---

Euro-Office Docs — це форк ONLYOFFICE Docs, який постачає Nextcloud
(`nextcloud/aio-eurooffice`). Як і
[ONLYOFFICE Docs](/uk/configuration/products/onlyoffice/), він читається
анонімно з кореня сервера документів, `GET /index.html` —
"Version: 9.3.1. Build: 37. Release date: 2016-06-29…", — після чого
читається `GET /welcome/` для перевірки бренду. Схема за замовчуванням —
`https`.

```yaml
targets:
  - id: eurooffice-main
    product: euro-office
    address: https://office.example.com
```

## Одна проба, два продукти

Euro-Office ділить пробу з
[`onlyoffice`](/uk/configuration/products/onlyoffice/), але має власну
лінійку релізів (Euro-Office/DocumentServer: v9.3.3, v9.3.4,
v9.3.4-hotfix.1), окрему від ONLYOFFICE (v9.3.1, v9.4.0), тому це окремий
продукт із власним резолвером — у порівнянні з релізами ONLYOFFICE
актуальний Euro-Office завжди виглядав би відсталим. Дата релізу на його
`/index.html` — заповнювач; версія ж справжня (власний пакет образу —
`euro-office-documentserver 9.3.1-dev.1`).

`/index.html` на обох виглядає однаково, тому бренд визначається за
заголовком `/welcome/`: "Euro-Office Docs Community Edition" проти
"ONLYOFFICE Docs Community Edition". **Сервер іншого бренду відхиляється із
зазначенням продукту, який слід використати**: `product: euro-office`,
спрямований на сервер ONLYOFFICE, завершується помилкою `this document
server is ONLYOFFICE, not Euro-Office — use product: onlyoffice`. Якщо
сторінку привітання вимкнено (404), сервер вважається тим, що вказано в
конфігурації.

## Автентифікація

Немає — обидві сторінки публічні, і проба не приймає жодного виду
облікових даних. Починаючи з 2.2.0, облікові дані, привʼязані до цілі
`euro-office`, є помилкою конфігурації, а не мовчки ігноруються — див.
[Конфігурація → Облікові дані](/uk/configuration/#облікові-дані).

## Записувані поля

- `version` — напр. `9.3.1`
- `extra.build` — номер збірки, напр. `37`
- `extra.edition` — за типом пакета: `community` (0), `enterprise`
  (1) або `developer` (2)
- `extra.brand` — бренд із заголовка `/welcome/` (`Euro-Office`), якщо
  сторінку привітання ввімкнено

## Зіставлення з CVE

Не зіставляється — жодна з баз не має придатних для цього даних. Див. [Зіставлення з CVE](/uk/cve/#які-продукти-зіставляються).
Це форк без власних записів; записи ONLYOFFICE до нього не застосовуються.

## Резолвер життєвого циклу

`github:Euro-Office/DocumentServer` — endoflife.date не має календаря
Euro-Office (підтверджено 404), тому резолвінг натомість виконується через
GitHub Releases: лише останній опублікований тег, що не є пре-релізом, без
дат eol/support/lts (GitHub не має позиції щодо політики життєвого циклу,
лише «який реліз останній»).
