---
title: Graylog
description: Налаштування enodia для опитування Graylog.
---

Читає `GET /api/` — власний кореневий ресурс REST API, публічний
документ виявлення, на який кожен вузол Graylog відповідає без облікових
даних.

```yaml
targets:
  - id: graylog-main
    product: graylog
    address: https://graylog.example.com
```

## Автентифікація

Немає — підтверджено наживо на реальному контейнері `graylog/graylog`
(разом із MongoDB і Elasticsearch, від яких він залежить): корінь
відповідає анонімно.

## Записувані поля

Лише `version` — ця проба не записує полів `extra`.

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:graylog`.
