---
title: Harbor
description: Configuring enodia to probe Harbor (container registry).
---

Reads `GET /api/v2.0/systeminfo`.

```yaml
targets:
  - id: harbor-main
    product: harbor
    address: https://harbor.example.com
```

## Authentication

Optional. Confirmed live against a real `goharbor/harbor` v2.12.2 stack:
`harbor_version` comes back with no credentials at all on every
currently-released version — bad or fabricated credentials are silently
treated as anonymous rather than answering `401`, this endpoint never
rejects a request outright.

:::note[Watch for this changing upstream]
Harbor's own source (as of the version this probe was verified against)
already gates `harbor_version` behind an authenticated-session check on
its main branch, unreleased at the time of writing — heading toward a
future release requiring credentials for this field. `basic` is already
offered here for when that lands:

```yaml
credentials:
  harbor-admin:
    kind: basic
    username: admin
    password: "${HARBOR_PASSWORD}"
```
:::

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:harbor`.
