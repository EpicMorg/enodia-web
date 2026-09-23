---
title: EuroLinux
description: Configuring enodia to probe EuroLinux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: eurolinux-host
    product: eurolinux
    address: host.example.com
    credentials: linux-host-ssh
```

No Docker image exists for EuroLinux — verified instead against a real
ISO rootfs capture (the installer medium itself, examined offline):
`ID="eurolinux"`, `VERSION_ID="8.10"`.

## CVE correlation

Not matched — a general-purpose distribution's CVEs are package vulnerabilities, and the release number can't say which packages have been patched since. See [CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

`endoflife:eurolinux`.
