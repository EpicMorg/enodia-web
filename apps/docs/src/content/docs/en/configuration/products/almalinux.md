---
title: AlmaLinux
description: Configuring enodia to probe AlmaLinux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: almalinux-host
    product: almalinux
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `docker.io/almalinux:9`: `ID=almalinux`,
`VERSION_ID="9.8"`.

## Lifecycle resolver

`endoflife:almalinux`.
