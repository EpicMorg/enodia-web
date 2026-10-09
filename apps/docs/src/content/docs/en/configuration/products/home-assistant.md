---
title: Home Assistant
description: Configuring enodia to probe Home Assistant.
---

Reads `GET /api/config` from Home Assistant's REST API, with a long-lived
access token. The alias `homeassistant` is accepted as `product:` too.

```yaml
targets:
  - id: home-assistant-main
    product: home-assistant
    address: https://home-assistant.example.com
    credentials: ha-token
```

## Authentication — required

Nothing anonymous carries Home Assistant's version: `/api/` and
`/api/config` answer `401`, and `/manifest.json`, `/auth/providers` and
the onboarding endpoints have none (confirmed live on
`ghcr.io/home-assistant/home-assistant:stable` 2026.10.0). The REST API's
documented authentication is a long-lived access token (Profile →
Security → Long-lived access tokens), sent as `Authorization: Bearer`:

```yaml
credentials:
  ha-token:
    kind: bearer
    value: "${HOME_ASSISTANT_TOKEN}"
```

Only `bearer` is accepted; any other kind is a config error. See
[Configuration → Credentials](/en/configuration/#credentials).

## What is read

`/api/config` also returns the home's coordinates, paths and URLs. None
of that is read — only `version`, `state` and the safe/recovery mode
flags.

## Recorded fields

- `version` — e.g. `2026.10.0`
- `extra.state` — e.g. `RUNNING`
- `extra.recoveryMode` — `true` when Home Assistant reports safe mode or
  recovery mode; absent otherwise

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`github:home-assistant/core` — endoflife.date has no Home Assistant
calendar (confirmed 404), so this resolves against GitHub Releases
instead: the latest published, non-prerelease tag only, with no
eol/support/lts dates (GitHub has no opinion on lifecycle policy, only
"what's the latest release"). A release whose tag names a pre-release
(`2026.10.0b7`) is skipped even when GitHub doesn't flag it as one.
