---
title: Sonatype Nexus Repository
description: Configuring enodia to probe Sonatype Nexus Repository.
---

Reads the `Server` response header Nexus sets on every reply — the same
shape as [nginx](/en/configuration/products/nginx/)/
[Apache](/en/configuration/products/apache/) — but hitting the
purpose-built anonymous status endpoint rather than `/`, since that one
is a fast, empty-bodied health check rather than the full portal page.

```yaml
targets:
  - id: nexus-main
    product: nexus
    address: https://nexus.example.com
```

## Authentication

None — confirmed live against a real `sonatype/nexus3` container:
`"Nexus/3.96.0-09 (COMMUNITY)"` on the status endpoint, the portal page,
and a `401` challenge from a different, actually-protected endpoint
alike. Unlike nginx/Apache, no config toggle to strip this to a bare
`"Nexus"` is documented or was found — but this probe degrades to a
clear error rather than crashing if a future version or a
reverse-proxying setup ever does.

## Recorded fields

Only `version` — this probe records no `extra` fields (the edition,
e.g. `COMMUNITY`/`PRO`, is dropped since `product: nexus` already
implies it rather than needing to be recorded per-target).

## Lifecycle resolver

`endoflife:nexus`.
