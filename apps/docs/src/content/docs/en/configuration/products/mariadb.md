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

MariaDB and MySQL speak the identical handshake and differ only in one
detail: MariaDB prefixes its version with a `5.5.5-` compatibility mask
for old MySQL clients (confirmed live, still true on MariaDB 10.11). This
probe requires that mask and strips it — pointed at a real MySQL server
it fails rather than recording a wrong fact, the mirror image of
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
