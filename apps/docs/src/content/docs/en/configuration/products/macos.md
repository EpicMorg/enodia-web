---
title: macOS
description: Configuring enodia to probe macOS via SSH.
---

Uses the same SSH mechanism, credentials, and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but runs `sw_vers` — the standard, documented way to read a
Mac's OS identity — rather than reading a file.

```yaml
targets:
  - id: mac-host
    product: macos
    address: host.example.com
    credentials: linux-host-ssh
```

## Why `sw_vers`, not `uname -a`

Darwin's `uname -a` reports the machine's own hostname as part of its
output — nothing this probe has a reason to see or store. `sw_vers`'s
three-line `ProductName`/`ProductVersion`/`BuildVersion` output carries
none of that. Verified live against a real Mac (macOS 15.4,
`BuildVersion 24E248`, over SSH) — Apple's EULA restricts macOS
virtualization to genuine Apple hardware, so this was the one product in
the whole SSH family that needed a real physical Mac rather than a
container or a downloadable VM image.

Only `ProductName: macOS` (10.12 Sierra onward) is recognized — older
releases reported `"Mac OS X"` instead, a shape never confirmed live
against a real system, so it's treated as unsupported rather than
guessed at.

## Recorded fields

- `version` — from `ProductVersion`
- `extra.buildVersion` — from `BuildVersion`, when present
- `extra.hostKeyVerified`

## Lifecycle resolver

`endoflife:macos`.
