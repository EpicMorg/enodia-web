---
title: Configuration
description: Every field enodia.yaml, credentials.yaml, and settings.yaml accept.
---

enodia reads up to three files: **`enodia.yaml`** (required — your
service inventory), an optional separate **`credentials.yaml`**, and an
optional **`settings.yaml`** (personal display preferences, never
required). All three are plain YAML.

## `enodia.yaml`

### Top level

```yaml
schemaVersion: 1
credentials_file: credentials.yaml   # optional, see below
defaults:                            # optional
  timeout: 10s
  concurrency: 5
  retries: 2
  backoff: 500ms
credentials: {}                      # optional, see "Credentials"
targets: []                          # your services
```

`schemaVersion` is checked on read — a future version is refused with
advice to upgrade rather than parsed optimistically.

### `defaults`

Applies to every target unless overridden per-target.

| Field | Type | Meaning |
|---|---|---|
| `timeout` | duration | Per-request timeout (default: `10s` if unset anywhere) |
| `concurrency` | int | How many targets are probed at once |
| `retries` | int | Retry count — only `ErrUnreachable` is retried; a rejected credential doesn't improve on a second attempt |
| `backoff` | duration | Delay between retries |

Durations use Go's duration syntax: `500ms`, `10s`, `2m`, `1h30m`.

### `targets`

One entry per service:

```yaml
targets:
  - id: jira-main               # required, stable across renames - metrics and history key off this
    name: Jira (production)     # optional, defaults to id
    product: jira                # required - see Supported products
    address: https://jira.example.com   # required
    credentials: jira-token      # optional, name of an entry in credentials:
    timeout: 15s                 # optional, overrides defaults.timeout
    path: /rest/api/2/serverInfo # optional, product-specific - most probes have a sane default
    method: GET                  # optional
    headers:                     # optional, extra headers sent with every request
      X-Custom: value
    allow_insecure_transport: false   # optional - see "HTTPS first" in Concepts
    tls:                          # optional, see "TLS" below
      ca_file: /etc/enodia/ca.pem
    options:                      # optional, product-specific key/value knobs
      key: value
    parser:                       # only for product: generic - see below
      type: regex
```

`address` is written exactly as you'd type it — each probe parses it
itself. A bare host with no `https://`/`http://` prefix is resolved
automatically (see [Concepts](/en/concepts/#https-first-credentials-never-sent-in-the-clear-by-default)),
or run `enodia config resolve` to see what scheme each target would use
without sending any credentials.

### TLS (`tls:`)

Three levels, in descending order of correctness:

```yaml
tls:
  ca_file: /etc/enodia/corp-ca.pem   # a corporate CA bundle - most closed estates run their own PKI
  pin_sha256:                         # pinned leaf certificate fingerprint(s)
    - "AB:CD:...:EF"
  server_name: internal.example.com   # SNI override
  min_version: "1.2"                  # TLS minimum version
  insecure: true                      # last resort - see below
```

`insecure: true` warns on every run, not only at validation time,
because it has a habit of being added "temporarily" and living for
years. It also travels into the observation, so a report doubles as a
fleet-wide TLS audit — you can see which services are being checked
without verification.

## Credentials

Named entries, referenced from a target's `credentials:` field by name:

```yaml
credentials:
  jira-token:
    kind: bearer
    value: "${JIRA_TOKEN}"

  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  vault-basic:
    kind: basic
    username: enodia
    password: "${VAULT_PASSWORD}"

  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"
```

| `kind` | Fields used | Sends |
|---|---|---|
| `none` (default if omitted) | — | no credential |
| `bearer` | `value` | `Authorization: Bearer <value>` |
| `token-header` | `header`, `value` | a custom header, e.g. `PRIVATE-TOKEN`, `X-Vault-Token` |
| `basic` | `username`, `password` | HTTP Basic auth |
| `password` | `password` | protocol-native auth (Redis `AUTH`, a SQL connection's own password, ...) |

### `credentials_file`

A separate file, same shape as the inline `credentials:` map:

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

This is what lets a service inventory be committed to git while secrets
stay out of it entirely. Entries in `credentials_file` take precedence
over an inline entry of the same name. `credentials_file` resolves
relative to the config file that names it, not the current directory.

### Environment variable interpolation

Any string value in `enodia.yaml` or `credentials.yaml` can reference an
environment variable:

- `${VAR}` — replaced with `$VAR`'s value; missing is an error.
- `${VAR:-default}` — replaced with `$VAR`'s value, or `default` if unset.

## The generic probe

`product: generic` is the escape hatch for a target that will never get
a dedicated probe. Its vocabulary is deliberately small and frozen — no
conditionals, no loops, no chained requests, no templating. A target
needing any of that needs a real probe written in Go, not more generic
probe features.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex          # json | xml | header | plaintext | regex
      key: version          # dotted path (json), tag/XPath-ish path (xml), or header name
      regex: 'v(\d+\.\d+\.\d+)'
      cleanregex: '^v'      # first capture group wins; note the lowercase spelling
      line: 1                # plaintext only - which line to read
```

:::caution[Field spelling: `cleanregex`, not `cleanRegex`]
The parser spec's YAML fields have no explicit tag mapping in enodia's
source, so YAML's default (lowercase, no word-splitting) applies. Every
other field happens to be one word already (`type`, `key`, `regex`,
`line`), so this only bites the multi-word one — write `cleanregex`, all
lowercase. Confirmed directly against the parser (a `cleanRegex` key is
rejected as an unknown field), not assumed from either the source
comments or the project's own internal design notes, which both use
`cleanRegex` in prose.
:::

## File locations

Both `enodia.yaml` and `settings.yaml` are found the same way: an
explicit path (`--config`/`--settings`, or `$ENODIA_CONFIG`/
`$ENODIA_SETTINGS` for an exact file) always wins and must exist — a
typo is an error, never a silent fall-through to some other file. Absent
that, a search runs in order below; the first match wins outright,
nothing is merged from several found files. Location beats naming: a
match in the current directory always wins over one in
`$XDG_CONFIG_HOME`, which always wins over one in `/etc/enodia/`,
regardless of which name matched where.

**`enodia.yaml`:**

1. `./enodia.yaml`
2. `./enodia.yml`
3. `./config.yaml`
4. `./config.yml`
5. `./.enodia.yaml`
6. `./.enodia.yml`
7. `./.config.yaml`
8. `./.config.yml`
9. `$XDG_CONFIG_HOME/enodia/enodia.yaml` (`~/.config/enodia/enodia.yaml` if `$XDG_CONFIG_HOME` is unset)
10. `$XDG_CONFIG_HOME/enodia/enodia.yml`
11. `$XDG_CONFIG_HOME/enodia/config.yaml`
12. `$XDG_CONFIG_HOME/enodia/config.yml`
13. `/etc/enodia/enodia.yaml`
14. `/etc/enodia/enodia.yml`
15. `/etc/enodia/config.yaml`
16. `/etc/enodia/config.yml`

Finding nothing at all is an error — a config that can't be found is
worth failing loudly over, since it usually means the wrong file (or
none) is about to be used. Run `enodia config path` to see which file
would actually be picked up.

**`settings.yaml`** — same idea, with two differences: it also checks a
plain `settings.` name (not just `enodia.settings.`), and finding
nothing at all is **not** an error — every field just falls back to its
built-in default, since this file is entirely optional:

1. `./enodia.settings.yaml`
2. `./enodia.settings.yml`
3. `./settings.yaml`
4. `./settings.yml`
5. `./.enodia.settings.yaml`
6. `./.enodia.settings.yml`
7. `./.settings.yaml`
8. `./.settings.yml`
9. `$XDG_CONFIG_HOME/enodia/settings.yaml` (`~/.config/enodia/settings.yaml` if `$XDG_CONFIG_HOME` is unset)
10. `$XDG_CONFIG_HOME/enodia/settings.yml`
11. `/etc/enodia/settings.yaml`
12. `/etc/enodia/settings.yml`

## `settings.yaml`

Personal, per-operator display preferences — never targets, never
credentials, never shared the way `enodia.yaml` usually is.

```yaml title="settings.yaml"
schemaVersion: 1

render:
  # compact (default) | lifecycle | drift | fleet
  default_view: fleet

html:
  # inline (default, fully offline) | cdn (loads Bootstrap/Bootswatch)
  assets: cdn

  # none (no stylesheet at all) | default (plain Bootstrap) | any of
  # Bootswatch's 26 real themes: brite, cerulean, cosmo, cyborg, darkly,
  # flatly, journal, litera, lumen, lux, materia, minty, morph, pulse,
  # quartz, sandstone, simplex, sketchy, slate, solar, spacelab,
  # superhero, united, vapor, yeti, zephyr
  theme: lumen

  # auto (default: races jsdelivr and cdnjs, uses whichever answers
  # first) | jsdelivr | cdnjs
  cdn: auto

  # optional: restrict the export to one view instead of all four
  # view: fleet
```

`render.default_view` applies to `check`'s `--view` whenever the flag
itself wasn't passed. `html.*` only matters for
`export --format html` — see [Reporting](/en/reporting/) for what each
field actually changes.
