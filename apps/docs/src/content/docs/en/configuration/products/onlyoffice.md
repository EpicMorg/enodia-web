---
title: ONLYOFFICE Docs
description: Configuring enodia to probe ONLYOFFICE Docs.
---

Reads the document server's root, `GET /index.html`, anonymously — it
answers even with JWT enabled: "Server is functioning normally. Version:
9.4.0. Build: 129. Release date: … Package type: 0. …". Then reads
`GET /welcome/` to check the brand. Default scheme is `https`.

```yaml
targets:
  - id: onlyoffice-main
    product: onlyoffice
    address: https://office.example.com
```

## One probe, two products

ONLYOFFICE Docs and its [Euro-Office](/en/configuration/products/euro-office/)
fork (as shipped for Nextcloud) are the same server and share one probe,
but each has its own release line, so each is its own product with its
own resolver — compared against ONLYOFFICE's releases, a current
Euro-Office would always read as behind.

`/index.html` reads identically on both, so the brand comes from
`/welcome/`'s title: "ONLYOFFICE Docs Community Edition" vs "Euro-Office
Docs Community Edition". **A server of the other brand is refused with
the product to use**: `product: onlyoffice` pointed at a Euro-Office
server fails with `this document server is Euro-Office, not ONLYOFFICE —
use product: euro-office`, rather than recording it as an ONLYOFFICE
fact (the same way [`mysql`](/en/configuration/products/mysql/) refuses
MariaDB). If the welcome page is turned off (404), the server is taken to
be what the config says.

The coauthoring service's `version` command needs the JWT secret, and
`api.js` carries no version — hence `/index.html`.

## Authentication

None — both pages are public, and the probe accepts no credential kind.
Since 2.2.0 a credential attached to an `onlyoffice` target is a config
error, not silently ignored — see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — e.g. `9.4.0`
- `extra.build` — the build number, e.g. `129`
- `extra.edition` — from the package type: `community` (0), `enterprise`
  (1) or `developer` (2)
- `extra.brand` — the brand from `/welcome/`'s title (`ONLYOFFICE`), when
  the welcome page is on

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.
NVD's `onlyoffice:document_server` is used — `onlyoffice:server` is the
separate Community Server.

## Lifecycle resolver

`github:ONLYOFFICE/DocumentServer` — endoflife.date has no ONLYOFFICE
calendar (confirmed 404), so this resolves against GitHub Releases
instead: the latest published, non-prerelease tag only, with no
eol/support/lts dates (GitHub has no opinion on lifecycle policy, only
"what's the latest release").
