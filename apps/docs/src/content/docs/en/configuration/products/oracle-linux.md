---
title: Oracle Linux
description: Configuring enodia to probe Oracle Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: oraclelinux-host
    product: oracle-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `oraclelinux:9`: `ID="ol"` — Oracle's own
os-release `ID` value, distinct from the `product:` name — and
`VERSION_ID="9.8"`.

## CVE correlation

Matched **per installed package** against Oracle's OVAL (`com.oracle.elsa-ol<N>.xml.bz2`, in `cve.oval.path`), not by release. The probe also lists the installed binary packages (`rpm -qa`, with each package's AppStream module stream) and reads `uname -r`/`-m`/`-v` in the same SSH round trip — stored as the observation's `packages` and `modules`, and `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Of several installed kernels, the running one is compared. Oracle's separate x86_64 and aarch64 branches are matched against `uname -m`, and FIPS and Ksplice rebuilds are only matched against their own variant's fixes. Only CVEs with a fix newer than what's installed are reported, one finding per package, linked to its ELSA. See [CVE correlation](/en/cve/#package-level-cves-for-linux-distributions).

## Lifecycle resolver

`endoflife:oracle-linux`.
