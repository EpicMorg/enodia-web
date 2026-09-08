---
title: Red Hat Enterprise Linux
description: Configuring enodia to probe RHEL via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: rhel-host
    product: rhel
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `registry.redhat.io/ubi9` (Red Hat's own free
Universal Base Image): `ID=rhel`, `VERSION_ID="9.8"`.

## Lifecycle resolver

`endoflife:rhel`.
