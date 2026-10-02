---
title: Rocky Linux
description: Configuring enodia to probe Rocky Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: rocky-host
    product: rocky-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `rockylinux:9`: `ID="rocky"` — Rocky's own
os-release `ID` value, distinct from the `product:` name — and
`VERSION_ID="9.3"`.

## CVE correlation

Matched **per installed package** against **Red Hat's** OVAL (`rhel-<N>.oval.xml.bz2`, in `cve.oval.path`) — Rocky rebuilds Red Hat's packages with the same versions, and Rocky's own OVAL file is refused (it holds a small fraction of Rocky's advisories and fails OVAL schema validation). The probe also lists the installed binary packages (`rpm -qa`, with each package's AppStream module stream) and reads `uname -r`/`-m`/`-v` in the same SSH round trip — stored as the observation's `packages` and `modules`, and `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Of several installed kernels, the running one is compared. Only CVEs with a fix newer than what's installed are reported, one finding per package. Some of them come from fixes Red Hat shipped as bug-fix advisories (RHBA), which `dnf updateinfo --security` doesn't list. See [CVE correlation](/en/cve/#package-level-cves-for-linux-distributions).

## Lifecycle resolver

`endoflife:rocky-linux`.
