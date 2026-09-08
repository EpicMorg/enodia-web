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

`github:owncast/owncast` — endoflife.date has no Owncast calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
