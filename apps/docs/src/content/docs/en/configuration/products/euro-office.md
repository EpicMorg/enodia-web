---
title: Euro-Office Docs
description: Configuring enodia to probe Euro-Office Docs.
---

Euro-Office Docs is the ONLYOFFICE Docs fork Nextcloud ships
(`nextcloud/aio-eurooffice`). Like
[ONLYOFFICE Docs](/en/configuration/products/onlyoffice/), it is read
anonymously from the document server's root, `GET /index.html` —
"Version: 9.3.1. Build: 37. Release date: 2016-06-29…" — then
`GET /welcome/` is read to check the brand. Default scheme is `https`.

```yaml
targets:
  - id: eurooffice-main
    product: euro-office
    address: https://office.example.com
```

## One probe, two products

Euro-Office shares its probe with
[`onlyoffice`](/en/configuration/products/onlyoffice/), but it has its own
release line (Euro-Office/DocumentServer: v9.3.3, v9.3.4,
v9.3.4-hotfix.1) apart from ONLYOFFICE's (v9.3.1, v9.4.0), so it is its
own product with its own resolver — compared against ONLYOFFICE's
releases, a current Euro-Office would always read as behind. The release
date on its `/index.html` is a placeholder; the version is real (the
image's own package is `euro-office-documentserver 9.3.1-dev.1`).

`/index.html` reads identically on both, so the brand comes from
`/welcome/`'s title: "Euro-Office Docs Community Edition" vs "ONLYOFFICE
Docs Community Edition". **A server of the other brand is refused with
the product to use**: `product: euro-office` pointed at an ONLYOFFICE
server fails with `this document server is ONLYOFFICE, not Euro-Office —
use product: onlyoffice`. If the welcome page is turned off (404), the
server is taken to be what the config says.

## Authentication

None — both pages are public, and the probe accepts no credential kind.
Since 2.2.0 a credential attached to a `euro-office` target is a config
error, not silently ignored — see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — e.g. `9.3.1`
- `extra.build` — the build number, e.g. `37`
- `extra.edition` — from the package type: `community` (0), `enterprise`
  (1) or `developer` (2)
- `extra.brand` — the brand from `/welcome/`'s title (`Euro-Office`),
  when the welcome page is on

## CVE correlation

Not matched — neither database has usable data for it. See [CVE correlation](/en/cve/#which-products-are-matched).
It is a fork with no entries of its own; ONLYOFFICE's entries aren't
applied to it.

## Lifecycle resolver

`github:Euro-Office/DocumentServer` — endoflife.date has no Euro-Office
calendar (confirmed 404), so this resolves against GitHub Releases
instead: the latest published, non-prerelease tag only, with no
eol/support/lts dates (GitHub has no opinion on lifecycle policy, only
"what's the latest release").
