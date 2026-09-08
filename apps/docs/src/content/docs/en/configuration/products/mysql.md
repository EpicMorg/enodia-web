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

MariaDB masks its real version behind a `5.5.5-` prefix for MySQL clients
that predate MariaDB's own version scheme — still true on a current
MariaDB 10.11 image. `product: mysql` pointed at a MariaDB server detects
this and **fails on purpose**, naming the real MariaDB version in the
error, rather than silently recording it as a MySQL fact. There's no
dedicated `mariadb` probe yet — this is a hard stop, not something to
route around with the [generic probe](/en/configuration/products/generic/)
today.

## Lifecycle resolver

`endoflife:mysql`.
