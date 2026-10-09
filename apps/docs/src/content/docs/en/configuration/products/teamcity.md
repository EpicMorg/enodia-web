---
title: TeamCity
description: Configuring enodia to probe JetBrains TeamCity.
---

Reads the version anonymously from `GET /app/rest/server/version` when
no credentials are configured, or from `GET /app/rest/server` — the
entry point TeamCity's own REST API reference points at first — when a
token is.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    # credentials: teamcity-pat    # optional, see below
```

## Authentication — optional, and easy to get backwards if you add it

**No credentials needed.** TeamCity serves `/app/rest/server/version` to
anyone, as plain text — `2026.1.1 (build 222577)` — even with guest login
off. Confirmed on fresh servers 2017.2 through 2026.1 with no
administrator created, and on seven production instances (2024.03 to
2026.1.3) with no credentials. It isn't guest access: `/app/rest/server`
and the guest-only endpoints are refused on the same servers. While
TeamCity is starting up it answers every path with a 200 HTML
maintenance page, so the reply has to match `YYYY.N[.N] (build N)` in
full or the target fails as unparseable.

**With a token configured** the probe reads `/app/rest/server` instead —
you asked for an authenticated read, it also carries `internalId`, and
a wrong token stays a visible auth error rather than being papered over
by the anonymous path. `/app/rest/server` is never anonymous: a fresh
instance answers `401` with both Basic and Bearer challenges. TeamCity
has **two distinct kinds of token, confirmed live, that only
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
- `extra.buildNumber`
- `extra.internalId` — only with a token (`/app/rest/server`)

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

None — endoflife.date has no TeamCity calendar (confirmed 404).
Inventory-only for now.
