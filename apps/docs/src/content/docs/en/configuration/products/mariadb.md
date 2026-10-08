---
title: MariaDB
description: Configuring enodia to probe MariaDB Server.
---

A raw TCP protocol, not HTTP — `address` is `host` or `host:port`, no
scheme. Port defaults to `3306` when omitted. Same handshake as
[MySQL](/en/configuration/products/mysql/): MariaDB announces its
version unprompted in the initial handshake packet, before any
authentication step, so this probe never needs a credential.

```yaml
targets:
  - id: mariadb-main
    product: mariadb
    address: db.example.com:3306
```

## Authentication

None — the version is read straight out of the handshake.

## Vendor identity check

MariaDB and MySQL speak the identical handshake and differ only in the
version string, which comes in two shapes, both confirmed live:

- **MariaDB 10.x** masks its version behind a `5.5.5-` compatibility
  prefix for old MySQL clients: `5.5.5-10.11.19-MariaDB-ubu2204`. The
  mask is stripped.
- **MariaDB 11.0+** dropped the mask: `11.4.13-MariaDB-ubu2404`,
  `12.3.3-MariaDB-ubu2404`. The `-MariaDB` in the version is then the
  only signal. Recognised since 2.1.1 — 2.1.0 refused these servers.

Either shape is accepted. Pointed at a real MySQL server, whose version
has neither, the probe fails rather than recording a wrong fact, the
mirror image of
[`mysql`](/en/configuration/products/mysql/#mariadb-is-a-different-product)
refusing a MariaDB server.

## Recorded fields

- `version` — the numeric version, e.g. `10.11.19`
- `extra.tag` — the vendor tag after it, e.g. `MariaDB-ubu2204`, when
  present

## CVE correlation

Not matched yet — MariaDB is new in 2.1, and upstream left its CVE
mapping for a later, dedicated pass. See
[CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

`endoflife:mariadb`.
