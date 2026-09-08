---
title: Elasticsearch
description: Настройка enodia для опроса Elasticsearch.
---

Читает `GET /` для получения версии.

```yaml
targets:
  - id: es-main
    product: elasticsearch
    address: https://es.example.com:9200
```

## Аутентификация

Опционально. Начиная с Elasticsearch 8.0 безопасность (HTTPS плюс Basic/
Bearer/ApiKey аутентификация) включена по умолчанию — анонимный запрос
получает `401` со всеми тремя предложенными схемами. Basic auth с
суперпользователем `elastic` — единственная реально проверенная и
предлагаемая здесь схема:

```yaml
credentials:
  es-elastic:
    kind: basic
    username: elastic
    password: "${ES_PASSWORD}"
```

Кластер, запущенный с `xpack.security.enabled=false` — реальная,
документированная настройка — отвечает на тот же запрос анонимно по
обычному HTTP с идентичным телом; в этом случае credential не требуется
вовсе.

## Записываемые поля

- `version` — из `version.number`
- `extra.clusterName`, `extra.luceneVersion`, `extra.buildHash`

## Резолвер жизненного цикла

`endoflife:elasticsearch`.
