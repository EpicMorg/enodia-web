---
title: Fedora Linux
description: Configuring enodia to probe Fedora Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: fedora-host
    product: fedora
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `fedora:latest`: `ID=fedora`, `VERSION_ID=44`.

## CVE correlation

Not matched — a general-purpose distribution's CVEs are package vulnerabilities, and the release number can't say which packages have been patched since. See [CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

`endoflife:fedora`.
