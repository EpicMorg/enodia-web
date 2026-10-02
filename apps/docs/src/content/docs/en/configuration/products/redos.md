---
title: RED OS
description: Configuring enodia to probe RED OS via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `alrdockerhub/redos:7.3.1` (real RED OS content —
`HOME_URL`/`BUG_REPORT_URL` point at red-soft.ru): `ID="redos"`,
`VERSION_ID="7.3.1"`.

## CVE correlation

Matched **per installed package** against RED OS's own OVAL for 7.3 or 8.0 (`redos.xml` from `redos.red-soft.ru/support/secure/<7.3|8.0>/`, in `cve.oval.path`) — RHEL's data doesn't apply, since RED OS's package versions are its own (`.el7` on 7.3, `.red80` on 8.0). The release is matched on the version's major.minor. The probe also lists the installed binary packages (`rpm -qa`, with each package's AppStream module stream) and reads `uname -r`/`-m`/`-v` in the same SSH round trip — stored as the observation's `packages` and `modules`, and `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Of several installed kernels, the running one is compared. Findings link to RED OS's `ROS-…` bulletins and carry the vendor's own severity. See [CVE correlation](/en/cve/#package-level-cves-for-linux-distributions).

## Lifecycle resolver

None — endoflife.date has no RED OS calendar today. Inventory-only.
