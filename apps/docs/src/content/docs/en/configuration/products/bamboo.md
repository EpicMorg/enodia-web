---
title: Bamboo
description: Configuring enodia to probe Atlassian Bamboo (Data Center).
---

**Data Center only** — Atlassian Cloud does not expose the endpoint this
probe reads. Reads `GET /rest/applinks/1.0/manifest`, the same Application
Links manifest every Atlassian Data Center product exposes — anonymous,
which is why it's used instead of `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bamboo-main
    product: bamboo
    address: https://bamboo.example.com
```

## Authentication

Optional — the manifest is readable without credentials. `none`, `basic`,
and `bearer` are all accepted if you'd rather authenticate anyway.

## Vendor identity check

The manifest's `<typeId>` is compared against what `product: bamboo`
expects (`bamboo`). A URL that turns out to be Jira or Confluence fails
loudly instead of getting recorded as a wrong fact — see
[Jira](/en/configuration/products/jira/),
[Confluence](/en/configuration/products/confluence/),
[Bitbucket](/en/configuration/products/bitbucket/) for the sibling
products sharing this same manifest convention.

## Recorded fields

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` will read `bamboo`

## Lifecycle resolver

None wired up yet — unlike the other products on this list with no
resolver, this isn't because endoflife.date has no calendar to point at:
[endoflife.date/bamboo](https://endoflife.date/bamboo) is live with real
cycle data, confirmed via `endoflife.date/api/bamboo.json`. `registry.go`
just has `resolver: ""` for this product, with none of the sibling
Atlassian probes' explicit "confirmed 404" comment — it looks like a gap
in enodia itself rather than a deliberate "no calendar exists" case.
enodia still tracks `version` and `buildNumber` either way; only the
lifecycle axis stays `unknown` until this gets wired up upstream.
