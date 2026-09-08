---
title: NixOS
description: Configuring enodia to probe NixOS via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: nixos-host
    product: nixos
    address: host.example.com
    credentials: linux-host-ssh
```

Verified against a real ISO rootfs capture: `ID=nixos`,
`VERSION_ID="26.05"`. The only Docker Hub image, `nixos/nix`, is just
the Nix package manager running on a non-NixOS base with no
`/etc/os-release` at all — not a usable verification target, which is
why an ISO rootfs capture was used instead.

## Lifecycle resolver

`endoflife:nixos`.
