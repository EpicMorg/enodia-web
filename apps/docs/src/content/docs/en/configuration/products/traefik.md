---
title: Traefik
description: Configuring enodia to probe Traefik.
---

Reads `GET /api/version`.

```yaml
targets:
  - id: traefik-main
    product: traefik
    address: https://traefik.example.com
```

## Authentication

Optional. Confirmed live against a real `traefik:v3.1` container: with
the API router enabled at all (off by default — neither `--api` nor
`--api.insecure` is set on a stock instance) under `--api.insecure=true`,
this endpoint needs no credentials. A deployment that instead wires the
API router behind its own Basic/Digest auth middleware (Traefik's
documented "secure" way to expose it) answers with ordinary HTTP Basic
challenges:

```yaml
credentials:
  traefik-basic:
    kind: basic
    username: admin
    password: "${TRAEFIK_PASSWORD}"
```

An instance with the API not enabled at all answers `404` here,
indistinguishable from a wrong address.

## Recorded fields

Only `version` — this probe records no `extra` fields (`Codename` and
`startDate` describe the release, not the deployment, and aren't read).

## Lifecycle resolver

`endoflife:traefik`.
