---
title: Apache HTTP Server
description: Configuring enodia to probe Apache HTTP Server.
---

Reads the `Server` response header Apache httpd sets on every reply —
the same shape of problem as [nginx](/en/configuration/products/nginx/):
no version endpoint exists, and any status code still carries the
header. `product: httpd` is accepted as an alias.

```yaml
targets:
  - id: apache-main
    product: apache
    address: https://www.example.com
```

## Authentication

None — the `Server` header is sent on every response regardless of auth.

## `ServerTokens Prod` strips the version

Confirmed live against real `httpd:2.4` containers: the default build
answers `"Apache/2.4.68 (Unix)"`; `ServerTokens Prod` (Apache's own
hardening directive, common in production) strips it to a bare
`"Apache"` with no version at all — a confirmed product with nothing
left to compare against a lifecycle calendar, not a parser bug.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:apache-http-server` — both `apache` and `httpd` 301-redirect
to this slug on endoflife.date; enodia resolves the target slug directly
rather than taking that extra hop on every lookup.
