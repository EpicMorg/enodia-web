---
title: Red Hat Enterprise Linux
description: Configuring enodia to probe RHEL via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: rhel-host
    product: rhel
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `registry.redhat.io/ubi9` (Red Hat's own free
Universal Base Image): `ID=rhel`, `VERSION_ID="9.8"`.

## CVE correlation

Matched **per installed package** against Red Hat's OVAL for the host's major release (`rhel-<N>.oval.xml.bz2`, in `cve.oval.path`), not by release. The probe also lists the installed binary packages (`rpm -qa`, with each package's AppStream module stream) and reads `uname -r`/`-m`/`-v` in the same SSH round trip — stored as the observation's `packages` and `modules`, and `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Of several installed kernels, the running one is compared. Only CVEs with a fix newer than what's installed are reported, one finding per package, linked to its RHSA. See [CVE correlation](/en/cve/#package-level-cves-for-linux-distributions).

## Lifecycle resolver

`endoflife:rhel`.
