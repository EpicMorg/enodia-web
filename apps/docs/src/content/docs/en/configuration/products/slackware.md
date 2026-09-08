---
title: Slackware
description: Configuring enodia to probe Slackware via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: slackware-host
    product: slackware
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `vbatts/slackware:14.2`: `ID=slackware`,
`VERSION_ID=14.2` — Slackware does ship `/etc/os-release`, despite older
documentation claiming it doesn't.

## Lifecycle resolver

`endoflife:slackware`.
