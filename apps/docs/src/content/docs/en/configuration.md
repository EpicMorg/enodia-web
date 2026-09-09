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

See **Product setup** in the sidebar (or the
[Supported products](/en/products/) table) for the exact endpoint, auth
requirements, and recorded fields for each of the 29 built-in probes —
`path`, `credentials`, and `options` above are the general shape; each
product's own page says what it actually needs.

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

  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
    passphrase: "${SSH_KEY_PASSPHRASE}"   # optional, only if the key is encrypted
```

| `kind` | Fields used | Sends |
|---|---|---|
| `none` (default if omitted) | — | no credential |
| `bearer` | `value` | `Authorization: Bearer <value>` |
| `token-header` | `header`, `value` | a custom header, e.g. `PRIVATE-TOKEN`, `X-Vault-Token` |
| `basic` | `username`, `password` | HTTP Basic auth |
| `password` | `password` (plus `username`, for the protocols that use one — Redis ACL, PostgreSQL) | protocol-native auth (Redis `AUTH`, a SQL connection's own password, ...) |
| `ssh-key` | `username`, `private_key_file`, `passphrase` (optional) | SSH public-key auth, for the SSH-based OS-identification probes (see [Supported products](/en/products/)) |

`username` alone with `kind: password` and no `private_key_file` also
works for SSH targets — the SSH probes accept either a password or a
private key, same as any SSH client would (`username` plus `password`
under `kind: password`, or `username` plus `private_key_file` under
`kind: ssh-key`).

### SSH host key verification

Every SSH-based probe reuses the same `tls:` block the HTTPS probes use
for certificate verification — `pin_sha256` here holds the hex SHA-256 of
the host key's own wire encoding, not a TLS certificate, but it's the
same "pin a fingerprint, or say `insecure` and get warned" shape:

```yaml
targets:
  - id: linux-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"   # sha256 of the host key, ssh-keyscan or similar
      # insecure: true      # last resort — skips host key verification entirely
```

With neither `pin_sha256` nor `insecure: true` set, the connection is
refused before a single credential is sent.

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

## HashiCorp Vault Agent integration

Neither `enodia.yaml`'s inline `credentials:` map nor a separate
`credentials.yaml` needs a human to write it. Both are just files enodia
reads fresh on every run — confirmed in the source: `enodia check`
reloads config and credentials from scratch each invocation, and
`enodia serve --interval` does the same on every refresh cycle
(`Config.Build` calls `LoadCredentials` every time `collectObservations`
runs — nothing is cached for the process's lifetime, so editing either
file takes effect without a restart). That's exactly the shape
[Vault Agent](https://developer.hashicorp.com/vault/docs/agent-and-proxy/agent)'s
own `template` rendering is built for. enodia has no Vault-specific
integration of its own — none is needed, since the two mechanisms below
already compose with it directly.

### Vault Agent renders environment variables

Point Vault Agent's `template` (or `env_template`) stanza at the secrets
a target needs, and reference them the normal way, through
[environment variable interpolation](#environment-variable-interpolation)
above:

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

Vault Agent's `exec` mode runs enodia itself (or a wrapper script calling
`enodia check`) as its supervised child process, injecting the rendered
variables straight into that process's environment — no secret ever
touches disk as a file enodia has to read. Vault Agent's `exec` stanza
also supports restarting the child process when a templated secret
changes, if you want a long-running `enodia serve` to pick up a rotated
token immediately rather than waiting on it to simply still be valid at
the next `--interval` tick — see Vault Agent's own docs for the exact
config for that, it's entirely on the Vault Agent side.

### Vault Agent renders a `credentials.yaml` directly

Point `credentials_file:` at the path Vault Agent's `template` stanza
writes to, and template the exact shape
[`credentials_file`](#credentials_file) expects:

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: /run/enodia/credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

```hcl title="Vault Agent template stanza — illustrative; see Vault Agent's own docs for exact syntax"
template {
  destination = "/run/enodia/credentials.yaml"
  perms       = "0600"
  contents    = <<EOT
jira-token:
  kind: bearer
  value: "{{ with secret "secret/data/enodia/jira" }}{{ .Data.data.token }}{{ end }}"
EOT
}
```

This path needs no `exec`/restart wiring at all: `enodia check` re-reads
`credentials_file` from scratch on every invocation, and `enodia serve`
re-reads it on every refresh cycle regardless of how it changed on disk.
A cron-scheduled `enodia check` or a long-running `enodia serve` both
just pick up whatever Vault Agent last wrote, on their own schedule —
nothing enodia-specific to configure for it.

### Either way, follow enodia's own credential handling

Both patterns still land inside everything [Security](/en/security/)
already covers — credentials never appear in the inventory, exported
reports, or logs, and TLS verification stays on unless you opt out per
target. Vault Agent's own `perms` and destination-directory choice is
what keeps the rendered file off of anything else's read access; enodia
itself has no opinion on where `credentials_file` lives beyond resolving
a relative path against the config file that names it.

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
      clean_regex: '^v'     # first capture group wins - snake_case, see below
      line: 1                # plaintext only - which line to read
```

:::caution[Field spelling: `clean_regex`, not `cleanRegex` or `cleanregex`]
`ParserSpec` now carries explicit `yaml:` tags matching the rest of
`enodia.yaml`'s own snake_case convention (`ca_file`, `min_version`,
`allow_insecure_transport`, ...) — `clean_regex` is correct as of
2026-09-07. Before that fix, the struct had no explicit tags at all, so
YAML's untagged default (lowercase, no word-splitting) applied and the
only working spelling was `cleanregex`; a bare `cleanRegex` has never
worked at any point. Confirmed directly against the parser both times
this was checked, not assumed from prose.
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

**`settings.yaml`** — same idea, with a few differences: it also checks a
plain `settings.` name (not just `enodia.settings.`), it additionally
checks the directory the running executable lives in (not just the
current directory — see below), and finding nothing at all is **not**
an error — every field just falls back to its built-in default, since
this file is entirely optional:

1. `./enodia.settings.yaml`
2. `./enodia.settings.yml`
3. `./settings.yaml`
4. `./settings.yml`
5. `./.enodia.settings.yaml`
6. `./.enodia.settings.yml`
7. `./.settings.yaml`
8. `./.settings.yml`
9. `<directory containing the running executable>/settings.yaml`
10. `<same>/settings.yml`
11. `$XDG_CONFIG_HOME/enodia/settings.yaml` (`~/.config/enodia/settings.yaml` if `$XDG_CONFIG_HOME` is unset)
12. `$XDG_CONFIG_HOME/enodia/settings.yml`
13. `/etc/enodia/settings.yaml`
14. `/etc/enodia/settings.yml`

Step 9-10 is distinct from the current directory (steps 1-8): a portable
install (unzip anywhere, no package manager) runs from whatever
directory the operator happens to be standing in, which on Windows in
particular is essentially never the install directory itself
(`install.ps1` defaults to `%LOCALAPPDATA%\enodia`, added to `PATH` — the
whole point of `PATH` is that the current directory stops mattering).
This step is deliberately limited to `settings.yaml` — it's optional
display preferences, so a wrong or hijacked one in a shared install
directory is a cosmetic problem at worst. `enodia.yaml` carries
credentials and does not get an equivalent step.

## `settings.yaml`

Personal, per-operator display preferences — never targets, never
credentials, never shared the way `enodia.yaml` usually is.

```yaml title="settings.yaml"
schemaVersion: 1

render:
  # compact (default) | lifecycle | drift | fleet
  default_view: fleet

export:
  # json (default) | prometheus | html - used whenever `export` itself
  # is run without --format
  default_format: html

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
itself wasn't passed. `export.default_format` does the same for
`export`'s `--format`. `html.*` only matters for
`export --format html` — see [Reporting](/en/reporting/) for what each
field actually changes.
