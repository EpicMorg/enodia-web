---
title: Rocky Linux
description: Configuring enodia to probe Rocky Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: rocky-host
    product: rocky-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `rockylinux:9`: `ID="rocky"` — Rocky's own
os-release `ID` value, distinct from the `product:` name — and
`VERSION_ID="9.3"`.

## Lifecycle resolver

`endoflife:rocky-linux`.
