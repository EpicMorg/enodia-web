---
title: FreeBSD
description: Configuring enodia to probe FreeBSD via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification.

```yaml
targets:
  - id: freebsd-host
    product: freebsd
    address: host.example.com
    credentials: linux-host-ssh
```

## The one product in this family reading a different path

Every other product in this family reads `/etc/os-release`; FreeBSD is
the exception. FreeBSD generates `/var/run/os-release` itself,
dynamically, at boot (`/etc/rc.d/os-release`) — in the exact same
`KEY=VALUE` shape Linux distributions ship statically at `/etc/os-release`.
Verified live via QEMU (FreeBSD's own official cloud qcow2 — no Docker
image exists for FreeBSD): `ID=freebsd`, `VERSION_ID="15.1"`.

## Lifecycle resolver

`endoflife:freebsd`.
