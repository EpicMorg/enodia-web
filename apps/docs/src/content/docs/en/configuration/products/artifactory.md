---
title: Artifactory
description: Configuring enodia to probe JFrog Artifactory.
---

Reads `GET /artifactory/api/system/version` for the version.

```yaml
targets:
  - id: artifactory-main
    product: artifactory
    address: https://artifactory.example.com
```

## Authentication

Optional. Whether this endpoint needs credentials varies by instance —
confirmed against two real servers: a fresh OSS install answers `401`
anonymously, but a production instance with "Allow Anonymous Access"
enabled answered `200` with no credential at all. Basic auth works when
needed:

```yaml
credentials:
  artifactory-admin:
    kind: basic
    username: admin
    password: "${ARTIFACTORY_PASSWORD}"
```

## Recorded fields

- `version` — e.g. `7.161.20`
- `extra.revision`, when the response carries one

The response also includes `license`, `addons`, and `entitlements` —
deliberately never read. On a real production instance `license` was a
per-install fingerprint, not a fixed literal, and none of the three
describe the software itself.

## Lifecycle resolver

`endoflife:artifactory`.
