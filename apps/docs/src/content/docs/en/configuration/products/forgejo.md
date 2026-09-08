---
title: Forgejo
description: Configuring enodia to probe Forgejo.
---

Reads `GET /api/v1/version` — a Gitea-API-compatible endpoint Forgejo (a
Gitea fork) still ships under the same path.

```yaml
targets:
  - id: forgejo-main
    product: forgejo
    address: https://forgejo.example.com
```

## Authentication

Optional — anonymous by default. An instance with
`REQUIRE_SIGNIN_VIEW = true` set (a real hardening option) answers `403`
instead, handled the same as any other probe's auth challenge. Both
`basic` and `token-header` are accepted — see
[Configuration → Credentials](/en/configuration/#credentials) for the
exact field shape of each.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:forgejo`.
