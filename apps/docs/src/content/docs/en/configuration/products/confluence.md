---
title: Confluence
description: Configuring enodia to probe Atlassian Confluence (Data Center).
---

**Data Center only** — Atlassian Cloud does not expose the endpoint this
probe reads. Reads `GET /rest/applinks/1.0/manifest`, the same Application
Links manifest every Atlassian Data Center product exposes — anonymous,
which is why it's used instead of `/rest/api/2/serverInfo`.

```yaml
targets:
  - id: confluence-main
    product: confluence
    address: https://confluence.example.com
```

## Authentication

Optional — the manifest is readable without credentials. `none`, `basic`,
and `bearer` are all accepted if you'd rather authenticate anyway.

## Vendor identity check

The manifest's `<typeId>` is compared against what `product: confluence`
expects (`confluence`). A URL that turns out to be Jira or Bitbucket fails
loudly instead of getting recorded as a wrong fact — see
[Jira](/en/configuration/products/jira/),
[Bitbucket](/en/configuration/products/bitbucket/),
[Bamboo](/en/configuration/products/bamboo/) for the sibling products
sharing this same manifest convention.

## Recorded fields

- `version`
- `extra.buildNumber`, `extra.typeId` — `typeId` will read `confluence`

## Lifecycle resolver

`endoflife:confluence`.
