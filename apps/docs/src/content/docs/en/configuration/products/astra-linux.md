---
title: Astra Linux
description: Configuring enodia to probe Astra Linux via SSH.
---

Uses the same SSH mechanism, credentials, and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but reads a different file: `/etc/astra_version`, Astra's own
identity file, rather than `/etc/os-release`.

```yaml
targets:
  - id: astra-host
    product: astra-linux
    address: host.example.com
    credentials: linux-host-ssh
```

## Why not `/etc/os-release`

Astra Linux is Debian-based and does carry `/etc/os-release`
(`ID_LIKE=debian`), but its `VERSION_ID` is unusable: confirmed live
(`epicmorg/astralinux:1.7-main` and `:1.8-main`) that it reads
`"1.8_x86-64"` — an architecture suffix baked directly into the version
string. `/etc/astra_version` has none of that: a plain `"1.8.6"`/`"1.7.9"`,
the real point-release Astra itself tracks.

## Recorded fields

- `version` — from `/etc/astra_version`
- `extra.hostKeyVerified`

## Lifecycle resolver

None — endoflife.date has no Astra Linux calendar (confirmed 404 under
`astra`, `astralinux`, and `astra-linux`). Inventory-only.
