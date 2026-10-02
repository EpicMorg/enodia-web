---
title: Linux Mint
description: Configuring enodia to probe Linux Mint via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: mint-host
    product: linuxmint
    address: host.example.com
    credentials: linux-host-ssh
```

Verified against a real ISO rootfs capture: `ID=linuxmint`,
`VERSION_ID="22.3"` — genuinely Mint's own identity, unlike the only
Docker Hub image found (`linuxmintd/mint22-amd64`, Mint's own CI build
chroot), which reports the underlying Ubuntu base instead and would have
been the wrong thing to match against.

## CVE correlation

Matched **per installed package** against Canonical's OVAL for the host's Ubuntu base (os-release `UBUNTU_CODENAME`, recorded as `extra.codename`; the file goes in `cve.oval.path`). The probe also lists the installed binary packages (`dpkg-query`) and reads `uname -r`/`-m`/`-v` in the same SSH round trip — stored as the observation's `packages`, and `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Only CVEs with a fix newer than what's installed are reported, one finding per package, linked to its USN. See [CVE correlation](/en/cve/#package-level-cves-for-linux-distributions).

## Lifecycle resolver

`endoflife:linuxmint`.
