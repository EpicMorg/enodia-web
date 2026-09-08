---
title: Graylog
description: Configuring enodia to probe Graylog.
---

Reads `GET /api/` — the REST API's own root resource, a public discovery
document every Graylog node answers with no credentials.

```yaml
targets:
  - id: graylog-main
    product: graylog
    address: https://graylog.example.com
```

## Authentication

None — confirmed live against a real `graylog/graylog` container (plus
the MongoDB and Elasticsearch it depends on): the root answers
anonymously.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:graylog`.
