---
title: Debian
description: Configuring enodia to probe Debian via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: debian-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `debian:bookworm-slim`: `ID=debian`,
`VERSION_ID="12"`.

## Lifecycle resolver

`endoflife:debian`.
