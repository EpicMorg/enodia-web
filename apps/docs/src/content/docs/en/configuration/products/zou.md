---
title: Zou
description: Configuring enodia to probe Zou (CG-Wire / Kitsu backend).
---

"Kitsu" is the commonly known brand for CG-Wire's production-tracking
stack, but Kitsu itself is a Vue.js frontend with no version endpoint of
its own. What actually answers `GET /api/status` — confirmed live,
including on a host literally named "kitsu" in DNS — is **Zou**, the API
backend Kitsu talks to. `product: kitsu` is accepted as an alias for
anyone reaching for the name they know the stack by; both resolve to the
same probe.

```yaml
targets:
  - id: kitsu-main
    product: zou   # or: kitsu
    address: https://kitsu.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Vendor identity check

The response's `name` field is compared against `"Zou"` — the same
reasoning as the Atlassian and Jellyfin probes: naming the product
explicitly in config is supposed to catch a URL pointed at the wrong
service.

## Recorded fields

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp` — component health flags,
  `"true"`/`"false"`

## Lifecycle resolver

None — endoflife.date has no calendar under `zou`, `kitsu`, or `cg-wire`
(all confirmed 404). Inventory-only for now.
