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
Vaultwarden install at `product: bitwarden` would compare its version
against the wrong lifecycle calendar the moment either product gets one.

## Lifecycle resolver

None — endoflife.date has no calendar under either `bitwarden` or
`vaultwarden` (both confirmed 404). Inventory-only for now.
