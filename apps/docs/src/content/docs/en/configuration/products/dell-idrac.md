---
title: Dell iDRAC
description: Configuring enodia to probe a Dell iDRAC over Redfish.
---

Two requests over Redfish: `GET /redfish/v1` for the vendor identity,
then `GET /redfish/v1/Managers/iDRAC.Embedded.1` for the firmware
version.

```yaml
targets:
  - id: blade-1a-idrac
    product: dell-idrac
    address: https://idrac-blade-1a.example.com
    credentials: idrac-ro
```

## Authentication — required

HTTP Basic auth; the endpoints answer `401` without it (confirmed live).

```yaml
credentials:
  idrac-ro:
    kind: basic
    username: enodia
    password: "${IDRAC_PASSWORD}"
```

A read-only iDRAC account is enough. iDRACs usually serve a self-signed
certificate — pin it rather than turning verification off, see
[Configuration → TLS](/en/configuration/#tls-tls).

## Vendor identity check

Why two requests: confirmed live on a real 12G iDRAC, the Manager
resource itself carries no vendor marker at all, while the service root
`/redfish/v1` carries `Oem.Dell` (with the service tag) and a "Integrated
Dell Remote Access Controller" product string. The first request
confirms it's a Dell; the second reads the version.
`iDRAC.Embedded.1` is the standard Dell id of the embedded controller,
the one checked.

A Dell **CMC** (the chassis-level controller of a blade enclosure) is a
different product with no Redfish endpoint at all, and isn't covered.

## Recorded fields

- `version` — `FirmwareVersion`, e.g. `2.65.65.65`
- `extra.model`, when present
- `extra.serviceTag`, when present

## CVE correlation

Not matched yet — the BMC probes are new in 2.1, and upstream left their
CVE mapping for a later, dedicated pass. See
[CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

None — BMC firmware has no public lifecycle calendar (confirmed 404
under every slug tried). Inventory-only.
