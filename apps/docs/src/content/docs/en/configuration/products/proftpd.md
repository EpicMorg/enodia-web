---
title: ProFTPD
description: Configuring enodia to probe ProFTPD.
---

A raw TCP probe, not HTTP — `address` is `host` or `host:port`, no
scheme. Port defaults to `21` when omitted. Reads the FTP greeting (RFC
959's `220` reply) every server sends unprompted on connect, and looks
for a version inside it.

```yaml
targets:
  - id: ftp-main
    product: proftpd
    address: ftp.example.com:21
```

## Authentication

None — the greeting is sent before any authentication step.

## The out-of-the-box default has no version at all

With no `ServerIdent` directive configured — the actual default,
confirmed live against both a real production host and a fresh
`instantlinux/proftpd` container — the greeting reads
`"ProFTPD Server (<ServerName>) [<address>]"`, carrying no version. The
version only appears if an admin explicitly configures `ServerIdent on
"... %{version} ..."` — confirmed live too:
`"ProFTPD 1.3.9c ready at 127.0.0.1"`. So this probe's "no version
found" case is the common one, not the exception.

## Recorded fields

Only `version` — this probe records no `extra` fields.

## Lifecycle resolver

`endoflife:proftpd`.
