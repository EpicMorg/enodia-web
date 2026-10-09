---
title: PostgreSQL
description: Configuring enodia to probe PostgreSQL.
---

A raw wire-protocol probe, not HTTP — `address` is `host` or `host:port`,
no scheme. Port defaults to `5432` when omitted. `product: postgres` is
also accepted as an alias for `postgresql`.

The version comes from a `ParameterStatus` message every PostgreSQL
backend sends automatically right after authentication succeeds — no
explicit `SHOW server_version` query needed.

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
```

## Authentication

Only required if the server actually asks for one — trust auth needs no
credential at all. When it does ask, **trust, cleartext, MD5, and
SCRAM-SHA-256 are all supported and negotiated automatically** —
including SCRAM-SHA-256, the default on PostgreSQL 14+ and common on
10-13, without which most real deployments would be unreachable.

```yaml
credentials:
  pg-app:
    kind: password
    username: enodia_ro   # optional — defaults to "postgres" if omitted
    password: "${PG_PASSWORD}"
```

The database connected to defaults to the same value as the username
(server-side default) — there's currently no config field to point at a
different database name explicitly.

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured. Since 2.2, `cve.postgresql.path`
adds the project's own security pages, which name the fix per major:
for a major the saved pages name, their verdict replaces БДУ's
branchless ranges, which otherwise flag every older major's latest
release. See [Vendors' own data → PostgreSQL](/en/cve/#postgresql).

## Lifecycle resolver

`endoflife:postgresql`.
