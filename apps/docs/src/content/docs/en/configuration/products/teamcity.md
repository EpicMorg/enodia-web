---
title: TeamCity
description: Configuring enodia to probe JetBrains TeamCity.
---

Reads `GET /app/rest/server` — the entry point TeamCity's own REST API
reference points at first — for the version.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    credentials: teamcity-pat
```

## Authentication — required, and easy to get backwards

There's no anonymous access by default — a fresh instance answers `401`
with both Basic and Bearer challenges (guest login is off by default).
TeamCity has **two distinct kinds of token, confirmed live, that only
work as opposite credential kinds**:

- The one-time **superuser bootstrap token** a fresh server logs on
  first start only works as **Basic** — empty username, the token as
  password. Sent as a bare `Authorization: Bearer`, it's rejected.
- A normal user's **personal access token** (Profile → Access Tokens —
  the way real long-lived automation actually authenticates) is the
  opposite: confirmed against seven real production instances, it works
  as **Bearer** and is flatly rejected as Basic ("Incorrect username or
  password", even with an empty username).

```yaml
credentials:
  # bootstrap token — Basic, empty username
  teamcity-bootstrap:
    kind: basic
    username: ""
    password: "${TEAMCITY_BOOTSTRAP_TOKEN}"

  # personal access token — Bearer
  teamcity-pat:
    kind: bearer
    value: "${TEAMCITY_TOKEN}"
```

Use the personal access token in any long-running config — the bootstrap
token is meant to be rotated away after first login.

## Recorded fields

- `version` — the full string, e.g. `2026.2 (build 238924)`
- `extra.buildNumber`, `extra.internalId`

## Lifecycle resolver

None — endoflife.date has no TeamCity calendar (confirmed 404).
Inventory-only for now.
