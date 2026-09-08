---
title: pgAdmin
description: Configuring enodia to probe pgAdmin.
---

Decodes the version out of the `?ver=NNNNN` cache-busting query string
pgAdmin appends to every static asset on its own login page — anonymous
by design, since it has to render before any session exists.

```yaml
targets:
  - id: pgadmin-main
    product: pgadmin
    address: https://pgadmin.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## How the version is decoded

Confirmed against a real `dpage/pgadmin4` container and pgAdmin's own
source (`version.py`): `NNNNN` is `APP_VERSION_INT`, documented there as
`[X]XYYZZ` — release, revision, then a suffix code — e.g. `91700` for
release 9, revision 17, suffix `00` (GA). Only the release.revision
spine is reconstructed into `version`; a nonzero suffix code (a
beta/dev build) has no documented text mapping to reconstruct from the
code alone, so it's surfaced as `extra.suffixCode` rather than guessed
at.

## Recorded fields

- `version` — e.g. `9.17`
- `extra.suffixCode`, only when nonzero

## Lifecycle resolver

None — endoflife.date has no pgAdmin calendar (confirmed 404).
pgadmin-org/pgadmin4's own GitHub tags use the shape `REL-9_17`, not a
dotted version, so wiring the GitHub Releases resolver here today would
compare against a silently wrong reference rather than no reference at
all. Inventory-only for now.
