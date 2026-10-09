---
title: WAPT
description: Configuring enodia to probe WAPT.
---

Reads the WAPT server's (Tranquil IT) `GET /ping`, which it serves
without a session.

```yaml
targets:
  - id: wapt-main
    product: wapt
    address: https://wapt.example.com
```

## Which version is reported

`/ping` carries both `version` (`1.8.2`) and `git_hash`
(`1.8.2.7334-2d15afd9-debian-10-amd64`), which starts with the full
build number. When that build number extends `version`, it is reported
instead — `1.8.2.7334`, not `1.8.2`. Confirmed live on a production WAPT
1.8.2 server.

## Authentication

None — the endpoint accepts no credential shape.

## Recorded fields

- `version` — e.g. `1.8.2.7334`
- `extra.edition` — e.g. `community`
- `extra.apiVersion` — e.g. `v3`
- `extra.gitHash` — e.g. `1.8.2.7334-2d15afd9-debian-10-amd64`

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured.

Edition-aware: WAPT's own edition (`community`/`enterprise`) is already
in NVD's words and is passed through as is. Any other value is treated
as an unknown edition, which keeps every finding.

## Lifecycle resolver

None — WAPT has no endoflife.date page (confirmed 404), and Tranquil IT's
GitHub tags stopped at 1.5; releases are published on their own site,
which no resolver here reads. Inventory-only.
