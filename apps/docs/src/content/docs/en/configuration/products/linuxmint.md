---
title: Linux Mint
description: Configuring enodia to probe Linux Mint via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: mint-host
    product: linuxmint
    address: host.example.com
    credentials: linux-host-ssh
```

Verified against a real ISO rootfs capture: `ID=linuxmint`,
`VERSION_ID="22.3"` — genuinely Mint's own identity, unlike the only
Docker Hub image found (`linuxmintd/mint22-amd64`, Mint's own CI build
chroot), which reports the underlying Ubuntu base instead and would have
been the wrong thing to match against.

## Lifecycle resolver

`endoflife:linuxmint`.
