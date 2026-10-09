---
title: TorrServer
description: Configuring enodia to probe TorrServer.
---

Reads `GET /echo`, which TorrServer answers with its version as plain
text. Scheme defaults to `https`.

```yaml
targets:
  - id: torrserver-main
    product: torrserver
    address: https://torrserver.example.com
```

## Version shape

`/echo` answers e.g. `MatriX.146` — a codename and a number, the same
spelling as TorrServer's GitHub release tags (`MatriX.146`,
`MatriX.145.2`). The version is recorded as is; the comparison uses the
numbers after the codename, on both sides. A reply that isn't of that
shape (an HTML page, say) is reported as not supported.

## Authentication

Optional. `basic` is sent if configured, for an instance with its own
authentication turned on; with none configured the request is anonymous.
`basic` is the only accepted kind — since 2.2.0 any other kind is a
config error. See
[Configuration → Credentials](/en/configuration/#credentials).

```yaml
credentials:
  torrserver-auth:
    kind: basic
    username: admin
    password: "${TORRSERVER_PASSWORD}"
```

## Recorded fields

Only `version` — e.g. `MatriX.146` (what a live
`ghcr.io/yourok/torrserver:latest` answered on `/echo`). This probe
records no `extra` fields.

## CVE correlation

Not matched — neither database has usable data for it. See
[CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

`github:YouROK/TorrServer` — endoflife.date has no TorrServer calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
