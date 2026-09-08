---
title: MikroTik RouterOS
description: Configuring enodia to probe MikroTik RouterOS.
---

Reads `GET /rest/system/resource` — RouterOS's REST API (RouterOS 7.1+;
the `www` service, on by default on a fresh install, must be enabled).

```yaml
targets:
  - id: router-main
    product: routeros
    address: https://router.example.com
    credentials: routeros-admin
```

## Authentication — required

Confirmed live against a real CHR (Cloud Hosted Router) 7.24.2 VM: this
endpoint always answers `401` without credentials, and the anonymous
webfig login page at `/` carries no version text anywhere either — this
is a router's own admin API, so requiring credentials is the correct
default posture, not a hardening option to work around.

```yaml
credentials:
  routeros-admin:
    kind: basic
    username: enodia-ro
    password: "${ROUTEROS_PASSWORD}"
```

The SSH banner (`"SSH-2.0-ROSSSH"`, confirmed live) carries no version
either, ruling out an SSH-banner-based approach the way
[SSH](/en/configuration/products/ssh/)/[MySQL](/en/configuration/products/mysql/)
use one.

## Recorded fields

- `version`
- `extra.boardName`, `extra.architecture`

## Lifecycle resolver

`endoflife:routeros`.
