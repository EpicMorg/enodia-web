---
title: Perforce Helix Core Server (p4d)
description: Configuring enodia to probe Perforce Helix Core Server (p4d).
---

Runs `p4 -Ztag -p <address> info` — **the one probe in this project that
shells out to an external binary** instead of speaking a wire protocol or
HTTP directly. See [why](#why-a-cli-instead-of-a-wire-protocol-client)
below.

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
```

## Requires the `p4` CLI on the machine running enodia

Not a credential or a network requirement — an actual binary needs to be
installed alongside enodia itself (Perforce's own command-line client,
freely downloadable). A missing binary fails clearly rather than being
mistaken for a network problem. Override the path with `options.binary`
if `p4` isn't on `$PATH` (this works identically on Windows, pointed at
`p4.exe`):

```yaml
targets:
  - id: p4d-main
    product: p4d
    address: p4d.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## Why a CLI instead of a wire protocol client

Perforce's own RPC protocol was fully reverse-engineered live (packet
capture plus the real `p4` binary against a real production proxy), and
a hand-built client reproduced the whole handshake correctly — confirmed
byte-for-byte against the capture. But that exact, verified-correct
handshake is silently dropped by real direct `p4d` servers (mandatory
TLS and rate limiting were both ruled out live: no error, no reset,
just no reply), while the real `p4` binary connects to those same
addresses with no issue at all. Rather than ship a probe that only
works against proxies, both this probe and
[Perforce Proxy](/en/configuration/products/p4p/) shell out to the
operator's own `p4` CLI instead.

## Timeout

`timeout` (per-target, falling back to `defaults.timeout`) applies to
the `p4` subprocess the same way it applies to every other probe's own
transport. This matters concretely here: a `p4` process stuck dialing
an unreachable direct server hangs with no response and no reset at
the TCP level — exactly the behavior described above — so without a
timeout it would stall an entire collection run rather than fail that
one target. (Fixed in 1.2.1 — an earlier version passed no timeout to
the subprocess at all.)

## Authentication

None — confirmed live that `info` answers fully unauthenticated on real
production servers.

## Vendor identity check

A reply carrying a `proxyVersion` field means the address is actually a
[Perforce Proxy](/en/configuration/products/p4p/), not a direct server —
this probe rejects it rather than reporting the wrong product's
version, the same as `p4p` rejects a direct server's reply in reverse.

## Not the same product as Perforce Helix Swarm

[`perforce-swarm`](/en/configuration/products/perforce-swarm/) is
Perforce's web code-review UI, probed over HTTP — a different product
from the `p4d` server itself, which this page covers.

## Recorded fields

- `version` — e.g. `2024.2`, parsed from `serverVersion`'s
  `P4D/LINUX26X86_64/2024.2/2726408 (2025/02/27)` shape
- `extra.raw` — the full unparsed `serverVersion` string
- `extra.serverID`, `extra.serverServices`, when present

## Lifecycle resolver

None — Perforce is proprietary, with no endoflife.date page under any
slug tried (confirmed 404) and no public GitHub releases to fall back
on. Inventory-only, the same as
[Gentoo](/en/configuration/products/gentoo/)/
[Kali Linux](/en/configuration/products/kali-linux/).
