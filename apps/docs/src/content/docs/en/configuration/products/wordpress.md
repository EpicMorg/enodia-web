---
title: WordPress
description: Configuring enodia to probe WordPress.
---

Tries two anonymous surfaces, in order, and uses whichever answers
first:

1. The RSS feed's own `<generator>` line (`/?feed=rss2` — the
   query-string form, which works regardless of whether pretty
   permalinks are configured).
2. The homepage's `<meta name="generator" content="WordPress X.Y.Z" />`
   tag (`/`).

```yaml
targets:
  - id: wordpress-main
    product: wordpress
    address: https://blog.example.com
```

## Authentication

None — the endpoint accepts no credential shape.

## Why the feed is tried first

The feed survives the single most common hardening step: WordPress
registers its generator tag on the feed hooks separately from the
homepage's own `wp_head` action, so the one-line `remove_action('wp_head',
'wp_generator')` snippet every "hide your WordPress version" tutorial
gives only removes the homepage tag, not the feed's — confirmed by
reading WordPress's own hook registrations, not assumed. A site that has
gone further and disabled feeds entirely, or stripped both signals,
falls through to a clear "not supported" error.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:wordpress`.
