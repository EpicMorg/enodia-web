---
title: CentOS Linux (legacy)
description: Configuring enodia to probe legacy, EOL CentOS Linux via SSH.
---

Uses the same SSH mechanism, credentials, and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but reads a different file: `/etc/redhat-release`, not
`/etc/os-release`.

```yaml
targets:
  - id: centos-host
    product: centos
    address: host.example.com
    credentials: linux-host-ssh
```

## Why not the os-release family

This is legacy, already-EOL CentOS Linux (5/6/7/8) — as opposed to
[CentOS Stream](/en/configuration/products/centos-stream/), its still-current
successor. Confirmed live that CentOS 5 and 6 predate the systemd
os-release convention entirely (no `/etc/os-release` at all), while
`/etc/redhat-release` has existed across the whole RHEL family since
long before that. Real fleets still run these — CentOS reaching EOL
doesn't retire the machines still running it, which is exactly the
situation enodia exists to surface, not paper over.

Verified live across `centos:5` (`"CentOS release 5.11 (Final)"`),
`:6` (`"CentOS release 6.10 (Final)"`), and `:7` (`"CentOS Linux release
7.9.2009 (Core)"`). A CentOS Stream 9 host's own `/etc/redhat-release`
(`"CentOS Stream release 9"`) does **not** match this pattern — the
match requires "CentOS release" or "CentOS Linux release" immediately
after "CentOS ", so a Stream instance is never misidentified as legacy
`centos`, even though both files exist on both product lines.

## Recorded fields

- `version` — the release number parsed out of `/etc/redhat-release`
- `extra.hostKeyVerified`

## Lifecycle resolver

`endoflife:centos`.
