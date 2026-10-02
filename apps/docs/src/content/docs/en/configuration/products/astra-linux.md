---
title: Astra Linux
description: Configuring enodia to probe Astra Linux via SSH.
---

Uses the same SSH mechanism, credentials, and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but reads a different file: `/etc/astra_version`, Astra's own
identity file, rather than `/etc/os-release`.

```yaml
targets:
  - id: astra-host
    product: astra-linux
    address: host.example.com
    credentials: linux-host-ssh
```

## Why not `/etc/os-release`

Astra Linux is Debian-based and does carry `/etc/os-release`
(`ID_LIKE=debian`), but its `VERSION_ID` is unusable: confirmed live
(`epicmorg/astralinux:1.7-main` and `:1.8-main`) that it reads
`"1.8_x86-64"` — an architecture suffix baked directly into the version
string. `/etc/astra_version` has none of that: a plain `"1.8.6"`/`"1.7.9"`,
the real point-release Astra itself tracks.

## Recorded fields

- `version` — from `/etc/astra_version`
- `extra.hostKeyVerified`

## CVE correlation

Matched **per installed package** against Astra Linux's own OVAL for SE 1.7 or 1.8 (`oval-definitions-alse-<1.7|1.8>.xml`, in `cve.oval.path`) — Debian's data doesn't apply, since Astra's package versions are its own rebuilds. The release is matched on the version's major.minor (`1.8.6` → 1.8). The probe also lists the installed binary packages (`dpkg-query`) in the same SSH round trip as `/etc/astra_version` — stored as the observation's `packages`, plus `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Findings link to Astra's own bulletin, or to БДУ when the vendor cites none (1.7). Astra's data carries no severity, and its kernel packages are compared as installed, not as running. See [CVE correlation](/en/cve/#package-level-cves-for-linux-distributions).

## Lifecycle resolver

None — endoflife.date has no Astra Linux calendar (confirmed 404 under
`astra`, `astralinux`, and `astra-linux`). Inventory-only.
