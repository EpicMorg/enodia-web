---
title: OpenSearch
description: Налаштування enodia для опитування OpenSearch.
---

Читає `GET /` — той самий ендпоінт і ту саму структуру відповіді, що й у
[Elasticsearch](/uk/configuration/products/elasticsearch/), оскільки
OpenSearch — це форк Elasticsearch 7.10.2, який майже без змін зберіг
структуру кореневої відповіді.

```yaml
targets:
  - id: opensearch-main
    product: opensearch
    address: https://opensearch.example.com:9200
```

## Перевірка ідентичності вендора

`version.distribution` порівнюється з `"opensearch"` — підтверджено
наживо на реальних контейнерах обох продуктів: справжній Elasticsearch не
має ні цього поля, ні слогана OpenSearch «The OpenSearch Project».
Якщо спрямувати `product: opensearch` на звичайний Elasticsearch, проба
явно завершиться помилкою, а не мовчки видасть версію Elasticsearch за
версію OpenSearch.

## Автентифікація

Необовʼязкова. Модель безпеки повністю збігається з Elasticsearch: свіжому
контейнеру взагалі потрібно задати `OPENSEARCH_INITIAL_ADMIN_PASSWORD`, і
за замовчуванням він відповідає через HTTPS з обовʼязковою Basic-автентифікацією;
з `DISABLE_SECURITY_PLUGIN=true` (справжнє, задокументоване налаштування)
він відповідає на такий самий запит анонімно через звичайний HTTP.

```yaml
credentials:
  opensearch-admin:
    kind: basic
    username: admin
    password: "${OPENSEARCH_PASSWORD}"
```

## Записувані поля

- `version` — з `version.number`
- `extra.clusterName`, `extra.luceneVersion`

## Зіставлення з CVE

Зіставляється з NVD і БДУ ФСТЕК, якщо налаштовано [блок `cve:`](/uk/cve/).

## Резолвер життєвого циклу

`endoflife:opensearch`.
