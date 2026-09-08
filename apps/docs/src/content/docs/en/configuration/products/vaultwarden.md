---
title: Vaultwarden
description: Configuring enodia to probe Vaultwarden.
---

Reads `GET /api/version`, which returns a bare JSON string (not an
object) — the identical endpoint and response shape as
[Bitwarden](/en/configuration/products/bitwarden/) itself. No credentials
needed: client apps use this endpoint to check server compatibility
before login exists.

```yaml
targets:
  - id: vaultwarden-main
    product: vaultwarden
    address: https://vault.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Not the same product as Bitwarden

Vaultwarden is a from-scratch Rust reimplementation of Bitwarden's server
API, not a fork — it has its own independent version numbering that
doesn't track Bitwarden's releases. It's registered as a distinct
`product:` for exactly that reason: comparing a Vaultwarden install's
version against a `bitwarden`-labeled lifecycle calendar would be
comparing two unrelated numbering schemes.

## Lifecycle resolver

`github:dani-garcia/vaultwarden` — endoflife.date has no `vaultwarden`
calendar (confirmed 404), so this resolves against GitHub Releases
instead: the latest published, non-prerelease tag only, with no
eol/support/lts dates (GitHub has no opinion on lifecycle policy, only
"what's the latest release").
