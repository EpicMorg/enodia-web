---
title: TestRail
description: Configuring enodia to probe TestRail.
---

Reads `GET /version.txt` — a plain static file TestRail ships in its web
root, not a REST API response. TestRail's own documented REST API
(`get_current_user` and friends) needs credentials and doesn't carry the
product version at all, which is why this probe reads the static file
instead.

```yaml
targets:
  - id: testrail-main
    product: testrail
    address: https://testrail.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Recorded fields

Only `version` — the trimmed file contents, exactly as served.

## Lifecycle resolver

None — endoflife.date has no TestRail calendar (confirmed 404).
Inventory-only for now.
