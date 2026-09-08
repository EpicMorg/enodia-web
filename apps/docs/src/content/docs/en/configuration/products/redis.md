---
title: Redis
description: Configuring enodia to probe Redis.
---

A raw RESP-protocol probe, not HTTP — `address` is `host` or `host:port`,
no scheme. Port defaults to `6379` when omitted. Reads `redis_version`
out of `INFO server`.

```yaml
targets:
  - id: redis-main
    product: redis
    address: cache.example.com:6379
```

## Authentication

Optional — most Redis deployments have no `requirepass`, and enodia
cannot know in advance whether a given one does. A target with no
credential configured simply tries `INFO` first and only sends `AUTH`
when the server actually rejects the plain request with `NOAUTH`.

```yaml
credentials:
  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  # Redis 6+ ACL user — set username too
  redis-acl-user:
    kind: password
    username: enodia_ro
    password: "${REDIS_PASSWORD}"
```

A wrong or missing password when one is required surfaces as an auth
error (`NOAUTH`/`WRONGPASS`), same as any other credentialed probe here.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:redis`.
