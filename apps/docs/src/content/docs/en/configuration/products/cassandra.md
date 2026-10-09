---
title: Apache Cassandra
description: Configuring enodia to probe Apache Cassandra.
---

A CQL native protocol probe, not HTTP — `address` is `host` or
`host:port`, no scheme. Port defaults to `9042` when omitted. Reads
`release_version` with `SELECT release_version FROM system.local`.

```yaml
targets:
  - id: cassandra-01
    product: cassandra
    address: cassandra-01.example.com:9042
```

## Protocol

Cassandra has no HTTP API, so enodia speaks CQL directly, without a
driver: `STARTUP`, then — only when the server answers `AUTHENTICATE` —
one SASL PLAIN response, then the single query. `OPTIONS`/`SUPPORTED`,
the one pre-auth exchange, carries the CQL and protocol versions but not
the server's own. Protocol v4 is used because every supported Cassandra
speaks it: 3.x, 4.x and 5.0 accept it, while 3.11 refuses v5. Cassandra
2.x (v3 at most) is long out of support and not attempted.

## Authentication

Optional, `kind: password` — sent only when the cluster asks for it
(`PasswordAuthenticator`). See
[Configuration → Credentials](/en/configuration/#credentials).

```yaml
credentials:
  cassandra-ro:
    kind: password
    username: enodia_ro
    password: "${CASSANDRA_PASSWORD}"
```

A cluster that requires authentication with no credential configured
fails as an auth error naming its authenticator; rejected credentials are
an auth error too.

## Recorded fields

Only `version` — e.g. `5.0.9` or `3.11.19`. This probe records no
`extra` fields.

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`endoflife:apache-cassandra`.
