---
title: Jenkins
description: Configuring enodia to probe Jenkins.
---

Reads the version from the **`X-Jenkins` response header**, not the
response body — Jenkins sets that header on every response, including a
`403` to an unauthenticated request, while the body an authenticated
request gets back has no version field anywhere in it.

```yaml
targets:
  - id: jenkins-main
    product: jenkins
    address: https://jenkins.example.com
```

## Authentication

Optional. A fresh instance with its default security realm answers
`/api/json` with `403` to an anonymous request — that's not a failure
here, `X-Jenkins` is still set on that same response. Basic auth is
accepted if you'd rather authenticate:

```yaml
credentials:
  jenkins-admin:
    kind: basic
    username: admin
    password: "${JENKINS_TOKEN}"
```

## Recorded fields

- `version` — from the `X-Jenkins` header
- `extra.mode`, `extra.useSecurity` — only populated when the request was
  authenticated enough to get a `200` body back; absent on an anonymous
  `403`

## Lifecycle resolver

`endoflife:jenkins`.
