---
title: RabbitMQ
description: Configuring enodia to probe RabbitMQ.
---

Reads `GET /api/overview` from the management plugin's HTTP API (port
`15672` by default — give it in the address). The AMQP port itself has no
pre-auth version exchange worth reading; the management plugin is the one
place RabbitMQ serves its version.

```yaml
targets:
  - id: rabbitmq-main
    product: rabbitmq
    address: https://rabbitmq.example.com:15672
    credentials: rabbitmq-monitor
```

## Authentication — required

The management API is never anonymous: confirmed live against
`rabbitmq:4-management`, which answered `401` without credentials. A
management user's HTTP Basic credentials:

```yaml
credentials:
  rabbitmq-monitor:
    kind: basic
    username: monitor
    password: "${RABBITMQ_PASSWORD}"
```

Only `basic` is accepted; any other kind is a config error. See
[Configuration → Credentials](/en/configuration/#credentials).

The management API is plain HTTP unless TLS is configured on it, and
enodia refuses to send credentials over plain HTTP: an `http://` address
needs `allow_insecure_transport`, deliberately — see
[HTTPS first](/en/concepts/#https-first-credentials-never-sent-in-the-clear-by-default).

## Recorded fields

- `version` — `rabbitmq_version`, e.g. `4.3.6`
- `extra.productName` — e.g. `RabbitMQ`
- `extra.productVersion` — e.g. `4.3.6`
- `extra.erlangVersion` — e.g. `27.3.4.18`
- `extra.clusterName` — e.g. `rabbit@enodia-test`

The same fields are in 3.8.34's reply.

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`endoflife:rabbitmq`.
