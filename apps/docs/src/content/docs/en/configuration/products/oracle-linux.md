---
title: Oracle Linux
description: Configuring enodia to probe Oracle Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: oraclelinux-host
    product: oracle-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `oraclelinux:9`: `ID="ol"` — Oracle's own
os-release `ID` value, distinct from the `product:` name — and
`VERSION_ID="9.8"`.

## Lifecycle resolver

`endoflife:oracle-linux`.
