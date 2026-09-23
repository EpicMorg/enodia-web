---
title: Kali Linux
description: Configuring enodia to probe Kali Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: kali-host
    product: kali-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `kalilinux/kali-rolling`: `ID=kali`,
`VERSION_ID="2026.3"` — a dated rolling-release snapshot, not a discrete
version.

## CVE correlation

Not matched — a general-purpose distribution's CVEs are package vulnerabilities, and the release number can't say which packages have been patched since. See [CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

None — Kali is rolling-release, and endoflife.date has no calendar for
it (confirmed 404) for the same reason as Gentoo. Inventory-only.
