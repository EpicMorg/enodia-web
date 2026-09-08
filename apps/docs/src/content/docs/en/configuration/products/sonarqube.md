---
title: SonarQube
description: Configuring enodia to probe SonarQube.
---

Reads `GET /api/system/status` for the version.

```yaml
targets:
  - id: sonarqube-main
    product: sonarqube
    address: https://sonarqube.example.com
```

## Authentication

None — this endpoint (along with `/api/server/version` and
`/api/system/ping`) stays reachable without credentials even after
enabling SonarQube's "Force user authentication" global setting.
SonarQube treats it as a health-check route a load balancer needs to
reach with no login, not a normal protected API.

## Recorded fields

- `version`
- `extra.id`
- `extra.status` — one of `UP`, `DOWN`, `STARTING`, `RESTARTING`,
  `DB_MIGRATION_NEEDED`, `DB_MIGRATION_RUNNING`; a fact about server
  health recorded as-is, not turned into an error when it isn't `UP`

## Lifecycle resolver

`endoflife:sonarqube-community` — the Community Edition calendar
specifically; there's no separate resolver mapping for Developer/
Enterprise/Datacenter editions.
