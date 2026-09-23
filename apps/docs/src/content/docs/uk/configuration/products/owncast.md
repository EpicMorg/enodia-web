---
title: Owncast
description: Налаштування enodia для опитування Owncast.
---

Читає версію з `GET /api/status`.

```yaml
targets:
  - id: owncast-main
    product: owncast
    address: https://owncast.example.com
```

## Автентифікація

Немає — у власному коді Owncast цей маршрут не має проміжного ПЗ, що
вимагало б автентифікації; підтверджено на живому контейнері
`owncast/owncast:latest`.

## Записувані поля

- `version` — з `versionNumber`
- `extra.online` — `"true"`/`"false"`

## Зіставлення з CVE

Зіставляється з NVD, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`github:owncast/owncast` — endoflife.date не має календаря Owncast
(підтверджено 404), тому резолвінг натомість виконується через GitHub
Releases: лише останній опублікований тег, що не є пре-релізом, без дат
eol/support/lts (GitHub не має позиції щодо політики життєвого циклу, лише
«який реліз останній»).
