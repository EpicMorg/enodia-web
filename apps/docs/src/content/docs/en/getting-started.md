---
title: Getting started
description: Install enodia and run your first check.
---

## Installation

:::caution[No tagged release yet]
enodia is pre-1.0. Once a release exists, each one will carry `.deb`,
`.rpm`, `.apk`, and Arch's `.pkg.tar.zst` packages (linux/amd64+arm64),
raw archives for every supported platform, and a container image. Until
then, build from source — see below.
:::

Once releases exist, installation will look like this:

```bash
sudo dpkg -i enodia_linux_amd64.deb                # Debian/Ubuntu
sudo rpm -i enodia_linux_amd64.rpm                 # Fedora/RHEL
apk add --allow-untrusted enodia_linux_amd64.apk   # Alpine
sudo pacman -U enodia_linux_amd64.pkg.tar.zst      # Arch
```

```bash
docker run --rm \
  -v /etc/enodia:/config:ro \
  ghcr.io/epicmorg/enodia:1 check --config /config/config.yaml
```

or the raw install scripts, once published:

```bash
curl -sSL https://raw.githubusercontent.com/EpicMorg/enodia/master/install.sh | sh   # Linux/macOS
```

```powershell
irm https://raw.githubusercontent.com/EpicMorg/enodia/master/install.ps1 | iex        # Windows
```

### Build from source (works today)

Requires Go — check `go.mod` for the exact version enodia currently
targets.

```bash
git clone https://github.com/EpicMorg/enodia.git
cd enodia
go build -o enodia ./cmd/enodia
./enodia version
```

### Supported platforms (once a release exists)

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
