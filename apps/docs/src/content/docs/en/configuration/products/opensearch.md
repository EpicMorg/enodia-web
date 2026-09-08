---
title: OpenSearch
description: Configuring enodia to probe OpenSearch.
---

Reads `GET /` — the same endpoint and shape as
[Elasticsearch](/en/configuration/products/elasticsearch/), since
OpenSearch is a fork of Elasticsearch 7.10.2 that kept its root response
shape almost unchanged.

```yaml
targets:
  - id: opensearch-main
    product: opensearch
    address: https://opensearch.example.com:9200
```

## Vendor identity check

`version.distribution` is compared against `"opensearch"` — confirmed
live against real containers of both, a real Elasticsearch has neither
this field nor OpenSearch's "The OpenSearch Project" tagline. Pointing
`product: opensearch` at a plain Elasticsearch fails loudly rather than
silently reporting Elasticsearch's version as OpenSearch's.

## Authentication

Optional. Security posture matches Elasticsearch's exactly: a fresh
container needs `OPENSEARCH_INITIAL_ADMIN_PASSWORD` set at all and
answers HTTPS + Basic-auth-required by default; `DISABLE_SECURITY_PLUGIN=true`
(a real, documented setting) answers the identical request anonymously
over plain HTTP.

```yaml
credentials:
  opensearch-admin:
    kind: basic
    username: admin
    password: "${OPENSEARCH_PASSWORD}"
```

## Recorded fields

- `version` — from `version.number`
- `extra.clusterName`, `extra.luceneVersion`

## Lifecycle resolver

`endoflife:opensearch`.
