---
title: MySQL
description: Configuring enodia to probe MySQL Server.
---

A raw TCP protocol, not HTTP — `address` is `host` or `host:port`, no
`https://`/`http://` scheme (there's nothing to warn about a missing
scheme for; see [Configuration](/en/configuration/#targets)). Port
defaults to `3306` when omitted.

No request is ever sent: MySQL announces its version unprompted, in the
initial handshake packet, before any authentication step — so this probe
never needs a credential to observe it.

```yaml
targets:
  - id: mysql-main
    product: mysql
    address: db.example.com:3306
```

## Authentication

None — the version is read straight out of the handshake, ahead of the
point where a credential would even matter.

## MariaDB is a different product

MariaDB's handshake version gives it away: MariaDB 10.x masks it behind a
`5.5.5-` prefix for old MySQL clients (`5.5.5-10.11.19-MariaDB-ubu2204`),
and MariaDB 11.0+ sends it unmasked but tagged
(`11.4.13-MariaDB-ubu2404`). `product: mysql` pointed at a MariaDB server
detects either shape and **fails on purpose**, naming the real MariaDB version in the
error, rather than silently recording it as a MySQL fact. Since 2.1,
MariaDB has its own probe — use
[`product: mariadb`](/en/configuration/products/mariadb/) for it.

:::caution[MariaDB 11.0+ before 2.1.1]
Up to 2.1.0 only the `5.5.5-` mask was recognised, so a MariaDB 11.0+
server behind a `product: mysql` target was recorded **as MySQL** and
checked against MySQL's lifecycle. Since 2.1.1 such a target fails
instead — switch it to `product: mariadb`.
:::

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`endoflife:mysql`.
