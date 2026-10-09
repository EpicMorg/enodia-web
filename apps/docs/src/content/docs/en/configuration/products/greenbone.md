---
title: Greenbone / OpenVAS
description: Configuring enodia to probe Greenbone / OpenVAS.
---

Reads the version of gsad — the Greenbone Security Assistant web daemon
in front of OpenVAS — from `GET /gmp`. Scheme defaults to `https`.
`product: openvas` and `product: gsad` are accepted as aliases.

```yaml
targets:
  - id: greenbone-main
    product: greenbone
    address: https://greenbone.example.com
```

## Why `/gmp`'s 401

gsad wraps every `/gmp` reply in an envelope carrying its version,
including the 401 for a request with no session:
`<envelope><version>24.12.0</version><vendor_version></vendor_version>…`
("Authentication required … (GSA 24.12.0)"). The probe accepts that 401
and reads the envelope. The web UI itself is a static React bundle with
no version in it.

The version is gsad's. The scanner (openvas-scanner) and gvmd behind it
version separately and aren't visible without a login.

## Authentication

None — the endpoint accepts no credential shape.

## Recorded fields

- `version` — e.g. `24.12.0`, from `<envelope><version>`
- `extra.vendorVersion` — `<vendor_version>`, when non-empty

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured — as
gsad (`greenbone_security_assistant`), not the `openvas_manager` daemon.

## Lifecycle resolver

`github:greenbone/gsad` — endoflife.date has no Greenbone calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
