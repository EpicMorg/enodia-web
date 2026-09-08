---
title: GitLab
description: Configuring enodia to probe GitLab.
---

Reads `GET /api/v4/version` for the version.

```yaml
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

## Authentication

GitLab requires a credential for this endpoint by default — an
unauthenticated request gets a `401`. A personal access token works both
ways, confirmed live against a real instance:

```yaml
credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  # equally valid — the same token as a bare bearer token
  gitlab-token-bearer:
    kind: bearer
    value: "${GITLAB_TOKEN}"
```

## Recorded fields

- `version`
- `extra.revision`, when present
- `extra.enterprise` — `"true"`/`"false"`, GitLab EE vs. CE

## Lifecycle resolver

`endoflife:gitlab`.
