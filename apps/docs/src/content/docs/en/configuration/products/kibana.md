---
title: Kibana
description: Configuring enodia to probe Kibana.
---

Reads `GET /api/status` — deliberately unauthenticated by design (it's
what orchestrators use as a liveness/readiness probe; the official
Elastic Helm chart's own readiness probe curls this exact path with no
credentials).

```yaml
targets:
  - id: kibana-main
    product: kibana
    address: https://kibana.example.com
```

## Authentication

None. Confirmed live against a real `docker.elastic.co/kibana/kibana`
container (backed by a real Elasticsearch): the reply carries the full
version even while Kibana is still starting up and answering `503` for
"not ready yet" — the body already has it regardless of status code.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:kibana`.
