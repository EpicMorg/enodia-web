---
title: HP iLO 4
description: Configuring enodia to probe an HP iLO 4.
---

Reads `GET /redfish/v1/Managers/1/` — with the trailing slash, which
was confirmed live to matter — for the controller's firmware version.

```yaml
targets:
  - id: vm43-ilo
    product: hp-ilo4
    address: https://ilo-vm43.example.com
    credentials: ilo-ro
```

## Authentication — required

HTTP Basic auth; the endpoint answers `401` without it (confirmed live).

```yaml
credentials:
  ilo-ro:
    kind: basic
    username: enodia
    password: "${ILO_PASSWORD}"
```

A read-only iLO account is enough. iLOs usually serve a self-signed
certificate — pin it rather than turning verification off, see
[Configuration → TLS](/en/configuration/#tls-tls).

## iLO 4 only

iLO 4's API calls itself "HP RESTful Root Service" — an HP API that
predates Redfish, not a Redfish implementation — but this one resource
overlaps with Redfish closely enough to read the same way. Identity is
checked by its `Oem.Hp` key. iLO 5 is fully Redfish-compliant and very
likely needs a different check; no iLO 5 was available to confirm it
live, so it has no probe yet rather than a guessed one.

## Recorded fields

- `version` — parsed from `FirmwareVersion`: `iLO 4 v2.82` → `2.82`
- `extra.raw` — the full `FirmwareVersion` string

## CVE correlation

Not matched yet — the BMC probes are new in 2.1, and upstream left their
CVE mapping for a later, dedicated pass. See
[CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

None — BMC firmware has no public lifecycle calendar (confirmed 404
under every slug tried). Inventory-only.
