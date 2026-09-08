---
title: vCenter Server
description: Configuring enodia to probe VMware vCenter Server.
---

Reads `GET /sdk/vimServiceVersions.xml` — vCenter's SOAP API
version-discovery document, needing no credentials.

```yaml
targets:
  - id: vcenter-main
    product: vcenter
    address: https://vcenter.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## What "version" means here

The value reported (e.g. `8.0.3.0`) is the `vim25` API version out of the
document's `urn:vim25` namespace entry — not a separately-tracked
marketing build string. VMware's own documentation treats the two as
equivalent, and every third-party tool that version-detects vCenter this
way relies on exactly that correspondence.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:vcenter`.
