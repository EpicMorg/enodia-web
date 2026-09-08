---
title: Jellyfin
description: Configuring enodia to probe Jellyfin.
---

Reads `GET /System/Info/Public` for the version — the "Public" variant of
Jellyfin's system-info endpoint, intentionally reachable before login
exists.

```yaml
targets:
  - id: jellyfin-main
    product: jellyfin
    address: https://jellyfin.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Vendor identity check

The response's `ProductName` is compared against `"Jellyfin Server"`. The
same response also carries this deployment's own `ServerName`, a
persistent install `Id`, and its `LocalAddress` — none of that describes
the software itself, so only `Version` and `ProductName` are read.

## Lifecycle resolver

`github:jellyfin/jellyfin` — endoflife.date has no Jellyfin calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
