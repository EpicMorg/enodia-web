---
title: Netdata
description: Configuring enodia to probe Netdata.
---

Reads the agent's `GET /api/v1/info`, served without a login by default.
Scheme defaults to `https`.

```yaml
targets:
  - id: netdata-01
    product: netdata
    address: https://netdata-01.example.com
```

## What is read

The reply starts with `"version": "v2.12.1"`, with `release-channel`
alongside. The rest of it describes the host — uid, kernel, labels,
hardware, cloud — none of which describes the software itself, so only
the version and the release channel are read. A reply with no `version`
is reported as not supported (not Netdata).

## Authentication

Optional — the agent answers anonymously by default. `basic` or `bearer`
are passed through when configured, for an agent behind a proxy that asks
for them; since 2.2.0 any other kind is a config error. See
[Configuration → Credentials](/en/configuration/#credentials).

```yaml
credentials:
  netdata-proxy:
    kind: basic
    username: enodia
    password: "${NETDATA_PROXY_PASSWORD}"
```

## Recorded fields

- `version` — as the agent reports it, e.g. `v2.12.1` (confirmed live on
  `netdata/netdata:stable`)
- `extra.releaseChannel` — e.g. `stable` or `nightly`, when present

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is
configured.

## Lifecycle resolver

`github:netdata/netdata` — endoflife.date has no Netdata calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
