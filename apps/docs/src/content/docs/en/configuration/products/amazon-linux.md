---
title: Amazon Linux
description: Configuring enodia to probe Amazon Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: amazon-linux-host
    product: amazon-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `amazonlinux:2023`: `ID="amzn"` — Amazon's own
os-release `ID` value, distinct from the `product:` name — and
`VERSION_ID="2023"`.

## Lifecycle resolver

`endoflife:amazon-linux`.
