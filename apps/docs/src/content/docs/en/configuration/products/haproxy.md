---
title: HAProxy
description: Configuring enodia to probe HAProxy.
---

Reads the version out of HAProxy's own **stats page** heading — HAProxy
has no version endpoint and, unlike nginx, sets no `Server` header
identifying itself at all by default.

```yaml
targets:
  - id: haproxy-main
    product: haproxy
    address: https://haproxy.example.com
```

`/stats` is this probe's default path — set `path:` explicitly only if
your stats page is mounted somewhere else.

## The stats page must be enabled

Confirmed live against a real `haproxy:3.0` container: the stats page
(`stats enable` in HAProxy's own config; **not on by default**) is the
only anonymous surface that carries a version at all — the `;csv` stats
export has no version column anywhere in its ~140-column header, so this
probe reads the HTML form specifically.

## Authentication

Optional. `stats auth user:pass` (HAProxy's own config directive for
this page) is ordinary HTTP Basic:

```yaml
credentials:
  haproxy-stats:
    kind: basic
    username: admin
    password: "${HAPROXY_STATS_PASSWORD}"
```

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:haproxy`.
