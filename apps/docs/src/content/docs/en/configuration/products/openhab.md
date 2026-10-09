---
title: openHAB
description: Configuring enodia to probe openHAB.
---

Reads the REST API's root, `GET /rest/`, which openHAB serves without a
login.

```yaml
targets:
  - id: openhab-main
    product: openhab
    address: https://openhab.example.com
```

## Which version is which

`/rest/` answers with two versions: a top-level `version` (`"8"`) that is
the REST API's own, and `runtimeInfo.version` (`"5.2.2"`) that is
openHAB's — confirmed live on `openhab/openhab:latest`, whose
`version.properties` said openhab-distro 5.2.2. The probe reports
`runtimeInfo.version`; the REST API version goes into `extra`.

## Authentication

Optional. `/rest/` answers anonymously by default; `/rest/systeminfo`
needs a login and isn't used. For an instance that turns anonymous
access off, `bearer` or `basic` credentials are passed if configured:

```yaml
credentials:
  openhab-token:
    kind: bearer
    value: "${OPENHAB_TOKEN}"
```

Any other kind is a config error. See
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — `runtimeInfo.version`, e.g. `5.2.2`
- `extra.build` — `runtimeInfo.buildString`, e.g. `Release Build`
- `extra.restApiVersion` — the top-level `version`, e.g. `8`

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`github:openhab/openhab-distro` — endoflife.date has no openHAB calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release"). openhab-distro publishes milestones (`5.3.0.M2`) as ordinary
releases, not flagged as pre-releases; the resolver skips them by their
tag name, so a milestone doesn't make every stable openHAB read as
behind.
