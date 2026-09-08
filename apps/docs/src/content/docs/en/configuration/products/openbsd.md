---
title: OpenBSD
description: Configuring enodia to probe OpenBSD via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but not the os-release group — OpenBSD ships no os-release
equivalent at all, so `uname -sr` is the identity source instead. See
the family page for the shared mechanism, credentials, and host key
verification.

```yaml
targets:
  - id: openbsd-host
    product: openbsd
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live via `vmactions/openbsd-vm` (no downloadable pre-installed
image exists otherwise): `uname -sr` → `"OpenBSD 7.9"`, with no hostname
in it at all — unlike `uname -a`, which this probe deliberately doesn't
use.

## Lifecycle resolver

`endoflife:openbsd`.
