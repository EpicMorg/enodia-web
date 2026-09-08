---
title: Portainer
description: Configuring enodia to probe Portainer.
---

Reads `GET /api/system/status` for the version (the older `/api/status`
alias answers identically, but this probe always uses the current path).

```yaml
targets:
  - id: portainer-main
    product: portainer
    address: https://portainer.example.com
```

## Authentication

None — the endpoint is intentionally public, reachable before the
mandatory first-run admin account has even been created.

## Recorded fields

- `version`
- `extra.instanceId`

## Lifecycle resolver

None — endoflife.date has no Portainer calendar (confirmed 404).
Inventory-only for now.
