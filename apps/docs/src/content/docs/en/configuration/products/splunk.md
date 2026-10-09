---
title: Splunk
description: Configuring enodia to probe Splunk.
---

Reads `GET /services/server/info?output_mode=json` from splunkd's
management port, not the web UI. An address without a port gets `8089`
(splunkd's management port); the default scheme is `https`.

```yaml
targets:
  - id: splunk-main
    product: splunk
    address: splunk.example.com
    credentials: splunk-monitor
```

## Why the management port

The web UI (port 8000) is the wrong place to ask: it is often published
behind a proxy or CDN, and its login page carries no version worth
relying on. splunkd's
management port is direct, and `/services/server/info` answers with
`entry[0].content` — `version`, `build`, `product_type`,
`isFree`/`isTrial`. The probe has nothing to read on the web port, which
is why a bare hostname gets `8089` rather than the scheme's default port.

## Authentication — required

Without credentials splunkd answers `401` with an XML
`<msg type="ERROR">Unauthorized</msg>` and `Server: Splunkd` (seen on a
production 9.4.1 and on `splunk/splunk` 10.6.0.5). Two kinds are
accepted — a Splunk user over HTTP Basic, or a Splunk authentication
token as Bearer:

```yaml
credentials:
  splunk-monitor:
    kind: basic
    username: monitor
    password: "${SPLUNK_PASSWORD}"
```

```yaml
credentials:
  splunk-token:
    kind: bearer
    value: "${SPLUNK_TOKEN}"
```

Any other kind is a config error. See
[Configuration → Credentials](/en/configuration/#credentials).

## Recorded fields

- `version` — `entry[0].content.version`, e.g. `10.6.0.5`
- `extra.build` — e.g. `86587d4e3b27`
- `extra.license` — `free` or `trial`, when splunkd reports one of them;
  absent otherwise
- `extra.productType` — splunkd's own `product_type`, e.g. `enterprise`

## CVE correlation

Matched against NVD and БДУ ФСТЭК when a [`cve:` block](/en/cve/) is configured.

Edition-aware: NVD splits `splunk:splunk` by edition into `enterprise`
and the long-retired `light`, and `extra.productType` (`enterprise`,
`lite`) picks which one applies. An unknown edition keeps every
finding. Splunk Cloud has its own CPE and isn't mapped.

## Lifecycle resolver

`endoflife:splunk`. A build newer than the calendar (10.6, at a time when
endoflife.date listed up to 10.4) reads as `cycle_unmatched` until the
calendar catches up.
