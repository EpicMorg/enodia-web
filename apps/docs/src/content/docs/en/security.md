---
title: Security
description: How enodia handles the credentials it holds to your infrastructure.
---

enodia holds credentials to your infrastructure. A few consequences are
deliberate, not incidental:

- **Credentials never appear** in the inventory, in exported reports, or
  in logs.
- **HTTPS is tried before HTTP.** Credentials are never sent over plain
  HTTP unless you explicitly opt in, per service, with
  `allow_insecure_transport: true` — see
  [Concepts](/en/concepts/#https-first-credentials-never-sent-in-the-clear-by-default).
- **TLS verification is on by default.** A custom CA (`tls.ca_file`) and
  certificate pinning (`tls.pin_sha256`) are supported so that
  `tls.insecure: true` stays a genuine last resort — see
  [Configuration](/en/configuration/#tls-tls). Services checked without
  verification are flagged in the report, not silently accepted.
- **Secrets live separately.** A named `credentials:` entry, or a
  standalone `credentials.yaml` referenced via `credentials_file` — see
  [Configuration](/en/configuration/#credentials_file) — so your service
  inventory (`enodia.yaml`) can be committed to git while your secrets
  cannot.

Found a security issue? See enodia's
[SECURITY.md](https://github.com/EpicMorg/enodia/blob/master/SECURITY.md)
on GitHub for how to report it responsibly.

## License

enodia is licensed under **AGPL-3.0-or-later**. If the AGPL doesn't fit
your situation, a commercial license is available — contact
[developer@epicm.org](mailto:developer@epicm.org).

Contributing requires signing enodia's CLA (the bot handles it on your
first pull request) — this exists so the project can be offered under
commercial terms alongside the AGPL, and you keep the copyright to your
own work.
