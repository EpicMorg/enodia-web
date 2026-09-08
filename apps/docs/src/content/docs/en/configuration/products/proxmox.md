---
title: Proxmox VE
description: Configuring enodia to probe Proxmox VE.
---

Reads `GET /api2/json/version`.

```yaml
targets:
  - id: proxmox-main
    product: proxmox
    address: https://proxmox.example.com:8006
    credentials: proxmox-token
```

## Authentication — required

Confirmed live against a real Proxmox VE 9.2.2 host: this endpoint
answers `401` without credentials. Proxmox's own API token shape is a
plain `Authorization` header value — `PVEAPIToken=user@realm!tokenid=secret`,
the whole string as one token — so `token-header` fits directly, with
its default header (`Authorization`) already correct:

```yaml
credentials:
  proxmox-token:
    kind: token-header
    value: "PVEAPIToken=enodia@pve!readonly=${PROXMOX_TOKEN_SECRET}"
```

The alternative username/password ticket flow (`POST /access/ticket`
for a session cookie plus a CSRF token) is deliberately not supported —
a heavier session-login shape, and Proxmox's own documentation
recommends the API token for unattended automation anyway.

## Recorded fields

- `version`
- `extra.repoid`, when present

## Lifecycle resolver

`endoflife:proxmox-ve`.
