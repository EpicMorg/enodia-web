---
title: pfSense
description: Configuring enodia to probe pfSense Community Edition via SSH.
---

Uses the same SSH mechanism, credentials, and host key verification as
the [SSH-based OS identification](/en/configuration/products/ssh-os-probes/)
family, but reads pfSense's own `/etc/version` and `/etc/platform` in
one round trip.

```yaml
targets:
  - id: pfsense-fw
    product: pfsense
    address: fw.example.com
    credentials: linux-host-ssh
```

## Authentication — required

An SSH credential, `ssh-key` or `password` — see
[Configuration → Credentials](/en/configuration/#credentials).

## Community Edition only

Confirmed live against three real pfSense CE hosts (`2.7.2-RELEASE`,
`2.8.1-RELEASE`): `/etc/version` holds exactly the version pfSense's own
dashboard shows, and `/etc/platform` reads `pfSense`.

Netgate's commercial **pfSense Plus** is a different product with its
own calendar-based version scheme (`24.11`, not `2.x.y-RELEASE`). By its
documentation it reports `pfSense-Plus` in `/etc/platform`; this probe
rejects that rather than record a Plus host as a CE fact. No Plus host
was available to confirm this live — it's based on documentation alone.

## Recorded fields

- `version` — `/etc/version` as is, e.g. `2.8.1-RELEASE`
- `extra.hostKeyVerified`

## CVE correlation

Not matched yet — pfSense is new in 2.1, and upstream left its CVE
mapping for a later, dedicated pass. See
[CVE correlation](/en/cve/#which-products-are-matched).

## Lifecycle resolver

None — endoflife.date has no page under `pfsense`, `pfsense-ce` or
`pfsense-plus` (confirmed 404). Inventory-only for now.
