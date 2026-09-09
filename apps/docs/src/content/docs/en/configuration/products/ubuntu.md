---
title: Ubuntu
description: Configuring enodia to probe Ubuntu via SSH.
---

Uses the same SSH mechanism, credentials, and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but — since 1.1.1 — is no longer part of the shared
`osReleaseFamilyProbe` mechanism that page describes; see below.

```yaml
targets:
  - id: ubuntu-host
    product: ubuntu
    address: host.example.com
    credentials: linux-host-ssh
```

## Its own probe, not the shared os-release one, since 1.1.1

Ubuntu's `/etc/os-release` `VERSION_ID` deliberately never changes after
a release ships — confirmed live (`14.04` through `24.10`): a fully
patched `22.04` host, several point releases and new install media in,
still reports `VERSION_ID="22.04"`, not `22.04.5`. The point release
exists only in the same file's `VERSION` field (`VERSION="22.04.5 LTS
(Jammy Jellyfish)"`), and only for an LTS release that's shipped more
than one — a non-LTS release's `VERSION` carries no extra segment at all
(confirmed live: `VERSION="24.10 (Oracular Oriole)"`, matching
`VERSION_ID` exactly). This probe prefers `VERSION`'s number over
`VERSION_ID` whenever it's strictly more precise and shares the same
major.minor prefix — no second file to read, unlike
[Debian](/en/configuration/products/debian/)'s fix for the same
underlying gap, since the precision is already in the same file, just a
different field. Every other product in the shared os-release family
was audited the same way; none of the rest have this gap.

Verified live against `ubuntu:24.04`: `ID=ubuntu`, `VERSION_ID="24.04"`.

## Recorded fields

- `version` — the precise point release when `VERSION` has one, e.g.
  `22.04.5`; otherwise the bare `VERSION_ID`
- `extra.hostKeyVerified`

## Lifecycle resolver

`endoflife:ubuntu` — unchanged.
