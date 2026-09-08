---
title: postmarketOS
description: Configuring enodia to probe postmarketOS via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: postmarketos-host
    product: postmarketos
    address: host.example.com
    credentials: linux-host-ssh
```

Verified against a real ISO rootfs capture: `ID="postmarketos"`,
`VERSION_ID="v26.06"` — the leading `v` is the vendor's own format,
passed through as-is; `enodia`'s version comparison already strips a
leading `v`/`V` before comparing, the same handling GitHub's `v1.2.3`
release tags get elsewhere in the tool.

## Lifecycle resolver

`endoflife:postmarketos`.
