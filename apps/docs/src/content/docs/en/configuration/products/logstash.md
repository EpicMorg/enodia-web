---
title: Logstash
description: Configuring enodia to probe Logstash.
---

Reads `GET /` on Logstash's own HTTP monitoring API — **port 9600 by
default, not the Elasticsearch or Kibana ports**.

```yaml
targets:
  - id: logstash-main
    product: logstash
    address: https://logstash.example.com:9600
```

## Authentication

None. Logstash's monitoring API has no built-in authentication at all —
it's meant to be firewalled off rather than credential-protected.
Confirmed live against a real `docker.elastic.co/logstash/logstash`
container.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:logstash`.
