---
title: Elasticsearch
description: Налаштування enodia для опитування Elasticsearch.
---

Читає версію з `GET /`.

```yaml
targets:
  - id: es-main
    product: elasticsearch
    address: https://es.example.com:9200
```

## Автентифікація

Необовʼязкова. Починаючи з Elasticsearch 8.0, захист (HTTPS плюс
автентифікація Basic/Bearer/ApiKey) увімкнено за замовчуванням — анонімний
запит отримує `401` з переліком усіх трьох схем. Basic-автентифікація із
суперкористувачем `elastic` — єдина схема, яку тут справді перевірено й
запропоновано:

```yaml
credentials:
  es-elastic:
    kind: basic
    username: elastic
    password: "${ES_PASSWORD}"
```

Кластер, запущений з `xpack.security.enabled=false` — справжнім
задокументованим параметром, — відповідає на той самий запит анонімно
через звичайний HTTP з ідентичним тілом; у цьому разі облікові дані не
потрібні.

## Записувані поля

- `version` — з `version.number`
- `extra.clusterName`, `extra.luceneVersion`, `extra.buildHash`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:elasticsearch`.
