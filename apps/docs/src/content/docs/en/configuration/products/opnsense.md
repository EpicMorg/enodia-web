---
title: OPNsense
description: Configuring enodia to probe OPNsense via SSH.
---

Uses the same SSH mechanism, credentials, and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but runs `opnsense-version` rather than reading a file.

```yaml
targets:
  - id: opnsense-host
    product: opnsense
    address: host.example.com
    credentials: linux-host-ssh
```

## Why a command, not a file

OPNsense sits on a FreeBSD base with no `/etc/os-release` at all, and
its actual version is split across several component files under
`/usr/local/opnsense/version/` (base, kernel, core, pkgs) — no single
obvious identity file. `opnsense-version` is OPNsense's own wrapper that
reads the right one and prints the whole thing in one line. Verified
live against a real OPNsense 26.7 instance, reached via
`vmactions/opnsense-vm`: `"OPNsense 26.7 (amd64)"`.

## Recorded fields

- `version` — parsed from `opnsense-version`'s output
- `extra.hostKeyVerified`

## Lifecycle resolver

`endoflife:opnsense`.
