---
title: SSH-based OS identification
description: How enodia's SSH/os-release/uname family of probes works — shared by 30 OS products.
---

30 of enodia's products — every Linux distribution, FreeBSD, OpenBSD,
NetBSD, macOS, Oracle Solaris, OPNsense, and legacy CentOS — are
identified over **SSH**, not HTTP. This page explains the shared
mechanism once; each OS's own page (linked from
[Supported products](/en/products/)) only states its specific `product:`
value, the exact identity field it matches on, and its lifecycle
resolver.

## How it works

One SSH connection, one command, one disconnect — this is not a
general-purpose remote-exec client, just enough to read a single identity
fact:

- **21 products** read `/etc/os-release` (the systemd-standardized
  identity file every modern Linux distribution ships, plus FreeBSD's own
  `/var/run/os-release`, generated dynamically at boot in the same
  `KEY=VALUE` shape) and check its `ID` field — a shared, generic
  mechanism (`osReleaseFamilyProbe`).
- **2 more** ([Debian](/en/configuration/products/debian/),
  [Ubuntu](/en/configuration/products/ubuntu/)) also read
  `/etc/os-release`, but through their own dedicated probe rather than
  the generic mechanism above — both distributions leave `VERSION_ID`
  imprecise (Debian's never carries a point release at all; Ubuntu's
  freezes at first release and never reflects a later point release),
  so each reads further for the real one: Debian cross-checks
  `/etc/debian_version`, Ubuntu prefers the same file's own `VERSION`
  field when it's more precise. See their own pages for exactly why.
- **2 products** (OpenBSD, NetBSD) have no os-release-equivalent file at
  all — `uname -sr` is the identity source instead (`"<kernel name>
  <release>"`, e.g. `"OpenBSD 7.9"`).
- **5 more** (Astra Linux, legacy CentOS, macOS, OPNsense, Oracle
  Solaris) read a distinct, product-specific identity file or command
  each — see their own pages.

`product:` is always declared explicitly and verified against the real
identity field, never guessed from the response (the same principle the
[Atlassian probes](/en/configuration/products/jira/) use for their
manifest's `<typeId>`) — pointing a Debian host at `product: ubuntu` is a
real config mistake that fails loudly rather than getting recorded as a
wrong fact.

## Configuration

```yaml
targets:
  - id: web-01
    product: debian          # or any other OS product — see its own page
    address: web-01.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"      # sha256 of the host's SSH key
```

```yaml
credentials:
  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
```

Port defaults to `22` when `address` doesn't carry one — no scheme, same
as MySQL/Redis (a bare `host:port`, not a URL).

## Authentication — required

Every probe in this family has `Required: true` — there is no anonymous
path to an OS's identity, unlike most of the HTTP-based products. Two
credential shapes work, exactly like any SSH client:

- `kind: password` — `username` + `password`
- `kind: ssh-key` — `username` + `private_key_file` (+ `passphrase` if
  the key is encrypted)

See [Configuration → Credentials](/en/configuration/#credentials) for
the full field reference.

## Host key verification

Reuses the same `tls:` block HTTPS probes use for certificate pinning —
`tls.pin_sha256` holds the hex SHA-256 of the SSH host key's own wire
encoding (not a TLS certificate), and `tls.insecure: true` is the same
last-resort opt-out, warned about the same way. **With neither set, the
connection is refused before a single credential is sent.** See
[Configuration → SSH host key verification](/en/configuration/#ssh-host-key-verification)
for the full explanation.

## Recorded fields

Every probe in this family records:

- `version` — from `VERSION_ID` (os-release family) or the kernel
  release (uname family); Debian and Ubuntu read further for a precise
  point release `VERSION_ID` alone doesn't carry — see their own pages
- `extra.hostKeyVerified` — `"true"`/`"false"`, whether `tls.pin_sha256`
  actually matched (surfaces the same way `TLSVerified` does for HTTPS
  targets — a fleet-wide audit of which SSH targets are pinned)

## A target with no matching file or command fails loudly

Both `cat /etc/os-release` on a host that doesn't have one and `uname
-sr` reporting the wrong kernel name come back as a clear "not this
product" error rather than a generic connection failure — the SSH
session itself succeeded, the identity check is what failed.
