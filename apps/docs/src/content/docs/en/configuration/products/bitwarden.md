---
title: Bitwarden
description: Configuring enodia to probe a self-hosted Bitwarden server.
---

Self-hosted only — there's no reason to point this at Bitwarden's own
cloud service. Reads `GET /api/version`, which returns a bare JSON string
(not an object). No credentials needed: client apps use this endpoint to
check server compatibility before login exists.

```yaml
targets:
  - id: bitwarden-main
    product: bitwarden
    address: https://vault.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Not the same product as Vaultwarden

[Vaultwarden](/en/configuration/products/vaultwarden/) is a from-scratch
Rust reimplementation of the Bitwarden server API, not a fork, with its
own independent version numbering. It exposes the identical endpoint and
response shape, but is registered as a separate `product:` — pointing a
Vaultwarden install at `product: bitwarden` would compare the wrong
project's version against the other's release history.

## Lifecycle resolver

`github:bitwarden/server` — endoflife.date has no `bitwarden` calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
