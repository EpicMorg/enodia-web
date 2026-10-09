---
title: code-server
description: Configuring enodia to probe code-server.
---

Reads `GET /login`, anonymously. Scheme defaults to `https`. The login
page embeds `<meta id="coder-options" data-settings="{...}">` — HTML-escaped
JSON — and its `codeServerVersion` is the server's version; the probe
unescapes the attribute and decodes it.

```yaml
targets:
  - id: code-main
    product: code-server
    address: https://code.example.com
```

## Why the login page

code-server's own `/version` needs the password, and `/healthz` carries no
version. The login page is reachable without logging in and carries the
same options the editor is started with. A page with no `coder-options`
element is reported as not supported (not code-server).

## Authentication

None — the probe reads an anonymous page and accepts no credential kind.
Since 2.2.0 a credential configured on this target is a config error
rather than being ignored; see
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

Only `version` — e.g. `4.141.0` (confirmed live on
`codercom/code-server:latest`, whose `code-server --version` said 4.141.0
with Code 1.141.0). This probe records no `extra` fields.

## CVE correlation

Matched against NVD when a [`cve:` block](/en/cve/) is configured.

## Lifecycle resolver

`github:coder/code-server` — endoflife.date has no code-server calendar
(confirmed 404), so this resolves against GitHub Releases instead: the
latest published, non-prerelease tag only, with no eol/support/lts dates
(GitHub has no opinion on lifecycle policy, only "what's the latest
release").
