---
title: CentOS Stream
description: Configuring enodia to probe CentOS Stream via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification.

```yaml
targets:
  - id: centos-stream-host
    product: centos-stream
    address: host.example.com
    credentials: linux-host-ssh
```

## Vendor identity check — more than a bare `ID` match

Verified live against `quay.io/centos/centos:stream9`: `/etc/os-release`
reports `ID="centos"` — **the same `ID` legacy, EOL
[CentOS Linux](/en/configuration/products/centos/) uses** — so this
product also checks `NAME="CentOS Stream"`, the field that actually
tells the two apart. `product: centos-stream` pointed at a legacy CentOS
7 host (or vice versa) fails the identity check rather than getting
recorded under the wrong product.

## Recorded fields

Same as the rest of the family: `version` from `VERSION_ID`, plus
`extra.hostKeyVerified`.

## Lifecycle resolver

`endoflife:centos-stream`.
