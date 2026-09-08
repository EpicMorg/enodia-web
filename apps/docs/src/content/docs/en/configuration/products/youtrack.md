---
title: YouTrack
description: Configuring enodia to probe YouTrack.
---

Reads `GET /api/config?fields=version`.

```yaml
targets:
  - id: youtrack-main
    product: youtrack
    address: https://youtrack.example.com
```

## Authentication

None needed — confirmed live against a real, internet-facing YouTrack
instance: this endpoint needs no credentials, and asking for any field
beyond `version` (`buildDate`, `edition`, ...) is silently ignored for an
anonymous caller rather than returned. `bearer` is accepted if you'd
rather authenticate anyway.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:youtrack`.
