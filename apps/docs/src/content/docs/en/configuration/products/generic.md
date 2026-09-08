---
title: Generic
description: Configuring enodia's generic probe for in-house or unsupported systems.
---

The escape hatch for anything without a dedicated probe — a hand-written
`parser:` block instead of compiled-in Go logic. Full field reference,
the frozen `json`/`xml`/`header`/`plaintext`/`regex` vocabulary, and the
`clean_regex` field-spelling note live in
[Configuration → The generic probe](/en/configuration/#the-generic-probe);
this page exists only so `generic` shows up alongside the other 28
products in the sidebar.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex
      regex: 'v(\d+\.\d+\.\d+)'
```

## Authentication

`none`, `bearer`, `token-header`, and `basic` are all accepted — whatever
your in-house service actually expects.

## Lifecycle resolver

None — a hand-rolled target has no calendar to look up by definition.
Don't see your product on the list of 28 dedicated probes? See
[Supported products](/en/products/#dont-see-your-product) for the two
ways forward: this escape hatch, or requesting a real probe.
