---
title: Uptime Kuma
description: Configuring enodia to probe Uptime Kuma.
---

Logs in over Uptime Kuma's own socket.io API and reads the version from
the `info` event the server sends after login.

```yaml
targets:
  - id: uptime-kuma-main
    product: uptime-kuma
    address: https://uptime-kuma.example.com
    credentials: kuma-monitor
```

## Why a login

Nothing anonymous carries the version. The server's `info` event does,
but a fresh connection gets it without one until the socket is logged
in. `/metrics` has no version series, and API keys open only `/metrics`.
Confirmed live on 1.23.17 and 2.5.5, and on a production instance's
public status page, whose `/api/status-page/*` and socket carry none
either.

So the probe speaks just enough of Engine.IO v4's HTTP long-polling
transport (`/socket.io/?EIO=4&transport=polling`) to open a session, emit
`login`, and poll until an `info` event with `version` arrives — then
disconnects. 1.23.17 sends the versioned `info` after the login
acknowledgement, 2.5.5 before it; both orders are handled.

## Authentication — required

A username and password, `kind: password`:

```yaml
credentials:
  kuma-monitor:
    kind: password
    username: monitor
    password: "${UPTIME_KUMA_PASSWORD}"
```

Only `password` is accepted; any other kind is a config error. See
[Configuration → Credentials](/en/configuration/#credentials).

- A refused login is an authentication failure carrying Uptime Kuma's own
  message (`Incorrect username or password.`).
- **A user with 2FA can't log in this way** — the login acknowledgement
  asks for a token. That's reported, not worked around: use a monitoring
  user without 2FA.
- Uptime Kuma rate-limits logins: a run right after several wrong
  passwords once failed on 2.5.5, and passed on every run after.
- A plain-HTTP Uptime Kuma needs `allow_insecure_transport`, as for any
  credential — see
  [HTTPS first](/en/concepts/#https-first-credentials-never-sent-in-the-clear-by-default).

## Recorded fields

- `version` — e.g. `2.5.5`
- `extra.latestVersion` — Uptime Kuma's own update check, e.g. `2.5.5`
- `extra.dbType` — e.g. `sqlite`

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`github:louislam/uptime-kuma` — endoflife.date has no Uptime Kuma
calendar (confirmed 404), so this resolves against GitHub Releases
instead: the latest published, non-prerelease tag only, with no
eol/support/lts dates (GitHub has no opinion on lifecycle policy, only
"what's the latest release").
