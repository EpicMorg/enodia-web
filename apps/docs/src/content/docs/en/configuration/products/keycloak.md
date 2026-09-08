---
title: Keycloak
description: Configuring enodia to probe Keycloak.
---

Reads `GET /admin/serverinfo` for the version.

```yaml
targets:
  - id: keycloak-main
    product: keycloak
    address: https://keycloak.example.com
    credentials: keycloak-token
```

## Authentication — required

Keycloak is the one product here with **no anonymous path to the version
at all**: confirmed live, `/realms/<realm>/.well-known/openid-configuration`
(the endpoint every realm exposes without a token) carries no version
field anywhere, and `/admin/serverinfo` — which does — answers `401`
without one. A target with no credential configured is **skipped**, not
failed, at collection time.

```yaml
credentials:
  keycloak-token:
    kind: bearer
    value: "${KEYCLOAK_ACCESS_TOKEN}"
```

Only `bearer` is accepted. Obtaining that access token — the standard
OpenID Connect way, against the realm's own token endpoint — is outside
enodia's job (probes own transport, not identity federation): the config
expects one already issued. Access tokens are normally short-lived, so
whatever supplies `KEYCLOAK_ACCESS_TOKEN` at collection time needs to keep
it fresh; enodia itself has no token-refresh logic.

## Recorded fields

- `version` — from `systemInfo.version`
- `extra.javaVersion`

## Lifecycle resolver

`endoflife:keycloak`.
