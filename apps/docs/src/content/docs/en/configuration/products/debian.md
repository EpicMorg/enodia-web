---
title: Debian
description: Configuring enodia to probe Debian via SSH.
---

Uses the same SSH mechanism, credentials, and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but — since 1.1.1 — is no longer part of the shared
`osReleaseFamilyProbe` mechanism that page describes; see below.

```yaml
targets:
  - id: debian-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
```

## Its own probe, not the shared os-release one, since 1.1.1

Debian's `/etc/os-release` `VERSION_ID` never carries a point release —
confirmed live, a fully patched Debian 13 install still reports bare
`VERSION_ID="13"`, identical to a day-one install. The real point
release (`13.6`) lives only in `/etc/debian_version`. That file isn't
safe to trust on its own, though: a real Ubuntu 24.04 image was
confirmed live to also ship one, inherited from its build lineage,
reading `trixie/sid` — meaningless for Ubuntu's own version. This probe
reads both files in one SSH round trip, confirms `ID=debian` first, and
only trusts `debian_version`'s content when it's a plain dotted number —
Debian testing's own copy (`forky/sid`) and Ubuntu's inherited one both
correctly fall through to `VERSION_ID` instead.

Verified live against `debian:bookworm-slim`: `ID=debian`,
`VERSION_ID="12"`.

## Recorded fields

- `version` — the point release when `/etc/debian_version` has one, e.g.
  `13.6`; otherwise the bare `VERSION_ID`
- `extra.debianVersion` — `/etc/debian_version`'s raw content, whenever
  the file exists and isn't empty, even when it wasn't a plain dotted
  number (unlike Debian testing's `forky/sid`, useful to see as-is
  rather than silently dropped)
- `extra.codename` — os-release `VERSION_CODENAME`, which picks the
  tracker release
- `extra.kernel` — the running kernel's Debian version, from `uname -v`
- `packages` — installed source packages and their versions (see below)
- `extra.hostKeyVerified`

## CVE correlation

Matched **per installed package** against the Debian Security Tracker (`cve.debian.path`), not by release. The probe reads the installed *source* packages (`dpkg-query`'s `source:Package`/`source:Version` — the tracker's own key) and the running kernel's Debian version (from `uname -v`) in the same SSH round trip as the version itself. Only CVEs Debian has already fixed in a version newer than the installed one are reported, one finding per source package, linked to its tracker page. The tracker only covers releases Debian's security team still supports (bookworm, trixie, testing, sid); older hosts get no package findings. A Proxmox VE host is covered by a `debian` target like this one — see [CVE correlation](/en/cve/#package-level-cves-for-linux-distributions).

## Lifecycle resolver

`endoflife:debian` — unchanged.
