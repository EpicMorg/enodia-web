---
title: pgAdmin
description: Configuring enodia to probe pgAdmin.
---

Decodes the version out of the `?ver=NNNNN` cache-busting query string
pgAdmin appends to every static asset on its own login page — anonymous
by design, since it has to render before any session exists.

```yaml
targets:
  - id: pgadmin-main
    product: pgadmin
    address: https://pgadmin.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## How the version is decoded

Confirmed against a real `dpage/pgadmin4` container and pgAdmin's own
source (`version.py`): `NNNNN` is `APP_VERSION_INT`, documented there as
`[X]XYYZZ` — release, revision, then a suffix code — e.g. `91700` for
release 9, revision 17, suffix `00` (GA). Only the release.revision
spine is reconstructed into `version`; a nonzero suffix code (a
beta/dev build) has no documented text mapping to reconstruct from the
code alone, so it's surfaced as `extra.suffixCode` rather than guessed
at.

## Recorded fields

- `version` — e.g. `9.17`
- `extra.suffixCode`, only when nonzero

## Lifecycle resolver

`github-tags:pgadmin-org/pgadmin4`. endoflife.date has no pgAdmin
calendar (confirmed 404), and `pgadmin-org/pgadmin4` has no GitHub
Releases at all (confirmed live: the releases endpoint returns an empty
array) — only tags, shaped `REL-9_17` rather than a dotted version. The
`github-tags` resolver type exists specifically for this: it converts
that shape to `9.17` and picks the *highest-parsing* tag from the
fetched page rather than trusting list order, since the tags endpoint
documents no ordering guarantee the way Releases' reverse-chronological
order does. Like the plain `github:` resolver, it only ever knows
"latest version" — no eol/support/lts dates, since the tags endpoint
carries none. See [Supported products](/en/products/#applications-and-infrastructure-services)
for the `GITHUB_TOKEN` environment variable that raises this resolver's
rate limit.
