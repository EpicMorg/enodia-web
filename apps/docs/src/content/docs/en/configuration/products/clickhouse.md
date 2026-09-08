---
title: ClickHouse
description: Configuring enodia to probe ClickHouse.
---

Runs `SELECT version()` against ClickHouse's HTTP interface (port 8123
by default) and reads the plain-text reply.

```yaml
targets:
  - id: clickhouse-main
    product: clickhouse
    address: https://clickhouse.example.com:8123
```

## Authentication

Optional. Recent images require `CLICKHOUSE_PASSWORD` to be set at all —
no blank default-user password to fall back to, unlike older installs —
so an unauthenticated request against a hardened instance gets an
ordinary `401`, handled the same as any other probe:

```yaml
credentials:
  clickhouse-default:
    kind: basic
    username: default
    password: "${CLICKHOUSE_PASSWORD}"
```

Whether a given deployment needs credentials at all depends entirely on
how it was set up.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:clickhouse`.
