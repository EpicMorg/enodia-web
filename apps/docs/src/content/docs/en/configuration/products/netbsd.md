---
title: NetBSD
description: Configuring enodia to probe NetBSD via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but not the os-release group — NetBSD ships no os-release
equivalent at all, so `uname -sr` is the identity source instead. See
the family page for the shared mechanism, credentials, and host key
verification.

```yaml
targets:
  - id: netbsd-host
    product: netbsd
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live via `vmactions/netbsd-vm` (no downloadable pre-installed
image exists otherwise): `uname -sr` → `"NetBSD 11.0"`, with no hostname
in it at all — unlike `uname -a`, which this probe deliberately doesn't
use.

## Lifecycle resolver

`endoflife:netbsd`.
