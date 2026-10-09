---
title: LibreTranslate
description: Configuring enodia to probe LibreTranslate.
---

Reads `GET /spec`, the API's own OpenAPI (Swagger 2.0) document, which is
public even where translating requires an API key. Scheme defaults to
`https`.

```yaml
targets:
  - id: translate-main
    product: libretranslate
    address: https://translate.example.com
```

## Vendor identity check

`info.version` is the server's version. The probe also requires
`info.title` to be `"LibreTranslate"`, so another service's Swagger
document isn't read as LibreTranslate's.

## Authentication

None — `/spec` is public and the probe accepts no credential kind (an API
key is only needed for translating, which the probe never does). Since
2.2.0 a credential configured on this target is a config error rather
than being ignored; see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

Only `version` — e.g. `1.9.6`, from `info.version` (confirmed live on
`libretranslate/libretranslate:latest`, release v1.9.6). This probe
records no `extra` fields.

## CVE correlation

Not matched — neither database has usable data for it. See
[CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

`github:LibreTranslate/LibreTranslate` — endoflife.date has no
LibreTranslate calendar (confirmed 404), so this resolves against GitHub
Releases instead: the latest published, non-prerelease tag only, with no
eol/support/lts dates (GitHub has no opinion on lifecycle policy, only
"what's the latest release").
