---
title: RED OS
description: Configuring enodia to probe RED OS via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `alrdockerhub/redos:7.3.1` (real RED OS content —
`HOME_URL`/`BUG_REPORT_URL` point at red-soft.ru): `ID="redos"`,
`VERSION_ID="7.3.1"`.

## Lifecycle resolver

None — endoflife.date has no RED OS calendar today. Inventory-only.
