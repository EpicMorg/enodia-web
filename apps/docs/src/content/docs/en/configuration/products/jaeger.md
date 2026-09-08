---
title: Jaeger
description: Configuring enodia to probe Jaeger.
---

Reads the version Jaeger's query-service (the UI-serving component, port
16686 by default) embeds into its own `index.html` via build-time
search/replace — there's no separate version API.

```yaml
targets:
  - id: jaeger-main
    product: jaeger
    address: https://jaeger.example.com
```

## Authentication

None — Jaeger has no authentication of its own at all. A deployment
behind a reverse proxy or SSO gateway (oauth2-proxy is a common real
choice) answers with a redirect into that gateway's own login flow
instead of Jaeger's HTML, which surfaces as this probe's own "no
JAEGER_VERSION found" error — not something this probe can complete on
its own, the same shape of gap a form-login product would have.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:jaeger`.
