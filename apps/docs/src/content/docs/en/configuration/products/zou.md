---
title: Zou
description: Configuring enodia to probe Zou (CG-Wire API backend).
---

Reads `GET /api/status` for the version — the real API backend behind
CG-Wire's production-tracking stack, commonly known by the brand
[Kitsu](/en/configuration/products/kitsu/), its Vue.js frontend, which has
no version endpoint of its own.

```yaml
targets:
  - id: zou-main
    product: zou
    address: https://kitsu.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Vendor identity check

The response's `name` field is compared against `"Zou"` — the same
reasoning as the Atlassian and Jellyfin probes: naming the product
explicitly in config is supposed to catch a URL pointed at the wrong
service.

## `zou` vs. `kitsu` — same probe, different resolvers, not an alias

`product: kitsu` hits the identical endpoint and probe implementation —
see [its own page](/en/configuration/products/kitsu/) for why the two
are registered as separate products rather than one product with an
alias: `zou`'s own GitHub repo publishes no usable Releases (bare git
tags only, confirmed live), so `product: zou` stays without a resolver
rather than risk comparing against the wrong component's version numbers.

## Recorded fields

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp` — component health flags,
  `"true"`/`"false"`

## Lifecycle resolver

None — `cgwire/zou`'s GitHub repo has no usable Releases to resolve
against (confirmed live: its Releases API returns an empty list — bare
git tags only). If you think of your deployment as "running Kitsu"
rather than "running Zou," `product: kitsu` gets you a real resolver
against `cgwire/kitsu` instead, pointed at this exact same backend.
