---
title: Gentoo Linux
description: Configuring enodia to probe Gentoo Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: gentoo-host
    product: gentoo
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `gentoo/stage3` (the official gentoo.org image):
`ID=gentoo`, `VERSION_ID=2.18` — Gentoo Base System's own release
number, not a distro version in the traditional sense.

## Lifecycle resolver

None — Gentoo is a rolling release, and endoflife.date has no calendar
for it (confirmed 404) for the same reason: there's no discrete version
to track EOL against. Inventory-only.
