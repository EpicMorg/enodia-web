---
title: Alpine Linux
description: Configuring enodia to probe Alpine Linux via SSH.
---

Part of the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family — see that page for the shared mechanism, credentials, and host
key verification. Matches `/etc/os-release`'s `ID` field.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verified live against `alpine:latest`: `ID=alpine` (note: the bare `ID`
field, not `alpine-linux` — the `product:` value adds `-linux` for
clarity, the match itself is against the shorter vendor string),
`VERSION_ID=3.24.1`.

## CVE correlation

Matched **per installed package** against Alpine's secdb for the host's branch (`main.json` and `community.json`, in `cve.alpine.path`), not by release. The branch is `VERSION_ID`'s major.minor (3.20.3 → v3.20); edge has no numbered branch and gets no findings. The probe also reads `/lib/apk/db/installed` in the same SSH round trip and keys packages by **origin** (secdb's own key: `libcrypto3` and `libssl3` are both `openssl`) — stored as the observation's `packages`, plus `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Only CVEs with a fix newer than what's installed are reported, one finding per origin, linked to its page on security.alpinelinux.org; secdb carries no severity. See [CVE correlation](/en/cve/#package-level-cves-for-linux-distributions).

## Lifecycle resolver

`endoflife:alpine-linux`.
