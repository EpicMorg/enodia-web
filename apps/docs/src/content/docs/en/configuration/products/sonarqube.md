---
title: SonarQube
description: Configuring enodia to probe SonarQube Server or Community Build.
---

Reads `GET /api/system/status` for the version — the same endpoint,
regardless of which SonarQube you're actually running (see below).

```yaml
targets:
  - id: sonarqube-main
    product: sonarqube
    address: https://sonarqube.example.com
```

## Authentication

None — this endpoint (along with `/api/server/version` and
`/api/system/ping`) stays reachable without credentials even after
enabling SonarQube's "Force user authentication" global setting.
SonarQube treats it as a health-check route a load balancer needs to
reach with no login, not a normal protected API.

## SonarQube Server vs. SonarQube Community Build

SonarSource split "SonarQube" into two products at the end of 2024:
**SonarQube Server** (the direct continuation of every former Community/
Developer/Enterprise/Data Center edition, still calendar-versioned
`2025.1`, `2026.4`, ...) and **SonarQube Community Build** (a new,
separate, always-free build with its own faster cadence, versioned
`24.12`, `25.12`, `26.9`, ... — the same calendar scheme, just a
two-digit year instead of four). endoflife.date tracks these as two
distinct pages with genuinely different cycle data — `product:
sonarqube` doesn't need a second config entry to tell them apart, since
which one applies is reliably readable from the version string
`sonarqubeProbe` already fetches:

- A four-digit leading year (`2025.x`, `2026.x`) → **SonarQube Server**.
- A two-digit one from `24` onward (`24.x`, `25.x`, `26.x`) →
  **SonarQube Community Build**.
- Anything smaller (a pre-split bare major, e.g. `9.9.8.100196`,
  `10.7.0.96327`) → treated as Community Build, since both pages carry
  identical history for versions from before the split.

## Recorded fields

- `version`
- `extra.id`
- `extra.status` — one of `UP`, `DOWN`, `STARTING`, `RESTARTING`,
  `DB_MIGRATION_NEEDED`, `DB_MIGRATION_RUNNING`; a fact about server
  health recorded as-is, not turned into an error when it isn't `UP`

## Lifecycle resolver

Picked per observation, not fixed: `endoflife:sonarqube-server` or
`endoflife:sonarqube-community`, chosen from the version string as
described above. `enodia products`' own listing (which runs with
nothing yet probed) shows `endoflife:sonarqube-server` as a static
fallback — that's only what prints before any target has actually been
checked, not what every observation necessarily resolves against.
