---
title: openSUSE
description: Configuring enodia to probe openSUSE via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification.

```yaml
targets:
  - id: opensuse-host
    product: opensuse
    address: host.example.com
    credentials: linux-host-ssh
```

## Matches both Leap and Tumbleweed

Unlike most of this family's plain `ID` equality checks, this one
matches any `ID` starting with `opensuse-`. Verified live against
`opensuse/leap:latest`: `ID="opensuse-leap"`, `VERSION_ID="16.0"`.
Tumbleweed (`ID="opensuse-tumbleweed"`) isn't covered by a real fixture
here, but shares the same `opensuse-` prefix, so it's accepted by this
same product rather than left unmatched.

## Lifecycle resolver

`endoflife:opensuse`.
