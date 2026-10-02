---
title: Supermicro BMC
description: Configuring enodia to probe a Supermicro BMC over Redfish.
---

Reads `GET /redfish/v1/Managers/1` — the BMC's own Redfish manager
resource — for its firmware version.

```yaml
targets:
  - id: srv125-bmc
    product: supermicro-bmc
    address: https://bmc-srv125.example.com
    credentials: bmc-admin
```

## Authentication — required

HTTP Basic auth; the endpoint answers `401` without it (confirmed live).

```yaml
credentials:
  bmc-admin:
    kind: basic
    username: ADMIN
    password: "${BMC_PASSWORD}"
```

A read-only BMC account is enough. BMCs usually serve a self-signed
certificate — pin it rather than turning verification off, see
[Configuration → TLS](/en/configuration/#tls-tls).

## Vendor identity check

Confirmed live against two generations — an X12-series board (AST2600,
firmware `01.05.25`) and an older X9/X10-era one (firmware `01.73.13`).
Neither carries a manufacturer field this probe could reach in one
request, but both carry an `Oem.Supermicro` key on this exact resource,
so that's what's checked. Another vendor's BMC answering the same path
fails rather than being recorded as Supermicro.

## Recorded fields

- `version` — `FirmwareVersion`, e.g. `01.05.25`
- `extra.model`, when present

## CVE correlation

Not matched yet — the BMC probes are new in 2.1, and upstream left their
CVE mapping for a later, dedicated pass. See
[CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

None — BMC firmware has no public lifecycle calendar (confirmed 404
under every slug tried). Inventory-only.
