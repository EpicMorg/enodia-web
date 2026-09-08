---
title: Bitbucket
description: Configuring enodia to probe Atlassian Bitbucket (Data Center).
---

**Data Center only** — Atlassian Cloud does not expose the endpoint this
probe reads. Reads `GET /rest/applinks/1.0/manifest`, the same Application
Links manifest every Atlassian Data Center product exposes — anonymous,
which is why it's used instead of `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: bitbucket-main
    product: bitbucket
    address: https://bitbucket.example.com
```

## Authentication

Optional — the manifest is readable without credentials. `none`, `basic`,
and `bearer` are all accepted if you'd rather authenticate anyway.

## Vendor identity check

The manifest's `<typeId>` is compared against what `product: bitbucket`
expects. **Bitbucket's own manifest still reports itself as `stash`** —
its former name, before Atlassian's rebrand — so `typeId: stash` is
correct and expected here; that's the vendor's response, not an enodia
quirk. A URL that turns out to be Jira or Confluence still fails loudly
instead of getting recorded as a wrong fact — see
[Jira](/en/configuration/products/jira/),
[Confluence](/en/configuration/products/confluence/),
[Bamboo](/en/configuration/products/bamboo/) for the sibling products
sharing this same manifest convention.

## Recorded fields

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` will read `stash`, not
  `bitbucket`

## Lifecycle resolver

`endoflife:bitbucket`.
