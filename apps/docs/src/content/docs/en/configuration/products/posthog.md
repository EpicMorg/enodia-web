---
title: PostHog
description: Configuring enodia to probe PostHog.
---

Reads the anonymous login page, `GET /login`, of a self-hosted PostHog.
The page embeds `window.POSTHOG_APP_CONTEXT = JSON.parse("{...}")` — a
JSON document inside a JavaScript string literal — and its `commit_sha`
is reported as the version. Default scheme is `https`.

```yaml
targets:
  - id: posthog-main
    product: posthog
    address: https://posthog.example.com
```

## The git commit is the version

PostHog no longer ships numbered releases: a self-hosted (hobby) install
tracks the main branch, and the only identifier it exposes is the commit
it was built from (confirmed live, anonymously, on a production
self-hosted instance). So `version` here is a commit hash such as
`55babe9554`, not a release number. `/_preflight/` is anonymous too but
carries only service health and the realm; `/api/instance_status` needs a
login.

## Authentication

None — the login page is public, and the probe accepts no credential
kind. Since 2.2.0 a credential attached to a `posthog` target is a config
error, not silently ignored — see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — the git commit, e.g. `55babe9554`
- `extra.commit` — the same commit
- `extra.realm` — e.g. `hosted-clickhouse`, when the page carries one

## CVE correlation

Not matched — neither database has usable data for it. See [CVE correlation](/en/cve/#which-products-are-matched).
NVD's version bounds for PostHog are commit hashes, which can't be
compared.

## Lifecycle resolver

None — there are no releases to compare a commit with. Telling how far
behind main a commit is would take GitHub's compare API, a different kind
of resolver than any enodia has; not done. Inventory-only.
