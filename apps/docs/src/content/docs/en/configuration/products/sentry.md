---
title: Sentry
description: Configuring enodia to probe Sentry.
---

Reads the anonymous login page of a self-hosted Sentry, `GET /auth/login/`
(which redirects to the single organization's login page). Every page
embeds `window.__initialData = {...}`, and its `version.current` is the
version. Default scheme is `https`.

```yaml
targets:
  - id: sentry-main
    product: sentry
    address: https://sentry.example.com
```

## Why the login page

Confirmed live, anonymously, on a production self-hosted 26.2.1. The
same `version` object also has a `latest` field — Sentry's own upgrade
check — which is **not** used: with that check turned off it was stale
(`21.7.0`). The API root `/api/0/` is anonymous too, but its `"version":
"0"` is the API's version, not the server's; `/api/0/internal/health/`
needs auth.

## Authentication

None — the login page is public, and the probe accepts no credential
kind. Since 2.2.0 a credential attached to a `sentry` target is a config
error, not silently ignored — see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — from `version.current`, e.g. `26.2.1`
- `extra.build` — the git commit from `version.build`
- `extra.mode` — `sentryMode`, e.g. `SELF_HOSTED`

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured.
BDU's "Sentry" entries are about the SDK, not the server, and aren't used.

## Lifecycle resolver

`github:getsentry/self-hosted` — endoflife.date has no Sentry calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release"). getsentry/self-hosted's release tags (`26.8.0`, `26.9.0`, …)
are the server versions it installs.
