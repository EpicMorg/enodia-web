---
title: nginx
description: Configuring enodia to probe nginx.
---

Reads the `Server` response header nginx sets on every reply. There's no
version endpoint: nginx (unlike NGINX Plus's REST API) exposes nothing
else anonymously — `ngx_http_stub_status_module`'s `/stub_status` gives
connection counters, never a version.

```yaml
targets:
  - id: nginx-main
    product: nginx
    address: https://www.example.com
```

## Authentication

None — any status code is accepted, since nginx stamps its own `Server`
header on error pages and redirects the same as on a `200`. A target
whose `/` happens to 404 or sit behind a basic-auth vhost still reports
a version just fine. Confirmed live against real `nginx:1.27.4`
containers for both cases.

## `server_tokens off` strips the version

nginx's own hardening setting (common in production) stamps the header
as a bare `"nginx"` with no version at all — a confirmed product with
nothing left to compare against a lifecycle calendar, not a parser bug.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:nginx`.
