---
title: Mattermost
description: Configuring enodia to probe Mattermost.
---

Reads `GET /api/v4/config/client?format=old` for the version — the same
public client-config endpoint a login page needs before any session
exists.

```yaml
targets:
  - id: mattermost-main
    product: mattermost
    address: https://mattermost.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

The real response is a full client-config dump — a hundred-plus keys,
including feature flags, SSO button colors, and genuinely
deployment-identifying fields (`SiteName`, `SupportEmail`, a
telemetry/diagnostic ID, a signing public key). None of that describes
the software itself, so only `Version` and the `Build*` fields are read.

## Recorded fields

- `version`
- `extra.buildNumber`, `extra.buildHash`

## Lifecycle resolver

`endoflife:mattermost`.
