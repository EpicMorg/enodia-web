---
title: Ghost
description: Configuring enodia to probe Ghost.
---

Reads `GET /ghost/api/admin/site/` — the one Admin API endpoint Ghost
serves without a session or key (the admin app reads it before login) —
and takes `site.version`. Default scheme is `https`.

```yaml
targets:
  - id: ghost-main
    product: ghost
    address: https://blog.example.com
```

## Only major.minor is public

Confirmed live on `ghost:6`: the endpoint said `6.69`, the same as
`<meta name="generator">` and the `Content-Version` header, while the
installed package was 6.69.0. The full version is behind the Admin API's
key, a signed JWT — a new credential kind for one digit, not worth it:
Ghost's releases are `x.y.0` almost without exception, and `6.69`
compares equal to the `v6.69.0` tag.

## Authentication

None — the endpoint is public, and the probe accepts no credential kind.
Since 2.2.0 a credential attached to a `ghost` target is a config error,
not silently ignored — see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

Only `version` — major.minor, e.g. `6.69`; this probe records no `extra`
fields.

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`github:TryGhost/Ghost` — endoflife.date has no Ghost calendar (confirmed
404), so this resolves against GitHub Releases instead: the latest
published, non-prerelease tag only, with no eol/support/lts dates (GitHub
has no opinion on lifecycle policy, only "what's the latest release").
