---
title: Perforce Proxy (p4p)
description: Configuring enodia to probe Perforce Proxy (p4p).
---

Runs `p4 -Ztag -p <address> info` — the same command and the same
external-CLI mechanism [`p4d`](/en/configuration/products/p4d/) uses;
see that page for why this shells out to the operator's own `p4` binary
instead of speaking Perforce's wire protocol directly.

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
```

## Requires the `p4` CLI on the machine running enodia

Same as [`p4d`](/en/configuration/products/p4d/#requires-the-p4-cli-on-the-machine-running-enodia)
— override the binary path with `options.binary` if `p4` isn't on
`$PATH`:

```yaml
targets:
  - id: p4p-main
    product: p4p
    address: p4p.example.com:1666
    options:
      binary: /opt/perforce/bin/p4
```

## Timeout

`timeout` (per-target, falling back to `defaults.timeout`) applies to
the `p4` subprocess the same way it applies to every other probe's own
transport — see
[`p4d`'s own note](/en/configuration/products/p4d/#timeout) for why
this matters concretely for Perforce specifically. Fixed in 1.2.1.

## Authentication

None — confirmed live that `info` answers fully unauthenticated on a
real production proxy.

## Vendor identity check

A proxy answers `info` with everything a direct server does, **plus its
own `proxyVersion` field** — the backend server's `serverVersion`/
`ServerID`/`serverServices` all come through unchanged, describing the
server behind the proxy, not the proxy itself. This probe requires
`proxyVersion` to be present, rejecting a direct server's reply (which
has no such field) rather than reporting the wrong product's version —
the same check [`p4d`](/en/configuration/products/p4d/) runs in
reverse.

## Recorded fields

- `version` — e.g. `2024.2`, parsed from `proxyVersion`'s
  `P4P/LINUX26X86_64/2024.2/2832881 (2025/09/30)` shape
- `extra.raw` — the full unparsed `proxyVersion` string
- `extra.backendServerVersion`, `extra.backendServerID` — the backend
  `p4d`'s own version/ID, passed through from the same reply, when
  present

## Lifecycle resolver

None — Perforce is proprietary, with no endoflife.date page under any
slug tried (confirmed 404) and no public GitHub releases to fall back
on. Inventory-only, the same as
[`p4d`](/en/configuration/products/p4d/).
