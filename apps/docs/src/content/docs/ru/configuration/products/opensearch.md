---
title: OpenSearch
description: Настройка enodia для опроса OpenSearch.
---

Читает `GET /` — тот же эндпоинт и та же форма ответа, что и у
[Elasticsearch](/ru/configuration/products/elasticsearch/), поскольку
OpenSearch — форк Elasticsearch 7.10.2, сохранивший форму корневого
ответа почти без изменений.

```yaml
targets:
  - id: opensearch-main
    product: opensearch
    address: https://opensearch.example.com:9200
```

## Проверка личности вендора

Поле `version.distribution` сверяется со строкой `"opensearch"` —
подтверждено вживую на реальных контейнерах обоих: у настоящего
Elasticsearch нет ни этого поля, ни слогана OpenSearch «The OpenSearch
Project». Если `product: opensearch` указать на обычный Elasticsearch,
проба громко откажет вместо того, чтобы молча сообщить версию
Elasticsearch как версию OpenSearch.

## Аутентификация

Опционально. Модель безопасности полностью совпадает с Elasticsearch:
свежий контейнер требует установленного в принципе
`OPENSEARCH_INITIAL_ADMIN_PASSWORD` и по умолчанию отвечает по HTTPS с
обязательной Basic-аутентификацией; `DISABLE_SECURITY_PLUGIN=true`
(реальная, документированная настройка) отвечает на тот же запрос
анонимно по обычному HTTP.

```yaml
credentials:
  opensearch-admin:
    kind: basic
    username: admin
    password: "${OPENSEARCH_PASSWORD}"
```

## Записываемые поля

- `version` — из `version.number`
- `extra.clusterName`, `extra.luceneVersion`

## Резолвер жизненного цикла

`endoflife:opensearch`.
