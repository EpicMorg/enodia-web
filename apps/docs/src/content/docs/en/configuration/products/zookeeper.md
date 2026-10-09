---
title: Apache ZooKeeper
description: Configuring enodia to probe Apache ZooKeeper.
---

A raw TCP probe on the client port, not HTTP — `address` is `host` or
`host:port`, no scheme. Port defaults to `2181` when omitted. Sends the
`srvr` four-letter word and reads the reply until the server closes the
connection.

```yaml
targets:
  - id: zk-01
    product: zookeeper
    address: zk-01.example.com:2181
```

## Why `srvr`

ZooKeeper 3.5+ allows only `srvr` by default
(`4lw.commands.whitelist`): `stat`, `mntr`, `ruok` and the rest answer
"is not executed because it is not in the whitelist". If a server has
removed `srvr` from the whitelist too, the target fails as not supported.
The AdminServer (HTTP, 8080) carries the same data, but is often not
exposed; the client port always is.

## Authentication

None — four-letter words have no authentication.

## Recorded fields

- `version` — e.g. `3.9.6`, from
  `Zookeeper version: 3.9.6-a355171b081b5b60749db8f19cca1528b0df936f, built on 2026-09-03 19:29 UTC`
- `extra.git` — the build's git hash, when present
- `extra.mode` — the `Mode:` line, e.g. `standalone`

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`endoflife:zookeeper`.
