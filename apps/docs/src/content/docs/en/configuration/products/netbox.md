---
title: NetBox
description: Configuring enodia to probe NetBox.
---

Reads the anonymous login page, `GET /login/`, whose root element carries
`data-netbox-version` — e.g. `4.3.3-Docker-3.3.0` on a NetBox run from
netbox-docker. If the attribute is missing, the version the page loads its
bundle with (`/static/netbox.js?v=4.3.3`) is used instead. Default scheme
is `https`.

```yaml
targets:
  - id: netbox-main
    product: netbox
    address: https://netbox.example.com
```

## Why the login page

NetBox's REST API (`/api/status/`) needs a token; the login page carries
the version without one (confirmed live on a production NetBox from
netbox-docker). The part before `-Docker-` is NetBox's own version; the
rest is netbox-docker's image version.

## Authentication

None — the login page is public, and the probe accepts no credential
kind. Since 2.2.0 a credential attached to a `netbox` target is a config
error, not silently ignored — see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — NetBox's version, e.g. `4.3.3`
- `extra.netboxDocker` — netbox-docker's image version (`3.3.0`), only
  when `data-netbox-version` has a `-Docker-` suffix

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured.
BDU's "LenelS2 NetBox" is a different product and isn't used.

## Lifecycle resolver

`github:netbox-community/netbox` — endoflife.date has no NetBox calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
