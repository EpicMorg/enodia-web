---
title: Elasticsearch
description: Configuring enodia to probe Elasticsearch.
---

Reads `GET /` for the version.

```yaml
targets:
  - id: es-main
    product: elasticsearch
    address: https://es.example.com:9200
```

## Authentication

Optional. Since Elasticsearch 8.0, security (HTTPS plus Basic/Bearer/
ApiKey auth) is on by default — an anonymous request gets a `401`
advertising all three schemes. Basic auth with the `elastic` superuser is
the one scheme actually exercised and offered here:

```yaml
credentials:
  es-elastic:
    kind: basic
    username: elastic
    password: "${ES_PASSWORD}"
```

A cluster started with `xpack.security.enabled=false` — a real,
documented setting — answers the same request anonymously over plain
HTTP with an identical body; no credential is required in that case.

## Recorded fields

- `version` — from `version.number`
- `extra.clusterName`, `extra.luceneVersion`, `extra.buildHash`

## Lifecycle resolver

`endoflife:elasticsearch`.
