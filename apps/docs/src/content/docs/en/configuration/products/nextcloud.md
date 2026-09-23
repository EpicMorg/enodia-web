---
title: Nextcloud
description: Configuring enodia to probe Nextcloud.
---

Reads `GET /status.php` for the version — a load-balancer health check
endpoint, reachable even before setup has run and while maintenance mode
is on.

```yaml
targets:
  - id: nextcloud-main
    product: nextcloud
    address: https://nextcloud.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Which version field

`versionstring` (e.g. `34.0.3`) is what's reported, not `version` (e.g.
`34.0.3.2`) — confirmed live: `versionstring` is what
[endoflife.date](https://endoflife.date/nextcloud)'s cycles use for
`latest`, and `version`'s internal fourth build component never appears
in the lifecycle calendar at all.

## Recorded fields

- `version` — from `versionstring`
- `extra.installed`, `extra.maintenance` — `"true"`/`"false"`
- `extra.buildVersion` — the raw `version` field, kept for reference
- `extra.enterprise` — from `status.php`'s `edition`: empty (the
  community server, confirmed live) → `"false"`, `enterprise` → `"true"`;
  any other value is left unreported rather than guessed at

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured. Edition-aware: the probe records the server's own edition in `extra.enterprise`, and a community instance doesn't see enterprise-only findings. An unknown edition keeps every finding.

## Lifecycle resolver

`endoflife:nextcloud`.
