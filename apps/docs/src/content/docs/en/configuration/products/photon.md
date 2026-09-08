---
title: VMware Photon OS
description: Configuring enodia to probe VMware Photon OS via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: photon-host
    product: photon
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against the official top-level `photon:5.0` image (Docker's
Official Images program — not `vmware/photon`'s own repo, which stops at
2.0): `ID=photon`, `VERSION_ID=5.0`.

## Lifecycle resolver

`endoflife:photon`.
