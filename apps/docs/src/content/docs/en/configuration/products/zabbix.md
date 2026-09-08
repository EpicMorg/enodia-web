---
title: Zabbix
description: Configuring enodia to probe Zabbix.
---

Calls the JSON-RPC `apiinfo.version` method — the one method in
Zabbix's API explicitly documented to need no authentication.

```yaml
targets:
  - id: zabbix-main
    product: zabbix
    address: https://zabbix.example.com
```

## Authentication

None — everything else in Zabbix's API requires a session token this
probe has no reason to hold; `apiinfo.version` is the deliberate
exception.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:zabbix`.
