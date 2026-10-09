---
title: qBittorrent
description: Configuring enodia to probe qBittorrent.
---

Reads the version from qBittorrent's Web UI API: logs in with
`POST /api/v2/auth/login`, then reads `GET /api/v2/app/version` and
`GET /api/v2/app/buildInfo` with the session cookie, and logs out.

```yaml
targets:
  - id: qbittorrent-main
    product: qbittorrent
    address: https://qbittorrent.example.com
    credentials: qbittorrent-monitor
```

## Authentication

Optional, but usually needed: the Web UI answers everything, `/`
included, with `401` without a session (confirmed live against
`linuxserver/qbittorrent` 5.2.4). It's a form login (fields `username`
and `password`), not HTTP Basic, so the kind is `password`:

```yaml
credentials:
  qbittorrent-monitor:
    kind: password
    username: monitor
    password: "${QBITTORRENT_PASSWORD}"
```

Only `password` is accepted; any other kind is a config error. See
[Configuration → Credentials](/en/configuration/#credentials).

Without credentials the probe asks `/api/v2/app/version` directly — for
a Web UI configured to bypass authentication for the prober's subnet. If
that answers `401`, the error says to configure credentials.

Whatever session cookie the login sets is passed back as is: 5.x answers
`204` and sets `QBT_SID_<port>`, 4.x answers `200 Ok.` and sets `SID`. A
wrong password is `401` on 5.x and `200 Fails.` on 4.x; both are reported
as an authentication failure.

## Behind a reverse proxy

qBittorrent checks that the `Host` header's port matches its own, and
that `Referer`/`Origin` matches `Host`. The login sends the target's own
origin as `Referer`. Behind a reverse proxy that maps ports, qBittorrent
has to be configured for that — otherwise every request is `401`, which
is what a live capture through a remapped container port showed until
the ports matched.

## Recorded fields

- `version` — `/api/v2/app/version` without the leading `v`, e.g.
  `5.2.4`
- `extra.libtorrent` — from `/api/v2/app/buildInfo`, e.g. `2.0.15.0`
- `extra.qt` — from `/api/v2/app/buildInfo`, e.g. `6.11.2`

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`github:qbittorrent/qBittorrent` — endoflife.date has no qBittorrent
calendar (confirmed 404), so this resolves against GitHub Releases
instead: the latest published, non-prerelease tag only, with no
eol/support/lts dates (GitHub has no opinion on lifecycle policy, only
"what's the latest release"). Releases are tagged `release-5.2.4`; the
resolver drops the `release-` prefix and reads the rest as the version.
