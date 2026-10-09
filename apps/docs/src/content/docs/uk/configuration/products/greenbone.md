---
title: Greenbone / OpenVAS
description: Налаштування enodia для опитування Greenbone / OpenVAS.
---

Читає версію gsad — вебдемона Greenbone Security Assistant перед OpenVAS —
з `GET /gmp`. Схема за замовчуванням — `https`. `product: openvas` і
`product: gsad` приймаються як псевдоніми.

```yaml
targets:
  - id: greenbone-main
    product: greenbone
    address: https://greenbone.example.com
```

## Чому 401 від `/gmp`

gsad загортає кожну відповідь `/gmp` в обгортку зі своєю версією,
зокрема й 401 на запит без сеансу:
`<envelope><version>24.12.0</version><vendor_version></vendor_version>…`
("Authentication required … (GSA 24.12.0)"). Проба приймає цей 401 і
читає обгортку. Сам вебінтерфейс — статичний бандл React без версії.

Версія належить gsad. Сканер (openvas-scanner) і gvmd за ним мають власні
версії й без входу в систему не видні.

## Автентифікація

Немає — ендпоінт не приймає жодного виду облікових даних.

## Записувані поля

- `version` — напр. `24.12.0`, з `<envelope><version>`
- `extra.vendorVersion` — `<vendor_version>`, якщо не порожнє

## Зіставлення з CVE

Зіставляється з NVD, якщо налаштовано [блок `cve:`](/uk/cve/), — як gsad
(`greenbone_security_assistant`), а не як демон `openvas_manager`.

## Резолвер життєвого циклу

`github:greenbone/gsad` — endoflife.date не має календаря Greenbone
(підтверджено 404), тому резолвінг натомість виконується через GitHub
Releases: лише останній опублікований тег, що не є пре-релізом, без дат
eol/support/lts (GitHub не має позиції щодо політики життєвого циклу, лише
«який реліз останній»).
