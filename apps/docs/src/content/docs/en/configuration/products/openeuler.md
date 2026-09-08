---
title: openEuler
description: Configuring enodia to probe openEuler via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: openeuler-host
    product: openeuler
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live via `vmactions/openeuler-vm` (24.03-LTS-SP4, the action's
default release): `ID="openEuler"` — **capital E, confirmed live, not
lowercase** — and `VERSION_ID="24.03"`.

## Lifecycle resolver

None — endoflife.date has no openEuler calendar today. Inventory-only.
