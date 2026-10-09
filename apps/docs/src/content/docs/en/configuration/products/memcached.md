---
title: memcached
description: Configuring enodia to probe memcached.
---

A raw TCP probe on the text protocol, not HTTP — `address` is `host` or
`host:port`, no scheme. Port defaults to `11211` when omitted. Sends
`version` and reads the one-line reply, `VERSION 1.6.45`.

```yaml
targets:
  - id: memcached-01
    product: memcached
    address: cache.example.com:11211
```

## Authentication

None — the text protocol has no authentication. A server started with
SASL (`-S`) speaks only the binary protocol and answers the text command
with an error; that is reported as not supported rather than guessed at.

## Recorded fields

Only `version` — e.g. `1.6.45`. This probe records no `extra` fields.

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`endoflife:memcached`.
