---
title: DomainMOD
description: Configuring enodia to probe DomainMOD.
---

Reads `GET /CHANGELOG`, the changelog file DomainMOD ships in its web root,
served as a static file. Scheme defaults to `https`.

```yaml
targets:
  - id: domainmod-main
    product: domainmod
    address: https://domains.example.com
```

A DomainMOD installed under a sub-path (`DOMAINMOD_WEB_ROOT`) is reached by
putting that path in the address, e.g.
`https://www.example.com/domainmod`.

## Why the CHANGELOG

DomainMOD shows `Version 4.23.0` only in the footer of the logged-in
layout. The CHANGELOG is anonymous: it starts with `DomainMOD CHANGELOG`,
a rule, then the newest entry first — `v4.23.0     2025-01-04`. The probe
requires that heading, so another application's changelog isn't read as
DomainMOD's. A web server that blocks the file makes the target "not
supported".

## Authentication

None — the probe reads a static file and accepts no credential kind.
Since 2.2.0 a credential configured on this target is a config error
rather than being ignored; see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

Only `version` — e.g. `4.23.0`, from the CHANGELOG's newest entry
`v4.23.0     2025-01-04` (confirmed live on `domainmod/domainmod:latest`,
whose `software.inc.php` says `SOFTWARE_VERSION = '4.23.0'`). This probe
records no `extra` fields.

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`github:domainmod/domainmod` — endoflife.date has no DomainMOD calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
