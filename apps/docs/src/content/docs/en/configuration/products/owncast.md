---
title: Owncast
description: Configuring enodia to probe Owncast.
---

Reads `GET /api/status` for the version.

```yaml
targets:
  - id: owncast-main
    product: owncast
    address: https://owncast.example.com
```

## Authentication

None — the route carries no auth-requiring middleware in Owncast's own
source, confirmed against a live `owncast/owncast:latest` container.

## Recorded fields

- `version` — from `versionNumber`
- `extra.online` — `"true"`/`"false"`

## Lifecycle resolver

None — endoflife.date has no Owncast calendar (confirmed 404).
Inventory-only for now.
