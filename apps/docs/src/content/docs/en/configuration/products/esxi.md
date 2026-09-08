---
title: VMware ESXi
description: Configuring enodia to probe VMware ESXi.
---

Calls `ServiceContent.about` via the vSphere API's own
`RetrieveServiceContent` SOAP discovery call at `/sdk` — the same call
and endpoint [vCenter Server](/en/configuration/products/vcenter/)
answers, distinguished by the `apiType` field.

```yaml
targets:
  - id: esxi-main
    product: esxi
    address: https://esxi-host.example.com
```

## Authentication

None — confirmed live against a real production ESXi 8.0.3 host, no
credentials at all.

## Vendor identity check

`apiType` is compared against `"HostAgent"` — a real vCenter Server
answers the identical call with `apiType=VirtualCenter` instead (see
[vCenter Server](/en/configuration/products/vcenter/), which runs this
same check in reverse). Pointing `product: esxi` at a vCenter instance
fails loudly rather than getting recorded as a wrong fact.

## Recorded fields

- `version` — e.g. `8.0.3`
- `extra.build`, when present

## Lifecycle resolver

`endoflife:esxi`.
