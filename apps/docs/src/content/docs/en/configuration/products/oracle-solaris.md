---
title: Oracle Solaris
description: Configuring enodia to probe Oracle Solaris via SSH.
---

Uses the same SSH mechanism, credentials, and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but reads `/etc/release` rather than an os-release file or
`uname -sr`.

```yaml
targets:
  - id: solaris-host
    product: oracle-solaris
    address: host.example.com
    credentials: linux-host-ssh
```

## Why not `uname -sr`

Unlike OpenBSD/NetBSD, `uname -sr` doesn't work here: on Solaris it only
ever reports the SunOS kernel version (`"SunOS 5.11"` for every
Solaris 11.x release — SunOS versioning is decoupled from the product
version), so it can't tell 11.3 from 11.4 apart. `/etc/release`'s own
`"Oracle Solaris 11.4 X86"` line carries the real one.

No downloadable image is obtainable without an Oracle account/OTN
license, so this was verified via `vmactions/solaris-vm`, which builds
and republishes Oracle's own free-to-redistribute Solaris 11.4 CBE
(Common Build Environment, meant for exactly this kind of CI use).

## Recorded fields

- `version` — parsed from `/etc/release`
- `extra.hostKeyVerified`

## Lifecycle resolver

`endoflife:oracle-solaris`.
