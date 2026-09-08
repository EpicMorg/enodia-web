---
title: Ubuntu
description: Configuring enodia to probe Ubuntu via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: ubuntu-host
    product: ubuntu
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `ubuntu:24.04`: `ID=ubuntu`, `VERSION_ID="24.04"`.

## Lifecycle resolver

`endoflife:ubuntu`.
