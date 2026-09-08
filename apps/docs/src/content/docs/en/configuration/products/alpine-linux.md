---
title: Alpine Linux
description: Configuring enodia to probe Alpine Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `alpine:latest`: `ID=alpine` (note: the bare `ID`
field, not `alpine-linux` — the `product:` value adds `-linux` for
clarity, the match itself is against the shorter vendor string),
`VERSION_ID=3.24.1`.

## Lifecycle resolver

`endoflife:alpine-linux`.
