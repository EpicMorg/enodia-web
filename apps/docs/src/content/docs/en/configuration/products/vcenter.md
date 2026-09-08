---
title: vCenter Server
description: Configuring enodia to probe VMware vCenter Server.
---

Calls `ServiceContent.about` via the vSphere API's own
`RetrieveServiceContent` SOAP discovery call at `/sdk` — the same call and
endpoint [ESXi](/en/configuration/products/esxi/) answers, distinguished
by the `apiType` field.

```yaml
targets:
  - id: vcenter-main
    product: vcenter
    address: https://vcenter.example.com
```

## Authentication

None — confirmed live against a real production vCenter 8.0.3 instance,
no credentials at all.

## Vendor identity check

`apiType` is compared against `"VirtualCenter"` — a real ESXi host
answers the identical call with `apiType=HostAgent` instead (see
[ESXi](/en/configuration/products/esxi/), which runs this same check in
reverse). Pointing `product: vcenter` at an ESXi host fails loudly rather
than getting recorded as a wrong fact.

## Not the same as an earlier version of this probe

This probe used to read `/sdk/vimServiceVersions.xml` instead, which
answers identically for ESXi and vCenter alike (so it could never tell
the two apart) and reports the `vim25` API schema version (e.g.
`"8.0.3.0"`) rather than the product's real marketing version. The
current `RetrieveServiceContent`-based probe fixes both problems — real
version, real identity check.

## Recorded fields

- `version` — the real marketing version, e.g. `8.0.3`
- `extra.build`, when present

## Lifecycle resolver

`endoflife:vcenter`.
