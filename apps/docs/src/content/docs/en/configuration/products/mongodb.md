---
title: MongoDB
description: Configuring enodia to probe MongoDB.
---

A raw wire-protocol probe, not HTTP — `address` is `host` or `host:port`,
no scheme. Port defaults to `27017` when omitted. Runs the `buildInfo`
command over the wire protocol (`OP_MSG`) and reads its `version` field —
no client library, no `SELECT`-style query.

```yaml
targets:
  - id: mongodb-main
    product: mongodb
    address: db.example.com:27017
```

## Authentication

None — `buildInfo` is one of the small set of commands MongoDB always
answers before authentication. Confirmed live against two real `mongo:7`
containers, one with no access control at all and one with `--auth` and
a root user configured: both returned the identical full `buildInfo`
document with no credentials sent at all.

## Recorded fields

- `version`
- `extra.enterprise` — `"true"` when `buildInfo`'s `modules` lists
  `enterprise`, `"false"` when it doesn't (a community server has an
  empty array); unreported when the field is absent

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured. Edition-aware: the probe records the server's own edition in `extra.enterprise`, and a community instance doesn't see enterprise-only findings. An unknown edition keeps every finding.

## Lifecycle resolver

`endoflife:mongodb`.
