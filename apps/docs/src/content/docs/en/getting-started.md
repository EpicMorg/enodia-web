---
title: Getting started
description: Install enodia and run your first check.
---

## Installation

The easiest path — one command, picks the right binary for your OS/arch:

```bash
curl -fsSL https://get.enodia.sh/unix | sh   # Linux/macOS
```

```powershell
irm https://get.enodia.sh/windows | iex      # Windows
```

Or a package, if you'd rather your package manager track updates:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

Every package installs the binary at `/usr/bin/enodia`, man pages under
`/usr/share/man/man1/`, and creates a dedicated, unprivileged `enodia`
system user — nothing here needs root to run. Grab the right one from
the [latest release](https://github.com/EpicMorg/enodia/releases/latest).

Or a container:

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:1 check --config /config/config.yaml
```

### Build from source

Requires Go — check `go.mod` for the exact version enodia currently
targets.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Supported platforms

| OS | Arch | Minimum version |
|---|---|---|
| Linux | amd64, arm64 | Kernel 3.2 or later — Debian 8+, Ubuntu 14.04+, RHEL/CentOS 7+ all comfortably qualify |
| Windows | amd64, arm64, 386 | Windows 10 / Windows Server 2016 or later |
| macOS | amd64, arm64 | macOS 12 Monterey or later |

These are the Go toolchain's own floor, not something enodia adds on
top. Building from source with a newer Go raises the macOS floor
further — that's a toolchain decision, not a project one.

## Your first config

Create `enodia.yaml` next to the binary (or in any of the locations
listed in [Configuration](/en/configuration/#file-locations)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
```

Then run:

```bash
enodia check
```

```console
ID           PRODUCT  PATCH  LIFECYCLE  BRANCH  SEVERITY  REASON
gitlab-main  gitlab   ...
```

`check` with no `--from` collects and evaluates in one process — enodia
reaches your target, then reaches the internet to check its lifecycle
data. If your target only has network access to your infrastructure (a
closed environment) and not the internet, split the two phases instead:

```bash
# inside the closed network - no internet needed
enodia collect --config enodia.yaml -o inventory.jsonl

# anywhere else - no access to your services needed
enodia check --from inventory.jsonl
```

## Adding credentials

A target with a private API needs a named credential, resolved from
`enodia.yaml`'s own `credentials:` map (or a separate
`credentials.yaml` — see [Configuration](/en/configuration/)):

```yaml title="enodia.yaml"
schemaVersion: 1
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token

credentials:
  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"
```

`${GITLAB_TOKEN}` is interpolated from the environment at load time —
see [Configuration](/en/configuration/#environment-variable-interpolation).
Secrets never need to live in the same file as your service inventory.

## Next

- [Concepts](/en/concepts/) for the design decisions behind all of this.
- [CLI reference](/en/cli-reference/) for every command and flag.
- [Views](/en/views/) for `lifecycle`, `drift`, and `fleet` — not just
  the default table.
