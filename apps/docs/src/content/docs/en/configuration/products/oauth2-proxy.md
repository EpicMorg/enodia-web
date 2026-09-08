---
title: oauth2-proxy
description: Configuring enodia to probe oauth2-proxy.
---

Reads the version stamped into `/oauth2/sign_in`'s footer. oauth2-proxy
has no JSON version endpoint at all — the sign-in page is the only
anonymous surface (it must render before any session exists), and its
default template writes the version straight into the footer text.

```yaml
targets:
  - id: oauth2-proxy-main
    product: oauth2-proxy
    address: https://auth.example.com
```

## Authentication

None — confirmed live against a real `oauth2-proxy/oauth2-proxy`
container's default page.

## The `--footer` flag can hide the version

A deployment's own `--footer` flag can replace or hide (`-`) that whole
line — no anonymous fallback exists if so. This is a confirmed product
with the version withheld by the deployment's own config, not a probe
bug.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`github:oauth2-proxy/oauth2-proxy` — no endoflife.date calendar today,
so this resolves against GitHub Releases instead: the latest published,
non-prerelease tag only, with no eol/support/lts dates.
