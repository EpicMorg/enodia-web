---
title: Weblate
description: Configuring enodia to probe Weblate.
---

Reads `GET /about/`, anonymously. Scheme defaults to `https`.

```yaml
targets:
  - id: weblate-main
    product: weblate
    address: https://weblate.example.com
```

## Where the version comes from

Every Weblate page's footer says `Powered by <a href="https://weblate.org/">Weblate 2026.10</a>`,
and its Documentation link points at `docs.weblate.org/en/weblate-2026.10/`.
The probe reads the footer first and the docs link if the footer has been
customised away; a page with neither is reported as not supported.
`/about/` is read because it exists on every Weblate; a site with
`REQUIRE_LOGIN` redirects it to the login page, which carries the same
footer. The REST API root (`/api/`) is anonymous too but carries no
version, and `/api/metrics/` needs a token.

Weblate moved to calendar versions after 5.x (`2026.9`, `2026.9.1`,
`2026.10`); both shapes parse.

## Authentication

None — the probe reads an anonymous page and accepts no credential kind.
Since 2.2.0 a credential configured on this target is a config error
rather than being ignored; see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

Only `version` — e.g. `2026.10` (confirmed live on
`weblate/weblate:latest`). This probe records no `extra` fields.

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`github:WeblateOrg/weblate` — endoflife.date has no Weblate calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release"). Weblate tags its releases `weblate-2026.10`; since 2.2.0 the
resolver drops a leading `<repo>-` or `<repo>_` from release tags, so
LATEST and CYCLE read `2026.10`.
