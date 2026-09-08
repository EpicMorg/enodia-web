---
title: HashiCorp Vault
description: Configuring enodia to probe HashiCorp Vault.
---

Reads `GET /v1/sys/health` for the version — Vault's cluster health-check
endpoint, deliberately anonymous so a load balancer can poll it. Sending
a token makes no difference to any of this.

```yaml
targets:
  - id: vault-main
    product: vault
    address: https://vault.example.com
```

## Authentication

None — the endpoint accepts no credential shape, by design.

## Cluster state is not a failure

`/sys/health` answers with different status codes depending on cluster
topology — sealed (`503`), standby (`429`), DR/performance standby
(`472`/`473`), not initialized (`501`) — and **every one of these still
carries the same JSON body, version included**. enodia treats all of them
as successful observations, not errors: a sealed Vault node is a fact
about that node, not a probe failure (see
[Concepts](/en/concepts/#facts-and-judgement-are-separate)).

## Recorded fields

- `version`
- `extra.initialized`, `extra.sealed`, `extra.standby` — `"true"`/`"false"`
- `extra.clusterName`, when present

## Lifecycle resolver

`endoflife:hashicorp-vault`.
