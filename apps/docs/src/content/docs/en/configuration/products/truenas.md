---
title: TrueNAS
description: Configuring enodia to probe TrueNAS.
---

Reads `GET /api/v2.0/system/info`.

```yaml
targets:
  - id: truenas-main
    product: truenas
    address: https://truenas.example.com
    credentials: truenas-key
```

## Authentication — required

Confirmed live against a real TrueNAS 25.10.7 host: this endpoint
answers `401` without credentials. An API key works as a plain bearer
token:

```yaml
credentials:
  truenas-key:
    kind: bearer
    value: "${TRUENAS_API_KEY}"
```

## Not an SSH probe, despite being an appliance OS

An earlier version of this probe read `/etc/version` over SSH instead
(TrueNAS's own `/etc/os-release` reports the underlying Debian base, not
TrueNAS itself — the same identity-file gap
[Astra Linux](/en/configuration/products/astra-linux/) has). Once a real
API target became available to verify against, the HTTP version
replaced the SSH one outright — enodia has no per-product
dual-transport fallback, so the simpler, better-fitting shape wins
rather than the two coexisting.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:truenas`.
