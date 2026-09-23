---
title: Fortinet FortiOS (FortiGate)
description: Configuring enodia to probe a Fortinet FortiGate running FortiOS.
---

Reads `GET /api/v2/monitor/system/status` — FortiOS's own REST API.
Verified against a real FortiGate 601E running FortiOS 7.4.12.

```yaml
targets:
  - id: fw-edge
    product: fortios
    address: https://fw.example.com
    credentials: fortigate-api
```

## Authentication — required

A **REST API Admin** token: create a REST API Admin in the FortiGate GUI
(System → Administrators) and copy the API key it generates — FortiOS
shows it exactly once. It's sent as a plain bearer token; no session
login, no CSRF token, no `access_token` query parameter:

```yaml
credentials:
  fortigate-api:
    kind: bearer
    value: "${FORTIGATE_API_TOKEN}"
```

A missing or wrong token answers `401` (with an HTML error page, not
JSON) — reported as an auth error like any other probe's. A REST API
Admin can be limited to trusted hosts in FortiOS itself; if you do that,
include the address enodia connects from.

## Recorded fields

- `version` — as FortiOS reports it, e.g. `v7.4.12` (the leading `v`
  is stripped when it's compared, not when it's recorded)
- `extra.model` — e.g. `FG6H1E` (the 601E)
- `extra.build` — the FortiOS build number

The device's hostname is in the same response but deliberately not
recorded.

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`endoflife:fortios`. endoflife.date's FortiOS page carries release
cycles and dates but no "latest version" for any cycle, so the lifecycle
axis works while `drift` shows `LATEST: -` and `PATCH: unknown` — a gap
in the source data, not a probe bug.
