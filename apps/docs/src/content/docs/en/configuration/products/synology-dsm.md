---
title: Synology DSM
description: Configuring enodia to probe Synology DSM.
---

Logs into Synology's own Web API (`SYNO.API.Auth`), then reads
`SYNO.DSM.Info` for the version, using the resulting session — the one
HTTP probe in enodia that needs a real login step rather than a static
credential.

```yaml
targets:
  - id: nas-main
    product: synology-dsm
    address: https://nas.example.com:5001
    credentials: synology-admin
```

## Authentication — required, username and password

```yaml
credentials:
  synology-admin:
    kind: password
    username: enodia-ro
    password: "${SYNOLOGY_PASSWORD}"
```

Confirmed live: `SYNO.DSM.Info` always answers `{"error":{"code":119}}`
("no session") without both a session id and, when CSRF protection is
enabled, a `SynoToken` — neither is obtainable without calling
`SYNO.API.Auth`'s login method with a real account and password first.
This is a genuinely lighter case than a full HTML-form login: a plain
JSON API taking username/password as normal parameters and returning
the session id as a normal JSON field, no cookie jar or CSRF-token
scraping needed. A best-effort logout follows the version read so
collection doesn't accumulate open sessions on the NAS run after run.

Auth failures here don't use HTTP status codes at all: every Synology
Web API call replies `200` even on failure, with `success: false` in
the body — confirmed live, so this probe reads the body, not the status
code, to detect a rejected login.

## Recorded fields

- `version` — parsed out of `version_string`'s `"DSM <version> Update
  <n>"` shape, e.g. `"DSM 7.3.2-86009 Update 4"` → `7.3.2-86009`
- `extra.update` — the Update number (`4`), since 2.2, when the string
  has one; kept apart from `version` so drift and lifecycle still
  compare the release itself

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured. Since 2.2. A DSM release is
version, build and Update (`7.2.1-69057 Update 6`), and the databases
bound it as `7.2.1-69057-6`; the probe's `version` and `extra.update`
are folded into one comparable version for the lookup. An inventory
collected before 2.2 has no `extra.update` and reads as Update 0 — fixed
Updates may be flagged, none are missed. БДУ's per-branch ranges still
over-report on older branches (NVD's don't) — see
[Dell iDRAC and Synology DSM](/en/cve/#dell-idrac-and-synology-dsm) and
[Known limitations](/en/cve/#known-limitations).

## Lifecycle resolver

None — endoflife.date has no calendar under `synology-dsm`, `synology`,
or `dsm` (confirmed 404). Inventory-only for now.
