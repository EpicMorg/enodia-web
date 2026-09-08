---
title: Kitsu
description: Configuring enodia to probe Kitsu (CG-Wire's production-tracking frontend).
---

"Kitsu" is the commonly known brand for CG-Wire's production-tracking
stack, but Kitsu itself is a Vue.js frontend with **no version endpoint
of its own**. What actually answers `GET /api/status` — confirmed live,
including on a host literally named "kitsu" in DNS — is
[Zou](/en/configuration/products/zou/), the API backend Kitsu talks to.
Point `address` at that same backend, exactly as you would for `product:
zou` — there is no separate "Kitsu" URL to configure.

```yaml
targets:
  - id: kitsu-main
    product: kitsu
    address: https://kitsu.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Why `kitsu` is a separate product from `zou`, not an alias

Both point at the identical Zou backend and endpoint, but they need
**different lifecycle resolvers**: `cgwire/zou`'s own GitHub repo
publishes bare git tags only (confirmed live — its Releases API returns
an empty list), which enodia's GitHub Releases resolver can't read at
all. `cgwire/kitsu` has real GitHub Releases, and is what a deployment
that thinks of itself as "running Kitsu" actually wants tracked. The two
repos' version numbers genuinely diverge (Zou's backend runs ahead of
Kitsu's), so comparing under the more "technically precise" `zou` name
would silently compare against the wrong component's numbers — hence two
registered products sharing one probe implementation, not one product
with an alias.

## Recorded fields

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp` — component health flags,
  `"true"`/`"false"`

## Lifecycle resolver

`github:cgwire/kitsu` — latest GitHub release only; no eol/support/lts
data (GitHub has no opinion on lifecycle policy, only "what's the latest
tag").
