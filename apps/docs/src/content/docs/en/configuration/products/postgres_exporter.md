---
title: postgres_exporter
description: Configuring enodia to probe prometheus-community/postgres_exporter.
---

Reads the `postgres_exporter_build_info` gauge off `/metrics` — the
`prometheus/common` "version collector" every Prometheus exporter in
this ecosystem exposes the same way (a constant `1`, with the version in
a label, not the value). `product: postgres-exporter` is accepted as an
alias.

```yaml
targets:
  - id: postgres-exporter-main
    product: postgres_exporter
    address: https://exporter.example.com:9187
```

## Authentication

Optional — `/metrics` needs no credentials by default and answers even
when the target PostgreSQL itself is unreachable (`build_info` describes
the exporter binary, not the database it scrapes). `exporter-toolkit`
(the library behind `--web.config.file`) can add HTTP Basic to this
endpoint:

```yaml
credentials:
  postgres-exporter-basic:
    kind: basic
    username: metrics
    password: "${EXPORTER_PASSWORD}"
```

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`github:prometheus-community/postgres_exporter` — this is a Prometheus
exporter, not a product with a lifecycle/EOL policy of its own, so it
resolves against GitHub Releases: the latest published, non-prerelease
tag only, with no eol/support/lts dates.
