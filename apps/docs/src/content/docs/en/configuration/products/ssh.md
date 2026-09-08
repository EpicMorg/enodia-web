---
title: SSH
description: Configuring enodia to probe an SSH server banner.
---

A raw TCP probe, not HTTP — `address` is `host` or `host:port`, no
scheme. Port defaults to `22` when omitted. Reads the identification
string every SSH server sends unprompted the instant a client connects
(RFC 4253 §4.2) — no authentication, no key exchange, just the TCP
connection.

Not tied to one vendor: OpenSSH, Dropbear, and anything else speaking the
SSH transport protocol all identify themselves the same way, which is why
the product is generic `ssh` rather than one probe per implementation.

```yaml
targets:
  - id: bastion-main
    product: ssh
    address: bastion.example.com:22
```

## Authentication

None — the banner is sent before any authentication step exists.

## What "version" means here

`version` is the software string exactly as reported, e.g.
`OpenSSH_10.3` or `OpenSSH_9.6p1` — not a normalized number, since
`ssh` covers multiple unrelated implementations. Any trailing distro
comment (e.g. Ubuntu's `Ubuntu-3ubuntu13.18` suffix) is discarded rather
than treated as part of the version.

## Recorded fields

- `version` — the software string
- `extra.protocol` — the SSH protocol version, e.g. `2.0`

## Lifecycle resolver

None — `ssh` isn't one product with one lifecycle calendar; OpenSSH and
Dropbear each have their own, and a probe's `Meta` is static regardless
of what a given target turns out to be running. Inventory-only.
