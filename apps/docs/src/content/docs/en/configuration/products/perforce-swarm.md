---
title: Perforce Helix Swarm
description: Configuring enodia to probe Perforce Helix Swarm.
---

Reads `GET /api/version` for the version — deliberately the unversioned
path rather than a specific `/api/v11/version`. Perforce has moved this
API's floor version over the years (Swarm 2017.3 only speaks v7; 2018.2
speaks v9), and requesting an out-of-range `vN` gets a `401` on an
otherwise fully anonymous endpoint. The unversioned form sidesteps
guessing which `vN` a given install still accepts.

```yaml
targets:
  - id: swarm-main
    product: perforce-swarm
    address: https://swarm.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Version parsing

The raw field looks like `SWARM/2024.6/2710109 (2025/01/28)` — parsed
into a plain version (`2024.6`), a changelist, and a release date. An
unrecognized format falls back to keeping the raw string as `version`
rather than failing outright, since it's still the fact the server
reported.

## Recorded fields

- `version` — e.g. `2024.6`
- `extra.raw` — the full unparsed string
- `extra.changelist`, `extra.releaseDate` — only when the format parsed

## Lifecycle resolver

None — endoflife.date has no calendar under `perforce-swarm`,
`helix-swarm`, `swarm`, or `perforce` (all confirmed 404). Inventory-only
for now.
