---
title: MySQL
description: Configuring enodia to probe MySQL Server.
---

A raw TCP protocol, not HTTP — `address` is `host` or `host:port`, no
`https://`/`http://` scheme (there's nothing to warn about a missing
scheme for; see [Configuration](/en/configuration/#targets)). Port
defaults to `3306` when omitted.

MySQL announces its version unprompted, in the initial handshake packet,
before any authentication step — so this probe never needs a credential
to observe it.

```yaml
targets:
  - id: mysql-main
    product: mysql
    address: db.example.com:3306
```

## Authentication

None — the version is read straight out of the handshake, ahead of the
point where a credential would even matter.

## Host blocking (ERR 1129)

Since 2.2.1 the probe answers the greeting with a throwaway login
(username `enodia`, no password) and reads the server's refusal. Up to
2.2.0 it hung up right after the greeting, which the server counts as an
aborted connection before authentication; enough of them from one host
trip `max_connect_errors`, and the server then refuses that host with
`ERR 1129 Host '…' is blocked` — every client on it, not just enodia. A
refused login counts as a failed authentication instead, which doesn't
add to the block. Where the server logs failed logins, each run leaves
an `Access denied for user 'enodia'` line. If 2.2.0 already got a host
blocked, clear it with `FLUSH HOSTS` (MySQL 8.0 also takes
`TRUNCATE TABLE performance_schema.host_cache`).

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
