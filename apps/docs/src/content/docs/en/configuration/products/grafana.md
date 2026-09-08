---
title: Grafana
description: Configuring enodia to probe Grafana.
---

Reads `GET /api/health` for the version.

```yaml
targets:
  - id: grafana-main
    product: grafana
    address: https://grafana.example.com
```

## Authentication

None — confirmed live, this endpoint answers `200` with a valid body even
with wrong Basic auth credentials. It exists for a load balancer's
liveness check, not as a protected API route, so there's no credentialed
path to offer here.

## Recorded fields

- `version`
- `extra.commit`, `extra.database`

## Lifecycle resolver

`endoflife:grafana`.
