---
title: phpIPAM
description: Configuring enodia to probe phpIPAM.
---

Reads the login page, `GET /index.php?page=login`, anonymously. Scheme
defaults to `https`.

```yaml
targets:
  - id: ipam-main
    product: phpipam
    address: https://ipam.example.com
```

## Where the version comes from

The login page's footer reads `phpIPAM IP address management [v1.8.3]`,
and every stylesheet and script on it is loaded with `?v=1.8.3_r002_v46` —
phpIPAM's own script prefix: the visible version, the code revision and
the database schema version. The footer gives the version; the asset
suffix is the fallback when the footer has been customised away, and the
source of the revision and schema version. Older releases load assets
with a bare `?v=1.7.3` (seen on a production 1.7.3), without the revision
and schema parts — the version still reads, the two `extra` fields are
then absent. A page with neither is reported as not supported.

## Authentication

None — the probe reads an anonymous page and accepts no credential kind.
Since 2.2.0 a credential configured on this target is a config error
rather than being ignored; see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — e.g. `1.8.3`, from `phpIPAM IP address management [v1.8.3]`
  (confirmed live on `phpipam/phpipam-www:latest`)
- `extra.revision` — the code revision from the asset suffix, e.g. `002`
- `extra.dbVersion` — the database schema version from the asset suffix,
  e.g. `46`

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is
configured.

## Lifecycle resolver

`github:phpipam/phpipam` — endoflife.date has no phpIPAM calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
