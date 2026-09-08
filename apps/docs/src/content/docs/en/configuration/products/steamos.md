---
title: SteamOS
description: Configuring enodia to probe SteamOS via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: steamos-host
    product: steamos
    address: host.example.com
    credentials: linux-host-ssh
```

Verified against a real ISO rootfs capture of SteamOS 2 (Debian-based,
codename "brewmaster"): `ID=steamos`, `VERSION_ID="2"`. SteamOS 3.x
(Arch-based, the current Steam Deck OS, codename "holo") is expected to
share the same `ID=steamos` — Valve's own branding is consistent across
the rewrite — but this hasn't been confirmed live yet, only 2.x has; the
plain `ID=steamos` match covers both without needing to special-case
either.

## Lifecycle resolver

`endoflife:steamos`.
